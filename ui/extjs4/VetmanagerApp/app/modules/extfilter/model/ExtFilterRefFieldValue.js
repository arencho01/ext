Ext4.define('VetmanagerApp.modules.extfilter.model.ExtFilterRefFieldValue', {
    extend: 'Ext.data.Model'
    , fields: [
        'value'
        , 'title'
    ]
    , proxy: {
        type: 'ajax'
        , url : 'ajax_ext_filters.php'
        , extraParams: {
            cmd: 'get_ref_field_values'
            , field_id: 0
            , query: ''
            , limit: 50
        }
        , reader: {
            type: 'json'
            , root: 'data'
            , totalProperty: 'total'
            , idProperty: 'value'
        }
    }
});