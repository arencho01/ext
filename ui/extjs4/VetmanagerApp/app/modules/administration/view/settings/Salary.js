Ext4.define('VetmanagerApp.modules.administration.view.settings.Salary', {
    extend: 'Ext4.tab.Panel',
    xtype: 'salarysettings',
    border: false,
    region: 'center',
    title: false,
    scope: this,
    layout: 'border',
    requires: [
        'Ext4.ux.CheckColumn'
    ],

    tbar: [
        {
            cls: 'button-save',
            action: 'save_salary',
            tooltip: LS.__translate(LS.Save),
            margins: {top: 3, right: 0, bottom: 2, left: 5}
        }
    ],
    items: [
        {
            xtype: 'form',
            border: false,
            title: LS.__translate(LS.Salary),
            region: 'center',
            scope: this,
            layout: 'border',
            requires: [
                'Ext4.ux.CheckColumn'
            ],

            items: [
                {
                    xtype: 'grid',
                    name: 'users_grid',
                    border: true,
                    region: 'west',
                    width: 275,
                    title: LS.__translate(LS.Users),
                    tbar: [
                        {
                            text: LS.__translate(LS.ShowAllUsers),
                            action: 'show_all_users',
                            height: 32,
                            enableToggle: true
                        }
                    ],
                    forceFit: true,
                    viewConfig: {
                        scrollOffset: 0,
                        getRowClass: function(row) {
                            if (row.get('is_active')*1 == 0) {
                                return 'not-activated-user';
                            }
                        }
                    },
                    store: 'VetmanagerApp.modules.administration.store.settings.salary.Users',
                    columns: [
                        { header: '№', dataIndex: 'id', width: 35, sortable: false, hideable: false },
                        { header: LS.__translate(LS.FullName), dataIndex: 'title', width: 120, sortable: false, hideable: false},
                        { header: LS.__translate(LS.Role), dataIndex: 'role_name', width: 80, sortable: false, hideable: false}
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            store: 'VetmanagerApp.modules.administration.store.settings.salary.Users',
                            dock: 'bottom',
                            displayInfo: false
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    border: true,
                    activeItem: 0,
                    region: 'center',
                    items: [
                        {
                            title: LS.__translate(LS.GeneralSettings),
                            xtype: 'form',
                            border: false,
                            padding: 10,
                            disabled: true,
                            name: 'settings_form',
                            defaults: {
                                anchor: '100%',
                                labelWidth: 300,
                                defaults: {
                                    anchor: '100%',
                                    labelWidth: 350
                                }
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: LS.__translate(LS.CalculationOfSalaries),
                                    items: [
                                        {
                                            xtype: 'checkbox',
                                            hideLabel: true,
                                            boxLabel: LS.__translate(LS.DeductDiscountWhenCalculatingTheSalary) + '&nbsp;&nbsp;('+LS.__translate(LS.DiscountAmountWillBeDeductedFromYourSalary) + ')',
                                            name: 'accept_discount'
                                        },
                                        {
                                            xtype: 'checkbox',
                                            hideLabel: true,
                                            boxLabel: LS.__translate(LS.NightPayOnlyOnBonuses) + '&nbsp;&nbsp;('+LS.__translate(LS.OnlySurchargeAmountIsInvolvedInTheCalculationOfTheSalary) + ')',
                                            name: 'night_from_increase'
                                        },
                                        {
                                            xtype: 'fieldcontainer',
                                            hideLabel: true,
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'checkbox',
                                                    boxLabel: LS.__translate(LS.GetsTheTotalPercentageOfRevenueClinic),
                                                    hideLabel: true,
                                                    name: 'total_clinic'
                                                },
                                                {
                                                    xtype: 'splitter'
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    hideLabel: true,
                                                    width: 75,
                                                    name: 'total_clinic_percent',
                                                    value: 0,
                                                    minValue: 0
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    value: '<span style="font-size: 16px;">%</span>'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: LS.__translate(LS.Timesheet),
                                    labelWidth: 400,
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: LS.__translate(LS.TheRatePerHour) + ' (' + GlobalProperties.get('currency-short', LS.__translate(LS.Rub)) + ')',
                                            name: 'rate_hour',
                                            value: 0,
                                            minValue: 0
                                        },
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: LS.__translate(LS.TheRateOfChange) + ' (' + GlobalProperties.get('currency-short', LS.__translate(LS.Rub)) + ')',
                                            name: 'rate_smena',
                                            value: 0,
                                            minValue: 0
                                        },
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: LS.__translate(LS.ExtraChargeForNightShift) + ' (' + GlobalProperties.get('currency-short', LS.__translate(LS.Rub)) + ')',
                                            name: 'night_increase',
                                            value: 200
                                        },
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: LS.__translate(LS.OfInvoicesOfTheShiftSupervisorAssistant),
                                            name: 'smena_percent',
                                            value: 0,
                                            minValue: 0,
                                            maxValue: 100,
                                            allowDecimals: false
                                        }
                                    ]
                                }
                                ,{
                                    xtype: 'checkbox',
                                    boxLabel: LS.__translate(LS.ForAllClinics),
                                    hideLabel: true,
                                    name: 'all_clinics'
                                }
                            ]
                        },
                        {
                            xtype: 'grid',
                            title: LS.__translate(LS.PercentOnATypeOfGoods),
                            name: 'access_by_users_grid',
                            flex: 1,
                            store: 'VetmanagerApp.modules.administration.store.settings.salary.UserPercents',
                            border: false,
                            disabled: true,
                            columns: [
                                {header: LS.__translate(LS.Group), dataIndex: 'title', sortable: true, hideable: false, flex: 1},
                                {
                                    header: LS.__translate(LS.Usual),
                                    dataIndex: 'regular_percent',
                                    sortable: true,
                                    hideable: false,
                                    flex: 1,
                                    editor: {xtype: 'numberfield', hideTrigger: true}
                                },
                                {
                                    header: LS.__translate(LS.Call),
                                    dataIndex: 'call_percent',
                                    sortable: true,
                                    hideable: false,
                                    flex: 1,
                                    editor: {xtype: 'numberfield', hideTrigger: true}
                                },
                                {
                                    header: LS.__translate(LS.Night),
                                    dataIndex: 'night_percent',
                                    sortable: true,
                                    hideable: false,
                                    flex: 1,
                                    editor: {xtype: 'numberfield', hideTrigger: true}
                                },
                                {
                                    header: LS.__translate(LS.NightCall),
                                    dataIndex: 'night_call_percent',
                                    sortable: true,
                                    hideable: false,
                                    flex: 1,
                                    editor: {xtype: 'numberfield', hideTrigger: true}
                                },
                                {
                                    xtype: 'checkcolumn',
                                    header: 'x2 '+ LS.__translate(LS.Weekend),
                                    dataIndex: 'is_double',
                                    sortable: true,
                                    hideable: false,
                                    flex: 1
                                },
                                {
                                    header: LS.__translate(LS.Condition),
                                    dataIndex: 'condition_doubling',
                                    sortable: true,
                                    hideable: false,
                                    flex: 1,
                                    editor: 'textfield'
                                }
                            ],
                            plugins: [
                                {
                                    ptype: 'cellediting',
                                    clicksToEdit: 1
                                }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    store: 'VetmanagerApp.modules.administration.store.settings.salary.UserPercents',
                                    dock: 'bottom',
                                    displayInfo: false
                                }
                            ]
                        }
                    ]
                }
            ]
        },
    ]
});