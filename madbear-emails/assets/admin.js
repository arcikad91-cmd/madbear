/**
 * Madbear Emails admin UI — talks only to plugin AJAX endpoints, which proxy
 * the existing Apps Script backend actions (getBackendInfo, getSheetTabs,
 * getSheetData, listDrafts, sendMerge, sendFollowUp, sendDripStep).
 * No fake data anywhere: every number/table comes from a real request.
 */
(function () {
	'use strict';
	if (typeof mbearAdmin === 'undefined') return;

	function ajax(op, data, method) {
		var fd = new FormData();
		fd.append('action', 'mbear_' + op);
		fd.append('nonce', mbearAdmin.nonce);
		Object.keys(data || {}).forEach(function (k) {
			var v = data[k];
			if (Array.isArray(v)) { v.forEach(function (x) { fd.append(k + '[]', x); }); }
			else if (v !== null && typeof v === 'object') { Object.keys(v).forEach(function (kk) { fd.append(k + '[' + kk + ']', v[kk]); }); }
			else { fd.append(k, v); }
		});
		return fetch(mbearAdmin.ajaxUrl, { method: method || 'POST', credentials: 'same-origin', body: fd })
			.then(function (r) { return r.json(); });
	}

	function show(elId, html, isError) {
		var el = document.getElementById(elId);
		if (!el) return;
		el.innerHTML = '<div class="' + (isError ? 'mbear-err' : '') + '">' + html + '</div>';
	}

	function esc(s) { var d = document.createElement('div'); d.textContent = s == null ? '' : String(s); return d.innerHTML; }

	function errText(res) {
		return (res.data && res.data.message) ? res.data.message : 'Request failed.';
	}

	function extractSheetId(raw) {
		var m = String(raw || '').match(/\/spreadsheets\/d\/([A-Za-z0-9_-]+)/);
		return m ? m[1] : String(raw || '').trim();
	}

	/* ── Settings page ── */
	var settingsBtn = document.getElementById('mbear-test-ajax');
	if (settingsBtn) settingsBtn.onclick = function () {
		settingsBtn.disabled = true;
		ajax('backend_info', {}).then(function (res) {
			settingsBtn.disabled = false;
			show('mbear-settings-msg', res.success ? 'OK: ' + esc(JSON.stringify(res.data.data)) : esc(errText(res)), !res.success);
		});
	};

	/* ── Sheets page ── */
	var tabsBtn = document.getElementById('mbear-load-tabs');
	if (tabsBtn) tabsBtn.onclick = function () {
		tabsBtn.textContent = mbearAdmin.i18n.loading;
		ajax('sheet_tabs', { spreadsheet_id: extractSheetId(document.getElementById('mbear-sheet-id').value) }).then(function (res) {
			tabsBtn.textContent = 'Load tabs';
			if (!res.success) { show('mbear-sheet-out', esc(errText(res)), true); return; }
			var d = res.data.data || {};
			var sel = document.getElementById('mbear-tab-select');
			sel.innerHTML = '';
			(d.tabs || []).forEach(function (name) {
				var o = document.createElement('option'); o.value = name; o.textContent = name; sel.appendChild(o);
			});
			sel.style.display = '';
			document.getElementById('mbear-load-data').style.display = '';
			show('mbear-sheet-out', '<p>Spreadsheet name: <b>' + esc(d.spreadsheetName) + '</b></p>');
		});
	};
	var dataBtn = document.getElementById('mbear-load-data');
	if (dataBtn) dataBtn.onclick = function () {
		dataBtn.textContent = mbearAdmin.i18n.loading;
		ajax('sheet_data', { spreadsheet_id: extractSheetId(document.getElementById('mbear-sheet-id').value), tab: document.getElementById('mbear-tab-select').value }).then(function (res) {
			dataBtn.textContent = 'Preview rows';
			if (!res.success) { show('mbear-sheet-out', esc(errText(res)), true); return; }
			var rows = res.data.data || [];
			var html = '<p>Total data rows: <b>' + res.data.total + '</b>, already SENT in sheet: <b>' + res.data.already + '</b>, remaining: <b>' + (res.data.total - res.data.already) + '</b></p>';
			if (rows.length) {
				html += '<table class="widefat striped"><thead><tr>';
				rows[0].forEach(function (h) { html += '<th>' + esc(h) + '</th>'; });
				html += '</tr></thead><tbody>';
				rows.slice(1).forEach(function (r) {
					html += '<tr>'; r.forEach(function (c) { html += '<td>' + esc(c) + '</td>'; }); html += '</tr>';
				});
				html += '</tbody></table><p class="mbear-hint">Preview limited to first 50 data rows.</p>';
			}
			show('mbear-sheet-out', html);
		});
	};

	/* ── Drafts (Templates page + campaign picker) ──
	   Backend listDrafts returns: [{id, subject, body(html), plainBody}] */
	var draftsCache = [];
	function loadDrafts(targetId, fillSelectId) {
		ajax('list_drafts', {}).then(function (res) {
			var el = document.getElementById(targetId);
			if (!el) return;
			if (!res.success) { el.innerHTML = '<span class="mbear-err">' + esc(errText(res)) + '</span>'; return; }
			draftsCache = res.data.data || [];
			var html = '<table class="widefat striped"><thead><tr><th>ID</th><th>Subject</th></tr></thead><tbody>';
			draftsCache.forEach(function (d) {
				html += '<tr><td><button type="button" class="button-link mbear-draft-pick" data-id="' + esc(d.id) + '">' + esc(d.id) + '</button></td><td>' + esc(d.subject) + '</td></tr>';
			});
			html += '</tbody></table>';
			el.innerHTML = html;
			el.querySelectorAll('.mbear-draft-pick').forEach(function (b) {
				b.onclick = function () {
					var inp = document.getElementById('camp-draft');
					if (inp) inp.value = b.getAttribute('data-id');
				};
			});
			if (fillSelectId) {
				var sel = document.getElementById(fillSelectId);
				sel.innerHTML = '<option value="">— select draft —</option>';
				draftsCache.forEach(function (d, i) {
					var o = document.createElement('option'); o.value = i; o.textContent = d.subject + ' (' + d.id + ')'; sel.appendChild(o);
				});
			}
		});
	}
	var dBtn = document.getElementById('mbear-load-drafts');
	if (dBtn) dBtn.onclick = function () { loadDrafts('mbear-drafts-out', 'tpl-from-draft'); };
	var pickBtn = document.getElementById('camp-pick-draft');
	if (pickBtn) pickBtn.onclick = function () { loadDrafts('camp-draft-list'); };
	var fillBtn = document.getElementById('mbear-fill-from-draft');
	if (fillBtn) fillBtn.onclick = function () {
		var i = document.getElementById('tpl-from-draft').value;
		if (i === '') return;
		var d = draftsCache[+i];
		document.getElementById('tpl-subject').value = d.subject || '';
		document.getElementById('tpl-html').value = d.body || '';
		document.getElementById('tpl-body').value = d.plainBody || '';
	};

	/* ── Campaign form helpers ── */
	function campaignFields(extra) {
		var f = extra || {};
		f.name = (document.getElementById('camp-name') || {}).value || '';
		f.spreadsheet_id = extractSheetId((document.getElementById('camp-sheet') || {}).value);
		f.sheet_tab = (document.getElementById('camp-tab') || {}).value || 'Sheet1';
		f.draft_id = (document.getElementById('camp-draft') || {}).value || '';
		f.subject = (document.getElementById('camp-subject') || {}).value || '';
		f.body = (document.getElementById('camp-body') || {}).value || '';
		f.html_body = (document.getElementById('camp-html') || {}).value || '';
		f.from_name = (document.getElementById('camp-from') || {}).value || '';
		f.reply_to = (document.getElementById('camp-reply') || {}).value || '';
		f.cc = (document.getElementById('camp-cc') || {}).value || '';
		f.bcc = (document.getElementById('camp-bcc') || {}).value || '';
		f.delay_ms = (document.getElementById('camp-delay') || {}).value || '500';
		return f;
	}
	var createBtn = document.getElementById('mbear-create-campaign');
	if (createBtn) createBtn.onclick = function () {
		createBtn.disabled = true;
		ajax('create_campaign', campaignFields()).then(function (res) {
			createBtn.disabled = false;
			if (res.success) {
				show('mbear-campaign-msg', 'Campaign #' + res.data.campaign_id + ' created. Open the Queue page to start sending.');
				setTimeout(function () { location.reload(); }, 1200);
			} else show('mbear-campaign-msg', esc(errText(res)), true);
		});
	};
	var sendTestBtn = document.getElementById('mbear-test-send');
	if (sendTestBtn) sendTestBtn.onclick = function () {
		var f = campaignFields({ test_email: (document.getElementById('camp-test-email') || {}).value || '' });
		sendTestBtn.disabled = true; sendTestBtn.textContent = mbearAdmin.i18n.sending;
		ajax('send_test', f).then(function (res) {
			sendTestBtn.disabled = false; sendTestBtn.textContent = 'Send test to…';
			show('mbear-campaign-msg', res.success ? 'Backend answer: ' + esc(JSON.stringify(res.data.data)) : esc(errText(res)), !res.success);
		});
	};

	/* campaign list buttons */
	document.querySelectorAll('tr[data-cid]').forEach(function (tr) {
		var cid = tr.getAttribute('data-cid');
		var st = tr.querySelector('.mbear-start');
		if (st) st.onclick = function () {
			if (!confirm(mbearAdmin.i18n.confirmStart)) return;
			st.disabled = true;
			ajax('start_campaign', { campaign_id: cid }).then(function () {
				location.href = 'admin.php?page=mbear-queue&campaign_id=' + cid;
			});
		};
		var del = tr.querySelector('.mbear-del');
		if (del) del.onclick = function () {
			if (!confirm(mbearAdmin.i18n.confirmDelete)) return;
			ajax('delete_campaign', { campaign_id: del.getAttribute('data-id') }).then(function () { location.reload(); });
		};
	});

	/* ── Templates CRUD ── */
	var tplSave = document.getElementById('mbear-tpl-save');
	if (tplSave) tplSave.onclick = function () {
		var t = {
			name: document.getElementById('tpl-name').value,
			subject: document.getElementById('tpl-subject').value,
			body: document.getElementById('tpl-body').value,
			html_body: document.getElementById('tpl-html').value,
			from_name: document.getElementById('tpl-from').value,
			reply_to: document.getElementById('tpl-reply').value,
			cc_field: document.getElementById('tpl-cc').value,
			bcc_field: document.getElementById('tpl-bcc').value
		};
		ajax('save_template', { template_id: document.getElementById('tpl-id').value || 0, template: t })
			.then(function (res) {
				show('mbear-tpl-msg', res.success ? 'Template saved (#' + res.data.template_id + ')' : esc(errText(res)), !res.success);
			});
	};
	document.querySelectorAll('.mbear-tpl-edit').forEach(function (b) {
		b.onclick = function () {
			var t = JSON.parse(b.closest('tr').getAttribute('data-template'));
			document.getElementById('tpl-id').value = t.id;
			document.getElementById('tpl-name').value = t.name;
			document.getElementById('tpl-subject').value = t.subject;
			document.getElementById('tpl-body').value = t.body;
			document.getElementById('tpl-html').value = t.html_body;
			document.getElementById('tpl-from').value = t.from_name;
			document.getElementById('tpl-reply').value = t.reply_to;
			document.getElementById('tpl-cc').value = t.cc_field;
			document.getElementById('tpl-bcc').value = t.bcc_field;
		};
	});
	document.querySelectorAll('.mbear-tpl-del').forEach(function (b) {
		b.onclick = function () {
			ajax('delete_template', { template_id: b.getAttribute('data-id') }).then(function () { location.reload(); });
		};
	});

	/* ── Queue page ── */
	var qSel = document.getElementById('mbear-queue-camp');
	if (qSel) {
		qSel.onchange = function () {
			location.href = 'admin.php?page=mbear-queue&campaign_id=' + qSel.value;
		};
		var cid = qSel.getAttribute('data-current');
		var log = document.getElementById('mbear-queue-log');
		var polling = false;

		function addLog(msg) {
			var p = document.createElement('p'); p.textContent = new Date().toLocaleTimeString() + '  ' + msg;
			log.insertBefore(p, log.firstChild);
		}
		function setNums(n) {
			Object.keys(n).forEach(function (k) {
				var el = document.getElementById(k);
				if (el) el.textContent = n[k];
			});
		}
		function renderCounts(counts) {
			setNums({
				'q-total': counts.sent + counts.error + counts.pending + counts.unknown + counts.sending,
				'q-sent': counts.sent, 'q-errors': counts.error,
				'q-pending': counts.pending, 'q-unknown': counts.unknown + counts.sending
			});
		}
		function renderReport(r) {
			if (!r) return;
			setNums({ 'q-total': r.total, 'q-sent': r.sent, 'q-errors': r.errors, 'q-pending': r.pending, 'q-unknown': r.unknown + r.sending });
		}
		function refresh() {
			ajax('campaign_status', { campaign_id: cid }, 'GET').then(function (res) {
				if (res.success) {
					document.getElementById('mbear-queue-status').textContent = res.data.status;
					renderCounts(res.data.counts);
					if (res.data.lastErr) addLog('Last backend error: ' + res.data.lastErr);
				} else addLog('Status error: ' + errText(res));
			});
		}
		function stepLoop() {
			if (!polling) return;
			ajax('run_step', { campaign_id: cid }).then(function (res) {
				if (!res.success) { polling = false; addLog('Step failed: ' + errText(res)); refresh(); return; }
				var d = res.data;
				if (d.error && !d.report) { polling = false; addLog('Stopped: ' + d.error); refresh(); return; }
				if (d.paused) { polling = false; addLog((d.quota ? 'Quota reached — campaign paused. ' : 'Backend error — campaign paused: ') + (d.error || '')); renderReport(d.report); return; }
				if (d.done && d.sent === undefined) { polling = false; addLog('Queue empty — campaign completed.'); renderReport(d.report); return; }
				addLog('Batch: sent ' + (d.sent || 0) + ', errors ' + (d.errors || 0) + ', unconfirmed ' + (d.unknown || 0) + (d.reconciled ? ', reconciled ' + d.reconciled : ''));
				renderReport(d.report);
				if (d.done) { polling = false; addLog('Campaign completed.'); return; }
				setTimeout(stepLoop, 500);
			}).catch(function (e) {
				polling = false;
				addLog('Network error during step: ' + e + '. Press Resume — unconfirmed rows will be reconciled against the sheet before any retry.');
			});
		}
		document.getElementById('q-start').onclick = function () {
			if (!confirm(mbearAdmin.i18n.confirmStart)) return;
			ajax('start_campaign', { campaign_id: cid }).then(function (res) {
				if (!res.success) { addLog('Start failed: ' + errText(res)); return; }
				renderReport(res.data.report);
				polling = true; addLog('Sending started.'); stepLoop();
			});
		};
		document.getElementById('q-pause').onclick = function () {
			polling = false;
			ajax('pause_campaign', { campaign_id: cid }).then(function (res) {
				addLog('Pause requested — the currently in-flight batch will still finish on the backend.');
				if (res.success) renderReport(res.data.report);
			});
		};
		document.getElementById('q-resume').onclick = function () {
			ajax('resume_campaign', { campaign_id: cid }).then(function (res) {
				if (!res.success) { addLog('Resume failed: ' + errText(res)); return; }
				addLog('Resumed. Reconciled ' + res.data.reconciled + ' confirmed, re-queued ' + res.data.requeued + ' unconfirmed.');
				renderReport(res.data.report);
				polling = true; stepLoop();
			});
		};
		document.getElementById('q-refresh').onclick = refresh;
		if (cid && cid !== '0') refresh();
	}

	/* ── Follow-up & drip (History page) ── */
	var fuBtn = document.getElementById('mbear-send-followup');
	if (fuBtn) fuBtn.onclick = function () {
		if (!confirm('Really send a follow-up through sendFollowUp to all confirmed recipients of this campaign?')) return;
		fuBtn.disabled = true; fuBtn.textContent = mbearAdmin.i18n.sending;
		ajax('send_follow_up', {
			campaign_id: document.getElementById('fu-campaign').value,
			subject: document.getElementById('fu-subject').value,
			body: document.getElementById('fu-body').value,
			no_thread: document.getElementById('fu-nothread').checked ? 1 : 0
		}).then(function (res) {
			fuBtn.disabled = false; fuBtn.textContent = 'Send follow-up';
			show('mbear-fu-msg', res.success ? 'Backend answer: ' + esc(JSON.stringify(res.data.data)) : esc(errText(res)), !res.success);
		});
	};
	var dripBtn = document.getElementById('mbear-send-drip');
	if (dripBtn) dripBtn.onclick = function () {
		dripBtn.disabled = true;
		ajax('send_drip_step', {
			campaign_id: document.getElementById('fu-campaign').value,
			step_index: document.getElementById('drip-step').value
		}).then(function (res) {
			dripBtn.disabled = false;
			show('mbear-fu-msg', res.success ? 'Backend answer: ' + esc(JSON.stringify(res.data.data)) : esc(errText(res)), !res.success);
		});
	};
})();
