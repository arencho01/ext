var VatsProviders = {
    itoolabs:   ['vats_api_url', 'vats_api_key', 'crm_key', 'vats_crm_key', 'crm_url'],
    zadarma:    ['vats_api_key', 'vats_api_salt', 'crm_key', 'vats_crm_url'],
    binotel:    ['vats_api_key', 'vats_api_salt', 'crm_key', 'vats_crm_url'],
    mango:      ['vats_api_key', 'vats_api_salt', 'crm_url', 'vats_crm_url'],
    domru:      'itoolabs',
    gravitel:   'itoolabs',
    westcall:   'itoolabs'
};
Ext.define('Ext4.ux.form.VatsSettingsForm', {
    alias: 'widget.vatssettingsform',
    extend: 'Ext4.form.Panel',
    anchor:'100%',
    border: false,
    name: 'vats_settings_form',
    initComponent: function () {
        var me = this;

        me.callParent();

        var combo = me.query('combobox[name="vats_type"]')[0];
        combo.on('change', function(combo, newValue) {
            me.setVATSProvider(newValue);
        });
        var crmKey = me.query('textfield[name="vats_crm_key"]')[0];
        crmKey.on('change', function(keyField) {
            var urlField = me.query('textfield[name="vats_crm_url"]')[0],
            provider = me.query('[name="vats_type"]')[0].getValue();

            urlField.setValue('https://' + _DOMAIN_NAME + '.vetmanager.ru/vats/' + provider + '/' + keyField.getValue() + '/');
        });
    },
    setVATSProvider: function(provider) {
        var me = this,
        fields = VatsProviders[provider],
        allFields = ['vats_api_url', 'vats_api_key', 'vats_api_salt', 'crm_url', 'crm_key', 'vats_crm_key', 'vats_crm_url'];

        while (Ext4.isString(fields)) {
            fields = VatsProviders[fields];
        }

        Ext.each(allFields, function(fieldName) {
            var cmp = me.query('[name="' + fieldName + '"]')[0],
                visible = !(fields.indexOf(fieldName) < 0);
            cmp.setVisible(visible);
            cmp.setDisabled(!visible);
        });

        if (fields.indexOf('vats_crm_url') >= 0) {
            me.query('[name="vats_crm_key"]')[0].enable();
        }
    },
    items: {
        xtype: 'fieldset',
        cls: 'ext4-gray-fieldset',
        padding: '15',
        defaults: {
            defaults: {
                labelWidth: 200
            },
            allowBlank: false,
            width: 650,
            labelWidth: 200
        },
        items: [
            {
                xtype: 'combobox',
                typeAhead: true,
                editable: false,
                triggerAction: 'all',
                lazyRender: true,
                mode: 'local',
                name: 'vats_type',
                fieldLabel: LS.__translate(LS.Provider)+':',
                store: new Ext.data.ArrayStore({
                    id: 0,
                    fields: [
                        'value', 'title'
                    ],
                    data: [
                        ['zadarma', 'Zadarma'],
                        ['binotel', 'Binotel'],
                        ['gravitel', 'Гравител'],
                        ['mango', 'MANGO OFFICE'],
                        ['westcall','Вест Колл'],
                        ['domru', 'ДОМ.RU'],
                        ['itoolabs', 'itoolabs']
                    ]
                }),
                fieldStyle: {
                    cursor: 'pointer'
                },
                valueField: 'value',
                displayField: 'title'
            },
            {
                xtype: 'textfield',
                fieldLabel: LS.__translate(LS.AddressCloudATS) + ':',
                name: 'vats_api_url'
            },
            {
                xtype: 'textfield',
                fieldLabel: LS.__translate(LS.APIKeyATS)+':',
                name: 'vats_api_key'
            },
            {
                xtype: 'textfield',
                fieldLabel: LS.__translate(LS.APISecretATS) + ':',
                name: 'vats_api_salt'
            },
            {
                xtype: 'textfield',
                fieldLabel: LS.__translate(LS.CRMUrl) + ':',
                name: 'crm_url',
                readOnly: true,
                skipSave: true,
                value: 'https://' + _DOMAIN_NAME + '.vetmanager.ru/vats/',
                listeners: {
                    focus: function (el) {
                        el.selectText();
                        var res = document.execCommand('copy');

                        if (res) {
                            Ext3.MsgManager.alert('Внимание', 'Адрес CRM скопирован в буфер обмена');
                        }
                    }
                }
            },
            {
                xtype: 'panel',
                border: false,
                layout: 'hbox',
                cls: 'ext4-gray-fieldset',
                name: 'crm_key',
                items:[
                    {
                        xtype: 'textfield',
                        editable: false,
                        border: false,
                        fieldLabel:LS.__translate(LS.CRMKey) + ':',
                        name : 'vats_crm_key',
                        labelWidth: 200,
                        flex: 2,
                        submitValue: true,
                        value: '',
                        tplWriteMode: 'overwrite',
                        readOnly: true,
                        listeners: {
                            focus: function (el) {
                                el.selectText();
                                if (el.getValue()) {
                                    var res = document.execCommand('copy');

                                    if (res) {
                                        Ext3.MsgManager.alert('Внимание', 'Ключ CRM скопирован в буфер обмена');
                                    }
                                } else {
                                    Ext3.MsgManager.alert('Внимание', 'Значение пусто, необходимо сгенерировать');
                                }
                            }
                        }
                    },
                    {
                        xtype: 'textfield',
                        editable: false,
                        hidden: true,
                        border: false,
                        fieldLabel:LS.__translate(LS.CRMUrl) + ':',
                        name : 'vats_crm_url',
                        labelWidth: 200,
                        flex: 2,
                        submitValue: true,
                        value: '',
                        tplWriteMode: 'overwrite',
                        readOnly: true,
                        skipSave: true,
                        listeners: {
                            focus: function (el) {
                                el.selectText();
                                if (el.getValue()) {
                                    var res = document.execCommand('copy');

                                    if (res) {
                                        Ext3.MsgManager.alert('Внимание', 'Адрес CRM скопирован в буфер обмена');
                                    }
                                } else {
                                    Ext3.MsgManager.alert('Внимание', 'Значение пусто, необходимо сгенерировать');
                                }
                            }
                        }
                    },
                    {
                        xtype: 'displayfield',
                        width: 20
                    },
                    {
                        xtype: 'button',
                        text: 'Сгенерировать',
                        height: 32,
                        action: 'generateCRMKey',
                        cls: 'x4-green-button',
                        listeners:{
                            click: function(button){
                                var voipSettingsPanel = this.findParentByType('settings-voip-vats-panel'),
                                    vatsTypeField = voipSettingsPanel.query("[name='vats_type']")[0],
                                    vatsCrmKeyField = voipSettingsPanel.query("[name='vats_crm_key']")[0],
                                    vatsCrmUrlField = voipSettingsPanel.query("[name='vats_crm_url']")[0],
                                    provider = voipSettingsPanel.query('[name="vats_type"]')[0].getValue();

                                Ext4.Ajax.request({
                                    url: 'ajax_voip.php'
                                    , scope: this
                                    , params: {
                                        cmd: 'generate_crm_key',
                                        vats_type: vatsTypeField.getValue()
                                    }
                                    , success: function(r) {
                                        var result = Ext4.decode(r.responseText);
                                        var crmKeyValue = result.crm_key;
                                        vatsCrmKeyField.setValue(crmKeyValue);
                                        //vatsCrmUrlField.setValue('https://' + _DOMAIN_NAME + '.vetmanager.ru/vats/' + provider + '/' + crmKeyValue + '/');
                                    }
                                });
                            }
                        }
                    }
                ]
            },
            {
                xtype: 'numberfield',
                name: 'voip_call_message_timeout',
                fieldLabel: LS.__translate(LS.TimeDisplayAfterAnsweringCall),
                minValue: 1
            },
            {
                xtype: 'checkbox',
                name: 'voip_for_all_clinics',
                fieldLabel: LS.__translate(LS.ForAllClinics),
                boxLabel: ' (' + LS.__translate(LS.OnCheckUseOnlyThisSettings) + ')'
            },
            {
                xtype: 'checkbox',
                name: 'voip_enabled',
                boxLabel: LS.__translate(LS.VoipShowCallEventMessage).toLowerCase()
            },
            {
                xtype: 'checkbox',
                name: 'voip_auto_close_call_alert',
                boxLabel: LS.__translate(LS.VoipAutoCloseCallAlert).toLowerCase()
            },
            {
                xtype: 'checkbox',
                name: 'voip_closable_new_call_editor',
                boxLabel: LS.__translate(LS.VoipClosableNewCallEditor).toLowerCase()
            },
            {
                xtype: 'checkbox',
                name: 'voip_show_all_calls',
                boxLabel: LS.__translate(LS.ShowCallNotificationsAllUsers).toLowerCase()
            }
        ]
    },
});