Ext4.define('VetmanagerApp.modules.administration.controller.settings.Discount', {
    extend: 'Ext4.app.Controller'
    , views: [
        'VetmanagerApp.modules.administration.view.settings.Discount'
        , 'VetmanagerApp.modules.administration.view.settings.discount.Rules'
        , 'VetmanagerApp.modules.administration.view.settings.discount.ExpressionCombo'
        , 'VetmanagerApp.modules.administration.view.settings.discount.RuleTypeCombo'
        , 'VetmanagerApp.modules.administration.view.settings.discount.GoodsCombobox'
        , 'VetmanagerApp.modules.administration.view.settings.discount.GoodsAndSetsCombobox'
        , 'VetmanagerApp.modules.administration.view.settings.discount.GoodGroupsCombobox'
        , 'VetmanagerApp.modules.administration.view.settings.discount.GoodCombinationsCombobox'
        , 'VetmanagerApp.modules.administration.view.settings.discount.AllInvoiceAmountField'
        , 'VetmanagerApp.modules.administration.view.settings.discount.AllInvoiceRulesAmountField'
        , 'VetmanagerApp.modules.administration.view.settings.discount.QtyGoodInInvoiceField'
        , 'VetmanagerApp.modules.administration.view.settings.discount.QtyGoodRuleInInvoiceField'
        , 'VetmanagerApp.modules.administration.view.settings.discount.CardTypes'
        , 'VetmanagerApp.modules.administration.view.settings.discount.CardDisctountType'
        , 'VetmanagerApp.modules.administration.view.settings.discount.RulesCombo'
        , 'VetmanagerApp.modules.administration.view.settings.discount.Promotion'
        , 'VetmanagerApp.modules.administration.view.settings.discount.Coupon'
        , 'VetmanagerApp.modules.administration.view.settings.discount.AmountByGoodField'
        , 'VetmanagerApp.modules.administration.view.settings.discount.QtyByGoodField'
        , 'VetmanagerApp.modules.administration.view.settings.discount.InvoiceIsNightField'
        , 'VetmanagerApp.modules.administration.view.settings.discount.ResponsibleUsersField'
        , 'VetmanagerApp.modules.administration.view.settings.discount.Fixed'
        , 'VetmanagerApp.modules.administration.view.settings.discount.InvoiceTimeStart'
        , 'VetmanagerApp.modules.administration.view.settings.discount.InvoiceTimeEnd'
        , 'VetmanagerApp.modules.administration.view.settings.discount.MultiDatePickerPanel'
        , 'VetmanagerApp.modules.administration.view.settings.discount.ClinicCombobox'
    ]
    , stores: [
        'VetmanagerApp.modules.administration.store.settings.discount.Rules'
        , 'VetmanagerApp.modules.administration.store.settings.discount.CardTypes'
        , 'VetmanagerApp.modules.administration.store.settings.discount.Promotions'
        , 'VetmanagerApp.modules.administration.store.settings.discount.Coupons'
        , 'VetmanagerApp.modules.administration.store.settings.discount.Fixeds'
    ]  
    , models: [
        'VetmanagerApp.modules.administration.model.settings.discount.Rule'        
        , 'VetmanagerApp.modules.administration.model.settings.discount.CardType'
        , 'VetmanagerApp.modules.administration.model.settings.discount.Promotion'
        , 'VetmanagerApp.modules.administration.model.settings.discount.Coupon'
        , 'VetmanagerApp.modules.administration.model.settings.discount.Fixed'
    ]
    , refs: [
        {
            ref: 'mainPanel'
            , selector: 'discountsettings'
            , autoCreate: true
            , xtype: 'discountsettings'
        }
        , {
            ref: 'rulesPanel'
            , selector: 'discount-rules-settings'
            , autoCreate: true
            , xtype: 'discount-rules-settings'
        }
        , {
            ref: 'rulesPanelForm'
            , selector: 'discount-rules-settings component[name="rule-form"]'
            , autoCreate: true
            , xtype: 'discount-rules-settings'
        }
        , {
            ref: 'rulesPanelGrid'
            , selector: 'discount-rules-settings component[name="rules-grid"]'
            , autoCreate: true
            , xtype: 'discount-rules-settings'            
        }      
        , {
            ref: 'cardTypesPanel'
            , selector: 'discount-card-types-settings'
            , autoCreate: true
            , xtype: 'discount-card-types-settings'
        }
        , {
            ref: 'cardTypesPanelSaveBtn'
            , selector: 'discount-card-types-settings component[action="save-card-type"]'
            , autoCreate: true
            , xtype: 'discount-card-types-settings'
        }
        , {
            ref: 'promotionPanelSaveBtn'
            , selector: 'discount-promotion-settings component[action="save-promotion"]'
            , autoCreate: true
            , xtype: 'discount-promotion-settings'
        }
        , {
            ref: 'couponPanelSaveBtn'
            , selector: 'discount-coupon-settings component[action="save-coupon"]'
            , autoCreate: true
            , xtype: 'discount-coupon-settings'
        }
        , {
            ref: 'fixedPanelSaveBtn'
            , selector: 'discount-fixed-settings component[action="save-fixed"]'
            , autoCreate: true
            , xtype: 'discount-fixed-settings'
        }
        , {
            ref: 'cardTypesPanelRevertBtn'
            , selector: 'discount-card-types-settings component[action="revert-status-card-type"]'
            , autoCreate: true
            , xtype: 'discount-card-types-settings'
        }
        , {
            ref: 'promotionPanelRevertBtn'
            , selector: 'discount-promotion-settings component[action="revert-status-promotion"]'
            , autoCreate: true
            , xtype: 'discount-promotion-settings'
        }
        , {
            ref: 'couponPanelRevertBtn'
            , selector: 'discount-coupon-settings component[action="revert-status-coupon"]'
            , autoCreate: true
            , xtype: 'discount-coupon-settings'
        }
        , {
            ref: 'fixedPanelRevertBtn'
            , selector: 'discount-fixed-settings component[action="revert-status-fixed"]'
            , autoCreate: true
            , xtype: 'discount-fixed-settings'
        }
        , {
            ref: 'cardTypesPanelForm'
            , selector: 'discount-card-types-settings component[name="card-type-form"]'
            , autoCreate: true
            , xtype: 'discount-card-types-settings'
        }
        , {
            ref: 'cardTypesPanelGrid'
            , selector: 'discount-card-types-settings component[name="card-types-grid"]'
            , autoCreate: true
            , xtype: 'discount-card-types-settings'
        }, {
            ref: 'cartTypeCompareBtn'
            , selector: 'discount-card-types-settings component[name="card-types-grid"] component[action="compare"]'
            , autoCreate: true
            , xtype: 'discount-card-types-settings'
        }
        , {
            ref: 'promotionPanel'
            , selector: 'discount-promotion-settings component[name="promotion-panel"]'
            , autoCreate: true
            , xtype: 'discount-promotion-settings'
        }
        , {
            ref: 'promotionPanelForm'
            , selector: 'discount-promotion-settings component[name="promotion-form"]'
            , autoCreate: true
            , xtype: 'discount-promotion-settings'
        }
        , {
            ref: 'promotionPanelDates'
            , selectod: 'discount-promotion-settings component[name="promotion-form"] multidatepickerpanel'
            , autoCreate: true
            , xtype: 'discount-promotion-settings'
        }
        , {
            ref: 'promotionGrid'
            , selector: 'discount-promotion-settings component[name="promotion-grid"]'
            , autoCreate: true
            , xtype: 'discount-promotion-settings'
        }
        , {
            ref: 'couponPanel'
            , selector: 'discount-coupon-settings component[name="coupon-panel"]'
            , autoCreate: true
            , xtype: 'discount-coupon-settings'
        }
        , {
            ref: 'couponPanelForm'
            , selector: 'discount-coupon-settings component[name="coupon-form"]'
            , autoCreate: true
            , xtype: 'discount-coupon-settings'
        }
        , {
            ref: 'couponGrid'
            , selector: 'discount-coupon-settings component[name="coupon-grid"]'
            , autoCreate: true
            , xtype: 'discount-coupon-settings'
        }
        , {
            ref: 'couponCodeGrid'
            , selector: 'discount-coupon-settings component[name="coupon-code-grid"]'
            , autoCreate: true
            , xtype: 'discount-coupon-settings'
        }
        , {
            ref: 'fixedPanel'
            , selector: 'discount-fixed-settings component[name="fixed-panel"]'
            , autoCreate: true
            , xtype: 'discount-fixed-settings'
        }
        , {
            ref: 'fixedPanelForm'
            , selector: 'discount-fixed-settings component[name="fixed-form"]'
            , autoCreate: true
            , xtype: 'discount-fixed-settings'
        }
        , {
            ref: 'fixedGrid'
            , selector: 'discount-fixed-settings component[name="fixed-grid"]'
            , autoCreate: true
            , xtype: 'discount-fixed-settings'
        }
    ]
    , inited: false
    , init: function() {
       if (this.inited) {
           return;
       }
       this.inited = true
        this.control({
            'discount-rules-settings component[action="add_rule"]': {
                click: this.onAddRule
            }
            , 'discount-rules-settings component[action="save-rule"]': {
                click: this.onSaveRule
            }
            , 'discount-rules-settings component[action="delete_rule"]': {
                click: this.onDeleteRule
            }  
            , 'discount-rules-settings component[name="rules-grid"]': {
                itemclick: this.onEditRule
            }
            , '#rule-form-add-new-rule-expression': {
                click: this.onAddNewRuleExpression
            }
            , 'discount-card-types-settings component[action="add_card_type"]': {
                click: this.onAddCardType
            }
            , 'discount-card-types-settings component[action="delete_card_type"]': {
                click: this.onDeleteCardType
            }  
            , 'discount-card-types-settings component[action="save-card-type"]': {
                click: this.onSaveCardType
            }     
            , 'card-discount-field-combo': {
                select: this.onCardDiscountSelect
            }
            ,  '#card-type-form-add-new-static-expression': {
                click: this.addFieldsForStaticCard
            }
            ,  '#card-type-form-add-new-range-expression': {
                click: this.addRangeFieldset
            }
            , 'discount-card-types-settings component[action="revert-status-card-type"]': {
                click: this.revertCardTypeStatus
            }
            , 'discount-rules-settings component[action="revert-status-rule"]' : {
                click: this.revertRuleStatus
            }
            , 'discount-card-types-settings component[name="card-types-grid"]': {
                itemclick: this.onEditCardType
            }
            , 'discount-card-types-settings component[name="card-types-grid"] component[action="compare"]': {
                click: this.onCompareCardType
            }
            , 'discount-promotion-settings component[action="add_promotion"]': {
                click: this.onAddPromotion
            }     
            , 'discount-promotion-settings component[action="edit_promotion"]': {
                click: this.onEditPromotion
            }   
            , 'discount-promotion-settings component[name="promotion-grid"]': {
                itemclick: this.onEditPromotion
            }     
            , 'discount-promotion-settings component[action="save-promotion"]': {
                click: this.onSavePromotion
            }         
            , 'discount-promotion-settings component[action="delete_promotion"]': {
                click: this.onDeletePromotion
            }  
            , 'discount-promotion-settings component[action="revert-status-promotion"]' : {
                click: this.revertPromotionStatus
            }
            , 'discount-coupon-settings component[action="add_coupon"]': {
                click: this.onAddCoupon
            }
            , 'discount-coupon-settings component[action="edit_coupon"]': {
                click: this.onEditCoupon
            }
            , 'discount-coupon-settings component[name="coupon-grid"]': {
                itemclick: this.onEditCoupon
            }
            , 'discount-coupon-settings component[action="save-coupon"]': {
                click: this.onSaveCoupon
            }
            , 'discount-coupon-settings component[action="delete_coupon"]': {
                click: this.onDeleteCoupon
            }
            , 'discount-coupon-settings component[action="revert-status-coupon"]' : {
                click: this.revertCouponStatus
            }
            , 'discount-coupon-settings component[action="coupon-generate-message-sender"]' : {
                click: this.generateCouponMessageSender
            }
            , 'discount-coupon-settings component[action="add_coupon_code"]': {
                click: this.onAddCouponCode
            }
            , 'discount-coupon-settings component[action="delete_coupon_code"]': {
                click: this.onDeleteCouponCode
            }
            , 'discount-coupon-settings grid[name="coupon-code-grid"]': {
                render: function(grid) {
                    grid.getStore().on('update', this.onUpdateCouponCodeword);
                }
            }
            , 'discount-coupon-settings component[name="max_usage_count"]': {
                change: this.onCouponMaxUsageCount
            }
            , '#settings-discount-coupon-actions-is_for_message_sender': {
                change: this.onChangeMessageSenderCheck
            }
            , 'discount-fixed-settings component[action="add_fixed"]': {
                click: this.onAddFixed
            }
            , 'discount-fixed-settings component[action="edit_fixed"]': {
                click: this.onEditFixed
            }
            , 'discount-fixed-settings component[name="fixed-grid"]': {
                itemclick: this.onEditFixed
            }
            , 'discount-fixed-settings component[action="save-fixed"]': {
                click: this.onSaveFixed
            }
            , 'discount-fixed-settings component[action="delete-fixed"]': {
                click: this.onDeleteFixed
            }
            , 'discount-fixed-settings component[action="revert-status-fixed"]' : {
                click: this.revertFixedStatus
            }
            , 'discount-promotion-settings component[name="promotion-form"] multidatepickerpanel': {
                change: this.onPromotionDatesChange
            }
        });
    }
    , getSelectedPromotion: function(){
        var id = this.getPromotionPanelForm().getForm().findField('id').getValue();
        var sm = this.getPromotionGrid().getSelectionModel();
        if (!sm.hasSelection() && Ext.isEmpty(id)) {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.SelectTheTypeOfCard));
            return;
        }  
        return sm.hasSelection() ? sm.getLastSelected() : this.getPromotionPanelForm().getRecord();           
    }
    , onEditPromotion: function(){
        var selectedRecord = this.getSelectedPromotion();
        if (!selectedRecord) return;
        this.getPromotionPanelForm().show();
        this.getPromotionPanelForm().loadRecord(selectedRecord);
        this.fillPromotionData(selectedRecord);
        this.showPromotionRevertStatusButton(selectedRecord.get('status'));
        if (selectedRecord.get('can_edit') == 1) {
            this.getPromotionPanelSaveBtn().show();
            this.getPromotionPanelRevertBtn().show();
        } else {
            this.getPromotionPanelRevertBtn().hide();
        }
    }
    , onPromotionDatesChange: function(panel, dates) {
        var startField = this.getPromotionPanelForm().getForm().findField('start_date')
            , endField = this.getPromotionPanelForm().getForm().findField('end_date');

        startField.setDisabled(dates && dates.length);
        endField.setDisabled(dates && dates.length);
    }
    , onAddPromotion: function(){
        this.getPromotionPanelForm().show();
        this.getPromotionPanelForm().getForm().reset();
        this.getPromotionPanelForm().getForm().findField('id').setValue('');
        this.getPromotionPanelForm().query('multidatepickerpanel')[0].setValue('');
        this.getPromotionPanelSaveBtn().show();
        this.hidePromotionRevertStatusButton();
    }
    , fillPromotionData: function(record){
        var fieldsetData = Ext.decode(record.get('data'))[0]
            , fieldset = this.getPromotionPanelForm().query('fieldset').pop();

        this.getPromotionPanelForm().query('multidatepickerpanel')[0].setValue(record.get('dates'));

        fieldset.query('field').forEach(function(field){
            field.forceSelection = false;
            field.setValue(fieldsetData[field.getName()]);
            if (field.store) {
                field.getStore().on('load', function(){
                    field.forceSelection = true;
                });                
                field.getStore().load();
            }                
        }, this);        
    }
    , getPromotionData: function(){
        return this.getFormData(this.getPromotionPanelForm());
    }
    , onDeletePromotion: function(){
        var selectedRecord = this.getSelectedPromotion();
        if (!selectedRecord) return; 
        var self = this;
        Ext4.MessageBox.confirm(
            LS.__translate(LS.Removal)
            , LS.__translate(LS.AreYouSureYouWantToDeleteTheOffer)
            , function(btn) {
                if ('yes' === btn) {
                    Ext4.Ajax.request({
                        url: 'ajax_discount.php'
                        , scope: self
                        , params: {
                            cmd: 'delete_promotion'
                            , id: selectedRecord.get('id')
                        }
                        , success: function(r) {
                            this.onAddPromotion();
                            var data = Ext.decode(r.responseText);
                            Ext3.MsgManager.alert(LS.__translate(LS.Attention), data.msg);
                            this.getPromotionGrid().getStore().load();
                        }
                    });                          
                }
            }
        ); 
    }    
    , onSavePromotion: function() {
        var data = this.getPromotionData()
            , dataField = this.getPromotionPanelForm().query('field[name="data"]').pop()
            , dates = this.getPromotionPanelForm().query('multidatepickerpanel')[0].getValue()
            , datesField = this.getPromotionPanelForm().query('field[name="dates"]').pop();

        datesField.setValue(dates);
        dataField.setValue(Ext.encode(data));
        
        if (this.getPromotionPanelForm().getForm().isValid() && !Ext.isEmpty(data)) {
            this.getPromotionPanelForm().submit({
                clientValidation: true
                , success: function(form, action) {
                    this.getPromotionGrid().getStore().load();
                    var record = Ext.create('VetmanagerApp.modules.administration.model.settings.discount.Promotion', action.result.data);
                    this.getPromotionPanelForm().loadRecord(record);  
                    Ext3.MsgManager.alert(LS.__translate(LS.Warning), action.result.msg);
                    this.showPromotionRevertStatusButton(record.get('status'));
                    Ext3.MsgManager.alertWarning(LS.__translate(LS.Warning), LS.__translate(LS.UpdateTheSoftwareOnAllComputersPressFToRefreshTheDataOnTheDiscountsOtherwiseErrorsMayOccur));
                }
                , failure: function(form, action) {
                    var msg = (action.result.msg) ? action.result.msg : LS.__translate(LS.CouldNotSave);
                    Ext3.MsgManager.alertError(LS.__translate(LS.Error), msg);
                } 
                , scope: this
            });              
        } else {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), "Форма заполнена не верно.");
        }        

    }    
    , revertPromotionStatus: function(){
        var selectedRecord = this.getPromotionPanelForm().getRecord();
        Ext4.Ajax.request({
            url: 'ajax_discount.php'
            , scope: this
            , params: {
                cmd: 'revert_promotion'
                , id: selectedRecord.get('id')
            }
            , success: function(r) {
                var data = Ext.decode(r.responseText);
                this.getPromotionGrid().getStore().load();
                var record = Ext.create('VetmanagerApp.modules.administration.model.settings.discount.Promotion', data.data);
                this.getPromotionPanelForm().loadRecord(record);  
                Ext3.MsgManager.alert(LS.__translate(LS.Warning), data.msg);
                this.showPromotionRevertStatusButton(record.get('status'));
            }
        });    
    }    
    , revertRuleStatus: function(){
        var selectedRecord = this.getRulesPanelForm().getRecord();
        var me = this;

        Ext4.MessageBox.confirm(
            (selectedRecord.data.status == "DISABLED") ? LS.__translate(LS.Activation) : LS.__translate(LS.Deactivation)
            , (selectedRecord.data.status == "DISABLED") ? LS.__translate(LS.ActivationThisRuleActivatedLinkedDiscounts) : LS.__translate(LS.DeactivationThisRuleDiactivatedLinkedDiscounts)
            , function(btn) {
                if ('yes' === btn) {
                    Ext4.Ajax.request({
                        url: 'ajax_discount.php'
                        , scope: this
                        , params: {
                            cmd: 'revert_rule'
                            , id: selectedRecord.get('id')
                        }
                        , success: function(r) {
                            var data = Ext.decode(r.responseText);
                            me.getRulesPanelGrid().getStore().load();
                            var record = Ext.create('VetmanagerApp.modules.administration.model.settings.discount.Rule', data.data);
                            me.getRulesPanelForm().loadRecord(record);
                            me.showRuleRevertStatusButton(record.get('status'));
                            me.getPromotionGrid().getStore().reload();
                            me.getCardTypesPanelGrid().getStore().reload();
                            me.getCouponGrid().getStore().reload();
                            me.getFixedGrid().getStore().reload();
                        }
                    });
                }
            }
        );


    }
    , revertCardTypeStatus: function(){
        var selectedRecord = this.getCardTypesPanelForm().getRecord();
        Ext4.Ajax.request({
            url: 'ajax_discount.php'
            , scope: this
            , params: {
                cmd: 'revert_card_type'
                , id: selectedRecord.get('id')
            }
            , success: function(r) {
                var data = Ext.decode(r.responseText);
                this.getCardTypesPanelGrid().getStore().load();
                var record = Ext.create('VetmanagerApp.modules.administration.model.settings.discount.CardType', data.data);
                this.getCardTypesPanelForm().loadRecord(record);
                Ext3.MsgManager.alert(LS.__translate(LS.Warning), data.msg);
                this.showCardTypeRevertStatusButton(record.get('status'));
            }
        });                          
        
    }
    , onCardDiscountSelect:  function(combo, records, eOpts){
        var record = records[0];
        this.destroyCardTypeFieldSets();
        this.addCardsFieldsByRecord(record);
    }
    , addCardsFieldsByRecord: function(record){
        switch(record.get('card_type')) {
            case 'static':
                return this.addFieldsForStaticCard();
            case 'range':
                return this.addFieldsForRangeCard();
        }        
    }
    , destroyCardTypeFieldSets: function(){
        this.getCardTypesPanelForm()
                .query('fieldset')
                .forEach(function(f){
                    f.destroy();
                });        
    }
    , addFieldsForStaticCard: function(){
        Ext4.getCmp('card-type-form-add-new-range-expression').hide();
        Ext4.getCmp('card-type-form-add-new-static-expression').show();
        var fieldset = this.getCardTypesPanel().getStaticFieldSet();
        this.getCardTypesPanelForm().insert(this.getCardTypesPanelForm().items.length, fieldset);
        this.getCardTypesPanelForm().doLayout();
        return fieldset;
    }
    , addRangeFieldset: function(){        
        var fieldset = this.getCardTypesPanel().getRangeFieldSet();
        this.getCardTypesPanelForm().insert(this.getCardTypesPanelForm().items.length, fieldset);
        this.getCardTypesPanelForm().doLayout();      
        return fieldset;
    }
    , addFieldsForRangeCard: function(){
        Ext4.getCmp('card-type-form-add-new-range-expression').show();
        Ext4.getCmp('card-type-form-add-new-static-expression').hide();
        return this.addRangeFieldset();
    }
    , onAddCardType: function(){
        var sm = this.getCardTypesPanelGrid().getSelectionModel();
        sm.deselectAll(true);
        this.getCardTypesPanelForm().show();
        this.getCardTypesPanelForm().getForm().reset();
        this.destroyCardTypeFieldSets(); 
        this.addFieldsForStaticCard();
        this.getCardTypesPanelForm().getForm().findField('id').setValue('');
        this.hideCardTypeRevertStatusButton();        
    }
    , onEditCardType: function(){

        //TODO
        var sm = this.getCardTypesPanelGrid().getSelectionModel();
        if (sm.getCount() > 1) {
            this.getCardTypesPanelForm().hide();
            this.getCartTypeCompareBtn().enable().unmask();
            return;
        } else {
            this.getCartTypeCompareBtn().disable().mask();
        }
        var selectedRecord = this.getSelectedCardType();
        if (!selectedRecord) return;
        this.getCardTypesPanelForm().show();
        this.destroyCardTypeFieldSets(); 
        this.getCardTypesPanelForm().loadRecord(selectedRecord);
        this.addCardTypeFiedsetByData(selectedRecord);
        this.showCardTypeRevertStatusButton(selectedRecord.get('status'));
        if (selectedRecord.get('can_edit') == 1) {
            this.getCardTypesPanelSaveBtn().show();
            this.getCardTypesPanelRevertBtn().show();
        } else {
            this.getCardTypesPanelRevertBtn().hide();
        }
    }
    , onCompareCardType: function() {
        var sm = this.getCardTypesPanelGrid().getSelectionModel();
        if (sm.getCount() < 2) {
            return;
        }

        var ids = []
            , recs = sm.getSelection();

        this.getCardTypesPanelGrid().mask();

        Ext.each(recs, function(rec) {
            ids.push(rec.get('id'));
        });

        Ext4.Ajax.request({
            url: 'ajax_discount.php'
            , scope: this
            , params: {
                cmd: 'compare_card_type'
                , ids: ids.join(',')
            }
            , success: function(r) {
                var data = Ext4.decode(r.responseText);
                Ext3.MsgManager.alert(LS.__translate(LS.Attention), data.msg);
            }
            , callback: function() {
                this.getCardTypesPanelGrid().unmask();
                this.getCardTypesPanelGrid().getStore().load();
            }
        });
    }
    , addCardTypeFiedsetByData: function(record){
        var fieldsetsData = Ext.decode(record.get('data'));

        for (var i = 0; i < fieldsetsData.length; i++) {
            var fieldsetData = fieldsetsData[i]
                , fieldset = this.addCardsFieldsByRecord(record);

            fieldset.query('field').forEach(function (field) {
                field.forceSelection = false;
                field.setValue(fieldsetData[field.getName()]);
                if (field.store) {
                    field.getStore().on('load', function () {
                        field.forceSelection = true;
                    });
                    field.getStore().load();
                }
            }, this);
        }
    }
    , onDeleteCardType: function(){
        var selectedRecord = this.getSelectedCardType();
        if (!selectedRecord) return; 
        var self = this;
        Ext4.MessageBox.confirm(
            LS.__translate(LS.Removal)
            , LS.__translate(LS.AreYouSureYouWantToDeleteTheCardType)
            , function(btn) {
                if ('yes' === btn) {
                    Ext4.Ajax.request({
                        url: 'ajax_discount.php'
                        , scope: self
                        , params: {
                            cmd: 'delete_card_type'
                            , id: selectedRecord.get('id')
                        }
                        , success: function(r) {
                            var data = Ext4.decode(r.responseText);
                            Ext3.MsgManager.alert(LS.__translate(LS.Attention), data.msg);
                            this.onAddCardType();
                            this.getCardTypesPanelGrid().getStore().load();
                        }
                    });                          
                }
            }
        );         
    }
    , onSaveCardType: function(){
        var data = this.getCardTypeFormData()
        , dataField = this.getCardTypesPanelForm().query('field[name="data"]').pop();
        dataField.setValue(Ext.encode(data));
        if (this.getCardTypesPanelForm().getForm().isValid() && !Ext.isEmpty(data)) {
            this.getCardTypesPanelForm().submit({
                clientValidation: true
                , success: function(form, action) {
                    this.getCardTypesPanelGrid().getStore().load();
                    var record = Ext.create('VetmanagerApp.modules.administration.model.settings.discount.CardType', action.result.data);
                    this.getCardTypesPanelForm().loadRecord(record);
                    Ext3.MsgManager.alert(LS.__translate(LS.Warning), action.result.msg);
                    this.showCardTypeRevertStatusButton(record.get('status'));
                }
                , failure: function(form, action) {                
                    var msg = (action.result.msg) ? action.result.msg : LS.__translate(LS.CouldNotSave);
                    Ext3.MsgManager.alertError(LS.__translate(LS.Error), msg);
                } 
                , scope: this
            });              
        } else {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), "Форма заполнена не верно.");
        }
    }
    , onSaveRule: function() {
        var data = this.getRulesFormData()
        , dataField = this.getRulesPanelForm().query('field[name="data"]').pop();
        dataField.setValue(Ext.encode(data));
        if (this.getRulesPanelForm().getForm().isValid() && !Ext.isEmpty(data)) {
            this.getRulesPanelForm().submit({
                clientValidation: true
                , success: function(form, action) {
                    this.getRulesPanelGrid().getStore().load();
                    var record = Ext.create('VetmanagerApp.modules.administration.model.settings.discount.Rule', action.result.data);
                    this.getRulesPanelForm().loadRecord(record);  
                    Ext3.MsgManager.alert(LS.__translate(LS.Warning), action.result.msg);
                    this.showRuleRevertStatusButton(record.get('status'));
                }
                , failure: function(form, action) {
                    var msg = (action.result.msg) ? action.result.msg : LS.__translate(LS.CouldNotSave);
                    Ext3.MsgManager.alertError(LS.__translate(LS.Error), msg);
                } 
                , scope: this
            });           
        } else {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), "Форма заполнена не верно.");
        }        
    }
    , onAddRule: function() {
        this.getRulesPanelForm().show();
        this.getRulesPanelForm().getForm().reset();
        this.destroyRuleFieldSets();
        this.addRuleFieldSet();
        //this.hideRuleRevertStatusButton();
    }
    , destroyRuleFieldSets: function(){
        this.getRulesPanelForm().getForm().findField('id').setValue('');
        this.getRulesPanelForm()
                .query('fieldset')
                .forEach(function(f){
                    f.destroy();
                });
    }
    , getSelectedCardType: function(){
        var id = this.getCardTypesPanelForm().getForm().findField('id').getValue();
        var sm = this.getCardTypesPanelGrid().getSelectionModel();
        if (!sm.hasSelection() && Ext.isEmpty(id)) {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.SelectTheTypeOfCard));
            return;
        }  
        return sm.hasSelection() ? sm.getLastSelected() : this.getCardTypesPanelForm().getRecord();        
    }
    , getSelectedRule: function(){
        var sm = this.getRulesPanelGrid().getSelectionModel();
        if (!sm.hasSelection()) {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.SelectARule));
            return;
        }  
        return sm.getLastSelected();
        
    }
    , onEditRule: function(){
        var me = this;
        Common.showLoadingMask();

        setTimeout(function(){
            var selectedRecord = me.getSelectedRule();
            if (!selectedRecord) return;
            me.getRulesPanelForm().show();
            me.destroyRuleFieldSets();
            me.getRulesPanelForm().loadRecord(selectedRecord);
            me.addRuleFiedsetByData(selectedRecord.get('data'), me.getRulesPanel().getTypesRule());
            me.showRuleRevertStatusButton(selectedRecord.get('status'));
        },10);
    }
    , showCardTypeRevertStatusButton: function(currentStatus){
        var button = Ext4.getCmp('revert-status-card-type-button');
        button.setText(button.textByStatus[currentStatus]);
        button.show();
    }
    , hideCardTypeRevertStatusButton: function(){
        var button = Ext4.getCmp('revert-status-card-type-button');
        button.hide();        
    }
    , showRuleRevertStatusButton: function(currentStatus){
        var button = Ext4.getCmp('revert-status-rule-button');
        button.setText(button.textByStatus[currentStatus]);
        button.show();
    }
   /* , hideRuleRevertStatusButton: function(){
        var button = Ext4.getCmp('revert-status-rule-button');
        button.hide();        
    } */

    , hidePromotionRevertStatusButton: function(){
        var button = Ext4.getCmp('revert-status-promotion-button');
        button.hide();        
    }
    , showPromotionRevertStatusButton: function(currentStatus){
        var button = Ext4.getCmp('revert-status-promotion-button');
        button.setText(button.textByStatus[currentStatus]);
        button.show();
    }    
    , onDeleteRule: function(){
        var selectedRecord = this.getSelectedRule();
        if (!selectedRecord) return; 
        var self = this;
        Ext4.MessageBox.confirm(
            LS.__translate(LS.Removal)
            , LS.__translate(LS.AreYouSureYouWantToDeleteTheRule)
            , function(btn) {
                if ('yes' === btn) {
                    Ext4.Ajax.request({
                        url: 'ajax_discount.php'
                        , scope: self
                        , params: {
                            cmd: 'delete_rule'
                            , id: selectedRecord.get('id')
                        }
                        , success: function(r) {
                            this.onAddRule();
                            var data = Ext.decode(r.responseText);
                            Ext3.MsgManager.alert(LS.__translate(LS.Attention), data.msg);
                            this.getRulesPanelGrid().getStore().load();
                        }
                    });                          
                }
            }
        ); 
    }
    , getFormData: function(form){
        var fieldsets = form.query('fieldset')
            , result = [];
        for (var i = 0; i < fieldsets.length; i++) {
            var fieldset = fieldsets[i]
                , fielValues = {}
                , fields = fieldset.query('field');    
            for (var j = 0; j < fields.length; j++) {
                var field = fields[j];
                fielValues[field.getName()] = field.getValue();
            }    
            result.push(fielValues);
        }
        return result;        
    }
    , getCardTypeFormData: function(){
        return this.getFormData(this.getCardTypesPanelForm());
    }
    , getRulesFormData: function(){        
        return this.getFormData(this.getRulesPanelForm());
    }
    /*, addRuleFiedsetByData: function(data){
        var fieldsetsData = Ext.decode(data);
        for (var i = 0; i < fieldsetsData.length; i++) {
            var fieldset = this.addRuleFieldSet();

            var scope = {
                fieldsetData: fieldsetsData[i]
                , fieldset: fieldset
                , ruleTypeCombo: fieldset.query('field[name="rule-type-combo-field"]')[0]                
            };

            scope.ruleTypeCombo.forceSelection = false;
            scope.ruleTypeCombo.setValue(scope.fieldsetData["rule-type-combo-field"]);

            scope.ruleTypeCombo.getStore().on('load', function(store){
                var value = this.fieldsetData["rule-type-combo-field"] ;
                var record = store.getAt(store.find('name', value));

                this.ruleTypeCombo.forceSelection = true;
                this.ruleTypeCombo.setValue(value);
                this.ruleTypeCombo.fireEvent('select', this.ruleTypeCombo, [record], value);
                this.fieldset.query('field').forEach(function(field){
                    if (field.getName() === 'rule-type-combo-field') return;
                    field.forceSelection = false;
                    field.setValue(this.fieldsetData[field.getName()]);
                    if (field.store) {
                        field.store.proxy.extraParams = field.store.proxy.extraParams || {};
                        field.store.proxy.extraParams.load_value = this.fieldsetData[field.getName()];
                        field.getStore().on('load', function(){
                            field.forceSelection = true;
                        });                        
                        field.getStore().load();
                    }
                }, this);
            }, scope, {single: true});
            scope.ruleTypeCombo.getStore().load();
        }

    }*/
    , addRuleFiedsetByData: function(data, ruleTypeRecords){
        //console.log(this.getRulesPanel().getTypesRule());
        var fieldsetsData = Ext.decode(data);
        for (var i = 0; i < fieldsetsData.length; i++) {
            var fieldset = this.addRuleFieldSet();
            var scope = {
                fieldsetData: fieldsetsData[i]
                , fieldset: fieldset
                , ruleTypeCombo: fieldset.query('field[name="rule-type-combo-field"]')[0]
            };

            scope.ruleTypeCombo.forceSelection = false;
            scope.ruleTypeCombo.setValue(scope.fieldsetData["rule-type-combo-field"]);
            scope.ruleTypeCombo.store.loadData(ruleTypeRecords);

            var value = scope.fieldsetData["rule-type-combo-field"] ;
            var record = scope.ruleTypeCombo.store.getAt(scope.ruleTypeCombo.store.find('name', value));

            scope.ruleTypeCombo.forceSelection = true;
            scope.ruleTypeCombo.setValue(value);
            scope.ruleTypeCombo.fireEvent('select', scope.ruleTypeCombo, [record], value);
            scope.fieldset.query('field').forEach(function(field){
                if (field.getName() === 'rule-type-combo-field') return;
                field.forceSelection = false;
                field.setValue(scope.fieldsetData[field.getName()]);
                if (field.store) {
                    field.store.proxy.extraParams = field.store.proxy.extraParams || {};
                    field.store.proxy.extraParams.load_value = scope.fieldsetData[field.getName()];
                    field.getStore().on('load', function(){
                        field.forceSelection = true;
                    });
                    field.getStore().load();
                }
            }, this);
        }

    }


    , onAddNewRuleExpression: function(){
        this.addRuleFieldSet();
    }
    , addRuleFieldSet: function(){
        var fieldSet = this.getRulesPanel().getNewRuleFieldSet(this.getRulesPanelForm().query('fieldset').length);
        
        this.getRulesPanelForm().add(fieldSet);     
        return fieldSet;
    }
    , onAddCoupon: function(){
        this.getCouponPanelForm().show();
        this.getCouponPanelForm().getForm().reset();
        this.getCouponPanelForm().getForm().findField('id').setValue('');
        this.getCouponCodeGrid().getStore().removeAll();
        this.hideCouponRevertStatusButton();
    }
    , onEditCoupon: function(){
        var selectedRecord = this.getSelectedCoupon();
        if (!selectedRecord) return;
        this.getCouponPanelForm().show();
        this.getCouponPanelForm().loadRecord(selectedRecord);
        this.fillCouponData(selectedRecord);
        this.showCouponRevertStatusButton(selectedRecord.get('status'));
        if (selectedRecord.get('can_edit') == 1) {
            this.getCouponPanelSaveBtn().show();
            this.getCouponPanelRevertBtn().show();
        } else {
            this.getCouponPanelRevertBtn().hide();
        }
    }
    , onSaveCoupon: function() {
        var data = this.getCouponData()
            , dataField = this.getCouponPanelForm().query('field[name="data"]').pop();
        dataField.setValue(Ext.encode(data));

        if (this.getCouponPanelForm().getForm().isValid() && !Ext.isEmpty(data) && data[0].codes && data[0].codes.length) {
            this.getCouponPanelForm().submit({
                clientValidation: true
                , success: function(form, action) {
                    this.getCouponGrid().getStore().load();
                    var record = Ext.create('VetmanagerApp.modules.administration.model.settings.discount.Coupon', action.result.data);
                    this.getCouponPanelForm().loadRecord(record);
                    Ext3.MsgManager.alert(LS.__translate(LS.Warning), action.result.msg);
                    this.showCouponRevertStatusButton(record.get('status'));
                    Ext4.getCmp('coupon-generate-message-sender-button').setVisible(record.get('is_for_message_sender') == 1);
                    Ext3.MsgManager.alertWarning(LS.__translate(LS.Warning), LS.__translate(LS.UpdateTheSoftwareOnAllComputersPressFToRefreshTheDataOnTheDiscountsOtherwiseErrorsMayOccur));
                }
                , failure: function(form, action) {
                    var msg = (action.result.msg) ? action.result.msg : LS.__translate(LS.CouldNotSave);
                    Ext3.MsgManager.alertError(LS.__translate(LS.Error), msg);
                }
                , scope: this
            });
        } else if (data[0].codes && !data[0].codes.length) {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), "Необходимо ввести хотя бы одно кодовое слово купона.");
        } else {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), "Форма заполнена не верно.");
        }

    }
    , onDeleteCoupon: function(){
        var selectedRecord = this.getSelectedCoupon();
        if (!selectedRecord) return;
        var self = this;
        Ext4.MessageBox.confirm(
            LS.__translate(LS.Removal)
            , LS.__translate(LS.AreYouSureYouWantToDeleteTheOffer)
            , function(btn) {
                if ('yes' === btn) {
                    Ext4.Ajax.request({
                        url: 'ajax_discount.php'
                        , scope: self
                        , params: {
                            cmd: 'delete_coupon'
                            , id: selectedRecord.get('id')
                        }
                        , success: function(r) {
                            this.onAddCoupon();
                            var data = Ext.decode(r.responseText);
                            Ext3.MsgManager.alert(LS.__translate(LS.Attention), data.msg);
                            this.getCouponGrid().getStore().load();
                        }
                    });
                }
            }
        );
    }
    , revertCouponStatus: function(){
        var selectedRecord = this.getCouponPanelForm().getRecord();
        Ext4.Ajax.request({
            url: 'ajax_discount.php'
            , scope: this
            , params: {
                cmd: 'revert_coupon'
                , id: selectedRecord.get('id')
            }
            , success: function(r) {
                var data = Ext.decode(r.responseText);
                this.getCouponGrid().getStore().load();
                var record = Ext.create('VetmanagerApp.modules.administration.model.settings.discount.Coupon', data.data);
                this.getCouponPanelForm().loadRecord(record);
                Ext3.MsgManager.alert(LS.__translate(LS.Warning), data.msg);
                this.showCouponRevertStatusButton(record.get('status'));
            }
        });
    }
    , getSelectedCoupon: function(){
        var id = this.getCouponPanelForm().getForm().findField('id').getValue();
        var sm = this.getCouponGrid().getSelectionModel();
        if (!sm.hasSelection() && Ext.isEmpty(id)) {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.SelectACoupon));
            return;
        }
        return sm.hasSelection() ? sm.getLastSelected() : this.getCouponPanelForm().getRecord();
    }
    , hideCouponRevertStatusButton: function(){
        var button = Ext4.getCmp('revert-status-coupon-button');
        button.hide();
    }
    , showCouponRevertStatusButton: function(currentStatus){
        var button = Ext4.getCmp('revert-status-coupon-button');
        button.setText(button.textByStatus[currentStatus]);
        button.show();
    }
    , getCouponData: function(){
        var data = this.getFormData(this.getCouponPanelForm())
            , grid = this.getCouponCodeGrid()
            , store = grid.getStore()
            , codes = [];

        store.each(function(rec) {
            codes.push({
                id: rec.get('id')
                , codeword: rec.get('codeword')
            });
        });

        data[0].codes = codes;
        return data;
    }
    , fillCouponData: function(record){
        var fieldsetData = Ext.decode(record.get('data'))[0]
            , fieldset = this.getCouponPanelForm().query('fieldset').pop();
        fieldset.query('field').forEach(function(field){
            field.forceSelection = false;
            field.setValue(fieldsetData[field.getName()]);
            if (field.store) {
                field.getStore().on('load', function(){
                    field.forceSelection = true;
                });
                field.getStore().load();
            }
        }, this);

        var grid = this.getCouponCodeGrid()
            , store = grid.getStore()
            , codes = record.get('codes');
        store.removeAll();
        if (codes && Ext.isArray(codes)) {
            for (var i = 0; i < codes.length; i++) {
                var rec = new store.model(codes[i]);
                store.add([rec]);
            }
            Ext.getCmp('settings-discount-coupon-actions-is_for_message_sender').setDisabled(codes.length > 1);
        }
    }
    , updateCouponMessageSenderStatus: function() {
        var grid = this.getCouponCodeGrid()
            , store = grid.getStore()
            , ch = Ext.getCmp('settings-discount-coupon-actions-is_for_message_sender');

        if (store.getCount() > 1) {
            ch.setValue(false);
            ch.disable();
        } else {
            ch.enable();
        }
    }
    , onAddCouponCode: function() {
        var grid = this.getCouponCodeGrid()
            , store = grid.getStore()
            , rec = new store.model({codeword: this.generateCouponCode(12)})
            , ch = Ext.getCmp('settings-discount-coupon-actions-is_for_message_sender');

        if (ch.checked && store.getCount() > 0) {
            Ext3.MsgManager.alert(LS.__translate(LS.Warning), LS.__translate(LS.YouCanAddOnlyOneCodeWordToTheMailingCoupons));
            return false;
        } else {
            store.insert(0, rec);
            grid.plugins[0].startEdit(0, 0);
            this.updateCouponMessageSenderStatus();
        }
    }
    , generateCouponCode: function (len) {
        var code = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        len = parseInt(len) || 8;

        for( var i=0; i < len; i++ )
            code += possible.charAt(Math.floor(Math.random() * possible.length));

        var grid = this.getCouponCodeGrid()
            , store = grid.getStore();

        store.each(function(rec) {
            if (rec.get('codeword') == code) {
                code = this.generateCouponCode(len);
                return false;
            }
        }, this);
        return code;
    }
    , onDeleteCouponCode: function() {
        var grid = this.getCouponCodeGrid()
            , store = grid.getStore()
            , sm = grid.getSelectionModel()
            , recs = sm.getSelection();

        if (recs && recs.length) {
            var rec = recs[0]
                , index = store.indexOf(rec);

            store.remove(recs);

            if (index < store.getCount() && index >= 0) {
                sm.select(index);
            }
            this.updateCouponMessageSenderStatus();
        }
    }
    , onChangeMessageSenderCheck: function (ch) {
        var frm = this.getCouponPanelForm();
        if (frm.getForm().findField('id').getValue()) {
            Ext4.getCmp('coupon-generate-message-sender-button').setVisible(ch.checked);
        }
    }
    , generateCouponMessageSender: function () {
        Ext4.Ajax.request({
            url: 'ajax_discount.php'
            , scope: this
            , params: {
                cmd: 'coupon_generate_message_sender'
                , id: this.getCouponPanelForm().getForm().findField('id').getValue()
            }
            , success: function(r) {
                var data = Ext.decode(r.responseText);
                data.data.disable_send = true;

                var module = VetManager.getModule('message_sender', 'from_coupon'),
                    controller = module.route('MessageSender.Controller'),
                    mainWin = Ext4.getCmp('mainSettingsWindow'),
                    win = controller.onGetByIdSuccess(data),
                    zIndex;

                if (win && win.isVisible() && mainWin) {
                    zIndex = mainWin.el.getZIndex();
                    win.setZIndex(zIndex + 5);
                    mainWin.zIndexManager._hideModalMask();
                }
            }
        });
    }
    , onUpdateCouponCodeword: function(store, modifiedRec) {
        var code = modifiedRec.get('codeword');

        store.each(function(rec) {
            if (rec != modifiedRec && rec.get('codeword') == code) {
                modifiedRec.reject();
                Ext3.MsgManager.alert(LS.__translate(LS.Warning), LS.__translate(LS.CodeWordsMustBeUnique));
                return false;
            }
        });

        modifiedRec.commit(true);
    }
    , onCouponMaxUsageCount: function(maxUsageField) {
        var maxUsage = maxUsageField.getValue(),
            maxUsagePerClientField = this.getCouponPanelForm().getForm().findField('max_usage_count_per_client'),
            maxUsagePerClient = maxUsagePerClientField.getValue();

        if (maxUsage == 0) {
            maxUsagePerClientField.setMaxValue(Number.MAX_SAFE_INTEGER);
        } else {
            if (maxUsage < maxUsagePerClient) {
                maxUsagePerClientField.setValue(maxUsage);
            }
            maxUsagePerClientField.setMaxValue(maxUsage);
        }
    }

    , hideFixedRevertStatusButton: function() {
        var button = Ext4.getCmp('revert-status-fixed-button');
        button.hide();
    }
    , showFixedRevertStatusButton: function(currentStatus) {
        var button = Ext4.getCmp('revert-status-fixed-button');
        button.setText(button.textByStatus[currentStatus]);
        button.show();
    }
    , getSelectedFixed: function() {
        var id = this.getFixedPanelForm().getForm().findField('id').getValue();
        var sm = this.getFixedGrid().getSelectionModel();
        if (!sm.hasSelection() && Ext.isEmpty(id)) {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.SelectAPermanentDiscountSurcharge));
            return;
        }
        return sm.hasSelection() ? sm.getLastSelected() : this.getFixedPanelForm().getRecord();
    }
    , fillFixedData: function(record) {
        var fieldsetData = Ext.decode(record.get('data'))[0]
            , fieldset = this.getFixedPanelForm().query('fieldset').pop();
        fieldset.query('field').forEach(function(field){
            field.forceSelection = false;
            field.setValue(fieldsetData[field.getName()]);
            if (field.store) {
                field.getStore().on('load', function(){
                    field.forceSelection = true;
                });
                field.getStore().load();
            }
        }, this);
    }
    , getFixedData: function(){
        return this.getFormData(this.getFixedPanelForm());
    }
    , onAddFixed: function() {
        var panel = this.getFixedPanelForm(), form = panel.getForm();
        panel.show();
        form.reset();
        form.findField('id').setValue('');
        form.findField('percent_type').setValue('discount');
        this.hideFixedRevertStatusButton();
    }
    , onEditFixed: function() {
        var selectedRecord = this.getSelectedFixed();
        if (!selectedRecord) return;
        var panel = this.getFixedPanelForm();
        panel.show();
        panel.loadRecord(selectedRecord);
        this.fillFixedData(selectedRecord);
        this.showFixedRevertStatusButton(selectedRecord.get('status'));
        if (selectedRecord.get('can_edit') == 1) {
            this.getFixedPanelSaveBtn().show();
            this.getFixedPanelRevertBtn().show();
        } else {
            this.getFixedPanelRevertBtn().hide();
        }
    }
    , onSaveFixed: function() {
        var data = this.getFixedData()
            , panel = this.getFixedPanelForm()
            , dataField = panel.query('field[name="data"]').pop()
            , grid = this.getFixedGrid();
        dataField.setValue(Ext.encode(data));

        if (panel.getForm().isValid() && !Ext.isEmpty(data)) {
            panel.submit({
                clientValidation: true
                , success: function(form, action) {
                    grid.getStore().load();
                    var record = Ext.create('VetmanagerApp.modules.administration.model.settings.discount.Fixed', action.result.data);
                    panel.loadRecord(record);
                    Ext3.MsgManager.alert(LS.__translate(LS.Warning), action.result.msg);
                    this.showFixedRevertStatusButton(record.get('status'));
                    Ext3.MsgManager.alertWarning(LS.__translate(LS.Warning), LS.__translate(LS.UpdateTheSoftwareOnAllComputersPressFToRefreshTheDataOnTheDiscountsOtherwiseErrorsMayOccur));
                }
                , failure: function(form, action) {
                    var msg = (action.result.msg) ? action.result.msg : LS.__translate(LS.CouldNotSave);
                    Ext3.MsgManager.alertError(LS.__translate(LS.Error), msg);
                }
                , scope: this
            });
        } else {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.TheFormHasBeenCompletedIncorrectly) + '.');
        }
    }
    , onDeleteFixed: function() {
        var selectedRecord = this.getSelectedFixed();
        if (!selectedRecord) return;
        var self = this;
        Ext4.MessageBox.confirm(
            LS.__translate(LS.Removal)
            , LS.__translate(LS.AreYouSureYouWantToDeleteTheSetting)
            , function(btn) {
                if ('yes' === btn) {
                    Ext4.Ajax.request({
                        url: 'ajax_discount.php'
                        , scope: self
                        , params: {
                            cmd: 'delete_fixed'
                            , id: selectedRecord.get('id')
                        }
                        , success: function(r) {
                            this.onAddFixed();
                            var data = Ext.decode(r.responseText);
                            Ext3.MsgManager.alert(LS.__translate(LS.Attention), data.msg);
                            this.getFixedGrid().getStore().load();
                        }
                    });
                }
            }
        );
    }
    , revertFixedStatus: function() {
        var selectedRecord = this.getSelectedFixed();
        Ext4.Ajax.request({
            url: 'ajax_discount.php'
            , scope: this
            , params: {
                cmd: 'revert_fixed'
                , id: selectedRecord.get('id')
            }
            , success: function(r) {
                var data = Ext.decode(r.responseText);
                this.getFixedGrid().getStore().load();
                var record = Ext.create('VetmanagerApp.modules.administration.model.settings.discount.Fixed', data.data);
                this.getFixedPanelForm().loadRecord(record);
                Ext3.MsgManager.alert(LS.__translate(LS.Warning), data.msg);
                this.showFixedRevertStatusButton(record.get('status'));
            }
        });
    }
});