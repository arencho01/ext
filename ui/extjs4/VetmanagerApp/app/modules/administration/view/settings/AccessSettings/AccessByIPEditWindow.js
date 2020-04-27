Ext4.define('VetmanagerApp.modules.administration.view.settings.AccessSettings.AccessByIPEditWindow', {
    extend: 'Ext4.Window',
    xtype: 'accesssettings-accessbyip-editwindow',
    buttonAlign: 'center',
    initComponent: function() {
        var me = this,
            values = {
                id: 0,
                ip_address: _CURRENT_USER_IP || '*.*.*.*',
                allow_type: 'denied',
                is_active: false,
                clinic_id: '0'
            };

        values = Ext.apply(values, me.rec ? me.rec.data : {});

        me.items = me.buildItems(values);

        me.buttons = me.buildButtons();

        me.callParent();

        if (me.rec) {
            me.setTitle(LS.__translate(LS.EditAnEntry));
        } else {
            me.setTitle(LS.__translate(LS.AddAnEntry));
        }

        me.setValues(me.rec ? me.rec.data : false);
    },
    buildItems: function (values) {
        var me = this;

        return [
            {
                xtype: 'form',
                border: false,
                padding: 5,
                frame: true,
                items: [
                    {
                        xtype: 'hidden',
                        name: 'id',
                        value: values.id
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: LS.__translate(LS.IPAddress),
                        name: 'ip_address',
                        value: values.ip_address,
                        validator: function (val) {
                            var valid = false;
                            if (Ext4.isString(val)) {
                                valid = /(^([\d]{1,3}|\*)\.([\d]{1,3}|\*)\.([\d]{1,3}|\*)\.([\d]{1,3}|\*)$)/g.test(val);
                            }

                            return valid || "Маска IP адреса введена неправильно. " +
                                "Маска должна состоять из 4-х групп, раделенных точками, содержащими числа (0-255) или символ '*'" +
                                "<br />Пример - 192.168.1.1, 192.168.*.*, *.*.*.*";
                        }
                    },
                    {
                        xtype: 'combo',
                        queryMode: 'local',
                        fieldLabel: LS.__translate(LS.Access),
                        valueField: 'value',
                        displayField: 'title',
                        value: values.allow_type,
                        name: 'allow_type',
                        editable: false,
                        store: Ext.create('Ext.data.Store', {
                            fields: ['value', 'title'],
                            data : [
                                {value: 'allow', title: LS.__translate(LS.Allow)},
                                {value: 'denied', title: LS.__translate(LS.Denied)}
                            ]
                        })
                    },
                    {
                        xtype: 'clinic-combobox',
                        withAllItem: true,
                        name: 'clinic_id',
                        value: values.clinic_id,
                        editable: false
                    },
                    {
                        xtype: 'checkbox',
                        fieldLabel: LS.__translate(LS.Active),
                        checked: !!values.is_active,
                        name: 'is_active'
                    }
                ]
            }
        ];
    },
    buildButtons: function() {
        var me = this;

        return [
            {
                text: LS.__translate(LS.Add),
                scope: me,
                handler: me.saveClick
            },
            {
                text: LS.__translate(LS.Cancel),
                scope: me,
                handler: me.cancelClick
            }
        ]
    },
    setValues: function(data) {

    },
    saveClick: function() {
        var me = this,
            form = me.items.get(0).getForm(),
            values = form.getFieldValues();
        if (values.id == '0') {
            values.id = Ext4.id();
        }

        if (_CURRENT_USER_IP == values.ip_address && values.allow_type == 'denied' && values.is_active) {
            Ext3.MsgManager.alertError('Ошибка', 'Нельзя блокировать себя');
            return;
        }

        if (form.isValid()) {
            me.fireEvent('change', me, values);
            me.close();
        }
    },
    cancelClick: function() {
        var me = this;
        me.fireEvent('change', me, null);
        me.close();
    }
});