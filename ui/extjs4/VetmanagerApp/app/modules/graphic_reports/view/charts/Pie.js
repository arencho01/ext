Ext4.override(Ext4.chart.LegendItem, {
    createLegend: function(config) {
        function getSeriesProp(name) {
            var val = series[name];
            return (Ext.isArray(val) ? val[idx] : val);
        }
        var me = this,
            index = config.yFieldIndex,
            series = me.series,
            seriesType = series.type,
            idx = me.yFieldIndex,
            legend = me.legend,
            surface = me.surface,
            refX = legend.x + me.x,
            refY = legend.y + me.y,
            bbox, z = me.zIndex,
            markerConfig, label, mask,
            radius, toggle = false,
            seriesStyle = Ext.apply(series.seriesStyle, series.style),
            item = series.items && series.items[idx],
            labelText = getSeriesProp('title')  || getSeriesProp('yField'),
            value =   item && item.storeItem.data.value,
            legendVal = value || '';


        label = me.add('label', surface.add({
            type: 'text',
            x: 20,
            y: 0,
            zIndex: z || 0,
            font: legend.labelFont,
            text: (labelText !== LS.ThereAreNoData) ? labelText + ' ' + legendVal : labelText
        }));

        // Line series - display as short line with optional marker in the middle
        if (seriesType === 'line' || seriesType === 'scatter') {
            if(seriesType === 'line') {
                me.add('line', surface.add({
                    type: 'path',
                    path: 'M0.5,0.5L16.5,0.5',
                    zIndex: z,
                    "stroke-width": series.lineWidth,
                    "stroke-linejoin": "round",
                    "stroke-dasharray": series.dash,
                    stroke: seriesStyle.stroke || '#000',
                    style: {
                        cursor: 'pointer'
                    }
                }));
            }
            if (series.showMarkers || seriesType === 'scatter') {
                markerConfig = Ext.apply(series.markerStyle, series.markerConfig || {});
                me.add('marker', Ext.chart.Shape[markerConfig.type](surface, {
                    fill: markerConfig.fill,
                    x: 8.5,
                    y: 0.5,
                    zIndex: z,
                    radius: markerConfig.radius || markerConfig.size,
                    style: {
                        cursor: 'pointer'
                    }
                }));
            }
        }
        // All other series types - display as filled box
        else {
            me.add('box', surface.add({
                type: 'rect',
                zIndex: z,
                x: 0,
                y: 0,
                width: 12,
                height: 12,
                fill: series.getLegendColor(index),
                style: {
                    cursor: 'pointer'
                }
            }));
        }

        me.setAttributes({
            hidden: false
        }, true);

        bbox = me.getBBox();

        mask = me.add('mask', surface.add({
            type: 'rect',
            x: bbox.x,
            y: bbox.y,
            width: bbox.width || 20,
            height: bbox.height || 20,
            zIndex: (z || 0) + 1000,
            fill: '#f00',
            opacity: 0,
            style: {
                'cursor': 'pointer'
            }
        }));

        //add toggle listener
        me.on('mouseover', function() {
            label.setStyle({
                'font-weight': 'bold'
            });
            mask.setStyle({
                'cursor': 'pointer'
            });
            series._index = index;
            series.highlightItem();
        }, me);

        me.on('mouseout', function() {
            label.setStyle({
                'font-weight': 'normal'
            });
            series._index = index;
            series.unHighlightItem();
        }, me);

        if (!series.visibleInLegend(index)) {
            toggle = true;
            label.setAttributes({
               opacity: 0.5
            }, true);
        }
        this.unpress = function() {
            label.setStyle({
                'font-weight': 'bold'
            });
            mask.setStyle({
                'cursor': 'pointer'
            });
            series._index = index;
            series.highlightItem();
            series.showAll();
            label.setAttributes({
                opacity: 1
            }, true);
            toggle = false;
        }
        this.press = function() {
            label.setStyle({
                'font-weight': 'bold'
            });
            mask.setStyle({
                'cursor': 'pointer'
            });
            series._index = index;
            series.highlightItem();
            toggle = true;
            series.hideAll();
            label.setAttributes({
                opacity: 0.5
            }, true);
        }
        me.on('mousedown', function() {
            if (!toggle) {
                series.hideAll();
                label.setAttributes({
                    opacity: 0.5
                }, true);
            } else {
                series.showAll();
                label.setAttributes({
                    opacity: 1
                }, true);
            }
            toggle = !toggle;
        }, me);
        me.updatePosition({x:0, y:0}); //Relative to 0,0 at first so that the bbox is calculated correctly
    }
    , updatePosition: function (relativeTo) {
        var me = this,
            items = me.items,
            ln = items.length,
            i = 0,
            item;

        if (!relativeTo) {
            relativeTo = me.legend;
        }


        if (me.legend.height > 0 && me.y > me.legend.maxY) {
            var r = Math.ceil((me.y - me.legend.maxY) / me.legend.offsetY);
            me.x += me.legend.columnWidth * r;
            me.y -= me.legend.offsetY * r;
        }


        for (; i < ln; i++) {
            item = items[i];
            switch (item.type) {
                case 'text':
                    item.setAttributes({
                        x: 20 + relativeTo.x + me.x,
                        y: relativeTo.y + me.y
                    }, true);
                    break;
                case 'rect':
                    item.setAttributes({
                        translate: {
                            x: relativeTo.x + me.x,
                            y: relativeTo.y + me.y - 6
                        }
                    }, true);
                    break;
                default:
                    item.setAttributes({
                        translate: {
                            x: relativeTo.x + me.x,
                            y: relativeTo.y + me.y
                        }
                    }, true);
            }
        }
    }
});




