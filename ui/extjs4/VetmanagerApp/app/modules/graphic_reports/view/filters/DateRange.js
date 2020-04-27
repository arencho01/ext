Ext4.define('VetmanagerApp.modules.graphic_reports.view.filters.DateRange', {
    extend: 'Ext4.form.Panel'
    , xtype: 'filter_date_range'
    , height: 50
    , name: 'filter_date_range'
    , border: false
    , buttonAlign: 'center'
    , padding: '5px'
    , layout: 'column'
    , frame: false
    , onlyItems: false
    , initComponent: function() {
        this.callParent();

        if (this.onlyItems) {
            this.add([
                this.getDateFrom()
                , this.getDateTo()
                , this.getButton()
            ]);
        } else {
            this.add([
                this.getSubpanel()
                , this.getDateFrom()
                , this.getDateTo()
                , this.getButton()
            ]);
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
            xtype: 'datefield'
            , fieldLabel: LS.__translate(LS.DateFrom)
            , labelAlign: 'right'
            , name: 'date_from'
            , enableKeyEvents: true
            , format: 'd.m.Y'
            , labelWidth: (this.onlyItems) ? 60 : 100
        };
    }
    , getDateTo: function() {
        return {
            xtype: 'datefield'
            , fieldLabel: LS.__translate(LS.DateTo)
            , labelAlign: 'right'
            , enableKeyEvents: true
            , format: 'd.m.Y'
            , name: 'date_to'
            , labelWidth: (this.onlyItems) ? 65 : 100
            , style: {
                marginRight: '5px'
                , marginLeft: '5px'
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
});