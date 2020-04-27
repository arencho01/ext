Ext4.define('VetmanagerApp.modules.administration.controller.settings.MenuSettings', {
    extend: 'Ext4.app.Controller',
    views: [
        'VetmanagerApp.modules.administration.view.settings.MenuSettings',
        'VetmanagerApp.modules.administration.view.settings.workspaceSettings.MainSettings',
        'VetmanagerApp.modules.administration.view.settings.workspaceSettings.MenuSettings'
    ],
    stores: [
        'VetmanagerApp.modules.administration.store.settings.Modules'
    ],
    url: 'ajax_administration.php',
    refs: [
        {
            ref: 'mainPanel',
            selector: 'menusettings',
            autoCreate: true,
            xtype: 'menusettings'
        },
        {
            ref: 'workspaceSettingsPanel',
            selector: 'workspacesettingspanel',
            autoCreate: true,
            xtype: 'workspacesettingspanel'
        }
    ],
    init: function() {
        this.control({
            'menusettings': {
                render: this.onRender,
                changetabposition: this.onChangeTabPosition
            },
            'menusettings button[action="save"]' :{
                click: this.onSave
            },
            'menusettings tabpanel': {
                tabchange: this.onWorkspacePanelTabchange
            }
        });
    },
    onSave: function(btn) {
        var me = this,
            tabPanel = me.getMainPanel().query('tabpanel')[0],
            allValues = [],
            isValid = true;

        if (me.isSaving) {
            return;
        }

        tabPanel.down('tabbar').items.each(function(panel, index){
            var values = panel.card.getValues();
            if (!values) {
                values = {
                    id: panel.card.data.id,
                    title: panel.card.data.title,
                    changed: false
                };
            } else {
                values.changed = true;
            }
            if (!values.title || values.title == '') {
                var titleField = panel.card.query('form')[0].getForm().findField('title');
                titleField.isValid.defer(25, titleField);
                tabPanel.setActiveTab(panel.card);
                isValid = false;
                Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.NameCantBeEmpty));
                return false;
            }
            values.index = index;
            allValues.push(values);
        });
        if (!isValid) {
            return;
        }

        var isAllWorkspaceDisabled = false;
        me.isSaving = true;
        btn.disable();
        Ext.Ajax.request({
            url: me.url,
            params: {
                cmd: 'get_workspace_config'
            },
            success: function(r) {
                var beforeData = Ext.decode(r.responseText);
                var oldData = beforeData.data;
                isAllWorkspaceDisabled =  me.checkDisabledWorkspaces(oldData, allValues);
            },
            callback: function(response){
                if(isAllWorkspaceDisabled){
                    Ext.Msg.show({
                        title: LS.__translate(LS.Attention)
                        , msg: LS.__translate(LS.DeactivateIsNotAllowedOneWorkplaceMustRemainActive)
                        , buttons: Ext.Msg.OK
                        , icon: Ext.MessageBox.ERROR
                        , scope: this
                        , fn: function(b) {
                            if ('ok' == b) {
                                var activeForm = tabPanel.getActiveTab().query('form')[0].getForm();
                                activeForm.findField('is_active').setValue(true);
                                me.isSaving = false;
                                btn.enable();
                            }
                        }
                    });
                    return;
                }

                var mask = new Ext4.LoadMask(me.getMainPanel().getEl(), { msg: LS.__translate(LS.PleaseWait) });
                mask.show();
                Ext.Ajax.request({
                    url: me.url,
                    params: {
                        cmd: 'set_workspace_config',
                        data: Ext.encode(allValues)
                    },
                    success: function(r) {
                        me.load();
                    },
                    callback: function() {
                        btn.enable();
                        mask.hide();
                        me.isSaving = false;
                        Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.settingsAreSaved));
                    }
                });
            }
        });

    },
    onRender: function() {
        var me = this;
        me.getMainPanel().el.mask();
        me.load();
    },
    load: function() {
        var me = this;

        var isModuleUsed = function(menu, module) {
            var isUsed = false;
            Ext.each(menu, function(item) {
                if (item.module == module.id) {
                    isUsed = true;
                    return false;
                } else if (item.hasOwnProperty('items') && Ext4.isArray(item.items)) {
                    if (isModuleUsed(item.items, module)) {
                        isUsed = true;
                        return false;
                    }
                }
            });
            return isUsed;
        };


        Ext.Ajax.request({
            url: me.url,
            params: {
                cmd: 'get_workspace_config'
            },
            success: function(r) {
                var data = Ext.decode(r.responseText),
                    store = me.getStore('VetmanagerApp.modules.administration.store.settings.Modules');
                me.getMainPanel().el.unmask();

                me.allModules = data.modules;
                Ext.each(data.data, function(d) {
                    d.modules = [];
                    Ext4.each(data.modules, function(module) {
                        module = Ext4.apply({
                            isUsed: isModuleUsed(d.menu, module)
                        }, module);
                        d.modules.push(module);
                    });
                });
                me.setValues(data.data);
            }
        });
    },
    getTabIndex: function(tabPanel) {
        var index = tabPanel.query('form')[0].getForm().findField('index').getValue() - 1;
        if (isNaN(index) || index < 0) {
            return 0;
        } else {
            return index;
        }
    },
    onWorkspacePanelTabchange: function() {
        var me = this,
            panel = me.getMainPanel().query('tabpanel')[0].getActiveTab(),
            tabIndex = me.getTabIndex(panel);
        panel.setValues(me.data[tabIndex]);
    },
    onChangeTabPosition: function(view, from, to) {
        var me = this;
        me.data.splice(to, 0, me.data.splice(from, 1)[0]);
    },
    setValues: function(data) {
        if (Ext.isArray(data)) {
            var me = this,
                tabPanel = me.getMainPanel().query('tabpanel')[0];
            me.data = data;

            tabPanel.down('tabbar').items.each(function(button, index) {
                if (data.length > index) {
                    button.card.setTitle(data[index].title);
                    button.card.data = data[index];
                }
            });

            me.onWorkspacePanelTabchange();
            return true;
        } else {
            return false;
        }
    },
    checkDisabledWorkspaces: function (oldData, allValues) {
        var countOfFalses = 0;
        var changed = [];
        for (var i = 0; i < allValues.length; i++) {
            if (allValues[i].is_active !== undefined) {
                var obj = {id: allValues[i].id, 'is_active': allValues[i].is_active}
                changed.push(obj);
            }
        }

        var newData = oldData;
        for (var i = 0; i < oldData.length; i++) {
            changed.filter(function (obj) {
                if (obj.id == oldData[i].id) {
                    newData[i].is_active = obj.is_active;
                }
            });

            if (newData[i].is_active == true) {
                countOfFalses++;
            }
        }

        if (countOfFalses == 0) {
            return true;
        } else {
            return false;
        }
    }

});