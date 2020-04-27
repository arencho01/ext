Ext4.define('VetmanagerApp.modules.administration.view.settings.Tarif', {
    extend: 'Ext4.FormPanel'
    , xtype: 'tarifsettings'
    , layout: 'fit'
    , border: false
    , region: 'center'
    , title: false
    , buttonAlign: 'center'
    , padding: '10px'
    , url: 'ajax_administration.php'
    , scope: this
    , requires: [
        'VetmanagerApp.modules.administration.view.settings.TarifAddUser'
    ]
    , items: [
        {
            xtype: 'form'
//            , id: 'someform'
        }
    ]
});