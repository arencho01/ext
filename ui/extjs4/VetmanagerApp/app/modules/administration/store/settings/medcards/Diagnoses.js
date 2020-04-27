Ext4.define('VetmanagerApp.modules.administration.store.settings.medcards.Diagnoses', {
    extend: 'Ext4.data.Store'
    , fields: [
        'id'
        , 'status'
        , 'title'
    ]
    , pageSize: 10
    , autoLoad: false
    , proxy: {
        type: 'ajax'
        , url: 'ajax_diagnos.php'
        , extraParams: {
            cmd: 'get_grid'
        }
        , reader: {
            type: 'json'
            , root: 'data'
        }
    }
});