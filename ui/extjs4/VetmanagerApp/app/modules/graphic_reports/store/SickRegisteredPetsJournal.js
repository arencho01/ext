Ext4.define('VetmanagerApp.modules.graphic_reports.store.SickRegisteredPetsJournal', {
    extend: 'Ext4.data.Store'
    , model: 'VetmanagerApp.modules.graphic_reports.model.SickRegisteredPetsJournal'
    , autoLoad: true
    , pageSize: 25
    , proxy: {
        type: 'ajax'
        , url : 'ajax_graphic.php'
        , actionMethods: {read: 'POST'}
        , extraParams: {
            cmd: 'get_sick_registered_pets'
        }
        , reader: {
            type: 'json'
            , root: 'data'
            , totalProperty: 'total'
            , idProperty: 'id'
        }
    }
});