Ext4.define('VetmanagerApp.modules.graphic_reports.store.PetTypes', {
    extend: 'Ext4.data.Store'
    , model: 'VetmanagerApp.modules.graphic_reports.model.PetTypes'
    , autoLoad: false
    , proxy: {
        type: 'ajax'
        , url : 'ajax_graphic.php'
        , extraParams: {cmd: 'get_pet_types'}
        , reader: {
            type: 'json'
            , root: 'data'
            , totalProperty: 'total'
            , idProperty: 'id'
        }
    }
});