// ── Dark mode CSS injected at runtime ──
// Strategy: set CSS custom properties on .db-shell (for inline style="var(--db-*)")
// AND direct !important overrides on class selectors (for class-based styles)
(function injectDarkCSS() {
  var style = document.createElement('style');
  style.id = 'mb-dark-override';
  style.textContent = [
    // ── CSS VARIABLES on .db-shell (fixes all inline style="background:var(--db-*)" elements) ──
    '.db-shell{',
      '--db-bg:#0f1011;',
      '--db-bg2:#1f2123;',
      '--db-surface:#1f2123;',
      '--db-surface2:#2b2f31;',
      '--db-line:#2a2c2e;',
      '--db-line-soft:#222426;',
      '--db-ink:#f1f0ec;',
      '--db-ink2:#c8c5bc;',
      '--db-muted:#6b7280;',
      '--db-green:#3ecf7a;',
      '--db-green-soft:#0e2a1a;',
      '--db-green-tint:#0b2016;',
      '--db-gold:#4a3a10;',
      '--db-gold-tint:#1a1500;',
      '--db-blue:#60a5fa;',
      '--db-blue-soft:#0f1e30;',
      '--db-border:#2a2c2e;',
      '--db-amber:#f59e0b;',
      '--db-green3:#3ecf7a;',
    '}',

    // ── DIRECT OVERRIDES for class-based elements ──
    // Shell
    '.db-shell{background:#0f1011!important;color:#f1f0ec!important}',
    '.db-shell .db-main{background:#0f1011!important}',
    '.db-shell .db-content{background:#0f1011!important}',
    // Sidebar
    '.db-shell .db-sidebar{background:#161719!important;border-right-color:#2a2c2e!important}',
    '.db-shell .db-sidebar-section{color:#424750!important}',
    // Topbar
    '.db-shell.db-shell .db-topbar{background:#1f2123!important;border-bottom-color:#2a2c2e!important}',
    '.db-shell .db-topbar-search{background:#1e2022!important;border-color:#2a2c2e!important}',
    '.db-shell .db-topbar-search input{color:#f1f0ec!important;background:transparent!important}',
    '.db-shell .db-kbd{background:#161719!important;border-color:#2a2c2e!important;color:#6b7280!important}',
    // Cards — use double-class for specificity (0,3,0) to beat popup.html (0,2,0)
    '.db-shell.db-shell .db-card{background:#1f2123!important;border-color:#222426!important}',
    '.db-shell.db-shell .db-card.elev{background:#1f2123!important;border-color:#2a2c2e!important}',
    '.db-shell .db-card-title{color:#f1f0ec!important}',
    '.db-shell .db-card-sub{color:#6b7280!important}',
    // Stats
    '.db-shell .db-stat{background:#161719!important;border-color:#222426!important}',
    '.db-shell .db-stat-value{color:#f1f0ec!important}',
    '.db-shell .db-stat-label{color:#6b7280!important}',
    '.db-shell .db-stat-foot{color:#6b7280!important}',
    // Page head
    '.db-shell .db-page-title{color:#f1f0ec!important}',
    '.db-shell .db-page-sub{color:#6b7280!important}',
    // Crumbs
    '.db-shell .db-crumbs{color:#6b7280!important}',
    '.db-shell .db-crumbs .current{color:#f1f0ec!important}',
    '.db-shell .db-crumbs .sep{color:#2a2c2e!important}',
    // Brand
    '.db-shell .db-brand-logo{color:#f1f0ec!important}',
    // Nav
    '.db-shell .db-nav-btn{color:#c8c5bc!important}',
    '.db-shell .db-nav-btn svg{color:#6b7280!important}',
    '.db-shell .db-nav-btn:hover{background:#1e2022!important}',
    '.db-shell .db-nav-btn.active{background:#0b2016!important;color:#3ecf7a!important;border-color:#0e2a1a!important}',
    '.db-shell .db-nav-btn.active svg{color:#3ecf7a!important}',
    '.db-shell .db-nav-btn .db-nav-count{background:#1e2022!important;border-color:#2a2c2e!important;color:#6b7280!important}',
    // Buttons
    '.db-shell .db-btn.secondary{background:#1e2022!important;border-color:#2a2c2e!important;color:#f1f0ec!important}',
    '.db-shell .db-btn.secondary:hover{background:#252729!important}',
    '.db-shell .db-btn.ghost{color:#6b7280!important}',
    '.db-shell .db-btn.ghost:hover{background:#1e2022!important;color:#f1f0ec!important}',
    // Icon buttons
    '.db-shell .db-icon-btn{background:#1e2022!important;border-color:#2a2c2e!important;color:#6b7280!important}',
    '.db-shell .db-icon-btn:hover{background:#252729!important;color:#f1f0ec!important}',
    // Collapse btn
    '.db-shell .db-collapse-btn{background:#1e2022!important;border-color:#2a2c2e!important;color:#6b7280!important}',
    '.db-shell .db-collapse-btn:hover{background:#252729!important;color:#f1f0ec!important}',
    // Plan card
    '.db-shell .db-plan-card{background:linear-gradient(160deg,#1a1500,#161719)!important;border-color:#2a2008!important}',
    // Segmented control
    '.db-shell .db-seg{background:#161719!important;border-color:#2a2c2e!important}',
    '.db-shell .db-seg button{color:#6b7280!important}',
    '.db-shell .db-seg button:hover{color:#f1f0ec!important}',
    '.db-shell.db-shell .db-seg button.active{background:#2b2f31!important;color:#f1f0ec!important;box-shadow:0 1px 3px rgba(0,0,0,.5)!important}',
    // Tabs
    '.db-shell .db-tabs{border-bottom-color:#222426!important}',
    '.db-shell .db-tab-btn{color:#6b7280!important}',
    '.db-shell .db-tab-btn:hover{color:#f1f0ec!important}',
    '.db-shell .db-tab-btn.active{color:#3ecf7a!important;border-bottom-color:#3ecf7a!important}',
    // Tables
    '.db-shell .db-table{background:transparent!important}',
    '.db-shell .db-table th{border-bottom-color:#222426!important;color:#6b7280!important;background:transparent!important}',
    '.db-shell .db-table td{border-bottom-color:#222426!important;color:#c8c5bc!important;background:transparent!important}',
    '.db-shell .db-table tr:hover td{background:#1e2022!important}',
    // Fields — inputs/selects/textareas (many rendered with inline styles using vars)
    '.db-shell .db-field{background:#1e2022!important;border-color:#2a2c2e!important}',
    '.db-shell .db-field input,.db-shell .db-field select,.db-shell .db-field textarea{color:#f1f0ec!important;background:transparent!important}',
    '.db-shell .db-field-label{color:#6b7280!important}',
    // ALL input/select/textarea inside shell (catches inline-styled ones too)
    '.db-shell input:not([type=checkbox]):not([type=radio]){background:#1e2022!important;color:#f1f0ec!important;border-color:#2a2c2e!important}',
    '.db-shell select{background:#1e2022!important;color:#f1f0ec!important;border-color:#2a2c2e!important}',
    '.db-shell textarea{background:#1e2022!important;color:#f1f0ec!important;border-color:#2a2c2e!important}',
    // Modal
    '.db-shell .db-modal{background:#161719!important;border-color:#2a2c2e!important}',
    '.db-shell .db-modal-head{border-bottom-color:#222426!important;color:#f1f0ec!important}',
    '.db-shell .db-modal-body{background:#161719!important}',
    '.db-shell .db-modal-foot{background:#1e2022!important;border-top-color:#222426!important}',
    '.db-shell .db-modal-backdrop{background:rgba(0,0,0,.7)!important}',
    // Chips, pills, tags
    '.db-shell .db-chip{background:#1e2022!important;border-color:#2a2c2e!important;color:#c8c5bc!important}',
    '.db-shell .db-chip:hover{background:#0b2016!important;color:#3ecf7a!important;border-color:#0e2a1a!important}',
    '.db-shell .db-pill{background:#1e2022!important;border-color:#2a2c2e!important;color:#6b7280!important}',
    '.db-shell .db-tag{background:#1e2022!important;border-color:#2a2c2e!important;color:#6b7280!important}',
    // Sheet row
    '.db-shell .db-sheet-row{background:#1e2022!important;border-color:#2a2c2e!important;color:#c8c5bc!important}',
    '.db-shell .db-sheet-row:hover{background:#0b2016!important;border-color:#3ecf7a!important}',
    // Compose preview
    '.db-shell .db-compose-preview{background:#0f1011!important;border-color:#222426!important}',
    // Toggle
    '.db-shell .db-toggle{background:#252729!important;border-color:#2a2c2e!important}',
    '.db-shell .db-toggle::after{background:#c8c5bc!important}',
    '.db-shell .db-toggle.on{background:#3ecf7a!important;border-color:#3ecf7a!important}',
    '.db-shell .db-toggle.on::after{background:#fff!important}',
    // Progress
    '.db-shell .db-progress{background:#252729!important}',
    // Drip steps
    '.db-shell .db-step{background:#1e2022!important;border-color:#2a2c2e!important}',
    '.db-shell .db-step.off .db-step-num{background:#252729!important;color:#6b7280!important;border-color:#2a2c2e!important}',
    // Divider
    '.db-shell .db-divider{background:#222426!important}',
    // Row actions
    '.db-shell .db-row-actions button:hover{background:#1e2022!important;border-color:#2a2c2e!important;color:#f1f0ec!important}',
    // Plan tiles
    '.db-shell .db-plan-tile{background:#1e2022!important;border-color:#2a2c2e!important}',
    '.db-shell .db-plan-tile.current{background:linear-gradient(180deg,#1a1500,#1e2022)!important;border-color:#2a2008!important}',
    // Info banner
    '.db-shell .db-info-banner{background:#0f1e30!important;border-color:#1e3a5a!important;color:#60a5fa!important}',
    // Empty state
    '.db-shell .db-empty{color:#6b7280!important}',
    // Generic divs with inline style using vars — catch any stray white panels
    '.db-shell [style*="background:#fff"],[style*="background: #fff"],[style*="background:white"]{background:#1e2022!important}',

    // ── LIGHT MODE: restore CSS variables and direct colors ──
    'body.light .db-shell{',
      '--db-bg:#efece4;',
      '--db-bg2:#e9e5db;',
      '--db-surface:#f6f3ec;',
      '--db-surface2:#fbf9f3;',
      '--db-line:#d9d3c4;',
      '--db-line-soft:#e3ddcd;',
      '--db-ink:#14181a;',
      '--db-ink2:#2a302e;',
      '--db-muted:#6c7068;',
      '--db-green:#0f5132;',
      '--db-green-soft:#d8e7d8;',
      '--db-green-tint:#e6efdf;',
      '--db-gold:#92751a;',
      '--db-gold-tint:#f8efd6;',
      '--db-border:#d9d3c4;',
    '}',
    'body.light .db-shell{background:#efece4!important;color:#14181a!important}',
    'body.light .db-shell .db-main{background:#efece4!important}',
    'body.light .db-shell .db-content{background:#efece4!important}',
    'body.light .db-shell .db-sidebar{background:#e9e5db!important;border-right-color:#d9d3c4!important}',
    'body.light .db-shell .db-topbar{background:#efece4!important;border-bottom-color:#d9d3c4!important}',
    'body.light .db-shell .db-topbar-search{background:#fbf9f3!important;border-color:#d9d3c4!important}',
    'body.light .db-shell .db-topbar-search input{color:#14181a!important}',
    'body.light .db-shell .db-card{background:#f6f3ec!important;border-color:#e3ddcd!important}',
    'body.light .db-shell .db-card.elev{background:#fbf9f3!important;border-color:#e3ddcd!important}',
    'body.light .db-shell .db-card-title{color:#14181a!important}',
    'body.light .db-shell .db-stat{background:#f6f3ec!important;border-color:#e3ddcd!important}',
    'body.light .db-shell .db-stat-value{color:#14181a!important}',
    'body.light .db-shell .db-page-title{color:#14181a!important}',
    'body.light .db-shell .db-brand-logo{color:#14181a!important}',
    'body.light .db-shell .db-nav-btn{color:#2a302e!important}',
    'body.light .db-shell .db-nav-btn svg{color:#6c7068!important}',
    'body.light .db-shell .db-nav-btn:hover{background:#e9e5db!important}',
    'body.light .db-shell .db-nav-btn.active{background:#e6efdf!important;color:#0f5132!important;border-color:#d8e7d8!important}',
    'body.light .db-shell .db-nav-btn.active svg{color:#0f5132!important}',
    'body.light .db-shell .db-seg{background:#e9e5db!important;border-color:#d9d3c4!important}',
    'body.light .db-shell .db-seg button{color:#6c7068!important}',
    'body.light .db-shell .db-seg button.active{background:#fbf9f3!important;color:#14181a!important}',
    'body.light .db-shell .db-icon-btn{background:#fbf9f3!important;border-color:#d9d3c4!important;color:#6c7068!important}',
    'body.light .db-shell .db-btn.secondary{background:#fbf9f3!important;border-color:#d9d3c4!important;color:#14181a!important}',
    'body.light .db-shell .db-collapse-btn{background:#fbf9f3!important;border-color:#d9d3c4!important}',
    'body.light .db-shell .db-modal{background:#f6f3ec!important;border-color:#d9d3c4!important}',
    'body.light .db-shell .db-modal-body{background:#f6f3ec!important}',
    'body.light .db-shell .db-modal-foot{background:#fbf9f3!important;border-top-color:#e3ddcd!important}',
    'body.light .db-shell .db-field{background:#fbf9f3!important;border-color:#d9d3c4!important}',
    'body.light .db-shell .db-field input,.db-shell .db-field select,.db-shell .db-field textarea{color:#14181a!important}',
    'body.light .db-shell input:not([type=checkbox]):not([type=radio]){background:#fbf9f3!important;color:#14181a!important;border-color:#d9d3c4!important}',
    'body.light .db-shell select{background:#fbf9f3!important;color:#14181a!important;border-color:#d9d3c4!important}',
    'body.light .db-shell textarea{background:#fbf9f3!important;color:#14181a!important;border-color:#d9d3c4!important}',
    'body.light .db-shell .db-table td{color:#2a302e!important;border-bottom-color:#e3ddcd!important;background:transparent!important}',
    'body.light .db-shell .db-table th{border-bottom-color:#e3ddcd!important;color:#6c7068!important;background:transparent!important}',
    'body.light .db-shell .db-table tr:hover td{background:#fbf9f3!important}',
    'body.light .db-shell .db-tab-btn{color:#6c7068!important}',
    'body.light .db-shell .db-tab-btn.active{color:#0f5132!important;border-bottom-color:#0f5132!important}',
    'body.light .db-shell .db-toggle{background:#e9e5db!important;border-color:#d9d3c4!important}',
    'body.light .db-shell .db-toggle::after{background:#fff!important}',
    'body.light .db-shell .db-plan-card{background:linear-gradient(180deg,#f8efd6,#e9e5db)!important;border-color:#f3e6c2!important}',
    'body.light .db-shell .db-step{background:#fbf9f3!important;border-color:#e3ddcd!important}',
    'body.light .db-shell .db-sheet-row{background:#fbf9f3!important;border-color:#d9d3c4!important;color:#2a302e!important}',
    'body.light .db-shell .db-crumbs{color:#6c7068!important}',
    'body.light .db-shell .db-crumbs .current{color:#14181a!important}',
    'body.light .db-shell .db-plan-tile{background:#fbf9f3!important;border-color:#e3ddcd!important}',
    'body.light .db-shell .db-chip{background:#fbf9f3!important;border-color:#d9d3c4!important;color:#2a302e!important}',
    'body.light .db-shell .db-chip:hover{background:#e6efdf!important;color:#0f5132!important;border-color:#d8e7d8!important}',
    'body.light .db-shell .db-progress{background:#e3ddcd!important}',
    'body.light .db-shell .db-empty{color:#6c7068!important}',

    // ── Pills & tags ─────────────────────────────────────────────────
    'body.light .db-shell .db-pill{background:#fbf9f3!important;border-color:#d9d3c4!important;color:#6c7068!important}',
    'body.light .db-shell .db-pill.green{background:#e6efdf!important;border-color:#d8e7d8!important;color:#0a3a23!important}',
    'body.light .db-shell .db-pill.gold{background:#f8efd6!important;border-color:#f3e6c2!important;color:#92751a!important}',
    'body.light .db-shell .db-pill.red{background:#f5d9d6!important;border-color:#f5d9d6!important;color:#b3261e!important}',
    'body.light .db-shell .db-pill.amber{background:#f5e2c2!important;border-color:#f5e2c2!important;color:#c97a18!important}',
    'body.light .db-shell .db-pill.blue{background:#d6e3f3!important;border-color:#d6e3f3!important;color:#1e5fa6!important}',
    'body.light .db-shell .db-tag{background:#f0ece2!important;border-color:#d9d3c4!important;color:#6c7068!important}',
    'body.light .db-shell .db-tag.green{background:#e6efdf!important;border-color:#d8e7d8!important;color:#0a3a23!important}',
    'body.light .db-shell .db-tag.blue{background:#d6e3f3!important;border-color:#d6e3f3!important;color:#1e5fa6!important}',
    'body.light .db-shell .db-tag.amber{background:#f5e2c2!important;border-color:#f5e2c2!important;color:#c97a18!important}',
    'body.light .db-shell .db-tag.gold{background:#f8efd6!important;border-color:#f3e6c2!important;color:#92751a!important}',
    'body.light .db-shell .db-tag.red{background:#f5d9d6!important;border-color:#f5d9d6!important;color:#b3261e!important}',

    // ── Buttons ───────────────────────────────────────────────────────
    'body.light .db-shell .db-btn.ghost{color:#6c7068!important}',
    'body.light .db-shell .db-btn.ghost:hover{background:#e9e5db!important;color:#14181a!important}',
    'body.light .db-shell .db-btn.ghost.active{background:#e6efdf!important;color:#0f5132!important;border-color:#d8e7d8!important}',
    'body.light .db-shell .db-btn.danger{border-color:#f5d9d6!important;color:#b3261e!important}',
    'body.light .db-shell .db-btn.danger:hover{background:#f5d9d6!important}',

    // ── Icon buttons & row actions ────────────────────────────────────
    'body.light .db-shell .db-row-actions button{background:#f6f3ec!important;border-color:#e3ddcd!important;color:#6c7068!important}',
    'body.light .db-shell .db-row-actions button:hover{background:#e6efdf!important;border-color:#d8e7d8!important;color:#0f5132!important}',

    // ── Modal ─────────────────────────────────────────────────────────
    'body.light .db-shell .db-modal-head{border-bottom-color:#e3ddcd!important;color:#14181a!important}',
    'body.light .db-shell .db-modal-backdrop{background:rgba(20,24,26,0.35)!important}',

    // ── Field labels ──────────────────────────────────────────────────
    'body.light .db-shell .db-field-label{color:#6c7068!important}',

    // ── Info banner ───────────────────────────────────────────────────
    'body.light .db-shell .db-info-banner{background:#d6e3f3!important;border-color:#b8d0ec!important;color:#1e5fa6!important}',

    // ── Drip steps ────────────────────────────────────────────────────
    'body.light .db-shell .db-step.off .db-step-num{background:#e9e5db!important;color:#6c7068!important;border-color:#d9d3c4!important}',

    // ── Plan tiles (billing panel) ────────────────────────────────────
    'body.light .db-shell .db-plan-tile.current{background:linear-gradient(180deg,#f8efd6,#f0ece2)!important;border-color:#f3e6c2!important}',

    // ── Sheet rows ────────────────────────────────────────────────────
    'body.light .db-shell .db-sheet-row:hover{background:#e6efdf!important;border-color:#3ecf7a!important}',

    // ── Compose preview ───────────────────────────────────────────────
    'body.light .db-shell .db-compose-preview{background:#fbf9f3!important;border-color:#e3ddcd!important}',

    // ── Toggle ────────────────────────────────────────────────────────
    'body.light .db-shell .db-toggle.on{background:#0f5132!important;border-color:#0f5132!important}',
    'body.light .db-shell .db-toggle.on::after{background:#fff!important}',

    // ── Nav badges ────────────────────────────────────────────────────
    'body.light .db-shell .db-nav-btn .db-nav-count{background:#e9e5db!important;border-color:#d9d3c4!important;color:#6c7068!important}',

    // ── Topbar avatar & notif dot ─────────────────────────────────────
    'body.light .db-shell .db-notif-dot{background:#b3261e!important}',
    'body.light .db-shell .db-kbd{background:#fbf9f3!important;border-color:#d9d3c4!important;color:#6c7068!important}',
  ].join('');
  document.head.appendChild(style);
})();

// ── Self-contained translation function (no i18n.js needed) ─────────
var MB_STRINGS = {
  ru: {
    'db.nav.overview':'Overview',
    'db.nav.campaigns':'Campaigns',
    'db.nav.analytics':'Analytics',
    'db.nav.contacts':'Contacts',
    'db.nav.drip':'Drip',
    'db.nav.billing':'Billing',
    'db.nav.settings':'Settings',
    'db.nav.managePlan':'Manage plan',
    'db.overview.title':'Overview',
    'db.overview.sub':'Your sending activity at a glance',
    'db.overview.recentTitle':'Recent campaigns',
    'db.overview.viewAnalytics':'View analytics',
    'db.overview.newCampaign':'New campaign',
    'db.campaigns.title':'Campaigns',
    'db.campaigns.export':'Export',
    'db.campaigns.new':'New campaign',
    'db.analytics.title':'Analytics',
    'db.analytics.sub':'Delivery stats across all campaigns',
    'db.contacts.title':'Contacts',
    'db.contacts.export':'Export CSV',
    'db.contacts.import':'Import CSV',
    'db.contacts.add':'Add contact',
    'db.contacts.newCamp':'New campaign',
    'db.contacts.formName':'Full name',
    'db.contacts.formEmail':'Email address',
    'db.contacts.formTags':'Tags (comma separated)',
    'db.contacts.formGroup':'Group',
    'db.contacts.formGroupPlaceholder':'e.g. Leads, Customers…',
    'db.contacts.formCF':'Custom fields (key:value, one per line)',
    'db.contacts.saveAdd':'Save contact',
    'db.contacts.saveEdit':'Save changes',
    'db.contacts.cancel':'Cancel',
    'db.contacts.addTitle':'New contact',
    'db.contacts.editTitle':'Edit contact',
    'db.drip.title':'Drip sequences',
    'db.drip.sub':'Automated follow-up emails',
    'db.drip.sendStep':'Send step',
    'db.billing.title':'Billing',
    'db.billing.sub':'Plan and usage',
    'db.billing.sync':'Sync',
    'db.billing.manage':'Manage',
    'db.billing.upgrade':'Upgrade',
    'db.settings.title':'Settings',
    'db.settings.sub':'Account preferences, backends, and integrations',
    'db.settings.dashTheme':'Dashboard theme',
    'db.settings.dashHint':'Light or dark mode for the dashboard',
    'db.settings.light':'Light',
    'db.settings.dark':'Dark',
    'db.settings.language':'Language',
    'db.settings.langHint':'',
    'db.settings.backends':'Backends',
    'db.settings.guide':'Guide',
    'db.settings.about':'About',
    'db.compose.title':'New campaign',
    'db.compose.sub':'Connect your Google Sheet and write your message',
    'db.compose.composeTitle':'Write your email',
    'db.compose.campName':'Campaign name',
    'db.compose.sheetUrl':'Google Sheet URL',
    'db.compose.connect':'Connect sheet',
    'db.compose.subject':'Subject line',
    'db.compose.body':'Email body',
    'db.compose.back':'Back',
    'db.compose.test':'Send test',
    'db.compose.save':'Save draft',
    'db.compose.send':'Start sending',
  }
};
function t(key) {
  var lang = (typeof S !== 'undefined' && S.lang) ? S.lang : 'ru';
  var dict = MB_STRINGS[lang] || MB_STRINGS.ru;
  if (dict[key] !== undefined) return dict[key];
  if (MB_STRINGS.ru[key] !== undefined) return MB_STRINGS.ru[key];
  // Fall back to i18n.js TRANSLATIONS if available
  if (typeof TRANSLATIONS !== 'undefined') {
    var i18nDict = TRANSLATIONS[lang] || TRANSLATIONS['ru'];
    if (i18nDict && i18nDict[key] !== undefined) return i18nDict[key];
    if (TRANSLATIONS['ru'] && TRANSLATIONS['ru'][key] !== undefined) return TRANSLATIONS['ru'][key];
  }
  return key;
}
// ─────────────────────────────────────────────────────────────────────

const DEFAULT_SECTIONS = {
  recent: false,
  guidecopy: true,
  guidecreate: false,
  guidedeploy: false,
  guideauth: false,
  guideurl: false,
  guideuse: false,
  guidefollowup: false,
  guidefaq: false,
  compose: true,
  template: false,
  send: true,
  test: false,
  preview: false,
  followup_recipients: true,
  followup_compose: true,
  followup_send: true,
  followup_test: false
};

const FONT_PRESETS = [
  { key: "system",    label: "System",     family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
  { key: "rounded",   label: "Rounded",    family: "ui-rounded, 'SF Pro Rounded', -apple-system, sans-serif" },
  { key: "helvetica", label: "Helvetica",  family: "'Helvetica Neue', Helvetica, Arial, sans-serif" },
  { key: "humanist",  label: "Humanist",   family: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif" },
  { key: "geometric", label: "Geometric",  family: "'Century Gothic', Futura, Candara, sans-serif" },
  { key: "tahoma",    label: "Tahoma",     family: "Tahoma, Verdana, Geneva, sans-serif" },
  { key: "mono",      label: "Mono",       family: "'SF Mono', ui-monospace, 'Cascadia Code', Consolas, monospace" },
  { key: "serif",     label: "Serif",      family: "'New York', ui-serif, Georgia, 'Times New Roman', serif" },
  { key: "garamond",  label: "Garamond",   family: "Garamond, 'EB Garamond', Georgia, serif" }
];

const S = {
  view: "home",
  theme: "dark",
  font: "system",
  lang: "ru",
  scriptUrl: "",
  scriptUrls: [],
  sheets: [],
  selectedSheet: null,
  sheetTabs: [],
  selectedTab: "",
  sheetData: [],
  drafts: [],
  selectedDraft: null,
  fromName: "",
  replyTo: "",
  testEmail: "",
  delayMs: 500,
  composeSubject: "",
  composeBody: "",
  composeHtml: "",
  editorMode: "write",
  focusedFieldId: "",
  attachments: [],
  showImageInsert: false,
  results: [],
  history: [],
  stats: { sent: 0, campaigns: 0 },
  // Follow-up / retarget state
  followUpCampaignId: null,   // original campaign we're following up on
  followUpSubject: "",
  followUpBody: "",
  followUpHtml: "",
  followUpEditorMode: "write",
  followUpFromName: "",
  followUpReplyTo: "",
  followUpTestEmail: "",
  followUpDelayMs: 500,
  followUpNeedsBackendUpdate: false,
  followUpRecipients: [],      // [{email, name, rowIndex, selected}] loaded from sheet
  followUpRecipientsLoaded: false,
  followUpSelectAll: true,
  followUpRecipientSearch: "",
  followUpCustomFields: [],    // [{key, value}] user-defined custom fields for follow-up
  // ── Feature 9: CC / BCC ──────────────────────────────────────────
  ccField: "",
  bccField: "",
  // ── Feature 10: Unsubscribe injection ────────────────────────────
  unsubscribeEnabled: false,
  unsubscribeBaseUrl: "",
  // ── Feature 1: Drip sequences ────────────────────────────────────
  dripSteps: [
    // Each step: { subject, body, html, editorMode, delayDays, enabled }
    { subject: "", body: "", html: "", editorMode: "write", delayDays: 3, enabled: true },
    { subject: "", body: "", html: "", editorMode: "write", delayDays: 5, enabled: false },
    { subject: "", body: "", html: "", editorMode: "write", delayDays: 7, enabled: false }
  ],
  activeDripStep: 0,   // which step the user is editing/sending
  // ── Per-campaign drip sequences ───────────────────────────────────
  // dripCampaigns: { [campaignId]: { steps: [{subject,body,delayDays,enabled,scheduledAt,status,stepNum}] } }
  dripCampaigns: {},
  // ── Feature 3: Scheduling ────────────────────────────────────────
  scheduleEnabled: false,
  scheduleAt: "",       // ISO date-time string
  scheduledJob: null,   // persisted from background
  // ── Feature 5: Smart send window ─────────────────────────────────
  smartSendEnabled: false,
  smartSendStart: "",   // HH:MM local time
  smartSendEnd: "",     // HH:MM local time
  smartSendDate: "",    // YYYY-MM-DD
  // ── Feature 6: Background send progress ──────────────────────────
  bgSendJob: null,      // { status, progress, error }
  bgSendPolling: false,
  billing: {
    activePlan: "premium",
    planName: "Free",
    dailyLimit: -1,
    todayUsed: 0,
    remainingToday: -1,
    backendLimit: -1,
    isAdmin: false,
    extpayPaid: false,
    extpayEmail: "",
    paidAt: "",
    extpayPlanNickname: "",
    config: {
      websiteUrl: "https://madbear.io",
      supportEmail: "hello@madbear.io",
      extensionPayEnabled: false
    }
  },
  generatedLicense: null,
  backendCode: "",
  settingsTab: "backends",
  // ── Contacts (Feature 11) ─────────────────────────────────────────
  contacts: [],             // [{id, name, email, tags[], customFields{}, createdAt, source}]
  contactGroups: [],        // [{id, name, color, createdAt}] named group definitions
  contactsLoaded: false,
  // Campaign source toggle: "sheet" | "contacts"
  campaignSource: "sheet",
  selectedContactListId: null,  // tag used as list filter, null = all contacts
  settingsShowFonts: false,   // Aa font picker expanded inside settings
  cache: {
    sheetTabsBySheetId: {},
    sheetDataBySheetTab: {},
    drafts: [],
    lastLoadedAt: ""
  },
  draftSavedAt: "",
  progress: null,
  error: null,
  success: null,
  sectionOpen: Object.assign({}, DEFAULT_SECTIONS),
  lastRun: null,
  hasSavedDraft: false
};

const backMap = {
  settings: "home",
  guide: "home",
  sheets: "home",
  compose: "sheets",
  sending: "compose",
  results: "home",
  followup: "home",
  followupsending: "followup",
  followupresults: "home",
  drip: "home",
  dripsending: "drip",
  dripresults: "home",
  dashboard: "home"
};

// Dashboard sub-panel state (persists while dashboard is open)
const DB = {
  tab: "overview",          // overview | campaigns | drips | analytics | contacts | billing
  sidebarCollapsed: false,  // sidebar collapsed state
  campaignSearch: "",
  campaignFilter: "all",    // all | sent | scheduled | failed
  settingsTab: "backends", // appearance | backends | guide | about
  guideOpen: {},            // tracks which guide accordion sections are open
  fullscreen: false,        // fullscreen mode toggle
  // Compose modal inside dashboard
  showComposeModal: false,
  composeStep: "sheet",     // "sheet" | "compose" | "sending" | "done"
  composeForm: { name: "", subject: "", body: "", htmlBody: "", editorMode: "write", sheetUrl: "", sheetId: "", sheetName: "", sheetTab: "", sheetHeaders: [], recipientCount: 0, fromName: "", replyTo: "", cc: "", bcc: "", delayMs: 500, testEmail: "", attachments: [], unsubscribeEnabled: false, scheduleEnabled: false, scheduleAt: "", smartSendEnabled: false },
  composeSending: false,
  composeResult: null,      // { sent, errors } after completion
  composeSendingProgress: "",
  // Follow-up modal inside dashboard
  showFollowUpModal: false,
  followUpStep: "compose",  // "compose" | "sending" | "done"
  followUpCampId: null,     // campaign id being followed up
  followUpResult: null,     // { sent, errors }
  // Campaign results modal inside dashboard
  showResultsModal: false,
  resultsCamp: null,        // campaign object being previewed
  // Drip steps enabled state (mirrors S.dripSteps enabled flags for UI toggles)
  dripStepToggles: null,    // null = use S.dripSteps; set to array after manual override
  // Inline sending progress banner (replaces the "done" popup)
  sendingBanner: null,   // null = hidden; { status: "sending"|"done"|"error", label, sent, errors, campName }
  // Contacts sub-state
  contactSearch: "",
  contactTagFilter: "all",
  contactGroupFilter: "all",
  contactSortBy: "name",    // name | email | createdAt
  contactShowAdd: false,    // inline add form visible
  contactEditId: null,      // id of contact being edited (null = none)
  contactAddForm: { name: "", email: "", tags: "", group: "", customFields: "" },
  contactImportPreview: null,   // [{name,email,...}] parsed from CSV before confirming
  contactImportError: "",
  fuRecipientSearch: "",        // search query in follow-up recipient list
  // Group management state
  showGroupManager: false,      // inline group manager visible
  groupAddName: "",             // new group name input
  groupEditId: null,            // id of group being renamed
  groupEditName: "",            // rename input value
  // Campaign selection (bulk delete)
  selectedCampaignIds: {}       // { [campaignId]: true }
};

const crumbMap = {
  settings: "Settings",
  guide: "How to Use",
  sheets: "Select Sheet",
  compose: "Compose Campaign",
  sending: "Sending...",
  results: "Results",
  followup: "Follow-up Campaign",
  followupsending: "Sending Follow-up...",
  followupresults: "Follow-up Results",
  drip: "Drip Sequence",
  dripsending: "Sending Step...",
  dripresults: "Drip Results"
};

document.addEventListener("DOMContentLoaded", init);

function init() {
  document.getElementById("dashboardBtn").addEventListener("click", function() {
    // Always open dashboard as a full browser tab — never inside the constrained popup
    if (!IS_FS_WINDOW) {
      chrome.tabs.create({ url: chrome.runtime.getURL("popup.html") + "?fs=1" });
      return;
    }
    go("dashboard");
  });
  document.getElementById("settingsBtn").addEventListener("click", function() {
    go("settings");
  });
  document.getElementById("guideBtn").addEventListener("click", function() {
    S.settingsTab = "guide";
    go("settings");
  });
  document.addEventListener("click", handleActionClick);
  document.addEventListener("change", handleChange);
  document.addEventListener("input", handleInput);
  document.addEventListener("focusin", handleFocusIn);
  // Pre-fetch recipients when user hovers a Follow-up button — data is ready by click time
  document.addEventListener("mouseenter", function(e) {
    var el = e.target && e.target.closest ? e.target.closest("[data-prefetch-followup]") : null;
    if (el) { preFetchFollowUpRecipients(el.getAttribute("data-prefetch-followup")); }
  }, true);
  document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      var t = e.target;
      if (t && t.id === "grpNewName") {
        e.preventDefault();
        DB.groupAddName = t.value;
        // Simulate clicking the Create Group button
        var createBtn = document.querySelector('[data-action="db-group-create"]');
        if (createBtn) createBtn.click();
      }
      if (t && t.id === "grpRenameInp") {
        e.preventDefault();
        DB.groupEditName = t.value;
        // Find the save button and simulate click
        var saveBtn = document.querySelector('[data-action="db-group-rename-save"]');
        if (saveBtn) saveBtn.click();
      }
    }
  });

  chrome.storage.local.get(
    ["mb_theme", "mb_font", "mb_lang", "mb_script_url", "mb_stats", "mb_history", "mb_cache", "mb_compose_draft", "mb_contacts", "mb_drip_campaigns", "mb_groups"],
    function(data) {
      if (data.mb_theme) {
        S.theme = data.mb_theme;
      }
      if (data.mb_font) {
        S.font = data.mb_font;
      }
      if (data.mb_lang && TRANSLATIONS[data.mb_lang]) {
        S.lang = data.mb_lang;
        setLang(data.mb_lang);
      }
      if (Array.isArray(data.mb_script_url)) {
        S.scriptUrls = data.mb_script_url.filter(Boolean);
        const first = S.scriptUrls[0];
        S.scriptUrl = first ? (typeof first === "object" ? first.url : first) : "";
      } else if (typeof data.mb_script_url === "string" && data.mb_script_url.trim()) {
        S.scriptUrl = data.mb_script_url.trim();
        S.scriptUrls = [{ url: S.scriptUrl, email: "" }];
      }
      if (data.mb_stats) {
        S.stats = data.mb_stats;
      }
      if (Array.isArray(data.mb_history)) {
        S.history = data.mb_history;
      }
      if (data.mb_cache) {
        S.cache = Object.assign({}, S.cache, data.mb_cache);
      }
      if (data.mb_compose_draft) {
        restoreSavedDraft(data.mb_compose_draft);
      }
      if (Array.isArray(data.mb_contacts)) {
        S.contacts = data.mb_contacts;
      }
      if (Array.isArray(data.mb_groups)) {
        S.contactGroups = data.mb_groups;
      }
      if (data.mb_drip_campaigns && typeof data.mb_drip_campaigns === 'object') {
        S.dripCampaigns = data.mb_drip_campaigns;
      } else {
        S.dripCampaigns = {};
      }
      S.contactsLoaded = true;
      // If opened as fullscreen window, auto-navigate to dashboard
      if (IS_FS_WINDOW) {
        S.view = "dashboard";
      }

      Promise.all([refreshBillingState(), loadBackendCode()]).then(function() {
        // Check for any pending scheduled or background sends
        loadScheduledJob().catch(function() {});
        // Poll if a smart send was in progress
        chrome.runtime.sendMessage({ type: "send:get-progress" }, function(resp) {
          if (resp && resp.ok && resp.data && resp.data.status && resp.data.status !== "idle" && !resp.data.progress.done) {
            S.bgSendJob = resp.data;
            startBgSendPolling();
          }
        });
        render();
        // Silently pre-fetch recipients for the most recent campaigns in the background
        setTimeout(function() {
          (S.history || []).slice(0, 10).forEach(function(c) {
            preFetchFollowUpRecipients(c.id);
          });
        }, 500);
      });
    }
  );

  render();
}


async function api(action, payload) {
  if (!S.scriptUrl) {
    return { ok: false, error: "No Apps Script URL is set. Open Settings first." };
  }

  try {
    const response = await fetch(S.scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(Object.assign({ action: action }, payload || {})),
      redirect: "follow",
      credentials: "include"
    });

    const text = await response.text();
    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (parseError) {
      if (!response.ok) {
        throw new Error("Request failed with status " + response.status + ".");
      }
      throw new Error("The Apps Script response was not valid JSON. Re-deploy the web app and re-authorize it.");
    }

    if (!response.ok) {
      return { ok: false, error: parsed.error || ("Request failed with status " + response.status + ".") };
    }

    return parsed;
  } catch (error) {
    return {
      ok: false,
      error: error && error.message ? error.message : "Could not reach the Apps Script web app."
    };
  }
}

function billingRequest(type, extra) {
  return new Promise(function(resolve) {
    chrome.runtime.sendMessage(Object.assign({ type: type }, extra || {}), function(response) {
      if (chrome.runtime.lastError) {
        resolve({ ok: false, error: chrome.runtime.lastError.message });
        return;
      }
      resolve(response || { ok: false, error: "No billing response." });
    });
  });
}

async function refreshBillingState() {
  const response = await billingRequest("billing:get-state");
  if (response.ok && response.data) {
    S.billing = Object.assign({}, S.billing, response.data);
  }
}

async function ensureCompatibleBackend() {
  if (!S.scriptUrl) {
    return {
      ok: false,
      error: "Add your own Apps Script Web App URL in Settings before using campaigns."
    };
  }
  const res = await api("getBackendInfo");
  if (!res.ok) {
    return res;
  }

  const info = res.data || {};
  if (info.error && String(info.error).indexOf("Unknown action: getBackendInfo") !== -1) {
    return {
      ok: false,
      error: "Your Apps Script backend is still the old version. Replace it with the updated apps-script-backend.js, redeploy the Web app, and then reload the extension."
    };
  }

  if (!info.supportsManualCompose) {
    return {
      ok: false,
      error: "Your Apps Script backend does not support manual compose yet. Replace the backend file, redeploy the Web app, and reload the extension."
    };
  }

  return { ok: true, data: info };
}

async function ensureFollowUpBackend() {
  if (!S.scriptUrl) {
    return {
      ok: false,
      error: "Add your own Apps Script Web App URL in Settings before using follow-up campaigns.",
      needsBackendUpdate: false
    };
  }
  // Don't block on version check — just let the send attempt happen.
  // If the backend is old it will return "Unknown action: sendFollowUp"
  // and doFollowUp will catch that and show the upgrade banner.
  return { ok: true, data: {} };
}

// Detect if opened as fullscreen window (popup.html?fs=1)
var IS_FS_WINDOW = (typeof location !== "undefined" && location.search.indexOf("fs=1") !== -1);

// Apply fs-tab class to <html> immediately so CSS can override width/height constraints
if (IS_FS_WINDOW) {
  document.documentElement.classList.add("fs-tab");
}

function render() {
  // Theme + font classes on body; add db-mode when in dashboard
  var classes = [];
  if (S.theme === "light") classes.push("light");
  if (S.font && S.font !== "system") classes.push("font-" + S.font);
  if (IS_FS_WINDOW) classes.push("fs-window-mode");
  if (S.view === "dashboard") classes.push(IS_FS_WINDOW ? "db-fullscreen-window" : "db-mode");
  document.body.className = classes.join(" ");
  // Update Guide button text
  const guideBtnEl = document.getElementById("guideBtn");
  if (guideBtnEl) {
    guideBtnEl.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/><path d="M12 16v-4M12 8h.01"/></svg>' + t("guide");
  }

  const navArea = document.getElementById("navArea");
  if (S.view !== "home") {
    const crumbKey = "crumb." + S.view;
    navArea.innerHTML =
      '<div class="nav">' +
      '<button class="back-btn" data-action="go" data-view="' + (backMap[S.view] || "home") + '">' + t("back") + '</button>' +
      '<span class="crumb">' + esc(t(crumbKey)) + "</span>" +
      "</div>";
  } else {
    navArea.innerHTML = "";
  }

  const errArea = document.getElementById("errArea");
  if (S.error) {
    errArea.innerHTML =
      '<div class="err-bar"><span>' + esc(S.error) + '</span><button data-action="clear-error">✕</button></div>';
  } else {
    errArea.innerHTML = "";
  }

  const views = {
    home: vHome,
    settings: vSettings,
    guide: vGuide,
    sheets: vSheets,
    compose: vCompose,
    sending: vSending,
    results: vResults,
    followup: vFollowUp,
    followupsending: vFollowUpSending,
    followupresults: vFollowUpResults,
    drip: vDrip,
    dripsending: vDripSending,
    dripresults: vDripResults,
    dashboard: vDashboard
  };

  // Dashboard uses its own shell — no navArea/errArea overhead inside it
  if (S.view === "dashboard") {
    document.getElementById("navArea").innerHTML = "";
    document.getElementById("main").innerHTML = vDashboard();
    // Error/success bars for dashboard
    const errAreaDb = document.getElementById("errArea");
    if (S.error) {
      errAreaDb.innerHTML =
        '<div class="err-bar"><span>' + esc(S.error) + '</span><button data-action="clear-error">✕</button></div>';
    } else if (S.success) {
      errAreaDb.innerHTML =
        '<div class="err-bar" style="background:var(--db-green-tint);border-color:var(--db-green-soft);color:var(--db-green)"><span>✓ ' + esc(S.success) + '</span><button data-action="clear-error" style="color:var(--db-green)">✕</button></div>';
    } else {
      errAreaDb.innerHTML = "";
    }
    return;
  }

  document.getElementById("main").innerHTML = (views[S.view] || vHome)();
}

// ════════════════════════════════════════════════════════════════════
// FULL DASHBOARD — design-system implementation
// ════════════════════════════════════════════════════════════════════

// SVG icon paths (1.6px stroke, same as design)
var DB_ICONS = {
  grid:     '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  mail:     '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  chart:    '<path d="M3 21h18"/><rect x="5" y="11" width="3" height="8"/><rect x="11" y="7" width="3" height="12"/><rect x="17" y="14" width="3" height="5"/>',
  users:    '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.5c2.8.3 5 2.4 5 5"/>',
  user:     '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>',
  activity: '<path d="M3 12h3l3-8 4 16 3-8h5"/>',
  card:     '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  plus:     '<path d="M12 5v14"/><path d="M5 12h14"/>',
  search:   '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  bell:     '<path d="M6 8a6 6 0 1 1 12 0c0 5 2 7 2 7H4s2-2 2-7"/><path d="M10 19a2 2 0 0 0 4 0"/>',
  arrow:    '<path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>',
  arrowL:   '<path d="M19 12H5"/><path d="m12 5-7 7 7 7"/>',
  arrowUp:  '<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>',
  arrowDn:  '<path d="M12 5v14"/><path d="m5 12 7 7 7-7"/>',
  download: '<path d="M12 3v13"/><path d="m7 11 5 5 5-5"/><path d="M5 21h14"/>',
  upload:   '<path d="M12 16V3"/><path d="m7 8 5-5 5 5"/><path d="M5 21h14"/>',
  edit:     '<path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/>',
  trash:    '<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="m6 7 1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"/>',
  eye:      '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12"/><circle cx="12" cy="12" r="3"/>',
  copy:     '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
  reply:    '<path d="m9 17-5-5 5-5"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/>',
  send:     '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
  check:    '<path d="m5 12 5 5L20 7"/>',
  x:        '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  info:     '<circle cx="12" cy="12" r="9"/><path d="M12 8h.01"/><path d="M11 12h1v4h1"/>',
  sync:     '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>',
  clock:    '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  play:     '<path d="m6 4 14 8-14 8z"/>',
  pause:    '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
  star:     '<path d="m12 3 2.9 6 6.6.6-5 4.5 1.5 6.5L12 17l-6 3.6L7.5 14l-5-4.5L9.1 9z"/>',
  book:     '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5a2.5 2.5 0 1 0 0 5H20"/>',
  globe:    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18"/>',
  sliders:  '<path d="M4 6h12M20 6h0M4 12h6M14 12h6M4 18h10M18 18h2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="16" cy="18" r="2"/>',
  filter:   '<path d="M3 6h18l-7 9v6l-4-2v-4z"/>',
  tag:      '<path d="M20 12 12 4H4v8l8 8z"/><circle cx="8" cy="8" r="1.5"/>',
  folder:   '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  type:     '<path d="M4 7V5h16v2"/><path d="M9 19h6"/><path d="M12 5v14"/>',
  collapse: '<path d="M19 12H5"/><path d="m12 5-7 7 7 7"/>',
  expand:   '<path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>',
  mailbox:  '<path d="M4 11a8 8 0 1 1 16 0v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM12 11v8"/>',
};

function dbIcon(name, size) {
  size = size || 16;
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + (DB_ICONS[name] || '') + '</svg>';
}

// ── Sparkline SVG ─────────────────────────────────────────────────

function dbSparkline(data, w, h, color) {
  w = w || 120; h = h || 38; color = color || 'var(--db-green3)';
  var max = Math.max.apply(null, data.concat([1]));
  var min = Math.min.apply(null, data.concat([0]));
  var range = (max - min) || 1;
  var step = w / Math.max(data.length - 1, 1);
  var pts = data.map(function(v, i) {
    return (i * step) + ',' + (h - ((v - min) / range) * (h - 4) - 2);
  }).join(' ');
  return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none" class="db-stat-spark"><polyline points="' + pts + '" fill="none" stroke="' + color + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

// ── Bar chart SVG ─────────────────────────────────────────────────

function dbBarChart(data) {
  // data = [{label,value}]
  var W = 800, H = 220;
  var pad = {top:16, right:12, bottom:30, left:36};
  var iW = W - pad.left - pad.right;
  var iH = H - pad.top - pad.bottom;
  var max = Math.max.apply(null, data.map(function(d){return d.value;}).concat([1]));
  var nMax = Math.ceil(max * 1.15);
  var barW = (iW / data.length) * 0.55;
  var step = iW / data.length;
  var ticks = [0, 0.25, 0.5, 0.75, 1].map(function(frac){return Math.round(nMax * frac);});
  var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" class="db-chart" style="height:210px">';
  // grid
  ticks.forEach(function(tick) {
    var y = pad.top + iH - (tick / nMax) * iH;
    out += '<line x1="' + pad.left + '" x2="' + (W - pad.right) + '" y1="' + y + '" y2="' + y + '" class="db-chart" stroke="var(--db-line-soft)" stroke-dasharray="2 3"/>';
    out += '<text x="' + (pad.left - 6) + '" y="' + (y + 3) + '" text-anchor="end" fill="var(--db-muted)" font-size="10" font-family="var(--db-mono)">' + tick + '</text>';
  });
  // bars
  data.forEach(function(d, i) {
    var h = (d.value / nMax) * iH;
    var x = pad.left + i * step + (step - barW) / 2;
    var y = pad.top + iH - Math.max(h, 0);
    var isMax = d.value === max && max > 0;
    out += '<rect x="' + x + '" y="' + y + '" width="' + barW + '" height="' + Math.max(h, 0) + '" rx="4" fill="' + (isMax ? 'var(--db-green)' : 'var(--db-green3)') + '" opacity="' + (d.value === 0 ? 0.2 : 1) + '" class="db-bar' + (isMax ? ' db-bar-hi' : '') + '"/>';
    out += '<text x="' + (x + barW / 2) + '" y="' + (H - 10) + '" text-anchor="middle" fill="var(--db-muted)" font-size="10" font-family="var(--db-mono)">' + esc(d.label) + '</text>';
    if (d.value > 0) out += '<text x="' + (x + barW / 2) + '" y="' + (y - 5) + '" text-anchor="middle" fill="var(--db-ink)" font-size="11" font-weight="600" font-family="var(--db-mono)">' + d.value + '</text>';
  });
  out += '</svg>';
  return out;
}

// ── Donut SVG ─────────────────────────────────────────────────────

function dbDonut(delivered, errors, skipped) {
  var size = 140, sw = 16;
  var r = (size - sw) / 2, cx = size / 2, cy = size / 2;
  var C = 2 * Math.PI * r;
  var total = delivered + errors + skipped || 1;
  var segs = [
    {value: delivered, color: 'var(--db-green)'},
    {value: errors,    color: 'var(--db-red)'},
    {value: skipped,   color: 'var(--db-amber)'},
  ];
  var pct = Math.round((delivered / total) * 100);
  var out = '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '">';
  out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="var(--db-bg2)" stroke-width="' + sw + '"/>';
  var offset = 0;
  segs.forEach(function(s) {
    var dash = (s.value / total) * C;
    out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="' + s.color + '" stroke-width="' + sw + '" stroke-linecap="butt" stroke-dasharray="' + dash + ' ' + (C - dash) + '" stroke-dashoffset="' + (-offset) + '" transform="rotate(-90 ' + cx + ' ' + cy + ')"/>';
    offset += dash;
  });
  out += '<text x="' + cx + '" y="' + (cy + 4) + '" text-anchor="middle" font-size="18" font-weight="700" fill="var(--db-ink)" font-family="var(--db-sans)">' + pct + '%</text>';
  out += '<text x="' + cx + '" y="' + (cy + 20) + '" text-anchor="middle" font-size="10" fill="var(--db-muted)" font-family="var(--db-mono)">DELIVERED</text>';
  out += '</svg>';
  return out;
}

// ── Sending Banner (inline progress, replaces "done" popup) ──────

function dbSendingBanner() {
  var b = DB.sendingBanner;
  if (!b) return '';
  var isDone  = b.status === "done";
  var isError = b.status === "error";
  var isSending = b.status === "sending";

  var bgColor  = isDone  ? 'var(--db-green-tint)' : isError ? 'var(--db-red-soft,rgba(220,38,38,0.08))' : 'var(--db-bg2)';
  var border   = isDone  ? '1px solid var(--db-green3)' : isError ? '1px solid var(--db-red)' : '1px solid var(--db-border)';
  var iconStr  = isDone  ? dbIcon('check', 15) : isError ? dbIcon('x', 15) : dbIcon('send', 15);
  var iconColor= isDone  ? 'var(--db-green)' : isError ? 'var(--db-red)' : 'var(--db-amber)';

  var out = '<div style="margin:0;padding:10px 20px;background:' + bgColor + ';border-bottom:' + border + ';display:flex;align-items:center;gap:10px;font-size:13px;position:sticky;top:0;z-index:20">';

  // Icon
  out += '<span style="color:' + iconColor + ';display:flex;align-items:center;flex-shrink:0">' + iconStr + '</span>';

  // Label + campaign name
  out += '<span style="flex:1;color:var(--db-ink);font-weight:500">';
  if (isSending) {
    out += esc(b.label || 'Sending campaign…');
    if (b.campName) out += ' <span style="font-weight:400;color:var(--db-muted)">· ' + esc(b.campName) + '</span>';
  } else if (isDone) {
    out += '<span style="color:var(--db-green);font-weight:700">' + (b.sent || 0) + ' sent</span>';
    if (b.errors > 0) out += ' <span style="color:var(--db-red);font-weight:500">· ' + b.errors + ' failed</span>';
    if (b.campName) out += ' <span style="font-weight:400;color:var(--db-muted)">· ' + esc(b.campName) + '</span>';
  } else {
    out += '<span style="color:var(--db-red)">' + esc(b.label || 'Send failed') + '</span>';
  }
  out += '</span>';

  // Progress bar (only while sending)
  if (isSending) {
    out += '<div style="width:120px;height:5px;background:var(--db-border);border-radius:3px;overflow:hidden;flex-shrink:0">';
    out += '<div style="height:100%;background:var(--db-amber);border-radius:3px;animation:db-progress-slide 1.4s ease-in-out infinite;width:40%"></div>';
    out += '</div>';
  }

  // Dismiss button (only when done or error)
  if (!isSending) {
    out += '<button data-action="db-banner-dismiss" style="background:none;border:none;cursor:pointer;color:var(--db-muted);padding:2px 4px;line-height:1;font-size:16px;opacity:0.7" title="Dismiss">' + dbIcon('x', 14) + '</button>';
  }

  out += '</div>';
  return out;
}

// ── Shell ─────────────────────────────────────────────────────────

function vDashboard() {
  return (
    '<div class="db-shell">' +
    dbSidebar() +
    '<div class="db-main" id="dbMain">' +
    dbTopbar() +
    (DB.sendingBanner ? dbSendingBanner() : '') +
    '<div class="db-content">' +
    (DB.tab === "overview"   ? dbOverviewPanel()   :
     DB.tab === "campaigns"  ? dbCampaignsPanel()  :
     DB.tab === "contacts"   ? dbContactsPanel()   :
     DB.tab === "drips"      ? dbDripsPanel()      :
     DB.tab === "analytics"  ? dbAnalyticsPanel()  :
     DB.tab === "billing"    ? dbBillingPanel()    :
     DB.tab === "settings"   ? dbSettingsPanel()   :
                               dbOverviewPanel()) +
    '</div>' +
    '</div>' +
    (DB.showComposeModal   ? dbComposeModal()   : '') +
    (DB.showFollowUpModal  ? dbFollowUpModal()  : '') +
    (DB.showResultsModal   ? dbResultsModal()   : '') +
    '</div>'
  );
}

// ── Compose Modal (inside dashboard) ─────────────────────────────

function dbComposeModal() {
  var backends = S.scriptUrls || [];
  var recentSheets = S.sheets || [];
  var form = DB.composeForm;
  var step = DB.composeStep || "sheet";

  // Get active backend email for display
  var activeBackend = backends.find(function(b) {
    return (typeof b === "object" ? b.url : b) === S.scriptUrl;
  }) || backends[0];
  var backendEmail = activeBackend && typeof activeBackend === "object" ? (activeBackend.email || activeBackend.label || "your account") : "your account";

  var out = '<div class="db-modal-backdrop">';
  out += '<div class="db-modal">';

  // ── Step 1: Pick a spreadsheet ────────────────────────────────
  if (step === "sheet") {
    out += '<div class="db-modal-head">';
    out += '<div><h3 style="font-size:16px;font-weight:700;color:var(--db-ink);margin:0">' + t('db.compose.title') + '</h3>';
    out += '<p style="font-size:12.5px;color:var(--db-muted);margin:2px 0 0">' + t('db.compose.sub') + '</p></div>';
    out += '<button class="db-btn ghost sm" data-action="db-compose-close">' + dbIcon('x', 14) + '</button>';
    out += '</div>';

    out += '<div class="db-modal-body">';

    // No backend warning
    if (!S.scriptUrl) {
      out += '<div style="background:var(--db-gold-tint);border:1px solid var(--db-gold);border-radius:10px;padding:12px 14px;font-size:13px;color:var(--db-ink)">';
      out += dbIcon('info', 14) + ' <strong>No backend set.</strong> Go to <button class="db-btn ghost sm" data-action="db-nav" data-tab="settings" style="display:inline-flex;padding:0 6px;height:22px;font-size:12px">Settings → Backends</button> and add your Google Apps Script URL first.';
      out += '</div>';
    }

    // Campaign name
    out += '<div>';
    out += '<div class="db-field-label">' + t('db.compose.campName') + '</div>';
    out += '<div class="db-field">' + dbIcon('folder') + '<input id="dbCampName" placeholder="May Newsletter" value="' + escAttr(form.name || '') + '" data-action="db-compose-field" data-field="name"/></div>';
    out += '</div>';

    // Sheet URL
    out += '<div>';
    out += '<div class="db-field-label">' + t('db.compose.sheetUrl') + '</div>';
    out += '<div class="db-field">' + dbIcon('globe') + '<input id="dbSheetUrl" placeholder="https://docs.google.com/spreadsheets/d/…" value="' + escAttr(form.sheetUrl || '') + '" data-action="db-compose-field" data-field="sheetUrl"/></div>';
    out += '</div>';

    // Recent sheets
    if (recentSheets.length > 0) {
      out += '<div>';
      out += '<div class="db-field-label">Recent spreadsheets</div>';
      out += '<div style="display:flex;flex-direction:column;gap:6px">';
      recentSheets.slice(0, 5).forEach(function(sheet, i) {
        var isRawId = sheet.name === sheet.id || /^[a-zA-Z0-9_-]{20,}$/.test(sheet.name);
        var displayName = isRawId ? ('Sheet · ' + sheet.id.slice(0, 14) + '…') : sheet.name;
        out += '<button class="db-sheet-row" data-action="db-compose-pick-recent" data-index="' + i + '">';
        out += '<span style="font-weight:500;color:var(--db-ink)">' + esc(displayName) + '</span>';
        out += '<span style="font-family:var(--db-mono);font-size:11px;color:var(--db-muted)">' + esc(timeAgo ? timeAgo(sheet.modified) : '') + '</span>';
        out += '</button>';
      });
      out += '</div></div>';
    }

    // ── Contacts Groups picker ──────────────────────────────────
    var modalContacts = S.contacts || [];
    var modalGroups = S.contactGroups || [];
    // Merge named groups + implicit groups from contacts
    var modalGroupCounts = {};
    modalContacts.forEach(function(c){ if (c.group) modalGroupCounts[c.group] = (modalGroupCounts[c.group]||0)+1; });
    modalGroups.forEach(function(g){ if (!(g.name in modalGroupCounts)) modalGroupCounts[g.name] = 0; });
    var modalGroupNames = Object.keys(modalGroupCounts);

    if (modalContacts.length > 0) {
      out += '<div style="border-top:1px solid var(--db-line);padding-top:16px;margin-top:4px">';
      out += '<div class="db-field-label" style="margin-bottom:8px;display:flex;align-items:center;gap:6px">';
      out += dbIcon('users', 13) + ' Or send directly to your contacts <span style="color:var(--db-green);font-size:11px;font-weight:600;background:var(--db-green-tint);padding:2px 7px;border-radius:20px;margin-left:4px">No Sheet needed</span>';
      out += '</div>';
      out += '<div style="display:flex;flex-direction:column;gap:6px">';
      // "All contacts" button
      out += '<button class="db-sheet-row" data-action="db-compose-pick-contacts-all" style="border-color:var(--db-green-soft)">';
      out += '<span style="display:flex;align-items:center;gap:8px"><span style="width:24px;height:24px;border-radius:6px;background:var(--db-green-tint);color:var(--db-green);display:grid;place-items:center">' + dbIcon('users', 12) + '</span><span style="font-weight:500;color:var(--db-ink)">All contacts</span></span>';
      out += '<span style="font-size:11px;color:var(--db-muted)">' + modalContacts.length + ' recipient' + (modalContacts.length !== 1 ? 's' : '') + '</span>';
      out += '</button>';
      // Per-group buttons
      if (modalGroupNames.length > 0) {
        modalGroupNames.forEach(function(g) {
          var cnt = modalGroupCounts[g] || 0;
          out += '<button class="db-sheet-row" data-action="db-compose-pick-contacts-group" data-group="' + escAttr(g) + '" style="border-color:var(--db-green-soft)">';
          out += '<span style="display:flex;align-items:center;gap:8px"><span style="width:24px;height:24px;border-radius:6px;background:var(--db-green-tint);color:var(--db-green);display:grid;place-items:center;font-weight:700;font-size:11px">' + esc(g[0].toUpperCase()) + '</span><span style="font-weight:500;color:var(--db-ink)">' + esc(g) + '</span></span>';
          out += '<span style="font-size:11px;color:var(--db-muted)">' + cnt + ' recipient' + (cnt !== 1 ? 's' : '') + '</span>';
          out += '</button>';
        });
      }
      out += '</div>';
      out += '</div>';
    } else if (modalContacts.length === 0) {
      out += '<div style="border-top:1px solid var(--db-line);padding-top:14px;margin-top:4px">';
      out += '<div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:var(--db-surface2);border-radius:9px;font-size:12.5px;color:var(--db-muted)">';
      out += dbIcon('users', 13) + ' No contacts yet — <button class="db-btn ghost sm" data-action="db-nav" data-tab="contacts" style="padding:0 4px;height:auto;font-size:12px;display:inline;color:var(--db-green)">add contacts</button> to send without a Google Sheet.';
      out += '</div></div>';
    }

    out += '</div>'; // modal-body

    out += '<div class="db-modal-foot">';
    out += '<button class="db-btn ghost" data-action="db-compose-close">Cancel</button>';
    out += '<span style="flex:1"></span>';
    out += '<button class="db-btn primary" data-action="db-compose-connect">' + dbIcon('arrow') + ' ' + t('db.compose.connect') + '</button>';
    out += '</div>';

  // ── Step 2: Compose the email ─────────────────────────────────
  } else if (step === "compose") {
    var recipientCount = form.recipientCount || 0;
    var isContactsCampaignMode = !!(form.isContactsCampaign && form.inlineData);
    var sheetDisplayName = isContactsCampaignMode
      ? (form.contactGroup ? '"' + form.contactGroup + '" group' : form.contactTag ? '"' + form.contactTag + '" contacts' : 'All contacts')
      : (form.sheetName || form.sheetUrl || "Spreadsheet");
    var isPremium = true;
    var isHtmlMode = form.editorMode === "html";

    // Merge fields from sheet headers (or defaults)
    var mergeFields = form.sheetHeaders && form.sheetHeaders.length > 0
      ? form.sheetHeaders
      : ["FirstName", "LastName", "Email", "Company", "Name"];

    out += '<div class="db-modal-head">';
    out += '<div><h3 style="font-size:16px;font-weight:700;color:var(--db-ink);margin:0">' + t('db.compose.composeTitle') + '</h3>';
    var recipientLine = isContactsCampaignMode
      ? dbIcon('user', 11) + ' ' + recipientCount + ' contacts · no sheet needed · from ' + esc(backendEmail)
      : esc(sheetDisplayName) + ' · ' + recipientCount + ' recipients · from ' + esc(backendEmail);
    out += '<p style="font-size:12.5px;color:var(--db-muted);margin:2px 0 0">' + recipientLine + '</p></div>';
    out += '<button class="db-btn ghost sm" data-action="db-compose-close">' + dbIcon('x', 14) + '</button>';
    out += '</div>';

    out += '<div class="db-modal-body" style="display:flex;flex-direction:column;gap:14px">';

    // Contacts campaign notice banner
    if (isContactsCampaignMode) {
      var recipientDesc = form.contactGroup
        ? ' in group <strong>' + esc(form.contactGroup) + '</strong>'
        : form.contactTag
          ? ' tagged <strong>"' + esc(form.contactTag) + '"</strong>'
          : '';
      out += '<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--db-green-tint);border:1px solid var(--db-green-soft);border-radius:10px;font-size:13px;color:var(--db-green)">';
      out += dbIcon('users', 14) + ' <strong>Contacts campaign</strong> — sending to <strong>' + recipientCount + '</strong> contact' + (recipientCount !== 1 ? 's' : '') + recipientDesc + '. No Google Sheet required.';
      out += '</div>';
    }

    // ── From Name + Reply-To ──────────────────────────────────
    out += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">';
    out += '<div>';
    out += '<div class="db-field-label">From Name</div>';
    out += '<div class="db-field">' + dbIcon('user', 13) + '<input id="dbCampFromName" placeholder="Your Name" value="' + escAttr(form.fromName || S.fromName || '') + '" data-action="db-compose-field" data-field="fromName"/></div>';
    out += '</div>';
    out += '<div>';
    out += '<div class="db-field-label">Reply-To Email</div>';
    out += '<div class="db-field">' + dbIcon('reply', 13) + '<input id="dbCampReplyTo" type="email" placeholder="reply@yourdomain.com" value="' + escAttr(form.replyTo || S.replyTo || '') + '" data-action="db-compose-field" data-field="replyTo"/></div>';
    out += '</div>';
    out += '</div>';

    // ── CC / BCC ──────────────────────────────────────────────
    out += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">';
    out += '<div>';
    out += '<div class="db-field-label">CC <span style="color:var(--db-muted);font-size:11px">(supports {{tokens}})</span></div>';
    out += '<div class="db-field">' + dbIcon('users', 13) + '<input id="dbCampCC" placeholder="cc@email.com" value="' + escAttr(form.cc || '') + '" data-action="db-compose-field" data-field="cc"/></div>';
    out += '</div>';
    out += '<div>';
    out += '<div class="db-field-label">BCC <span style="color:var(--db-muted);font-size:11px">(supports {{tokens}})</span></div>';
    out += '<div class="db-field">' + dbIcon('users', 13) + '<input id="dbCampBCC" placeholder="bcc@email.com" value="' + escAttr(form.bcc || '') + '" data-action="db-compose-field" data-field="bcc"/></div>';
    out += '</div>';
    out += '</div>';

    // ── Subject ───────────────────────────────────────────────
    out += '<div>';
    out += '<div class="db-field-label">' + t('db.compose.subject') + '</div>';
    out += '<div class="db-field">' + dbIcon('type') + '<input id="dbCampSubject" placeholder="Hi {{FirstName}}, a quick update…" value="' + escAttr(form.subject || '') + '" data-action="db-compose-field" data-field="subject"/></div>';
    out += '</div>';

    // ── Merge Field Chips ─────────────────────────────────────
    out += '<div>';
    out += '<div class="db-field-label" style="margin-bottom:6px">Merge fields <span style="color:var(--db-muted);font-size:11px">— click to insert at cursor</span></div>';
    out += '<div style="display:flex;flex-wrap:wrap;gap:5px">';
    mergeFields.forEach(function(mf) {
      out += '<button class="db-chip" data-action="db-compose-insert-tag" data-tag="' + escAttr(mf) + '" style="font-family:var(--db-mono);font-size:11.5px;background:var(--db-surface2);border:1px solid var(--db-line);border-radius:6px;padding:3px 8px;cursor:pointer;color:var(--db-ink2)">{{' + esc(mf) + '}}</button>';
    });
    out += '</div>';
    out += '</div>';

    // ── Body / HTML editor ────────────────────────────────────
    out += '<div>';
    out += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">';
    out += '<div class="db-field-label" style="margin-bottom:0">' + t('db.compose.body') + '</div>';
    out += '<div style="display:flex;gap:4px">';
    out += '<button class="db-btn ghost sm' + (!isHtmlMode ? ' active' : '') + '" data-action="db-compose-editor-mode" data-mode="write" style="font-size:11px;height:22px;padding:0 8px">Plain Text</button>';
    out += '<button class="db-btn ghost sm' + (isHtmlMode ? ' active' : '') + '" data-action="db-compose-editor-mode" data-mode="html" style="font-size:11px;height:22px;padding:0 8px">HTML</button>';
    out += '</div>';
    out += '</div>';
    if (!isHtmlMode) {
      out += '<textarea id="dbCampBody" style="width:100%;min-height:160px;background:var(--db-surface2);border:1.5px solid var(--db-line);border-radius:10px;padding:12px 14px;font-size:13px;font-family:var(--db-sans);color:var(--db-ink);resize:vertical;box-sizing:border-box;outline:none" placeholder="Hi {{FirstName}},&#10;&#10;…your message…&#10;&#10;Best,&#10;Your team" data-action="db-compose-field" data-field="body">' + escAttr(form.body || '') + '</textarea>';
    } else {
      out += '<textarea id="dbCampHtml" style="width:100%;min-height:160px;background:var(--db-surface2);border:1.5px solid var(--db-blue);border-radius:10px;padding:12px 14px;font-size:12px;font-family:var(--db-mono);color:var(--db-ink);resize:vertical;box-sizing:border-box;outline:none" placeholder="&lt;p&gt;Hi {{FirstName}},&lt;/p&gt;&#10;&lt;p&gt;Your message here…&lt;/p&gt;" data-action="db-compose-field" data-field="htmlBody">' + escAttr(form.htmlBody || '') + '</textarea>';
      out += '<div style="font-size:11px;color:var(--db-muted);margin-top:4px">' + dbIcon('info', 11) + ' HTML mode — use {{tokens}} for personalization, same as plain text.</div>';
    }
    out += '</div>';

    // ── Attachments ───────────────────────────────────────────
    out += '<div>';
    out += '<div class="db-field-label" style="margin-bottom:6px">Attachments</div>';
    out += '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">';
    var attachList = form.attachments || [];
    attachList.forEach(function(att, ai) {
      out += '<span style="display:flex;align-items:center;gap:5px;background:var(--db-surface2);border:1px solid var(--db-line);border-radius:7px;padding:4px 8px;font-size:12px;color:var(--db-ink2)">';
      out += dbIcon('upload', 12) + ' ' + esc(att.name || 'file') + ' ';
      out += '<button data-action="db-compose-remove-attachment" data-index="' + ai + '" style="background:none;border:none;cursor:pointer;color:var(--db-muted);padding:0;line-height:1">' + dbIcon('x', 11) + '</button>';
      out += '</span>';
    });
    out += '<label style="cursor:pointer;display:flex;align-items:center;gap:5px;font-size:12.5px;font-weight:500;color:var(--db-green);padding:5px 10px;background:var(--db-green-tint);border:1px solid var(--db-green-soft);border-radius:7px">';
    out += dbIcon('upload', 13) + ' Attach File';
    out += '<input type="file" id="dbCampAttachInput" style="display:none" multiple data-action="db-compose-attach"/>';
    out += '</label>';
    out += '</div>';
    out += '</div>';

    // ── Delay between emails ──────────────────────────────────
    out += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">';
    out += '<div>';
    out += '<div class="db-field-label">Delay between emails (ms)</div>';
    out += '<div class="db-field">' + dbIcon('activity', 13) + '<input id="dbCampDelay" type="number" min="0" max="10000" step="100" placeholder="500" value="' + escAttr(String(form.delayMs != null ? form.delayMs : (S.delayMs || 500))) + '" data-action="db-compose-field" data-field="delayMs"/></div>';
    out += '</div>';
    out += '<div>';
    out += '<div class="db-field-label">Test email address</div>';
    out += '<div class="db-field">' + dbIcon('mail', 13) + '<input id="dbCampTestEmail" type="email" placeholder="you@email.com" value="' + escAttr(form.testEmail || S.testEmail || '') + '" data-action="db-compose-field" data-field="testEmail"/></div>';
    out += '</div>';
    out += '</div>';

    // ── Premium features ──────────────────────────────────────
    out += '<div style="display:flex;flex-direction:column;gap:8px;background:var(--db-bg);border-radius:10px;padding:10px 14px">';
    out += '<div style="font-size:11.5px;font-weight:600;color:var(--db-muted);margin-bottom:2px">Premium features</div>';

    // Unsubscribe footer
    out += '<label style="display:flex;align-items:center;gap:8px;cursor:' + (isPremium ? 'pointer' : 'not-allowed') + '">';
    out += '<input type="checkbox" id="dbCampUnsub" ' + (form.unsubscribeEnabled ? 'checked' : '') + ' ' + (!isPremium ? 'disabled' : '') + ' data-action="db-compose-field" data-field="unsubscribeEnabled" style="accent-color:var(--db-green)">';
    out += '<span style="font-size:12.5px;color:' + (isPremium ? 'var(--db-ink2)' : 'var(--db-muted)') + '">Auto-inject unsubscribe footer</span>';
    if (!isPremium) out += ' <span class="db-pill gold" style="font-size:10px;padding:1px 6px">Premium</span>';
    out += '</label>';

    // Schedule send
    out += '<label style="display:flex;align-items:center;gap:8px;cursor:' + (isPremium ? 'pointer' : 'not-allowed') + '">';
    out += '<input type="checkbox" id="dbCampSchedule" ' + (form.scheduleEnabled ? 'checked' : '') + ' ' + (!isPremium ? 'disabled' : '') + ' data-action="db-compose-field" data-field="scheduleEnabled" style="accent-color:var(--db-green)">';
    out += '<span style="font-size:12.5px;color:' + (isPremium ? 'var(--db-ink2)' : 'var(--db-muted)') + '">Schedule send</span>';
    if (!isPremium) out += ' <span class="db-pill gold" style="font-size:10px;padding:1px 6px">Premium</span>';
    out += '</label>';
    if (form.scheduleEnabled && isPremium) {
      out += '<div class="db-field" style="margin-top:2px">' + dbIcon('clock', 13) + '<input id="dbCampScheduleAt" type="datetime-local" value="' + escAttr(form.scheduleAt || '') + '" data-action="db-compose-field" data-field="scheduleAt"/></div>';
    }

    // Smart send window
    out += '<label style="display:flex;align-items:center;gap:8px;cursor:' + (isPremium ? 'pointer' : 'not-allowed') + '">';
    out += '<input type="checkbox" id="dbCampSmartSend" ' + (form.smartSendEnabled ? 'checked' : '') + ' ' + (!isPremium ? 'disabled' : '') + ' data-action="db-compose-field" data-field="smartSendEnabled" style="accent-color:var(--db-green)">';
    out += '<span style="font-size:12.5px;color:' + (isPremium ? 'var(--db-ink2)' : 'var(--db-muted)') + '">Smart send window (stagger sends)</span>';
    if (!isPremium) out += ' <span class="db-pill gold" style="font-size:10px;padding:1px 6px">Premium</span>';
    out += '</label>';

    out += '</div>';

    out += '</div>'; // modal-body

    out += '<div class="db-modal-foot">';
    out += '<button class="db-btn ghost" data-action="db-compose-back">' + dbIcon('arrowLeft', 13) + ' ' + t('db.compose.back') + '</button>';
    out += '<span style="flex:1"></span>';
    out += '<button class="db-btn secondary" data-action="db-compose-test">' + dbIcon('play') + ' ' + t('db.compose.test') + '</button>';
    out += '<button class="db-btn primary" data-action="db-compose-send">' + dbIcon('send') + ' ' + t('db.compose.send') + '</button>';
    out += '</div>';

  // ── Sending (modal closes automatically; banner shows instead) ──
  } else if (step === "sending") {
    // This state is transient — the modal will close and banner will appear
    out += '<div class="db-modal-head"><h3 style="font-size:16px;font-weight:700;color:var(--db-ink);margin:0">Sending…</h3></div>';
    out += '<div class="db-modal-body" style="text-align:center;padding:40px 24px">';
    out += '<div style="font-size:36px;margin-bottom:16px;animation:spin 1s linear infinite">📤</div>';
    out += '<div style="font-size:14px;font-weight:500;color:var(--db-ink);margin-bottom:6px">' + esc(DB.composeSendingProgress || 'Preparing…') + '</div>';
    out += '<div style="font-size:12px;color:var(--db-muted)">You can keep using the dashboard while emails send</div>';
    out += '</div>';

  // "done" step removed — results now shown via inline sending banner
  }

  out += '</div></div>';
  return out;
}

// ── Dashboard Follow-Up Modal ─────────────────────────────────────

function dbFollowUpModal() {
  var step = DB.followUpStep || "compose";
  var campId = DB.followUpCampId;
  var camp = (S.history || []).find(function(c) { return c.id === campId; }) || {};
  var campName = camp.name || camp.sheetName || "Campaign";
  var isPremium = true;

  var out = '<div class="db-modal-backdrop">';
  out += '<div class="db-modal">';

  if (step === "compose") {
    out += '<div class="db-modal-head">';
    out += '<div><h3 style="font-size:16px;font-weight:700;color:var(--db-ink);margin:0">Follow-up Campaign</h3>';
    out += '<p style="font-size:12.5px;color:var(--db-muted);margin:2px 0 0">Replying to: ' + esc(campName) + ' · ' + esc(camp.subject || '') + '</p></div>';
    out += '<button class="db-btn ghost sm" data-action="db-followup-close">' + dbIcon('x', 14) + '</button>';
    out += '</div>';

    out += '<div class="db-modal-body" style="display:flex;flex-direction:column;gap:14px">';

    if (!isPremium) {
      out += '<div style="background:var(--db-gold-tint);border:1px solid var(--db-gold);border-radius:10px;padding:12px 14px;font-size:13px;color:var(--db-ink)">';
      out += dbIcon('star', 14) + ' <strong>Premium feature.</strong> Follow-up campaigns (threaded replies) require a Premium plan. <button class="db-btn primary sm" data-action="db-nav" data-tab="billing" style="margin-left:6px">Upgrade</button>';
      out += '</div>';
    }

    // From Name + Reply-To
    out += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">';
    out += '<div><div class="db-field-label">From Name</div>';
    out += '<div class="db-field">' + dbIcon('user', 13) + '<input id="fuFromName" placeholder="Your Name" value="' + escAttr(S.followUpFromName || '') + '"/></div></div>';
    out += '<div><div class="db-field-label">Reply-To Email</div>';
    out += '<div class="db-field">' + dbIcon('reply', 13) + '<input id="fuReplyTo" type="email" placeholder="reply@yourdomain.com" value="' + escAttr(S.followUpReplyTo || '') + '"/></div></div>';
    out += '</div>';

    // Subject
    out += '<div><div class="db-field-label">Subject</div>';
    out += '<div class="db-field">' + dbIcon('type') + '<input id="fuSubject" placeholder="Re: ' + escAttr(camp.subject || 'your message') + '" value="' + escAttr(S.followUpSubject || ('Re: ' + (camp.subject || ''))) + '"/></div></div>';

    // ── Recipients (shown before body so user sees them immediately) ──
    var fuSearch = DB.fuRecipientSearch || '';
    var allRecip = S.followUpRecipients || [];
    var visibleRecip = fuSearch
      ? allRecip.filter(function(r) {
          var q = fuSearch.toLowerCase();
          return (r.name||'').toLowerCase().includes(q) || (r.email||'').toLowerCase().includes(q);
        })
      : allRecip;
    var selectedCount = allRecip.filter(function(r) { return r.selected; }).length;

    out += '<div style="background:var(--db-surface2);border:1.5px solid var(--db-line);border-radius:10px;padding:12px 14px">';
    out += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">';
    out += '<div class="db-field-label" style="margin:0">';
    if (!S.followUpRecipientsLoaded) {
      out += dbIcon('users', 13) + ' Recipients <span style="color:var(--db-muted);font-weight:400;font-size:11px">— loading…</span>';
    } else {
      out += dbIcon('users', 13) + ' Recipients <span style="color:var(--db-muted);font-weight:400;font-size:11px">(' + selectedCount + ' of ' + allRecip.length + ' selected)</span>';
    }
    out += '</div>';
    out += '<div style="display:flex;gap:5px">';
    out += '<button class="db-btn ghost sm" data-action="db-fu-select-all" style="font-size:11px">All</button>';
    out += '<button class="db-btn ghost sm" data-action="db-fu-select-none" style="font-size:11px">None</button>';
    out += '</div></div>';
    // Search box
    out += '<div class="db-field" style="margin-bottom:8px">' + dbIcon('search', 13) + '<input id="fuRecipientSearch" placeholder="Search recipients…" value="' + escAttr(fuSearch) + '" style="font-size:12.5px"/></div>';
    // List
    out += '<div style="max-height:130px;overflow-y:auto;display:flex;flex-direction:column;gap:3px">';
    if (!S.followUpRecipientsLoaded) {
      out += '<div style="font-size:12px;color:var(--db-muted);padding:10px;text-align:center">Loading…</div>';
    } else if (allRecip.length === 0) {
      out += '<div style="font-size:12px;color:var(--db-muted);padding:10px;text-align:center">No recipients found for this campaign.</div>';
    } else if (visibleRecip.length === 0) {
      out += '<div style="font-size:12px;color:var(--db-muted);padding:6px">No matches for "' + esc(fuSearch) + '"</div>';
    } else {
      visibleRecip.slice(0, 80).forEach(function(r) {
        var ri = allRecip.indexOf(r);
        out += '<label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:12.5px;padding:3px 2px;border-radius:5px">';
        out += '<input type="checkbox" data-action="db-fu-toggle-recipient" data-index="' + ri + '" ' + (r.selected ? 'checked' : '') + ' style="accent-color:var(--db-green);flex-shrink:0">';
        out += '<span style="color:var(--db-ink);font-weight:500">' + esc(r.name || r.email) + '</span>';
        if (r.name) out += '<span style="color:var(--db-muted);font-size:11px;margin-left:2px">' + esc(r.email) + '</span>';
        out += '</label>';
      });
      if (visibleRecip.length > 80) {
        out += '<div style="font-size:11.5px;color:var(--db-muted);padding:4px 2px">+ ' + (visibleRecip.length - 80) + ' more — refine search to filter</div>';
      }
    }
    out += '</div>';
    out += '</div>';

    // Body
    out += '<div><div class="db-field-label">Message</div>';
    out += '<textarea id="fuBody" style="width:100%;min-height:160px;background:var(--db-surface2);border:1.5px solid var(--db-line);border-radius:10px;padding:12px 14px;font-size:13px;font-family:var(--db-sans);color:var(--db-ink);resize:vertical;box-sizing:border-box;outline:none" placeholder="Hi {{FirstName}},&#10;&#10;Just wanted to follow up on my previous email…&#10;&#10;Best,&#10;Your team">' + escAttr(S.followUpBody || '') + '</textarea></div>';

    // Test email + delay
    out += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">';
    out += '<div><div class="db-field-label">Test email address</div>';
    out += '<div class="db-field">' + dbIcon('mail', 13) + '<input id="fuTestEmail" type="email" placeholder="you@email.com" value="' + escAttr(S.followUpTestEmail || S.testEmail || '') + '"/></div></div>';
    out += '<div><div class="db-field-label">Delay between sends (ms)</div>';
    out += '<div class="db-field">' + dbIcon('activity', 13) + '<input id="fuDelay" type="number" min="0" max="10000" step="100" placeholder="500" value="' + escAttr(String(S.followUpDelayMs || 500)) + '"/></div></div>';
    out += '</div>';

    out += '</div>'; // modal-body

    out += '<div class="db-modal-foot">';
    out += '<button class="db-btn ghost" data-action="db-followup-close">' + dbIcon('arrowLeft', 13) + ' Cancel</button>';
    out += '<span style="flex:1"></span>';
    out += '<button class="db-btn secondary" data-action="db-followup-test"' + (!isPremium ? ' disabled title="Premium required"' : '') + '>' + dbIcon('play') + ' Test Send</button>';
    out += '<button class="db-btn primary" data-action="db-followup-send"' + (!isPremium ? ' disabled title="Premium required"' : '') + '>' + dbIcon('reply') + ' Send Follow-up</button>';
    out += '</div>';

  } else if (step === "sending") {
    out += '<div class="db-modal-head"><h3 style="font-size:16px;font-weight:700;color:var(--db-ink);margin:0">Sending follow-up…</h3></div>';
    out += '<div class="db-modal-body" style="text-align:center;padding:40px 24px">';
    out += '<div style="font-size:36px;margin-bottom:16px;animation:spin 1s linear infinite">↩</div>';
    out += '<div style="font-size:14px;font-weight:500;color:var(--db-ink);margin-bottom:6px">Sending as threaded replies…</div>';
    out += '<div style="font-size:12px;color:var(--db-muted)">Do not close this window</div>';
    out += '</div>';

  } else if (step === "done") {
    var res = DB.followUpResult || {};
    var allOk = res.errors === 0;
    out += '<div class="db-modal-head">';
    out += '<h3 style="font-size:16px;font-weight:700;color:var(--db-ink);margin:0">' + (allOk ? 'Follow-up sent!' : 'Follow-up complete') + '</h3>';
    out += '<button class="db-btn ghost sm" data-action="db-followup-close">' + dbIcon('x', 14) + '</button>';
    out += '</div>';
    out += '<div class="db-modal-body" style="text-align:center;padding:28px 24px">';
    out += '<div style="font-size:48px;margin-bottom:14px">' + (allOk ? '✅' : '⚠️') + '</div>';
    out += '<div style="font-size:26px;font-weight:800;color:var(--db-green);margin-bottom:4px">' + (res.sent || 0) + ' sent</div>';
    if (res.threaded) out += '<div style="font-size:13px;color:var(--db-muted);margin-top:4px">' + res.threaded + ' sent as threaded replies</div>';
    if (res.errors > 0) out += '<div style="font-size:13px;color:var(--db-red);margin-top:6px">' + res.errors + ' failed</div>';
    out += '<div style="font-size:13px;color:var(--db-muted);margin-top:10px">Follow-up to: ' + esc(campName) + '</div>';
    out += '</div>';
    out += '<div class="db-modal-foot">';
    out += '<button class="db-btn ghost" data-action="db-followup-close">Close</button>';
    out += '<span style="flex:1"></span>';
    out += '<button class="db-btn secondary" data-action="db-open-compose">' + dbIcon('plus') + ' New campaign</button>';
    out += '</div>';
  }

  out += '</div></div>';
  return out;
}

// ── Dashboard Campaign Results Modal ──────────────────────────────

function dbResultsModal() {
  var camp = DB.resultsCamp || {};
  var results = camp.results || [];
  var sent = camp.sent || camp.sentCount || 0;
  var errors = camp.errors || camp.errorCount || 0;
  var total = camp.total || camp.recipientCount || (sent + errors);
  var rate = total > 0 ? (((total - errors) / total) * 100).toFixed(1) : '—';
  var rateColor = parseFloat(rate) >= 97 ? 'var(--db-green)' : parseFloat(rate) >= 93 ? 'var(--db-amber)' : 'var(--db-red)';

  var out = '<div class="db-modal-backdrop">';
  out += '<div class="db-modal" style="width:680px">';

  out += '<div class="db-modal-head">';
  out += '<div><h3 style="font-size:16px;font-weight:700;color:var(--db-ink);margin:0">' + esc(camp.name || camp.sheetName || 'Campaign') + '</h3>';
  out += '<p style="font-size:12.5px;color:var(--db-muted);margin:2px 0 0">' + esc(camp.subject || '') + ' · ' + esc(camp.date || '') + '</p></div>';
  out += '<button class="db-btn ghost sm" data-action="db-results-close">' + dbIcon('x', 14) + '</button>';
  out += '</div>';

  out += '<div class="db-modal-body">';

  // Stat row
  out += '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:4px">';
  [
    { label: 'Total sent',    value: total,  color: 'var(--db-ink)' },
    { label: 'Delivered',     value: sent,   color: 'var(--db-green)' },
    { label: 'Errors',        value: errors, color: errors > 0 ? 'var(--db-red)' : 'var(--db-muted)' },
    { label: 'Delivery rate', value: rate + (rate !== '—' ? '%' : ''), color: rateColor },
  ].forEach(function(s) {
    out += '<div style="background:var(--db-bg);border-radius:10px;padding:12px 14px;text-align:center">';
    out += '<div style="font-size:22px;font-weight:800;color:' + s.color + ';font-variant-numeric:tabular-nums">' + s.value + '</div>';
    out += '<div style="font-size:11.5px;color:var(--db-muted);margin-top:3px">' + s.label + '</div>';
    out += '</div>';
  });
  out += '</div>';

  // Campaign info card
  out += '<div style="background:var(--db-bg);border-radius:10px;padding:12px 14px;font-size:12.5px;display:flex;flex-direction:column;gap:6px">';
  if (camp.sheetName) out += '<div><span style="color:var(--db-muted);width:90px;display:inline-block">Sheet</span><span style="color:var(--db-ink)">' + esc(camp.sheetName) + '</span></div>';
  if (camp.subject)   out += '<div><span style="color:var(--db-muted);width:90px;display:inline-block">Subject</span><span style="color:var(--db-ink)">' + esc(camp.subject) + '</span></div>';
  if (camp.date)      out += '<div><span style="color:var(--db-muted);width:90px;display:inline-block">Sent on</span><span style="color:var(--db-ink)">' + esc(camp.date) + '</span></div>';
  out += '</div>';

  // Per-recipient results table (if available)
  if (results.length > 0) {
    out += '<div>';
    out += '<div class="db-field-label" style="margin-bottom:8px">Per-recipient results</div>';
    out += '<div style="max-height:240px;overflow-y:auto;border-radius:10px;overflow:hidden">';
    out += '<table class="db-table" style="margin:0"><thead><tr><th>Email</th><th>Status</th><th>Detail</th></tr></thead><tbody>';
    results.forEach(function(r) {
      var statusColor = r.status === 'SENT' ? 'var(--db-green)' : r.status === 'TEST_SENT' ? 'var(--db-blue)' : 'var(--db-red)';
      var statusLabel = r.status === 'SENT' ? 'Sent' : r.status === 'TEST_SENT' ? 'Test' : r.status === 'SKIPPED' ? 'Skipped' : 'Error';
      out += '<tr>';
      out += '<td style="font-family:var(--db-mono);font-size:12px">' + esc(r.email || '') + '</td>';
      out += '<td><span style="color:' + statusColor + ';font-weight:600;font-size:12px">' + statusLabel + '</span></td>';
      out += '<td style="font-size:11.5px;color:var(--db-muted)">' + esc(r.error || r.debug || '') + '</td>';
      out += '</tr>';
    });
    out += '</tbody></table></div></div>';
  } else {
    out += '<div style="text-align:center;padding:20px;color:var(--db-muted);font-size:13px">';
    out += dbIcon('info', 14) + ' No per-recipient data available for this campaign.';
    out += '</div>';
  }

  out += '</div>'; // modal-body

  out += '<div class="db-modal-foot">';
  out += '<button class="db-btn ghost" data-action="db-results-close">Close</button>';
  out += '<span style="flex:1"></span>';
  out += '<button class="db-btn secondary" data-action="db-followup-from-id" data-id="' + escAttr(camp.id || '') + '" data-prefetch-followup="' + escAttr(camp.id || '') + '">' + dbIcon('reply') + ' Follow-up</button>';
  out += '</div>';

  out += '</div></div>';
  return out;
}

// ── Dashboard Follow-Up: open modal ──────────────────────────────

var _followUpModalOpening = false; // guard against double-open during async preload
var _fuRecipientsCache = {};       // { [campaignId]: [{email, name, rowIndex, selected}] }
var _fuRecipientsFetching = {};    // { [campaignId]: true } — in-flight guard

// Silently pre-fetch recipients for a campaign (no render, no UI changes)
async function preFetchFollowUpRecipients(campaignId) {
  // If already cached, nothing to do
  if (_fuRecipientsCache[campaignId]) return;
  // If already fetching, wait for it to complete by polling
  if (_fuRecipientsFetching[campaignId]) {
    var waited = 0;
    while (_fuRecipientsFetching[campaignId] && waited < 1000) {
      await new Promise(function(r) { setTimeout(r, 50); });
      waited += 50;
    }
    return; // cache will be set by the in-flight fetch
  }
  var campaign = (S.history || []).find(function(c) { return c.id === campaignId; });
  if (!campaign) return;
  _fuRecipientsFetching[campaignId] = true;

  function parseRows(rows) {
    if (!Array.isArray(rows) || rows.length < 2) return [];
    var headers = rows[0].map(function(h) { return String(h || "").trim().toLowerCase(); });
    var emailIdx = headers.indexOf("email");
    var nameIdx = headers.indexOf("firstname") >= 0 ? headers.indexOf("firstname")
                : headers.indexOf("name") >= 0 ? headers.indexOf("name") : -1;
    var out = [];
    for (var ri = 1; ri < rows.length; ri++) {
      var row = rows[ri];
      var email = emailIdx >= 0 ? String(row[emailIdx] || "").trim() : "";
      if (!email) continue;
      var name = nameIdx >= 0 ? String(row[nameIdx] || "").trim() : "";
      out.push({ email: email, name: name, rowIndex: ri, selected: true });
    }
    return out;
  }

  try {
    // Contacts-based campaign: recipients stored as inlineData in history
    if (campaign.inlineData && Array.isArray(campaign.inlineData)) {
      _fuRecipientsCache[campaignId] = parseRows(campaign.inlineData);
    } else if (campaign.sheetId) {
      // Sheet-based campaign: fetch from Google Sheets
      var dataRes = await api("getSheetData", { spreadsheetId: campaign.sheetId, tab: campaign.sheetTab || "" });
      if (dataRes.ok && Array.isArray(dataRes.data)) {
        _fuRecipientsCache[campaignId] = parseRows(dataRes.data);
      } else {
        _fuRecipientsCache[campaignId] = [];
      }
    } else if ((campaign.tags || []).some(function(t){ return t.startsWith('contacts'); })) {
      // Legacy contacts campaign (no inlineData saved) — rebuild from current S.contacts
      // Try to match by group or tag from the campaign tags field
      var contacts = S.contacts || [];
      var tagVal = (campaign.tags || []).find(function(t){ return t.startsWith('contacts'); }) || '';
      var groupMatch = tagVal.match(/contacts:group:(.+)/);
      var tagMatch   = tagVal.match(/contacts:([^:].+)/);
      var targets;
      if (groupMatch) {
        targets = contacts.filter(function(c){ return c.group === groupMatch[1]; });
      } else if (tagMatch) {
        targets = contacts.filter(function(c){ return (c.tags||[]).indexOf(tagMatch[1]) !== -1; });
      } else {
        targets = contacts;
      }
      _fuRecipientsCache[campaignId] = targets.map(function(c, i) {
        return { email: c.email, name: c.name || '', rowIndex: i, selected: true };
      });
    } else {
      _fuRecipientsCache[campaignId] = [];
    }
  } catch(e) {
    _fuRecipientsCache[campaignId] = [];
  }
  delete _fuRecipientsFetching[campaignId];
}

async function dbOpenFollowUpModal(campaignId) {
  if (_followUpModalOpening) return;
  _followUpModalOpening = true;
  try {
    var campaign = (S.history || []).find(function(c) { return c.id === campaignId; });
    if (!campaign) { S.error = "Campaign not found."; render(); return; }

    S.followUpNeedsBackendUpdate = false;
    S.followUpCampaignId = campaignId;
    S.followUpSubject = "Re: " + (campaign.subject || "");
    S.followUpBody = "";
    S.followUpHtml = "";
    S.followUpEditorMode = "write";
    S.followUpFromName = campaign.fromName || S.fromName || "";
    S.followUpReplyTo = campaign.replyTo || S.replyTo || "";
    S.followUpTestEmail = campaign.testEmail || S.testEmail || "";
    S.followUpDelayMs = campaign.delayMs || 500;
    S.followUpSelectAll = true;
    S.followUpCustomFields = [];
    DB.followUpStep = "compose";
    DB.followUpCampId = campaignId;
    DB.followUpResult = null;
    DB.fuRecipientSearch = "";

    // ── Use cache if available, otherwise fetch now (wait up to 1s) ──
    if (!_fuRecipientsCache[campaignId]) {
      // Not cached yet — fetch for ALL campaign types (contacts, sheet, legacy)
      await Promise.race([
        preFetchFollowUpRecipients(campaignId),
        new Promise(function(resolve) { setTimeout(resolve, 1000); })
      ]);
    }
    if (_fuRecipientsCache[campaignId] && _fuRecipientsCache[campaignId].length > 0) {
      S.followUpRecipients = _fuRecipientsCache[campaignId].map(function(r) {
        return Object.assign({}, r, { selected: true });
      });
    } else {
      S.followUpRecipients = [];
    }
    S.followUpRecipientsLoaded = true;

    DB.showFollowUpModal = true;
    render();
  } finally {
    _followUpModalOpening = false;
  }
}

// ── Dashboard Follow-Up: send ──────────────────────────────────────

async function dbDoFollowUpFromModal(isTest) {
  // Sync fields from DOM
  var subj = document.getElementById("fuSubject");
  var body = document.getElementById("fuBody");
  var from = document.getElementById("fuFromName");
  var reply = document.getElementById("fuReplyTo");
  var testEl = document.getElementById("fuTestEmail");
  var delay = document.getElementById("fuDelay");

  if (subj)   S.followUpSubject  = subj.value;
  if (body)   S.followUpBody     = body.value;
  if (from)   S.followUpFromName = from.value.trim();
  if (reply)  S.followUpReplyTo  = reply.value.trim();
  if (testEl) S.followUpTestEmail = testEl.value.trim();
  if (delay)  S.followUpDelayMs  = Math.max(0, parseInt(delay.value, 10) || 500);

  var campaign = (S.history || []).find(function(c) { return c.id === DB.followUpCampId; });
  if (!campaign) { S.error = "Original campaign not found."; render(); return; }

  if (!S.followUpSubject.trim()) { S.error = "Add a subject before sending."; render(); return; }
  if (!S.followUpBody.trim())    { S.error = "Write your follow-up message before sending."; render(); return; }
  if (isTest && !S.followUpTestEmail) { S.error = "Enter a test email first."; render(); return; }

  var selectedEmails = S.followUpRecipients.filter(function(r) { return r.selected; }).map(function(r) { return r.email; });
  if (!isTest && S.followUpRecipientsLoaded && selectedEmails.length === 0) {
    S.error = "Select at least one recipient before sending."; render(); return;
  }

  DB.followUpStep = "sending";
  S.error = null;
  render();

  try {
    var htmlBody = S.followUpHtml.trim() || plainTextToHtml(S.followUpBody);
    var plainBody = S.followUpBody.trim() || htmlToPlainText(S.followUpHtml);

    var config = {
      spreadsheetId: campaign.sheetId,
      sheetTab: campaign.sheetTab || "",
      subject: S.followUpSubject,
      body: plainBody,
      htmlBody: htmlBody,
      fromName: S.followUpFromName,
      replyTo: S.followUpReplyTo,
      testEmail: isTest ? S.followUpTestEmail : "",
      testMode: isTest,
      delayMs: S.followUpDelayMs,
      selectedEmails: isTest ? [] : selectedEmails,
      noThread: false,
      customFields: {}
    };

    var res = await api("sendFollowUp", { config: config });

    if (res.ok) {
      var results = Array.isArray(res.data) ? res.data : [];
      var sent = 0, errors = 0, threaded = 0;
      results.forEach(function(r) {
        if (r.status === "SENT") { sent++; if (r.threadReply) threaded++; }
        else if (r.status === "TEST_SENT") sent++;
        else errors++;
      });

      if (!isTest) {
        S.stats.sent = (S.stats.sent || 0) + sent;
        S.stats.campaigns = (S.stats.campaigns || 0) + 1;
        // Save follow-up to history with type and parent campaign link
        var fuRecord = {
          id: 'fu_' + Date.now(),
          type: 'followup',
          name: S.followUpSubject || ('Follow-up: ' + (campaign.name || campaign.sheetName || '')),
          subject: S.followUpSubject,
          date: new Date().toLocaleDateString(),
          total: sent,
          errors: errors,
          status: 'sent',
          tags: ['followup'],
          parentId: campaign.id,
          parentName: campaign.name || campaign.sheetName || '',
          sheetId: campaign.sheetId,
          sheetTab: campaign.sheetTab || '',
          threaded: threaded
        };
        if (!S.history) S.history = [];
        S.history.unshift(fuRecord);
        chrome.storage.local.set({ mb_history: S.history, mb_stats: S.stats });
      }

      DB.followUpStep = "done";
      DB.followUpResult = { sent: sent, errors: errors, threaded: threaded, isTest: isTest };
      render();
    } else {
      var errMsg = res.error || "Follow-up failed.";
      if (errMsg.indexOf("Unknown action") !== -1 || errMsg.indexOf("sendFollowUp") !== -1) {
        S.error = "Your backend is outdated and doesn't support follow-up yet. Please redeploy the latest backend code.";
      } else {
        S.error = errMsg;
      }
      DB.followUpStep = "compose";
      render();
    }
  } catch(e) {
    S.error = e.message || "Follow-up failed";
    DB.followUpStep = "compose";
    render();
  }
}

// ── Dashboard compose: connect sheet ──────────────────────────────

async function dbComposeConnectSheet() {
  var form = DB.composeForm;
  var rawUrl = (document.getElementById("dbSheetUrl") || {}).value || form.sheetUrl || "";
  var customName = (document.getElementById("dbCampName") || {}).value || form.name || "";

  if (!S.scriptUrl) {
    S.error = "Add a backend in Settings first.";
    render();
    return;
  }
  if (!rawUrl.trim()) {
    S.error = "Paste a Google Sheets URL or ID first.";
    render();
    return;
  }

  // Extract sheet ID
  var spreadsheetId = rawUrl.trim();
  var urlMatch = rawUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  if (urlMatch) spreadsheetId = urlMatch[1];
  if (!/^[a-zA-Z0-9_-]{10,60}$/.test(spreadsheetId)) {
    S.error = "That doesn't look like a valid Google Sheets URL or ID.";
    render();
    return;
  }

  DB.composeSendingProgress = "Connecting to sheet…";
  DB.composeStep = "sending";
  S.error = null;
  render();

  // ── Helper: apply resolved sheet data into the compose form and advance ──
  function applySheetToComposeForm(tabs, sheetData, apiSheetName) {
    var firstTab = (tabs && tabs[0]) || "Sheet1";
    var rowCount = sheetData ? Math.max(sheetData.length - 1, 0) : 0;
    var sheetName = customName || apiSheetName || ("Sheet · " + spreadsheetId.slice(0, 10) + "…");

    // Persist to cache
    S.cache.sheetTabsBySheetId[spreadsheetId] = tabs || [];
    if (sheetData) {
      S.cache.sheetDataBySheetTab[spreadsheetId + "::" + firstTab] = sheetData;
    }
    persistCache();

    // Save to recent sheets list
    var newSheet = { id: spreadsheetId, name: sheetName, modified: Date.now() };
    S.sheets = S.sheets || [];
    var existingIdx = S.sheets.findIndex(function(s) { return s.id === spreadsheetId; });
    if (existingIdx >= 0) S.sheets.splice(existingIdx, 1);
    S.sheets.unshift(newSheet);
    chrome.storage.local.set({ mb_sheets: S.sheets });

    DB.composeForm.sheetId = spreadsheetId;
    DB.composeForm.sheetName = sheetName;
    DB.composeForm.sheetUrl = spreadsheetId;
    DB.composeForm.sheetTab = firstTab;
    DB.composeForm.recipientCount = rowCount;
    if (customName) DB.composeForm.name = customName;

    if (sheetData && sheetData.length > 0) {
      DB.composeForm.sheetHeaders = (sheetData[0] || []).map(function(h) { return String(h).trim(); }).filter(function(h) { return h; });
    }
  }

  // ── Check cache first — serve instantly if available ──────────────
  var cachedTabs = S.cache.sheetTabsBySheetId[spreadsheetId];
  var firstTabGuess = (cachedTabs && cachedTabs[0]) || "Sheet1";
  var cachedData = S.cache.sheetDataBySheetTab[spreadsheetId + "::" + firstTabGuess];

  if (Array.isArray(cachedTabs) && cachedTabs.length && Array.isArray(cachedData) && cachedData.length) {
    // Instant — open compose from cache
    applySheetToComposeForm(cachedTabs, cachedData, null);
    DB.composeStep = "compose";
    render();

    // Revalidate in background (silent — only updates headers/rowCount if changed)
    Promise.all([
      api("getSheetTabs", { spreadsheetId: spreadsheetId }),
      api("getSheetData", { spreadsheetId: spreadsheetId, tab: firstTabGuess })
    ]).then(function(results) {
      var tabsRes = results[0], dataRes = results[1];
      if (!tabsRes.ok) return;
      var resData = tabsRes.data;
      var freshTabs = Array.isArray(resData) ? resData : (Array.isArray(resData && resData.tabs) ? resData.tabs : cachedTabs);
      var freshName = (resData && resData.spreadsheetName) ? resData.spreadsheetName : null;
      var freshData = dataRes.ok ? dataRes.data : cachedData;
      applySheetToComposeForm(freshTabs, freshData, freshName);
      // Silently re-render if still on compose step to update row count / headers
      if (DB.composeStep === "compose" && DB.showComposeModal) render();
    }).catch(function() { /* silent — user already has cached data */ });

    return;
  }

  // ── No cache — fetch live (parallel) ─────────────────────────────
  try {
    var results = await Promise.all([
      api("getSheetTabs", { spreadsheetId: spreadsheetId }),
      api("getSheetData", { spreadsheetId: spreadsheetId, tab: "Sheet1" })
    ]);
    var res = results[0], dataRes = results[1];

    if (!res.ok) {
      S.error = res.error || "Could not access the spreadsheet. Check the URL and sharing settings.";
      DB.composeStep = "sheet";
      render();
      return;
    }

    // Support both old (plain array) and new (object with .tabs + .spreadsheetName) response shapes
    var resData = res.data;
    var tabs = Array.isArray(resData) ? resData : (Array.isArray(resData && resData.tabs) ? resData.tabs : []);
    var apiSheetName = (resData && resData.spreadsheetName) ? resData.spreadsheetName : null;
    var firstTab = tabs[0] || "Sheet1";

    var sheetData = dataRes.ok ? dataRes.data : null;
    // If the real first tab isn't "Sheet1", fetch data for the correct tab
    if (firstTab !== "Sheet1") {
      var fallbackRes = await api("getSheetData", { spreadsheetId: spreadsheetId, tab: firstTab });
      sheetData = fallbackRes.ok ? fallbackRes.data : sheetData;
    }

    applySheetToComposeForm(tabs, sheetData, apiSheetName);
    DB.composeStep = "compose";
    render();
  } catch(e) {
    S.error = "Failed to connect: " + (e.message || String(e));
    DB.composeStep = "sheet";
    render();
  }
}

// ── Start campaign from contacts (no sheet needed) ────────────────
function startCampaignFromContactsGroup(groupName) {
  if (!S.scriptUrl) {
    S.error = "Add a backend in Settings first before sending a campaign.";
    render();
    return;
  }

  var allContacts = S.contacts || [];
  var targets = groupName
    ? allContacts.filter(function(c) { return c.group === groupName; })
    : allContacts;

  if (targets.length === 0) {
    S.error = groupName
      ? 'No contacts in group "' + groupName + '".'
      : 'No contacts found. Add contacts first.';
    render();
    return;
  }

  var headers = ['Name', 'Email', 'FirstName', 'LastName', 'Group', 'Tags'];
  var cfKeys = [];
  targets.forEach(function(c) {
    Object.keys(c.customFields || {}).forEach(function(k) {
      if (cfKeys.indexOf(k) === -1) cfKeys.push(k);
    });
  });
  cfKeys.forEach(function(k) { headers.push(k); });

  var rows = [headers];
  targets.forEach(function(c) {
    var nameParts = (c.name || '').trim().split(' ');
    var row = [
      c.name || '',
      c.email || '',
      nameParts[0] || '',
      nameParts.slice(1).join(' ') || '',
      c.group || '',
      (c.tags || []).join(', ')
    ];
    cfKeys.forEach(function(k) { row.push((c.customFields || {})[k] || ''); });
    rows.push(row);
  });

  var campLabel = groupName ? ('"' + groupName + '" group') : 'All contacts';

  DB.showComposeModal = true;
  DB.composeStep = "compose";
  DB.composeResult = null;
  DB.composeSendingProgress = "";
  DB.composeForm = {
    name: campLabel + ' — ' + new Date().toLocaleDateString(),
    subject: '',
    body: '',
    htmlBody: '',
    editorMode: 'write',
    sheetUrl: '',
    sheetId: '',
    sheetName: '',
    sheetTab: '',
    sheetHeaders: headers,
    recipientCount: targets.length,
    fromName: S.fromName || '',
    replyTo: S.replyTo || '',
    cc: '',
    bcc: '',
    delayMs: S.delayMs || 500,
    testEmail: S.testEmail || '',
    attachments: [],
    unsubscribeEnabled: false,
    scheduleEnabled: false,
    scheduleAt: '',
    smartSendEnabled: false,
    isContactsCampaign: true,
    inlineData: rows,
    contactTag: null,
    contactGroup: groupName || null
  };
  DB.tab = "campaigns";
  render();
}

function startCampaignFromContacts(tag) {
  if (!S.scriptUrl) {
    S.error = "Add a backend in Settings first before sending a campaign.";
    render();
    return;
  }

  // Get the contacts to send to (filtered by tag if provided)
  var allContacts = S.contacts || [];
  var targets = tag
    ? allContacts.filter(function(c) { return c.tags && c.tags.indexOf(tag) !== -1; })
    : allContacts;

  if (targets.length === 0) {
    S.error = tag
      ? 'No contacts found with tag "' + tag + '".'
      : 'No contacts found. Add contacts first.';
    render();
    return;
  }

  // Build inlineData in the format the backend expects:
  // Row 0 = headers, rows 1..N = data rows
  var headers = ['Name', 'Email', 'FirstName', 'LastName', 'Tags'];

  // Collect all custom field keys across all contacts
  var cfKeys = [];
  targets.forEach(function(c) {
    Object.keys(c.customFields || {}).forEach(function(k) {
      if (cfKeys.indexOf(k) === -1) cfKeys.push(k);
    });
  });
  cfKeys.forEach(function(k) { headers.push(k); });

  var rows = [headers];
  targets.forEach(function(c) {
    var nameParts = (c.name || '').trim().split(' ');
    var row = [
      c.name || '',
      c.email || '',
      nameParts[0] || '',
      nameParts.slice(1).join(' ') || '',
      (c.tags || []).join(', ')
    ];
    cfKeys.forEach(function(k) { row.push((c.customFields || {})[k] || ''); });
    rows.push(row);
  });

  var campLabel = tag ? ('"' + tag + '" contacts') : 'All contacts';

  // Open compose modal at the compose step with inlineData pre-loaded
  DB.showComposeModal = true;
  DB.composeStep = "compose";
  DB.composeResult = null;
  DB.composeSendingProgress = "";
  DB.composeForm = {
    name: campLabel + ' — ' + new Date().toLocaleDateString(),
    subject: '',
    body: '',
    htmlBody: '',
    editorMode: 'write',
    // Contacts mode — no sheet
    sheetUrl: '',
    sheetId: '',
    sheetName: '',
    sheetTab: '',
    sheetHeaders: headers,
    recipientCount: targets.length,
    fromName: S.fromName || '',
    replyTo: S.replyTo || '',
    cc: '',
    bcc: '',
    delayMs: S.delayMs || 500,
    testEmail: S.testEmail || '',
    attachments: [],
    unsubscribeEnabled: false,
    scheduleEnabled: false,
    scheduleAt: '',
    smartSendEnabled: false,
    // Contacts-mode specific
    isContactsCampaign: true,
    inlineData: rows,
    contactTag: tag || null
  };
  DB.tab = "campaigns";
  render();
}

// ── Dashboard compose: send ────────────────────────────────────────

async function dbSendCampaignFromModal(isTest) {
  var form = DB.composeForm;

  // Read live values from DOM inputs
  var subjectEl = document.getElementById("dbCampSubject");
  var bodyEl    = document.getElementById("dbCampBody");
  var htmlEl    = document.getElementById("dbCampHtml");
  var fromEl    = document.getElementById("dbCampFromName");
  var replyEl   = document.getElementById("dbCampReplyTo");
  var ccEl      = document.getElementById("dbCampCC");
  var bccEl     = document.getElementById("dbCampBCC");
  var delayEl   = document.getElementById("dbCampDelay");
  var testEl    = document.getElementById("dbCampTestEmail");
  if (subjectEl) form.subject   = subjectEl.value;
  if (bodyEl)    form.body      = bodyEl.value;
  if (htmlEl)    form.htmlBody  = htmlEl.value;
  if (fromEl)    form.fromName  = fromEl.value.trim();
  if (replyEl)   form.replyTo   = replyEl.value.trim();
  if (ccEl)      form.cc        = ccEl.value.trim();
  if (bccEl)     form.bcc       = bccEl.value.trim();
  if (delayEl)   form.delayMs   = Math.max(0, parseInt(delayEl.value, 10) || 500);
  if (testEl)    form.testEmail = testEl.value.trim();

  if (!S.scriptUrl) {
    S.error = "No backend configured. Add one in Settings.";
    render();
    return;
  }
  if (!form.subject.trim()) {
    S.error = "Please enter a subject line.";
    render();
    return;
  }
  var isContactsCampaign = !!(form.isContactsCampaign && form.inlineData);

  if (!isContactsCampaign && !form.sheetId) {
    S.error = "No spreadsheet connected.";
    render();
    return;
  }
  if (isTest && !form.testEmail) {
    S.error = "Enter a test email address first.";
    render();
    return;
  }

  // Close compose modal and show inline sending banner
  DB.composeStep = "sending";
  DB.composeSendingProgress = isTest ? "Sending test email…" : "Preparing campaign…";
  DB.showComposeModal = false;
  DB.sendingBanner = { status: "sending", label: isTest ? "Sending test email…" : "Sending campaign…", campName: form.name || form.sheetName || "" };
  S.error = null;
  render();

  try {
    var isHtmlMode = form.editorMode === "html";
    var htmlBody   = isHtmlMode ? (form.htmlBody || "") : "";

    var config = {
      spreadsheetId: isContactsCampaign ? "" : form.sheetId,
      sheetTab:      isContactsCampaign ? "" : (form.sheetTab || "Sheet1"),
      subject:       form.subject,
      body:          form.body || "",
      htmlBody:      htmlBody,
      fromName:      form.fromName  || S.fromName  || "",
      replyTo:       form.replyTo   || S.replyTo   || "",
      cc:            form.cc        || "",
      bcc:           form.bcc       || "",
      delayMs:       form.delayMs   != null ? form.delayMs : (S.delayMs || 500),
      testEmail:     isTest ? form.testEmail : "",
      testMode:      isTest,
      attachments:   []
    };

    // Contacts-mode: pass inline recipient data instead of a sheet
    if (isContactsCampaign) {
      config.inlineData = form.inlineData;
    }

    DB.composeSendingProgress = isTest ? "Sending test…" : "Sending campaign via backend…";
    render();

    var res = await api("sendMerge", { config: config });

    var sent   = 0;
    var errors = 0;

    if (res.ok) {
      var results = Array.isArray(res.data) ? res.data : [];
      results.forEach(function(r) {
        if (r.status === "SENT") sent++;
        else errors++;
      });

      // Save to history if real send
      if (!isTest) {
        var campaignName = form.name || ("Campaign " + new Date().toLocaleDateString());
        var histEntry = {
          id:             "c_" + Date.now(),
          name:           campaignName,
          subject:        form.subject,
          sheetId:        isContactsCampaign ? "" : form.sheetId,
          sheetName:      isContactsCampaign ? (form.contactGroup ? '"' + form.contactGroup + '" group' : form.contactTag ? '"' + form.contactTag + '" contacts' : 'Contacts') : form.sheetName,
          sheetTab:       isContactsCampaign ? "" : (form.sheetTab || ""),
          inlineData:     isContactsCampaign ? form.inlineData : null,
          total:          sent + errors,
          sent:           sent,
          errors:         errors,
          sentCount:      sent,
          errorCount:     errors,
          recipientCount: sent + errors,
          createdAt:      Date.now(),
          date:           new Date().toLocaleDateString(),
          status:         errors === (sent + errors) ? "failed" : "sent",
          type:           isContactsCampaign ? "sent" : "sent",
          tags:           isContactsCampaign ? ["contacts" + (form.contactGroup ? ':group:' + form.contactGroup : form.contactTag ? ':' + form.contactTag : '')] : [],
          results:        results
        };
        S.history = S.history || [];
        S.history.unshift(histEntry);
        S.stats = S.stats || {};
        S.stats.sent        = (S.stats.sent        || 0) + sent;
        S.stats.sentToday   = (S.stats.sentToday   || 0) + sent;
        S.stats.totalSent   = (S.stats.totalSent   || 0) + sent;
        S.stats.errors      = (S.stats.errors      || 0) + errors;
        S.stats.campaigns   = (S.stats.campaigns   || 0) + 1;
        chrome.storage.local.set({ mb_history: S.history, mb_stats: S.stats });
      }

      DB.composeStep   = "sheet";
      DB.composeResult = { sent: sent, errors: errors, isTest: isTest };
      DB.sendingBanner = { status: "done", sent: sent, errors: errors, campName: (isTest ? "[Test] " : "") + (form.name || form.sheetName || "Campaign") };
      // Auto-dismiss the banner after 8 seconds
      setTimeout(function() {
        if (DB.sendingBanner && DB.sendingBanner.status === "done") {
          DB.sendingBanner = null;
          render();
        }
      }, 8000);
      render();
    } else {
      throw new Error(res.error || "Backend returned an error");
    }

  } catch(e) {
    DB.sendingBanner = { status: "error", label: e.message || "Send failed", campName: form.name || form.sheetName || "" };
    DB.composeStep = "sheet";
    render();
  }
}

// ── Sidebar ───────────────────────────────────────────────────────

function dbSidebar() {
  var isPremium = true;
  var isPro = true;
  var planLabel = isPremium ? "Premium" : isPro ? "Pro" : "Starter";
  var sentToday = S.stats.sentToday || S.stats.sent || 0;
  var collapsed = DB.sidebarCollapsed;

  var nav = [
    { section: 'Main', items: [
      { id:'overview',  label:t('db.nav.overview'),  icon:'grid' },
      { id:'campaigns', label:t('db.nav.campaigns'), icon:'mail' },
      { id:'analytics', label:t('db.nav.analytics'), icon:'chart' },
    ]},
    { section: 'Features', items: [
      { id:'contacts',  label:t('db.nav.contacts'), icon:'users', count: (S.contacts||[]).length },
      { id:'drips',     label:t('db.nav.drip'),     icon:'activity' },
    ]},
    { section: 'Account', items: [
      { id:'billing',   label:t('db.nav.billing'),  icon:'card' },
      { id:'settings',  label:t('db.nav.settings'), icon:'settings' },
    ]},
  ];

  var out = '<aside class="db-sidebar' + (collapsed ? ' db-sidebar-collapsed' : '') + '">';

  // Brand
  out += '<div class="db-brand">';
  if (!collapsed) {
    out += '<div class="db-brand-logo"><div class="db-brand-mark">M</div><span>Madbear<span style="color:var(--db-green3);margin-left:2px">✦</span></span></div>';
  } else {
    out += '<div class="db-brand-mark">M</div>';
  }
  out += '<button class="db-collapse-btn" data-action="db-toggle-sidebar">' + dbIcon(collapsed ? 'expand' : 'collapse', 12) + '</button>';
  out += '</div>';

  // Nav
  nav.forEach(function(section, si) {
    if (!collapsed) {
      out += '<div class="db-sidebar-section">' + esc(section.section) + '</div>';
    } else if (si > 0) {
      out += '<div style="height:1px;background:var(--db-line-soft);margin:8px 4px"></div>';
    }
    section.items.forEach(function(item) {
      var isActive = DB.tab === item.id;
      out += '<button class="db-nav-btn' + (isActive ? ' active' : '') + '" data-action="db-nav" data-tab="' + item.id + '" title="' + esc(item.label) + '">';
      out += dbIcon(item.icon, 16);
      if (!collapsed) {
        out += '<span>' + esc(item.label) + '</span>';
        if (item.count != null) {
          out += '<span class="db-nav-count">' + item.count + '</span>';
        }
      }
      out += '</button>';
    });
  });

  // Plan card
  if (!collapsed) {
    out += '<div class="db-plan-card">';
    out += '<div class="db-plan-label">Current plan</div>';
    out += '<div class="db-plan-name">' + esc(planLabel) + '</div>';
    out += '<div class="db-plan-usage"><span>' + sentToday + ' sent today</span><span style="color:var(--db-gold);font-weight:700">' + (isPremium ? '∞' : '') + '</span></div>';
    out += '<button class="db-btn secondary sm" style="width:100%;margin-top:8px;justify-content:center" data-action="db-nav" data-tab="billing">' + t('db.nav.managePlan') + '</button>';
    out += '</div>';
  }

  out += '</aside>';
  return out;
}

// ── Topbar ────────────────────────────────────────────────────────

function dbTopbar() {
  var labels = {
    overview:t('db.nav.overview'), campaigns:t('db.nav.campaigns'), analytics:t('db.nav.analytics'),
    contacts:t('db.nav.contacts'), drips:t('db.nav.drip'), billing:t('db.nav.billing'), settings:t('db.nav.settings')
  };
  var current = labels[DB.tab] || 'Overview';
  var out = '<div class="db-topbar">';
  out += '<div class="db-crumbs"><span>Madbear</span><span class="sep">/</span><span class="current">' + esc(current) + '</span></div>';
  out += '<div class="db-topbar-spacer"></div>';
  out += '<div class="db-topbar-search">' + dbIcon('search', 14) + '<input placeholder="Search campaigns, contacts…" id="dbSearchInp" value="' + escAttr(DB.campaignSearch || '') + '"/><span class="db-kbd">⌘K</span></div>';
  out += '<div class="db-topbar-actions">';
  out += '<button class="db-icon-btn" title="Help" data-action="db-nav" data-tab="settings">' + dbIcon('info', 14) + '</button>';
  out += '<button class="db-icon-btn" title="Notifications">' + dbIcon('bell', 14) + '<span class="db-notif-dot"></span></button>';
  out += '<button class="db-icon-btn" title="Settings" data-action="db-nav" data-tab="settings">' + dbIcon('settings', 14) + '</button>';
  out += '<div class="db-avatar" data-action="db-nav" data-tab="settings" style="cursor:pointer">MB</div>';
  out += '</div>';
  out += '</div>';
  return out;
}

// ── Overview panel ────────────────────────────────────────────────

function dbOverviewPanel() {
  var totalSent    = S.stats.sent || 0;
  var totalErrors  = S.stats.errors || 0;
  var totalSkipped = S.stats.skipped || 0;
  var campaigns    = (S.history || []);
  var deliveryRate = totalSent > 0 ? (((totalSent - totalErrors) / totalSent) * 100).toFixed(1) : '—';
  var sentToday    = S.stats.sentToday || 0;
  var last7        = dbGetLast7DaysSends();
  var weekTotal    = last7.reduce(function(s,d){return s+d.value;}, 0);
  var recentCamps  = campaigns.slice(0, 5);

  var out = '';

  // Page head
  out += '<div class="db-page-head">';
  out += '<div><h1 class="db-page-title">Good morning, Madbear</h1><p class="db-page-sub">Here\'s what\'s happening across your campaigns today.</p></div>';
  out += '<div class="db-page-actions">';
  out += '<button class="db-btn secondary" data-action="db-nav" data-tab="analytics">' + dbIcon('chart') + ' ' + t('db.overview.viewAnalytics') + '</button>';
  out += '<button class="db-btn primary" data-action="db-open-compose">' + dbIcon('plus') + ' ' + t('db.overview.newCampaign') + '</button>';
  out += '</div></div>';

  // Stat grid
  out += '<div class="db-stat-grid">';
  out += dbStatCard('Emails sent', totalSent.toLocaleString(), 'send', '', '', [24,32,28,40,38,52,48,60,55,72]);
  out += dbStatCard('Campaigns', campaigns.length, 'mail', '', 'total all time', [1,2,2,3,3,4,5,5,6,7]);
  out += dbStatCard('Delivery rate', deliveryRate, 'check', '', deliveryRate !== '—' ? 'industry avg 95.1%' : '', [95,96,96,97,97,98,97,98,98,98], '%');
  var isPremium = true;
  out += dbStatCard('Remaining today', isPremium ? '∞' : String(Math.max(0,(S.billing.dailyLimit||500)-sentToday)), 'star', '', isPremium ? 'Premium · unlimited' : 'of ' + (S.billing.dailyLimit||500));
  out += '</div>';

  // Chart + donut row
  out += '<div class="db-grid-2">';

  // Bar chart card
  out += '<div class="db-card elev">';
  out += '<div class="db-card-head"><div><h3 class="db-card-title">Send activity</h3><p class="db-card-sub">' + weekTotal.toLocaleString() + ' emails delivered · last 7 days</p></div></div>';
  out += dbBarChart(last7);
  out += '</div>';

  // Donut card
  out += '<div class="db-card elev">';
  out += '<div class="db-card-head"><div><h3 class="db-card-title">Delivery breakdown</h3><p class="db-card-sub">All-time outcomes</p></div></div>';
  out += '<div style="display:flex;gap:18px;align-items:center">';
  out += dbDonut(totalSent - totalErrors, totalErrors, totalSkipped);
  out += '<div style="flex:1;display:flex;flex-direction:column;gap:10px">';
  var total = totalSent || 1;
  [
    {label:'Delivered', val: totalSent - totalErrors, color:'var(--db-green)'},
    {label:'Errors',    val: totalErrors,             color:'var(--db-red)'},
    {label:'Skipped',   val: totalSkipped,            color:'var(--db-amber)'},
  ].forEach(function(s){
    out += '<div style="display:flex;align-items:center;justify-content:space-between">';
    out += '<span style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--db-ink2)"><span style="width:8px;height:8px;border-radius:50%;background:' + s.color + '"></span>' + esc(s.label) + '</span>';
    out += '<span style="font-family:var(--db-mono);font-size:13px;font-weight:600;color:var(--db-ink)">' + s.val.toLocaleString() + '</span>';
    out += '</div>';
  });
  out += '<hr class="db-divider" style="margin:4px 0">';
  out += '<div style="display:flex;justify-content:space-between;font-size:12px;color:var(--db-muted)"><span>Total</span><span style="font-family:var(--db-mono);font-weight:600;color:var(--db-ink)">' + totalSent.toLocaleString() + '</span></div>';
  out += '</div></div></div>';

  out += '</div>'; // grid-2

  // Recent campaigns + account/quick-actions
  out += '<div class="db-grid-2 db-mt">';

  // Recent campaigns table
  out += '<div class="db-card elev">';
  out += '<div class="db-card-head"><div><h3 class="db-card-title">' + t('db.overview.recentTitle') + '</h3><p class="db-card-sub">' + t('db.overview.sub') + '</p></div>';
  out += '<button class="db-btn ghost sm" data-action="db-nav" data-tab="campaigns">View all ' + dbIcon('arrow',12) + '</button></div>';
  if (recentCamps.length === 0) {
    out += '<div class="db-empty"><div style="font-size:28px;opacity:0.5;margin-bottom:8px">📭</div><div>No campaigns yet. Send your first one!</div></div>';
  } else {
    out += '<table class="db-table"><thead><tr><th>Campaign</th><th>Date</th><th style="text-align:right">Sent</th><th style="text-align:right">Rate</th><th></th></tr></thead><tbody>';
    recentCamps.forEach(function(c) {
      var rate = c.total > 0 ? (((c.total - (c.errors||0)) / c.total) * 100).toFixed(1) : '—';
      var rateColor = parseFloat(rate) >= 97 ? 'var(--db-green)' : parseFloat(rate) >= 93 ? 'var(--db-amber)' : 'var(--db-red)';
      out += '<tr>';
      out += '<td><div style="display:flex;align-items:center;gap:8px"><span style="width:6px;height:6px;border-radius:50%;background:var(--db-green3)"></span><span style="font-weight:500;color:var(--db-ink)">' + esc(c.name || c.sheetName || 'Campaign') + '</span></div></td>';
      out += '<td class="mono" style="color:var(--db-muted)">' + esc(c.date || '') + '</td>';
      out += '<td class="mono" style="text-align:right">' + (c.total||0).toLocaleString() + '</td>';
      out += '<td class="mono" style="text-align:right;font-weight:600;color:' + rateColor + '">' + rate + '%</td>';
      out += '<td><div class="db-row-actions"><button title="View" data-action="db-view-campaign" data-id="' + escAttr(c.id||'') + '">' + dbIcon('eye',14) + '</button></div></td>';
      out += '</tr>';
    });
    out += '</tbody></table>';
  }
  out += '</div>';

  // Right column: account status + quick actions
  out += '<div class="db-row-gap">';

  // Account status
  out += '<div class="db-card elev">';
  out += '<div class="db-card-head"><div><h3 class="db-card-title">Account status</h3></div>';
  var planLabel = S.billing.activePlan === 'premium' ? 'Premium' : S.billing.activePlan === 'pro' ? 'Pro' : 'Starter';
  var planVariant = S.billing.activePlan === 'premium' ? 'gold' : 'green';
  out += '<span class="db-pill ' + planVariant + '"><span class="dot"></span>' + esc(planLabel) + '</span>';
  out += '</div>';
  var limitNum = S.billing.dailyLimit === -1 ? null : (S.billing.dailyLimit || 500);
  var fillPct = limitNum ? Math.min(100, Math.round((sentToday / limitNum) * 100)) : 18;
  out += '<div style="display:flex;flex-direction:column;gap:14px">';
  out += '<div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;color:var(--db-muted)"><span>Today\'s sends</span><span style="font-family:var(--db-mono);color:var(--db-ink);font-weight:600">' + sentToday + ' / ' + (limitNum || '∞') + '</span></div><div class="db-progress"><div class="fill" style="width:' + fillPct + '%"></div></div></div>';
  var backends = S.scriptUrls || [];
  out += '<div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;color:var(--db-muted)"><span>Active backends</span><span style="font-family:var(--db-mono);color:var(--db-ink);font-weight:600">' + backends.length + ' connected</span></div>';
  if (backends.length > 0) {
    out += '<div style="display:flex;gap:6px;flex-wrap:wrap">';
    backends.slice(0,2).forEach(function(b) {
      var email = typeof b === 'object' ? (b.email || b.url) : b;
      out += '<span class="db-tag green">' + dbIcon('check',10) + ' ' + esc(email.substring(0,20)) + '</span>';
    });
    if (backends.length > 2) out += '<span class="db-tag">+' + (backends.length-2) + ' more</span>';
    out += '</div>';
  }
  out += '</div></div></div>';

  // Quick actions
  out += '<div class="db-card elev">';
  out += '<div class="db-card-head"><div><h3 class="db-card-title">Quick actions</h3></div></div>';
  out += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
  var qa = [
    {icon:'send',    label:'New campaign',   action:'db-open-compose', tab:''},
    {icon:'users',   label:'Add contact',    action:'db-nav', tab:'contacts'},
    {icon:'activity',label:'Edit drip flow', action:'db-nav', tab:'drips'},
    {icon:'sliders', label:'Backends',       action:'db-nav', tab:'settings'},
  ];
  qa.forEach(function(q){
    out += '<button class="db-btn secondary" style="justify-content:flex-start;height:48px;padding:0 12px" data-action="' + q.action + '"' + (q.tab ? ' data-tab="' + q.tab + '"' : '') + '>';
    out += '<span style="width:30px;height:30px;border-radius:8px;background:var(--db-green-tint);color:var(--db-green);display:grid;place-items:center;margin-right:6px;flex-shrink:0">' + dbIcon(q.icon,14) + '</span>';
    out += '<span style="font-size:13px">' + esc(q.label) + '</span>';
    out += '</button>';
  });
  out += '</div></div>';

  out += '</div>'; // row-gap
  out += '</div>'; // grid-2

  return out;
}

// ── Stat card helper ──────────────────────────────────────────────

function dbStatCard(label, value, icon, delta, foot, spark, unit) {
  var deltaDir = delta && delta.indexOf('-') === 0 ? 'down' : 'up';
  var out = '<div class="db-stat">';
  out += '<div class="db-stat-label"><span class="db-stat-icon">' + dbIcon(icon||'mail', 12) + '</span>' + esc(label) + '</div>';
  out += '<div class="db-stat-value">' + esc(String(value)) + (unit ? '<span class="db-stat-unit">' + esc(unit) + '</span>' : '') + '</div>';
  if (delta || foot) {
    out += '<div class="db-stat-foot">';
    if (delta) out += '<span class="db-stat-delta ' + deltaDir + '">' + dbIcon(deltaDir === 'up' ? 'arrowUp' : 'arrowDn', 11) + ' ' + esc(delta) + '</span>';
    if (foot)  out += '<span>' + esc(foot) + '</span>';
    out += '</div>';
  }
  if (spark) out += dbSparkline(spark, 120, 38, 'var(--db-green3)');
  out += '</div>';
  return out;
}

// ── Campaigns panel ───────────────────────────────────────────────

function dbCampaignsPanel() {
  var all = S.history || [];
  var filter = DB.campaignFilter || 'all';
  var q = DB.campaignSearch || '';

  var filtered = all.filter(function(c){
    if (filter !== 'all' && c.type !== filter) return false;
    if (q && (c.name||c.sheetName||'').toLowerCase().indexOf(q.toLowerCase()) === -1) return false;
    return true;
  });

  var counts = {all: all.length, sent: 0, followup: 0, drip: 0};
  all.forEach(function(c){ if (counts[c.type] != null) counts[c.type]++; });

  var sel = DB.selectedCampaignIds || {};
  var selCount = Object.keys(sel).length;
  var allFilteredSelected = filtered.length > 0 && filtered.every(function(c){ return sel[c.id]; });

  var out = '';
  out += '<div class="db-page-head">';
  out += '<div><h1 class="db-page-title">' + t('db.campaigns.title') + '</h1><p class="db-page-sub">' + all.length + ' total · ' + all.reduce(function(s,c){return s+(c.total||0);},0).toLocaleString() + ' emails delivered</p></div>';
  out += '<div class="db-page-actions"><button class="db-btn secondary" data-action="db-export-modal">' + dbIcon('download') + ' Export</button><button class="db-btn primary" data-action="db-open-compose">' + dbIcon('plus') + ' ' + t('db.campaigns.new') + '</button></div>';
  out += '</div>';

  // Search + filter bar
  out += '<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:14px">';
  out += '<div class="db-field" style="flex:1;max-width:380px">' + dbIcon('search') + '<input placeholder="Search campaigns…" id="dbCampSearch" value="' + escAttr(q) + '"/></div>';
  out += '<div class="db-seg">';
  ['all','sent','followup','drip'].forEach(function(f){
    var label = f === 'all' ? 'All' : f === 'sent' ? 'One-off' : f === 'followup' ? 'Follow-ups' : 'Drips';
    out += '<button class="' + (filter === f ? 'active' : '') + '" data-action="db-campaign-filter" data-filter="' + f + '">' + label + ' ' + (counts[f]||0) + '</button>';
  });
  out += '</div></div>';

  // Bulk-action toolbar — only visible when items are selected
  if (selCount > 0) {
    out += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;padding:9px 14px;background:var(--db-blue-soft);border:1.5px solid var(--db-blue);border-radius:10px">';
    out += '<span style="font-size:12.5px;font-weight:600;color:var(--db-blue)">' + selCount + ' campaign' + (selCount === 1 ? '' : 's') + ' selected</span>';
    out += '<span style="flex:1"></span>';
    out += '<button class="db-btn ghost sm" data-action="db-camp-select-none" style="font-size:12px">Deselect all</button>';
    out += '<button class="db-btn sm" data-action="db-camp-delete-selected" style="font-size:12px;background:var(--db-red,#ef4444);color:#fff;border-color:transparent">' + dbIcon('trash', 13) + ' Delete ' + selCount + ' selected</button>';
    out += '</div>';
  }

  out += '<div class="db-card elev" style="padding:0;overflow:hidden">';
  out += '<table class="db-table"><thead><tr>';
  out += '<th style="padding-left:16px;width:36px"><input type="checkbox" data-action="db-camp-select-all-filtered" ' + (allFilteredSelected ? 'checked' : '') + ' title="Select all" style="accent-color:var(--db-green);cursor:pointer"/></th>';
  out += '<th>Campaign</th><th>Tags</th><th>Date</th>';
  out += '<th style="text-align:right">Sent</th><th style="text-align:right">Errors</th>';
  out += '<th style="text-align:right">Rate</th><th style="text-align:right;padding-right:20px">Actions</th>';
  out += '</tr></thead><tbody>';

  if (filtered.length === 0) {
    out += '<tr><td colspan="8"><div class="db-empty"><div style="font-size:28px;opacity:0.5;margin-bottom:8px">📭</div>No campaigns match your filters.</div></td></tr>';
  } else {
    filtered.forEach(function(c) {
      var isSelected = !!sel[c.id];
      var name = c.name || c.sheetName || 'Campaign';
      var ctype = c.type || 'sent';
      var iconName = ctype === 'drip' ? 'activity' : ctype === 'followup' ? 'reply' : 'send';
      var bgColor = ctype === 'drip' ? 'var(--db-blue-soft)' : ctype === 'followup' ? 'var(--db-amber-soft)' : 'var(--db-green-tint)';
      var fgColor = ctype === 'drip' ? 'var(--db-blue)' : ctype === 'followup' ? 'var(--db-amber)' : 'var(--db-green)';
      var sent = c.total || 0;
      var errors = c.errors || 0;
      var rate = sent > 0 ? (((sent - errors) / sent) * 100).toFixed(1) : '—';
      var rateColor = parseFloat(rate) >= 97 ? 'var(--db-green)' : parseFloat(rate) >= 93 ? 'var(--db-amber)' : 'var(--db-red)';
      var rowBg = isSelected ? 'background:var(--db-blue-soft);' : '';
      out += '<tr style="' + rowBg + '">';
      out += '<td style="padding-left:16px;width:36px"><input type="checkbox" data-action="db-camp-toggle-select" data-id="' + escAttr(c.id||'') + '" ' + (isSelected ? 'checked' : '') + ' style="accent-color:var(--db-green);cursor:pointer"/></td>';
      var subLine = ctype === 'followup' && c.parentName
        ? '<span style="color:var(--db-amber);font-weight:500">↩ Follow-up of: ' + esc(c.parentName) + '</span>'
        : esc(c.subject||'');
      out += '<td><div style="display:flex;align-items:center;gap:10px"><span style="width:34px;height:34px;border-radius:9px;background:' + bgColor + ';color:' + fgColor + ';display:grid;place-items:center;flex-shrink:0">' + dbIcon(iconName,14) + '</span><div><div style="font-weight:600;color:var(--db-ink)">' + esc(name) + '</div><div style="font-size:11.5px;color:var(--db-muted);margin-top:1px">' + subLine + '</div></div></div></td>';
      out += '<td><div style="display:flex;gap:4px;flex-wrap:wrap">';
      (c.tags||[ctype]).forEach(function(ctag){ out += '<span class="db-tag">' + esc(ctag) + '</span>'; });
      out += '</div></td>';
      out += '<td class="mono" style="color:var(--db-muted)">' + esc(c.date||'') + '</td>';
      out += '<td class="mono" style="text-align:right">' + sent.toLocaleString() + '</td>';
      out += '<td class="mono" style="text-align:right;color:' + (errors > 30 ? 'var(--db-red)' : 'var(--db-muted)') + '">' + errors + '</td>';
      out += '<td class="mono" style="text-align:right;font-weight:600;color:' + rateColor + '">' + rate + (rate !== '—' ? '%' : '') + '</td>';
      out += '<td style="text-align:right;padding-right:20px"><div class="db-row-actions"><button title="View" data-action="db-view-campaign" data-id="' + escAttr(c.id||'') + '">' + dbIcon('eye',14) + '</button><button title="Duplicate" data-action="db-duplicate-campaign" data-id="' + escAttr(c.id||'') + '">' + dbIcon('copy',14) + '</button><button title="Follow-up" data-action="db-followup-from-id" data-id="' + escAttr(c.id||'') + '" data-prefetch-followup="' + escAttr(c.id||'') + '">' + dbIcon('reply',14) + '</button><button title="Delete" data-action="db-camp-delete-one" data-id="' + escAttr(c.id||'') + '" style="color:var(--db-red,#ef4444)">' + dbIcon('trash',14) + '</button></div></td>';
      out += '</tr>';
    });
  }

  out += '</tbody></table></div>';
  return out;
}

// ── Analytics panel ───────────────────────────────────────────────

function dbAnalyticsPanel() {
  var totalSent    = S.stats.sent || 0;
  var totalErrors  = S.stats.errors || 0;
  var totalSkipped = S.stats.skipped || 0;
  var delivered    = totalSent - totalErrors;
  var rate         = totalSent > 0 ? (delivered / totalSent * 100).toFixed(1) : '—';
  var last7        = dbGetLast7DaysSends();
  var campaigns    = S.history || [];
  var avgPerDay    = campaigns.length > 0 ? Math.round(totalSent / Math.max(campaigns.length, 1)) : 0;

  var out = '';
  out += '<div class="db-page-head">';
  out += '<div><h1 class="db-page-title">' + t('db.analytics.title') + '</h1><p class="db-page-sub">' + t('db.analytics.sub') + '</p></div>';
  out += '<div class="db-page-actions"><button class="db-btn secondary">' + dbIcon('download') + ' ' + t('db.campaigns.export') + '</button></div>';
  out += '</div>';

  out += '<div class="db-stat-grid">';
  out += dbStatCard('Total sent', totalSent.toLocaleString(), 'send', '', 'all time', [200,280,260,320,300,360,340,420,400,480]);
  out += dbStatCard('Total errors', totalErrors, 'x', '', (totalSent>0 ? ((totalErrors/totalSent)*100).toFixed(2)+'% error rate' : ''), [40,38,32,30,28,26,22,20,18,18]);
  out += dbStatCard('Delivery rate', rate, 'check', '', 'industry avg 95.1%', [96,96,97,97,97,98,98,98,98,98], rate !== '—' ? '%' : '');
  out += dbStatCard('Avg / campaign', avgPerDay, 'activity', '', 'per campaign', [600,640,680,720,700,740,720,760,740,780]);
  out += '</div>';

  out += '<div class="db-card elev db-mt">';
  out += '<div class="db-card-head"><div><h3 class="db-card-title">Send volume</h3><p class="db-card-sub">Daily delivery — last 7 days</p></div></div>';
  out += dbBarChart(last7);
  out += '</div>';

  out += '<div class="db-grid-2-eq db-mt">';

  // Status distribution
  out += '<div class="db-card elev">';
  out += '<div class="db-card-head"><div><h3 class="db-card-title">Status distribution</h3><p class="db-card-sub">All-time outcomes</p></div></div>';
  out += '<div style="display:flex;gap:18px;align-items:center">';
  out += dbDonut(delivered, totalErrors, totalSkipped);
  out += '<div style="flex:1;display:flex;flex-direction:column;gap:12px">';
  var total = totalSent || 1;
  [
    {label:'Delivered', val:delivered,    pct:(delivered/total*100).toFixed(2), color:'var(--db-green)'},
    {label:'Errors',    val:totalErrors,  pct:(totalErrors/total*100).toFixed(2), color:'var(--db-red)'},
    {label:'Skipped',   val:totalSkipped, pct:(totalSkipped/total*100).toFixed(2), color:'var(--db-amber)'},
  ].forEach(function(s){
    out += '<div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px"><span style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--db-ink2)"><span style="width:8px;height:8px;border-radius:50%;background:' + s.color + '"></span>' + esc(s.label) + '</span><span style="font-family:var(--db-mono);font-size:12px;color:var(--db-muted)">' + s.pct + '%</span></div>';
    out += '<div class="db-progress"><div class="fill" style="width:' + Math.min(parseFloat(s.pct), 100) + '%;background:' + s.color + '"></div></div>';
    out += '<div style="font-family:var(--db-mono);font-size:11px;margin-top:3px;color:var(--db-ink);font-weight:600">' + s.val.toLocaleString() + '</div></div>';
  });
  out += '</div></div></div>';

  // Per-campaign table
  out += '<div class="db-card elev" style="padding:0;overflow:hidden">';
  out += '<div style="padding:18px 20px 8px;display:flex;justify-content:space-between;align-items:center">';
  out += '<div><h3 class="db-card-title">Per-campaign breakdown</h3><p class="db-card-sub">Sent, errors, and delivery rate</p></div>';
  out += '</div>';
  out += '<table class="db-table"><thead><tr><th style="padding-left:20px">Campaign</th><th style="text-align:right">Sent</th><th style="text-align:right">Errors</th><th style="text-align:right;padding-right:20px">Rate</th></tr></thead><tbody>';
  if (campaigns.length === 0) {
    out += '<tr><td colspan="4"><div class="db-empty">No data yet.</div></td></tr>';
  } else {
    campaigns.slice(0, 8).forEach(function(c){
      var s = c.total || 0, e = c.errors || 0;
      var r = s > 0 ? ((s-e)/s*100).toFixed(1) : '—';
      var rc = parseFloat(r) >= 97 ? 'var(--db-green)' : parseFloat(r) >= 93 ? 'var(--db-amber)' : 'var(--db-red)';
      out += '<tr><td style="padding-left:20px;font-weight:500;color:var(--db-ink)">' + esc(c.name||c.sheetName||'Campaign') + '</td>';
      out += '<td class="mono" style="text-align:right">' + s.toLocaleString() + '</td>';
      out += '<td class="mono" style="text-align:right;color:' + (e>30?'var(--db-red)':'var(--db-muted)') + '">' + e + '</td>';
      out += '<td class="mono" style="text-align:right;padding-right:20px;font-weight:600;color:' + rc + '">' + r + (r!=='—'?'%':'') + '</td></tr>';
    });
  }
  out += '</tbody></table></div>';

  out += '</div>'; // grid-2-eq
  return out;
}

// ── Contacts helper functions ─────────────────────────────────────

function contactsGenerateId() {
  return 'c_' + Date.now() + '_' + Math.random().toString(36).slice(2);
}

function contactsParseTags(str) {
  if (!str) return [];
  return str.split(',').map(function(t) { return t.trim(); }).filter(function(t) { return t.length > 0; });
}

function contactsParseCustomFields(str) {
  var result = {};
  if (!str) return result;
  str.split('\n').forEach(function(line) {
    var idx = line.indexOf(':');
    if (idx > 0) {
      var key = line.slice(0, idx).trim();
      var val = line.slice(idx + 1).trim();
      if (key) result[key] = val;
    }
  });
  return result;
}

function contactsParseCSV(text) {
  var lines = text.split(/\r?\n/).filter(function(l) { return l.trim().length > 0; });
  if (lines.length < 2) return { error: 'CSV must have at least a header row and one data row.', rows: [] };
  var headers = lines[0].split(',').map(function(h) { return h.trim().replace(/^"|"$/g, '').trim().toLowerCase(); });
  var emailIdx = headers.findIndex(function(h) { return h === 'email' || h === 'email address'; });
  if (emailIdx === -1) return { error: 'CSV must have an "Email" column.', rows: [] };
  var nameIdx  = headers.findIndex(function(h) { return h === 'name' || h === 'full name' || h === 'fullname'; });
  var tagsIdx  = headers.findIndex(function(h) { return h === 'tags' || h === 'tag'; });
  var groupIdx = headers.findIndex(function(h) { return h === 'group'; });
  var rows = [];
  for (var i = 1; i < lines.length; i++) {
    var cols = lines[i].split(',').map(function(c) { return c.trim().replace(/^"|"$/g, '').trim(); });
    var email = cols[emailIdx] || '';
    if (!email || !email.includes('@')) continue;
    var row = { email: email };
    if (nameIdx !== -1)  row.name  = cols[nameIdx]  || '';
    if (tagsIdx !== -1)  row.tags  = cols[tagsIdx]  || '';
    if (groupIdx !== -1) row.group = cols[groupIdx] || '';
    rows.push(row);
  }
  return { rows: rows };
}

function contactsSave() {
  chrome.storage.local.set({ mb_contacts: S.contacts });
}

function contactsGroupsSave() {
  chrome.storage.local.set({ mb_groups: S.contactGroups });
}

function contactsGroupsGetAll() {
  // Returns merged list: named groups from S.contactGroups + any implicit groups from contacts
  var groups = (S.contactGroups || []).slice();
  var contacts = S.contacts || [];
  // Find groups used on contacts that aren't in the named groups list
  contacts.forEach(function(c) {
    if (c.group && !groups.find(function(g){ return g.name === c.group; })) {
      groups.push({ id: 'g_implicit_' + c.group, name: c.group, color: '', createdAt: null });
    }
  });
  return groups;
}

function contactsGroupContactCount(groupName) {
  return (S.contacts || []).filter(function(c){ return c.group === groupName; }).length;
}

// ── Contacts panel ────────────────────────────────────────────────

function dbContactsPanel() {
  var contacts = S.contacts || [];
  var q = DB.contactSearch || '';
  var tagFilter = DB.contactTagFilter || 'all';
  var groupFilter = DB.contactGroupFilter || 'all';

  // Gather tags
  var tagCounts = {};
  contacts.forEach(function(c){
    (c.tags||[]).forEach(function(ctag){ tagCounts[ctag] = (tagCounts[ctag]||0)+1; });
  });
  var allTags = Object.keys(tagCounts);

  // Gather groups — merge named groups from S.contactGroups + implicit groups from contacts
  var groupCounts = {};
  contacts.forEach(function(c){
    if (c.group) { groupCounts[c.group] = (groupCounts[c.group]||0)+1; }
  });
  // Named groups defined by user (even if 0 contacts)
  var namedGroups = S.contactGroups || [];
  namedGroups.forEach(function(g){ if (!(g.name in groupCounts)) groupCounts[g.name] = 0; });
  var allGroups = Object.keys(groupCounts);

  var filtered = contacts.filter(function(c){
    if (tagFilter !== 'all' && !(c.tags||[]).includes(tagFilter)) return false;
    if (groupFilter !== 'all' && c.group !== groupFilter) return false;
    if (q) {
      var search = q.toLowerCase();
      return (c.name||'').toLowerCase().includes(search) ||
             (c.email||'').toLowerCase().includes(search) ||
             (c.group||'').toLowerCase().includes(search) ||
             (c.tags||[]).some(function(tg){ return tg.toLowerCase().includes(search); });
    }
    return true;
  });

  var active = contacts.filter(function(c){return (c.status||'active')==='active';}).length;

  var out = '';

  // ── Inline Add / Edit Form ──────────────────────────────────────
  var isEditing = !!DB.contactEditId;
  var isAdding  = DB.contactShowAdd;
  if (isAdding || isEditing) {
    var editContact = isEditing ? (contacts.find(function(c){ return c.id === DB.contactEditId; }) || {}) : {};
    var formName  = isEditing ? (editContact.name  || '') : (DB.contactAddForm.name  || '');
    var formEmail = isEditing ? (editContact.email || '') : (DB.contactAddForm.email || '');
    var formTags  = isEditing ? ((editContact.tags || []).join(', ')) : (DB.contactAddForm.tags  || '');
    var formGroup = isEditing ? (editContact.group || '') : (DB.contactAddForm.group || '');
    var formCF    = isEditing ? (Object.keys(editContact.customFields||{}).map(function(k){return k+':'+editContact.customFields[k];}).join('\n')) : (DB.contactAddForm.customFields || '');
    var formTitle = isEditing ? t('db.contacts.editTitle') : t('db.contacts.addTitle');
    var saveAction = isEditing ? 'db-contact-save-edit' : 'db-contact-save-add';
    var saveLbl    = isEditing ? t('db.contacts.saveEdit') : t('db.contacts.saveAdd');

    out += '<div class="db-card elev db-mb" style="max-width:560px">';
    out += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">';
    out += '<h2 style="margin:0;font-size:16px;font-weight:700;color:var(--db-ink)">' + esc(formTitle) + '</h2>';
    out += '<button class="db-btn ghost" data-action="db-contact-cancel-form" style="padding:4px 10px">' + t('db.contacts.cancel') + '</button>';
    out += '</div>';

    out += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">';
    out += '<div><label class="db-field-label">' + t('db.contacts.formName') + '</label>';
    out += '<div class="db-field"><input id="ctFormName" type="text" placeholder="Jane Smith" value="' + escAttr(formName) + '"/></div></div>';
    out += '<div><label class="db-field-label">' + t('db.contacts.formEmail') + ' *</label>';
    out += '<div class="db-field"><input id="ctFormEmail" type="email" placeholder="jane@example.com" value="' + escAttr(formEmail) + '"/></div></div>';
    out += '</div>';

    out += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">';
    out += '<div><label class="db-field-label">' + t('db.contacts.formGroup') + '</label>';
    if (allGroups.length > 0) {
      // Show select dropdown with existing groups + option to type custom
      out += '<div class="db-field"><select id="ctFormGroup" style="width:100%;background:transparent;border:none;outline:none;color:inherit;cursor:pointer"><option value="">— No group —</option>';
      allGroups.forEach(function(g){ out += '<option value="' + escAttr(g) + '"' + (formGroup === g ? ' selected' : '') + '>' + esc(g) + ' (' + (groupCounts[g]||0) + ')</option>'; });
      out += '<option value="__new__">+ Create new group…</option>';
      out += '</select></div>';
      // Custom group name input (shown when __new__ selected)
      if (formGroup && !allGroups.includes(formGroup)) {
        out += '<div class="db-field" id="ctFormGroupCustomWrap" style="margin-top:6px"><input id="ctFormGroupCustom" type="text" placeholder="New group name" value="' + escAttr(formGroup) + '"/></div>';
      } else {
        out += '<div class="db-field" id="ctFormGroupCustomWrap" style="margin-top:6px;display:none"><input id="ctFormGroupCustom" type="text" placeholder="New group name" value=""/></div>';
      }
    } else {
      out += '<div class="db-field"><input id="ctFormGroup" type="text" placeholder="Type a group name…" value="' + escAttr(formGroup) + '"/></div>';
    }
    out += '</div>';
    out += '<div><label class="db-field-label">' + t('db.contacts.formTags') + '</label>';
    out += '<div class="db-field"><input id="ctFormTags" type="text" placeholder="leads, vip, newsletter" value="' + escAttr(formTags) + '"/></div></div>';
    out += '</div>';

    out += '<div style="margin-bottom:16px"><label class="db-field-label">' + t('db.contacts.formCF') + '</label>';
    out += '<div class="db-field"><textarea id="ctFormCF" rows="3" placeholder="phone:555-1234\ncompany:Acme">' + esc(formCF) + '</textarea></div></div>';

    if (isEditing) {
      out += '<button class="db-btn primary" data-action="' + saveAction + '" data-id="' + escAttr(DB.contactEditId) + '">' + dbIcon('check') + ' ' + saveLbl + '</button>';
    } else {
      out += '<button class="db-btn primary" data-action="' + saveAction + '">' + dbIcon('check') + ' ' + saveLbl + '</button>';
    }
    out += '</div>'; // card
  }

  out += '<div class="db-page-head">';
  out += '<div><h1 class="db-page-title">' + t('db.contacts.title') + '</h1><p class="db-page-sub">' + contacts.length + ' total · ' + allGroups.length + ' groups · ' + allTags.length + ' tags · ' + active + ' active</p></div>';
  out += '<div class="db-page-actions">';
  out += '<button class="db-btn secondary" data-action="db-contacts-export">' + dbIcon('download') + ' ' + t('db.contacts.export') + '</button>';
  out += '<button class="db-btn secondary" data-action="db-contacts-import">' + dbIcon('upload') + ' ' + t('db.contacts.import') + '</button>';
  out += '<button class="db-btn secondary" data-action="db-groups-toggle">' + dbIcon('users', 14) + ' Manage Groups</button>';
  if (!isAdding && !isEditing) {
    out += '<button class="db-btn primary" data-action="db-contact-add">' + dbIcon('plus') + ' ' + t('db.contacts.add') + '</button>';
  }
  out += '</div></div>';

  // ── Group Manager Panel ─────────────────────────────────────────
  if (DB.showGroupManager) {
    out += '<div class="db-card elev db-mb" style="border:1px solid var(--db-green-soft)">';
    out += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">';
    out += '<div style="display:flex;align-items:center;gap:10px">';
    out += '<span style="width:32px;height:32px;border-radius:8px;background:var(--db-green-tint);color:var(--db-green);display:grid;place-items:center">' + dbIcon('users', 15) + '</span>';
    out += '<div><div style="font-weight:700;font-size:14px;color:var(--db-ink)">Manage Groups</div><div style="font-size:11.5px;color:var(--db-muted)">Create and organize contact groups</div></div>';
    out += '</div>';
    out += '<button class="db-btn ghost sm" data-action="db-groups-toggle">' + dbIcon('x', 13) + '</button>';
    out += '</div>';

    // Create new group form
    out += '<div style="display:flex;gap:8px;margin-bottom:16px;align-items:center">';
    out += '<div class="db-field" style="flex:1"><input id="grpNewName" type="text" placeholder="New group name (e.g. VIP Clients, Newsletter)" value="' + escAttr(DB.groupAddName || '') + '"/></div>';
    out += '<button class="db-btn primary" data-action="db-group-create" style="white-space:nowrap">' + dbIcon('plus', 13) + ' Create Group</button>';
    out += '</div>';

    // Existing groups list
    if (allGroups.length === 0) {
      out += '<div style="text-align:center;padding:16px;color:var(--db-muted);font-size:13px">No groups yet. Create your first group above.</div>';
    } else {
      out += '<div style="display:flex;flex-direction:column;gap:6px">';
      allGroups.forEach(function(g) {
        var cnt = groupCounts[g] || 0;
        var namedGroup = namedGroups.find(function(ng){ return ng.name === g; });
        var gId = namedGroup ? namedGroup.id : null;
        var isRenaming = (DB.groupEditId && gId && DB.groupEditId === gId);
        out += '<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--db-surface2);border-radius:9px;border:1px solid var(--db-line)">';
        out += '<span style="width:28px;height:28px;border-radius:7px;background:var(--db-green-tint);color:var(--db-green);display:grid;place-items:center;font-size:12px;font-weight:700">' + esc(g[0].toUpperCase()) + '</span>';
        if (isRenaming) {
          out += '<div class="db-field" style="flex:1"><input id="grpRenameInp" type="text" value="' + escAttr(DB.groupEditName || g) + '" placeholder="Group name"/></div>';
          out += '<button class="db-btn primary sm" data-action="db-group-rename-save" data-id="' + escAttr(gId) + '" data-old="' + escAttr(g) + '" style="font-size:12px">Save</button>';
          out += '<button class="db-btn ghost sm" data-action="db-group-rename-cancel" style="font-size:12px">Cancel</button>';
        } else {
          out += '<div style="flex:1"><div style="font-weight:600;font-size:13.5px;color:var(--db-ink)">' + esc(g) + '</div><div style="font-size:11.5px;color:var(--db-muted)">' + cnt + ' contact' + (cnt !== 1 ? 's' : '') + '</div></div>';
          out += '<button class="db-btn secondary sm" data-action="db-contacts-start-campaign-group" data-group="' + escAttr(g) + '" style="font-size:12px">' + dbIcon('send', 12) + ' Send campaign</button>';
          if (gId) {
            out += '<button class="db-btn ghost sm" data-action="db-group-rename-start" data-id="' + escAttr(gId) + '" data-name="' + escAttr(g) + '" style="font-size:12px">' + dbIcon('edit', 12) + '</button>';
            out += '<button class="db-btn ghost sm danger" data-action="db-group-delete" data-id="' + escAttr(gId) + '" data-name="' + escAttr(g) + '" style="font-size:12px">' + dbIcon('trash', 12) + '</button>';
          }
        }
        out += '</div>';
      });
      out += '</div>';
    }
    out += '</div>';
  }

  // Search + filter bar
  out += '<div style="display:flex;gap:12px;align-items:center;margin-bottom:10px;flex-wrap:wrap">';
  out += '<div class="db-field" style="flex:1;min-width:280px">' + dbIcon('search') + '<input id="contactSearchInp" placeholder="Search by name, email, tag, or group…" value="' + escAttr(q) + '"/></div>';
  out += '</div>';

  // Group filter (if there are groups)
  if (allGroups.length > 0) {
    out += '<div style="margin-bottom:8px">';
    out += '<div style="font-size:11px;font-weight:700;color:var(--db-muted);text-transform:uppercase;letter-spacing:0.07em;margin-bottom:6px">Groups</div>';
    out += '<div class="db-seg" style="flex-wrap:wrap">';
    out += '<button class="' + (groupFilter==='all'?'active':'') + '" data-action="db-contact-group-filter" data-filter="all">All</button>';
    allGroups.forEach(function(g){
      out += '<button class="' + (groupFilter===g?'active':'') + '" data-action="db-contact-group-filter" data-filter="' + escAttr(g) + '">' + esc(g) + ' <span style="opacity:0.6">' + (groupCounts[g]||0) + '</span></button>';
    });
    out += '</div></div>';
  }

  // Tag filter
  if (allTags.length > 0) {
    out += '<div style="margin-bottom:14px">';
    if (allGroups.length > 0) out += '<div style="font-size:11px;font-weight:700;color:var(--db-muted);text-transform:uppercase;letter-spacing:0.07em;margin-bottom:6px">Tags</div>';
    out += '<div class="db-seg">';
    out += '<button class="' + (tagFilter==='all'?'active':'') + '" data-action="db-contact-filter" data-filter="all">All ' + contacts.length + '</button>';
    allTags.forEach(function(tag){
      out += '<button class="' + (tagFilter===tag?'active':'') + '" data-action="db-contact-filter" data-filter="' + escAttr(tag) + '">' + esc(tag) + ' <span style="opacity:0.6">' + tagCounts[tag] + '</span></button>';
    });
    out += '</div></div>';
  } else {
    out += '<div style="margin-bottom:14px"></div>';
  }

  // Table
  out += '<div class="db-card elev" style="padding:0;overflow:hidden">';
  out += '<table class="db-table"><thead><tr><th style="padding-left:20px">Contact</th><th>Group</th><th>Tags</th><th>Status</th><th>Added</th><th style="text-align:right;padding-right:20px">Actions</th></tr></thead><tbody>';

  if (filtered.length === 0) {
    out += '<tr><td colspan="6"><div class="db-empty"><div style="font-size:28px;opacity:0.5;margin-bottom:8px">👤</div>' + (contacts.length === 0 ? 'No contacts yet. Import a CSV or add one manually.' : 'No contacts match your search.') + '</div></td></tr>';
  } else {
    filtered.forEach(function(c) {
      var status = c.status || 'active';
      var statusVariant = status === 'active' ? 'green' : status === 'bounced' ? 'red' : 'amber';
      var statusLabel = status === 'active' ? 'Active' : status === 'bounced' ? 'Bounced' : 'Unsubscribed';
      var initials = (c.name||'').split(/[\s@.]/).filter(Boolean).slice(0,2).map(function(s){return s[0].toUpperCase();}).join('') || (c.email||'?')[0].toUpperCase();
      var avatarColors = ['linear-gradient(135deg,#0f5132,#2f8a5e)','linear-gradient(135deg,#1e5fa6,#4d8fc9)','linear-gradient(135deg,#b88523,#d8a847)','linear-gradient(135deg,#7a3e8f,#a266bf)'];
      var hash = 0; (c.name||c.email||'').split('').forEach(function(ch){hash=(hash*31+ch.charCodeAt(0))>>>0;});
      var avBg = avatarColors[hash % avatarColors.length];
      out += '<tr>';
      out += '<td style="padding-left:20px"><div style="display:flex;align-items:center;gap:10px"><span class="db-ct-avatar" style="background:' + avBg + '">' + esc(initials) + '</span><div><div style="font-weight:600;color:var(--db-ink)">' + esc(c.name||'') + '</div><div style="font-size:11.5px;color:var(--db-muted);font-family:var(--db-mono)">' + esc(c.email||'') + '</div></div></div></td>';
      out += '<td>' + (c.group ? '<span class="db-tag">' + esc(c.group) + '</span>' : '<span style="color:var(--db-muted);font-size:12px">—</span>') + '</td>';
      out += '<td><div style="display:flex;gap:4px;flex-wrap:wrap">';
      (c.tags||[]).slice(0,3).forEach(function(ctag){
        var tv = ctag==='vip'?'gold':ctag==='leads'?'blue':ctag==='customers'?'green':'';
        out += '<span class="db-tag ' + tv + '">' + esc(ctag) + '</span>';
      });
      if ((c.tags||[]).length > 3) out += '<span class="db-tag">+' + ((c.tags||[]).length - 3) + '</span>';
      out += '</div></td>';
      out += '<td><span class="db-pill ' + statusVariant + '"><span class="dot"></span>' + statusLabel + '</span></td>';
      out += '<td class="mono" style="color:var(--db-muted)">' + esc(c.addedAt ? new Date(c.addedAt).toLocaleDateString() : (c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '')) + '</td>';
      out += '<td style="text-align:right;padding-right:20px"><div class="db-row-actions">';
      out += '<button title="Send campaign" data-action="db-contact-send" data-id="' + escAttr(c.id) + '">' + dbIcon('send',14) + '</button>';
      out += '<button title="Edit" data-action="db-contact-edit" data-id="' + escAttr(c.id) + '">' + dbIcon('edit',14) + '</button>';
      out += '<button title="Delete" class="danger" data-action="db-contact-delete" data-id="' + escAttr(c.id) + '">' + dbIcon('trash',14) + '</button>';
      out += '</div></td>';
      out += '</tr>';
    });
  }

  out += '</tbody></table>';
  out += '<div style="padding:12px 20px;border-top:1px solid var(--db-line-soft);display:flex;justify-content:space-between;align-items:center;font-size:12px;color:var(--db-muted);background:var(--db-surface2)">';
  out += '<span>Showing ' + filtered.length + ' of ' + contacts.length + ' contacts</span>';
  out += '</div>';
  out += '</div>';

  // Send campaign CTA banner
  out += '<div class="db-card elev db-mt" style="display:flex;align-items:center;justify-content:space-between;gap:14px">';
  out += '<div style="display:flex;align-items:center;gap:14px">';
  out += '<span style="width:42px;height:42px;border-radius:11px;background:var(--db-green-tint);color:var(--db-green);display:grid;place-items:center">' + dbIcon('send',18) + '</span>';
  out += '<div><div style="font-weight:600;font-size:14px;color:var(--db-ink)">Send campaign to filtered contacts</div><div style="font-size:12px;color:var(--db-muted);margin-top:2px">Use your list as recipients — no Google Sheet needed.</div></div>';
  out += '</div>';
  var tagForCampaign = tagFilter !== 'all' ? tagFilter : '';
  out += '<button class="db-btn primary" data-action="db-contacts-start-campaign" data-tag="' + escAttr(tagForCampaign) + '">' + t('db.contacts.newCamp') + ' ' + dbIcon('arrow',12) + '</button>';
  out += '</div>';

  // Import CSV preview
  if (DB.contactImportPreview || DB.contactImportError) {
    out += '<div class="db-card db-mt">';
    if (DB.contactImportError) {
      out += '<div style="color:var(--db-red);font-size:13px;margin-bottom:8px">' + dbIcon('x',14) + ' ' + esc(DB.contactImportError) + '</div>';
    }
    if (DB.contactImportPreview && DB.contactImportPreview.length > 0) {
      var prev = DB.contactImportPreview;
      out += '<div style="font-weight:600;font-size:13px;margin-bottom:10px;color:var(--db-ink)">' + dbIcon('upload',14) + ' Import preview — ' + prev.length + ' contacts</div>';
      out += '<table class="db-table" style="margin-bottom:12px"><thead><tr><th>Name</th><th>Email</th><th>Group</th><th>Tags</th></tr></thead><tbody>';
      prev.slice(0,5).forEach(function(p){
        out += '<tr><td>' + esc(p.name||'') + '</td><td style="font-family:var(--db-mono);font-size:12px">' + esc(p.email||'') + '</td>';
        out += '<td>' + esc(p.group||'') + '</td><td>' + esc((p.tags||[]).join(', ')) + '</td></tr>';
      });
      if (prev.length > 5) out += '<tr><td colspan="4" style="text-align:center;color:var(--db-muted);font-size:12px">…and ' + (prev.length - 5) + ' more</td></tr>';
      out += '</tbody></table>';
      out += '<div style="display:flex;gap:8px">';
      out += '<button class="db-btn primary" data-action="db-contacts-confirm-import">' + dbIcon('check') + ' Import ' + prev.length + ' contacts</button>';
      out += '<button class="db-btn ghost" data-action="db-contacts-cancel-import">Cancel</button>';
      out += '</div>';
    }
    out += '</div>';
  }

  return out;
}

// ── Drips panel ───────────────────────────────────────────────────

function dbDripStepsForCampaign(campId) {
  // Returns the steps array for a given campaign ID, defaulting to empty
  var dc = S.dripCampaigns || {};
  return (dc[campId] && Array.isArray(dc[campId].steps)) ? dc[campId].steps : [];
}

function dbSaveDripSteps(campId, steps) {
  if (!S.dripCampaigns) S.dripCampaigns = {};
  S.dripCampaigns[campId] = { steps: steps };
  chrome.storage.local.set({ mb_drip_campaigns: S.dripCampaigns });
}

function dbNewDripStep() {
  return { id: 'ds_' + Date.now(), subject: '', body: '', delayDays: 3, enabled: true, scheduledAt: '', status: 'pending' };
}

function dbDripsPanel() {
  var isPremium = true;
  var allHistory = S.history || [];
  var dripHistory = allHistory.filter(function(c){ return c.type === 'drip'; });

  // All one-off sent campaigns available for drip sequencing
  var sentCampaigns = allHistory.filter(function(c){ return !c.type || c.type === 'sent'; });

  // Selected campaign
  var selCampId = DB.dripCampId || (sentCampaigns.length > 0 ? sentCampaigns[0].id : null);
  var selCamp = selCampId ? sentCampaigns.find(function(c){ return c.id === selCampId; }) : null;

  // Drip steps for the selected campaign
  var campSteps = selCampId ? dbDripStepsForCampaign(selCampId) : [];

  // Selected step index for editing
  var selStepIdx = (DB.dripStepIdx != null && campSteps[DB.dripStepIdx]) ? DB.dripStepIdx : (campSteps.length > 0 ? 0 : -1);
  var selStep = selStepIdx >= 0 ? campSteps[selStepIdx] : null;

  var out = '';
  out += '<div class="db-page-head">';
  out += '<div><h1 class="db-page-title">' + t('db.drip.title') + '</h1>';
  out += '<p class="db-page-sub">Per-campaign drip sequences · schedule automated follow-up steps</p></div>';
  out += '</div>';

  if (!isPremium) {
    out += '<div class="db-card elev" style="text-align:center;padding:48px 40px">';
    out += '<div style="font-size:30px;margin-bottom:14px">✦</div>';
    out += '<div style="font-weight:700;font-size:18px;color:var(--db-ink);margin-bottom:8px">Drip sequences require Premium</div>';
    out += '<p style="color:var(--db-muted);font-size:13px;max-width:400px;margin:0 auto 18px">Upgrade to set up multi-step automated follow-up sequences for each of your campaigns.</p>';
    out += '<button class="db-btn primary" data-action="db-nav" data-tab="billing">Доступно бесплатно</button>';
    out += '</div>';
    return out;
  }

  // ── Campaign selector ──────────────────────────────────────────
  out += '<div class="db-card elev" style="padding:16px 20px;margin-bottom:16px">';
  out += '<div style="font-size:11px;font-weight:700;letter-spacing:0.08em;color:var(--db-muted);text-transform:uppercase;margin-bottom:10px">Select campaign to configure drip</div>';
  if (sentCampaigns.length === 0) {
    out += '<div style="display:flex;align-items:center;gap:10px;padding:12px 14px;background:var(--db-gold-tint);border:1px solid var(--db-gold);border-radius:10px">';
    out += dbIcon('info', 14);
    out += '<span style="font-size:13px;color:var(--db-ink)">Send your first campaign to start adding drip sequences to it.</span>';
    out += '</div>';
  } else {
    out += '<div style="display:flex;flex-wrap:wrap;gap:8px">';
    sentCampaigns.forEach(function(c) {
      var isActive = c.id === selCampId;
      var campStepsForC = dbDripStepsForCampaign(c.id);
      var hasSteps = campStepsForC.length > 0;
      out += '<button data-action="db-drip-select-camp" data-id="' + escAttr(c.id||'') + '" style="';
      out += 'padding:8px 14px;border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;';
      out += 'border:1.5px solid ' + (isActive ? 'var(--db-green)' : 'var(--db-line)') + ';';
      out += 'background:' + (isActive ? 'var(--db-green-tint)' : 'var(--db-bg)') + ';';
      out += 'color:' + (isActive ? 'var(--db-green)' : 'var(--db-ink)') + ';';
      out += 'display:flex;align-items:center;gap:8px;max-width:220px">';
      out += '<span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(c.name||c.sheetName||'Campaign') + '</span>';
      if (hasSteps) {
        out += '<span style="background:var(--db-blue-soft);color:var(--db-blue);border-radius:20px;font-size:10px;padding:1px 6px;font-weight:700;flex-shrink:0">' + campStepsForC.length + ' steps</span>';
      }
      out += '</button>';
    });
    out += '</div>';

    if (selCamp) {
      out += '<div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--db-line-soft);font-size:12px;color:var(--db-muted);display:flex;gap:18px;flex-wrap:wrap">';
      out += '<span>' + dbIcon('mail',11) + ' <strong style="color:var(--db-ink2)">' + (selCamp.total||0) + '</strong> recipients</span>';
      out += '<span>' + dbIcon('calendar',11) + ' Sent: <strong style="color:var(--db-ink2)">' + esc(selCamp.date||'') + '</strong></span>';
      out += '<span>' + dbIcon('type',11) + ' ' + esc(selCamp.subject||'—') + '</span>';
      out += '</div>';
    }
  }
  out += '</div>';

  if (!selCamp) return out;

  // ── Two-column layout ──────────────────────────────────────────
  out += '<div class="db-grid-2-eq">';

  // LEFT: step list for this campaign
  out += '<div class="db-card elev" style="padding:0;overflow:hidden">';
  out += '<div style="padding:14px 18px;border-bottom:1px solid var(--db-line-soft);display:flex;align-items:center;justify-content:space-between">';
  out += '<div><h3 class="db-card-title" style="margin:0">Steps for this campaign</h3>';
  out += '<p class="db-card-sub" style="margin:2px 0 0">' + campSteps.length + ' steps configured · click to edit</p></div>';
  out += '<button class="db-btn primary sm" data-action="db-drip-add-step" data-campid="' + escAttr(selCampId) + '">' + dbIcon('plus',12) + ' Add step</button>';
  out += '</div>';

  if (campSteps.length === 0) {
    out += '<div style="padding:32px;text-align:center">';
    out += '<div style="font-size:28px;margin-bottom:10px">📭</div>';
    out += '<div style="font-weight:600;font-size:14px;color:var(--db-ink);margin-bottom:6px">No steps yet</div>';
    out += '<p style="font-size:12.5px;color:var(--db-muted);margin:0 auto 16px;max-width:220px">Add follow-up steps to automatically send to this campaign\'s recipients.</p>';
    out += '<button class="db-btn primary sm" data-action="db-drip-add-step" data-campid="' + escAttr(selCampId) + '">' + dbIcon('plus',12) + ' Add first step</button>';
    out += '</div>';
  } else {
    out += '<div style="padding:10px 14px;display:flex;flex-direction:column;gap:6px">';
    campSteps.forEach(function(step, i) {
      var isSelStep = i === selStepIdx;
      var statusColor = step.status === 'sent' ? 'var(--db-green)' : step.status === 'scheduled' ? 'var(--db-blue)' : 'var(--db-muted)';
      var statusLabel = step.status === 'sent' ? 'Sent' : step.status === 'scheduled' ? 'Scheduled' : 'Draft';
      var statusIcon = step.status === 'sent' ? '✓' : step.status === 'scheduled' ? '⏰' : '○';
      out += '<div data-action="db-drip-edit-step" data-campid="' + escAttr(selCampId) + '" data-stepidx="' + i + '" style="';
      out += 'display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:10px;cursor:pointer;';
      out += 'background:' + (isSelStep ? 'var(--db-green-tint)' : 'var(--db-bg)') + ';';
      out += 'border:1.5px solid ' + (isSelStep ? 'var(--db-green)' : 'var(--db-line-soft)') + '">';
      // Step number circle
      out += '<div style="width:28px;height:28px;border-radius:50%;background:' + (isSelStep ? 'var(--db-green)' : 'var(--db-surface2)') + ';color:' + (isSelStep ? '#fff' : 'var(--db-muted)') + ';display:grid;place-items:center;font-size:12px;font-weight:700;flex-shrink:0">' + (i+1) + '</div>';
      out += '<div style="flex:1;min-width:0">';
      out += '<div style="font-size:13px;font-weight:600;color:var(--db-ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + (step.subject ? esc(step.subject) : '<em style="color:var(--db-muted);font-style:italic">No subject yet</em>') + '</div>';
      out += '<div style="font-size:11.5px;color:var(--db-muted);margin-top:2px">';
      out += dbIcon('clock',10) + ' Day +' + (step.delayDays||3);
      if (step.scheduledAt) out += ' · ' + dbIcon('calendar',10) + ' ' + new Date(step.scheduledAt).toLocaleDateString() + ' ' + new Date(step.scheduledAt).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
      out += '</div></div>';
      out += '<span style="font-size:10px;font-weight:700;color:' + statusColor + ';background:' + statusColor.replace(')','-soft)').replace('var(--db-','var(--db-') + ';padding:2px 7px;border-radius:20px;flex-shrink:0;border:1px solid ' + statusColor + '">' + statusIcon + ' ' + statusLabel + '</span>';
      out += '<button data-action="db-drip-delete-step" data-campid="' + escAttr(selCampId) + '" data-stepidx="' + i + '" style="background:none;border:none;cursor:pointer;color:var(--db-muted);padding:4px;border-radius:5px;flex-shrink:0;font-size:14px" title="Delete step" onclick="event.stopPropagation()">✕</button>';
      out += '</div>';
    });
    out += '</div>';

    // Timeline preview at bottom
    out += '<div style="padding:12px 18px;border-top:1px solid var(--db-line-soft);background:var(--db-bg)">';
    out += '<div style="font-size:11px;font-weight:700;letter-spacing:0.06em;color:var(--db-muted);text-transform:uppercase;margin-bottom:8px">Sequence timeline</div>';
    out += '<div style="display:flex;align-items:center;gap:0">';
    // Campaign start
    out += '<div style="text-align:center;flex-shrink:0"><div style="width:10px;height:10px;border-radius:50%;background:var(--db-green);margin:0 auto 4px"></div><div style="font-size:10px;color:var(--db-green);font-weight:600">Day 0</div><div style="font-size:10px;color:var(--db-muted)">Campaign</div></div>';
    var cumDay = 0;
    campSteps.forEach(function(step, i) {
      cumDay += (step.delayDays || 3);
      out += '<div style="flex:1;height:2px;background:var(--db-line-soft);margin-bottom:16px"></div>';
      out += '<div style="text-align:center;flex-shrink:0"><div style="width:10px;height:10px;border-radius:50%;background:' + (step.status === 'sent' ? 'var(--db-green)' : 'var(--db-blue)') + ';margin:0 auto 4px"></div>';
      out += '<div style="font-size:10px;color:var(--db-blue);font-weight:600">Day ' + cumDay + '</div>';
      out += '<div style="font-size:10px;color:var(--db-muted)">Step ' + (i+1) + '</div></div>';
    });
    out += '</div></div>';
  }
  out += '</div>'; // left card

  // RIGHT: Step editor
  out += '<div class="db-card elev" style="padding:0;overflow:hidden">';
  if (!selStep) {
    out += '<div style="padding:40px;text-align:center;color:var(--db-muted)">';
    out += '<div style="font-size:28px;margin-bottom:10px">✏️</div>';
    out += (campSteps.length === 0 ? '<p>Add your first step on the left to start configuring it.</p>' : '<p>Select a step on the left to edit it.</p>');
    out += '</div>';
  } else {
    out += '<div style="padding:14px 18px;border-bottom:1px solid var(--db-line-soft);display:flex;align-items:center;justify-content:space-between">';
    out += '<div><h3 class="db-card-title" style="margin:0">Edit Step ' + (selStepIdx+1) + '</h3>';
    out += '<p class="db-card-sub" style="margin:2px 0 0">Follow-up for: ' + esc(selCamp.name||selCamp.sheetName||'Campaign') + '</p></div>';
    var stColor = selStep.status==='sent'?'var(--db-green)':selStep.status==='scheduled'?'var(--db-blue)':'var(--db-muted)';
    out += '<span style="font-size:11px;font-weight:700;color:' + stColor + ';border:1px solid ' + stColor + ';padding:3px 8px;border-radius:20px">' + (selStep.status==='sent'?'✓ Sent':selStep.status==='scheduled'?'⏰ Scheduled':'○ Draft') + '</span>';
    out += '</div>';

    out += '<div style="padding:16px 18px;display:flex;flex-direction:column;gap:14px">';

    // Schedule
    out += '<div>';
    out += '<label style="font-size:12px;font-weight:600;color:var(--db-ink);display:block;margin-bottom:5px">' + dbIcon('calendar',12) + ' Schedule send (optional)</label>';
    out += '<input id="dripStepSchedule_' + selStepIdx + '" type="datetime-local" value="' + escAttr(selStep.scheduledAt ? selStep.scheduledAt.slice(0,16) : '') + '" onchange="(function(el,idx){var btn=document.getElementById(\'dripSendBtn_\'+idx);if(!btn)return;var isFuture=el.value&&new Date(el.value)>new Date();if(isFuture){btn.innerHTML=\'⏰ Schedule\';var unsBtn=document.querySelector(\'[data-action=db-drip-unschedule]\');if(!unsBtn){var d=document.createElement(\'button\');d.className=\'db-btn secondary\';d.setAttribute(\'data-action\',\'db-drip-unschedule\');d.setAttribute(\'data-campid\',btn.getAttribute(\'data-campid\'));d.setAttribute(\'data-stepidx\',idx);d.innerHTML=\'✕ Remove schedule\';btn.parentNode.insertBefore(d,btn.nextSibling);}}else{btn.innerHTML=\'↗ Schedule now\';var unsBtn2=document.querySelector(\'[data-action=db-drip-unschedule]\');if(unsBtn2)unsBtn2.remove();}})(this,' + selStepIdx + ')" style="padding:8px 10px;border:1.5px solid var(--db-line);border-radius:8px;background:var(--db-surface2);color:var(--db-ink);font-size:13px;font-family:var(--db-sans);width:100%;box-sizing:border-box">';
    out += '<div style="font-size:11.5px;color:var(--db-muted);margin-top:4px">Leave blank to send manually. Set a date/time to schedule this step automatically.</div>';
    out += '</div>';

    // Subject
    out += '<div>';
    out += '<label style="font-size:12px;font-weight:600;color:var(--db-ink);display:block;margin-bottom:5px">Subject line</label>';
    out += '<input id="dripStepSubject_' + selStepIdx + '" type="text" placeholder="Re: ' + escAttr(selCamp.subject||'your email') + '" value="' + escAttr(selStep.subject||'') + '" style="width:100%;box-sizing:border-box;padding:9px 12px;border:1.5px solid var(--db-line);border-radius:8px;background:var(--db-surface2);color:var(--db-ink);font-size:13px;font-family:var(--db-sans)">';
    out += '</div>';

    // Merge field chips
    var dripMergeFields = (selCamp.sheetHeaders && selCamp.sheetHeaders.length > 0)
      ? selCamp.sheetHeaders
      : ['FirstName', 'LastName', 'Email', 'Name', 'Company'];
    out += '<div>';
    out += '<label style="font-size:12px;font-weight:600;color:var(--db-ink);display:block;margin-bottom:5px">Merge fields <span style="font-weight:400;font-size:11px;color:var(--db-muted)">— click to insert at cursor</span></label>';
    out += '<div style="display:flex;flex-wrap:wrap;gap:5px">';
    dripMergeFields.forEach(function(mf) {
      out += '<button class="db-chip" data-action="db-drip-insert-tag" data-tag="' + escAttr(mf) + '" data-stepidx="' + selStepIdx + '" style="font-family:var(--db-mono);font-size:11.5px;background:var(--db-surface2);border:1px solid var(--db-line);border-radius:6px;padding:3px 8px;cursor:pointer;color:var(--db-ink2)">{{' + esc(mf) + '}}</button>';
    });
    out += '</div>';
    out += '</div>';

    // Body
    out += '<div>';
    out += '<label style="font-size:12px;font-weight:600;color:var(--db-ink);display:block;margin-bottom:5px">Email body</label>';
    out += '<textarea id="dripStepBody_' + selStepIdx + '" placeholder="Hi {{FirstName}},\n\nJust following up on my previous email…\n\nBest," style="width:100%;box-sizing:border-box;min-height:140px;padding:10px 12px;border:1.5px solid var(--db-line);border-radius:8px;background:var(--db-surface2);color:var(--db-ink);font-size:13px;font-family:var(--db-sans);resize:vertical">' + esc(selStep.body||'') + '</textarea>';
    out += '<div style="font-size:11.5px;color:var(--db-muted);margin-top:4px">Use {{merge}} tokens to personalize · e.g. {{FirstName}}, {{Company}}</div>';
    out += '</div>';

    // Actions
    out += '<div style="display:flex;gap:8px;flex-wrap:wrap;padding-top:4px">';
    if (selStep.status !== 'sent') {
      var isFutureScheduled = selStep.scheduledAt && new Date(selStep.scheduledAt) > new Date();
      if (isFutureScheduled) {
        out += '<button id="dripSendBtn_' + selStepIdx + '" class="db-btn primary" data-action="db-drip-send-now" data-campid="' + escAttr(selCampId) + '" data-stepidx="' + selStepIdx + '">' + dbIcon('clock',13) + ' Schedule</button>';
        out += '<button class="db-btn secondary" data-action="db-drip-unschedule" data-campid="' + escAttr(selCampId) + '" data-stepidx="' + selStepIdx + '">' + dbIcon('x',13) + ' Remove schedule</button>';
      } else {
        out += '<button id="dripSendBtn_' + selStepIdx + '" class="db-btn primary" data-action="db-drip-send-now" data-campid="' + escAttr(selCampId) + '" data-stepidx="' + selStepIdx + '">' + dbIcon('send',13) + ' Schedule now</button>';
      }
    }
    out += '</div>';

    if (selStep.status === 'sent') {
      out += '<div style="padding:10px 14px;background:var(--db-green-tint);border:1px solid var(--db-green-soft);border-radius:8px;font-size:13px;color:var(--db-green);font-weight:600">';
      out += dbIcon('check',13) + ' This step has been sent successfully.';
      out += '</div>';
    }

    out += '</div>'; // fields
  }
  out += '</div>'; // right card
  out += '</div>'; // grid

  // Drip send history for this campaign
  var campDripHistory = dripHistory.filter(function(h){ return h.parentId === selCampId; });
  if (campDripHistory.length > 0) {
    out += '<div class="db-card elev db-mt">';
    out += '<div class="db-card-head"><div><h3 class="db-card-title">Drip send history for this campaign</h3><p class="db-card-sub">' + campDripHistory.length + ' step sends</p></div></div>';
    out += '<table class="db-table"><thead><tr><th>Date</th><th>Step</th><th style="text-align:right">Sent</th><th style="text-align:right">Errors</th></tr></thead><tbody>';
    campDripHistory.slice(0, 10).forEach(function(h){
      out += '<tr><td class="mono" style="color:var(--db-muted);font-size:11.5px">' + esc(h.date||'') + '</td>';
      out += '<td style="color:var(--db-ink2)">' + esc(h.name||'') + '</td>';
      out += '<td class="mono" style="text-align:right;color:var(--db-green)">' + (h.total||0) + '</td>';
      out += '<td class="mono" style="text-align:right;color:' + ((h.errors||0)>0?'var(--db-red)':'var(--db-muted)') + '">' + (h.errors||0) + '</td></tr>';
    });
    out += '</tbody></table>';
    out += '</div>';
  }

  return out;
}

// ── Billing panel ─────────────────────────────────────────────────

function dbBillingPanel() {
  return '<div class="db-card elev" style="padding:28px"><h1 class="db-page-title">Бесплатный доступ</h1><p class="db-page-sub">Все функции расширения доступны бесплатно. Подписки, платежи и лимиты расширения отключены.</p><p style="font-size:13px;color:var(--db-muted)">При отправке писем по-прежнему действуют ограничения и правила Google/Gmail.</p></div>';
}

// ── Settings panel ────────────────────────────────────────────────

function dbSettingsPanel() {
  var tab = DB.settingsTab || 'backends';
  var backends = S.scriptUrls || [];

  var out = '';
  out += '<div class="db-page-head">';
  out += '<div><h1 class="db-page-title">' + t('db.settings.title') + '</h1><p class="db-page-sub">' + t('db.settings.sub') + '</p></div>';
  out += '</div>';

  // Appearance row
  out += '<div class="db-card elev" style="margin-bottom:14px">';
  out += '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:20px;flex-wrap:wrap">';
  out += '<div>';
  out += '<div style="font-size:11px;font-weight:700;color:var(--db-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px">' + t('db.settings.dashTheme') + '</div>';
  out += '<div style="font-size:12.5px;color:var(--db-muted);margin-bottom:10px">' + t('db.settings.dashHint') + '</div>';
  out += '<div class="db-seg"><button class="' + (S.theme==='light'?'active':'') + '" data-action="set-theme" data-theme="light">' + t('db.settings.light') + '</button><button class="' + (S.theme!=='light'?'active':'') + '" data-action="set-theme" data-theme="dark">' + t('db.settings.dark') + '</button></div>';
  out += '</div>';
  out += '<div>';
  out += '<div style="font-size:11px;font-weight:700;color:var(--db-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px">' + t('db.settings.language') + '</div>';
  out += '<div style="font-size:12.5px;color:var(--db-muted);margin-bottom:10px">' + t('db.settings.langHint') + '</div>';
  out += '<div class="db-seg">';
  var langLabels = { ru: '🇷🇺 RU' };
  ['ru'].forEach(function(l){
    out += '<button class="' + (S.lang===l?'active':'') + '" data-action="set-lang" data-lang="' + l + '">' + (langLabels[l]||l.toUpperCase()) + '</button>';
  });
  out += '</div></div></div></div>';

  // Tabs
  out += '<div class="db-tabs">';
  [{id:'backends',label:'Backends'},{id:'guide',label:'Guide'},{id:'about',label:'About'}].forEach(function(ti){
    out += '<button class="db-tab-btn' + (tab===ti.id?' active':'') + '" data-action="db-settings-tab" data-tab="' + ti.id + '">' + ti.label + '</button>';
  });
  out += '</div>';

  // ── BACKENDS TAB ────────────────────────────────────────────────────────────
  if (tab === 'backends') {

    // ── STEP 1: Get script code — highlighted hero card at the top ──
    out += '<div class="db-card elev" style="margin-bottom:14px;border:2px solid var(--db-green);background:var(--db-green-tint)">';
    out += '<div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;justify-content:space-between">';
    out += '<div style="display:flex;align-items:center;gap:14px">';
    out += '<div style="width:36px;height:36px;border-radius:50%;background:var(--db-green);color:#fff;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;flex-shrink:0">1</div>';
    out += '<div>';
    out += '<div style="font-size:13px;font-weight:700;color:var(--db-ink);margin-bottom:2px">Get the Apps Script code</div>';
    out += '<div style="font-size:12px;color:var(--db-muted)">Copy and paste it into a new Google Apps Script project — takes 2 minutes.</div>';
    out += '</div></div>';
    out += '<button class="db-btn primary" id="copyScriptBtn" data-action="copy-backend-code" style="flex-shrink:0">' + dbIcon('copy') + ' Copy script code</button>';
    out += '</div></div>';

    // What is a backend — rich explanation
    out += '<div class="db-card elev" style="margin-bottom:14px">';
    out += '<h3 class="db-card-title" style="margin-bottom:6px">What is a backend?</h3>';
    out += '<p style="font-size:13px;color:var(--db-ink2);line-height:1.6;margin-bottom:12px">A <b>backend</b> is a small script you deploy to your own Google account using Google Apps Script. It acts as a private bridge between Madbear and your Gmail inbox — Madbear sends your emails <i>through your own Gmail account</i>, not through any third-party server. This means your sender reputation, your email history, and your data all stay completely under your control.</p>';
    out += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:4px">';
    [
      ['No third-party servers', 'Emails go directly from your Gmail. Nothing passes through Madbear\'s servers.'],
      ['Your sender reputation', 'Because you send from your own Gmail, replies and trust stay with your account.'],
      ['Multiple accounts', 'Add several backends to rotate across Gmail accounts and increase daily volume.'],
    ].forEach(function(item){
      out += '<div style="padding:12px 14px;background:var(--db-bg);border:1px solid var(--db-line-soft);border-radius:10px">';
      out += '<div style="font-weight:600;font-size:13px;color:var(--db-ink);margin-bottom:4px">' + item[0] + '</div>';
      out += '<div style="font-size:12px;color:var(--db-muted);line-height:1.5">' + item[1] + '</div>';
      out += '</div>';
    });
    out += '</div></div>';

    // Connected backends
    out += '<div class="db-card elev" style="margin-bottom:14px">';
    out += '<div class="db-card-head"><div><h3 class="db-card-title">Connected backends</h3><p class="db-card-sub">' + backends.length + ' Gmail account' + (backends.length!==1?'s':'') + ' connected</p></div></div>';
    if (backends.length === 0) {
      out += '<div style="padding:24px;text-align:center;color:var(--db-muted);font-size:13px">No backends connected yet. Add one using the form below.</div>';
    } else {
      out += '<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:4px">';
      backends.forEach(function(b, i){
        var url = typeof b === 'object' ? b.url : b;
        var email = typeof b === 'object' ? (b.email||url) : url;
        var isActive = url === S.scriptUrl;
        out += '<div style="display:flex;align-items:center;gap:14px;padding:12px 14px;background:var(--db-bg);border:1px solid var(--db-line-soft);border-radius:10px">';
        out += '<div style="flex:1"><div style="display:flex;align-items:center;gap:8px;margin-bottom:3px"><span style="font-weight:600;color:var(--db-ink);font-size:13.5px">' + esc(email) + '</span>' + (isActive ? '<span class="db-pill green"><span class="dot"></span>Active</span>' : '') + '</div>';
        out += '<div style="font-family:var(--db-mono);font-size:11px;color:var(--db-muted)">' + esc(url.substring(0,70) + (url.length>70?'…':'')) + '</div></div>';
        out += '<div style="display:flex;gap:6px">';
        if (!isActive) out += '<button class="db-btn secondary sm" data-action="select-backend" data-index="' + i + '">Set active</button>';
        out += '<button class="db-btn danger sm" data-action="remove-backend" data-index="' + i + '">Remove</button>';
        out += '</div></div>';
      });
      out += '</div>';
    }
    out += '</div>';

    // Add backend form
    out += '<div class="db-card elev">';
    out += '<h3 class="db-card-title" style="margin-bottom:4px">Add a new backend</h3>';
    out += '<p style="font-size:12.5px;color:var(--db-muted);margin-bottom:14px">Deploy the Apps Script to your Google account, then paste the Web App URL here. The label helps you identify which Gmail account this is.</p>';
    out += '<div style="display:grid;grid-template-columns:1fr 1fr auto;gap:10px;align-items:flex-end">';
    out += '<div><span class="db-field-label">Gmail account (label)</span><div class="db-field">' + dbIcon('mail') + '<input id="backendEmailInput" placeholder="you@gmail.com"/></div></div>';
    out += '<div><span class="db-field-label">Apps Script Web App URL</span><div class="db-field">' + dbIcon('globe') + '<input id="urlInput" placeholder="https://script.google.com/macros/s/…/exec"/></div></div>';
    out += '<button class="db-btn primary" data-action="add-backend">' + dbIcon('plus') + ' Add backend</button>';
    out += '</div></div>';
  }

  // ── GUIDE TAB ────────────────────────────────────────────────────────────────
  if (tab === 'guide') {
    var guides = [
      {
        num:'01', t:'Set up your first backend',
        intro:'Before you can send any emails, you need to connect a Gmail account via Google Apps Script. This takes about 5 minutes and only needs to be done once per Gmail account.',
        steps:[
          'Go to <a href="https://script.google.com" target="_blank" style="color:var(--db-green)">script.google.com</a> and click <b>New project</b>.',
          'Delete the placeholder code, then paste the Madbear Apps Script code. (You can find the script code by clicking <b>Get script code</b> in the Backends tab above.)',
          'Click <b>Deploy → New deployment</b>. Set type to <b>Web app</b>. Set "Execute as" to <b>Me</b> and "Who has access" to <b>Anyone</b>.',
          'Click <b>Deploy</b>, then copy the <b>Web App URL</b> it gives you (starts with https://script.google.com/macros/s/).',
          'Go to <b>Settings → Backends</b> and paste the URL in the "Apps Script Web App URL" field. Add your Gmail as the label. Click <b>Add backend</b>.',
          'The backend will appear in your connected list. It is now active and ready to send emails through that Gmail account.',
        ]
      },
      {
        num:'02', t:'Send your first campaign',
        intro:'A campaign is a batch of emails sent to a list of contacts. You can personalize each email with merge fields like {{FirstName}}.',
        steps:[
          'Click <b>+ New campaign</b> in the top right of any page.',
          'Give your campaign a name (internal only) and write your <b>Subject line</b>. Use {{FirstName}} or other merge fields in the subject if you want.',
          'In the <b>Recipients</b> field, paste email addresses separated by commas or newlines — or select a saved contact list.',
          'Write your email body. Use merge fields like <b>{{FirstName}}</b>, <b>{{LastName}}</b>, <b>{{Email}}</b>, or any custom field from your contact CSV.',
          'Set a <b>daily send limit</b> (how many emails per day) and a <b>delay</b> in seconds between each send to avoid Gmail rate limits.',
          'Click <b>Start sending</b>. The campaign runs in the background — you can close the popup and it will continue.',
        ]
      },
      {
        num:'03', t:'Import contacts from a CSV',
        intro:'Import your contact list from any spreadsheet or CRM export. Madbear reads standard CSV files with flexible column mapping.',
        steps:[
          'Go to <b>Contacts</b> in the left sidebar.',
          'Click <b>Import CSV</b> and select your file. Your CSV needs at least one column with email addresses.',
          'In the import dialog, map your CSV columns to Madbear fields: Email, FirstName, LastName, Tags, and any custom fields.',
          'The <b>Tags</b> column lets you group contacts. Use values like "leads", "customers", "vip" — separate multiple tags with a pipe character (|).',
          'Click <b>Import</b>. Contacts are saved immediately and available in any campaign\'s recipient picker.',
          'Duplicate emails are automatically skipped. You can re-import updated CSVs without creating duplicates.',
        ]
      },
      {
        num:'04', t:'Set up a drip sequence',
        intro:'A drip sequence automatically sends follow-up emails to contacts after a campaign. Great for onboarding, nurture, or re-engagement flows.',
        steps:[
          'Go to <b>Drip sequences</b> in the left sidebar and click <b>Edit drip flow</b>.',
          'Each step is a follow-up email. Add steps with the <b>+ Add step</b> button.',
          'For each step, set: the <b>delay in days</b> after the previous step, a <b>subject line</b>, and the <b>email body</b>.',
          'Toggle individual steps on or off with the switch on the left. Disabled steps are skipped but kept for later.',
          'When you send a campaign, the drip sequence picks up automatically — contacts receive follow-ups on the schedule you defined.',
          'Contacts who reply to any email are automatically removed from the remaining drip steps.',
        ]
      },
      {
        num:'05', t:'Understand your analytics',
        intro:'Madbear tracks every send in real time. Here is what each metric means and how to read your dashboard.',
        steps:[
          '<b>Delivered</b> — Gmail accepted the email and sent it. This is the count of successful sends.',
          '<b>Errors</b> — Gmail rejected the send. Common causes: daily quota exceeded, invalid email address, backend script error, or network timeout.',
          '<b>Skipped</b> — The contact was in the list but Madbear did not attempt to send. Reasons: already emailed in a previous run, address is on the unsubscribe list, or filtered out by a tag rule.',
          '<b>Delivery rate</b> = Delivered ÷ (Delivered + Errors). Skipped contacts are not counted in the rate — they were never attempted.',
          'The <b>Analytics</b> page shows a 7-day send volume chart and a per-campaign breakdown table with all four metrics for each campaign.',
          'If you see a high error rate, check your backend is still deployed and your Gmail has not hit its daily sending quota (500/day for personal Gmail, 2,000/day for Workspace).',
        ]
      },
      {
        num:'06', t:'Export your data',
        intro:'You can export everything from Madbear at any time — contacts, campaigns, analytics, and your full configuration backup.',
        steps:[
          'On the <b>Campaigns</b> page, click the <b>Export</b> button in the top right. Choose between CSV (spreadsheet-compatible) or full JSON backup.',
          'On the <b>Contacts</b> page, click <b>Export</b> to download all contacts with their names, emails, and tags as a CSV.',
          'For a <b>full backup</b> of everything — campaigns, contacts, settings, history — click the <b>Export all data</b> option. This creates a JSON file you can re-import later.',
          'The JSON backup includes: all campaigns and their status, your full contact list, send history, drip sequence configuration, and account settings.',
          'To restore from a backup, go to Settings and use the <b>Import backup</b> option (available in the Backends tab).',
          'Export regularly if you are running large campaigns — it is your safety net if you ever need to switch browsers or reinstall the extension.',
        ]
      },
    ];

    out += '<div style="display:flex;flex-direction:column;gap:8px">';
    guides.forEach(function(g, gi) {
      var stateKey = 'guide_section_' + gi;
      var isOpen = !!(DB.guideOpen && DB.guideOpen[stateKey]);
      out += '<div class="db-card elev" style="padding:0;overflow:hidden">';
      // Clickable header row — acts as toggle
      out += '<button data-action="db-guide-toggle" data-guide-key="' + stateKey + '" style="width:100%;display:flex;gap:16px;padding:14px 20px;align-items:center;background:transparent;border:none;cursor:pointer;text-align:left">';
      out += '<div style="font-family:var(--db-mono);font-size:11px;font-weight:700;color:var(--db-green);background:var(--db-green-tint);border:1px solid var(--db-green-soft);border-radius:7px;padding:4px 8px;flex-shrink:0">' + g.num + '</div>';
      out += '<div style="flex:1"><div style="font-weight:700;font-size:13.5px;color:var(--db-ink);margin-bottom:2px">' + esc(g.t) + '</div>';
      out += '<div style="font-size:12px;color:var(--db-muted);line-height:1.4">' + esc(g.intro) + '</div></div>';
      out += '<div style="flex-shrink:0;width:24px;height:24px;border-radius:6px;background:var(--db-surface2);border:1px solid var(--db-line-soft);display:grid;place-items:center;color:var(--db-muted);transition:transform 0.15s;' + (isOpen ? 'transform:rotate(180deg)' : '') + '"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></div>';
      out += '</button>';
      if (isOpen) {
        out += '<div style="padding:0 20px 16px;border-top:1px solid var(--db-line-soft);display:flex;flex-direction:column;gap:10px;padding-top:14px">';
        g.steps.forEach(function(step, i) {
          out += '<div style="display:flex;gap:12px;align-items:flex-start">';
          out += '<span style="min-width:22px;height:22px;border-radius:50%;background:var(--db-green-tint);color:var(--db-green);font-size:10px;font-weight:700;display:grid;place-items:center;flex-shrink:0;margin-top:1px;border:1px solid var(--db-green-soft)">' + (i+1) + '</span>';
          out += '<div style="font-size:13px;color:var(--db-ink2);line-height:1.6;padding-top:2px">' + step + '</div>';
          out += '</div>';
        });
        out += '</div>';
      }
      out += '</div>';
    });
    out += '</div>';
  }

  // ── ABOUT TAB ────────────────────────────────────────────────────────────────
  if (tab === 'about') {
    // Header
    out += '<div class="db-card elev" style="margin-bottom:14px">';
    out += '<div style="display:flex;gap:20px;align-items:flex-start">';
    out += '<div style="width:64px;height:64px;border-radius:16px;background:linear-gradient(135deg,var(--db-green),var(--db-green3));display:grid;place-items:center;color:#fff;font-weight:900;font-size:26px;flex-shrink:0;letter-spacing:-1px">M</div>';
    out += '<div style="flex:1">';
    out += '<div style="display:flex;align-items:baseline;gap:10px;margin-bottom:4px"><h3 style="font-size:20px;font-weight:700;color:var(--db-ink);margin:0">Madbear Emails</h3><span style="font-family:var(--db-mono);font-size:11px;color:var(--db-muted);background:var(--db-surface2);border:1px solid var(--db-line-soft);border-radius:5px;padding:2px 6px">v4.0.0</span></div>';
    out += '<p style="font-size:13.5px;color:var(--db-ink2);line-height:1.6;max-width:680px;margin:0">Madbear is a Gmail-native mass email tool built for people who want to send smart, personalized email campaigns without paying for an ESP or giving up control of their sender reputation. It runs entirely through your own Gmail account via Google Apps Script — no third-party servers ever touch your emails.</p>';
    out += '</div></div></div>';

    // What you can do
    out += '<div class="db-card elev" style="margin-bottom:14px">';
    out += '<h3 class="db-card-title" style="margin-bottom:14px">What you can do with Madbear</h3>';
    out += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">';
    [
      ['Send mass email campaigns', 'Compose once, send to hundreds or thousands. Each email is sent individually from your Gmail — not as a bulk blast — so it lands in the primary inbox, not promotions.'],
      ['Personalize every email', 'Use merge fields like {{FirstName}}, {{Company}}, or any column from your CSV. Every recipient gets a message that feels written just for them.'],
      ['Automate follow-ups with drips', 'Set up multi-step drip sequences that send follow-up emails automatically on a schedule. Contacts who reply are removed from the sequence automatically.'],
      ['Import and manage contacts', 'Import contact lists from any CSV. Tag and segment your contacts. Filter by tag when sending so you always reach the right audience.'],
      ['Track delivery in real time', 'See exactly how many emails were delivered, errored, or skipped per campaign. Full analytics with 7-day send charts and per-campaign breakdowns.'],
      ['Use multiple Gmail accounts', 'Connect several Gmail or Workspace accounts as backends. Rotate between them to increase daily send volume and avoid quota limits.'],
      ['Keep your data private', 'Everything is stored locally in your browser. No account required, no cloud sync, no data leaving your machine. You own all of it.'],
      ['Export everything anytime', 'Export contacts, campaigns, history, and full configuration backups. Re-import them anytime to restore or migrate.'],
    ].forEach(function(item){
      out += '<div style="padding:14px 16px;background:var(--db-bg);border:1px solid var(--db-line-soft);border-radius:10px">';
      out += '<div style="font-weight:600;font-size:13px;color:var(--db-ink);margin-bottom:5px">' + item[0] + '</div>';
      out += '<div style="font-size:12.5px;color:var(--db-muted);line-height:1.5">' + item[1] + '</div>';
      out += '</div>';
    });
    out += '</div></div>';

    // Built by
    out += '<div class="db-card elev">';
    out += '<h3 class="db-card-title" style="margin-bottom:8px">Built by Madbear Creative Agency</h3>';
    out += '<p style="font-size:13px;color:var(--db-ink2);line-height:1.6;margin-bottom:14px">Madbear Emails was built internally by Madbear Creative Agency to solve a simple problem: sending personalized outreach at scale without paying for Mailchimp, HubSpot, or similar tools — and without losing control of sender identity. It started as an internal tool and grew into a full-featured extension used by the whole team.</p>';
    out += '<p style="font-size:13px;color:var(--db-ink2);line-height:1.6;margin-bottom:14px">The extension is built on top of Google Apps Script, which means it works with any Gmail or Google Workspace account out of the box. No OAuth apps to approve, no API keys to manage — just a script you deploy in 5 minutes and a dashboard that runs entirely in your browser.</p>';
    out += '<div style="display:flex;gap:8px">';
    out += '<button class="db-btn secondary" data-action="db-export-all">Export all data</button>';
    out += '</div></div>';
  }

  out += '<div style="text-align:center;margin-top:32px;font-size:12px;color:var(--db-muted)">Built for <b style="color:var(--db-green-ink)">Madbear Creative Agency</b></div>';
  return out;
}

// ── Data helpers ──────────────────────────────────────────────────

// ── Export helpers ─────────────────────────────────────────────────

function mbDownload(content, filename, type) {
  var blob = new Blob([content], { type: type || 'text/plain' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

function mbCSV(rows) {
  return rows.map(function(r) {
    return r.map(function(v) { return '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"'; }).join(',');
  }).join('\n');
}

function mbExportContactsCSV() {
  var contacts = S.contacts || [];
  var rows = [['Name','Email','Tags','Custom Fields']];
  contacts.forEach(function(c) {
    var cf = Object.keys(c.customFields || {}).map(function(k){ return k+'='+c.customFields[k]; }).join('; ');
    rows.push([c.name||'', c.email||'', (c.tags||[]).join('|'), cf]);
  });
  mbDownload(mbCSV(rows), 'madbear_contacts_' + mbDateStr() + '.csv', 'text/csv');
}

function mbExportCampaignsCSV() {
  var camps = S.campaigns || S.history || [];
  var rows = [['Campaign Name','Type','Subject','Status','Total Sent','Delivered','Errors','Rate (%)','Date','Parent Campaign']];
  camps.forEach(function(c) {
    var delivered = (c.total||0) - (c.errors||0);
    var rate = (c.total||0) > 0 ? ((delivered / (c.total||0)) * 100).toFixed(1) : '';
    rows.push([c.name||'', c.type||'sent', c.subject||'', c.status||'', c.total||0, delivered, c.errors||0, rate, c.date||'', c.parentName||'']);
  });
  mbDownload(mbCSV(rows), 'madbear_campaigns_' + mbDateStr() + '.csv', 'text/csv');
}

function mbExportAnalyticsCSV() {
  var hist = S.history || [];
  var stats = S.stats || {};
  // Summary stats row
  var totalSent = stats.sent || 0;
  var totalErrors = stats.errors || 0;
  var delivered = totalSent - totalErrors;
  var rate = totalSent > 0 ? ((delivered / totalSent) * 100).toFixed(1) : '0';

  // Per-campaign breakdown
  var rows = [['=== SUMMARY ===','','','','','']];
  rows.push(['Metric','Value','','','','']);
  rows.push(['Total emails sent', totalSent,'','','','']);
  rows.push(['Total delivered', delivered,'','','','']);
  rows.push(['Total errors', totalErrors,'','','','']);
  rows.push(['Delivery rate (%)', rate,'','','','']);
  rows.push(['Total campaigns', hist.length,'','','','']);
  var followups = hist.filter(function(c){ return c.type === 'followup'; }).length;
  var drips = hist.filter(function(c){ return c.type === 'drip'; }).length;
  rows.push(['One-off campaigns', hist.length - followups - drips,'','','','']);
  rows.push(['Follow-up campaigns', followups,'','','','']);
  rows.push(['Drip steps sent', drips,'','','','']);
  rows.push(['','','','','','']);
  rows.push(['=== PER-CAMPAIGN BREAKDOWN ===','','','','','']);
  rows.push(['Campaign','Type','Date','Sent','Errors','Rate (%)']);
  hist.forEach(function(c) {
    var del = (c.total||0) - (c.errors||0);
    var r = (c.total||0) > 0 ? ((del / (c.total||0)) * 100).toFixed(1) : '—';
    rows.push([c.name||'', c.type||'sent', c.date||'', c.total||0, c.errors||0, r]);
  });
  mbDownload(mbCSV(rows), 'madbear_analytics_' + mbDateStr() + '.csv', 'text/csv');
}

function mbExportHistoryCSV() {
  var hist = S.history || [];
  var rows = [['Campaign','Email','Status','Timestamp','Error']];
  hist.forEach(function(h) {
    (h.log || []).forEach(function(entry) {
      rows.push([h.name||'', entry.email||'', entry.status||'', entry.ts||'', entry.error||'']);
    });
    if (!h.log) rows.push([h.name||'', '', h.status||'', h.date||'', '']);
  });
  mbDownload(mbCSV(rows), 'madbear_history_' + mbDateStr() + '.csv', 'text/csv');
}

function mbExportFullJSON() {
  var backup = {
    version: '4.0.0',
    exportedAt: new Date().toISOString(),
    contacts: S.contacts || [],
    campaigns: S.campaigns || [],
    history: S.history || [],
    drip: { steps: S.dripSteps || [], enabled: S.dripEnabled },
    dripCampaigns: S.dripCampaigns || {},
    settings: {
      theme: S.theme,
      lang: S.lang,
      billing: S.billing || {},
      scriptUrls: S.scriptUrls || [],
      scriptUrl: S.scriptUrl || '',
    },
    stats: S.stats || {},
  };
  mbDownload(JSON.stringify(backup, null, 2), 'madbear_backup_' + mbDateStr() + '.json', 'application/json');
}

function mbDateStr() {
  var d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}

// ── Premium XLSX Export ────────────────────────────────────────────────────────
// Pure JS Open XML builder — no external libraries, MV3/CSP safe.

function mbExportXLSX() {
  var stats    = S.stats    || {};
  var contacts = S.contacts || [];
  var history  = S.history  || [];
  var billing  = S.billing  || {};

  var totalSent    = stats.sent    || 0;
  var totalErrors  = stats.errors  || 0;
  var delivered    = totalSent - totalErrors;
  var delivRate    = totalSent > 0 ? ((delivered / totalSent) * 100).toFixed(1) : '0.0';
  var planLabel    = billing.activePlan ? (billing.activePlan.charAt(0).toUpperCase() + billing.activePlan.slice(1)) : 'Free';
  var exportDate   = new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });

  // ── Shared strings pool ─────────────────────────────────────────────────────
  var _sst = [];
  var _sstMap = {};
  function ss(str) {
    var s = String(str == null ? '' : str);
    if (_sstMap[s] === undefined) { _sstMap[s] = _sst.length; _sst.push(s); }
    return _sstMap[s];
  }

  // ── Style IDs (indexes into styles xf array) ───────────────────────────────
  // We define named style slots and reference by index.
  // 0=default, 1=header, 2=title, 3=kpiNum, 4=kpiLabel, 5=sectionHead,
  // 6=tableHead, 7=rowAlt, 8=rowNorm, 9=green, 10=red, 11=yellow,
  // 12=muted, 13=bold, 14=metaKey, 15=metaVal, 16=kpiCard, 17=subhead,
  // 18=centerBold, 19=percent, 20=dateCell, 21=number

  // ── XML helpers ─────────────────────────────────────────────────────────────
  function xmlEsc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&apos;');
  }

  // Convert col index (0-based) to letter(s)
  function colLetter(n) {
    var s = '';
    n++;
    while (n > 0) { n--; s = String.fromCharCode(65 + (n % 26)) + s; n = Math.floor(n / 26); }
    return s;
  }

  function cellRef(row, col) { return colLetter(col) + row; }

  // Build a cell XML node
  // type: 's'=sharedString, 'n'=number, 'b'=blank
  function cell(row, col, value, styleId, type) {
    var ref = cellRef(row, col);
    if (value === null || value === undefined || value === '') {
      return '<c r="' + ref + '" s="' + (styleId||0) + '"/>';
    }
    if (type === 's') {
      var si = ss(value);
      return '<c r="' + ref + '" t="s" s="' + (styleId||0) + '"><v>' + si + '</v></c>';
    }
    // number
    var num = parseFloat(String(value).replace(/[^0-9.\-]/g,''));
    if (isNaN(num)) {
      var si2 = ss(value);
      return '<c r="' + ref + '" t="s" s="' + (styleId||0) + '"><v>' + si2 + '</v></c>';
    }
    return '<c r="' + ref + '" s="' + (styleId||0) + '"><v>' + num + '</v></c>';
  }

  function row(rowNum, cells) {
    return '<row r="' + rowNum + '">' + cells.join('') + '</row>';
  }

  function mergeCell(r1, c1, r2, c2) {
    return '<mergeCell ref="' + cellRef(r1,c1) + ':' + cellRef(r2,c2) + '"/>';
  }

  // ── Styles XML ──────────────────────────────────────────────────────────────
  function buildStyles() {
    // Colors
    var BEIGE    = 'FDF8F0';
    var BEIGE2   = 'F5EFE4';
    var BEIGE3   = 'EDE5D8';
    var GREEN    = '1E7A3E';
    var GREENBG  = 'D6EFDE';
    var REDBG    = 'FDECEA';
    var REDTXT   = 'B91C1C';
    var YELLOWBG = 'FEF9C3';
    var YELLOWTX = '854D0E';
    var DARK     = '1C1916';
    var DARK2    = '3D3830';
    var MUTED    = '8B8580';
    var WHITE    = 'FFFFFF';
    var GOLD     = 'D4A853';

    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +

    // Fonts (index 0-9)
    '<fonts count="12">' +
      '<font><sz val="11"/><color rgb="FF' + DARK + '"/><name val="Calibri"/></font>' +           // 0 default
      '<font><sz val="13"/><b/><color rgb="FF' + WHITE + '"/><name val="Calibri"/></font>' +      // 1 header white bold
      '<font><sz val="22"/><b/><color rgb="FF' + GREEN + '"/><name val="Calibri"/></font>' +      // 2 title green
      '<font><sz val="28"/><b/><color rgb="FF' + DARK + '"/><name val="Calibri"/></font>' +       // 3 kpi number
      '<font><sz val="10"/><color rgb="FF' + MUTED + '"/><name val="Calibri"/></font>' +          // 4 kpi label / muted
      '<font><sz val="12"/><b/><color rgb="FF' + DARK + '"/><name val="Calibri"/></font>' +       // 5 section head
      '<font><sz val="11"/><b/><color rgb="FF' + WHITE + '"/><name val="Calibri"/></font>' +      // 6 table header white bold
      '<font><sz val="11"/><color rgb="FF' + DARK2 + '"/><name val="Calibri"/></font>' +          // 7 row normal
      '<font><sz val="11"/><b/><color rgb="FF' + GREEN + '"/><name val="Calibri"/></font>' +      // 8 green bold
      '<font><sz val="11"/><b/><color rgb="FF' + REDTXT + '"/><name val="Calibri"/></font>' +     // 9 red bold
      '<font><sz val="11"/><b/><color rgb="FF' + YELLOWTX + '"/><name val="Calibri"/></font>' +   // 10 yellow bold
      '<font><sz val="10"/><color rgb="FF' + DARK2 + '"/><name val="Calibri"/></font>' +          // 11 small
    '</fonts>' +

    // Fills (index 0-1 required, then custom)
    '<fills count="16">' +
      '<fill><patternFill patternType="none"/></fill>' +                                           // 0 none (required)
      '<fill><patternFill patternType="gray125"/></fill>' +                                        // 1 gray125 (required)
      '<fill><patternFill patternType="solid"><fgColor rgb="FF' + GREEN  + '"/></patternFill></fill>' +    // 2 green
      '<fill><patternFill patternType="solid"><fgColor rgb="FF' + BEIGE  + '"/></patternFill></fill>' +    // 3 beige
      '<fill><patternFill patternType="solid"><fgColor rgb="FF' + BEIGE2 + '"/></patternFill></fill>' +    // 4 beige2
      '<fill><patternFill patternType="solid"><fgColor rgb="FF' + BEIGE3 + '"/></patternFill></fill>' +    // 5 beige3
      '<fill><patternFill patternType="solid"><fgColor rgb="FF' + GREENBG+ '"/></patternFill></fill>' +    // 6 green bg
      '<fill><patternFill patternType="solid"><fgColor rgb="FF' + REDBG  + '"/></patternFill></fill>' +    // 7 red bg
      '<fill><patternFill patternType="solid"><fgColor rgb="FF' + YELLOWBG+'"/></patternFill></fill>' +    // 8 yellow bg
      '<fill><patternFill patternType="solid"><fgColor rgb="FF' + DARK   + '"/></patternFill></fill>' +    // 9 dark
      '<fill><patternFill patternType="solid"><fgColor rgb="FF' + WHITE  + '"/></patternFill></fill>' +    // 10 white
      '<fill><patternFill patternType="solid"><fgColor rgb="FFDCE8DC"/></patternFill></fill>' +            // 11 light green tint
      '<fill><patternFill patternType="solid"><fgColor rgb="FF' + GOLD   + '"/></patternFill></fill>' +    // 12 gold
      '<fill><patternFill patternType="solid"><fgColor rgb="FFE8F5EE"/></patternFill></fill>' +            // 13 soft green
      '<fill><patternFill patternType="solid"><fgColor rgb="FFF0EBE3"/></patternFill></fill>' +            // 14 warm card
      '<fill><patternFill patternType="solid"><fgColor rgb="FF2D6A4F"/></patternFill></fill>' +            // 15 deep green
    '</fills>' +

    // Borders (index 0-5)
    '<borders count="6">' +
      '<border><left/><right/><top/><bottom/><diagonal/></border>' +                               // 0 none
      '<border><left style="thin"><color rgb="FFD4CCBF"/></left><right style="thin"><color rgb="FFD4CCBF"/></right><top style="thin"><color rgb="FFD4CCBF"/></top><bottom style="thin"><color rgb="FFD4CCBF"/></bottom><diagonal/></border>' +  // 1 thin beige
      '<border><left style="medium"><color rgb="FF' + GREEN + '"/></left><right style="medium"><color rgb="FF' + GREEN + '"/></right><top style="medium"><color rgb="FF' + GREEN + '"/></top><bottom style="medium"><color rgb="FF' + GREEN + '"/></bottom><diagonal/></border>' +  // 2 medium green
      '<border><bottom style="thin"><color rgb="FFD4CCBF"/></bottom><left/><right/><top/><diagonal/></border>' +  // 3 bottom only
      '<border><left style="thin"><color rgb="FF' + GREENBG + '"/></left><right style="thin"><color rgb="FF' + GREENBG + '"/></right><top style="thin"><color rgb="FF' + GREENBG + '"/></top><bottom style="thin"><color rgb="FF' + GREENBG + '"/></bottom><diagonal/></border>' +  // 4 green tint border
      '<border><left style="medium"><color rgb="FF' + DARK + '"/></left><right/><top/><bottom/><diagonal/></border>' +  // 5 left accent bar
    '</borders>' +

    // CellStyleXfs (base formats, required)
    '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>' +

    // CellXfs — the actual style indexes we use
    '<cellXfs count="22">' +
      // 0  default
      '<xf numFmtId="0" fontId="0" fillId="3" borderId="0" xfId="0"><alignment vertical="center" wrapText="0"/></xf>' +
      // 1  column header (green bg, white bold)
      '<xf numFmtId="0" fontId="6" fillId="2" borderId="0" xfId="0"><alignment horizontal="center" vertical="center"/></xf>' +
      // 2  big title
      '<xf numFmtId="0" fontId="2" fillId="3" borderId="0" xfId="0"><alignment vertical="center"/></xf>' +
      // 3  kpi number (huge bold)
      '<xf numFmtId="0" fontId="3" fillId="14" borderId="1" xfId="0"><alignment horizontal="center" vertical="center"/></xf>' +
      // 4  kpi label (small muted)
      '<xf numFmtId="0" fontId="4" fillId="14" borderId="1" xfId="0"><alignment horizontal="center" vertical="center"/></xf>' +
      // 5  section heading (bold dark, beige2 bg)
      '<xf numFmtId="0" fontId="5" fillId="5" borderId="3" xfId="0"><alignment vertical="center" indent="1"/></xf>' +
      // 6  table header (dark bg, white bold)
      '<xf numFmtId="0" fontId="6" fillId="9" borderId="0" xfId="0"><alignment horizontal="center" vertical="center"/></xf>' +
      // 7  alternating row (beige2 bg)
      '<xf numFmtId="0" fontId="7" fillId="4" borderId="3" xfId="0"><alignment vertical="center" indent="1"/></xf>' +
      // 8  normal row (beige bg)
      '<xf numFmtId="0" fontId="7" fillId="3" borderId="3" xfId="0"><alignment vertical="center" indent="1"/></xf>' +
      // 9  green badge (green bg, green bold)
      '<xf numFmtId="0" fontId="8" fillId="6" borderId="4" xfId="0"><alignment horizontal="center" vertical="center"/></xf>' +
      // 10 red badge
      '<xf numFmtId="0" fontId="9" fillId="7" borderId="0" xfId="0"><alignment horizontal="center" vertical="center"/></xf>' +
      // 11 yellow badge
      '<xf numFmtId="0" fontId="10" fillId="8" borderId="0" xfId="0"><alignment horizontal="center" vertical="center"/></xf>' +
      // 12 muted / faded
      '<xf numFmtId="0" fontId="4" fillId="3" borderId="0" xfId="0"><alignment vertical="center" indent="1"/></xf>' +
      // 13 bold dark
      '<xf numFmtId="0" fontId="5" fillId="3" borderId="3" xfId="0"><alignment vertical="center" indent="1"/></xf>' +
      // 14 meta key (small, beige3)
      '<xf numFmtId="0" fontId="11" fillId="5" borderId="1" xfId="0"><alignment horizontal="right" vertical="center" indent="1"/></xf>' +
      // 15 meta value (small, beige)
      '<xf numFmtId="0" fontId="7" fillId="3" borderId="1" xfId="0"><alignment vertical="center" indent="1"/></xf>' +
      // 16 kpi card beige with left green bar
      '<xf numFmtId="0" fontId="3" fillId="3" borderId="5" xfId="0"><alignment horizontal="center" vertical="center"/></xf>' +
      // 17 subhead centered
      '<xf numFmtId="0" fontId="5" fillId="3" borderId="0" xfId="0"><alignment horizontal="center" vertical="center"/></xf>' +
      // 18 center bold
      '<xf numFmtId="0" fontId="5" fillId="4" borderId="1" xfId="0"><alignment horizontal="center" vertical="center"/></xf>' +
      // 19 percent format
      '<xf numFmtId="9" fontId="7" fillId="3" borderId="3" xfId="0"><alignment horizontal="center" vertical="center"/></xf>' +
      // 20 date format
      '<xf numFmtId="14" fontId="7" fillId="3" borderId="3" xfId="0"><alignment horizontal="center" vertical="center" indent="1"/></xf>' +
      // 21 number centered
      '<xf numFmtId="0" fontId="7" fillId="3" borderId="3" xfId="0"><alignment horizontal="center" vertical="center"/></xf>' +
    '</cellXfs>' +

    '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>' +
    '</styleSheet>';
  }

  // ── Sheet builders ──────────────────────────────────────────────────────────

  function buildOverview() {
    var rows = [];
    var merges = [];

    // Helper to push a row
    function r(rowNum, cells) { rows.push(row(rowNum, cells)); }

    // Row 1: blank spacer
    r(1, []);

    // Row 2: Logo / Title
    merges.push(mergeCell(2,0,2,7));
    r(2, [cell(2,0,'✦ MADBEAR EMAILS  ·  Analytics Report',2,'s')]);

    // Row 3: subtitle
    merges.push(mergeCell(3,0,3,7));
    r(3, [cell(3,0,'Exported ' + exportDate + '  ·  Plan: ' + planLabel,4,'s')]);

    r(4, []);

    // Row 5: KPI header
    merges.push(mergeCell(5,0,5,7));
    r(5, [cell(5,0,'KEY PERFORMANCE INDICATORS',5,'s')]);

    // Rows 6-7: KPI numbers (3 per row, cols 0,2,4 + labels below)
    var kpis = [
      { label:'Emails Sent',          value: totalSent.toLocaleString() },
      { label:'Delivered',            value: delivered.toLocaleString() },
      { label:'Delivery Rate',        value: delivRate + '%' },
      { label:'Total Campaigns',      value: (history.length).toString() },
      { label:'Contacts',             value: contacts.length.toString() },
      { label:'Errors',               value: totalErrors.toLocaleString() },
    ];
    // 6 KPIs across 6 cols (A-F) number row 6, label row 7
    for (var k = 0; k < 6; k++) {
      merges.push(mergeCell(6,k,6,k)); // single cell, keep tidy
      rows[rows.length-1]; // placeholder — we'll push them together
    }
    var kpiNumCells = kpis.map(function(k,i){ return cell(6,i,k.value,3,'s'); });
    var kpiLblCells = kpis.map(function(k,i){ return cell(7,i,k.label,4,'s'); });
    r(6, kpiNumCells);
    r(7, kpiLblCells);

    r(8, []);

    // Row 9: Activity section header
    merges.push(mergeCell(9,0,9,7));
    r(9, [cell(9,0,'SEND ACTIVITY — LAST 7 DAYS',5,'s')]);

    // Row 10: day headers
    var last7 = [];
    var dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var now = new Date();
    for (var d = 6; d >= 0; d--) {
      var dt = new Date(now); dt.setDate(dt.getDate() - d);
      var label = dayNames[dt.getDay()];
      var sent = 0;
      history.forEach(function(h) {
        if (h.date && new Date(h.date).toDateString() === dt.toDateString()) {
          sent += (h.total || 0);
        }
      });
      last7.push({ label: label, sent: sent });
    }
    r(10, last7.map(function(d,i){ return cell(10,i,d.label,6,'s'); }));
    r(11, last7.map(function(d,i){ return cell(11,i,d.sent,21,'n'); }));

    // Bar chart using ▓ characters — visual sparkline in text
    var maxSent = Math.max.apply(null, last7.map(function(d){ return d.sent; })) || 1;
    var bars = ['▁','▂','▃','▄','▅','▆','▇','█'];
    r(12, last7.map(function(d,i){
      var barIdx = Math.min(7, Math.round((d.sent / maxSent) * 7));
      return cell(12,i,bars[barIdx],9,'s');
    }));

    r(13, []);

    // Row 14: Recent Campaigns header
    merges.push(mergeCell(14,0,14,7));
    r(14, [cell(14,0,'RECENT CAMPAIGNS',5,'s')]);

    // Row 15: table headers
    var campCols = ['Campaign','Type','Date','Sent','Errors','Delivery Rate','Status','Tags'];
    r(15, campCols.map(function(h,i){ return cell(15,i,h,6,'s'); }));

    // Rows 16+: data
    var recent = history.slice(0,20);
    recent.forEach(function(c,i) {
      var rowNum = 16 + i;
      var del = (c.total||0) - (c.errors||0);
      var rate = (c.total||0) > 0 ? ((del/(c.total||0))*100).toFixed(1)+'%' : '—';
      var styleCells = (i % 2 === 0) ? 8 : 7;
      var styleNum   = (i % 2 === 0) ? 21 : 21;
      var statusSty  = c.status === 'sent' ? 9 : (c.status === 'error' ? 10 : 11);
      rows.push(row(rowNum, [
        cell(rowNum,0, c.name||'', styleCells,'s'),
        cell(rowNum,1, c.type||'sent', styleCells,'s'),
        cell(rowNum,2, c.date||'', 20,'s'),
        cell(rowNum,3, c.total||0, styleNum,'n'),
        cell(rowNum,4, c.errors||0, styleNum,'n'),
        cell(rowNum,5, rate, styleNum,'s'),
        cell(rowNum,6, c.status||'sent', statusSty,'s'),
        cell(rowNum,7, (c.tags||[]).join(', ')||'—', styleCells,'s'),
      ]));
    });

    var lastDataRow = 15 + recent.length;

    // Row after data: footer
    var footerRow = lastDataRow + 2;
    merges.push(mergeCell(footerRow,0,footerRow,7));
    rows.push(row(footerRow, [cell(footerRow,0,'Generated by Madbear Emails  ·  ' + exportDate + '  ·  madbear.io',4,'s')]));

    var colWidths = [
      {wch:32},{wch:14},{wch:14},{wch:10},{wch:10},{wch:15},{wch:14},{wch:24}
    ];

    return buildSheetXML(rows, merges, colWidths, null, null);
  }

  function buildCampaigns() {
    var rows = [];
    var merges = [];

    // Header
    merges.push(mergeCell(1,0,1,8));
    rows.push(row(1,[cell(1,0,'CAMPAIGNS',2,'s')]));
    rows.push(row(2,[
      cell(2,0,'Total: '+history.length+' campaigns',4,'s'),
      cell(2,2,'Sent: '+totalSent.toLocaleString(),9,'s'),
      cell(2,4,'Errors: '+totalErrors.toLocaleString(),10,'s'),
      cell(2,6,'Delivery: '+delivRate+'%',9,'s'),
    ]));
    rows.push(row(3,[]));

    var headers = ['Campaign Name','Type','Status','Tags','Date','Sent','Errors','Delivery Rate','Follow-ups / Drip'];
    rows.push(row(4, headers.map(function(h,i){ return cell(4,i,h,6,'s'); })));

    history.forEach(function(c,i) {
      var rn = 5 + i;
      var del = (c.total||0) - (c.errors||0);
      var rate = (c.total||0) > 0 ? ((del/(c.total||0))*100).toFixed(1)+'%' : '—';
      var altStyle  = i%2===0 ? 8 : 7;
      var numStyle  = i%2===0 ? 21 : 21;
      var statusSty = c.status==='sent' ? 9 : (c.status==='error'||c.errors>0 ? 10 : 11);
      var isFollowup = c.type === 'followup' || c.type === 'drip';
      rows.push(row(rn,[
        cell(rn,0,c.name||'',altStyle,'s'),
        cell(rn,1,c.type||'sent',altStyle,'s'),
        cell(rn,2,c.status||'sent',statusSty,'s'),
        cell(rn,3,(c.tags||[]).join(', ')||'—',altStyle,'s'),
        cell(rn,4,c.date||'',20,'s'),
        cell(rn,5,c.total||0,numStyle,'n'),
        cell(rn,6,c.errors||0,numStyle,'n'),
        cell(rn,7,rate,numStyle,'s'),
        cell(rn,8,isFollowup?(c.parentName||'parent'):'—',altStyle,'s'),
      ]));
    });

    var lastRow = 4 + history.length;
    var colWidths = [{wch:32},{wch:12},{wch:12},{wch:20},{wch:14},{wch:8},{wch:8},{wch:14},{wch:24}];
    // autofilter on header row
    return buildSheetXML(rows, merges, colWidths, 'A4:I4', {row:4,col:0});
  }

  function buildContacts() {
    var rows = [];
    var merges = [];

    var activeCount = contacts.filter(function(c){ return !c.unsubscribed && !c.inactive; }).length;
    var groups = {};
    contacts.forEach(function(c){ if(c.group) groups[c.group]=1; });
    var groupCount = Object.keys(groups).length;

    merges.push(mergeCell(1,0,1,6));
    rows.push(row(1,[cell(1,0,'CONTACTS',2,'s')]));

    rows.push(row(2,[
      cell(2,0,'Total: '+contacts.length,4,'s'),
      cell(2,2,'Active: '+activeCount,9,'s'),
      cell(2,4,'Groups: '+groupCount,4,'s'),
    ]));
    rows.push(row(3,[]));

    var headers = ['Name','Email','Group','Tags','Status','Added Date','Last Campaign'];
    rows.push(row(4, headers.map(function(h,i){ return cell(4,i,h,6,'s'); })));

    contacts.forEach(function(c,i){
      var rn = 5+i;
      var alt = i%2===0?8:7;
      var isActive = !c.unsubscribed && !c.inactive;
      var statusSty = isActive ? 9 : 10;
      var statusLbl = c.unsubscribed ? 'Unsubscribed' : c.inactive ? 'Inactive' : 'Active';
      rows.push(row(rn,[
        cell(rn,0,c.name||'',alt,'s'),
        cell(rn,1,c.email||'',alt,'s'),
        cell(rn,2,c.group||'—',alt,'s'),
        cell(rn,3,(c.tags||[]).join(', ')||'—',alt,'s'),
        cell(rn,4,statusLbl,statusSty,'s'),
        cell(rn,5,c.addedDate||c.createdAt||'—',20,'s'),
        cell(rn,6,c.lastCampaign||'—',alt,'s'),
      ]));
    });

    var colWidths = [{wch:24},{wch:30},{wch:16},{wch:20},{wch:14},{wch:14},{wch:24}];
    return buildSheetXML(rows, merges, colWidths, 'A4:G4', {row:4,col:0});
  }

  function buildAnalytics() {
    var rows = [];
    var merges = [];

    merges.push(mergeCell(1,0,1,5));
    rows.push(row(1,[cell(1,0,'ANALYTICS DASHBOARD',2,'s')]));
    merges.push(mergeCell(2,0,2,5));
    rows.push(row(2,[cell(2,0,'In-depth performance metrics for all campaigns',4,'s')]));
    rows.push(row(3,[]));

    // KPI summary block
    merges.push(mergeCell(4,0,4,5));
    rows.push(row(4,[cell(4,0,'SUMMARY METRICS',5,'s')]));

    var summaryPairs = [
      ['Total Emails Sent', totalSent],
      ['Total Delivered',   delivered],
      ['Total Errors',      totalErrors],
      ['Delivery Rate',     delivRate+'%'],
      ['Total Campaigns',   history.length],
      ['One-off Campaigns', history.filter(function(c){ return c.type!=='followup'&&c.type!=='drip'; }).length],
      ['Follow-up Campaigns', history.filter(function(c){ return c.type==='followup'; }).length],
      ['Drip Steps Sent',   history.filter(function(c){ return c.type==='drip'; }).length],
      ['Total Contacts',    contacts.length],
      ['Plan',              planLabel],
    ];

    summaryPairs.forEach(function(pair,i){
      var rn = 5+i;
      rows.push(row(rn,[
        cell(rn,0,pair[0],14,'s'),
        cell(rn,1,String(pair[1]),15,'s'),
      ]));
    });

    var afterSummary = 5 + summaryPairs.length + 1;
    rows.push(row(afterSummary,[]));

    // Per-campaign breakdown
    merges.push(mergeCell(afterSummary+1,0,afterSummary+1,5));
    rows.push(row(afterSummary+1,[cell(afterSummary+1,0,'CAMPAIGN PERFORMANCE BREAKDOWN',5,'s')]));

    var breakHeaders = ['Campaign','Type','Date','Sent','Delivered','Errors','Rate','Trend'];
    rows.push(row(afterSummary+2, breakHeaders.map(function(h,i){ return cell(afterSummary+2,i,h,6,'s'); })));

    var maxSentCamp = Math.max.apply(null, history.map(function(c){ return c.total||0; })) || 1;
    history.forEach(function(c,i){
      var rn = afterSummary+3+i;
      var del = (c.total||0)-(c.errors||0);
      var rate = (c.total||0)>0?((del/(c.total||0))*100).toFixed(1)+'%':'—';
      var alt = i%2===0?8:7;
      var num = i%2===0?21:21;
      var rateSty = parseFloat(rate)>=90?9:parseFloat(rate)>=70?11:10;
      var barLen = Math.round(((c.total||0)/maxSentCamp)*10);
      var trendBar = '█'.repeat(barLen) + '░'.repeat(10-barLen);
      rows.push(row(rn,[
        cell(rn,0,c.name||'',alt,'s'),
        cell(rn,1,c.type||'sent',alt,'s'),
        cell(rn,2,c.date||'',20,'s'),
        cell(rn,3,c.total||0,num,'n'),
        cell(rn,4,del,num,'n'),
        cell(rn,5,c.errors||0,num,'n'),
        cell(rn,6,rate,rateSty,'s'),
        cell(rn,7,trendBar,isNaN(parseFloat(rate))?12:rateSty,'s'),
      ]));
    });

    // AI summary block
    var footRow = afterSummary+3+history.length+2;
    merges.push(mergeCell(footRow,0,footRow,5));
    rows.push(row(footRow,[cell(footRow,0,'AI SUMMARY',5,'s')]));

    var aiText = '';
    if (history.length === 0) {
      aiText = 'No campaigns sent yet. Send your first campaign to start seeing analytics.';
    } else {
      var bestCamp = history.reduce(function(a,b){
        var ra=(a.total||0)>0?((a.total-a.errors)/a.total):0;
        var rb=(b.total||0)>0?((b.total-b.errors)/b.total):0;
        return rb>ra?b:a;
      }, history[0]);
      var avgRate = history.reduce(function(acc,c){
        return acc + ((c.total||0)>0?((c.total-(c.errors||0))/c.total)*100:0);
      }, 0) / history.length;
      aiText = 'Best campaign: "' + (bestCamp.name||'N/A') + '" · Avg delivery rate: ' + avgRate.toFixed(1) + '% · ' +
        (parseFloat(delivRate)>=90?'Excellent deliverability! Keep it up.':parseFloat(delivRate)>=75?'Good deliverability. Watch for high-error campaigns.':'Deliverability needs attention. Review your contact list.');
    }

    merges.push(mergeCell(footRow+1,0,footRow+1,5));
    rows.push(row(footRow+1,[cell(footRow+1,0,aiText,12,'s')]));

    var colWidths = [{wch:32},{wch:12},{wch:14},{wch:10},{wch:10},{wch:10},{wch:12},{wch:18}];
    return buildSheetXML(rows, merges, colWidths, null, null);
  }

  function buildRawData() {
    var rows = [];
    var headers = ['ID','Campaign Name','Type','Subject','Status','Tags','Date','Total Sent','Delivered','Errors','Delivery Rate (%)','Parent Campaign','Sheet ID','Sheet Tab'];
    rows.push(row(1, headers.map(function(h,i){ return cell(1,i,h,6,'s'); })));

    history.forEach(function(c,i){
      var rn = 2+i;
      var del = (c.total||0)-(c.errors||0);
      var rate = (c.total||0)>0?((del/(c.total||0))*100).toFixed(1):'0';
      rows.push(row(rn,[
        cell(rn,0,c.id||'',8,'s'),
        cell(rn,1,c.name||'',8,'s'),
        cell(rn,2,c.type||'sent',8,'s'),
        cell(rn,3,c.subject||'',8,'s'),
        cell(rn,4,c.status||'',8,'s'),
        cell(rn,5,(c.tags||[]).join('|'),8,'s'),
        cell(rn,6,c.date||'',8,'s'),
        cell(rn,7,c.total||0,21,'n'),
        cell(rn,8,del,21,'n'),
        cell(rn,9,c.errors||0,21,'n'),
        cell(rn,10,rate,21,'n'),
        cell(rn,11,c.parentName||'',8,'s'),
        cell(rn,12,c.sheetId||'',8,'s'),
        cell(rn,13,c.sheetTab||'',8,'s'),
      ]));
    });

    var colWidths = [{wch:20},{wch:28},{wch:12},{wch:30},{wch:10},{wch:16},{wch:12},{wch:10},{wch:10},{wch:8},{wch:16},{wch:24},{wch:24},{wch:16}];
    return buildSheetXML(rows, [], colWidths, 'A1:N1', {row:1,col:0});
  }

  // ── Low-level sheet XML builder ─────────────────────────────────────────────
  function buildSheetXML(rowsXML, merges, colWidths, autoFilterRef, freezePane) {
    var cols = '<cols>';
    colWidths.forEach(function(cw,i){
      cols += '<col min="'+(i+1)+'" max="'+(i+1)+'" width="'+cw.wch+'" customWidth="1"/>';
    });
    cols += '</cols>';

    var sheetData = '<sheetData>' + rowsXML.join('') + '</sheetData>';

    var mergeCells = merges.length
      ? '<mergeCells count="'+merges.length+'">' + merges.join('') + '</mergeCells>'
      : '';

    var autoFilter = autoFilterRef
      ? '<autoFilter ref="' + autoFilterRef + '"/>'
      : '';

    var pane = '';
    if (freezePane) {
      var fp = freezePane;
      pane = '<sheetViews><sheetView workbookViewId="0"><pane ySplit="' + fp.row + '" topLeftCell="' + cellRef(fp.row+1, fp.col) + '" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>';
    } else {
      pane = '<sheetViews><sheetView workbookViewId="0"/></sheetViews>';
    }

    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"' +
      ' xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
      pane + cols + sheetData + mergeCells + autoFilter +
      '</worksheet>';
  }

  // ── Shared Strings XML ──────────────────────────────────────────────────────
  function buildSST() {
    // Build SST AFTER all sheets so _sst is populated
    var items = _sst.map(function(s){
      return '<si><t xml:space="preserve">' + xmlEsc(s) + '</t></si>';
    });
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="' + items.length + '" uniqueCount="' + items.length + '">' +
      items.join('') + '</sst>';
  }

  // ── Build all sheet XML (order matters — ss() calls populate SST) ───────────
  var sheetXMLs = {
    overview:  buildOverview(),
    campaigns: buildCampaigns(),
    contacts:  buildContacts(),
    analytics: buildAnalytics(),
    raw:       buildRawData(),
  };
  var sstXML = buildSST();
  var stylesXML = buildStyles();

  // ── Workbook XML ────────────────────────────────────────────────────────────
  var workbookXML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"' +
    ' xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
    '<sheets>' +
      '<sheet name="Overview"  sheetId="1" r:id="rId1"/>' +
      '<sheet name="Campaigns" sheetId="2" r:id="rId2"/>' +
      '<sheet name="Contacts"  sheetId="3" r:id="rId3"/>' +
      '<sheet name="Analytics" sheetId="4" r:id="rId4"/>' +
      '<sheet name="Raw_Data"  sheetId="5" r:id="rId5"/>' +
    '</sheets>' +
    '</workbook>';

  var workbookRels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>' +
      '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/>' +
      '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet3.xml"/>' +
      '<Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet4.xml"/>' +
      '<Relationship Id="rId5" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet5.xml"/>' +
      '<Relationship Id="rId6" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/>' +
      '<Relationship Id="rId7" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>' +
    '</Relationships>';

  var relsXML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>' +
    '</Relationships>';

  var contentTypesXML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
      '<Default Extension="xml"  ContentType="application/xml"/>' +
      '<Override PartName="/xl/workbook.xml"           ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>' +
      '<Override PartName="/xl/worksheets/sheet1.xml"  ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>' +
      '<Override PartName="/xl/worksheets/sheet2.xml"  ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>' +
      '<Override PartName="/xl/worksheets/sheet3.xml"  ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>' +
      '<Override PartName="/xl/worksheets/sheet4.xml"  ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>' +
      '<Override PartName="/xl/worksheets/sheet5.xml"  ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>' +
      '<Override PartName="/xl/sharedStrings.xml"      ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>' +
      '<Override PartName="/xl/styles.xml"             ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>' +
    '</Types>';

  // ── ZIP builder (pure JS, stored/no-compression, no eval) ──────────────────
  function strToBytes(str) {
    var bytes = [];
    for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      if (c < 128) {
        bytes.push(c);
      } else if (c < 2048) {
        bytes.push(0xC0|(c>>6), 0x80|(c&0x3F));
      } else {
        bytes.push(0xE0|(c>>12), 0x80|((c>>6)&0x3F), 0x80|(c&0x3F));
      }
    }
    return new Uint8Array(bytes);
  }

  function crc32(buf) {
    var table = crc32.table;
    if (!table) {
      table = new Uint32Array(256);
      for (var n=0;n<256;n++){
        var c=n;
        for(var k=0;k<8;k++) c=((c&1)?0xEDB88320^(c>>>1):(c>>>1));
        table[n]=c;
      }
      crc32.table = table;
    }
    var crc = 0xFFFFFFFF;
    for (var i=0;i<buf.length;i++) crc=table[(crc^buf[i])&0xFF]^(crc>>>8);
    return (crc^0xFFFFFFFF)>>>0;
  }

  function uint32LE(n) {
    return [n&0xFF,(n>>8)&0xFF,(n>>16)&0xFF,(n>>24)&0xFF];
  }
  function uint16LE(n) {
    return [n&0xFF,(n>>8)&0xFF];
  }

  function buildZIP(files) {
    // files = [{name, data (Uint8Array)}]
    var parts = [];
    var centralDir = [];
    var offset = 0;

    files.forEach(function(file) {
      var nameBytes = strToBytes(file.name);
      var data      = file.data;
      var crc       = crc32(data);
      var size      = data.length;
      var dosDate   = 0x4A31; // 2025-01-17 packed
      var dosTime   = 0x0000;

      // Local file header
      var lfh = [].concat(
        [0x50,0x4B,0x03,0x04], // signature
        uint16LE(20),           // version needed
        uint16LE(0),            // flags
        uint16LE(0),            // compression (stored)
        uint16LE(dosTime),
        uint16LE(dosDate),
        uint32LE(crc),
        uint32LE(size),
        uint32LE(size),
        uint16LE(nameBytes.length),
        uint16LE(0)             // extra field length
      );
      for (var i=0;i<nameBytes.length;i++) lfh.push(nameBytes[i]);

      var localHeaderOffset = offset;
      parts.push(new Uint8Array(lfh));
      parts.push(data);
      offset += lfh.length + size;

      // Central directory entry
      var cde = [].concat(
        [0x50,0x4B,0x01,0x02], // signature
        uint16LE(20),           // version made by
        uint16LE(20),           // version needed
        uint16LE(0),            // flags
        uint16LE(0),            // compression
        uint16LE(dosTime),
        uint16LE(dosDate),
        uint32LE(crc),
        uint32LE(size),
        uint32LE(size),
        uint16LE(nameBytes.length),
        uint16LE(0),            // extra length
        uint16LE(0),            // comment length
        uint16LE(0),            // disk start
        uint16LE(0),            // internal attrs
        uint32LE(0),            // external attrs
        uint32LE(localHeaderOffset)
      );
      for (var j=0;j<nameBytes.length;j++) cde.push(nameBytes[j]);
      centralDir.push(new Uint8Array(cde));
    });

    // End of central directory
    var cdOffset = offset;
    var cdSize   = 0;
    centralDir.forEach(function(cd){ cdSize += cd.length; });

    var eocd = [].concat(
      [0x50,0x4B,0x05,0x06], // signature
      uint16LE(0),            // disk number
      uint16LE(0),            // disk with CD
      uint16LE(files.length),
      uint16LE(files.length),
      uint32LE(cdSize),
      uint32LE(cdOffset),
      uint16LE(0)             // comment length
    );

    // Combine everything
    var totalLen = 0;
    parts.forEach(function(p){ totalLen += p.length; });
    centralDir.forEach(function(p){ totalLen += p.length; });
    totalLen += eocd.length;

    var out = new Uint8Array(totalLen);
    var pos = 0;
    function write(arr) { out.set(arr, pos); pos += arr.length; }
    parts.forEach(write);
    centralDir.forEach(write);
    write(new Uint8Array(eocd));
    return out;
  }

  // ── Assemble and download ───────────────────────────────────────────────────
  var files = [
    { name: '[Content_Types].xml',        data: strToBytes(contentTypesXML) },
    { name: '_rels/.rels',                data: strToBytes(relsXML) },
    { name: 'xl/workbook.xml',            data: strToBytes(workbookXML) },
    { name: 'xl/_rels/workbook.xml.rels', data: strToBytes(workbookRels) },
    { name: 'xl/styles.xml',              data: strToBytes(stylesXML) },
    { name: 'xl/sharedStrings.xml',       data: strToBytes(sstXML) },
    { name: 'xl/worksheets/sheet1.xml',   data: strToBytes(sheetXMLs.overview) },
    { name: 'xl/worksheets/sheet2.xml',   data: strToBytes(sheetXMLs.campaigns) },
    { name: 'xl/worksheets/sheet3.xml',   data: strToBytes(sheetXMLs.contacts) },
    { name: 'xl/worksheets/sheet4.xml',   data: strToBytes(sheetXMLs.analytics) },
    { name: 'xl/worksheets/sheet5.xml',   data: strToBytes(sheetXMLs.raw) },
  ];

  var zipBytes = buildZIP(files);
  var blob = new Blob([zipBytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'madbear-report-' + mbDateStr() + '.xlsx';
  a.click();
  URL.revokeObjectURL(url);
}

function mbShowExportModal() {
  var existing = document.getElementById('mb-export-modal');
  if (existing) existing.remove();

  var isDark = S.theme === 'dark';
  var bg     = isDark ? '#1f2123' : '#ffffff';
  var bg2    = isDark ? '#161719' : '#f8f7f4';
  var border = isDark ? '#2a2c2e' : '#e5e3de';
  var ink    = isDark ? '#f1f0ec' : '#1a1a18';
  var ink2   = isDark ? '#c8c5bc' : '#3a3835';
  var muted  = isDark ? '#6b7280' : '#8b8580';
  var rowBg  = isDark ? '#0f1011' : '#f3f2ef';
  var rowBdr = isDark ? '#222426' : '#e9e7e2';
  var green  = '#2f9e52';
  var greenBg= isDark ? '#0b2016' : '#e8f5ee';
  var mono   = '"SF Mono",ui-monospace,monospace';
  var sans   = '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif';

  var contacts = S.contacts || [];
  var campaigns = S.campaigns || S.history || [];
  var stats = S.stats || {};
  var totalSent = stats.sent || 0;
  var totalErrors = stats.errors || 0;
  var delivered = totalSent - totalErrors;
  var rate = totalSent > 0 ? ((delivered / totalSent) * 100).toFixed(1) + '%' : '—';

  function stat(label, value) {
    return '<div style="text-align:center;flex:1"><div style="font-size:20px;font-weight:700;color:' + ink + ';font-family:' + mono + ';letter-spacing:-0.5px">' + value + '</div><div style="font-size:11px;color:' + muted + ';margin-top:3px;font-family:' + sans + '">' + label + '</div></div>';
  }

  function row(title, desc, action, badge, primary, icon) {
    var rBtnBg  = primary ? green : (isDark ? '#2b2f31' : '#eeedea');
    var rBtnBdr = primary ? green : border;
    var rBtnClr = primary ? '#fff' : ink;
    var rBadgeBg  = primary ? greenBg : (isDark ? '#1a1c1e' : '#eeedea');
    var rBadgeClr = primary ? green : muted;
    return '<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:' + rowBg + ';border:1px solid ' + rowBdr + ';border-radius:10px;font-family:' + sans + '">' +
      '<span style="font-size:20px;flex-shrink:0;width:28px;text-align:center;line-height:1">' + (icon||'📄') + '</span>' +
      '<div style="flex:1;min-width:0">' +
        '<div style="font-weight:600;font-size:13.5px;color:' + ink + ';margin-bottom:3px">' + title + '</div>' +
        '<div style="font-size:12px;color:' + muted + ';overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + desc + '</div>' +
      '</div>' +
      '<span style="font-family:' + mono + ';font-size:10px;font-weight:700;padding:3px 8px;border-radius:5px;background:' + rBadgeBg + ';color:' + rBadgeClr + ';flex-shrink:0">' + badge + '</span>' +
      '<button data-action="' + action + '" style="padding:7px 16px;border-radius:8px;border:1px solid ' + rBtnBdr + ';background:' + rBtnBg + ';color:' + rBtnClr + ';font-size:12.5px;font-weight:600;cursor:pointer;white-space:nowrap;flex-shrink:0;font-family:' + sans + '">Download</button>' +
    '</div>';
  }

  var modal = document.createElement('div');
  modal.id = 'mb-export-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.6);backdrop-filter:blur(8px)';

  modal.innerHTML =
    '<div style="background:' + bg + ';border:1.5px solid ' + border + ';border-radius:18px;width:560px;max-width:96vw;box-shadow:0 32px 80px rgba(0,0,0,0.5);overflow:hidden;font-family:' + sans + '">' +

      // Header
      '<div style="padding:20px 24px 16px;border-bottom:1px solid ' + border + ';display:flex;align-items:flex-start;justify-content:space-between">' +
        '<div>' +
          '<div style="font-size:18px;font-weight:700;color:' + ink + ';letter-spacing:-0.4px">Export data</div>' +
          '<div style="font-size:12.5px;color:' + muted + ';margin-top:3px">All files download instantly to your computer</div>' +
        '</div>' +
        '<button id="mb-export-close" style="background:' + rowBg + ';border:1px solid ' + border + ';border-radius:8px;cursor:pointer;color:' + muted + ';font-size:18px;line-height:1;width:32px;height:32px;display:flex;align-items:center;justify-content:center">✕</button>' +
      '</div>' +

      // Stats bar
      '<div style="padding:16px 24px;background:' + bg2 + ';border-bottom:1px solid ' + border + ';display:flex;gap:0;justify-content:space-around">' +
        stat('Emails sent', totalSent.toLocaleString()) +
        '<div style="width:1px;background:' + border + ';margin:4px 0"></div>' +
        stat('Delivered', delivered.toLocaleString()) +
        '<div style="width:1px;background:' + border + ';margin:4px 0"></div>' +
        stat('Delivery rate', rate) +
        '<div style="width:1px;background:' + border + ';margin:4px 0"></div>' +
        stat('Campaigns', campaigns.length) +
        '<div style="width:1px;background:' + border + ';margin:4px 0"></div>' +
        stat('Contacts', contacts.length) +
      '</div>' +

      // Export rows
      '<div style="padding:18px 24px;display:flex;flex-direction:column;gap:8px">' +
        '<div style="font-size:10.5px;font-weight:700;letter-spacing:0.1em;color:' + muted + ';text-transform:uppercase;margin-bottom:4px">Choose export</div>' +
        row('Contacts list', contacts.length + ' contacts · name, email, tags, groups, custom fields', 'db-export-contacts-csv', 'CSV', false, '👤') +
        row('Campaigns summary', campaigns.length + ' campaigns · name, type, subject, sent, errors, rate', 'db-export-campaigns-csv', 'CSV', false, '📤') +
        row('Send history', 'Full send log with per-email status and timestamps', 'db-export-history-csv', 'CSV', false, '📋') +
        row('Analytics report', 'Summary stats + per-campaign breakdown with delivery rates', 'db-export-analytics-csv', 'CSV', false, '📊') +
        '<div style="height:1px;background:' + border + ';margin:2px 0"></div>' +
        row('Analytics Dashboard', '5-sheet premium report · KPIs, campaigns, contacts, analytics', 'db-export-xlsx', 'XLSX', true, '✦') +
        row('Full backup', 'Everything — contacts, campaigns, history, drip steps, settings', 'db-export-full-json', 'JSON', false, '💾') +
      '</div>' +
    '</div>';

  document.body.appendChild(modal);

  document.getElementById('mb-export-close').onclick = function() { modal.remove(); };
  modal.addEventListener('click', function(e) { if (e.target === modal) modal.remove(); });

  modal.querySelectorAll('[data-action]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var act = btn.getAttribute('data-action');
      modal.remove();
      if (act === 'db-export-contacts-csv') mbExportContactsCSV();
      else if (act === 'db-export-campaigns-csv') mbExportCampaignsCSV();
      else if (act === 'db-export-history-csv') mbExportHistoryCSV();
      else if (act === 'db-export-analytics-csv') mbExportAnalyticsCSV();
      else if (act === 'db-export-full-json') mbExportFullJSON();
      else if (act === 'db-export-xlsx') mbExportXLSX();
    });
  });
}

function dbGetLast7DaysSends() {
  var result = [];
  var now = new Date();
  var hist = S.history || [];
  var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  for (var i = 6; i >= 0; i--) {
    var d = new Date(now); d.setDate(d.getDate() - i);
    var label = days[d.getDay()];
    var sent = 0;
    hist.forEach(function(c) {
      if (!c.date) return;
      var cd = new Date(c.date);
      if (cd.toDateString() === d.toDateString()) sent += (c.total || 0);
    });
    result.push({label: label, value: sent});
  }
  return result;
}


function vHome() {
  let out = "";
  out += '<div class="hero">';
  out += '<div class="hero-top"><div class="hero-copy">';
  out += '<div class="hero-eyebrow">' + t("home.eyebrow") + '</div>';
  out += '<div class="hero-title">' + t("home.title") + '</div>';
  out += '<div class="hero-sub">' + t("home.sub") + '</div>';
  out += '</div>';
  out += '<div class="hero-actions">';
  out += '<button class="btn btn-pri" data-action="start-campaign">' + t("home.newCampaign") + '</button>';
  if (S.hasSavedDraft) {
    out += '<button class="btn btn-ghost" data-action="resume-draft">' + t("home.resumeDraft") + '</button>';
  }
  if (S.billing.activePlan === "premium") {
    out += '<button class="btn btn-ghost" data-action="open-drip" title="Send a multi-step drip sequence to previous campaign contacts">📬 Drip Sequence</button>';
  }
  out += "</div></div>";

  // Background / scheduled send status banner
  out += renderBgSendBanner();
  out += '<div class="hero-note"><span class="hero-note-main">' + t("home.recentNote") + '</span><br><span class="hero-note-limits">' + t("home.gmailLimits") + '</span></div>';
  out += "</div>";

  out += '<div class="stats compact">';
  out += '<div class="stat"><span class="stat-n">' + S.stats.sent + '</span><span class="stat-l">' + t("home.emailsSent") + '</span></div>';
  out += '<div class="stat"><span class="stat-n">' + (S.billing.remainingToday === -1 ? '∞' : S.billing.remainingToday) + '</span><span class="stat-l">' + t("home.remainingToday") + '</span></div>';
  out += '<div class="stat"><span class="stat-n">' + S.history.length + '</span><span class="stat-l">' + t("home.campaignsSent") + '</span></div>';
  out += "</div>";

  out += section(
    "recent",
    t("home.recentCampaigns"),
    t("home.recentSub"),
    recentCampaignsPanel()
  );
  return out;
}

function recentCampaignsPanel() {
  let out = "";
  if (!S.history.length) {
    out += '<div class="empty compact-empty">' + t("home.noCampaigns") + '</div>';
  } else {
    const visible = S.history.slice(0, 3);
    out += '<div class="history-list">';
    for (let i = 0; i < visible.length; i += 1) {
      const campaign = visible[i];
      const rawSheetName = campaign.sheetName || "";
      const isRawId = !rawSheetName || rawSheetName === campaign.sheetId || /^[a-zA-Z0-9_-]{20,}$/.test(rawSheetName);
      const sheetLabel = isRawId ? "Google Sheet" : rawSheetName;
      const sentCount = (campaign.results || []).filter(function(r) { return r.status === "SENT"; }).length;
      out += '<div class="history-card">';
      // Top row: title + delete
      out += '<div class="history-top">';
      out += '<div class="history-title">' + esc(campaign.subject || campaign.name || t("card.untitled")) + "</div>";
      out += '<button class="btn history-delete-btn" data-action="delete-campaign" data-id="' + escAttr(campaign.id) + '" title="Delete">✕</button>';
      out += '</div>';
      // Meta row: sheet name + date + sent count
      out += '<div class="history-sub">';
      out += '<span class="history-sheet-tag">' + esc(sheetLabel) + '</span>';
      out += '<span class="history-dot">·</span>';
      out += '<span>' + esc(formatDateOnly(campaign.createdAt)) + '</span>';
      if (sentCount > 0) {
        out += '<span class="history-dot">·</span>';
        out += '<span>' + sentCount + ' ' + t("card.sent") + '</span>';
      }
      out += '</div>';
      // Actions row
      out += '<div class="history-actions">';
      if (S.billing.activePlan === "premium") {
        out += '<button class="btn btn-pri btn-mini" data-action="start-followup" data-id="' + escAttr(campaign.id) + '">' + t("card.followup") + '</button>';
      } else {
        out += '<button class="btn btn-pri btn-mini" data-action="open-upgrade" data-plan="premium" title="' + t("card.followupLockedTitle") + '" style="opacity:0.6">' + t("card.followupLocked") + '</button>';
      }
      out += '<button class="btn btn-sec btn-mini" data-action="duplicate-campaign" data-id="' + escAttr(campaign.id) + '">' + t("card.duplicate") + '</button>';
      out += '<button class="btn btn-ghost btn-mini" data-action="view-campaign-results" data-id="' + escAttr(campaign.id) + '">' + t("card.view") + '</button>';
      out += "</div>";
      out += "</div>";
    }
    out += "</div>";
  }
  return out;
}

function vSettings() {
  // ── Quick controls bar: Theme · Aa · Language ─────────────────────
  const themeIcon = S.theme === "dark"
    ? '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'
    : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';

  let out = '<div class="stitle">Settings</div>';

  // Quick-access row
  out += '<div style="display:flex;align-items:center;gap:6px;margin-bottom:14px;padding:10px 12px;background:var(--bg2);border:1px solid var(--bd);border-radius:var(--radius-lg)">';
  out += '<span style="font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--tx3);font-family:var(--font-mono);flex:1">Appearance</span>';

  // Theme toggle
  out += '<button class="hdr-btn" data-action="toggle-theme" title="Toggle theme" style="width:32px;height:32px;border-radius:8px;border:1px solid var(--bd);background:var(--bg3)">';
  out += '<svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" fill="none" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' + themeIcon + '</svg>';
  out += '</button>';

  // Aa font picker toggle
  const aaActive = S.settingsShowFonts;
  out += '<button class="hdr-btn" data-action="toggle-fonts" title="Font" style="width:32px;height:32px;border-radius:8px;border:1px solid ' + (aaActive ? 'var(--acc)' : 'var(--bd)') + ';background:' + (aaActive ? 'var(--acc-soft)' : 'var(--bg3)') + ';font-size:13px;font-weight:700;letter-spacing:-0.02em;color:' + (aaActive ? 'var(--acc)' : 'var(--tx2)') + '">Aa</button>';

  // Language badge (only Russian is available)
  out += '<div style="display:flex;align-items:center;height:32px;padding:0 10px;border-radius:8px;border:1px solid var(--bd);background:var(--bg3);color:var(--tx2);font-size:11px;font-weight:700;letter-spacing:0.04em;font-family:var(--font-mono)">' + esc(LANGUAGES[0].label) + '</div>';

  out += '</div>';

  // Font picker — expands inline only when Aa is active
  if (S.settingsShowFonts) {
    out += '<div style="margin-bottom:14px">' + settingsAppearancePanel() + '</div>';
  }

  // Tab bar (backends, billing, guide, about only)
  out += '<div class="seg" style="margin-bottom:14px">';
  out += '<button class="seg-btn' + (S.settingsTab === "backends" ? " active" : "") + '" data-action="set-settings-tab" data-tab="backends">' + t("tab.backends") + '</button>';
  out += '<button class="seg-btn' + (S.settingsTab === "billing"  ? " active" : "") + '" data-action="set-settings-tab" data-tab="billing">'  + t("tab.billing")  + '</button>';
  out += '<button class="seg-btn' + (S.settingsTab === "guide"    ? " active" : "") + '" data-action="set-settings-tab" data-tab="guide">'    + t("tab.guide")    + '</button>';
  out += '<button class="seg-btn' + (S.settingsTab === "about"    ? " active" : "") + '" data-action="set-settings-tab" data-tab="about">'    + t("tab.about")    + '</button>';
  out += "</div>";

  if (S.settingsTab === "backends") return out + settingsBackendsPanel();
  if (S.settingsTab === "billing")  return out + settingsBillingPanel();
  if (S.settingsTab === "guide")    return out + settingsGuidePanel();
  return out + settingsAboutPanel();
}

function settingsBackendsPanel() {
  let out = '<div class="panel"><div class="panel-title">' + t("backends.title") + '</div><div class="panel-sub">' + t("backends.sub") + '</div>';
  out += '<div class="btn-row" style="margin-bottom:12px"><button class="btn btn-ghost btn-mini" data-action="set-settings-tab" data-tab="guide">' + t("backends.howTo") + '</button></div>';
  out += '<div class="note"><strong>' + t("backends.allowance") + '</strong> ' + esc(formatBackendLimit(S.billing.backendLimit)) + "</div>";
  out += '<div class="note">' + t("backends.whatIs") + '</div>';
  out += '<div class="field" style="margin-top:14px"><label class="label">' + t("backends.emailLabel") + '</label>';
  out += '<input class="inp" id="backendEmailInput" type="email" value="" placeholder="' + escAttr(t("backends.emailPlaceholder")) + '">';
  out += '<span class="hint">' + t("backends.emailHint") + '</span></div>';
  out += '<div class="field"><label class="label">' + t("backends.urlLabel") + '</label>';
  out += '<input class="inp" id="urlInput" type="text" value="" placeholder="' + escAttr(t("backends.urlPlaceholder")) + '">';
  out += '<span class="hint">' + t("backends.urlHint") + '</span></div>';
  out += '<div class="btn-row"><button class="btn btn-pri btn-mini" data-action="add-backend">' + t("backends.addBtn") + '</button></div>';
  if (!S.scriptUrls.length) {
    out += '<div class="empty compact-empty">' + t("backends.none") + '</div>';
  } else {
    out += '<div class="draft-list" style="margin-top:12px">';
    for (let i = 0; i < S.scriptUrls.length; i += 1) {
      const url = S.scriptUrls[i];
      const isActive = (typeof url === "object" ? url.url : url) === S.scriptUrl;
      const backendEntry = typeof url === "object" ? url : { url: url, email: "" };
      const backendUrl = backendEntry.url || url;
      const backendEmail = backendEntry.email || "";
      out += '<div class="draft-card"><div style="min-width:0;flex:1">';
      if (backendEmail) {
        out += '<div class="draft-subject">' + esc(backendEmail) + '</div>';
        out += '<div class="draft-meta" style="font-size:10px;margin-top:2px">' + esc(shortUrlLabel(backendUrl)) + '</div>';
      } else {
        out += '<div class="draft-subject">' + esc(shortUrlLabel(backendUrl)) + '</div>';
      }
      out += '<div class="draft-meta">' + (isActive ? '<span class="dot dot-grn"></span>' + t("backends.active") : t("backends.saved")) + '</div></div>';
      out += '<div class="btn-row"><button class="btn btn-sec btn-mini" data-action="select-backend" data-index="' + i + '">' + t("backends.use") + '</button><button class="btn btn-danger btn-mini" data-action="remove-backend" data-index="' + i + '">' + t("backends.remove") + '</button></div></div>';
    }
    out += "</div>";
  }
  out += "</div>";
  return out;
}

function settingsBillingPanel() {
  return '<div class="panel"><div class="panel-title">Бесплатный доступ</div><div class="panel-sub">Все функции расширения доступны бесплатно. Оплата, подписки и ограничения расширения отключены. Соблюдайте ограничения отправки Google/Gmail.</div></div>';
}

function settingsAppearancePanel() {
  let out = '<div class="panel">';
  out += '<div class="panel-title">' + t("appearance.title") + '</div>';
  out += '<div class="panel-sub">' + t("appearance.sub") + '</div>';
  out += '<div class="font-grid">';
  for (let i = 0; i < FONT_PRESETS.length; i += 1) {
    const p = FONT_PRESETS[i];
    const isActive = S.font === p.key;
    out += '<button class="font-card' + (isActive ? " active" : "") + '" data-action="set-font" data-font="' + p.key + '">';
    out += '<span class="font-card-name">' + esc(p.label) + '</span>';
    out += '<span class="font-card-preview" style="font-family:' + escAttr(p.family) + '">Aa ' + esc(p.label) + '</span>';
    out += '</button>';
  }
  out += '</div>';
  out += '</div>';
  return out;
}

function setFont(key) {
  S.font = key;
  chrome.storage.local.set({ mb_font: key });
  render();
}


function settingsGuidePanel() {
  let out = "";

  // ── Privacy & trust notice ────────────────────────────────────────
  out += '<div style="background:var(--bg2);border:1px solid var(--bd);border-radius:var(--radius-lg);padding:14px 16px;margin-bottom:16px">';
  out += '<div style="font-size:13px;font-weight:700;color:var(--tx);margin-bottom:6px">' + t("guide.privacy.title") + '</div>';
  out += '<div style="font-size:12px;color:var(--tx2);line-height:1.7">' + t("guide.privacy.body") + '</div>';
  out += '</div>';

  out += '<div class="note" style="margin-bottom:14px">' + t("guide.sendLimits") + '</div>';

  out += guideSection("guidecopy", t("guide.step1.title"), t("guide.step1.sub"),
    '<div class="note">' + t("guide.step1.body") + '</div>' +
    '<div class="btn-row" style="margin-top:10px"><button class="btn btn-pri btn-mini" data-action="copy-backend-code">' + t("guide.step1.btn") + '</button></div>'
  );

  out += guideSection("guidecreate", t("guide.step2.title"), t("guide.step2.sub"),
    '<div class="note">' + t("guide.step2.body") + '</div>'
  );

  out += guideSection("guidedeploy", t("guide.step3.title"), t("guide.step3.sub"),
    '<div class="note">' + t("guide.step3.body") + '</div>'
  );

  out += guideSection("guideurl", t("guide.step4.title"), t("guide.step4.sub"),
    '<div class="note">' + t("guide.step4.body") + '</div>'
  );

  out += guideSection("guideuse", t("guide.step5.title"), t("guide.step5.sub"),
    '<div class="note">' + t("guide.step5.body") + '</div>'
  );

  out += guideSection("guidefollowup", t("guide.followup.title"), t("guide.followup.sub"),
    '<div class="note">' + t("guide.followup.body") + '</div>'
  );

  out += guideSection("guidefaq", t("guide.faq.title"), t("guide.faq.sub"),
    '<div class="note">' + t("guide.faq.body") + '</div>'
  );
  return out;
}

// Guide section: only one open at a time (mutually exclusive)
function guideSection(key, title, subtitle, body) {
  const GUIDE_KEYS = ["guidecopy", "guidecreate", "guidedeploy", "guideauth", "guideurl", "guideuse", "guidefollowup", "guidefaq"];
  const isOpen = !!S.sectionOpen[key];
  let out = '<div class="panel accordion' + (isOpen ? " open" : "") + '">';
  out += '<button class="accordion-head" data-action="toggle-guide-section" data-section="' + key + '" data-guide-keys="' + GUIDE_KEYS.join(",") + '">';
  out += '<span class="accordion-copy"><span class="panel-title">' + esc(title) + '</span><span class="panel-sub">' + esc(subtitle) + "</span></span>";
  out += '<span class="accordion-icon">' + (isOpen ? "−" : "+") + "</span></button>";
  if (isOpen) {
    out += '<div class="accordion-body">' + body + "</div>";
  }
  out += "</div>";
  return out;
}

function settingsAboutPanel() {
  let out = '<div class="panel"><div class="panel-title">' + t("about.title") + '</div><div class="panel-sub">' + t("about.sub") + '</div><div class="note"><strong>Website:</strong> <a href="' + escAttr(S.billing.config.websiteUrl || "https://madbear.io") + '" target="_blank" class="lnk">madbear.io</a><br><strong>Support:</strong> <a href="mailto:' + escAttr(S.billing.config.supportEmail || "hello@madbear.io") + '" class="lnk">' + esc(S.billing.config.supportEmail || "hello@madbear.io") + "</a></div></div>";
  out += '<div class="panel"><div class="panel-title">' + t("about.privacy.title") + '</div>';
  out += '<div class="note">' + t("about.privacy1") + '</div>';
  out += '<div class="note">' + t("about.privacy2") + '</div>';
  out += '<div class="note">' + t("about.privacy3") + '</div>';
  out += '</div>';
  out += '<div class="panel"><div class="panel-title">' + t("about.connection.title") + '</div><div class="panel-sub">' + t("about.connection.sub") + '</div><div class="code-box" style="margin-top:8px">' + esc(S.scriptUrl || t("about.noBackend")) + "</div></div>";
  return out;
}

function vGuide() {
  return '<div class="guide">' +
    step(1, "Deploy the backend", 'Paste <code>apps-script-backend.js</code> into <a href="https://script.google.com" target="_blank" class="lnk">Apps Script</a> and deploy it as a Web app.') +
    step(2, "Authorize it once", "Approve Gmail, Drive, and Sheets access in the same Google account you want to send from.") +
    step(3, "Load the extension", "Open chrome://extensions, turn on Developer mode, and load this folder unpacked.") +
    step(4, "Compose or load a draft", "Write from scratch or load a Gmail draft as a starting point.") +
    step(5, "Use merge tags", "Click merge fields in the compose panel to insert values from your sheet.") +
    step(6, "Test before sending", "Test mode sends only to your test email and does not mark rows as SENT.") +
    "</div>";
}

function vSheets() {
  let out = '<div class="panel">';
  out += '<div class="panel-title">' + t("sheets.title") + '</div>';
  out += '<div class="panel-sub">' + t("sheets.sub") + '</div>';
  out += '<div class="note">' + t("sheets.privacy") + '</div>';
  out += '<div class="field"><label class="label">' + t("sheets.nameLabel") + '</label>';
  out += '<input class="inp" id="sheetCustomNameInput" type="text" placeholder="' + escAttr(t("sheets.namePlaceholder")) + '">';
  out += '<span class="hint">' + t("sheets.nameHint") + '</span>';
  out += '</div>';
  out += '<div class="field"><label class="label">' + t("sheets.urlLabel") + '</label>';
  out += '<input class="inp" id="sheetUrlInput" type="text" placeholder="' + escAttr(t("sheets.urlPlaceholder")) + '">';
  out += '</div>';
  out += '<div class="btn-row"><button class="btn btn-pri btn-mini" data-action="connect-sheet">' + t("sheets.connectBtn") + '</button></div>';
  out += '</div>';

  if (S.sheets.length > 0) {
    out += '<div class="panel-title" style="margin:12px 0 6px">' + t("sheets.recentTitle") + '</div>';
    out += '<div class="list">';
    for (let i = 0; i < S.sheets.length; i += 1) {
      const sheet = S.sheets[i];
      // If name looks like a raw spreadsheet ID (no spaces, very long), show truncated
      const isRawId = sheet.name === sheet.id || /^[a-zA-Z0-9_-]{20,}$/.test(sheet.name);
      const displayName = isRawId ? ("Sheet · " + sheet.name.slice(0, 12) + "…") : sheet.name;
      out += '<button class="item" data-action="pick-sheet" data-index="' + i + '">' +
        '<span class="item-name">' + esc(displayName) + '</span>' +
        '<span class="item-meta">' + esc(timeAgo(sheet.modified)) + '</span>' +
        '</button>';
    }
    out += '</div>';
  }
  return out;
}

function vCompose() {
  const headers = getHeaders();
  const recipientCount = Math.max(S.sheetData.length - 1, 0);
  const preview = getPreviewExample();
  const draftCount = S.drafts.length;
  const isContactsCampaign = S.selectedSheet && S.selectedSheet.id === "contacts";
  const composeSummary = S.selectedSheet
    ? isContactsCampaign
      ? esc(S.selectedSheet.name) + " · " + recipientCount + " contacts"
      : esc(S.selectedSheet.name) + " · " + esc(S.selectedTab || "Sheet") + " · " + recipientCount + " recipients"
    : "Loading campaign details...";

  // Find the email label for the active backend
  const activeBackendEntry = S.scriptUrls.find(function(e) {
    return (typeof e === "object" ? e.url : e) === S.scriptUrl;
  });
  const activeBackendEmail = activeBackendEntry && typeof activeBackendEntry === "object" && activeBackendEntry.email
    ? activeBackendEntry.email
    : (S.scriptUrl ? shortUrlLabel(S.scriptUrl) : "Not selected");

  let out = '<div class="summary tight">';
  out += '<div class="sum-row"><span>' + t("compose.campaign") + '</span><span>' + composeSummary + "</span></div>";
  out += '<div class="sum-row"><span>' + t("compose.template") + '</span><span>' + esc(S.selectedDraft ? S.selectedDraft.subject : t("compose.manualEmail")) + "</span></div>";
  out += '<div class="sum-row"><span>' + t("compose.saved") + '</span><span>' + esc(S.draftSavedAt ? timeAgo(S.draftSavedAt) : t("compose.notYet")) + "</span></div>";
  out += '<div class="sum-row"><span>' + t("compose.gmailAccount") + '</span><span>' + esc(activeBackendEmail) + "</span></div>";
  out += "</div>";

  if (!isContactsCampaign && S.sheetTabs.length > 1) {
    out += '<div class="field"><label class="label">Sheet tab</label><select class="inp sel" id="tabSelect">';
    for (let i = 0; i < S.sheetTabs.length; i += 1) {
      const tab = S.sheetTabs[i];
      out += '<option value="' + escAttr(tab) + '"' + (tab === S.selectedTab ? " selected" : "") + ">" + esc(tab) + "</option>";
    }
    out += "</select></div>";
  }

  out += section(
    "compose",
    t("compose.title"),
    t("compose.sub"),
    composePanel(headers, preview)
  );

  out += section(
    "template",
    t("compose.templates"),
    t("compose.templatesSub"),
    templatePanel(draftCount)
  );

  out += section(
    "send",
    t("compose.send"),
    t("compose.sendSub"),
    sendPanel()
  );

  out += section(
    "test",
    t("compose.test"),
    t("compose.testSub"),
    testPanel()
  );

  if (S.composeSubject || S.composeBody || S.composeHtml) {
    out += section(
      "preview",
      "Quick Preview",
      "Uses the first spreadsheet row as a sample.",
      previewPanel()
    );
  }

  return out;
}

function vSending() {
  return '<div class="sending"><div class="spinner"></div><div class="sending-txt">Sending emails...</div></div>';
}

function vResults() {
  const run = S.lastRun || { results: S.results || [] };
  let sent = 0;
  let errors = 0;
  let skipped = 0;
  let tests = 0;
  const errList = [];

  for (let i = 0; i < run.results.length; i += 1) {
    const result = run.results[i];
    if (result.status === "SENT") {
      sent += 1;
    } else if (result.status === "TEST_SENT") {
      tests += 1;
    } else if (result.status === "ERROR") {
      errors += 1;
      errList.push(result);
    } else {
      skipped += 1;
    }
  }

  let out = '<div class="rstats">';
  out += '<div class="rstat ok"><span class="rstat-n">' + sent + '</span><span class="rstat-l">Sent</span></div>';
  out += '<div class="rstat"><span class="rstat-n">' + tests + '</span><span class="rstat-l">Tests</span></div>';
  out += '<div class="rstat bad"><span class="rstat-n">' + errors + '</span><span class="rstat-l">Errors</span></div>';
  out += "</div>";

  if (run.name) {
    out += '<div class="panel"><div class="panel-title">' + esc(run.name) + '</div><div class="panel-sub">' + esc(run.summary || "") + "</div></div>";
  }

  if (skipped > 0) {
    out += '<div class="note"><strong>Skipped:</strong> ' + skipped + " rows were already marked SENT or had no email.</div>";
  }

  for (let i = 0; i < errList.length; i += 1) {
    out += '<div class="err-row"><span>' + esc(errList[i].email || "Unknown") + '</span><span class="err-msg">' + esc(errList[i].error || "") + "</span></div>";
  }

  out += '<div class="btns">';
  if (run.id) {
    if (S.billing.activePlan === "premium") {
      out += '<button class="btn btn-pri" data-action="start-followup" data-id="' + escAttr(run.id) + '">' + t("results.sendFollowup") + '</button>';
    } else {
      out += '<button class="btn btn-pri" data-action="open-upgrade" data-plan="premium" title="Follow-up campaigns require Premium" style="opacity:0.6">' + t("results.followupLocked") + '</button>';
    }
    out += '<button class="btn btn-sec" data-action="duplicate-campaign" data-id="' + escAttr(run.id) + '">' + t("results.duplicate") + '</button>';
  }
  out += '<button class="btn btn-ghost" data-action="go-home">' + t("results.backHome") + '</button>';
  out += "</div>";
  return out;
}

// ─────────────────────────────────────────────────────────────────
//  FOLLOW-UP / RETARGET VIEWS
// ─────────────────────────────────────────────────────────────────

function vFollowUp() {
  const campaign = findHistoryById(S.followUpCampaignId);
  if (!campaign) {
    return '<div class="empty">Original campaign not found. Go back and try again.</div>';
  }

  const recipientCount = (campaign.results || []).filter(function(r) { return r.status === "SENT"; }).length;

  let out = "";

  // ── Backend upgrade banner ────────────────────────────────────
  if (S.followUpNeedsBackendUpdate) {
    out += '<div class="warn" style="flex-direction:column;align-items:flex-start;gap:10px;border-color:var(--org);background:var(--org-s)">';
    out += '<div><strong>⚠ Backend update required</strong><br>';
    out += 'Your deployed Apps Script backend is an older version that doesn\'t support follow-up campaigns yet. You need to copy the new backend code and redeploy your Web App — it only takes about 2 minutes.</div>';
    out += '<div style="font-size:12px;font-weight:600;color:var(--tx2)">How to update:</div>';
    out += '<div style="font-size:12px;color:var(--tx2);line-height:1.7">';
    out += '1. Click <strong>Copy Backend Code</strong> below<br>';
    out += '2. Go to <strong>script.google.com</strong> → open your project<br>';
    out += '3. Select all, paste the copied code, save<br>';
    out += '4. Click <strong>Deploy → Manage deployments → Edit → New version → Deploy</strong><br>';
    out += '5. Come back here and try sending the follow-up again</div>';
    out += '<button class="btn btn-pri btn-mini" data-action="copy-backend-code-followup">📋 Copy Backend Code</button>';
    out += '</div>';
  }

  // Thread context banner
  out += '<div class="hero" style="margin-bottom:14px">';
  out += '<div class="hero-top"><div class="hero-copy">';
  out += '<div class="hero-eyebrow">Follow-up Campaign</div>';
  out += '<div class="hero-title" style="font-size:18px">Send Follow-up</div>';
  out += '<div class="hero-sub">Your follow-up will be sent as a reply in the same conversation thread — recipients will see it as a continuation of the original email.</div>';
  out += '</div></div>';
  out += '<div class="hero-note">';
  out += '<span class="hero-note-main">Original campaign: <strong>' + esc(campaign.name || campaign.subject) + '</strong></span><br>';
  out += '<span class="hero-note-limits">Sent on ' + esc(formatDateOnly(campaign.createdAt)) + ' · ' + recipientCount + ' delivered · Only recipients with Status = SENT will receive this follow-up</span>';
  out += '</div>';
  out += '</div>';

  // Summary
  out += '<div class="summary tight">';
  out += '<div class="sum-row"><span>Original Subject</span><span>' + esc(campaign.subject || "—") + '</span></div>';
  out += '<div class="sum-row"><span>Sheet</span><span>' + esc(campaign.sheetName || "—") + ' · ' + esc(campaign.sheetTab || "") + '</span></div>';
  out += '<div class="sum-row"><span>Recipients</span><span>' + recipientCount + ' originally delivered</span></div>';
  out += '</div>';

  // Recipient picker + compose + send
  out += section("followup_recipients", "Recipients", selectedSummary(S.followUpRecipients), followUpRecipientsPanel());
  out += section("followup_compose", "Write Follow-up", "Write your follow-up message.", followUpComposePanel(campaign));
  out += section("followup_send", "Send Options", "From name, reply-to, and delay settings.", followUpSendPanel());
  out += section("followup_test", "Test Mode", "Preview the follow-up without sending to real recipients.", followUpTestPanel());

  return out;
}

function selectedSummary(recipients) {
  if (!recipients || !recipients.length) return "Loading recipients...";
  const total    = recipients.length;
  const selected = recipients.filter(function(r) { return r.selected; }).length;
  if (selected === total) return total + " recipients · All selected";
  if (selected === 0)    return total + " recipients · None selected";
  return total + " recipients · " + selected + " selected";
}

function followUpRecipientsPanel() {
  let out = "";

  if (!S.followUpRecipientsLoaded) {
    out += '<div class="sending" style="padding:20px 0"><div class="spinner"></div><div class="sending-txt" style="margin-top:8px">Loading recipients...</div></div>';
    return out;
  }

  const recipients = S.followUpRecipients;
  if (!recipients.length) {
    out += '<div class="empty compact-empty">No recipients found in the sheet. Make sure there are rows with valid email addresses.</div>';
    return out;
  }

  const total    = recipients.length;
  const selected = recipients.filter(function(r) { return r.selected; }).length;

  // ── Selected recipients as removable tags ──────────────────────
  out += '<div id="fu-selected-tags" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;min-height:28px">';
  for (let i = 0; i < recipients.length; i++) {
    const r = recipients[i];
    if (!r.selected) continue;
    const label = r.name || r.email;
    out += '<span style="display:inline-flex;align-items:center;gap:5px;background:var(--acc-soft);border:1px solid rgba(168,244,90,0.25);border-radius:999px;padding:3px 10px 3px 10px;font-size:12px;font-weight:600;color:var(--acc)">';
    out += esc(label);
    out += '<button data-action="followup-toggle-recipient" data-index="' + i + '" style="background:none;border:none;color:var(--acc);cursor:pointer;font-size:14px;line-height:1;padding:0 0 0 2px;opacity:0.7" title="Remove">×</button>';
    out += '</span>';
  }
  if (selected === 0) {
    out += '<span style="font-size:12px;color:var(--tx3);line-height:28px">No recipients selected yet</span>';
  }
  out += '</div>';

  // ── Search input ───────────────────────────────────────────────
  const currentSearch = S.followUpRecipientSearch || "";
  out += '<div style="display:flex;gap:8px;align-items:center;margin-bottom:8px">';
  out += '<div style="position:relative;flex:1">';
  out += '<span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--tx3);font-size:12px;pointer-events:none">⌕</span>';
  out += '<input id="followup-recipient-search" type="text" placeholder="Search recipients…" value="' + escAttr(currentSearch) + '" style="width:100%;box-sizing:border-box;padding:8px 10px 8px 30px;border:1px solid var(--bd);border-radius:var(--radius);background:var(--bg2);color:var(--tx);font-size:13px;outline:none" data-action="followup-search-input">';
  out += '</div>';
  out += '<button class="btn btn-ghost btn-mini" data-action="followup-select-all" style="white-space:nowrap">All</button>';
  out += '<button class="btn btn-ghost btn-mini" data-action="followup-deselect-all" style="white-space:nowrap">None</button>';
  out += '</div>';

  // ── Dropdown results (shown when there is a search query) ──────
  const dropdownVisible = currentSearch.length > 0;
  out += '<div id="fu-dropdown" style="' + (dropdownVisible ? 'display:block' : 'display:none') + ';border:1px solid var(--bd);border-radius:var(--radius);overflow:hidden;max-height:200px;overflow-y:auto;margin-bottom:6px;background:var(--bg2)">';
  for (let i = 0; i < recipients.length; i++) {
    const r = recipients[i];
    const isSelected = !!r.selected;
    const searchKey = ((r.name || "") + " " + r.email).toLowerCase();
    const matchesSearch = !dropdownVisible || searchKey.indexOf(currentSearch.toLowerCase()) !== -1;
    out += '<label class="fu-r-row" data-search="' + escAttr(searchKey) + '" style="' + (matchesSearch ? 'display:flex' : 'display:none') + ';align-items:center;gap:10px;padding:9px 12px;cursor:pointer;transition:background 0.1s;border-bottom:1px solid var(--bd);' + (isSelected ? 'background:var(--acc-soft)' : '') + '">';
    out += '<input type="checkbox" data-action="followup-toggle-recipient" data-index="' + i + '" ' + (isSelected ? 'checked' : '') + ' style="width:14px;height:14px;accent-color:var(--acc);cursor:pointer;flex-shrink:0">';
    out += '<span style="flex:1;min-width:0">';
    if (r.name) {
      out += '<span style="font-size:13px;font-weight:600;color:var(--tx);display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(r.name) + '</span>';
      out += '<span style="font-size:11px;color:var(--tx3);font-family:var(--font-mono)">' + esc(r.email) + '</span>';
    } else {
      out += '<span style="font-size:13px;color:var(--tx);font-family:var(--font-mono)">' + esc(r.email) + '</span>';
    }
    out += '</span>';
    if (isSelected) {
      out += '<span style="font-size:11px;font-weight:700;color:var(--acc)">✓</span>';
    }
    out += '</label>';
  }
  out += '</div>';

  out += '<div style="font-size:11px;color:var(--tx3);font-weight:600">' + selected + ' of ' + total + ' selected</div>';

  if (selected === 0) {
    out += '<div class="note" style="margin-top:8px;border-color:var(--org);background:var(--org-s);color:var(--org)">Select at least one recipient to send the follow-up.</div>';
  }

  return out;
}

function followUpComposePanel(campaign) {
  let out = "";
  out += '<div class="field"><label class="label">Follow-up Subject</label>';
  out += '<input class="inp" id="followUpSubject" type="text" value="' + esc(S.followUpSubject || ("Re: " + (campaign.subject || ""))) + '" placeholder="e.g. ' + esc(campaign.subject || "your original subject") + '">';
  out += '<span class="hint">This will be sent as a reply in the same thread as the original email.</span></div>';
  const canHtmlFu = S.billing.activePlan === "pro" || S.billing.activePlan === "premium";
  out += '<div class="field"><label class="label">Editor mode</label><div class="seg">';
  out += '<button class="seg-btn' + (S.followUpEditorMode === "write" ? " active" : "") + '" data-action="set-followup-editor-mode" data-mode="write">' + t("compose.write") + '</button>';
  if (canHtmlFu) {
    out += '<button class="seg-btn' + (S.followUpEditorMode === "html" ? " active" : "") + '" data-action="set-followup-editor-mode" data-mode="html">' + t("compose.html") + '</button>';
  } else {
    out += '<button class="seg-btn" data-action="open-upgrade" data-plan="pro" title="' + t("compose.htmlLockedTitle") + '" style="opacity:0.55;cursor:pointer">' + t("compose.htmlLocked") + '</button>';
  }
  out += '</div></div>';

  if (S.followUpEditorMode === "write") {
    out += '<div class="field"><label class="label">Follow-up message</label><textarea class="inp area tall-area" id="followUpBody" placeholder="Hi,&#10;&#10;Just wanted to follow up on my last email...">' + esc(S.followUpBody) + '</textarea></div>';
  } else {
    out += '<div class="field"><label class="label">HTML follow-up</label>';
    out += '<textarea class="inp area tall-area code-area" id="followUpHtml" placeholder="<p>Hi,</p><p>Following up on my last email...</p>">' + esc(S.followUpHtml) + '</textarea>';
    out += '<span class="hint">Inline HTML and CSS are supported.</span></div>';
  }

  // ── Spreadsheet columns as merge field chips ──────────────────────
  const sheetHeaders = (S.sheetData && S.sheetData.length > 0 && Array.isArray(S.sheetData[0]))
    ? S.sheetData[0].map(function(h) { return String(h || "").trim(); }).filter(Boolean)
    : [];

  if (sheetHeaders.length > 0) {
    out += '<div class="field" style="margin-top:14px">';
    out += '<label class="label">Sheet Fields</label>';
    out += '<span class="hint" style="display:block;margin-bottom:8px">Click a field to insert it into your message.</span>';
    out += '<div style="display:flex;flex-wrap:wrap;gap:6px">';
    for (let h = 0; h < sheetHeaders.length; h++) {
      const col = sheetHeaders[h];
      out += '<button class="btn btn-ghost btn-mini fu-insert-field-btn" data-action="fu-insert-field" data-field="' + escAttr(col) + '" style="font-family:var(--font-mono);font-size:11px">{{' + esc(col) + '}}</button>';
    }
    out += '</div>';
    out += '</div>';
  } else {
    out += '<div class="field" style="margin-top:14px">';
    out += '<label class="label">Sheet Fields</label>';
    out += '<span class="hint">Sheet fields will appear here once the spreadsheet is loaded. Use them as <code style="background:var(--bg2);padding:1px 5px;border-radius:4px;font-size:11px">{{ColumnName}}</code> in your message.</span>';
    out += '</div>';
  }

  return out;
}

function followUpSendPanel() {
  let out = "";
  out += mkField("fuFromName", "From name", "text", S.followUpFromName, "e.g. Julio from Madbear");
  out += mkField("fuReplyTo", "Reply-to", "email", S.followUpReplyTo, "Optional");
  out += mkField("fuDelayMs", "Delay between sends (ms)", "number", S.followUpDelayMs, "500");
  out += '<div class="btns">';
  out += '<button class="btn btn-pri" data-action="send-followup-live">↩ Send Follow-up</button>';
  out += '</div>';
  return out;
}

function followUpTestPanel() {
  let out = "";
  out += mkField("fuTestEmail", "Test email", "email", S.followUpTestEmail, "your@email.com");
  out += '<div class="note"><strong>Test mode:</strong> sends the follow-up preview only to your test email — does not mark any rows.</div>';
  out += '<div class="btns"><button class="btn btn-sec" data-action="send-followup-test">Send Test Follow-up</button></div>';
  return out;
}

function vFollowUpSending() {
  return '<div class="sending"><div class="spinner"></div><div class="sending-txt">Sending follow-up emails...</div></div>';
}

function vFollowUpResults() {
  const run = S.lastRun || { results: [] };
  let sent = 0, errors = 0, noEmail = 0, tests = 0, threaded = 0;
  const errList = [];

  for (let i = 0; i < run.results.length; i++) {
    const r = run.results[i];
    if (r.status === "SENT") { sent++; if (r.threadReply) threaded++; }
    else if (r.status === "TEST_SENT") tests++;
    else if (r.status === "ERROR") { errors++; errList.push(r); }
    else if (r.status === "NO_EMAIL") noEmail++;
  }

  let out = '<div class="rstats">';
  out += '<div class="rstat ok"><span class="rstat-n">' + (sent || tests) + '</span><span class="rstat-l">' + (tests ? "Tests" : "Sent") + '</span></div>';
  out += '<div class="rstat ok"><span class="rstat-n">' + threaded + '</span><span class="rstat-l">Threaded</span></div>';
  out += '<div class="rstat bad"><span class="rstat-n">' + errors + '</span><span class="rstat-l">Errors</span></div>';
  out += '</div>';

  out += '<div class="note" style="margin-bottom:14px">✅ <strong>' + (sent || tests) + ' follow-up' + ((sent || tests) === 1 ? '' : 's') + ' sent</strong> as threaded replies — each recipient received the message in the same conversation thread. Your sheet now has a <strong>FollowUpStatus</strong> column marked <strong>Done</strong> for each recipient.</div>';

  if (run.name) {
    out += '<div class="panel"><div class="panel-title">↩ Follow-up: ' + esc(run.name) + '</div><div class="panel-sub">' + esc(run.summary || "") + '</div></div>';
  }

  if (noEmail > 0) {
    out += '<div class="note"><strong>Skipped:</strong> ' + noEmail + ' rows had no valid email address.</div>';
  }

  for (let i = 0; i < errList.length; i++) {
    out += '<div class="err-row"><span>' + esc(errList[i].email || "Unknown") + '</span><span class="err-msg">' + esc(errList[i].error || "") + '</span></div>';
  }

  // Debug info — shows thread status per recipient
  if (run.results && run.results.length > 0) {
    out += '<div class="note" style="margin-top:8px"><strong>Debug info:</strong><br>';
    for (let i = 0; i < run.results.length; i++) {
      const r = run.results[i];
      out += '<span style="font-family:var(--font-mono);font-size:11px;color:var(--tx3)">';
      out += esc(r.email) + ' → ' + esc(r.status) + (r.debug ? ' (' + esc(r.debug) + ')' : '') + '<br>';
      out += '</span>';
    }
    out += '</div>';
  }

  out += '<div class="btns"><button class="btn btn-pri" data-action="go-home">↩ Back Home</button></div>';
  return out;
}

async function startFollowUp(campaignId) {
  const campaign = findHistoryById(campaignId);
  if (!campaign) {
    S.error = "Campaign not found.";
    render();
    return;
  }

  S.followUpNeedsBackendUpdate = false;
  S.followUpCampaignId = campaignId;
  S.followUpSubject = "Re: " + (campaign.subject || "");
  S.followUpBody = "";
  S.followUpHtml = "";
  S.followUpEditorMode = "write";
  S.followUpFromName = campaign.fromName || S.fromName || "";
  S.followUpReplyTo = campaign.replyTo || S.replyTo || "";
  S.followUpTestEmail = campaign.testEmail || S.testEmail || "";
  S.followUpDelayMs = campaign.delayMs || 500;
  S.followUpRecipients = [];
  S.followUpRecipientsLoaded = false;
  S.followUpSelectAll = true;
  S.followUpRecipientSearch = "";
  S.followUpCustomFields = [];
  S.sectionOpen = Object.assign({}, DEFAULT_SECTIONS, {
    followup_recipients: true,
    followup_compose: true,
    followup_send: true,
    followup_test: false
  });
  S.error = null;
  S.view = "followup";
  render();

  // Load sheet data to populate recipient list
  if (campaign.sheetId) {
    const tab = campaign.sheetTab || "";
    const dataRes = await api("getSheetData", {
      spreadsheetId: campaign.sheetId,
      tab: tab
    });
    if (dataRes.ok && Array.isArray(dataRes.data) && dataRes.data.length > 1) {
      const rows = dataRes.data;
      const headers = rows[0].map(function(h) { return String(h || "").trim().toLowerCase(); });
      const emailIdx = headers.indexOf("email");
      // Try to find a name column for display
      const nameIdx = headers.indexOf("firstname") >= 0 ? headers.indexOf("firstname")
                    : headers.indexOf("name") >= 0 ? headers.indexOf("name")
                    : headers.indexOf("fullname") >= 0 ? headers.indexOf("fullname")
                    : -1;
      const recipients = [];
      for (let r = 1; r < rows.length; r++) {
        const row = rows[r];
        const email = emailIdx >= 0 ? String(row[emailIdx] || "").trim() : "";
        if (!email) continue;
        const name = nameIdx >= 0 ? String(row[nameIdx] || "").trim() : "";
        recipients.push({ email: email, name: name, rowIndex: r, selected: true });
      }
      S.followUpRecipients = recipients;
    }
    S.followUpRecipientsLoaded = true;
    render();
  }
}

function syncFollowUpFields() {
  const subject = document.getElementById("followUpSubject");
  const body = document.getElementById("followUpBody");
  const html = document.getElementById("followUpHtml");
  const fromName = document.getElementById("f_fuFromName");
  const replyTo = document.getElementById("f_fuReplyTo");
  const testEmail = document.getElementById("f_fuTestEmail");
  const delayMs = document.getElementById("f_fuDelayMs");

  if (subject) S.followUpSubject = subject.value;
  if (body) S.followUpBody = body.value;
  if (html) S.followUpHtml = html.value;
  if (fromName) S.followUpFromName = fromName.value.trim();
  if (replyTo) S.followUpReplyTo = replyTo.value.trim();
  if (testEmail) S.followUpTestEmail = testEmail.value.trim();
  if (delayMs) S.followUpDelayMs = Math.max(0, parseInt(delayMs.value, 10) || 500);
}

async function doFollowUp(isTest) {
  syncFollowUpFields();

  const campaign = findHistoryById(S.followUpCampaignId);
  if (!campaign) {
    S.error = "Original campaign not found.";
    render();
    return;
  }

  if (!S.followUpSubject.trim()) {
    S.error = "Add a follow-up subject before sending.";
    render();
    return;
  }
  if (!S.followUpBody.trim() && !S.followUpHtml.trim()) {
    S.error = "Write your follow-up message before sending.";
    render();
    return;
  }
  if (isTest && !S.followUpTestEmail) {
    S.error = "Enter a test email before sending a test.";
    render();
    return;
  }

  // Build the selected email list
  const selectedEmails = S.followUpRecipients
    .filter(function(r) { return r.selected; })
    .map(function(r) { return r.email; });

  if (!isTest && S.followUpRecipientsLoaded && selectedEmails.length === 0) {
    S.error = "Select at least one recipient before sending.";
    render();
    return;
  }

  const sentCount = selectedEmails.length || (campaign.results || []).filter(function(r) { return r.status === "SENT"; }).length;

  if (!isTest) {
    const limitCheck = await billingRequest("billing:check-send-limit", { count: sentCount });
    if (!limitCheck.ok) {
      S.error = limitCheck.error;
      render();
      return;
    }
    if (!limitCheck.data.canSend) {
      S.error = "Лимит расширения отключён. Проверьте ограничения Google/Gmail, если отправка не проходит.";
      render();
      return;
    }
  }

  const backendCheck = await ensureFollowUpBackend();
  if (!backendCheck.ok) {
    S.error = backendCheck.error;
    render();
    return;
  }

  S.view = "followupsending";
  S.results = [];
  S.error = null;
  render();

  const htmlBody = S.followUpHtml.trim() || plainTextToHtml(S.followUpBody);
  const body = S.followUpBody.trim() || htmlToPlainText(S.followUpHtml);

  // Build custom fields map for merge replacement
  const customFieldsMap = {};
  if (Array.isArray(S.followUpCustomFields)) {
    S.followUpCustomFields.forEach(function(f) {
      if (f.key && f.key.trim()) {
        customFieldsMap[f.key.trim()] = f.value || "";
      }
    });
  }

  const config = {
    spreadsheetId: campaign.sheetId,
    sheetTab: campaign.sheetTab,
    subject: S.followUpSubject,
    body: body,
    htmlBody: htmlBody,
    fromName: S.followUpFromName,
    replyTo: S.followUpReplyTo,
    testEmail: isTest ? S.followUpTestEmail : "",
    testMode: isTest,
    delayMs: S.followUpDelayMs,
    selectedEmails: isTest ? [] : selectedEmails,
    noThread: false,
    customFields: customFieldsMap
  };

  const res = await api("sendFollowUp", { config: config });
  if (res.ok) {
    S.results = Array.isArray(res.data) ? res.data : [];
    S.lastRun = {
      id: "followup-" + Date.now(),
      name: campaign.name || campaign.subject || "Campaign",
      createdAt: new Date().toISOString(),
      sheetId: campaign.sheetId,
      sheetName: campaign.sheetName,
      sheetTab: campaign.sheetTab,
      subject: S.followUpSubject,
      results: S.results.slice(),
      isFollowUp: true
    };
    S.lastRun.summary = summarizeResults(S.results, isTest, campaign.sheetName || "");

    if (!isTest) {
      let actualSent = 0;
      for (let i = 0; i < S.results.length; i++) {
        if (S.results[i].status === "SENT") actualSent++;
      }
      S.stats.sent += actualSent;
      S.stats.campaigns += 1;
      chrome.storage.local.set({ mb_stats: S.stats });
      await billingRequest("billing:record-send", { count: actualSent });
      await refreshBillingState();
    }

    S.view = "followupresults";
  } else {
    // Detect old backend that doesn't know sendFollowUp yet
    const errMsg = res.error || "";
    const isOldBackend = errMsg.indexOf("Unknown action") !== -1 ||
                         errMsg.indexOf("sendFollowUp") !== -1;
    if (isOldBackend) {
      S.followUpNeedsBackendUpdate = true;
    } else {
      S.error = errMsg || "Follow-up failed.";
    }
    S.view = "followup";
  }
  render();
}

function composePanel(headers, preview) {
  let out = "";
  out += '<div class="field"><label class="label">Subject</label><input class="inp" id="composeSubject" type="text" value="' + esc(S.composeSubject) + '" placeholder="Hi {{FirstName}}, quick question"></div>';
  const canHtml = S.billing.activePlan === "pro" || S.billing.activePlan === "premium";
  out += '<div class="field"><label class="label">Editor mode</label><div class="seg">';
  out += '<button class="seg-btn' + (S.editorMode === "write" ? " active" : "") + '" data-action="set-editor-mode" data-mode="write">' + t("compose.write") + '</button>';
  if (canHtml) {
    out += '<button class="seg-btn' + (S.editorMode === "html" ? " active" : "") + '" data-action="set-editor-mode" data-mode="html">' + t("compose.html") + '</button>';
  } else {
    out += '<button class="seg-btn" data-action="open-upgrade" data-plan="pro" title="' + t("compose.htmlLockedTitle") + '" style="opacity:0.55;cursor:pointer">' + t("compose.htmlLocked") + '</button>';
  }
  out += "</div></div>";

  if (S.editorMode === "write") {
    out += '<div class="field"><label class="label">Email body</label><textarea class="inp area tall-area" id="composeBody" placeholder="Hi {{FirstName}},&#10;&#10;I wanted to reach out because...">' + esc(S.composeBody) + "</textarea></div>";
  } else {
    out += '<div class="field"><label class="label">HTML email</label>';
    out += '<textarea class="inp area tall-area code-area" id="composeHtml" placeholder="<div style=&quot;font-family:Arial&quot;>Hi {{FirstName}}</div>">' + esc(S.composeHtml) + "</textarea>";
    out += '<span class="hint">Inline HTML and CSS are supported.</span></div>';
  }

  // Attachments section
  out += '<div class="field">';
  out += '<label class="label">Attachments</label>';
  out += '<div class="attach-area">';
  out += '<label class="btn btn-ghost btn-mini attach-label" title="Attach a file">Attach File<input type="file" id="attachFileInput" multiple style="display:none" data-action="attach-file"></label>';
  if (S.attachments && S.attachments.length > 0) {
    out += '<div class="attach-list">';
    for (let i = 0; i < S.attachments.length; i++) {
      const att = S.attachments[i];
      out += '<span class="attach-chip">';
      out += '<span class="attach-name" title="' + escAttr(att.name) + '">' + esc(att.name) + '</span>';
      out += '<span class="attach-size"> (' + formatFileSize(att.size) + ')</span>';
      out += '<button class="attach-remove" data-action="remove-attachment" data-index="' + i + '" title="Remove">×</button>';
      out += '</span>';
    }
    out += '</div>';
  } else {
    out += '<span class="hint" style="margin-left:8px">No attachments added.</span>';
  }
  out += '</div>';
  out += '<span class="hint">Files are attached to every email in the campaign. Keep total size under 5MB.</span>';
  out += '</div>';

  out += '<div class="field"><label class="label">Merge fields</label><div class="chips chips-lg">';
  for (let i = 0; i < headers.length; i += 1) {
    out += '<button class="chip chip-btn ok" data-action="insert-tag" data-tag="' + escAttr(headers[i]) + '">{{' + esc(headers[i]) + "}}</button>";
  }
  out += "</div>";
  if (preview) {
    out += '<span class="hint">Preview row: ' + esc(preview) + "</span>";
  }
  out += "</div>";

  if (S.editorMode === "html") {
    out += '<div class="preview"><div class="label" style="margin-bottom:6px">HTML preview</div><div class="preview-box">' + sanitizePreview(S.composeHtml || "<em>Your HTML preview will appear here.</em>") + "</div></div>";
  }

  return out;
}

function templatePanel(draftCount) {
  let out = "";
  if (S.selectedDraft) {
    out += '<div class="selected-draft"><strong>Loaded:</strong> ' + esc(S.selectedDraft.subject) + ' <button class="link-btn" data-action="clear-draft">Remove</button></div>';
  }
  out += '<div class="panel-actions"><button class="btn btn-sec btn-mini" data-action="clear-template">Start Fresh</button></div>';
  if (draftCount === 0) {
    out += '<div class="empty compact-empty">No Gmail drafts found.</div>';
  } else {
    out += '<div class="draft-list">';
    for (let i = 0; i < S.drafts.length; i += 1) {
      const draft = S.drafts[i];
      const fieldCount = (draft.body.match(/\{\{[^}]+\}\}/g) || []).length;
      out += '<button class="draft-card" data-action="load-draft" data-index="' + i + '">';
      out += '<span class="draft-subject">' + esc(draft.subject) + "</span>";
      out += '<span class="draft-meta">' + fieldCount + " fields</span>";
      out += "</button>";
    }
    out += "</div>";
  }
  return out;
}

function sendPanel() {
  const isPremium = true;
  const isPro = true;
  let out = "";

  // ── Core send fields ─────────────────────────────────────────────
  out += mkField("fromName", t("send.fromName"), "text", S.fromName, t("send.fromNamePlaceholder"));
  out += mkField("replyTo", t("send.replyTo"), "email", S.replyTo, t("send.replyToPlaceholder"));

  // ── CC / BCC (Feature 9, Premium) ────────────────────────────────
  if (isPremium) {
    out += '<div class="field">';
    out += '<label class="label">CC <span style="font-weight:400;color:var(--tx3);font-size:10px">— supports {{merge}} tokens</span></label>';
    out += '<input class="inp" id="f_cc" type="text" value="' + escAttr(S.ccField) + '" placeholder="cc@example.com">';
    out += '<span class="hint">Optional. Comma-separate multiple addresses.</span></div>';
    out += '<div class="field">';
    out += '<label class="label">BCC <span style="font-weight:400;color:var(--tx3);font-size:10px">— supports {{merge}} tokens</span></label>';
    out += '<input class="inp" id="f_bcc" type="text" value="' + escAttr(S.bccField) + '" placeholder="bcc@example.com">';
    out += '<span class="hint">Hidden recipients. Use {{email}} to BCC each person their own copy.</span></div>';
  } else {
    out += '<div class="note" style="margin-bottom:8px">💎 <strong>CC / BCC</strong> — <button class="btn btn-ghost btn-mini" data-action="open-upgrade" data-plan="premium">Доступно бесплатно</button></div>';
  }

  out += mkField("delayMs", t("send.delay"), "number", S.delayMs, "500");

  // ── Unsubscribe injection (Feature 10, Premium) ───────────────────
  if (isPremium) {
    out += '<div style="margin:12px 0;border-top:1px solid var(--bd);padding-top:12px">';
    out += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">';
    out += '<label style="font-size:12px;font-weight:600;color:var(--tx);display:flex;align-items:center;gap:6px;cursor:pointer">';
    out += '<input type="checkbox" id="f_unsubEnable"' + (S.unsubscribeEnabled ? " checked" : "") + ' data-action="toggle-unsub" style="width:14px;height:14px;accent-color:var(--acc)">';
    out += '🔒 Auto-inject unsubscribe footer</label>';
    out += '<span style="font-size:10px;color:var(--acc);font-weight:700;background:var(--acc-soft);padding:2px 6px;border-radius:4px">PREMIUM</span>';
    out += '</div>';
    if (S.unsubscribeEnabled) {
      out += '<div class="field">';
      out += '<label class="label">Your unsubscribe page URL</label>';
      out += '<input class="inp" id="f_unsubUrl" type="url" value="' + escAttr(S.unsubscribeBaseUrl) + '" placeholder="https://yoursite.com/unsubscribe">';
      out += '<span class="hint">A unique token is auto-appended: <code>?t={{token}}&e={{email}}</code>. Use <code>{{unsubscribeUrl}}</code> in your HTML to place the link, or the footer is auto-appended.</span>';
      out += '</div>';
    }
    out += '</div>';
  }

  // ── Schedule send (Feature 3, Premium) ───────────────────────────
  if (isPremium) {
    out += '<div style="margin:12px 0;border-top:1px solid var(--bd);padding-top:12px">';
    out += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">';
    out += '<label style="font-size:12px;font-weight:600;color:var(--tx);display:flex;align-items:center;gap:6px;cursor:pointer">';
    out += '<input type="checkbox" id="f_scheduleEnable"' + (S.scheduleEnabled ? " checked" : "") + ' data-action="toggle-schedule" style="width:14px;height:14px;accent-color:var(--acc)">';
    out += '🕐 Schedule send</label>';
    out += '<span style="font-size:10px;color:var(--acc);font-weight:700;background:var(--acc-soft);padding:2px 6px;border-radius:4px">PREMIUM</span>';
    out += '</div>';
    if (S.scheduleEnabled) {
      out += '<div class="field">';
      out += '<label class="label">Send at (your local time)</label>';
      const minDt = new Date(Date.now() + 2 * 60000).toISOString().slice(0, 16);
      out += '<input class="inp" id="f_scheduleAt" type="datetime-local" value="' + escAttr(S.scheduleAt) + '" min="' + minDt + '">';
      out += '<span class="hint">The campaign will send automatically, even if the popup is closed.</span></div>';
    }
    out += '</div>';
  }

  // ── Smart send window (Feature 5, Premium) ────────────────────────
  if (isPremium) {
    out += '<div style="margin:12px 0;border-top:1px solid var(--bd);padding-top:12px">';
    out += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">';
    out += '<label style="font-size:12px;font-weight:600;color:var(--tx);display:flex;align-items:center;gap:6px;cursor:pointer">';
    out += '<input type="checkbox" id="f_smartEnable"' + (S.smartSendEnabled ? " checked" : "") + ' data-action="toggle-smart-send" style="width:14px;height:14px;accent-color:var(--acc)">';
    out += '⚡ Smart send window</label>';
    out += '<span style="font-size:10px;color:var(--acc);font-weight:700;background:var(--acc-soft);padding:2px 6px;border-radius:4px">PREMIUM</span>';
    out += '</div>';
    if (S.smartSendEnabled) {
      out += '<div class="note">Emails are staggered evenly across your chosen window — looks more human, reduces spam risk.</div>';
      out += '<div class="field">';
      out += '<label class="label">Send date</label>';
      const todayStr = new Date().toISOString().slice(0, 10);
      out += '<input class="inp" id="f_smartDate" type="date" value="' + escAttr(S.smartSendDate || todayStr) + '" min="' + todayStr + '">';
      out += '</div>';
      out += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
      out += '<div class="field"><label class="label">Window start</label>';
      out += '<input class="inp" id="f_smartStart" type="time" value="' + escAttr(S.smartSendStart || "09:00") + '"></div>';
      out += '<div class="field"><label class="label">Window end</label>';
      out += '<input class="inp" id="f_smartEnd" type="time" value="' + escAttr(S.smartSendEnd || "11:00") + '"></div>';
      out += '</div>';
    }
    out += '</div>';
  }

  // ── Send buttons ──────────────────────────────────────────────────
  out += '<div class="btns" style="gap:8px;margin-top:4px">';
  if (S.scheduleEnabled && isPremium) {
    out += '<button class="btn btn-pri" data-action="send-schedule">🕐 Schedule Campaign</button>';
  } else if (S.smartSendEnabled && isPremium) {
    out += '<button class="btn btn-pri" data-action="send-smart">⚡ Smart Send</button>';
  } else {
    out += '<button class="btn btn-pri" data-action="send-live">' + t("send.sendBtn") + '</button>';
  }
  out += '</div>';

  return out;
}

function testPanel() {
  let out = "";
  out += mkField("testEmail", t("test.email"), "email", S.testEmail, "your@email.com");
  out += '<div class="note"><strong>' + t("test.modeLabel") + '</strong> ' + t("test.modeDesc") + '</div>';
  out += '<div class="btns"><button class="btn btn-sec" data-action="send-test">' + t("test.sendTest") + '</button></div>';
  return out;
}

function previewPanel() {
  let out = "";
  out += '<div class="preview-meta"><strong>Subject:</strong> ' + esc(applyMerge(S.composeSubject, 1)) + "</div>";
  out += '<div class="preview-box">' + sanitizePreview(renderPreviewBody(1)) + "</div>";
  return out;
}

function section(key, title, subtitle, body) {
  const isOpen = !!S.sectionOpen[key];
  let out = '<div class="panel accordion' + (isOpen ? " open" : "") + '">';
  out += '<button class="accordion-head" data-action="toggle-section" data-section="' + key + '">';
  out += '<span class="accordion-copy"><span class="panel-title">' + esc(title) + '</span><span class="panel-sub">' + esc(subtitle) + "</span></span>";
  out += '<span class="accordion-icon">' + (isOpen ? "−" : "+") + "</span></button>";
  if (isOpen) {
    out += '<div class="accordion-body">' + body + "</div>";
  }
  out += "</div>";
  return out;
}

async function startCampaign() {
  if (!S.scriptUrl) {
    S.error = "Set your Apps Script URL in Settings first.";
    render();
    return;
  }

  resetCampaignState();

  // Build recent sheets from campaign history — no Drive scan required.
  const seen = {};
  S.sheets = [];
  for (let i = 0; i < S.history.length; i++) {
    const c = S.history[i];
    if (c.sheetId && !seen[c.sheetId]) {
      seen[c.sheetId] = true;
      S.sheets.push({ id: c.sheetId, name: c.sheetName || c.sheetId, modified: c.createdAt || "" });
    }
  }

  S.view = "sheets";
  render();
}

async function connectSpreadsheet() {
  const input = document.getElementById("sheetUrlInput");
  const raw = input ? input.value.trim() : "";
  const customNameInput = document.getElementById("sheetCustomNameInput");
  const customName = customNameInput ? customNameInput.value.trim() : "";
  if (!raw) {
    S.error = "Paste a Google Sheets URL or spreadsheet ID first.";
    render();
    return;
  }

  // Extract ID from a full Sheets URL, or use the value directly as an ID.
  let spreadsheetId = raw;
  const urlMatch = raw.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  if (urlMatch) {
    spreadsheetId = urlMatch[1];
  }
  if (!/^[a-zA-Z0-9_-]{10,60}$/.test(spreadsheetId)) {
    S.error = "That doesn't look like a valid Google Sheets URL or spreadsheet ID.";
    render();
    return;
  }

  S.error = null;
  render();

  // getSheetTabs validates access and works with all deployed backend versions.
  const res = await api("getSheetTabs", { spreadsheetId: spreadsheetId });
  if (!res.ok) {
    S.error = res.error || "Could not open that spreadsheet. Make sure the URL is correct and the Apps Script has access to it.";
    render();
    return;
  }

  // Support both old (array) and new (object with name+tabs) backend response
  const resData = res.data;
  const tabs = Array.isArray(resData) ? resData : (Array.isArray(resData && resData.tabs) ? resData.tabs : []);
  const apiName = (resData && resData.spreadsheetName) ? resData.spreadsheetName : spreadsheetId;
  const sheetName = customName || apiName;
  S.selectedSheet = { id: spreadsheetId, name: sheetName };
  S.sheetTabs = tabs;
  S.selectedTab = tabs[0] || "";

  // Add to recent sheets if not already present.
  const existingSheet = S.sheets.find(function(s) { return s.id === spreadsheetId; });
  if (!existingSheet) {
    S.sheets.unshift({ id: spreadsheetId, name: sheetName, modified: new Date().toISOString() });
  } else {
    existingSheet.name = sheetName;
  }

  S.view = "compose";
  hydrateFromCacheForSelectedSheet();
  render();
  await reloadCampaignData();
  render();
}

async function pickSheet(index) {
  S.selectedSheet = S.sheets[index];
  S.error = null;
  S.view = "compose";
  hydrateFromCacheForSelectedSheet();
  render();

  await reloadCampaignData();
  render();
}

async function changeTab(tabName) {
  if (!S.selectedSheet || !tabName) {
    return;
  }

  S.selectedTab = tabName;
  S.sheetData = [];
  render();

  const dataRes = await api("getSheetData", {
    spreadsheetId: S.selectedSheet.id,
    tab: tabName
  });
  if (!dataRes.ok) {
    S.error = dataRes.error;
  } else {
    S.sheetData = Array.isArray(dataRes.data) ? dataRes.data : [];
    cacheSheetData();
  }
  persistComposeDraft();
  render();
}

async function reloadCampaignData() {
  if (!S.selectedSheet) {
    return;
  }

  hydrateFromCacheForSelectedSheet();
  render();

  const tabsRes = await api("getSheetTabs", { spreadsheetId: S.selectedSheet.id });
  if (!tabsRes.ok) {
    S.error = tabsRes.error;
    render();
    return;
  }

  const tabsResData = tabsRes.data;
  S.sheetTabs = Array.isArray(tabsResData) ? tabsResData : (Array.isArray(tabsResData && tabsResData.tabs) ? tabsResData.tabs : []);
  if (tabsResData && tabsResData.spreadsheetName && S.selectedSheet) {
    S.selectedSheet.name = tabsResData.spreadsheetName;
    const sheetEntry = S.sheets.find(function(s) { return s.id === S.selectedSheet.id; });
    if (sheetEntry) sheetEntry.name = tabsResData.spreadsheetName;
  }
  S.cache.sheetTabsBySheetId[S.selectedSheet.id] = S.sheetTabs.slice();
  if (!S.selectedTab) {
    S.selectedTab = S.sheetTabs[0] || "";
  }

  const dataRes = await api("getSheetData", {
    spreadsheetId: S.selectedSheet.id,
    tab: S.selectedTab
  });
  if (!dataRes.ok) {
    S.error = dataRes.error;
    render();
    return;
  }

  S.sheetData = Array.isArray(dataRes.data) ? dataRes.data : [];
  cacheSheetData();
  S.cache.lastLoadedAt = new Date().toISOString();
  persistCache();
  persistComposeDraft();
  await reloadDrafts();
}

async function reloadDrafts() {
  if (Array.isArray(S.cache.drafts) && S.cache.drafts.length && !S.drafts.length) {
    S.drafts = S.cache.drafts.slice();
    render();
  }
  const draftsRes = await api("listDrafts");
  if (draftsRes.ok) {
    S.drafts = Array.isArray(draftsRes.data) ? draftsRes.data : [];
    S.cache.drafts = S.drafts.slice();
    S.cache.lastLoadedAt = new Date().toISOString();
    persistCache();
    S.error = null;
  } else {
    S.error = draftsRes.error;
  }
  render();
}

function loadDraft(index) {
  const draft = S.drafts[index];
  if (!draft) {
    return;
  }
  S.selectedDraft = {
    id: draft.id,
    subject: draft.subject,
    loadedAt: new Date().toISOString()
  };
  S.composeSubject = draft.subject === "(no subject)" ? "" : draft.subject;
  S.composeBody = draft.plainBody || htmlToPlainText(draft.body || "");
  S.composeHtml = draft.body || "";
  S.editorMode = S.composeHtml ? "html" : "write";
  S.sectionOpen.compose = true;
  persistComposeDraft();
  render();
}

function clearDraft() {
  S.selectedDraft = null;
  persistComposeDraft();
  render();
}

function clearTemplate() {
  S.selectedDraft = null;
  S.composeSubject = "";
  S.composeBody = "";
  S.composeHtml = "";
  S.editorMode = "write";
  persistComposeDraft();
  render();
}

function toggleSection(sectionName) {
  S.sectionOpen[sectionName] = !S.sectionOpen[sectionName];
  render();
}

async function doSend(isTest) {
  syncComposeFields();

  const isContactsCampaign = S.selectedSheet && S.selectedSheet.id === "contacts";

  if (!S.selectedSheet || (!S.selectedTab && !isContactsCampaign)) {
    S.error = isContactsCampaign ? "No contacts loaded." : "Pick a spreadsheet first.";
    render();
    return;
  }
  if (!S.composeSubject.trim()) {
    S.error = "Add an email subject before sending.";
    render();
    return;
  }
  if (!S.composeBody.trim() && !S.composeHtml.trim()) {
    S.error = "Write your email body or paste your HTML before sending.";
    render();
    return;
  }
  if (isTest && !S.testEmail) {
    S.error = "Enter a Test Email before sending a test.";
    render();
    return;
  }

  if (!isTest) {
    const sendableCount = countEstimatedSendableRows();
    const limitCheck = await billingRequest("billing:check-send-limit", { count: sendableCount });
    if (!limitCheck.ok) {
      S.error = limitCheck.error;
      render();
      return;
    }
    if (!limitCheck.data.canSend) {
      S.error = "Лимит расширения отключён. Проверьте ограничения Google/Gmail, если отправка не проходит.";
      render();
      return;
    }
  }

  const backendCheck = await ensureCompatibleBackend();
  if (!backendCheck.ok) {
    S.error = backendCheck.error;
    render();
    return;
  }

  S.view = "sending";
  S.results = [];
  S.error = null;
  render();

  let htmlBody = S.composeHtml.trim() || plainTextToHtml(S.composeBody);
  const body = S.composeBody.trim() || htmlToPlainText(S.composeHtml);

  // Feature 10: auto-inject unsubscribe footer if enabled and no {{unsubscribeUrl}} already in body
  if (S.unsubscribeEnabled && S.unsubscribeBaseUrl && !htmlBody.includes("{{unsubscribeUrl}}")) {
    const unsubFooter = buildUnsubFooter();
    htmlBody = htmlBody + unsubFooter;
  }

  const config = {
    spreadsheetId: isContactsCampaign ? "" : S.selectedSheet.id,
    sheetTab: isContactsCampaign ? "" : S.selectedTab,
    inlineData: isContactsCampaign ? S.sheetData : undefined,
    draftId: "",
    subject: S.composeSubject,
    body: body,
    htmlBody: htmlBody,
    fromName: S.fromName,
    replyTo: S.replyTo,
    cc: S.ccField || "",
    bcc: S.bccField || "",
    unsubscribeBaseUrl: (S.unsubscribeEnabled && S.unsubscribeBaseUrl) ? S.unsubscribeBaseUrl : "",
    testEmail: isTest ? S.testEmail : "",
    testMode: isTest,
    delayMs: S.delayMs,
    attachments: (S.attachments || []).map(function(a) {
      return { name: a.name, mimeType: a.mimeType, data: a.data };
    })
  };

  const res = await api("sendMerge", { config: config });
  if (res.ok) {
    S.results = Array.isArray(res.data) ? res.data : [];
    S.lastRun = buildHistoryRecord(isTest);
    S.lastRun.results = S.results.slice();
    S.lastRun.summary = summarizeResults(S.results, isTest, S.selectedSheet ? S.selectedSheet.name : "");

    let sentCount = 0;
    let errorCount = 0;
    for (let i = 0; i < S.results.length; i += 1) {
      if (S.results[i].status === "SENT") {
        sentCount += 1;
      } else if (S.results[i].status !== "SKIPPED") {
        errorCount += 1;
      }
    }

    if (!isTest) {
      S.stats.sent += sentCount;
      S.stats.errors = (S.stats.errors || 0) + errorCount;
      S.stats.campaigns += 1;
      chrome.storage.local.set({ mb_stats: S.stats });
      upsertHistory(S.lastRun);
      await billingRequest("billing:record-send", { count: sentCount });
      await refreshBillingState();
    }

    S.view = "results";
  } else {
    S.error = res.error || "Merge failed.";
    S.view = "compose";
  }
  render();
}

function saveSettings() {
  const input = document.getElementById("urlInput");
  const nextUrl = input ? input.value.trim() : "";

  if (!nextUrl) {
    S.error = "The Apps Script URL cannot be empty.";
    render();
    return;
  }

  S.scriptUrl = nextUrl;
  chrome.storage.local.set({ mb_script_url: S.scriptUrl });
  S.view = "home";
  S.error = null;
  persistComposeDraft();
  render();
}

function toggleTheme() {
  S.theme = S.theme === "dark" ? "light" : "dark";
  chrome.storage.local.set({ mb_theme: S.theme });
  render();
}

function go(view) {
  if (view === "home") {
    goHome();
    return;
  }
  S.view = view;
  S.error = null;
  render();
}

function goHome() {
  resetCampaignState();
  S.view = "home";
  S.error = null;
  render();
}

function resetCampaignState() {
  S.sheets = [];
  S.selectedSheet = null;
  S.sheetTabs = [];
  S.selectedTab = "";
  S.sheetData = [];
  S.drafts = [];
  S.selectedDraft = null;
  S.composeSubject = "";
  S.composeBody = "";
  S.composeHtml = "";
  S.editorMode = "write";
  S.focusedFieldId = "";
  S.attachments = [];
  S.showImageInsert = false;
  S.results = [];
  S.lastRun = null;
  S.sectionOpen = Object.assign({}, DEFAULT_SECTIONS);
}

function clearError() {
  S.error = null;
  S.success = null;
  render();
}

function syncComposeFields() {
  const subject = document.getElementById("composeSubject");
  const body = document.getElementById("composeBody");
  const html = document.getElementById("composeHtml");
  const fromName = document.getElementById("f_fromName");
  const replyTo = document.getElementById("f_replyTo");
  const testEmail = document.getElementById("f_testEmail");
  const delayMs = document.getElementById("f_delayMs");
  const ccField = document.getElementById("f_cc");
  const bccField = document.getElementById("f_bcc");
  const scheduleAt = document.getElementById("f_scheduleAt");
  const smartStart = document.getElementById("f_smartStart");
  const smartEnd = document.getElementById("f_smartEnd");
  const smartDate = document.getElementById("f_smartDate");
  const unsubUrl = document.getElementById("f_unsubUrl");

  S.composeSubject = subject ? subject.value : S.composeSubject;
  S.composeBody = body ? body.value : S.composeBody;
  S.composeHtml = html ? html.value : S.composeHtml;
  S.fromName = fromName ? fromName.value.trim() : S.fromName;
  S.replyTo = replyTo ? replyTo.value.trim() : S.replyTo;
  S.testEmail = testEmail ? testEmail.value.trim() : S.testEmail;
  S.delayMs = delayMs ? Math.max(0, parseInt(delayMs.value, 10) || 500) : S.delayMs;
  if (ccField) S.ccField = ccField.value.trim();
  if (bccField) S.bccField = bccField.value.trim();
  if (scheduleAt) S.scheduleAt = scheduleAt.value;
  if (smartStart) S.smartSendStart = smartStart.value;
  if (smartEnd) S.smartSendEnd = smartEnd.value;
  if (smartDate) S.smartSendDate = smartDate.value;
  if (unsubUrl) S.unsubscribeBaseUrl = unsubUrl.value.trim();
  persistComposeDraft();
}

// ═══════════════════════════════════════════════════════════════════
// FEATURE 10: Unsubscribe footer builder
// ═══════════════════════════════════════════════════════════════════

function buildUnsubFooter() {
  return '<div style="margin-top:32px;padding-top:16px;border-top:1px solid #e5e7eb;text-align:center;font-family:-apple-system,BlinkMacSystemFont,sans-serif">' +
    '<p style="color:#9ca3af;font-size:12px;margin:0 0 6px">You received this email because you opted in.</p>' +
    '<p style="margin:0"><a href="{{unsubscribeUrl}}" style="color:#6b7280;font-size:12px;text-decoration:underline">Unsubscribe</a></p>' +
    '</div>';
}

// ═══════════════════════════════════════════════════════════════════
// FEATURE 3: Scheduled send
// ═══════════════════════════════════════════════════════════════════

async function doScheduledSend() {
  syncComposeFields();
  if (!S.selectedSheet || !S.composeSubject.trim()) {
    S.error = "Complete your campaign before scheduling.";
    render();
    return;
  }
  if (!S.scheduleAt) {
    S.error = "Pick a date and time for the scheduled send.";
    render();
    return;
  }
  const scheduledDate = new Date(S.scheduleAt);
  if (isNaN(scheduledDate.getTime()) || scheduledDate <= new Date()) {
    S.error = "Schedule time must be in the future.";
    render();
    return;
  }

  let htmlBody = S.composeHtml.trim() || plainTextToHtml(S.composeBody);
  if (S.unsubscribeEnabled && S.unsubscribeBaseUrl && !htmlBody.includes("{{unsubscribeUrl}}")) {
    htmlBody = htmlBody + buildUnsubFooter();
  }
  const config = {
    spreadsheetId: S.selectedSheet.id, sheetTab: S.selectedTab,
    subject: S.composeSubject, body: S.composeBody.trim() || htmlToPlainText(S.composeHtml),
    htmlBody: htmlBody, fromName: S.fromName, replyTo: S.replyTo,
    cc: S.ccField || "", bcc: S.bccField || "",
    unsubscribeBaseUrl: (S.unsubscribeEnabled && S.unsubscribeBaseUrl) ? S.unsubscribeBaseUrl : "",
    testMode: false, delayMs: S.delayMs
  };

  const resp = await new Promise(function(resolve) {
    chrome.runtime.sendMessage({ type: "schedule:set", payload: { scheduledAt: S.scheduleAt, scriptUrl: S.scriptUrl, config: config } }, resolve);
  });

  if (resp && resp.ok) {
    S.scheduledJob = { scheduledAt: S.scheduleAt, subject: S.composeSubject, status: "scheduled" };
    S.scheduleEnabled = false;
    S.error = null;
    render();
    // Show confirmation banner
    setTimeout(function() {
      S.scheduledJob = S.scheduledJob;
      render();
    }, 300);
  } else {
    S.error = (resp && resp.error) || "Could not schedule send.";
    render();
  }
}

async function cancelSchedule() {
  await new Promise(function(resolve) {
    chrome.runtime.sendMessage({ type: "schedule:cancel" }, resolve);
  });
  S.scheduledJob = null;
  render();
}

async function loadScheduledJob() {
  const resp = await new Promise(function(resolve) {
    chrome.runtime.sendMessage({ type: "schedule:get" }, resolve);
  });
  if (resp && resp.ok && resp.data) {
    S.scheduledJob = resp.data;
  }
}

// ═══════════════════════════════════════════════════════════════════
// FEATURE 5: Smart send window
// ═══════════════════════════════════════════════════════════════════

async function doSmartSend() {
  syncComposeFields();
  if (!S.selectedSheet || !S.composeSubject.trim()) {
    S.error = "Complete your campaign before using smart send.";
    render();
    return;
  }
  if (!S.smartSendDate || !S.smartSendStart || !S.smartSendEnd) {
    S.error = "Pick a date and time window for smart send.";
    render();
    return;
  }

  const startMs = new Date(S.smartSendDate + "T" + S.smartSendStart + ":00").getTime();
  const endMs   = new Date(S.smartSendDate + "T" + S.smartSendEnd   + ":00").getTime();
  if (isNaN(startMs) || startMs <= Date.now()) {
    S.error = "Smart send window start must be in the future.";
    render();
    return;
  }
  if (endMs <= startMs) {
    S.error = "Window end must be after window start.";
    render();
    return;
  }

  // Build recipient list from sheet data
  const rows = S.sheetData || [];
  if (rows.length < 2) { S.error = "No recipients in sheet."; render(); return; }
  const headers = rows[0];
  const emailIdx = headers.findIndex(function(h) { return String(h).toLowerCase().trim() === "email"; });
  if (emailIdx === -1) { S.error = 'Sheet has no "Email" column.'; render(); return; }
  const recipients = [];
  for (let i = 1; i < rows.length; i++) {
    const email = String(rows[i][emailIdx] || "").trim();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      recipients.push({ email: email, rowIndex: i });
    }
  }
  if (!recipients.length) { S.error = "No valid email addresses in sheet."; render(); return; }

  let htmlBody = S.composeHtml.trim() || plainTextToHtml(S.composeBody);
  if (S.unsubscribeEnabled && S.unsubscribeBaseUrl && !htmlBody.includes("{{unsubscribeUrl}}")) {
    htmlBody = htmlBody + buildUnsubFooter();
  }
  const config = {
    spreadsheetId: S.selectedSheet.id, sheetTab: S.selectedTab,
    subject: S.composeSubject, body: S.composeBody.trim() || htmlToPlainText(S.composeHtml),
    htmlBody: htmlBody, fromName: S.fromName, replyTo: S.replyTo,
    cc: S.ccField || "", bcc: S.bccField || "",
    unsubscribeBaseUrl: (S.unsubscribeEnabled && S.unsubscribeBaseUrl) ? S.unsubscribeBaseUrl : "",
    testMode: false, delayMs: 0
  };

  S.error = null;
  render();

  const resp = await new Promise(function(resolve) {
    chrome.runtime.sendMessage({ type: "smartsend:start", payload: {
      scriptUrl: S.scriptUrl, config: config,
      recipients: recipients, windowStartMs: startMs, windowEndMs: endMs
    }}, resolve);
  });

  if (resp && resp.ok) {
    S.bgSendJob = { status: "scheduled", progress: { total: recipients.length, sent: 0, errors: 0, done: false, results: [] }};
    S.smartSendEnabled = false;
    render();
    startBgSendPolling();
  } else {
    S.error = (resp && resp.error) || "Could not start smart send.";
    render();
  }
}

async function cancelSmartSend() {
  await new Promise(function(resolve) {
    chrome.runtime.sendMessage({ type: "smartsend:cancel" }, resolve);
  });
  S.bgSendJob = null;
  stopBgSendPolling();
  render();
}

// ═══════════════════════════════════════════════════════════════════
// FEATURE 6: Background send progress
// ═══════════════════════════════════════════════════════════════════

let bgPollInterval = null;

function startBgSendPolling() {
  if (S.bgSendPolling) return;
  S.bgSendPolling = true;
  bgPollInterval = setInterval(async function() {
    const resp = await new Promise(function(resolve) {
      chrome.runtime.sendMessage({ type: "send:get-progress" }, resolve);
    });
    if (resp && resp.ok && resp.data) {
      S.bgSendJob = resp.data;
      render();
      if (resp.data.progress && resp.data.progress.done) {
        stopBgSendPolling();
      }
    }
  }, 1500);
}

function stopBgSendPolling() {
  S.bgSendPolling = false;
  if (bgPollInterval) { clearInterval(bgPollInterval); bgPollInterval = null; }
}

async function cancelBgSend() {
  await new Promise(function(resolve) {
    chrome.runtime.sendMessage({ type: "send:cancel" }, resolve);
  });
  stopBgSendPolling();
  S.bgSendJob = null;
  render();
}

function renderBgSendBanner() {
  let out = "";

  // Scheduled job banner
  if (S.scheduledJob && (S.scheduledJob.status === "scheduled" || S.scheduledJob.status === "running")) {
    const dt = S.scheduledJob.scheduledAt ? new Date(S.scheduledJob.scheduledAt).toLocaleString() : "—";
    out += '<div style="margin:0 0 12px;background:linear-gradient(135deg,#0f2d1a,#0a1f11);border:1px solid #2d6e47;border-radius:var(--radius-lg);padding:12px 14px;display:flex;align-items:center;gap:10px">';
    out += '<div style="flex:1">';
    out += '<div style="font-size:12px;font-weight:700;color:#4ade80;margin-bottom:2px">🕐 Campaign Scheduled</div>';
    out += '<div style="font-size:11px;color:rgba(255,255,255,0.6)">' + esc(S.scheduledJob.subject || "Campaign") + ' · ' + esc(dt) + '</div>';
    out += '</div>';
    out += '<button class="btn btn-danger btn-mini" data-action="cancel-schedule">Cancel</button>';
    out += '</div>';
  }

  // Smart send / background job banner
  if (S.bgSendJob && S.bgSendJob.status !== "idle") {
    const p = S.bgSendJob.progress || {};
    const pct = p.total > 0 ? Math.round(((p.sent + p.errors) / p.total) * 100) : 0;
    const statusLabel = {
      scheduled: "⚡ Smart Send Scheduled",
      running: "⚡ Sending in Background…",
      done: "✅ Smart Send Complete",
      error: "❌ Smart Send Error",
      cancelled: "Cancelled"
    }[S.bgSendJob.status] || S.bgSendJob.status;

    out += '<div style="margin:0 0 12px;background:var(--bg2);border:1px solid var(--bd);border-radius:var(--radius-lg);padding:12px 14px">';
    out += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">';
    out += '<span style="font-size:12px;font-weight:700;color:var(--tx)">' + statusLabel + '</span>';
    if (S.bgSendJob.status === "running" || S.bgSendJob.status === "scheduled") {
      out += '<button class="btn btn-ghost btn-mini" data-action="cancel-smart-send">Cancel</button>';
    } else {
      out += '<button class="btn btn-ghost btn-mini" data-action="cancel-bg-send">Dismiss</button>';
    }
    out += '</div>';
    if (p.total > 0) {
      out += '<div style="background:var(--bg3);border-radius:999px;height:6px;overflow:hidden;margin-bottom:6px">';
      out += '<div style="height:100%;width:' + pct + '%;background:var(--acc);border-radius:999px;transition:width 0.4s ease"></div>';
      out += '</div>';
      out += '<div style="font-size:11px;color:var(--tx3)">' + p.sent + ' sent · ' + p.errors + ' errors · ' + pct + '% complete</div>';
    }
    if (S.bgSendJob.error) {
      out += '<div style="font-size:11px;color:#ef4444;margin-top:4px">' + esc(S.bgSendJob.error) + '</div>';
    }
    out += '</div>';
  }
  return out;
}

// ═══════════════════════════════════════════════════════════════════
// FEATURE 1: Drip sequences
// ═══════════════════════════════════════════════════════════════════

function openDrip() {
  if (!S.history.length) {
    S.error = "Run at least one campaign first. Drip sequences send follow-up steps to contacts from your campaign history.";
    render();
    return;
  }
  S.view = "drip";
  S.error = null;
  render();
}

function syncDripStep() {
  const idx = S.activeDripStep;
  const step = S.dripSteps[idx];
  if (!step) return;
  const subj = document.getElementById("drip_subject_" + idx);
  const body = document.getElementById("drip_body_" + idx);
  const html = document.getElementById("drip_html_" + idx);
  const days = document.getElementById("drip_days_" + idx);
  if (subj) step.subject = subj.value;
  if (body) step.body = body.value;
  if (html) step.html = html.value;
  if (days) step.delayDays = parseInt(days.value, 10) || 3;
}

async function doDripStep(stepIdx, isTest) {
  syncDripStep();
  const step = S.dripSteps[stepIdx];
  if (!step || !step.enabled) {
    S.error = "This step is disabled.";
    render();
    return;
  }
  if (!step.subject.trim()) {
    S.error = "Add a subject for this drip step.";
    render();
    return;
  }
  if (!step.body.trim() && !step.html.trim()) {
    S.error = "Write the body for this drip step.";
    render();
    return;
  }

  // Need a campaign to follow up on — pick from history or require user to select
  if (!S.selectedSheet) {
    S.error = "Select a campaign sheet first. Click 'New Campaign' to pick a sheet, then come back to Drip.";
    render();
    return;
  }

  const testEmail = S.followUpTestEmail || S.testEmail;
  if (isTest && !testEmail) {
    S.error = "Enter a test email in Follow-up Settings.";
    render();
    return;
  }

  const htmlBody = step.html.trim() || plainTextToHtml(step.body);
  const plainBody = step.body.trim() || htmlToPlainText(step.html);

  const config = {
    spreadsheetId: S.selectedSheet.id,
    sheetTab: S.selectedTab,
    subject: step.subject,
    body: plainBody,
    htmlBody: htmlBody,
    fromName: S.followUpFromName || S.fromName,
    replyTo: S.followUpReplyTo || S.replyTo,
    testEmail: isTest ? testEmail : "",
    testMode: isTest,
    delayMs: S.followUpDelayMs || S.delayMs,
    stepIndex: stepIdx,
    noThread: false
  };

  S.view = "dripsending";
  S.error = null;
  render();

  const res = await api("sendDripStep", { config: config });
  if (res.ok) {
    const results = Array.isArray(res.data) ? res.data : [];
    // Find parent campaign for per-campaign drip tracking
    var dripParentCamp = DB.dripCampId
      ? (S.history || []).find(function(c){ return c.id === DB.dripCampId; })
      : null;
    S.lastRun = {
      id: "drip_" + Date.now(),
      type: "drip",
      step: stepIdx + 1,
      subject: step.subject,
      results: results,
      summary: summarizeResults(results, isTest, S.selectedSheet ? S.selectedSheet.name : ""),
      parentId: dripParentCamp ? dripParentCamp.id : null,
      parentName: dripParentCamp ? (dripParentCamp.name || dripParentCamp.sheetName || '') : ''
    };
    if (!isTest) {
      const sent = results.filter(function(r) { return r.status === "SENT"; }).length;
      const errors = results.filter(function(r) { return r.status !== "SENT"; }).length;
      // Save to history with campaign link
      var dripRecord = {
        id: S.lastRun.id,
        type: 'drip',
        name: 'Drip Step ' + (stepIdx+1) + ': ' + step.subject,
        subject: step.subject,
        date: new Date().toLocaleDateString(),
        total: sent,
        errors: errors,
        status: 'sent',
        tags: ['drip', 'step-' + (stepIdx+1)],
        parentId: S.lastRun.parentId,
        parentName: S.lastRun.parentName,
        stepIndex: stepIdx
      };
      if (!S.history) S.history = [];
      S.history.unshift(dripRecord);
      chrome.storage.local.set({ mb_history: S.history });
      await billingRequest("billing:record-send", { count: sent });
      await refreshBillingState();
    }
    S.view = "dripresults";
  } else {
    S.error = res.error || "Drip step failed.";
    S.view = "drip";
  }
  render();
}

function vDrip() {
  const isPremium = true;
  if (!isPremium) {
    return '<div class="panel"><div class="panel-title">💎 Premium Feature</div>' +
      '<div class="panel-sub">Drip sequences are available on the Premium plan.</div>' +
      '<div class="btn-row" style="margin-top:12px"><button class="btn btn-pri btn-mini" data-action="open-upgrade" data-plan="premium">Доступно бесплатно</button></div></div>';
  }

  let out = '';

  // Step selector tabs
  out += '<div style="margin-bottom:16px">';
  out += '<div style="font-size:13px;color:var(--tx2);margin-bottom:10px">A drip sequence sends follow-up emails to contacts who already received your original campaign. Each step targets only people who completed all previous steps.</div>';
  out += '<div class="seg">';
  for (let i = 0; i < S.dripSteps.length; i++) {
    const step = S.dripSteps[i];
    const isActive = S.activeDripStep === i;
    const statusDot = step.enabled ? '<span class="dot dot-grn" style="margin-right:4px"></span>' : '<span class="dot" style="background:var(--tx3);margin-right:4px"></span>';
    out += '<button class="seg-btn' + (isActive ? " active" : "") + '" data-action="drip-select-step" data-step="' + i + '">';
    out += statusDot + 'Step ' + (i + 1);
    out += '</button>';
  }
  out += '</div></div>';

  // Active step editor
  const idx = S.activeDripStep;
  const step = S.dripSteps[idx];
  if (!step) return out;

  const canHtml = isPremium;
  out += '<div class="panel">';
  out += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">';
  out += '<div class="panel-title" style="margin:0">Step ' + (idx + 1) + (idx === 0 ? ' — First Follow-up' : idx === 1 ? ' — Second Follow-up' : ' — Final Follow-up') + '</div>';
  out += '<label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer;color:var(--tx2)">';
  out += '<input type="checkbox" data-action="drip-toggle-step" data-step="' + idx + '"' + (step.enabled ? " checked" : "") + ' style="accent-color:var(--acc)">';
  out += 'Enabled</label>';
  out += '</div>';

  // Delay days
  out += '<div class="field">';
  out += '<label class="label">Send delay (days after previous step)</label>';
  out += '<input class="inp" id="drip_days_' + idx + '" type="number" min="1" max="90" value="' + step.delayDays + '" style="width:80px">';
  out += '<span class="hint">Shown for reference — you manually trigger each step from this panel.</span></div>';

  // Subject
  out += '<div class="field"><label class="label">Subject</label>';
  out += '<input class="inp" id="drip_subject_' + idx + '" type="text" value="' + escAttr(step.subject) + '" placeholder="Re: [Original subject]">';
  out += '</div>';

  // Editor mode toggle
  out += '<div class="seg" style="margin-bottom:10px">';
  out += '<button class="seg-btn' + (step.editorMode === "write" ? " active" : "") + '" data-action="drip-set-editor-mode" data-mode="write">Write</button>';
  if (canHtml) {
    out += '<button class="seg-btn' + (step.editorMode === "html" ? " active" : "") + '" data-action="drip-set-editor-mode" data-mode="html">HTML</button>';
  }
  out += '</div>';

  if (step.editorMode === "html") {
    out += '<div class="field"><label class="label">HTML body</label>';
    out += '<textarea class="inp" id="drip_html_' + idx + '" rows="8" style="font-family:var(--font-mono);font-size:11px">' + esc(step.html) + '</textarea></div>';
  } else {
    out += '<div class="field"><label class="label">Body</label>';
    out += '<textarea class="inp" id="drip_body_' + idx + '" rows="6" placeholder="Hi {{Name}},\n\nJust following up on my previous email...">' + esc(step.body) + '</textarea></div>';
  }

  out += '<div class="note">Use {{merge}} tokens from your sheet — same as the main compose panel.</div>';

  // Sheet context
  if (S.selectedSheet) {
    out += '<div style="font-size:11px;color:var(--tx3);margin:8px 0">📋 Targeting: <strong style="color:var(--tx2)">' + esc(S.selectedSheet.name) + '</strong> — contacts from your original campaign</div>';
  } else {
    out += '<div class="note" style="border-color:#f59e0b;background:rgba(245,158,11,0.08)">⚠️ No sheet selected. <button class="btn btn-ghost btn-mini" data-action="start-campaign">Select a Sheet</button></div>';
  }

  // Send actions
  out += '<div class="btn-row" style="margin-top:14px;gap:8px">';
  out += '<button class="btn btn-pri" data-action="send-drip-step" data-step="' + idx + '"' + (!step.enabled ? " disabled style=\"opacity:0.4\"" : "") + '>↗ Send Step ' + (idx + 1) + '</button>';
  out += '<button class="btn btn-sec" data-action="test-drip-step" data-step="' + idx + '">Send Test</button>';
  out += '</div>';
  out += '</div>';

  // Step overview — mini timeline
  out += '<div class="panel">';
  out += '<div class="panel-title" style="margin-bottom:10px">Sequence Timeline</div>';
  for (let i = 0; i < S.dripSteps.length; i++) {
    const s = S.dripSteps[i];
    const isActive2 = S.activeDripStep === i;
    out += '<div style="display:flex;align-items:flex-start;gap:10px;padding:8px 0;border-bottom:1px solid var(--bd)">';
    out += '<div style="width:22px;height:22px;border-radius:50%;background:' + (s.enabled ? 'var(--acc)' : 'var(--bg3)') + ';display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:' + (s.enabled ? '#fff' : 'var(--tx3)') + ';flex-shrink:0">' + (i + 1) + '</div>';
    out += '<div style="flex:1;min-width:0">';
    out += '<div style="font-size:12px;font-weight:600;color:' + (isActive2 ? 'var(--acc)' : 'var(--tx)') + '">' + (s.subject || '(no subject)') + '</div>';
    out += '<div style="font-size:11px;color:var(--tx3)">Day +' + s.delayDays + (s.enabled ? '' : ' · disabled') + '</div>';
    out += '</div></div>';
  }
  out += '</div>';

  return out;
}

function vDripSending() {
  return '<div class="sending"><div class="spinner"></div><div class="sending-txt">Sending drip step…</div></div>';
}

function vDripResults() {
  const run = S.lastRun;
  if (!run || run.type !== "drip") return '<div class="panel"><div class="empty">No drip results yet.</div></div>';

  const results = run.results || [];
  const sent    = results.filter(function(r) { return r.status === "SENT"; }).length;
  const errors  = results.filter(function(r) { return r.status === "ERROR"; }).length;
  const skipped = results.length - sent - errors;

  let out = '';
  out += '<div class="panel">';
  out += '<div class="panel-title">Step ' + (run.step || "?") + ' Complete</div>';
  out += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px">';
  out += '<div class="stat"><span class="stat-n" style="color:#4ade80">' + sent + '</span><span class="stat-l">Sent</span></div>';
  out += '<div class="stat"><span class="stat-n" style="color:#f87171">' + errors + '</span><span class="stat-l">Errors</span></div>';
  out += '<div class="stat"><span class="stat-n" style="color:var(--tx3)">' + skipped + '</span><span class="stat-l">Skipped</span></div>';
  out += '</div></div>';

  if (S.activeDripStep < S.dripSteps.length - 1 && S.dripSteps[S.activeDripStep + 1].enabled) {
    const nextStep = S.dripSteps[S.activeDripStep + 1];
    out += '<div class="panel"><div class="panel-title">Next: Step ' + (S.activeDripStep + 2) + '</div>';
    out += '<div class="panel-sub">Come back in ' + nextStep.delayDays + ' days to send the next step.</div></div>';
  }

  out += '<div class="btn-row" style="margin-top:14px;gap:8px">';
  out += '<button class="btn btn-sec" data-action="go" data-view="drip">Back to Drip</button>';
  out += '<button class="btn btn-ghost" data-action="go-home">Home</button>';
  out += '</div>';
  return out;
}

// ── Per-campaign drip send ─────────────────────────────────────────
async function dbDripSendStep(campId, stepIdx, camp, step) {
  if (!S.scriptUrl) { S.error = "No backend configured. Add a backend in Settings first."; render(); return; }

  DB.tab = "drips";
  S.error = null;
  S.success = null;
  // Mark step as sending in UI
  var sendSteps = dbDripStepsForCampaign(campId).slice();
  if (sendSteps[stepIdx]) { sendSteps[stepIdx].status = 'sending'; }
  dbSaveDripSteps(campId, sendSteps);
  render();

  try {
    var htmlBody = plainTextToHtml(step.body || '');
    var config = {
      spreadsheetId: camp.sheetId,
      sheetTab: camp.sheetTab || '',
      subject: step.subject,
      body: step.body || '',
      htmlBody: htmlBody,
      fromName: S.fromName || '',
      replyTo: S.replyTo || '',
      testEmail: '',
      testMode: false,
      delayMs: S.delayMs || 500,
      noThread: false,
      customFields: {}
    };

    var res = await api("sendFollowUp", { config: config });

    var curSteps = dbDripStepsForCampaign(campId).slice();
    if (res.ok) {
      var results = Array.isArray(res.data) ? res.data : [];
      var sent = 0, errors = 0;
      results.forEach(function(r){ if (r.status === "SENT") sent++; else errors++; });

      if (curSteps[stepIdx]) { curSteps[stepIdx].status = 'sent'; curSteps[stepIdx].sentAt = new Date().toISOString(); curSteps[stepIdx].sentCount = sent; }
      dbSaveDripSteps(campId, curSteps);

      // Save to history
      var dripRec = {
        id: 'drip_' + Date.now(), type: 'drip',
        name: 'Step ' + (stepIdx+1) + ': ' + step.subject,
        subject: step.subject,
        date: new Date().toLocaleDateString(),
        total: sent, errors: errors, status: 'sent',
        tags: ['drip', 'step-'+(stepIdx+1)],
        parentId: campId, parentName: camp.name || camp.sheetName || '',
        stepIndex: stepIdx
      };
      if (!S.history) S.history = [];
      S.history.unshift(dripRec);
      S.stats.sent = (S.stats.sent || 0) + sent;
      chrome.storage.local.set({ mb_history: S.history, mb_stats: S.stats });

      S.success = "Step " + (stepIdx+1) + " sent to " + sent + " recipients!";
    } else {
      if (curSteps[stepIdx]) { curSteps[stepIdx].status = 'pending'; }
      dbSaveDripSteps(campId, curSteps);
      S.error = res.error || "Drip step failed to send.";
    }
  } catch(e) {
    var failSteps = dbDripStepsForCampaign(campId).slice();
    if (failSteps[stepIdx]) { failSteps[stepIdx].status = 'pending'; }
    dbSaveDripSteps(campId, failSteps);
    S.error = e.message || "Send failed.";
  }
  render();
  if (S.success) setTimeout(function(){ S.success = null; render(); }, 4000);
}

// ═══════════════════════════════════════════════════════════════════

function handleActionClick(event) {
  const actionEl = event.target.closest("[data-action]");
  if (!actionEl) {
    return;
  }

  const action = actionEl.getAttribute("data-action");
  if (action === "go") {
    go(actionEl.getAttribute("data-view") || "home");
    return;
  }
  if (action === "clear-error") {
    clearError();
    return;
  }
  if (action === "start-campaign") {
    startCampaign();
    return;
  }
  if (action === "set-settings-tab") {
    S.settingsTab = actionEl.getAttribute("data-tab") || "backends";
    render();
    return;
  }
  if (action === "set-font") {
    setFont(actionEl.getAttribute("data-font") || "system");
    return;
  }
  if (action === "resume-draft") {
    resumeDraft();
    return;
  }
  if (action === "connect-sheet") {
    connectSpreadsheet();
    return;
  }
  if (action === "pick-sheet") {
    pickSheet(Number(actionEl.getAttribute("data-index")));
    return;
  }
  if (action === "load-draft") {
    loadDraft(Number(actionEl.getAttribute("data-index")));
    return;
  }
  if (action === "copy-backend-code") {
    copyBackendCode();
    return;
  }
  if (action === "add-backend") {
    addBackend();
    return;
  }
  if (action === "select-backend") {
    selectBackend(Number(actionEl.getAttribute("data-index")));
    return;
  }
  if (action === "remove-backend") {
    removeBackend(Number(actionEl.getAttribute("data-index")));
    return;
  }
  if (action === "open-upgrade") {
    openUpgrade();
    return;
  }
  if (action === "open-login") {
    openLogin();
    return;
  }
  if (action === "open-manage") {
    openManageSubscription();
    return;
  }
  if (action === "sync-extpay") {
    syncExtPayStatus();
    return;
  }
  if (action === "clear-draft") {
    clearDraft();
    return;
  }
  if (action === "clear-template") {
    clearTemplate();
    return;
  }
  if (action === "set-editor-mode") {
    const requestedMode = actionEl.getAttribute("data-mode") || "write";
    if (requestedMode === "html" && S.billing.activePlan !== "pro" && S.billing.activePlan !== "premium") {
      openUpgrade();
      return;
    }
    syncComposeFields();
    S.editorMode = requestedMode;
    render();
    return;
  }
  if (action === "toggle-section") {
    toggleSection(actionEl.getAttribute("data-section") || "");
    return;
  }
  if (action === "toggle-guide-section") {
    const sectionKey = actionEl.getAttribute("data-section") || "";
    const guideKeys = (actionEl.getAttribute("data-guide-keys") || "").split(",").filter(Boolean);
    // Mutually exclusive: close all other guide sections, then toggle this one
    const wasOpen = !!S.sectionOpen[sectionKey];
    guideKeys.forEach(function(k) { S.sectionOpen[k] = false; });
    S.sectionOpen[sectionKey] = !wasOpen;
    render();
    return;
  }
  if (action === "insert-tag") {
    insertTag(actionEl.getAttribute("data-tag") || "");
    return;
  }
  if (action === "toggle-image-insert") {
    if (S.billing.activePlan !== "pro" && S.billing.activePlan !== "premium") {
      openUpgrade();
      return;
    }
    syncComposeFields();
    if (S.editorMode !== "html") {
      if (S.composeBody.trim()) {
        S.composeHtml = plainTextToHtml(S.composeBody);
      }
      S.editorMode = "html";
    }
    S.showImageInsert = !S.showImageInsert;
    render();
    if (S.showImageInsert) {
      setTimeout(function() {
        const el = document.getElementById("imageUrlInput");
        if (el) el.focus();
      }, 50);
    }
    return;
  }
  if (action === "confirm-image-insert") {
    confirmImageInsert();
    return;
  }
  if (action === "remove-attachment") {
    removeAttachment(Number(actionEl.getAttribute("data-index")));
    return;
  }
  if (action === "send-test") {
    doSend(true);
    return;
  }
  if (action === "send-live") {
    doSend(false);
    return;
  }
  if (action === "duplicate-campaign") {
    duplicateCampaign(actionEl.getAttribute("data-id") || "");
    return;
  }
  if (action === "delete-campaign") {
    deleteCampaign(actionEl.getAttribute("data-id") || "");
    return;
  }
  if (action === "view-campaign-results") {
    viewCampaignResults(actionEl.getAttribute("data-id") || "");
    return;
  }
  if (action === "go-home") {
    goHome();
    return;
  }
  if (action === "start-followup") {
    if (S.billing.activePlan !== "premium") {
      openUpgrade();
      return;
    }
    startFollowUp(actionEl.getAttribute("data-id") || "");
    return;
  }
  if (action === "set-followup-editor-mode") {
    const requestedFuMode = actionEl.getAttribute("data-mode") || "write";
    if (requestedFuMode === "html" && S.billing.activePlan !== "pro" && S.billing.activePlan !== "premium") {
      openUpgrade();
      return;
    }
    syncFollowUpFields();
    S.followUpEditorMode = requestedFuMode;
    render();
    return;
  }
  if (action === "send-followup-live") {
    doFollowUp(false);
    return;
  }
  if (action === "send-followup-test") {
    doFollowUp(true);
    return;
  }
  if (action === "copy-backend-code-followup") {
    copyBackendCode();
    return;
  }
  if (action === "followup-select-all") {
    S.followUpRecipients.forEach(function(r) { r.selected = true; });
    S.followUpRecipientSearch = "";
    render();
    return;
  }
  if (action === "followup-deselect-all") {
    S.followUpRecipients.forEach(function(r) { r.selected = false; });
    S.followUpRecipientSearch = "";
    render();
    return;
  }
  if (action === "followup-toggle-recipient") {
    // Only handle via click for the tag × button (not checkboxes — those use handleChange)
    if (actionEl.tagName === "BUTTON") {
      const idx = Number(actionEl.getAttribute("data-index"));
      if (S.followUpRecipients[idx]) {
        S.followUpRecipients[idx].selected = false; // × always deselects
        render();
      }
    }
    return;
  }
  if (action === "fu-insert-field") {
    const fieldName = actionEl.getAttribute("data-field") || "";
    const token = "{{" + fieldName + "}}";
    const targetId = S.followUpEditorMode === "html" ? "followUpHtml" : "followUpBody";
    const textarea = document.getElementById(targetId);
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const val = textarea.value;
      textarea.value = val.slice(0, start) + token + val.slice(end);
      textarea.selectionStart = textarea.selectionEnd = start + token.length;
      textarea.focus();
      // Sync state
      if (S.followUpEditorMode === "html") {
        S.followUpHtml = textarea.value;
      } else {
        S.followUpBody = textarea.value;
      }
    }
    return;
  }
  if (action === "add-fu-custom-field") {
    if (!S.followUpCustomFields) S.followUpCustomFields = [];
    S.followUpCustomFields.push({ key: "", value: "" });
    render();
    return;
  }
  if (action === "remove-fu-custom-field") {
    const idx = Number(actionEl.getAttribute("data-index"));
    S.followUpCustomFields.splice(idx, 1);
    render();
    return;
  }
  if (action === "set-lang") {
    const langCode = actionEl.getAttribute("data-lang") || "ru";
    S.lang = langCode;
    setLang(langCode);
    chrome.storage.local.set({ mb_lang: langCode });
    render();
    return;
  }
  if (action === "toggle-theme") {
    toggleTheme();
    return;
  }
  if (action === "set-theme") {
    var theme = actionEl.getAttribute("data-theme") || "dark";
    S.theme = theme;
    chrome.storage.local.set({ mb_theme: theme });
    render();
    return;
  }
  if (action === "toggle-fonts") {
    S.settingsShowFonts = !S.settingsShowFonts;
    render();
    return;
  }
  // ── Feature 9/10/3/5 toggles ─────────────────────────────────────
  if (action === "toggle-unsub") {
    syncComposeFields();
    S.unsubscribeEnabled = !S.unsubscribeEnabled;
    render();
    return;
  }
  if (action === "toggle-schedule") {
    syncComposeFields();
    S.scheduleEnabled = !S.scheduleEnabled;
    if (S.scheduleEnabled) S.smartSendEnabled = false; // mutually exclusive
    render();
    return;
  }
  if (action === "toggle-smart-send") {
    syncComposeFields();
    S.smartSendEnabled = !S.smartSendEnabled;
    if (S.smartSendEnabled) S.scheduleEnabled = false; // mutually exclusive
    render();
    return;
  }
  // ── Scheduled send ────────────────────────────────────────────────
  if (action === "send-schedule") {
    doScheduledSend();
    return;
  }
  if (action === "cancel-schedule") {
    cancelSchedule();
    return;
  }
  // ── Smart send ────────────────────────────────────────────────────
  if (action === "send-smart") {
    doSmartSend();
    return;
  }
  if (action === "cancel-smart-send") {
    cancelSmartSend();
    return;
  }
  // ── Background send cancel ────────────────────────────────────────
  if (action === "cancel-bg-send") {
    cancelBgSend();
    return;
  }
  // ── Drip sequences (Feature 1) ────────────────────────────────────
  if (action === "open-drip") {
    if (S.billing.activePlan !== "premium") { openUpgrade(); return; }
    openDrip();
    return;
  }
  if (action === "drip-select-step") {
    syncDripStep();
    S.activeDripStep = parseInt(actionEl.getAttribute("data-step") || "0", 10);
    render();
    return;
  }
  if (action === "drip-toggle-step") {
    const idx = parseInt(actionEl.getAttribute("data-step") || "0", 10);
    if (S.dripSteps[idx]) {
      S.dripSteps[idx].enabled = !S.dripSteps[idx].enabled;
      render();
    }
    return;
  }
  if (action === "drip-set-editor-mode") {
    const idx = S.activeDripStep;
    const mode = actionEl.getAttribute("data-mode") || "write";
    if (mode === "html" && S.billing.activePlan !== "pro" && S.billing.activePlan !== "premium") {
      openUpgrade(); return;
    }
    if (S.dripSteps[idx]) { S.dripSteps[idx].editorMode = mode; render(); }
    return;
  }
  if (action === "send-drip-step") {
    const stepIdx = parseInt(actionEl.getAttribute("data-step") || "0", 10);
    doDripStep(stepIdx, false);
    return;
  }
  if (action === "test-drip-step") {
    const stepIdx = parseInt(actionEl.getAttribute("data-step") || "0", 10);
    doDripStep(stepIdx, true);
    return;
  }
  // ── Dashboard navigation ──────────────────────────────────────────
  if (action === "db-tab") {
    DB.tab = actionEl.getAttribute("data-tab") || "overview";
    render();
    return;
  }
  if (action === "db-campaign-search") {
    return;
  }
  if (action === "db-filter") {
    DB.campaignFilter = actionEl.getAttribute("data-filter") || "all";
    render();
    return;
  }
  if (action === "db-new-campaign") {
    go("home");
    setTimeout(function() { startCampaign(); }, 80);
    return;
  }
  if (action === "db-open-settings") {
    go("settings");
    return;
  }
  if (action === "db-open-billing") {
    S.settingsTab = "billing";
    go("settings");
    return;
  }
  if (action === "db-toggle-fullscreen") {
    // Open dashboard as a new tab in the same browser
    chrome.tabs.create({
      url: chrome.runtime.getURL("popup.html") + "?fs=1"
    });
    return;
  }
  if (action === "db-close-window") {
    // Close this tab
    window.close();
    return;
  }
  // ── Contacts actions ──────────────────────────────────────────────
  if (action === "contacts-show-add") {
    DB.contactShowAdd = true;
    DB.contactEditId = null;
    DB.contactAddForm = { name: "", email: "", tags: "", customFields: "" };
    render();
    setTimeout(function() { var el = document.getElementById("contactFormEmail"); if (el) el.focus(); }, 60);
    return;
  }
  if (action === "contacts-cancel-add") {
    DB.contactShowAdd = false;
    render();
    return;
  }
  if (action === "contacts-save-add") {
    var nameEl  = document.getElementById("contactFormName");
    var emailEl = document.getElementById("contactFormEmail");
    var tagsEl  = document.getElementById("contactFormTags");
    var cfEl    = document.getElementById("contactFormCF");
    var email = emailEl ? emailEl.value.trim() : DB.contactAddForm.email;
    if (!email || !email.includes("@")) { S.error = "Please enter a valid email address."; render(); return; }
    // Check duplicate
    if (S.contacts.some(function(c) { return c.email.toLowerCase() === email.toLowerCase(); })) {
      S.error = "A contact with this email already exists."; render(); return;
    }
    S.contacts.push({
      id: contactsGenerateId(),
      name: nameEl ? nameEl.value.trim() : DB.contactAddForm.name,
      email: email,
      tags: contactsParseTags(tagsEl ? tagsEl.value : DB.contactAddForm.tags),
      customFields: contactsParseCustomFields(cfEl ? cfEl.value : DB.contactAddForm.customFields),
      createdAt: new Date().toISOString(),
      source: "manual"
    });
    contactsSave();
    DB.contactShowAdd = false;
    DB.contactAddForm = { name: "", email: "", tags: "", customFields: "" };
    render();
    return;
  }
  if (action === "contacts-edit") {
    DB.contactEditId = actionEl.getAttribute("data-id") || null;
    DB.contactShowAdd = false;
    render();
    setTimeout(function() { var el = document.getElementById("contactFormName"); if (el) el.focus(); }, 60);
    return;
  }
  if (action === "contacts-cancel-edit") {
    DB.contactEditId = null;
    render();
    return;
  }
  if (action === "contacts-save-edit") {
    var editId   = actionEl.getAttribute("data-id") || DB.contactEditId;
    var nameElE  = document.getElementById("contactFormName");
    var emailElE = document.getElementById("contactFormEmail");
    var tagsElE  = document.getElementById("contactFormTags");
    var cfElE    = document.getElementById("contactFormCF");
    var editEmail = emailElE ? emailElE.value.trim() : "";
    if (!editEmail || !editEmail.includes("@")) { S.error = "Please enter a valid email address."; render(); return; }
    var idx = S.contacts.findIndex(function(c) { return c.id === editId; });
    if (idx !== -1) {
      S.contacts[idx] = Object.assign({}, S.contacts[idx], {
        name: nameElE ? nameElE.value.trim() : S.contacts[idx].name,
        email: editEmail,
        tags: contactsParseTags(tagsElE ? tagsElE.value : ""),
        customFields: contactsParseCustomFields(cfElE ? cfElE.value : "")
      });
      contactsSave();
    }
    DB.contactEditId = null;
    render();
    return;
  }
  if (action === "contacts-delete") {
    var delId = actionEl.getAttribute("data-id") || "";
    S.contacts = S.contacts.filter(function(c) { return c.id !== delId; });
    contactsSave();
    render();
    return;
  }
  if (action === "contacts-tag-filter") {
    DB.contactTagFilter = actionEl.getAttribute("data-tag") || "";
    render();
    return;
  }
  if (action === "contacts-export-csv") {
    contactsExportCSV();
    return;
  }
  if (action === "contacts-confirm-import") {
    if (!DB.contactImportPreview) return;
    var imported = 0, skipped = 0;
    var existing = S.contacts.map(function(c) { return c.email.toLowerCase(); });
    for (var pi = 0; pi < DB.contactImportPreview.length; pi++) {
      var p = DB.contactImportPreview[pi];
      if (existing.indexOf(p.email.toLowerCase()) !== -1) { skipped++; continue; }
      S.contacts.push({
        id: contactsGenerateId(),
        name: p.name || "",
        email: p.email,
        tags: p.tags || [],
        customFields: p.customFields || {},
        createdAt: new Date().toISOString(),
        source: "csv"
      });
      existing.push(p.email.toLowerCase());
      imported++;
    }
    contactsSave();
    DB.contactImportPreview = null;
    DB.contactImportError = "";
    S.error = null;
    render();
    // Show brief success note
    setTimeout(function() {
      var el = document.getElementById("dbMain");
      if (el) {
        var note = document.createElement("div");
        note.style.cssText = "position:fixed;bottom:20px;right:20px;background:var(--grn);color:#fff;padding:10px 16px;border-radius:10px;font-size:12px;font-weight:700;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,0.3)";
        note.textContent = "✓ Imported " + imported + " contacts" + (skipped > 0 ? " · " + skipped + " duplicates skipped" : "");
        document.body.appendChild(note);
        setTimeout(function() { note.remove(); }, 3000);
      }
    }, 100);
    return;
  }
  if (action === "contacts-cancel-import") {
    DB.contactImportPreview = null;
    DB.contactImportError = "";
    render();
    return;
  }
  if (action === "contacts-start-campaign") {
    S.campaignSource = "contacts";
    S.selectedContactListId = null;
    startCampaignFromContacts(null);
    return;
  }
  if (action === "contacts-start-campaign-tag") {
    var tag = actionEl.getAttribute("data-tag") || null;
    S.campaignSource = "contacts";
    S.selectedContactListId = tag;
    startCampaignFromContacts(tag);
    return;
  }

  // ── New design-system dashboard actions ───────────────────────────

  // Sidebar toggle (collapse/expand)
  if (action === "db-toggle-sidebar") {
    DB.sidebarCollapsed = !DB.sidebarCollapsed;
    render();
    return;
  }

  // Sidebar nav (replaces old db-tab)
  if (action === "db-nav") {
    var navTab = actionEl.getAttribute("data-tab") || "overview";
    DB.tab = navTab;
    render();
    // When navigating to campaigns tab, silently pre-fetch recipients for recent campaigns
    if (navTab === "campaigns") {
      setTimeout(function() {
        (S.history || []).slice(0, 10).forEach(function(c) {
          if (c.sheetId) preFetchFollowUpRecipients(c.id);
        });
      }, 300);
    }
    return;
  }

  // Campaign filter tabs in Campaigns panel
  if (action === "db-campaign-filter") {
    DB.campaignFilter = actionEl.getAttribute("data-filter") || "all";
    render();
    return;
  }

  // ── Campaign selection & bulk delete ─────────────────────────────
  // Toggle single row checkbox
  if (action === "db-camp-toggle-select") {
    var togId = actionEl.getAttribute("data-id");
    if (!togId) return;
    if (!DB.selectedCampaignIds) DB.selectedCampaignIds = {};
    if (DB.selectedCampaignIds[togId]) {
      delete DB.selectedCampaignIds[togId];
    } else {
      DB.selectedCampaignIds[togId] = true;
    }
    render();
    return;
  }
  // Select all currently filtered campaigns
  if (action === "db-camp-select-all-filtered") {
    if (!DB.selectedCampaignIds) DB.selectedCampaignIds = {};
    var allF = (S.history || []).filter(function(c) {
      var f = DB.campaignFilter || 'all';
      var sq = DB.campaignSearch || '';
      if (f !== 'all' && c.type !== f) return false;
      if (sq && (c.name||c.sheetName||'').toLowerCase().indexOf(sq.toLowerCase()) === -1) return false;
      return true;
    });
    var allSel = allF.every(function(c){ return DB.selectedCampaignIds[c.id]; });
    if (allSel) {
      // deselect all filtered
      allF.forEach(function(c){ delete DB.selectedCampaignIds[c.id]; });
    } else {
      // select all filtered
      allF.forEach(function(c){ DB.selectedCampaignIds[c.id] = true; });
    }
    render();
    return;
  }
  // Deselect all
  if (action === "db-camp-select-none") {
    DB.selectedCampaignIds = {};
    render();
    return;
  }
  // Delete a single campaign
  if (action === "db-camp-delete-one") {
    var delOneId = actionEl.getAttribute("data-id");
    if (!delOneId) return;
    if (!confirm("Delete this campaign? This cannot be undone.")) return;
    S.history = (S.history || []).filter(function(c){ return c.id !== delOneId; });
    delete (DB.selectedCampaignIds || {})[delOneId];
    chrome.storage.local.set({ mb_history: S.history });
    render();
    return;
  }
  // Delete all selected campaigns
  if (action === "db-camp-delete-selected") {
    var toDelIds = DB.selectedCampaignIds || {};
    var count = Object.keys(toDelIds).length;
    if (count === 0) return;
    if (!confirm("Delete " + count + " campaign" + (count === 1 ? "" : "s") + "? This cannot be undone.")) return;
    S.history = (S.history || []).filter(function(c){ return !toDelIds[c.id]; });
    DB.selectedCampaignIds = {};
    chrome.storage.local.set({ mb_history: S.history });
    render();
    return;
  }

  // Contact tag filter
  if (action === "db-contact-filter") {
    DB.contactTagFilter = actionEl.getAttribute("data-filter") || "all";
    render();
    return;
  }

  // Settings tab switcher inside dashboard settings panel
  if (action === "db-settings-tab") {
    DB.settingsTab = actionEl.getAttribute("data-tab") || "backends";
    render();
    return;
  }

  // Guide section accordion toggle
  if (action === "db-guide-toggle") {
    var gkey = actionEl.getAttribute("data-guide-key");
    if (!DB.guideOpen) DB.guideOpen = {};
    DB.guideOpen[gkey] = !DB.guideOpen[gkey];
    render();
    return;
  }

  // Drip campaign selector
  if (action === "db-drip-select-camp") {
    DB.dripCampId = actionEl.getAttribute("data-id") || null;
    DB.dripStepIdx = 0;
    render();
    return;
  }

  // Drip: select step to edit
  if (action === "db-drip-edit-step") {
    DB.dripStepIdx = parseInt(actionEl.getAttribute("data-stepidx"), 10) || 0;
    render();
    return;
  }

  // Drip: add a new step to a campaign
  if (action === "db-drip-add-step") {
    var addCampId = actionEl.getAttribute("data-campid");
    if (!addCampId) return;
    var addSteps = dbDripStepsForCampaign(addCampId).slice();
    var newStep = dbNewDripStep();
    addSteps.push(newStep);
    dbSaveDripSteps(addCampId, addSteps);
    DB.dripStepIdx = addSteps.length - 1;
    render();
    return;
  }

  // Drip: delete a step
  if (action === "db-drip-delete-step") {
    var delCampId = actionEl.getAttribute("data-campid");
    var delStepIdx = parseInt(actionEl.getAttribute("data-stepidx"), 10);
    if (!delCampId || isNaN(delStepIdx)) return;
    var delSteps = dbDripStepsForCampaign(delCampId).slice();
    delSteps.splice(delStepIdx, 1);
    dbSaveDripSteps(delCampId, delSteps);
    if (DB.dripStepIdx >= delSteps.length) DB.dripStepIdx = Math.max(0, delSteps.length - 1);
    render();
    return;
  }

  // Drip: save step edits
  if (action === "db-drip-save-step") {
    var saveCampId = actionEl.getAttribute("data-campid");
    var saveStepIdx = parseInt(actionEl.getAttribute("data-stepidx"), 10);
    if (!saveCampId || isNaN(saveStepIdx)) return;
    var saveSteps = dbDripStepsForCampaign(saveCampId).slice();
    if (!saveSteps[saveStepIdx]) return;
    var subjectEl = document.getElementById("dripStepSubject_" + saveStepIdx);
    var bodyEl = document.getElementById("dripStepBody_" + saveStepIdx);
    var daysEl = document.getElementById("dripStepDays_" + saveStepIdx);
    var schedEl = document.getElementById("dripStepSchedule_" + saveStepIdx);
    if (subjectEl) saveSteps[saveStepIdx].subject = subjectEl.value.trim();
    if (bodyEl) saveSteps[saveStepIdx].body = bodyEl.value;
    if (daysEl) saveSteps[saveStepIdx].delayDays = Math.max(1, parseInt(daysEl.value, 10) || 3);
    if (schedEl) saveSteps[saveStepIdx].scheduledAt = schedEl.value ? new Date(schedEl.value).toISOString() : '';
    dbSaveDripSteps(saveCampId, saveSteps);
    S.success = "Step " + (saveStepIdx + 1) + " saved!";
    render();
    setTimeout(function(){ S.success = null; render(); }, 2500);
    return;
  }

  // Drip: remove schedule from step
  if (action === "db-drip-unschedule") {
    var unsCampId = actionEl.getAttribute("data-campid");
    var unsStepIdx = parseInt(actionEl.getAttribute("data-stepidx"), 10);
    if (!unsCampId || isNaN(unsStepIdx)) return;
    var unsSteps = dbDripStepsForCampaign(unsCampId).slice();
    if (unsSteps[unsStepIdx]) { unsSteps[unsStepIdx].scheduledAt = ''; dbSaveDripSteps(unsCampId, unsSteps); }
    render();
    return;
  }

  // Drip: send step now (saves first then sends)
  if (action === "db-drip-send-now") {
    var sendNowCampId = actionEl.getAttribute("data-campid");
    var sendNowIdx = parseInt(actionEl.getAttribute("data-stepidx"), 10);
    if (!sendNowCampId || isNaN(sendNowIdx)) return;
    // Save any unsaved changes first
    var snSteps = dbDripStepsForCampaign(sendNowCampId).slice();
    if (!snSteps[sendNowIdx]) return;
    var snSubjEl = document.getElementById("dripStepSubject_" + sendNowIdx);
    var snBodyEl = document.getElementById("dripStepBody_" + sendNowIdx);
    var snDaysEl = document.getElementById("dripStepDays_" + sendNowIdx);
    var snSchedEl = document.getElementById("dripStepSchedule_" + sendNowIdx);
    if (snSubjEl) snSteps[sendNowIdx].subject = snSubjEl.value.trim();
    if (snBodyEl) snSteps[sendNowIdx].body = snBodyEl.value;
    if (snDaysEl) snSteps[sendNowIdx].delayDays = Math.max(1, parseInt(snDaysEl.value, 10) || 3);
    if (snSchedEl) snSteps[sendNowIdx].scheduledAt = snSchedEl.value ? new Date(snSchedEl.value).toISOString() : '';
    if (!snSteps[sendNowIdx].subject) { S.error = "Add a subject before sending."; render(); return; }
    if (!snSteps[sendNowIdx].body) { S.error = "Write the email body before sending."; render(); return; }
    // If a future date is set — save as scheduled, do not send yet
    var snScheduledAt = snSteps[sendNowIdx].scheduledAt;
    if (snScheduledAt) {
      var snScheduledDate = new Date(snScheduledAt);
      if (!isNaN(snScheduledDate.getTime()) && snScheduledDate > new Date()) {
        snSteps[sendNowIdx].status = 'scheduled';
        dbSaveDripSteps(sendNowCampId, snSteps);
        S.success = "Step scheduled for " + snScheduledDate.toLocaleDateString() + " at " + snScheduledDate.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) + ".";
        render();
        setTimeout(function(){ S.success = null; render(); }, 3000);
        return;
      }
    }
    dbSaveDripSteps(sendNowCampId, snSteps);
    // Find the campaign to get sheet info
    var snCamp = (S.history||[]).find(function(c){ return c.id === sendNowCampId; });
    if (!snCamp) { S.error = "Campaign not found."; render(); return; }
    if (!snCamp.sheetId) { S.error = "This campaign has no sheet attached — cannot send drip step."; render(); return; }
    dbDripSendStep(sendNowCampId, sendNowIdx, snCamp, snSteps[sendNowIdx]);
    return;
  }

  // Legacy drip step toggle (keep for backward compat)
  if (action === "db-drip-toggle") {
    var legIdx = parseInt(actionEl.getAttribute("data-idx"), 10);
    if (!DB.dripStepToggles) {
      DB.dripStepToggles = (S.dripSteps || []).map(function(s) { return Object.assign({}, s); });
    }
    if (DB.dripStepToggles[legIdx]) {
      DB.dripStepToggles[legIdx].enabled = !DB.dripStepToggles[legIdx].enabled;
      S.dripSteps = DB.dripStepToggles.slice();
      chrome.storage.local.set({ mb_drip_steps: S.dripSteps });
    }
    render();
    return;
  }

  // Open compose modal inside dashboard
  if (action === "db-open-compose") {
    DB.showComposeModal = true;
    DB.composeStep = "sheet";
    DB.composeResult = null;
    DB.composeSendingProgress = "";
    DB.composeForm = { name: "", subject: "", body: "", htmlBody: "", editorMode: "write", sheetUrl: "", sheetId: "", sheetName: "", sheetTab: "", sheetHeaders: [], recipientCount: 0, fromName: S.fromName || "", replyTo: S.replyTo || "", cc: "", bcc: "", delayMs: S.delayMs || 500, testEmail: S.testEmail || "", attachments: [], unsubscribeEnabled: false, scheduleEnabled: false, scheduleAt: "", smartSendEnabled: false };
    render();
    return;
  }

  // Close compose modal
  if (action === "db-compose-close") {
    DB.showComposeModal = false;
    DB.composeStep = "sheet";
    DB.composeResult = null;
    render();
    return;
  }

  // Dismiss the inline sending banner
  if (action === "db-banner-dismiss") {
    DB.sendingBanner = null;
    render();
    return;
  }

  if (action === "dismiss-deal-banner") {
    try { localStorage.setItem('mb_deal_madbear40_dismissed', '1'); } catch(e){}
    var banner = document.getElementById('mb-deal-banner');
    if (banner) banner.remove();
    return;
  }

  // Back to sheet step
  if (action === "db-compose-back") {
    DB.composeStep = "sheet";
    render();
    return;
  }

  // Pick a recent sheet
  if (action === "db-compose-pick-recent") {
    var ridx = parseInt(actionEl.getAttribute("data-index"), 10) || 0;
    var rsheet = (S.sheets || [])[ridx];
    if (rsheet) {
      DB.composeForm.sheetId = rsheet.id;
      DB.composeForm.sheetName = rsheet.name;
      DB.composeForm.sheetUrl = rsheet.id;
    }
    render();
    return;
  }

  // Pick "All contacts" from compose modal sheet picker
  if (action === "db-compose-pick-contacts-all") {
    DB.showComposeModal = false;
    startCampaignFromContacts(null);
    return;
  }

  // Pick a specific group from compose modal sheet picker
  if (action === "db-compose-pick-contacts-group") {
    var pickGrp = actionEl.getAttribute("data-group") || "";
    DB.showComposeModal = false;
    startCampaignFromContactsGroup(pickGrp);
    return;
  }

  // New campaign from done screen
  if (action === "db-compose-new") {
    DB.composeStep = "sheet";
    DB.composeResult = null;
    DB.composeSendingProgress = "";
    DB.composeForm = { name: "", subject: "", body: "", htmlBody: "", editorMode: "write", sheetUrl: "", sheetId: "", sheetName: "", sheetTab: "", sheetHeaders: [], recipientCount: 0, fromName: S.fromName || "", replyTo: S.replyTo || "", cc: "", bcc: "", delayMs: S.delayMs || 500, testEmail: S.testEmail || "", attachments: [], unsubscribeEnabled: false, scheduleEnabled: false, scheduleAt: "", smartSendEnabled: false };
    render();
    return;
  }

  // Connect sheet — validate URL and move to compose step
  if (action === "db-compose-connect") {
    dbComposeConnectSheet();
    return;
  }

  // Toggle HTML editor mode
  if (action === "db-compose-editor-mode") {
    DB.composeForm.editorMode = actionEl.getAttribute("data-mode") || "write";
    render();
    return;
  }

  // Insert merge tag at cursor position in focused field (compose modal)
  if (action === "db-compose-insert-tag") {
    var tag = "{{" + (actionEl.getAttribute("data-tag") || "") + "}}";
    var focusedId = DB.composeForm._focusedField || "dbCampBody";
    var targetEl = document.getElementById(focusedId) || document.getElementById("dbCampBody") || document.getElementById("dbCampSubject");
    if (targetEl) {
      var start = targetEl.selectionStart || 0;
      var end   = targetEl.selectionEnd   || 0;
      var val   = targetEl.value;
      targetEl.value = val.slice(0, start) + tag + val.slice(end);
      targetEl.setSelectionRange(start + tag.length, start + tag.length);
      targetEl.focus();
      // Update form state
      if (targetEl.id === "dbCampSubject") DB.composeForm.subject = targetEl.value;
      else if (targetEl.id === "dbCampBody") DB.composeForm.body = targetEl.value;
      else if (targetEl.id === "dbCampHtml") DB.composeForm.htmlBody = targetEl.value;
    }
    return;
  }

  // Insert merge tag at cursor position in drip step editor
  if (action === "db-drip-insert-tag") {
    var dripTag = "{{" + (actionEl.getAttribute("data-tag") || "") + "}}";
    var dripStepIdx = actionEl.getAttribute("data-stepidx") || "0";
    // Use last focused drip field, defaulting to body
    var dripFocusedId = DB._dripFocusedField || ("dripStepBody_" + dripStepIdx);
    // Fallback chain: focused field → body → subject
    var dripTarget = document.getElementById(dripFocusedId)
      || document.getElementById("dripStepBody_" + dripStepIdx)
      || document.getElementById("dripStepSubject_" + dripStepIdx);
    if (dripTarget) {
      var ds = dripTarget.selectionStart || 0;
      var de = dripTarget.selectionEnd   || 0;
      var dv = dripTarget.value;
      dripTarget.value = dv.slice(0, ds) + dripTag + dv.slice(de);
      dripTarget.setSelectionRange(ds + dripTag.length, ds + dripTag.length);
      dripTarget.focus();
      DB._dripFocusedField = dripTarget.id;
    }
    return;
  }

  // Remove attachment
  if (action === "db-compose-remove-attachment") {
    var aidx = parseInt(actionEl.getAttribute("data-index"), 10);
    if (!isNaN(aidx)) {
      DB.composeForm.attachments = (DB.composeForm.attachments || []).filter(function(_, i) { return i !== aidx; });
      render();
    }
    return;
  }

  // Test send from compose step
  if (action === "db-compose-test") {
    dbSendCampaignFromModal(true);
    return;
  }

  // Send campaign from modal
  if (action === "db-compose-send") {
    dbSendCampaignFromModal(false);
    return;
  }

  // Follow-up from campaign row (by name — legacy)
  if (action === "db-followup-from-campaign") {
    var campName = actionEl.getAttribute("data-name") || "";
    var allHistA = S.history || [];
    var fuCamp = allHistA.find(function(c) { return (c.name || c.sheetName || '') === campName; });
    if (fuCamp) dbOpenFollowUpModal(fuCamp.id);
    return;
  }

  // Follow-up from campaign results modal (by id)
  if (action === "db-followup-from-id") {
    var fuId = actionEl.getAttribute("data-id") || "";
    DB.showResultsModal = false;
    DB.resultsCamp = null;
    dbOpenFollowUpModal(fuId);
    return;
  }

  // Close follow-up modal
  if (action === "db-followup-close") {
    DB.showFollowUpModal = false;
    DB.followUpStep = "compose";
    DB.followUpResult = null;
    render();
    return;
  }

  // Send follow-up (live)
  if (action === "db-followup-send") {
    dbDoFollowUpFromModal(false);
    return;
  }

  // Test send follow-up
  if (action === "db-followup-test") {
    dbDoFollowUpFromModal(true);
    return;
  }

  // Select all/none recipients in follow-up modal
  if (action === "db-fu-select-all") {
    // Sync search input before render
    var fsEl = document.getElementById("fuRecipientSearch");
    if (fsEl) DB.fuRecipientSearch = fsEl.value;
    S.followUpRecipients.forEach(function(r) { r.selected = true; });
    render();
    return;
  }
  if (action === "db-fu-select-none") {
    var fsEl2 = document.getElementById("fuRecipientSearch");
    if (fsEl2) DB.fuRecipientSearch = fsEl2.value;
    S.followUpRecipients.forEach(function(r) { r.selected = false; });
    render();
    return;
  }

  // View campaign results — dashboard modal (not old popup view)
  if (action === "db-view-campaign") {
    var vcId = actionEl.getAttribute("data-id") || "";
    var vcCamp = (S.history || []).find(function(c) { return c.id === vcId; });
    if (vcCamp) {
      DB.showResultsModal = true;
      DB.resultsCamp = vcCamp;
      render();
    }
    return;
  }

  // Close results modal
  if (action === "db-results-close") {
    DB.showResultsModal = false;
    DB.resultsCamp = null;
    render();
    return;
  }

  // Duplicate campaign from dashboard → open as editable draft in compose modal
  if (action === "db-duplicate-campaign") {
    var dcId = actionEl.getAttribute("data-id") || "";
    var dcCamp = (S.history || []).find(function(c) { return c.id === dcId; });
    if (dcCamp) {
      // Pre-fill the compose modal with the duplicated campaign data
      DB.composeForm = {
        name:              (dcCamp.name || "Campaign") + " (copy)",
        subject:           dcCamp.subject || "",
        body:              dcCamp.body || "",
        htmlBody:          dcCamp.htmlBody || "",
        editorMode:        dcCamp.editorMode || (dcCamp.htmlBody ? "html" : "write"),
        sheetUrl:          dcCamp.sheetId || "",
        sheetId:           dcCamp.sheetId || "",
        sheetName:         dcCamp.sheetName || "",
        sheetTab:          dcCamp.sheetTab || "",
        sheetHeaders:      dcCamp.sheetHeaders || [],
        recipientCount:    dcCamp.recipientCount || dcCamp.total || 0,
        fromName:          dcCamp.fromName || S.fromName || "",
        replyTo:           dcCamp.replyTo || S.replyTo || "",
        cc:                dcCamp.cc || "",
        bcc:               dcCamp.bcc || "",
        delayMs:           dcCamp.delayMs || S.delayMs || 500,
        testEmail:         dcCamp.testEmail || S.testEmail || "",
        attachments:       [],
        unsubscribeEnabled: false,
        scheduleEnabled:   false,
        scheduleAt:        "",
        smartSendEnabled:  false
      };
      DB.composeStep = "compose";  // skip sheet step — sheet is already known
      DB.composeResult = null;
      DB.composeSendingProgress = "";
      DB.showComposeModal = true;
      render();
    }
    return;
  }

  // Start campaign from contacts panel bulk CTA
  if (action === "db-contacts-start-campaign") {
    var ctag = actionEl.getAttribute("data-tag") || null;
    S.campaignSource = "contacts";
    S.selectedContactListId = ctag;
    startCampaignFromContacts(ctag);
    return;
  }

  // Contact add from dashboard panel — show inline form
  if (action === "db-contact-add") {
    DB.contactShowAdd = true;
    DB.contactEditId = null;
    DB.contactAddForm = { name: "", email: "", tags: "", group: "", customFields: "" };
    render();
    setTimeout(function() { var el = document.getElementById("ctFormEmail"); if (el) el.focus(); }, 60);
    return;
  }

  // Cancel inline form (add or edit)
  if (action === "db-contact-cancel-form") {
    DB.contactShowAdd = false;
    DB.contactEditId = null;
    render();
    return;
  }

  // Save new contact from inline dashboard form
  if (action === "db-contact-save-add") {
    var nEl = document.getElementById("ctFormName");
    var eEl = document.getElementById("ctFormEmail");
    var tEl = document.getElementById("ctFormTags");
    var gEl = document.getElementById("ctFormGroup");
    var gElCustom = document.getElementById("ctFormGroupCustom");
    var cEl = document.getElementById("ctFormCF");
    // Resolve group: if select shows __new__, use custom input
    var newEmail = eEl ? eEl.value.trim() : "";
    if (!newEmail) { if (eEl) eEl.focus(); return; }
    var existing2 = S.contacts || [];
    if (!existing2.find(function(c) { return c.email === newEmail; })) {
      existing2.push({
        id: "c_" + Date.now() + "_" + Math.random().toString(36).slice(2),
        name: nEl ? nEl.value.trim() : "",
        email: newEmail,
        group: (gEl && gEl.value === '__new__') ? (gElCustom ? gElCustom.value.trim() : '') : (gEl ? gEl.value.trim() : ""),
        tags: contactsParseTags(tEl ? tEl.value : ""),
        customFields: contactsParseCustomFields(cEl ? cEl.value : ""),
        addedAt: new Date().toISOString(),
        createdAt: Date.now(),
        status: "active",
        source: "manual"
      });
      S.contacts = existing2;
      chrome.storage.local.set({ mb_contacts: S.contacts });
    }
    DB.contactShowAdd = false;
    DB.contactAddForm = { name: "", email: "", tags: "", group: "", customFields: "" };
    render();
    return;
  }

  // Save edited contact from inline dashboard form
  if (action === "db-contact-save-edit") {
    var editId2 = actionEl.getAttribute("data-id") || DB.contactEditId;
    var nElE = document.getElementById("ctFormName");
    var eElE = document.getElementById("ctFormEmail");
    var tElE = document.getElementById("ctFormTags");
    var gElE = document.getElementById("ctFormGroup");
    var gElECustom = document.getElementById("ctFormGroupCustom");
    var cElE = document.getElementById("ctFormCF");
    var editEmail2 = eElE ? eElE.value.trim() : "";
    var resolvedEditGroup = (gElE && gElE.value === '__new__') ? (gElECustom ? gElECustom.value.trim() : '') : (gElE ? gElE.value.trim() : "");
    if (!editEmail2) { if (eElE) eElE.focus(); return; }
    S.contacts = (S.contacts || []).map(function(c) {
      if (c.id !== editId2) return c;
      return Object.assign({}, c, {
        name: nElE ? nElE.value.trim() : c.name,
        email: editEmail2,
        group: resolvedEditGroup || (c.group || ""),
        tags: contactsParseTags(tElE ? tElE.value : ""),
        customFields: contactsParseCustomFields(cElE ? cElE.value : "")
      });
    });
    chrome.storage.local.set({ mb_contacts: S.contacts });
    DB.contactEditId = null;
    render();
    return;
  }

  // Contact edit — load into inline form
  if (action === "db-contact-edit") {
    var ceId = actionEl.getAttribute("data-id");
    DB.contactEditId = ceId;
    DB.contactShowAdd = false;
    render();
    setTimeout(function() { var el = document.getElementById("ctFormName"); if (el) el.focus(); }, 60);
    return;
  }

  // Contact group filter
  if (action === "db-contact-group-filter") {
    DB.contactGroupFilter = actionEl.getAttribute("data-filter") || "all";
    render();
    return;
  }

  // Toggle group manager panel
  if (action === "db-groups-toggle") {
    DB.showGroupManager = !DB.showGroupManager;
    DB.groupAddName = "";
    DB.groupEditId = null;
    DB.groupEditName = "";
    render();
    if (DB.showGroupManager) {
      setTimeout(function() { var el = document.getElementById("grpNewName"); if (el) el.focus(); }, 60);
    }
    return;
  }

  // Create new named group
  if (action === "db-group-create") {
    var grpEl = document.getElementById("grpNewName");
    var grpName = grpEl ? grpEl.value.trim() : "";
    if (!grpName) { if (grpEl) grpEl.focus(); return; }
    S.contactGroups = S.contactGroups || [];
    // Prevent duplicate names
    if (S.contactGroups.find(function(g){ return g.name.toLowerCase() === grpName.toLowerCase(); })) {
      S.error = 'A group named "' + grpName + '" already exists.';
      render();
      return;
    }
    S.contactGroups.push({ id: 'g_' + Date.now() + '_' + Math.random().toString(36).slice(2), name: grpName, color: '', createdAt: new Date().toISOString() });
    contactsGroupsSave();
    DB.groupAddName = "";
    render();
    return;
  }

  // Start rename inline
  if (action === "db-group-rename-start") {
    DB.groupEditId = actionEl.getAttribute("data-id");
    DB.groupEditName = actionEl.getAttribute("data-name") || "";
    render();
    setTimeout(function() { var el = document.getElementById("grpRenameInp"); if (el) { el.focus(); el.select(); } }, 60);
    return;
  }

  // Cancel rename
  if (action === "db-group-rename-cancel") {
    DB.groupEditId = null;
    DB.groupEditName = "";
    render();
    return;
  }

  // Save rename
  if (action === "db-group-rename-save") {
    var renameId = actionEl.getAttribute("data-id");
    var oldName = actionEl.getAttribute("data-old") || "";
    var renameEl = document.getElementById("grpRenameInp");
    var newName = renameEl ? renameEl.value.trim() : "";
    if (!newName) { if (renameEl) renameEl.focus(); return; }
    S.contactGroups = (S.contactGroups || []).map(function(g) {
      return g.id === renameId ? Object.assign({}, g, { name: newName }) : g;
    });
    // Also update contacts that use this group name
    S.contacts = (S.contacts || []).map(function(c) {
      return c.group === oldName ? Object.assign({}, c, { group: newName }) : c;
    });
    contactsGroupsSave();
    chrome.storage.local.set({ mb_contacts: S.contacts });
    DB.groupEditId = null;
    DB.groupEditName = "";
    render();
    return;
  }

  // Delete named group
  if (action === "db-group-delete") {
    var delGId = actionEl.getAttribute("data-id");
    var delGName = actionEl.getAttribute("data-name") || "";
    if (!confirm('Delete group "' + delGName + '"? Contacts in this group will keep their name but the group will be removed.')) return;
    S.contactGroups = (S.contactGroups || []).filter(function(g){ return g.id !== delGId; });
    contactsGroupsSave();
    render();
    return;
  }

  // Send campaign to a group from the group manager
  if (action === "db-contacts-start-campaign-group") {
    var campGrpName = actionEl.getAttribute("data-group") || "";
    startCampaignFromContactsGroup(campGrpName);
    return;
  }

  // Contact delete from dashboard panel
  if (action === "db-contact-delete") {
    var cdId = actionEl.getAttribute("data-id");
    S.contacts = (S.contacts || []).filter(function(c) { return c.id !== cdId; });
    chrome.storage.local.set({ mb_contacts: S.contacts });
    render();
    return;
  }

  // Contact send (single contact campaign)
  if (action === "db-contact-send") {
    var csId = actionEl.getAttribute("data-id");
    var csContact = (S.contacts || []).find(function(c) { return c.id === csId; });
    if (csContact) {
      S.campaignSource = "contacts";
      S.selectedContactListId = null;
      go("home");
      setTimeout(function() { startCampaign(); }, 80);
    }
    return;
  }

  // Contacts export CSV
  if (action === "db-contacts-export") {
    mbExportContactsCSV();
    return;
  }

  // Export modal trigger (campaigns page + about page)
  if (action === "db-export-modal" || action === "db-export-all") {
    mbShowExportModal();
    return;
  }

  // Export modal individual actions
  if (action === "db-export-contacts-csv") { mbExportContactsCSV(); return; }
  if (action === "db-export-campaigns-csv") { mbExportCampaignsCSV(); return; }
  if (action === "db-export-history-csv") { mbExportHistoryCSV(); return; }
  if (action === "db-export-analytics-csv") { mbExportAnalyticsCSV(); return; }
  if (action === "db-export-full-json") { mbExportFullJSON(); return; }
  if (action === "db-export-xlsx") { mbExportXLSX(); return; }

  // Contacts import CSV
  if (action === "db-contacts-import") {
    var fi = document.createElement("input");
    fi.type = "file"; fi.accept = ".csv,text/csv";
    fi.style.position = "fixed"; fi.style.top = "-9999px"; fi.style.left = "-9999px";
    fi.onchange = function(ev) {
      var f = ev.target.files[0];
      if (fi.parentNode) fi.parentNode.removeChild(fi);
      if (!f) return;
      var reader = new FileReader();
      reader.onload = function(re) {
        var text = re.target.result;
        // RFC 4180-compliant CSV parser
        function parseCSV(str) {
          var rows = []; var row = []; var field = ""; var inQ = false;
          for (var i = 0; i < str.length; i++) {
            var ch = str[i]; var next = str[i+1];
            if (inQ) {
              if (ch === '"' && next === '"') { field += '"'; i++; }
              else if (ch === '"') { inQ = false; }
              else { field += ch; }
            } else {
              if (ch === '"') { inQ = true; }
              else if (ch === ',') { row.push(field); field = ""; }
              else if (ch === '\n' || (ch === '\r' && next === '\n')) {
                if (ch === '\r') i++;
                row.push(field); field = "";
                if (row.some(function(c){return c.trim();})) rows.push(row);
                row = [];
              } else { field += ch; }
            }
          }
          row.push(field);
          if (row.some(function(c){return c.trim();})) rows.push(row);
          return rows;
        }
        var rows = parseCSV(text.trim());
        if (rows.length < 2) { DB.contactImportError = "CSV is empty or has no data rows"; render(); return; }
        var headers = rows[0].map(function(h) { return h.trim().toLowerCase(); });
        // Find columns — support common header names
        function findCol(names) {
          for (var ni = 0; ni < names.length; ni++) {
            var idx = headers.indexOf(names[ni]);
            if (idx !== -1) return idx;
          }
          return -1;
        }
        var emailIdx = findCol(["email","e-mail","email address","correo","courriel"]);
        if (emailIdx === -1) { DB.contactImportError = "No Email column found. Add a column named 'Email'."; render(); return; }
        var nameIdx   = findCol(["name","full name","nombre","nom"]);
        var firstIdx  = findCol(["first name","firstname","first","prénom"]);
        var lastIdx   = findCol(["last name","lastname","last","surname","apellido","nom de famille"]);
        var tagsIdx   = findCol(["tags","tag","etiquetas","étiquettes","labels"]);
        var groupIdx  = findCol(["group","grupo","groupe","list","lista","liste"]);
        var parsed = [];
        for (var ri = 1; ri < rows.length; ri++) {
          var cols = rows[ri];
          var email = (cols[emailIdx] || "").trim();
          if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) continue;
          var name = "";
          if (nameIdx >= 0) { name = (cols[nameIdx] || "").trim(); }
          else if (firstIdx >= 0 || lastIdx >= 0) {
            name = [(firstIdx>=0?cols[firstIdx]||"":""),(lastIdx>=0?cols[lastIdx]||"":"")].join(" ").trim();
          }
          var rawTags = tagsIdx >= 0 ? (cols[tagsIdx] || "").trim() : "";
          var tags = rawTags ? rawTags.split(/[;,|]/).map(function(t){return t.trim();}).filter(Boolean) : [];
          var group = groupIdx >= 0 ? (cols[groupIdx] || "").trim() : "";
          parsed.push({ name: name, email: email, tags: tags, group: group });
        }
        if (parsed.length === 0) { DB.contactImportError = "No valid contacts found. Make sure the Email column has valid addresses."; render(); return; }
        DB.contactImportPreview = parsed;
        DB.contactImportError = "";
        render();
      };
      reader.readAsText(f);
    };
    document.body.appendChild(fi);
    fi.click();
    return;
  }

  // Contacts confirm import
  if (action === "db-contacts-confirm-import") {
    var preview = DB.contactImportPreview || [];
    var existing = S.contacts || [];
    var added = 0;
    preview.forEach(function(p) {
      if (!existing.find(function(e) { return e.email === p.email; })) {
        existing.push({
          id: "c_" + Date.now() + "_" + Math.random().toString(36).slice(2),
          name: p.name || "",
          email: p.email,
          tags: p.tags || [],
          group: p.group || "",
          customFields: {},
          addedAt: new Date().toISOString(),
          createdAt: Date.now(),
          status: "active",
          source: "import"
        });
        added++;
      }
    });
    S.contacts = existing;
    DB.contactImportPreview = null;
    DB.contactImportError = "";
    chrome.storage.local.set({ mb_contacts: S.contacts });
    render();
    return;
  }

  // Contacts cancel import
  if (action === "db-contacts-cancel-import") {
    DB.contactImportPreview = null;
    DB.contactImportError = "";
    render();
    return;
  }

  // Billing manage — delegates to background via billingRequest (same as open-manage)
  if (action === "billing-manage") {
    openManageSubscription();
    return;
  }

  // Billing sync — delegates to background via billingRequest (same as sync-extpay)
  if (action === "billing-refresh") {
    syncExtPayStatus();
    return;
  }

  // view-change: navigate to a popup view (not used inside dashboard — dashboard uses db-nav)
  if (action === "view-change") {
    var targetView = actionEl.getAttribute("data-view") || "home";
    // If currently in dashboard, open the compose modal instead of navigating away
    if (S.view === "dashboard" && targetView === "compose") {
      DB.showComposeModal = true;
      DB.composeStep = "sheet";
      DB.composeResult = null;
      DB.composeSendingProgress = "";
      DB.composeForm = { name: "", subject: "", body: "", htmlBody: "", editorMode: "write", sheetUrl: "", sheetId: "", sheetName: "", sheetTab: "", sheetHeaders: [], recipientCount: 0, fromName: S.fromName || "", replyTo: S.replyTo || "", cc: "", bcc: "", delayMs: S.delayMs || 500, testEmail: S.testEmail || "", attachments: [], unsubscribeEnabled: false, scheduleEnabled: false, scheduleAt: "", smartSendEnabled: false };
      render();
      return;
    }
    go(targetView);
    return;
  }
}

function handleChange(event) {
  if (event.target.id === "tabSelect") {
    syncComposeFields();
    changeTab(event.target.value);
  }
  if (event.target.id === "attachFileInput") {
    handleFileAttach(event.target.files);
  }
  // Contacts sort select
  if (event.target.id === "contactSortSel") {
    DB.contactSortBy = event.target.value;
    render();
    return;
  }
  // Group select in contact form — show/hide custom name input when "__new__" selected
  if (event.target.id === "ctFormGroup" && event.target.tagName === "SELECT") {
    var grpWrap = document.getElementById("ctFormGroupCustomWrap");
    if (grpWrap) {
      grpWrap.style.display = event.target.value === "__new__" ? "" : "none";
      if (event.target.value === "__new__") {
        var customInp = document.getElementById("ctFormGroupCustom");
        if (customInp) { customInp.value = ""; customInp.focus(); }
      }
    }
    return;
  }
  // Contacts CSV file inputs
  if (event.target.id === "contactCsvInput" || event.target.id === "contactCsvInput2") {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      const result = contactsParseCSV(e.target.result || "");
      if (result.error) {
        DB.contactImportError = result.error;
        DB.contactImportPreview = null;
      } else {
        DB.contactImportPreview = result.rows;
        DB.contactImportError = "";
      }
      render();
    };
    reader.onerror = function() {
      DB.contactImportError = "Could not read the file.";
      DB.contactImportPreview = null;
      render();
    };
    reader.readAsText(file);
    // Reset input so same file can be re-selected
    event.target.value = "";
    return;
  }
  // Campaign row checkbox — individual select/deselect
  if (event.target.getAttribute && event.target.getAttribute("data-action") === "db-camp-toggle-select") {
    var campTogId = event.target.getAttribute("data-id");
    if (campTogId) {
      if (!DB.selectedCampaignIds) DB.selectedCampaignIds = {};
      if (event.target.checked) {
        DB.selectedCampaignIds[campTogId] = true;
      } else {
        delete DB.selectedCampaignIds[campTogId];
      }
      render();
    }
    return;
  }
  // Campaign header checkbox — select/deselect all filtered
  if (event.target.getAttribute && event.target.getAttribute("data-action") === "db-camp-select-all-filtered") {
    if (!DB.selectedCampaignIds) DB.selectedCampaignIds = {};
    var campFilter = DB.campaignFilter || 'all';
    var campQ = DB.campaignSearch || '';
    var allFiltered2 = (S.history || []).filter(function(c) {
      if (campFilter !== 'all' && c.type !== campFilter) return false;
      if (campQ && (c.name||c.sheetName||'').toLowerCase().indexOf(campQ.toLowerCase()) === -1) return false;
      return true;
    });
    if (event.target.checked) {
      allFiltered2.forEach(function(c){ DB.selectedCampaignIds[c.id] = true; });
    } else {
      allFiltered2.forEach(function(c){ delete DB.selectedCampaignIds[c.id]; });
    }
    render();
    return;
  }
  // Follow-up modal recipient checkboxes
  if (event.target.getAttribute && event.target.getAttribute("data-action") === "db-fu-toggle-recipient") {
    var fuIdx = parseInt(event.target.getAttribute("data-index"), 10);
    if (!isNaN(fuIdx) && S.followUpRecipients[fuIdx]) {
      S.followUpRecipients[fuIdx].selected = event.target.checked;
    }
    return;
  }
  // Dashboard compose modal — checkbox fields (unsubscribeEnabled, scheduleEnabled, smartSendEnabled)
  if (event.target.getAttribute && event.target.getAttribute("data-action") === "db-compose-field" && event.target.type === "checkbox") {
    var cbField = event.target.getAttribute("data-field");
    if (cbField) {
      DB.composeForm[cbField] = event.target.checked;
      render();
    }
    return;
  }
  // Dashboard compose modal — file attachment picker
  if (event.target.id === "dbCampAttachInput") {
    var files = event.target.files;
    if (!files || !files.length) return;
    var attachArr = DB.composeForm.attachments = DB.composeForm.attachments || [];
    var pending = files.length;
    for (var fi = 0; fi < files.length; fi++) {
      (function(f) {
        var reader = new FileReader();
        reader.onload = function(e) {
          attachArr.push({ name: f.name, mimeType: f.type || "application/octet-stream", data: (e.target.result || "").split(",")[1] || "" });
          pending--;
          if (pending === 0) render();
        };
        reader.readAsDataURL(f);
      })(files[fi]);
    }
    event.target.value = "";
    return;
  }
  // Recipient checkboxes fire change, not click
  if (event.target.getAttribute && event.target.getAttribute("data-action") === "followup-toggle-recipient") {
    const idx = Number(event.target.getAttribute("data-index"));
    if (S.followUpRecipients[idx]) {
      S.followUpRecipients[idx].selected = event.target.checked;
      // Re-render but restore search input focus and value
      const hadFocus = document.activeElement && document.activeElement.id === "followup-recipient-search";
      render();
      if (hadFocus) {
        const inp = document.getElementById("followup-recipient-search");
        if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
      }
    }
  }
}

function handleInput(event) {
  if (event.target.id === "composeSubject") {
    S.composeSubject = event.target.value;
    persistComposeDraft();
    return;
  }
  if (event.target.id === "composeBody") {
    S.composeBody = event.target.value;
    persistComposeDraft();
    return;
  }
  if (event.target.id === "composeHtml") {
    S.composeHtml = event.target.value;
    persistComposeDraft();
    return;
  }
  if (event.target.id === "f_fromName") {
    S.fromName = event.target.value;
    persistComposeDraft();
    return;
  }
  if (event.target.id === "f_replyTo") {
    S.replyTo = event.target.value;
    persistComposeDraft();
    return;
  }
  if (event.target.id === "f_testEmail") {
    S.testEmail = event.target.value;
    persistComposeDraft();
    return;
  }
  if (event.target.id === "f_delayMs") {
    S.delayMs = Math.max(0, parseInt(event.target.value, 10) || 500);
    persistComposeDraft();
    return;
  }
  if (event.target.id === "f_cc") { S.ccField = event.target.value.trim(); return; }
  if (event.target.id === "f_bcc") { S.bccField = event.target.value.trim(); return; }
  if (event.target.id === "f_scheduleAt") { S.scheduleAt = event.target.value; return; }
  if (event.target.id === "f_smartDate") { S.smartSendDate = event.target.value; return; }
  if (event.target.id === "f_smartStart") { S.smartSendStart = event.target.value; return; }
  if (event.target.id === "f_smartEnd") { S.smartSendEnd = event.target.value; return; }
  if (event.target.id === "f_unsubUrl") { S.unsubscribeBaseUrl = event.target.value.trim(); return; }
  // Drip step inputs
  const dripSubjMatch = event.target.id && event.target.id.match(/^drip_subject_(\d+)$/);
  if (dripSubjMatch) { const i = parseInt(dripSubjMatch[1], 10); if (S.dripSteps[i]) S.dripSteps[i].subject = event.target.value; return; }
  const dripBodyMatch = event.target.id && event.target.id.match(/^drip_body_(\d+)$/);
  if (dripBodyMatch) { const i = parseInt(dripBodyMatch[1], 10); if (S.dripSteps[i]) S.dripSteps[i].body = event.target.value; return; }
  const dripHtmlMatch = event.target.id && event.target.id.match(/^drip_html_(\d+)$/);
  if (dripHtmlMatch) { const i = parseInt(dripHtmlMatch[1], 10); if (S.dripSteps[i]) S.dripSteps[i].html = event.target.value; return; }
  const dripDaysMatch = event.target.id && event.target.id.match(/^drip_days_(\d+)$/);
  if (dripDaysMatch) { const i = parseInt(dripDaysMatch[1], 10); if (S.dripSteps[i]) S.dripSteps[i].delayDays = parseInt(event.target.value, 10) || 3; return; }
  // Follow-up fields
  if (event.target.id === "followUpSubject") { S.followUpSubject = event.target.value; return; }
  if (event.target.id === "followUpBody") { S.followUpBody = event.target.value; return; }
  if (event.target.id === "followUpHtml") { S.followUpHtml = event.target.value; return; }
  if (event.target.id === "f_fuFromName") { S.followUpFromName = event.target.value.trim(); return; }
  if (event.target.id === "f_fuReplyTo") { S.followUpReplyTo = event.target.value.trim(); return; }
  if (event.target.id === "f_fuTestEmail") { S.followUpTestEmail = event.target.value.trim(); return; }
  if (event.target.id === "f_fuDelayMs") { S.followUpDelayMs = Math.max(0, parseInt(event.target.value, 10) || 500); return; }
  if (event.target.id === "followup-recipient-search") {
    S.followUpRecipientSearch = event.target.value;
    // Update dropdown visibility without full re-render
    const q = S.followUpRecipientSearch.toLowerCase();
    const drop = document.getElementById("fu-dropdown");
    if (drop) {
      drop.style.display = q ? "block" : "none";
      document.querySelectorAll(".fu-r-row").forEach(function(row) {
        row.style.display = q && row.dataset.search.indexOf(q) !== -1 ? "flex" : "none";
      });
    }
    return;
  }
  // Dashboard search — debounced to prevent flicker while typing
  if (event.target.id === "dbSearchInp") {
    DB.campaignSearch = event.target.value;
    clearTimeout(DB._searchTimer);
    DB._searchTimer = setTimeout(function() { render(); }, 220);
    return;
  }
  // Dashboard compose modal field changes — update state silently, NO re-render on keystroke
  if (event.target.getAttribute && event.target.getAttribute("data-action") === "db-compose-field") {
    var field = event.target.getAttribute("data-field");
    var val = event.target.value;
    if (field === "backend" || field === "delayMs") val = parseInt(val, 10) || 0;
    DB.composeForm[field] = val;
    // Do NOT call render() here — it would destroy the focused input on every keystroke
    return;
  }
  // Contacts search — debounced to avoid flicker while typing
  if (event.target.id === "contactSearchInp") {
    DB.contactSearch = event.target.value;
    clearTimeout(DB._contactSearchTimer);
    DB._contactSearchTimer = setTimeout(function() { render(); }, 220);
    return;
  }
  // Follow-up recipient search
  if (event.target.id === "fuRecipientSearch") {
    DB.fuRecipientSearch = event.target.value;
    clearTimeout(DB._fuSearchTimer);
    DB._fuSearchTimer = setTimeout(function() { render(); }, 180);
    return;
  }
  // Group manager new name input — keep live value in DB state so it survives re-renders
  if (event.target.id === "grpNewName") {
    DB.groupAddName = event.target.value;
    return;
  }
  // Group rename input — keep live value
  if (event.target.id === "grpRenameInp") {
    DB.groupEditName = event.target.value;
    return;
  }
  // Custom fields for follow-up
  const fuAction = event.target.getAttribute && event.target.getAttribute("data-action");
  if (fuAction === "update-fu-custom-field-key") {
    const idx = Number(event.target.getAttribute("data-index"));
    if (S.followUpCustomFields && S.followUpCustomFields[idx] !== undefined) {
      S.followUpCustomFields[idx].key = event.target.value;
    }
    return;
  }
  if (fuAction === "update-fu-custom-field-value") {
    const idx = Number(event.target.getAttribute("data-index"));
    if (S.followUpCustomFields && S.followUpCustomFields[idx] !== undefined) {
      S.followUpCustomFields[idx].value = event.target.value;
    }
    return;
  }
}

function handleFocusIn(event) {
  if (event.target.id === "composeSubject" || event.target.id === "composeBody" || event.target.id === "composeHtml") {
    S.focusedFieldId = event.target.id;
  }
  // Track last focused field in dashboard compose modal for merge tag insertion
  if (event.target.id === "dbCampSubject" || event.target.id === "dbCampBody" || event.target.id === "dbCampHtml") {
    DB.composeForm._focusedField = event.target.id;
  }
  // Track last focused field in drip step editor for merge tag insertion
  if (event.target.id && (event.target.id.startsWith("dripStepSubject_") || event.target.id.startsWith("dripStepBody_"))) {
    DB._dripFocusedField = event.target.id;
  }
}

function insertTag(tag) {
  const token = "{{" + tag + "}}";
  const fieldId = S.focusedFieldId || (S.editorMode === "html" ? "composeHtml" : "composeBody");
  const input = document.getElementById(fieldId);
  if (!input) {
    return;
  }

  const start = typeof input.selectionStart === "number" ? input.selectionStart : input.value.length;
  const end = typeof input.selectionEnd === "number" ? input.selectionEnd : input.value.length;
  const value = input.value || "";
  input.value = value.slice(0, start) + token + value.slice(end);
  const nextPos = start + token.length;
  input.focus();
  if (typeof input.setSelectionRange === "function") {
    input.setSelectionRange(nextPos, nextPos);
  }

  if (fieldId === "composeSubject") {
    S.composeSubject = input.value;
  } else if (fieldId === "composeHtml") {
    S.composeHtml = input.value;
  } else {
    S.composeBody = input.value;
  }
  persistComposeDraft();
}

function confirmImageInsert() {
  const urlInput = document.getElementById("imageUrlInput");
  const altInput = document.getElementById("imageAltInput");
  const safeUrl = urlInput ? urlInput.value.trim() : "";
  if (!safeUrl) return;
  const altText = (altInput ? altInput.value.trim() : "") || "";
  const imgTag = '<img src="' + safeUrl + '" alt="' + altText.replace(/"/g, "&quot;") + '" style="max-width:100%;height:auto;">';

  // Save current composeHtml from textarea before we re-render
  const textarea = document.getElementById("composeHtml");
  if (textarea) {
    S.composeHtml = textarea.value;
  }
  S.composeHtml = (S.composeHtml || "") + "\n" + imgTag;
  S.showImageInsert = false;
  persistComposeDraft();
  render();
}

function handleFileAttach(files) {
  if (!files || !files.length) return;
  const MAX_TOTAL_BYTES = 5 * 1024 * 1024; // 5MB limit
  let currentTotal = (S.attachments || []).reduce(function(sum, a) { return sum + (a.size || 0); }, 0);
  let pending = files.length;
  let added = 0;

  Array.from(files).forEach(function(file) {
    if (currentTotal + file.size > MAX_TOTAL_BYTES) {
      alert('Cannot attach "' + file.name + '" — total attachments would exceed 5MB.');
      pending--;
      if (pending === 0) { render(); }
      return;
    }
    currentTotal += file.size;
    const reader = new FileReader();
    reader.onload = function(e) {
      if (!S.attachments) S.attachments = [];
      S.attachments.push({
        name: file.name,
        mimeType: file.type || "application/octet-stream",
        size: file.size,
        data: e.target.result  // base64 data URL
      });
      added++;
      pending--;
      if (pending === 0) { render(); }
    };
    reader.onerror = function() {
      pending--;
      if (pending === 0) { render(); }
    };
    reader.readAsDataURL(file);
  });
}

function removeAttachment(index) {
  if (!S.attachments || index < 0 || index >= S.attachments.length) return;
  S.attachments.splice(index, 1);
  render();
}

function formatFileSize(bytes) {
  if (!bytes) return "0 B";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

async function duplicateCampaign(id) {
  const campaign = findHistoryById(id);
  if (!campaign) {
    S.error = "Campaign not found.";
    render();
    return;
  }

  resetCampaignState();
  S.selectedSheet = { id: campaign.sheetId, name: campaign.sheetName };
  S.selectedTab = campaign.sheetTab;
  S.composeSubject = campaign.subject || "";
  S.composeBody = campaign.body || "";
  S.composeHtml = campaign.htmlBody || "";
  S.editorMode = campaign.editorMode || (campaign.htmlBody ? "html" : "write");
  S.fromName = campaign.fromName || "";
  S.replyTo = campaign.replyTo || "";
  S.testEmail = campaign.testEmail || "";
  S.delayMs = campaign.delayMs || 500;
  S.sectionOpen.compose = true;
  S.sectionOpen.send = true;
  S.sectionOpen.test = false;
  S.view = "compose";
  hydrateFromCacheForSelectedSheet();
  render();

  const tabsRes = await api("getSheetTabs", { spreadsheetId: campaign.sheetId });
  if (tabsRes.ok) {
    const tabsResData2 = tabsRes.data;
    S.sheetTabs = Array.isArray(tabsResData2) ? tabsResData2 : (Array.isArray(tabsResData2 && tabsResData2.tabs) ? tabsResData2.tabs : []);
    if (tabsResData2 && tabsResData2.spreadsheetName && S.selectedSheet) {
      S.selectedSheet.name = tabsResData2.spreadsheetName;
      const sheetEntry2 = S.sheets.find(function(s) { return s.id === S.selectedSheet.id; });
      if (sheetEntry2) sheetEntry2.name = tabsResData2.spreadsheetName;
    }
    if (!S.selectedTab && S.sheetTabs.length) {
      S.selectedTab = S.sheetTabs[0];
    }
  } else {
    S.error = tabsRes.error;
    render();
    return;
  }

  const dataRes = await api("getSheetData", {
    spreadsheetId: campaign.sheetId,
    tab: S.selectedTab
  });
  if (dataRes.ok) {
    S.sheetData = Array.isArray(dataRes.data) ? dataRes.data : [];
  } else {
    S.error = dataRes.error;
    render();
    return;
  }

  const draftsRes = await api("listDrafts");
  if (draftsRes.ok) {
    S.drafts = Array.isArray(draftsRes.data) ? draftsRes.data : [];
  }
  render();
}

function deleteCampaign(id) {
  S.history = S.history.filter(function(c) { return c.id !== id; });
  chrome.storage.local.set({ mb_history: S.history });
  render();
}

function viewCampaignResults(id) {
  const campaign = findHistoryById(id);
  if (!campaign) {
    S.error = "Campaign not found.";
    render();
    return;
  }
  S.lastRun = campaign;
  S.results = campaign.results || [];
  S.view = "results";
  render();
}

function upsertHistory(record) {
  if (!record) {
    return;
  }
  const next = S.history.filter(function(item) {
    return item.id !== record.id;
  });
  next.unshift(record);
  S.history = next.slice(0, 12);
  chrome.storage.local.set({ mb_history: S.history });
}

function buildHistoryRecord(isTest) {
  const name = S.composeSubject.trim() || (S.selectedSheet ? S.selectedSheet.name : "Campaign");
  const record = {
    id: "campaign-" + Date.now(),
    name: name,
    createdAt: new Date().toISOString(),
    sheetId: S.selectedSheet ? S.selectedSheet.id : "",
    sheetName: S.selectedSheet ? S.selectedSheet.name : "",
    sheetTab: S.selectedTab,
    subject: S.composeSubject,
    body: S.composeBody,
    htmlBody: S.composeHtml,
    editorMode: S.editorMode,
    fromName: S.fromName,
    replyTo: S.replyTo,
    testEmail: S.testEmail,
    delayMs: S.delayMs,
    summary: (isTest ? "Test run" : "Live run") + " · " + (S.selectedSheet ? S.selectedSheet.name : ""),
    results: []
  };
  return record;
}

function resumeDraft() {
  if (!S.hasSavedDraft) {
    S.view = "home";
    render();
    return;
  }
  S.view = "compose";
  hydrateFromCacheForSelectedSheet();
  render();
}

function restoreSavedDraft(saved) {
  if (!saved) {
    return;
  }
  S.selectedSheet = saved.selectedSheet || null;
  S.selectedTab = saved.selectedTab || "";
  S.composeSubject = saved.composeSubject || "";
  S.composeBody = saved.composeBody || "";
  S.composeHtml = saved.composeHtml || "";
  S.editorMode = saved.editorMode || "write";
  S.fromName = saved.fromName || "";
  S.replyTo = saved.replyTo || "";
  S.testEmail = saved.testEmail || "";
  S.delayMs = saved.delayMs || 500;
  S.selectedDraft = saved.selectedDraft || null;
  S.sectionOpen = Object.assign({}, DEFAULT_SECTIONS, saved.sectionOpen || {});
  S.draftSavedAt = saved.savedAt || "";
  S.hasSavedDraft = !!(S.composeSubject || S.composeBody || S.composeHtml || S.selectedSheet);
  hydrateFromCacheForSelectedSheet();
}

function persistComposeDraft() {
  const payload = {
    selectedSheet: S.selectedSheet,
    selectedTab: S.selectedTab,
    composeSubject: S.composeSubject,
    composeBody: S.composeBody,
    composeHtml: S.composeHtml,
    editorMode: S.editorMode,
    fromName: S.fromName,
    replyTo: S.replyTo,
    testEmail: S.testEmail,
    delayMs: S.delayMs,
    selectedDraft: S.selectedDraft,
    sectionOpen: S.sectionOpen,
    savedAt: new Date().toISOString()
  };
  S.draftSavedAt = payload.savedAt;
  S.hasSavedDraft = !!(S.composeSubject || S.composeBody || S.composeHtml || S.selectedSheet);
  chrome.storage.local.set({ mb_compose_draft: payload });
}

function persistCache() {
  chrome.storage.local.set({ mb_cache: S.cache });
}

function cacheSheetData() {
  if (!S.selectedSheet || !S.selectedTab) {
    return;
  }
  S.cache.sheetDataBySheetTab[S.selectedSheet.id + "::" + S.selectedTab] = S.sheetData.slice();
  persistCache();
}

function hydrateFromCacheForSelectedSheet() {
  if (!S.selectedSheet) {
    return;
  }
  const cachedTabs = S.cache.sheetTabsBySheetId[S.selectedSheet.id];
  if (Array.isArray(cachedTabs) && cachedTabs.length) {
    S.sheetTabs = cachedTabs.slice();
    if (!S.selectedTab) {
      S.selectedTab = S.sheetTabs[0];
    }
  }
  const key = S.selectedSheet.id + "::" + S.selectedTab;
  const cachedRows = S.cache.sheetDataBySheetTab[key];
  if (Array.isArray(cachedRows) && cachedRows.length) {
    S.sheetData = cachedRows.slice();
  }
  if (Array.isArray(S.cache.drafts) && S.cache.drafts.length && !S.drafts.length) {
    S.drafts = S.cache.drafts.slice();
  }
}

function summarizeResults(results, isTest, sheetName) {
  let sent = 0;
  let tests = 0;
  let errors = 0;
  let skipped = 0;

  for (let i = 0; i < results.length; i += 1) {
    const result = results[i];
    if (result.status === "SENT") {
      sent += 1;
    } else if (result.status === "TEST_SENT") {
      tests += 1;
    } else if (result.status === "ERROR") {
      errors += 1;
    } else {
      skipped += 1;
    }
  }

  const parts = [];
  if (sheetName) {
    parts.push(sheetName);
  }
  if (isTest) {
    parts.push(tests + " test");
  } else {
    parts.push(sent + " sent");
  }
  if (errors) {
    parts.push(errors + " errors");
  }
  if (skipped) {
    parts.push(skipped + " skipped");
  }
  return parts.join(" · ");
}

function findHistoryById(id) {
  for (let i = 0; i < S.history.length; i += 1) {
    if (S.history[i].id === id) {
      return S.history[i];
    }
  }
  if (S.lastRun && S.lastRun.id === id) {
    return S.lastRun;
  }
  return null;
}

function getHeaders() {
  if (!S.sheetData.length || !S.sheetData[0]) {
    return [];
  }
  return S.sheetData[0].map(function(header) {
    return String(header || "").trim();
  }).filter(Boolean);
}

function getPreviewExample() {
  if (S.sheetData.length < 2) {
    return "";
  }
  const headers = getHeaders();
  const row = S.sheetData[1];
  const parts = [];
  for (let i = 0; i < headers.length; i += 1) {
    parts.push(headers[i] + ": " + String(row[i] || ""));
  }
  return parts.join(" | ");
}

function applyMerge(template, rowIndex) {
  let output = template || "";
  const headers = getHeaders();
  const row = S.sheetData[rowIndex] || [];

  for (let i = 0; i < headers.length; i += 1) {
    const token = new RegExp(escapeRegex("{{" + headers[i] + "}}"), "gi");
    output = output.replace(token, String(row[i] || ""));
  }
  return output;
}

function renderPreviewBody(rowIndex) {
  if (S.composeHtml.trim()) {
    return applyMerge(S.composeHtml, rowIndex);
  }
  return plainTextToHtml(applyMerge(S.composeBody, rowIndex));
}

function sanitizePreview(html) {
  return String(html || "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "");
}

function plainTextToHtml(text) {
  return esc(text || "").replace(/\n/g, "<br>");
}

function htmlToPlainText(html) {
  return String(html || "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');
}

function formatWhen(dateStr) {
  try {
    return new Date(dateStr).toLocaleString();
  } catch (err) {
    return dateStr || "";
  }
}

function formatDateOnly(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString();
  } catch (err) {
    return dateStr || "";
  }
}

async function loadBackendCode() {
  try {
    const response = await fetch(chrome.runtime.getURL("apps-script-backend.js"));
    S.backendCode = await response.text();
  } catch (err) {
    S.backendCode = "";
  }
}

async function copyBackendCode() {
  if (!S.backendCode) {
    await loadBackendCode();
  }
  if (!S.backendCode) {
    S.error = "Could not load the Apps Script code.";
    render();
    return;
  }
  try {
    await navigator.clipboard.writeText(S.backendCode);
    S.error = null;
    // Brief "Copied!" feedback on the button
    var btn = document.getElementById('copyScriptBtn');
    if (btn) {
      var orig = btn.innerHTML;
      btn.innerHTML = dbIcon('check') + ' Copied!';
      btn.disabled = true;
      setTimeout(function() {
        btn.innerHTML = orig;
        btn.disabled = false;
      }, 2000);
    }
  } catch (e) {
    S.error = "Could not copy to clipboard. Please try again.";
    render();
  }
}

function formatBackendLimit(limit) {
  if (typeof limit !== "number" || limit < 0) {
    return "Unlimited backends";
  }
  return limit + " backend" + (limit === 1 ? "" : "s");
}

function shortUrlLabel(url) {
  const value = String(url || "");
  if (value.length <= 34) {
    return value;
  }
  return value.slice(0, 31) + "...";
}

function persistBackends() {
  chrome.storage.local.set({ mb_script_url: S.scriptUrls.slice() });
}

async function addBackend() {
  const input = document.getElementById("urlInput");
  const emailInput = document.getElementById("backendEmailInput");
  const nextUrl = input ? input.value.trim() : "";
  const nextEmail = emailInput ? emailInput.value.trim() : "";
  if (!nextUrl) {
    S.error = "Paste your Apps Script Web App URL first.";
    render();
    return;
  }

  // Security: validate URL via background before accepting it
  const validation = await billingRequest("billing:validate-backend-url", { url: nextUrl });
  if (!validation.ok || (validation.data && !validation.data.valid)) {
    S.error = (validation.data && validation.data.error) || validation.error || "Invalid backend URL.";
    render();
    return;
  }
  const safeUrl = (validation.data && validation.data.url) || nextUrl;

  // Check if already added (compare by URL)
  const existing = S.scriptUrls.find(function(entry) {
    return (typeof entry === "object" ? entry.url : entry) === safeUrl;
  });
  if (existing) {
    S.scriptUrl = safeUrl;
    S.error = null;
    persistBackends();
    persistComposeDraft();
    render();
    return;
  }

  // Store as object with url + optional email label
  S.scriptUrls.push({ url: safeUrl, email: nextEmail });
  S.scriptUrl = safeUrl;
  S.error = null;
  persistBackends();
  persistComposeDraft();
  render();
}

function selectBackend(index) {
  const entry = S.scriptUrls[index];
  if (!entry) return;
  S.scriptUrl = typeof entry === "object" ? entry.url : entry;
  S.error = null;
  persistBackends();
  persistComposeDraft();
  render();
}

function removeBackend(index) {
  if (index < 0 || index >= S.scriptUrls.length) return;
  const removed = S.scriptUrls.splice(index, 1)[0];
  const removedUrl = typeof removed === "object" ? removed.url : removed;
  if (removedUrl === S.scriptUrl) {
    const first = S.scriptUrls[0];
    S.scriptUrl = first ? (typeof first === "object" ? first.url : first) : "";
  }
  persistBackends();
  persistComposeDraft();
  render();
}

// Helper: extract URL string from a backend entry (supports both legacy string and new object format)
function backendUrl(entry) {
  return typeof entry === "object" ? (entry.url || "") : (entry || "");
}

function countEstimatedSendableRows() {
  if (!S.sheetData.length || !S.sheetData[0]) {
    return 0;
  }
  const headers = S.sheetData[0].map(function(value) {
    return String(value || "").trim().toLowerCase();
  });
  const emailIndex = headers.indexOf("email");
  const statusIndex = headers.indexOf("status");
  let count = 0;

  for (let i = 1; i < S.sheetData.length; i += 1) {
    const row = S.sheetData[i] || [];
    const email = emailIndex >= 0 ? String(row[emailIndex] || "").trim() : "";
    const status = statusIndex >= 0 ? String(row[statusIndex] || "").trim().toUpperCase() : "";
    if (email && status !== "SENT") {
      count += 1;
    }
  }
  return count;
}

async function openUpgrade() {
  await billingRequest("billing:open-upgrade");
}

async function openLogin() {
  await billingRequest("billing:open-login");
}

async function openManageSubscription() {
  await billingRequest("billing:open-manage");
}

async function syncExtPayStatus() {
  const response = await billingRequest("billing:sync-extpay");
  if (response.ok && response.data) {
    S.billing = Object.assign({}, S.billing, response.data);
  }
  await refreshBillingState();
  render();
}

function step(n, title, desc) {
  return '<div class="step"><span class="step-n">' + n + "</span><div><strong>" + title + "</strong><p>" + desc + "</p></div></div>";
}

function mkField(id, label, type, value, placeholder) {
  return '<div class="field"><label class="label">' + label + '</label><input class="inp" id="f_' + id + '" type="' + type + '" value="' + esc(String(value || "")) + '" placeholder="' + esc(placeholder || "") + '"></div>';
}

function esc(value) {
  if (value === null || value === undefined) {
    return "";
  }
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escAttr(value) {
  return esc(value).replace(/'/g, "&#39;");
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function timeAgo(dateStr) {
  if (!dateStr) {
    return "";
  }
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) {
    return "just now";
  }
  if (diff < 3600) {
    return Math.floor(diff / 60) + "m ago";
  }
  if (diff < 86400) {
    return Math.floor(diff / 3600) + "h ago";
  }
  return Math.floor(diff / 86400) + "d ago";
}
