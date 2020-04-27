Ext4.define('VetmanagerApp.modules.extfilter.model.ExtFilterOperator', {
    extend: 'Ext.data.Model'
    , fields: [
        'id'
        , 'title'
        , 'need_value'
        , 'multi_value'
        , 'field_types'
    ]
    , proxy: {
        type: 'ajax'
        , url : 'ajax_ext_filters.php'
        , extraParams: {cmd: 'get_operators_by_field_type', type: '*'}
        , reader: {
            type: 'json'
            , root: 'data'
            , totalProperty: 'total'
            , idProperty: 'id'
        }
    }
});