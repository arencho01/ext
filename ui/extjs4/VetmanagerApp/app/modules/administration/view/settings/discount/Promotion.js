Ext4.define('VetmanagerApp.modules.administration.view.settings.discount.Promotion', {
    extend: 'Ext4.Panel'
    , xtype: 'discount-promotion-settings'
    , title: LS.__translate(LS.SpecialOffers)
    , border: false
    , buttonAlign: 'center'
    , layout: {
        type: 'hbox'
        , pack: 'start'
        , align: 'stretch'
    }
    , initComponent: function() {
        this.callParent();
        var grid = this.getPromotionGridPanel();
        this.add(grid);
        this.add(this.getPromotionPanel());
    }
    , getPromotionGridPanel: function(){
        return {
            xtype: 'grid'
            , name: 'promotion-grid'
            , border: false
            , width: 430
            , store: 'VetmanagerApp.modules.administration.store.settings.discount.Promotions'
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
                    formBind: true
                    , xtype: 'button'
                    , cls: 'button-save'
                    , id: 'settings-discount-action-save'
                    , action: 'save-promotion'
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
                    , action: 'add_promotion'
                    , handler: function(btn){
                        btn.ownerCt.items.items[0].enable().unmask();
                    }
                }
                , {
                    xtype: 'button'
                    , cls: 'button-del'
                    , action: 'delete_promotion'
                }
            ]
        };
    }
    , getPromotionPanel: function(){
        return {
            xtype: 'panel'
            , name: 'promotion-panel'
            , border: false
            , bodyStyle: 'padding: 5px 5px 0; overflow-y: auto; border-left: 1px solid #99bce8 !important;'
            , items: [
                this.getPromotionForm()
            ]
            , flex: 1
            , tbar: [
                {
                    xtype: 'displayfield',
                    width: 1,
                    height: 29,
                    border: false
                },
                '->',
                {
                    id: 'revert-status-promotion-button'
                    , formBind: true
                    , xtype: 'button'
                    , action: 'revert-status-promotion'
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
    , getPromotionForm: function(){
        return {
            name: 'promotion-form'
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
                , {xtype: 'hidden', name: 'cmd', value: 'create_promotion'}
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
                    name: 'dates'
                    , allowBlank: true
                    , xtype: 'hidden'
                }
                , {
                    xtype: 'checkbox'
                    , name: 'is_for_all_clinics'
                    , fieldLabel: LS.__translate(LS.ForAllClinics)
                    , inputValue: 1
                    , id: 'settings-discount-actions-is_for_all_clinics'
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

                    ]
                }
                , {
                    xtype: 'multidatepickerpanel'
                    , pickersPerRow: 3
                    , rowsCount: 1
                    , mainPickerIndex: 0
                }
            ]
        };
    }
});