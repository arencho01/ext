Ext4.define('VetmanagerApp.modules.administration.controller.settings.ChangePassword', {
    extend: 'Ext4.app.Controller'
    , views: [
        'VetmanagerApp.modules.administration.view.settings.ChangePassword'
    ]
    , refs: [
        {
            ref: 'mainPanel'
            , selector: 'changepassword form'
            , autoCreate: true
            , xtype: 'changepassword'
        }
    ]
    , init: function() {

        var obj = {};

        if (!this.isEventExists('afterrender', 'changepassword')) {
            obj['changepassword'] = {afterrender: this.onAfterRender};
        }

        if (!this.isEventExists('click', 'changepassword button[action="save"]')) {
            obj['changepassword button[action="save"]'] = {click: this.onSave};
        }

        this.control(obj);
    }
    , onAfterRender: function () {
        var form = this.getMainPanel().getActiveTab().getForm()
            , value = GlobalProperties.get('month_change_pass', '0');

        form.findField('month_change_pass').setValue(value);
    }
    , onSave: function(btn) {
        var form = this.getMainPanel().getActiveTab().getForm();
        if (form.isValid()) {
            form.submit({
                success: function(form, action) {
                   Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), action.result.msg);
                }
                , failure: function(form, action) {
                    Ext3.MsgManager.alert(LS.__translate(LS.Error), action.result.msg);
                }
            });
        }
    }
    , isEventExists: function(eventName, selector) {
        if (this.application.eventbus.bus[eventName] != null
            && this.application.eventbus.bus[eventName][selector] != null) {
            return true;
        }

        return false;
    }
});