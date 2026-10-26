// ═══════════════════════════════════════════════════════════════════
// MADBEAR EMAILS — background.js (v3.5.1)
// Access controlled exclusively via ExtensionPay (Stripe payments).
// No manual license codes. Free users get limited access.
// Paid users (via ExtPay) get full unlimited access.
// ═══════════════════════════════════════════════════════════════════



// ── Version ────────────────────────────────────────────────────────
const MB_VERSION = "4.0.0";

const CONFIG = {};

// ── Payments are disabled: all extension features are free. ──

// ── Alarm listener (scheduled sends + smart window) ───────────────
chrome.alarms.onAlarm.addListener(async function(alarm) {
  if (alarm.name === "mb_scheduled_send") {
    await executeScheduledSend();
  } else if (alarm.name.startsWith("mb_smart_send_")) {
    // Smart window: each alarm sends one row
    const rowIndex = parseInt(alarm.name.replace("mb_smart_send_", ""), 10);
    await executeSmartSendRow(rowIndex);
  }
});

// ── Message router ─────────────────────────────────────────────────
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (!sender || (sender.id && sender.id !== chrome.runtime.id)) {
    sendResponse({ ok: false, error: "Unauthorized." });
    return false;
  }
  handleMessage(message)
    .then(function(result) { sendResponse({ ok: true, data: result }); })
    .catch(function(error) { sendResponse({ ok: false, error: error.message || "Error." }); });
  return true;
});

async function handleMessage(message) {
  if (!message || !message.type) throw new Error("Invalid message.");

  if (message.type === "billing:get-state")        return getBillingState();
  if (message.type === "billing:check-send-limit") return checkSendLimit(Number(message.count || 0));
  if (message.type === "billing:record-send")      return recordSend(Number(message.count || 0));
  if (message.type === "billing:validate-backend-url") return validateBackendUrl(message.url || "");

  // ── Background send (Feature 6) ────────────────────────────────
  if (message.type === "send:start-background")    return startBackgroundSend(message.payload);
  if (message.type === "send:get-progress")        return getBackgroundSendProgress();
  if (message.type === "send:cancel")              return cancelBackgroundSend();

  // ── Scheduling (Feature 3) ─────────────────────────────────────
  if (message.type === "schedule:set")             return scheduleSet(message.payload);
  if (message.type === "schedule:cancel")          return scheduleCancel();
  if (message.type === "schedule:get")             return scheduleGet();

  // ── Smart window (Feature 5) ───────────────────────────────────
  if (message.type === "smartsend:start")          return startSmartSend(message.payload);
  if (message.type === "smartsend:cancel")         return cancelSmartSend();
  if (message.type === "smartsend:get-progress")   return getBackgroundSendProgress();

  throw new Error("Unknown action: " + message.type);
}

// ── Free access: no subscriptions, licensing, or extension quotas ──
async function getBillingState() {
  const stored = (await storageGet("mb_billing")) || {};
  const todayUsed = Number((stored.usageByDate || {})[getTodayKey()] || 0);
  return {
    config: { websiteUrl: "", supportEmail: "", extensionPayEnabled: false },
    activePlan: "premium", planName: "Free", planPrice: "",
    extpayPaid: false, extpayEmail: "", extpayPlanNickname: "", paidAt: "",
    dailyLimit: -1, todayUsed: todayUsed, remainingToday: -1,
    backendLimit: -1, isAdmin: false
  };
}

async function checkSendLimit(count) {
  const state = await getBillingState();
  return { canSend: true, planName: "Free", todayUsed: state.todayUsed,
    requested: count, dailyLimit: -1, remainingToday: -1 };
}

async function recordSend(count) {
  const stored = (await storageGet("mb_billing")) || {};
  const usage = stored.usageByDate || {};
  const todayKey = getTodayKey();
  usage[todayKey] = Number(usage[todayKey] || 0) + Math.max(0, count);
  const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 30);
  Object.keys(usage).forEach(function(key) { if (new Date(key) < cutoff) delete usage[key]; });
  stored.usageByDate = usage;
  await storageSet("mb_billing", stored);
  return getBillingState();
}

// ── Backend URL validation ────────────────────────────────────────

async function validateBackendUrl(url) {
  if (!url || typeof url !== "string") throw new Error("No URL provided.");
  const trimmed = url.trim();
  if (!trimmed.startsWith("https://script.google.com/macros/s/")) {
    throw new Error("URL must start with https://script.google.com/macros/s/");
  }
  return { valid: true, url: trimmed };
}

// ════════════════════════════════════════════════════════════════════
// FEATURE 3 + 6: Background Send + Scheduling
// ════════════════════════════════════════════════════════════════════

// ── Background Send ───────────────────────────────────────────────
// The popup posts campaign config here. Background runs sendMerge
// row-by-row (using the Apps Script backend) and stores progress in
// chrome.storage so the popup can display live updates.

