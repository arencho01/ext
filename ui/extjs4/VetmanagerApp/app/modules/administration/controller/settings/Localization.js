Ext4.define('VetmanagerApp.modules.administration.controller.settings.Localization', {
    extend: 'Ext4.app.Controller'
    , xtype: 'localization'
    , views: [
        'VetmanagerApp.modules.administration.view.settings.Localization'
    ]
    , refs: [
        {
            ref: 'mainPanel'
            , selector: 'localization_view'
            , autoCreate: true
            , xtype: 'localization_view'
        }
        , {
            ref: 'defaultDigits'
            , selector: 'localization_view numberfield[name="default"]'
        }
        , {
            ref: 'storeDigits'
            , selector: 'localization_view numberfield[name="store"]'
        }
        , {
            ref: 'cassaDigits'
            , selector: 'localization_view numberfield[name="digits-cassa"]'
        }
        , {
            ref: 'quantityDefaultDigits'
            , selector: 'localization_view numberfield[name="quantity-default"]'
        }
        , {
            ref: 'currencySplit'
            , selector: 'localization_view checkbox[name="split"]'
        }
        , {
            ref: 'currencyName'
            , selector: 'localization_view textfield[name="currencyName"]'
        }
        , {
            ref: 'currencyFull'
            , selector: 'localization_view textfield[name="currencyFull"]'
        }
        , {
            ref: 'currencyFullGenitive'
            , selector: 'localization_view textfield[name="currencyFullGenitive"]'
        }
        , {
            ref: 'currencyFullMany'
            , selector: 'localization_view textfield[name="currencyFullMany"]'
        }
        , {
            ref: 'currencyFullGender'
            , selector: 'localization_view textfield[name="currencyFullGender"]'
        }
        , {
            ref: 'currencyCentName'
            , selector: 'localization_view textfield[name="currencyCentName"]'
        }
        , {
            ref: 'currencyCentFull'
            , selector: 'localization_view textfield[name="currencyCentFull"]'
        }
        , {
            ref: 'currencyCentFullGenitive'
            , selector: 'localization_view textfield[name="currencyCentFullGenitive"]'
        }
        , {
            ref: 'currencyCentFullMany'
            , selector: 'localization_view textfield[name="currencyCentFullMany"]'
        }
        , {
            ref: 'currencyCentFullGender'
            , selector: 'localization_view textfield[name="currencyCentFullGender"]'
        }
        , {
            ref: 'currencyAlign'
            , selector: 'localization_view combo[name="currencyAlign"]'
        }
        , {
            ref: 'unisenderPhonePristavka'
            , selector: 'localization_view textfield[name="unisender_phone_pristavka"]'
        }
        , {
            ref: 'phoneMask'
            , selector: 'localization_view combo[name="phone_mask"]'
        }
    ]
    , init: function() {
        this.addEvents('close', 'save');
        
        var obj = {};

        if (!this.isEventExists('afterrender', 'localization_view')) {
            obj['localization_view'] = {afterrender: this.onAfterRender};
        }
        if (!this.isEventExists('click', 'localization_view button[action="save"]')) {
            obj['localization_view button[action="save"]'] = {click: this.onSave};
        }
        if (!this.isEventExists('select', 'localization_view combo[name="phone_mask"]')) {
            obj['localization_view combo[name="phone_mask"]'] = {select: this.onSelectPhoneMask};
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
        var frm = this.getMainPanel().getActiveTab()
            , self = this;
            
        if (!frm.getForm().isValid()) {
            return;
        }
        
        this.myMask = new Ext4.LoadMask(frm.getEl(), { msg: LS.__translate(LS.PleaseWait) });
        this.myMask.show();

        var onSave = function () {
            self.myMask.hide();
            Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.settingsAreSaved));
        };
        
        GlobalProperties.set('currency-short',              this.getCurrencyName().getValue());
        GlobalProperties.set('currency-full',               this.getCurrencyFull().getValue());
        GlobalProperties.set('currency-full-genitive',      this.getCurrencyFullGenitive().getValue());
        GlobalProperties.set('currency-full-many',          this.getCurrencyFullMany().getValue());
        GlobalProperties.set('currency-full-gender',        this.getCurrencyFullGender().getValue());
        GlobalProperties.set('currency-align',              this.getCurrencyAlign().getValue());
        GlobalProperties.set('currency-cent-short',         this.getCurrencyCentName().getValue());
        GlobalProperties.set('currency-cent-full',          this.getCurrencyCentFull().getValue());
        GlobalProperties.set('currency-cent-full-genitive', this.getCurrencyCentFullGenitive().getValue());
        GlobalProperties.set('currency-cent-many',          this.getCurrencyCentFullMany().getValue());
        GlobalProperties.set('currency-cent-gender',        this.getCurrencyCentFullGender().getValue());
        GlobalProperties.set('digits-default',              this.getDefaultDigits().getValue());
        GlobalProperties.set('digits-store',                this.getStoreDigits().getValue());
        GlobalProperties.set('digits-cassa',                this.getCassaDigits().getValue());
        GlobalProperties.set('digits-quantity-default',     this.getQuantityDefaultDigits().getValue());

        var phoneMask = this.getPhoneMask().getValue();
        var newPristavka = this.getUnisenderPhonePristavka().getValue();
        var oldPristavka =  GlobalProperties.get('unisender_phone_pristavka');

        GlobalProperties.set('unisender_phone_pristavka_prev', oldPristavka);


        var checkResultStatusTask = null;
        var taskId = 0;
        var deleteFinishedUpdatePhoneTask = function () {
            Ext.Ajax.request({
                url: 'ajax_clients.php',
                scope: this,
                params: {
                    cmd: 'delete_update_phone_masks'
                },
                success: function (r) {
                    Ext.TaskManager.stop(checkResultStatusTask);
                    self.myMask.hide();
                },
                failure: function () {
                    Ext.TaskManager.stop(checkResultStatusTask);
                    self.myMask.hide();
                }
            });
        };

        var askForResult = function () {
            Ext.Ajax.request({
                url: 'ajax_clients.php',
                scope: this,
                params: {
                    cmd: 'check_update_phone_masks',
                    taskId: taskId
                },
                success: function (r) {
                    Common.showErrors(r);

                    var data = Ext.decode(r.responseText);

                    if (!data.is_error) {
                        if (data.status == 'finish') {
                            deleteFinishedUpdatePhoneTask();
                        }
                    } else {
                        Ext.TaskManager.stop(checkResultStatusTask);
                        self.myMask.hide();
                    }
                },
                failure: function () {
                    Ext.TaskManager.stop(checkResultStatusTask);
                    self.myMask.hide();
                }
            });
        };

        var updatePhoneMasks = function (params) {
            self.myMask.show();

            Ext.Ajax.request({
                url: 'ajax_clients.php'
                , scope: this
                , params: {
                    cmd: 'update_phone_masks'
                    , mask: phoneMask
                },
                success: function (r) {
                    Common.showErrors(r);

                    var data = Ext.decode(r.responseText);
                    if (!data.is_error) {
                        taskId = data.taskId;

                        checkResultStatusTask = Ext.TaskManager.start({
                            run: askForResult,
                            interval: 5000,
                            scope: self
                        });
                    }else{
                        self.myMask.hide();
                    }
                },
                failure: function () {
                    self.myMask.hide();
                }
            });
        };

        GlobalProperties.set('unisender_phone_pristavka',newPristavka, function() {
            if (self.currentPhoneMask != phoneMask || newPristavka != oldPristavka) {
                GlobalProperties.set('phone_mask', phoneMask, function() {
                    self.currentPhoneMask = phoneMask;
                    Ext.Msg.show({
                        title: LS.__translate(LS.Attention)
                        , msg: "Будет выполнено обновление всех телефонов клиентов. Этот процесс может занять несколько минут"
                        , buttons: Ext.Msg.OK
                        , icon: Ext.MessageBox.WARNING
                        , fn: function (b) {
                            if ('ok' == b) {
                                updatePhoneMasks()
                            }
                        }
                    });
                });
            } else {
                GlobalProperties.set('phone_mask', phoneMask, onSave);
            }
        });        
    }
    , refresh: function() {
        this.getCurrencyName().setValue(            GlobalProperties.get('currency-short', LS.__translate(LS.Rub)));
        this.getCurrencyFull().setValue(            GlobalProperties.get('currency-full', LS.__translate(LS.Ruble)));
        this.getCurrencyFullGenitive().setValue(    GlobalProperties.get('currency-full-genitive', LS.__translate(LS.ruble)));
        this.getCurrencyFullMany().setValue(        GlobalProperties.get('currency-full-many', LS.__translate(LS.Rubles)));
        this.getCurrencyFullGender().setValue(      GlobalProperties.get('currency-full-gender', '0'));
        this.getCurrencyAlign().setValue(           GlobalProperties.get('currency-align', 'right'));
        this.getCurrencyCentName().setValue(        GlobalProperties.get('currency-cent-short', LS.__translate(LS.Kopecks)));
        this.getCurrencyCentFull().setValue(        GlobalProperties.get('currency-cent-full', LS.__translate(LS.Kopeck)));
        this.getCurrencyCentFullGenitive().setValue(GlobalProperties.get('currency-cent-full-genitive', LS.__translate(LS.Kopeckis)));
        this.getCurrencyCentFullMany().setValue(    GlobalProperties.get('currency-cent-many', LS.__translate(LS.Kopecks)));
        this.getCurrencyCentFullGender().setValue(  GlobalProperties.get('currency-cent-gender', '1'));
        this.getDefaultDigits().setValue(           GlobalProperties.get('digits-default', 1));
        this.getStoreDigits().setValue(             GlobalProperties.get('digits-store', 2));
        this.getCassaDigits().setValue(             GlobalProperties.get('digits-cassa', 2));
        this.getQuantityDefaultDigits().setValue(   GlobalProperties.get('digits-quantity-default', 3));
        
        this.currentPhoneMask = GlobalProperties.get('phone_mask', '(___)___-__-__');        
        this.getPhoneMask().setValue(this.currentPhoneMask);
        this.getUnisenderPhonePristavka().setValue(GlobalProperties.get('unisender_phone_pristavka', '38'));

        var prist = this.getUnisenderPhonePristavka();
        Common.setMinMaxPristavkaMaskToInput(prist, this.currentPhoneMask);
    }
    , onSelectPhoneMask: function(v) {
        Ext3.MessageBox.confirm('Внимание', 'Вы действительно хотите изменить маску у всех клиентов?', function(b) {
            if ('no' == b) {
                v.setValue(this.currentPhoneMask);
            } else {
                var prist = this.getUnisenderPhonePristavka()
                    , val = v.getValue();

                Common.setMinMaxPristavkaMaskToInput(prist, val);
            }
        }, this);
    }
});