Ext.define('Ext4.ux.form.BlockStreetTypesAndTextfield', {
    alias: 'widget.blockstreettypesandtextfield',
    extend: 'Ext4.form.FieldContainer',
    items:[
        {
            layout: 'hbox',
            border: false,
            bodyStyle: 'padding: 10px;',
            items:[
                {
                    xtype: 'streettypecombo',
                    fieldLabel: LS.__translate(LS.StreetType),
                    name: 'dop_param2',
                    allowBlank: false,
                    hideLabel: true,
                    width: 105
                },
                {
                    xtype: 'box'
                    , html: '&nbsp;'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: LS.__translate(LS.Namez),
                    name: 'title',
                    allowBlank: false,
                    maxLength: 250,
                    hideLabel: true,
                    width: 254,
                    emptyText: LS.__translate(LS.Namez)
                }
            ]
        }
    ]
});