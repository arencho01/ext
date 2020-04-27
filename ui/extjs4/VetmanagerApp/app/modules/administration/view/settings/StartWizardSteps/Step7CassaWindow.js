Ext4.define('VetmanagerApp.modules.administration.view.settings.StartWizardSteps.Step7CassaWindow', {
    extend: 'Ext.window.Window'
    , xtype: 'Step7CassaWindow'
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
    , items: [
        {
            xtype: 'form'
            , name: 'add_cassa_form'
            , border: false
            , frame: true
            , cls: ['noborder']
            , defaults: {
                anchor: '100%'
                , labelWidth: 130
            }
            , items: [
                {
                    xtype: 'textfield'
                    , fieldLabel: LS.__translate(LS.Namez)
                    , name: 'title'
                    , allowBlank: false
                }, {
                    xtype: 'combobox'
                    , fieldLabel: LS.__translate(LS.Responsible)
                    , name: 'assigned_user_id'
                    , allowBlank: false
                    , valueField: 'id'
                    , displayField: 'name'
                    , triggerAction: 'all'
                    , store: {
                        xtype: 'store'
                        , fields: ['id', 'name']
                        , autoLoad: false
                        , proxy: {
                            type: 'ajax'
                            , url: 'ajax_wizard.php'
                            , extraParams: {
                                cmd: 'get_cassa_users'
                                , start: 0
                                , limit: 9999
                            }
                            , reader: {
                                type: 'json'
                                , root: 'data'
                            }
                        }
                    }
                }, {
                    xtype: 'checkbox'
                    , labelWidth: 270
                    , width: 300
                    , fieldLabel: LS.__translate(LS.PaymentFromInvoices)
                    , checked: true
                    , name: 'client_cass'
                }, {
                    xtype: 'checkbox'
                    , labelWidth: 270
                    , width: 300
                    , fieldLabel: LS.__translate(LS.MainCashDesk)
                    , checked: true
                    , name: 'main_cassa'
                }
                , {
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

