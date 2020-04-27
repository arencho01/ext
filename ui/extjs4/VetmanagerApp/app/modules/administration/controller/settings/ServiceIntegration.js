Ext4.define('VetmanagerApp.modules.administration.controller.settings.ServiceIntegration', {
    extend: 'Ext4.app.Controller'
    , mainIndex: 0
    , unisenderIndex: 1
    , smsCenterIndex: 2
    , asteriskIndex: 3
    , vatsIndex: 4
    , idexxIndex: 5
    , restApiIndex: 6
    , pdfApiIndex: 7
    , contactsIndex: 8
    , prescriptionIndex: 9
    , vetkartaIndex: 10
    , views: [
        'VetmanagerApp.modules.administration.view.settings.ServiceIntegration'
        , 'VetmanagerApp.modules.administration.view.settings.ServiceIntegrations.Unisender'
        , 'VetmanagerApp.modules.administration.view.settings.ServiceIntegrations.SmsCenter'
        , 'VetmanagerApp.modules.administration.view.settings.ServiceIntegrations.Contacts'
        , 'VetmanagerApp.modules.administration.view.settings.ServiceIntegrations.VoipAsterisk'
        , 'VetmanagerApp.modules.administration.view.settings.ServiceIntegrations.VoipVats'
        , 'VetmanagerApp.modules.administration.view.settings.ServiceIntegrations.Idexx'
        , 'VetmanagerApp.modules.administration.view.settings.ServiceIntegrations.RestAPI'
        , 'VetmanagerApp.modules.administration.view.settings.ServiceIntegrations.PDFScanner'
        , 'VetmanagerApp.modules.administration.view.settings.ServiceIntegrations.Prescription'
        , 'VetmanagerApp.modules.administration.view.settings.ServiceIntegrations.Vetkarta'
    ]
    , stores: [
        'VetmanagerApp.modules.administration.store.settings.ServiceIntegrations',
        'VetmanagerApp.modules.administration.store.settings.IdexxClinics'
    ]
    , requires: [
        'Ext4.ux.grid.ComboManual',
        'Ext4.ux.form.VatsSettingsForm',
        'Ext4.ux.form.AsteriskSettingsForm',
        'Ext4.ux.form.AsteriskRequestForm',
        'Ext4.ux.form.VoipComboManuals'
    ]
    , refs: [
        {
            ref: 'mainPanel'
            , selector: 'serviceintegration'
            , autoCreate: true
            , xtype: 'serviceintegration'
        },
        {
            ref: 'unisenderPanel'
            , selector: 'settings-unisender-panel'
            , autoCreate: true
            , xtype: 'settings-unisender-panel'
        },
        {
            ref: 'smsCenterPanel'
            , selector: 'settings-sms-center-panel'
            , autoCreate: true
            , xtype: 'settings-sms-center-panel'
        },
        {
            ref: 'contactsPanel'
            , selector: 'settings-contacts-panel'
            , autoCreate: true
            , xtype: 'settings-contacts-panel'
        },
        {
            ref: 'voipPanel'
            , selector: 'settings-voip-asterisk-panel'
            , autoCreate: true
            , xtype: 'settings-voip-asterisk-panel'
        },
        {
            ref: 'vatsPanel'
            , selector: 'settings-voip-vats-panel'
            , autoCreate: true
            , xtype: 'settings-voip-vats-panel'
        },
        {
            ref: 'idexxPanel'
            , selector: 'settings-idexx-panel'
            , autoCreate: true
            , xtype: 'settings-idexx-panel'
        },
        {
            ref: 'restapiPanel'
            , selector: 'settings-restapi-panel'
            , autoCreate: true
            , xtype: 'settings-restapi-panel'
        },
        {
            ref: 'pdfApiPanel'
            , selector: 'settings-pdf-panel'
            , autoCreate: true
            , xtype: 'settings-pdf-panel'
        },
        {
            ref: 'prescriptionPanel'
            , selector: 'settings-prescription-panel'
            , autoCreate: true
            , xtype: 'settings-prescription-panel'
        },
        {
            ref: 'vetkartaPanel'
            , selector: 'settings-vetkarta-panel'
            , autoCreate: true
            , xtype: 'settings-vetkarta-panel'
        }
    ]
    , addons: {}
    , init: function () {

        var obj = {};
            obj['serviceintegration button[action="save"]'] = {click: this.onSave};
            obj['serviceintegration'] = {afterrender: this.onAfterRender};
            obj['serviceintegration button[action="check-asterisk"]'] = {click: this.onCheckAstertiskCDRConnection};
            obj['serviceintegration button[action="check-vats"]'] = {click: this.onCheckVatsCDRConnection};
            obj['serviceintegration button[action="select_unisender"]'] = {click: this.onSelectUnisender};
            obj['serviceintegration button[action="select_sms_center"]'] = {click: this.onSelectSmsCenter};
            obj['serviceintegration button[action="select_voip"]'] = {click: this.onSelectVOIP};
            obj['button[action="back"]'] = {click: this.onBack};
            obj['serviceintegration button[action="save-unisender"]'] = {click: this.onSaveUnisender};
            obj['serviceintegration button[action="save-sms-center"]'] = {click: this.onSaveSmsCenter};
            obj['serviceintegration button[action="save-contacts"]'] = {click: this.onSaveContacts};
            obj['serviceintegration button[action="sms_center_generate_account"]'] = {click: this.onSmsCenterGenerateAccount};
            obj['settings-unisender-panel'] = {activate: this.onActivateChildPanel};
            obj['settings-sms-center-panel'] = {activate: this.onActivateChildPanel};
            obj['settings-voip-asterisk-panel'] = {activate: this.onActivateChildPanel};
            obj['settings-voip-vats-panel'] = {activate: this.onActivateChildPanel};
            obj['settings-contacts-panel'] = {activate: this.onActivateChildPanel};
            obj['serviceintegration button[action="select_widgets"]'] = {click: this.onSelectWidgets};
            obj['serviceintegration button[action="select_contacts"]'] = {click: this.onSelectContacts};
            obj['serviceintegration button[action="generate-rest-api-key"]'] = {click: this.onGenerateRestApiKey};
            obj['serviceintegration button[action="generate-idexx-api-key"]'] = {click: this.onGenerateIdexxApiKey};
            obj['#serviceintegrationslist'] = {
                checkboxClick: this.onSwitchServiceIntagration,
                settingsClick: this.onSettingsServiceIntagration,
                afterrender: this.onAfterRenderServices
            };
            obj['serviceintegration settings-restapi-panel'] = {
                afterrender: this.onAfterRenderRestApiPanel
            };
            obj['serviceintegration settings-pdf-panel'] = {
                afterrender: this.onAfterRenderPdfApiPanel
            };
            obj['serviceintegration button[action="select_prescriptions"]'] = {click: this.onSelectPrescriptions};
            obj['serviceintegration button[action="save_prescriptions"]'] = {click: this.onSavePrescriptions};
            obj['serviceintegration button[action="enable_vetkarta_integration"]'] = {click: this.onEnableVetkartaIntegration};
            obj['serviceintegration button[action="save_users_in_chat"]'] = {click: this.onSaveVetkartaChatUsers};
            obj['serviceintegration button[action="save_domain_client_site"]'] = {click: this.onSaveDomainClientSite};

        this.controlEvents(obj);

    }
    , onSelectIdexx: function(){
        this.getMainPanel().getLayout().setActiveItem(this.idexxIndex);
    }
    , onAfterRenderRestApiPanel: function() {
        var me = this;
        Ext4.Ajax.request({
            url: 'ajax_properties.php'
            , params: {
                cmd: 'get_rest_api_key'
            }
            , success: function(r) {
                var data = Ext.decode(r.responseText);
                me.setRestApiKeyToField(data.data);
            }
        });
    }
    , onSelectRestAPI: function() {
        this.getMainPanel().getLayout().setActiveItem(this.restApiIndex);
    }
    , setRestApiKeyToField: function(restApiKey) {
        var me = this;

        var panel = me.getRestapiPanel();
        var field = panel.items.get(0).getForm().findField('restApiKey');
        field.setValue(restApiKey);
    }
    , setIdexxApiKeyToField: function(data) {
        var panel = this.getIdexxPanel();
        var idexxClinic = panel.items.get(0).getForm().findField('idexxClinic');

        data.forEach(function (v) {
            if (v.title === idexxClinic.getRawValue()) {
                var fld = idexxClinic.next();
                fld.setValue(v.api_key);
                return true;
            }
        });
    }
    , onGenerateRestApiKey: function() {
        var me = this,
            loadMask = me.getMainPanel().loadMask;

        loadMask.msg = 'Ожидайте, идет генерация ключа';  //TODO Translate
        loadMask.show();

        Ext4.Ajax.request({
            url: 'ajax_properties.php'
            , params: {
                cmd: 'generate_rest_api_key'
            }
            , success: function(r) {
                loadMask.hide();
                var data = Ext.decode(r.responseText);
                me.setRestApiKeyToField(data.data);
            }
        });

    }

    , onGenerateIdexxApiKey: function() {
        var panel = this.getIdexxPanel();
        var idexxClinicCombo = panel.items.get(0).getForm().findField('idexxClinic');
        var clinicId = idexxClinicCombo.getValue();

        if (!clinicId) {
            Ext3.MsgManager.alertError(LS.__translate(LS.SystemMessage), LS.__translate(LS.NoClinicSelected));
            return;
        }

        var me = this,
            loadMask = me.getMainPanel().loadMask;

        loadMask.msg = 'Ожидайте, идет генерация ключа'; //TODO Translate
        loadMask.show();

        Ext4.Ajax.request({
            url: 'ajax_properties.php'
            , params: {
                cmd: 'generate_idexx_api_key',
                clinicId: clinicId
            }
            , success: function(r) {
                Common.showErrors(r);

                var data = Ext.decode(r.responseText);
                if(!data.is_error) {
                    me.setIdexxApiKeyToField(data.data);
                }

                loadMask.hide();
            }
        });

    }
    , onAfterRenderPdfApiPanel: function() {
        var me = this;
        Ext4.Ajax.request({
            url: 'ajax_properties.php'
            , params: {
                cmd: 'get_pdf_api_key'
            }
            , success: function(r) {
                var data = Ext.decode(r.responseText);
                me.setPdfApiKeyToField(data.data);
            }
        });
    }
    , onSelectPdfApi: function() {
        this.getMainPanel().getLayout().setActiveItem(this.pdfApiIndex);
    }
    , setPdfApiKeyToField: function(pdfApiKey) {
        var me = this;

        var panel = me.getPdfApiPanel();
        var field = panel.items.get(0).getForm().findField('pdfApiKey');
        field.setValue(pdfApiKey);
    }
    , onSelectWidgets: function(){
        var me = this,
            loadMask = me.getMainPanel().loadMask;

        loadMask.msg = 'Ожидайте, идет авторизация в виджетах';
        loadMask.show();

        Ext4.Ajax.request({
            url: 'ajax_login.php'
            , scope: this
            , params: {
                cmd: 'get_webapps_url'
            }
            , success: function(r) {
                loadMask.hide();
                var result = Ext4.decode(r.responseText);
                window.open(result.webappsUrl, target='_blank');
            }
        });
    }
    , onSelectPrescriptions: function(){
        this.getMainPanel().getLayout().setActiveItem(this.prescriptionIndex);
        var element = this.getPrescriptionPanel().getForm().findField('enable_send_prescription');
        element.setValue(GlobalProperties.get('enable_send_prescription', 'off') == 'on');
    }
    , onSavePrescriptions: function () {
        var element = this.getPrescriptionPanel().getForm().findField('enable_send_prescription');
        var enablePrescriptions = (element.getValue()) ? 'on' : 'off';
        var savedCallback = () => Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.settingsAreSaved));
        GlobalProperties.set('enable_send_prescription', enablePrescriptions, savedCallback);
    }
    , onCheckAstertiskCDRConnection: function() {
        var callback, form;

        callback = function() {
            Ext4.Ajax.request({
                url: 'ajax_voip.php'
                , scope: this
                , params: {
                    cmd: 'check_cdr_ftp_connection'
                }
                , success: function(r) {
                    var result = Ext4.decode(r.responseText);

                    Ext3.MsgManager.alertWarning(LS.__translate(LS.SystemMessage),
                        result.ami_msg + '<br/>' +result.cdr_msg + '<br/>' + result.ftp_msg
                    );
                }
            });

        };
        form = this.getVoipPanel().query("[name='asterisk_settings_form']")[0].getForm();
        return this.onCheckCDRConnection(false, callback, form);
    }
    , onCheckVatsCDRConnection: function() {
        var callback, form;

        callback = function() {
            Ext4.Ajax.request({
                url: 'ajax_voip.php'
                , scope: this
                , params: {
                    cmd: 'check_vats_connection'
                }
                , success: function(r) {
                    var result = Ext4.decode(r.responseText);

                    Ext3.MsgManager.alertWarning(LS.__translate(LS.SystemMessage), result.cdr_msg + '<br/>' + result.ftp_msg);
                }
            });

        };
        form = this.getVatsPanel().query("[name='vats_settings_form']")[0].getForm();
        return this.onCheckCDRConnection(true, callback, form);
    }
    , onCheckCDRConnection: function(isVatsMode, callback, form) {
        isVatsMode = !!isVatsMode;

        GlobalProperties.set('ats_mode', isVatsMode ? 'vats' : 'voip');
        GlobalProperties.setForAllClinics('voip_for_all_clinics', 'off');
        GlobalProperties.set('voip_auto_close_call_alert', 'off');
        GlobalProperties.set('voip_closable_new_call_editor', 'off');

        this.saveForm(callback, form);
    }
    , saveForm: function(callback, form, nameMask, forAllClinics){
        if (!form) {
            var form = this.getMainPanel().getForm();
        }
        if (form.isValid()) {
            var params = form.getFieldValues(), result = [];

            form.getFields().each(function(field) {
                if (field.skipSave === true && params.hasOwnProperty(field.name)) {
                    delete params[field.name];
                } else if (field.getXType() == 'checkboxfield') {
                    params[field.name] = params[field.name] === true ? 'on' : 'off';
                }
            });

            for (var index in params) {
                if (params.hasOwnProperty(index)) {
                    if (index.indexOf('-inputEl') != -1) {
                        continue;
                    } else {
                        if (nameMask != null) {
                            if (index.indexOf(nameMask) != -1) {
                                var val = params[index];
                                result.push([index, val]);
                            }
                        } else {
                            var val = params[index];
                            result.push([index, val]);
                        }
                    }
                }
            }
            var resultLength = result.length;
            for (var i = 0; i < resultLength; i++) {
                var num = i + 1;
                if (num == resultLength) {
                    if (typeof forAllClinics != 'undefined' && forAllClinics) {
                        GlobalProperties.setForAllClinics(result[i][0], result[i][1]
                            , function () {
                                if (callback) callback.call(this);
                                Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.settingsAreSaved));
                            }, this
                        );
                    } else {
                        GlobalProperties.set(result[i][0], result[i][1]
                            , function () {
                                if (callback) callback.call(this);
                                Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.settingsAreSaved));
                            }, this
                        );
                    }
                } else {
                    if (typeof forAllClinics != 'undefined' && forAllClinics) {
                        GlobalProperties.setForAllClinics(result[i][0], result[i][1]);
                    } else {
                        GlobalProperties.set(result[i][0], result[i][1]);
                    }
                }
            }
        }
    }
    , setFieldPropertyValue: function (field, isCombo) {
        if (GlobalProperties.get(field.name)) {
            var setValue = (isCombo) ? field.setLoadValue : field.setValue;

            if (field.getXType() == 'combobox') {
                if (field.store) {
                    setValue.call(field, GlobalProperties.get(field.name));
                } else {
                    console.log('no store');
                }
            } else {
                setValue.call(field, GlobalProperties.get(field.name));
            }
        }
    }
    , onAfterRender: function () {
        this.getMainPanel().loadMask = new Ext.LoadMask(
            this.getMainPanel().el.dom
            , {
                msg: 'Ожидайте, идет создание аккаунта'
            }
        );
    }
    , onActivateChildPanel: function (panel) {
        var childPanelMethod = null;

        switch (panel.xtype) {
            case 'settings-unisender-panel':
                childPanelMethod = 'getUnisenderPanel';
                break;
            case 'settings-sms-center-panel':
                childPanelMethod = 'getSmsCenterPanel';
                break;
            case 'settings-voip-asterisk-panel':
                childPanelMethod = 'getVoipPanel';
                break;
            case 'settings-voip-vats-panel':
                childPanelMethod = 'getVatsPanel';
                break;
            case 'settings-contacts-panel':
                childPanelMethod = 'getContactsPanel';
                break;
        }

        if (childPanelMethod) {
            var form = this[childPanelMethod]().getForm();

            form.getFields().each(function(field) {
                this.setFieldPropertyValue(field);
            }, this);
        }
    }

