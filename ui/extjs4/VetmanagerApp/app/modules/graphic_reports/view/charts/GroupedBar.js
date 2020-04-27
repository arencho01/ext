Ext4.define('VetmanagerApp.modules.graphic_reports.view.charts.GroupedBar', {
    extend: 'Ext4.chart.Chart'
    , animate: false
    , xtype: 'grouped_bar'
    , width: 1000
    , height: 500
    , layout: 'fit'
    , shadow: true
    , theme: 'Base'
    , insetPadding: 20
    , style: 'background:#fff'
    , legend: {
        position: 'left'
    }
    , axes: [{
        type: 'Numeric'
        , position: 'left'
        , name: 'number'
        , fields: ['data1', 'data2']
        , minimum: 0
        , width: 20
        , label: {
//            renderer: Ext4.util.Format.numberRenderer('0,0')
        }
        , grid: true
        , title: LS.__translate(LS.Quantity)
    }, {
        type: 'Category'
        , position: 'bottom'
        , fields: ['name']
        , title: 'Дата'
        , label: {
            rotate: {
                degrees: 325
            }
        }
    }]
    , series: [{
        type: 'column'
        , axis: 'left'
        , highlight: true
        , xField: 'name'
        , yField: ['data1', 'data2']
        , title: ['Посещаемость', 'Регистрации']
        , stacked: true
        , label: {
            display: 'insideEnd',
            field: ['data1', 'data2'],
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'vertical',
            color: '#333',
            'text-anchor': 'middle'
        }
    }]
});