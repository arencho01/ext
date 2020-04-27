Ext4.define('Ext4.ux.VerticalTabs', {
    extend: 'Ext4.view.View'
    , xtype: 'verticaltabs'
    , trackOver: true
    , border: false
    , cls: 'feed-list'
    , itemSelector: '.feed-list-item'
    , overItemCls: 'feed-list-item-hover'
    , selectedItemCls: 'x-vertical-tabs-selector'
    , tpl: new Ext.XTemplate(
        '<tpl for=".">'
            , '<div class="feed-list-item" style="padding-left: 0px;">'
                , '<li class="x-tab-strip x-tab-strip-top" style="height: 16px;">'
                    ,'<a class="x-tab-strip-close"></a>'
                    ,'<a class="x-tab-right">'
                        ,'<em class="x-tab-left">'
                            ,'<span class="x-tab-strip-inner">'
                                ,'<span class="x-tab-strip-text">{title}</span>'
                            ,'</span>'
                        ,'</em>'
                    ,'</a>'
                ,'</li>'
                , '<li class="x-tab-strip x-tab-strip-bottom">'
                    ,'<a class="x-tab-strip-close"></a>'
                    ,'<a class="x-tab-right">'
                        ,'<em class="x-tab-left">'
                            ,'<span class="x-tab-strip-inner">'
                                ,'<span class="x-tab-strip-text"></span>'
                            ,'</span>'
                        ,'</em>'
                    ,'</a>'
                ,'</li>'
            , '</div>'
        , '</tpl>'
    )
    , getTemplateArgs: function(item) {
        var result = Ext.TabPanel.prototype.getTemplateArgs.call(this, item);

        return Ext.apply(result, {});
    }
    , initComponent: function() {
        this.addEvents('select');
        this.callParent();
    }
    , store: {
        xtype: 'store'
        , fields: ['title']
        , data: [
            {title: 'title1'}
            , {title: 'title2'}
        ]
    }
});
