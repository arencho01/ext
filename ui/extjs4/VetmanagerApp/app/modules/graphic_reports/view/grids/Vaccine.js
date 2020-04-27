VetmanagerApp_modules_graphic_reports_view_grids_Vaccine_full = [
    {
        header: LS.__translate(LS.Date)
        , dataIndex: 'vaccine_date'
        , width: 70
        , sortable: false
        , hideable: false              
    }
    , {
        header: LS.__translate(LS.FullName)
        , dataIndex: 'client_fio'
        , minWidth: 120
        , sortable: false
        , hideable: false              
    }   
    , {
        header: LS.__translate(LS.Address)
        , dataIndex: 'client_address'
        , minWidth: 200
        , flex: 1
        , sortable: false
        , hideable: false              
    }       
    , {
        header: LS.__translate(LS.Alias)
        , dataIndex: 'pet_alias'
        , width: 100
        , sortable: false
        , hideable: false              
    } 
    , {
        header: LS.__translate(LS.Type)
        , dataIndex: 'pet_type'
        , width: 80
        , sortable: false
        , hideable: false              
    }         
    , {
        header: LS.__translate(LS.Breed)
        , dataIndex: 'pet_breed'
        , width: 100
        , sortable: false
        , hideable: false              
    }   
    , {
        header: LS.__translate(LS.Sex)
        , dataIndex: 'pet_sex'
        , width: 40
        , sortable: false
        , hideable: false              
    }      
    , {
        header: LS.__translate(LS.Vaccine)
        , dataIndex: 'vaccine_title'
        , width: 150
        , sortable: false
        , hideable: false              
    } 
    , {
        header: LS.__translate(LS.Doctor)
        , dataIndex: 'user_fio'
        , width: 120
        , sortable: false
        , hideable: false              
    }      
];
//'vaccine_title', 'pet_type', 'pet_qty'
VetmanagerApp_modules_graphic_reports_view_grids_Vaccine_summary = [
    {
        header: LS.__translate(LS.Vaccine)
        , dataIndex: 'vaccine_title'
        , minWidth: 150
        , flex: 1
        , sortable: false
        , hideable: false              
    }
    , {
        header: LS.__translate(LS.Type)
        , dataIndex: 'pet_type'
        , minWidth: 100
        , sortable: false
        , hideable: false              
    }      
    , {
        header: LS.__translate(LS.NumberOfPets)
        , dataIndex: 'pet_qty'
        , minWidth: 150
        , sortable: false
        , hideable: false              
    }         
];
Ext4.define('VetmanagerApp.modules.graphic_reports.view.grids.Vaccine', {
    extend: 'Ext.grid.Panel'
    , xtype: 'vaccine-grid-report'
    , border: false
    , tbar: [
        {
            xtype: 'button'
            , text: LS.__translate(LS.Summary)
            , enableToggle: true
            , listeners: {
                toggle: function(btn, pressed){
                    btn.up('grid').toggleSummary(pressed);
                }
            }
        }
        , {
            xtype: 'button'
            , text: LS.__translate(LS.ExportToExcel)
            , action: 'excel-export'
        }
    ]
    , columns: VetmanagerApp_modules_graphic_reports_view_grids_Vaccine_full
    , initComponent: function() {
        this.fullReport = Ext4.create('VetmanagerApp.modules.graphic_reports.store.VaccineReportFull');
        this.summaryReport = Ext4.create('VetmanagerApp.modules.graphic_reports.store.VaccineReportSummary');  
        this.store = this.fullReport;
        this.callParent();
    }    
    , toggleSummary: function(pressed){
        if (pressed) {
            this.reconfigure(this.summaryReport, VetmanagerApp_modules_graphic_reports_view_grids_Vaccine_summary);
        } else {
            this.reconfigure(this.fullReport, VetmanagerApp_modules_graphic_reports_view_grids_Vaccine_full);
        }
        var params = this.lastParams;
        params.cmd = this.getStore().getProxy().extraParams.cmd; 
                
        this.getStore().load({
            params: params
        });
    }
});