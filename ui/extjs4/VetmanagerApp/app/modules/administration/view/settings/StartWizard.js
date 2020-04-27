Ext4.define('VetmanagerApp.modules.administration.view.settings.StartWizard', {
    extend: 'Ext4.window.Window'
    , xtype: 'startwizard'
    , width: 480
    , height: 334
    , frame: true
    , header: false
    , shadow: false
    , resizable: false
    , closable: false
    , modal: false
    , cls: ['vet-window', 'border-radius-10']
    , bodyCls: ['vet-window-body', 'noborder', 'border-radius-8']
    , layout: {
        type: 'vbox'
        , align: 'center'
        , pack: 'start'
    }
    , items: [
        {
            xtype: 'panel'
            , height: 40
            , width: '100%'
            , frame: true
            , border: false
            , padding: '0 0 17 0'
            , cls: ['noborder']
            , bodyCls: ['noborder', 'vet-logo-text']
        }, {
            xtype: 'panel'
            , frame: true
            , name: 'wizard-step-title'
            , border: false
            , cls: ['noborder']
            , height: 28
            , width: '100%'
        }, {
            xtype: 'menuseparator'
            , height: 2
            , width: '100%'
            , cls: ['wizard-button-separator']
        }, {
            xtype: 'panel'
            , flex: 1
            , width: '100%'
            , name: 'wizard-steps-panel'
            , frame: true
            , border: false
            , cls: ['noborder']
            , padding: '0px'
            , layout: 'card'
            , items: [
                {
                    xtype: 'StartWizardStep1'
                }, {
                    xtype: 'StartWizardStep2'
                }, {
                    xtype: 'StartWizardStep3'
                }, {
                    xtype: 'StartWizardStep4'
                }, {
                    xtype: 'StartWizardStep5'
                }, {
                    xtype: 'StartWizardStep6'
                }, {
                    xtype: 'StartWizardStep7'
                }, {
                    xtype: 'StartWizardStep9'
                }
            ]
        }, {
            xtype: 'menuseparator'
            , height: 2
            , width: '100%'
            , cls: ['wizard-button-separator']
        }, {
            xtype: 'panel'
            , width: '100%'
            , height: 41
            , padding: '0px'
            , border: false
            , frame: false
            , cls: [
                'noborder'
                , 'wizard-buttons-panel'
            ]
            , layout: {
                type: 'hbox'
                , align: 'center'
                , pack: 'start'
            }
            , items: [
                {
                    xtype: 'panel'
                    , id: 'navigation-panel-steps'
                    , width: 100
                    , height: 41
                    , padding: '13px 0 0 0'
                    , html: ''
                    , frame: true
                    , border: false
                    , cls: [
                        'noborder'
                        , 'noradius'
                    ]
                }, {
                    xtype: 'panel'
                    , height: 41
                    , flex: 1
                    , name: 'navigation-panel'
                    , frame: true
                    , border: false
                    , cls: [
                        'noborder'
                        , 'noradius'
                    ]
                    , buttonAlign: 'center'
                    , buttons: [
                        {
                            xtype: 'button'
                            , action: 'close'
                            , text: LS.__translate(LS.Close)
                        }, {
                            xtype: 'button'
                            , action: 'skip'
                            , text: LS.__translate(LS.Skip)
                        }, {
                            xtype: 'button'
                            , action: 'back'
                            , text: LS.__translate(LS.Back)
                        }, {
                            xtype: 'button'
                            , action: 'forward'
                            , text: LS.__translate(LS.Next)
                        }, {
                            xtype: 'button'
                            , action: 'done'
                            , text: LS.__translate(LS.Done)
                        }
                    ]
                }, {
                    xtype: 'panel'
                    , width: 80
                    , height: 41
                    , frame: true
                    , border: false
                    , cls: [
                        'noborder'
                        , 'noradius'
                    ]
                }
            ]
        }
    ]
});