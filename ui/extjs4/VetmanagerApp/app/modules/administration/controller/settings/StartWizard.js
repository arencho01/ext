Ext4.define('VetmanagerApp.modules.administration.controller.settings.StartWizard', {
    extend: 'Ext4.app.Controller'
    , views: [
        'VetmanagerApp.modules.administration.view.settings.StartWizard'
        , 'VetmanagerApp.modules.administration.view.settings.StartWizardSteps.Step1'
        , 'VetmanagerApp.modules.administration.view.settings.StartWizardSteps.Step2'
        , 'VetmanagerApp.modules.administration.view.settings.StartWizardSteps.Step3'
        , 'VetmanagerApp.modules.administration.view.settings.StartWizardSteps.Step4'
        , 'VetmanagerApp.modules.administration.view.settings.StartWizardSteps.Step5'
        , 'VetmanagerApp.modules.administration.view.settings.StartWizardSteps.Step6'
        , 'VetmanagerApp.modules.administration.view.settings.StartWizardSteps.Step7'
        , 'VetmanagerApp.modules.administration.view.settings.StartWizardSteps.Step9'
        , 'VetmanagerApp.modules.administration.view.settings.StartWizardSteps.Step3AddUserWindow'
        , 'VetmanagerApp.modules.administration.view.settings.StartWizardSteps.Step4AddCityWindow'
        , 'VetmanagerApp.modules.administration.view.settings.StartWizardSteps.Step5AdmissionTypeWindow'
        , 'VetmanagerApp.modules.administration.view.settings.StartWizardSteps.Step6MeetResultWindow'
        , 'VetmanagerApp.modules.administration.view.settings.StartWizardSteps.Step7CassaWindow'
    ]
    , refs: [
        {
            ref: 'mainPanel'
            , selector: 'startwizard'
            , autoCreate: true
            , xtype: 'startwizard'
        }, {
            ref: 'stepsPanel'
            , selector: 'startwizard panel[name="wizard-steps-panel"]'
        }, {
            ref: 'stepsTitle'
            , selector: 'startwizard panel[name="wizard-step-title"]'
        }, {
            ref: 'closeButton'
            , selector: 'startwizard panel[name="navigation-panel"] button[action="close"]'
        }, {
            ref: 'skipButton'
            , selector: 'startwizard panel[name="navigation-panel"] button[action="skip"]'
        }, {
            ref: 'backButton'
            , selector: 'startwizard panel[name="navigation-panel"] button[action="back"]'
        }, {
            ref: 'forwardButton'
            , selector: 'startwizard panel[name="navigation-panel"] button[action="forward"]'
        }, {
            ref: 'doneButton'
            , selector: 'startwizard panel[name="navigation-panel"] button[action="done"]'
        }, {
            ref: 'step3UsersGrid'
            , selector: 'StartWizardStep3 grid[name="users_grid"]'
        }, {
            ref: 'step3AddUserWindow'
            , selector: 'Step3AddUserWindow'
            , autoCreate: true
            , xtype: 'Step3AddUserWindow'
        }, {
            ref: 'step4CityGrid'
            , selector: 'StartWizardStep4 grid[name="city_grid"]'
        }, {
            ref: 'step4AddCityWindow'
            , selector: 'Step4AddCityWindow'
            , autoCreate: true
            , xtype: 'Step4AddCityWindow'
        }, {
            ref: 'step5AdmissionTypeGrid'
            , selector: 'StartWizardStep5 grid[name="admission_type_grid"]'
        }, {
            ref: 'step5AdmissionTypeWindow'
            , selector: 'Step5AdmissionTypeWindow'
            , autoCreate: true
            , xtype: 'Step5AdmissionTypeWindow'
        }, {
            ref: 'step6MeetResultGrid'
            , selector: 'StartWizardStep6 grid[name="meet_result_grid"]'
        }, {
            ref: 'step6MeetResultWindow'
            , selector: 'Step6MeetResultWindow'
            , autoCreate: true
            , xtype: 'Step6MeetResultWindow'
        }, {
            ref: 'step7CassaGrid'
            , selector: 'StartWizardStep7 grid[name="cassa_grid"]'
        }, {
            ref: 'step7CassaWindow'
            , selector: 'Step7CassaWindow'
            , autoCreate: true
            , xtype: 'Step7CassaWindow'
        }
    ]
    , init: function() {
        this.control({
            'startwizard panel[name="navigation-panel"] button[action="close"]': {
                click: this.closeButtonClick
            }
            , 'startwizard panel[name="navigation-panel"] button[action="skip"]': {
                click: this.skipButtonClick
            }
            , 'startwizard panel[name="navigation-panel"] button[action="back"]': {
                click: this.backButtonClick
            }
            , 'startwizard panel[name="navigation-panel"] button[action="forward"]': {
                click: this.forwardButtonClick
            }
            , 'startwizard panel[name="navigation-panel"] button[action="done"]': {
                click: this.doneButtonClick
            }
            , 'startwizard' : { beforeshow: this.wizardActivate }
            , 'StartWizardStep1' : { activate: this.stepActivate }
            , 'StartWizardStep2' : { activate: this.stepActivate }
            , 'StartWizardStep3' : { activate: this.stepActivate }
            , 'StartWizardStep4' : { activate: this.stepActivate }
            , 'StartWizardStep5' : { activate: this.stepActivate }
            , 'StartWizardStep6' : { activate: this.stepActivate }
            , 'StartWizardStep7' : { activate: this.stepActivate }
            , 'StartWizardStep9' : { activate: this.stepActivate }
            , 'Step4AddCityWindow': { afterlayout: this.setFormFocus }
            , 'Step5AdmissionTypeWindow': { afterlayout: this.setFormFocus }
            , 'Step6MeetResultWindow': { afterlayout: this.setFormFocus }
            , 'StartWizardStep3 grid[name="users_grid"] button[action="add"]': {
                click: this.step3AddUserClick
            }
            , 'StartWizardStep3 grid[name="users_grid"] button[action="delete"]': {
                click: this.step3DeleteUserClick
            }
            , 'StartWizardStep3 grid[name="users_grid"]': {
                itemclick: this.stepGridRowSelect
            }
            , 'Step3AddUserWindow button[action="add"]': {
                click: this.step3AddUserWindowAdd
            }
            , 'Step3AddUserWindow button[action="close"]': {
                click: this.step3AddUserWindowClose
            }
            , 'StartWizardStep4 grid[name="city_grid"]': {
                itemclick: this.stepGridRowSelect
            }
            , 'StartWizardStep4 grid[name="city_grid"] button[action="add"]': {
                click: this.step4AddCityClick
            }
            , 'StartWizardStep4 grid[name="city_grid"] button[action="delete"]': {
                click: this.step4DeleteCityClick
            }
            , 'Step4AddCityWindow button[action="add"]': {
                click: this.step4AddCityWindowAdd
            }
            , 'Step4AddCityWindow button[action="close"]': {
                click: this.step4AddCityWindowClose
            }
            , 'StartWizardStep5 grid[name="admission_type_grid"]': {
                itemclick: this.stepGridRowSelect
            }
            , 'StartWizardStep5 grid[name="admission_type_grid"] button[action="add"]': {
                click: this.step5AddAdmissionTypeClick
            }
            , 'StartWizardStep5 grid[name="admission_type_grid"] button[action="delete"]': {
                click: this.step5DeleteAdmissionTypeClick
            }
            , 'Step5AdmissionTypeWindow button[action="add"]': {
                click: this.step5AddAdmissionTypeWindowAdd
            }
            , 'Step5AdmissionTypeWindow button[action="close"]': {
                click: this.step5AddAdmissionTypeWindowClose
            }
            , 'StartWizardStep6 grid[name="meet_result_grid"]': {
                itemclick: this.stepGridRowSelect
            }
            , 'StartWizardStep6 grid[name="meet_result_grid"] button[action="add"]': {
                click: this.step6AddMeetResultClick
            }
            , 'StartWizardStep6 grid[name="meet_result_grid"] button[action="delete"]': {
                click: this.step6DeleteMeetResultClick
            }
            , 'Step6MeetResultWindow button[action="add"]': {
                click: this.step6AddMeetResultWindowAdd
            }
            , 'Step6MeetResultWindow button[action="close"]': {
                click: this.step6MeetResultWindowClose
            }
            , 'StartWizardStep7 grid[name="cassa_grid"]': {
                itemclick: this.stepGridRowSelect
            }
            , 'StartWizardStep7 grid[name="cassa_grid"] button[action="add"]': {
                click: this.step7AddCassaClick
            }
            , 'StartWizardStep7 grid[name="cassa_grid"] button[action="delete"]': {
                click: this.step7DeleteCassaClick
            }
            , 'Step7CassaWindow button[action="add"]': {
                click: this.step7AddCassaWindowAdd
            }
            , 'Step7CassaWindow button[action="close"]': {
                click: this.step7CassaWindowClose
            }

        });
    }
    , wizardActivate: function() {
        if (_WIZARD_STEP*1 > 0) {
            VetManager.GlobalEvents.fireEvent('vm_wizard_start');
            this.getStepsPanel().getLayout().activeItem = _WIZARD_STEP*1 - 1;
        }

        Ext3.WindowMgr.zseed = Ext4.WindowMgr.zseed + 50;
    }
    , stepActivate: function() {
        var panel = this.getStepsPanel().getLayout().getActiveItem();
        this.setMainWindowViewByConfig(panel.showConfig);
        VetManager.GlobalEvents.fireEvent('vm_wizard', {
            title: panel.showConfig.title.replace('<center>', '').replace('<b>', '').replace('</b>', '').replace('</center>', ''),
            step: panel.showConfig.stepText
        });
    }
    , setMainWindowViewByConfig: function(config) {
        var title = this.getStepsTitle()
            , win = this.getMainPanel();

        win.setHeight(config.height);
        win.setWidth(config.width);
        win.center();

        title.update(config.title);

        this.getCloseButton().setVisible(config.buttons.indexOf('close') >= 0);
        this.getSkipButton().setVisible(config.buttons.indexOf('skip') >= 0);
        this.getBackButton().setVisible(config.buttons.indexOf('back') >= 0);
        this.getForwardButton().setVisible(config.buttons.indexOf('forward') >= 0);
        this.getDoneButton().setVisible(config.buttons.indexOf('done') >= 0);

        this['step' + (config.step + 1) + 'Load'](this);
        var navigationSteps = Ext4.getCmp('navigation-panel-steps');
        if (navigationSteps) {
            navigationSteps.update(config.stepText);
        }
    }
    , skipButtonClick: function() {
        VetManager.GlobalEvents.fireEvent('vm_wizard_skip');
        var panel = this.getStepsPanel().getLayout().getActiveItem();

        if (panel.showConfig.is_last_step == false) {
            this.getStepsPanel().getLayout().setActiveItem(panel.showConfig.step + 1);
        }
    }
    , backButtonClick: function() {
        VetManager.GlobalEvents.fireEvent('vm_wizard_back');
        var panel = this.getStepsPanel().getLayout().getActiveItem();

        if (panel.showConfig.is_first_step == false) {
            this.getStepsPanel().getLayout().setActiveItem(panel.showConfig.step - 1);
        }
    }
    , forwardButtonClick: function() {
        VetManager.GlobalEvents.fireEvent('vm_wizard_forward');
        var panel = this.getStepsPanel().getLayout().getActiveItem();

        if (panel.showConfig.is_last_step == false) {
            this['step' + (panel.showConfig.step + 1) + 'Save'](function() {
                this.getStepsPanel().getLayout().setActiveItem(panel.showConfig.step + 1);
            });
        }
    }
    , closeButtonClick: function() {
        var win = this.getMainPanel();

        win.setLoading(LS.__translate(LS.LoadingProbelDots));

        Ext4.Ajax.request({
            url: 'ajax_wizard.php'
            , scope: this
            , params: {
                cmd: 'setSkiped'
            }
            , success: function(r) {
                win.setLoading(false);
                window.onbeforeunload = null;
                window.location.href = '';
            }
        });

        VetManager.GlobalEvents.fireEvent('vm_wizard_close');
    }
    , doneButtonClick: function() {
        var win = this.getMainPanel();

        win.setLoading(LS.__translate(LS.LoadingProbelDots));

        Ext4.Ajax.request({
            url: 'ajax_wizard.php'
            , scope: this
            , params: {
                cmd: 'setDone'
            }
            , success: function(r) {
                win.setLoading(false);
                window.onbeforeunload = null;
                window.location.href = '';
            }
        });

        VetManager.GlobalEvents.fireEvent('vm_wizard_done');
    }
    /////////// load step data /////////////
    , stepLoad: function(number, callback) {
        var win = this.getMainPanel()
            , panel = this.getStepsPanel().getLayout().getActiveItem();

        win.setLoading(LS.__translate(LS.LoadingProbelDots));

        Ext4.Ajax.request({
            url: 'ajax_wizard.php'
            , scope: this
            , params: {
                cmd: 'step' + number + 'Load'
            }
            , success: function(r) {
                var result = Ext4.decode(r.responseText);
                win.setLoading(false);
                if (callback != null) {
                    callback.call(this, result, panel);
                }
            }
            , failure: function(r) {
                win.setLoading(false);
                if (callback != null) {
                    callback.call(this, null, panel);
                }
            }
        });
    }
    , step1Load: function() {
        this.stepLoad(1);
    }
    , step2Load: function() {
        this.stepLoad(2, function(data, panel) {
            var form = panel.getForm();
            form.setValues(data.data);
        });
    }
    , step3Load: function() {
        this.stepLoad(3, function(data, panel) {
            var grid = panel.query('grid[name="users_grid"]')[0];

            grid.getStore().load();
            grid.query('button[action="delete"]')[0].disable();
        });
    }
    , step4Load: function() {
        this.stepLoad(4, function(data, panel) {
            var grid = panel.query('grid[name="city_grid"]')[0];

            grid.getStore().load();
            grid.query('button[action="delete"]')[0].disable();
        });
    }
    , step5Load: function() {
        this.stepLoad(5, function(data, panel) {
            var grid = panel.query('grid[name="admission_type_grid"]')[0];

            grid.getStore().load();
            grid.query('button[action="delete"]')[0].disable();
        });
    }
    , step6Load: function() {
        this.stepLoad(6, function(data, panel) {
            var grid = panel.query('grid[name="meet_result_grid"]')[0];

            grid.getStore().load();
            grid.query('button[action="delete"]')[0].disable();
        });
    }
    , step7Load: function() {
        this.stepLoad(7, function(data, panel) {
            var grid = panel.query('grid[name="cassa_grid"]')[0];

            grid.getStore().load();
            grid.query('button[action="delete"]')[0].disable();
        });
    }
    , step8Load: function() {
        this.stepLoad(8, function(data, panel) {
            console.log(data, panel);
        });
    }
    /////////// save step data /////////////
    , stepSave: function(number, data, callback) {
        this.getMainPanel().setLoading(LS.__translate(LS.LoadingProbelDots));

        Ext4.Ajax.request({
            url: 'ajax_wizard.php'
            , scope: this
            , params: {
                cmd: 'step' + number + 'Save'
                , values: Ext4.encode(data)
            }
            , success: function(r) {
                var result = Ext4.decode(r.responseText);

                if (callback != null) {
                    callback.call(this, result);
                }
            }
        });
    }
    , step1Save: function(callback) {
        this.getMainPanel().setLoading(LS.__translate(LS.LoadingProbelDots));

        if (callback != null) {
            callback.call(this);
        }
    }
    , step2Save: function(callback) {
        var panel = this.getStepsPanel().getLayout().getActiveItem()
            , form = panel.getForm();

        if (form.isValid()) {
            this.stepSave(2
                , form.getValues()
                , function(data) {
                    if (callback != null) {
                        callback.call(this);
                    }
                }
            );
        } else {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.FillTheNecessaryFields));
        }
    }
    , step3Save: function(callback) {
        var grid = this.getStep3UsersGrid()
            , store = grid.getStore()
            , values = [];

        if (store.getCount() == 0) {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.YouMustEnterAtLeastOneUser));
            return;
        }

        store.each(function(row) {
            values.push(row.data);
        }, this);

        this.stepSave(3, values, function(data) {
            if (callback != null) {
                callback.call(this);
            }
        });
    }
    , step4Save: function(callback) {
        var grid = this.getStep4CityGrid()
            , store = grid.getStore()
            , values = []
            , is_error = true;

        if (store.getCount() == 0) {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.YouMustEnterAtLeastOneCity));
            return;
        }

        store.each(function(row) {
            if (row.get('is_default')*1 == 1) {
                is_error = false;
            }
            values.push(row.data);
        }, this);

        if (is_error == true) {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.YouMustSetDefaultCity));
            return;
        }

        this.stepSave(4, values, function(data) {
            if (callback != null) {
                callback.call(this);
            }
        });
    }
    , step5Save: function(callback) {
        var grid = this.getStep5AdmissionTypeGrid()
            , store = grid.getStore()
            , values = [];

        if (store.getCount() == 0) {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.YouMustEnterAtLeastOneTypeOfAdmission));
            return;
        }

        store.each(function(row) {
            values.push(row.data);
        }, this);

        this.stepSave(5, values, function(data) {
            if (callback != null) {
                callback.call(this);
            }
        });
    }
    , step6Save: function(callback) {
        var grid = this.getStep6MeetResultGrid()
            , store = grid.getStore()
            , values = [];

        if (store.getCount() == 0) {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.YouMustEnterAtLeastOneAdmissionResult));
            return;
        }

        store.each(function(row) {
            values.push(row.data);
        }, this);

        this.stepSave(6, values, function(data) {
            if (callback != null) {
                callback.call(this);
            }
        });
    }
    , step7Save: function(callback) {
        var grid = this.getStep7CassaGrid()
            , store = grid.getStore()
            , values = [];

        if (store.getCount() == 0) {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.YouMustCreateAtLeastOneCashDesk));
            return;
        }

        store.each(function(row) {
            values.push(row.data);
        }, this);
        
        var panel = this.getStepsPanel().getLayout().getActiveItem()
            , combo = panel.query('combo[name="currency-short"]')[0];
            
        this.stepSave(7, {
            data: values
            , currency: combo.getValue()
        }, function(data) {
            if (callback != null) {
                callback.call(this);
            }
        });
    }
    , step9Save: function(callback) {
        this.stepSave(9, {}, function(data) {
            if (callback != null) {
                callback.call(this);
            }
        });
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
                }
            }
            , scope: this
        });
    }

    , step3AddUserClick: function() {
        var win = this.getStep3AddUserWindow()
            , form = win.query('form[name="add_user_form"]')[0].getForm()
            , positionCombo = form.findField('position_id')
            , positionStore = positionCombo.getStore()
            , roleCombo = form.findField('role_id')
            , roleStore = roleCombo.getStore();

        win.on('show', function() {
            Ext.tip.QuickTipManager.init();
            Ext.tip.QuickTipManager.register({
                target: 'step3-qtip1'
                , title: '<span class="wizard-qtip">'+LS.__translate(LS.ReceiveMoneyByAllCashRegisters)+'</span>'
                , text: '<span class="wizard-qtip">'+LS.__translate(LS.InTheProgramVetmanagerYouCanCreateMultipleFundsAFewPlacesReceiveMoney)+' '+ LS.__translate(LS.IfYouTickThisItemThenTheUserWillBeAbleToCarryOutAllPaymentByCash)+' '+ LS.__translate(LS.IfYouDoNotPutATickTheUserWillPayOnlyInHisDesk)+'</span>'
                , width: 300
                , padding: 10
                , dismissDelay: 10000
            });

            Ext.tip.QuickTipManager.register({
                target: 'step3-qtip2'
                , title: '<span class="wizard-qtip">'+LS.__translate(LS.ProvisionOfServicesOrSaleOfMedicines)+'</span>'
                , text: '<span class="wizard-qtip">'+LS.__translate(LS.WhenYouSelectThisOptionTheUserCanChooseInTheInvoicesWhenSellingGoodsOrServices)+' '+LS.__translate(LS.ThereWillAlsoBeAnOpportunityToSetUpAPercentageOfTheSaleOfGoodsAndorServicesToAParticularCategory)+'</span>'
                , width: 300
                , padding: '10px'
                , dismissDelay: 10000
            });
        }, this);

        win.show();

        positionStore.load({
            scope: this
            , callback: function(records, operation, success) {
                for (var i = 0; i < records.length; i++) {
                    if (records[i].get('is_admin')*1 == 1) {
                        positionCombo.setValue(records[i].get('id'));
                    }
                }
            }
        });

        roleStore.load({
            scope: this
            , callback: function(records, operation, success) {
                form.findField('last_name').focus();

                for (var i = 0; i < records.length; i++) {
                    if (records[i].get('is_admin')*1 == 1) {
                        roleCombo.setValue(records[i].get('id'));
                    }
                }
            }
        });
    }
    , step3DeleteUserClick: function() {
        Ext4.MessageBox.confirm(
            LS.__translate(LS.Removal)
            , LS.__translate(LS.AreYouSureYouWantToDeleteTheUser)
            , function(btn) {
                if ('yes' === btn) {
                    var grid = this.getStep3UsersGrid()
                        , sel = grid.getSelectionModel().getSelection()[0]
                        , store = grid.getStore();

                    store.removeAt(store.find('id', sel.get('id')));
                }
            }
        , this);
    }
    , step3AddUserWindowAdd: function() {
        var win = this.getStep3AddUserWindow()
            , form = win.query('form[name="add_user_form"]')[0].getForm()
            , grid = this.getStep3UsersGrid()
            , store = grid.getStore()
            , values = form.getFieldValues();

        if (form.isValid()) {
            var isValid = true;
            store.each(function(row) {
                if (row.get('login') == values.login) {
                    isValid = false;
                    return;
                }
            }, this);

            if (isValid) {
                store.insert(
                    0, {
                        id: Ext4.id()
                        , fio: values.last_name + ' ' + values.first_name
                        , any_cassa_payment: (values.any_cassa_payment) ? 1 : 0
                        , calc_percents: (values.calc_percents) ? 1 : 0
                        , role: form.findField('role_id').getRawValue()
                        , first_name: values.first_name
                        , last_name: values.last_name
                        , login: values.login
                        , passwd: values.passwd
                        , position_id: values.position_id
                        , role_id: values.role_id
                    }
                );

                win.close();
            } else {
                Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.AUserWithThisLoginAlreadyExists));
            }
        } else {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.FillTheNecessaryFields));
        }
    }
    , step3AddUserWindowClose: function() {
        var win = this.getStep3AddUserWindow();
        win.close();
    }
    , stepGridRowSelect: function(view) {
        var btn = view.ownerCt.query('button[action="delete"]')[0];
        
        if ('users_grid' == view.ownerCt.name) {
            var sm = view.ownerCt.getSelectionModel();
            
            if (sm.hasSelection()) {
                var sel = sm.getSelection();
                
                if (sel[0].get('id')*1 == 1) {
                    btn.disable();
                    return;
                }
            }
        }
                
        btn.enable();
    }
    , step4AddCityClick: function() {
        this.getStep4AddCityWindow().show();
    }
    , step4DeleteCityClick: function() {
        Ext4.MessageBox.confirm(
            LS.__translate(LS.Removal)
            , LS.__translate(LS.AreYouSureYouWantToDeleteTheCity)
            , function(btn) {
                if ('yes' === btn) {
                    var grid = this.getStep4CityGrid()
                        , sel = grid.getSelectionModel().getSelection()[0]
                        , store = grid.getStore();

                    store.removeAt(store.find('id', sel.get('id')));

                    if (store.getCount() > 0) {
                        var firstRec = null;
                        var hasDefault = false;
                        store.each(function(row, i) {
                            if (i == 0) {
                                firstRec = row;
                            }

                            if (row.get('is_default')*1 == 1) {
                                hasDefault = true;
                                return;
                            }
                        }, this);

                        if (hasDefault == false && firstRec != null) {
                            firstRec.set('is_default', true);
                            firstRec.commit();
                        }
                    }
                }
            }
        , this);
    }
    , step4AddCityWindowAdd: function() {
        var win = this.getStep4AddCityWindow()
            , form = win.query('form[name="add_city_form"]')[0].getForm()
            , grid = this.getStep4CityGrid()
            , store = grid.getStore()
            , values = form.getFieldValues();

        if (form.isValid()) {
            var isValid = true;
            store.each(function(row) {
                if (row.get('title') == values.title) {
                    isValid = false;
                    return;
                }
            }, this);

            if (isValid) {
                if (values.is_default) {
                    store.each(function(row) {
                        row.set('is_default', false);
                        row.commit();
                    }, this);
                }

                store.insert(
                    0, {
                        id: Ext4.id()
                        , title: values.title
                        , is_default: values.is_default
                    }
                );

                win.close();
            } else {
                Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.CityWithSameNameAlreadyExists));
            }
        } else {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.FillTheNecessaryFields));
        }
    }
    , step4AddCityWindowClose: function() {
        this.getStep4AddCityWindow().close();
    }
    , step5AddAdmissionTypeClick: function() {
        this.getStep5AdmissionTypeWindow().show();
    }
    , step5DeleteAdmissionTypeClick: function() {
        Ext4.MessageBox.confirm(
            LS.__translate(LS.Removal)
            , LS.__translate(LS.AreYouSureYouWantToDeleteThisTypeOfVisit)
            , function(btn) {
                if ('yes' === btn) {
                    var grid = this.getStep5AdmissionTypeGrid()
                        , sel = grid.getSelectionModel().getSelection()[0]
                        , store = grid.getStore();

                    store.removeAt(store.find('id', sel.get('id')));
                }
            }
        , this);
    }
    , step5AddAdmissionTypeWindowAdd: function() {
        var win = this.getStep5AdmissionTypeWindow()
            , form = win.query('form[name="add_admission_type_form"]')[0].getForm()
            , grid = this.getStep5AdmissionTypeGrid()
            , store = grid.getStore()
            , values = form.getValues();

        if (form.isValid()) {
            var isValid = true;
            store.each(function(row) {
                if (row.get('title') == values.title) {
                    isValid = false;
                    return;
                }
            }, this);

            if (isValid) {
                store.insert(
                    0, {
                        id: Ext4.id()
                        , title: values.title
                    }
                );

                win.close();
            } else {
                Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.ReceptionTypeWithSameNameAlreadyExists));
            }
        } else {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.FillTheNecessaryFields));
        }
    }
    , step5AddAdmissionTypeWindowClose: function() {
        this.getStep5AdmissionTypeWindow().close();
    }
    , step6AddMeetResultClick: function() {
        this.getStep6MeetResultWindow().show();
    }
    , step6DeleteMeetResultClick: function() {
        Ext4.MessageBox.confirm(
            LS.__translate(LS.Removal)
            , LS.__translate(LS.AreYouSureYouWantToDeleteThisResultOfVisit)
            , function(btn) {
                if ('yes' === btn) {
                    var grid = this.getStep6MeetResultGrid()
                        , sel = grid.getSelectionModel().getSelection()[0]
                        , store = grid.getStore();

                    store.removeAt(store.find('id', sel.get('id')));
                }
            }
        , this);
    }
    , step6AddMeetResultWindowAdd: function() {
        var win = this.getStep6MeetResultWindow()
            , form = win.query('form[name="add_meet_result_form"]')[0].getForm()
            , grid = this.getStep6MeetResultGrid()
            , store = grid.getStore()
            , values = form.getValues();

        if (form.isValid()) {
            var isValid = true;
            store.each(function(row) {
                if (row.get('title') == values.title) {
                    isValid = false;
                    return;
                }
            }, this);

            if (isValid) {
                store.insert(
                    0, {
                        id: Ext4.id()
                        , title: values.title
                    }
                );

                win.close();
            } else {
                Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.ReceptionResultWithSameNameAlreadyExists));
            }
        } else {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.FillTheNecessaryFields));
        }
    }
    , step6MeetResultWindowClose: function() {
        this.getStep6MeetResultWindow().close();
    }
    , step7AddCassaClick: function() {
        var win = this.getStep7CassaWindow()
            , form = win.query('form[name="add_cassa_form"]')[0].getForm()
            , responsibleCombo = form.findField('assigned_user_id')
            , responsibleStore = responsibleCombo.getStore();

        win.show();

        responsibleStore.load({
            scope: this
            , callback: function(records, operation, success) {
                form.findField('title').focus();

                for (var i = 0; i < records.length; i++) {
                    responsibleCombo.setValue(records[i].get('id'));
                    return;
                }
            }
        });
    }
    , step7DeleteCassaClick: function() {
        var grid = this.getStep7CassaGrid()
            , sel = grid.getSelectionModel().getSelection()[0]
            , store = grid.getStore();

        if (sel.get('is_system') > 0) {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.CannotDeleteSystemCashDesk));            
        } else {
            Ext4.MessageBox.confirm(
                LS.__translate(LS.Removal)
                , LS.__translate(LS.AreSureYouWantToDeleteThisCashRegister)
                , function(btn) {
                    if ('yes' === btn) {
                        store.removeAt(store.find('id', sel.get('id')));
                    }
                }
                , this);
        }
    }
    , step7AddCassaWindowAdd: function() {
        var win = this.getStep7CassaWindow()
            , form = win.query('form[name="add_cassa_form"]')[0].getForm()
            , grid = this.getStep7CassaGrid()
            , store = grid.getStore()
            , values = form.getFieldValues();

        if (form.isValid()) {
            var isValid = true;
            store.each(function(row) {
                if (row.get('title') == values.title) {
                    isValid = false;
                    return;
                }
            }, this);

            if (isValid) {
                store.insert(
                    0, {
                        id: Ext4.id()
                        , assigned_user_id: values.assigned_user_id
                        , assigned_user_name: form.findField('assigned_user_id').getRawValue()
                        , title: values.title
                        , client_cass: (values.client_cass) ? 1 : 0
                        , main_cassa: (values.main_cassa) ? 1 : 0
                    }
                );

                win.close();
            } else {
                Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.CashboxWithTheSameNameAlreadyExists));
            }
        } else {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.FillTheNecessaryFields));
        }
    }
    , step7CassaWindowClose: function() {
        this.getStep7CassaWindow().close();
    }
    , setFormFocus: function(th) {
        var fld = th.query('textfield[name="title"]');
        if (fld.length == 1) {
            fld[0].focus();
            fld[0].clearInvalid();
        }
    }
});