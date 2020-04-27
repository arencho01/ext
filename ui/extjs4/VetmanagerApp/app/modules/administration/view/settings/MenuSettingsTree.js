Ext4.define('VetmanagerApp.modules.administration.view.settings.MenuSettingsTree', {
    extend: 'Ext4.tree.Panel'
    , xtype: 'menusettingstree'
    , rootVisible: true
    , border: false
    , useArrows: true
    , viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop'
            , containerScroll: true
            , enableDrag: true
            , enableDrop: true
            , ddGroup: 'agegtrg'
        }
        , getRowClass: function(record) {
            if (['static', 'fill'].indexOf(record.get('node_type')) > -1) {
                record.set('allowDrag', false);
                record.set('allowDrop', false);
            }
            if (record.get('node_type') == 'static') {
                return 'menu-gears';
            } else if (record.get('node_type') == 'fill') {
                return 'menu-two-arrows';
            }

            return '';
        }
    }
});