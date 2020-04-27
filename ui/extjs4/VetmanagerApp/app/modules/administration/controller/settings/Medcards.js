Ext4.define('VetmanagerApp.modules.administration.controller.settings.Medcards', {
    extend: 'Ext4.app.Controller'
    , views: [
        'VetmanagerApp.modules.administration.view.settings.Medcards'
        , 'VetmanagerApp.modules.administration.view.settings.MedcardsDiagnosToTemplateWin'
    ]
    , stores: [
        'VetmanagerApp.modules.administration.store.settings.medcards.Diagnoses'
        , 'VetmanagerApp.modules.administration.store.settings.medcards.TextTemplates'
        , 'VetmanagerApp.modules.administration.store.settings.medcards.SpecialTemplates'
        , 'VetmanagerApp.modules.administration.store.settings.medcards.FoodRecomendationTemplates'
        , 'VetmanagerApp.modules.administration.store.settings.medcards.MeetReasons'
        , 'VetmanagerApp.modules.administration.store.settings.medcards.PetType'
    ]
    , refs: [
        {
            ref: 'mainPanel'
            , selector: 'medcardmanagement'
            , autoCreate: true
            , xtype: 'medcardmanagement'
        }
        , {
            ref: 'diagnosToTemplateGrid'
            , selector: 'medcardmanagement grid[name="diagnos_to_template_grid"]'
        }
        , {
            ref: 'diagnosToTemplateWindow'
            , selector: 'addeditdiagnostotemplatewin'
        }, {
            ref: 'generalSettings'
            , selector: 'medcardmanagement panel[name="general_settings"]'
        }
    ]
    , init: function() {
        var obj = {};

        if (!this.isEventExists('click', 'medcardmanagement button[action="save"]')) {
            obj['medcardmanagement button[action="save"]'] = {click: this.onSave};
        }

        if (!this.isEventExists('afterrender', 'medcardmanagement form')) {
            obj['medcardmanagement form'] = { afterrender: this.onAfterRender};
        }

        if (!this.isEventExists('activate', 'medcardmanagement panel[name="general_settings"]')) {
            obj['medcardmanagement panel[name="general_settings"]'] = { activate: this.setDisableMedcardData};
        }

        if (!this.isEventExists('select', 'verticaltabs[name="medcart-filter-block"]')) {
            obj['verticaltabs[name="medcart-filter-block"]'] = { select: this.clientFilterTabSelect};
        }

        if (!this.isEventExists('activate', 'medcardmanagement panel[name="medcard-filter-main-panel"] > panel')) {
            obj['medcardmanagement panel[name="medcard-filter-main-panel"] > panel'] = { activate: this.activateFilterSettingsTab};
        }

        if (!this.isEventExists('click', 'medcardmanagement grid[name="diagnos_to_template_grid"] button[action="add"]')) {
            obj['medcardmanagement grid[name="diagnos_to_template_grid"] button[action="add"]'] = { click: this.showDiagnosToTemplateWin};
        }

        if (!this.isEventExists('click', 'medcardmanagement grid[name="diagnos_to_template_grid"] button[action="edit"]')) {
            obj['medcardmanagement grid[name="diagnos_to_template_grid"] button[action="edit"]'] = { click: this.showDiagnosToTemplateWin};
        }

        if (!this.isEventExists('click', 'medcardmanagement grid[name="diagnos_to_template_grid"] button[action="delete"]')) {
            obj['medcardmanagement grid[name="diagnos_to_template_grid"] button[action="delete"]'] = { click: this.deleteDiagnosToTemplate};
        }

        if (!this.isEventExists('click', 'addeditdiagnostotemplatewin button[action="save"]')) {
            obj['addeditdiagnostotemplatewin button[action="save"]'] = { click: this.onSaveDiagnosToTemplate};
        }

        this.control(obj);
    }
    , activateFilterSettingsTab: function(p) {
        var el = p.child('itemselector');

        if (el != null && '' != el.filter_type) {
            this.setFilterData(el.filter_type, el);
        }
    }
    , setFilterData: function(type, element) {
        Ext4.Ajax.request({
            url: 'ajax_administration.php'
            , scope: this
            , params: {
                cmd: 'get_filter_settings'
                , type: type
            }
            , success: function(r) {
                var result = Ext4.decode(r.responseText);

                element.setValue(result.data);
            }
        });
    }
    , clientFilterTabSelect: function() {
        var panel = this.getMainPanel().query('panel[name="medcard-filter-main-panel"]')[0];
        var panel2 = this.getMainPanel().query('verticaltabs')[0];

        var number = panel2.selModel.getSelection()[0].raw.number;
        panel.getLayout().setActiveItem(number);
    }
    , onSave: function() {
        var act = this.getMainPanel().getActiveTab();

        if (act.initialConfig.name == 'general_settings') {
            var values = []
                , panel = this.getGeneralSettings()
                , diagnosReq = panel.query('[xtype="fieldset"] > checkbox[name="med_diagnos_required"]')
                , meetResReq = panel.query('[xtype="fieldset"] > checkbox[name="med_meet_result_required"]')
                , lockMedcardTime = panel.query('[xtype="fieldset"] > combobox');

            if (lockMedcardTime.length == 1) {
                values.push({
                    name: 'lock_medcard_edit_time'
                    , value: lockMedcardTime[0].getValue()
                });
            }

            if (diagnosReq.length == 1) {
                values.push({
                    name: 'med_diagnos_required'
                    , value: (diagnosReq[0].getValue()) ? 1 : 0
                });
            }

            if (meetResReq.length == 1) {
                values.push({
                    name: 'med_meet_result_required'
                    , value: (meetResReq[0].getValue()) ? 1 : 0
                });
            }

            Ext4.Ajax.request({
                url: 'ajax_administration.php'
                , scope: this
                , params: {
                    cmd: 'set_all_access_params'
                    , params: Ext.encode(values)
                }
                , success: function(r) {
                    var result = Ext4.decode(r.responseText);

                    if (!result.is_error) {
                        Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.DataAreKept));
                    }
                }
            });
        } else if (act.initialConfig.name == 'medcard_filter_settings') {
            var panel = this.getMainPanel().query('panel[name="medcard-filter-main-panel"]')[0]
                , item = panel.getLayout().getActiveItem();

            var el = item.child('itemselector');

            if (el != null && '' != el.filter_type) {
                Ext4.Ajax.request({
                    url: 'ajax_administration.php'
                    , scope: this
                    , params: {
                        cmd: 'save_filter_settings'
                        , type: el.filter_type
                        , val: Ext4.encode(el.getValue())
                    }
                    , success: function() {
                        Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.DataAreKept));
                    }
                });
            }
        }
    }
    , onAfterRender: function() {
        var panel = this.getMainPanel().query('verticaltabs')[0];

        if (panel && panel.selModel) {
            panel.selModel.select(0);
        }
    }
    , setDisableMedcardData: function() {
        Ext4.Ajax.request({
            url: 'ajax_administration.php'
            , scope: this
            , params: {
                cmd: 'get_all_access_params'
                , names: Ext3.encode(['lock_medcard_edit_time', 'med_diagnos_required', 'med_meet_result_required'])
            }
            , success: function(r) {
                var result = Ext4.decode(r.responseText)
                    , panel = this.getGeneralSettings()
                    , diagnosReq = panel.query('[xtype="fieldset"] > checkbox[name="med_diagnos_required"]')
                    , meetResReq = panel.query('[xtype="fieldset"] > checkbox[name="med_meet_result_required"]')
                    , lockMedcardTime = panel.query('[xtype="fieldset"] > combobox');

                if (lockMedcardTime.length == 1) {
                    lockMedcardTime = lockMedcardTime[0];
                    lockMedcardTime.setValue(result.data.lock_medcard_edit_time);
                }

                if (diagnosReq.length == 1) {
                    diagnosReq = diagnosReq[0];
                    diagnosReq.setValue(result.data.med_diagnos_required);
                }

                if (meetResReq.length == 1) {
                    meetResReq = meetResReq[0];
                    meetResReq.setValue(result.data.med_meet_result_required);
                }
            }
        });
    }
    , setAccessData: function(type) {
        Ext4.Ajax.request({
            url: 'ajax_administration.php'
            , scope: this
            , params: {
                cmd: 'get_access_settings'
                , type: type
            }
            , success: function(r) {
                var result = Ext4.decode(r.responseText)
                    , form = this.getMainPanel().getActiveTab().getForm();

                form.findField(type).setValue(result.data);
            }
        });
    }
    , showDiagnosToTemplateWin: function(btn) {
        var grid = this.getDiagnosToTemplateGrid()
            , sm = grid.getSelectionModel()
            , sel = sm.getSelection()
            , rec;

        if (sm.hasSelection() && sel.length == 1 && btn.action == 'edit' || btn.action == 'add') {
            if (btn.action == 'edit') {
                rec = sel[0];
            }

            var win = Ext4.create('VetmanagerApp.modules.administration.view.settings.MedcardsDiagnosToTemplateWin', {
                rec: rec
            });
            win.show();

            if (btn.action == 'edit') {
                this.loadComboDataById(win.query('combo[name="diagnos_id"]')[0], rec.get('diagnos_id'));

                if (rec.get('pet_type_id')*1 == 0) {
                    win.query('combo[name="pet_type_id"]')[0].setValue(0);
                }

                if (rec.get('template_type') == 'food_recomendation') {
                    this.loadComboDataById(win.query('combo[name="template_id_food_recomendation"]')[0], rec.get('template_id'));
                }
            }
        }
    }
    , loadComboDataById: function (combo, id, paramName) {
        if (!combo) {
            return;
        }

        paramName = paramName || 'id';
        combo.clearInvalid();

        if (id != null && id*1 > 0) {
            combo.getStore().getProxy().setExtraParam(paramName, id*1);
            combo.getStore().load({
                scope: this,
                callback: function(records) {
                    if (records.length > 0) {
                        combo.setValue(records[0].get(paramName));
                    }
                }
            });
        } else {
            combo.clearValue();
            combo.getStore().getProxy().setExtraParam(paramName, '');
        }
    }
    , deleteDiagnosToTemplate: function() {
        var grid = this.getDiagnosToTemplateGrid()
            , sm = grid.getSelectionModel()
            , sel = sm.getSelection()
            , rec;

        if (sm.hasSelection() && sel.length == 1) {
            rec = sel[0];

            Ext4.Ajax.request({
                url: 'ajax_medicalcards.php'
                , scope: this
                , params: {
                    cmd: 'delete_diagnos_to_template'
                    , id: rec.get('id')
                }
                , success: function(r) {
                    grid.getStore().load();
                }
            });
        }

    }
    , onSaveDiagnosToTemplate: function() {
        var me = this
            , grid = me.getDiagnosToTemplateGrid()
            , win = me.getDiagnosToTemplateWindow();

        if (win) {
            var form = win.items.get(0).getForm()
                , values = form.getFieldValues();
            values.meet_reason_id = parseInt(values.meet_reason_id) || 0;
            values.diagnos_id = parseInt(values.diagnos_id) || 0;
            values.pet_type_id = parseInt(values.pet_type_id) || 0;

            if (values.meet_reason_id == 0 && values.diagnos_id == 0) {
                form.findField('meet_reason_id').markInvalid([LS.__translate(LS.SelectADiagnosisOrAPurposeOfApplication)]);
                form.findField('diagnos_id').markInvalid([LS.__translate(LS.SelectADiagnosisOrAPurposeOfApplication)]);
                return;
            }
            if (form.isValid()) {
                if (values.template_type == 'special') {
                    values.template_id = values.template_id_special;
                    values.destination = 'description';
                    delete values.template_id_special;
                } else if (values.template_type == 'text') {
                    values.template_id = values.template_id_text;
                    delete values.template_id_text;
                } else if (values.template_type == 'food_recomendation') {
                    values.template_id = values.template_id_food_recomendation;
                    delete values.template_id_food_recomendation;
                    values.destination = 'recomendation';
                }

                values.cmd = 'edit_diagnos_to_template';

                win.el.mask();
                Ext4.Ajax.request({
                    url: 'ajax_medicalcards.php'
                    , scope: this
                    , params: values
                    , success: function(r) {
                        grid.getStore().load();
                        win.close();
                    }
                });
            }
        }
    }
    , isEventExists: function(eventName, selector) {
        if (this.application.eventbus.bus[eventName] != null
            && this.application.eventbus.bus[eventName][selector] != null) {
            return true;
        }

        return false;
    }
});