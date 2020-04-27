Ext4.define('VetmanagerApp.modules.graphic_reports.view.graphics.AllGoodSale', {
    extend: 'Ext4.panel.Panel'
    , xtype: 'all_good_sale'
    , border: false
    , autoScroll: true
    , style: {
        marginLeft: '3px'
    }
    , layout: {
        type: 'vbox'
        , align: 'stretch'
    }
    , requires: [

    ]
    , items: [
        {
            xtype: 'form'
            , border: false
            , items: [
                {
                    xtype: 'filter_date_buttons'
                }, {
                    xtype: 'filter_date_range'
                }, {
                    xtype: 'column_chart'
                    , name: 'all_good_sale'
                    , store: 'VetmanagerApp.modules.graphic_reports.store.AllGoodSale'
                    , axesCfg: [{
                        index: 1
                        , title: 'Дата'
                    }]
                }
            ]
        }
    ]
    , renderTotalField: function (total) {
        var bar = this.query('column_chart[name="all_good_sale"]')[0];

        Common.renderGraphicTotalField(bar.previousSibling(), total, 0, 10);
    }
});