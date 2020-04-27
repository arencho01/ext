Ext4.define('VetmanagerApp.modules.printsettings.controller.PrintSettings', {
    extend: 'Ext.app.Controller'
    , views: ['VetmanagerApp.modules.printsettings.view.PrintSettings']
    , refs: [
        {
            ref: 'mainPanel'
            , selector: 'propsprintsettingspanel'
            , autoCreate: true
            , xtype: 'propsprintsettingspanel'
        }
        , {
            ref: 'goodsSetsPrint'
            , selector: 'propsprintsettingspanel combo[name="goods-sets-print"]'
        }
    ]
    , init: function() {
        this.addEvents('close', 'save');
        this.control({
            'propsprintsettingspanel' :{
                afterrender: this.onAfterRender
            }
            , 'propsprintsettingspanel button[action="save"]' :{
                click: this.onSave
            }
            , 'propsprintsettingspanel button[action="close"]' :{
                click: this.onClose
            }
        });
    }
    , onAfterRender: function(view){
        this.refresh();
    }
    , onSave: function(btn){
        var goodsSetsPrint = this.getGoodsSetsPrint().getValue();

        Ext.app.properties.set('goods-sets-print', goodsSetsPrint);
        this.fireEvent('save');
    }
    , onClose: function(btn){
        this.fireEvent('close');
    }
    , refresh: function(){
        this.getGoodsSetsPrint().setValue(Ext.app.properties.get('goods-sets-print', 'manual'));
    }
});