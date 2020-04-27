Ext4.define('VetmanagerApp.modules.graphic_reports.model.VaccineReportSummary', {
    extend: 'Ext4.data.Model'
    //Вакцина, вид, кол-во животных
    , fields: ['row_number', 'vaccine_title', 'pet_type', 'pet_qty']
});