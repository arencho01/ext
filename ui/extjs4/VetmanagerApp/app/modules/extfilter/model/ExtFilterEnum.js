/**
 * Created by drlev on 13.06.14.
 */
Ext4.define('VetmanagerApp.modules.extfilter.model.ExtFilterEnum', {
    extend: 'Ext.data.Model'
    , fields: [
        {
            name: 'id'
            , type: 'string'
        }
        , 'field_id'
        , 'value'
        , 'title'
    ]
    , proxy: {
        type: 'ajax'
        , url : 'ajax_ext_filters.php'
        , extraParams: {cmd: 'get_enum_values', field_id: 0}
        , reader: {
            type: 'json'
            , root: 'data'
            , totalProperty: 'total'
            , idProperty: 'id'
        }
    }
});