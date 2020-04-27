Ext4.define('VetmanagerApp.modules.graphic_reports.view.graphics.VaccineReportFull', {
    extend: 'Ext4.form.Panel'
    , xtype: 'vaccine_grid_report'
    , border: false
    , style: {
        marginLeft: '3px'
    }
    , layout: {
        type: 'border'
    }
    , requires: [

    ]
    , frame: false
    , items: [
        {
            xtype: 'panel'
            , region: 'north'
            , height: 90
            , frame: false
            , border: false
            , items: [
                {
                    xtype: 'filter_date_buttons'
                }, {
                    xtype: 'filter_date_range'
                }
            ]
        }
        , {
            xtype: 'vaccine-grid-report'
            , region: 'center'
        }
    ]
});