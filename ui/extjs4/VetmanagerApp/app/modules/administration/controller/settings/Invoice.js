Ext4.define('VetmanagerApp.modules.administration.controller.settings.Invoice', {
    extend: 'Ext4.app.Controller'
    , views: [
        'VetmanagerApp.modules.administration.view.settings.Invoice'
    ]
    , refs: [
        {
            ref: 'mainPanel'
            , selector: 'invoicesettings'
            , autoCreate: true
            , xtype: 'invoicesettings'
        }
    ]
    , init: function() {
        var obj = {};

        if (!this.isEventExists('click', 'invoicesettings button[action="save"]')) {
            obj['invoicesettings button[action="save"]'] = {click: this.onSave};
        }

        if (!this.isEventExists('afterrender', 'invoicesettings form')) {
            obj['invoicesettings form'] = { afterrender: this.onAfterRender};
        }

        this.control(obj);
    }
    , onSave: function() {
        var panel = this.getMainPanel().getActiveTab()
            , form = panel.getForm()
            , values = form.getValues()
            , type = ''
            , value = '';

        if (panel.accessType != false) {
            for(var t in values) {
                type = t;
                value = values[type];
                break;
            }

            Ext4.Ajax.request({
                url: 'ajax_administration.php'
                , scope: this
                , params: {
                    cmd: 'save_access_settings'
                    , type: type
                    , value: value
                }
                , success: function() {
                    this.onAfterRender();
                    Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.DataAreKept));
                }
            });
        } else if (LS.__translate(LS.InvoiceAdjustment) == panel.title) {
            var from = form.findField('invoice_night_time_from').getValue()
                , to = form.findField('invoice_night_time_to').getValue();

            GlobalProperties.set('only_store_goods', (form.findField('only_store_goods').getValue()) ? 1 : 0);
            GlobalProperties.set('disable_sell_goods_in_minus', (form.findField('disable_sell_goods_in_minus').getValue()) ? 1 : 0);
            GlobalProperties.set('disable_fractional_quantity', (form.findField('disable_fractional_quantity').getValue()) ? 1 : 0);
            GlobalProperties.set('invoice_night_time_check', (form.findField('invoice_night_time_check').getValue()) ? 1 : 0);
            GlobalProperties.set('invoice_night_time_from', Ext.isDate(from) ? from.format('H:i') : '');
            GlobalProperties.set('invoice_night_time_to', Ext.isDate(to) ? to.format('H:i') : '');
            GlobalProperties.set('invoice_max_discount', form.findField('invoice_max_discount').getValue());
            GlobalProperties.set('invoice_max_increase', form.findField('invoice_max_increase').getValue());
            GlobalProperties.set('goods-sets-print', form.findField('goods-sets-print').getValue());

            var params = [];
            params.push({
                name: 'show_vaccine_dialog',
                value: (form.findField('show_vaccine_dialog').getValue()) ? 1 : 0
            });
            params.push({
                name: 'price_formation',
                value: values.price_formation
            });
            params.push({
                name: 'use_invoice_html_printform',
                value: (form.findField('invoice-use-print-template').getValue()) ? 1 : 0
            });
            params.push({
                name: 'show_all_printforms_with_invoice_type',
                value: (form.findField('show_all_printforms_with_invoice_type').getValue()) ? 1 : 0
            });

            Ext4.Ajax.request({
                url: 'ajax_administration.php',
                scope: this,
                params: {
                    cmd: 'set_all_access_params',
                    params: Ext.encode(params)
                },
                success: function(r) {
                    var result = Ext4.decode(r.responseText);

                    if (result.is_error) {
                        Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.ErrorSavingSettings));
                    } else {
                        Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.DataAreKept));
                    }
                }
            });
        } else if (LS.__translate(LS.FiltersSettings) == panel.title) {
            this.saveFilterSettings();
        }
    }
    , onAfterRender: function() {
        var form = this.getMainPanel().getActiveTab();

        if (form.accessType != false) {
            this.setAccessData(form.accessType);
        } else if (LS.__translate(LS.InvoiceAdjustment) == form.title) {
            this.setPrintData();
            this.setIncreaseData();
            this.setOnlyStoreGoodsData();
            this.setdiDableSellGoodsInMinus();
            this.setDisableFractionalQuantity();
            this.setNightTimeData();
            this.setPriceFormation();
            this.setVaccineData();
        } else if (LS.__translate(LS.FiltersSettings) == form.title) {
            Ext4.Ajax.request({
                url: 'ajax_administration.php'
                , scope: this
                , params: {
                    cmd: 'get_filter_settings'
                    , type: 'invoice_default'
                }
                , success: function(r) {
                    var result = Ext4.decode(r.responseText)
                        , form = this.getMainPanel().getActiveTab()
                        , invDefault = form.query('itemselector[filter_type="invoice_default"]');

                    if (invDefault.length == 1) {
                        invDefault = invDefault[0];

                        invDefault.setValue(result.data);
                    }
                }
            });
        }
    }
    , saveFilterSettings: function () {
        var form = this.getMainPanel().getActiveTab()
            , invDefault = form.query('itemselector[filter_type="invoice_default"]');

        if (invDefault.length == 1) {
            invDefault = invDefault[0];

            Ext4.Ajax.request({
                url: 'ajax_administration.php'
                , scope: this
                , params: {
                    cmd: 'save_filter_settings'
                    , type: 'invoice_default'
                    , val: Ext4.encode(invDefault.getValue())
                }
                , success: function() {
                    Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.DataAreKept));
                }
            });
        }
    }
    , setVaccineData: function() {
        Ext4.Ajax.request({
            url: 'ajax_administration.php'
            , scope: this
            , params: {
                cmd: 'get_all_access_param'
                , name: 'show_vaccine_dialog'
            }
            , success: function(r) {
                var result = Ext4.decode(r.responseText)
                    , panel = this.getMainPanel().getActiveTab().getForm();

                panel.findField('show_vaccine_dialog').setValue(result.data*1);
            }
        });
    }
    , setPriceFormation: function() {
        Ext4.Ajax.request({
            url: 'ajax_administration.php'
            , scope: this
            , params: {
                cmd: 'get_all_access_param'
                , name: 'price_formation'
            }
            , success: function(r) {
                var result = Ext4.decode(r.responseText)
                    , panel = this.getMainPanel().getActiveTab()
                    , radios = panel.query('[name="price_formation"]');

                Ext4.each(radios, function(row) {
                    if (row.inputValue == result.data) {
                        row.setValue(true);
                    } else {
                        row.setValue(false);
                    }
                }, this);
            }
        });
    }
    , setdiDableSellGoodsInMinus: function() {
        var form = this.getMainPanel().getActiveTab().getForm()
            , value = GlobalProperties.get('disable_sell_goods_in_minus')*1;

        value = (value > 0);

        form.findField('disable_sell_goods_in_minus').setValue(value);
    }
    , setOnlyStoreGoodsData: function() {
        var form = this.getMainPanel().getActiveTab().getForm()
            , value = GlobalProperties.get('only_store_goods')*1;

        value = (value > 0);

        form.findField('only_store_goods').setValue(value);
    }
    , setDisableFractionalQuantity: function() {
        var form = this.getMainPanel().getActiveTab().getForm()
            , value = GlobalProperties.get('disable_fractional_quantity')*1;

        value = (value > 0);

        form.findField('disable_fractional_quantity').setValue(value);
    }
    , setIncreaseData: function() {
        var form = this.getMainPanel().getActiveTab().getForm()
            , maxDiscount = GlobalProperties.get('invoice_max_discount')
            , maxIncrease = GlobalProperties.get('invoice_max_increase');

        form.findField('invoice_max_discount').setValue(maxDiscount);
        form.findField('invoice_max_increase').setValue(maxIncrease);
    }
    , setNightTimeData: function() {
        var form = this.getMainPanel().getActiveTab().getForm()
            , check = GlobalProperties.get('invoice_night_time_check') > 0
            , from = GlobalProperties.get('invoice_night_time_from')
            , to = GlobalProperties.get('invoice_night_time_to');

        form.findField('invoice_night_time_check').setValue(check);
        form.findField('invoice_night_time_from').setValue(from);
        form.findField('invoice_night_time_to').setValue(to);
    }
    , setPrintData: function() {
        var form = this.getMainPanel().getActiveTab().getForm();

        this.setLoadValue(form.findField('goods-sets-print'), 'id', GlobalProperties.get('goods-sets-print'));

        Ext4.Ajax.request({
            url: 'ajax_administration.php'
            , scope: this
            , params: {
                cmd: 'get_all_access_param'
                , name: 'use_invoice_html_printform'
            }
            , success: function(r) {
                var result = Ext4.decode(r.responseText);

                form.findField('invoice-use-print-template').setValue(result.data);

                if (result.data > 0) {
                    this.setShowAllPrintformsForInvoice();
                } else {
                    form.findField('show_all_printforms_with_invoice_type').disable();
                }
            }
        });
    }
    , setShowAllPrintformsForInvoice: function () {
        var form = this.getMainPanel().getActiveTab().getForm();

        Ext4.Ajax.request({
            url: 'ajax_administration.php'
            , scope: this
            , params: {
                cmd: 'get_all_access_param'
                , name: 'show_all_printforms_with_invoice_type'
            }
            , success: function(r) {
                var result = Ext4.decode(r.responseText);
                form.findField('show_all_printforms_with_invoice_type').enable();
                form.findField('show_all_printforms_with_invoice_type').setValue(result.data);
            }
        });
    }
    , setAccessData: function(type) {
        Ext4.Ajax.request({
            url: 'ajax_administration.php'
            , scope: this
            , params: {
                cmd: 'get_access_settings'
                , type: type
            }
            , success: function(r) {
                var result = Ext4.decode(r.responseText)
                    , form = this.getMainPanel().getActiveTab().getForm();

                form.findField(type).setValue(result.data);
            }
        });
    }
    , setLoadValue: function(combo, paramName, value) {
        var params = {};
        params[paramName] = value;

        combo.getStore().suspendEvents();
        combo.getStore().load({
            params: params
            , callback: function() {
                combo.getStore().resumeEvents();
                combo.setValue(value);

                if (combo.getStore().find(combo.valueField, combo.value) < 0) {
                    combo.clearValue();
                }
            }
            , scope: this
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