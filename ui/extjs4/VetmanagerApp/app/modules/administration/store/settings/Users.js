Ext4.define('VetmanagerApp.modules.administration.store.settings.Users', {
    extend: 'Ext4.data.Store'
    , fields: [
        'id'
        , 'title'
        , 'role_name'
        , 'role_id'
        , 'is_active'
        , 'editable'
        , 'is_limited'
    ]
    , autoLoad: true
    , proxy: {
        type: 'ajax'
        , url: 'ajax_administration.php'
        , extraParams: {
            cmd: 'get_users'
            , justActivated: 1
            , limit: 23
            , sort: 'title'
            , dir: 'asc'
        }
        , reader: {
            type: 'json'
            , root: 'data'
        }
    }
});