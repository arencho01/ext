Ext4.define('VetmanagerApp.modules.administration.view.settings.discount.GoodsCombobox', {
    extend: 'Ext.form.field.ComboBox'
    , xtype: 'goods-combobox'
    , fieldLabel: LS.__translate(LS.Good) + ' *'
    , allowBlank: false
    , name: 'goods-combobox'
    , pageSize: 10
    , initComponent: function(cfg){
        this.store = Ext.create('Ext.data.Store', {
            fields : [
                'id'
                , 'title'
                , 'price'
                , 'is_active'
                , 'code'
                , 'is_warehouse_account'
                , 'quantity'
                , 'good_group'
                , 'responsible_doctors'
                , 'default_price'
                , 'min_price'
                , 'max_price'
                , 'is_template'
            ]
            , autoLoad : false
            , pageSize: this.pageSize
            , proxy: {
                type: 'ajax'
                , url : 'ajax_goods.php'
                , extraParams: {
                    cmd : 'get_grid'
                    , justActivated: 'true'
                    , dir: 'asc'
                    , group: ''
                    , sort: 'title'
                    , no_good_sets: 1
                }
                , reader: {
                    type: 'json'
                    , root: 'data'
                    , totalProperty  : 'total'
                }
            }        
        });
        this.callParent(cfg);
    }
    , listConfig: {
        getInnerTpl: function() {
            return '{title}';
        }
    } 
    , displayField: 'title'
    , valueField: 'id'
    , queryMode: 'remote'
    , triggerAction: 'all'
    , minChars: 1    
    , forceSelection: true
});