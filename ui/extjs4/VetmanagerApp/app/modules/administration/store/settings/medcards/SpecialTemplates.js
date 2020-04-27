Ext4.define('VetmanagerApp.modules.administration.store.settings.medcards.SpecialTemplates', {
    extend: 'Ext4.data.Store'
    , fields: [
        'id'
        , 'status'
        , 'title'
    ]
    , pageSize: 900
    , autoLoad: true
    , proxy: {
        type: 'ajax'
        , url: 'ajax_special_studies.php'
        , extraParams: {
            cmd: 'get_combo'
        }
        , reader: {
            type: 'json'
            , root: 'data'
        }
    }
});