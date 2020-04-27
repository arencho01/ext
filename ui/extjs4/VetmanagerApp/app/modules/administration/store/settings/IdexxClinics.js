Ext4.define('VetmanagerApp.modules.administration.store.settings.IdexxClinics', {
    extend: 'Ext4.data.Store',
    fields: [
        'id',
        'title',
        'api_key'
    ],
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'ajax_properties.php',
        extraParams: {
            cmd: 'get_idexx_settings'
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});