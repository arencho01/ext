Ext4.define('VetmanagerApp.modules.administration.view.settings.Medcards', {
    extend: 'Ext4.tab.Panel',
    xtype: 'medcardmanagement',
    border: false,
    region: 'center',
    title: false,
    scope: this,
    buttonAlign: 'center',
    activeTab: 0,
    requires: [
        'Ext4.ux.form.ItemSelector',
        'Ext4.ux.VerticalTabs',
        'Ext4.ux.form.ItemSelector'
    ],
    items: [
        {
            xtype: 'panel',
            border: false,
            title: LS.__translate(LS.GeneralSettings),
            accessType: false,
            padding: 10,
            name: 'general_settings',
            items: [
                {
                    xtype: 'fieldset',
                    padding: 10,
                    title: LS.__translate(LS.BlockEditingMedicalCards),
                    border: true,
                    items: [{
                        xtype: 'combobox',
                        fieldLabel: LS.__translate(LS.BlockThrough),
                        value: '262980', // по умолчанию пол года (в минутах)
                        editable: false,
                        name: 'lock_medcard_edit_time',
                        queryMode: 'local',
                        displayField: 'title',
                        valueField: 'id',
                        labelWidth: 150,
                        store: {
                            fields: ['id', 'title'],
                            data : [
                                {"title":LS.__translate(LS.Minutes10), "id":"10"},
                                {"title":LS.__translate(LS.Minutes30), "id":"30"},
                                {"title":LS.__translate(LS.Hour1), "id":"60"},
                                {"title":LS.__translate(LS.Hour2), "id":"120"},
                                {"title":LS.__translate(LS.Hour6), "id":"360"},
                                {"title":LS.__translate(LS.Hour12), "id":"720"},
                                {"title":LS.__translate(LS.Day1), "id":"1440"},
                                {"title":LS.__translate(LS.Day3), "id":"4320"},
                                {"title":LS.__translate(LS.Week), "id":"10080"},
                                {"title":LS.__translate(LS.Month1), "id":"43200"},
                                {"title":LS.__translate(LS.Month6), "id":"262980"}
                            ]
                        }
                    }]
                }, {
                    xtype: 'fieldset',
                    padding: 10,
                    title: LS.__translate(LS.SettingRequiredFieldsInTheMedicalCard),
                    border: true,
                    items: [
                        {
                            xtype: 'checkbox',
                            fieldLabel: LS.__translate(LS.Diagnosis),
                            labelWidth: 170,
                            boxLabel: LS.__translate(LS.BeSureToFillOutDiagnosisWhenCreatingMedicalCard),
                            name: 'med_diagnos_required',
                            checked: false
                        }, {
                            xtype: 'checkbox',
                            fieldLabel: LS.__translate(LS.ResultOfVisit),
                            labelWidth: 170,
                            boxLabel: LS.__translate(LS.BeSureToFillInResultOfVisitWhenCreatingMedicalCard),
                            name: 'med_meet_result_required',
                            checked: false
                        }
                    ]
                }
            ]
        }
        ,{
            xtype: 'form',
            border: false,
            title: LS.__translate(LS.LinkingTreatmentToDiagnosis),
            accessType: false,
            hideSaveBtn: true,
            layout: 'fit',
            name: 'diagnos_settings',
            items: [{
                xtype: 'grid',
                flex: 1,
                name: 'diagnos_to_template_grid',
                initComponent: function() {
                    Ext.grid.Panel.prototype.initComponent.apply(this, arguments);
                    var paging = this.getDockedComponent('pagingtoolbar');
                    if (paging) {
                        paging.bindStore(this.getStore());
                    }
                },
                tbar: [
                    {
                        cls: 'button-add',
                        action: 'add'
                    }, {
                        cls: 'button-edit',
                        action: 'edit'
                    }, {
                        cls: 'button-del',
                        action: 'delete'
                    }
                ],
                store: {
                    xtype: 'store',
                    fields: [
                        'id',
                        'diagnos_id',
                        'diagnos_name',
                        'meet_reason_id',
                        'meet_reason_name',
                        'template_id',
                        'template_name',
                        'template_type',
                        'destination',
                        'pet_type',
                        'pet_type_id'
                    ],
                    autoLoad: true,
                    proxy: {
                        type: 'ajax',
                        url: 'ajax_medicalcards.php',
                        extraParams: {
                            cmd: 'get_diagnoses_to_template',
                            start: 0,
                            limit: 25,
                            status: 'active'
                        },
                        reader: {
                            type: 'json',
                            root: 'data'
                        }
                    }
                },
                columns: [{
                    header: LS.__translate(LS.Diagnosis),
                    dataIndex: 'diagnos_name',
                    sortable: false,
                    hideable: false,
                    flex: 1
                }, {
                    header: LS.__translate(LS.purposeOfAdmission),
                    dataIndex: 'meet_reason_name',
                    sortable: false,
                    hideable: false,
                    flex: 1
                }, {
                    header: LS.__translate(LS.Template),
                    dataIndex: 'template_name',
                    sortable: false,
                    hideable: false,
                    flex: 1
                }, {
                    header: LS.__translate(LS.TemplateType),
                    dataIndex: 'template_type',
                    sortable: false,
                    hideable: false,
                    flex: 1,
                    renderer: function(v) {
                        var res = LS.__translate(LS.TextTemplate);

                        if (v == 'special') {
                            res = LS.__translate(LS.SpecTemplate);
                        } else if (v == 'food_recomendation') {
                            res = LS.__translate(LS.FoodRecomendation);
                        }

                        return res;
                    }
                }, {
                    header: LS.__translate(LS.Prescription),
                    dataIndex: 'destination',
                    sortable: false,
                    hideable: false,
                    flex: 1,
                    renderer: function(v) {
                        return v == 'description' ? LS.__translate(LS.Treatment) : LS.__translate(LS.Recommendations);
                    }
                }, {
                    header: 'Тип питомца',
                    dataIndex: 'pet_type',
                    sortable: false,
                    hideable: false,
                    flex: 1,
                    renderer: function(v) {
                        return v == '0' ? LS.__translate(LS.InTotal) : v;
                    }
                }],
                bbar: {
                    xtype: 'pagingtoolbar',
                    displayInfo: true,
                    itemId: 'pagingtoolbar',
                    displayMsg: LS.__translate(LS.EntriesFromSToSAreShownTotalOfS),
                    emptyMsg: LS.__translate(LS.NoEntriesToShow)
                }
            }]
        }
    ],
    tbar: [
        {
            cls: 'button-save',
            action: 'save',
            tooltip: LS.__translate(LS.Save),
            margins: {top:3, right:0, bottom:2, left:5}
        }
    ]
});