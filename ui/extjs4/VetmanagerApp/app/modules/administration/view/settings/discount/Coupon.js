Ext4.define('VetmanagerApp.modules.administration.view.settings.discount.Coupon', {
    extend: 'Ext4.Panel'
    , xtype: 'discount-coupon-settings'
    , title: LS.__translate(LS.Coupons)
    , border: false
    , buttonAlign: 'center'
    , layout: {
        type: 'hbox'
        , pack: 'start'
        , align: 'stretch'
    }
    , initComponent: function() {
        this.callParent();
        var grid = this.getGridPanel();
        this.add(grid);
        this.add(this.getPanel());
    }
    , getGridPanel: function(){
        return {
            xtype: 'grid'
            , name: 'coupon-grid'
            , border: false
            , width: 430
            , store: 'VetmanagerApp.modules.administration.store.settings.discount.Coupons'
            , viewConfig:{
                getRowClass: function(record){
                    return record.get('can_edit') == 1 ? '' : 'gray-row';
                }
            }
            , columns: [
                {
                    header: LS.__translate(LS.Number)
                    , dataIndex: 'id'
                    , width: 60
                    , sortable: false
                    , hideable: false
                }
                , {
                    header: LS.__translate(LS.Namez)
                    , dataIndex: 'title'
                    , width: 165
                    , sortable: false
                    , hideable: false
                }
                , {
                    header: LS.__translate(LS.Status)
                    , dataIndex: 'status'
                    , width: 80
                    , sortable: false
                    , hideable: false
                    , renderer: Common.renderStatus
                }
                , {
                    header: LS.__translate(LS.Clinic)
                    , dataIndex: 'clinic_name'
                    , width: 125
                    , sortable: false
                    , hideable: false
                }
            ],
            listeners:{
                'selectionchange': function(){
                    var buttonSave = this.getDockedItems('toolbar[dock="top"]')[0].items.items[0];
                    if(this.getSelectionModel().getCount()==1){
                        buttonSave.enable().unmask();
                    } else {
                        buttonSave.disable().mask();
                    }
                }
            }
            , tbar: [
                {
                    xtype: 'button'
                    , cls: 'button-save'
                    , id: 'settings-discount-coupon-save'
                    , action: 'save-coupon'
                    , maskElement: 'el'
                    , disabled: true
                    , listeners: {
                        render: function(btn) {
                            btn.mask();
                        }
                    }
                },
                "&nbsp",
                {
                    xtype: 'button'
                    , cls: 'button-add'
                    , action: 'add_coupon'
                    , handler: function(btn){
                        btn.ownerCt.items.items[0].enable().unmask();
                    }
                }
                , {
                    xtype: 'button'
                    , cls: 'button-del'
                    , action: 'delete_coupon'
                }
            ]
        };
    }
    , getPanel: function(){
        return {
            xtype: 'panel'
            , name: 'coupon-panel'
            , border: false
            , bodyStyle: 'padding: 5px 5px 0; overflow-y: auto; border-left: 1px solid #99bce8 !important;'
            , items: [
                this.getForm()
            ]
            , flex: 1
            , tbar: [
                {
                    xtype: 'displayfield',
                    width: 1,
                    height: 29
                },
                '->',
                {
                    id: 'revert-status-coupon-button'
                    , formBind: true
                    , xtype: 'button'
                    , action: 'revert-status-coupon'
                    , text: LS.__translate(LS.Activate)
                    , hidden: true
                    , textByStatus: {
                        ACTIVE: LS.__translate(LS.Deactivate)
                        , DISABLED: LS.__translate(LS.Activate)
                    }
                }
            ]
        }
    }
    , getForm: function(){
        return {
            name: 'coupon-form'
            , url:'ajax_discount.php'
            , defaultType: 'textfield'
            , xtype: 'form'
            , hidden: true
            , border: false
            , buttonAlign: 'center'
            , fieldDefaults: {
                msgTarget: 'side'
                , labelWidth: 150
            }
            , defaults: {
                anchor: '100%'
            }
            , items: [
                {xtype: 'hidden', name: 'id'}
                , {xtype: 'hidden', name: 'cmd', value: 'create_coupon'}
                , {
                    fieldLabel: LS.__translate(LS.Namez)  + ' *'
                    , name: 'title'
                    , allowBlank: false
                }
                , {xtype: 'hidden', name: 'status', value: 'ACTIVE'}
                , {
                    name: 'data'
                    , allowBlank: false
                    , xtype: 'hidden'
                }
                , {
                    xtype: 'panel'
                    , layout: 'column'
                    , border: false
                    , items: [
                        {
                            xtype: 'checkbox'
                            , name: 'is_for_all_clinics'
                            , fieldLabel: LS.__translate(LS.ForAllClinics)
                            , inputValue: 1
                            , id: 'settings-discount-coupon-actions-is_for_all_clinics'
                            , width: 300
                        }
                        , {
                            xtype: 'checkbox'
                            , name: 'is_for_message_sender'
                            , fieldLabel: LS.__translate(LS.ForDistribution)
                            , inputValue: 1
                            , id: 'settings-discount-coupon-actions-is_for_message_sender'
                            , width: 300
                        }
                    ]
                }
                , {
                    xtype: 'datefield'
                    , anchor: '100%'
                    , fieldLabel: LS.__translate(LS.From)  + ' *'
                    , name: 'start_date'
                    , value: new Date()
                    , format: Common.VMDateFormat
                    , submitFormat: 'Y-m-d'
                    , allowBlank: false
                }, {
                    xtype: 'datefield'
                    , anchor: '100%'
                    , fieldLabel: LS.__translate(LS.do)  + ' *'
                    , name: 'end_date'
                    , format: Common.VMDateFormat
                    , submitFormat: 'Y-m-d'
                    , allowBlank: false
                }
                , {
                    xtype: 'numberfield'
                    , fieldLabel: LS.__translate(LS.MaximumAmountOfTimesTheCodeWordCanBeUsedNoLimit)  + ' *'
                    , name: 'max_usage_count'
                    , minValue: 0
                    , labelWidth: 500
                    , value: 0
                    , allowBlank: false
                }
                , {
                    xtype: 'numberfield'
                    , fieldLabel: LS.__translate(LS.MaximumAmountOfTimesTheCodeWordCanBeUsedByTheClientNoLimit)  + ' *'
                    , name: 'max_usage_count_per_client'
                    , minValue: 0
                    , labelWidth: 500
                    , value: 0
                    , allowBlank: false
                }
                , {
                    xtype: 'numberfield'
                    , fieldLabel: LS.__translate(LS.MaximumDiscountAmountOfTheCodeWordInTheInvoiceUnlimited)  + ' *'
                    , name: 'max_discount_amount_per_client_invoice'
                    , minValue: 0
                    , labelWidth: 500
                    , value: 0
                    , allowBlank: false
                }
                , {
                    xtype: 'fieldset'
                    , collapsed: false
                    , fieldDefaults: {
                        msgTarget: 'side'
                        , labelWidth: 150
                    }
                    , defaults: {
                        anchor: '100%'
                    }
                    , items: [
                        {xtype: 'rules-combobox'}
                        , {
                            xtype: 'numberfield'
                            , fieldLabel: LS.__translate(LS.DiscountRate)  + ' *'
                            , name: 'discount_percent'
                            , listeners: {
                                render: function(c){
                                    if (c.triggerEl) {
                                        c.triggerEl.hide();
                                    }
                                }
                            }
                            , minValue: 0
                            , maxValue: 100
                            , allowBlank: false
                        }
                        , {
                            xtype: 'grid'
                            , name: 'coupon-code-grid'
                            , border: true
                            , height: 250
                            , store: {
                                fields: ['id', 'codeword']
                            }
                            , viewConfig: {
                                forceFit: true
                            }
                            , tbar: [
                                {
                                    xtype: 'button'
                                    , cls: 'button-add'
                                    , action: 'add_coupon_code'
                                }
                                , {
                                    xtype: 'button'
                                    , cls: 'button-del'
                                    , action: 'delete_coupon_code'
                                }
                            ]
                            , columns: [
                                {
                                    header: LS.__translate(LS.CodeWord)
                                    , dataIndex: 'codeword'
                                    , sortable: false
                                    , hideable: false
                                    , resizable: false
                                    , flex: 1
                                    , editor: 'textfield'
                                }
                            ]
                            , plugins: {
                                ptype: 'rowediting',
                                saveBtnText  : LS.__translate(LS.Ok),
                                cancelBtnText: LS.__translate(LS.Cancel),
                                clicksToEdit: 2
                            }
                        }

                    ]
                }
            ]
            , buttons: [
                 {
                    id: 'coupon-generate-message-sender-button'
                    , formBind: true
                    , xtype: 'button'
                    , action: 'coupon-generate-message-sender'
                    , text: LS.__translate(LS.GenerateAMailingList)
                    , hidden: true
                }
            ]
        };
    }
});