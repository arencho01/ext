Ext4.define('VetmanagerApp.modules.administration.store.settings.salary.UserPercents', {
    extend: 'Ext4.data.Store'
    , fields: [
        'id'
        , 'user_id'
        , 'title'
        , 'regular_percent'
        , 'night_percent'
        , 'call_percent'
        , 'night_call_percent'
        , 'is_double'
        , 'condition_doubling'
    ]
    , autoLoad: false
    , proxy: {
        type: 'ajax'
        , url: 'ajax_access.php'
        , extraParams: {
            cmd: 'get_percents'
            , xaction: 'read'
        }
        , reader: {
            type: 'json'
            , root: 'data'
        }
    }
});