Ext4.define('VetmanagerApp.modules.administration.view.settings.StartWizardSteps.Step1', {
    extend: 'Ext.Panel'
    , xtype: 'StartWizardStep1'
    , frame: true
    , border: false
    , cls: ['noborder']
    , padding: '0px'
    , showConfig: {
        step: 0
        , is_first_step: true
        , is_last_step: false
        , width: 480
        , height: 334
        , title: '<center>' + LS.__translate(LS.WelcomeToVetmanager) + '</center>'
        , buttons: ['close', 'forward'] 
        , stepText: LS.__translate(LS.StepNumberFromTotalSteps, 1, 8)
    }
    , items: [
        {
            frame: false
            , height: 160
            , padding: '5px'
            , bodyCls: [
                'vet-window-body'
                , 'noborder'
                , 'border-radius-8'
                , 'border-3d'
            ]
            , html: [
                LS.__translate(LS.ToStartUsingTheSoftwareyouNeedToAdjustItForYourself)
                , '<div style="height: 6px;"></div>'
                , LS.__translate(LS.WeTriedToMakeAQuickAndEasy)
                , LS.__translate(LS.GuidedWizardThatWillAskYouSome)
                , LS.__translate(LS.QuestionsAndImmediatelyConfigureTheSystem)
                , LS.__translate(LS.DependingOnYourAnswers)
            ].join('')
        }
    ]
});

