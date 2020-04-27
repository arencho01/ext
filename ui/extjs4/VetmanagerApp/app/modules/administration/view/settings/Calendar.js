Ext4.define('VetmanagerApp.modules.administration.view.settings.Calendar', {
    extend: 'Ext4.tab.Panel',
    xtype: 'calendarsettings',
    border: false,
    region: 'center',
    title: false,
    scope: this,
    buttonAlign: 'center',
    activeTab: 0,
    requires: [
        'Ext4.ux.ColorField'
    ],
    items: [
        {
            border: false,
            title: LS.__translate(LS.GraphicUsers),
            xtype: 'form',
            padding: '5px',
            layout: 'fit',
            accessType: 'calendar_users',
            hideSaveBtn: false,
            items: [{
                xtype: 'itemselector',
                name: 'calendar_users',
                anchor: '100%',
                displayField: 'title',
                valueField: 'id',
                fromTitle: LS.__translate(LS.AllUsers),
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
            xtype: 'calendarintervalssettings',
            hideSaveBtn: true,
            hideTbar: true,
            accessType: false
        }, {
            xtype: 'form',
            border: false,
            accessType: false,
            hideSaveBtn: false,
            title: LS.__translate(LS.VisitSchedulingAdjustment),
            padding: '10px',
            layout: {
                type: 'vbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [{
                xtype: 'combo',
                labelWidth: 250,
                width: 900,
                height: 30,
                style: {
                    marginBottom: '15px'
                },
                fieldLabel: LS.__translate(LS.InitialDisplay),
                queryMode: 'local',
                displayField: 'title',
                valueField: 'value',
                name: 'start_view',
                store: {
                    xtype: 'store',
                    fields : ['value', 'title'],
                    data: [
                        {value: 'day', title: LS.__translate(LS.Day)},
                        {value: 'week', title: LS.__translate(LS.Week3)},
                        {value: 'month', title: LS.__translate(LS.Month)}
                    ]
                },
                value: GlobalProperties.get('calendar_active_view', 'week')
            }, {
                xtype: 'grid',
                name: 'admission_type_color',
                flex: 1,
                border: true,
                title: LS.__translate(LS.ColorOfDisplayLikeReception),
                anchor: '100%',
                tbar: [
                    {
                        cls: 'button-edit',
                        xtype: 'button',
                        action: 'edit_admission_type_color'
                    }
                ],
                store: {
                    xtype: 'store',
                    id: 'administration-calendar-color-settings-store',
                    fields: ['id', 'name', 'title', 'admission_length', 'time_start', 'color'],
                    autoLoad: true,
                    proxy: {
                        type: 'ajax',
                        url: 'ajax_administration.php',
                        extraParams: {
                            cmd: 'get_admission_types_color',
                            limit: 9999,
                            start: 0
                        },
                        reader: {
                            type: 'json',
                            root: 'data'
                        }
                    }
                },
                columns: [{
                    header: LS.__translate(LS.purposeOfAdmission),
                    dataIndex: 'title',
                    flex: 2,
                    sortable: false,
                    hideable: false
                }, {
                    header: LS.__translate(LS.Color),
                    xtype: 'templatecolumn',
                    tpl: '<div style="width: 15px; height: 15px; margin: auto; border-color: #7f7d7d; border: groove; border-width: thin; background-color: {color}"></div>',
                    width: 200,
                    sortable: false,
                    hideable: false
                }]
            }
            ]
        }, {
            xtype: 'form',
            border: false,
            accessType: false,
            hideSaveBtn: false,
            title: LS.__translate(LS.EndingVisitSetting),
            padding: '10px',
            labelWidth: 200,
            items: [
                {
                    xtype: 'fieldset',
                    title: LS.__translate(LS.SettingsReceptionStatusInTheInvoices),
                    items: [
                        {
                            xtype: 'radiogroup',
                            fieldLabel: LS.__translate(LS.ActionWhenSaving),
                            labelStyle: 'width: 200px;',
                            columns: 1,
                            vertical: true,
                            items: [
                                {
                                    boxLabel: LS.__translate(LS.AutomaticallyMarkAcceptedReception),
                                    name: 'show_admission_status_dlg_on_invoice_save',
                                    inputValue: 0,
                                    style: {
                                        marginLeft: '100px'
                                    }
                                }, {
                                    boxLabel: LS.__translate(LS.AskUser),
                                    name: 'show_admission_status_dlg_on_invoice_save',
                                    inputValue: 1,
                                    style: {
                                        marginLeft: '100px'
                                    }
                                }
                            ]
                        }
                    ]
                }, {
                    xtype: 'fieldset',
                    title: LS.__translate(LS.SettingsStatusOfAdmissionInMedicalRecords),
                    items: [
                        {
                            xtype: 'radiogroup',
                            fieldLabel: LS.__translate(LS.ActionWhenSaving),
                            labelStyle: 'width: 200px;',
                            columns: 1,
                            vertical: true,
                            items: [
                                {
                                    boxLabel: LS.__translate(LS.AutomaticallyMarkAcceptedReception),
                                    name: 'show_admission_status_dlg_on_medcard_save',
                                    inputValue: 0,
                                    style: {
                                        marginLeft: '100px'
                                    }
                                }, {
                                    boxLabel: LS.__translate(LS.AskUser),
                                    name: 'show_admission_status_dlg_on_medcard_save',
                                    inputValue: 1,
                                    style: {
                                        marginLeft: '100px'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    tbar: [
        {
            cls: 'button-save',
            action: 'save',
            tooltip: LS.__translate(LS.Save),
            margins: {top:3, right:0, bottom:2, left:5}
        }
    ]
});