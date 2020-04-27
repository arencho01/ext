Ext.define('Ext4.ux.form.PetTypeCombo', {
    alias: 'widget.pettypecombo'
    , extend: 'Ext4.form.ComboBox'
    , fieldLabel: LS.__translate(LS.TypeOfThePet)
    , allowBlank: false
    , name: 'pet_type_id'
    , hiddenName: 'pet_type_id'
    , displayField: 'title'
    , valueField: 'id'
    , triggerAction: 'all'
    , mode: 'local'
    , editable: false
    , anchor: '100%'
    , pageSize: 15
    , store: {
        fields: ['id', 'title']
        , autoLoad: true
        , proxy: {
            type: 'ajax',
            url: 'ajax_get_pet_types.php',
            reader: {
                type: 'json',
                root: 'data'
            }
        }
    }
});