Ext4.define('VetmanagerApp.modules.administration.view.settings.StartWizardSteps.Step7', {
    extend: 'Ext.Panel',
    xtype: 'StartWizardStep7',
    frame: true,
    border: false,
    cls: ['noborder'],
    padding: '5px',
    showConfig: {
        step: 6,
        is_first_step: false,
        is_last_step: false,
        width: 670,
        height: 580,
        title: '<center><b>'+LS.__translate(LS.CashRegisterAdjustment)+'</b></center>',
        buttons: ['back', 'skip', 'forward'] ,
        stepText: LS.__translate(LS.StepNumberFromTotalSteps, 7, 8)
    },
    items: [
        {
            xtype: 'panel',
            frame: false,
            padding: '5px',
            style: {
                marginBottom: '5px'
            },
            bodyCls: [
                'vet-window-body',
                'noborder',
                'border-radius-8',
                'border-3d'
            ],
            html: [
                LS.__translate(LS.CahRegisterInVetmanagerIsAPlaceForStoringMoneyThatHasItsOwnResponsiblePerson)+' '
                +LS.__translate(LS.DependingOnTheSettingsYouCanClearInvoicesUsingTheCashRegisteritMayBeCommonToAGroupOfEmployees)+' '
                +LS.__translate(LS.IfYouHaveSeveralPersonsResponsibleForFundsOrSeveralCashAcceptanceOutletsPleaseAddThem)+' '
                + LS.__translate(LS.WithoutTheseSettingsYouWillNotBeAbleToFullyUseTheInvoiceModuleAndTheCashRegisterModule)
            ].join('')
        }, {
            xtype: 'fieldset',
            border: false,
            padding: '5px 0px',
            defaults: {
                anchor: '100%',
                labelWidth: 170
            },
            items: [{
                xtype: 'combo',
                fieldLabel: LS.__translate(LS.SelectCurrency),
                editable: false,
                queryMode: 'local',
                displayField: 'title',
                valueField: 'value',
                name: 'currency-short',
                value: 'rub',
                store: {
                    xtype: 'store',
                    fields: ['value', 'title'],
                    data: [
                        {value: 'rub', title: 'Рубли'},
                        {value: 'uah', title: 'Гривны'},
                        {value: 'byr', title: 'Белорусский рубль'}
                    ]
                }
            }]
        }, {
            xtype: 'grid',
            name: 'cassa_grid',
            height: 180,
            tbar: [
                {
                    xtype: 'button',
                    icon: 'ui/resources/images_new/add.svg',
                    action: 'add'
                }, {
                    xtype: 'button',
                    icon: 'ui/resources/images_new/delete.svg',
                    disabled: true,
                    action: 'delete'
                }
            ],
            columns: [
                { text: LS.__translate(LS.Namez), dataIndex: 'title', flex: 1 },
                { text: LS.__translate(LS.Responsible), dataIndex: 'assigned_user_name', flex: 1 },
                { text: LS.__translate(LS.InvoicePayment), dataIndex: 'client_cass', flex: 1,
                    renderer: function(v) {
                        return (v == 1) ? LS.__translate(LS.Yes) : LS.__translate(LS.No);
                    }
                },
                { text: LS.__translate(LS.MainCashDesk), dataIndex: 'main_cassa', flex: 1,
                    renderer: function(v) {
                        return (v == 1) ? LS.__translate(LS.Yes) : LS.__translate(LS.No);
                    }
                }
            ],
            store: {
                xtype: 'store',
                fields: [
                    'id',
                    'assigned_user_id',
                    'assigned_user_name',
                    'title',
                    'client_cass',
                    'main_cassa',
                    'is_system'
                ],
                autoLoad: false,
                proxy: {
                    type: 'ajax',
                    url: 'ajax_cassa.php',
                    extraParams: {
                        cmd: 'get_grid',
                        type_grid: 'allCassa',
                        start: 0,
                        limit: 9999,
                        all_cassas: 1
                    },
                    reader: {
                        type: 'json',
                        root: 'data'
                    }
                }
            }
        }
    ]
});

