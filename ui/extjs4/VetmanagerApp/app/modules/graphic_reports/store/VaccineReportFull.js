Ext4.define('VetmanagerApp.modules.graphic_reports.store.VaccineReportFull', {
    extend: 'Ext4.data.Store'
    , model: 'VetmanagerApp.modules.graphic_reports.model.VaccineReportFull'
    , autoLoad: true
    , proxy: {
        type: 'ajax'
        , url : 'ajax_graphic.php'
        , extraParams: {cmd: 'get_vaccine_report_full'}
        , reader: {
            type: 'json'
            , root: 'data'
            , idProperty: 'row_number'
        }
    }
});