Ext4.define('VetmanagerApp.modules.graphic_reports.view.charts.ColumnChart', {
    extend: 'Ext4.chart.Chart'
    , animate: false
    , xtype: 'column_chart'
    , width: 1000
    , height: 500
    , layout: 'fit'
    , shadow: true
    , theme: 'Base'
    , insetPadding: 20
    , axesCfg: null
    , style: 'background:#fff'
    , initComponent: function() {
        if (this.axesCfg && Ext4.isArray(this.axesCfg)) {
            Ext4.each(this.axesCfg, function(row) {
                var index = row.index;
                delete row.index;
                Ext4.apply(this.axes[index], row);
            }, this);
        }

        this.callParent();
    }
    , axes: [{
        type: 'Numeric'
        , position: 'left'
        , name: 'number'
        , fields: 'value'
        , minimum: 0
        , grid: true
        , title: LS.__translate(LS.Quantity)
    }, {
        type: 'Category'
        , position: 'bottom'
        , fields: 'title'
        , title: LS.__translate(LS.Doctor)
        , label: {
            rotate: {
                degrees: 270
            }
        }
    }]
    , series: [{
        type: 'column'
        , axis: 'left'
        , highlight: true
        , xField: 'title'
        , yField: 'value'
        , label: {
            display: 'insideEnd',
            field: 'value',
//            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'vertical',
            color: '#333',
            'text-anchor': 'middle'
        }
    }]
});