Ext4.define('VetmanagerApp.modules.administration.view.settings.MobileNotificationRuleTypeCombo', {
    extend: 'Ext.form.field.ComboBox'
    , xtype: 'mobile-notify-rule-type-combo-field'
    , name: 'mobile-notify-rule-type-combo-field'
    , fieldLabel: LS.__translate(LS.Type2) + ' *'
    , pageSize: 15
    , initComponent: function(cfg) {
        if (this.storeType == 'getRulesPanelForm') {
            this.store = Ext.create('Ext.data.Store', {
                fields: [
                    {type: 'string', name: 'value'}
                    , {type: 'string', name: 'title'}   
                    , {type: 'string', name: 'type'}      
                    , {type: 'string', name: 'cmd'}          
                ]
                , data: [
                    {
                        value: 'admission_type'
                        , title: LS.__translate(LS.purposeOfAdmission)
                        , type: 'combobox'
                        , cmd: 'get_active_admissions'
                    }, {
                        value: 'admission_status'
                        , title: LS.__translate(LS.VisitStatus)
                        , type: 'combobox'
                        , cmd: 'get_admission_statuses'
                    }
                ]
            });  
        } else if (this.storeType == 'getUserRulesPanelForm') {
            this.store = Ext.create('Ext.data.Store', {
                fields: [
                    {type: 'string', name: 'value'}
                    , {type: 'string', name: 'title'}   
                    , {type: 'string', name: 'type'}      
                    , {type: 'string', name: 'cmd'}          
                ]
                , data: [
                    {
                        value: 'user_id'
                        , title: LS.__translate(LS.User)
                        , type: 'combobox'
                        , cmd: 'get_active_users'
                    }, {
                        value: 'role_id'
                        , title: LS.__translate(LS.Role)
                        , type: 'combobox'
                        , cmd: 'get_active_roles'
                    }, {
                        value: 'position_id'
                        , title: LS.__translate(LS.Position)
                        , type: 'combobox'
                        , cmd: 'get_active_positions'
                    }, {
                        value: 'is_user_working'
                        , title: LS.__translate(LS.AvailableOnShift)
                        , type: 'checkbox'
                    }, {
                        value: 'is_notify_yourself'
                        , title: LS.__translate(LS.NotifyMyself)
                        , type: 'checkbox'
                    }
                ]
            }); 
        }
              
        this.callParent(cfg);
    }  
    , displayField: 'title'
    , valueField: 'value'
    , ruleTypeFields: []
    , allowBlank: false
    , queryMode: 'remote'
    , triggerAction: 'all'
    , minChars: 1
    , forceSelection: true
});