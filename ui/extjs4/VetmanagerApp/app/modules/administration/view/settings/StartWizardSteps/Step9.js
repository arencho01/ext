Ext4.define('VetmanagerApp.modules.administration.view.settings.StartWizardSteps.Step9', {
    extend: 'Ext.Panel'
    , xtype: 'StartWizardStep9'
    , frame: true
    , border: false
    , cls: ['noborder']
    , padding: '0px'
    , showConfig: {
        step: 7
        , is_first_step: false
        , is_last_step: true
        , width: 490
        , height: 314
        , title: '<center><b>'+LS.__translate(LS.ThankYouForChoosingVetmanager)+'</b></center>'
        , buttons: ['back', 'done']
        , stepText: LS.__translate(LS.StepNumberFromTotalSteps, 8, 8)
    }
    , items: [
        {
            frame: false
            , padding: '5px'
            , bodyCls: [
                'vet-window-body'
                , 'noborder'
                , 'border-radius-8'
                , 'border-3d'
            ]
            , html: [
                LS.__translate(LS.TheInstallationIsCompleteYouNowHaveTheOpportunityToWorkWithCustomersAndFinances)+'<br/>'
                , LS.__translate(LS.ToConfigureAdvancedFeaturesOfTheProgramPleaseContactWith)+' '
                , '<span class="wizard-wiki-text">'
                    , '<a href="https://vetmanager.ru/wiki" target="blank" style="text-decoration:none;">'+LS.__translate(LS.DocumentationWiki)+'</a>'
                , '</span> '+LS.__translate(LS.OrIn)+'<br/>'
                , '<span class="wizard-wiki-text">'
                    , '<a href="http://www.vetmanager.ru/site/contact" target="blank" style="text-decoration:none;">'+LS.__translate(LS.CustomerSupport)+'</a>'
                , '</span>.'
            ].join('')
        }
    ]
});

