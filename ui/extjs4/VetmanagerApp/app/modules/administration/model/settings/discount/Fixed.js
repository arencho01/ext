Ext.define('VetmanagerApp.modules.administration.model.settings.discount.Fixed', {
    extend: 'Ext.data.Model'
    , fields: [
        'id'
        , 'title'
        , 'data'
        , 'percent_type'
        , 'clinic_id'
        , 'is_for_all_clinics'
        , 'status'
        , 'clinic_name'
        , 'can_edit'
    ]
});