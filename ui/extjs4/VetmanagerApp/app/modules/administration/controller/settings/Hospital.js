Ext4.define('VetmanagerApp.modules.administration.controller.settings.Hospital', {
    extend: 'Ext4.app.Controller'
    , views: [
        'VetmanagerApp.modules.administration.view.settings.Hospital'
        , 'VetmanagerApp.modules.administration.view.settings.HospitalBlockWin'
    ]
    , refs: [
        {
            ref: 'mainPanel'
            , selector: 'hospitalsettings'
            , autoCreate: true
            , xtype: 'hospitalsettings'
        }, {
            ref: 'addEditHospitalWin'
            , selector: 'addedithospitalwin'
        }, {
            ref: 'hospitalBlocksGrid'
            , selector: 'hospitalsettings grid[name="hospital_blocks"]'
        }
    ]
    , init: function() {
        var obj = {};

        if (!this.isEventExists('click', 'hospitalsettings button[action="save"]')) {
            obj['hospitalsettings button[action="save"]'] = {click: this.onSave};
        }

        if (!this.isEventExists('afterrender', 'hospitalsettings form')) {
            obj['hospitalsettings form'] = { afterrender: this.onAfterRender};
        }

        if (!this.isEventExists('click', 'hospitalsettings button[action="add_block"]')) {
            obj['hospitalsettings button[action="add_block"]'] = { click: this.onAddClick};
        }

        if (!this.isEventExists('click', 'hospitalsettings button[action="edit_block"]')) {
            obj['hospitalsettings button[action="edit_block"]'] = { click: this.onEditBlockClick};
        }

        if (!this.isEventExists('click', 'hospitalsettings button[action="delete_block"]')) {
            obj['hospitalsettings button[action="delete_block"]'] = { click: this.onDelBlockClick};
        }

        if (!this.isEventExists('click', 'addedithospitalwin button[action="save"]')) {
            obj['addedithospitalwin button[action="save"]'] = { click: this.onSaveHospitalBlockClick};
        }

        if (!this.isEventExists('itemdblclick', 'hospitalsettings grid[name="hospital_blocks"]')) {
            obj['hospitalsettings grid[name="hospital_blocks"]'] = { itemdblclick: this.onEditBlockClick};
        }

        this.control(obj);
    }
    , onSaveHospitalBlockClick: function(btn) {
        var win = this.getAddEditHospitalWin()
            , frm = win.query('form')[0].getForm()
            , values = frm.getValues()
            , grid = this.getHospitalBlocksGrid();

        if (frm.isValid()) {
            Ext4.Ajax.request({
                url: 'ajax_hospital.php'
                , scope: this
                , params: {
                    cmd: (values.id == 0) ? 'add_hospital_block' : 'edit_hospital_block'
                    , params: Ext4.encode(values)
                }
                , success: function(r) {
                    var res = Ext4.decode(r.responseText);

                    if (!res.is_error) {
                        win.close();
                        grid.getStore().load();
                        Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.DataAreKept));
                    } else {
                        Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.ErrorDuringSaving));
                    }
                }
            });
        }
    }
    , onAddClick: function() {
        Ext4.create('VetmanagerApp.modules.administration.view.settings.HospitalBlockWin').show();
    }
    , onEditBlockClick: function(btn) {
        var grid = this.getHospitalBlocksGrid()
            , sm = grid.getSelectionModel()
            , sel = sm.getSelection();

        if (sm.hasSelection() && sel.length == 1) {
            var id = sel[0].get('id')*1;

            var win = Ext4.create('VetmanagerApp.modules.administration.view.settings.HospitalBlockWin');
            win.show();

            Ext4.Ajax.request({
                url: 'ajax_hospital.php'
                , scope: this
                , params: {
                    cmd: 'get_hospital_block_by_id'
                    , id: id
                }
                , success: function(r) {
                    var res = Ext4.decode(r.responseText)
                        , frm = win.query('form')[0].getForm();

                    if (res.data.service_id == 0) {
                        delete res.data.service_id;
                    }

                    frm.setValues(res.data);
                }
            });
        }
    }
    , onDelBlockClick: function(btn) {
        var grid = this.getHospitalBlocksGrid()
            , sm = grid.getSelectionModel()
            , sel = sm.getSelection();

        if (sm.hasSelection() && sel.length == 1) {
            var id = sel[0].get('id')*1
                , hasHistory = sel[0].get('has_history')*1

            if (hasHistory > 0) {
                Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.CantDeleteThisBlockHeIsUsingInHospital));
                return;
            }

            Ext4.MessageBox.confirm(
                LS.__translate(LS.Removal)
                , LS.__translate(LS.AreYouSureYouWantToDeleteTheBlock)
                , function(btn) {
                    if ('yes' === btn) {
                         Ext4.Ajax.request({
                            url: 'ajax_hospital.php'
                            , scope: this
                            , params: {
                                cmd: 'delete_hospital_block'
                                , id: id
                            }
                            , success: function(r) {
                                var res = Ext4.decode(r.responseText);

                                if (!res.is_error) {
                                    grid.getStore().load();
                                    Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), 'Блок удален');
                                } else {
                                    Ext3.MsgManager.alertError(LS.__translate(LS.Error), 'Ошибка удаления');
                                }
                            }
                        });
                    }
                }
            , this);
        }
    }
    , onSave: function() {
        var panel = this.getMainPanel().getActiveTab()
            , form = panel.getForm();

        if (LS.__translate(LS.InpatientFacility) == panel.title) {
//            Ext4.Ajax.request({
//                url: 'ajax_administration.php'
//                , scope: this
//                , params: {
//                    cmd: 'set_all_access_params'
//                    , params: Ext4.encode([
//                        {
//                            name: 'show_store_party_accounting'
//                            , value: (form.findField('show_store_party_accounting').getValue()) ? 1 : 0
//                        }, {
//                            name: 'show_inventar_sale_params'
//                            , value: (form.findField('show_inventar_sale_params').getValue()) ? 1 : 0
//                        }
//                    ])
//                }
//                , success: function(r) {
//                    var result = Ext4.decode(r.responseText);
//
//                    if (result.is_error) {
//                        Ext3.MsgManager.alertError(LS.__translate(LS.Error), 'Ошибка сохранения настроек');
//                    } else {
//                        Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.DataAreKept));
//                    }
//                }
//            });
        }
    }
    , onAfterRender: function() {
        var form = this.getMainPanel().getActiveTab();

        if (LS.__translate(LS.InpatientFacility) == form.title) {
//            this.setShowStorePartyAccounting();
//            this.setShowInventarSsaleParams();
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