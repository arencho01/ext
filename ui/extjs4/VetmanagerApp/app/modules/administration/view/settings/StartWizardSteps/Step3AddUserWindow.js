Ext4.define('VetmanagerApp.modules.administration.view.settings.StartWizardSteps.Step3AddUserWindow', {
    extend: 'Ext.window.Window'
    , xtype: 'Step3AddUserWindow'
    , modal: true
    , width: 500
    , title: 'add user'
    , layout: 'fit'
    , frame: true
    , header: false
    , shadow: false
    , resizable: false
    , closable: false
    , cls: ['vet-window', 'border-radius-10']
    , bodyCls: ['vet-window-body', 'noborder', 'border-radius-8']
    , requires: [
        'Ext.tip.*'
    ]
    , items: [
        {
            xtype: 'form'
            , name: 'add_user_form'
            , border: false
            , frame: true
            , cls: ['noborder']
            , defaults: {
                anchor: '100%'
                , labelWidth: 110
            }
            , items: [
                {
                    xtype: 'textfield'
                    , fieldLabel: LS.__translate(LS.LastName)
                    , name: 'last_name'
                    , allowBlank: false
                }, {
                    xtype: 'textfield'
                    , fieldLabel: LS.__translate(LS.Name)
                    , name: 'first_name'
                    , allowBlank: false
                }, {
                    xtype: 'textfield'
                    , fieldLabel: LS.__translate(LS.Login)
                    , name: 'login'
                    , minLength: 4
                    , regex: /^[-_A-Za-z0-9]{4,}$/i
                    , invalidText: LS.__translate(LS.LoginMustBeEnteredInLatinCharacters)
                    , minLengthText: LS.__translate(LS.LoginMustHaveMoreThanCharacters)
                    , allowBlank: false
                }, {
                    xtype: 'textfield'
                    , fieldLabel: LS.__translate(LS.Password)
                    , value: '123456'
                    , name: 'passwd'
                    , allowBlank: false
                }, {
                    xtype: 'combobox'
                    , fieldLabel: LS.__translate(LS.Position)
                    , name: 'position_id'
                    , allowBlank: false
                    , valueField: 'id'
                    , displayField: 'name'
                    , triggerAction: 'all'
                    , store: {
                        xtype: 'store'
                        , fields: ['id', 'name', 'is_admin']
                        , autoLoad: false
                        , proxy: {
                            type: 'ajax'
                            , url: 'ajax_access.php'
                            , extraParams: {
                                cmd: 'get_professions'
                            }
                            , reader: {
                                type: 'json'
                                , root: 'data'
                            }
                        }
                    }
                }, {
                    xtype: 'combobox'
                    , fieldLabel: LS.__translate(LS.Role)
                    , name: 'role_id'
                    , allowBlank: false
                    , valueField: 'id'
                    , displayField: 'name'
                    , triggerAction: 'all'
                    , store: {
                        xtype: 'store'
                        , fields: ['id', 'name', 'is_admin']
                        , autoLoad: false
                        , proxy: {
                            type: 'ajax'
                            , url: 'ajax_access.php'
                            , extraParams: {
                                cmd: 'get_roles'
                            }
                            , reader: {
                                type: 'json'
                                , root: 'data'
                            }
                        }
                    }
                }, {
                    xtype: 'checkbox'
                    , labelWidth: 320
                    , width: 350
                    , fieldLabel: '<div style="float:left;">'+LS.__translate(LS.ReceiveMoneyByAllCashRegisters)+'</div><div id="step3-qtip1" class="question-icon"></div>'
                    , checked: true
                    , name: 'any_cassa_payment'
                }, {
                    xtype: 'checkbox'
                    , labelWidth: 320
                    , width: 350
                    , fieldLabel: '<div style="float:left;">'+LS.__translate(LS.ProvisionOfServicesOrSaleOfMedicines)+'</div><div id="step3-qtip2" class="question-icon"></div>'
                    , checked: true
                    , name: 'calc_percents'
                }, {
                    xtype: 'panel'
                    , height: 50
                    , width: '100%'
                    , frame: true
                    , cls: [
                        'noborder'
                        , 'wizard-buttons-panel'
                    ]
                    , buttonAlign: 'center'
                    , buttons: [
                        {
                            xtype: 'button'
                            , action: 'add'
                            , text: LS.__translate(LS.Add)
                        }, {
                            xtype: 'button'
                            , action: 'close'
                            , text: LS.__translate(LS.Cancel)
                        }
                    ]
                }
            ]
        }
    ]
});

