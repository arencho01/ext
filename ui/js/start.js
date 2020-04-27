Ext.onReady(function () {
    var items = [];

    Ext.each(_PANEL_NAMES, function (panelName) {
        items.push(window[panelName]);
    });

    var tabPanel = new Ext.TabPanel({
        border: false,
        enableTabScroll:true,
        items: items
    });

    tabPanel.on('tabchange', function (t, activeTab) {
        var curTabIndex = t.items.indexOf(activeTab);
        curTabIndex++;

        location.hash = '#' + curTabIndex;
    });
    tabPanel.on('afterrender', function (t) {
        if (location.hash != '') {
            var curTabIndex = parseInt(location.hash.split('#')[1]);
            curTabIndex--;

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