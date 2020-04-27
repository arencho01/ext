Ext4.define('VetmanagerApp.modules.graphic_reports.controller.graphics.basicFunctions', {
    changeAxeTitle: true,
    clearCurrentFilter: function(btn) {
        if (btn.filter_name != null) {
            var panel = this.getGraphic();

            if (btn.filter_name.indexOf(',') != -1) {
                var names = btn.filter_name.split(',');
                for (var i = 0; i < names.length; i++) {
                    panel.query('[name="'+names[i]+'"]')[0].setValue(null);
                }
            } else {
                panel.query('[name="'+btn.filter_name+'"]')[0].clearValue();
            }

            this.updateGraphic();
        }
    }
    , enterDate: function(fld) {
        if (fld.isValid() && fld.getValue() != null && fld.getRawValue().length == 10) {
            this.updateGraphic();
        }
    }
    , getChart: function() {
        return null;
    }
    , getFilterParams: function() {
        return Ext4.encode({});
    }
    , getSelectedDateButton: function() {
        var buttons = this.getFilterDateButtons().getDockedItems()[0].items.items
            , btn = null;

        for(var i = 0, len = buttons.length; i < len; i++) {
            if (buttons[i].pressed == true) {
                btn = buttons[i];
                break;
            }
        }

        return (btn != null) ? btn.value : null;
    }
    , updateGraphic: function() {
        var filterParams = this.getFilterParams();

        if (!filterParams) {
            return;
        }

        var chart = this.getChart();

        this.myMask = new Ext4.LoadMask(chart.getEl(), { msg: LS.__translate(LS.PleaseWait) });
        this.myMask.show();

        chart.lastParams = {
            date_range: this.getSelectedDateButton()
            , filter_params: filterParams
        };
        chart.getStore().load({
            params: chart.lastParams
            , scope: this
            , callback: this.callbackLoadChart
        });
    }
    , callbackLoadChart: function(records, operation) {
        this.myMask.hide();
        var chart = this.getChart();

        if ('day' == operation.params.date_range && this.changeAxeTitle) {
            chart.axes.get(1).title = 'Время';
        } else {
//            chart.axes.get(1).title = 'Дата';
        }
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
    , changeMultiComboFilter: function(cmb) {
        if (cmb.isExpanded) {
            cmb.isChanged = true;
        }
    }
    , collapseMultiComboFilter: function(cmb) {
        if (cmb.isChanged) {
            this.updateGraphic();
        }
        cmb.isChanged = false;
    }
    , hideToolbar: function () {
        this.getFilterDateButtons().hide();
        if (this.getFilterDateRange) {
            this.getFilterDateRange().hide();
        }
    }
    , showToolbar: function () {
        this.getFilterDateButtons().show();
        if (this.getFilterDateRange) {
            this.getFilterDateRange().show();
        }
    }
    , getPrintLabel: function(){
        var params = Ext.decode(this.getFilterParams())
            , label = '';
        if (params.date_from == '' && params.date_to == '') {
            switch (params.days_button) {
                case 'day' :
                    label = 'За день';
                    break;
                case 'week'  :
                    label = 'За неделю';
                    break;
                case 'month' :
                    label = 'За месяц';
                    break;
                case 'year':
                    label = 'За год';
                    break;
            }
        } else {
            if (params.date_from) {
                label += 'С ' + params.date_from;
            }
            if (params.date_to) {
                label += ' По ' + params.date_to;
            }
        }
        if (params.doctor) {
            label += '. Доктор - ' + params.doctor;
        }
        if (params.pet_type_raw) {
            label += '. Тип питомца - ' + params.pet_type_raw;
        }
        return label;
    }
});