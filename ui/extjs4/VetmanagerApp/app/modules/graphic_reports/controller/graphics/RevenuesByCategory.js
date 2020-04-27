Ext4.define('VetmanagerApp.modules.graphic_reports.controller.graphics.RevenuesByCategory', {
    extend: 'Ext4.app.Controller'
    , views: [
        'VetmanagerApp.modules.graphic_reports.view.graphics.RevenuesByCategory'
    ]
    , stores: [
        'VetmanagerApp.modules.graphic_reports.store.RevenuesByCategory'
    ]
    , mixins: [
        'VetmanagerApp.modules.graphic_reports.controller.graphics.basicFunctions'
    ]
    , refs: [
        {
            ref: 'graphic'
            , selector: 'revenues_by_category'
            , autoCreate: true
            , xtype: 'revenues_by_category'
        }, {
            ref: 'filterDateButtons'
            , selector: 'revenues_by_category panel[name="filter_date_buttons"]'
            , autoCreate: true
        }, {
            ref: 'filterDateRange'
            , selector: 'revenues_by_category panel[name="filter_date_range"]'
            , autoCreate: true
        }, {
            ref: 'filterDoctors'
            , selector: 'revenues_by_category panel[name="filter_doctors"]'
            , autoCreate: true
        }
    ]
    , init: function() {
        this.control({
            'revenues_by_category button[action="date_filter"]': {
                click: this.updateGraphic
            }
            , 'revenues_by_category datefield[name="date_from"]': {
                select: this.updateGraphic
                , keyup: this.enterDate
            }
            , 'revenues_by_category datefield[name="date_to"]': {
                select: this.updateGraphic
                , keyup: this.enterDate
            }
            , 'revenues_by_category combo[name="doctor_id"]': {
                select: this.updateGraphic
            }
            , 'revenues_by_category button[action="clear_current_filter"]': {
                click: this.clearCurrentFilter
            }
            , 'revenues_by_category' : {
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
    , getFilterParams: function() {
        var dateRangePanel = this.getFilterDateRange()
            , doctorsPanel = this.getFilterDoctors()
            , buttonsPanel = this.getFilterDateButtons()
            , params = {}
            , dtFrom = dateRangePanel.query('[name="date_from"]')[0]
            , dtTo = dateRangePanel.query('[name="date_to"]')[0];

        if (!dtFrom.isValid() || !dtTo.isValid()) {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), 'Не верно указаны параметры даты');
            return false;
        }

        params.date_from = dtFrom.getValue();
        params.date_to = dtTo.getValue();

        if (params.date_from != null) {
            params.date_from = params.date_from.format('Y-m-d');
            buttonsPanel.hide();
        } else {
            params.date_from = '';
        }
        if (params.date_to != null) {
            buttonsPanel.hide();
            params.date_to = params.date_to.format('Y-m-d');
        } else {
            params.date_to = '';
        }

        if (params.date_from == '' && params.date_to == '') {
            buttonsPanel.show();
        }
        var doctorPanel = doctorsPanel.query('[name="doctor_id"]')[0];
        params.doctor_id = doctorPanel.getValue() * 1;
        params.doctor = doctorPanel.getRawValue();
        return Ext4.encode(params);
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