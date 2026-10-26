<?php
/**
 * Client for the existing Madbear Emails Google Apps Script Web App.
 *
 * Request format copied verbatim from popup.js api() / background.js apiFetch():
 *   POST <scriptUrl>
 *   Content-Type: text/plain;charset=utf-8   (deliberate — avoids CORS preflight in
 *                                              the browser; harmless for server requests)
 *   body: JSON.stringify({ action: action, ...payload })
 *
 * Response format from apps-script-backend.js:
 *   { ok: true,  data: ... }   (jsonOk)
 *   { ok: false, error: "..." } (jsonError)
 *
 * NOTE ON AUTHENTICATION (verified from sources):
 *   appsscript.json declares "webapp.access": "MYSELF" and the backend docstring
 *   says deploy with "Who has access: Only myself". The Chrome extension works
 *   because it sends credentials:"include" — the user's Google session cookies
 *   authenticate the request in the browser. A WordPress server has no interactive
 *   Google login, so it cannot use that scheme directly. This is a genuine
 *   technical limitation of Apps Script "Only myself" deployments.
 *
 *   The minimal compatible solution (documented in README and provided as an
 *   OPTIONAL additive patch file apps-script-queue-patch.js) is to keep the same
 *   doPost(e) dispatcher and all existing actions, but re-deploy the Web App so
 *   that anonymous HTTPS calls are accepted ("Anyone with the link"). This does
 *   NOT weaken who can send: executeAs remains USER_DEPLOYING, so every request
 *   still runs against the owner's Gmail/Sheets only — exactly like the extension.
 *   No new authorization system, keys or secrets are introduced by this plugin.
 *   If the deployment stays "Only myself", WordPress cannot authenticate (no
 *   Google browser session on a server) and the exact backend/Google error text
 *   is surfaced to the admin instead of being hidden.
 *
 * @package MadbearEmails
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Mbear_Api {

	const ALLOWED_ACTIONS = array(
		'getBackendInfo',
		'getSpreadsheetInfo',
		'getSheetTabs',
		'getSheetData',
		'listDrafts',
		'sendMerge',
		'sendFollowUp',
		'sendDripStep',
	);

	/**
	 * Perform an action against the configured Apps Script Web App.
	 *
	 * @param string $action One of self::ALLOWED_ACTIONS.
	 * @param array  $payload Extra top-level payload keys (e.g. array('config'=>...)).
	 * @param array  $args    Optional overrides: 'timeout' (seconds).
	 * @return array{ok:bool,data:mixed,error:string|null,http:int|null,transport:?string}
	 */
	public static function request( $action, $payload = array(), $args = array() ) {
		if ( ! in_array( $action, self::ALLOWED_ACTIONS, true ) ) {
			return self::failure( 'Unknown action: ' . $action );
		}

		$url = Mbear_Config::get_script_url();
		if ( '' === $url ) {
			return self::failure( 'No Apps Script URL is set. Open Settings first.' );
		}

		$body = wp_json_encode( array_merge( array( 'action' => $action ), $payload ) );
		if ( false === $body ) {
			return self::failure( 'Could not encode request payload.' );
		}

		$timeout = isset( $args['timeout'] ) ? absint( $args['timeout'] ) : 120;

		$response = wp_remote_post(
			$url,
			array(
				'timeout'     => $timeout,
				'redirection' => 20, // Apps Script responds 302 -> script.googleusercontent.com.
				'headers'     => array( 'Content-Type' => 'text/plain;charset=utf-8' ),
				'body'        => $body,
				'user-agent'  => 'MadbearEmailsWordPress/' . MBEAR_VERSION,
			)
		);

		if ( is_wp_error( $response ) ) {
			return self::failure( $response->get_error_message(), null, 'wp_error' );
		}

		$http_code = (int) wp_remote_retrieve_response_code( $response );
		$text      = wp_remote_retrieve_body( $response );

		$parsed = json_decode( $text, true );
		if ( ! is_array( $parsed ) ) {
			if ( $http_code < 200 || $http_code >= 300 ) {
				return self::failure( 'Request failed with status ' . $http_code . '.', $http_code );
			}
			return self::failure(
				'The Apps Script response was not valid JSON. If the web app is deployed with access "Only myself", WordPress (a server without a Google browser session) cannot authenticate — see the plugin README.',
				$http_code
			);
		}

		if ( ! empty( $parsed['ok'] ) ) {
			return array(
				'ok'       => true,
				'data'     => isset( $parsed['data'] ) ? $parsed['data'] : null,
				'error'    => null,
				'http'     => $http_code,
				'transport' => null,
			);
		}

		return self::failure(
			isset( $parsed['error'] ) ? $parsed['error'] : 'Unknown backend error.',
			$http_code
		);
	}

	/**
	 * Health check via doGet (returns {ok,msg,version,owner}) — used by the
	 * settings screen "Test connection" button. Note: with "Only myself" this
	 * also requires the browser session; on a server it typically returns the
	 * Google sign-in HTML, which surfaces as our JSON parse error above.
	 */
	public static function get_backend_info() {
		return self::request( 'getBackendInfo', array(), array( 'timeout' => 30 ) );
	}

	public static function get_sheet_tabs( $spreadsheet_id ) {
		return self::request( 'getSheetTabs', array( 'spreadsheetId' => $spreadsheet_id ) );
	}

	public static function get_sheet_data( $spreadsheet_id, $tab = '' ) {
		return self::request( 'getSheetData', array( 'spreadsheetId' => $spreadsheet_id, 'tab' => $tab ) );
	}

	public static function list_drafts() {
		return self::request( 'listDrafts' );
	}

	public static function send_merge( $config ) {
		return self::request( 'sendMerge', array( 'config' => $config ), array( 'timeout' => 300 ) );
	}

	public static function send_follow_up( $config ) {
		return self::request( 'sendFollowUp', array( 'config' => $config ), array( 'timeout' => 300 ) );
	}

	public static function send_drip_step( $config ) {
		return self::request( 'sendDripStep', array( 'config' => $config ), array( 'timeout' => 300 ) );
	}

	private static function failure( $message, $http = null, $transport = null ) {
		return array(
			'ok'        => false,
			'data'      => null,
			'error'     => (string) $message,
			'http'      => $http,
			'transport' => $transport,
		);
	}
}
