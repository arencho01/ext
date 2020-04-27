Ext4.define('VetmanagerApp.modules.administration.view.settings.discount.ExpressionCombo', {
    extend: 'Ext.form.field.ComboBox'
    , xtype: 'expression-combo-field-or-and'
    , name: 'expression-combo-field-or-and'
    , fieldLabel: LS.__translate(LS.Operator) + ' *'
    , store: Ext.create('Ext.data.Store', {
        fields: [
            {type: 'string', name: 'value'}
            , {type: 'string', name: 'display'}         
        ]
        , data: [
            {value: 'AND', display: LS.__translate(LS.AND)}
            , {value: 'OR', display: LS.__translate(LS.OR)}
        ]
    })
    , displayField: 'display'
    , valueField: 'value'
    , value: 'AND'
    , allowBlank: false
    , forceSelection: true
});