Ext4.define('VetmanagerApp.modules.administration.view.settings.Localization', {
    extend: 'Ext4.tab.Panel',
    xtype: 'localization_view',
    border: false,
    region: 'center',
    title: false,
    buttonAlign: 'center',
    items: [
        {
            xtype: 'form',
            title: LS.__translate(LS.Localization),
            border: false,
            padding: '10px',
            items: [
                {
                    xtype: 'fieldset',
                    title: LS.__translate(LS.RoundingSettings),
                    style: 'margin-bottom: 30px;',
                    items: [
                        {
                            xtype: 'label',
                            html: '<span style="text-style:italic; color:blue">'+LS.__translate(LS.SetTheAmountOfDecimalPlaces)+'</span>'
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            items:[
                                {
                                    xtype: 'fieldcontainer',
                                    style: 'margin: 0 auto; margin-bottom:25px;',
                                    defaults: {
                                        labelAlign: 'right',
                                        value: 0,
                                        maxValue: 4,
                                        minValue: 0,
                                        labelWidth: 500,
                                        anchor: '98%'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: LS.__translate(LS.TotalInInvoicesGoodsAndServicesReceiptsNotes),
                                            name: 'default'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: LS.__translate(LS.PurchasePricesTheCostOfGoodsInTheReceiptsNotes),
                                            name: 'store'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: LS.__translate("Округление в кассовых документах"),
                                            name: 'digits-cassa'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: LS.__translate(LS.Rounding),
                                            name: 'quantity-default'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: LS.__translate(LS.Currency),
                            layout: 'hbox',
                            labelWidth: 75,
                            cls: 'lebel-vertical-align-bottom',
                            defaults:{
                                style: "margin-right:10px; color:gray;"
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: LS.__translate(LS.Short),
                                    labelAlign: 'top',
                                    flex: 1,
                                    name: 'currencyName'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: LS.__translate(LS.Nominative),
                                    labelAlign: 'top',
                                    flex: 1,
                                    name: 'currencyFull'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: LS.__translate(LS.Genitive),
                                    labelAlign: 'top',
                                    flex: 1,
                                    name: 'currencyFullGenitive'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: LS.__translate(LS.GenitivePlural),
                                    labelAlign: 'top',
                                    flex: 2,
                                    name: 'currencyFullMany'
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: LS.__translate(LS.Gender),
                                    labelAlign: 'top',
                                    queryMode: 'local',
                                    displayField: 'title',
                                    valueField: 'value',
                                    name: 'currencyFullGender',
                                    store: {
                                        xtype: 'store',
                                        fields: ['value', 'title'],
                                        data: [
                                            {value: '0', title: LS.__translate(LS.He)},
                                            {value: '1', title: LS.__translate(LS.She)}
                                        ]
                                    },
                                    width: 100
                                },
                                {
                                    xtype: 'combo',
                                    queryMode: 'local',
                                    displayField: 'title',
                                    fieldLabel: LS.__translate(LS.Location),
                                    labelAlign: 'top',
                                    valueField: 'value',
                                    name: 'currencyAlign',
                                    store: {
                                        xtype: 'store',
                                        fields: ['value', 'title'],
                                        data: [
                                            {value: 'left', title: LS.__translate(LS.OnTheLeft)},
                                            {value: 'right', title: LS.__translate(LS.OnTheRight)}
                                        ]
                                    },
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: LS.__translate(LS.Kopeckis),
                            layout: 'hbox',
                            labelWidth: 75,
                            cls: 'lebel-vertical-align-bottom',
                            defaults:{
                                style: "margin-right:10px;"
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    name: 'currencyCentName'
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    name: 'currencyCentFull'
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    name: 'currencyCentFullGenitive'
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 2,
                                    name: 'currencyCentFullMany'
                                },
                                {
                                    xtype: 'combo',
                                    queryMode: 'local',
                                    displayField: 'title',
                                    valueField: 'value',
                                    name: 'currencyCentFullGender',
                                    store: {
                                        xtype: 'store',
                                        fields: ['value', 'title'],
                                        data: [
                                            {value: '0', title: LS.__translate(LS.He)},
                                            {value: '1', title: LS.__translate(LS.She)}
                                        ]
                                    },
                                    width: 100
                                },
                                {
                                    xtype: 'container',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'label',
                            html: '<span style="color:red"><br />'+LS.__translate(LS.WarningAfterSavingTheSettingsThePageWillRefreshAutomatically)+'<br />'
                            + LS.__translate(LS.IfThisFailsToHappenRefreshThePageManually)+'</span>'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: LS.__translate(LS.PhoneSettings),
                    defaults: {
                        labelAlign: 'left',
                        value: 0,
                        labelWidth: 300
                    },
                    width:'auto',
                    anchor: '47%',
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            layout: 'hbox',
                            items :[
                                {
                                    xtype: 'textfield',
                                    name: 'unisender_phone_pristavka',
                                    maxLength: 2,
                                    allowBlank: false,
                                    labelWidth: 300,
                                    fieldLabel: LS.__translate(LS.CountryCodeForPhonesOfClientsExample),
                                    width: 360,
                                    anchor: '',
                                    maskRe: /[0-9]/
                                },
                                {
                                    border: false,
                                    html: "<span style='color:grey;'>(пример: 234)</span>",
                                    style:'padding:10px'
                                }
                            ]
                        }

                        , {
                            xtype: 'combo',
                            queryMode: 'local',
                            displayField: 'title',
                            fieldLabel: LS.__translate(LS.MobilePhoneInputMask),
                            width: 480,
                            anchor: '',
                            editable: false,
                            valueField: 'value',
                            name: 'phone_mask',
                            store: {
                                xtype: 'store',
                                fields: ['value', 'title'],
                                data:Common.getMaskDataForComboData()
                            }
                        }
                    ]
                }
            ]
        }
    ],
    tbar: [
        {
            cls: 'button-save',
            action: 'save',
            tooltip: LS.__translate(LS.Save),
            margins: {top:3, right:0, bottom:2, left:5}
        }
    ]
});

