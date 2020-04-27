Ext4.define('VetmanagerApp.modules.graphic_reports.view.filters.Doctors', {
    extend: 'Ext4.form.Panel'
    , xtype: 'filter_doctors'
    , height: 50
    , name: 'filter_doctors'
    , border: false
    , buttonAlign: 'center'
    , padding: '5px'
    , layout: 'column'
    , multiSelect: false
    , initComponent: function() {
        var me = this;
        me.items[0].multiSelect = !!me.multiSelect;
        me.callParent();
    }
    , items: [
        {
            xtype: 'combo'
            , allowBlank: true
            , name: 'doctor_id'
            , fieldLabel: LS.__translate(LS.Doctor)
            , labelAlign: 'right'
            , valueField: 'id'
            , displayField: 'title'
            , queryMode: 'remote'
            , minChars: 2
            , triggerAction: 'all'
            , enableKeyEvents: true
            , labelWidth: 60
            , listConfig: {
                width: 200
            }
            , style: {
                marginRight: '5px'
            }
            , store: {
                xtype: 'store'
                , fields: ['id', 'title']
                , autoLoad: true
                , proxy: {
                    type: 'ajax'
                    , url: 'ajax_get_doctors_by_calendar.php?is_calc_percent=1&is_active=1'
                    , reader: {
                        type: 'json'
                        , root: 'data'
                    }
                }
            }
        }, {
            xtype: 'button'
            , icon: 'ui/resources/images_new/delete.svg'
            , cls: '-ext4-clear-filter-item-button-'
            , tooltip: 'Очистить фильтр'
            , filter_name: 'doctor_id'
            , action: 'clear_current_filter'
        }
    ]
});