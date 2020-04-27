Ext.define('VetmanagerApp.modules.administration.model.settings.client.TimeRule', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'admission_type_id',
        'admission_title',
        'time_1',
        'time_2',
        'time_3',
        'time_1_enabled',
        'time_2_enabled',
        'time_3_enabled'
    ]
});