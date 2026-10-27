# -*- coding: utf-8 -*-
import re, sys
sys.path.insert(0, '/workspace')
from _ru_map import MAP

EXCLUDE_LINES = [
    'rows.push([\'Campaign\',\'Type\',\'Date\',\'Sent\',\'Errors\',\'Rate (%)\']);',
    'var rows = [[\'Campaign\',\'Email\',\'Status\',\'Timestamp\',\'Error\']];',
    "var campCols = ['Campaign','Type','Date','Sent','Errors','Delivery Rate','Status','Tags'];",
    "var breakHeaders = ['Campaign','Type','Date','Sent','Delivered','Errors','Rate','Trend'];",
    'if (info.error && String(info.error).indexOf("Unknown action: getBackendInfo") !== -1) {',
    '// If the backend is old it will return "Unknown action: sendFollowUp"',
    'if (errMsg.indexOf("Unknown action") !== -1 || errMsg.indexOf("sendFollowUp") !== -1) {',
    'const isOldBackend = errMsg.indexOf("Unknown action") !== -1 ||',
    'status:         errors === (sent + errors) ? "failed" : "sent",',
    'type:           isContactsCampaign ? "sent" : "sent",',
    "rows.push([c.name||'', c.type||'sent', c.date||'', c.total||0, c.errors||0, r]);",
]

FRAGMENTS = [
 ("' sent</strong> as threaded replies — each recipient received the message in the same conversation thread. Your sheet now has a <strong>FollowUpStatus</strong> column marked <strong>Done</strong> for each recipient.</div>'",
  "' дожимных писем отправлено</strong> как ответы в той же цепочке — каждый получатель увидел письмо в том же обсуждении. В вашей таблице появился столбец <strong>FollowUpStatus</strong> со значением <strong>Готово</strong> для каждого получателя.</div>'"),
 ("+ ' follow-up' + ((sent || tests) === 1 ? '' : 's') + ' sent</strong>'",
  "+ ' дожим' + ((sent || tests) === 1 ? '' : 'ов') + ' отправлено</strong>'"),
 ("' sent · ' + p.errors + ' errors · ' + pct + '% complete'",
  "' отправлено · ошибок: ' + p.errors + ' · выполнено: ' + pct + '%'"),
 ("+ ' sent</span>'", "+ ' отправлено</span>'"),
 ("+ ' sent</div>'", "+ ' отправлено</div>'"),
 ('"Step " + (stepIdx+1) + " sent to " + sent + " recipients!"',
  '"Шаг " + (stepIdx+1) + " отправлен " + sent + " получателям!"'),
 ('parts.push(sent + " sent")', 'parts.push(sent + " отправлено")'),
 ('+ " rows were already marked SENT or had no email."',
  '+ " строк уже были помечены SENT или не содержали email."'),
 ("+ ' rows had no valid email address.'", "+ ' строк не содержали корректный email-адрес.'"),
 ("'In the <b>Recipients</b> field, paste email addresses separated by commas or newlines — or select a saved contact list.'",
  "'В поле <b>Получатели</b> вставьте email-адреса через запятую или с новой строки — или выберите сохранённый список контактов.'"),
 ("'Campaign'", "'Кампания'"),
 ('"Campaign"', '"Кампания"'),
 ("esc(att.name || 'file')", "esc(att.name || 'файл')"),
 ('"Unknown"', '"Неизвестно"'),
]

KEEPSET = set(x.strip() for x in EXCLUDE_LINES)

def apply(src):
    total = 0
    # Pass A: plain string replacement of fragments and quoted literals
    for f, r in FRAGMENTS:
        if f in src:
            c = src.count(f); src = src.replace(f, r); total += c
    keys = sorted(MAP.keys(), key=len, reverse=True)
    for k in keys:
        v = MAP[k]
        if "'" not in k and '"' not in k:
            for q in ("'", '"'):
                lit = q + k + q
                if lit in src:
                    c = src.count(lit)
                    # protect excluded lines: do per-line replace
                    lines = src.split('\n')
                    done = 0
                    for i, ln in enumerate(lines):
                        if ln.strip() in KEEPSET: continue
                        if lit in ln:
                            lines[i] = ln.replace(lit, q + v + q); done += 1
                    src = '\n'.join(lines); total += done
        # HTML visible text, title="", placeholder=""
        for pat_pre, pat_post, rep_pre, rep_post in (('>', '<', '>', '<'), ('title="', '"', 'title="', '"'), ('placeholder="', '"', 'placeholder="', '"')):
            frag = pat_pre + k + pat_post
            if frag in src and '"' not in v:
                lines = src.split('\n')
                for i, ln in enumerate(lines):
                    if ln.strip() in KEEPSET: continue
                    if frag in ln:
                        lines[i] = ln.replace(frag, rep_pre + v + rep_post); total += 1
                src = '\n'.join(lines)
    return src, total

src, n = apply(open('/workspace/popup.js', encoding='utf-8').read())
open('/workspace/popup.js', 'w', encoding='utf-8').write(src)
print('popup.js replacements:', n)
html, nh = apply(open('/workspace/popup.html', encoding='utf-8').read())
open('/workspace/popup.html', 'w', encoding='utf-8').write(html)
print('popup.html replacements:', nh)
