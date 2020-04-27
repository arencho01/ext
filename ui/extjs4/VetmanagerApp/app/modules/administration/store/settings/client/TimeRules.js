Ext4.define('VetmanagerApp.modules.administration.store.settings.client.TimeRules', {
    extend: 'Ext4.data.Store'
    , model: 'VetmanagerApp.modules.administration.model.settings.client.TimeRule'
    , autoLoad: true
    , remoteSort: true
    , proxy: {
        type: 'ajax'
        , url: 'ajax_administration.php'
        , extraParams: {
            cmd: 'get_client_time_rules'
        }
        , reader: {
            type: 'json'
            , root: 'data'
        }
    }
});