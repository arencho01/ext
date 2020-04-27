Ext4.define('VetmanagerApp.modules.administration.view.settings.discount.AmountByGoodField', {
    extend: 'Ext.form.field.Number'
    , minValue: 1
    , xtype: 'amount_by_good-field'
    , name: 'amount_by_good-field'
    , fieldLabel: LS.__translate(LS.AmountForGoods)  + ' *'
    , listeners: { 
        render: function(c){
            if (c.triggerEl) {
               c.triggerEl.hide();
            } 
        }
    }
    , allowBlank: false
});

