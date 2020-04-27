Ext4.define('VetmanagerApp.modules.extfilter.model.ExtFilterField', {
    extend: 'Ext.data.Model'
    , fields: [
        'id'
        , 'title'
        , 'table_name'
        , 'field_name'
        , 'field_type'
        , 'single_type'
        , 'module_name'
        , 'join_field_id'
        , 'join_table_name'
        , 'join_module_name'
    ]
    , proxy: {
        type: 'ajax'
        , url : 'ajax_ext_filters.php'
        , extraParams: {cmd: 'get_fields_by_module', module: '*'}
        , reader: {
            type: 'json'
            , root: 'data'
            , totalProperty: 'total'
            , idProperty: 'id'
        }
    }
});