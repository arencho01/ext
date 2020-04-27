Ext4.define('VetmanagerApp.modules.graphic_reports.store.GoodsGrid', {
    extend: 'Ext4.data.Store'
    , model: 'VetmanagerApp.modules.graphic_reports.model.GoodsGrid'
    , autoLoad: true
    , pageSize: 25
    , proxy: {
        type: 'ajax'
        , url : 'ajax_graphic.php'
        , extraParams: {
            cmd: 'get_goods_grid'
            , start: 0
            , limit: 25
        }
        , reader: {
            type: 'json'
            , root: 'data'
            , idProperty: 'row_number'
        }
    }
});