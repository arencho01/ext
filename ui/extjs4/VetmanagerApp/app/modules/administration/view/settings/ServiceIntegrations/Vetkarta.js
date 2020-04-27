Ext4.define('VetmanagerApp.modules.administration.view.settings.ServiceIntegrations.Vetkarta', {
    extend: 'Ext4.FormPanel',
    xtype: 'settings-vetkarta-panel',
    border: false,
    title: false,
    buttonAlign: 'center',
    scope: this,
    layout: 'card',
    requires: [
        'Ext4.ux.form.ItemSelector'
    ],
    items: [
        {
            xtype: 'fieldset',
            name: 'first_form',
            title: 'Активация интеграции с Веткартой',
            layout: 'fit',
            margin: '10px',
            width: 800,
            items: [
                {
                    xtype: 'form',
                    border: false,
                    defaults: {
                        labelWidth: 250,
                        width: 800
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            border: false,
                            style: {
                                marginTop: '14px',
                                marginBottom: '20px'
                            },
                            items: [
                                {
                                    xtype: 'box',
                                    html: '<a href="https://rules.vetkarta.com/" target="_blank">Политика обработки персональных данных</a>'
                                },
                                {
                                    xtype: 'checkbox',
                                    anchor: '100%',
                                    fieldLabel: 'я согласен',
                                    name: 'personal_data_agreement',
                                    style: {
                                        marginTop: '-2px',
                                        marginLeft: '40px'
                                    }
                                }
                            ]
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Логин для авторизации в чате' + ' *',
                            name: 'login',
                            allowBlank: false,
                            value: _CURRENT_USER_NICKNAME || _CURRENT_USER_LOGIN,
                            style: {
                                marginTop: '20px'
                            }
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Название клиники' + ' *',
                            name: 'clinic_name',
                            allowBlank: false,
                            value: _CLINIC_TITLE
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'ФИО владельца' + ' *',
                            name: 'fio',
                            allowBlank: false,
                            value: _CURRENT_USER_NAME
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Телефон' + ' *',
                            name: 'phone',
                            allowBlank: false
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Email' + ' *',
                            name: 'email',
                            allowBlank: false,
                            value: _CURRENT_USER_EMAIL
                        }, {
                            xtype: 'combo'
                            , pageSize: 20
                            , allowBlank: false
                            , name: 'city_id'
                            , fieldLabel: 'Город клиники' + ' *'
                            , valueField: 'id'
                            , displayField: 'title'
                            , queryMode: 'remote'
                            , minChars: 2
                            , store: {
                                xtype: 'store'
                                , fields: ['id', 'title']
                                , autoLoad: true
                                , proxy: {
                                    type: 'ajax'
                                    , url: 'ajax_clients.php?cmd=get_cities'
                                    , reader: {
                                        type: 'json'
                                        , root: 'data'
                                    }
                                }
                            }
                            , initComponent: function(config) {
                                Ext.form.field.ComboBox.prototype.initComponent.apply(this, arguments);
                                new Ext3.ComboValidator({combo: this});
                            }
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Домен публичного сайта' + ' *',
                            name: 'domain_client_site',
                            allowBlank: false
                        }, {
                            xtype: 'button',
                            text: '<b>Включить интеграцию</b>',
                            action: 'enable_vetkarta_integration',
                            cls: 'x4-green-button',
                            width: 220,
                            anchor: '',
                            height: 40,
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            height: 800,
            border: false,
            overflowY: 'auto',
            layout: 'auto',
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Пользователи в чате',
                    name: 'second_form',
                    border: false,
                    buttonAlign: 'center',
                    defaults: {
                        anchor: '100%',
                        labelWidth: 250
                    },
                    items: [
                        {
                            xtype: 'form',
                            padding: '5px',
                            layout: 'fit',
                            border: false,
                            items: [{
                                xtype: 'itemselector',
                                name: 'users_in_chat',
                                anchor: '100%',
                                displayField: 'title',
                                valueField: 'id',
                                fromTitle: 'Все пользователи',
                                toTitle: 'Пользователи в чате',
                                store: {
                                    xtype: 'store',
                                    fields: ['id', 'title'],
                                    autoLoad: false,
                                    proxy: {
                                        type: 'ajax',
                                        url: 'ajax_administration.php',
                                        extraParams: {
                                            cmd: 'get_users',
                                            start: 0,
                                            limit: 9999,
                                            justActivated: 1
                                        },
                                        reader: {
                                            type: 'json',
                                            root: 'data'
                                        }
                                    }
                                }
                            }]
                        }, {
                            xtype: 'button',
                            text: '<b>Сохранить пользователей</b>',
                            action: 'save_users_in_chat',
                            width: '240px',
                            height: 40,
                            cls: 'x4-green-button'
                        }
                    ]
                }, {
                    xtype: 'fieldset',
                    name: 'public_script',
                    title: 'Изменить домен публичного сайта',
                    layout: 'column',
                    border: false,
                    style: {
                        marginTop: '20px'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'domain_client_site',
                            fieldLabel: 'Домен публичного сайта' + ' *',
                            allowBlank: false,
                            labelWidth: 250,
                            width: 800
                        }
                    ]
                }, {
                    xtype: 'fieldset',
                    name: 'public_script',
                    title: 'Код для вставки на ваш публичный сайт',
                    layout: 'fit',
                    border: false,
                    height: 360,
                    style: {
                        marginTop: '30px'
                    },
                    items: [
                        {
                            xtype: 'textarea',
                            name: 'public_script',
                            readOnly: true
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
                action: 'save_domain_client_site',
                maskElement: 'el',
                disabled: true,
                listeners: {
                    render: function(btn) {
                        btn.mask();
                    }
                }
            }
        ]
    }
});