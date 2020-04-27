Ext4.define('VetmanagerApp.modules.administration.view.settings.StartWizardSteps.Step5', {
    extend: 'Ext.Panel'
    , xtype: 'StartWizardStep5'
    , frame: true
    , border: false
    , cls: ['noborder']
    , padding: '5px'
    , showConfig: {
        step: 4
        , is_first_step: false
        , is_last_step: false
        , width: 540
        , height: 500
        , title: '<center><b>'+LS.__translate(LS.RegistersAdjustment)+'</b></center>'
        , buttons: ['back', 'skip', 'forward'] 
        , stepText: LS.__translate(LS.StepNumberFromTotalSteps, 5, 8)
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
                LS.__translate(LS.EditTheVisitTypeRegisterusedInMedicalCardsForTheNeedsOfTheClinic)+'<br/>'
                , LS.__translate(LS.TypesCanBeAddedAnd)+' '
                , '<span class="wizard-wiki-text">'
                , '<a href="https://vetmanager.ru/knowledgebase/redaktirovanie-dannyh-v-spravochnika" target="blank" style="text-decoration:none;">'+LS.__translate(LS.LaterWiki)+'</a>'
                , '</span>.'
				, ' ' + LS.__translate(LS.ToSaveTypeRegisterusedPressNext)
            ].join('')
        }, {
            xtype: 'grid'
            , name: 'admission_type_grid'
            , height: 210
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
                { text: LS.__translate(LS.VisitTypeName), dataIndex: 'title', flex: 1 }
            ]
            , store: {
                xtype: 'store'
                , fields: [
                    'id'
                    , 'title'
                ]
                , autoLoad: false
                , proxy: {
                    type: 'ajax'
                    , url: 'ajax_wizard.php'
                    , extraParams: {
                        cmd: 'get_admission_types'
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