//////////////////////
    , generatePass: function () {
        var chars = "AaBbCcDdEeFfGgHhJjIiKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789"
            , pass = '';

        for (var i = 0; i < 10; i++) {
            pass += chars[Math.floor((Math.random() * (chars.length-1)) + 0)];
        }

        return pass;
    }
    , onSelectUnisender: function () {
        this.getMainPanel().getLayout().setActiveItem(this.unisenderIndex);

        var isUnisenderSms = GlobalProperties.get('unisender_use_sms', 'off')
            , isSsmCenterSms = GlobalProperties.get('sms_center_use_sms', 'off');

        if (isSsmCenterSms == 'off' && isUnisenderSms == 'off') {
            GlobalProperties.setForAllClinics('unisender_use_sms', 'on');
            GlobalProperties.setForAllClinics('sms_center_use_sms', 'off');
            this.getUnisenderPanel().getForm().findField('unisender_use_sms').setValue(true);
        }
    }
    , onSelectSmsCenter: function () {
        this.getMainPanel().getLayout().setActiveItem(this.smsCenterIndex);

        var form = this.getSmsCenterPanel().getForm()
            , vals = form.getValues();

        if (vals.sms_center_is_registered*1 == 0) {
            this.getSmsCenterPanel().query('panel[name="sms_center_go_to_account"]')[0].hide();
            this.getSmsCenterPanel().query('panel[name="balance-panel"]')[0].hide();
            this.getSmsCenterPanel().query('checkbox[name="sms_center_use_sms"]')[0].hide();

            var domainName = GlobalProperties.get('domain_name', '')
                , newPass = this.generatePass();

            if (domainName != '') {
                form.findField('sms_center_login').setValue('vm_subclient_' + domainName);
            }

            form.findField('sms_center_password').setValue(newPass);
        } else {
            form.findField('sms_account').setValue('Аккаунт сгенерирован, ID: ' + GlobalProperties.get('sms_center_account_id', '0'));

            this.getSmsCenterPanel().query('button[action="sms_center_generate_account"]')[0].hide();
            this.getSmsCenterPanel().query('panel[name="sms_center_go_to_account"]')[0].show();
            this.getSmsCenterPanel().query('checkbox[name="sms_center_use_sms"]')[0].show();
            this.getSmsCenterPanel().query('panel[name="balance-panel"]')[0].show();
            this.getClientBalance(vals.sms_center_login, vals.sms_center_password);
        }

        if (_COUNTRY_ID > 0) {
            form.findField('country_id').setValue(_COUNTRY_ID);
        } else {
            form.findField('country_id').setValue(1);
        }
    }
    , onSelectAsterisk: function() {
        this.getMainPanel().getLayout().setActiveItem(this.asteriskIndex);
        this.getVoipPanel().getForm().findField('voip_ftp_use_ssl').setValue(GlobalProperties.get('voip_ftp_use_ssl', 'off') == 'on');
        this.getVoipPanel().getForm().findField('voip_for_all_clinics').setValue(GlobalProperties.get('voip_for_all_clinics', 'off') == 'on');
    }
    , onSelectVATS: function() {
        this.getMainPanel().getLayout().setActiveItem(this.vatsIndex);
    }
    , onBack: function () {
        this.getMainPanel().getLayout().setActiveItem(this.mainIndex);
    }
    , onSaveUnisender: function () {
        var form = this.getUnisenderPanel().getForm();

        if (!form.isValid()) {
            return null;
        }

        var vals = form.getValues();

        if (vals.unisender_use_sms == 'on') {
            GlobalProperties.setForAllClinics('sms_center_use_sms', 'off');
            var uniForm = this.getSmsCenterPanel().getForm();
            uniForm.findField('sms_center_use_sms').setValue(false);
        }

        this.saveForm(null, form);
    }
    , onSaveSmsCenter: function () {
        var form = this.getSmsCenterPanel().getForm();

        if (!form.isValid()) {
            return null;
        }

        var vals = form.getValues();

        if (vals.country_id*1 > 0) {
            GlobalProperties.setForAllClinics('country_id', vals.country_id);
        }

        if (vals.sms_center_use_sms == 'on') {
            GlobalProperties.setForAllClinics('unisender_use_sms', 'off');
            var uniForm = this.getUnisenderPanel().getForm();
            uniForm.findField('unisender_use_sms').setValue(false);
        }

        if (vals.sms_center_is_registered*1 > 0) {
            if (GlobalProperties.get('sms_center_phone') != vals.sms_center_phone
                || GlobalProperties.get('sms_center_email') != vals.sms_center_email) {

                this.getMainPanel().loadMask.msg = 'Ожидайте, идет редактирование аккаунта';
                this.getMainPanel().loadMask.show();

                Ext4.Ajax.request({
                    url: 'ajax_sms_center.php'
                    , scope: this
                    , timeout: 120000
                    , params: {
                        cmd: 'edit_subclient'
                        , phone: vals.sms_center_phone
                        , email: vals.sms_center_email
                        , user: vals.sms_center_login
                    }
                    , success: function(r) {
                        this.getMainPanel().loadMask.hide();
                        var result = Ext4.decode(r.responseText);

                        if (!result.is_error && result.result == 'OK') {
                            Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), 'Данные изменены');
                        } else {
                            Ext3.MsgManager.alertError(LS.__translate(LS.SystemMessage), result.msg);
                        }
                    }
                });
            }
        }

        this.saveForm(null, form, 'sms_center_', true);

        return form;
    }
    , onSelectContacts: function() {
        this.getMainPanel().getLayout().setActiveItem(this.contactsIndex);
    }
    , onSaveContacts: function() {
        var form = this.getContactsPanel().getForm();

        if (!form.isValid()) {
            return null;
        }

        var vals = form.getValues();

        if (vals.contacts_email_reply_to_all_clinics == 'on') {
            GlobalProperties.setForAllClinics('contacts_email_reply_to_all_clinics', 'on');
            GlobalProperties.setForAllClinics('contacts_email_reply_to', vals.contacts_email_reply_to);
        } else {
            GlobalProperties.setForAllClinics('contacts_email_reply_to_all_clinics', 'off');
            GlobalProperties.set('contacts_email_reply_to', vals.contacts_email_reply_to);
        }
        this.saveForm(null, form);
    }
    , onSmsCenterGenerateAccount: function () {
        var form = this.onSaveSmsCenter();

        if (!form) {
            return;
        }

        var vals = form.getValues();

        this.getMainPanel().loadMask.msg = 'Ожидайте, идет создание аккаунта';
        this.getMainPanel().loadMask.show();

        Ext4.Ajax.request({
            url: 'ajax_sms_center.php'
            , scope: this
            , timeout: 120000
            , params: {
                cmd: 'generate_account'
                , login: vals.sms_center_login
                , password: vals.sms_center_password
                , email: vals.sms_center_email
                , phone: vals.sms_center_phone
                , countryId: vals.country_id
            }
            , success: function(r) {
                this.getMainPanel().loadMask.hide();

                var result = Ext4.decode(r.responseText);

                if (!result.is_error) {
                    var uniForm = this.getUnisenderPanel().getForm();
                    uniForm.findField('unisender_use_sms').setValue(false);
                    form.findField('sms_center_use_sms').setValue(true);

                    GlobalProperties.setForAllClinics('sms_center_use_sms', 'on');
                    GlobalProperties.setForAllClinics('unisender_use_sms', 'off');
                    GlobalProperties.setForAllClinics('sms_center_account_id', result.id);
                    GlobalProperties.setForAllClinics('sms_center_is_registered', 1);
                    GlobalProperties.setForAllClinics('country_id', vals.country_id);

                    form.findField('sms_center_is_registered').setValue(1);
                    form.findField('sms_account').setValue('Аккаунт сгенерирован, ID: ' + result.id);
                    this.getSmsCenterPanel().query('button[action="sms_center_generate_account"]')[0].hide();
                    this.getSmsCenterPanel().query('panel[name="sms_center_go_to_account"]')[0].show();
                    this.getSmsCenterPanel().query('panel[name="balance-panel"]')[0].show();
                    this.getSmsCenterPanel().query('checkbox[name="sms_center_use_sms"]')[0].show();

                    this.setClientStartBalance(vals.sms_center_login, function () {
                        this.getClientBalance(vals.sms_center_login, vals.sms_center_password);
                        this.sendCreateAccountEmail(vals.sms_center_login, vals.sms_center_password, vals.sms_center_email);
                        this.sendCreateAccountSms(vals.sms_center_login, vals.sms_center_password, vals.sms_center_phone);
                        this.editSubclientByParams(vals.sms_center_login);
                    }, this);

                    Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), result.msg);
                } else {
                    Ext3.MsgManager.alertError(LS.__translate(LS.SystemMessage), result.msg);
                }
            }
        });
    }
    , getClientBalance: function (sms_center_login, sms_center_password) {
        var form = this.getSmsCenterPanel().getForm();

        form.findField('sms_center_balance').setValue('Получение баланса ...');

        Ext4.Ajax.request({
            url: 'ajax_sms_center.php'
            , scope: this
            , timeout: 120000
            , params: {
                cmd: 'get_balance'
                , login: sms_center_login
                , password: sms_center_password
            }
            , success: function(r) {
                var result = Ext4.decode(r.responseText);

                if (!result.is_error) {
                    form.findField('sms_center_balance').setValue(result.balance + ' ' + result.currency);
                } else {
                    form.findField('sms_center_balance').setValue('Данные не получены. Возможно аккаунт был удален!!!');
                    Ext3.MsgManager.alertError(LS.__translate(LS.SystemMessage), result.msg);
                }
            }
        });
    }
    , setClientStartBalance: function (sms_center_login, callback, scope) {
        Ext4.Ajax.request({
            url: 'ajax_sms_center.php'
            , scope: this
            , timeout: 120000
            , params: {
                cmd: 'send_create_account_start_money'
                , login: sms_center_login
            }
            , success: function(r) {
                if (callback) {
                    callback.call(scope);
                }
            }
        });
    }
    , sendCreateAccountEmail: function (sms_center_login, sms_center_password, sms_center_email) {
        Ext4.Ajax.request({
            url: 'ajax_sms_center.php'
            , scope: this
            , timeout: 120000
            , params: {
                cmd: 'send_create_account_email'
                , login: sms_center_login
                , password: sms_center_password
                , email: sms_center_email
            }
        });
    }
    , sendCreateAccountSms: function (sms_center_login, sms_center_password, sms_center_phone) {
        Ext4.Ajax.request({
            url: 'ajax_sms_center.php'
            , scope: this
            , timeout: 120000
            , params: {
                cmd: 'send_create_account_sms'
                , login: sms_center_login
                , password: sms_center_password
                , phone: sms_center_phone
            }
        });
    }
    , editSubclientByParams: function (sms_center_login) {
        Ext4.Ajax.request({
            url: 'ajax_sms_center.php'
            , scope: this
            , timeout: 120000
            , params: {
                cmd: 'edit_subclient_settings'
                , login: sms_center_login
                , params: Ext4.encode([
                    'fl2[9]=0'
                    , 'fl2[9]=1'
                ])
            }
        });
    }
    , onAfterRenderServices: function(view) {
        var me = this;
        var store = VetmanagerApp.app.getStore('VetmanagerApp.modules.administration.store.settings.ServiceIntegrations');

        var loadMask = new Ext.LoadMask(
            view.el.dom,
            {
                msg: 'Загрузка'
            }
        );

        loadMask.show();

        Ext4.Ajax.request({
            url: 'ajax_access.php',
            scope: this,
            timeout: 120000,
            params: {
                cmd: 'check_tariff'
            },
            success: function(r) {
                loadMask.hide();
                var result = Ext4.decode(r.responseText);
                if (result.success && result.tariff_addons) {
                    var addons = result.tariff_addons;

                    for (var addonName in addons) {

                        if (addons.hasOwnProperty(addonName)) {
                            var addonAvailable = addons[addonName] == 1;
                            me.addons[addonName] = addonAvailable;

                            var rec = store.getAt(store.find('name', addonName));
                            var serviceEnabled = GlobalProperties.get('service.' + addonName, addonAvailable);
                            serviceEnabled = !Ext.isBoolean(serviceEnabled) ? serviceEnabled == 'on' : serviceEnabled;
                            if (rec) {
                                rec.set('enabled', addonAvailable && serviceEnabled);
                            }
                        }
                    }
                }
            }
        });
    }
    , canEnableService: function(serviceName) {
        var me = this;
        return me.addons[serviceName];
    }
    , setServiceEnabled: function(serviceName, enabled) {
        var me = this;
        GlobalProperties.setForAllClinics('service.' + serviceName, enabled ? 'on' : 'off');
    }
    , onSwitchServiceIntagration: function(view, rec) {
        var me = this,
            serviceName = rec.get('name');
        if (rec.get('enabled')) {
            if (!me.canEnableService(serviceName)) {
                Ext3.MsgManager.alertError(
                    LS.__translate(LS.SystemMessage),
                    'Текущий тариф не позволяет включить интеграцию' +
                    ' "' + rec.get('caption') + '"'
                );
                setTimeout(function() {
                    rec.set('enabled', false);
                }, 250);
                me.setServiceEnabled(serviceName, false);
            } else {
                me.setServiceEnabled(serviceName, true);
            }
        } else {
            me.setServiceEnabled(serviceName, false);
        }
    }
    , onSettingsServiceIntagration: function(view, rec) {
        var me = this;
        if (!rec.get('checkable') || rec.get('enabled')) {
            switch (rec.get('name')) {
                case 'asterisk': {
                    me.onSelectAsterisk();
                    break;
                }
                case 'vats': {
                    me.onSelectVATS();
                    break;
                }
                case 'unisenderIntegration': {
                    me.onSelectUnisender();
                    break;
                }
                case 'smscenterIntegration': {
                    me.onSelectSmsCenter();
                    break;
                }
                case 'idexxIntegration': {
                    me.onSelectIdexx();
                    break;
                }
                case 'restApi': {
                    me.onSelectRestAPI();
                    break;
                }
                case 'pdfScannerIntegration': {
                    me.onSelectPdfApi();
                    break;
                }
                case 'atolIntegration': {
                    break;
                }
                case 'appointmentWidget': {
                    me.onSelectWidgets();
                    break;
                }
                case 'contacts': {
                    me.onSelectContacts();
                    break;
                }
                case 'royalPrescriptions': {
                    me.onSelectPrescriptions();
                }
                case 'vetKarta': {
                    me.onSelectVetkarta();
                    break;
                }
            }
        }
    }
    , isEventExists: function(eventName, selector) {
        return (
            this.application.eventbus.bus
            && this.application.eventbus.bus[eventName]
            && this.application.eventbus.bus[eventName][selector]
        );

    }
    , controlEvents: function (events) {
        var validEvents = {};
        for (var selector in events) {
            if (events.hasOwnProperty(selector)) {
                var event = events[selector];
                for (var eventName in event) {
                    if (event.hasOwnProperty(eventName)) {
                        if (!this.isEventExists(eventName, selector)) {
                            validEvents[selector] = event;
                        }
                    }
                }
            }
        }
        this.control(validEvents);
    }
    , setLoadValue: function(combo, paramName, value) {
        var params = {};
        params[paramName] = value;

        combo.getStore().suspendEvents();
        combo.getStore().load({
            params: params
            , callback: function() {
                combo.getStore().resumeEvents();
                combo.setValue(value);

                if (combo.getStore().find(combo.valueField, combo.value) < 0) {
                    combo.clearValue();
                } else {
                    combo.clearInvalid();
                }
            }
            , scope: this
        });
    }
    , onSelectVetkarta: function () {
        var me = this;

        me.getMainPanel().getLayout().setActiveItem(this.vetkartaIndex);
        me.getMainPanel().loadMask.msg = 'Ожидайте';
        me.getMainPanel().loadMask.show();

        Ext4.Ajax.request({
            url: 'ajax_vetkarta.php'
            , scope: this
            , params: {
                cmd: 'get_vetkarta_data'
            }
            , success: function(r) {
                me.getMainPanel().loadMask.hide();

                var result = Ext4.decode(r.responseText);

                if (!result.is_error) {
                    var panel = me.getVetkartaPanel();

                    if (result.recordExists) {
                        var buttonSave = panel.getDockedItems('toolbar[dock="top"]')[0].items.items[1];
                        buttonSave.enable().unmask();

                        me.getVetkartaPanel().layout.setActiveItem(1);

                        var form = panel.query('fieldset[name="second_form"] > form')[0].getForm(),
                            usersField = form.findField('users_in_chat');

                        usersField.getStore().load({
                            callback: function () {
                                usersField.setValue(result.data.users);
                            }
                        });

                        var publicClientCode = panel.query('fieldset[name="public_script"] > textarea[name="public_script"]')[0];
                        publicClientCode.setValue(result.data.public_script);

                        var domainClientSite = panel.query('fieldset[name="public_script"] > textfield[name="domain_client_site"]')[0];
                        domainClientSite.setValue(result.data.domain_client_site);
                    } else {
                        me.getVetkartaPanel().layout.setActiveItem(0);

                        var form = panel.getForm();

                        form.findField('phone').setValue(result.data.phone);

                        if (result.data.city_id) {
                            me.setLoadValue(form.findField('city_id'), 'city_id', result.data.city_id);
                        }
                    }
                } else {
                    Ext3.MsgManager.alertError(LS.__translate(LS.SystemMessage), result.messages.join('<br/>'));
                }
            }
            , failure: function () {
                me.getMainPanel().loadMask.hide();
            }
        });
    }
    , getClearDomainName: function (url) {
        var pathArray = url.split('/');

        if (pathArray.length > 1) {
            url = pathArray[2];
        } else if (pathArray.length === 1) {
            url = pathArray[0];
        }

        return url.split(':')[0];
    }
    , onEnableVetkartaIntegration: function() {
        var me = this,
            panel = this.getVetkartaPanel(),
            form = panel.query('fieldset[name="first_form"] > form')[0].getForm();

        if (!form.isValid()) {
            Ext3.MsgManager.alertError('Ошибка', 'Необходимо заполнить все поля');
            return;
        }

        if (!form.findField('personal_data_agreement').getValue()) {
            Ext3.MsgManager.alertError('Ошибка', 'Необходимо принять политику обработки персональных данных');
            return;
        }

        var params = form.getValues();

        params.cmd = 'activate_integration';
        params.domain_client_site = me.getClearDomainName(params.domain_client_site);

        me.getMainPanel().loadMask.msg = 'Ожидайте, идет создание аккаунта';
        me.getMainPanel().loadMask.show();

        Ext4.Ajax.request({
            url: 'ajax_vetkarta.php'
            , scope: this
            , timeout: 120000
            , params: params
            , success: function(r) {
                me.getMainPanel().loadMask.hide();

                var result = Ext4.decode(r.responseText);

                if (!result.is_error) {
                    Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), 'Веткарта активирована');

                    me.onSelectVetkarta();
                } else {
                    Ext3.MsgManager.alertError(LS.__translate(LS.SystemMessage), result.messages.join('<br/>'));
                }
            }
            , failure: function () {
                me.getMainPanel().loadMask.hide();
            }
        });
    }
    , onSaveVetkartaChatUsers: function () {
        var me = this,
            panel = this.getVetkartaPanel(),
            form = panel.query('fieldset[name="second_form"] > form')[0].getForm(),
            selectedUsers = form.findField('users_in_chat').getValue();

        me.getMainPanel().loadMask.msg = 'Ожидайте';
        me.getMainPanel().loadMask.show();

        Ext4.Ajax.request({
            url: 'ajax_vetkarta.php'
            , scope: this
            , timeout: 120000
            , params: {
                cmd: 'update_users_in_chat',
                user_ids: Ext.encode(selectedUsers)
            }
            , success: function(r) {
                me.getMainPanel().loadMask.hide();

                var result = Ext4.decode(r.responseText);

                if (!result.is_error) {
                    Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), 'Пользователи успешно отредактированы');
                } else {
                    Ext3.MsgManager.alertError(LS.__translate(LS.SystemMessage), result.messages.join('<br/>'));
                }
            }
            , failure: function () {
                me.getMainPanel().loadMask.hide();
            }
        });
    }
    , onSaveDomainClientSite: function () {
        var me = this,
            panel = this.getVetkartaPanel(),
            domainClientSite = panel.query('fieldset[name="public_script"] > textfield[name="domain_client_site"]')[0];

        if (!domainClientSite.isValid()) {
            Ext3.MsgManager.alertError('Ошибка', 'Необходимо заполнить поле домена');
            return;
        }

        var params = {
            cmd: 'change_client_domain',
            domain_client_site: me.getClearDomainName(domainClientSite.getValue())
        };

        me.getMainPanel().loadMask.msg = 'Ожидайте, идет изменение домена';
        me.getMainPanel().loadMask.show();

        Ext4.Ajax.request({
            url: 'ajax_vetkarta.php'
            , scope: this
            , timeout: 120000
            , params: params
            , success: function(r) {
                me.getMainPanel().loadMask.hide();

                var result = Ext4.decode(r.responseText);

                if (!result.is_error) {
                    Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), 'Домен изменен');
                } else {
                    Ext3.MsgManager.alertError(LS.__translate(LS.SystemMessage), result.messages.join('<br/>'));
                }
            }
            , failure: function () {
                me.getMainPanel().loadMask.hide();
            }
        });
    }
});