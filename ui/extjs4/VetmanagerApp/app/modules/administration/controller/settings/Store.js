Ext4.define('VetmanagerApp.modules.administration.controller.settings.Store', {
    extend: 'Ext4.app.Controller'
    , views: [
        'VetmanagerApp.modules.administration.view.settings.Store'
    ]
    , refs: [
        {
            ref: 'mainPanel'
            , selector: 'storesettings'
            , autoCreate: true
            , xtype: 'storesettings'
        }
    ]
    , init: function() {

        var obj = {};

        if (!this.isEventExists('click', 'storesettings button[action="save"]')) {
            obj['storesettings button[action="save"]'] = {click: this.onSave};
        }

        if (!this.isEventExists('afterrender', 'storesettings form')) {
            obj['storesettings form'] = { afterrender: this.onAfterRender};
        }

        this.control(obj);
    }
    , onSave: function() {
        var panel = this.getMainPanel().getActiveTab()
            , form = panel.getForm();

        if (LS.__translate(LS.Warehouse) == panel.title) {
            Ext4.Ajax.request({
                url: 'ajax_administration.php'
                , scope: this
                , params: {
                    cmd: 'set_all_access_params'
                    , params: Ext4.encode([
                        {
                            name: 'show_store_party_accounting'
                            , value: (form.findField('show_store_party_accounting').getValue()) ? 1 : 0
                        }, {
                            name: 'show_inventar_sale_params'
                            , value: (form.findField('show_inventar_sale_params').getValue()) ? 1 : 0
                        }, {
                            name: 'disable_receipt_invoice_party_minus_if_avaliable_party'
                            , value: (form.findField('disable_receipt_invoice_party_minus_if_avaliable_party').getValue()) ? 1 : 0
                        }
                    ])
                }
                , success: function(r) {
                    var result = Ext4.decode(r.responseText);

                    if (result.is_error) {
                        Ext3.MsgManager.alertError(LS.__translate(LS.Error), 'Ошибка сохранения настроек');
                    } else {
                        Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.DataAreKept));
                    }
                }
            });
        }
    }
    , onAfterRender: function() {
        var form = this.getMainPanel().getActiveTab();

        if (LS.__translate(LS.Warehouse) == form.title) {
            this.setShowStorePartyAccounting();
            this.setShowInventarSsaleParams();
            this.setDisableReceiptInvoicePartyMinusIfAvaliablePartyParams();
        }
    }
    , setShowStorePartyAccounting: function() {
        Ext4.Ajax.request({
            url: 'ajax_administration.php'
            , scope: this
            , params: {
                cmd: 'get_all_access_param'
                , name: 'show_store_party_accounting'
            }
            , success: function(r) {
                var form = this.getMainPanel().getActiveTab()
                    , result = Ext4.decode(r.responseText);

                form.getForm().findField('show_store_party_accounting').setValue(result.data);
            }
        });
    }
    , setShowInventarSsaleParams: function() {
        Ext4.Ajax.request({
            url: 'ajax_administration.php'
            , scope: this
            , params: {
                cmd: 'get_all_access_param'
                , name: 'show_inventar_sale_params'
            }
            , success: function(r) {
                var form = this.getMainPanel().getActiveTab()
                    , result = Ext4.decode(r.responseText);

                form.getForm().findField('show_inventar_sale_params').setValue(result.data);
            }
        });
    }
    , setDisableReceiptInvoicePartyMinusIfAvaliablePartyParams: function() {
        Ext4.Ajax.request({
            url: 'ajax_administration.php'
            , scope: this
            , params: {
                cmd: 'get_all_access_param'
                , name: 'disable_receipt_invoice_party_minus_if_avaliable_party'
            }
            , success: function(r) {
                var form = this.getMainPanel().getActiveTab()
                    , result = Ext4.decode(r.responseText);

                form.getForm().findField('disable_receipt_invoice_party_minus_if_avaliable_party').setValue(result.data);
            }
        });
    }
    , isEventExists: function(eventName, selector) {
        if (this.application.eventbus.bus[eventName] != null
            && this.application.eventbus.bus[eventName][selector] != null) {
            return true;
        }

        return false;
    }
});