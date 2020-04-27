var handlerTypes = {
    window: 'window'
    , error: 'error'
    , field: 'field'
};

var windowHandler = {
    handlerType: handlerTypes.window
    , action: null // show, hide, close, button click
    , title: null
    , mainModule: null
    , curPanelName: null
    , curPanelId: null
    , set: function() { // arguments [action, title]
        this.clear();
        if (arguments.length == 2) {
            this.action = arguments[0];
            this.title = arguments[1];

            var m = Ext.app.PanelsManager.getCurModulePath();
            if (m != null) {
                this.mainModule = m.main_module;
                this.curPanelName = m.panelname;
                this.curPanelId = m.id;
            }
        } else {
            console.log('errorHandler invalid arguments count=',arguments.length,', must be=2');
        }
    }
    , clear: function() {
        this.action = null;
        this.title = null;
        this.mainModule = null;
        this.curPanelName = null;
        this.curPanelId = null;
    }
    , get: function() {
        var d = new Date();
        return {
            handlerType: this.handlerType
            , action: this.action
            , title: this.title
            , mainModule: this.mainModule
            , curPanelName: this.curPanelName
            , curPanelId: this.curPanelId
            , date: d.format('Y-m-d H:i:s')
        }
    }
};

var errorHandler = {
    handlerType: handlerTypes.error
    , type: null // ajax, js
    , place: null // ajax => url,  js => file
    , param: null // ajax => post params, js=> line
    , message: null
    , mainModule: null
    , curPanelName: null
    , curPanelId: null
    , set: function() { // arguments [type, place, param, message]
        this.clear();
        if (arguments.length == 4) {
            this.type = arguments[0];
            this.place = arguments[1];
            this.param = arguments[2];
            this.message = arguments[3];

            var m = Ext.app.PanelsManager.getCurModulePath();
            if (m != null) {
                this.mainModule = m.main_module;
                this.curPanelName = m.panelname;
                this.curPanelId = m.id;
            }
        } else {
            console.log('errorHandler invalid arguments count=',arguments.length,', must be=4');
        }
    }
    , clear: function() {
        this.type = null;
        this.place = null;
        this.param = null;
        this.message = null;
        this.mainModule = null;
        this.curPanelName = null;
        this.curPanelId = null;
    }
    , get: function() {
        var d = new Date();
        return {
            handlerType: this.handlerType
            , type: this.type
            , place: this.place
            , param: this.param
            , message: this.message
            , mainModule: this.mainModule
            , curPanelName: this.curPanelName
            , curPanelId: this.curPanelId
            , date: d.format('Y-m-d H:i:s')
        }
    }
};

var fieldHandler = {
    handlerType: handlerTypes.field
    , text: null
    , value: null
    , id: null
    , name: null
    , label: null
    , mainModule: null
    , curPanelName: null
    , curPanelId: null
    , xtype: null
    , set: function() { // arguments [text, value, id, name, label, xtype]
        this.clear();
        if (arguments.length == 6) {
            this.text = arguments[0];
            this.value = arguments[1];
            if (arguments[2].indexOf('ext-comp-') !== 0) { // not ext generated id
                this.id = arguments[2];
            }

            this.name = arguments[3];
            this.label = arguments[4];
            this.xtype = arguments[5];

            var m = Ext.app.PanelsManager.getCurModulePath();
            if (m != null) {
                this.mainModule = m.main_module;
                this.curPanelName = m.panelname;
                this.curPanelId = m.id;
            }
        } else {
            console.log('errorHandler invalid arguments count=',arguments.length,', must be=6');
        }
    }
    , clear: function() {
        this.text = null;
        this.value = null;
        this.id = null;
        this.name = null;
        this.label = null;
        this.mainModule = null;
        this.curPanelName = null;
        this.curPanelId = null;
        this.xtype = null;
    }
    , get: function() {
        var d = new Date();
        return {
            handlerType: this.handlerType
            , text: this.text
            , value: this.value
            , id: this.id
            , name: this.name
            , label: this.label
            , mainModule: this.mainModule
            , curPanelName: this.curPanelName
            , curPanelId: this.curPanelId
            , xtype: this.xtype
            , date: d.format('Y-m-d H:i:s')
        }
    }
};

