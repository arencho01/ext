Ext4.define('VetmanagerApp.modules.administration.view.MainMenuListView', {
    extend: 'Ext4.view.View'
    , xtype: 'mainmenulistview'
    , trackOver: true
    , border: false
    , cls: 'feed-list'
    , itemSelector: '.feed-list-item'
    , overItemCls: 'feed-list-item-hover'
    , selectedItemCls: 'x-item-selected'
    , tpl: '<tpl for="."><div class="feed-list-item">{title}</div></tpl>'
    , initComponent: function() {
        this.addEvents('select');
        this.callParent();
    }
});
