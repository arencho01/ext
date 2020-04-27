Ext4.define('VetmanagerApp.modules.administration.view.settings.MobileSettings', {
    extend: 'Ext4.panel.Panel'
    , xtype: 'mobilesettings'
    , border: false
    , region: 'center'
    , title: false
    , buttonAlign: 'center'
    , url: 'ajax_administration.php'
    , scope: this
    , layout: {
        type: 'hbox'
        , pack: 'start'
        , align: 'stretch'
    }
    , requires: [
        'VetmanagerApp.modules.administration.view.settings.MobileNotificationRuleTypeCombo'
        , 'VetmanagerApp.modules.administration.view.settings.discount.ExpressionCombo'
    ]
    , initComponent: function() {
        this.callParent();
        this.add(this.getMessagesGrid());
        this.add(this.getRulePanel());
    }  
    , getMessagesGrid: function() {
        return {
            xtype: 'grid'
            , name: 'notification_grid'
            , border: false
            , style: 'border-right: 1px solid #99bbe8;'
            , width: 200
            , tbar: [
                {
                    xtype: 'button'
                    , cls: 'button-add'
                    , action: 'add_notification'
                }, {
                    xtype: 'button'
                    , cls: 'button-del'
                    , action: 'delete_notification'
                }, {
                    cls: 'button-save'
                    , xtype: 'button'
                    , action: 'save_notification'
                }
            ]
            , store: {
                xtype: 'store'
                , fields: ['id', 'title', 'user_rules', 'admission_rules', 'status', 'clinic_id']
                , autoLoad: true
                , proxy: {
                    type: 'ajax'
                    , url: 'ajax_mobile_notifications.php'
                    , extraParams: {
                        cmd: 'get_notifications'
                    }
                    , reader: {
                        type: 'json'
                        , root: 'data'
                    }
                }
            }
            , columns: [{
                header: LS.__translate(LS.Notifications)
                , dataIndex: 'title'
                , width: '100%'
                , sortable: false
                , hideable: false
            }]
        };
    }
    , getRulePanel: function() {
        return {
            xtype: 'form'
            , hidden: true
            , name: 'main_rules_panel'
            , flex: 1
            , border: false
            , layout: {
                type: 'vbox'
                , pack: 'start'
                , align: 'stretch'
            }
            , items: [
                {
                    xtype: 'panel'
                    , layout: 'form'
                    , height: 50
                    , padding: '5px'
                    , border: false
                    , items: [
                        {
                            xtype: 'textfield'
                            , fieldLabel: LS.__translate(LS.Namez) + ' *'
                            , allowBlank: false
                            , name: 'title'
                            , anchor: '100%'
                        }
                        , {xtype: 'hidden', name: 'id'}
                        , {xtype: 'hidden', name: 'cmd', value: 'create_rule'}
                        , {xtype: 'hidden', name: 'status', value: 'active'}   
                    ]
                }, {
                    xtype: 'panel'
                    , flex: 1
                    , border: false
                    , layout: {
                        type: 'hbox'
                        , pack: 'start'
                        , align: 'stretch'
                    }
                    , items: [
                        {
                            xtype: 'panel'
                            , flex: 1
                            , title: LS.__translate(LS.PeopleToNotify)
                            , border: false
                            , style: 'border-right: 1px solid #99bbe8;'
                            , layout: 'fit'
                            , items: [{
                                xtype: 'panel'
                                , border: false
                                , bodyStyle: 'padding: 5px 5px 0; overflow-y: auto;'
                                , items: [
                                    this.getRuleForm('user-rule-form', 'add_user_rule_fieldset')
                                ]    
                            }]
                        }, {
                            xtype: 'panel'
                            , flex: 1
                            , title: LS.__translate(LS.VisitingRules)
                            , border: false
                            , layout: 'fit'
                            , items: [{
                                xtype: 'panel'
                                , border: false
                                , bodyStyle: 'padding: 5px 5px 0; overflow-y: auto;'
                                , items: [
                                    this.getRuleForm('rule-form', 'add_rule_fieldset')
                                ]    
                            }]
                        }
                    ]
                }
            ]
        };
    }        
    , getRuleForm: function(name, addAction) {
        return {             
            name: name     
            , defaultType: 'textfield'
            , xtype: 'form'
            , border: false  
            , buttonAlign: 'center'
            , fieldDefaults: {
                msgTarget: 'side'
                , labelWidth: 150
            }            
            , defaults: {
                anchor: '100%'
            }
            , items: [{
                text: LS.__translate(LS.AddACondition)
                , xtype: 'button'
                , action: addAction
                , maxWidth: 160
            }]
        };
    }
    , getNewRuleFieldSet: function(fieldsetLength, name) {
        var expression;
        var subname = ('getRulesPanelForm' == name) ? '' : '-user';
        var isUser = ('getRulesPanelForm' != name);
        var me = this;
        
        if (fieldsetLength > 0) {
            expression = {
                xtype: 'expression-combo-field-or-and'
                , name: 'mobile'+subname+'-expression-and-or[' + fieldsetLength + ']'
                , labelWidth: 100
                , readOnly: isUser
            };
        } else {
            expression = {
                xtype: 'hidden'
                , name: 'mobile'+subname+'-expression-and-or[' + fieldsetLength + ']'
                , value: 'AND'
                , labelWidth: 100
                , readOnly: isUser
            };
        }
        
        var fieldSet = Ext.create('Ext.form.FieldSet', {
            xtype: 'fieldset'
            , index: fieldsetLength
            , subname: subname
            , collapsed: false  
            , labelWidth: 100
            , fieldDefaults: {
                msgTarget: 'side'
            }              
            , defaults: {
                anchor: '100%'
            }
            , border: true
            , style: 'padding: 20px; margin: 5px;'
            , items: [
                expression
                , {
                    xtype: 'mobile-notify-rule-type-combo-field'
                    , name: 'mobile'+subname+'-rule-type[' + fieldsetLength + ']'
                    , labelWidth: 100
                    , storeType: name
                }
                , {
                    xtype: 'button'
                    , text: LS.__translate(LS.RemoveACondition)
                    , maxWidth: 160
                    , handler: function() {
                        fieldSet.destroy();
                        me.recalcIndexes(subname, fieldsetLength);
                    }
                }
            ]
        });
        
        return fieldSet;
    }
    , recalcIndexes: function(subname, index) {
        console.log(subname, index);
        
        var queue = ('-user' == subname) ? 'user-rule-form' : 'rule-form'
            , form = this.query('form[name="'+queue+'"]')[0]
            , fldset = form.query('fieldset')
            , index = 0;
            
        Ext4.each(fldset, function(row) {
            row.index = index;
            row.initialConfig.index = index;
            
            Ext4.each(row.items.items, function(subRow) {
                if ('button' != subRow.xtype) {
                    var oldName = subRow.name
                        , subName = oldName.substring(0, oldName.indexOf('['));

                    subRow.name = subName + '[' + index + ']';
                    console.log('changes', oldName, subRow.name);
                    subRow.initialConfig.name = subName + '[' + index + ']';
                }
            }, this);
            
            index++;
        }, this);
    }
});