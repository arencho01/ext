Ext4.define('VetmanagerApp.modules.administration.store.settings.medcards.MeetReasons', {
    extend: 'Ext4.data.Store'
    , fields: [
        'value'
        , 'title'
    ]
    , pageSize: 9999
    , autoLoad: true
    , proxy: {
        type: 'ajax'
        , url: 'ajax_combo_manual.php'
        , extraParams: {
            cmd: 'get_combo',
            type: 'Тип приема'
        }
        , reader: {
            type: 'json'
            , root: 'data'
        }
    }
});