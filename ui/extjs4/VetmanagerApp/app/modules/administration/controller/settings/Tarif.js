Ext4.define('VetmanagerApp.modules.administration.controller.settings.Tarif', {
    extend: 'Ext4.app.Controller'
    , views: [
        'VetmanagerApp.modules.administration.view.settings.Tarif'
    ]
    , refs: [
        {
            ref: 'mainPanel'
            , selector: 'tarifsettings'
            , autoCreate: true
            , xtype: 'tarifsettings'
        }, {
            ref: 'tarifPanel'
            , selector: 'tarifsettings form'
            , autoCreate: true
        }
    ]
    , init: function() {
        this.control({
            'tarifsettings': {
                afterrender: this.onAfterRender
                , beforedestroy: this.onDestroyPanel
            }
        });
    }
    , onAfterRender: function() {
        var panel = this.getTarifPanel();
        
        if (!this.tarif) {
            this.tarif = new Tariff.TariffSettingsPanel({
                renderTo: panel.getId() + '-body'
            });
        }
    }
    , onDestroyPanel: function() {
        if (this.tarif) {
            this.tarif.destroy();
            this.tarif = null;
        }
    }
});