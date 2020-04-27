Ext4.define('VetmanagerApp.modules.administration.view.settings.Invoice', {
    extend: 'Ext4.tab.Panel',
    xtype: 'invoicesettings',
    border: false,
    region: 'center',
    title: false,
    scope: this,
    buttonAlign: 'center',
    activeTab: 0,
    requires: [
        'Ext4.ux.form.ItemSelector'
    ],
    items: [
        {
            title: LS.__translate(LS.SortDoctorsInInvoices),
            xtype: 'form',
            padding: '5px',
            layout: 'fit',
            border: false,
            accessType: 'invoice_doctors_sort',
            items: [{
                xtype: 'itemselector',
                name: 'invoice_doctors_sort',
                anchor: '100%',
                displayField: 'title',
                valueField: 'id',
                fromTitle: LS.__translate(LS.AllRoles),
                toTitle: LS.__translate(LS.ChosenRoles),
                store: {
                    xtype: 'store',
                    fields: ['id', 'title'],
                    autoLoad: true,
                    proxy: {
                        type: 'ajax',
                        url: 'ajax_administration.php',
                        extraParams: {
                            cmd: 'get_roles'
                        },
                        reader: {
                            type: 'json',
                            root: 'data'
                        }
                    }
                }
            }]
        }, {
            xtype: 'form',
            title: LS.__translate(LS.InvoiceAdjustment),
            border: false,
            autoScroll: true,
            accessType: false,
            padding: '10px',
            items: [
                {
                    xtype: 'fieldset',
                    width: 1000,
                    title: LS.__translate(LS.PrintSetup),
                    items: [
                        {
                            xtype: 'combo',
                            labelWidth: 600,
                            labelPad: 10,
                            labelAlign: 'right',
                            width: 900,
                            fieldLabel: LS.__translate(LS.PrintGoodsCombinations),
                            queryMode: 'local',
                            displayField: 'title',
                            valueField: 'value',
                            name: 'goods-sets-print',
                            store: {
                                xtype: 'store',
                                fields: ['value', 'title'],
                                data: [
                                    {value: 'onlygoods', title: LS.__translate(LS.AllArticles)},
                                    {value: 'collapsed', title: LS.__translate(LS.CombinationNameOnly)},
                                    {value: 'expanded', title: LS.__translate(LS.CombinationNameAndCompositionWithoutPrices)},
                                    {value: 'onlyservice', title: LS.__translate(LS.FullDetalizationByServicesOnly)},
                                    {value: 'manual', title: LS.__translate(LS.Ask)}
                                ]
                            }
                        }, {
                            xtype: 'checkbox',
                            fieldLabel: LS.__translate(LS.UseYourOwnHtmlTemplatePrintInvoices),
                            labelWidth: 600,
                            labelPad: 10,
                            labelAlign: 'right',
                            name: 'invoice-use-print-template',
                            listeners: {
                                scope: this,
                                change: function (c, newVal) {
                                    c.nextSibling().setDisabled(!newVal);

                                    if (!newVal) {
                                        c.nextSibling().setValue(false);
                                    }
                                }
                            }
                        }, {
                            xtype: 'checkbox',
                            fieldLabel: 'Отображать все доступные печатные формы с типом "Счет"',
                            labelWidth: 600,
                            labelPad: 10,
                            labelAlign: 'right',
                            name: 'show_all_printforms_with_invoice_type',
                            boxLabel: [
                                'Если проставить галочку, при печати каждого счета программа будет предлагать выбрать печатную форму из доступных. Последняя выбранная форма автоматически будет запоминаться; при необходимости свой выбор можно изменить.',
                                'Вам доступны формы Счет и Товарный чек. Вы можете добавлять и редактировать формы в Админка/Настройка печатных форм'
                            ].join('')
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    width: 1000,
                    title: LS.__translate(LS.NightReception),
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: LS.__translate(LS.MarkAnInvoiceAsNightWhenTheInvoiceCreatingTime),
                            layout: 'hbox',
                            labelWidth: 600,
                            labelPad: 10,
                            labelAlign: 'right',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    name: 'invoice_night_time_check',
                                    width: 20
                                },
                                {
                                    xtype: 'timefield',
                                    fieldLabel: LS.__translate(LS.fromS),
                                    labelWidth: 40,
                                    labelAlign: 'right',
                                    format: 'H:i',
                                    name: 'invoice_night_time_from',
                                    width: 140
                                },
                                {
                                    xtype: 'timefield',
                                    fieldLabel: LS.__translate(LS.do),
                                    labelWidth: 40,
                                    labelAlign: 'right',
                                    format: 'H:i',
                                    name: 'invoice_night_time_to',
                                    width: 140
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    width: 1000,
                    title: LS.__translate(LS.Goods),
                    items: [
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: LS.__translate(LS.ShowOnlyGoodsAvailableInStock),
                            labelWidth: 600,
                            labelPad: 10,
                            labelAlign: 'right',
                            name: 'only_store_goods'
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: LS.__translate(LS.ProhibitNegativeSellingOfGoods),
                            labelWidth: 600,
                            labelPad: 10,
                            labelAlign: 'right',
                            name: 'disable_sell_goods_in_minus'
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: LS.__translate(LS.ProhibitNonWholeSale),
                            labelWidth: 600,
                            labelPad: 10,
                            labelAlign: 'right',
                            name: 'disable_fractional_quantity'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    width: 1000,
                    title: LS.__translate(LS.Vaccines),
                    items: [
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: LS.__translate(LS.ShowTheVaccinationAddingWindowWhenCreatingAnInvoice),
                            labelWidth: 600,
                            labelPad: 10,
                            labelAlign: 'right',
                            name: 'show_vaccine_dialog'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    width: 1000,
                    title: LS.__translate(LS.PriceForming),
                    items: [
                        {
                            xtype: 'radiogroup',
                            columns: 1,
                            vertical: true,
                            labelWidth: 600,
                            labelPad: 10,
                            labelAlign: 'right',
                            items: [
                                {
                                    fieldLabel: LS.__translate(LS.TheOldestBatchPriceWithTheAmountAvailableFifo),
                                    name: 'price_formation',
                                    inputValue: 'fifo',
                                    labelWidth: 600,
                                    labelPad: 10,
                                    labelAlign: 'right',
                                    checked: true
                                },
                                {
                                    fieldLabel: LS.__translate(LS.PriceOfTheLastBatchOnlyIncludingGoodsWithTheSalePricePurchaseInterest),
                                    name: 'price_formation',
                                    labelWidth: 600,
                                    labelPad: 10,
                                    labelAlign: 'right',
                                    inputValue: 'last_party'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    width: 1000,
                    title: LS.__translate(LS.Discounts),
                    items: [
                        {
                            xtype: 'numberfield',
                            fieldLabel: LS.__translate(LS.MaximumDiscountRate),
                            labelWidth: 600,
                            labelPad: 10,
                            labelAlign: 'right',
                            name: 'invoice_max_discount',
                            minValue: 0,
                            maxValue: 100,
                            value: 0
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: LS.__translate(LS.MaximumSurchargeRate),
                            labelWidth: 600,
                            labelPad: 10,
                            labelAlign: 'right',
                            name: 'invoice_max_increase',
                            minValue: 0,
                            maxValue: 100,
                            value: 0
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            title: LS.__translate(LS.FiltersSettings),
            number: 0,
            accessType: false,
            border: false,
            layout: 'fit',
            items: [{
                xtype: 'itemselector',
                anchor: '100%',
                filter_type: 'invoice_default',
                displayField: 'title',
                valueField: 'name',
                fromTitle: LS.__translate(LS.AllFields),
                toTitle: LS.__translate(LS.FieldsSelected),
                store: {
                    xtype: 'store',
                    fields: ['name', 'title'],
                    data: [
                        {name: 'last_name', title: LS.__translate(LS.LastName)},
                        {name: 'number', title: LS.__translate(LS.Number)},
                        {name: 'discount_card', title: LS.__translate(LS.DiscountCard)},
                        {name: 'from', title: LS.__translate(LS.TheLastVisitFrom)},
                        {name: 'to', title: LS.__translate(LS.po)},
                        {name: 'doctor', title: LS.__translate(LS.AttendingPhysician)},
                        {name: 'clinic_accessed', title: LS.__translate(LS.Clinic)},
                        {name: 'clinic_current_hidden', title: LS.__translate(LS.CurrentClinic) + '(' + LS.__translate(LS.FilterIsHidden) + ')'}
                    ]
                }
            }]
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