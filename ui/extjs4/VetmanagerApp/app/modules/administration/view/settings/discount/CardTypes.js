Ext4.define('VetmanagerApp.modules.administration.view.settings.discount.CardTypes', {
    extend: 'Ext4.Panel'
    , xtype: 'discount-card-types-settings'
    , title: LS.__translate(LS.CardTypes)
    , border: false
    , buttonAlign: 'center'
    , layout: {
        type: 'hbox'
        , pack: 'start'
        , align: 'stretch'
    }
    , initComponent: function() {
        this.callParent();
        var grid = this.getCardTypesGridPanel();
        this.add(grid);
        this.add(this.getCardTypePanel());
    }
    , getCardTypesGridPanel: function(){
        return {
            xtype: 'grid'
            , name: 'card-types-grid'
            , border: false
            , width: 430
            , store: 'VetmanagerApp.modules.administration.store.settings.discount.CardTypes'
            , viewConfig: {
                getRowClass: function(record){
                    return record.get('can_edit') == 1 ? '' : 'gray-row';
                }
            }
            , selModel: Ext.create('Ext.selection.CheckboxModel', {
                listeners:{
                    selectionchange: function( model, selected, eOpts ){
                        console.log( model, selected, eOpts )
                    }
                }
            })
            , columns: [
                {
                    header: LS.__translate(LS.Number)
                    , dataIndex: 'id'
                    , width: 36
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
                    , selection: '1'
                    , id: 'settings-discount-type-card-save'
                    , cls: 'button-save'
                    , action: 'save-card-type'
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
                    , action: 'add_card_type',
                    handler: function(btn){
                        btn.ownerCt.items.items[0].enable().unmask();
                    }
                }
                , {
                    xtype: 'button'
                    , cls: 'button-del'
                    , action: 'delete_card_type'
                },
                {
                    tooltip: LS.__translate(LS.Combine)
                    , action: 'compare'
                    , cls: 'button-compare'
                    , maskElement: 'el'
                    , disabled: true
                    , listeners: {
                        render: function(btn) {
                            btn.mask();
                        }
                    }
                }, {
                    xtype: 'displayfield',
                    width: 1,
                    height: 29
                }
            ]
        };
    }
    , getCardTypePanel: function(){
        return {
            xtype: 'panel'
            , name: 'card-types-panel'
            , border: false
            , bodyStyle: 'padding: 5px 5px 0; overflow-y: auto; border-left: 1px solid #99bce8 !important;'
            , items: [
                this.getCardTypeForm()
            ]
            , flex: 1
            , tbar: [
                {
                    xtype: 'displayfield',
                    width: 1,
                    height: 29,
                    border: false
                },
                '->'
                , {
                    id: 'revert-status-card-type-button'
                    , formBind: true
                    , xtype: 'button'
                    , action: 'revert-status-card-type'
                    , text: LS.__translate(LS.Activate)
                    , hidden: true
                    , textByStatus: {
                        ACTIVE: LS.__translate(LS.Deactivate)
                        , DISABLED: LS.__translate(LS.Activate)
                    }
                }
               /* {
                    xtype: 'button'
                    , cls: 'button-add'
                    , action: 'add_card_type'
                }
                , {
                    xtype: 'button'
                    , cls: 'button-del'
                    , action: 'delete_card_type'
                }*/
            ]
        }
    }
    , getCardTypeForm: function(){
        return {
            name: 'card-type-form'
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
                , {xtype: 'hidden', name: 'cmd', value: 'create_card_type'}
                , {
                    fieldLabel: LS.__translate(LS.Namez)  + ' *'
                    , name: 'title'
                    , id: 'discount-card-types-name'
                    , allowBlank: false
                }
                , {xtype: 'hidden', name: 'status', value: 'ACTIVE'}
                , {
                    name: 'data'
                    , xtype: 'hidden'
                }
                , {
                    xtype: 'card-discount-field-combo'
                }
                , {
                    xtype: 'checkbox'
                    , name: 'is_for_all_clinics'
                    , fieldLabel: LS.__translate(LS.ForAllClinics)
                    , inputValue: 1
                    , id: 'discount-card-types-is_for_all_clinics'
                }
                , {
                    text: LS.__translate(LS.AddACondition)
                    , xtype: 'button'
                    , id: 'card-type-form-add-new-static-expression'
                    , maxWidth: 200
                    , hidden: false
                }
                , {
                    text: LS.__translate(LS.AddACondition)
                    , xtype: 'button'
                    , id: 'card-type-form-add-new-range-expression'
                    , maxWidth: 200
                    , hidden: true
                }
            ]
            /*, buttons: [
                {
                    formBind: true
                    , xtype: 'button'
                    , id: 'settings-discount-type-card-save'
                    , cls: 'button-save'
                    , action: 'save-card-type'
                }
                , {
                    id: 'revert-status-card-type-button'
                    , formBind: true
                    , xtype: 'button'
                    , action: 'revert-status-card-type'
                    , text: LS.__translate(LS.Activate)
                    , hidden: true
                    , textByStatus: {
                        ACTIVE: LS.__translate(LS.Deactivate)
                        , DISABLED: LS.__translate(LS.Activate)
                    }
                }
            ]*/
        };
    }
    , getStaticFieldSet: function(){
        var trigerHide = function(c){
                if (c.triggerEl) {
                    c.triggerEl.hide();
                }
            };

        var fieldset = Ext.create('Ext.form.FieldSet', {
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
                        render: trigerHide
                    }
                    , minValue: 0
                    , maxValue: 100
                    , allowBlank: false
                }
                , {
                    xtype: 'numberfield'
                    , fieldLabel: LS.__translate(LS.MaximumDiscountAmount) + ' (' + GlobalProperties.get('currency-short', LS.__translate(LS.Rub)) + ')'
                    , name: 'discount_total_max_value'
                    , labelWidth: 350
                    , listeners: {
                    render: trigerHide
                }
                    , allowBlank: true
                }
                , {
                    xtype: 'numberfield'
                    , fieldLabel: LS.__translate(LS.MaximumDiscountAmountInTheInvoice) + ' (' + GlobalProperties.get('currency-short', LS.__translate(LS.Rub)) + ')'
                    , name: 'discount_invoice_max_value'
                    , labelWidth: 350
                    , listeners: {
                        render: trigerHide
                    }
                    , allowBlank: true
                }
                , {
                    xtype: 'button'
                    , text: LS.__translate(LS.RemoveACondition)
                    , handler: function(){
                        fieldset.destroy();
                    }
                }
            ]
        });

        return fieldset;
    }
    , getRangeFieldSet: function(){
        var trigerHide = function(c){
            if (c.triggerEl) {
               c.triggerEl.hide();
            }
        }
        , fieldset = Ext.create('Ext.form.FieldSet', {
            xtype: 'fieldset'
            , collapsed: false
            , border: true
            , fieldDefaults: {
                msgTarget: 'side'
                , labelWidth: 150
            }
            , defaults: {
                anchor: '100%'
            }
            , items: [
                {
                    xtype: 'numberfield'
                    , fieldLabel: LS.__translate(LS.From)
                    , name: 'range_from'
                    , listeners: {
                        render: trigerHide
                    }
                    , allowBlank: false
                    , validate: function() {
                        var from = this,
                            to = this.nextSibling();
                        from.setMaxValue(to.getValue());
                        to.setMinValue(from.getValue());
                        from = Ext4.form.NumberField.prototype.validate.apply(from);
                        to = Ext4.form.NumberField.prototype.validate.apply(to);
                        return from && to;
                    }
                }
                , {
                    xtype: 'numberfield'
                    , fieldLabel: LS.__translate(LS.do)
                    , name: 'range_to'
                    , listeners: {
                        render: trigerHide
                    }
                    , allowBlank: false
                    , validate: function() {
                        return this.previousSibling().validate();
                    }
                }
                , {xtype: 'rules-combobox'}
                , {
                    xtype: 'numberfield'
                    , fieldLabel: LS.__translate(LS.DiscountRate)
                    , name: 'discount_percent'
                    , listeners: {
                        render: trigerHide
                    }
                    , minValue: 0
                    , maxValue: 100
                    , allowBlank: false
                }
                , {
                    xtype: 'button'
                    , text: LS.__translate(LS.RemoveACondition)
                    , handler: function(){
                        fieldset.destroy();
                    }
                }
            ]
        });
        return fieldset;
    }
});