Ext4.define('VetmanagerApp.modules.graphic_reports.view.graphics.PetTypes', {
    extend: 'Ext4.panel.Panel'
    , xtype: 'pet_types'
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
                    xtype: 'pie_chart'
                    , name: 'all_good_sale'
                    , store: 'VetmanagerApp.modules.graphic_reports.store.PetTypes'
                }
            ]
        }
    ]
    , renderTotalField: function (total) {
        var bar = this.query('pie_chart[name="all_good_sale"]')[0];

        Common.renderGraphicTotalField(bar.previousSibling(), total, 0, 10);
    }
});