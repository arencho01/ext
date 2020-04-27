Ext4.define('VetmanagerApp.modules.graphic_reports.controller.graphics.DirectedTimes', {
    extend: 'Ext4.app.Controller'
    , changeAxeTitle: false
    , views: [
        'VetmanagerApp.modules.graphic_reports.view.graphics.DirectedTimes'
    ]
    , stores: [
        'VetmanagerApp.modules.graphic_reports.store.DirectedTimesByAdmissionType',
        'VetmanagerApp.modules.graphic_reports.store.DirectedTimesByDayTimes',
        'VetmanagerApp.modules.graphic_reports.store.DirectedTimesByDoctors'
    ]
    , mixins: [
        'VetmanagerApp.modules.graphic_reports.controller.graphics.basicFunctions'
    ]
    , refs: [
        {
            ref: 'graphic'
            , selector: 'directed_times'
            , autoCreate: true
            , xtype: 'directed_times'
        }, {
            ref: 'filterDateButtons'
            , selector: 'directed_times panel[name="filter_date_buttons"]'
            , autoCreate: true
        }, {
            ref: 'filterDateRange'
            , selector: 'directed_times panel[name="filter_date_range"]'
            , autoCreate: true
        }, {
            ref: 'filterAdmissionTypes'
            , selector: 'directed_times panel[name="filter_admission_types"]'
            , autoCreate: true
        }, {
            ref: 'filterDoctors'
            , selector: 'directed_times panel[name="filter_doctors"]'
            , autoCreate: true
        }, {
            ref: 'morningRange'
            , selector: 'directed_times panel[name="morning_range"]'
            , autoCreate: true
        }, {
            ref: 'dayRange'
            , selector: 'directed_times panel[name="day_range"]'
            , autoCreate: true
        }, {
            ref: 'eveningRange'
            , selector: 'directed_times panel[name="evening_range"]'
            , autoCreate: true
        }
    ]
    , hideToolbar: function () {
        this.getFilterDateButtons().hide();
        this.getFilterDateRange().hide();
        this.getFilterAdmissionTypes().hide();
        this.getFilterDoctors().hide();
        this.getMorningRange().hide();
        this.getDayRange().hide();
        this.getEveningRange().hide();
    }
    , showToolbar: function () {
        this.getFilterDateButtons().show();
        this.getFilterDateRange().show();
        this.getFilterAdmissionTypes().show();
        this.getFilterDoctors().show();
        this.getMorningRange().show();
        this.getDayRange().show();
        this.getEveningRange().show();
    }
    , init: function() {
        this.control({
            'directed_times button[action="date_filter"]': {
                click: this.updateGraphic
            }
            , 'directed_times datefield[name="date_from"]': {
                select: this.updateGraphic
                , keyup: this.enterDate
            }
            , 'directed_times datefield[name="date_to"]': {
                select: this.updateGraphic
                , keyup: this.enterDate
            }
            , 'directed_times combo[name="doctor_id"]': {
                change: this.changeMultiComboFilter
                , collapse: this.collapseMultiComboFilter
            }
            , 'directed_times combo[name="admission_type_id"]': {
                change: this.changeMultiComboFilter
                , collapse: this.collapseMultiComboFilter
            }
            , 'directed_times button[action="clear_current_filter"]': {
                click: this.clearCurrentFilter
            }
            , 'directed_times tabpanel': {
                tabchange: this.changeTab
                , afterrender: this.updateGraphic
            }
            , 'directed_times timefield': {
                select: this.onChangeTime
            }
        });
    }
    , getChart: function() {
        return this.getGraphic().query('tabpanel')[0].getActiveTab();
    }
    , changeTab: function(t) {
        var index = t.items.indexOf(t.getActiveTab());
        this.getMorningRange().setVisible(index == 1);
        this.getDayRange().setVisible(index == 1);
        this.getEveningRange().setVisible(index == 1);
        this.updateGraphic();
    }
    , getFilterParams: function() {
        var dateRangePanel = this.getFilterDateRange()
            , buttonsPanel = this.getFilterDateButtons()
            , admissionsPanel = this.getFilterAdmissionTypes()
            , doctorsPanel = this.getFilterDoctors()
            , params = {}
            , dtFrom = dateRangePanel.query('[name="date_from"]')[0]
            , dtTo = dateRangePanel.query('[name="date_to"]')[0]
            , morningRange = this.getMorningRange()
            , dayRange = this.getDayRange()
            , eveningRange = this.getEveningRange();

        if (!dtFrom.isValid() || !dtTo.isValid()) {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), 'Не верно указаны параметры даты');
            return false;
        }
        if (!morningRange.form.isValid() || !dayRange.form.isValid() || !eveningRange.form.isValid()) {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), 'Не верно указаны параметры периодов');
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

        params.doctors = doctorsPanel.query('[name="doctor_id"]')[0].getValue();
        params.admission_types = admissionsPanel.query('[name="admission_type_id"]')[0].getValue();
        params.morning_from = morningRange.query('[name="time_from"]')[0].getValue().getHours();
        params.morning_to = morningRange.query('[name="time_to"]')[0].getValue().getHours();
        params.day_from = dayRange.query('[name="time_from"]')[0].getValue().getHours();
        params.day_to = dayRange.query('[name="time_to"]')[0].getValue().getHours();
        params.evening_from = eveningRange.query('[name="time_from"]')[0].getValue().getHours();
        params.evening_to = eveningRange.query('[name="time_to"]')[0].getValue().getHours();

        return Ext4.encode(params);
    }
    , onChangeTime: function(fld) {
        var part = fld.ownerCt.name.split('_')[0]
            , name = (fld.name == 'time_from') ? 'From' : 'To'
            , value = fld.getValue().format('H:i');
        GlobalConf.set('directedTimesGraphic', part + 'Value' + name, value);
        if (part == 'morning' && name == 'To') {
            this.getDayRange().setMinValue(value);
        } else if (part == 'day' && name == 'From') {
            this.getMorningRange().setMaxValue(value);
        } else if (part == 'day' && name == 'To') {
            this.getEveningRange().setMinValue(value);
        } else if (part == 'evening' && name == 'From') {
            this.getDayRange().setMaxValue(value);
        }
        this.updateGraphic();
    }
});