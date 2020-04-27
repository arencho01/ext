//TODO:translate
Ext4.define('VetmanagerApp.modules.administration.view.settings.ServiceIntegrations.PDFScanner', {
    extend: 'Ext4.FormPanel',
    xtype: 'settings-pdf-panel',
    region: 'center',
    buttonAlign: 'center',
    scope: this,
    border: false,
    title: false,
    items: [
        {
            xtype: 'form',
            border: false,
            style: {
                padding: '10px'
            },
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Загрузка PDF сканов и создание медкарт на их основании',
                    cls: 'ext4-gray-fieldset',
                    defaults: {
                        labelAlign: 'left',
                        labelWidth: 150,
                        width: 500
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Ваш api key',
                            name: 'pdfApiKey',
                            readOnly: true
                        },
                        {
                            xtype: 'displayfield',
                            hideLabel: true,
                            value:
                            '<a' +
                            '  class="green-button"' +
                            '  href="/build/get_file.php?file=vetmanager_pdf_scaner.tar.gz&type=vetmanager_pdf_scaner"' +
                            '  download="vetmanager_pdf_scaner.tar.gz"' +
                            '  blank="true"' +
                            '  style="width: 500px;">' +
                            '    Скачать клиент .exe' +
                            '</a>'
                        }
                    ]
                }
            ]
        }
    ],
    tbar: {
        items: [
            {
                cls: 'button-back',
                tooltip: LS.__translate(LS.Back),
                action: 'back',
                margins: {top:3, right:0, bottom:2, left:5}
            }
        ],
    }
});
