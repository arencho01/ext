Ext.app.CoreView = Ext.extend(Ext.app.Core, {
    id: 'core-view'
    , pageSize: 15
    , initEventOnModel: Ext.emptyFn
    , createWindow: function(config, cls){
    	var win = new (cls||Ext.Window)(
            Ext.applyIf(config||{}, {
                minimizable: true
                , maximizable: true
                , modal: true
            })
        );
        return win;
    }
    , getModuleWidth: function() {
        return Ext.app.PanelsManager.mainPanel.getWidth();
    }
    , getModuleHeight: function() {
        return Ext.app.PanelsManager.mainPanel.getHeight();
    }
    , getPanelParam: function(panelName, paramName){
        return this.panelsParams[panelName][paramName];
    }
    , getPanelObject: function(panelName){
        return this.panelsParams[panelName];
    }
    , cellClickEvent: function(grid, action) { // check if row selected, then fire event
        if (grid.getSelectionModel().hasSelection()) {
            this.fireEvent(action, grid, grid.getSelectionModel().getSelections());
        }
    }
    , showConfirmDel: function(grid) {
        Ext.ConfirmPassShort.confirm(() => {

            this.cellClickEvent(grid, 'delClick');
        }, this);
    }
    , savedObjects: {

    }
    , setSavedObject: function(name, object){
        this.savedObjects[name] = object;
    }
    , getSavedObject: function(name){
        return (this.savedObjects[name]) ? this.savedObjects[name] : false;
    }
    , addNewTab: function(property) {
        var newTab;
        if (!property.getXType) {
            Ext.app.PanelsManager.on('close', function(moduleId) {
                this.fireGlobalEvent(property.globalEvent, moduleId);
            }, this, {single: true});

            newTab = new Ext.Panel({
                bodyBorder: false
                , border: false
                , items: property.items
                , tbar: property.tbar
                , layout: 'fit'
            });
        } else {
            newTab = property;
        }

        if (Ext.app.PanelsManager.mainPanel.items.get(newTab.id)) {
            newTab.show();
        } else {
            Ext.app.PanelsManager.addChildPanel(newTab, {'id': property.id}, this);
        }
    }
    , showMsg: function(is_error, text) {
        if (is_error == false) {
            Ext.MsgManager.alert(LS.__translate(LS.SystemMessage), text);
        } else {
            Ext.MsgManager.alertError(LS.__translate(LS.Error), text);
        }
    }
});