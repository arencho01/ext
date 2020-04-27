Ext4.define('VetmanagerApp.modules.graphic_reports.view.graphics.ClientActivity', {
    extend: 'Ext4.panel.Panel'
    , xtype: 'client_activity'
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
                    xtype: 'grouped_bar'
                    , name: 'grouped_client_activity'
                    , store: 'VetmanagerApp.modules.graphic_reports.store.ClientActivity'
                }
            ]
        }
    ]
    , renderTotalField: function (total) {
        var bar = this.query('grouped_bar[name="grouped_client_activity"]')[0];

        Common.renderGraphicTotalField(bar.previousSibling(), total, 0, 10);
    }
});