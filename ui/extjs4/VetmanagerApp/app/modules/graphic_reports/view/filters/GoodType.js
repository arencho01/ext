Ext4.define('VetmanagerApp.modules.graphic_reports.view.filters.GoodType', {
    extend: 'Ext4.form.Panel'
    , xtype: 'filter_good_type'
    , height: 50
    , name: 'filter_good_type'
    , border: false
    , buttonAlign: 'center'
    , padding: '5px'
    , layout: 'column'
    , items: [
        {
            xtype: 'combo'
            , fieldLabel: LS.__translate(LS.ByType)
            , labelAlign: 'right'
            , triggerAction: 'all'
            , name: 'good_type'
            , valueField: 'id'
            , displayField: 'title'
            , mode: 'local'
            , minChars: 2
            , allowBlank: true
            , labelWidth: 70
            , width: 160
            , style: {
                marginRight: '5px'
            }
            , store: {
                xtype: 'store'
                , fields: ['id', 'title']
                , data: [
                    { id: 'good', title: LS.__translate(LS.Good) }
                    , { id: 'service', title: 'Услуга' }
                ]
            }
        }
        , {
            xtype: 'button'
            , icon: 'ui/resources/images_new/delete.svg'
            , cls: '-ext4-clear-filter-item-button-'
            , tooltip: 'Очистить фильтр'
            , filter_name: 'good_type'
            , action: 'clear_current_filter'
        }
    ]
});