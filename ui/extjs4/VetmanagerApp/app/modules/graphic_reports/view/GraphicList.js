Ext4.define('VetmanagerApp.modules.graphic_reports.view.GraphicList', {
    extend: 'Ext4.view.View'
    , title: LS.__translate(LS.ListOfCharts)
    , xtype: 'graphiclistpanel'
    , width: 210
    , itemSelector: 'div.graphic-report-list-item'
    , emptyText: LS.__translate(LS.NoReportsAvailable)
    , trackOver: true
    , border: false
    , selectedItemCls: 'x-grid3-row-selected'
    , cls: ['graphic-report-list-panel']
    , overflowY: 'auto'
    , overflowX: 'hidden'
    , initComponent: function() {
        this.addEvents('select');
        this.callParent();
        this.getStore().load();
    }
    , requires: [
        'VetmanagerApp.modules.graphic_reports.store.GraphicList'
        , 'VetmanagerApp.modules.graphic_reports.model.GraphicList'
    ]
    , store: 'VetmanagerApp.modules.graphic_reports.store.GraphicList'
    , tpl: new Ext4.XTemplate(
        '<tpl for=".">'
            , '<div class="graphic-report-list-item" style="cursor: pointer;">'
                , '<tpl if="values.tooltip != \'\'">'
                    , '<div id="{[this.getId(values.xtype)]}" {[this.getTooltip(values.tooltip)]} class="graphic-report-list-question"></div>'
                , '</tpl>'
                , '<div>{title}</div>'
            , '</div>'
        , '</tpl>'
        , {
            getId: function(xtype) {
                return 'graphic-reports-list-' + xtype;
            }
            , getTooltip: function(text) {
                if (text == '') return '';

                return 'ext:qtip="<div class=\'graphic-report-tooltip\'>'+text+'</div>"';
            }
        }
    )
});
