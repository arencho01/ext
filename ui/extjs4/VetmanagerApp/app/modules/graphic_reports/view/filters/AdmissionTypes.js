Ext4.define('VetmanagerApp.modules.graphic_reports.view.filters.AdmissionTypes', {
    extend: 'Ext4.form.Panel'
    , xtype: 'filter_admission_types'
    , height: 50
    , name: 'filter_admission_types'
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
            , name: 'admission_type_id'
            , fieldLabel: LS.__translate(LS.ReceptionType)
            , labelAlign: 'right'
            , valueField: 'id'
            , displayField: 'title'
            , queryMode: 'remote'
            , minChars: 2
            , triggerAction: 'all'
            , enableKeyEvents: true
            , labelWidth: 100
            , listConfig: {
                width: 200
            }
            , style: {
                marginRight: '5px'
            }
            , store: {
                xtype: 'store'
                , fields: ['id', 'title']
                , autoLoad: false
                , proxy: {
                    type: 'ajax'
                    , url: 'ajax_calendar.php?cmd=get_admission_types'
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
            , filter_name: 'admission_type_id'
            , action: 'clear_current_filter'
        }
    ]
});