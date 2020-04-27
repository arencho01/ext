Ext.define('VetmanagerApp.modules.administration.model.settings.discount.Promotion', {
    extend: 'Ext.data.Model'
    , fields: [
        'id'
        , 'title'
        , 'data'
        , 'end_date'
        , 'start_date'
        , 'status'
        , 'is_for_all_clinics'
        , 'clinic_id'
        , 'clinic_name'
        , 'can_edit'
        , 'dates'
    ]
});