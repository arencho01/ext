Ext4.define('VetmanagerApp.modules.graphic_reports.view.filters.DateButtons', {
    extend: 'Ext4.form.Panel'
    , xtype: 'filter_date_buttons'
    , height: 40
    , name: 'filter_date_buttons'
    , border: false
    , buttonAlign: 'center'
    , padding: '5px'
    , frame: false
    , buttons: [
        {
            xtype: 'button'
            , text: LS.__translate(LS.Day)
            , action: 'date_filter'
            , value: 'day'
            , enableToggle: true
            , toggleGroup: 'bbbb'
            , pressed: true
        }, {
            xtype: 'button'
            , text: LS.__translate(LS.Week3)
            , action: 'date_filter'
            , value: 'week'
            , enableToggle: true
            , toggleGroup: 'bbbb'
        }, {
            xtype: 'button'
            , text: LS.__translate(LS.Month)
            , action: 'date_filter'
            , value: 'month'
            , enableToggle: true
            , toggleGroup: 'bbbb'
        }, {
            xtype: 'button'
            , text: LS.__translate(LS.Year)
            , action: 'date_filter'
            , value: 'year'
            , enableToggle: true
            , toggleGroup: 'bbbb'
        }
    ]
});