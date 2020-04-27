Ext4.define('VetmanagerApp.modules.administration.view.settings.AccessSettings', {
    extend: 'Ext4.tab.Panel',
    xtype: 'acesssettings',
    border: false,
    region: 'center',
    title: false,
    scope: this,
    requires: [
        'Ext4.ux.CheckColumn'
    ],
    items: [
        {
            title: LS.__translate(LS.AccessByRoles),
            xtype: 'panel',
            border: false,
            buttonAlign: 'center',
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'grid',
                    name: 'roles_grid',
                    border: false,
                    width: 250,
                    store: {
                        xtype: 'store',
                        fields: ['id', 'title', 'editable'],
                        autoLoad: true,
                        proxy: {
                            type: 'ajax',
                            url: 'ajax_administration.php',
                            extraParams: {
                                cmd: 'get_roles'
                            },
                            reader: {
                                type: 'json',
                                root: 'data'
                            }
                        }
                    },
                    columns: [{
                        header: LS.__translate(LS.Role),
                        dataIndex: 'title',
                        width: '100%',
                        sortable: false,
                        hideable: false
                    }]
                }, {
                    xtype: 'grid',
                    name: 'access_by_roles_grid',
                    flex: 1,
                    store: {
                        xtype: 'store',
                        fields: ['module_code', 'module_name', 'r_view', 'r_edit', 'r_administration', 'r_delete', 'allow_admin', 'admin_description'],
                        autoLoad: true,
                        proxy: {
                            type: 'ajax',
                            url: 'ajax_administration.php',
                            extraParams: {
                                cmd: 'get_access_by_role',
                                role_id: 0,
                                start: 0,
                                limit: 9999
                            },
                            reader: {
                                type: 'json',
                                root: 'data'
                            }
                        }
                    },
                    columns: [{
                        header: LS.__translate(LS.Module),
                        dataIndex: 'module_name',
                        sortable: false,
                        hideable: false,
                        flex: 1
                    }, {
                        header: LS.__translate(LS.Viewing),
                        dataIndex: 'r_view',
                        sortable: false,
                        hideable: false,
                        flex: 1,
                        xtype: 'checkcolumn',
                        stopSelection: false
                    }, {
                        header: LS.__translate(LS.Editing),
                        dataIndex: 'r_edit',
                        sortable: false,
                        hideable: false,
                        flex: 1,
                        xtype: 'checkcolumn',
                        stopSelection: false
                    }, {
                        header: LS.__translate(LS.Removal),
                        dataIndex: 'r_delete',
                        sortable: false,
                        hideable: false,
                        flex: 1,
                        xtype: 'checkcolumn',
                        stopSelection: false
                    }, {
                        header: LS.__translate(LS.Administration),
                        dataIndex: 'r_administration',
                        sortable: false,
                        hideable: false,
                        flex: 0.5,
                        xtype: 'checkcolumn',
                        stopSelection: false,
                        listeners: {
                            scope: this,
                            checkchange: function(th, rIndex, val, rec, grid) {
                                if (rec.get('allow_admin') == 0) {
                                    rec.set('u_administration', false);
                                    rec.set('r_administration', false);
                                }
                            }
                        },
                        renderer: function(v, m, r) {
                            if (r.get('allow_admin') == 1) {
                                return Ext4.ux.CheckColumn.prototype.renderer.apply(this, arguments);
                            } else {
                                return '';
                            }
                        }
                    }, {
                        header: LS.__translate(LS.NoTranslation),
                        xtype: 'actioncolumn',
                        flex: 0.5,
                        items: [
                            {
                                icon: 'ui/js/resources/images/information.png',
                                tooltip: LS.__translate(LS.Edit),
                                getClass: function( v, meta, rec ) {
                                    if (rec.get('allow_admin') == 1) {
                                        this.items[0].tooltip = rec.get('admin_description').replace(/"/g, "'");
                                        return 'information-icon';
                                    } else {
                                        return 'x4-hidden';
                                    }
                                },
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.store.getAt(rowIndex);
                                    Ext3.Msg.show({title: 'Описание доступа "Администрирование"', msg: rec.get('admin_description'), buttons:Ext.Msg.OK, icon:Ext.MessageBox.INFO, width: 500});
                                }
                            }
                        ]
                    }]
                }
            ],
            tbar: [
                {
                    cls: 'button-save',
                    action: 'save_access_by_roles',
                    tooltip: LS.__translate(LS.Save),
                    margins: {top:3, right:0, bottom:2, left:5}
                },
                {
                    xtype: 'button',
                    cls: 'button-add',
                    id: 'settings-add-access-role-btn',
                    action: 'add_role'
                }, {
                    xtype: 'button',
                    cls: 'button-edit',
                    action: 'edit_role'
                }, {
                    xtype: 'button',
                    cls: 'button-del',
                    action: 'delete_role'
                }
            ]
        }, {
            title: LS.__translate(LS.AccessByUsers),
            xtype: 'panel',
            border: false,
            buttonAlign: 'center',
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'grid',
                    name: 'users_grid',
                    border: false,
                    width: 250,
                    viewConfig: {
                        scrollOffset: 0,
                        forceFit: true,
                        getRowClass: function(row) {
                            if (row.get('is_active')*1 == 0) {
                                return 'not-activated-user';
                            }
                        }
                    },
                    store: 'VetmanagerApp.modules.administration.store.settings.Users',
                    columns: [{
                        header: '№',
                        dataIndex: 'id',
                        width: 35,
                        sortable: false,
                        hideable: false
                    }, {
                        header: LS.__translate(LS.FullName),
                        dataIndex: 'title',
                        width: 120,
                        sortable: false,
                        hideable: false
                    }, {
                        header: LS.__translate(LS.Role),
                        dataIndex: 'role_name',
                        width: 80,
                        sortable: false,
                        hideable: false
                    }]
                }, {
                    xtype: 'grid',
                    name: 'access_by_users_grid',
                    flex: 1,
                    store: {
                        xtype: 'store',
                        fields: [
                            'module_code',
                            'module_name',
                            'u_view',
                            'u_edit',
                            'u_administration',
                            'u_delete',
                            'r_delete',
                            'r_view',
                            'r_edit',
                            'r_administration',
                            'r_delete',
                            'allow_admin',
                            'admin_description'
                        ],
                        autoLoad: true,
                        proxy: {
                            type: 'ajax',
                            url: 'ajax_administration.php',
                            extraParams: {
                                cmd: 'get_access_by_user',
                                user_id: 0,
                                role_id: 0,
                                start: 0,
                                limit: 9999
                            },
                            reader: {
                                type: 'json',
                                root: 'data',
                                totalProperty: 'total'
                            }
                        }
                    },
                    columns: [{
                        header: LS.__translate(LS.Module),
                        dataIndex: 'module_name',
                        sortable: false,
                        hideable: false,
                        flex: 1
                    }, {
                        header: LS.__translate(LS.Viewing),
                        dataIndex: 'u_view',
                        sortable: false,
                        hideable: false,
                        flex: 1,
                        xtype: 'checkcolumn',
                        stopSelection: false,
                        listeners: {
                            scope: this,
                            checkchange: function(th, rIndex, val, rec, grid) {
                                var store = grid.getStore().getAt(rIndex);
                                if (store.get('module_name') == LS.__translate(LS.Settings)) {
                                    store.set('u_view', val);
                                    store.set('u_edit', val);
                                    store.set('u_administration', val);
                                    store.set('u_delete', val);
                                }

                            }
                        }
                    }, {
                        header: LS.__translate(LS.Editing),
                        dataIndex: 'u_edit',
                        sortable: false,
                        hideable: false,
                        flex: 1,
                        xtype: 'checkcolumn',
                        stopSelection: false,
                        listeners: {
                            scope: this,
                            checkchange: function(th, rIndex, val, rec, grid) {
                                var store = grid.getStore().getAt(rIndex);
                                if (store.get('module_name') == LS.__translate(LS.Settings)) {
                                    store.set('u_view', val);
                                    store.set('u_edit', val);
                                    store.set('u_administration', val);
                                    store.set('u_delete', val);
                                }

                            }
                        }
                    }, {
                        header: LS.__translate(LS.Removal),
                        dataIndex: 'u_delete',
                        sortable: false,
                        hideable: false,
                        flex: 1,
                        xtype: 'checkcolumn',
                        stopSelection: false,
                        listeners: {
                            scope: this,
                            checkchange: function(th, rIndex, val, rec, grid) {
                                var store = grid.getStore().getAt(rIndex);
                                if (store.get('module_name') == LS.__translate(LS.Settings)) {
                                    store.set('u_view', val);
                                    store.set('u_edit', val);
                                    store.set('u_administration', val);
                                    store.set('u_delete', val);
                                }

                            }
                        }
                    }, {
                        header: LS.__translate(LS.Administration),
                        dataIndex: 'u_administration',
                        sortable: false,
                        hideable: false,
                        flex: 0.5,
                        xtype: 'checkcolumn',
                        stopSelection: false,
                        listeners: {
                            scope: this,
                            checkchange: function(th, rIndex, val, rec, grid) {
                                var store = grid.getStore().getAt(rIndex);
                                if (store.get('module_name') == LS.__translate(LS.Settings)) {
                                    store.set('u_view', val);
                                    store.set('u_edit', val);
                                    store.set('u_administration', val);
                                    store.set('u_delete', val);
                                }
                                if (rec.get('allow_admin') == 0) {
                                    rec.set('u_administration', false);
                                    rec.set('r_administration', false);
                                }
                            }
                        },
                        renderer: function(v, m, r) {
                            if (r.get('allow_admin') == 1) {
                                return Ext4.ux.CheckColumn.prototype.renderer.apply(this, arguments);
                            } else {
                                return '';
                            }
                        }
                    }, {
                        header: LS.__translate(LS.NoTranslation),
                        xtype: 'actioncolumn',
                        flex: 0.5,
                        items: [
                            {
                                icon: 'ui/js/resources/images/information.png',
                                tooltip: LS.__translate(LS.Edit),
                                getClass: function( v, meta, rec ) {
                                    if (rec.get('allow_admin') == 1) {
                                        this.items[0].tooltip = rec.get('admin_description').replace(/"/g, "'");
                                        return 'information-icon';
                                    } else {
                                        return 'x4-hidden';
                                    }
                                },
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.store.getAt(rowIndex);
                                    Ext3.Msg.show({title: 'Описание доступа "Администрирование"', msg: rec.get('admin_description'), buttons:Ext.Msg.OK, icon:Ext.MessageBox.INFO, width: 500});
                                }
                            }
                        ]
                    }]
                }
            ],
            tbar: {
                items: [
                    {
                        cls: 'button-save',
                        action: 'save_access_by_users',
                        tooltip: LS.__translate(LS.Save),
                        margins: {top:3, right:0, bottom:2, left:5}
                    },
                    {
                        text: LS.__translate(LS.ShowAllUsers),
                        action: 'show_all_users',
                        enableToggle: true
                    },
                    {
                        text: LS.__translate(LS.ResetSettings),
                        action: 'reset_user_access_settings'
                    }
                ]
            }
        },
        {
            title: LS.__translate(LS.AccessByIP),
            xtype: 'accesssettings-accessbyip'
        }
    ]
});