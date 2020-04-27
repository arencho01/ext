Ext4.define('VetmanagerApp.modules.administration.view.settings.discount.GoodCombinationsCombobox', {
    extend: 'Ext.form.field.ComboBox'
    , xtype: 'good-combination-combobox'
    , fieldLabel: LS.__translate(LS.Combination) + ' *'
    , name: 'good-combination-combobox'
    , initComponent: function(cfg) {
        this.store = Ext.create('Ext.data.Store', {
            fields : [
                'id'
                , 'title'
            ]
            , autoLoad : false
            , proxy: {
                type: 'ajax'
                , url : 'ajax_goods.php'
                , extraParams: {
                    cmd : 'get_combinations'
                    //, type: 'combination' // не подтягивало все комбинации, тянуло только не шаблонные
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
    , valueField: 'id'
    , allowBlank: false    
    , queryMode: 'remote'
    , triggerAction: 'all'
    , minChars: 1  
    , forceSelection: true
});