async function startBackgroundSend(payload) {
  if (!payload || !payload.scriptUrl || !payload.config) {
    throw new Error("Invalid background send payload.");
  }

  // Store the full send job in storage so the alarm can re-fetch it
  const job = {
    id: "bg_" + Date.now(),
    scriptUrl: payload.scriptUrl,
    config: payload.config,
    isTest: !!payload.isTest,
    status: "running",   // running | done | cancelled | error
    startedAt: new Date().toISOString(),
    progress: { sent: 0, errors: 0, skipped: 0, total: 0, results: [], done: false }
  };
  await storageSet("mb_bg_send_job", job);

  // Run immediately (service worker is alive while popup is open)
  runBackgroundSendJob(job).catch(function(err) {
    // Errors are stored in the job — popup will see them
    console.error("Background send error:", err);
  });

  return { jobId: job.id };
}

async function runBackgroundSendJob(job) {
  // Re-fetch config from storage in case popup updates it
  const stored = await storageGet("mb_bg_send_job");
  if (!stored || stored.id !== job.id) return; // superseded

  const scriptUrl = job.scriptUrl;
  const config    = job.config;
  const isTest    = job.isTest;

  try {
    const res = await apiFetch(scriptUrl, "sendMerge", { config: config });

    const results = Array.isArray(res.data) ? res.data : [];
    const sent    = results.filter(function(r) { return r.status === "SENT"; }).length;
    const errors  = results.filter(function(r) { return r.status === "ERROR"; }).length;
    const skipped = results.filter(function(r) { return r.status === "SKIPPED" || r.status === "NO_EMAIL"; }).length;

    const updatedJob = Object.assign({}, stored, {
      status: res.ok ? "done" : "error",
      error:  res.ok ? null : (res.error || "Send failed"),
      progress: { sent, errors, skipped, total: results.length, results: results, done: true }
    });
    await storageSet("mb_bg_send_job", updatedJob);

    if (res.ok && !isTest) {
      await recordSend(sent);
    }
  } catch (err) {
    const storedNow = await storageGet("mb_bg_send_job");
    if (storedNow && storedNow.id === job.id) {
      await storageSet("mb_bg_send_job", Object.assign({}, storedNow, {
        status: "error",
        error: err.message || "Unknown error",
        progress: Object.assign({}, storedNow.progress, { done: true })
      }));
    }
  }
}

async function getBackgroundSendProgress() {
  const job = await storageGet("mb_bg_send_job");
  if (!job) return { status: "idle", progress: null };
  return { status: job.status, progress: job.progress, error: job.error || null, jobId: job.id };
}

async function cancelBackgroundSend() {
  const job = await storageGet("mb_bg_send_job");
  if (job && job.status === "running") {
    await storageSet("mb_bg_send_job", Object.assign({}, job, {
      status: "cancelled",
      progress: Object.assign({}, job.progress, { done: true })
    }));
  }
  return { ok: true };
}

// ── Scheduling (Feature 3) ────────────────────────────────────────

async function scheduleSet(payload) {
  if (!payload || !payload.scheduledAt || !payload.scriptUrl || !payload.config) {
    throw new Error("Missing schedule payload.");
  }
  const scheduledAt = new Date(payload.scheduledAt);
  if (isNaN(scheduledAt.getTime()) || scheduledAt <= new Date()) {
    throw new Error("Schedule time must be in the future.");
  }

  // Store the pending job
  const pending = {
    scheduledAt: scheduledAt.toISOString(),
    scriptUrl: payload.scriptUrl,
    config: payload.config,
    isTest: !!payload.isTest,
    status: "scheduled",
    subject: payload.config.subject || ""
  };
  await storageSet("mb_scheduled_job", pending);

  // Create a one-time Chrome alarm
  await chrome.alarms.clear("mb_scheduled_send");
  chrome.alarms.create("mb_scheduled_send", { when: scheduledAt.getTime() });

  return { ok: true, scheduledAt: scheduledAt.toISOString() };
}

async function scheduleCancel() {
  await chrome.alarms.clear("mb_scheduled_send");
  await storageSet("mb_scheduled_job", null);
  return { ok: true };
}

async function scheduleGet() {
  const job = await storageGet("mb_scheduled_job");
  return job || null;
}

async function executeScheduledSend() {
  const job = await storageGet("mb_scheduled_job");
  if (!job || job.status !== "scheduled") return;

  // Mark as running
  await storageSet("mb_scheduled_job", Object.assign({}, job, { status: "running" }));

  try {
    const res = await apiFetch(job.scriptUrl, "sendMerge", { config: job.config });
    const results = Array.isArray(res.data) ? res.data : [];
    const sent = results.filter(function(r) { return r.status === "SENT"; }).length;

    await storageSet("mb_scheduled_job", Object.assign({}, job, {
      status: res.ok ? "done" : "error",
      error: res.ok ? null : (res.error || "Send failed"),
      results: results,
      sentCount: sent,
      finishedAt: new Date().toISOString()
    }));

    if (res.ok && !job.isTest) {
      await recordSend(sent);
    }
  } catch (err) {
    await storageSet("mb_scheduled_job", Object.assign({}, job, {
      status: "error",
      error: err.message || "Unknown error"
    }));
  }
}

