Ext4.define('VetmanagerApp.modules.administration.view.settings.Catalogs', {
    extend: 'Ext4.FormPanel'
    , xtype: 'catalogs'
    , border: false
    , region: 'center'
    , title: false
    , layout: 'fit'
    , buttonAlign: 'center'
    , url: 'ajax_administration.php'
    , scope: this
    , requires: [
        'Ext4.ux.VetmanagerMsg'
    ]
    , defaults: {
        labelAlign: 'left'
        , labelWidth: 230
        , width: 1000
    }
    , items: [{
        xtype: 'panel'
        , border: false
        , buttonAlign: 'center'
        , layout: {
            type: 'hbox'
            , pack: 'start'
            , align: 'stretch'
        }
        , items: [
            {
                xtype: 'grid'
                , name: 'catalogs'
                , title: LS.__translate(LS.ListOfGuides)
                , width: 250
                , border: false
                , store: {
                    xtype: 'store'
                    , fields: ['id', 'title', 'is_readonly']
                    , autoLoad: true
                    , proxy: {
                        type: 'ajax'
                        , url: 'ajax_combo_manual.php'
                        , extraParams: {
                            cmd: 'get_manual'
                            , limit: 9999
                            , start: 0
                            , is_editable: 1
                        }
                        , reader: {
                            type: 'json'
                            , root: 'data'
                        }
                    }
                }
                , columns: [
                    {
                        header: LS.__translate(LS.Namez)
                        , dataIndex: 'title'
                        , width: 250
                        , sortable: false
                        , hideable: false
                    }
                ]
            }, {
                xtype: 'grid'
                , name: 'items'
                , flex: 1
                , title: LS.__translate(LS.ListOfElements)
                , selModel: Ext.create('Ext.selection.CheckboxModel')
                , initComponent: function() {
                    Ext.grid.Panel.prototype.initComponent.apply(this, arguments);
                    var paging = this.getDockedComponent('pagingtoolbar');
                    if (paging) {
                        paging.bindStore(this.getStore());
                    }
                }
                , tbar: [
                    {
                        cls: 'button-add'
                        , tooltip: LS.__translate(LS.Add)
                        , action: 'add'
                    }, {
                        cls: 'button-edit'
                        , tooltip: LS.__translate(LS.Edit)
                        , action: 'edit'
                    }, {
                        cls: 'button-del'
                        , tooltip: LS.__translate(LS.Delete)
                        , action: 'delete'
                        , hidden: true
                    }, {
                        tooltip: LS.__translate(LS.Combine)
                        , action: 'compare'
                        , cls: 'button-compare'
                    }
                    , '->'
                    , {
                        text: LS.__translate(LS.Deactivate)
                        , action: 'deactivate'
                    }, {
                        text: LS.__translate(LS.Activate)
                        , hidden: true
                        , action: 'activate'
                    }, {
                        text: LS.__translate(LS.ShowInactive)
                        , action: 'show_deactivated'
                    }, {
                        text: LS.__translate(LS.ShowActive)
                        , hidden: true
                        , action: 'show_activated'
                    }
                ]
                , store: {
                    xtype: 'store'
                    , pageSize: 25
                    , id: 'administration-catalogs-store'
                    , fields: [
                        'id'
                        , 'title'
                        , 'value'
                        , 'combo_manual_id'
                        , 'dop_param1'
                        , 'dop_param2'
                        , 'dop_param3'
                        , 'dop_param1_title'
                        , 'dop_param2_title'
                        , 'dop_param3_title'
                    ]
                    , proxy: {
                        type: 'ajax'
                        , url: 'ajax_combo_manual.php'
                        , extraParams: {
                            cmd: 'get_items'
                            , limit: 25
                            , start: 0
                            , manual_id: 0
                            , is_active: 1
                        }
                        , reader: {
                            type: 'json'
                            , root: 'data'
                        }
                    }
                    , remoteSort: true
                }
                , columns: [{
                    header: LS.__translate(LS.Namez)
                    , dataIndex: 'title'
                    , sortable: true
                    , flex: 2
                    , hideable: false
                }, {
                    header: LS.__translate(LS.Value)
                    , dataIndex: 'value'
                    , flex: 1
                    , sortable: false
                    , hideable: false
                }
                , {
                    header: LS.__translate(LS.AdditionalParameter)
                    , dataIndex: 'dop_param1'
                    , flex: 1
                    , sortable: false
                    , hideable: true
                }, {
                    header: LS.__translate(LS.additionalParameter2)
                    , dataIndex: 'dop_param2'
                    , flex: 1
                    , sortable: false
                    , hideable: true
                }, {
                    header: LS.__translate(LS.ExtraParameter)
                    , dataIndex: 'dop_param3'
                    , flex: 1
                    , sortable: false
                    , hideable: true
                }]
                , bbar: {
                    xtype: 'pagingtoolbar'
                    , displayInfo: true
                    , itemId: 'pagingtoolbar'
                    , displayMsg: LS.__translate(LS.EntriesFromSToSAreShownTotalOfS)
                    , emptyMsg: LS.__translate(LS.NoEntriesToShow)
                }
            }
        ]}]
});