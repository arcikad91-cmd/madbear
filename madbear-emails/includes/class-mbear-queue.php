<?php
/**
 * Send queue engine.
 *
 * The backend action sendMerge is idempotent per sheet row: apps-script-backend.js
 * skips every row whose Status column already equals "SENT" and writes SENT +
 * SentAt + ThreadId + MessageId immediately after GmailApp.sendEmail() succeeds.
 * We reuse that as the single source of truth for reconciliation:
 *
 *  - Before a batch is (re)sent we refresh 'unknown' rows from getSheetData —
 *    if the sheet says SENT, the email left the server even though our HTTP
 *    request timed out, so it is never re-sent.
 *  - After a batch is sent we trust only the per-row results returned by the
 *    backend ({row,status,email,...}) — never the fact that WordPress managed
 *    to fire an HTTP request.
 *
 * @package MadbearEmails
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Mbear_Queue {

	const BATCH_SIZE = 50; // Recipients per sendMerge call (backend allows up to 500).

	/**
	 * Build the sendMerge config stored in a campaign record.
	 * Field names identical to popup.js doSend()/runSmartSend config object.
	 */
	public static function build_config( $raw ) {
		$config = array(
			'spreadsheetId' => isset( $raw['spreadsheet_id'] ) ? sanitize_text_field( $raw['spreadsheet_id'] ) : '',
			'sheetTab'      => isset( $raw['sheet_tab'] ) ? sanitize_text_field( $raw['sheet_tab'] ) : 'Sheet1',
			'draftId'       => isset( $raw['draft_id'] ) ? sanitize_text_field( $raw['draft_id'] ) : '',
			'subject'       => isset( $raw['subject'] ) ? sanitize_text_field( $raw['subject'] ) : '',
			'body'          => isset( $raw['body'] ) ? wp_kses_post( $raw['body'] ) : '',
			'htmlBody'      => isset( $raw['html_body'] ) ? wp_kses_post( $raw['html_body'] ) : '',
			'fromName'      => isset( $raw['from_name'] ) ? sanitize_text_field( $raw['from_name'] ) : '',
			'replyTo'       => isset( $raw['reply_to'] ) ? sanitize_email( $raw['reply_to'] ) : '',
			'cc'            => isset( $raw['cc'] ) ? sanitize_text_field( $raw['cc'] ) : '',
			'bcc'           => isset( $raw['bcc'] ) ? sanitize_text_field( $raw['bcc'] ) : '',
			'delayMs'       => isset( $raw['delay_ms'] ) ? min( 5000, max( 0, absint( $raw['delay_ms'] ) ) ) : 500,
			'testMode'      => false,
			'testEmail'     => '',
			'attachments'   => array(),
		);
		// Inline-data campaigns (extension "contacts" mode) are supported too.
		if ( ! empty( $raw['inline_data'] ) && is_array( $raw['inline_data'] ) ) {
			$config['inlineData'] = $raw['inline_data'];
		}
		return $config;
	}

	/**
	 * Populate the queue from the live Google Sheet via getSheetData.
	 * Rows already marked SENT in the sheet are inserted directly as 'sent'
	 * (exactly like the extension relies on the backend skipping them).
	 *
	 * @param int $campaign_id Campaign whose config holds spreadsheetId/sheetTab.
	 * @return array|WP_Error  Stats array or error.
	 */
	public static function populate_from_sheet( $campaign_id ) {
		global $wpdb;
		$campaign = Mbear_Db::get_campaign( $campaign_id );
		if ( ! $campaign ) {
			return new WP_Error( 'mbear_no_campaign', __( 'Campaign not found.', 'madbear-emails' ) );
		}
		$config = $campaign->config_arr;
		if ( empty( $config['spreadsheetId'] ) ) {
			return new WP_Error( 'mbear_no_sheet', __( 'Campaign has no spreadsheet connected.', 'madbear-emails' ) );
		}

		$res = Mbear_Api::get_sheet_data( $config['spreadsheetId'], $config['sheetTab'] );
		if ( ! $res['ok'] ) {
			return new WP_Error( 'mbear_backend', $res['error'] );
		}
		$rows = is_array( $res['data'] ) ? $res['data'] : array();
		if ( count( $rows ) < 2 ) {
			return new WP_Error( 'mbear_no_rows', __( 'Sheet has no data rows.', 'madbear-emails' ) );
		}

		$headers    = array_map( 'strval', $rows[0] );
		$lower      = array_map(
			function ( $h ) {
				return strtolower( trim( $h ) );
			},
			$headers
		);
		$email_col  = array_search( 'email', $lower, true );
		$status_col = array_search( 'status', $lower, true );
		if ( false === $email_col ) {
			return new WP_Error( 'mbear_no_email_col', __( 'No "Email" column found in sheet headers.', 'madbear-emails' ) );
		}

		// Wipe any previous queue for this campaign, then rebuild.
		$wpdb->delete( Mbear_Db::table_name( Mbear_Db::RECIPIENTS ), array( 'campaign_id' => $campaign_id ), array( '%d' ) );

		$to_insert = array();
		$seen      = array();
		$total     = 0;
		for ( $i = 1; $i < count( $rows ); $i++ ) {
			$row    = $rows[ $i ];
			$email  = isset( $row[ $email_col ] ) ? trim( (string) $row[ $email_col ] ) : '';
			$status = ( false !== $status_col && isset( $row[ $status_col ] ) ) ? strtoupper( trim( (string) $row[ $status_col ] ) ) : '';
			if ( '' === $email || ! is_email( $email ) ) {
				continue;
			}
			$key = strtolower( $email );
			if ( isset( $seen[ $key ] ) ) {
				continue; // Backend dedupes too; keep our counters honest.
			}
			$seen[ $key ] = true;
			$total++;
			$to_insert[] = array(
				'row_index' => $i, // 0-based index into data rows; backend reports row=i+2 in its results.
				'email'     => $email,
				'payload'   => wp_json_encode( $row ),
				'status'    => ( 'SENT' === $status ) ? 'sent' : 'pending',
			);
		}

		if ( empty( $to_insert ) ) {
			return new WP_Error( 'mbear_no_recipients', __( 'No valid email addresses found in the sheet.', 'madbear-emails' ) );
		}

		// Insert with individual statuses (reuse bulk insert then patch pre-sent).
		$pending = array_values( array_filter( $to_insert, fn( $r ) => 'pending' === $r['status'] ) );
		Mbear_Db::insert_recipients( $campaign_id, $pending );
		$sent_emails = array();
		foreach ( $to_insert as $r ) {
			if ( 'sent' === $r['status'] ) {
				$sent_emails[] = $r['email'];
			}
		}
		if ( ! empty( $sent_emails ) ) {
			self::mark_sent_from_sheet( $campaign_id, $sent_emails );
		}

		Mbear_Db::update_campaign(
			$campaign_id,
			array(
				'total_rows'    => $total,
				'sent_count'    => count( $sent_emails ),
				'sheet_tab'     => $config['sheetTab'],
				'spreadsheet_id'=> $config['spreadsheetId'],
			)
		);

		return array(
			'total'   => $total,
			'already' => count( $sent_emails ),
			'queued'  => count( $pending ),
		);
	}

	/**
	 * Insert rows already confirmed SENT in the sheet (reconciliation path).
	 */
	private static function mark_sent_from_sheet( $campaign_id, $emails ) {
		global $wpdb;
		$table = Mbear_Db::table_name( Mbear_Db::RECIPIENTS );
		foreach ( array_chunk( $emails, 100 ) as $chunk ) {
			$now  = current_time( 'mysql' );
			$args = array();
			foreach ( $chunk as $e ) {
				$args = array_merge( $args, array( (int) $campaign_id, $e, 'sent', $now, $now ) );
			}
			$ph = implode( ',', array_fill( 0, count( $chunk ), '( %d,%s,%s,%s,%s)' ) );
			$sql = "INSERT INTO {$table} (campaign_id,email,status,sent_at,updated_at) VALUES " . $ph;
			$wpdb->query( $wpdb->prepare( $sql, $args ) ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
		}
	}

	/**
	 * Reconcile 'unknown' rows against the sheet before resending them.
	 *
	 * @param int $campaign_id Campaign id.
	 * @return array{confirmed:int,restored:int,error:?string}
	 */
	public static function reconcile_unknown( $campaign_id ) {
		global $wpdb;
		$table    = Mbear_Db::table_name( Mbear_Db::RECIPIENTS );
		$unknowns = $wpdb->get_results(
			$wpdb->prepare( "SELECT id,email FROM {$table} WHERE campaign_id=%d AND status='unknown'", $campaign_id ) // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
		);
		if ( empty( $unknowns ) ) {
			return array( 'confirmed' => 0, 'restored' => 0, 'error' => null );
		}

		$campaign = Mbear_Db::get_campaign( $campaign_id );
		$config   = $campaign->config_arr;
		$res      = Mbear_Api::get_sheet_data( $config['spreadsheetId'], $config['sheetTab'] );
		if ( ! $res['ok'] ) {
			return array( 'confirmed' => 0, 'restored' => 0, 'error' => $res['error'] );
		}

		$rows    = is_array( $res['data'] ) ? $res['data'] : array();
		$sent_set = self::extract_sent_emails( $rows );

		$confirmed = array();
		$restored  = array();
		foreach ( $unknowns as $u ) {
			if ( isset( $sent_set[ strtolower( $u->email ) ] ) ) {
				$confirmed[] = (int) $u->id;
			} else {
				$restored[]  = (int) $u->id;
			}
		}
		if ( $confirmed ) {
			Mbear_Db::mark_recipients( $confirmed, 'sent', array( 'status' => 'SENT', 'source' => 'sheet-reconciliation' ) );
		}
		if ( $restored ) {
			Mbear_Db::mark_recipients( $restored, 'pending' );
		}
		return array( 'confirmed' => count( $confirmed ), 'restored' => count( $restored ), 'error' => null );
	}

	/**
	 * Parse getSheetData output into a set of emails whose Status == SENT.
	 *
	 * @param array $rows Raw 2D array from backend.
	 * @return array Lowercased emails as keys.
	 */
	public static function extract_sent_emails( $rows ) {
		$set = array();
		if ( count( $rows ) < 2 ) {
			return $set;
		}
		$lower = array_map(
			function ( $h ) {
				return strtolower( trim( (string) $h ) );
			},
			$rows[0]
		);
		$email_col  = array_search( 'email', $lower, true );
		$status_col = array_search( 'status', $lower, true );
		if ( false === $email_col || false === $status_col ) {
			return $set;
		}
		for ( $i = 1; $i < count( $rows ); $i++ ) {
			$row    = $rows[ $i ];
			$status = isset( $row[ $status_col ] ) ? strtoupper( trim( (string) $row[ $status_col ] ) ) : '';
			$email  = isset( $row[ $email_col ] ) ? strtolower( trim( (string) $row[ $email_col ] ) ) : '';
			if ( $email && 'SENT' === $status ) {
				$set[ $email ] = true;
			}
		}
		return $set;
	}

	/**
	 * Run one queue step: take up to BATCH_SIZE recipients, send them through
	 * the existing sendMerge action (one call), and record the backend's
	 * per-recipient answers.
	 *
	 * Idempotency: sendMerge itself skips sheet rows already marked SENT, so
	 * even a repeated call cannot double-send for sheet-backed campaigns.
	 *
	 * @param int $campaign_id Campaign id.
	 * @return array Step report for the UI.
	 */
	public static function run_step( $campaign_id ) {
		$campaign = Mbear_Db::get_campaign( $campaign_id );
		if ( ! $campaign ) {
			return array( 'done' => true, 'error' => __( 'Campaign not found.', 'madbear-emails' ) );
		}
		if ( 'running' !== $campaign->status ) {
			return array( 'done' => true, 'error' => __( 'Campaign is not running.', 'madbear-emails' ) );
		}

		$config = $campaign->config_arr;

		// 1. Reconcile rows whose previous request outcome is uncertain.
		$recon = self::reconcile_unknown( $campaign_id );

		// 2. Take next batch.
		$batch = Mbear_Db::take_batch( $campaign_id, self::BATCH_SIZE );
		if ( empty( $batch ) ) {
			Mbear_Db::update_campaign( $campaign_id, array( 'status' => 'completed' ) );
			return array( 'done' => true, 'report' => self::build_report( $campaign_id ) );
		}

		$ids = wp_list_pluck( $batch, 'id' );

		Mbear_Db::mark_recipients( $ids, 'sending' );

		// 3. Send this slice through the EXISTING sendMerge action with the full
		//    sheet config (spreadsheetId + sheetTab) — exactly what popup.js
		//    doSend() posts. The backend itself guarantees idempotency: it skips
		//    every row whose Status column already equals SENT and writes SENT +
		//    SentAt + ThreadId + MessageId right after each successful GmailApp
		//    send. Rows our queue marks 'sent' are also excluded from take_batch,
		//    so a resumed campaign never re-sends a confirmed recipient. We do NOT
		//    inject inlineData here because that would bypass the sheet's Status
		//    bookkeeping (see sendMerge source: inline mode performs no sheet
		//    writes) and could double-send after a timeout.
		$send_config = $config;
		$res = Mbear_Api::send_merge( $send_config );

		if ( ! $res['ok'] ) {
			$error_msg = (string) $res['error'];
			// Quota / transient failure → pause and keep remaining rows queued.
			// Rows marked 'sending' in this attempt are rolled back to pending;
			// their outcome is unknown only if the request actually reached Gmail,
			// which cannot be the case for a transport error before dispatch or a
			// structured backend error — but to stay safe we mark them 'unknown'
			// whenever the HTTP layer itself failed (no JSON answer received).
			$transport_failed = ( null === $res['http'] && 'wp_error' === $res['transport'] );
			Mbear_Db::mark_recipients( $ids, $transport_failed ? 'unknown' : 'pending' );
			Mbear_Db::update_campaign(
				$campaign_id,
				array(
					'status'     => self::is_quota_error( $error_msg ) ? 'quota_paused' : 'paused',
					'last_error' => $error_msg,
				)
			);
			return array(
				'done'   => false,
				'paused' => true,
				'error'  => $error_msg,
				'quota'  => self::is_quota_error( $error_msg ),
				'report' => self::build_report( $campaign_id ),
			);
		}

		// 4. Apply the backend's authoritative per-row results to the batch rows.
		$results = is_array( $res['data'] ) ? $res['data'] : array();
		$by_row  = array();
		foreach ( $results as $r ) {
			if ( isset( $r['row'] ) ) {
				$by_row[ (int) $r['row'] ] = $r;
			}
		}

		$sent_ids  = array();
		$err_ids   = array();
		$still_ids = array();
		foreach ( $batch as $b ) {
			$expected_row = (int) $b->row_index + 2; // Backend result row numbers are 1-based sheet rows.
			$r = isset( $by_row[ $expected_row ] ) ? $by_row[ $expected_row ] : null;
			if ( $r ) {
				switch ( $r['status'] ) {
					case 'SENT':
					case 'TEST_SENT':
						$sent_ids[] = (int) $b->id;
						break;
					case 'SKIPPED':
						// Backend skipped because the sheet already said SENT
						// (or duplicate email) → treat as delivered, never retry.
						$sent_ids[] = (int) $b->id;
						break;
					case 'ERROR':
					case 'NO_EMAIL':
						$err_ids[] = (int) $b->id;
						break;
					default:
						$still_ids[] = (int) $b->id;
				}
			} else {
				// No answer for this row → outcome unknown; must be reconciled
				// against the sheet before any retry.
				$still_ids[] = (int) $b->id;
			}
		}

		// Rows outside this batch that the backend answered with SENT are also
		// confirmed here (delayMs makes one call cover the whole sheet in the
		// worst case); mark them via email so the queue stays truthful.
		if ( ! empty( $results ) ) {
			$confirmed_emails = array();
			foreach ( $results as $r ) {
				if ( isset( $r['email'], $r['status'] ) && in_array( $r['status'], array( 'SENT', 'TEST_SENT' ), true ) ) {
					$confirmed_emails[] = strtolower( trim( (string) $r['email'] ) );
				}
			}
			if ( $confirmed_emails ) {
				self::confirm_sent_by_emails( $campaign_id, $confirmed_emails );
			}
		}

		if ( $sent_ids ) {
			Mbear_Db::mark_recipients( $sent_ids, 'sent' );
		}
		if ( $err_ids ) {
			Mbear_Db::mark_recipients( $err_ids, 'error' );
		}
		if ( $still_ids ) {
			Mbear_Db::mark_recipients( $still_ids, 'unknown' );
		}

		self::refresh_counts( $campaign_id );

		$remaining = Mbear_Db::count_recipients_by_status( $campaign_id );
		$is_done   = ( 0 === $remaining['pending'] && 0 === $remaining['unknown'] && 0 === $remaining['sending'] );
		if ( $is_done ) {
			Mbear_Db::update_campaign( $campaign_id, array( 'status' => 'completed' ) );
		}

		return array(
			'done'      => $is_done,
			'sent'      => count( $sent_ids ),
			'errors'    => count( $err_ids ),
			'unknown'   => count( $still_ids ),
			'reconciled'=> $recon['confirmed'],
			'report'    => self::build_report( $campaign_id ),
		);
	}

	/**
	 * Mark queue rows as sent when the backend's own result list confirms them.
	 * Only touches rows that are not yet confirmed (pending/unknown/sending).
	 */
	private static function confirm_sent_by_emails( $campaign_id, $emails ) {
		global $wpdb;
		$table = Mbear_Db::table_name( Mbear_Db::RECIPIENTS );
		foreach ( array_chunk( array_unique( $emails ), 100 ) as $chunk ) {
			$now  = current_time( 'mysql' );
			$args = array_merge( array( 'sent', $now, $now, (int) $campaign_id ), $chunk );
			$ph   = implode( ',', array_fill( 0, count( $chunk ), '%s' ) );
			$sql  = "UPDATE {$table} SET status=%s, sent_at=%s, updated_at=%s WHERE campaign_id=%d AND email IN ({$ph}) AND status IN ('pending','unknown','sending')";
			$wpdb->query( $wpdb->prepare( $sql, $args ) ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
		}
	}

	public static function is_quota_error( $message ) {
		$m = strtolower( (string) $message );
		return (
			false !== strpos( $m, 'quota' ) ||
			false !== strpos( $m, 'limit exceeded' ) ||
			false !== strpos( $m, 'too many recipients' ) ||
			false !== strpos( $m, 'daily' ) ||
			false !== strpos( $m, 'rate' )
		);
	}

	public static function refresh_counts( $campaign_id ) {
		$counts = Mbear_Db::count_recipients_by_status( $campaign_id );
		Mbear_Db::update_campaign(
			$campaign_id,
			array(
				'sent_count'    => $counts['sent'],
				'error_count'   => $counts['error'],
				'skipped_count' => $counts['unknown'] + $counts['sending'],
			)
		);
		return $counts;
	}

	public static function build_report( $campaign_id ) {
		$counts = self::refresh_counts( $campaign_id );
		return array(
			'total'     => array_sum( $counts ),
			'sent'      => $counts['sent'],
			'errors'    => $counts['error'],
			'pending'   => $counts['pending'],
			'unknown'   => $counts['unknown'],
			'sending'   => $counts['sending'],
		);
	}
}
