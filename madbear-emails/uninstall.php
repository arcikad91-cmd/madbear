<?php
/**
 * Uninstall handler for Madbear Emails.
 * Removes all plugin tables and options. Sent emails live in Gmail and the
 * Google Sheet — nothing else to clean up.
 *
 * @package MadbearEmails
 */

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
exit;
}

require_once plugin_dir_path( __FILE__ ) . 'includes/class-mbear-db.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/class-mbear-config.php';

global $wpdb;

// Drop every table the plugin created (prefix + short name, like Mbear_Db::table_name()).
foreach ( array( 'campaigns', 'recipients', 'templates' ) as $short ) {
$table = $wpdb->prefix . 'mbear_' . $short;
$wpdb->query( 'DROP TABLE IF EXISTS `' . $table . '`' ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery,WordPress.DB.PreparedSQL.NotPrepared -- table name built from constants
}

delete_option( Mbear_Config::OPTION_KEY );
delete_transient( 'mbear_installed' );
