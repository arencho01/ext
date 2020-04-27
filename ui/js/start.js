Ext.onReady(function () {
    var items = [];

    Ext.each(_PANEL_NAMES, function (panelName) {
        items.push(window[panelName]);
    });

    new Ext.Viewport({
        layout: 'fit',
        items: [
            {
                xtype: 'tabpanel',
                activeTab: 0,
                border: false,
                items: items
            }
        ]
    });
});