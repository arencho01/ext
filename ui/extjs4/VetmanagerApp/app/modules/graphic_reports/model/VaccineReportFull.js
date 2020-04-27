Ext4.define('VetmanagerApp.modules.graphic_reports.model.VaccineReportFull', {
    extend: 'Ext4.data.Model'
    , fields: [
        'row_number'
        , 'vaccine_date'
        , 'client_fio'
        , 'client_address'
        , 'pet_alias'
        , 'pet_type'
        , 'pet_breed'
        , 'pet_sex'
        , 'vaccine_title'
        , 'user_fio'
    ]
});