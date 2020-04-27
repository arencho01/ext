Ext4.define('VetmanagerApp.modules.graphic_reports.model.GoodsGrid', {
    extend: 'Ext4.data.Model'
    , fields: [
        'row_number'
        , 'good_sale_param_id'
        , 'good_id'
        , 'good_title'
        , 'good_qty'
        , 'good_type'
        , 'good_group'
        , 'good_category'
        , 'unit_title'
        , 'invoice_amount_sum'
        , 'invoice_doctor'
        , 'invoice_ids'
    ]
});