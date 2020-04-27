//TODO:translate
Ext4.define('VetmanagerApp.modules.administration.store.settings.ServiceIntegrations', {
    extend: 'Ext.data.Store',
    storeId: 'serviceIntegrationsStore',
    fields: [
        { name: 'src', type: 'string' },
        { name: 'caption', type: 'string' },
        { name: 'desc', type: 'string' },
        { name: 'help', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'checkable', type: 'boolean' },
        { name: 'enabled', type: 'boolean' },
        { name: 'skipSettings', type: 'boolean' }
    ],
    data: [
        {
            src:'ui/desktop/images/mainicons/service-asterisk.png',
            caption:'Телефония своя - Астериск',
            desc: 'Установленное в клинике железо типа FreePbx или MyPbx.',
            help: 'https://vetmanager.ru/knowledgebase/nastroyka-telefonii',
            checkable: false,
            name: 'asterisk',
            enabled: false
        },
        {
            src:'ui/desktop/images/mainicons/service-voip.png',
            caption:'Облачная телефония',
            desc: 'Включение таких сервисов как Mango Офис, Гравител, Zadarma и т.д.',
            help: 'https://vetmanager.ru/knowledgebase/nastroyka-telefonii',
            checkable: false,
            name: 'vats',
            enabled: false
        },
        {
            src:'ui/desktop/images/mainicons/service-unisender.png',
            caption:'Unisender',
            desc: 'Сервис предназначенный для SMS и Email рассылки.',
            help: 'https://vetmanager.ru/knowledgebase/integracija-servisa-unisender-s-vetmanager',
            checkable: true,
            name: 'unisenderIntegration',
            enabled: false
        },
        {
            src:'ui/desktop/images/mainicons/service-smscenter.png',
            caption:'СМС Центр',
            desc: 'Сервис предназначенный для SMS рассылки.',
            help: 'https://vetmanager.ru/knowledgebase/nastroyka-integracii-s-sms-centrom',
            checkable: true,
            name: 'smscenterIntegration',
            enabled: false
        },
        {
            src:'ui/desktop/images/mainicons/contacts.gif',
            caption:'E-mail коммуникации',
            desc: 'E-mail будет указан как обратный адрес в письмах, отправленных клиентам...',
            help: '',
            checkable: false,
            name: 'contacts',
            enabled: true
        },
        {
            src:'ui/desktop/images/mainicons/service-idexx.png',
            caption:'Лаборатория Idexx',
            desc: 'Портативная ветеринарная лаборатория, которая обеспечит вас...',
            help: 'https://vetmanager.ru/knowledgebase/nastrojka-integracii-idexx-s-vetmanager',
            checkable: true,
            name: 'idexxIntegration',
            enabled: false
        },
        {
            src:'ui/desktop/images/mainicons/service-restapi.png',
            caption:'REST API',
            desc: 'Определяет набор функций, к которым разработчики могут совершать...',
            help: 'https://vetmanager.ru/knowledgebase/integracija-so-storonnimi-programmam',
            checkable: true,
            name: 'restApi'
        },
        {
            src:'ui/desktop/images/mainicons/service-pdf.png',
            caption:'Загрузка PDF сканов и создание медкарт на их основании',
            desc: 'Сканируйте бумажные документы в формат PDF, а затем с помощью...',
            help: 'https://vetmanager.ru/knowledgebase/skanirovanie-dokymentov',
            checkable: true,
            name: 'pdfScannerIntegration',
            enabled: false
        },
        {
            src:'ui/desktop/images/mainicons/vetacademia.gif',
            caption:'Vet Academy',
            desc: 'Дает возможность связать свой аккаунт Ветакадемии с аккаунтом Ветменеджер',
            help: 'https://vetacademia.royalcanin.ru/',
            checkable: true,
            name: 'vetAcademyIntegration',
            enabled: false,
            skipSettings: true
        },
        {
            src:'ui/desktop/images/mainicons/widgets.png',
            caption:'Виджеты записи на прием',
            desc: 'Позволяет создать виджет записи на прием и разместить на сайте, vkontakte или facebook',
            help: 'https://vetmanager.ru/knowledgebase/nastroyka-zapisi-na-priem',
            checkable: true,
            name: 'appointmentWidget',
            enabled: false
        },
        {
            src:'ui/desktop/images/mainicons/contacts.gif',
            caption:'Виджет Веткарты '+'<span style="color: red">(интеграция работает в тестовом режиме)</span>',
            desc: 'Позволяет вести чат между врачем и клиентом',
            help: 'https://vetmanager.ru/knowledgebase/nastroyka-vetkarta',
            checkable: true,
            name: 'vetKarta',
            enabled: false
        },
        {
            src:'ui/desktop/images/mainicons/royal.png',
            caption:LS.Prescriptions,
            desc: LS.DescriptionSendingFoodRecomendation,
            help: '',
            checkable: false,
            name: 'royalPrescriptions',
            enabled: false
        }
    ]
});