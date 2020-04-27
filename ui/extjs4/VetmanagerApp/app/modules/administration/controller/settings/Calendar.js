Ext4.define('VetmanagerApp.modules.administration.controller.settings.Calendar', {
    extend: 'Ext4.app.Controller'
    , views: [
        'VetmanagerApp.modules.administration.view.settings.Calendar'
        , 'VetmanagerApp.modules.administration.view.settings.CalendarWindows'
        , 'VetmanagerApp.modules.administration.view.settings.CalendarIntervals'
    ]
    , requires: [
        'Ext4.ux.form.ItemSelector'
    ]
    , refs: [
        {
            ref: 'mainPanel'
            , selector: 'calendarsettings'
            , autoCreate: true
            , xtype: 'calendarsettings'
        }, {
            ref: 'addIntervalTemplateWin'
            , selector: 'addintervaltemplatewin'
        }, {
            ref: 'calendarIntervalSettings'
            , selector: 'calendarintervalssettings'
            , autoCreate: true
            , xtype: 'calendarintervalssettings'
        }, {
            ref: 'addIntervalWin'
            , selector: 'addintervalwin'
        }, {
            ref: 'addLinkWin'
            , selector: 'addlinkwin'
        }, {
            ref: 'admissionTypeWin'
            , selector: 'admissiontypewin'
        }

    ]
    , init: function() {

        var obj = {};

        if (!this.isEventExists('click', 'calendarsettings button[action="save"]')) {
            obj['calendarsettings button[action="save"]'] = {click: this.onSave};
        }

        if (!this.isEventExists('activate', 'calendarsettings form')) {
            obj['calendarsettings form'] = { activate: this.onAfterRender};
        }

        if (!this.isEventExists('click', 'calendarsettings grid[name="interval_templates"] button[action="add_template"]')) {
            obj['calendarsettings grid[name="interval_templates"] button[action="add_template"]'] = { click: this.addIntervalTemplate};
        }

        if (!this.isEventExists('click', 'calendarsettings grid[name="interval_templates"] button[action="edit_template"]')) {
            obj['calendarsettings grid[name="interval_templates"] button[action="edit_template"]'] = { click: this.editIntervalTemplate};
        }

        if (!this.isEventExists('click', 'calendarsettings grid[name="interval_templates"] button[action="delete_template"]')) {
            obj['calendarsettings grid[name="interval_templates"] button[action="delete_template"]'] = { click: this.deleteIntervalTemplate};
        }

        if (!this.isEventExists('click', 'addintervaltemplatewin button[action="save"]')) {
            obj['addintervaltemplatewin button[action="save"]'] = { click: this.onSaveIntervalTemplate};
        }

        if (!this.isEventExists('click', 'addintervaltemplatewin button[action="close"]')) {
            obj['addintervaltemplatewin button[action="close"]'] = { click: this.onCloseIntervalTemplate};
        }

        if (!this.isEventExists('click', 'calendarintervalssettings button[action="add_interval"]')) {
            obj['calendarintervalssettings button[action="add_interval"]'] = { click: this.addInterval};
        }

        if (!this.isEventExists('click', 'addintervalwin button[action="save"]')) {
            obj['addintervalwin button[action="save"]'] = { click: this.onSaveInterval};
        }

        if (!this.isEventExists('click', 'addintervalwin button[action="close"]')) {
            obj['addintervalwin button[action="close"]'] = { click: this.onCloseInterval};
        }

        if (!this.isEventExists('click', 'calendarintervalssettings button[action="edit_interval"]')) {
            obj['calendarintervalssettings button[action="edit_interval"]'] = { click: this.editInterval};
        }

        if (!this.isEventExists('click', 'calendarintervalssettings button[action="delete_interval"]')) {
            obj['calendarintervalssettings button[action="delete_interval"]'] = { click: this.deleteInterval};
        }

        if (!this.isEventExists('click', 'addlinkwin combobox[name="timesheet_type"]')) {
            obj['addlinkwin combobox[name="timesheet_type"]'] = { click: this.selectIntervalType};
        }

        if (!this.isEventExists('click', 'calendarsettings grid[name="admission_type_color"] button[action="edit_admission_type_color"]')) {
            obj['calendarsettings grid[name="admission_type_color"] button[action="edit_admission_type_color"]'] = { click: this.editAdmissionTypeColor};
        }

        if (!this.isEventExists('click', 'admissiontypewin button[action="save"]')) {
            obj['admissiontypewin button[action="save"]'] = { click: this.onSaveAdmissionColor};
        }

        if (!this.isEventExists('click', 'admissiontypewin button[action="close"]')) {
            obj['admissiontypewin button[action="close"]'] = { click: this.onCloseAdmissionColor};
        }

        this.control(obj);
    }
    , onAfterRender: function() {
        var form = this.getMainPanel().getActiveTab();

        if (form.hideTbar == true) {
            this.getMainPanel().getDockedItems()[1].hide();
        } else {
            this.getMainPanel().getDockedItems()[1].show();
        }
        if (form.hideSaveBtn == true) {
            this.getMainPanel().query('button[action="save"]')[0].hide();
        } else {
            this.getMainPanel().query('button[action="save"]')[0].show();
        }

        if (form.accessType == false) {
            if (LS.__translate(LS.EndingVisitSetting) == form.title) {
                this.setAcceptionSettings();
            }
        } else {
            this.setAccessData(form.accessType);
        }
    }
    , setAcceptionSettings: function() {
        Ext4.Ajax.request({
            url: 'ajax_administration.php'
            , scope: this
            , params: {
                cmd: 'get_all_access_params'
                , names: Ext3.encode([
                    'show_admission_status_dlg_on_medcard_save'
                    , 'show_admission_status_dlg_on_invoice_save'
                ])
            }
            , success: function(r) {
                var result = Ext4.decode(r.responseText)
                    , form = this.getMainPanel().getActiveTab().getForm();

                for(var k in result.data) {
                    form.findField(k).setValue(result.data[k]);
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
    , onSave: function() {
        var panel = this.getMainPanel().getActiveTab()
            , form = panel.getForm()
            , values = form.getValues()
            , type = ''
            , value = ''
            , params = {};

        if (panel.accessType != false) {
            for(var t in values) {
                type = t;
                value = values[type];
                break;
            }

            params = {
                cmd: 'save_access_settings'
                , type: type
                , value: value
            };

            Ext4.Ajax.request({
                url: 'ajax_administration.php'
                , scope: this
                , params: params
                , success: function() {
                    this.onAfterRender();
                    Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.DataAreKept));
                }
            });
        } else {
            if (LS.__translate(LS.EndingVisitSetting) == panel.title) {
                this.saveAdmissionStatusesByInvoiceMedcard();
            } else {
                this.saveAdmissionPlanSettings();
            }
        }
    }
    // interval templates
    , addIntervalTemplate: function() {
        Ext4.create('VetmanagerApp.modules.administration.view.settings.AddIntervalTemplate').show();
    }
    , onSaveIntervalTemplate: function() {
        var form = this.getMainPanel().getActiveTab()
            , grid = form.query('grid[name="interval_templates"]')[0]
            , win = this.getAddIntervalTemplateWin()
            , frm = win.query('form')[0].getForm()
            , id = frm.findField('id').getValue();

        if (frm.isValid()) {
            Ext4.Ajax.request({
                url: 'ajax_calendar.php'
                , scope: this
                , params: {
                    cmd: (id == 0) ? 'add_timesheet_interval_template' : 'edit_timesheet_interval_template'
                    , params: Ext4.encode(frm.getValues())
                }
                , success: function() {
                    win.close();
                    grid.getStore().load();
                    Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.DataAreKept));
                }
            });
        }
    }
    , editIntervalTemplate: function() {
        var form = this.getMainPanel().getActiveTab()
            , grid = form.query('grid[name="interval_templates"]')[0]
            , sm = grid.getSelectionModel();

        if (sm.hasSelection()) {
            Ext4.Ajax.request({
                url: 'ajax_calendar.php'
                , scope: this
                , params: {
                    cmd: 'get_interval_by_id'
                    , params: Ext4.encode({
                        id: sm.getSelection()[0].get('id')
                    })
                }
                , success: function(r) {
                    var data = Ext4.decode(r.responseText).data;
                    Ext4.create('VetmanagerApp.modules.administration.view.settings.AddIntervalTemplate', {
                        title: LS.__translate(LS.TemplateEditing)
                    }).show();

                    var win = this.getAddIntervalTemplateWin()
                        , frm = win.query('form')[0].getForm();
                    frm.setValues(data);
                }
            });
        }
    }
    , onCloseIntervalTemplate: function() {
        var win = this.getAddIntervalTemplateWin();
        win.close();
    }
    , deleteIntervalTemplate: function() {
        var form = this.getMainPanel().getActiveTab()
            , grid = form.query('grid[name="interval_templates"]')[0]
            , sm = grid.getSelectionModel();

        if (sm.hasSelection()) {
            Ext4.MessageBox.confirm(
                LS.__translate(LS.Removal)
                , LS.__translate(LS.AreYouSureYouWantToDeleteTheTemplate)
                , function(btn) {
                    if ('yes' == btn) {
                        Ext4.Ajax.request({
                            url: 'ajax_calendar.php'
                            , scope: this
                            , params: {
                                cmd: 'delete_interval_template'
                                , params: Ext4.encode({
                                    ids: [
                                        sm.getSelection()[0].get('id')
                                    ]
                                })
                            }
                            , success: function() {
                                grid.getStore().load();
                                Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.DataAreKept));
                            }
                        });
                    }
            }, this);
        }
    }

    , addInterval: function() {
        var win = Ext4.create('VetmanagerApp.modules.administration.view.settings.AddInterval', {
            listeners: {
                scope: this
                , show: function() {
                    var form = win.query("[xtype='form']")[0].getForm();
                    form.findField('color').setValue('#FFFFFF');
                }
            }
        });

        win.show();
    }
    , onSaveInterval: function() {
        var form = this.getMainPanel().getActiveTab()
            , grid = form.query('grid[name="interval_types"]')[0]
            , win = this.getAddIntervalWin()
            , frm = win.query('form')[0].getForm()
            , id = frm.findField('id').getValue()
            , values = frm.getValues();

        values.is_working_hours = (values.is_working_hours == 'on') ? 1 : 0;
        values.is_show_in_timesheet = (values.is_show_in_timesheet == 'on') ? 1 : 0;
        values.b = (values.b == 'on') ? 1 : 0;
        values.i = (values.i == 'on') ? 1 : 0;
        values.u = (values.u == 'on') ? 1 : 0;

        if (frm.isValid()) {
            Ext4.Ajax.request({
                url: 'ajax_calendar.php'
                , scope: this
                , params: {
                    xaction: (id == 0) ? 'create' : 'update'
                    , data: Ext4.encode(values)
                    , cmd: values.cmd
                }
                , success: function() {
                    win.close();
                    grid.getStore().load();
                    Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.DataAreKept));
                }
            });
        }
    }
    , onCloseInterval: function() {
        var win = this.getAddIntervalWin();
        win.close();
    }
    , editInterval: function() {
        var form = this.getMainPanel().getActiveTab()
            , grid = form.query('grid[name="interval_types"]')[0]
            , sm = grid.getSelectionModel()
            , win = Ext4.create('VetmanagerApp.modules.administration.view.settings.AddInterval')
            , frm = win.query('form')[0].getForm();

        if (sm.hasSelection()) {
            win.show();
            frm.setValues(sm.getSelection()[0].data);
        }
    }
    , deleteInterval: function() {
        var form = this.getMainPanel().getActiveTab()
            , grid = form.query('grid[name="interval_types"]')[0]
            , sm = grid.getSelectionModel();

        if (sm.hasSelection()) {
            Ext4.MessageBox.confirm(
                LS.__translate(LS.Removal)
                , LS.__translate(LS.AreYouSureYouWantToDeleteTheIntervalType)
                , function(btn) {
                    if ('yes' == btn) {
                        Ext4.Ajax.request({
                            url: 'ajax_calendar.php'
                            , scope: this
                            , params: {
                                cmd: 'get_timesheet_types'
                                , xaction: 'destroy'
                                , data: sm.getSelection()[0].get('id')
                            }
                            , success: function(response) {
                                grid.getStore().load();
                                var jsonData = Ext.decode(response.responseText);
                                if (jsonData.is_error) {
                                    Ext3.MsgManager.alertError(LS.__translate(LS.Error), jsonData.messages);
                                    return;
                                }
                                Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.DataAreKept));
                            }
                        });
                    }
                }, this);
        }
    }
    , selectIntervalType: function(c,row) {
        var form = this.getMainPanel().getActiveTab()
            , grid = form.query('grid[name="interval_types"]')[0]
            , sm = grid.getSelectionModel();

        sm.select(grid.getStore().getById(row[0].get('id')));
    }
    , editAdmissionTypeColor: function() {
        var form = this.getMainPanel().getActiveTab()
            , grid = form.query('grid[name="admission_type_color"]')[0]
            , sm = grid.getSelectionModel()
            , win = Ext4.create('VetmanagerApp.modules.administration.view.settings.AdmissionTypeColor');

        if (sm.hasSelection()) {
            win.show();
            var frm = win.query('form')[0].getForm();
            frm.findField('color').setValue(sm.getSelection()[0].get('color'));
        }
    }
    , onSaveAdmissionColor: function() {
        var win = this.getAdmissionTypeWin()
            , frm = win.query('form')[0].getForm()
            , form = this.getMainPanel().getActiveTab()
            , grid = form.query('grid[name="admission_type_color"]')[0]
            , sm = grid.getSelectionModel();

        sm.getSelection()[0].set('color', frm.getValues().color);
        this.onCloseAdmissionColor();
    }
    , onCloseAdmissionColor: function() {
        this.getAdmissionTypeWin().close();
    }
    , saveAdmissionStatusesByInvoiceMedcard: function() {
        var form = this.getMainPanel().getActiveTab()
            , frm = form.getForm()
            , values =frm.getValues()
            , params = [];

        for(var k in values) {
            params.push({
                name: k
                , value: values[k]
            });
        }

        Ext4.Ajax.request({
            url: 'ajax_administration.php'
            , scope: this
            , params: {
                cmd: 'set_all_access_params'
                , params: Ext3.encode(params)
            }
            , success: function() {
                this.onAfterRender();
                Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.DataAreKept));
            }
        });
    }
    , saveAdmissionPlanSettings: function() {
        var form = this.getMainPanel().getActiveTab()
            , grid = form.query('grid[name="admission_type_color"]')[0]
            , frm = form.getForm()
            , modifiedRecords = grid.getStore().getModifiedRecords()
            , data = this.getModifiedColorData(modifiedRecords)
            , successCnt = 0;

        GlobalProperties.set('calendar_active_view', frm.getValues().start_view);

        if (data.length == 0) {
            Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.DataAreKept));
        }

        for(var i = 0, len = data.length; i < len; i++) {
            Ext4.Ajax.request({
                url: 'ajax_calendar.php'
                , scope: this
                , params: {
                    xaction: 'update'
                    , data: Ext4.encode(data[i])
                    , cmd: 'get_admission_types'
                }
                , success: function() {
                    if (++successCnt == len) {
                        grid.getStore().load();
                        Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.DataAreKept));
                    }
                }
            });
        }
    }
    , getModifiedColorData: function(modifiedRecords) {
        if (modifiedRecords.length > 0) {
            var data = [];
            Ext4.each(modifiedRecords, function(record, index){
                data[index] = record.getChanges();
                data[index].id = record.get('id');
            }, this);
            return data;
        }

        return [];
    }
    , isEventExists: function(eventName, selector) {
        if (this.application.eventbus.bus[eventName] != null
            && this.application.eventbus.bus[eventName][selector] != null) {
            return true;
        }

        return false;
    }
});