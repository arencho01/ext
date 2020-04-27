Ext4.define('VetmanagerApp.modules.administration.store.settings.MenuSettings', {
    extend: 'Ext4.data.TreeStore'
    , expanded: true
    , root: {
        text: LS.__translate(LS.Workplaces)
        , expanded: true
    }
    , fields: [
        'id'
        , 'image'
        , 'is_item'
        , 'text'
        , 'tree_id'
        , 'node_type'
        , 'node'
        , 'state'
        , 'module'
    ]
    , autoLoad: true
    , proxy: {
        type: 'ajax'
        , url: 'ajax_administration.php'
        , extraParams: {
            cmd: 'get_toppanel_tree'
            , node: ''
        }
        , reader: {
            type: 'json'
            , root: 'data'
        }
    }
});