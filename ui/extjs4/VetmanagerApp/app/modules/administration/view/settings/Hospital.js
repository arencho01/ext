Ext4.define('VetmanagerApp.modules.administration.view.settings.Hospital', {
    extend: 'Ext4.tab.Panel',
    xtype: 'hospitalsettings',
    border: false,
    region: 'center',
    title: false,
    scope: this,
    buttonAlign: 'center',
    activeTab: 0,
    items: [
        {
            xtype: 'form',
            border: false,
            title: LS.__translate(LS.InpatientFacilityBlocks),
            accessType: false,
            hideSaveBtn: true,
            layout: 'fit',
            items: [{
                xtype: 'grid',
                flex: 1,
                name: 'hospital_blocks',
                initComponent: function() {
                    Ext.grid.Panel.prototype.initComponent.apply(this, arguments);
                    var paging = this.getDockedComponent('pagingtoolbar');
                    if (paging) {
                        paging.bindStore(this.getStore());
                    }
                },
                tbar: [
                    {
                        cls: 'button-add',
                        action: 'add_block'
                    }, {
                        cls: 'button-edit',
                        action: 'edit_block'
                    }, {
                        cls: 'button-del',
                        action: 'delete_block'
                    }
                ],
                store: {
                    xtype: 'store',
                    fields: [
                        'id',
                        'title',
                        'places_count',
                        'reserved_places_count',
                        'is_daily_payment',
                        'is_hourly_payment',
                        'is_create_final_invoice',
                        'service_id',
                        'status',
                        'has_history'
                    ],
                    autoLoad: true,
                    proxy: {
                        type: 'ajax',
                        url: 'ajax_hospital.php',
                        extraParams: {
                            cmd: 'get_hospital_blocks',
                            start: 0,
                            limit: 15,
                            status: 'active'
                        },
                        reader: {
                            type: 'json',
                            root: 'data'
                        }
                    }
                },
                columns: [{
                    header: LS.__translate(LS.BlockName),
                    dataIndex: 'title',
                    sortable: false,
                    hideable: false,
                    flex: 2
                }, {
                    header: LS.__translate(LS.NumberOfPlacesInTheBlock),
                    dataIndex: 'places_count',
                    sortable: false,
                    hideable: false,
                    flex: 1
                }, {
                    header: LS.__translate(LS.SparePlaces),
                    dataIndex: 'reserved_places_count',
                    sortable: false,
                    hideable: false,
                    flex: 1
                }, {
                    header: LS.__translate(LS.DailyPay),
                    dataIndex: 'is_daily_payment',
                    sortable: false,
                    hideable: false,
                    flex: 1,
                    renderer: function(v) {
                        return (v > 0) ? LS.__translate(LS.Yes) : LS.__translate(LS.No);
                    }
                }, {
                    header: LS.__translate(LS.HourlyPay),
                    dataIndex: 'is_hourly_payment',
                    sortable: false,
                    hideable: false,
                    flex: 1,
                    renderer: function(v) {
                        return (v > 0) ? LS.__translate(LS.Yes) : LS.__translate(LS.No);
                    }
                }],
                bbar: {
                    xtype: 'pagingtoolbar',
                    displayInfo: true,
                    itemId: 'pagingtoolbar',
                    displayMsg: LS.__translate(LS.EntriesFromSToSAreShownTotalOfS),
                    emptyMsg: LS.__translate(LS.NoEntriesToShow)
                }
            }]
        }
    ]
});