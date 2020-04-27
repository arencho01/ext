Ext4.define('VetmanagerApp.modules.graphic_reports.controller.graphics.AllGoodSale', {
    extend: 'Ext4.app.Controller'
    , views: [
        'VetmanagerApp.modules.graphic_reports.view.graphics.AllGoodSale'
    ]
    , stores: [
        'VetmanagerApp.modules.graphic_reports.store.AllGoodSale'
    ]
    , mixins: [
        'VetmanagerApp.modules.graphic_reports.controller.graphics.basicFunctions'
    ]
    , refs: [
        {
            ref: 'graphic'
            , selector: 'all_good_sale'
            , autoCreate: true
            , xtype: 'all_good_sale'
        }, {
            ref: 'filterDateButtons'
            , selector: 'all_good_sale panel[name="filter_date_buttons"]'
            , autoCreate: true
        }, {
            ref: 'filterDateRange'
            , selector: 'all_good_sale panel[name="filter_date_range"]'
            , autoCreate: true
        }
    ]
    , init: function() {
        this.control({
            'all_good_sale button[action="date_filter"]': {
                click: this.updateGraphic
            }
            , 'all_good_sale datefield[name="date_from"]': {
                select: this.updateGraphic
                , keyup: this.enterDate
            }
            , 'all_good_sale datefield[name="date_to"]': {
                select: this.updateGraphic
                , keyup: this.enterDate
            }
            , 'all_good_sale button[action="clear_current_filter"]': {
                click: this.clearCurrentFilter
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
        return this.getGraphic().query('column_chart')[0];
    }
    , getFilterParams: function() {
        var dateRangePanel = this.getFilterDateRange()
            , buttonsPanel = this.getFilterDateButtons()
            , params = {}
            , dtFrom = dateRangePanel.query('[name="date_from"]')[0]
            , dtTo = dateRangePanel.query('[name="date_to"]')[0];

        if (!dtFrom.isValid() || !dtTo.isValid()) {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), 'Не верно указаны параметры даты');
            return false;
        }
        var pressed = buttonsPanel.queryBy(function (b) {
            return b.isXType("button") && b.pressed === true;
        });
        if (pressed[1]) {
            params.days_button = pressed[1].value;
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

        return Ext4.encode(params);
    }

});