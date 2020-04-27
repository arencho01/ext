Ext4.define('VetmanagerApp.modules.administration.view.settings.discount.Rules', {
    extend: 'Ext4.Panel'
    , xtype: 'discount-rules-settings'
    , title: LS.__translate(LS.Rules)
    , border: false
    , buttonAlign: 'center'
    , typeOfRules: null
    , layout: {
        type: 'hbox'
        , pack: 'start'
        , align: 'stretch'
    }
    , initComponent: function() {
        this.callParent();
        this.initTypesRulesArray();
        this.add(this.getRulesGridPanel());
        this.add(this.getRulePanel());
    }
    , initTypesRulesArray:function(){
        var ext = new Ext.create('VetmanagerApp.modules.administration.view.settings.discount.RuleTypeCombo');
        ext.getStore().load({
            scope: this,
            callback: function (records, operation, success) {
                this.typeOfRules = records;
            }
        });
    }
    , getTypesRule : function(){
        return this.typeOfRules;
    }

    , getRulesGridPanel: function(){
        return {
            xtype: 'grid'
            , name: 'rules-grid'
            , border: false
            , width: 350            
            , store: 'VetmanagerApp.modules.administration.store.settings.discount.Rules'
            , columns: [
                {
                    header: LS.__translate(LS.Number)
                    , dataIndex: 'id'
                    , width: 60
                    , sortable: false
                    , hideable: false                    
                }
                , {
                    header: LS.__translate(LS.Namez)
                    , dataIndex: 'title'
                    , width: 210
                    , sortable: false
                    , hideable: false
                }
                , {
                    header: LS.__translate(LS.Status)
                    , dataIndex: 'status'
                    , width: 80
                    , sortable: false
                    , hideable: false
                    , renderer: Common.renderStatus
                }
            ],
            listeners:{
                'selectionchange': function(){
                    var buttonSave = this.getDockedItems('toolbar[dock="top"]')[0].items.items[0];
                    if(this.getSelectionModel().getCount()==1){
                        buttonSave.enable().unmask();
                    } else {
                        buttonSave.disable().mask();
                    }
                }
            }
            , tbar: [
                {

                    formBind: true
                    , cls: 'button-save'
                    , xtype: 'button'
                    , action: 'save-rule'
                    , maskElement: 'el'
                    , disabled: true
                    , listeners: {
                        render: function(btn) {
                            btn.mask();
                        }
                    }
                },
                "&nbsp",
                {
                    xtype: 'button'
                    , cls: 'button-add'
                    , action: 'add_rule'
                    , handler: function(btn){
                        btn.ownerCt.items.items[0].enable().unmask();
                    }
                }
                , {
                    xtype: 'button'
                    , cls: 'button-del'
                    , action: 'delete_rule'
                }


            ]
        };
    }
    , getRulePanel: function(){
        return {
            xtype: 'panel'
            , name: 'rule-panel'
            , border: false
            , bodyStyle: 'padding: 5px 5px 0; overflow-y: auto; border-left: 1px solid #99bce8 !important;'
            , items: [
                this.getRuleForm()
            ]
            , flex: 1
            , tbar: [
                {
                    xtype: 'displayfield',
                    width: 1,
                    height: 29,
                    border: false
                },
                '->'
                , {
                    text: LS.__translate(LS.Activation)
                    , id: 'revert-status-rule-button'
                    , formBind: true
                    , xtype: 'button'
                    , action: 'revert-status-rule'
                    , hidden: true
                    , textByStatus: {
                        ACTIVE: LS.__translate(LS.Deactivate)
                        , DISABLED: LS.__translate(LS.Activate)
                    }
                }
            ]
        };
    }
    , getRuleForm: function(){
        return {
            name: 'rule-form'
            , url:'ajax_discount.php'
            , defaultType: 'textfield'
            , xtype: 'form'
            , hidden: true
            , border: false  
            , buttonAlign: 'center'
            , fieldDefaults: {
                msgTarget: 'side'
                , labelWidth: 150
            }
            , defaults: {
                anchor: '100%'
            }
            , items: [
                {xtype: 'hidden', name: 'id'}
                , {xtype: 'hidden', name: 'cmd', value: 'create_rule'}
                , {
                    fieldLabel: LS.__translate(LS.Namez)  + ' *'
                    , name: 'title'
                    , allowBlank: false
                }
                , {xtype: 'hidden', name: 'status', value: 'ACTIVE'}
                , {
                    name: 'data'
                    , xtype: 'hidden'
                }
                , {
                    text: LS.__translate(LS.AddACondition)
                    , xtype: 'button'
                    , id: 'rule-form-add-new-rule-expression'
                    , maxWidth: 200
                }
            ]
        };
    }
    , getNewRuleFieldSet: function(fieldsetLength){
        var ruleTypeFields = []
            ,  expression = (fieldsetLength > 0) ? {xtype: 'expression-combo-field-or-and'} : {xtype: 'hidden', name: 'expression-combo-field-or-and', value: 'AND'}
        var fieldSet = Ext.create('Ext.form.FieldSet', {
            xtype: 'fieldset'
            , collapsed: false  
            , fieldDefaults: {
                msgTarget: 'side'
                , labelWidth: 150
            }              
            , defaults: {
                width: 600
            }
            , border: true
            , style: 'padding: 20px; margin: 5px;'
            , items: [
                expression
                , {
                    xtype: 'rule-type-combo-field'
                    , listeners: {
                        select: function(combo, records, eOpts){
                            var record = records[0];
                            if (ruleTypeFields.length > 0) {
                                while(ruleTypeFields.length){
                                    var field = ruleTypeFields.pop();
                                    field.destroy();
                                }
                            }
                            var neededRuleTypesFields = Ext.decode(record.get('data'));
                            if (neededRuleTypesFields.requiredFields) {
                                var validator = function(value){
                                    var errorMsg = LS.__translate(LS.AdditionalConditionsAreRequired)
                                        , result = true
                                        , form = this.up('form');
                                    for (var i = 0; neededRuleTypesFields.requiredFields.length > i; i++) {
                                        var curField = neededRuleTypesFields.requiredFields[i]
                                            , field = form.getForm().findField(curField);
                                        result = (result === true && field !== null);    
                                    }
                                    return result || errorMsg;
                                };
                            }
                            while(neededRuleTypesFields.fields.length){
                                var fieldXtype = neededRuleTypesFields.fields.pop();
                                var field = Ext.widget(fieldXtype);
                                if (validator) {
                                    field.validator = validator;
                                }
                                ruleTypeFields.push(field);
                                this.up('fieldset').insert(2, field);                                
                            }                            
                            this.up('fieldset').doLayout();
                        }
                    }
                }
                , {
                    xtype: 'button'
                    , text: LS.__translate(LS.RemoveACondition)
                    , maxWidth: 200
                    , handler: function(){
                        fieldSet.destroy();
                    }
                }
            ]
        });
        return fieldSet;
    }
});