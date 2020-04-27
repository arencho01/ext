Ext4.define('VetmanagerApp.modules.graphic_reports.view.filters.PetType', {
    extend: 'Ext4.form.Panel'
    , xtype: 'filter_pet_type'
    , height: 50
    , name: 'filter_pet_type'
    , border: false
    , buttonAlign: 'center'
    , padding: '5px'
    , layout: 'column'
    , items: [
        {
            xtype: 'combo'
            , allowBlank: true
            , name: 'pet_type'
            , fieldLabel: LS.__translate(LS.TypeOfThePet)
            , labelAlign: 'right'
            , valueField: 'id'
            , displayField: 'title'
            , queryMode: 'remote'
            , minChars: 2
            , labelWidth: 101
            , style: {
                marginRight: '5px'
            }
            , store: {
                xtype: 'store'
                , fields: ['id', 'title']
                , autoLoad: true
                , proxy: {
                    type: 'ajax'
                    , url: 'ajax_get_pet_types.php?no_limit=1'
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
            , filter_name: 'pet_type'
            , action: 'clear_current_filter'
        }
    ]
});