// ═══════════════════════════════════════════════════════════════════
// MADBEAR EMAILS - Google Apps Script Backend (v3.5.1)
// ═══════════════════════════════════════════════════════════════════
// Paste this into script.google.com → New Project
// Deploy as Web App:
//   • Execute as: Me
//   • Who has access: Only myself   ← IMPORTANT for security
//
// SECURITY MODEL:
//   This backend runs under YOUR Google account. It can only:
//   - Read sheets that YOUR account can access
//   - Send emails from YOUR Gmail account
//   - No other account can use your backend URL to send email or
//     read your data, because Google enforces the "Only myself" auth.
//
//   For extra safety, this script also:
//   - Validates all input before touching Drive/Sheets/Gmail
//   - Sanitizes spreadsheet IDs to prevent path traversal
//   - Prevents sending to more than 500 recipients per call
// ═══════════════════════════════════════════════════════════════════

// ── MAIN ENTRY POINT ──────────────────────────────────────────────

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonError('No request body.');
    }

    var payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return jsonError('Invalid JSON payload.');
    }

    var action = String(payload.action || '').trim();
    if (!action) {
      return jsonError('Missing action.');
    }

    // Whitelist of allowed actions — reject anything else
    var allowedActions = [
      'getBackendInfo', 'getSpreadsheetInfo', 'getSheetTabs',
      'getSheetData', 'listDrafts', 'sendMerge', 'sendFollowUp',
      'sendDripStep'
    ];
    if (allowedActions.indexOf(action) === -1) {
      return jsonError('Unknown action: ' + action);
    }

    var result;
    switch (action) {
      case 'getBackendInfo':
        result = getBackendInfo();
        break;
      case 'getSpreadsheetInfo':
        result = getSpreadsheetInfo(payload.spreadsheetId);
        break;
      case 'getSheetTabs':
        result = getSheetTabs(payload.spreadsheetId);
        break;
      case 'getSheetData':
        result = getSheetData(payload.spreadsheetId, payload.tab);
        break;
      case 'listDrafts':
        result = listDrafts();
        break;
      case 'sendMerge':
        result = sendMerge(payload.config);
        break;
      case 'sendFollowUp':
        result = sendFollowUp(payload.config);
        break;
      case 'sendDripStep':
        result = sendDripStep(payload.config);
        break;
    }

    return jsonOk(result);

  } catch (err) {
    return jsonError(err.message || 'Internal server error.');
  }
}

function doGet(e) {
  // Health check endpoint — safe to expose
  return ContentService
    .createTextOutput(JSON.stringify({
      ok: true,
      msg: 'Madbear Emails backend is running.',
      version: '3.5.1',
      supportsManualCompose: true,
      supportsFollowUp: true,
      owner: Session.getActiveUser().getEmail()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── RESPONSE HELPERS ──────────────────────────────────────────────

function jsonOk(data) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, data: data }))
    .setMimeType(ContentService.MimeType.JSON);
}

function jsonError(msg) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: false, error: String(msg || 'Error') }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── INPUT VALIDATION ──────────────────────────────────────────────

/**
 * Validates a Google Sheets/Drive ID.
 * Drive IDs are alphanumeric + dashes + underscores, 25–44 chars.
 */
function validateSpreadsheetId(id) {
  var clean = String(id || '').trim();
  if (!clean) throw new Error('Spreadsheet ID is required.');
  if (!/^[a-zA-Z0-9_-]{10,60}$/.test(clean)) {
    throw new Error('Invalid spreadsheet ID format.');
  }
  return clean;
}

/**
 * Validates a sheet tab name — printable characters only, max 100 chars.
 */
function validateTabName(name) {
  var clean = String(name || '').trim();
  if (!clean) throw new Error('Sheet tab name is required.');
  if (clean.length > 100) throw new Error('Sheet tab name too long.');
  return clean;
}

/**
 * Validates an email address (basic RFC check).
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email || '').trim());
}

// ── RATE LIMITER ──────────────────────────────────────────────────

/**
 * Check and record sends in Script Properties (persists across invocations).
 * Returns current request counts; Google/Gmail quotas still apply.
 */
function checkAndRecordSendRate(count) {
  // No extension-imposed daily quota. Gmail/Google account quotas still apply.
  return { sent: Math.max(0, Number(count) || 0), remaining: -1 };
}

// ── BACKEND INFO ──────────────────────────────────────────────────

function getBackendInfo() {
  return {
    version: '4.0.0',
    supportsManualCompose: true,
    supportsFollowUp: true,
    supportsDrip: true,
    supportsCcBcc: true,
    supportsUnsubscribe: true,
    owner: Session.getActiveUser().getEmail(),
    dailySendLimit: -1
  };
}

// ── GET SPREADSHEET INFO ──────────────────────────────────────────
// Opens only the specific spreadsheet provided by the user.
// Does NOT use DriveApp or scan Google Drive.

function getSpreadsheetInfo(rawId) {
  var spreadsheetId = validateSpreadsheetId(rawId);
  var ss = SpreadsheetApp.openById(spreadsheetId);
  var tabs = ss.getSheets();
  var tabNames = [];
  for (var i = 0; i < tabs.length; i++) {
    tabNames.push(tabs[i].getName());
  }
  return {
    id: spreadsheetId,
    name: ss.getName(),
    tabCount: tabs.length,
    tabs: tabNames
  };
}

