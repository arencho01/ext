Ext4.define('VetmanagerApp.modules.graphic_reports.controller.graphics.GoodsGrid', {
    extend: 'Ext4.app.Controller'
    , views: [
        'VetmanagerApp.modules.graphic_reports.view.graphics.GoodsGrid'
    ]
    , stores: [
        'VetmanagerApp.modules.graphic_reports.store.GoodsGrid'
    ]
    , mixins: [
        'VetmanagerApp.modules.graphic_reports.controller.graphics.basicFunctions'
    ]
    , refs: [
        {
            ref: 'graphic'
            , selector: 'saled_good_report'
            , autoCreate: true
            , xtype: 'saled_good_report'
        }, {
            ref: 'filterDateButtons'
            , selector: 'saled_good_report panel[name="filter_date_buttons"]'
            , autoCreate: true
        }, {
            ref: 'filterDateRange'
            , selector: 'saled_good_report panel[name="filter_date_range"]'
            , autoCreate: true
        }, {
            ref: 'filterGoodType'
            , selector: 'saled_good_report panel[name="filter_good_type"]'
            , autoCreate: true
        }, {
            ref: 'filterGoodGroup'
            , selector: 'saled_good_report panel[name="filter_good_group"]'
            , autoCreate: true
        }, {
            ref: 'filterGoodCategory'
            , selector: 'saled_good_report panel[name="filter_good_category"]'
            , autoCreate: true
        }, {
            ref: 'filterDoctors'
            , selector: 'saled_good_report panel[name="filter_doctors"]'
            , autoCreate: true
        }
    ]
    , init: function() {
        this.control({
            'saled_good_report button[action="date_filter"]': {
                click: this.updateGraphic
            }
            , 'saled_good_report datefield[name="date_from"]': {
                select: this.updateGraphic
                , keyup: this.enterDate
            }
            , 'saled_good_report datefield[name="date_to"]': {
                select: this.updateGraphic
                , keyup: this.enterDate
            }
            , 'saled_good_report combo[name="doctor_id"]': {
                select: this.updateGraphic
            }
            , 'saled_good_report combo[name="good_type"]': {
                select: this.updateGraphic
            }
            , 'saled_good_report combo[name="good_group"]': {
                select: this.updateGraphic
            }
            , 'saled_good_report combo[name="good_cat"]': {
                select: this.updateGraphic
            }
            , 'saled_good_report button[action="excel-export"]': {
                click: this.excelExport
            }
            , 'saled_good_report button[action="clear_current_filter"]': {
                click: this.clearCurrentFilter
            }
        });
    }
    , hideToolbar: function () {
        this.getFilterDateButtons().hide();
        this.getFilterDateRange().hide();
        this.getFilterGoodType().hide();
        this.getFilterGoodGroup().hide();
        this.getFilterGoodCategory().hide();
        this.getFilterDoctors().hide();
    }
    , showToolbar: function () {
        this.getFilterDateButtons().show();
        this.getFilterDateRange().show();
        this.getFilterGoodType().show();
        this.getFilterGoodGroup().show();
        this.getFilterGoodCategory().show();
        this.getFilterDoctors().show();
    }
    , excelExport: function(btn) {
        Ext4.ux.ExcelExport(btn.up('grid'));
    }
    , getChart: function() {
        return this.getGraphic().query('grid-with-export')[0];
    }
    , getFilterParams: function() {
        var dateRangePanel = this.getFilterDateRange()
            , doctorsPanel = this.getFilterDoctors()
            , goodTypePanel = this.getFilterGoodType()
            , goodGroupPanel = this.getFilterGoodGroup()
            , goodCategoryPanel = this.getFilterGoodCategory()
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

        params.doctor_id = doctorsPanel.query('[name="doctor_id"]')[0].getValue() * 1;
        params.good_type = goodTypePanel.query('[name="good_type"]')[0].getValue();
        params.good_group = goodGroupPanel.query('[name="good_group"]')[0].getValue();
        params.good_cat = goodCategoryPanel.query('[name="good_cat"]')[0].getValue();

        return Ext4.encode(params);
    }
    , updateGraphic: function() {
        var chart = this.getChart()
            , store = chart.getStore()
            , proxy = store.getProxy();

        proxy.setExtraParam('date_range', this.getSelectedDateButton());
        proxy.setExtraParam('filter_params', this.getFilterParams());

        chart.getStore().loadPage(1);
    }
});