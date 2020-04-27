Ext4.define('VetmanagerApp.modules.administration.view.settings.AccessSettings.AccessByIP', {
    extend: 'Ext4.Panel',
    xtype: 'accesssettings-accessbyip',
    border: false,
    buttonAlign: 'center',
    layout: {
        type: 'hbox',
        align:'stretch'
    },
    initComponent: function() {
        var me = this;

        me.items = me.buildItems();

        me.callParent();

        me.grid = me.items.get(0);

        me.ipsStore = me.grid.getStore();

        me.ipsStore.on('beforeload', function() {
            me.el && me.el.mask && me.el.mask('Загрузка');
        });
        me.ipsStore.on('load', function() {
            me.el && me.el.unmask && me.el.unmask();
        });
    },
    buildItems: function() {
        var me = this,
            clinicsData = [];

        (function() {
            Ext.Ajax.request( {
                url : 'ajax_clinics.php',
                params: {
                    cmd : 'get_grid',
                    sort: 'title',
                    dir: 'ASC'
                },
                success: function(r) {
                    var data = Ext.decode(r.responseText);
                    clinicsData = data.data;
                }
            });
        })();

        return [
            {
                xtype: 'gridpanel',
                name: 'ip_grid',
                border: false,
                flex: 1,
                forceFit: true,
                viewConfig: {
                    getRowClass: function(rec) {
                        if (rec.get('is_active')) {
                            if (rec.get('allow_type') == 'allow') {
                                return 'normal-state-row';
                            } else {
                                return 'critical-state-row';
                            }
                        } else {
                            return 'inactive-state-row';
                        }
                    }
                },
                tbar: [
                    {
                        cls: 'button-save',
                        scope: me,
                        handler: me.save,
                        tooltip: LS.__translate(LS.Save),
                        margins: {top:3, right:0, bottom:2, left:5}
                    },
                    {
                        xtype: 'button',
                        cls: 'button-add',
                        handler: me.onAddClick,
                        scope: me
                    }, {
                        xtype: 'button',
                        cls: 'button-edit',
                        handler: me.onEditClick,
                        scope: me
                    }, {
                        xtype: 'button',
                        cls: 'button-del',
                        handler: me.onDeleteClick,
                        scope: me
                    }
                ],
                store: {
                    xtype: 'store',
                    fields: ['id', 'ip_address', 'allow_type', 'is_active', 'clinic_id'],
                    autoLoad: true,
                    proxy: {
                        type: 'ajax',
                        url: 'ajax_administration.php',
                        extraParams: {
                            cmd: 'get_ips'
                        },
                        reader: {
                            type: 'json',
                            root: 'data'
                        }
                    }
                },
                columns: [
                    {
                        header: LS.__translate(LS.IPAddress),
                        dataIndex: 'ip_address',
                        width: 200
                    },
                    {
                        header: LS.__translate(LS.ClinicId),
                        dataIndex: 'clinic_id',
                        width: 200,
                        renderer: function(v) {
                            var title = LS.__translate(LS.InTotal);

                            Ext.each(clinicsData, function(clinic) {
                                if (clinic.id == v) {
                                    title = clinic.title;
                                    return false;
                                }
                            });

                            return title;
                        }
                    },
                    {
                        header: LS.__translate(LS.Access),
                        dataIndex: 'allow_type',
                        width: 200,
                        renderer: function(v) {
                            return LS.__translate(v == 'allow' ? LS.Allow : LS.Denied);
                        }
                    },
                    {
                        header: LS.__translate(LS.Active),
                        dataIndex: 'is_active',
                        width: 200,
                        renderer: function(v) {
                            return LS.__translate( !!v ? LS.Actively : LS.Inactively);
                        }
                    }
                ],
                listeners: {
                    scope: me,
                    celldblclick: me.onEditClick
                }
            }
        ];
    },
    onAddClick: function() {
        var me = this;

        var win = Ext4.create('widget.accesssettings-accessbyip-editwindow');
        win.on('change', function(w, values) {
            if (values) {
                me.onChangeIps(values);
            }
        }, {
            single: true
        });
        win.show();
    },
    onEditClick: function() {
        var me = this;

        var rec = me.getSelectedRecord();
        if (rec) {
            var win = Ext4.create('widget.accesssettings-accessbyip-editwindow', {
                rec: rec
            });
            win.on('change', function(w, values) {
                if (values) {
                    me.onChangeIps(values);
                }
            }, {
                single: true
            });
            win.show();
        } else {
            Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.RecordIsntChosen));
        }
    },
    onDeleteClick: function() {
        var me = this,
            rec = me.getSelectedRecord();

        if (rec) {
            rec.store.remove(rec);
        }
    },
    getSelectedRecord: function() {
        var me = this,
            recs = me.grid.getSelectionModel().getSelection();

        return recs.length ? recs[0] : null;
    },
    onChangeIps: function(data) {
        var me = this,
            rec = me.ipsStore.getById(data.id);

        if (rec) {
            rec.set(data);
            // rec.commit();
        } else {
            me.ipsStore.add(data);
        }
    },
    save: function() {
        var me = this,
            params = [];
        me.ipsStore.each(function(rec) {
            var row = Ext.apply({}, rec.data);
            if ( row.id.toString().indexOf('ext') >= 0 ) {
                row.id = 0;
            }
            params.push(row);
        });

        me.el.mask('Сохранение');

        Ext.Ajax.request( {
            url : 'ajax_administration.php',
            params: {
                cmd : 'save_ips',
                params: Ext.encode(params)
            },
            success: function(r) {
                var data = Ext.decode(r.responseText);
                if ( !data.is_error ) {
                    me.ipsStore.load();
                } else {
                    Common.showErrors(r);
                }
            },
            callback: function() {
                me.el.unmask();
            }
        });
    }
});
