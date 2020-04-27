Ext.define('Ext4.ux.grid.ComboManual', {
    alias: 'widget.combomanualgrid',
    extend: 'Ext4.grid.Panel',
    incrementValue: false,
    showFields: undefined,
    storeFields: undefined,
    fieldsTitles: undefined,
    sortField: undefined,
    initComponent: function() {
        var me = this;
        me.storeFields = me.storeFields || [
            'id',
            'title',
            'value',
            'combo_manual_id',
            'dop_param1',
            'dop_param2',
            'dop_param3'
        ];
        me.showFields = me.showFields || me.storeFields;
        me.fieldsTitles = me.fieldsTitles || {
            id: 'ID',
            title: LS.__translate(LS.Namez),
            value: LS.__translate(LS.Value),
            dop_param1: LS.__translate(LS.parameter1),
            dop_param2: LS.__translate(LS.parameter2),
            dop_param3: LS.__translate(LS.parameter3)
        };
        me.store = me.buildStore();
        me.columns = me.buildColumns();
        me.tbar = me.buildTopToolbar();
        if (!me.title) {
            me.title = me.manualName;
        }
        if (me.sortField && me.storeFields.indexOf(me.sortField) >= 0) {
            var ddGroup = Ext.id();
            me.viewConfig = {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: ddGroup,
                    dropGroup: ddGroup
                },
                listeners: {
                    drop: function() {
                        me.getStore().each(function(r, i) {
                            r.set(me.sortField, i);
                            me.saveRecord(r.data, null, null, true);
                        });
                    }
                }
            };
        }
        me.callParent();

        me.on('selectionchange', me.onSelectionChange);
    },
    buildStore: function() {
        var me = this,
            store;

        store = new Ext.data.JsonStore({
            proxy: {
                type: 'ajax',
                url: 'ajax_combo_manual.php',
                extraParams: {
                    start: 0,
                    limit: 99999,
                    manual_name: me.manualName,
                    is_active: 1,
                    cmd: 'get_items'
                },
                reader: {
                    type: 'json',
                    root: 'data',
                    idProperty: 'id'
                }
            },
            fields: me.storeFields,
            autoLoad: true,
            listeners: {
                load: function() {
                    if (me.sortField && me.storeFields.indexOf(me.sortField) >= 0) {
                        store.sort(me.sortField, 'ASC');
                    } else {
                        store.doSort(function(a, b) {
                            var v1 = a.get('value'), v2 = b.get('value');
                            var t1 = a.get('title'), t2 = b.get('title');

                            if (v1 < 0) {
                                if (v2 < 0) {
                                    return v1 > v2 ? 1 : -1
                                }
                            } else if (v2 < 0){
                                return 1;
                            } else {
                                return t1 > t2 ? 1 : -1;
                            }
                        });
                    }
                }
            }
        });

        return store;
    },
    buildColumns: function() {
        var me = this,
            columns = [];

        Ext.each(me.showFields, function(fieldName) {
            columns.push({
                text: me.fieldsTitles[fieldName] || fieldName,
                dataIndex: fieldName,
                sortable: false,
                flex: 1
            });
        });

        return columns;
    },
    buildTopToolbar: function() {
        var me = this,
            tbar;
        tbar = new Ext4.toolbar.Toolbar({
            items: [
                {
                    cls: 'button-add',
                    tooltip: LS.__translate(LS.Add),
                    scope: me,
                    handler: me.addItem,
                    name: 'add'
                },
                {
                    cls: 'button-edit',
                    tooltip: LS.__translate(LS.Edit),
                    scope: me,
                    handler: me.editItem,
                    disabled: true,
                    name: 'edit'
                },
                {
                    cls: 'button-del',
                    tooltip: LS.__translate(LS.Delete),
                    hidden: true,
                    scope: me,
                    handler: me.deleteItem,
                    disabled: true,
                    name: 'delete'
                },
                {
                    tooltip: LS.__translate(LS.Combine),
                    cls: 'button-compare',
                    hidden: true,
                    scope: me,
                    handler: me.compareItem,
                    disabled: true,
                    name: 'compare'

                },
                '->',
                {
                    text: LS.__translate(LS.Deactivate),
                    scope: me,
                    handler: me.deactivateItem,
                    disabled: true,
                    name: 'deactivate'
                },
                {
                    text: LS.__translate(LS.Activate),
                    hidden: true,
                    scope: me,
                    handler: me.activateItem,
                    disabled: true,
                    name: 'activate'
                },
                {
                    text: LS.__translate(LS.ShowActive),
                    hidden: true,
                    scope: me,
                    handler: me.showActivated,
                    disabled: true,
                    name: 'showactivated'
                },
                {
                    text: LS.__translate(LS.ShowInactive),
                    scope: me,
                    handler: me.showDeactivated,
                    name: 'showdeactivated'
                }
            ]
        });

        return tbar;
    },
    getButton: function(name) {
        var me = this,
            tbar = me.topToolbar || me.getDockedItems('toolbar[dock="top"]')[0];
        me.topToolbar = tbar;

        return tbar.items.findBy(function(item) {
            return (item.name === name);
        });
    },
    onSelectionChange: function() {
        var me = this,
            selected = me.getSelectionModel().getSelection(),
            disabled = (!selected || !selected.length);

        Ext.each(selected, function(rec) {
            if (rec.get('value') < 0) {
                disabled = true;
            }
        });

        me.getButton('edit').setDisabled(disabled || selected.length !== 1);
        me.getButton('delete').setDisabled(disabled);
        me.getButton('deactivate').setDisabled(disabled);
        me.getButton('activate').setDisabled(disabled);
    },
    getSelectedRecord: function() {
        var me = this,
            recs = me.getSelectionModel().getSelection();

        return recs.length ? recs[0] : null;
    },
    addItem: function() {
        var me = this,
            win = me.getEditWindow();

        win.show();
    },
    editItem: function() {
        var me =  this,
            rec = me.getSelectedRecord(),
            win;

        if (rec) {
            win = me.getEditWindow(rec);
        }

        win.show();
    },
    deleteItem: function() {
        console.log('deleteItem');
    },
    compareItem: function() {
        console.log('compareItem');
    },
    deactivateItem: function() {
        var me = this;

        me.actDeactItem(LS.__translate(LS.Deactivation), LS.__translate(LS.AreYouSureYouWantToDeactivateTheItem), 'deactivate_item');
    },
    activateItem: function() {
        var me = this;

        me.actDeactItem(LS.__translate(LS.Activation), LS.__translate(LS.AreYouSureYouWantToActivateTheItem), 'activate_item');
    },
    showActivated: function() {
        var me = this,
            s = me.getStore();
        me.getButton('activate').disable().hide();
        me.getButton('deactivate').enable().show();
        me.getButton('showactivated').disable().hide();
        me.getButton('showdeactivated').enable().show();
        me.onSelectionChange();
        s.proxy.extraParams.is_active = 1;
        s.load();
    },
    showDeactivated: function() {
        var me = this,
            s = me.getStore();
        me.getButton('deactivate').disable().hide();
        me.getButton('activate').enable().show();
        me.getButton('showdeactivated').disable().hide();
        me.getButton('showactivated').enable().show();
        me.onSelectionChange();
        s.proxy.extraParams.is_active = 0;
        s.load();
    },
    getEditWindow: function(rec) {
        var me = this,
            win;

        win = new Ext4.Window({
            title: LS.__translate(rec ? LS.Editing : LS.Adding),
            items: {
                xtype: 'form',
                frame: true,
                border: false,
                padding: 10,
                items: me.buildEditWindowItems()
            },
            width: 400,
            autoHeight: true,
            modal: true,
            buttons: [
                {
                    text: LS.__translate(LS.Save),
                    handler: function() {
                        me.saveRecord(win.items.get(0).getForm().getFieldValues(), function(result) {
                            if (!result.is_error) {
                                win.close();
                            }
                        });
                    }
                },
                {
                    text: LS.__translate(LS.Cancel),
                    handler: function() {
                        win.close();
                    }
                }
            ]
        });

        if (rec) {
            win.items.get(0).getForm().loadRecord(rec);
        }

        return win;
    },
    buildEditWindowItems: function() {
        var me = this,
            items = [{
                xtype: 'hidden',
                name: 'id'
            }];


        Ext.each(me.showFields, function(fieldName) {
            items.push({
                xtype: 'textfield',
                name: fieldName,
                fieldLabel: me.fieldsTitles[fieldName] || fieldName,
                anchor: '100%'
            });
        });

        return items;
    },
    saveRecord: function(data, callback, scope, silent) {
        var me = this,
            params = {
                combo_manual_name: me.manualName,
                cmd: data.id > 0 ? 'edit_item' : 'add_item'
            };
        Ext.apply(params, data);

        if (me.incrementValue && params.cmd === 'add_item') {
            params.value = 'increment';
        }

        Ext.Ajax.request({
            url: 'ajax_combo_manual.php',
            params: params,
            success: function(r) {
                if (silent === true) {
                    return;
                }
                Common.showErrors(r);
                var data = Ext.decode(r.responseText);
                if (!data.is_error) {
                    me.getStore().reload();
                }
                if (Ext.isFunction(callback)) {
                    callback.call(scope || me, data);
                }
            }
        })
    },
    actDeactItem: function(title, text, cmd) {
        var me = this,
            rec = me.getSelectedRecord();

        if (rec) {
            Ext4.MessageBox.confirm(
                title
                , text
                , function(btn) {
                    if ('yes' === btn) {

                        Ext4.Ajax.request({
                            url: 'ajax_combo_manual.php'
                            , scope: this
                            , params: {
                                cmd: cmd
                                , item_id: rec.get('id')
                                , combo_manual_name: me.manualName
                            }
                            , success: function(r) {
                                var result = Ext4.decode(r.responseText);

                                if (!result.is_error) {
                                    if (result.msg || result.message) {
                                        Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), result.msg || result.message);
                                    }
                                    me.getStore().reload();
                                } else {
                                    if (result.msg || result.message) {
                                        Ext3.MsgManager.alertError(LS.__translate(LS.Error), result.msg || result.message);
                                    } else {
                                        Ext3.MsgManager.alertError(LS.__translate(LS.Error), 'Ошибка при выполнении операции');
                                    }
                                }
                            }
                            , failure: function(r) {
                                var result = Ext4.decode(r.responseText);
                                Ext3.MsgManager.alertError(LS.__translate(LS.Error), result.msg);
                            }
                        });
                    }
                }
                , this);
        }
    }
});