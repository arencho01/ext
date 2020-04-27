Ext4.define('VetmanagerApp.modules.graphic_reports.view.GraphicMain', {
    extend: 'Ext4.form.Panel'
    , xtype: 'graphicmainpanel'
    , border: false
    , title: '<b>' + LS.__translate(LS.Reports) + '</b>'
    , width: Ext.app.PanelsManager.moduleWidth
    , height: Ext.app.PanelsManager.moduleHeight
    , header: {
        titleAlign: 'center'
        , cls: ['vet-form-header']
    }
    , requires: [
        'VetmanagerApp.modules.graphic_reports.view.GraphicList'
        , 'VetmanagerApp.modules.graphic_reports.view.Graphic'
    ]
    , layout: 'border'
    , items: [
        {
            xtype: 'panel',
            layout: 'fit',
            width: 210,
            collapsible: true,
            region: 'west',
            collapseMode: 'mini',
            items: {
                xtype: 'graphiclistpanel'
            }
        },
        {
            xtype: 'graphicreportpanel',
            region: 'center'
        }
    ]
    , tools: [
        {
            xtype: 'button',
            icon: 'ui/resources/images_new/print.svg',
            tooltip: LS.__translate(LS.Print),
            scale: 'medium',
            name: 'print-button',
            hidden: true
        }
    ]
    , listeners: {
        scope: this
        , render: function(a) {
            a.width = Ext.app.PanelsManager.moduleWidth;
            a.height = Ext.app.PanelsManager.moduleHeight;
        }
    }
});