Ext4.define('VetmanagerApp.modules.administration.view.settings.ClinicSettings', {
    extend: 'Ext4.Panel',
    xtype: 'clinicsettings',
    border: false,
    region: 'center',
    title: false,
    buttonAlign: 'center',
    url: 'ajax_administration.php',
    scope: this,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    requires: [
        'Ext4.ux.form.ItemSelector'
    ],
    items: [
        {
            xtype: 'fieldset',
            padding: '10 10 0 10',
            height: 34,
            border: false,
            name: 'customer_panel',
            items: [
                {
                    xtype: 'checkbox',
                    labelWidth: 200,
                    fieldLabel: LS.__translate(LS.CommonClientBase),
                    name: 'total_customer_base',
                    boxLabel: LS.__translate(LS.ThisFeatureDisablesTheClinicFilteringByDefaultWhenUsingANetworkOfClinics)
                }
            ]
        },
        {
            xtype: 'tabpanel',
            border: false,
            tabBar: {
                renderData: {
                    bodyStyle: 'border-color: transparent;'
                }
            },
            flex: 1,
            items: [
                {
                    xtype: 'form',
                    title: LS.__translate(LS.ClinicsAdjustment),
                    name: 'clinic_settings',
                    border: false,
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    tbar: [
                        {
                            cls: 'button-save',
                            action: 'save',
                            tooltip: LS.__translate(LS.Save),
                            margins: {top:3, right:0, bottom:2, left:5}
                        },
                        {
                            cls: 'button-add',
                            action: 'add'
                        }
                    ],
                    items: [
                        {
                            xtype: 'grid',
                            name: 'clinics_grid',
                            border: false,
                            width: 250,
                            store: {
                                xtype: 'store',
                                fields: ['id', 'title'],
                                autoLoad: true,
                                proxy: {
                                    type: 'ajax',
                                    url: 'ajax_clinics.php',
                                    extraParams: {
                                        cmd: 'get_grid',
                                        start: 0,
                                        limit: 9999
                                    },
                                    reader: {
                                        type: 'json',
                                        root: 'data'
                                    }
                                }
                            },
                            columns: [{
                                header: LS.__translate(LS.Clinics),
                                dataIndex: 'title',
                                width: '100%',
                                sortable: false,
                                hideable: false
                            }]
                        }, {
                            flex: 1,
                            xtype: 'panel',
                            name: 'clinic_settings',
                            bodyStyle: {
                                overflowY: 'scroll',
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    name: 'clinic_settings_panel',
                                    padding: '10px',
                                    border: false,
                                    hidden: true,
                                    defaults: {
                                        labelAlign: 'left',
                                        buttonAlign: 'center',
                                        labelWidth: 230,
                                        width: 800
                                    },
                                    items: [
                                        {
                                            xtype: 'hidden',
                                            name: 'id',
                                            value: 0
                                        },{
                                            xtype: 'textfield',
                                            name: 'title',
                                            fieldLabel: LS.__translate(LS.Namez) + ' *'
                                        }, {
                                            xtype: 'form',
                                            border: false,
                                            defaults: {
                                                labelAlign: 'left',
                                                labelWidth: 230
                                            },
                                            layout: {
                                                type: 'table',
                                                columns: 2
                                            },
                                            items: [
                                                {
                                                    xtype: 'timefield',
                                                    width: 525,
                                                    fieldLabel: LS.__translate(LS.WorkingHoursOfClinic) + ' *',
                                                    format: 'H:i',
                                                    selectOnFocus: true,
                                                    name: 'start_time',
                                                    allowBlank: false,
                                                    increment: 15
                                                }, {
                                                    xtype: 'timefield',
                                                    width: 275,
                                                    format: 'H:i',
                                                    selectOnFocus: true,
                                                    name: 'end_time',
                                                    allowBlank: false,
                                                    increment: 15
                                                }

                                            ]
                                        }, {
                                            xtype: 'combo',
                                            pageSize: 20,
                                            allowBlank: false,
                                            name: 'city_id',
                                            fieldLabel: LS.__translate(LS.City) + ' *',
                                            valueField: 'id',
                                            displayField: 'title',
                                            queryMode: 'remote',
                                            minChars: 2,
                                            store: {
                                                xtype: 'store',
                                                fields: ['id', 'title'],
                                                autoLoad: true,
                                                proxy: {
                                                    type: 'ajax',
                                                    url: 'ajax_clients.php?cmd=get_cities',
                                                    reader: {
                                                        type: 'json',
                                                        root: 'data'
                                                    }
                                                }
                                            },
                                            initComponent: function(config) {
                                                Ext.form.field.ComboBox.prototype.initComponent.apply(this, arguments);
                                                new Ext3.ComboValidator({combo: this});
                                            }
                                        }, {
                                            xtype: 'textarea',
                                            name: 'address',
                                            height: 100,
                                            fieldLabel: LS.__translate(LS.Address)
                                        }, {
                                            xtype: 'textfield',
                                            name: 'phone',
                                            fieldLabel: LS.__translate(LS.PhoneNumber)
                                        }, {
                                            xtype: 'textfield',
                                            name: 'internet_address',
                                            fieldLabel: LS.__translate(LS.ExternalInternetAddress)
                                        }, {
                                            xtype: 'combobox',
                                            fieldLabel: LS.__translate(LS.QuickInvoiceClient),
                                            pageSize: 15,
                                            triggerAction: 'all',
                                            name: 'guest_client_id',
                                            valueField: 'id',
                                            displayField: 'title',
                                            queryMode: 'remote',
                                            minChars: 2,
                                            allowBlank: true,
                                            store: {
                                                xtype: 'store',
                                                fields: ['id', 'title', 'pet_id'],
                                                autoLoad: false,
                                                proxy: {
                                                    type: 'ajax',
                                                    url: 'ajax_get_clients.php',
                                                    extraParams: {
                                                        is_show_id: false,
                                                        is_show_pets: true
                                                    },
                                                    reader: {
                                                        type: 'json',
                                                        root: 'data'
                                                    }
                                                }
                                            }
                                        }, {
                                            xtype: 'fieldset',
                                            title: LS.__translate(LS.ClinicTimeZone),
                                            layout: 'column',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    triggerAction: 'all',
                                                    columnWidth: .5,
                                                    name: 'timezone',
                                                    valueField: 'value',
                                                    displayField: 'title',
                                                    labelStyle: 'width:200px;',
                                                    value: 'Europe/Kiev',
                                                    mode: 'local',
                                                    minChars: 2,
                                                    allowBlank: false,
                                                    editable: false,
                                                    store: {
                                                        xtype: 'json',
                                                        fields: ['value', 'title'],
                                                        autoLoad: true,
                                                        proxy: {
                                                            type: 'ajax',
                                                            url: 'ajax_administration.php?cmd=get_timezones_combo_list',
                                                            reader: {
                                                                type: 'json',
                                                                root: 'data',
                                                                idProperty: 'value',
                                                                totalProperty: 'total'
                                                            }
                                                        }
                                                    }
                                                }
                                            ]
                                        }, {
                                            xtype: 'fieldset',
                                            title: 'Лого клиники', //TODO: translate
                                            layout: 'column',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    width: 275,
                                                    padding: 5,
                                                    border: false,
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            height: 250,
                                                            border: false,
                                                            html: '<div style="width: 250px; height: 200px;" class="clinic_settings_logo_panel"></div>'
                                                        }, {
                                                            xtype: 'panel',
                                                            height: 60,
                                                            border: false,
                                                            html: [
                                                                '<a class="button actionUpload">',
                                                                '<input type="file" value="Выберите картинку" accept="image/*">',
                                                                '</a>',
                                                                '<br />',
                                                                '<a class="button actionClear">',
                                                                '<input type="button" value="Очистить" style="width: 135px; margin-top: 5px;">',
                                                                '</a>'
                                                            ].join(''),
                                                            listeners: {
                                                                scope: this,
                                                                render: function () {
                                                                    var croppieObj = null,
                                                                        clearLogoContainer = function () {
                                                                            try {
                                                                                $('.clinic_settings_logo_panel').croppie('destroy');
                                                                            } catch(e) {console.log('some error destroy');}

                                                                            $('.clinic_settings_logo_panel').empty();
                                                                        },
                                                                        readFile = function(input) {
                                                                            if (input.files && input.files[0]) {
                                                                                var reader = new FileReader();

                                                                                reader.onload = function (e) {
                                                                                    if (croppieObj) {
                                                                                        clearLogoContainer();
                                                                                    }

                                                                                    croppieObj = $('.clinic_settings_logo_panel').croppie({
                                                                                        url: e.target.result,
                                                                                        enableExif: true,
                                                                                        enableResize: true,
                                                                                        viewport: {
                                                                                            width: 150,
                                                                                            height: 153
                                                                                        }
                                                                                    });
                                                                                };

                                                                                reader.readAsDataURL(input.files[0]);
                                                                            }
                                                                        };

                                                                    $('.actionUpload input').on('change', function () {
                                                                        clearLogoContainer();
                                                                        readFile(this);
                                                                    });

                                                                    $('.actionClear input').on('click', function () {
                                                                        clearLogoContainer();
                                                                        $('.actionUpload input')[0].value = '';
                                                                    });
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }, {
                                                    xtype: 'panel',
                                                    columnWidth: 1,
                                                    border: false,
                                                    padding: 5,
                                                    html: 'Сюда загружается логотип клиники, который будет использоваться в печатных формах. Рекомендованный размер - высота 153 px, ширина 150-200 px. Если ваш логотип другого размера, предварительно приведите его к требуемым параметрам. Иначе программа сама отмасштабирует изображение, что может испортить пропорции.\n' +
                                                    'Для каждой клиники сети можно загрузить свой логотип.' //TODO: translate
                                                }
                                            ]
                                        }, {
                                            xtype: 'combobox',
                                            name: 'status',
                                            fieldLabel: LS.__translate(LS.Status),
                                            editable: false,
                                            store: new Ext.data.ArrayStore({
                                                id: 0,
                                                fields: [
                                                    'value', 'title'
                                                ],
                                                data: [['ACTIVE', ' Активна'], ['DELETED', 'Неактивна']] //TODO: translate
                                            }),
                                            valueField: 'value',
                                            displayField: 'title',
                                            value: 'ACTIVE'
                                        }, {
                                            xtype: 'hidden',
                                            name: 'last_active',
                                            value: 0
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: LS.__translate(LS.ClinicUsers),
                    name: 'users_in_clinic',
                    border: false,
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    tbar: [
                        {
                            cls: 'button-save',
                            action: 'save',
                            tooltip: LS.__translate(LS.Save),
                            margins: {top:3, right:0, bottom:2, left:5}
                        }
                    ],
                    items: [
                        {
                            xtype: 'grid',
                            name: 'selected_clinics_grid',
                            border: false,
                            width: 250,
                            viewConfig: {
                                scrollOffset: 0,
                                forceFit: true
                            },
                            store: {
                                xtype: 'store',
                                fields: ['id', 'title'],
                                autoLoad: true,
                                proxy: {
                                    type: 'ajax',
                                    url: 'ajax_administration.php',
                                    extraParams: {
                                        cmd: 'get_clinics'
                                    },
                                    reader: {
                                        type: 'json',
                                        root: 'data'
                                    }
                                }
                            },
                            columns: [{
                                header: '№',
                                dataIndex: 'id',
                                width: 35,
                                sortable: false,
                                hideable: false
                            }, {
                                header: LS.__translate(LS.Namez),
                                dataIndex: 'title',
                                width: 200,
                                sortable: false,
                                hideable: false
                            }]
                        }, {
                            flex: 1,
                            xtype: 'panel',
                            name: 'users_in_clinic_panel',
                            layout: 'fit',
                            border: false,
                            items: [{
                                xtype: 'itemselector',
                                name: 'selected_users',
                                anchor: '100%',
                                displayField: 'title',
                                valueField: 'id',
                                fromTitle: LS.__translate(LS.AllUsersExceptAdministrators),
                                toTitle: LS.__translate(LS.ChosenUsers),
                                store: {
                                    xtype: 'store',
                                    fields: ['id', 'title'],
                                    autoLoad: true,
                                    proxy: {
                                        type: 'ajax',
                                        url: 'ajax_administration.php',
                                        extraParams: {
                                            cmd: 'get_users',
                                            start: 0,
                                            limit: 9999,
                                            justActivated: 1,
                                            allClinics: 1,
                                            withoutAdmins: 1
                                        },
                                        reader: {
                                            type: 'json',
                                            root: 'data'
                                        }
                                    }
                                }
                            }]
                        }
                    ]
                }
            ]
        }
    ]
});