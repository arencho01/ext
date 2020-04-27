Ext4.define('VetmanagerApp.modules.administration.view.settings.ServiceIntegrations.Unisender', {
    extend: 'Ext4.FormPanel',
    xtype: 'settings-unisender-panel',
    border: false,
    title: false,
    scope: this,
    layout: {
        type: 'vbox',
        align: 'stretch',
        padding: 10
    },
    items: [
        {
            xtype: 'fieldset',
            title: 'Unisender (SMS и Email рассылка)',
            name: 'unisender_fieldset',
            cls: 'ext4-gray-fieldset',
            height: 300,
            defaults: {
                labelAlign: 'left',
                labelWidth: 150,
                width: 500
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'unisender_api_number',
                    fieldLabel: LS.__translate(LS.Api),
                    labelWidth: 100
                }, {
                    xtype: 'textfield',
                    name: 'unisender_email',
                    fieldLabel: LS.__translate(LS.Email),
                    labelWidth: 100
                }, {
                    xtype: 'textfield',
                    name: 'unisender_phone',
                    fieldLabel: LS.__translate(LS.CellPhone),
                    labelWidth: 150
                }, {
                    xtype: 'textfield',
                    name: 'alpha_name',
                    fieldLabel: LS.__translate(LS.AlphaName) + ' (' + LS.__translate(LS.AllowedByUnisender) + ')',
                    value: 'clinic',
                    labelWidth: 290
                }, {
                    xtype: 'checkbox',
                    labelWidth: 150,
                    fieldLabel: 'Включить для SMS', //TODO: translate
                    boxLabel: 'Включая эту опцию Вы будете использовать Unisender для смс рассылок', //TODO: translate
                    value: 0,
                    name: 'unisender_use_sms'
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
            },
            {
                cls: 'button-save',
                tooltip: LS.__translate(LS.Save),
                action: 'save-unisender'
            }
        ],
    }
});