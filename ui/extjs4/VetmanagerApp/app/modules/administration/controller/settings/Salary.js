Ext4.define('VetmanagerApp.modules.administration.controller.settings.Salary', {
    extend: 'Ext4.app.Controller'
    , views: [
        'VetmanagerApp.modules.administration.view.settings.Salary'
    ]
    , stores: [
        'VetmanagerApp.modules.administration.store.settings.salary.Users'
        , 'VetmanagerApp.modules.administration.store.settings.salary.UserPercents'
    ]
    , refs: [
        {
            ref: 'mainPanel'
            , selector: 'salarysettings form'
            , autoCreate: true
            , xtype: 'salarysettings'
        }, {
            ref: 'settingsForm'
            , selector: 'salarysettings form[name="settings_form"]'
        }, {
            ref: 'tabPanel'
            , selector: 'salarysettings tabpanel'
        }, {
            ref: 'userSettingsGrid'
            , selector: 'salarysettings grid[name="user_settings_grid"]'
        }, {
            ref: 'usersGrid'
            , selector: 'salarysettings grid[name="users_grid"]'
        }
    ]
    , init: function() {
        this.usersStore = this.getStore('VetmanagerApp.modules.administration.store.settings.salary.Users');
        this.userPercentsStore = this.getStore('VetmanagerApp.modules.administration.store.settings.salary.UserPercents');
        this.userPercentsStore.on('beforeload', function(store, opts) {
            if (store.getModifiedRecords().length > 0) {
                console.log(arguments);
                var o = {
                    start: opts.start
                    , limit: opts.limit
                    , page: opts.page
                };
                Ext3.Msg.show({
                    title: LS.__translate(LS.Attention)
                    , msg: LS.__translate(LS.changesMadeHaveNotBeenSaved)
                    , icon: Ext.MessageBox.WARNING
                    , buttons: {
                        ok: LS.__translate(LS.Save)
                        , yes: LS.__translate(LS.continue)
                        , cancel: LS.__translate(LS.Cancel)
                    }
                    , fn: function(btn) {
                        if (btn == 'ok') {
                            this.saveSettings(function() {
                                store.load(o);
                            });
                        } else if (btn == 'yes') {
                            store.rejectChanges();
                            store.load(o);
                        } else {
                            return false;
                        }
                    }
                    , scope: this
                });
                return false;
            }
        }, this);
        
        var obj = {};

        if (!this.isEventExists('selectionchange', 'salarysettings grid[name="users_grid"]')) {
            obj['salarysettings grid[name="users_grid"]'] = {selectionchange: this.userSelectionChange};
        }

        if (!this.isEventExists('click', 'salarysettings button[action="save_salary"]')) {
            obj['salarysettings button[action="save_salary"]'] = { click: this.saveSettings};
        }

        if (!this.isEventExists('click', 'salarysettings grid[name="users_grid"] component[action="show_all_users"]')) {
            obj['salarysettings grid[name="users_grid"] component[action="show_all_users"]'] = { click: this.showAllUsers};
        }
        
        this.control(obj);
    }
    , userSelectionChange: function(grid, selections, e) {
        if (selections.length == 1) {
            this.selectUser(parseInt(selections[0].get('id')));
        } else {
            this.clearValues()
        }
    }
    , getSelectedUser: function() {
        var recs = this.getUsersGrid().getSelectionModel().getSelection();
        if (recs.length > 0) {
            return recs[0].get('id');
        }
    }
    , selectUser: function(userId) {
        this.clearValues();
        if (userId) {
            this.getTabPanel().items.get(0).enable();
            this.getTabPanel().items.get(1).enable();
            this.loadSettings(userId);
            return true;
        }
    }
    , clearValues: function() {
        this.userPercentsStore.proxy.setExtraParam('user_id', 0);
        this.userPercentsStore.removeAll();
    }
    , loadSettings: function(userId) {
        this.userPercentsStore.proxy.setExtraParam('user_id', userId);
        this.userPercentsStore.load();
        this.getSettingsForm().getForm().reset();
        this.getSettingsForm().el.mask(LS.__translate(LS.Loading));

        Ext4.Ajax.request({
            url: 'ajax_access.php'
            , scope: this
            , params: {
                cmd: 'get_user_salary_settings'
                , xaction: 'read'
                , user_id: userId
            }
            , success: function(r) {
                this.getSettingsForm().el.unmask();
                var data = Ext.decode(r.responseText);
                if (data.data) {
                    this.getSettingsForm().getForm().setValues(data.data)
                }
            }
        });
    }
    , saveSettings: function(callback, scope) {
        var userId = this.getSelectedUser()
            , percents = [];
        if (userId) {
            this.userPercentsStore.each(function(rec) {
                percents.push(rec.data);
            });
        }

        Ext4.Ajax.request({
            url: 'ajax_access.php'
            , scope: this
            , params: {
                cmd: 'get_percents'
                , xaction: 'update'
                , data: Ext4.encode(percents)
            }
            , success: function(r) {
                Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.settingsAreSaved));
                this.userPercentsStore.commitChanges();
                this.userPercentsStore.reload();
                if (Ext.isFunction(callback)) {
                    callback.apply(scope || this);
                }
            }
        });

        var settings = this.getSettingsForm().getForm().getFieldValues();
        console.log(settings);
        Ext4.Ajax.request({
            url: 'ajax_access.php'
            , scope: this
            , params: {
                cmd: 'get_user_salary_settings'
                , xaction: 'update'
                , user_id: userId
                , settings: Ext.encode(settings)
            }
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