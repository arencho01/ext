Ext4.define('VetmanagerApp.modules.administration.controller.settings.Numbering', {
    extend: 'Ext4.app.Controller'
    , xtype: 'numbering'
    , views: [
        'VetmanagerApp.modules.administration.view.settings.Numbering'
    ]
    , refs: [
        {
            ref: 'mainPanel'
            , selector: 'numbering_view'
            , autoCreate: true
            , xtype: 'numbering_view'
        }
        , {
            ref: 'storeNumberingAutomatic'
            , selector: 'numbering_view combo[name="storeNumberingAutomatic"]'
        }
        , {
            ref: 'storeNumberingByClinic'
            , selector: 'numbering_view combo[name="storeNumberingByClinic"]'
        }
        , {
            ref: 'storeFieldsetCheckbox'
            , selector: 'numbering_view checkbox[name="numberingStoreFieldset-checkbox"]'
        }
        , {
            ref: 'storeFieldset'
            , selector: 'numbering_view fieldset[name="numberingStoreFieldset"]'
        }
    ]
    , init: function() {
        this.addEvents('close', 'save');
        
        var obj = {};

        if (!this.isEventExists('afterrender', 'numbering_view')) {
            obj['numbering_view'] = {afterrender: this.onAfterRender};
        }
        if (!this.isEventExists('click', 'numbering_view button[action="save"]')) {
            obj['numbering_view button[action="save"]'] = {click: this.onSave};
        }
        
        this.control(obj);
    }
    , isEventExists: function(eventName, selector) {
        if (this.application.eventbus.bus[eventName] != null
            && this.application.eventbus.bus[eventName][selector] != null) {
            return true;
        }

        return false;
    }
    , onAfterRender: function(view){
        this.refresh();
    }
    , onSave: function(btn){
        var frm = this.getMainPanel()
            , self = this
            , counter = 0;
            
        if (!frm.getActiveTab().getForm().isValid()) {
            return;
        }
        
        this.myMask = new Ext4.LoadMask(frm.getEl(), { msg: LS.__translate(LS.PleaseWait) });
        this.myMask.show();

        var storeEnabled = !this.getStoreFieldset().collapsed,
            storeByClinic = this.getStoreNumberingByClinic().getValue(),
            storeAutomatic = this.getStoreNumberingAutomatic().getValue(),
            prevStoreEnabled = parseInt(GlobalProperties.get('numbering-store-enabled', 0)),
            prevStoreByClinic = parseInt(GlobalProperties.get('numbering-store-group-by-clinic', 0)),
            prevStoreAutomatic = parseInt(GlobalProperties.get('numbering-store-automatic', 1));

        var onSave = function() {
            if (storeEnabled && (storeAutomatic || !prevStoreByClinic && storeByClinic)) {
                Ext.Ajax.request({
                    url: 'ajax_properties.php',
                    params: {
                        cmd: 'recalc_doc_number'
                    },
                    callback: function() {
                        self.myMask.hide();
                        Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.settingsAreSaved));
                    }
                })
            } else {
                self.myMask.hide();
                Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.settingsAreSaved));
            }
        };

        GlobalProperties.setForAllClinics('numbering-store-enabled',         storeEnabled);
        GlobalProperties.setForAllClinics('numbering-store-automatic',       storeAutomatic);
        GlobalProperties.setForAllClinics('numbering-store-group-by-clinic', storeByClinic, onSave);

    }
    , refresh: function() {
        var storeAutomatic = parseInt(GlobalProperties.get('numbering-store-automatic', 1)),
            storeByClinic = parseInt(GlobalProperties.get('numbering-store-group-by-clinic', 0));

        this.getStoreNumberingByClinic().setValue(storeByClinic);
        this.getStoreNumberingAutomatic().setValue(storeAutomatic);
        this.getStoreFieldset().setExpanded(GlobalProperties.get('numbering-store-enabled', 0) > 0);
    }
});