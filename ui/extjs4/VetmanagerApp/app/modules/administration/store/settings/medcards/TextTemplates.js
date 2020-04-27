Ext4.define('VetmanagerApp.modules.administration.store.settings.medcards.TextTemplates', {
    extend: 'Ext4.data.Store'
    , fields: [
        'id'
        , 'status'
        , 'title'
    ]
    , pageSize: 9999
    , autoLoad: true
    , proxy: {
        type: 'ajax'
        , url: 'ajax_get_medcards_template.php'
        , reader: {
            type: 'json'
            , root: 'data'
        }
    }
});