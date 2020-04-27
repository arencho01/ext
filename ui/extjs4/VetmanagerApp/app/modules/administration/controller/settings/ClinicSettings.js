Ext4.define('VetmanagerApp.modules.administration.controller.settings.ClinicSettings', {
    extend: 'Ext4.app.Controller',
    views: [
        'VetmanagerApp.modules.administration.view.settings.ClinicSettings'
    ],
    refs: [
        {
            ref: 'mainPanel',
            selector: 'clinicsettings',
            autoCreate: true,
            xtype: 'clinicsettings'
        }, {
            ref: 'clinicsGrid',
            selector: 'clinicsettings grid[name="clinics_grid"]'
        }, {
            ref: 'clinicSettings',
            selector: 'clinicsettings form'
        }, {
            ref: 'selectedUsers',
            selector: 'clinicsettings itemselector[name="selected_users"]'
        }, {
            ref: 'selectedClinicsGrid',
            selector: 'clinicsettings grid[name="selected_clinics_grid"]'
        }, {
            ref: 'customerPanel',
            selector: 'clinicsettings container[name="customer_panel"]',
            autoCreate: true,
            xtype: 'customerPanel'
        }
    ],
    isEventExists: function(eventName, selector) {
        if (this.application.eventbus.bus[eventName] != null
            && this.application.eventbus.bus[eventName][selector] != null) {
            return true;
        }

        return false;
    },
    init: function() {
        var obj = {
            'clinicsettings grid[name="clinics_grid"]' : {
                itemclick: this.clinicClick
            },
            'clinicsettings grid[name="selected_clinics_grid"]' : {
                itemclick: this.selectedClinicClick
            },
            'clinicsettings panel[name="users_in_clinic"]': {
                activate: this.onActivateTab
            },
            'clinicsettings panel[name="clinic_settings"]': {
                activate: this.onActivateClinicsTab
            },
            'clinicsettings container[name="customer_panel"]': {
                render: this.onRenderCustomerPanel
            }
        };

        if (!this.isEventExists('click', 'clinicsettings button[action="save"]')) {
            obj['clinicsettings button[action="save"]'] = {click: this.onSave};
        }
        if (!this.isEventExists('click', 'clinicsettings button[action="add"]')) {
            obj['clinicsettings button[action="add"]'] = {click: this.addClick};
        }
        if (!this.isEventExists('click', 'clinicsettings button[action="del"]')) {
            obj['clinicsettings button[action="del"]'] = {click: this.delClick};
        }

        this.control(obj);
    },
    onRenderCustomerPanel: function() {
        var panel = this.getCustomerPanel();
        Ext4.Ajax.request({
            url: 'ajax_administration.php',
            scope: this,
            params: {
                cmd: 'get_total_customer_base'
            },
            success: function(r) {
                var res = Ext4.decode(r.responseText),
                    checkboxes = panel.query('checkbox[name="total_customer_base"]');

                if (checkboxes.length == 1) {
                    var checkbox = checkboxes[0];
                    checkbox.setValue(parseInt(res.data));
                }
            }
        });
    },
    onClinicsGridStoreLoad: function(s,rows) {
        this.getCustomerPanel().setDisabled(rows.length <= 1);
    },
    onActivateClinicsTab: function() {
        var grid = this.getClinicsGrid(),
            store = grid.getStore();

        store.un('load', this.onClinicsGridStoreLoad, this);
        store.on('load', this.onClinicsGridStoreLoad, this, {single: true});
    },
    onActivateTab: function() {
        var me = this;

        new Ext.util.DelayedTask(function() {
            var clinics = me.getSelectedClinicsGrid(),
                sm = clinics.getSelectionModel();

            try {
                sm.select(0);
                me.selectedClinicClick(clinics, sm.getSelection()[0]);
            } catch (err) {}
        }).delay(500);
    },
    selectedClinicClick: function(g, row) {
        var users = this.getSelectedUsers();

        Ext4.Ajax.request({
            url: 'ajax_administration.php',
            scope: this,
            params: {
                cmd: 'get_users_for_clinic',
                clinic_id: row.get('id')
            },
            success: function(r) {
                var res = Ext4.decode(r.responseText);
                users.setValue(res.data);
            }
        });
    },
    addClick: function() {
        this.getClinicSettings().query('[name="clinic_settings_panel"]')[0].show();
        var grid = this.getClinicsGrid(),
            sm = grid.getSelectionModel(),
            frm = this.getClinicSettings().getForm();

        frm.reset();
        var newid = Ext4.id('', 'generated');
        frm.findField("internet_address").setValue(window.location.origin + '/');
        grid.getStore().insert(0, {
            id: newid
            , title: LS.__translate(LS.NewClinic)
        });

        sm.select(grid.getStore().getById(newid));
        frm.findField('title').setValue(LS.__translate(LS.NewClinic));
        frm.findField('id').setValue(newid);

        this.clearLogoContainer();
    },
    clearLogoContainer: function () {
        try {
            $('.clinic_settings_logo_panel').croppie('destroy');
        } catch(e) {console.log('some error destroy');}

        $('.clinic_settings_logo_panel').empty();
    },
    delClick: function() {
        Ext3.MsgManager.alertError(LS.__translate(LS.SystemMessage), 'Удаление клиники временно отключено!'); return;
        var grid = this.getClinicsGrid(),
            sm = grid.getSelectionModel(),
            frm = this.getClinicSettings().getForm();

        if (sm.hasSelection()) {
            if (sm.getSelection()[0].get('id').indexOf('generated') >= 0) {
                grid.getStore().load();
            } else {
                Ext4.MessageBox.confirm(
                    LS.__translate(LS.Removal),
                    LS.__translate(LS.AreYouSureYouWantToDeleteTheClinic),
                    function(btn) {
                        if ('yes' == btn) {
                            Ext4.Ajax.request({
                                url: 'ajax_clinics.php',
                                scope: this,
                                params: {
                                    cmd: 'delete_clinics',
                                    ids: '[' + sm.getSelection()[0].get('id') + ']'
                                },
                                success: function(r) {
                                    var res = Ext4.decode(r.responseText);
                                    if (res.is_error == false) {
                                        grid.getStore().load();
                                        frm.reset();
                                        Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), 'Клиника удалена');
                                    } else {
                                        Ext3.MsgManager.alertError(LS.__translate(LS.SystemMessage), 'Невозможно удалить последнюю клинику');
                                    }
                                }
                            });
                        }
                    },
                    this);
            }
        }
    },
    clinicClick: function() {
        var me = this;
        this.getClinicSettings().query('[name="clinic_settings_panel"]')[0].show();
        var grid = this.getClinicsGrid();
        var sm = grid.getSelectionModel();
        var frm = this.getClinicSettings().getForm();
        frm.reset();

        if (sm.hasSelection()) {
            var clinicId = sm.getSelection()[0].get('id');

            Ext4.Ajax.request({
                url: 'ajax_clinics.php',
                scope: this,
                params: {
                    cmd: 'get_clinic_info',
                    id: clinicId
                },
                success: function(r) {
                    var res = Ext4.decode(r.responseText),
                        cityFld = frm.findField('city_id');

                    if (res.city_id == 0) {
                        cityFld.clearValue();
                        cityFld.clearInvalid();
                        delete res.city_id;
                    }

                    frm.setValues(res);

                    frm.findField('status').disabled = (frm.findField('last_active').value == 1);

                    this.setLoadValue(frm.findField('guest_client_id'), 'id', res.guest_client_id);

                    if (res.city_id) {
                        this.setLoadValue(frm.findField('city_id'), 'city_id', res.city_id);
                    }

                    frm.findField('timezone').setValue(res.time_zone);

                    var logoImgHtml = (Ext3.isEmpty(res.logo_url)) ? '' : '<img src="'+res.logo_url+'?'+Ext.id()+'" style="padding: 0 24px;" />';

                    me.clearLogoContainer();

                    $('.clinic_settings_logo_panel').append(logoImgHtml);
                }
            });
        }
    },
    onSave: function() {
        var form = this.getMainPanel().items.get(1).getActiveTab(),
            me = this;

        if (form.name == 'clinic_settings') {
            var grid = me.getClinicsGrid(),
                sm = grid.getSelectionModel(),
                frm = me.getClinicSettings().getForm(),
                id = frm.findField('id').getValue(),
                cmd = (id.indexOf('generated') >= 0) ? 'add' : 'edit';

            if (sm.hasSelection()) {
                if (frm.isValid()) {
                    var saveFunc = function (imageBase64) {
                        var values = frm.getValues();
                        values.status = frm.findField('status').getValue();
                        values.imageBase64 = imageBase64;
                        if (typeof Ext.query('.clinic_settings_logo_panel img')[0] !== 'undefined') {
                            values.imageData = Ext.query('.clinic_settings_logo_panel img')[0].src;
                        } else {
                            values.imageData = '';
                        }

                        var loadMask = new Ext.LoadMask(
                            me.getClinicSettings().el.dom,
                            {
                                msg: 'Ожидайте ...'
                            }
                        );

                        loadMask.show();

                        if (!Ext.isEmpty(values.imageBase64)) {
                            me.clearLogoContainer();
                        }

                        Ext4.Ajax.request({
                            url: 'ajax_clinics.php',
                            scope: me,
                            params: {
                                cmd: cmd,
                                values: Ext4.encode(values)
                            },
                            success: function(r) {
                                grid.getStore().load({
                                    callback: function() {
                                        loadMask.hide();

                                        if (r.responseText) {
                                            var jsonData = JSON.parse(r.responseText);
                                            if (typeof jsonData.clinic_id != 'undefined') {
                                                var clinics = me.getSelectedClinicsGrid();
                                                var record = grid.getStore().findRecord('id', jsonData.clinic_id);
                                                grid.getView().select(record);
                                                me.selectedClinicClick(clinics, sm.getSelection()[0]);
                                                frm.findField('id').setValue(jsonData.clinic_id);
                                                window.form1 = me.getClinicSettings().getForm();

                                                var logoImgHtml = (Ext3.isEmpty(jsonData.logo_url)) ? '' : '<img src="'+jsonData.logo_url+'?'+Ext.id()+'" style="padding: 0 24px;" />';

                                                $('.clinic_settings_logo_panel').append(logoImgHtml);
                                            }
                                        }
                                    }
                                });

                                var clinics = me.getSelectedClinicsGrid();
                                clinics.getStore().load();
                                Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.DataAreKept));
                            },
                            failure: function () {
                                loadMask.hide();
                            }
                        });
                    };

                    try{
                        $('.clinic_settings_logo_panel')
                            .croppie('result', 'base64')
                            .then(function(base64) {
                                saveFunc(base64);
                            });
                    } catch (e) {
                        saveFunc('');
                    }
                } else {
                    Ext3.MsgManager.alertError(LS.__translate(LS.Error), 'Заполните необходимые поля');
                }
            }
        } else if (form.name == 'users_in_clinic') {
            var users = this.getSelectedUsers();
            var clinics = this.getSelectedClinicsGrid();
            var sm = clinics.getSelectionModel();

            if (sm.hasSelection()) {
                Ext4.Ajax.request({
                    url: 'ajax_administration.php',
                    scope: this,
                    params: {
                        cmd: 'save_users_for_clinic',
                        clinic_id: sm.getSelection()[0].get('id'),
                        users: users.getSubmitValue()
                    },
                    success: function(r) {
                        Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.DataAreKept));
                    }
                });
            }
        }
        var checkboxes = this.getCustomerPanel().query('checkbox[name="total_customer_base"]');
        if (checkboxes.length == 1) {
            var item = checkboxes[0];

            Ext4.Ajax.request({
                url: 'ajax_administration.php',
                scope: this,
                params: {
                    cmd: 'save_total_customer_base',
                    val: item.getValue() ? 1 : 0
                }
            });
        }
    },
    setLoadValue: function(combo, paramName, value) {
        var params = {};
        params[paramName] = value;

        combo.getStore().suspendEvents();
        combo.getStore().load({
            params: params,
            callback: function() {
                combo.getStore().resumeEvents();
                combo.setValue(value);

                if (combo.getStore().find(combo.valueField, combo.value) < 0) {
                    combo.clearValue();
                } else {
                    combo.clearInvalid();
                }
            },
            scope: this
        });
    }
});