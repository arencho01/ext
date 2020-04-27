Ext.app.Core = Ext.extend(Ext.app.Module, {
    id: 'core'
    , toInitEvents: undefined
    , globalEvents: undefined
    , including: undefined
    , init: function(){
        this.toInitEvents = this.toInitEvents || [];
        this.globalEvents = this.globalEvents || [];
        this.including = this.including || {};
        this.beforeInit();
        this.initEvents();
        this.initIncluding();
        this.initLinks();
        this.afterInit();
    }
    , initGlobalEvents: function() {
        VetManager.eventManager.createEvents(this.globalEvents);
    }
    , fireGlobalEvent: function(name, params) {
        VetManager.eventManager.fireEvent(name, params);            
    }
    , onGlobal: function(name, func, scope){
        VetManager.eventManager.on(name, func, scope)
    }
    , initEvents: function(){
        this.initGlobalEvents();
        Ext.each(this.toInitEvents, function(ev){
            this.addEvents(ev);
        }, this);
    }
    , onIncluded: Ext.emptyFn
    , initIncluding: function(){
        for (var includeName in this.including) {
            if (!this.including.hasOwnProperty(includeName)) continue;
            var nameSpace = this.including[includeName].nameSpace;
            var nameClass = this.including[includeName].nameClass;
            if (nameSpace && nameClass) {
                var createString = 'new ' + nameSpace + '.' + nameClass + '({included: true})';
                this[includeName] = eval(createString);
            }
        }
        this.onIncluded();
        this.includingSuccess = true;        
    }
    , initLinks: function() {
        if (this.links && Ext.isArray(this.links)) {
            for (var i = 0; i < this.links.length; i++) {
                var link = this.links[i].link,
                    to = this.links[i].to,
                    prop = this.links[i].prop;

                if (Ext.isString(link) && Ext.isString(to) && Ext.isString(prop)) {
                    link = this.getLink(link);
                    to = this.getLink(to);
                    to[prop] = link;
                    to.onLink && to.onLink(prop, link);
                    var fnName = 'onLink' + prop.charAt(0).toUpperCase() + prop.substr(1)
                    to[fnName] && to[fnName](link);
                }
            }
        }
    }
    , getLink: function(linkName) {
        if (!Ext.isString(linkName)) {
            return null;
        }
        if (!this.hasOwnProperty(linkName) && linkName.indexOf('.') < 0) {
            return null;
        }

        var linkPath = linkName.split('.');

        if (linkPath.length > 0) {
            var obj = null;
            linkName = linkPath.shift();
            if (this.hasOwnProperty(linkName)) {
                obj = this[linkName];
                if (linkPath.length > 0) {
                    var child = this.getLink.call(obj, linkPath.join('.'));
                    if (child) {
                        return child;
                    }
                }
                return obj;
            }
        }
        return null;
    }
    , getId: function(){
        return this.id;
    }
    , beforeInit: Ext.emptyFn
    , afterInit: Ext.emptyFn    
});