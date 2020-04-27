Ext4.define('VetmanagerApp.modules.graphic_reports.controller.graphics.PetTypes', {
    extend: 'Ext4.app.Controller'
    , views: [
        'VetmanagerApp.modules.graphic_reports.view.graphics.PetTypes'
    ]
    , stores: [
        'VetmanagerApp.modules.graphic_reports.store.PetTypes'
    ]
    , mixins: [
        'VetmanagerApp.modules.graphic_reports.controller.graphics.basicFunctions'
    ]
    , refs: [
        {
            ref: 'graphic'
            , selector: 'pet_types'
            , autoCreate: true
            , xtype: 'pet_types'
        }, {
            ref: 'filterDateButtons'
            , selector: 'pet_types panel[name="filter_date_buttons"]'
            , autoCreate: true
        }
    ]
    , init: function() {
        this.control({
            'pet_types button[action="date_filter"]': {
                click: this.updateGraphic
            }
            , 'pet_types datefield[name="date_from"]': {
                select: this.updateGraphic
                , keyup: this.enterDate
            }
            , 'pet_types datefield[name="date_to"]': {
                select: this.updateGraphic
                , keyup: this.enterDate
            }
            , 'pet_types' : {
                afterrender: this.updateGraphic
            }
        });

        var store = this.getStore(this.stores[0]),
            view = this.getGraphic();

        store.on('load', function (a, rows) {
            if (rows.length > 0 && typeof rows[0].get('total_field') != 'undefined') {
                view.renderTotalField(rows[0].get('total_field'));
            } else {
                view.renderTotalField(0);
            }
        }, this);
    }
    , getChart: function() {
        return this.getGraphic().query('pie_chart')[0];
    }
    , callbackLoadChart: function(records, operation) {
        this.myMask.hide();
        var chart = this.getChart();

        chart.redraw();

        if (records == null) { return; }

        var arr = {};

        if (chart.series.items != null && chart.series.items.lengthl > 0) {
            Ext4.each(chart.series.items[0].items, function(item, n) {
                var is_show = item.storeItem.get('is_show');
                if (is_show != null) {
                    arr[n] = is_show;
                } else {
                    arr[n] = null;
                }
            });
        }

        Ext4.each(chart.legend.items, function(item, n) {
            if (arr[n] != null && arr[n] == true) {
                item.unpress();
            } else if (arr[n] != null) {
                item.press();
            }
        });

        var data = Ext4.decode(operation.response.responseText);

        if (data.maximum != 0) {
            chart.axes.get(0).maximum = data.maximum;
            chart.redraw();
        }
    }
});