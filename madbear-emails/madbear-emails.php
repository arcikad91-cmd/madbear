<?php
/**
 * Plugin Name:       Madbear Emails
 * Description:       WordPress port of the Madbear Emails Chrome extension. Sends mass personalized Gmail campaigns through your existing Google Apps Script Web App backend (same actions: getBackendInfo, getSheetTabs, getSheetData, listDrafts, sendMerge, sendFollowUp, sendDripStep). Includes a durable sending queue with pause/resume and duplicate-safe reconciliation.
 * Version:           1.0.0
 * Requires at least: 5.8
 * Requires PHP:      7.4
 * Author:            Madbear
 * License:           GPL-2.0-or-later
 * Text Domain:       madbear-emails
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'MBEAR_VERSION', '1.0.0' );
define( 'MBEAR_PATH', plugin_dir_path( __FILE__ ) );
define( 'MBEAR_URL', plugin_dir_url( __FILE__ ) );

require_once MBEAR_PATH . 'includes/class-mbear-config.php';
require_once MBEAR_PATH . 'includes/class-mbear-api.php';
require_once MBEAR_PATH . 'includes/class-mbear-db.php';
require_once MBEAR_PATH . 'includes/class-mbear-queue.php';
require_once MBEAR_PATH . 'includes/class-mbear-admin.php';

register_activation_hook(
	__FILE__,
	function () {
		require_once MBEAR_PATH . 'includes/class-mbear-db.php';
		Mbear_Db::install();
	}
);

add_action(
	'plugins_loaded',
	function () {
		$admin = new Mbear_Admin();
		$admin->init();
	}
);
