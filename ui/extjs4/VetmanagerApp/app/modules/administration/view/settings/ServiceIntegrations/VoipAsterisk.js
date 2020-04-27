Ext4.define('VetmanagerApp.modules.administration.view.settings.ServiceIntegrations.VoipAsterisk', {
    extend: 'Ext4.Panel',
    xtype: 'settings-voip-asterisk-panel',
    region: 'center',
    buttonAlign: 'center',
    scope: this,
    border: false,
    title: false,
    layout: 'fit',
    items: {
        xtype: 'tabpanel',
        border: false,
        items: [
            {
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                title: 'Настройка телефонии',
                border: false,
                items: [
                    {
                        xtype: 'asteriskrequestform',
                        flex: 1
                    },
                    {
                        xtype: 'asterisksettingsform',
                        flex: 1
                    }
                ]
            },
            {
                title: 'Настройка справочников',
                xtype: 'voipcombomanuals'
            }
        ],
    },
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
                tooltip: LS.__translate(LS.Edit),
                action: 'check-asterisk'
            }
        ],
    },
    getForm: function() {
        var me = this;
        return me.query('asterisksettingsform')[0].getForm();
    }
});