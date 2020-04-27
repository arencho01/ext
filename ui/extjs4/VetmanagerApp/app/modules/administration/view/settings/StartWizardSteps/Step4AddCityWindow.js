Ext4.define('VetmanagerApp.modules.administration.view.settings.StartWizardSteps.Step4AddCityWindow', {
    extend: 'Ext.window.Window'
    , xtype: 'Step4AddCityWindow'
    , modal: true
    , width: 450
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
            , name: 'add_city_form'
            , border: false
            , frame: true
            , cls: ['noborder']
            , defaults: {
                anchor: '100%'
                , labelWidth: 100
            }
            , items: [
                {
                    xtype: 'textfield'
                    , fieldLabel: LS.__translate(LS.Namez)
                    , name: 'title'
                    , allowBlank: false
                }, {
                    xtype: 'checkboxfield'
                    , fieldLabel: LS.__translate(LS.CityByDefault)
                    , name: 'is_default'
                    , labelStyle: 'width: 180px;'
                    , labelWidth: 180
                    , checked: false
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

