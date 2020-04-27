Ext4.define('VetmanagerApp.modules.graphic_reports.controller.graphics.SickRegisteredPetsJournal', {
    extend: 'Ext4.app.Controller'
    , views: [
        'VetmanagerApp.modules.graphic_reports.view.graphics.SickRegisteredPetsJournal'
    ]
    , stores: [
        'VetmanagerApp.modules.graphic_reports.store.SickRegisteredPetsJournal'
    ]
    , mixins: [
        'VetmanagerApp.modules.graphic_reports.controller.graphics.basicFunctions'
    ]
    , refs: [
        {
            ref: 'graphic'
            , selector: 'sick_registered_pets_journal'
            , autoCreate: true
            , xtype: 'sick_registered_pets_journal'
        }, {
            ref: 'filterDateButtons'
            , selector: 'sick_registered_pets_journal panel[name="filter_date_buttons"]'
            , autoCreate: true
        }, {
            ref: 'filterDateRange'
            , selector: 'sick_registered_pets_journal panel[name="filter_date_range"]'
            , autoCreate: true
        }
    ]
    , init: function() {
        this.control({
            'sick_registered_pets_journal button[action="date_filter"]': {
                click: this.updateGraphic
            }
            , 'sick_registered_pets_journal datefield[name="date_from"]': {
                select: this.updateGraphic
                , keyup: this.enterDate
            }
            , 'sick_registered_pets_journal datefield[name="date_to"]': {
                select: this.updateGraphic
                , keyup: this.enterDate
            }
            , 'sick_registered_pets_journal button[action="excel-export"]': {
                click: this.excelExport
            }
            , 'sick_registered_pets_journal button[action="clear_current_filter"]': {
                click: this.clearCurrentFilter
            }
        });
    }
    , excelExport: function(btn) {
        Ext4.ux.ExcelExport(btn.up('grid'));
    }
    , getChart: function() {
        return this.getGraphic().query('grid-with-export')[0];
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
        var store = this.getChart().getStore()
            , proxy = store.getProxy();

        proxy.setExtraParam('date_range', this.getSelectedDateButton());
        proxy.setExtraParam('filter_params', this.getFilterParams());

        store.loadPage(1);
    }
});