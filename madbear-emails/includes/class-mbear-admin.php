<?php
/**
 * Admin UI + AJAX endpoints for Madbear Emails.
 *
 * Every screen/AJAX action maps to a real backend action of the existing
 * Google Apps Script Web App (doPost dispatcher in apps-script-backend.js):
 *   getBackendInfo, getSpreadsheetInfo, getSheetTabs, getSheetData,
 *   listDrafts, sendMerge, sendFollowUp, sendDripStep.
 *
 * @package MadbearEmails
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Mbear_Admin {

	const CAPABILITY = 'manage_options';

	public function init() {
		add_action( 'admin_menu', array( $this, 'register_menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue' ) );
		add_action( 'admin_post_mbear_test_connection', array( $this, 'handle_test_connection' ) );

		// AJAX — all handlers verify nonce + capability.
		$actions = array(
			'mbear_backend_info',
			'mbear_sheet_tabs',
			'mbear_sheet_data',
			'mbear_list_drafts',
			'mbear_create_campaign',
			'mbear_populate_campaign',
			'mbear_campaign_status',
			'mbear_run_step',
			'mbear_start_campaign',
			'mbear_pause_campaign',
			'mbear_resume_campaign',
			'mbear_delete_campaign',
			'mbear_save_template',
			'mbear_delete_template',
			'mbear_send_test',
			'mbear_send_follow_up',
			'mbear_send_drip_step',
		);
		foreach ( $actions as $a ) {
			add_action( 'wp_ajax_' . $a, array( Mbear_Admin::class, 'ajax_' . substr( $a, 7 ) ) );
		}
	}

	/* ── Menu / assets ─────────────────────────────────────────────── */

	public function register_menu() {
		add_menu_page(
			__( 'Madbear Emails', 'madbear-emails' ),
			__( 'Madbear Emails', 'madbear-emails' ),
			self::CAPABILITY,
			'mbear-emails',
			array( $this, 'page_settings' ),
			'dashicons-email-alt',
			30
		);
		$page = 'mbear-emails';
		add_submenu_page( $page, __( 'Connection Settings', 'madbear-emails' ), __( 'Settings', 'madbear-emails' ), self::CAPABILITY, 'mbear-emails', array( $this, 'page_settings' ) );
		add_submenu_page( $page, __( 'Sheets & Recipients', 'madbear-emails' ), __( 'Sheets &amp; Recipients', 'madbear-emails' ), self::CAPABILITY, 'mbear-sheets', array( $this, 'page_sheets' ) );
		add_submenu_page( $page, __( 'Email Templates', 'madbear-emails' ), __( 'Templates', 'madbear-emails' ), self::CAPABILITY, 'mbear-templates', array( $this, 'page_templates' ) );
		add_submenu_page( $page, __( 'Campaigns', 'madbear-emails' ), __( 'Campaigns', 'madbear-emails' ), self::CAPABILITY, 'mbear-campaigns', array( $this, 'page_campaigns' ) );
		add_submenu_page( $page, __( 'Send Queue', 'madbear-emails' ), __( 'Queue', 'madbear-emails' ), self::CAPABILITY, 'mbear-queue', array( $this, 'page_queue' ) );
		add_submenu_page( $page, __( 'History & Errors', 'madbear-emails' ), __( 'History &amp; Errors', 'madbear-emails' ), self::CAPABILITY, 'mbear-history', array( $this, 'page_history' ) );
	}

	public function enqueue( $hook ) {
		if ( false === strpos( (string) $hook, 'mbear-' ) && false === strpos( (string) $hook, 'madbear' ) ) {
			return;
		}
		wp_enqueue_style( 'mbear-admin', MBEAR_URL . 'assets/admin.css', array(), MBEAR_VERSION );
		wp_enqueue_script( 'mbear-admin', MBEAR_URL . 'assets/admin.js', array(), MBEAR_VERSION, true );
		wp_localize_script(
			'mbear-admin',
			'mbearAdmin',
			array(
				'ajaxUrl' => admin_url( 'admin-ajax.php' ),
				'nonce'   => wp_create_nonce( 'mbear_admin' ),
				'i18n'    => array(
					'sending'      => __( 'Sending…', 'madbear-emails' ),
					'loading'      => __( 'Loading…', 'madbear-emails' ),
					'confirmStart' => __( 'This will really send emails through your Gmail account via the connected Apps Script backend. Continue?', 'madbear-emails' ),
					'confirmDelete' => __( 'Delete this campaign and its queue? (Already sent emails are not affected.)', 'madbear-emails' ),
					'error'        => __( 'Error', 'madbear-emails' ),
				),
			)
		);
	}

	/**
	 * Guard shared by every AJAX handler: capability + nonce.
	 */
	private static function static_guard() {
		if ( ! current_user_can( self::CAPABILITY ) ) {
			wp_send_json_error( array( 'message' => __( 'Permission denied.', 'madbear-emails' ) ), 403 );
		}
		check_ajax_referer( 'mbear_admin', 'nonce' );
	}

	private static function require_url() {
		if ( '' === Mbear_Config::get_script_url() ) {
			wp_send_json_error( array( 'message' => __( 'Set the Apps Script Web App URL in Settings first.', 'madbear-emails' ) ) );
		}
	}
	public static function ajax_backend_info() {
		self::static_guard();
		self::require_url();
		$res = Mbear_Api::get_backend_info();
		if ( ! $res['ok'] ) {
			wp_send_json_error( array( 'message' => $res['error'], 'http' => $res['http'] ) );
		}
		wp_send_json_success( array( 'data' => $res['data'] ) );
	}

	public static function ajax_sheet_tabs() {
		self::static_guard();
		self::require_url();
		$id  = isset( $_POST['spreadsheet_id'] ) ? sanitize_text_field( wp_unslash( $_POST['spreadsheet_id'] ) ) : '';
		$res = Mbear_Api::get_sheet_tabs( $id );
		$res['ok'] ? wp_send_json_success( array( 'data' => $res['data'] ) ) : wp_send_json_error( array( 'message' => $res['error'] ) );
	}

	public static function ajax_sheet_data() {
		self::static_guard();
		self::require_url();
		$id  = isset( $_POST['spreadsheet_id'] ) ? sanitize_text_field( wp_unslash( $_POST['spreadsheet_id'] ) ) : '';
		$tab = isset( $_POST['tab'] ) ? sanitize_text_field( wp_unslash( $_POST['tab'] ) ) : '';
		$res = Mbear_Api::get_sheet_data( $id, $tab );
		if ( ! $res['ok'] ) {
			wp_send_json_error( array( 'message' => $res['error'] ) );
		}
		$rows  = is_array( $res['data'] ) ? $res['data'] : array();
		$total = max( 0, count( $rows ) - 1 );
		$sent  = 0;
		if ( $total > 0 ) {
			$sent_set = Mbear_Queue::extract_sent_emails( $rows );
			$sent     = count( $sent_set );
		}
		// Preview only — cap output rows for the UI.
		$preview = array_slice( $rows, 0, 51 );
		wp_send_json_success(
			array(
				'data'    => $preview,
				'total'   => $total,
				'already' => $sent,
			)
		);
	}

	public static function ajax_list_drafts() {
		self::static_guard();
		self::require_url();
		$res = Mbear_Api::list_drafts();
		$res['ok'] ? wp_send_json_success( array( 'data' => $res['data'] ) ) : wp_send_json_error( array( 'message' => $res['error'] ) );
	}

	public static function ajax_create_campaign() {
		self::static_guard();
		self::require_url();
		$name = isset( $_POST['name'] ) ? sanitize_text_field( wp_unslash( $_POST['name'] ) ) : __( 'Untitled campaign', 'madbear-emails' );
		$type = isset( $_POST['type'] ) ? sanitize_key( $_POST['type'] ) : 'merge';
		if ( ! in_array( $type, array( 'merge', 'followup', 'drip' ), true ) ) {
			$type = 'merge';
		}
		$config = Mbear_Queue::build_config( wp_unslash( $_POST ) );
		if ( empty( $config['spreadsheetId'] ) && empty( $config['inlineData'] ) ) {
			wp_send_json_error( array( 'message' => __( 'A spreadsheet ID (or inline data) is required.', 'madbear-emails' ) ) );
		}
		$cid = Mbear_Db::insert_campaign(
			array(
				'name'           => $name,
				'type'           => $type,
				'spreadsheet_id' => $config['spreadsheetId'],
				'sheet_tab'      => $config['sheetTab'],
				'config'         => $config,
			)
		);
		if ( ! $cid ) {
			wp_send_json_error( array( 'message' => __( 'Could not create campaign.', 'madbear-emails' ) ) );
		}
		wp_send_json_success( array( 'campaign_id' => $cid ) );
	}

	public static function ajax_populate_campaign() {
		self::static_guard();
		self::require_url();
		$cid = isset( $_POST['campaign_id'] ) ? absint( $_POST['campaign_id'] ) : 0;
		$res = Mbear_Queue::populate_from_sheet( $cid );
		if ( is_wp_error( $res ) ) {
			wp_send_json_error( array( 'message' => $res->get_error_message() ) );
		}
		wp_send_json_success( array( 'stats' => $res, 'report' => Mbear_Queue::build_report( $cid ) ) );
	}

	public static function ajax_campaign_status() {
		self::static_guard();
		$cid      = isset( $_GET['campaign_id'] ) ? absint( $_GET['campaign_id'] ) : 0;
		$campaign = Mbear_Db::get_campaign( $cid );
		if ( ! $campaign ) {
			wp_send_json_error( array( 'message' => __( 'Campaign not found.', 'madbear-emails' ) ) );
		}
		$counts = Mbear_Db::count_recipients_by_status( $cid );
		wp_send_json_success(
			array(
				'status'   => $campaign->status,
				'counts'   => $counts,
				'total'    => (int) $campaign->total_rows,
				'errors'   => (int) $campaign->error_count,
				'lastErr'  => $campaign->last_error,
			)
		);
	}

	public static function ajax_run_step() {
		self::static_guard();
		self::require_url();
		$cid = isset( $_POST['campaign_id'] ) ? absint( $_POST['campaign_id'] ) : 0;
		$out = Mbear_Queue::run_step( $cid );
		wp_send_json_success( $out );
	}

	public static function ajax_start_campaign() {
		self::static_guard();
		self::require_url();
		$cid      = isset( $_POST['campaign_id'] ) ? absint( $_POST['campaign_id'] ) : 0;
		$campaign = Mbear_Db::get_campaign( $cid );
		if ( ! $campaign ) {
			wp_send_json_error( array( 'message' => __( 'Campaign not found.', 'madbear-emails' ) ) );
		}
		$counts = Mbear_Db::count_recipients_by_status( $cid );
		if ( 0 === $counts['pending'] + $counts['unknown'] + $counts['sending'] ) {
			// Populate on first start (mirrors extension: it reads the sheet at send time).
			$res = Mbear_Queue::populate_from_sheet( $cid );
			if ( is_wp_error( $res ) ) {
				wp_send_json_error( array( 'message' => $res->get_error_message() ) );
			}
		}
		Mbear_Db::update_campaign( $cid, array( 'status' => 'running', 'last_error' => '' ) );
		wp_send_json_success( array( 'report' => Mbear_Queue::build_report( $cid ) ) );
	}

	public static function ajax_pause_campaign() {
		self::static_guard();
		$cid = isset( $_POST['campaign_id'] ) ? absint( $_POST['campaign_id'] ) : 0;
		Mbear_Db::update_campaign( $cid, array( 'status' => 'paused' ) );
		wp_send_json_success( array( 'report' => Mbear_Queue::build_report( $cid ) ) );
	}

	public static function ajax_resume_campaign() {
		self::static_guard();
		self::require_url();
		$cid      = isset( $_POST['campaign_id'] ) ? absint( $_POST['campaign_id'] ) : 0;
		$campaign = Mbear_Db::get_campaign( $cid );
		if ( ! $campaign ) {
			wp_send_json_error( array( 'message' => __( 'Campaign not found.', 'madbear-emails' ) ) );
		}
		// Resume: reconcile unknown rows against the sheet BEFORE any new send.
		$recon = Mbear_Queue::reconcile_unknown( $cid );
		Mbear_Db::update_campaign( $cid, array( 'status' => 'running', 'last_error' => '' ) );
		wp_send_json_success(
			array(
				'report'   => Mbear_Queue::build_report( $cid ),
				'reconciled' => $recon['confirmed'],
				'requeued'   => $recon['restored'],
			)
		);
	}

	public static function ajax_delete_campaign() {
		self::static_guard();
		$cid = isset( $_POST['campaign_id'] ) ? absint( $_POST['campaign_id'] ) : 0;
		Mbear_Db::delete_campaign( $cid );
		wp_send_json_success( array( 'deleted' => $cid ) );
	}

	public static function ajax_save_template() {
		self::static_guard();
		$id      = isset( $_POST['template_id'] ) ? absint( $_POST['template_id'] ) : 0;
		$data    = isset( $_POST['template'] ) && is_array( $_POST['template'] ) ? wp_unslash( $_POST['template'] ) : array(); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput -- sanitized inside Mbear_Db::save_template
		$new_id  = Mbear_Db::save_template( $data, $id );
		wp_send_json_success( array( 'template_id' => $new_id ) );
	}

	public static function ajax_delete_template() {
		self::static_guard();
		$id = isset( $_POST['template_id'] ) ? absint( $_POST['template_id'] ) : 0;
		Mbear_Db::delete_template( $id );
		wp_send_json_success( array( 'deleted' => $id ) );
	}

	/**
	 * Test send — exactly the extension's testMode flag on sendMerge:
	 * backend sends only to config.testEmail and records nothing in the sheet.
	 */
	public static function ajax_send_test() {
		self::static_guard();
		self::require_url();
		$to = isset( $_POST['test_email'] ) ? sanitize_email( wp_unslash( $_POST['test_email'] ) ) : '';
		if ( ! is_email( $to ) ) {
			wp_send_json_error( array( 'message' => __( 'Enter a valid test email address.', 'madbear-emails' ) ) );
		}
		$config = Mbear_Queue::build_config( wp_unslash( $_POST ) );
		if ( empty( $config['spreadsheetId'] ) ) {
			wp_send_json_error( array( 'message' => __( 'Spreadsheet ID is required even for a test send (the backend merges row data from it).', 'madbear-emails' ) ) );
		}
		if ( empty( $config['subject'] ) || ( empty( $config['body'] ) && empty( $config['htmlBody'] ) ) ) {
			wp_send_json_error( array( 'message' => __( 'Subject and body are required.', 'madbear-emails' ) ) );
		}
		$config['testMode']  = true;
		$config['testEmail'] = $to;
		$res = Mbear_Api::send_merge( $config );
		$res['ok'] ? wp_send_json_success( array( 'data' => $res['data'] ) ) : wp_send_json_error( array( 'message' => $res['error'] ) );
	}

	/**
	 * Follow-up via the existing sendFollowUp action.
	 * Config keys identical to popup.js follow-up flow:
	 * spreadsheetId, sheetTab, subject, body/htmlBody, selectedEmails, noThread, delayMs.
	 */
	public static function ajax_send_follow_up() {
		self::static_guard();
		self::require_url();
		$cid = isset( $_POST['campaign_id'] ) ? absint( $_POST['campaign_id'] ) : 0;
		$campaign = Mbear_Db::get_campaign( $cid );
		if ( ! $campaign ) {
			wp_send_json_error( array( 'message' => __( 'Campaign not found.', 'madbear-emails' ) ) );
		}
		$config = $campaign->config_arr;
		$config['subject']  = isset( $_POST['subject'] ) ? sanitize_text_field( wp_unslash( $_POST['subject'] ) ) : $config['subject'];
		$config['body']     = isset( $_POST['body'] ) ? wp_kses_post( wp_unslash( $_POST['body'] ) ) : $config['body'];
		$config['htmlBody'] = isset( $_POST['html_body'] ) ? wp_kses_post( wp_unslash( $_POST['html_body'] ) ) : ( isset( $config['htmlBody'] ) ? $config['htmlBody'] : '' );
		$config['noThread'] = ! empty( $_POST['no_thread'] );
		$config['delayMs']  = isset( $_POST['delay_ms'] ) ? min( 5000, max( 0, absint( $_POST['delay_ms'] ) ) ) : 500;
		unset( $config['draftId'] ); // sendFollowUp does not resolve drafts.

		// Target only recipients already confirmed SENT in this campaign.
		$rows   = Mbear_Db::list_recipients( $cid, array( 'sent' ), 500, 0 );
		$emails = array();
		foreach ( $rows as $r ) {
			$emails[] = $r->email;
		}
		if ( empty( $emails ) ) {
			wp_send_json_error( array( 'message' => __( 'No confirmed SENT recipients for this campaign yet.', 'madbear-emails' ) ) );
		}
		$config['selectedEmails'] = $emails;
		$res = Mbear_Api::send_follow_up( $config );
		$res['ok'] ? wp_send_json_success( array( 'data' => $res['data'] ) ) : wp_send_json_error( array( 'message' => $res['error'] ) );
	}

	/**
	 * Drip step via the existing sendDripStep action.
	 * Backend requires columns like DripStepN in the sheet and Status == SENT,
	 * and schedules future sends itself (see sendDripStep source).
	 */
	public static function ajax_send_drip_step() {
		self::static_guard();
		self::require_url();
		$cid   = isset( $_POST['campaign_id'] ) ? absint( $_POST['campaign_id'] ) : 0;
		$step  = isset( $_POST['step_index'] ) ? absint( $_POST['step_index'] ) : 0;
		$campaign = Mbear_Db::get_campaign( $cid );
		if ( ! $campaign ) {
			wp_send_json_error( array( 'message' => __( 'Campaign not found.', 'madbear-emails' ) ) );
		}
		$config         = $campaign->config_arr;
		$config['stepIndex'] = $step;
		$res = Mbear_Api::send_drip_step( $config );
		$res['ok'] ? wp_send_json_success( array( 'data' => $res['data'] ) ) : wp_send_json_error( array( 'message' => $res['error'] ) );
	}

	/* ── Settings form (classic POST + nonce, like WP core) ────────── */

	public function handle_test_connection() {
		if ( ! current_user_can( self::CAPABILITY ) ) {
			wp_die( esc_html__( 'Permission denied.', 'madbear-emails' ) );
		}
		check_admin_referer( 'mbear_settings' );
		$res = Mbear_Api::get_backend_info();
		$msg = $res['ok']
			? sprintf( /* translators: %s owner email */ __( 'Connection OK. Backend sender account: %s', 'madbear-emails' ), esc_html( is_array( $res['data'] ) && isset( $res['data']['owner'] ) ? $res['data']['owner'] : '?' ) )
			: sprintf( /* translators: %s error */ __( 'Connection failed: %s', 'madbear-emails' ), esc_html( $res['error'] ) );
		set_transient( 'mbear_conn_notice_' . get_current_user_id(), $msg, 60 );
		wp_safe_redirect( admin_url( 'admin.php?page=mbear-emails' ) );
		exit;
	}

	private function render_nav() {
		$current = isset( $_GET['page'] ) ? sanitize_key( $_GET['page'] ) : 'mbear-emails'; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$items   = array(
			'mbear-emails'    => __( 'Settings', 'madbear-emails' ),
			'mbear-sheets'    => __( 'Sheets & Recipients', 'madbear-emails' ),
			'mbear-templates' => __( 'Templates', 'madbear-emails' ),
			'mbear-campaigns' => __( 'Campaigns', 'madbear-emails' ),
			'mbear-queue'     => __( 'Queue', 'madbear-emails' ),
			'mbear-history'   => __( 'History & Errors', 'madbear-emails' ),
		);
		echo '<h1 class="mbear-title">' . esc_html__( 'Madbear Emails', 'madbear-emails' ) . '</h1><nav class="mbear-nav">';
		foreach ( $items as $slug => $label ) {
			$url     = admin_url( 'admin.php?page=' . $slug );
			$active  = ( $slug === $current ) ? ' mbear-active' : '';
			echo '<a class="mbear-nav-item' . esc_attr( $active ) . '" href="' . esc_url( $url ) . '">' . esc_html( $label ) . '</a>';
		}
		echo '</nav>';
	}

	/* ── Pages ─────────────────────────────────────────────────────── */

	public function page_settings() {
		if ( isset( $_POST['mbear_save'] ) && check_admin_referer( 'mbear_settings' ) ) {
			$result = Mbear_Config::update_settings( wp_unslash( $_POST ) );
			if ( is_wp_error( $result ) ) {
				echo '<div class="notice notice-error"><p>' . esc_html( $result->get_error_message() ) . '</p></div>';
			} else {
				echo '<div class="notice notice-success"><p>' . esc_html__( 'Settings saved.', 'madbear-emails' ) . '</p></div>';
			}
		}
		$notice = get_transient( 'mbear_conn_notice_' . get_current_user_id() );
		if ( $notice ) {
			delete_transient( 'mbear_conn_notice_' . get_current_user_id() );
			echo '<div class="notice notice-info"><p>' . esc_html( $notice ) . '</p></div>';
		}
		$s = Mbear_Config::get_settings();
		?>
		<div class="wrap mbear-wrap"><?php $this->render_nav(); ?>
		<p class="mbear-hint"><?php esc_html_e( 'These are the only two settings the Chrome extension stores: the Apps Script Web App URL (chrome.storage key "mb_script_url") and a Gmail-account label used purely for display. The actual sender is the Google account that deployed the Apps Script ("Execute as: Me"); the backend reports it via getBackendInfo().', 'madbear-emails' ); ?></p>
		<form method="post">
			<?php wp_nonce_field( 'mbear_settings' ); ?>
			<table class="form-table" role="presentation">
				<tr>
					<th scope="row"><label for="mbear_gmail"><?php esc_html_e( 'Gmail account (label)', 'madbear-emails' ); ?></label></th>
					<td><input type="email" id="mbear_gmail" name="gmail_account" class="regular-text" value="<?php echo esc_attr( $s['gmail_account'] ); ?>" placeholder="you@gmail.com" />
					<p class="description"><?php esc_html_e( 'Display label only — matches the extension. Sender identity comes from the Apps Script deployment.', 'madbear-emails' ); ?></p></td>
				</tr>
				<tr>
					<th scope="row"><label for="mbear_url"><?php esc_html_e( 'Apps Script Web App URL', 'madbear-emails' ); ?></label></th>
					<td><input type="url" id="mbear_url" name="script_url" class="large-text" value="<?php echo esc_attr( $s['script_url'] ); ?>" placeholder="https://script.google.com/macros/s/.../exec" />
					<p class="description"><?php esc_html_e( 'Must start with https://script.google.com/macros/s/ (same validation as the extension).', 'madbear-emails' ); ?></p></td>
				</tr>
			</table>
			<?php submit_button( __( 'Save settings', 'madbear-emails' ), 'primary', 'mbear_save' ); ?>
		</form>
		<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" style="margin-top:10px;">
			<?php wp_nonce_field( 'mbear_settings' ); ?>
			<input type="hidden" name="action" value="mbear_test_connection" />
			<?php submit_button( __( 'Test connection (calls getBackendInfo)', 'madbear-emails' ), 'secondary', 'submit', false ); ?>
		</form>
		<p><button type="button" class="button" id="mbear-test-ajax"><?php esc_html_e( 'Test connection inline (AJAX)', 'madbear-emails' ); ?></button></p>
<div id="mbear-settings-msg" class="mbear-call"></div>
		</div>
		<?php
	}

	public function page_sheets() {
		?>
		<div class="wrap mbear-wrap"><?php $this->render_nav(); ?>
		<p class="mbear-hint"><?php esc_html_e( 'Read live data through the existing backend actions getSheetTabs and getSheetData. Rows whose Status column equals SENT are counted as already delivered — the backend skips them on send.', 'madbear-emails' ); ?></p>
		<div class="mbear-card">
			<label for="mbear-sheet-id"><?php esc_html_e( 'Spreadsheet ID or full URL', 'madbear-emails' ); ?></label>
			<input type="text" id="mbear-sheet-id" class="large-text code" placeholder="https://docs.google.com/spreadsheets/d/<ID>/edit" />
			<p>
				<button type="button" class="button" id="mbear-load-tabs"><?php esc_html_e( 'Load tabs', 'madbear-emails' ); ?></button>
				<select id="mbear-tab-select" style="display:none;"></select>
				<button type="button" class="button button-primary" id="mbear-load-data" style="display:none;"><?php esc_html_e( 'Preview rows', 'madbear-emails' ); ?></button>
			</p>
			<div id="mbear-sheet-out" class="mbear-call"></div>
		</div>
		</div>
		<?php
	}

	public function page_templates() {
		$templates = Mbear_Db::list_templates();
		?>
		<div class="wrap mbear-wrap"><?php $this->render_nav(); ?>
		<p class="mbear-hint"><?php esc_html_e( 'The extension uses Gmail drafts as templates (listDrafts). Drafts are listed below and can be referenced by draftId when creating a campaign. You can also save composed messages locally.', 'madbear-emails' ); ?></p>
		<div class="mbear-card">
			<h2><?php esc_html_e( 'Gmail drafts (from backend)', 'madbear-emails' ); ?></h2>
			<button type="button" class="button" id="mbear-load-drafts"><?php esc_html_e( 'Refresh drafts', 'madbear-emails' ); ?></button>
			<p><label><?php esc_html_e( 'Convert selected draft into a local template:', 'madbear-emails' ); ?>
				<select id="tpl-from-draft"><option value=""><?php esc_html_e( '— load drafts first —', 'madbear-emails' ); ?></option></select>
				<button type="button" class="button" id="mbear-fill-from-draft"><?php esc_html_e( 'Fill form', 'madbear-emails' ); ?></button>
			</label></p>
			<div id="mbear-drafts-out" class="mbear-call"></div>
		</div>
		<div class="mbear-card">
			<h2><?php esc_html_e( 'Saved templates', 'madbear-emails' ); ?></h2>
			<table class="widefat striped" id="mbear-template-list">
				<thead><tr>
					<th>ID</th><th><?php esc_html_e( 'Name', 'madbear-emails' ); ?></th>
					<th><?php esc_html_e( 'Subject', 'madbear-emails' ); ?></th>
					<th><?php esc_html_e( 'From name', 'madbear-emails' ); ?></th>
					<th><?php esc_html_e( 'Reply-To', 'madbear-emails' ); ?></th>
					<th></th>
				</tr></thead>
				<tbody>
				<?php foreach ( $templates as $t ) : ?>
					<tr data-template="<?php echo esc_attr( wp_json_encode( $t ) ); ?>">
						<td><?php echo (int) $t->id; ?></td>
						<td><?php echo esc_html( $t->name ); ?></td>
						<td><?php echo esc_html( $t->subject ); ?></td>
						<td><?php echo esc_html( $t->from_name ); ?></td>
						<td><?php echo esc_html( $t->reply_to ); ?></td>
						<td>
							<button type="button" class="button-link mbear-tpl-edit"><?php esc_html_e( 'Edit', 'madbear-emails' ); ?></button>
							<button type="button" class="button-link mbear-tpl-del" data-id="<?php echo (int) $t->id; ?>"><?php esc_html_e( 'Delete', 'madbear-emails' ); ?></button>
						</td>
					</tr>
				<?php endforeach; ?>
				</tbody>
			</table>
			<h2><?php esc_html_e( 'New / edit template', 'madbear-emails' ); ?></h2>
			<form id="mbear-template-form">
				<input type="hidden" id="tpl-id" name="template_id" value="0" />
				<p><label><?php esc_html_e( 'Name', 'madbear-emails' ); ?> <input type="text" id="tpl-name" class="regular-text" /></label></p>
				<p><label><?php esc_html_e( 'Subject', 'madbear-emails' ); ?> <input type="text" id="tpl-subject" class="large-text" /></label></p>
				<p><label><?php esc_html_e( 'Plain body ({{Column}} placeholders supported by backend)', 'madbear-emails' ); ?><br /><textarea id="tpl-body" class="large-text" rows="6"></textarea></label></p>
				<p><label><?php esc_html_e( 'HTML body (optional)', 'madbear-emails' ); ?><br /><textarea id="tpl-html" class="large-text" rows="6"></textarea></label></p>
				<p>
					<label><?php esc_html_e( 'From name', 'madbear-emails' ); ?> <input type="text" id="tpl-from" /></label>
					<label><?php esc_html_e( 'Reply-To', 'madbear-emails' ); ?> <input type="email" id="tpl-reply" /></label>
					<label><?php esc_html_e( 'CC', 'madbear-emails' ); ?> <input type="text" id="tpl-cc" /></label>
					<label><?php esc_html_e( 'BCC', 'madbear-emails' ); ?> <input type="text" id="tpl-bcc" /></label>
				</p>
				<button type="button" class="button button-primary" id="mbear-tpl-save"><?php esc_html_e( 'Save template', 'madbear-emails' ); ?></button>
			</form>
			<div id="mbear-tpl-msg" class="mbear-call"></div>
		</div>
		</div>
		<?php
	}

	public function page_campaigns() {
		$campaigns = Mbear_Db::list_campaigns( 100 );
		?>
		<div class="wrap mbear-wrap"><?php $this->render_nav(); ?>
		<div class="mbear-card">
			<h2><?php esc_html_e( 'Create campaign', 'madbear-emails' ); ?></h2>
			<p class="mbear-hint"><?php esc_html_e( 'Builds the same config object that popup.js doSend() posts to sendMerge: spreadsheetId, sheetTab, draftId, subject, body, htmlBody, fromName, replyTo, cc, bcc, delayMs (0–5000).', 'madbear-emails' ); ?></p>
			<form id="mbear-campaign-form">
				<table class="form-table" role="presentation">
					<tr><th><label for="camp-name"><?php esc_html_e( 'Campaign name', 'madbear-emails' ); ?></label></th>
						<td><input type="text" id="camp-name" class="regular-text" /></td></tr>
					<tr><th><label for="camp-sheet"><?php esc_html_e( 'Spreadsheet ID / URL', 'madbear-emails' ); ?></label></th>
						<td><input type="text" id="camp-sheet" class="large-text code" required /></td></tr>
					<tr><th><label for="camp-tab"><?php esc_html_e( 'Sheet tab', 'madbear-emails' ); ?></label></th>
						<td><input type="text" id="camp-tab" class="regular-text" value="Sheet1" /></td></tr>
					<tr><th><label for="camp-draft"><?php esc_html_e( 'Gmail draft ID (optional — acts as template)', 'madbear-emails' ); ?></label></th>
						<td><input type="text" id="camp-draft" class="regular-text" />
						<button type="button" class="button" id="camp-pick-draft"><?php esc_html_e( 'Pick from drafts', 'madbear-emails' ); ?></button>
						<span id="camp-draft-list"></span></td></tr>
					<tr><th><label for="camp-subject"><?php esc_html_e( 'Subject', 'madbear-emails' ); ?></label></th>
						<td><input type="text" id="camp-subject" class="large-text" /></td></tr>
					<tr><th><label for="camp-body"><?php esc_html_e( 'Plain body', 'madbear-emails' ); ?></label></th>
						<td><textarea id="camp-body" class="large-text" rows="8"></textarea></td></tr>
					<tr><th><label for="camp-html"><?php esc_html_e( 'HTML body (optional)', 'madbear-emails' ); ?></label></th>
						<td><textarea id="camp-html" class="large-text" rows="8"></textarea></td></tr>
					<tr><th><label for="camp-from"><?php esc_html_e( 'From name', 'madbear-emails' ); ?></label></th>
						<td><input type="text" id="camp-from" class="regular-text" /></td></tr>
					<tr><th><label for="camp-reply"><?php esc_html_e( 'Reply-To', 'madbear-emails' ); ?></label></th>
						<td><input type="email" id="camp-reply" class="regular-text" /></td></tr>
					<tr><th><label for="camp-cc"><?php esc_html_e( 'CC', 'madbear-emails' ); ?></label></th>
						<td><input type="text" id="camp-cc" class="regular-text" /></td></tr>
					<tr><th><label for="camp-bcc"><?php esc_html_e( 'BCC', 'madbear-emails' ); ?></label></th>
						<td><input type="text" id="camp-bcc" class="regular-text" /></td></tr>
					<tr><th><label for="camp-delay"><?php esc_html_e( 'Delay between sends (ms, 0–5000)', 'madbear-emails' ); ?></label></th>
						<td><input type="number" id="camp-delay" min="0" max="5000" step="100" value="500" /></td></tr>
				</table>
				<button type="button" class="button button-primary" id="mbear-create-campaign"><?php esc_html_e( 'Create campaign', 'madbear-emails' ); ?></button>
				<button type="button" class="button" id="mbear-test-send"><?php esc_html_e( 'Send test to…', 'madbear-emails' ); ?></button>
				<input type="email" id="camp-test-email" placeholder="you@gmail.com" />
			</form>
			<div id="mbear-campaign-msg" class="mbear-call"></div>
		</div>
		<div class="mbear-card">
			<h2><?php esc_html_e( 'Existing campaigns', 'madbear-emails' ); ?></h2>
			<table class="widefat striped">
				<thead><tr>
					<th>ID</th><th><?php esc_html_e( 'Name', 'madbear-emails' ); ?></th>
					<th><?php esc_html_e( 'Status', 'madbear-emails' ); ?></th>
					<th><?php esc_html_e( 'Total', 'madbear-emails' ); ?></th>
					<th><?php esc_html_e( 'Sent', 'madbear-emails' ); ?></th>
					<th><?php esc_html_e( 'Errors', 'madbear-emails' ); ?></th>
					<th><?php esc_html_e( 'Actions', 'madbear-emails' ); ?></th>
				</tr></thead>
				<tbody>
				<?php foreach ( $campaigns as $c ) : ?>
					<tr data-cid="<?php echo (int) $c->id; ?>">
						<td><?php echo (int) $c->id; ?></td>
						<td><?php echo esc_html( $c->name ); ?></td>
						<td><span class="mbear-status mbear-status-<?php echo esc_attr( $c->status ); ?>"><?php echo esc_html( $c->status ); ?></span></td>
						<td class="c-total"><?php echo (int) $c->total_rows; ?></td>
						<td class="c-sent"><?php echo (int) $c->sent_count; ?></td>
						<td class="c-errors"><?php echo (int) $c->error_count; ?></td>
						<td>
							<button type="button" class="button mbear-start"><?php esc_html_e( 'Start', 'madbear-emails' ); ?></button>
							<a class="button" href="<?php echo esc_url( admin_url( 'admin.php?page=mbear-queue&campaign_id=' . (int) $c->id ) ); ?>"><?php esc_html_e( 'Open queue', 'madbear-emails' ); ?></a>
							<button type="button" class="button-link mbear-del" data-id="<?php echo (int) $c->id; ?>"><?php esc_html_e( 'Delete', 'madbear-emails' ); ?></button>
						</td>
					</tr>
				<?php endforeach; ?>
				</tbody>
			</table>
		</div>
		</div>
		<?php
	}

	public function page_queue() {
		$cid = isset( $_GET['campaign_id'] ) ? absint( $_GET['campaign_id'] ) : 0;
		$campaign = $cid ? Mbear_Db::get_campaign( $cid ) : null;
		$campaigns = Mbear_Db::list_campaigns( 100 );
		?>
		<div class="wrap mbear-wrap"><?php $this->render_nav(); ?>
		<div class="mbear-card">
			<label for="mbear-queue-camp"><?php esc_html_e( 'Campaign', 'madbear-emails' ); ?></label>
			<select id="mbear-queue-camp" data-current="<?php echo (int) $cid; ?>">
				<option value="0"><?php esc_html_e( '— select —', 'madbear-emails' ); ?></option>
				<?php foreach ( $campaigns as $c ) : ?>
					<option value="<?php echo (int) $c->id; ?>" <?php selected( $cid, (int) $c->id ); ?>><?php echo esc_html( '#' . $c->id . ' ' . $c->name ); ?></option>
				<?php endforeach; ?>
			</select>
			<span id="mbear-queue-status" class="mbear-status"><?php echo $campaign ? esc_html( $campaign->status ) : ''; ?></span>
		</div>
		<div class="mbear-card" id="mbear-queue-panel" <?php echo $campaign ? '' : 'style="display:none;"'; ?>>
			<h2><?php esc_html_e( 'Queue control', 'madbear-emails' ); ?></h2>
			<div class="mbear-counters" data-cid="<?php echo (int) $cid; ?>">
				<div><span class="mbear-num" id="q-total"><?php echo $campaign ? (int) $campaign->total_rows : 0; ?></span><label><?php esc_html_e( 'Recipients', 'madbear-emails' ); ?></label></div>
				<div><span class="mbear-num mbear-green" id="q-sent">0</span><label><?php esc_html_e( 'Sent', 'madbear-emails' ); ?></label></div>
				<div><span class="mbear-num mbear-red" id="q-errors">0</span><label><?php esc_html_e( 'Errors', 'madbear-emails' ); ?></label></div>
				<div><span class="mbear-num" id="q-pending">0</span><label><?php esc_html_e( 'Remaining', 'madbear-emails' ); ?></label></div>
				<div><span class="mbear-num mbear-orange" id="q-unknown">0</span><label><?php esc_html_e( 'Unconfirmed', 'madbear-emails' ); ?></label></div>
			</div>
			<p>
				<button type="button" class="button button-primary" id="q-start"><?php esc_html_e( 'Start sending', 'madbear-emails' ); ?></button>
				<button type="button" class="button" id="q-pause"><?php esc_html_e( 'Pause', 'madbear-emails' ); ?></button>
				<button type="button" class="button" id="q-resume"><?php esc_html_e( 'Resume', 'madbear-emails' ); ?></button>
				<button type="button" class="button" id="q-refresh"><?php esc_html_e( 'Refresh', 'madbear-emails' ); ?></button>
			</p>
			<p class="mbear-hint"><?php esc_html_e( 'Each step sends one batch (≤50 recipients) through the existing sendMerge action and applies the backend\'s authoritative per-row answers (SENT/SKIPPED/ERROR). After a timeout, unconfirmed rows are reconciled against the sheet Status column before any retry — no duplicate sends.', 'madbear-emails' ); ?></p>
			<div id="mbear-queue-log" class="mbear-log"></div>
		</div>
		</div>
		<?php
	}

	public function page_history() {
		$cid  = isset( $_GET['campaign_id'] ) ? absint( $_GET['campaign_id'] ) : 0;
		$status_filter = isset( $_GET['status'] ) ? sanitize_key( $_GET['status'] ) : 'error';
		$allowed = array( 'pending', 'sending', 'sent', 'error', 'unknown' );
		if ( ! in_array( $status_filter, $allowed, true ) ) {
			$status_filter = 'error';
		}
		$paged   = isset( $_GET['paged'] ) ? max( 1, absint( $_GET['paged'] ) ) : 1;
		$per     = 100;
		$offset  = ( $paged - 1 ) * $per;
		$rows    = $cid ? Mbear_Db::list_recipients( $cid, array( $status_filter ), $per, $offset ) : array();
		$campaigns = Mbear_Db::list_campaigns( 100 );
		?>
		<div class="wrap mbear-wrap"><?php $this->render_nav(); ?>
		<div class="mbear-card">
			<h2><?php esc_html_e( 'Per-recipient results', 'madbear-emails' ); ?></h2>
			<form method="get">
				<input type="hidden" name="page" value="mbear-history" />
				<label><?php esc_html_e( 'Campaign', 'madbear-emails' ); ?></label>
				<select name="campaign_id">
					<option value="0"><?php esc_html_e( '— select —', 'madbear-emails' ); ?></option>
					<?php foreach ( $campaigns as $c ) : ?>
						<option value="<?php echo (int) $c->id; ?>" <?php selected( $cid, (int) $c->id ); ?>><?php echo esc_html( '#' . $c->id . ' ' . $c->name ); ?></option>
					<?php endforeach; ?>
				</select>
				<label><?php esc_html_e( 'Status', 'madbear-emails' ); ?></label>
				<select name="status">
					<?php foreach ( $allowed as $st ) : ?>
						<option value="<?php echo esc_attr( $st ); ?>" <?php selected( $status_filter, $st ); ?>><?php echo esc_html( $st ); ?></option>
					<?php endforeach; ?>
				</select>
				<?php submit_button( __( 'Filter', 'madbear-emails' ), 'secondary', 'submit', false ); ?>
			</form>
			<?php if ( $cid ) : ?>
			<table class="widefat striped">
				<thead><tr>
					<th><?php esc_html_e( 'Row', 'madbear-emails' ); ?></th>
					<th><?php esc_html_e( 'Email', 'madbear-emails' ); ?></th>
					<th><?php esc_html_e( 'Status', 'madbear-emails' ); ?></th>
					<th><?php esc_html_e( 'Attempts', 'madbear-emails' ); ?></th>
					<th><?php esc_html_e( 'Backend result', 'madbear-emails' ); ?></th>
					<th><?php esc_html_e( 'Sent at', 'madbear-emails' ); ?></th>
				</tr></thead>
				<tbody>
				<?php
				if ( empty( $rows ) ) {
					echo '<tr><td colspan="6">' . esc_html__( 'No records.', 'madbear-emails' ) . '</td></tr>';
				}
				foreach ( $rows as $r ) :
					$decoded = $r->result ? json_decode( $r->result, true ) : null;
					?>
					<tr>
						<td><?php echo (int) $r->row_index; ?></td>
						<td><?php echo esc_html( $r->email ); ?></td>
						<td><span class="mbear-status mbear-status-<?php echo esc_attr( $r->status ); ?>"><?php echo esc_html( $r->status ); ?></span></td>
						<td><?php echo (int) $r->attempts; ?></td>
						<td><code><?php echo esc_html( is_array( $decoded ) ? json_encode( $decoded ) : (string) $r->result ); ?></code></td>
						<td><?php echo esc_html( $r->sent_at ); ?></td>
					</tr>
				<?php endforeach; ?>
				</tbody>
			</table>
			<p>
				<?php if ( $offset > 0 ) : ?>
					<a class="button" href="<?php echo esc_url( add_query_arg( array( 'paged' => $paged - 1 ) ) ); ?>"><?php esc_html_e( 'Previous', 'madbear-emails' ); ?></a>
				<?php endif; ?>
				<?php if ( count( $rows ) === $per ) : ?>
					<a class="button" href="<?php echo esc_url( add_query_arg( array( 'paged' => $paged + 1 ) ) ); ?>"><?php esc_html_e( 'Next', 'madbear-emails' ); ?></a>
				<?php endif; ?>
			</p>
			<?php else : ?>
				<p class="mbear-hint"><?php esc_html_e( 'Select a campaign to see stored per-recipient outcomes.', 'madbear-emails' ); ?></p>
			<?php endif; ?>
		</div>
		<div class="mbear-card">
			<h2><?php esc_html_e( 'Campaign errors', 'madbear-emails' ); ?></h2>
			<table class="widefat striped">
				<thead><tr><th>ID</th><th><?php esc_html_e( 'Name', 'madbear-emails' ); ?></th><th><?php esc_html_e( 'Status', 'madbear-emails' ); ?></th><th><?php esc_html_e( 'Last error', 'madbear-emails' ); ?></th><th><?php esc_html_e( 'Updated', 'madbear-emails' ); ?></th></tr></thead>
				<tbody>
				<?php foreach ( $campaigns as $c ) : if ( empty( $c->last_error ) ) { continue; } ?>
					<tr><td><?php echo (int) $c->id; ?></td><td><?php echo esc_html( $c->name ); ?></td>
					<td><span class="mbear-status mbear-status-<?php echo esc_attr( $c->status ); ?>"><?php echo esc_html( $c->status ); ?></span></td>
					<td><code><?php echo esc_html( $c->last_error ); ?></code></td>
					<td><?php echo esc_html( $c->updated_at ); ?></td></tr>
				<?php endforeach; ?>
				</tbody>
			</table>
		</div>
		<div class="mbear-card">
			<h2><?php esc_html_e( 'Follow-up & drip (existing backend actions)', 'madbear-emails' ); ?></h2>
			<p class="mbear-hint"><?php esc_html_e( 'Follow-ups go through sendFollowUp (threads the original message unless "new message" is checked; targets only recipients confirmed SENT in the selected campaign). Drip steps go through sendDripStep and require DripStepN columns in the sheet, as implemented by the backend.', 'madbear-emails' ); ?></p>
			<label><?php esc_html_e( 'Campaign', 'madbear-emails' ); ?></label>
			<select id="fu-campaign">
				<?php foreach ( $campaigns as $c ) : ?>
					<option value="<?php echo (int) $c->id; ?>"><?php echo esc_html( '#' . $c->id . ' ' . $c->name ); ?></option>
				<?php endforeach; ?>
			</select>
			<p><input type="text" id="fu-subject" class="large-text" placeholder="<?php esc_attr_e( 'Follow-up subject', 'madbear-emails' ); ?>" />
			<textarea id="fu-body" class="large-text" rows="5" placeholder="<?php esc_attr_e( 'Follow-up body', 'madbear-emails' ); ?>"></textarea>
			<label><input type="checkbox" id="fu-nothread" value="1" /> <?php esc_html_e( 'Send as new message (no thread)', 'madbear-emails' ); ?></label></p>
			<button type="button" class="button" id="mbear-send-followup"><?php esc_html_e( 'Send follow-up', 'madbear-emails' ); ?></button>
			&nbsp;
			<label><?php esc_html_e( 'Drip step index', 'madbear-emails' ); ?> <input type="number" id="drip-step" min="1" max="10" value="1" style="width:70px;" /></label>
			<button type="button" class="button" id="mbear-send-drip"><?php esc_html_e( 'Run drip step', 'madbear-emails' ); ?></button>
			<div id="mbear-fu-msg" class="mbear-call"></div>
		</div>
		</div>
		<?php
	}
}
