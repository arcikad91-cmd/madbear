// ═══════════════════════════════════════════════════════════════════
// MADBEAR EMAILS — i18n.js
// Интернационализация: только русский язык (ru).
// Использование: t('key') возвращает строку на русском языке.
// ═══════════════════════════════════════════════════════════════════

const LANGUAGES = [
  { code: "ru", label: "🇷🇺 RU", name: "Русский" }
];

let CURRENT_LANG = "ru";

function setLang(code) {
  CURRENT_LANG = code;
}

function t(key) {
  const lang = TRANSLATIONS[CURRENT_LANG] || TRANSLATIONS["ru"];
  return lang[key] !== undefined ? lang[key] : key;
}

const TRANSLATIONS = {

  // ─────────────────────────────────────────────────────────────────
  ru: {
    // Header / nav
    "guide": "Руководство",
    "back": "← Назад",
    "settings": "Настройки",

    // Nav crumbs
    "crumb.settings": "Настройки",
    "crumb.guide": "Как пользоваться",
    "crumb.sheets": "Выбор таблицы",
    "crumb.compose": "Создание кампании",
    "crumb.sending": "Отправка...",
    "crumb.results": "Результаты",
    "crumb.followup": "Дожимная кампания",
    "crumb.followupsending": "Отправка дожима...",
    "crumb.followupresults": "Результаты дожима",

    // Home
    "home.eyebrow": "Email-кампании",
    "home.title": "Кампании, которые<br>работают как Gmail",
    "home.sub": "Выберите таблицу, напишите один раз, сначала протестируйте — затем отправляйте персонализированные письма массово с полями слияния.",
    "home.newCampaign": "↗ Новая кампания",
    "home.resumeDraft": "Продолжить черновик",
    "home.recentNote": "Последние кампании сохраняются здесь — дублируйте самые удачные настройки в один клик.",
    "home.gmailLimits": "Лимиты Gmail: Личный @gmail.com = 500/день · Google Workspace = 2 000/день (на аккаунт)",
    "home.emailsSent": "Писем отправлено",
    "home.remainingToday": "Осталось сегодня",
    "home.campaignsSent": "Кампаний отправлено",
    "home.recentCampaigns": "Последние кампании",
    "home.recentSub": "Откройте кампанию и дублируйте её в один клик.",
    "home.noCampaigns": "Кампаний пока нет — отправленные кампании появятся здесь.",

    // Recent campaigns card
    "card.followup": "↩ Дожим",
    "card.followupLocked": "↩ Дожим 🔒",
    "card.followupLockedTitle": "Дожимные кампании требуют Premium",
    "card.duplicate": "Дублировать",
    "card.view": "Просмотр",
    "card.sent": "отправлено",
    "card.untitled": "Кампания без названия",

    // Settings tabs
    "tab.backends": "Бэкенды",
    "tab.billing": "Подписка",
    "tab.appearance": "Внешний вид",
    "tab.guide": "Руководство",
    "tab.about": "О расширении",
    "tab.language": "Язык",

    // Backends panel
    "backends.title": "Apps Script бэкенды",
    "backends.sub": "Добавьте URL ваших веб-приложений Google Apps Script и переключайтесь между аккаунтами Gmail.",
    "backends.howTo": "📖 Как настроить бэкенд",
    "backends.allowance": "Доступно бэкендов:",
    "backends.whatIs": "<strong>Что такое бэкенд?</strong> Бэкенд — это ваше личное приватное веб-приложение Google Apps Script. Оно связывает это расширение с одним аккаунтом Gmail и таблицами Google Sheets, доступными этому аккаунту.",
    "backends.emailLabel": "Аккаунт Gmail (метка)",
    "backends.emailPlaceholder": "you@gmail.com или you@yourcompany.com",
    "backends.emailHint": "Введите адрес Gmail для этого бэкенда, чтобы легко его распознавать.",
    "backends.urlLabel": "URL веб-приложения Apps Script",
    "backends.urlPlaceholder": "https://script.google.com/macros/s/.../exec",
    "backends.urlHint": "Добавьте URL веб-приложения Google Apps Script, чтобы подключить ваш почтовый аккаунт.",
    "backends.addBtn": "Добавить бэкенд",
    "backends.none": "Бэкенд ещё не добавлен.",
    "backends.active": "Активен",
    "backends.setActive": "Сделать активным",
    "backends.delete": "Удалить",

    // Billing panel
    "billing.title": "Подписка",
    "billing.emailsToday": "писем использовано сегодня",
    "billing.emailsTodayUnlimited": "писем отправлено сегодня (без лимита)",
    "billing.backends": "аккаунтов бэкенда",
    "billing.memberSince": "Участник с",
    "billing.manage": "Управление подпиской",
    "billing.upgradePremium": "↗ Обновить до Premium",
    "billing.sync": "↻ Синхронизация",
    "billing.getPro": "↗ Получить Pro — $5/мес",
    "billing.getPremium": "↗ Получить Premium — $12/мес",
    "billing.login": "Войти",
    "billing.founderTitle": "СКИДКА 40% на первый год 🚀",
    "billing.founderSub": "Присоединяйтесь как участник-основатель и зафиксируйте скидку 40% навсегда на первый год. Отправляйте умнее, растите быстрее и станьте частью команды, создающей будущее email-рассылок.",
    "billing.founderCode": "при оформлении",
    "billing.founderBadge": "ОГРАНИЧЕННОЕ ПРЕДЛОЖЕНИЕ",
    "billing.founderFounder": "Цена для основателей — только первый год",
    "billing.gmailLimits": "📧 <strong>Лимиты отправки Google:</strong> Личный Gmail = <strong>500/день</strong> · Google Workspace = <strong>2 000/день</strong>. Это собственные лимиты Google на аккаунт.",
    "billing.pro.features": "500 писем/день<br>3 аккаунта бэкенда<br>HTML-редактор писем<br>Безлимитные шаблоны",
    "billing.premium.features": "Безлимит писем/день<br>Безлимит бэкендов<br>Дожимные кампании<br>Drip-последовательности (3 шага)<br>Отправка по расписанию<br>Умное окно отправки<br>Поля CC / BCC<br>Футер отписки<br>Приоритетная поддержка",

    // Appearance panel
    "appearance.title": "Шрифт",
    "appearance.sub": "Выберите тип лица для всего текста в расширении.",

    // Language panel
    "language.title": "Язык",
    "language.sub": "Интерфейс расширения доступен на русском языке.",

    // Guide panel
    "guide.privacy.title": "🔒 Почему мы просим авторизовать доступ к Google",
    "guide.privacy.body": "Мы создали Madbear Emails, потому что верим в ваше <strong>право свободно отправлять почту</strong> — без сбора и продажи ваших данных. Ваши письма отправляются напрямую из <em>вашего собственного</em> аккаунта Google через ваш личный приватный Apps Script бэкенд. Мы никогда не прикасаемся к вашим сообщениям.<br><br>Google требует, чтобы новые расширения выстроили подтверждённую историю использования перед предоставлением более широких разрешений. Мы только начинаем, и каждая отправленная вами кампания помогает нам заслужить это доверие — не для себя, а чтобы этот инструмент остался доступным всем.<br><br><em style=\"color:var(--tx3)\">Мы запускаем этот продукт, потому что уважаем вашу конфиденциальность. Мы начинаем, и мы войдём в историю — ради свободы использования.</em>",
    "guide.sendLimits": "📧 <strong>Лимиты отправки Google (на аккаунт):</strong> Личный Gmail (@gmail.com) = <strong>500 писем/день</strong>. Google Workspace (корпоративный) = <strong>2 000 писем/день</strong>. Вы можете добавить несколько бэкендов, чтобы объединить аккаунты.",
    "guide.step1.title": "Шаг 1: Скопируйте код бэкенда",
    "guide.step1.sub": "Одноразовая настройка для каждого аккаунта Gmail.",
    "guide.step1.body": "Нажмите кнопку ниже, чтобы скопировать полный код Apps Script бэкенда, затем откройте Google Apps Script в новой вкладке и вставьте его туда.",
    "guide.step1.btn": "📋 Скопировать код Apps Script",
    "guide.step2.title": "Шаг 2: Создайте проект Apps Script",
    "guide.step2.sub": "Настройте проект Google в аккаунте, из которого хотите отправлять письма.",
    "guide.step2.body": "1. Перейдите на <a href=\"https://script.google.com\" target=\"_blank\" class=\"lnk\">script.google.com</a><br>2. Войдите в аккаунт Gmail, из которого хотите отправлять<br>3. Нажмите <strong>Новый проект</strong><br>4. Удалите весь стартовый код<br>5. Вставьте код, скопированный на шаге 1<br>6. Необязательно: переименуйте проект в <strong>Madbear Emails Backend</strong>",
    "guide.step3.title": "Шаг 3: Разверните как веб-приложение",
    "guide.step3.sub": "Создаёт приватный URL, используемый Madbear Emails.",
    "guide.step3.body": "1. Нажмите <strong>Развернуть</strong> → <strong>Новое развертывание</strong><br>2. Нажмите значок шестерёнки ⚙ → выберите <strong>Веб-приложение</strong><br>3. Установите <strong>Выполнять от имени</strong> → <strong>Меня</strong><br>4. Установите <strong>Кому есть доступ</strong> → <strong>Только мне</strong><br>5. Нажмите <strong>Развернуть</strong>",
    "guide.step4.title": "Шаг 4: Скопируйте URL веб-приложения",
    "guide.step4.sub": "Google показывает этот URL после развертывания.",
    "guide.step4.body": "1. Скопируйте полный URL веб-приложения, показанный после развертывания<br>2. Перейдите в <strong>Настройки → Бэкенды</strong><br>3. Введите ваш адрес Gmail и вставьте URL<br>4. Нажмите <strong>Добавить бэкенд</strong>",
    "guide.step5.title": "Шаг 5: Создайте первую кампанию",
    "guide.step5.sub": "После подключения всё происходит внутри расширения.",
    "guide.step5.body": "<strong>Понадобится:</strong><br>• Таблица Google Sheets со столбцом <code>Email</code><br>• Дополнительные столбцы для персонализации (например, <code>FirstName</code>)<br>• Ваша тема + тело письма<br><br><strong>Затем:</strong><br>1. Нажмите <strong>Новая кампания</strong><br>2. Выберите таблицу<br>3. Напишите письмо с полями слияния, например <code>{{FirstName}}</code><br>4. Нажмите <strong>Отправить кампанию</strong>",
    "guide.followup.title": "Дожимные кампании",
    "guide.followup.sub": "Отправляйте дожимные письма в той же цепочке, что и исходная кампания.",
    "guide.followup.body": "<strong>Как работают дожимы:</strong><br>После отправки кампании нажмите <strong>↩ Дожим</strong> на любой карточке истории. Ваше дожимное письмо будет отправлено как ответ в той же цепочке.<br><br><strong>Ретаргетинг:</strong><br>Только получатели, которым было отправлено исходное письмо (Status = SENT в таблице), получат дожим. Тем, кому не отправляли или кому уже сделали дожим, письмо автоматически не придёт.<br><br><strong>Требуется бэкенд:</strong><br>Дожимные кампании требуют обновлённый <code>apps-script-backend.js</code> (v3.5.0+). Если вы видите ошибку версии, скопируйте последний код бэкенда в Настройки → Бэкенды и заново разверните веб-приложение.",
    "guide.faq.title": "Вопросы и ответы",
    "guide.faq.sub": "Короткие ответы для первой настройки.",
    "guide.faq.body": "<strong>Что такое бэкенд?</strong><br>Ваше личное приватное веб-приложение Apps Script — оно связывает один аккаунт Gmail с этим расширением.<br><br><strong>Зачем нужен собственный бэкенд?</strong><br>Письма отправляются из вашего собственного аккаунта Google, а не с серверов Madbear.<br><br><strong>Можно ли использовать несколько аккаунтов Gmail?</strong><br>Да — добавьте несколько бэкендов и переключайтесь между ними.<br><br><strong>Как должен называться столбец с почтой?</strong><br>Строго <code>Email</code> (с заглавной E).<br><br><strong>Поля слияния не работают?</strong><br>Имена столбцов должны совпадать точно — <code>{{FirstName}}</code> соответствует столбцу <code>FirstName</code>.<br><br><strong>Отправка не работает?</strong><br>Откройте URL вашего бэкенда в Chrome, войдя в тот же аккаунт Google, затем повторите попытку.<br><br><strong>Сколько писем можно отправлять?</strong><br>Личный Gmail: до 500/день на аккаунт. Google Workspace: до 2 000/день на аккаунт. Лимит вашего тарифа суммируется по всем вашим бэкендам.",

    // About panel
    "about.title": "О расширении",
    "about.sub": "Madbear Emails разработано агентством Madbear Creative Agency.",
    "about.privacy.title": "Данные и конфиденциальность",
    "about.privacy1": "Madbear Emails подключается к вашему веб-приложению Google Apps Script для обработки кампаний. Оно только читает и редактирует таблицу Google Sheets, которую вы предоставляете.",
    "about.privacy2": "Madbear Emails не получает доступ к файлам Google Drive, не просматривает, не удаляет, не перемещает и не управляет ими.",
    "about.privacy3": "Madbear Emails использует доступ к Gmail только для создания, редактирования и отправки писем кампаний по вашему запросу. Оно не читает вашу входящую почту и не сканирует прошлые письма.",
    "about.connection.title": "Советы по подключению",
    "about.connection.sub": "Если письма не отправляются, один раз откройте URL активного веб-приложения в Chrome, войдя в тот же аккаунт Google.",
    "about.noBackend": "Активный бэкенд ещё не выбран.",

    // Sheets panel
    "sheets.title": "Подключите таблицу",
    "sheets.sub": "Вставьте URL или ID таблицы Google Sheets, которую хотите использовать для этой кампании.",
    "sheets.privacy": "Madbear Emails подключается только к конкретной таблице, которую вы предоставляете. Оно не получает доступ к Google Drive, не просматривает и не сканирует его.",
    "sheets.nameLabel": "Название таблицы",
    "sheets.namePlaceholder": "напр. Список рассылки Q2",
    "sheets.nameHint": "Это название будет идентифицировать таблицу в ваших кампаниях. Оставьте пустым, чтобы автоматически использовать заголовок таблицы.",
    "sheets.urlLabel": "URL таблицы Google Sheets или её ID",
    "sheets.urlPlaceholder": "https://docs.google.com/spreadsheets/d/... или ID таблицы",
    "sheets.connectBtn": "Подключить таблицу",
    "sheets.recentTitle": "Недавние таблицы",

    // Compose panel
    "compose.title": "Написать письмо",
    "compose.sub": "Напишите сообщение, вставьте поля слияния и переключайтесь между обычным текстом и HTML.",
    "compose.templates": "Шаблоны и черновики",
    "compose.templatesSub": "Загрузите один из ваших черновиков Gmail как основу.",
    "compose.send": "Отправить кампанию",
    "compose.sendSub": "Настройки живой отправки и основное действие отправки.",
    "compose.test": "Тестовый режим",
    "compose.testSub": "Просмотр кампании без отправки реальным получателям.",
    "compose.preview": "Предпросмотр письма",
    "compose.previewSub": "Посмотрите, как письмо будет выглядеть для каждого получателя.",
    "compose.subject": "Тема",
    "compose.subjectPlaceholder": "Привет, {{FirstName}}, быстрый вопрос",
    "compose.editorMode": "Режим редактора",
    "compose.write": "Текст",
    "compose.html": "HTML",
    "compose.htmlLocked": "HTML 🔒",
    "compose.htmlLockedTitle": "HTML-редактор требует Pro или Premium",
    "compose.bodyLabel": "Тело письма",
    "compose.bodyPlaceholder": "Привет, {{FirstName}},\n\nЯ хотел обратиться к вам, потому что...",
    "compose.htmlLabel": "HTML-письмо",
    "compose.htmlHint": "Поддерживаются inline HTML и CSS.",
    "compose.attachments": "Вложения",
    "compose.attachFile": "Прикрепить файл",
    "compose.noAttachments": "Вложения не добавлены.",
    "compose.attachHint": "Файлы прикрепляются к каждому письму кампании. Общий размер — не более 5 МБ.",
    "compose.mergeFields": "Поля слияния",
    "compose.htmlPreview": "HTML-предпросмотр",
    "compose.htmlPreviewPlaceholder": "Здесь появится HTML-предпросмотр вашего письма.",
    "compose.campaign": "Кампания",
    "compose.template": "Шаблон",
    "compose.saved": "Сохранено",
    "compose.gmailAccount": "Аккаунт Gmail",
    "compose.manualEmail": "Указан вручную",
    "compose.notYet": "ещё нет",
    "compose.sheetTab": "Лист таблицы",
    "compose.recipients": "получателей",
    "compose.loading": "Загрузка деталей кампании...",

    // Send settings
    "send.fromName": "Имя отправителя",
    "send.fromNamePlaceholder": "Ваше имя или компания",
    "send.fromNameHint": "Отображается как имя отправителя в Gmail.",
    "send.replyTo": "Reply-To адрес",
    "send.replyToPlaceholder": "replies@yourcompany.com",
    "send.replyToHint": "Необязательно — оставьте пустым, чтобы использовать ваш адрес Gmail.",
    "send.delay": "Задержка между письмами",
    "send.delayHint": "Небольшая задержка снижает риск попадания в спам.",
    "send.sendBtn": "↗ Отправить кампанию",
    "send.limitReached": "Дневной лимит исчерпан — обновите тариф, чтобы отправлять больше.",

    // Test mode
    "test.email": "Адрес для тестового письма",
    "test.emailHint": "Отправлять только на этот адрес для проверки.",
    "test.modeLabel": "Тестовый режим:",
    "test.modeDesc": "отправляет предпросмотр на ваш тестовый адрес и не помечает строки таблицы как SENT.",
    "test.sendTest": "Отправить тестовое письмо",

    // Backends misc
    "backends.saved": "Бэкенд сохранён",
    "backends.use": "Использовать",
    "backends.remove": "Удалить",

    // Follow-up
    "followup.subject": "Тема дожима",
    "followup.subjectHint": "Будет отправлено как ответ в той же цепочке, что и исходное письмо.",
    "followup.message": "Сообщение дожима",
    "followup.messagePlaceholder": "Привет,\n\nХотел вернуться к моему прошлому письму...",
    "followup.htmlLabel": "HTML-дожим",
    "followup.sheetFields": "Поля таблицы",
    "followup.sheetFieldsHint": "Нажмите на поле, чтобы вставить его в сообщение.",
    "followup.recipients": "Получатели",
    "followup.send": "Настройки отправки",
    "followup.sendSub": "Настройки имени отправителя, reply-to и задержки.",
    "followup.test": "Тестовый режим",
    "followup.testSub": "Просмотр дожима без отправки реальным получателям.",
    "followup.sendBtn": "↗ Отправить дожим",
    "followup.testBtn": "Отправить тестовый дожим",
    "followup.selectAll": "Все",
    "followup.selectNone": "Никто",
    "followup.search": "Поиск получателей…",
    "followup.threadNote": "Дожим будет отправлен как ответ в той же цепочке переписки — получатели увидят его как продолжение исходного письма.",

    // Results
    "results.sendFollowup": "↩ Отправить дожим",
    "results.followupLocked": "↩ Дожим 🔒 Premium",
    "results.duplicate": "Дублировать",
    "results.backHome": "На главную",

    // Footer
    "footer.builtFor": "Создано для",
    "footer.agency": "Madbear Creative Agency",

    // Dashboard (db.*)
    "db.nav.overview": "Обзор",
    "db.nav.campaigns": "Кампании",
    "db.nav.analytics": "Аналитика",
    "db.nav.contacts": "Контакты",
    "db.nav.drip": "Drip-последовательности",
    "db.nav.billing": "Тарифы",
    "db.nav.settings": "Настройки",
    "db.nav.managePlan": "Управление тарифом",
    "db.overview.title": "Обзор",
    "db.overview.sub": "Ваша активность отправки в одном взгляде",
    "db.overview.sent": "Писем отправлено",
    "db.overview.campaigns": "Кампании",
    "db.overview.openRate": "Оценка открываемости",
    "db.overview.contacts": "Контакты",
    "db.overview.thisMonth": "за месяц",
    "db.overview.thisWeek": "за неделю",
    "db.overview.recentTitle": "Последние кампании",
    "db.overview.newCampaign": "Новая кампания",
    "db.overview.viewAnalytics": "Смотреть аналитику",
    "db.overview.noActivity": "Кампаний пока нет — нажмите «Новая кампания», чтобы начать.",
    "db.campaigns.title": "Кампании",
    "db.campaigns.sub": "Все ваши отправленные и запланированные кампании",
    "db.campaigns.new": "Новая кампания",
    "db.campaigns.export": "Экспорт",
    "db.campaigns.all": "Все",
    "db.campaigns.sent": "Отправленные",
    "db.campaigns.scheduled": "Запланированные",
    "db.campaigns.failed": "С ошибками",
    "db.campaigns.empty": "Кампаний пока нет",
    "db.analytics.title": "Аналитика",
    "db.analytics.sub": "Эффективность по всем кампаниям",
    "db.contacts.title": "Контакты",
    "db.contacts.sub": "Управление списком контактов",
    "db.contacts.add": "Добавить контакт",
    "db.contacts.import": "Импорт CSV",
    "db.contacts.export": "Экспорт CSV",
    "db.contacts.empty": "Контактов пока нет — добавьте первый.",
    "db.contacts.newCamp": "Новая кампания",
    "db.drip.title": "Drip-последовательности",
    "db.drip.sub": "Многошаговые автоматизированные дожимы",
    "db.drip.sendStep": "Отправить шаг drip",
    "db.billing.title": "Тарифы и подписка",
    "db.billing.sub": "Ваша подписка и данные аккаунта",
    "db.billing.sync": "Синхронизировать",
    "db.billing.manage": "Управление подпиской",
    "db.billing.upgrade": "Обновить",
    "db.settings.title": "Настройки",
    "db.settings.sub": "Параметры аккаунта, бэкенды и интеграции",
    "db.settings.dashTheme": "Тема панели",
    "db.settings.dashHint": "Светлый или тёмный режим для панели",
    "db.settings.popupTheme": "Тема попапа",
    "db.settings.themeHint": "Применяется только к попапу расширения",
    "db.settings.language": "Язык",
    "db.settings.langHint": "Весь интерфейс доступен на русском языке",
    "db.settings.light": "☀ Светлая",
    "db.settings.dark": "☾ Тёмная",
    "db.settings.backends": "Бэкенды",
    "db.settings.guide": "Руководство",
    "db.settings.about": "О расширении",
    "db.compose.title": "Новая кампания",
    "db.compose.sub": "Вставьте URL таблицы Google Sheets — столбец A = email, строка 1 = заголовок",
    "db.compose.campName": "Название кампании",
    "db.compose.sheetUrl": "URL или ID таблицы Google Sheets",
    "db.compose.recent": "Недавние таблицы",
    "db.compose.connect": "Подключить таблицу",
    "db.compose.subject": "Тема письма",
    "db.compose.body": "Текст сообщения",
    "db.compose.composeTitle": "Написать письмо",
    "db.compose.test": "Тестовая отправка",
    "db.compose.send": "Отправить сейчас",
    "db.compose.back": "Назад",
    "db.compose.sending": "Отправка кампании…",
    "db.compose.done": "Кампания отправлена! 🎉",
    "db.compose.close": "Закрыть",
    "db.compose.newCamp": "Новая кампания",

  }

};
