/*!
 * Ext JS Library 3.1.1
 * Copyright(c) 2006-2010 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.app.Module = function(config){
    Ext.apply(this, config);
    Ext.app.Module.superclass.constructor.call(this);
    this.init(config);
};

Ext.extend(Ext.app.Module, Ext.util.Observable, {
    init : Ext.emptyFn
    , all_access: null
    , access: null
    , errorTitle: LS.__translate(LS.Error)
    , warningTitle: LS.__translate(LS.Attention)
    , errorAccessMessege: LS.__translate(LS.AccessError)
    , warningAccessDenied: LS.__translate(LS.YouHaveNoAccessOnThisModule)
    , moduleWidth: 0
    , moduleHeight: 0
    , moduleCyrName: 'module name'
    , idPrefix: ''
    , toDestroyObjects: []
    , toClearObjects: []
    , onShowRefreshModuleData: function() {}
    , destroyObjectProperties: function(object, objectsName) {
        Ext.each(objectsName, function(name){
            Ext.destroyMembers(object, name);
        });
    }
    , clearObjectProperties: function(object, objectsName) {
        Ext.each(objectsName, function(name){
            object[name] = null;
        });
    }
    , destroyObjects: function(){
        this.destroyObjectProperties(this, this.getToDestroyObjects());
    }
    , clearObjects: function(){
        this.clearObjectProperties(this, this.getToClearObjects());
    }
    , getToClearObjects: function(){
        return this.toClearObjects;
    }
    , getToDestroyObjects: function(){
        return this.toDestroyObjects;
    }
    , getPrefixId: function(id){ // returns unique id for same modules with different idPrefix
        return this.idPrefix + '-' + id;
    }
    , getPrefixIdForPrefix: function(id, prefix){
        return prefix + '-' + id;
    }
    , getCmp: function(id){
        return Ext.getCmp(id);
    }
    , getWidth: function() {
        return Ext.app.PanelsManager.mainPanel.getWidth();
    }
    , getHeight: function() {
        return Ext.app.PanelsManager.mainPanel.getHeight();
    }
    , recalcModuleSize: function() {
        this.moduleWidth = Ext.app.PanelsManager.mainPanel.getWidth();
        this.moduleHeight = Ext.app.PanelsManager.mainPanel.getHeight();
        Ext.app.PanelsManager.moduleWidth = this.moduleWidth;
        Ext.app.PanelsManager.moduleHeight = this.moduleHeight;
    }
    , checkAccessForModule: function(module, action) {
        if ('medcards' == module) {
            module = 'medicalcards';
        }

        if (this.all_access[module.toLowerCase()] != null) {
            return this.all_access[module.toLowerCase()][action] === true;
        }
        return false;
    }
    , checkAccess : function(action, msg){
        if (!this.access){
            if (msg !== false) {
                this.alertError(msg || this.errorAccessMessege);
            } else {
                //console.error('не указано access');
            }
            return false;
        }

        var accessed = false;
        if (Ext.isArray(action)){
            for (var i = 0; i < action.length; i++){
                if (this.access[action[i]] === true){
                    accessed = true;
                }
            }
        }else{
            accessed = this.access[action] === true;
        }

        if (msg !== false && !accessed){
            this.alertError(msg || this.errorAccessMessege);
        }

        return accessed;
    }
    , alertError: function(messege, title) {
        var titleMessege = (!title) ? this.errorTitle : title;
         Ext.Msg.show({
            title: titleMessege
            , msg: messege
            , buttons: Ext.Msg.OK
            , icon: Ext.MessageBox.ERROR
         });
    }
    , alertWarning: function(messege, title){
         var titleMessege = (!title) ? this.warningTitle : title;
         Ext.Msg.show({
            title: titleMessege
            , msg: messege
            , minWidth: 400
            , buttons: Ext.Msg.OK
            , icon: Ext.MessageBox.WARNING
         });
    }
    , ajaxRequest: function(params){
        params.url = (!params.url) ? this.getRequestUrl() : params.url;
        return Ext.Ajax.request(params);
    }
    , getRequestUrl: function(){
        return this.requestUrl;
    }
    , errorAccess: function(){
        this.alertError(this.errorAccessMessege);
    }
    , deniedAccess: function(){
        this.alertWarning(this.warningAccessDenied);
    }
    , roundFloat: function(digit, afterDot) {
        return Ext.util.Format.round(digit, afterDot);
    }
    , hasAccess: function(moduleName, callback){
        if(moduleName == null || moduleName == ''){
            this.alertError('Не указано имя модуля', 'Ошибка');
        } else {
            Ext.Ajax.request({
                url: 'ajax_access.php'
                , scope: this
                , success: function(response){
                    var data = Ext.decode(response.responseText);
                    this.access = data.access;
                    Ext.conf.params.clients_filter_force = data.clients_filter_force;
                    Ext.app.Module.prototype.all_access = data.all_access;
                    Ext.all_filters = data.all_filters;
                    Ext.can_select_responsibles = data.can_select_responsibles;
                    Ext.conf.params.total_customer_base = data.total_customer_base*1;
                    Ext.conf.params.show_store_party_accounting = data.show_store_party_accounting*1;
                    Ext.conf.params.show_inventar_sale_params = data.show_inventar_sale_params*1;
                    Ext.conf.params.notification_frequency = data.notification_frequency;
                    Ext.conf.params.show_vaccine_dialog = data.show_vaccine_dialog*1;
                    Ext.conf.params.show_admission_status_dlg_on_medcard_save = data.show_admission_status_dlg_on_medcard_save*1;
                    Ext.conf.params.show_admission_status_dlg_on_invoice_save = data.show_admission_status_dlg_on_invoice_save*1;

                    if(this.access !== null && this.access['view']) {
                        callback.call(this, this.access);
                    } else {
                        this.alertError('У вас нет доступа на просмотр модуля!', 'Ошибка');
                    }
                }
                , failure: function(){
                    this.alertError('Ошибка доступа!', 'Ошибка');
                }
                , params: {
                    'cmd': 'get_access'
                    , 'module_name': moduleName
                }
            });
        }
    }
    , getAccess: function(moduleName, number, name){
        if(moduleName == null || moduleName == ''){
            this.alertError('Не указано имя модуля', 'Ошибка');
        } else {
            var loadMask = new Ext.LoadMask(Ext.app.PanelsManager.mainPanel.getEl(), {msg:LS.__translate(LS.LoadingDots)});
            loadMask.show();
            Ext.Ajax.request({
                url: 'ajax_access.php'
                , scope: this
                , success: function(response) {
                    loadMask.hide();
                    var data = Ext.decode(response.responseText);
                    this.access = data.access;
                    Ext.conf.params.clients_filter_force = data.clients_filter_force;
                    Ext.app.Module.prototype.all_access = data.all_access;
                    Ext.all_filters = data.all_filters;
                    Ext.can_select_responsibles = data.can_select_responsibles;
                    Ext.use_invoice_html_printform = data.use_invoice_html_printform*1;
                    Ext.use_payment_html_printform = data.use_payment_html_printform*1;
                    Ext.conf.params.total_customer_base = data.total_customer_base*1;
                    Ext.conf.params.show_store_party_accounting = data.show_store_party_accounting*1;
                    Ext.conf.params.show_inventar_sale_params = data.show_inventar_sale_params*1;
                    Ext.conf.params.notification_frequency = data.notification_frequency;
                    Ext.conf.params.show_vaccine_dialog = data.show_vaccine_dialog*1;
                    Ext.conf.params.show_admission_status_dlg_on_medcard_save = data.show_admission_status_dlg_on_medcard_save*1;
                    Ext.conf.params.show_admission_status_dlg_on_invoice_save = data.show_admission_status_dlg_on_invoice_save*1;

                    if(this.access !== null && this.access['view']) {
                        this.addPanelToTab(this.getMainPanel(), number, this, name);
                    } else {
                        this.alertError('У вас нет доступа на просмотр модуля!', 'Ошибка');
                    }
                }
                , failure: function(){
                    loadMask.hide();
                    this.alertError('Ошибка доступа!', 'Ошибка');
                }
                , params: {
                    'cmd': 'get_access'
                    , 'module_name': moduleName
                }
            });
        }
    }
    , isAdmin: function() {
        return this.all_access && this.all_access._is_admin;
    }
    , getMainPanel: function() {
        // this method for creating main module tab, must be overrited
        return {html: '<center><h1 style="margin-top:100px;">It work\'s!!!</h1></center>'};
    }
    , addPanelToTab: function(panel, number, module, name) {
        if(panel !== null){
            Ext.app.PanelsManager.addMainPanel(panel, number, this.moduleCyrName, module, name);
        }
    }
    , createMainPanel: function(number, name) {
        this.getAccess((!isNaN(this.moduleName) && this.moduleName !== '')? this.moduleName: this.id, number, name);
    }
    , createNewTab: function(panel, config) {
        Ext.app.PanelsManager.addChildPanel(panel, config, this);
    }
    , closeTabById: function(id) {
        Ext.app.PanelsManager.deletePanel(id);
    }
    , configureComboWithoutPurge: function(combo, value, paramKey, callback) {
        //combo.store.purgeListeners();
        combo.store.on('load', function(){
            combo.setLoadValue(value);
            if (callback) {
                callback.call(this, value);
            }
        }, this, {single: true});
        var params = {};
        params[paramKey] = value;
        combo.store.load({params: params});
    }
    , configureCombo: function(combo, value, paramKey, callback) {
        combo.store.purgeListeners();
        combo.store.on('load', function(){
            combo.setValue(value);
            if (callback) {
                callback.call(this, value);
            }
        }, this, {single: true});
        var params = {};
        params[paramKey] = value;
        combo.store.load({params: params});
    }
    , setFormValuesByName: function(form, data){
        if (data && form){
            for (var i in data) {
                if (!data.hasOwnProperty(i)) continue;
                var name = (!form.nameWrapper) ? i : form.nameWrapper.replace('%s', i);
                var field = form.find('name', name)[0];
                if (!field && form.form){
                    field = form.form.findField(name);
                }
                if (field) {
                    var setMethod = (field.isXType('label')) ? field.setText : field.setValue;
                    if (field.isXType('combo') || field.xtype == 'combo' && Ext.isFunction(field.setLoadValue)) {
                           setMethod = field.setLoadValue;
                    }
                    var value = (Ext.isFunction(data[i])) ? data[i]() : data[i];
                    try{
                        setMethod.call(field, Common.renderDateTime(value));
                    } catch(err) {
                        console.log(err);
                    }
                }
            }
        }
    }
    , setReportFormValuesByName: function(form, data){
        var suspendedFieds = [];
        if (data && form){
            for (var i in data) {
                if (!data.hasOwnProperty(i)) continue;
                var name = (!form.nameWrapper) ?  i : form.nameWrapper.replace('%s', i);
                var field = form.find('name', name)[0];
                if (field) {
                    field.suspendEvents(false);
                    suspendedFieds.push(field);
                    var setMethod = (field.isXType('label')) ? field.setText : field.setValue;
                    var value = (Ext.isFunction(data[i])) ? data[i]() : data[i];
                    if (field.isXType('datefield')) {
                        value = this.getDateFieldValue(value);
                    }
                    try {
                        if (field.isXType('combo') || field.xtype == 'combo') {
                            this.setComboValueDataByName(field, data, name);
                        } else {
                            setMethod.call(field, value);
                        }
                    } catch(err) {
                        console.log(err);
                    }

                }
            }
        }
        Ext.each(suspendedFieds, function(field){
            field.resumeEvents();
        });
    }
    , setComboValueDataByName: function(combo, allData, name){
        var value = allData[name];
        switch (name) {
            case 'master_report' : {
                combo.setValue(value);
                break;
            }
            case 'city': {
                if (value) {
                    combo.getStore().load({ // set the new city in combo
                        params:{cmd: 'get_cities', city_id : value}
                        , callback:function(result) {
                            combo.setValue(result[0].data.id);
                        }
                    });
                }
                break;
            }
            case 'client_type': {
                this.configureCombo(combo, value, 'type_id');
                break;
            }
            case 'pet_type': {
                this.configureCombo(combo, value, 'pet_type');
                break;
            }
            case 'breed' : {
                combo.enable();
                this.configureCombo(combo, value, 'breed_id');
                combo.getStore().setBaseParam('pet_type_id', allData['pet_type']);
                break;
            }
            case 'doctor' : {
                combo.setValue(value);
                break;
            }
            case 'meet_result' : {
                this.configureCombo(combo, value, 'id');
                break;
            }
            default: {
                combo.setValue(value);
                break;
            }
        }
    }
    , getDateFieldValue: function(value){
        return (Ext.isString(value) && value) ? new Date(value) : value;
    }
    , onLink: function(propName, link) {

    }
});