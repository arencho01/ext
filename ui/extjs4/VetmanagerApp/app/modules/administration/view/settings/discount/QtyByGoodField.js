Ext4.define('VetmanagerApp.modules.administration.view.settings.discount.QtyByGoodField', {
    extend: 'Ext.form.field.Number'
    , minValue: 1
    , xtype: 'qty_by_good-field'
    , name: 'qty_by_good-field'
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

