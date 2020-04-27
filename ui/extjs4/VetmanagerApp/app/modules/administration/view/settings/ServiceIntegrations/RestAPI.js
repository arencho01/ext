//TODO:translate
Ext4.define('VetmanagerApp.modules.administration.view.settings.ServiceIntegrations.RestAPI', {
    extend: 'Ext4.FormPanel',
    xtype: 'settings-restapi-panel',
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
                    title: 'REST API для интеграции с другими приложениями',
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
                            name: 'restApiKey',
                            readOnly: true
                        },
                        {
                            xtype: 'label',
                            hideLabel: true,
                            html:
                                '<span style="color:red">' +
                                    'будьте внимательны, API KEY даёт доступ к полному CRUD' +
                                '</span><br /><br /><br />'
                        },
                        {
                            width: 500,
                            border: false,
                            items: {
                                xtype: 'button',
                                hideLabel: true,
                                text: 'Перегенерировать ключ',
                                action: "generate-rest-api-key"
                            }

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