// ── GET SHEET TABS ────────────────────────────────────────────────

function getSheetTabs(rawId) {
  var spreadsheetId = validateSpreadsheetId(rawId);
  var ss = SpreadsheetApp.openById(spreadsheetId);
  var tabs = ss.getSheets();
  var names = [];
  for (var i = 0; i < tabs.length; i++) {
    names.push(tabs[i].getName());
  }
  // Return object with spreadsheet name + tabs so the extension can display the real name
  return { spreadsheetName: ss.getName(), tabs: names };
}

// ── GET SHEET DATA ────────────────────────────────────────────────

function getSheetData(rawId, rawTab) {
  var spreadsheetId = validateSpreadsheetId(rawId);
  var ss = SpreadsheetApp.openById(spreadsheetId);

  var sheet;
  if (rawTab) {
    var tabName = validateTabName(rawTab);
    sheet = ss.getSheetByName(tabName);
    if (!sheet) throw new Error('Tab "' + tabName + '" not found.');
  } else {
    sheet = ss.getSheets()[0];
  }

  var data = sheet.getDataRange().getValues();

  // Sanitize: convert all cells to strings, cap row count at 5000
  var maxRows = Math.min(data.length, 5001); // header + 5000 data rows
  var result = [];
  for (var i = 0; i < maxRows; i++) {
    var row = [];
    for (var j = 0; j < data[i].length; j++) {
      if (data[i][j] instanceof Date) {
        row.push(data[i][j].toISOString());
      } else {
        row.push(String(data[i][j]));
      }
    }
    result.push(row);
  }
  return result;
}

// ── LIST GMAIL DRAFTS ─────────────────────────────────────────────

function listDrafts() {
  var drafts = GmailApp.getDrafts();
  var result = [];
  var limit = Math.min(drafts.length, 30);
  for (var i = 0; i < limit; i++) {
    var msg = drafts[i].getMessage();
    result.push({
      id: drafts[i].getId(),
      subject: msg.getSubject() || '(no subject)',
      body: msg.getBody() || '',
      plainBody: msg.getPlainBody() || ''
    });
  }
  return result;
}

// ── SEND MERGE ────────────────────────────────────────────────────

