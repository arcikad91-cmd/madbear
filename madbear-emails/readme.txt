=== Madbear Emails ===
Contributors: madbear
Tags: email, gmail, mail merge, google sheets, campaigns
Requires at least: 5.8
Tested up to: 6.6
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later

WordPress port of the Madbear Emails Chrome extension. Sends mass personalized Gmail campaigns through your existing Google Apps Script Web App backend.

== Description ==

Madbear Emails talks to the SAME Apps Script Web App you already deployed for the Chrome extension (same actions: getBackendInfo, getSheetTabs, getSheetData, listDrafts, sendMerge, sendFollowUp, sendDripStep). Nothing is faked: every count, table and status comes from a real request to your backend or from plugin database state derived from those requests.

Features:
* Connection settings identical to the extension (Web App URL + account label) with a live "Test connection" via getBackendInfo.
* Browse spreadsheet tabs and preview recipient rows via getSheetTabs/getSheetData; rows whose Status column is SENT are counted as already delivered (the backend skips them).
* Gmail drafts listed via listDrafts and usable as templates (draftId), plus locally saved templates.
* Campaigns built with exactly the config keys popup.js sends to sendMerge (spreadsheetId, sheetTab, draftId, subject, body, htmlBody, fromName, replyTo, cc, bcc, delayMs 0-5000).
* Durable sending queue in the WordPress database: batches of up to 50 recipients per step, pause/resume, progress counters, per-recipient results (SENT/SKIPPED/ERROR) stored from the backend's authoritative answer.
* Duplicate safety: if a batch call times out mid-flight, affected rows are marked "unknown" and are reconciled against the sheet Status column before any retry — they are never blindly re-sent.
* Test send uses the backend's own testMode flag (single email to your test address, no sheet writes).
* Follow-ups via sendFollowUp and drip steps via sendDripStep, using the backend's existing semantics.
* Daily-limit awareness: when the backend reports it stopped due to its daily limit, the campaign is paused automatically.

== Installation ==

1. Upload the `madbear-emails` folder to `/wp-content/plugins/`.
2. Activate the plugin.
3. In "Madbear Emails → Settings" paste the same Apps Script Web App URL you use in the Chrome extension and press "Test connection".
4. Create a campaign, open its Queue page and press "Start sending".

== Notes ==

* The sender identity is the Google account that deployed the Apps Script ("Execute as: Me"), exactly like the extension. The Gmail field in Settings is a display label only.
* If your Web App is deployed "Only myself", server-side wp_remote_post may receive a Google sign-in HTML page instead of JSON. Deploy as "Anyone" (with a long random URL) for headless calls, or keep using the extension from your browser.
* Sending really sends emails. Every start action asks for confirmation.

== Changelog ==

= 1.0.0 =
* Initial release: full admin UI, queue engine, templates, history, uninstall cleanup.
