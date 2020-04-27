Ext4.define('VetmanagerApp.modules.extfilter.model.ExtFilterModule', {
    extend: 'Ext.data.Model'
    , fields: [
        'id'
        , 'name'
        , 'name_cyr'
    ]
    , proxy: {
        type: 'ajax'
        , url : 'ajax_ext_filters.php'
        , extraParams: {cmd: 'get_modules'}
        , reader: {
            type: 'json'
            , root: 'data'
            , totalProperty: 'total'
            , idProperty: 'id'
        }
    }
});