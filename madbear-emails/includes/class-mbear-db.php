<?php
/**
 * Database tables for campaigns, recipients (queue) and templates.
 *
 * State model mirrors what the extension keeps in chrome.storage
 * (mb_history / mb_bg_send_job), but persisted server-side so a queue can be
 * paused/resumed and never re-sends to a recipient already confirmed SENT.
 *
 * @package MadbearEmails
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Mbear_Db {

	const CAMPAIGNS  = 'mbear_campaigns';
	const RECIPIENTS = 'mbear_recipients';
	const TEMPLATES  = 'mbear_templates';

	public static function table_name( $short ) {
		global $wpdb;
		return $wpdb->prefix . $short;
	}

	public static function install() {
		global $wpdb;
		require_once ABSPATH . 'wp-admin/includes/upgrade.php';
		$charset = $wpdb->get_charset_collate();

		$campaigns = self::table_name( self::CAMPAIGNS );
		$recipients = self::table_name( self::RECIPIENTS );
		$templates  = self::table_name( self::TEMPLATES );

		dbDelta( "CREATE TABLE {$campaigns} (
			id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
			name LONGTEXT NOT NULL,
			type VARCHAR(20) NOT NULL DEFAULT 'merge',
			status VARCHAR(20) NOT NULL DEFAULT 'draft',
			spreadsheet_id VARCHAR(100) NOT NULL DEFAULT '',
			sheet_tab VARCHAR(100) NOT NULL DEFAULT '',
			config LONGTEXT NULL,
			total_rows INT NOT NULL DEFAULT 0,
			sent_count INT NOT NULL DEFAULT 0,
			error_count INT NOT NULL DEFAULT 0,
			skipped_count INT NOT NULL DEFAULT 0,
			last_error LONGTEXT NULL,
			created_at DATETIME NOT NULL,
			updated_at DATETIME NOT NULL,
			PRIMARY KEY  (id),
			KEY status (status)
		) {$charset};" );

		// One row per recipient of a campaign — the durable queue.
		dbDelta( "CREATE TABLE {$recipients} (
			id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
			campaign_id BIGINT UNSIGNED NOT NULL,
			row_index INT NOT NULL DEFAULT 0,
			email VARCHAR(191) NOT NULL DEFAULT '',
			payload LONGTEXT NULL,
			status VARCHAR(20) NOT NULL DEFAULT 'pending',
			result LONGTEXT NULL,
			attempts INT NOT NULL DEFAULT 0,
			sent_at DATETIME NULL,
			updated_at DATETIME NOT NULL,
			PRIMARY KEY  (id),
			KEY campaign_status (campaign_id, status),
			KEY email (email)
		) {$charset};" );

		dbDelta( "CREATE TABLE {$templates} (
			id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
			name LONGTEXT NOT NULL,
			subject LONGTEXT NOT NULL,
			body LONGTEXT NOT NULL,
			html_body LONGTEXT NOT NULL,
			from_name VARCHAR(100) NOT NULL DEFAULT '',
			reply_to VARCHAR(191) NOT NULL DEFAULT '',
			cc_field VARCHAR(500) NOT NULL DEFAULT '',
			bcc_field VARCHAR(500) NOT NULL DEFAULT '',
			created_at DATETIME NOT NULL,
			updated_at DATETIME NOT NULL,
			PRIMARY KEY  (id)
		) {$charset};" );

		update_option( 'mbear_db_version', MBEAR_VERSION );
	}

	/* ── Campaign helpers ─────────────────────────────────────────── */

	public static function insert_campaign( $data ) {
		global $wpdb;
		$now = current_time( 'mysql' );
		$wpdb->insert(
			self::table_name( self::CAMPAIGNS ),
			array(
				'name'           => isset( $data['name'] ) ? sanitize_text_field( $data['name'] ) : '',
				'type'           => isset( $data['type'] ) ? sanitize_key( $data['type'] ) : 'merge',
				'status'         => 'draft',
				'spreadsheet_id' => isset( $data['spreadsheet_id'] ) ? sanitize_text_field( $data['spreadsheet_id'] ) : '',
				'sheet_tab'      => isset( $data['sheet_tab'] ) ? sanitize_text_field( $data['sheet_tab'] ) : '',
				'config'         => wp_json_encode( isset( $data['config'] ) ? $data['config'] : array() ),
				'created_at'     => $now,
				'updated_at'     => $now,
			),
			array( '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s' )
		);
		return (int) $wpdb->insert_id;
	}

	public static function get_campaign( $id ) {
		global $wpdb;
		$table = self::table_name( self::CAMPAIGNS );
		$row   = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM {$table} WHERE id = %d", $id ) ); // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
		if ( $row && ! empty( $row->config ) ) {
			$decoded          = json_decode( $row->config, true );
			$row->config_arr  = is_array( $decoded ) ? $decoded : array();
		}
		return $row;
	}

	public static function update_campaign( $id, $data ) {
		global $wpdb;
		$data['updated_at'] = current_time( 'mysql' );
		$formats            = array_fill( 0, count( $data ), '%s' );
		$wpdb->update( self::table_name( self::CAMPAIGNS ), $data, array( 'id' => $id ), $formats, array( '%d' ) );
	}

	public static function list_campaigns( $limit = 50 ) {
		global $wpdb;
		$table = self::table_name( self::CAMPAIGNS );
		return $wpdb->get_results( $wpdb->prepare( "SELECT * FROM {$table} ORDER BY id DESC LIMIT %d", $limit ) ); // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
	}

	public static function delete_campaign( $id ) {
		global $wpdb;
		$wpdb->delete( self::table_name( self::RECIPIENTS ), array( 'campaign_id' => $id ), array( '%d' ) );
		$wpdb->delete( self::table_name( self::CAMPAIGNS ), array( 'id' => $id ), array( '%d' ) );
	}

	/* ── Recipient (queue) helpers ────────────────────────────────── */

	/**
	 * Bulk-insert queue rows built from sheet data.
	 *
	 * @param int   $campaign_id Campaign id.
	 * @param array $rows        List of assoc arrays: row_index,email,payload(json string).
	 */
	public static function insert_recipients( $campaign_id, $rows ) {
		global $wpdb;
		$table = self::table_name( self::RECIPIENTS );
		$now   = current_time( 'mysql' );
		$wpdb->query( 'START TRANSACTION' );
		foreach ( array_chunk( $rows, 200 ) as $chunk ) {
			$values  = array();
			$formats = array();
			foreach ( $chunk as $r ) {
				$values[] = array( $campaign_id, (int) $r['row_index'], substr( (string) $r['email'], 0, 191 ), (string) $r['payload'], 'pending', 0, $now );
				$formats  = array_merge( $formats, array( '%d', '%d', '%s', '%s', '%s', '%d', '%s' ) );
			}
			$placeholders = implode(
				',',
				array_fill( 0, count( $values ), '(%d,%d,%s,%s,%s,%d,%s)' )
			);
			$flat = array();
			foreach ( $values as $v ) {
				$flat = array_merge( $flat, $v );
			}
			$wpdb->query(
				$wpdb->prepare(
					"INSERT INTO {$table} (campaign_id,row_index,email,payload,status,attempts,updated_at) VALUES {$placeholders}", // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
					$flat
				)
			);
		}
		$wpdb->query( 'COMMIT' );
	}

	public static function count_recipients_by_status( $campaign_id ) {
		global $wpdb;
		$table = self::table_name( self::RECIPIENTS );
		$rows  = $wpdb->get_results( $wpdb->prepare( "SELECT status, COUNT(*) AS cnt FROM {$table} WHERE campaign_id = %d GROUP BY status", $campaign_id ) ); // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
		$out   = array( 'pending' => 0, 'sending' => 0, 'sent' => 0, 'error' => 0, 'unknown' => 0, 'skipped' => 0 );
		foreach ( $rows as $r ) {
			$out[ $r->status ] = (int) $r->cnt;
		}
		return $out;
	}

	/**
	 * Fetch next batch of recipients to process.
	 *
	 * Rows stuck in 'sending' (a previous request timed out mid-flight) are
	 * re-queued as 'unknown' first — they must be reconciled against the sheet
	 * Status column before any resend, so we never double-send.
	 *
	 * @param int $campaign_id Campaign id.
	 * @param int $limit       Max rows.
	 * @return array
	 */
	public static function take_batch( $campaign_id, $limit ) {
		global $wpdb;
		$table = self::table_name( self::RECIPIENTS );

		// Reconcile stale 'sending' rows (older than 10 minutes) -> 'unknown'.
		$wpdb->query(
			$wpdb->prepare(
				"UPDATE {$table} SET status='unknown', updated_at=%s WHERE campaign_id=%d AND status='sending' AND updated_at < %s", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
				current_time( 'mysql' ),
				$campaign_id,
				gmdate( 'Y-m-d H:i:s', time() - DATE_MINUTE * 10 )
			)
		);

		return $wpdb->get_results(
			$wpdb->prepare(
				"SELECT * FROM {$table} WHERE campaign_id=%d AND status IN ('pending','unknown') ORDER BY row_index ASC LIMIT %d", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
				$campaign_id,
				$limit
			)
		);
	}

	public static function mark_recipients( $ids, $status, $result = null ) {
		global $wpdb;
		if ( empty( $ids ) ) {
			return;
		}
		$table    = self::table_name( self::RECIPIENTS );
		$in       = implode( ',', array_map( 'intval', $ids ) );
		$now      = current_time( 'mysql' );
		$result_s = null === $result ? null : ( is_string( $result ) ? $result : wp_json_encode( $result ) );
		if ( null === $result_s ) {
			$wpdb->query(
				$wpdb->prepare(
					"UPDATE {$table} SET status=%s, sent_at=CASE WHEN %s='sent' THEN %s ELSE sent_at END, attempts=attempts+1, updated_at=%s WHERE id IN ({$in})", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
					$status,
					$status,
					$now,
					$now
				)
			);
		} else {
			$wpdb->query(
				$wpdb->prepare(
					"UPDATE {$table} SET status=%s, result=%s, sent_at=CASE WHEN %s='sent' THEN %s ELSE sent_at END, attempts=attempts+1, updated_at=%s WHERE id IN ({$in})", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
					$status,
					$result_s,
					$status,
					$now,
					$now
				)
			);
		}
	}

	public static function set_recipient_status_by_email( $campaign_id, $emails, $status ) {
		global $wpdb;
		$emails = array_values( array_filter( array_map( 'sanitize_email', $emails ) ) );
		if ( empty( $emails ) ) {
			return;
		}
		$table = self::table_name( self::RECIPIENTS );
		$ph    = implode( ',', array_fill( 0, count( $emails ), '%s' ) );
		$args  = array_merge( array( $status, current_time( 'mysql' ), (int) $campaign_id ), $emails );
		$wpdb->query(
			$wpdb->prepare(
				"UPDATE {$table} SET status=%s, updated_at=%s WHERE campaign_id=%d AND email IN ({$ph}) AND status IN ('pending','unknown','sending')", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
				$args
			)
		);
	}

	public static function list_recipients( $campaign_id, $statuses = array(), $limit = 200, $offset = 0 ) {
		global $wpdb;
		$table = self::table_name( self::RECIPIENTS );
		$args  = array( $campaign_id );
		$where = 'campaign_id=%d';
		if ( ! empty( $statuses ) ) {
			$where .= ' AND status IN (' . implode( ',', array_fill( 0, count( $statuses ), '%s' ) ) . ')';
			$args   = array_merge( $args, $statuses );
		}
		$args[] = absint( $limit );
		$args[] = absint( $offset );
		return $wpdb->get_results(
			$wpdb->prepare(
				"SELECT * FROM {$table} WHERE {$where} ORDER BY row_index ASC LIMIT %d OFFSET %d", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
				$args
			)
		);
	}

	/* ── Template helpers ─────────────────────────────────────────── */

	public static function save_template( $data, $id = 0 ) {
		global $wpdb;
		$row = array(
			'name'      => isset( $data['name'] ) ? sanitize_text_field( $data['name'] ) : '',
			'subject'   => isset( $data['subject'] ) ? sanitize_text_field( $data['subject'] ) : '',
			'body'      => isset( $data['body'] ) ? wp_kses_post( $data['body'] ) : '',
			'html_body' => isset( $data['html_body'] ) ? wp_kses_post( $data['html_body'] ) : '',
			'from_name' => isset( $data['from_name'] ) ? sanitize_text_field( $data['from_name'] ) : '',
			'reply_to'  => isset( $data['reply_to'] ) ? sanitize_email( $data['reply_to'] ) : '',
			'cc_field'  => isset( $data['cc_field'] ) ? sanitize_text_field( $data['cc_field'] ) : '',
			'bcc_field' => isset( $data['bcc_field'] ) ? sanitize_text_field( $data['bcc_field'] ) : '',
			'updated_at'=> current_time( 'mysql' ),
		);
		$formats = array( '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s' );
		if ( $id > 0 ) {
			$wpdb->update( self::table_name( self::TEMPLATES ), $row, array( 'id' => $id ), $formats, array( '%d' ) );
			return $id;
		}
		$row['created_at'] = current_time( 'mysql' );
		$formats[]         = '%s';
		$wpdb->insert( self::table_name( self::TEMPLATES ), $row, $formats );
		return (int) $wpdb->insert_id;
	}

	public static function get_template( $id ) {
		global $wpdb;
		$table = self::table_name( self::TEMPLATES );
		return $wpdb->get_row( $wpdb->prepare( "SELECT * FROM {$table} WHERE id = %d", $id ) ); // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
	}

	public static function list_templates() {
		global $wpdb;
		$table = self::table_name( self::TEMPLATES );
		return $wpdb->get_results( "SELECT * FROM {$table} ORDER BY id DESC" ); // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
	}

	public static function delete_template( $id ) {
		global $wpdb;
		$wpdb->delete( self::table_name( self::TEMPLATES ), array( 'id' => $id ), array( '%d' ) );
	}
}
