Ext4.define('VetmanagerApp.modules.administration.view.Main', {
    extend: 'Ext4.Panel'
    , xtype: 'adminmainpanel'
    , border: false
    , width: Ext.app.PanelsManager.moduleWidth
    , height: Ext.app.PanelsManager.moduleHeight
    , listeners: {
        scope: this
        , render: function(a) {
            a.width = Ext.app.PanelsManager.moduleWidth;
            a.height = Ext.app.PanelsManager.moduleHeight;
        }
    }
    , requires: [
        'VetmanagerApp.modules.administration.view.MainMenu'
        , 'VetmanagerApp.modules.administration.view.MainSettings'
        , 'VetmanagerApp.modules.administration.view.MainMenuListView'
    ]
    , layout: 'border'
    , items: [
        {
            xtype: 'adminmainmenu'
        }, {
            xtype: 'adminmainsettings'
        }
    ]

});