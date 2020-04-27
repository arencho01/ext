Ext4.define('VetmanagerApp.modules.administration.view.settings.discount.AllInvoiceRulesAmountField', {
    extend: 'Ext.form.field.Number'
    , minValue: 1
    , xtype: 'all-invoice-amount-field'
    , fieldLabel: LS.__translate(LS.Amount) + ' *'
    , name: 'all-invoice-amount-field'
    , listeners: {
        render: function(c){
            if (c.triggerEl) {
               c.triggerEl.hide();
            } 
        }
    }
    , allowBlank: false
});

