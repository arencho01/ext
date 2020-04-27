Ext4.define('VetmanagerApp.modules.administration.store.settings.discount.Promotions', {
    extend: 'Ext4.data.Store'
    , model: 'VetmanagerApp.modules.administration.model.settings.discount.Promotion'
    , autoLoad: true
    , proxy: {
        type: 'ajax'
        , url: 'ajax_discount.php'
        , extraParams: {
            cmd: 'get_promotions'
            , start: 0
            , limit: 9999              
        }
        , reader: {
            type: 'json'
            , root: 'data'
        }
    }
});