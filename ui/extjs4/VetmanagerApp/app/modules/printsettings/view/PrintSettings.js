Ext4.define('VetmanagerApp.modules.printsettings.view.PrintSettings', {
    extend: 'Ext4.panel.Panel'
    , alias: 'widget.propsprintsettingspanel'
    , title: LS.__translate(LS.PrintSetup)
    , height: 305
    , xtype: 'propsprintsettingspanel'
    , border: false
    , buttonAlign: 'center'
    , items: [
        {
            xtype: 'form'
            , border: false
            , style: {
                paddingTop: '8px'
            }
            , items: [
                {
                    xtype: 'fieldset'
                    , border: false
                    , defaults: {
                        labelAlign: 'left'
                        , value: 0
                        , maxValue: 4
                        , minValue: 0
                        , labelWidth: 275
                        , anchor: '98%'
                    }
                    , items: [
                        {
                            xtype: 'combo'
                            , fieldLabel: LS.__translate(LS.PrintAGoodsCombinationWhenPrintingAnInvoice)
                            , queryMode: 'local'
                            , displayField: 'title'
                            , valueField: 'value'
                            , name: 'goods-sets-print'
                            , store: {
                                xtype: 'store'
                                , fields: ['value', 'title']
                                , data: [
                                    {value: 'onlygoods', title: LS.__translate(LS.AllArticles)}
                                    , {value: 'collapsed', title: LS.__translate(LS.CombinationNameOnly)}
                                    , {value: 'expanded', title: LS.__translate(LS.CombinationNameAndCompositionWithoutPrices)}
                                    , {value: 'onlyservice', title: LS.__translate(LS.FullDetalizationByServicesOnly)}
                                    , {value: 'manual', title: LS.__translate(LS.Ask)}
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ]
    , buttons: [
        {
            text: LS.__translate(LS.Save)
            , action: 'save'
        }
        , {
            text: LS.__translate(LS.Close)
            , action: 'close'
        }
    ]
});