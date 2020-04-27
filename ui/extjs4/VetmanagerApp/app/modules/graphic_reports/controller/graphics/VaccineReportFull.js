Ext4.define('VetmanagerApp.modules.graphic_reports.controller.graphics.VaccineReportFull', {
    extend: 'Ext4.app.Controller'
    , views: [
        'VetmanagerApp.modules.graphic_reports.view.graphics.VaccineReportFull'
    ]
    , stores: [
        'VetmanagerApp.modules.graphic_reports.store.VaccineReportFull'
    ]
    , mixins: [
        'VetmanagerApp.modules.graphic_reports.controller.graphics.basicFunctions'
    ]
    , refs: [
        {
            ref: 'graphic'
            , selector: 'vaccine_grid_report'
            , autoCreate: true
            , xtype: 'vaccine_grid_report'
        }, {
            ref: 'filterDateButtons'
            , selector: 'vaccine_grid_report panel[name="filter_date_buttons"]'
            , autoCreate: true
        }, {
            ref: 'filterDateRange'
            , selector: 'vaccine_grid_report panel[name="filter_date_range"]'
            , autoCreate: true
        }
    ]
    , init: function() {
        this.control({
            'vaccine_grid_report button[action="date_filter"]': {
                click: this.updateGraphic
            }
            , 'vaccine_grid_report datefield[name="date_from"]': {
                select: this.updateGraphic
                , keyup: this.enterDate
            }
            , 'vaccine_grid_report datefield[name="date_to"]': {
                select: this.updateGraphic
                , keyup: this.enterDate
            }
            , 'vaccine_grid_report button[action="excel-export"]': {
                click: this.excelExport
            }
            , 'vaccine_grid_report button[action="clear_current_filter"]': {
                click: this.clearCurrentFilter
            }
        });
    }
    , excelExport: function(btn) {
        Ext4.ux.ExcelExport(btn.up('grid'));
    }
    , getChart: function() {
        return this.getGraphic().query('vaccine-grid-report')[0];
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
    , updateGraphic: function() {
        var chart = this.getChart();

        chart.lastParams = {
            date_range: this.getSelectedDateButton()
            , filter_params: this.getFilterParams()
        };
        chart.getStore().load({
            params: chart.lastParams
        });
    }
});