Ext4.define('VetmanagerApp.modules.graphic_reports.view.graphics.DoctorVisits', {
    extend: 'Ext4.panel.Panel'
    , xtype: 'doctor_visits'
    , border: false
    , autoScroll: true
    , style: {
        marginLeft: '3px'
    }
    , layout: {
        type: 'vbox'
        , align: 'stretch'
    }
    , requires: [

    ]
    , items: [
        {
            xtype: 'form'
            , border: false
            , items: [
                {
                    xtype: 'filter_date_buttons'
                }, {
                    xtype: 'filter_date_range'
                }, {
                    xtype: 'column_chart'
                    , store: 'VetmanagerApp.modules.graphic_reports.store.DoctorVisits'
                    , name: 'doctor_visits'
                    , axesCfg: [{
                        index: 1
                        , title: 'Врач'
                    }]
                }
            ]
        }
    ]
    , renderTotalField: function (total) {
        var bar = this.query('column_chart[name="doctor_visits"]')[0];

        Common.renderGraphicTotalField(bar.previousSibling(), total, 0, 10);
    }
});