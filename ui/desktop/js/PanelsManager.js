var mainPanelItem = function(panel, number, cyr_name, is_current, unique_id, module, name){
    this.id = panel.id
    , this.panel = panel
    , this.number = number
    , this.cyr_name = cyr_name
    , this.is_current = is_current
    , this.unique_id = unique_id
    , this.module = module || null
    , this.subPanels = []
    , this.name = name || 'module';

    if (is_current) Ext.state.VMProvider.refreshClearButton();
};

Ext.app.PanelsManager = Ext.extend(Ext.util.Observable, {
    constructor: function(config){
        this.addEvents('back', 'close', 'layoutchange');
        Ext.app.PanelsManager.superclass.constructor.call(config);
    }
    , mainPanel: null
    , panelContainer: []
    , moduleWidth: 0
    , moduleHeight: 0
    , unique_id: 0
    , navigationPanel: null
    , panelCounts: 0
    , containerCounts: 0
    , addMainPanel: function(panel, number, cyr_name, module, name){
        this.panelContainer.push(new mainPanelItem(panel, number, cyr_name, true, this.unique_id++, module, name));
        this.mainPanel.items.add(panel);
        this.mainPanel.doLayout();
        this.buildNavigation();
        this.fireEvent('layoutchange', this);
        Common.setDefaultTitle();    
    }
    , getCurModulePath: function() {
        if (this.checksum()) {
            var curModule = this.getCurPanelContainer();
            var res = {
                panelname: null
                , main_module: LS.__translate(LS.mainMenu)
                , id: null
            };
            if (curModule == null) return res;

            if (curModule.is_current == true) {
                res.main_module = curModule.cyr_name;
                res.panelname = null;
                res.id = curModule.id;
                res.id = (res.id.indexOf('ext-comp-') == 0)? null : res.id;
            } else {
                res = {};
                for (var i = 0; i < curModule.subPanels.length; i++) {
                    if (curModule.subPanels[i].is_current == true) {
                            res.main_module = curModule.cyr_name;
                            res.panelname = curModule.subPanels[i].cyr_name;
                            if (res.main_module == res.panelname) {
                                res.panelname = null;
                            }
                            res.id = curModule.subPanels[i].id;
                            res.id = (res.id.indexOf('ext-comp-') == 0)? null : res.id;
                            break;
                        }
                }
            }

            return res;
        }
        return null;
    }
    , getCurPanel: function() {
        if (this.checksum()) {
            var curModule = this.getCurPanelContainer();
            if (curModule == null) return;

            if (curModule.is_current == true) {
                return curModule.panel;
            } else {
                for (var i = 0; i < curModule.subPanels.length; i++) {
                    if (curModule.subPanels[i].is_current == true) {
                        return curModule.subPanels[i].panel
                    }
                }
            }
        }
    }
    , getLabel: function(obj) {
        var bold = (obj.is_current === true)? '<b>' : ''
            , bold_end = (obj.is_current === true)? '</b>' : '';
        return new Ext.form.Label({
            html: ' » <span class="navigation-label" onclick="Ext.app.PanelsManager.onNavigatorClick('+obj.is_main_panel+', '+obj.unique_id+');">'+bold+obj.text+bold_end+'</span>'
        });
    }
    , getBtnLabel: function() {
        return new Ext.form.Label({
            html: '<button onclick="Ext.app.PanelsManager.back();" style="vertical-align: middle;">'+LS.__translate(LS.Back)+'</button>'
        });
    }
    , onNavigatorClick: function(is_main_panel, unique_id) {
        if (this.checksum()) {
            var cur = this.getCurPanelContainer()
                , sp = cur.subPanels;
            if (is_main_panel == true && unique_id == -1) {
                for (var i = 0; i < sp.length; i++) {
                    sp[i].is_current = false;
                }
                Ext.state.VMProvider.refreshClearButton();
                cur.is_current = true;
            } else {
                Ext.state.VMProvider.refreshClearButton();
                cur.is_current = false;
                for (var j = 0; j < sp.length; j++) {
                    sp[j].is_current = (sp[j].unique_id == unique_id)? true : false;
                }
            }
            this.showModule(cur.number);
        }
    }
    , buildNavigation: function() {
        if (this.checksum()) {
            this.clearNavigationPanel();
            var cur = this.getCurPanelContainer();
            this.navigationPanel.items.add(this.getLabel({
                unique_id: -1
                , is_main_panel: true
                , text: cur.cyr_name
                , is_current: cur.is_current
            }));
            for(var i = 0; i < cur.subPanels.length; i++) {
                this.navigationPanel.items.add(this.getLabel({
                   unique_id: cur.subPanels[i].unique_id
                   , is_main_panel: false
                   , text: cur.subPanels[i].cyr_name
                   , is_current: cur.subPanels[i].is_current
                }));
            }
            this.navigationPanel.doLayout();
        }
    }
    , clearNavigationPanel: function() {
        this.navigationPanel.removeAll(true);
        // create button back
        this.navigationPanel.items.add(this.getBtnLabel());
    }
    , back: function(callback, scope) {
        if(this.checksum()) {
            var curPanel = this.getCurPanelContainer();
            if(curPanel.subPanels.length > 0){ // if has child panels, delete last
                this.deletePanel(curPanel.subPanels[curPanel.subPanels.length-1].id);
                this.fireEvent('back');

                if (callback) {
                    callback.call(scope);
                }
            }
            this.fireEvent('layoutchange', this);
        }
    }
    , checkForSingletoneModules: function(config) {
        // open question window
        var subres = this.isSingletoneModuleAlreadyOpened(config.moduleId);

        if (subres.isFinded) {
            Ext.Msg.show({
                title: LS.__translate(LS.Attention)
                , msg: LS.__translate(LS.OneSaveDocAlreadyOpenedSelectAction)
                , icon: Ext.MessageBox.WARNING
                , scope: this
                , buttons: {
                    no: LS.__translate(LS.Close)
                    , yes: LS.__translate(LS.Open)
                }
                , fn: function(b) {
                    if ('yes' == b) {
                        config.onOpenClick.call(config.scope || this, subres.subPanel);
                    } else {
                        config.onCloseClick.call(config.scope || this, subres.subPanel);
                    }
                }
            });
        } else {
            config.onOk.call(config.scope || this);
        }
    }
    , addChildPanel: function(panel, config, module) {
        Common.setDefaultTitle();
        this.addChildPanelFunc(panel, config, module);
    }
    , isSingletoneModuleAlreadyOpened: function(moduleName) {
        var result = {
            isFinded: false
            , id: ''
        };

        Ext.each(this.panelContainer, function(container) {
            Ext.each(container.subPanels, function(subPanel) {
                if (moduleName == subPanel.module.id) {
                    result.isFinded = true;
                    result.subPanel = subPanel;
                    return;
                }
            }, this);
        }, this);

        return result;
    }
    , addChildPanelFunc: function(panel, config, module) {
        // delete all sub punels that before this panel
        var cur = this.getCurPanelContainer();
        if (cur == null) { return; }
        var childId = (config.id != null)? config.id : panel.id;
        this.deletePanel(childId, undefined, panel);
        if (cur.is_current == true) {
            // remove all sub punels of current panel
            for (i = cur.subPanels.length -1; i >= 0; i--) {
                this.deletePanel(cur.subPanels[i].id);
            }
        } else {
            // remove all sub punels that before current sub panel
            for (i = cur.subPanels.length -1; i >= 0; i--) {
                if (cur.subPanels[i].is_current == true) {
                    break;
                } else {
                    this.deletePanel(cur.subPanels[i].id);
                }
            }
        }
        ////
        Ext.app.PanelsManager.hideCurPanel();
        // get child panel cyr name
        var panel_title = (panel.title != null && panel.title !== '')? panel.title : 'empty title, panel id=' + panel.id;
        var cyr_name = (config.title != null && config.title !== '')? config.title : panel_title;
        // check for existing tabs with same id
        panel.id = childId;
        for(var i = 0; i < this.containerCounts; i++){
            if(this.panelContainer[i].id == panel.id){
                this.deletePanel(panel.id);
            }
        }
        var sp = this.getCurPanelContainer().subPanels;
        for(var j = 0; j < sp.length; j++) {
            sp[j].is_current = false;
        }
        this.getCurPanelContainer().is_current = false;
        sp.push(new mainPanelItem(panel, 0, cyr_name, true, this.unique_id++, module));

        this.mainPanel.items.add(panel);
        this.mainPanel.doLayout();
        panel.setWidth(panel.boxMinWidth > this.moduleWidth ? panel.boxMinWidth : this.moduleWidth);
        panel.setHeight(panel.boxMinHeight > this.moduleHeight ? panel.boxMinHeight : this.moduleHeight);
        this.buildNavigation();
        this.fireEvent('layoutchange', this);
    }
    , deletePanel: function(id, params, newPanel) {
        params = params || {activateParentPanel: true};

        if(this.checksum()) {
            if (this.mainPanel.items.get(id) == newPanel) {
                return;
            }
            this.mainPanel.remove(id);
            for(var i = 0; i < this.containerCounts; i++){
                if(this.panelContainer[i].id == id){
                    break;
                } else {
                    var check = false;
                    for(var j = 0; j < this.panelContainer[i].subPanels.length; j++) {
                        if(this.panelContainer[i].subPanels[j].id == id) {
                            var moduleId = null;

                            try {
                                moduleId = this.panelContainer[i].subPanels[j].module.id || this.panelContainer[i].subPanels[j].panel.moduleId;
                                this.panelContainer[i].subPanels[j].panel.fireEvent('beforedestroy', this.panelContainer[i].subPanels[j].panel);
                                this.panelContainer[i].subPanels[j].panel.fireEvent('destroy', this.panelContainer[i].subPanels[j].panel);
                            } catch(e) {
                                console.error('Ошибка', e);
                            }

                            this.panelContainer[i].subPanels.splice(j, 1);
                            // set previous panel as current
                            if (params.activateParentPanel) {
                                if (this.panelContainer[i].subPanels.length > 0) {
                                    this.panelContainer[i].subPanels[this.panelContainer[i].subPanels.length-1].is_current = true;
                                } else {
                                    this.panelContainer[i].is_current = true;
                                }
                            }
                            Ext.state.VMProvider.refreshClearButton();

                            this.fireEvent('close', moduleId);
                            check = true;
                            break;
                        }
                    }

                    if (check == true && params.activateParentPanel) {
                        this.showModule(this.panelContainer[i].number);
                    }
                }
            }
            this.fireEvent('layoutchange', this);
        }
    }
    , getCurPanelContainer: function(){
        return (this.checksum())? this.panelContainer[this.containerCounts-1] : null;
    }
    , sortPanels: function(number){
        var tempArr = [];
        var tempVal = null;
        if(this.checksum()) {
            for(var i = 0; i < this.containerCounts; i++){
                if(this.panelContainer[i].number*1 === number*1) {
                    tempVal = this.panelContainer[i];
                } else {
                    tempArr.push(this.panelContainer[i]);
                }
            }
            if(tempVal != null){
                tempArr.push(tempVal);
                this.panelContainer = [];
                this.panelContainer = tempArr;
                tempArr = null;
                return true;
            }
        }
        return false;
    }
    , showModuleByNumberOrId: function(uniqueId, id) {
        Ext.each(this.panelContainer, function(panelContainerRow) {
            var number = panelContainerRow.number;

            if (uniqueId == panelContainerRow.unique_id || panelContainerRow.id === id) {
                this.showModule(number);
                return;
            }

            var subPanelsCnt = panelContainerRow.subPanels.length
                , counter = 0
                , removeNextPanel = false;

            Ext.each(panelContainerRow.subPanels, function(subPanelRow) {
                if (removeNextPanel) {
                    this.deletePanel(subPanelRow.id);
                    return;
                }

                counter++;

                if (uniqueId == subPanelRow.unique_id || subPanelRow.id === id) {
                    this.showModule(number);

                    if (counter < subPanelsCnt) {
                        removeNextPanel = true;
                    }
                }
            }, this);
        }, this);
    }
    , showModule: function(number) {
        if(this.checksum() && this.sortPanels(number)) {
            this.hideAllPanels();
            if (this.getCurPanelContainer().subPanels.length > 0) {
                var check = false;
                var sp = this.getCurPanelContainer().subPanels;
                for(var i = 0; i < sp.length; i++) {
                    if (sp[i].is_current == true) {
                        check = true;
                        sp[i].panel.show();
                        this.refreshModuleData(sp[i]);
                        break;
                    }
                }
                if (check == false) {
                    this.getCurPanelContainer().is_current = true;
                    this.getCurPanelContainer().panel.show();
                    this.refreshModuleData(this.getCurPanelContainer());
                }
            } else {
                this.getCurPanelContainer().is_current = true;
                this.getCurPanelContainer().panel.show();
                this.refreshModuleData(this.getCurPanelContainer());
            }
            this.buildNavigation();
            this.fireEvent('layoutchange', this);
        }
        Ext.state.VMProvider.refreshClearButton();
    }
    , refreshModuleData: function(elem) {
        if (elem.module != null) {
            try {
                elem.module.onShowRefreshModuleData();
            } catch (e) {}
        }
    }
    , hideAllPanels: function() {
        if(this.checksum()) {
            for (var i = 0; i < this.panelContainer.length; i++) {
                this.panelContainer[i].panel.hide();
                for (var j = 0; j < this.panelContainer[i].subPanels.length; j++) {
                    this.panelContainer[i].subPanels[j].panel.hide();
                }
            }
        }
    }
    , hideCurPanel: function(){
        if(this.checksum()) {
            this.hideAllPanels();

            var subCount = this.getCurPanelContainer().subPanels.length;
            if(subCount > 0){
                this.getCurPanelContainer().subPanels[subCount-1].panel.hide();
            } else {
                this.getCurPanelContainer().panel.hide();
            }
        }
    }
    , getContainersCount: function(){
        var count = this.panelContainer.length;
        for(var i = 0; i < this.panelContainer.length; i++){
            for(var j = 0; j < this.panelContainer[i].subPanels.length; j++){
                 count++;
            }
        }
        return count;
    }
    , checksum: function(){
        this.panelCounts = this.mainPanel.items.length;
        this.containerCounts = this.panelContainer.length;
        return (this.panelCounts > 0 && this.panelCounts == this.getContainersCount())? true : false;
    }
    , getCurMainModuleName: function() {
        return this.getCurModulePath().main_module;
    }
});