Ext4.define('VetmanagerApp.modules.administration.view.settings.StartWizardSteps.Step4', {
    extend: 'Ext.Panel'
    , xtype: 'StartWizardStep4'
    , frame: true
    , border: false
    , cls: ['noborder']
    , padding: '5px'
    , showConfig: {
        step: 3
        , is_first_step: false
        , is_last_step: false
        , width: 540
        , height: 500
        , title: '<center><b>'+LS.__translate(LS.RegistersAdjustment)+'</b></center>'
        , buttons: ['back', 'skip', 'forward'] 
        , stepText: LS.__translate(LS.StepNumberFromTotalSteps, 4, 8)
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
                LS.__translate(LS.EnterPossiblePlacesOfResidenceofYourClients)+' '
                    +LS.__translate(LS.ThisInformationCanBeedited) + ' ' 
                , '<span class="wizard-wiki-text">'
                , '<a href="https://vetmanager.ru/knowledgebase/redaktirovanie-dannyh-v-spravochnika" target="blank" style="text-decoration:none;">'+LS.__translate(LS.LaterWiki)+'</a>'
                , '</span>.'
				, ' ' + LS.__translate(LS.ToSaveCitiesPressNext)
            ].join('')
        }, {
            xtype: 'grid'
            , name: 'city_grid'
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
                { text: LS.__translate(LS.LocalityName), dataIndex: 'title', flex: 1 }
                , {
                    text: LS.__translate(LS.CityByDefault)
                    , dataIndex: 'is_default'
                    , flex: 1
                    , renderer: function(v) {
                        return (v*1 == 1) ? LS.__translate(LS.Yes) : LS.__translate(LS.No);
                    }
                }
            ]
            , store: {
                xtype: 'store'
                , fields: [
                    'id'
                    , 'title'
                    , 'is_default'
                ]
                , autoLoad: false
                , proxy: {
                    type: 'ajax'
                    , url: 'ajax_city.php'
                    , extraParams: {
                        cmd: 'get_cityes'
                        , start: 0
                        , limit: 9999
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

