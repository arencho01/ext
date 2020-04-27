Ext4.define('VetmanagerApp.modules.administration.view.settings.discount.InvoiceTimeStart', {
    extend: 'Ext.form.field.Time'
    , minValue: 1
    , xtype: 'invoice_time_start-field'
    , name: 'invoice_time_start-field'
    , fieldLabel: LS.__translate(LS.fromS)  + ' *'
    , allowBlank: false
    , format: 'H:i'
    , setValue: function(v) {
        if (v && !Ext.isDate(v) && v.length == 19) {
            v = v.substr(11, 5);
        }
        this.callParent([v]);
    }
});

