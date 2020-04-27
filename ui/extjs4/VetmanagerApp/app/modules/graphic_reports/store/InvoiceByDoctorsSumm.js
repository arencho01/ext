Ext4.define('VetmanagerApp.modules.graphic_reports.store.InvoiceByDoctorsSumm', {
    extend: 'Ext4.data.Store'
    , model: 'VetmanagerApp.modules.graphic_reports.model.InvoiceByDoctorsSumm'
    , autoLoad: false
    , proxy: {
        type: 'ajax'
        , url : 'ajax_graphic.php'
        , extraParams: {cmd: 'get_invoice_by_doctors_summ'}
        , reader: {
            type: 'json'
            , root: 'data'
            , totalProperty: 'total'
            , idProperty: 'id'
        }
    }
    });