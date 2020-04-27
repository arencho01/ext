Ext4.define('VetmanagerApp.modules.administration.view.settings.discount.RulesCombo', {
    extend: 'Ext.form.field.ComboBox'
    , xtype: 'rules-combobox'
    , name: 'rules-combobox'
    , fieldLabel: LS.__translate(LS.Rule)  + ' *'
    , allowBlank: false
    , initComponent: function(cfg) {
        var me = this;
        this.store = Ext.create('Ext.data.Store', {
            fields : [
                'id'
                , 'title'
                , 'data'
                , 'status'
            ]
            , autoLoad : false
            , proxy: {
                type: 'ajax'
                , url : 'ajax_discount.php'
                , extraParams: {
                    cmd : 'get_rules'
                }
                , reader: {
                    type: 'json'
                    , root: 'data'
                }
            }
            ,listeners: {
                load: function(store, records){
                    me.setSelectedItemStatusStyle();
                }
            }
        });
        this.callParent(cfg);
    }
    , displayField: 'title'
    , valueField: 'id'
    , queryMode: 'remote'
    , triggerAction: 'all'
    , minChars: 1    
    , forceSelection: true
    , listConfig: {
        itemTpl: Ext.create('Ext.XTemplate',
            '<tpl if="status == \'DISABLED\'">',
                '<s class="disabled-discount-rule">{title} </s>',
                "("+LS.__translate(LS.RuleIsDisabled)+")",
            '<tpl else>',
                '{title}',
            '</tpl>'
        )
    }
    , listeners: {
        change: function(combo, newValue, oldValue ){
            this.setSelectedItemStatusStyle();
        }
    }
    , setSelectedItemStatusStyle: function(){
        var newRecord = this.getStore().findRecord('id', this.value);
        if(newRecord && newRecord.data.status !== undefined) {
            if (newRecord.data.status == "DISABLED") {
                this.setFieldStyle('background:#CCCCCC');
                if(newRecord.data.title.search(LS.__translate(LS.RuleIsDisabled)) == -1){
                    newRecord.data.title += " (" + LS.__translate(LS.RuleIsDisabled) + ")";
                }
            }else{
                this.setFieldStyle('background:transparent');
            }
        }
    }
});