Ext4.define('VetmanagerApp.modules.administration.view.settings.StartWizardSteps.Step3', {
    extend: 'Ext.Panel'
    , xtype: 'StartWizardStep3'
    , frame: true
    , border: false
    , cls: ['noborder']
    , padding: '5px'
    , showConfig: {
        step: 2
        , is_first_step: false
        , is_last_step: false
        , width: 850
        , height: 490
        , title: '<center><b>'+LS.__translate(LS.SystemUsersAdjustment)+'</b></center>'
        , buttons: ['back', 'skip', 'forward'] 
        , stepText: LS.__translate(LS.StepNumberFromTotalSteps, 3, 8)
    }
    , items: [
        {
            xtype: 'panel'
            , frame: false
            , padding: '5px'
            , style: {
                marginBottom: '5px'
            }
            , bodyCls: [
                'vet-window-body'
                , 'noborder'
                , 'border-radius-8'
                , 'border-3d'
            ]
            , html: [
                LS.__translate(LS.IfTheSoftwareInYourClinicIsUsedByPersonPleaseSkipThisStep)
                , LS.__translate(LS.YouCanAddUsersAfterStartingTheSoftwareInTheAdministrationModule)
				, LS.__translate( ' ' + LS.ToSaveUsersPressNext)
            ].join('')
        }, {
            xtype: 'grid'
            , name: 'users_grid'
            , height: 220
            , tbar: [
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
            ]
            , columns: [
                { text: LS.__translate(LS.FullName), dataIndex: 'fio', flex: 2 }
                , {
                    text: LS.__translate(LS.ReceiveMoneyByAllCashRegisters)
                    , dataIndex: 'any_cassa_payment'
                    , flex: 2
                    , renderer: function(v) {
                        return (v == 1) ? LS.__translate(LS.Yes) : LS.__translate(LS.No);
                    }
                }
                , {
                    text: LS.__translate(LS.ProvisionOfServicesOrSaleOfMedicines)
                    , dataIndex: 'calc_percents'
                    , flex: 2
                    , renderer: function(v) {
                        return (v == 1) ? LS.__translate(LS.Yes) : LS.__translate(LS.No);
                    }
                }
                , { text: LS.__translate(LS.Role), dataIndex: 'role' }
            ]
            , store: {
                xtype: 'store'
                , fields: [
                    'id'
                    , 'fio'
                    , 'any_cassa_payment'
                    , 'calc_percents'
                    , 'role'
                    , 'last_name'
                    , 'first_name'
                    , 'login'
                    , 'passwd'
                    , 'position_id'
                    , 'role_id'
                ]
                , autoLoad: false
                , proxy: {
                    type: 'ajax'
                    , url: 'ajax_wizard.php'
                    , extraParams: {
                        cmd: 'get_users'
                    }
                    , reader: {
                        type: 'json'
                        , root: 'data'
                    }
                }
            }
        }
    ]
});

