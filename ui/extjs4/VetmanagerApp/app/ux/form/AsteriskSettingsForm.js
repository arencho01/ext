Ext.define('Ext4.ux.form.AsteriskSettingsForm', {
    alias: 'widget.asterisksettingsform',
    extend: 'Ext4.FormPanel',
    overflowY: 'auto',
    frame: false,
    border: false,
    scrollable: true,
    padding: '15 0 0 0',
    name: 'asterisk_settings_form',
    items: [
        {
            xtype: 'displayfield',
            value: '<span style="font-weight: bold">Форма VOIP</span>',
            style: 'font-weight: bold',
            padding: '0px 0px 10px 15px'
        },
        {
            region: 'center',
            xtype: 'fieldset',
            border: true,
            frame: true,
            cls: 'ext4-gray-fieldset',
            padding: '15',
            defaults: {
                labelAlign: 'left',
                labelWidth: 160,
                anchor: '98%',
                defaults: {
                    labelAlign: 'left',
                    labelWidth: 160,
                    anchor: '100%'
                }
            },
            overflowY: 'auto',
            items: [
                {
                    xtype: 'combobox',
                    typeAhead: true,
                    editable: false,
                    triggerAction: 'all',
                    lazyRender: true,
                    mode: 'local',
                    name: 'voip_type',
                    skipSave: true,
                    fieldLabel: LS.__translate(LS.Type) + ' VOIP ',
                    store: new Ext.data.ArrayStore({
                        id: 0,
                        fields: [
                            'value', 'title'
                        ],
                        data: [['mypbx', ' MyPBX'], ['freepbx', 'FreePBX']]
                    }),
                    valueField: 'value',
                    displayField: 'title'
                },
                {
                    xtype: 'checkbox',
                    name: 'voip_for_all_clinics',
                    fieldLabel: LS.__translate(LS.ForAllClinics),
                    skipSave: true,
                    boxLabel: ' (' + LS.__translate(LS.OnCheckUseOnlyThisSettings) + ')'
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
                    xtype: 'fieldset',
                    title: LS.__translate(LS.ConnetionToAsterisk),
                    style: {
                        'margin-top': '25px'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'voip_ip',
                            fieldLabel: LS.__translate(LS.IP)
                        },
                        {
                            xtype: 'textfield',
                            name: 'voip_port',
                            fieldLabel: LS.__translate(LS.Port),
                            value: '5038'
                        },
                        {
                            xtype: 'textfield',
                            name: 'voip_login',
                            fieldLabel: LS.__translate(LS.Login)
                        },
                        {
                            xtype: 'textfield',
                            name: 'voip_password',
                            inputType: 'password',
                            fieldLabel: LS.__translate(LS.Password)
                        },
                        {
                            xtype: 'checkbox',
                            name: 'voip_enabled',
                            skipSave: true,
                            fieldLabel: LS.__translate(LS.SwitchedOn),
                            boxLabel: LS.__translate(LS.VOIPEnabledPAMIText)
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: LS.__translate(LS.ConnetionToCDR),
                    style: {
                        'margin-top': '25px'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'voip_cdr_port',
                            fieldLabel: "CDR Port"
                        },
                        {
                            xtype: 'textfield',
                            name: 'voip_cdr_dbname',
                            fieldLabel: "CDR DB Name"
                        },
                        {
                            xtype: 'textfield',
                            name: 'voip_cdr_dbuser',
                            fieldLabel: "CDR DB User"
                        },
                        {
                            xtype: 'textfield',
                            name: 'voip_cdr_password',
                            inputType: 'password',
                            fieldLabel: 'CDR DB Password'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: LS.__translate(LS.ConnectionByFTP),
                    style: {
                        'margin-top': '25px'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'voip_ftp_server',
                            fieldLabel: 'Server'
                        },
                        {
                            xtype: 'textfield',
                            name: 'voip_ftp_port',
                            fieldLabel: 'Port',
                            value: '21'
                        },
                        {
                            xtype: 'textfield',
                            name: 'voip_ftp_records_path',
                            fieldLabel: 'Call recordings path',
                            value: '',
                            emptyText: 'FreePBX like: /var/spool/asterisk/monitor/$fyear/$fmonth/$fday/'
                        },
                        {
                            xtype: 'textfield',
                            name: 'voip_ftp_user',
                            fieldLabel: 'User',
                            value: 'root'
                        },
                        {
                            xtype: 'textfield',
                            name: 'voip_ftp_password',
                            inputType: 'password',
                            fieldLabel: 'Password'
                        },
                        {
                            xtype: 'checkbox',
                            name: 'voip_ftp_use_ssl',
                            fieldLabel: 'Use ssl'
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    name: 'phone_city_code',
                    labelWidth: 240,
                    fieldLabel: LS.__translate(LS.PhoneCodeOfACityClinic)
                },
                {
                    xtype: 'textfield',
                    name: 'phone_country_prefix',
                    labelWidth: 240,
                    fieldLabel: LS.__translate(LS.CountryCodeSeparatedByCommas)
                }
            ]
        }
    ]
});