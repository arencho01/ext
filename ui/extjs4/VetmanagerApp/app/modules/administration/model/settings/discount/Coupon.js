Ext.define('VetmanagerApp.modules.administration.model.settings.discount.Coupon', {
    extend: 'Ext.data.Model'
    , fields: [
        'id'
        , 'title'
        , 'data'
        , 'end_date'
        , 'start_date'
        , 'clinic_id'
        , 'status'
        , 'is_for_all_clinics'
        , 'is_for_message_sender'
        , 'max_usage_count'
        , 'max_usage_count_per_client'
        , 'max_discount_amount_per_client_invoice'
        , 'codes'
        , 'clinic_name'
        , 'can_edit'
    ]
});