/**
 * override 'Ext4.chart.Legend'
 */
Ext4.override(Ext4.chart.Legend, {
    createItems: function () {
        var me = this,
            chart = me.chart,
            surface = chart.surface,
            items = me.items,
            padding = me.padding,
            itemSpacing = me.itemSpacing,
            spacingOffset = 2,
            maxWidth = 0,
            maxHeight = 0,
            totalWidth = 0,
            totalHeight = 0,
            vertical = me.isVertical,
            math = Math,
            mfloor = math.floor,
            mmax = math.max,
            index = 0,
            i = 0,
            len = items ? items.length : 0,
            x, y, spacing, item, bbox, height, width;

        if (len) {
            for (i; i < len; i++) {
                items[i].destroy();
            }
        }

        items.length = [];
        chart.series.each(function (series, i) {
            if (series.showInLegend) {
                Ext4.each([].concat(series.yField), function (field, j) {
                    item = Ext4.create('Ext4.chart.LegendItem', {
                        legend: this,
                        series: series,
                        surface: chart.surface,
                        yFieldIndex: j
                    });
                    bbox = item.getBBox();
                    width = bbox.width;
                    height = bbox.height;

                    if (i + j === 0) {
                        spacing = vertical ? padding + height / 2 : padding;
                    } else {
                        spacing = itemSpacing / (vertical ? 2 : 1);
                    }

                    item.x = mfloor(vertical ? padding : totalWidth + spacing);
                    item.y = mfloor(vertical ? totalHeight + spacing : padding + height / 2);
                    totalWidth += width + spacing;
                    totalHeight += height + spacing;
                    maxWidth = mmax(maxWidth, width);
                    maxHeight = mmax(maxHeight, height);
                    items.push(item);
                }, this);
            }
        }, me);
        me.width = mfloor((vertical ? maxWidth : totalWidth) + padding * 2);
        if (vertical && items.length === 1) {
            spacingOffset = 1;
        }
        me.height = mfloor((vertical ? totalHeight - spacingOffset * spacing : maxHeight) + (padding * 2));
        me.itemHeight = maxHeight;


        var outerHeight = me.chart.height - 20;
        if (items.length >= 2 && me.height > outerHeight) {
            var row = math.floor((outerHeight - padding * 2) / (items[1].y - items[0].y));
            if (row > 0) {
                me.columnWidth = me.width;
                me.width *= math.ceil(items.length / row);
                me.height = outerHeight;
                me.offsetY = items[row].y - items[0].y;
                me.maxY = items[row - 1].y;
            }
        }
    }
});



Ext4.define('VetmanagerApp.modules.graphic_reports.view.charts.Pie', {
    extend: 'Ext4.chart.Chart'
    , animate: true
    , xtype: 'pie_chart'
    , width: 1000
    , height: 500
    , shadow: false
    , theme: 'Base' //Base', 'Green', 'Sky', 'Red', 'Purple', 'Blue', 'Yellow'
    , insetPadding: 20
    , legend: {
        position: 'left'
        , minWidth: 200
    }
    , splitTitleValue: false
    , constructor: function() {
        var me = this;
        me.series = [{
            type: 'pie'
            , field: 'value'
            , showInLegend: true
            , donut: false
            , tips: {
                trackMouse: true
                , width: 140
                , height: 28
                , renderer: function(storeItem, item) {
                    if (storeItem.get('title') !== LS.ThereAreNoData) {
                        var value = storeItem.get('value');
                        if (me.splitTitleValue) {
                            value = Common.renderMoney(value);
                        }
                        this.setTitle(storeItem.get('title') + ': ' + value);
                    } else {
                        this.setTitle(storeItem.get('title'));
                    }

                }
            }
            , label: {
                field: 'title'
                , display: 'rotate'
                , contrast: true
            }
        }];
        me.callParent(arguments);
    }
});