Ext4.define('VetmanagerApp.modules.graphic_reports.store.DirectedTimesByAdmissionType', {
    extend: 'Ext4.data.Store'
    , model: 'VetmanagerApp.modules.graphic_reports.model.DirectedTimes'
    , autoLoad: false
    , proxy: {
        type: 'ajax'
        , url : 'ajax_graphic.php'
        , extraParams: {cmd: 'get_directed_times_by_admission_type'}
        , reader: {
            type: 'json'
            , root: 'data'
            , totalProperty: 'total'
            , idProperty: 'id'
        }
    }
});