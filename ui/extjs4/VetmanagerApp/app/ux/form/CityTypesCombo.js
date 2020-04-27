Ext.define('Ext4.ux.form.CityTypesCombo', {
    alias: 'widget.citytypescombo'
    , extend: 'Ext4.form.ComboBox'
    , fieldLabel: LS.__translate(LS.Type2)
    , allowBlank: false
    , name: 'type_id'
    , hiddenName: 'type_id'
    , valueField: 'id'
    , displayField: 'title'
    , triggerAction: 'all'
    , mode: 'local'
    , editable: false
    , anchor: '100%'
    , pageSize: 15
    , value: '1'
    , store: {
        fields: ['id', 'title']
        , autoLoad: true
        , proxy: {
            type: 'ajax',
            url: 'ajax_component_proxy.php?component=City&cmd=get_types_grid',
            reader: {
                type: 'json',
                root: 'data'
            }
        }
    }
});