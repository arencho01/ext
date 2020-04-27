Ext4.define('VetmanagerApp.modules.administration.controller.settings.AccessSettings', {
    extend: 'Ext4.app.Controller'
    , views: [
        'VetmanagerApp.modules.administration.view.settings.AccessSettings',
        'VetmanagerApp.modules.administration.view.settings.AccessSettings.AccessByIP',
        'VetmanagerApp.modules.administration.view.settings.AccessSettings.AccessByIPEditWindow',
        'VetmanagerApp.modules.administration.view.settings.discount.ClinicCombobox'
    ]
    , stores: [
        'VetmanagerApp.modules.administration.store.settings.Users'
    ]
    , refs: [
        {
            ref: 'mainPanel'
            , selector: 'acesssettings'
            , autoCreate: true
            , xtype: 'acesssettings'
        }, {
            ref: 'accessByRolesGrid'
            , selector: 'acesssettings grid[name="access_by_roles_grid"]'
        }, {
            ref: 'rolesGrid'
            , selector: 'acesssettings grid[name="roles_grid"]'
        }, {
            ref: 'accessByUsersGrid'
            , selector: 'acesssettings grid[name="access_by_users_grid"]'
        }, {
            ref: 'usersGrid'
            , selector: 'acesssettings grid[name="users_grid"]'
        }
    ]
    , init: function() {

        var obj = {};

        if (!this.isEventExists('click', 'acesssettings button[action="save_access_by_roles"]')) {
            obj['acesssettings button[action="save_access_by_roles"]'] = {click: this.onSaveAccessByRoles};
        }

        if (!this.isEventExists('itemclick', 'acesssettings grid[name="roles_grid"]')) {
            obj['acesssettings grid[name="roles_grid"]'] = {itemclick: this.roleClick};
        }

        if (!this.isEventExists('click', 'acesssettings component[action="add_role"]')) {
            obj['acesssettings component[action="add_role"]'] = {click: this.addRole};
        }

        if (!this.isEventExists('click', 'acesssettings component[action="edit_role"]')) {
            obj['acesssettings component[action="edit_role"]'] = {click: this.editRole};
        }

        if (!this.isEventExists('click', 'acesssettings component[action="delete_role"]')) {
            obj['acesssettings component[action="delete_role"]'] = {click: this.deleteRole};
        }

        if (!this.isEventExists('itemclick', 'acesssettings grid[name="users_grid"]')) {
            obj['acesssettings grid[name="users_grid"]'] = {itemclick: this.userClick};
        }

        if (!this.isEventExists('click', 'acesssettings button[action="reset_user_access_settings"]')) {
            obj['acesssettings button[action="reset_user_access_settings"]'] = {click: this.resetAccessSettings};
        }

        if (!this.isEventExists('click', 'acesssettings button[action="save_access_by_users"]')) {
            obj['acesssettings button[action="save_access_by_users"]'] = {click: this.onSaveAccessByUser};
        }

        if (!this.isEventExists('click', 'acesssettings button[action="show_all_users"]')) {
            obj['acesssettings button[action="show_all_users"]'] = {click: this.showAllUsers};
        }

        this.control(obj);
    }
    , onSaveAccessByRoles: function() {
        var rolesGrid = this.getRolesGrid()
            , grid = this.getAccessByRolesGrid()
            , sm = rolesGrid.getSelectionModel()
            , modifiedRecords = grid.getStore().getModifiedRecords()
            , data = this.getRolesData(modifiedRecords);

        if (sm.hasSelection() && data != null) {
            var role_id = sm.getSelection()[0].get('id');

            Ext4.Ajax.request({
                url: 'ajax_administration.php'
                , scope: this
                , params: {
                    cmd: 'save_access_by_role'
                    , role_id: role_id
                    , data: Ext4.encode(data)
                }
                , success: function(r) {
                    var result = Ext4.decode(r.responseText);
                    grid.getStore().load({
                        params: {
                            role_id: role_id
                        }
                    });

                    Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), result.msg);
                }
                , failure: function(r) {
                    var result = Ext4.decode(r.responseText);
                    Ext3.MsgManager.alert(LS.__translate(LS.Error), result.msg);
                }
            });
        }
    }
    , getRolesData: function(modifiedRecords) {
        if (modifiedRecords.length > 0) {
                var data = [];
                Ext4.each(modifiedRecords, function(record, index){
                    data[index] = record.getChanges();
                    data[index].id = record.get('module_code');
                }, this);
                return data;
            }
    }
    , roleClick: function(th, record, item, index, e, eOpts ) {
        var grid = this.getAccessByRolesGrid();

        if (!record.get('editable')) {
            grid.getStore().removeAll();
            grid.el && grid.el.mask('Пользователи с ролью "' + record.get('title') + '" имеют максимальный доступ в программу.', 'x4-mask-msg-not-loading');
        } else {
            grid.el && grid.el.unmask();
            grid.getStore().load({
                params: {
                    role_id: record.get('id')
                    , start: 0
                    , limit: 9999
                }
            });
        }
    }
    , addRole: function() {
        Ext4.MessageBox.prompt(LS.__translate(LS.RoleAdding), LS.__translate(LS.Role) + ':', function(btn, val){
            if ('ok' == btn) {
                Ext4.Ajax.request({
                    url: 'ajax_administration.php'
                    , scope: this
                    , params: {
                        cmd: 'add_role'
                        , value: val
                    }
                    , success: function(r) {
                        var result = Ext4.decode(r.responseText);
                        this.getRolesGrid().getStore().load();

                        Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), result.msg);
                    }
                    , failure: function(r) {
                        var result = Ext4.decode(r.responseText);
                        Ext3.MsgManager.alert(LS.__translate(LS.Error), result.msg);
                    }
                });
            }
        }, this, false);
    }
    , editRole: function() {
        var rolesGrid = this.getRolesGrid()
            , sm = rolesGrid.getSelectionModel()

        if (sm.hasSelection()) {
            var role_id = sm.getSelection()[0].get('id')
                , title = sm.getSelection()[0].get('title');

            Ext4.MessageBox.prompt(
                LS.__translate(LS.RoleEditing)
                , LS.__translate(LS.Role)
                , function(btn, val) {
                    if ('ok' == btn) {
                        Ext4.Ajax.request({
                            url: 'ajax_administration.php'
                            , scope: this
                            , params: {
                                cmd: 'edit_role'
                                , new_name: val
                                , id: role_id
                            }
                            , success: function(r) {
                                var result = Ext4.decode(r.responseText);
                                this.getRolesGrid().getStore().load();

                                Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), result.msg);
                            }
                            , failure: function(r) {
                                var result = Ext4.decode(r.responseText);
                                Ext3.MsgManager.alert(LS.__translate(LS.Error), result.msg);
                            }
                        });
                    }
                }
            , this, false, title);
        }
    }
    , deleteRole: function() {
        var rolesGrid = this.getRolesGrid()
            , sm = rolesGrid.getSelectionModel()

        if (sm.hasSelection()) {
            var role_id = sm.getSelection()[0].get('id');

            Ext4.MessageBox.confirm(
                LS.__translate(LS.Removal)
                , LS.__translate(LS.AreYouSureYouWantToDeleteTheRole)
                , function(btn) {
                    if ('yes' === btn) {
                        Ext4.Ajax.request({
                            url: 'ajax_administration.php'
                            , scope: this
                            , params: {
                                cmd: 'delete_role'
                                , id: role_id
                            }
                            , success: function(r) {
                                var result = Ext4.decode(r.responseText);
                                this.getRolesGrid().getStore().load();

                                Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), result.msg);
                            }
                            , failure: function(r) {
                                var result = Ext4.decode(r.responseText);
                                Ext3.MsgManager.alert(LS.__translate(LS.Error), result.msg);
                            }
                        });
                    }
                }
            , this);
        }
    }
    , userClick: function(th, record, item, index, e, eOpts ) {
        var grid = this.getAccessByUsersGrid();
         
        if (!record.get('editable') && record.get('is_limited')==0) {
            grid.getStore().removeAll();
            grid.el && grid.el.mask('Пользователь "' + record.get('title') + '" имеет максимальный доступ.', 'x4-mask-msg-not-loading');
        }else if(!record.get('editable') && record.get('is_limited')==1){
            grid.getStore().removeAll();
            grid.el && grid.el.mask('Пользователь "' + record.get('title') + '" не имеет доступ к программе.', 'x4-mask-msg-not-loading');
        } else {
            grid.el && grid.el.unmask();
            grid.getStore().load({
                params: {
                    role_id: record.get('role_id')
                    , user_id: record.get('id')
                    , start: 0
                    , limit: 9999
                }
            });
        }
    }
    , onSaveAccessByUser: function() {
        var usersGrid = this.getUsersGrid()
            , grid = this.getAccessByUsersGrid()
            , sm = usersGrid.getSelectionModel()
            , modifiedRecords = grid.getStore().getModifiedRecords()
            , data = this.getRolesData(modifiedRecords);

        if (sm.hasSelection() && data != null) {
            var role_id = sm.getSelection()[0].get('role_id')
                , user_id = sm.getSelection()[0].get('id');

            Ext4.Ajax.request({
                url: 'ajax_administration.php'
                , scope: this
                , params: {
                    cmd: 'save_access_by_user'
                    , role_id: role_id
                    , user_id: user_id
                    , data: Ext4.encode(data)
                }
                , success: function(r) {
                    var result = Ext4.decode(r.responseText);
                    grid.getStore().load({
                        params: {
                            role_id: role_id
                            , user_id: user_id
                        }
                    });

                    Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), result.msg);
                }
                , failure: function(r) {
                    var result = Ext4.decode(r.responseText);
                    Ext3.MsgManager.alert(LS.__translate(LS.Error), result.msg);
                }
            });
        }
    }
    , resetAccessSettings: function() {
        var grid = this.getAccessByUsersGrid()
            , store = grid.getStore();

        store.each(function(record) {
            record.set('u_view', record.get('r_view'));
            record.set('u_edit', record.get('r_edit'));
            record.set('u_add', record.get('r_add'));
            record.set('u_administration', record.get('r_administration'));
            record.set('u_delete', record.get('r_delete'));
        });
    }
    , showAllUsers: function(btn) {
        var grid = this.getUsersGrid();

        grid.getStore().getProxy().extraParams.justActivated = (btn.pressed == true) ? 0 : 1;
        grid.getStore().load({
            params: {
                justActivated: (btn.pressed == true) ? 0 : 1
            }
        });
    }

    , isEventExists: function(eventName, selector) {
        if (this.application.eventbus.bus[eventName] != null
            && this.application.eventbus.bus[eventName][selector] != null) {
            return true;
        }

        return false;
    }
});