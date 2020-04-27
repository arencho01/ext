Ext4.define('VetmanagerApp.modules.graphic_reports.view.graphics.InvoiceByDoctorsSumm', {
    extend: 'Ext4.panel.Panel'
    , xtype: 'invoice_by_doctors_summ'
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
                    xtype: 'pie_chart'
                    , name: 'invoices_by_doctors'
                    , store: 'VetmanagerApp.modules.graphic_reports.store.InvoiceByDoctorsSumm'
                    , splitTitleValue: true
                }
            ]
        }
    ]
    , renderTotalField: function (total) {
        var bar = this.query('pie_chart[name="invoices_by_doctors"]')[0];

        Common.renderGraphicTotalField(bar.previousSibling(), total, 0, 10);
    }
});