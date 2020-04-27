Ext.onReady(function () {
    var items = [];

    Ext.each(_PANEL_NAMES, function (panelName) {
        items.push(window[panelName]);
    });

    var tabPanel = new Ext.TabPanel({
       // activeTab: 0,
        border: false,
        enableTabScroll:true,
        items: items
    });

    tabPanel.on('tabchange', function (t, activeTab) {
        var curTabIndex = t.items.indexOf(activeTab);

        location.hash = '#' + curTabIndex;
    });
    tabPanel.on('afterrender', function (t, activeTab) {
        if (location.hash != '') {
            var curTabIndex = parseInt(location.hash.split('#')[1]);

            t.setActiveTab(curTabIndex);
        }
    });

    new Ext.Viewport({
        layout: 'fit',
        items: [
            tabPanel
        ]
    });
});