function sendMerge(config) {
  // ── Validate config ──
  if (!config || typeof config !== 'object') {
    throw new Error('Missing send configuration.');
  }

  var draftId = String(config.draftId || '').trim();
  var manualSubject = String(config.subject || '').trim();
  var manualBody = String(config.body || '').trim();
  var manualHtmlBody = String(config.htmlBody || '').trim();
  var fromName = String(config.fromName || '').trim().slice(0, 100);  // max 100 chars
  var replyTo = String(config.replyTo || '').trim();
  var ccField = String(config.cc || '').trim();
  var bccField = String(config.bcc || '').trim();
  var unsubscribeBaseUrl = String(config.unsubscribeBaseUrl || '').trim();
  var unsubscribeSalt = String(config.unsubscribeSalt || 'mb2024').trim();
  var testEmail = String(config.testEmail || '').trim();
  var testMode = !!config.testMode;
  var delayMs = Math.min(Math.max(parseInt(config.delayMs || 500, 10), 0), 5000); // 0–5000ms

  // Validate replyTo if set
  if (replyTo && !isValidEmail(replyTo)) {
    throw new Error('Reply-to "' + replyTo + '" is not a valid email address.');
  }
  // Validate testEmail if in test mode
  if (testMode && testEmail && !isValidEmail(testEmail)) {
    throw new Error('Test email "' + testEmail + '" is not a valid email address.');
  }

  // ── Load data — either inline (contacts mode) or from Google Sheet ──
  var data;
  var sheet = null;     // null when using inline data — no sheet writes
  var statusCol    = -1;
  var sentAtCol    = -1;
  var threadIdCol  = -1;
  var messageIdCol = -1;

  if (config.inlineData && Array.isArray(config.inlineData) && config.inlineData.length >= 2) {
    // Contacts campaign: data was prepared by the extension, no sheet involved
    data = config.inlineData;
    // inlineData has no Status/SentAt columns — leave col indices at -1 (no writes)
  } else {
    // Normal sheet-based campaign
    var spreadsheetId = validateSpreadsheetId(config.spreadsheetId);
    var tabName = config.sheetTab ? validateTabName(config.sheetTab) : null;
    var ss = SpreadsheetApp.openById(spreadsheetId);
    sheet = tabName ? ss.getSheetByName(tabName) : ss.getSheets()[0];
    if (!sheet) throw new Error('Sheet tab not found: ' + (tabName || '(first tab)'));

    data = sheet.getDataRange().getValues();
    if (data.length < 2) throw new Error('Sheet has no data rows.');
    if (data.length > 5001) {
      // Safety cap — only process first 5000 rows
      data = data.slice(0, 5001);
    }
  }

  var headers = data[0];

  // Find the Email column (case-insensitive)
  var emailCol = -1;
  for (var c = 0; c < headers.length; c++) {
    if (String(headers[c]).toLowerCase().trim() === 'email') {
      emailCol = c;
      break;
    }
  }
  if (emailCol === -1) throw new Error('No "Email" column found in sheet headers.');

  // Find or create Status, SentAt, ThreadId, MessageId columns (sheet mode only)
  if (sheet) {
    for (var c = 0; c < headers.length; c++) {
      var h = String(headers[c]).toLowerCase().trim();
      if (h === 'status')    statusCol    = c;
      if (h === 'sentat')    sentAtCol    = c;
      if (h === 'threadid')  threadIdCol  = c;
      if (h === 'messageid') messageIdCol = c;
    }
    if (statusCol === -1) {
      statusCol = headers.length;
      sheet.getRange(1, statusCol + 1).setValue('Status');
      headers.push('Status');
    }
    if (sentAtCol === -1) {
      sentAtCol = headers.length;
      sheet.getRange(1, sentAtCol + 1).setValue('SentAt');
      headers.push('SentAt');
    }
    if (threadIdCol === -1) {
      threadIdCol = headers.length;
      sheet.getRange(1, threadIdCol + 1).setValue('ThreadId');
      headers.push('ThreadId');
    }
    if (messageIdCol === -1) {
      messageIdCol = headers.length;
      sheet.getRange(1, messageIdCol + 1).setValue('MessageId');
      headers.push('MessageId');
    }
  }

  // ── Resolve template ──
  var templateSubject = manualSubject;
  var templatePlainBody = manualBody;
  var templateHtmlBody = manualHtmlBody;

  if (draftId) {
    // Only allow alphanumeric draft IDs
    if (!/^[a-zA-Z0-9_#:.-]{1,100}$/.test(draftId)) {
      throw new Error('Invalid draft ID format.');
    }
    var drafts = GmailApp.getDrafts();
    var draft = null;
    for (var d = 0; d < drafts.length; d++) {
      if (drafts[d].getId() === draftId) {
        draft = drafts[d];
        break;
      }
    }
    if (!draft) throw new Error('Draft not found. It may have been sent or deleted.');
    var msg = draft.getMessage();
    if (!templateSubject) templateSubject = msg.getSubject() || '';
    if (!templateHtmlBody) templateHtmlBody = msg.getBody() || '';
    if (!templatePlainBody) templatePlainBody = msg.getPlainBody() || stripHtml(templateHtmlBody);
  }

  if (!templateSubject) throw new Error('Email subject is required.');
  if (!templatePlainBody && !templateHtmlBody) throw new Error('Email body is required.');
  if (!templateHtmlBody && templatePlainBody) templateHtmlBody = textToHtml(templatePlainBody);
  if (!templatePlainBody && templateHtmlBody) templatePlainBody = stripHtml(templateHtmlBody);

  // ── Deduplicate emails — skip rows with an email already seen ──
  var seenEmails = {};

  // ── Count sendable rows for rate limit check ──
  var sendableCount = 0;
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var status = statusCol < row.length ? String(row[statusCol]).toUpperCase() : '';
    var email = emailCol < row.length ? String(row[emailCol]).trim().toLowerCase() : '';
    if (email && status !== 'SENT' && isValidEmail(email) && !seenEmails[email]) {
      sendableCount++;
      seenEmails[email] = true;
    }
  }
  // Reset seen set for the actual send loop below
  seenEmails = {};

  // Cap to 500 recipients per call (hard safety limit)
  var CALL_LIMIT = 500;
  if (!testMode && sendableCount > CALL_LIMIT) {
    throw new Error(
      'Too many recipients (' + sendableCount + '). Maximum per send is ' + CALL_LIMIT +
      '. Mark some rows as SENT or split into multiple campaigns.'
    );
  }

  // Check daily rate limit (skip in test mode)
  if (!testMode && sendableCount > 0) {
    checkAndRecordSendRate(sendableCount);
  }

  // ── Send loop ──
  var results = [];
  var sentOneTest = false;

  for (var i = 1; i < data.length; i++) {
    var row = data[i];

    // Skip already-sent rows
    var currentStatus = statusCol < row.length ? String(row[statusCol]).toUpperCase() : '';
    if (currentStatus === 'SENT') {
      results.push({ row: i + 1, status: 'SKIPPED', email: String(row[emailCol] || '') });
      continue;
    }

    var recipientEmail = testMode
      ? (testEmail || String(row[emailCol]).trim())
      : String(row[emailCol]).trim();

    if (!recipientEmail || !isValidEmail(recipientEmail)) {
      results.push({ row: i + 1, status: 'NO_EMAIL', email: recipientEmail || '' });
      continue;
    }

    // Skip duplicate emails (only in real send — test always sends one)
    if (!testMode) {
      var emailKey = recipientEmail.toLowerCase();
      if (seenEmails[emailKey]) {
        results.push({ row: i + 1, status: 'SKIPPED', email: recipientEmail, reason: 'duplicate' });
        continue;
      }
      seenEmails[emailKey] = true;
    }

    try {
      // Apply merge fields
      var subject = templateSubject;
      var plainBody = templatePlainBody;
      var htmlBody = templateHtmlBody;

      // Generate unsubscribe token for this recipient
      var unsubToken = '';
      if (unsubscribeBaseUrl) {
        unsubToken = generateUnsubToken(recipientEmail, unsubscribeSalt);
      }

      for (var j = 0; j < headers.length; j++) {
        var placeholder = '{{' + String(headers[j]) + '}}';
        var value = j < row.length ? String(row[j]) : '';
        var regex = new RegExp(escapeRegex(placeholder), 'gi');
        subject = subject.replace(regex, value);
        plainBody = plainBody.replace(regex, value);
        htmlBody = htmlBody.replace(regex, value);
      }

      // Apply unsubscribe tokens
      if (unsubscribeBaseUrl && unsubToken) {
        var unsubUrl = unsubscribeBaseUrl + '?t=' + unsubToken + '&e=' + encodeURIComponent(recipientEmail);
        htmlBody = htmlBody.replace(/\{\{unsubscribeUrl\}\}/gi, unsubUrl);
        htmlBody = htmlBody.replace(/\{\{unsubscribeToken\}\}/gi, unsubToken);
        plainBody = plainBody.replace(/\{\{unsubscribeUrl\}\}/gi, unsubUrl);
      }

      // Apply CC/BCC merge fields
      var resolvedCc = ccField;
      var resolvedBcc = bccField;
      for (var jj = 0; jj < headers.length; jj++) {
        var ph2 = '{{' + String(headers[jj]) + '}}';
        var val2 = jj < row.length ? String(row[jj]) : '';
        resolvedCc  = resolvedCc.replace(new RegExp(escapeRegex(ph2), 'gi'), val2);
        resolvedBcc = resolvedBcc.replace(new RegExp(escapeRegex(ph2), 'gi'), val2);
      }

      // Build send options
      var options = { htmlBody: htmlBody };
      if (fromName) options.name = fromName;
      if (replyTo)  options.replyTo = replyTo;
      if (resolvedCc && resolvedCc !== ccField || (ccField && !resolvedCc.includes('{{'))) {
        if (resolvedCc) options.cc = resolvedCc;
      } else if (ccField && !ccField.includes('{{')) {
        options.cc = ccField;
      }
      if (resolvedBcc && !resolvedBcc.includes('{{')) {
        options.bcc = resolvedBcc;
      } else if (bccField && !bccField.includes('{{')) {
        options.bcc = bccField;
      }

      // Send the email
      GmailApp.sendEmail(recipientEmail, subject, plainBody, options);

      if (!testMode && sheet) {
        var now = new Date().toISOString();
        sheet.getRange(i + 1, statusCol + 1).setValue('SENT');
        sheet.getRange(i + 1, sentAtCol + 1).setValue(now);

        // Capture ThreadId and RFC Message-ID by searching Sent immediately after send
        try {
          Utilities.sleep(1500);
          var safeSubject = subject.replace(/"/g, '').slice(0, 60);
          var sentThreads = GmailApp.search(
            'to:' + recipientEmail + ' subject:"' + safeSubject + '" in:sent',
            0, 3
          );
          if (sentThreads.length > 0) {
            var sentThread = sentThreads[0];
            sheet.getRange(i + 1, threadIdCol + 1).setValue(sentThread.getId());
            // Store the RFC Message-ID header (needed for proper email threading)
            var msgs = sentThread.getMessages();
            if (msgs.length > 0) {
              var rfcMsgId = msgs[msgs.length - 1].getHeader('Message-ID');
              sheet.getRange(i + 1, messageIdCol + 1).setValue(rfcMsgId || '');
            }
          }
        } catch (tidErr) { /* non-fatal */ }
      }

      var statusLabel = testMode ? 'TEST_SENT' : 'SENT';
      results.push({ row: i + 1, status: statusLabel, email: recipientEmail });

      if (testMode) {
        sentOneTest = true;
        break; // Only send one test email
      }

      if (delayMs > 0 && i < data.length - 1) {
        Utilities.sleep(delayMs);
      }

    } catch (sendErr) {
      if (!testMode && sheet && statusCol >= 0) {
        var errMsg = String(sendErr.message || 'Error').substring(0, 80);
        sheet.getRange(i + 1, statusCol + 1).setValue('ERROR: ' + errMsg);
      }
      results.push({
        row: i + 1,
        status: 'ERROR',
        email: recipientEmail,
        error: sendErr.message || 'Send failed'
      });
    }
  }

  if (testMode && !sentOneTest && results.length === 0) {
    throw new Error('No eligible rows found for test mode.');
  }

  return results;
}

// ── SEND FOLLOW-UP ────────────────────────────────────────────────
// Sends a follow-up email to selected recipients.
// Primary path: GmailApp.sendEmail (always works).
// Bonus: if a ThreadId exists for a row, also attempts thread.reply
//        so the email lands in the same Gmail conversation.
// config.selectedEmails: optional array of email strings — if provided,
//   only those rows are contacted. If omitted, all valid rows are sent.

function sendFollowUp(config) {
  if (!config || typeof config !== 'object') {
    throw new Error('Missing follow-up configuration.');
  }

  var spreadsheetId = validateSpreadsheetId(config.spreadsheetId);
  var tabName       = config.sheetTab ? validateTabName(config.sheetTab) : null;
  var subject       = String(config.subject  || '').trim();
  var plainBody     = String(config.body     || '').trim();
  var htmlBody      = String(config.htmlBody || '').trim();
  var fromName      = String(config.fromName || '').trim().slice(0, 100);
  var replyTo       = String(config.replyTo  || '').trim();
  var testEmail     = String(config.testEmail|| '').trim();
  var testMode      = !!config.testMode;
  var noThread      = !!config.noThread;
  var delayMs       = Math.min(Math.max(parseInt(config.delayMs || 500, 10), 0), 5000);

  // selectedEmails: array of specific addresses to contact (empty = all)
  var selectedEmails = [];
  if (Array.isArray(config.selectedEmails) && config.selectedEmails.length > 0) {
    for (var s = 0; s < config.selectedEmails.length; s++) {
      var se = String(config.selectedEmails[s] || '').trim().toLowerCase();
      if (se) selectedEmails.push(se);
    }
  }

  if (replyTo && !isValidEmail(replyTo)) {
    throw new Error('Reply-to "' + replyTo + '" is not a valid email address.');
  }
  if (testMode && testEmail && !isValidEmail(testEmail)) {
    throw new Error('Test email "' + testEmail + '" is not a valid email address.');
  }
  if (!subject)              throw new Error('Follow-up subject is required.');
  if (!plainBody && !htmlBody) throw new Error('Follow-up body is required.');

  // Ensure both formats exist
  if (!htmlBody  && plainBody) htmlBody  = textToHtml(plainBody);
  if (!plainBody && htmlBody)  plainBody = stripHtml(htmlBody);

  // ── Load sheet ────────────────────────────────────────────────
  var ss    = SpreadsheetApp.openById(spreadsheetId);
  var sheet = tabName ? ss.getSheetByName(tabName) : ss.getSheets()[0];
  if (!sheet) throw new Error('Sheet tab not found: ' + (tabName || '(first tab)'));

  var data = sheet.getDataRange().getValues();
  if (data.length < 2) throw new Error('Sheet has no data rows.');
  if (data.length > 5001) data = data.slice(0, 5001);

  var headers = data[0].map(function(h) { return String(h || ''); });

  // ── Locate columns ────────────────────────────────────────────
  var emailCol          = -1;
  var threadIdCol       = -1;
  var messageIdCol      = -1;
  var followUpStatusCol = -1;
  var followUpSentAtCol = -1;

  for (var c = 0; c < headers.length; c++) {
    var h = headers[c].toLowerCase().trim();
    if (h === 'email')          emailCol          = c;
    if (h === 'threadid')       threadIdCol       = c;
    if (h === 'messageid')      messageIdCol      = c;
    if (h === 'followupstatus') followUpStatusCol = c;
    if (h === 'followupsentat') followUpSentAtCol = c;
  }

  if (emailCol === -1) throw new Error('No "Email" column found in sheet headers.');

  // Create FollowUpStatus / FollowUpSentAt if missing
  if (followUpStatusCol === -1) {
    followUpStatusCol = headers.length;
    sheet.getRange(1, followUpStatusCol + 1).setValue('FollowUpStatus');
    headers.push('FollowUpStatus');
  }
  if (followUpSentAtCol === -1) {
    followUpSentAtCol = headers.length;
    sheet.getRange(1, followUpSentAtCol + 1).setValue('FollowUpSentAt');
    headers.push('FollowUpSentAt');
  }

  // ── Build eligible row list ───────────────────────────────────
  var eligibleRows = [];
  for (var i = 1; i < data.length; i++) {
    var rowEmail = String(data[i][emailCol] || '').trim();
    if (!rowEmail || !isValidEmail(rowEmail)) continue;
    // If a selection was provided, filter to only those emails
    if (selectedEmails.length > 0 &&
        selectedEmails.indexOf(rowEmail.toLowerCase()) === -1) continue;
    eligibleRows.push(i);
  }

  if (eligibleRows.length === 0) {
    throw new Error('No eligible recipients found. Make sure at least one row has a valid email address' +
      (selectedEmails.length ? ' matching your selection.' : '.'));
  }

  var CALL_LIMIT = 500;
  if (!testMode && eligibleRows.length > CALL_LIMIT) {
    throw new Error('Too many recipients (' + eligibleRows.length + '). Maximum per send is ' + CALL_LIMIT + '.');
  }

  if (!testMode) checkAndRecordSendRate(eligibleRows.length);

  // ── Send loop ─────────────────────────────────────────────────
  var results      = [];
  var sentOneTest  = false;

  for (var ri = 0; ri < eligibleRows.length; ri++) {
    var i   = eligibleRows[ri];
    var row = data[i];

    var to = testMode
      ? (testEmail || String(row[emailCol]).trim())
      : String(row[emailCol]).trim();

    try {
      // Apply merge fields for this row
      var mergedSubject   = subject;
      var mergedPlainBody = plainBody;
      var mergedHtmlBody  = htmlBody;

      for (var j = 0; j < headers.length; j++) {
        var token = '{{' + headers[j] + '}}';
        var val   = j < row.length ? String(row[j]) : '';
        var re    = new RegExp(escapeRegex(token), 'gi');
        mergedSubject   = mergedSubject.replace(re, val);
        mergedPlainBody = mergedPlainBody.replace(re, val);
        mergedHtmlBody  = mergedHtmlBody.replace(re, val);
      }

      // Apply custom fields (extra user-defined merge tokens)
      if (config.customFields && typeof config.customFields === 'object') {
        var cfKeys = Object.keys(config.customFields);
        for (var cf = 0; cf < cfKeys.length; cf++) {
          var cfKey = cfKeys[cf];
          var cfToken = '{{' + cfKey + '}}';
          var cfVal = String(config.customFields[cfKey] || '');
          var cfRe = new RegExp(escapeRegex(cfToken), 'gi');
          mergedSubject   = mergedSubject.replace(cfRe, cfVal);
          mergedPlainBody = mergedPlainBody.replace(cfRe, cfVal);
          mergedHtmlBody  = mergedHtmlBody.replace(cfRe, cfVal);
        }
      }

      var sendOpts = { htmlBody: mergedHtmlBody };
      if (fromName) sendOpts.name    = fromName;
      if (replyTo)  sendOpts.replyTo = replyTo;

      var sentAsThread = false;
      var threadDebug  = '';

      // Build final send options
      var followUpOpts = { htmlBody: mergedHtmlBody };
      if (fromName) followUpOpts.name    = fromName;
      if (replyTo)  followUpOpts.replyTo = replyTo;

      // PRIMARY PATH: thread the reply into the original Gmail conversation.
      // Uses replyAll() on the last message so it goes to the recipient AND
      // stays in the same thread (hilo) — not a separate email.
      if (!noThread && threadIdCol >= 0) {
        var storedThreadId = String(row[threadIdCol] || '').trim();
        if (storedThreadId && !testMode) {
          try {
            var origThread = GmailApp.getThreadById(storedThreadId);
            if (origThread) {
              var threadMsgs = origThread.getMessages();
              var lastMsg    = threadMsgs[threadMsgs.length - 1];
              // replyAll keeps the recipient in the thread (reply() only replies to sender)
              lastMsg.replyAll(mergedPlainBody, { htmlBody: mergedHtmlBody, name: fromName || undefined });
              sentAsThread = true;
              threadDebug = 'threaded_via_replyAll:' + storedThreadId.slice(0, 8);
            } else {
              threadDebug = 'thread_not_found:' + storedThreadId.slice(0, 8);
            }
          } catch (threadErr) {
            threadDebug = 'thread_err:' + String(threadErr.message || '').slice(0, 40);
          }
        } else if (testMode) {
          threadDebug = 'test_mode_skip_thread';
        } else {
          threadDebug = 'no_threadid_in_sheet';
        }
      } else if (noThread) {
        threadDebug = 'nothread_flag';
      }

      // FALLBACK: send as a new email if thread reply was not used or failed
      if (!sentAsThread) {
        try {
          GmailApp.sendEmail(to, mergedSubject, mergedPlainBody, followUpOpts);
          threadDebug += (threadDebug ? '|' : '') + 'fallback_sendemail_ok';
        } catch (sendErr2) {
          threadDebug += (threadDebug ? '|' : '') + 'fallback_sendemail_err:' + String(sendErr2.message || '').slice(0, 40);
          throw sendErr2;
        }
      }

      // Mark sheet
      if (!testMode) {
        var now = new Date().toISOString();
        sheet.getRange(i + 1, followUpStatusCol + 1).setValue('Done');
        sheet.getRange(i + 1, followUpSentAtCol  + 1).setValue(now);
      }

      var label = testMode ? 'TEST_SENT' : 'SENT';
      results.push({ row: i + 1, status: label, email: to, threadReply: sentAsThread, debug: threadDebug });

      if (testMode) { sentOneTest = true; break; }

      if (delayMs > 0 && ri < eligibleRows.length - 1) {
        Utilities.sleep(delayMs);
      }

    } catch (sendErr) {
      if (!testMode) {
        sheet.getRange(i + 1, followUpStatusCol + 1)
             .setValue('Error: ' + String(sendErr.message || '').substring(0, 80));
      }
      results.push({ row: i + 1, status: 'ERROR', email: to,
                     error: sendErr.message || 'Send failed' });
    }
  }

  if (testMode && !sentOneTest) {
    throw new Error('No eligible recipients found for test.');
  }

  return results;
}

// ── SEND DRIP STEP ────────────────────────────────────────────────
// Sends one step of a drip sequence.
// config.stepIndex: 0-based step number (0 = initial, 1 = step 2, etc.)
// config.stepColumn: name of sheet column tracking this step's status (e.g. "DripStep2")
// Sends to all rows where stepColumn is empty (not yet received this step)
// and the previous step column (if any) is "Done".
// This reuses the follow-up threading infrastructure.

function sendDripStep(config) {
  if (!config || typeof config !== 'object') {
    throw new Error('Missing drip step configuration.');
  }

  var spreadsheetId  = validateSpreadsheetId(config.spreadsheetId);
  var tabName        = config.sheetTab ? validateTabName(config.sheetTab) : null;
  var subject        = String(config.subject   || '').trim();
  var plainBody      = String(config.body      || '').trim();
  var htmlBody       = String(config.htmlBody  || '').trim();
  var fromName       = String(config.fromName  || '').trim().slice(0, 100);
  var replyTo        = String(config.replyTo   || '').trim();
  var ccField        = String(config.cc        || '').trim();
  var bccField       = String(config.bcc       || '').trim();
  var testEmail      = String(config.testEmail || '').trim();
  var testMode       = !!config.testMode;
  var noThread       = !!config.noThread;
  var delayMs        = Math.min(Math.max(parseInt(config.delayMs || 500, 10), 0), 5000);
  var stepIndex      = parseInt(config.stepIndex || 0, 10); // 0=first follow-up, 1=second, etc.
  var unsubscribeBaseUrl = String(config.unsubscribeBaseUrl || '').trim();
  var unsubscribeSalt    = String(config.unsubscribeSalt    || 'mb2024').trim();

  // selectedEmails: optional filter
  var selectedEmails = [];
  if (Array.isArray(config.selectedEmails) && config.selectedEmails.length > 0) {
    config.selectedEmails.forEach(function(se) {
      var s = String(se || '').trim().toLowerCase();
      if (s) selectedEmails.push(s);
    });
  }

  if (!subject)                throw new Error('Step subject is required.');
  if (!plainBody && !htmlBody) throw new Error('Step body is required.');
  if (!htmlBody  && plainBody) htmlBody  = textToHtml(plainBody);
  if (!plainBody && htmlBody)  plainBody = stripHtml(htmlBody);

  var ss    = SpreadsheetApp.openById(spreadsheetId);
  var sheet = tabName ? ss.getSheetByName(tabName) : ss.getSheets()[0];
  if (!sheet) throw new Error('Sheet tab not found.');

  var data    = sheet.getDataRange().getValues();
  if (data.length < 2) throw new Error('Sheet has no data rows.');
  if (data.length > 5001) data = data.slice(0, 5001);

  var headers = data[0].map(function(h) { return String(h || ''); });

  // Locate standard columns
  var emailCol          = -1;
  var threadIdCol       = -1;
  var statusCol         = -1;

  // Drip step columns: DripStep1, DripStep2, DripStep3 (stepIndex 0 = DripStep1)
  var stepColName       = 'DripStep' + (stepIndex + 1);
  var prevStepColName   = stepIndex > 0 ? 'DripStep' + stepIndex : null;
  var stepCol           = -1;
  var prevStepCol       = -1;

  for (var c = 0; c < headers.length; c++) {
    var h = headers[c].toLowerCase().trim();
    if (h === 'email')                   emailCol    = c;
    if (h === 'threadid')                threadIdCol = c;
    if (h === 'status')                  statusCol   = c;
    if (headers[c].trim() === stepColName)   stepCol = c;
    if (prevStepColName && headers[c].trim() === prevStepColName) prevStepCol = c;
  }

  if (emailCol === -1) throw new Error('No "Email" column found.');

  // Create the drip step column if missing
  if (stepCol === -1) {
    stepCol = headers.length;
    sheet.getRange(1, stepCol + 1).setValue(stepColName);
    headers.push(stepColName);
  }

  // Build eligible rows: must be SENT in original campaign, step column empty,
  // and if stepIndex > 0 the previous step column must be "Done"
  var eligibleRows = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var email = String(row[emailCol] || '').trim();
    if (!email || !isValidEmail(email)) continue;

    // Must have been sent the original email
    if (statusCol >= 0) {
      var origStatus = String(row[statusCol] || '').toUpperCase();
      if (origStatus !== 'SENT') continue;
    }

    // Previous drip step must be done (if this isn't step 1)
    if (prevStepCol >= 0) {
      var prevStatus = String(row[prevStepCol] || '').toLowerCase();
      if (prevStatus !== 'done') continue;
    }

    // This step must not already be done
    if (stepCol < row.length) {
      var thisStatus = String(row[stepCol] || '').toLowerCase();
      if (thisStatus === 'done') continue;
    }

    // Optional email filter
    if (selectedEmails.length > 0 && selectedEmails.indexOf(email.toLowerCase()) === -1) continue;

    eligibleRows.push(i);
  }

  if (eligibleRows.length === 0) {
    throw new Error('No eligible recipients for drip step ' + (stepIndex + 1) + '. All contacts may have already received this step, or none have completed the previous step.');
  }

  var CALL_LIMIT = 500;
  if (!testMode && eligibleRows.length > CALL_LIMIT) {
    throw new Error('Too many recipients (' + eligibleRows.length + '). Max per send is ' + CALL_LIMIT + '.');
  }
  if (!testMode) checkAndRecordSendRate(eligibleRows.length);

  var results     = [];
  var sentOneTest = false;

  for (var ri = 0; ri < eligibleRows.length; ri++) {
    var i   = eligibleRows[ri];
    var row = data[i];
    var to  = testMode ? (testEmail || String(row[emailCol]).trim()) : String(row[emailCol]).trim();

    try {
      var mergedSubject   = subject;
      var mergedPlainBody = plainBody;
      var mergedHtmlBody  = htmlBody;

      // Unsubscribe token
      var unsubToken = '';
      if (unsubscribeBaseUrl) {
        unsubToken = generateUnsubToken(String(row[emailCol]).trim(), unsubscribeSalt);
        var unsubUrl = unsubscribeBaseUrl + '?t=' + unsubToken + '&e=' + encodeURIComponent(String(row[emailCol]).trim());
        mergedHtmlBody  = mergedHtmlBody.replace(/\{\{unsubscribeUrl\}\}/gi,   unsubUrl);
        mergedHtmlBody  = mergedHtmlBody.replace(/\{\{unsubscribeToken\}\}/gi, unsubToken);
        mergedPlainBody = mergedPlainBody.replace(/\{\{unsubscribeUrl\}\}/gi,  unsubUrl);
      }

      // Merge sheet fields
      for (var j = 0; j < headers.length; j++) {
        var token = '{{' + headers[j] + '}}';
        var val   = j < row.length ? String(row[j]) : '';
        var re    = new RegExp(escapeRegex(token), 'gi');
        mergedSubject   = mergedSubject.replace(re, val);
        mergedPlainBody = mergedPlainBody.replace(re, val);
        mergedHtmlBody  = mergedHtmlBody.replace(re, val);
      }

      // Custom fields
      if (config.customFields && typeof config.customFields === 'object') {
        Object.keys(config.customFields).forEach(function(cfKey) {
          var cfToken = '{{' + cfKey + '}}';
          var cfVal   = String(config.customFields[cfKey] || '');
          var cfRe    = new RegExp(escapeRegex(cfToken), 'gi');
          mergedSubject   = mergedSubject.replace(cfRe, cfVal);
          mergedPlainBody = mergedPlainBody.replace(cfRe, cfVal);
          mergedHtmlBody  = mergedHtmlBody.replace(cfRe, cfVal);
        });
      }

      var sendOpts = { htmlBody: mergedHtmlBody };
      if (fromName) sendOpts.name    = fromName;
      if (replyTo)  sendOpts.replyTo = replyTo;
      if (ccField && !ccField.includes('{{'))  sendOpts.cc  = ccField;
      if (bccField && !bccField.includes('{{')) sendOpts.bcc = bccField;

      var sentAsThread = false;

      // Try threading if we have a threadId
      if (!noThread && threadIdCol >= 0 && !testMode) {
        var storedThreadId = String(row[threadIdCol] || '').trim();
        if (storedThreadId) {
          try {
            var origThread = GmailApp.getThreadById(storedThreadId);
            if (origThread) {
              var msgs = origThread.getMessages();
              msgs[msgs.length - 1].replyAll(mergedPlainBody, { htmlBody: mergedHtmlBody, name: fromName || undefined });
              sentAsThread = true;
            }
          } catch (threadErr) { /* non-fatal, fall through to sendEmail */ }
        }
      }

      if (!sentAsThread) {
        GmailApp.sendEmail(to, mergedSubject, mergedPlainBody, sendOpts);
      }

      if (!testMode) {
        sheet.getRange(i + 1, stepCol + 1).setValue('Done');
      }

      var label = testMode ? 'TEST_SENT' : 'SENT';
      results.push({ row: i + 1, status: label, email: to, threadReply: sentAsThread, step: stepIndex + 1 });

      if (testMode) { sentOneTest = true; break; }
      if (delayMs > 0 && ri < eligibleRows.length - 1) Utilities.sleep(delayMs);

    } catch (sendErr) {
      if (!testMode) {
        sheet.getRange(i + 1, stepCol + 1).setValue('Error: ' + String(sendErr.message || '').slice(0, 60));
      }
      results.push({ row: i + 1, status: 'ERROR', email: to, error: sendErr.message || 'Send failed', step: stepIndex + 1 });
    }
  }

  if (testMode && !sentOneTest) throw new Error('No eligible recipients for test.');
  return results;
}

// ── UNSUBSCRIBE TOKEN ─────────────────────────────────────────────

function generateUnsubToken(email, salt) {
  // Simple deterministic token: base64-encode email+salt, strip non-alphanumeric
  var raw = email.toLowerCase() + '|' + salt;
  var encoded = Utilities.base64Encode(raw);
  return encoded.replace(/[^a-zA-Z0-9]/g, '').slice(0, 32);
}

// ── STRING UTILITIES ──────────────────────────────────────────────

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function stripHtml(html) {
  return String(html || '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim();
}

function textToHtml(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');
}

// ── SHEET MENU (bonus: run from sheet UI) ─────────────────────────

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Madbear Emails')
    .addItem('Open Extension', 'showExtensionNote')
    .addToUi();
}

function showExtensionNote() {
  SpreadsheetApp.getUi().showModalDialog(
    HtmlService.createHtmlOutput(
      '<p style="font-family:sans-serif;padding:16px;margin:0">' +
      'Use the <strong>Madbear Emails</strong> Chrome extension to send campaigns from this sheet.' +
      '</p>'
    ).setWidth(320).setHeight(80),
    'Madbear Emails'
  );
}
