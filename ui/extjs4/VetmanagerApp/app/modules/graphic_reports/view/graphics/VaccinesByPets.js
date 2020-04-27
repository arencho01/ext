Ext4.define('VetmanagerApp.modules.graphic_reports.view.graphics.VaccinesByPets', {
    extend: 'Ext4.panel.Panel'
    , xtype: 'vaccines_by_pets'
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
                }
                , {
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
                            , width: 110
                        }, {
                             xtype: 'filter_date_range'
                            , onlyItems: true
                            , border: false
                            , width: 500
                        }, {
                            xtype: 'filter_pet_type'
                            , border: false
                            , flex: 1
                        }
                    ]
                }
                , {
                    xtype: 'pie_chart'
                    , name: 'vaccine_by_pets'
                    , store: 'VetmanagerApp.modules.graphic_reports.store.VaccinesByPets'
                }
            ]
        }
    ]
    , renderTotalField: function (total) {
        var bar = this.query('pie_chart[name="vaccine_by_pets"]')[0];

        Common.renderGraphicTotalField(bar.previousSibling(), total, 0, 10);
    }
});