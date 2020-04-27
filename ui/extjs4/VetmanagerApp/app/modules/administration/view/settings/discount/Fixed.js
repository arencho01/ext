Ext4.define('VetmanagerApp.modules.administration.view.settings.discount.Fixed', {
    extend: 'Ext4.Panel'
    , xtype: 'discount-fixed-settings'
    , title: LS.__translate(LS.RegularDiscountsSurcharges)
    , border: false
    , buttonAlign: 'center'
    , layout: {
        type: 'border'
    }
    , initComponent: function() {
        this.callParent();
        var grid = this.getFixedGridPanel();
        this.add(grid);
        this.add(this.getFixedPanel());
    }

    , getFixedGridPanel: function(){
        return {
            xtype: 'grid'
            , name: 'fixed-grid'
            , border: false
            , region: 'west'
            , width: 430
            , store: 'VetmanagerApp.modules.administration.store.settings.discount.Fixeds'
            , viewConfig: {
                getRowClass: function(record){
                    return record.get('can_edit') == 1 ? '' : 'gray-row';
                }
            }
            , columns: [
                {
                    header: LS.__translate(LS.Number)
                    , dataIndex: 'id'
                    , width: 60
                    , fixed: true
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
                    , width: 50
                    , fixed: true
                    , sortable: false
                    , hideable: false
                    , renderer: Common.renderStatus
                }
                , {
                    header: LS.__translate(LS.Type2)
                    , dataIndex: 'percent_type'
                    , width: 60
                    , fixed: true
                    , sortable: false
                    , hideable: false
                    , renderer: function(v) {
                        return v == 'increase' ? LS.__translate(LS.Surcharge) : LS.__translate(LS.Discount);
                    }
                }
                , {
                    header: LS.__translate(LS.Clinic)
                    , dataIndex: 'clinic_name'
                    , width: 95
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
                    , id: 'settings-fixed-action-save'
                    , action: 'save-fixed'
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
                    , action: 'add_fixed'
                    , handler: function(btn){
                        btn.ownerCt.items.items[0].enable().unmask();
                    }
                }
                , {
                    xtype: 'button'
                    , cls: 'button-del'
                    , action: 'delete-fixed'
                }
            ]
        };
    }
    , getFixedPanel: function(){
        return {
            xtype: 'panel'
            , region: 'center'
            , name: 'fixed-panel'
            , border: false
            , bodyStyle: 'padding: 5px 5px 0; overflow-y: auto; border-left: 1px solid #99bce8 !important;'
            , items: [
                this.getFixedForm()
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
                    id: 'revert-status-fixed-button'
                    , formBind: true
                    , xtype: 'button'
                    , action: 'revert-status-fixed'
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
    , getFixedForm: function(){
        return {
            name: 'fixed-form'
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
                , {xtype: 'hidden', name: 'cmd', value: 'create_discount_fixed'}
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
                    xtype: 'checkbox'
                    , name: 'is_for_all_clinics'
                    , fieldLabel: LS.__translate(LS.ForAllClinics)
                    , inputValue: 1
                    , id: 'settings-discount-fixed-actions-is_for_all_clinics'
                }
                , {
                    xtype: 'combobox'
                    , fieldLabel: LS.__translate(LS.Type2) + ' *'
                    , name: 'percent_type'
                    , queryMode: 'local'
                    , editable: false
                    , displayField: 'title'
                    , valueField: 'value'
                    , store: {
                        fields: ['title', 'value']
                        , data: [
                            {value: 'discount', title: LS.__translate(LS.Discount)}
                            , {value: 'increase', title: LS.__translate(LS.Surcharge)}
                        ]
                    }
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
                            , fieldLabel: LS.__translate(LS.Percent)  + ' *'
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
            ]
        };
    }
});