// ── Smart Send Window (Feature 5) ─────────────────────────────────
// Stagger individual emails across a user-defined time window.
// Each row gets its own Chrome alarm firing at an evenly-spaced interval.

async function startSmartSend(payload) {
  if (!payload || !payload.scriptUrl || !payload.config || !payload.windowStartMs || !payload.windowEndMs) {
    throw new Error("Missing smart send payload.");
  }
  if (payload.windowEndMs <= payload.windowStartMs) {
    throw new Error("Window end must be after window start.");
  }
  if (payload.windowStartMs <= Date.now()) {
    throw new Error("Window start must be in the future.");
  }

  // Store the smart send queue — we'll schedule one alarm per row
  // The recipients list must be pre-computed by the popup
  const recipients = Array.isArray(payload.recipients) ? payload.recipients : [];
  if (recipients.length === 0) throw new Error("No recipients provided.");

  const windowMs = payload.windowEndMs - payload.windowStartMs;
  const intervalMs = Math.max(1000, Math.floor(windowMs / recipients.length));

  const job = {
    id: "smart_" + Date.now(),
    scriptUrl: payload.scriptUrl,
    config: payload.config,       // base config (no recipients — sent per-row via index)
    recipients: recipients,        // [{email, rowIndex}]
    windowStartMs: payload.windowStartMs,
    windowEndMs: payload.windowEndMs,
    intervalMs: intervalMs,
    status: "scheduled",
    progress: { total: recipients.length, sent: 0, errors: 0, done: false, results: [] }
  };
  await storageSet("mb_smart_send_job", job);

  // Cancel any existing smart send alarms
  for (let i = 0; i < recipients.length; i++) {
    await chrome.alarms.clear("mb_smart_send_" + i);
  }

  // Schedule one alarm per recipient
  recipients.forEach(function(_, idx) {
    const fireAt = payload.windowStartMs + idx * intervalMs;
    chrome.alarms.create("mb_smart_send_" + idx, { when: fireAt });
  });

  return { ok: true, jobId: job.id, intervalMs: intervalMs, count: recipients.length };
}

async function executeSmartSendRow(rowIndex) {
  const job = await storageGet("mb_smart_send_job");
  if (!job || job.status === "cancelled") return;

  const recipient = job.recipients[rowIndex];
  if (!recipient) return;

  const config = Object.assign({}, job.config, {
    // Build a single-recipient config: override selectedEmails to just this one
    selectedEmails: [recipient.email],
    testMode: false
  });

  try {
    const res = await apiFetch(job.scriptUrl, "sendMerge", { config: config });
    const results = Array.isArray(res.data) ? res.data : [];
    const sent = results.filter(function(r) { return r.status === "SENT"; }).length;

    // Update progress
    const updated = await storageGet("mb_smart_send_job");
    if (updated && updated.id === job.id) {
      updated.progress.sent   += sent;
      updated.progress.errors += results.filter(function(r) { return r.status === "ERROR"; }).length;
      updated.progress.results = updated.progress.results.concat(results);
      const isDone = (updated.progress.sent + updated.progress.errors) >= updated.recipients.length;
      updated.progress.done = isDone;
      if (isDone) updated.status = "done";
      await storageSet("mb_smart_send_job", updated);
      if (sent > 0) await recordSend(sent);
    }
  } catch (err) {
    const updated = await storageGet("mb_smart_send_job");
    if (updated && updated.id === job.id) {
      updated.progress.errors++;
      updated.progress.results.push({ email: recipient.email, status: "ERROR", error: err.message });
      await storageSet("mb_smart_send_job", updated);
    }
  }
}

async function cancelSmartSend() {
  const job = await storageGet("mb_smart_send_job");
  if (job) {
    // Clear all scheduled alarms
    for (let i = 0; i < (job.recipients || []).length; i++) {
      await chrome.alarms.clear("mb_smart_send_" + i);
    }
    await storageSet("mb_smart_send_job", Object.assign({}, job, {
      status: "cancelled",
      progress: Object.assign({}, job.progress, { done: true })
    }));
  }
  return { ok: true };
}

// ── API fetch helper ──────────────────────────────────────────────

async function apiFetch(scriptUrl, action, payload) {
  const response = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(Object.assign({ action: action }, payload || {})),
    redirect: "follow",
    credentials: "include"
  });
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    return { ok: false, error: "Invalid response from Apps Script backend." };
  }
}

// ── Utilities ─────────────────────────────────────────────────────

function getTodayKey() {
  const now = new Date();
  return now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0") + "-" + String(now.getDate()).padStart(2, "0");
}

function storageGet(key) {
  return new Promise(function(resolve) {
    chrome.storage.local.get([key], function(result) { resolve(result[key]); });
  });
}

function storageSet(key, value) {
  return new Promise(function(resolve) {
    const obj = {};
    obj[key] = value;
    chrome.storage.local.set(obj, resolve);
  });
}
