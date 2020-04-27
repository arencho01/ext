Ext4.define('VetmanagerApp.modules.administration.store.settings.salary.Users', {
    extend: 'Ext4.data.Store'
    , fields: [
        'id'
        , 'title'
        , 'role_name'
        , 'role_id'
        , 'is_active'
    ]
    , autoLoad: true
    , proxy: {
        type: 'ajax'
        , url: 'ajax_administration.php'
        , extraParams: {
            cmd: 'get_users'
            , justActivated: 1
            , allClinics: 1
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