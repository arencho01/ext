Ext4.onReady(function(){
    Ext4.window.MessageBox.prototype.buttonText = {
        ok     : LS.__translate(LS.ok),
        cancel : LS.__translate(LS.Cancel),
        yes    : LS.__translate(LS.Yes),
        no     : LS.__translate(LS.No)
    };
    
    Ext4.view.AbstractView.prototype.loadingText = LS.__translate(LS.Loading);

    Ext4.Loader.setConfig({
        enabled: true
        , disableCaching: true
    });
    Ext4.Loader.setPath('Ext4.ux', 'ui/extjs4/VetmanagerApp/app/ux');

    Ext4.application = function (config) {
        Ext4.require('Ext4.app.Application');

        Ext4.onReady(function() {
            window[config.name] = window[config.name] || {};
            window[config.name].app = new Ext4.app.Application(config);
        });
    };

    Ext4.application({
        name: 'VetmanagerApp'
        , appFolder: 'ui/extjs4/VetmanagerApp/app'
        , models: []
        , views: []
        , controllers: [
            'VetmanagerApp.modules.graphic_reports.controller.Graphic'
            , 'VetmanagerApp.modules.extfilter.controller.ExtFilter'
            , 'VetmanagerApp.modules.printsettings.controller.PrintSettings'
            , 'VetmanagerApp.modules.administration.controller.Main'
        ]
        , launch: function() {
            if (_IS_SHOW_WIZARD*1 == 1) {
                var controller = this.getController('VetmanagerApp.modules.administration.controller.settings.StartWizard');
                controller.init();
                controller.getMainPanel().show();
            }
        }
        , getStore: function(name) {
            var storeId = (name.indexOf("@") === -1) ? name : name.split("@")[0],
                store = Ext4.StoreManager.get(storeId);

            if (!store) {
                store = Ext4.create(this.getModuleClassName(name, 'store'), {
                    storeId: storeId
                });
            }

            return store;
        }
    });

});