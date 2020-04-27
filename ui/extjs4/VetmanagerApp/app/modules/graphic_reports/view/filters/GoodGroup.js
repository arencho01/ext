Ext4.define('VetmanagerApp.modules.graphic_reports.view.filters.GoodGroup', {
    extend: 'Ext4.form.Panel'
    , xtype: 'filter_good_group'
    , height: 50
    , name: 'filter_good_group'
    , border: false
    , buttonAlign: 'center'
    , padding: '5px'
    , layout: 'column'
    , items: [
        {
            xtype: 'combo'
            , fieldLabel: LS.__translate(LS.ByGroupOfGoodsServices)
            , labelAlign: 'right'
            , triggerAction: 'all'
            , name: 'good_group'
            , valueField: 'id'
            , displayField: 'title'
            , multiSelect: true
            , mode: 'remote'
            , minChars: 2
            , allowBlank: true
            , labelWidth: 200
            , style: {
                marginRight: '5px'
            }
            , listConfig: {
                minWidth: 250
            }
            , store: {
                xtype: 'store'
                , fields: ['id', 'title']
                , autoLoad: true
                , proxy: {
                    type: 'ajax'
                    , extraParams: {
                        page: 1
                        , start: 0
                        , limit: 9999
                    }
                    , url: 'ajax_good_groups.php?cmd=get_grid'
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
            , filter_name: 'good_group'
            , action: 'clear_current_filter'
        }
    ]
});