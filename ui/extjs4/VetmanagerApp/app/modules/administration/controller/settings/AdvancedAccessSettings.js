Ext4.define('VetmanagerApp.modules.administration.controller.settings.AdvancedAccessSettings', {
    extend: 'Ext4.app.Controller'
    , views: [
        'VetmanagerApp.modules.administration.view.settings.AdvancedAccessSettings'
    ]
    , requires: [
        'Ext4.ux.form.ItemSelector'
    ]
    , refs: [
        {
            ref: 'mainPanel'
            , selector: 'advancedaccesssettings'
            , autoCreate: true
            , xtype: 'advancedaccesssettings'
        }
    ]
    , init: function() {
        var obj = {};
        if (!this.isEventExists('click', 'advancedaccesssettings button[action="save"]')) {
            obj['advancedaccesssettings button[action="save"]'] = {click: this.onSave};
        }

        if (!this.isEventExists('afterrender', 'advancedaccesssettings form')) {
            obj['advancedaccesssettings form'] = {afterrender: this.onAfterRender};
        }

        this.control(obj);
    }
    , onAfterRender: function() {
        var form = this.getMainPanel().getActiveTab();
        this.setAccessData(form.accessType);
    }
    , setAccessData: function(type) {
        Ext4.Ajax.request({
            url: 'ajax_administration.php'
            , scope: this
            , params: {
                cmd: 'get_access_settings'
                , type: type
            }
            , success: function(r) {
                var result = Ext4.decode(r.responseText)
                    , form = this.getMainPanel().getActiveTab().getForm();

                form.findField(type).setValue(result.data);
            }
        });
    }
    , onSave: function() {
        var form = this.getMainPanel().getActiveTab().getForm()
            , values = form.getValues()
            , type = ''
            , value = '';

        for(var t in values) {
            type = t;
            value = values[type];
            break;
        }

        Ext4.Ajax.request({
            url: 'ajax_administration.php'
            , scope: this
            , params: {
                cmd: 'save_access_settings'
                , type: type
                , value: value
            }
            , success: function() {
                this.onAfterRender();
                Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.DataAreKept));
            }
        });
    },
    isEventExists: function(eventName, selector) {
        if (this.application.eventbus.bus[eventName] != null
            && this.application.eventbus.bus[eventName][selector] != null) {
            return true;
        }

        return false;
    }
});