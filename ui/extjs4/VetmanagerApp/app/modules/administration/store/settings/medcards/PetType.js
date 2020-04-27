Ext4.define('VetmanagerApp.modules.administration.store.settings.medcards.PetType', {
    extend: 'Ext4.data.Store'
    , fields: [
        'id'
        , 'title'
        , 'type'
    ]
    , pageSize: 990
    , autoLoad: true
    , proxy: {
        type: 'ajax'
        , url: 'ajax_combo_manual.php'
        , extraParams: {
            cmd: 'get_items',
            manual_id: -4,
            start: 0,
            id_active: 1,
            all_row: 1
        }
        , reader: {
            type: 'json'
            , root: 'data'
        }
    }
});