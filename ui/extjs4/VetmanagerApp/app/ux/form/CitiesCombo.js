Ext.define('Ext4.ux.form.CitiesCombo', {
    alias: 'widget.citiescombo'
    , extend: 'Ext4.form.ComboBox'
    , fieldLabel: LS.__translate(LS.City)
    , allowBlank: false
    , name: 'city_id'
    , hiddenName: 'city_id'
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
            url: 'ajax_clients.php?cmd=get_cities',
            reader: {
                type: 'json',
                root: 'data'
            }
        }
    }
});