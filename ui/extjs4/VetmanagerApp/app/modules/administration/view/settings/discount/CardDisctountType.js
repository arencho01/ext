Ext4.define('VetmanagerApp.modules.administration.view.settings.discount.CardDisctountType', {
    extend: 'Ext.form.field.ComboBox'
    , xtype: 'card-discount-field-combo'
    , name: 'card_type'
    , fieldLabel: LS.__translate(LS.CardType) + ' *'
    , store: Ext.create('Ext.data.Store', {
        fields: [
            {type: 'string', name: 'card_type'}
            , {type: 'string', name: 'display'}         
        ]
        , data: [
            {card_type: 'static', display: LS.__translate(LS.Static)}
            , {card_type: 'range', display: LS.__translate(LS.Interestbearing)}
        ]
    })
    , displayField: 'display'
    , valueField: 'card_type'
    , value: 'static'
    , allowBlank: false
    , forceSelection: true
});