Ext.app.JavascriptLogger = Ext.extend(Ext.util.Observable, {
    history: []
    , is_runnable: false // settings from database
    , is_sended: false
    , constructor: function() {
        if (this.isRunnable() == false) {
            console.log('javascript logger: off');

//            Ext.util.Observable.observeClass(Ext.Button);
//            Ext.Button.on('click', function(a){
//                if (!a.hideHandler) {
//                    a.hideHandler = a.handler;
//                }
//                var currClickTime = (new Date()).getTime();
//                if (a.lastClickTime && currClickTime - a.lastClickTime < 1000) {
//                    a.handler = null;
//                    return false;
//                }
//                a.lastClickTime = currClickTime;
//                setTimeout(function(){
//                    if (!a.isDestroyed && (a.microDisable == null || a.microDisable != null && a.microDisable == true)) {
//                        a.disable();
//                        if (a.ownerCt && a.ownerCt.initGridButtonsByAccess) a.ownerCt.initGridButtonsByAccess();
//                    }
//                }, 25);
//
//                setTimeout(function(){
//                    a.handler = a.hideHandler;
//                    if (!a.isDestroyed && a.el.dom) {
//                        if (a.microDisable == null || a.microDisable != null && a.microDisable == true) {
//                            a.enable();
//                            if (a.ownerCt && a.ownerCt.initGridButtonsByAccess) a.ownerCt.initGridButtonsByAccess();
//                        }
//                    }
//                }, 2000);
//            }, this);
        } else {
            console.log('javascript logger: on');

            this.addEventHandlers();
        }
    }
    , addEventHandlers: function() {
        if (this.isRunnable()) {
            // window events
            Ext.util.Observable.observeClass(Ext.Window);
            Ext.Window.on('show', function(a){
                windowHandler.set('show', a.title);
                Ext.app.JavascriptLogger.addToHistory(windowHandler);
            }, this);
            Ext.Window.on('close', function(a){
                if (a.closeAction == 'close') {
                    windowHandler.set('close', a.title);
                    Ext.app.JavascriptLogger.addToHistory(windowHandler);
                }
            }, this);
            Ext.Window.on('hide', function(a){
                if (a.closeAction == 'hide') {
                    windowHandler.set('hide', a.title);
                    Ext.app.JavascriptLogger.addToHistory(windowHandler);
                }
            }, this);

            // button events
            Ext.util.Observable.observeClass(Ext.Button);
//            Ext.Button.on('click', function(a){
//                windowHandler.set('click', a.text);
//                Ext.app.JavascriptLogger.addToHistory(windowHandler);
//                setTimeout(function(){
//                    if (a.microDisable == null || a.microDisable != null && a.microDisable == true) {
//                        a.disable();
//                    }
//                }, 25);
//
//                setTimeout(function(){
//                    if (a.el.dom) {
//                        if (a.microDisable == null || a.microDisable != null && a.microDisable == true) {
//                            a.enable();
//                        }
//                    }
//                }, 2000);
//            }, this);

            // combo events
            Ext.util.Observable.observeClass(Ext.form.ComboBox);
            Ext.form.ComboBox.on('select', function(a){
                var name = (a.hiddenName == '')? a.name : a.hiddenName;
                name = (name == null)? null: name;
                fieldHandler.set(a.lastSelectionText, a.getValue(), a.id, name, a.fieldLabel, 'combo');
                Ext.app.JavascriptLogger.addToHistory(fieldHandler);
            }, this);

            // text fields events
            Ext.util.Observable.observeClass(Ext.form.TextField);
            Ext.form.TextField.on('blur', function(a){
                if (a.xtype == null) return;
                var v = a.getValue();
                if (a.xtype == 'datefield' && v != '') {
                    v = v.format(a.format);
                }
                var name = (a.name != '')? a.name : a.hiddenName;
                name = (name == null)? null: name;

                fieldHandler.set(null, v, a.id, name, a.fieldLabel, a.xtype);
                Ext.app.JavascriptLogger.addToHistory(fieldHandler);
            }, this);

            // checkbox events
            Ext.util.Observable.observeClass(Ext.form.Checkbox);
            Ext.form.Checkbox.on('check', function(a, v){
                fieldHandler.set(null, v, a.id, a.name, a.fieldLabel, a.xtype);
                Ext.app.JavascriptLogger.addToHistory(fieldHandler);
            });

            // ajax events
            Ext.Ajax.on('requestcomplete', function(a,b,c){
                if (c.url.search('.html') != -1) return;
                try{
                    Ext.decode(b.responseText); // try to decode response
                } catch(e) {
                    errorHandler.set('ajax', c.url, c.params.cmd, b.responseText);
                    Ext.app.JavascriptLogger.addToHistory(errorHandler);
                }
            }, this);
        }
    }
    , sendHistoryToServer: function() { // send history to server
        if (this.isRunnable() && Ext.app.JavascriptLogger.history.length > 0) {
            Ext.Ajax.request({
                url: 'ajax_logs.php'
                , scope: this
                , params: {
                    'cmd': 'add_javascript_log'
                    , 'params' : Ext.encode(Ext.app.JavascriptLogger.history)
               }
            });
            Ext.app.JavascriptLogger.history = null;
            Ext.app.JavascriptLogger.history = [];
        }
    }
    , isLocalhost: function() { // if localhost, returns true
        return _IS_SERVER_IN_CLINIC;
    }
    , isRunnable: function() { // if not localhost and turn on, returns true
        return (this.isLocalhost() == false && this.is_runnable == true);
    }
    , setRunnable: function(v) {
        this.is_runnable = v;
    }
    , addToHistory: function(obj) {
        if (this.isRunnable()) {
            this.history.push(obj.get());

            if (this.history.length >= 25) {
                if (Ext.app.JavascriptLogger.is_sended == false) {
                    setTimeout(function(){
                        Ext.app.JavascriptLogger.is_sended = false;
                    }, 3000);

                    Ext.app.JavascriptLogger.is_sended = true;
                    this.sendHistoryToServer();
                }
            }
        }
    }
    , addJavascriptError: function(msg, url, line) {
        if (this.isRunnable()) {
            errorHandler.set('javascript', url, line, msg);
            Ext.app.JavascriptLogger.addToHistory(errorHandler);
        }
    }

});