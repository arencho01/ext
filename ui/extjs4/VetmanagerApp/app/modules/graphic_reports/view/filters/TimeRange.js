Ext4.define('VetmanagerApp.modules.graphic_reports.view.filters.TimeRange', {
    extend: 'Ext4.form.Panel'
    , xtype: 'filter_time_range'
    , height: 50
    , name: 'filter_time_range'
    , border: false
    , buttonAlign: 'center'
    , padding: '5px'
    , layout: 'column'
    , frame: false
    , onlyItems: false
    , valueFrom: undefined
    , valueTo: undefined
    , text: LS.__translate(LS.Day)
    , minValue: undefined
    , maxValue: undefined
    , initComponent: function() {
        this.callParent();

        if (this.onlyItems) {
            this.add([
                this.getDateFrom()
                , this.getDateTo()
            ]);
        } else {
            this.add([
                this.getSubpanel()
                , this.getDateFrom()
                , this.getDateTo()
            ]);
        }
        if(Ext4.isDefined(this.minValue)) {
            this.setMinValue(this.minValue);
        }
        if(Ext4.isDefined(this.maxValue)) {
            this.setMaxValue(this.maxValue);
        }
    }
    , getSubpanel: function() {
        return {
            xtype: 'panel'
            , width: 200
            , height: 30
            , border: false
        };
    }
    , getDateFrom: function() {
        return {
            xtype: 'timefield'
            , fieldLabel: this.text + ' ' + (LS.__translate(LS.Begining)).toLowerCase()
            , labelAlign: 'right'
            , name: 'time_from'
            , enableKeyEvents: true
            , labelWidth: (this.onlyItems) ? 60 : 120
            , format: 'H:i'
            , value: this.valueFrom
            , increment: 60
            , maxValue: this.valueTo
            , editable: false
            , listeners: {
                scope: this
                , select: this.onSelectFrom
            }
        };
    }
    , getDateTo: function() {
        return {
            xtype: 'timefield'
            , fieldLabel: (LS.__translate(LS.Termination)).toLowerCase()
            , labelAlign: 'right'
            , enableKeyEvents: true
            , name: 'time_to'
            , labelWidth: (this.onlyItems) ? 65 : 100
            , format: 'H:i'
            , value: this.valueTo
            , increment: 60
            , minValue: this.valueFrom
            , editable: false
            , style: {
                marginRight: '5px'
                , marginLeft: '5px'
            }
            , listeners: {
                scope: this
                , select: this.onSelectTo
            }
        };
    }
    , getButton: function() {
        return {
            xtype: 'button'
            , icon: 'ui/resources/images_new/delete.svg'
            , cls: '-ext4-clear-filter-item-button-'
            , tooltip: LS.__translate(LS.CleanFilter)
            , filter_name: 'date_from,date_to'
            , action: 'clear_current_filter'
        };
    }
    , onSelectFrom: function() {
        var a = this.query('[name="time_from"]')[0]
            , b = this.query('[name="time_to"]')[0];
        b.setMinValue(a.getValue());
    }
    , onSelectTo: function() {
        var a = this.query('[name="time_from"]')[0]
            , b = this.query('[name="time_to"]')[0];
        a.setMaxValue(b.getValue());
    }
    , setMinValue: function(value) {
        var a = this.query('[name="time_from"]')[0]
            , b = this.query('[name="time_to"]')[0];

        a.setMinValue(value);
        b.setMinValue(a.getValue());
    }
    , setMaxValue: function(value) {
        var a = this.query('[name="time_from"]')[0]
            , b = this.query('[name="time_to"]')[0];

        b.setMaxValue(value);
        a.setMaxValue(b.getValue());
    }
});