Ext4.define('VetmanagerApp.modules.administration.view.settings.discount.QtyGoodRuleInInvoiceField', {
    extend: 'Ext.form.field.Number'
    , minValue: 1
    , xtype: 'qty-good-rule-in-invoice-field'
    , name: 'qty-good-rule-in-invoice-field'
    , fieldLabel: LS.__translate(LS.Quantity)  + ' *'
    , listeners: {
        render: function(c){
            if (c.triggerEl) {
               c.triggerEl.hide();
            } 
        }
    }    
    , allowBlank: false
});

