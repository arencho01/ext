Ext4.define('VetmanagerApp.modules.administration.view.settings.discount.InvoiceIsNightField', {
    extend: 'Ext.form.field.Checkbox'
    , minValue: 1
    , xtype: 'invoice_is_night-field'
    , name: 'invoice_is_night-field'
    , fieldLabel: LS.__translate(LS.Night)  + ' *'
    , allowBlank: false
});

