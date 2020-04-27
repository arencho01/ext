Ext4.define('VetmanagerApp.modules.administration.view.settings.discount.GoodGroupsCombobox', {
    extend: 'Ext.form.field.ComboBox'
    , xtype: 'good-groups-combobox'
    , fieldLabel: LS.__translate(LS.Group) + ' *'
    , name: 'good-groups-combobox'
    , pageSize: 10
    , initComponent: function(cfg) {
        this.store = Ext.create('Ext.data.Store', {
            fields : [
                'id'
                , 'title'
            ]
            , autoLoad : false
            , pageSize: this.pageSize
            , proxy: {
                type: 'ajax'
                , url : 'ajax_goods.php'
                , extraParams: {
                    cmd : 'get_groups'
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