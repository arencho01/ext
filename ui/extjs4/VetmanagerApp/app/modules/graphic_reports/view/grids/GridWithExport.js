Ext4.define('VetmanagerApp.modules.graphic_reports.view.grids.GridWithExport', {
    extend: 'Ext.grid.Panel'
    , xtype: 'grid-with-export'
    , border: false
    , tbar: [
        {
            xtype: 'button'
            , text: LS.__translate(LS.ExportToExcel)
            , action: 'excel-export'
        }
    ]
    , initComponent: function() {        
        this.callParent();
    }    
});