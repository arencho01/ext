Ext4.define('VetmanagerApp.modules.administration.store.settings.medcards.FoodRecomendationTemplates', {
    extend: 'Ext4.data.Store'
    , fields: [
        'id'
        , 'title'
        , 'sponsor_title'
        , 'can_edit'
    ]
    , pageSize: 10
    , autoLoad: false
    , proxy: {
        type: 'ajax'
        , url: 'ajax_food_recomendation.php'
        , extraParams: {
            cmd: 'get_main_grid'
            , start: 0, limit: 10
            , status: 'active'
            , sponsor_id: -1
        }
        , reader: {
            type: 'json'
            , root: 'data'
        }
    }
});