Ext4.define('VetmanagerApp.modules.graphic_reports.view.graphics.GoodsGrid', {
    extend: 'Ext4.form.Panel'
    , xtype: 'saled_good_report'
    , border: false
    , style: {
        marginLeft: '3px'
    }
    , layout: {
        type: 'vbox'
        , align : 'stretch'
        , pack  : 'start'
    }
    , requires: [

    ]
    , items: [
        {
            xtype: 'filter_date_buttons'
        }
        , {
            xtype: 'panel'
            , padding: '0px'
            , border: false
            , layout: {
                type: 'hbox'
                , align: 'stretch'
            }
            , items: [
                {
                    xtype: 'panel'
                    , border: false
                    , width: 110
                }, {
                     xtype: 'filter_date_range'
                    , onlyItems: true
                    , border: false
                    , width: 500
                }, {
                    xtype: 'filter_doctors'
                    , border: false
                    , flex: 1
                }
            ]
        }
        , {
            xtype: 'panel'
            , padding: '0px'
            , border: false
            , layout: {
                type: 'hbox'
                , align: 'stretch'
            }
            , items: [
                {
                    xtype: 'panel'
                    , border: false
                    , width: 50
                }, {
                    xtype: 'filter_good_group'
                    , border: false
                    , flex: 3
                }, {
                    xtype: 'filter_good_category'
                    , border: false
                    , flex: 2
                }, {
                    xtype: 'filter_good_type'
                    , border: false
                    , flex: 2
                }
            ]
        }
        , {
            xtype: 'panel'
            , flex: 2
            , layout: 'fit'
            , border: false
            , items: [{
                    xtype: 'grid-with-export'
                    , remote_export: true
                    , store: 'VetmanagerApp.modules.graphic_reports.store.GoodsGrid'
                    , dockedItems: [{
                        xtype: 'pagingtoolbar'
                        , store: 'VetmanagerApp.modules.graphic_reports.store.GoodsGrid'
                        , dock: 'bottom'
                        , displayInfo: true
                    }]
                    , columns: [
                        {
                            header: LS.__translate(LS.Goodsservice)
                            , dataIndex: 'good_title'
                            , flex: 2
                            , sortable: false
                            , hideable: false
                        }
                        , {
                            header: LS.__translate(LS.Type2)
                            , dataIndex: 'good_type'
                            , flex: 1
                            , sortable: false
                            , hideable: false
                        }
                        , {
                            header: LS.__translate(LS.Group)
                            , dataIndex: 'good_group'
                            , flex: 1
                            , sortable: false
                            , hideable: false
                        }
                        , {
                            header: LS.__translate(LS.Category)
                            , dataIndex: 'good_category'
                            , flex: 1
                            , sortable: false
                            , hideable: false
                        }
                        , {
                            header: LS.__translate(LS.UnitOfMeasurement)
                            , dataIndex: 'unit_title'
                            , flex: 1
                            , sortable: false
                            , hideable: false
                        }
                        , {
                            header: LS.__translate(LS.Quantity)
                            , dataIndex: 'good_qty'
                            , flex: 1
                            , sortable: false
                            , hideable: false
                        }
                        , {
                            header: LS.__translate(LS.Doctor)
                            , dataIndex: 'invoice_doctor'
                            , flex: 1
                            , sortable: false
                            , hideable: false
                        }
                        , {
                            header: LS.__translate(LS.Amount)
                            , dataIndex: 'invoice_amount_sum'
                            , flex: 1
                            , sortable: false
                            , hideable: false
                        }
                        , {
                            header: LS.__translate(LS.Invoices)
                            , dataIndex: 'invoice_ids'
                            , flex: 1
                            , sortable: false
                            , hideable: false
                        }
                    ]
                }]
        }
    ]
});