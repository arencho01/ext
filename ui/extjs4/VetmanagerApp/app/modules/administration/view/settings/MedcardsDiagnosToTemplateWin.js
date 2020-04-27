Ext4.define('VetmanagerApp.modules.administration.view.settings.MedcardsDiagnosToTemplateWin', {
    title: LS.__translate(LS.LinkingTreatmentToDiagnosis)
    , extend: 'Ext4.window.Window'
    , xtype: 'addeditdiagnostotemplatewin'
    , width: 500
    , buttonAlign: 'center'
    , modal: true
    , layout: 'fit'
    , initComponent: function() {
        var me = this;

        me.items = me.buildItems();

        me.callParent();

        var form = me.items.get(0).getForm();

        form.findField('template_type').on('change', function(cb, value) {
            var destination = form.findField('destination')
                , templateText = form.findField('template_id_text')
                , meetReason = form.findField('meet_reason_id')
                , templateSpecial = form.findField('template_id_special')
                , templateFoodRecomendation = form.findField('template_id_food_recomendation');

            switch (value) {
                case 'special':
                    destination.setValue('description').disable();
                    templateSpecial.show().enable().reset();
                    templateText.hide().disable().reset();
                    templateFoodRecomendation.hide().disable().reset();
                    meetReason.enable();
                    break;
                case 'text':
                    destination.setValue('description').enable();
                    templateText.show().enable().reset();
                    templateSpecial.hide().disable().reset();
                    templateFoodRecomendation.hide().disable().reset();
                    meetReason.enable();
                    break;

                case 'food_recomendation':
                    destination.setValue('recomendation').disable();
                    templateFoodRecomendation.show().enable().reset();
                    templateSpecial.hide().disable().reset();
                    templateText.hide().disable().reset();
                    meetReason.disable().reset();
                    break;
            }
        });

        if (me.rec) {
            var data = Ext.apply({}, me.rec.data);
            if (data.template_type == 'special') {
                data.template_id_special = data.template_id;
            } else {
                data.template_id_text = data.template_id;
            }
            me.items.get(0).getForm().setValues(data);
        }
    }
    , buildItems: function() {
        var templateTypeArr = [
            {value: 'text', title: LS.__translate(LS.TextTemplate)}
            , {value: 'special', title: LS.__translate(LS.SpecTemplate)}
        ];

        if (_FOOD_SPONSOR_ID == 0) {
            templateTypeArr.push({value: 'food_recomendation', title: LS.__translate(LS.FoodRecomendation)});
        }

        var me = this
            , items = [
            {
                xtype: 'form'
                , border: false
                , defaults: {
                    labelWidth: 150
                    , anchor: '100%'
                    , padding: '5px'
                }
                , items: [
                    {
                        xtype: 'hidden'
                        , name: 'id'
                        , value: 0
                    }, {
                        xtype: 'combo'
                        , fieldLabel: LS.__translate(LS.Diagnosis) + '*'
                        , allowBlank: true
                        , pageSize: 10
                        , editable: true
                        , name: 'diagnos_id'
                        , queryMode: 'remote'
                        , store: 'VetmanagerApp.modules.administration.store.settings.medcards.Diagnoses'
                        , valueField: 'id'
                        , displayField: 'title'
                        , valueNotFoundText: ''
                        , listeners: {
                            scope: this
                            , beforequery: function(qe) {
                                var p = qe.combo.getStore().getProxy();
                                p.setExtraParam('id', null);

                                qe.query = '';
                            }
                        }
                    }, {
                        xtype: 'combo'
                        , fieldLabel: LS.__translate(LS.purposeOfAdmission) + '*'
                        , allowBlank: true
                        , editable: true
                        , name: 'meet_reason_id'
                        , queryMode: 'local'
                        , store: 'VetmanagerApp.modules.administration.store.settings.medcards.MeetReasons'
                        , valueField: 'value'
                        , displayField: 'title'
                        , valueNotFoundText: ''
                    }, {
                        xtype: 'combo'
                        , fieldLabel: LS.__translate(LS.PetType) + '*'
                        , allowBlank: true
                        , editable: false
                        , name: 'pet_type_id'
                        , queryMode: 'remote'
                        , store: 'VetmanagerApp.modules.administration.store.settings.medcards.PetType'
                        , valueField: 'id'
                        , displayField: 'title'
                        , value: 0
                        , valueNotFoundText: ''
                    }, {
                        xtype: 'displayfield'
                        , hideLabel: true
                        , value: LS.__translate(LS.YouCanSelectEitherTheDiagnosisOrThePurposeOfApplicationOrBothParameters)
                    }, {
                        xtype: 'combo'
                        , fieldLabel: LS.__translate(LS.TypeOfTemplate)
                        , allowBlank: false
                        , editable: false
                        , name: 'template_type'
                        , queryMode: 'local'
                        , store: {
                            xtype: 'store'
                            , fields : ['value', 'title']
                            , data: templateTypeArr
                        }
                        , valueField: 'value'
                        , displayField: 'title'
                        , value: 'text'
                    }, {
                        xtype: 'combo'
                        , fieldLabel: LS.__translate(LS.Template) + '*'
                        , allowBlank: false
                        , editable: true
                        , name: 'template_id_text'
                        , queryMode: 'local'
                        , store: 'VetmanagerApp.modules.administration.store.settings.medcards.TextTemplates'
                        , valueField: 'id'
                        , displayField: 'title'
                    }, {
                        xtype: 'combo'
                        , fieldLabel: LS.__translate(LS.Template) + '*'
                        , allowBlank: false
                        , editable: true
                        , name: 'template_id_special'
                        , queryMode: 'local'
                        , store: 'VetmanagerApp.modules.administration.store.settings.medcards.SpecialTemplates'
                        , valueField: 'id'
                        , displayField: 'title'
                        , disabled: true
                        , hidden: true
                    }, {
                        xtype: 'combo'
                        , fieldLabel: LS.__translate(LS.Template) + '*'
                        , allowBlank: false
                        , pageSize: 10
                        , editable: true
                        , name: 'template_id_food_recomendation'
                        , queryMode: 'remote'
                        , store: 'VetmanagerApp.modules.administration.store.settings.medcards.FoodRecomendationTemplates'
                        , valueField: 'id'
                        , displayField: 'title'
                        , disabled: true
                        , hidden: true
                        , listeners: {
                            scope: this
                            , beforequery: function(qe) {
                                var p = qe.combo.getStore().getProxy();
                                p.setExtraParam('id', null);

                                qe.query = '';
                            }
                        }
                    }, {
                        xtype: 'combo'
                        , fieldLabel: LS.__translate(LS.Prescription) + '*'
                        , allowBlank: false
                        , editable: false
                        , name: 'destination'
                        , queryMode: 'local'
                        , store: {
                            xtype: 'store'
                            , fields : ['value', 'title']
                            , data: [
                                {value: 'description', title: LS.__translate(LS.DescriptionOfTreatment)}
                                , {value: 'recomendation', title: LS.__translate(LS.RecommendationsAndPrescriptions)}
                            ]
                        }
                        , valueField: 'value'
                        , displayField: 'title'
                        , value: 'description'
                    }
                ]
            }
        ];

        return items;
    }
    , buttons: [
        {
            text: LS.__translate(LS.Save)
            , action: 'save'
        }, {
            text: LS.__translate(LS.Close)
            , action: 'close'
            , scope: this
            , handler: function(b) {
                if (b.ownerCt.ownerCt.close) {
                    b.ownerCt.ownerCt.close();
                }
            }
        }
    ]
});