Ext4.define('VetmanagerApp.modules.administration.controller.Main', {
    extend: 'Ext4.app.Controller'
    , selectedModuleIndex: -1
    , selectedMenuIndex: 0
    , views: [
        'VetmanagerApp.modules.administration.view.Main'
    ]
    , refs: [
        {
            ref: 'mainPanel'
            , selector: 'adminmainpanel'
            , autoCreate: true
            , xtype: 'adminmainpanel'
        }, {
            ref: 'mainMenuListMainSettings'
            , selector: 'mainmenulistview[name="main_settings"]'
            , autoCreate: true
        }, {
            ref: 'mainMenuListModuleSettings'
            , selector: 'mainmenulistview[name="module_settings"]'
            , autoCreate: true
        }, {
            ref: 'mainSettingsPanel'
            , selector: 'adminmainsettings'
            , autoCreate: true
            , xtype: 'adminmainsettings'
        }
    ]
    , init: function() {
        this.control({
            'mainmenulistview[name="main_settings"]' :{
                select: this.selectMainSettings
            }
            , 'mainmenulistview[name="module_settings"]' :{
                select: this.selectModuleSettings
            }
            , 'adminmainsettings': {
                afterrender: this.onAfterRender
            }
        });
    }
    , onAfterRender: function() {
        if (-1 == this.selectedModuleIndex) {
            var panel = this.getMainMenuListMainSettings();
            panel.selModel.select(this.selectedMenuIndex);
        } else {
            var panel = this.getMainMenuListModuleSettings();
            panel.selModel.select(this.selectedModuleIndex);
        }
    }
    , selectMainSettings: function(p, data) {
        var panel = this.getMainMenuListModuleSettings();
        panel.selModel.deselectAll();

        this.showSettingsForm(data.get('controller'), data.get('title'), data.get('show_title'));
    }
    , selectModuleSettings: function(p, data) {
        var panel = this.getMainMenuListMainSettings();
        panel.selModel.deselectAll();
        this.showSettingsForm(data.get('controller'), data.get('title'), data.get('show_title'));
    }
    , showSettingsForm: function(controllerName, title, show_title) {
        var panel = this.getMainSettingsPanel()
            , controller = this.getController(controllerName);

        panel.removeAll();
        controller.init();
//        if (show_title) {
//            panel.setTitle(title);
//        } else {
//            panel.setTitle('');
//        }

        panel.add(controller.getMainPanel());
    }
    , getPanel: function(cur_module) {
        this.selectedModuleIndex = -1;
        this.selectedMenuIndex = 0;

        var panel = this.getMainPanel()
            , list = this.getMainMenuListModuleSettings()
            , store = list.getStore();

        store.each(function(rec, i) {
            if (rec.get('title') == cur_module) {
                this.selectedModuleIndex = i;
                return;
            } else {
                var alternate = rec.get('alternate');
                if (Ext.isArray(alternate) && alternate.indexOf(cur_module) >= 0) {
                    this.selectedModuleIndex = i;
                    return;
                }
            }
        }, this);

        if (this.selectedModuleIndex < 0 && cur_module) {
            this.getMainMenuListMainSettings().getStore().each(function(rec, i) {
                if (rec.get('title') == cur_module) {
                    this.selectedMenuIndex = i;
                    return false;
                }
            }, this);
        }

        return panel;
    }
});