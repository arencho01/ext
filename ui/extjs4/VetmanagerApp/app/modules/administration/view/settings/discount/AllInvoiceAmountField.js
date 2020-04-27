Ext4.define('VetmanagerApp.modules.administration.view.settings.discount.AllInvoiceAmountField', {
    extend: 'Ext.form.field.Number'
    , minValue: 1
    , xtype: 'all-invoice-rules-amount-field'
    , name: 'all-invoice-rules-amount-field'
    , fieldLabel: LS.__translate(LS.Amount) + ' *'
    , listeners: {
        render: function(c){
            if (c.triggerEl) {
               c.triggerEl.hide();
            } 
        }
    }
    , allowBlank: false
});

