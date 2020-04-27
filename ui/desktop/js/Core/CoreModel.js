Ext.app.CoreModel = Ext.extend(Ext.app.Core, {
    id: 'core-model'
    , url: ''
    , stores: null
    , storesProperties: {
        basic: {basic: true}
    }
    , defaultStoreProperties: {
        autoLoad: false
    }
    , init: function() {
        Ext.app.Core.prototype.init.apply(this, arguments);
        this.stores = new Ext.util.MixedCollection();
    }
    , getStoreByName: function(name){
        var propertiesByName = this.getPropertiesByName(name);
        var storeProperties = Ext.applyIf(propertiesByName, this.defaultStoreProperties);
        return new Ext.data.Store(storeProperties);
    }
    , getPropertiesByName: function(name){
        return this.storesProperties[name];
    }
    , ajax: function(params, event) {
        var args = [].splice.call(arguments,0);
        Ext.Ajax.request({
            url: params.url || this.url
            , timeout: params.timeout || 30000
            , scope: this
            , params: { 'cmd': params.cmd, 'params': Ext.encode(params) }
            , success: function(r){
                Common.showErrors(r);
                if (event) {
                    args.splice(0, 2);
                    args.unshift(event, Ext.decode(r.responseText));
                    this.fireEvent.apply(this, args);
                }
            }
        });
    }
    , ajaxSimple: function (params, callback, scope) {
        Ext.Ajax.request({
            url: this.url
            , scope: this
            , params: params
            , success: function(r) {
                callback.call(scope || this, r);
            }
        });
    }
    , ajaxCallback: function(params, callback, scope, event) {
        var args = [].splice.call(arguments,0);
        Ext.Ajax.request({
            url: params.url || this.url
            , timeout: params.timeout || 30000
            , scope: this
            , params: { 'cmd': params.cmd, 'params': Ext.encode(params) }
            , success: function(r){
                Common.showErrors(r);
                if (Ext.isFunction(callback)) {
                    callback.call(scope || window, Ext.decode(r.responseText));
                }
                if (event) {
                    args.splice(0, 4);
                    args.unshift(event, Ext.decode(r.responseText));
                    this.fireEvent.apply(this, args);
                }
            }
        });
    }
    , ajaxAndFire: function(params, event){
        Ext.Ajax.request({
            url: this.url
            , scope: this
            , timeout: params.timeout || 30000
            , params: { 'cmd': params.cmd, 'params': Ext.encode(params) }
            , success: function(r){
                Common.showErrors(r);
                if (event) {
                    if (Ext.decode(r.responseText).is_error) {
                        this.fireGlobalEvent(event+'_error', Ext.decode(r.responseText));
                    } else {
                        this.fireGlobalEvent(event, Ext.decode(r.responseText));
                    }
                }
            }
        });
    }
});