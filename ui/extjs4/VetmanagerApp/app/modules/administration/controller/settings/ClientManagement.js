Ext4.define('VetmanagerApp.modules.administration.controller.settings.ClientManagement', {
    extend: 'Ext4.app.Controller'
    , views: [
        'VetmanagerApp.modules.administration.view.settings.ClientManagement',
        'VetmanagerApp.modules.administration.view.settings.client.TimeRulesGrid',
        'VetmanagerApp.modules.administration.view.settings.client.TimeRulesWindow'
    ]
    , stores: [
        'VetmanagerApp.modules.administration.store.settings.client.TimeRules',
        'VetmanagerApp.modules.administration.store.settings.medcards.MeetReasons'
    ]
    , models: [
        'VetmanagerApp.modules.administration.model.settings.client.TimeRule'
    ]
    , refs: [
        {
            ref: 'mainPanel'
            , selector: 'clientmanagement'
            , autoCreate: true
            , xtype: 'clientmanagement'
        }
        , {
            ref: 'rulesGrid'
            , selector: 'clientmanagement client-time-rules-settings'
            , autoCreate: true
            , xtype: 'client-time-rules-settings'
        }
    ]
    , init: function() {
        var obj = {};
        if (!this.isEventExists('click', 'clientmanagement button[action="save"]')) {
            obj['clientmanagement button[action="save"]'] = {click: this.onSave};
        }

        if (!this.isEventExists('afterrender', 'clientmanagement form')) {
            obj['clientmanagement form'] = { afterrender: this.onAfterRender};
        }

        if (!this.isEventExists('select', 'verticaltabs[name="client-filter-block"]')) {
            obj['verticaltabs[name="client-filter-block"]'] = { select: this.clientFilterTabSelect};
        }

        if (!this.isEventExists('activate', 'clientmanagement panel[name="client-filter-main-panel"] > panel')) {
            obj['clientmanagement panel[name="client-filter-main-panel"] > panel'] = { activate: this.activateFilterSettingsTab};
        }

        if (!this.isEventExists('click', 'clientmanagement client-time-rules-settings button[action="add"]')) {
            obj['clientmanagement client-time-rules-settings button[action="add"]'] = { click: this.onAddTimeRule};
        }

        if (!this.isEventExists('click', 'clientmanagement client-time-rules-settings button[action="edit"]')) {
            obj['clientmanagement client-time-rules-settings button[action="edit"]'] = { click: this.onEditTimeRule};
        }

        if (!this.isEventExists('click', 'clientmanagement client-time-rules-settings button[action="delete"]')) {
            obj['clientmanagement client-time-rules-settings button[action="delete"]'] = { click: this.onDeleteTimeRule};
        }

        this.control(obj);
    }
    , activateFilterSettingsTab: function(p) {
        var el = p.child('itemselector');

        if (el != null && '' != el.filter_type) {
            this.setFilterData(el.filter_type, el);
        }
    }
    , setFilterData: function(type, element) {
        Ext4.Ajax.request({
            url: 'ajax_administration.php'
            , scope: this
            , params: {
                cmd: 'get_filter_settings'
                , type: type
            }
            , success: function(r) {
                var result = Ext4.decode(r.responseText);

                element.setValue(result.data);
            }
        });
    }
    , clientFilterTabSelect: function() {
        var panel = this.getMainPanel().query('panel[name="client-filter-main-panel"]')[0];
        var panel2 = this.getMainPanel().query('verticaltabs')[0];

        var number = panel2.selModel.getSelection()[0].raw.number;
        panel.getLayout().setActiveItem(number);
    }
    , onSave: function() {
        if (LS.__translate(LS.GeneralSettings) == this.getMainPanel().getActiveTab().title) {
            var panel = this.getMainPanel().getActiveTab()
                , form = panel.getForm()
                , values = form.getValues()
                , type = ''
                , value = ''
                , params = {};

            if (panel.accessType != false) {
                for(var t in values) {
                    type = t;
                    value = values[type];
                    break;
                }

                params = {
                    cmd: 'save_access_settings'
                    , type: type
                    , value: value
                };
            } else {
                params = {
                    cmd: 'save_client_colors_and_filter'
                    , plusBelens: values.positive_balance
                    , zeroBelens: values.zero_balance
                    , minusBelens: values.negative_balance
                    , blacklist: values.blacklist
                    , activeClients: values.active_clients
                    , disabledClients: values.deactived_clients
                    , temporaryClients: values.temporary_clients
                    , force_filter: (values.force_filter == 'on') ? 1 : 0
                };
            }

            Ext4.Ajax.request({
                url: 'ajax_administration.php'
                , scope: this
                , params: params
                , success: function(a, par) {
                    if (par.params.cmd != 'save_client_colors_and_filter') {
                        this.onAfterRender();
                    }

                    Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.DataAreKept));
                }
            });
        } else if (this.getMainPanel().getActiveTab().title == LS.__translate(LS.TimeRules)) {
            Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.DataAreKept));
        } else {
            var panel = this.getMainPanel().query('panel[name="client-filter-main-panel"]')[0]
                , item = panel.getLayout().getActiveItem()
                , el = item.child('itemselector');

            if (el != null && '' != el.filter_type) {
                Ext4.Ajax.request({
                    url: 'ajax_administration.php'
                    , scope: this
                    , params: {
                        cmd: 'save_filter_settings'
                        , type: el.filter_type
                        , val: Ext4.encode(el.getValue())
                    }
                    , success: function() {
                        Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.DataAreKept));
                    }
                });
            }
        }
    }
    , onAfterRender: function() {
        var form = this.getMainPanel().getActiveTab();

        if (form.accessType != false) {
            this.setAccessData(form.accessType);
        } else {
            this.setGeneralData();
        }
    }
    , setGeneralData: function() {
        var form = this.getMainPanel().getActiveTab().getForm();

        if (LS.__translate(LS.GeneralSettings) == this.getMainPanel().getActiveTab().title) {
            form.setValues({
                positive_balance: '#' + this.rgbToHex(getCss('.client-plus-balance', 'backgroundColor'))
                , zero_balance: '#' + this.rgbToHex(getCss('.client-zero-balance', 'backgroundColor'))
                , negative_balance: '#' + this.rgbToHex(getCss('.client-minus-balance', 'backgroundColor'))
                , blacklist: '#' + this.rgbToHex(getCss('.client-blacklist', 'backgroundColor'))
                , active_clients: '#' + this.rgbToHex(getCss('.client-activated-legend', 'color'))
                , deactived_clients: '#' + this.rgbToHex(getCss('.client-disabled-legend', 'color'))
                , temporary_clients: '#' + this.rgbToHex(getCss('.client-temporary-legend', 'color'))
            });

            Ext4.Ajax.request({
                url: 'ajax_administration.php'
                , scope: this
                , params: {
                    cmd: 'get_clients_general_settings'
                }
                , success: function(r) {
                    var result = Ext4.decode(r.responseText);

                    form.findField('force_filter').setValue(result.data.force_filter);
                }
            });
        } else if (this.getMainPanel().getActiveTab().title == LS.__translate(LS.TimeRules)) {
            debugger;
        } else {
            var panel = this.getMainPanel().query('verticaltabs')[0];
            panel.selModel.select(0);
        }
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
    , rgbToHex: function(num){
        if(!num) return 'FFFFFF';

        var decToHex="";
        var prr = [];
        var arr = [];
        var numStr = new String();
        numStr = num;

        try{
            arr = numStr.replace('rgb(', '').replace(')', '').split(", ");
        }
        catch(err){alert(err);}

        for(var i=0;i<3;i++){
            var hexArray = new Array( "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F" );
            var code1 = Math.floor(arr[i] / 16);
            var code2 = arr[i] - code1 * 16;
            decToHex += hexArray[code1];
            decToHex += hexArray[code2];
        }
        return (decToHex);
    }
    , setCss: function( selector, property, value ){
        var i, r, s;

        for(var j = 0; j < document.styleSheets.length; j++){
            s = document.styleSheets[j];
            if(s){
                r = s.rules ? s.rules : s.cssRules;
                if(r){
                    i = r.length;
                    while (i--){
                        if(r[i].selectorText != null && r[i].selectorText.toLowerCase() === selector.toLowerCase()) {
                            r[i].style[property] = value;
                            return (r[i].style[property] == value);
                        }
                    }
                }
            }
        }
        return false;
    }
    , onAddTimeRule: function() {
        var win = this.getTimeRuleWindow();
        win.show();
    }
    , onEditTimeRule: function() {
        var rec = this.getMainPanel().query('client-time-rules-settings grid')[0].selModel.getSelection()[0];
        if (!rec) {
            Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.RecordIsntChosen));
        } else {
            var win = this.getTimeRuleWindow(rec);
            win.show();
        }
    }
    , onDeleteTimeRule: function() {
        var me = this,
            rec = me.getMainPanel().query('client-time-rules-settings grid')[0].selModel.getSelection()[0];
        if (!rec) {
            Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.RecordIsntChosen));
        } else {
            if (rec.get('admission_type_id') == 0) {
                Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.CantDeleteRuleItIsSystem));
            } else {
                Ext4.MessageBox.confirm(LS.__translate(LS.RemovalOfRecord), LS.__translate(LS.YouReallyWantToRemoveThisRecord), function(btn) {
                    if (btn == 'no') return;
                    Ext.Ajax.request({
                        url: 'ajax_administration.php',
                        params: {
                            id: rec.get('id'),
                            cmd: 'delete_client_time_rules'
                        },
                        success: function() {
                            me.getMainPanel().query('client-time-rules-settings grid')[0].store.load();
                        }
                    });
                }, this);
            }
        }
    }
    , getTimeRuleWindow: function(rec) {
        var me = this,
            gridStore = me.getMainPanel().query('client-time-rules-settings grid')[0].store,
            hideCombo = false;

        var changeTime = function(fld) {
        };

        var defaultAdmission = null;
        VetmanagerApp.app.getStore('VetmanagerApp.modules.administration.store.settings.medcards.MeetReasons').each(function(rec) {
            if (!gridStore.findRecord('admission_type_id', rec.get('value'))) {
                defaultAdmission = rec.get('value');
                return false;
            }
        });

        if (rec && (parseInt(rec.get('admission_type_id')) || 0) == 0) {
            hideCombo = true;
        }

        var win = new VetmanagerApp.modules.administration.view.settings.client.TimeRulesWindow({
            defaultAdmission: defaultAdmission,
            hideAdmissionCombo: hideCombo,
            gridStore: gridStore,
            rec: rec
        });

        win.updateTimesGraph();

        return win;
    }
    , isEventExists: function(eventName, selector) {
        if (this.application.eventbus.bus[eventName] != null
            && this.application.eventbus.bus[eventName][selector] != null) {
            return true;
        }

        return false;
    }
});