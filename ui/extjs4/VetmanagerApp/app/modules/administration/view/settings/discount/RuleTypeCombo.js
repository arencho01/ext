Ext4.define('VetmanagerApp.modules.administration.view.settings.discount.RuleTypeCombo', {
    extend: 'Ext.form.field.ComboBox'
    , xtype: 'rule-type-combo-field'
    , name: 'rule-type-combo-field'
    , fieldLabel: LS.__translate(LS.Type2) + ' *'
    , pageSize: 50
    , initComponent: function(cfg) {
        this.store = Ext.create('Ext.data.Store', {
            fields: [
                {name: 'id'}
                , {name: 'title'}     
                , {name: 'data'}
                , {name: 'name'}
            ]
            , pageSize: this.pageSize
            , proxy: {
                type: 'ajax'
                , url: 'ajax_discount.php'
                , extraParams: {
                    cmd: 'get_rule_type'
                }
                , reader: {
                    type: 'json'
                    , root: 'data'
                }
            } 
        });        
        this.callParent(cfg);
    }  
    , displayField: 'title'
    , valueField: 'name'
    , ruleTypeFields: []
    , allowBlank: false
    , queryMode: 'remote'
    , triggerAction: 'all'
    , minChars: 1
    , forceSelection: true
});