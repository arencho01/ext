Ext.define('VetmanagerApp.modules.administration.model.settings.discount.CardType', {
    extend: 'Ext.data.Model',
    fields: ['id', 'title', 'card_type','data', 'status', 'is_for_all_clinics', 'clinic_id', 'clinic_name', 'can_edit']
});