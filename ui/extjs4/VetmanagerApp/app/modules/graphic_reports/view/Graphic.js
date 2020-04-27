Ext4.define('VetmanagerApp.modules.graphic_reports.view.Graphic', {
    extend: 'Ext4.form.Panel'
    , xtype: 'graphicreportpanel'
    , flex: 2
    , border: false
    , style: {
        marginLeft: '3px'
    }
    , layout: {
        type: 'vbox'
        , align: 'stretch'
    }
    , requires: [
        // charts & grids
        'VetmanagerApp.modules.graphic_reports.view.charts.Pie'
        , 'VetmanagerApp.modules.graphic_reports.view.charts.GroupedBar'
        , 'VetmanagerApp.modules.graphic_reports.view.charts.ColumnChart'
        , 'VetmanagerApp.modules.graphic_reports.view.grids.Vaccine'
        , 'VetmanagerApp.modules.graphic_reports.view.grids.GridWithExport'
        // filters
        , 'VetmanagerApp.modules.graphic_reports.view.filters.DateButtons'
        , 'VetmanagerApp.modules.graphic_reports.view.filters.DateRange'
        , 'VetmanagerApp.modules.graphic_reports.view.filters.Doctors'
        , 'VetmanagerApp.modules.graphic_reports.view.filters.PetType'
        , 'VetmanagerApp.modules.graphic_reports.view.filters.GoodGroup'
        , 'VetmanagerApp.modules.graphic_reports.view.filters.GoodCategory'
        , 'VetmanagerApp.modules.graphic_reports.view.filters.GoodType'
        , 'VetmanagerApp.modules.graphic_reports.view.filters.AdmissionTypes'
        , 'VetmanagerApp.modules.graphic_reports.view.filters.TimeRange'
    ]
    , items: [
        Ext4.create('Ext4.form.Panel',{
            name: 'graphic_container'
            , border: false
            , flex: 1
            , layout: 'fit'
        })
    ]
});