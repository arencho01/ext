Ext.app.CoreRouter = Ext.extend(Ext.app.Core, {
    id: 'core-router'
    , objects: undefined
    , pathMethods: undefined
    , initialized: false
    , init: function() {
        if (this.initialized) { return; }
        this.initialized = true;
        this.objects = this.objects || {};
        this.pathMethods = this.pathMethods || {};
        Ext.app.CoreRouter.superclass.init.apply(this, arguments);
    }
    , route: function(path){
        this.init();
        var params = Array.prototype.slice.call(arguments, 1);
        try {
            var pathParts = path.split('.');
        } catch(e) {
            return false;
        }
        var controllerClass = '', action;

        Ext.each(pathParts, function(item, index){            
            if (pathParts.length == 1) {
                controllerClass = (Ext.isObject(eval(item))) ? item : '';
                action = (Ext.isFunction(eval(item))) ? item : '';
            }
            if (pathParts.length > 1) {
                var controllerPathForCheck = (controllerClass == '') ? item : controllerClass + '.' + item;
                if (Ext.isObject(eval(controllerPathForCheck)) || this.isConstructor(controllerPathForCheck)) {
                    controllerClass = controllerPathForCheck;
                } else {
                    action = item;                    
                }
            }
        }, this);    


        if (!controllerClass && !action) return false;
        if (controllerClass && !action){ 
            return (!Ext.isObject(eval(controllerClass))) ? this.constructClass(controllerClass) : this.getClass(controllerClass);        
        }
        if (controllerClass && action) {
            var controller = (this.isConstructor(controllerClass)) ? this.constructClass(controllerClass) : this.getClass(controllerClass);
            controller.access = this.access;
            return controller[action].apply(controller, params);
        }
        return false;
    }
    , constructClass: function(controllerClass){
        if (this.isExistObject(controllerClass)) {
            return this._getObject(controllerClass);
        } else {            
            var object = eval('new ' + controllerClass + '()');            
            this._setObject(controllerClass, object);
        }
        return object;
    }
    , getClass: function(controllerClass){
        if (this.isExistObject(controllerClass)) {
            return this._getObject(controllerClass);
        } else {
            var object = eval(controllerClass);            
            this._setObject(controllerClass, object);
        }
        return object;        
    }
    , isConstructor: function(path){
        try {
            return eval('Ext.isFunction('+ path +'.constructor)');   
        } catch(e){
            
        }
        return false;
    }
    , _setObject: function(path, object) {
        this.objects[path] = object;
    }
    , _getObject: function(path){
        if (Ext.isObject(this.objects[path])) {
            return this.objects[path];
        } 
        return false;
    }
    , isExistObject: function(path){
        return Ext.isObject(this._getObject(path));
    }
    , getPathMethod: function(method){
        if (Ext.isDefined(this.pathMethods[method])){
            return this.pathMethods[method];
        }
        return false;
    }
}
);