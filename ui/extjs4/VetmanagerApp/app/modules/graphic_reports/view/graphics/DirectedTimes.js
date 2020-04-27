Ext4.define('VetmanagerApp.modules.graphic_reports.view.graphics.DirectedTimes', {
    extend: 'Ext4.panel.Panel'
    , xtype: 'directed_times'
    , border: false
    , autoScroll: true
    , style: {
        marginLeft: '3px'
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
                    xtype: 'panel'
                    , padding: '0px'
                    , border: false
                    , layout: {
                        type: 'hbox'
                        , align: 'stretch'
                    }
                    , items: [
                        {
                            xtype: 'panel'
                            , border: false
                            , width: 200
                        }, {
                            xtype: 'filter_admission_types'
                            , border: false
                            , width: 300
                            , multiSelect: true
                        }, {
                            xtype: 'filter_doctors'
                            , border: false
                            , flex: 1
                            , multiSelect: true
                        }
                    ]
                }, {
                    xtype: 'filter_time_range'
                    , name: 'morning_range'
                    , hidden: true
                    , text: LS.__translate(LS.Morning)
                    , valueFrom: GlobalConf.get('directedTimesGraphic', 'morningValueFrom') || '09:00'
                    , valueTo: GlobalConf.get('directedTimesGraphic', 'morningValueTo') || '12:00'
                    , maxValue: GlobalConf.get('directedTimesGraphic', 'dayValueFrom') || '12:00'
                }, {
                    xtype: 'filter_time_range'
                    , name: 'day_range'
                    , hidden: true
                    , text: LS.__translate(LS.Day)
                    , valueFrom: GlobalConf.get('directedTimesGraphic', 'dayValueFrom') || '12:00'
                    , valueTo: GlobalConf.get('directedTimesGraphic', 'dayValueTo') || '16:00'
                    , minValue: GlobalConf.get('directedTimesGraphic', 'morningValueTo') || '12:00'
                    , maxValue: GlobalConf.get('directedTimesGraphic', 'eveningValueFrom') || '16:00'
                }, {
                    xtype: 'filter_time_range'
                    , name: 'evening_range'
                    , hidden: true
                    , text: LS.__translate(LS.Evening)
                    , valueFrom: GlobalConf.get('directedTimesGraphic', 'eveningValueFrom') || '16:00'
                    , valueTo: GlobalConf.get('directedTimesGraphic', 'eveningValueTo') || '21:00'
                    , minValue: GlobalConf.get('directedTimesGraphic', 'dayValueTo') || '16:00'
                },
            {
                    xtype: 'tabpanel',
                    items: [
                        {
                            xtype: 'column_chart'
                            , title: 'По типу приема'
                            , store: 'VetmanagerApp.modules.graphic_reports.store.DirectedTimesByAdmissionType'
                            , axes: [
                                {
                                    type: 'Numeric'
                                    , position: 'left'
                                    , name: 'number'
                                    , fields: 'value'
                                    , minimum: 0
                                    , grid: true
                                    , title: LS.__translate(LS.ClientsDirectedTime)
                                }, {
                                    type: 'Category'
                                    , position: 'bottom'
                                    , fields: 'title'
                                    , title: LS.__translate(LS.ReceptionType)
                                    , label: {
                                        rotate: {
                                            degrees: 325
                                        }
                                    }
                                }
                            ]
                        }
                        , {
                            xtype: 'column_chart'
                            , title: 'По времени'
                            , height: 400
                            , store: 'VetmanagerApp.modules.graphic_reports.store.DirectedTimesByDayTimes'
                            , axes: [
                                {
                                    type: 'Numeric'
                                    , position: 'left'
                                    , name: 'number'
                                    , fields: 'value'
                                    , minimum: 0
                                    , grid: true
                                    , title: LS.__translate(LS.ClientsDirectedTime)
                                }, {
                                    type: 'Category'
                                    , position: 'bottom'
                                    , fields: 'title'
                                    , title: LS.__translate(LS.Time)
                                    , label: {
                                        rotate: {
                                            degrees: 325
                                        }
                                    }
                                }
                            ]
                            , series: [{
                                type: 'area',
                                highlight: false,
                                axis: 'left',
                                xField: 'title',
                                yField: 'value',
                                style: {
                                    opacity: 0.50
                                }
                            }]
                        }
                        , {
                            xtype: 'column_chart'
                            , title: 'По врачам'
                            , store: 'VetmanagerApp.modules.graphic_reports.store.DirectedTimesByDoctors'
                            , axes: [
                                {
                                    type: 'Numeric'
                                    , position: 'left'
                                    , name: 'number'
                                    , fields: 'value'
                                    , minimum: 0
                                    , grid: true
                                    , title: LS.__translate(LS.ClientsDirectedTime)
                                }, {
                                    type: 'Category'
                                    , position: 'bottom'
                                    , fields: 'title'
                                    , title: LS.__translate(LS.Doctor)
                                    , label: {
                                        rotate: {
                                            degrees: 325
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});