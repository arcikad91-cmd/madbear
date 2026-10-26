<?php
/**
 * Plugin configuration helpers.
 *
 * Settings mirror the Chrome extension exactly:
 *  - script_url    -> "Apps Script Web App URL" (popup.js, chrome.storage key mb_script_url)
 *  - gmail_account -> "Gmail account (label)" — a purely informational label
 *                     (popup.js addBackend(): S.scriptUrls.push({ url, email }))
 *
 * The sender is NOT chosen by this label. It is determined by the Google
 * account that deployed the Apps Script Web App ("Execute as: Me",
 * appsscript.json executeAs=USER_DEPLOYING). The backend reports it via
 * getBackendInfo().owner / doGet().owner.
 *
 * @package MadbearEmails
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Mbear_Config {

	const OPTION_KEY = 'mbear_emails_settings';

	/**
	 * Hard limit enforced by apps-script-backend.js sendMerge/sendFollowUp/sendDripStep
	 * ("CALL_LIMIT = 500"). Kept in sync with the backend.
	 */
	const BACKEND_CALL_LIMIT = 500;

	public static function get_defaults() {
		return array(
			'script_url'    => '',
			'gmail_account' => '', // Label only — see class docblock.
		);
	}

	public static function get_settings() {
		$defaults = self::get_defaults();
		$saved    = get_option( self::OPTION_KEY, array() );
		if ( ! is_array( $saved ) ) {
			$saved = array();
		}
		$settings = wp_parse_args( $saved, $defaults );
		$settings['script_url']    = self::sanitize_script_url( $settings['script_url'] );
		$settings['gmail_account'] = sanitize_email( $settings['gmail_account'] );
		return $settings;
	}

	public static function get_script_url() {
		$settings = self::get_settings();
		return $settings['script_url'];
	}

	public static function get_gmail_label() {
		$settings = self::get_settings();
		return $settings['gmail_account'];
	}

	/**
	 * Validate a backend URL the same way background.js validateBackendUrl() does:
	 * must start with https://script.google.com/macros/s/
	 *
	 * @param string $url Candidate URL.
	 * @return string|WP_Error Sanitized URL or WP_Error.
	 */
	public static function validate_script_url( $url ) {
		$trimmed = trim( (string) $url );
		if ( '' === $trimmed ) {
			return new WP_Error( 'mbear_empty_url', __( 'The Apps Script URL cannot be empty.', 'madbear-emails' ) );
		}
		if ( 0 !== strpos( $trimmed, 'https://script.google.com/macros/s/' ) ) {
			return new WP_Error(
				'mbear_bad_url',
				__( 'URL must start with https://script.google.com/macros/s/', 'madbear-emails' )
			);
		}
		if ( false === filter_var( $trimmed, FILTER_VALIDATE_URL ) ) {
			return new WP_Error( 'mbear_bad_url', __( 'URL must start with https://script.google.com/macros/s/', 'madbear-emails' ) );
		}
		return esc_url_raw( $trimmed );
	}

	public static function sanitize_script_url( $url ) {
		$result = self::validate_script_url( $url );
		return is_wp_error( $result ) ? '' : $result;
	}

	public static function update_settings( $new ) {
		$current = self::get_settings();
		$url     = isset( $new['script_url'] ) ? self::validate_script_url( $new['script_url'] ) : $current['script_url'];
		if ( is_wp_error( $url ) ) {
			return $url;
		}
		$updated = array(
			'script_url'    => $url,
			'gmail_account' => sanitize_email( isset( $new['gmail_account'] ) ? $new['gmail_account'] : $current['gmail_account'] ),
		);
		update_option( self::OPTION_KEY, $updated, false );
		return $updated;
	}
}
