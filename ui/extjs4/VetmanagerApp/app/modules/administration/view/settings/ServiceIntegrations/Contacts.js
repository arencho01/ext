Ext4.define('VetmanagerApp.modules.administration.view.settings.ServiceIntegrations.Contacts', {
    extend: 'Ext4.FormPanel',
    xtype: 'settings-contacts-panel',
    border: false,
    title: false,
    buttonAlign: 'center',
    padding: '10px',
    scope: this,
    items: [
        {
            xtype: 'fieldset',
            title: 'Email для обратной связи',
            flex: 1,
            layout: 'fit',
            cls: 'ext4-gray-fieldset',
            items: [
                {
                    xtype: 'form',
                    border: false,
                    cls: 'ext4-gray-fieldset',
                    defaults: {
                        width: 300
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'contacts_email_reply_to',
                            fieldLabel: 'Email', //TODO: translate
                            vtype: 'email',
                            allowBlank: true,
                            labelWidth:  100
                        }, {
                            xtype: 'checkbox',
                            labelWidth: 100,
                            boxLabel: 'Использовать для всех клиник', //TODO: translate
                            value: 0,
                            name: 'contacts_email_reply_to_all_clinics'
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
            },
            {
                cls: 'button-save',
                tooltip: LS.__translate(LS.Save),
                action: 'save-contacts'
            }
        ],
    }
});