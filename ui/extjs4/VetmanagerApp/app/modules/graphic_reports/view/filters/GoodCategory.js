Ext4.define('VetmanagerApp.modules.graphic_reports.view.filters.GoodCategory', {
    extend: 'Ext4.form.Panel'
    , xtype: 'filter_good_category'
    , height: 50
    , name: 'filter_good_category'
    , border: false
    , buttonAlign: 'center'
    , padding: '5px'
    , layout: 'column'
    , items: [
        {
            xtype: 'combo'
            , fieldLabel: LS.__translate(LS.ByCategory)
            , labelAlign: 'right'
            , triggerAction: 'all'
            , name: 'good_cat'
            , valueField: 'id'
            , displayField: 'title'
            , multiSelect: true
            , mode: 'remote'
            , minChars: 2
            , allowBlank: true
            , labelWidth: 110
            , style: {
                marginRight: '5px'
            }
            , store: {
                xtype: 'store'
                , fields: ['id', 'title']
                , autoLoad: true
                , proxy: {
                    type: 'ajax'
                    , url: 'ajax_goodcatsforsalary.php?cmd=get_grid&start=0&limit=9999'
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
            , filter_name: 'good_cat'
            , action: 'clear_current_filter'
        }
    ]
});