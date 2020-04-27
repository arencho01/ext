Ext4.define('VetmanagerApp.modules.administration.view.settings.ServiceIntegrations.SmsCenter', {
    extend: 'Ext4.FormPanel',
    xtype: 'settings-sms-center-panel',
    border: false,
    title: false,
    buttonAlign: 'center',
    scope: this,
    layout: {
        type: 'vbox',
        align: 'stretch',
        padding: 10
    },
    items: [
        {
            xtype: 'fieldset',
            title: 'СМС центр (только SMS рассылка)',
            name: 'sms_center_fieldset',
            cls: 'ext4-gray-fieldset',
            flex: 1,
            layout: 'fit',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'form',
                    border: false,
                    defaults: {
                        labelAlign: 'left',
                        labelWidth: 150,
                        width: 500
                    },
                    cls: 'ext4-gray-fieldset',
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'sms_center_is_registered',
                            value: 0
                        },{
                            xtype: 'textfield',
                            name: 'sms_center_login',
                            fieldLabel: LS.__translate(LS.Login),
                            labelWidth: 150,
                            readOnly: true,
                            allowBlank: false
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            border: false,
                            height: 38,
                            cls: 'ext4-gray-fieldset',
                            items: [
                                {
                                    xtype: 'textfield',
                                    inputType: 'password',
                                    name: 'sms_center_password',
                                    fieldLabel: LS.__translate(LS.Password),
                                    labelWidth: 150,
                                    columnWidth: .6,
                                    readOnly: true,
                                    allowBlank: false
                                }, {
                                    xtype: 'checkboxfield',
                                    fieldLabel: LS.__translate(LS.ShowAPassword),
                                    labelWidth: 150,
                                    columnWidth: .4,
                                    style: {
                                        marginLeft: '10px'
                                    },
                                    listeners: {
                                        scope: this,
                                        change: function (th, checked) {
                                            var pwd = th.previousSibling();

                                            if (checked) {
                                                pwd.inputEl.dom.type = "text";
                                            } else {
                                                pwd.inputEl.dom.type = "password";
                                            }
                                        }
                                    }
                                }
                            ]
                        }, {
                            xtype: 'textfield',
                            name: 'sms_center_phone',
                            fieldLabel: LS.__translate(LS.CellPhone),
                            labelWidth: 150,
                            allowBlank: false,
                            emptyText: 'Пример: 380123456789'
                        }, {
                            xtype: 'textfield',
                            name: 'sms_center_email',
                            fieldLabel: LS.__translate(LS.Email),
                            labelWidth: 150,
                            allowBlank: false
                        },
                        {
                            xtype: 'combo',
                            queryMode: 'local',
                            displayField: 'title',
                            valueField: 'value',
                            fieldLabel: LS.__translate(LS.Country),
                            name: 'country_id',
                            labelWidth: 150,
                            allowBlank: false,
                            editable: false,
                            store: {
                                xtype: 'store',
                                fields: ['value', 'title'],
                                data: [
                                    {value: 1, title: 'Россия'},
                                    {value: 2, title: 'Украина'},
                                    {value: 3, title: 'Другая'}
                                ]
                            }
                        },
                        {
                            xtype: 'panel',
                            name: 'balance-panel',
                            layout: 'column',
                            border: false,
                            cls: 'ext4-gray-fieldset',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    name: 'sms_center_balance',
                                    fieldLabel: LS.__translate(LS.Balance),
                                    labelWidth: 150,
                                    fieldStyle: 'font-size: 21px;',
                                    style: {
                                        marginTop: '20px'
                                    },
                                    value: 0,
                                    columnWidth: .5
                                }, {
                                    xtype: 'panel',
                                    border: false,
                                    columnWidth: .5,
                                    padding: '30px',
                                    cls: 'ext4-gray-fieldset',
                                    html: '<a href="https://smsc.ru/pay/" target="_blank" >Пополнить баланс</a>'
                                }
                            ]
                        },
                        {
                            xtype: 'displayfield',
                            name: 'sms_account',
                            fieldLabel: 'Статус аккаунта',
                            labelWidth: 150,
                            fieldStyle: 'font-size: 21px;',
                            value: 'Аккаунт не сгенерирован',
                            style: {
                                marginTop: '20px'
                            }
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            padding: '20 0',
                            cls: 'ext4-gray-fieldset',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Сгенерировать аккаунт',
                                    action: 'sms_center_generate_account',
                                    width: 200
                                },
                                {
                                    xtype: 'panel',
                                    border: false,
                                    cls: 'ext4-gray-fieldset',
                                    html: '<span style="font-weight: bold; font-style: italic;">' +
                                    'Перейдите по ссылке. На странице входа в смс-центр введите логин и пароль - эти данные вы можете скопировать выше. ' +
                                    'Чтобы посмотреть пароль, нажмите галочку "Показать"</span>'
                                },
                                {
                                    xtype: 'panel',
                                    name: 'sms_center_go_to_account',
                                    border: false,
                                    cls: 'ext4-gray-fieldset',
                                    html: '<a href="https://smsc.ru/login/" target="_blank" >Перейти в кабинет СМС Центра</a>'
                                }, {
                                    xtype: 'checkbox',
                                    style: {
                                        fontSize: '24px',
                                        marginTop: '20px'
                                    },
                                    labelWidth: 150,
                                    fieldLabel: 'Включить для SMS',
                                    boxLabel: 'Включая эту опцию Вы будете использовать СМС Центр для смс рассылок',
                                    value: 0,
                                    name: 'sms_center_use_sms'
                                }
                            ]
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
                action: 'save-sms-center'
            }
        ],
    }
});