/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.app.App = function(cfg){
    Ext.apply(this, cfg);
    this.addEvents({
        'ready' : true
        , 'beforeunload' : true
    });

    Ext.onReady(this.initApp, this);
    Ext4.onReady(this.initApp, this);
};

var moduleItem = function(module, idPrefix){
    this.module = module;
    this.idPrefix = idPrefix;
};

Ext.extend(Ext.app.App, Ext.util.Observable, {
    isReady: false
    , startMenu: null
    , modules: []
    , getStartConfig : function(){

    }
    , initApp : function(){
        if (Ext4.isReady && Ext.isReady && !this.isReady) {
            this.startConfig = this.startConfig || this.getStartConfig();
            this.desktop = new Ext.DesktopPanel(this);
            this.modules = this.getModules();
            this.init();
            Ext.EventManager.on(window, 'beforeunload', this.onUnload, this);
            this.fireEvent('ready', this);
            this.isReady = true;
        }

    }
    , getModules : Ext.emptyFn
    , init : Ext.emptyFn
    , getIndexModule: function(name, idPrefix){
        idPrefix = (idPrefix == null)? '' : idPrefix;
        var ms = this.modules;
        if(ms == null) return -1;
        for (var i = 0, len = ms.length; i < len; i++) {
            if (ms[i].module.id == name || ms[i].module.appType == name) {
                if(idPrefix != null && ms[i].idPrefix == idPrefix){
                    return i;
                }
            }
        }
        return -1;
    }
    , deleteModule: function(name, idPrefix){
        this.modules.remove(this.getModule(name, idPrefix));
    }
    , isModuleInited: function (name, idPrefix) {
        idPrefix = (idPrefix == null)? '' : idPrefix;
        var indexModule = this.getIndexModule(name, idPrefix);
        return (indexModule != -1);
    }
    , getModule : function(name, idPrefix){
        idPrefix = (idPrefix == null)? '' : idPrefix;

        if ('medcards' == name) {
            name = 'medicalcards';
        }

        var indexModule = this.getIndexModule(name, idPrefix);
        if (indexModule != -1) {
            return this.modules[indexModule].module;
        }

        if (VetModules[name]) {
            var prfx = (idPrefix != null)? '{idPrefix:\''+idPrefix+'\'}' : '{idPrefix:\'\'}';
            var strMainMod = ' var mainModule = new ' + VetModules[name] + '('+prfx+');';
            strMainMod += " mainModule.app = this;";
            strMainMod += ' this.addModule(mainModule, \''+idPrefix+'\');';
            eval(strMainMod);
            return this.getModule(name, idPrefix);
        }
        return '';
    }
    , runModule: function(name, idPrefix){
        var m = this.getModule(name, idPrefix);
        if (m!='') m.createWindow();
        return m;
    }
    , addModule: function(m, idPrefix){
        var elem = new moduleItem(m, idPrefix);
        this.modules.push(elem);
        return elem;
    }
    , onReady : function(fn, scope){
        if (!this.isReady) {
            this.on('ready', fn, scope);
        }else{
            fn.call(scope, this);
        }
    }
    , getDesktop : function(){
        return this.desktop;
    }
    , onUnload : function(e){
        if (this.fireEvent('beforeunload', this) === false) {
            e.stopEvent();
        }
    }

});

Ext.app.EventManager = function(cfg){
    Ext.apply(this, cfg);
};

Ext.extend(Ext.app.EventManager, Ext.util.Observable, {
    createEvents: function(events){
        if (Ext.isArray(events)) {
            Ext.each(events, function(event){
                this.addEvents(event);
            }, this);
        } else if(Ext.isString(events)) {
            this.addEvents(events);
        }
    }
});

GlobalProperties = Ext.app.properties = {
    _properties: {}
    , _propertiesToSet: []
    , _delayedTask: undefined
    , get: function(name, defvalue) {
        return this._properties.hasOwnProperty(name) ? this._properties[name] : defvalue;
    }
    , set: function(name, value, callback, scope){
        callback = Ext.isFunction(callback) ? callback : Ext.emptyFn;
        scope = scope || window;
        this._propertiesToSet.push({
            name: name
            , value: value
            , callback: callback
            , scope: scope
        });
        this._delayedTask.cancel();
        this._delayedTask.delay(250);
        this._properties[name] = value;
    }
    , setForAllClinics: function(name, value, callback, scope){
        callback = Ext.isFunction(callback) ? callback : Ext.emptyFn;
        scope = scope || window;
        this._propertiesToSet.push({
            name: name
            , value: value
            , callback: callback
            , scope: scope
            , forAllClinics: true
        });
        this._delayedTask.cancel();
        this._delayedTask.delay(250);
        this._properties[name] = value;
    }
    , load: function(outerFn){
        Ext.getBody().mask(LS.__translate(LS.LoadingSetings));
        Ext.Ajax.request({
            url: 'ajax_properties.php'
            , params: {cmd: 'get_properties'}
            , success: function(response){
                var data = Ext.decode(response.responseText).data;
                if (data != null) {
                    for(var k in data) {
                        this._properties[data[k].property_name] = data[k].property_value;
                    }
                }

                if (outerFn) {
                    outerFn();
                }
            },
            callback:function () {
                Ext.getBody().unmask();
            }
            , scope: this
        });
    }
    , init: function() {
        this._delayedTask = new Ext.util.DelayedTask(function() {
            if (this._propertiesToSet.length == 0) {
                return;
            }
            var props = []
                , propsFull = this._propertiesToSet;
            this._propertiesToSet = []
            for (var i = 0; i < propsFull.length; i++) {
                var prop = {
                    name: propsFull[i].name
                    , value: propsFull[i].value
                    , forAllClinics: propsFull[i].forAllClinics
                },
                exists = false;
                for (var j = 0; j < props.length; j++) {
                    if (props[j].name == prop.name && props[j].forAllClinics == prop.forAllClinics) {
                        props[j].value = prop.value;
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    props.push(prop);
                }
            }
            this._propertiesToSet = [];
            var params = {
                cmd: 'save_properties'
                , params: Ext.encode(props)
            };
            Ext.Ajax.request({
                url: 'ajax_properties.php'
                , params: params
                , callback: function() {
                    for (var i = 0; i < propsFull.length; i++) {
                        propsFull[i].callback.apply(propsFull[i].scope);
                    }
                }
                , scope: this
            });
        }, this);
    }
    , isServiceActive: function(serviceName) {
        var serviceEnableValue = GlobalProperties.get('service.' + serviceName,  'off');
        return serviceEnableValue == 'on';
    }
};
Ext.onReady(function(){
    Ext.app.properties.init();
    Ext.app.properties.load();
});