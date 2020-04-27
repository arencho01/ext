Ext4.define('VetmanagerApp.modules.graphic_reports.store.VaccineReportSummary', {
    extend: 'Ext4.data.Store'
    , model: 'VetmanagerApp.modules.graphic_reports.model.VaccineReportSummary'
    , autoLoad: true
    , proxy: {
        type: 'ajax'
        , url : 'ajax_graphic.php'
        , extraParams: {cmd: 'get_vaccine_report_summary'}
        , reader: {
            type: 'json'
            , root: 'data'
            , idProperty: 'row_number'
        }
    }
});