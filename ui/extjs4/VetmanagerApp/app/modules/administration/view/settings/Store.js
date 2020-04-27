Ext4.define('VetmanagerApp.modules.administration.view.settings.Store', {
    extend: 'Ext4.tab.Panel',
    xtype: 'storesettings',
    border: false,
    region: 'center',
    title: false,
    scope: this,
    buttonAlign: 'center',
    activeTab: 0,
    items: [
        {
            xtype: 'form',
            title: LS.__translate(LS.Warehouse),
            border: false,
            accessType: false,
            padding: '10px',
            items: [{
                xtype: 'fieldset',
                title: LS.__translate(LS.SettingsToDisplayBatchesAndSaleUnits),
                items: [{
                    xtype: 'checkboxfield',
                    fieldLabel: LS.__translate(LS.ShowStockAccounting),
                    labelWidth: 300,
                    name: 'show_store_party_accounting',
                    listeners: {
                        scope: this,
                        change: function(c, n, o) {
                            var fset = c.ownerCt.next();

                            if (n) {
                                fset.enable();
                            } else {
                                fset.disable();
                                fset.child('[name="disable_receipt_invoice_party_minus_if_avaliable_party"]').setValue(false);
                            }
                        }
                    }
                }, {
                    xtype: 'checkboxfield',
                    fieldLabel: LS.__translate(LS.ShowSalesUnitsInTheInventory),
                    labelWidth: 340,
                    style: {
                        marginTop: '20px'
                    },
                    name: 'show_inventar_sale_params'
                }]
            }, {
                xtype: 'fieldset',
                title: LS.__translate(LS.DeliveryNoteAndTransferGoodSettings),
                disabled: true,
                items: [{
                    xtype: 'checkboxfield',
                    fieldLabel: LS.__translate(LS.ProhibitionOfWritingOffTheBatchProvidedThatThereIsASuitableBatchWithTheAvailableQuantity),
                    labelWidth: 400,
                    name: 'disable_receipt_invoice_party_minus_if_avaliable_party'
                }]
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