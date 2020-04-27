Ext.app.CoreController = Ext.extend(Ext.app.Core, {
    id: 'core-controller'
    , nameSpace: 'Ext.app'
    , modelClass: 'Model'
    , viewClass: 'View'
    , helperClass: 'Helper'
    , model: null
    , view: null
    , toInitEvents: [
        'initedViewAndModel'
    ]
    , init: function(){
        this.listeners = new Ext.util.MixedCollection();
        this.beforeInit();
        this.on('initedViewAndModel', this.onInitedModelAndView, this);
        this.initViewAndModel();
        this.initLinks();
        this.afterInit();
    }
    , onInitedModelAndView: function(){
        this.view.model = this.model;
        this.initEventOnModel();
        this.view.initEventOnModel();
        this.initEventOnView();
        this.initIncluding(this.model, this.view);
    }
    , initIncluding: function(model, view){
        for (var includeName in this.including) {
            if (!this.including.hasOwnProperty(includeName)) continue;
            var nameSpace = this.including[includeName].nameSpace;
            var nameClass = this.including[includeName].nameClass;
            if (nameSpace && nameClass) {
                var createString = 'new ' + nameSpace + '.' + nameClass + '({included: true})';
                this[includeName] = eval(createString);
                this[includeName].view = view;
                this[includeName].model = model;
                this[includeName].fireEvent('initedViewAndModel');
            }
        }
        this.onIncluded();
        this.includingSuccess = true;
    }
    , initViewAndModel: function(){
        if (!this.included) {
            this.model = eval(this.getCreateModelString());
            this.view = eval(this.getCreateViewString());
            this.fireEvent('initedViewAndModel');
        }
    }
    , getCreateModelString: function(){
        return 'new ' + this.nameSpace + '.' + this.modelClass + '()';
    }
    , getCreateViewString: function(){
        return 'new ' + this.nameSpace + '.' + this.viewClass + '()';
    }
    , getCreateHelperString: function(){
        return 'new ' + this.nameSpace + '.' + this.helperClass + '()';
    }
    , subscribe: function(obj){
        this.listeners.add(Ext.encode({
            part: obj.part,
            event: obj.event,
            action: obj.action,
            scope: obj.scope ? obj.scope.id : null
        }), {
            part: obj.part,
            event: obj.event,
            action: obj.action,
            scope: obj.scope
        })
        if (obj.part != null) {
            if (obj.single != null && obj.single == true) {
                this[obj.part].on(obj.event, obj.action, obj.scope, {single: true});
            } else {
                this[obj.part].on(obj.event, obj.action, obj.scope);
            }
        } else {
            if (obj.single != null && obj.single == true) {
                this.on(obj.event, obj.action, obj.scope, {single: true});
            } else {
                this.on(obj.event, obj.action, obj.scope);
            }
        }
    }
    , unsubscribe: function(obj){
        var key = Ext.encode({
                part: obj.part,
                event: obj.event,
                action: obj.action,
                scope: obj.scope ? obj.scope.id : null
            })
            , listener = this.listeners.get(key);
        if (!listener) {
            return;
        }
        if (listener.part != null) {
            this[listener.part].un(listener.event, listener.action, listener.scope);
        } else {
            this.un(listener.event, listener.action, listener.scope);
        }
        this.listeners.removeKey(key);
    }
    , unsubscribeByName: function(name) {
        var name = name
            , listenersToRemove = [];
            
        this.listeners.each(function(val) {
            if (val.event == name) {
                listenersToRemove.push(val);
            }
        }, this);

        if (listenersToRemove.length > 0) {
            for(var i = 0; i < listenersToRemove.length; i++) {
                if (listenersToRemove[i].part != null) {
                    this[listenersToRemove[i].part].un(listenersToRemove[i].event, listenersToRemove[i].action, listenersToRemove[i].scope);
                } else {
                    this.un(listenersToRemove[i].event, listenersToRemove[i].action, listenersToRemove[i].scope);
                }

                this.listeners.remove(listenersToRemove[i]);
            }
        }
    }
    , initHelper: function(){
        this.view.helper = eval(this.getCreateHelperString());
    }
    , getModel: function(){
        return this.model;
    }
    , getView: function(){
        return this.view;
    }
    , beforeInit: Ext.emptyFn
    , afterInit: Ext.emptyFn
    , initEventOnView: Ext.emptyFn
    , initEventOnModel: Ext.emptyFn
});