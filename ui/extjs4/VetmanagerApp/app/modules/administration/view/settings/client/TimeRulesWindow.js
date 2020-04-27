Ext4.define('VetmanagerApp.modules.administration.view.settings.client.TimeRulesWindow', {
    extend: 'Ext4.Window',
    xtype: 'client-time-rules-editor-window',
    width: 420,
    layout: 'fit',
    modal:true,
    defaultAdmission: null,
    hideAdmissionCombo: false,
    buttonAlign: 'center',
    gridStore: null,
    rec: null,
    resizable: false,
    initComponent: function() {
        var me = this;
        me.items = me.buildItems();
        me.height = me.hideAdmissionCombo ? 285 : 330;
        me.buttons = me.buildButtons();
        me.callParent(me);

        if (me.rec) {
            me.setValues(Ext.apply({}, me.rec.data));
        }
    },
    buildItems: function() {
        var me = this,
            items;

        items = [
            {
                xtype: 'form',
                padding: 10,
                defaults: {
                    labelWidth: 170,
                    anchor: '100%'
                },
                frame: true,
                items: [
                    {
                        xtype: 'hidden',
                        name: 'id',
                        value: 0
                    },
                    {
                        xtype: 'combo',
                        allowBlank: false,
                        fieldLabel: LS.__translate(LS.purposeOfAdmission) + '*',
                        editable: false,
                        name: 'admission_type_id',
                        queryMode: 'local',
                        store: 'VetmanagerApp.modules.administration.store.settings.medcards.MeetReasons',
                        valueField: 'value',
                        displayField: 'title',
                        valueNotFoundText: '',
                        value: me.defaultAdmission,
                        disabled: me.hideAdmissionCombo,
                        hidden: me.hideAdmissionCombo,
                        listeners: {
                            select: function(cb) {
                                if (me.isExistsAdmision()) {
                                    cb.markInvalid();
                                    Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.PleaseEnterAUniqueAndAdmissionType));
                                }
                            }
                        },
                        validator: function() {
                            if (me.isExistsAdmision()) {
                                return LS.__translate(LS.PleaseEnterAUniqueAndAdmissionType);
                            } else {
                                return true;
                            }
                        }
                    },
                    {
                        height: me.hideAdmissionCombo ? 0 : 20,
                        xtype: 'displayfield',
                        hidden: me.hideAdmissionCombo,
                        border: false
                    },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: LS.__translate(LS.NormalState),
                        layout: 'hbox',
                        name: 'time_1_fieldset',
                        labelWidth: 100,
                        items: [
                            {
                                xtype: 'displayfield',
                                value: '<div style="font-size: 16px;">' + LS.__translate(LS.From) + '</div>',
                                width: 25
                            },
                            {
                                xtype: 'numberfield',
                                allowBlank: false,
                                allowNegative: false,
                                name: 'time_1_from',
                                readOnly: true,
                                width: 60,
                                value: 0,
                                listeners: {
                                    blur: me.changeTimeField,
                                    spin: {
                                        fn: me.changeTimeField,
                                        scope: me,
                                        delay: 1
                                    },
                                    scope: me
                                }
                            },
                            {
                                xtype: 'displayfield',
                                value: '<div style="font-size: 16px;text-align: center;">' + LS.__translate(LS.do) + '</div>',
                                width: 30
                            },
                            {
                                xtype: 'numberfield',
                                allowBlank: false,
                                allowNegative: false,
                                name: 'time_1',
                                width: 80,
                                value: 10,
                                maxValue: 9999,
                                minValue: 0,
                                listeners: {
                                    blur: me.changeTimeField,
                                    spin: {
                                        fn: me.changeTimeField,
                                        scope: me,
                                        delay: 1
                                    },
                                    scope: me
                                }
                            },
                            {
                                xtype: 'displayfield',
                                value: '<div style="font-size: 16px;text-align: center;">' + ' (' + LS.__translate(LS.Mins) + '.)'+ '</div>',
                                width: 50
                            },
                            {
                                xtype: 'displayfield',
                                width: 23
                            },
                            {
                                xtype: 'checkbox',
                                checked: true,
                                name: 'time_1_enabled',
                                listeners: {
                                    change: me.changeTimeField,
                                    scope: me
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: LS.__translate(LS.WarningState),
                        layout: 'hbox',
                        labelWidth: 100,
                        name: 'time_2_fieldset',
                        items: [
                            {
                                xtype: 'displayfield',
                                value: '<div style="font-size: 16px;">' + LS.__translate(LS.From) + '</div>',
                                width: 25
                            },
                            {
                                xtype: 'numberfield',
                                allowBlank: false,
                                allowNegative: false,
                                name: 'time_2_from',
                                readOnly: true,
                                width: 60,
                                value: 10,
                                listeners: {
                                    blur: me.changeTimeField,
                                    spin: {
                                        fn: me.changeTimeField,
                                        scope: me,
                                        delay: 1
                                    },
                                    scope: me
                                }
                            },
                            {
                                xtype: 'displayfield',
                                value: '<div style="font-size: 16px;text-align: center;">' + LS.__translate(LS.do) + '</div>',
                                width: 30
                            },
                            {
                                xtype: 'numberfield',
                                allowBlank: false,
                                allowNegative: false,
                                name: 'time_2',
                                width: 80,
                                value: 11,
                                maxValue: 9999,
                                minValue: 0,
                                listeners: {
                                    blur: me.changeTimeField,
                                    spin: {
                                        fn: me.changeTimeField,
                                        scope: me,
                                        delay: 1
                                    },
                                    scope: me
                                }
                            },
                            {
                                xtype: 'displayfield',
                                value: '<div style="font-size: 16px;text-align: center;">' + ' (' + LS.__translate(LS.Mins) + '.)'+ '</div>',
                                width: 50
                            },
                            {
                                xtype: 'displayfield',
                                width: 23
                            },
                            {
                                xtype: 'checkbox',
                                checked: true,
                                name: 'time_2_enabled',
                                listeners: {
                                    change: me.changeTimeField,
                                    scope: me
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: LS.__translate(LS.CriticalState),
                        layout: 'hbox',
                        labelWidth: 100,
                        name: 'time_3_fieldset',
                        items: [
                            {
                                xtype: 'displayfield',
                                value: '<div style="font-size: 16px;">' + LS.__translate(LS.From) + '</div>',
                                width: 25
                            },
                            {
                                xtype: 'numberfield',
                                allowBlank: false,
                                allowNegative: false,
                                name: 'time_3_from',
                                readOnly: true,
                                width: 60,
                                value: 11,
                                listeners: {
                                    blur: me.changeTimeField,
                                    spin: {
                                        fn: me.changeTimeField,
                                        scope: me,
                                        delay: 1
                                    },
                                    scope: me
                                }
                            },
                            {
                                xtype: 'displayfield',
                                value: '<div style="font-size: 16px;text-align: center;">' + LS.__translate(LS.do) + '</div>',
                                width: 30
                            },
                            {
                                xtype: 'numberfield',
                                allowBlank: false,
                                allowNegative: false,
                                name: 'time_3',
                                width: 80,
                                value: 12,
                                maxValue: 9999,
                                minValue: 0,
                                listeners: {
                                    blur: me.changeTimeField,
                                    spin: {
                                        fn: me.changeTimeField,
                                        scope: me,
                                        delay: 1
                                    },
                                    scope: me
                                }
                            },
                            {
                                xtype: 'displayfield',
                                value: '<div style="font-size: 16px;text-align: center;">' + ' (' + LS.__translate(LS.Mins) + '.)'+ '</div>',
                                width: 50
                            },
                            {
                                xtype: 'displayfield',
                                width: 23
                            },
                            {
                                xtype: 'checkbox',
                                checked: true,
                                name: 'time_3_enabled',
                                listeners: {
                                    change: me.changeTimeField,
                                    scope: me
                                }
                            }
                        ]
                    },
                    {
                        height: 20,
                        xtype: 'displayfield'
                    },
                    {
                        height: 30,
                        xtype: 'displayfield',
                        tpl: me.getTimesPicTemplate(),
                        name: 'times_graph',
                        ref: 'times_graph',
                        data: {
                            time_1: 10,
                            time_1_enabled: true,
                            time_2: 15,
                            time_2_enabled: true,
                            time_3: 20,
                            time_3_enabled: true
                        }
                    }
                ]
            }
        ];

        return items;
    },
    buildButtons: function() {
        var me = this,
            buttons;

        buttons = [
            {
                text: LS.__translate(LS.Save),
                handler: function() {
                    var form = me.getForm();

                    if (form.isValid()) {
                        var realValues = form.getFieldValues(),
                            values = {};

                        for (var n in realValues) {
                            if (realValues.hasOwnProperty(n)) {
                                if (n.indexOf('displayfield') < 0 && n != 'times_graph') {
                                    values[n] = realValues[n];
                                }
                            }
                        }

                        Ext.Ajax.request({
                            url: 'ajax_administration.php',
                            params: {
                                values: Ext.encode(values),
                                cmd: 'edit_client_time_rules'
                            },
                            success: function() {
                                me.close();
                                me.gridStore.load();
                                me.fireEvent('save', me, values);
                            }
                        });
                    }
                }
            },
            {
                text: LS.__translate(LS.Close),
                handler: function() {
                    me.close();
                }
            }
        ];

        return buttons;
    },
    isExistsAdmision: function() {
        var me = this,
            exists = false,
            form = me.getForm(),
            admission = form.findField('admission_type_id').getValue(),
            id = form.findField('id').getValue();

        me.gridStore.each(function(rec) {
            if (rec.get('id') != id && rec.get('admission_type_id') == admission) {
                exists = true;
                return false;
            }
        });

        return exists;
    },
    getSiblingField: function(no, dir) {
        var me = this,
            form = me.getForm(),
            needNo = no + (dir == 'next' ? 1 : -1);

        if (no == 1 && dir === 'prev' || no == 3 && dir === 'next') {
            return null;
        }

        if (form.findField('time_' + needNo + '_enabled').checked) {
            return form.findField('time_' + needNo);
        } else {
            return me.getSiblingField(needNo, dir);
        }
    },
    changeTimeField: function(fld) {
        var me = this,
            form = me.getForm(),
            no = parseInt(fld.name.split('_')[1]),
            prevFld, nextFld, nextFromFld;

        if (fld.name.indexOf('enabled') > 0) {
            if(!fld.checked) {
                prevFld = me.getSiblingField(no, 'prev');
                nextFld = me.getSiblingField(no, 'next');

                form.findField('time_' + no).setValue(0);
                form.findField('time_' + no + '_from').setValue(0);

                if (nextFld) {
                    nextFromFld = form.findField(nextFld.name + '_from');
                    nextFromFld.setValue(prevFld ? prevFld.getValue() : 0);
                }
            } else {
                prevFld = me.getSiblingField(no, 'prev');
                if (prevFld) {
                    form.findField('time_' + no).setValue(prevFld.getValue());
                    form.findField('time_' + no + '_from').setValue(prevFld.getValue());
                }
            }
        } else if (fld.name.indexOf('from') < 0) {
            var value = fld.getValue(),
                fromFld = form.findField(fld.name + '_from'),
                fromValue = fromFld.getValue();

            if (fromValue > value) {
                fromFld.setValue(value);
                fromValue = value;
            }

            prevFld = me.getSiblingField(no, 'prev');
            nextFld = me.getSiblingField(no, 'next');
            if (nextFld) {
                nextFromFld = form.findField(nextFld.name + '_from');
            }

            if (prevFld && prevFld.getValue() > value) {
                prevFld.setValue(fromValue);
                me.changeTimeField(prevFld);
            }
            if (nextFromFld) {
                nextFromFld.setValue(value);
            }
            if (nextFld && nextFld.getValue() < value) {
                nextFld.setValue(value);
                me.changeTimeField(nextFld);
            }
        }

        me.updateDisabledTimes();
        me.updateTimesGraph();
    },
    getTimesPicTemplate: function() {
        var me = this, tpl;

        tpl = new Ext4.XTemplate(
            '<div class="times-rule-container">' +
            '   <span' +
            '       class="times-rule-limit-text times-rule-limit-text-first"' +
            '       style="left: 0px;">' +
            '           0' +
            '   </span>' +
            '   <div' +
            '       class="times-rule-item times-rule-item-normal"' +
            '       style="' +
            '           width:{[this.getWidth(values, \'1\')]}%;' +
            '           display: {[this.isVisible(values, \'1\') ? \'block\' : \'none\']};' +
            '       ">' +
            '       {time_1}' +
            '   </div>' +
            '   <span' +
            '       class="times-rule-limit-text times-rule-limit-text-middle"' +
            '       style="display: {[this.isVisible(values, \'1\') ? \'normal\' : \'none\']};' +
            '           {[this.getAlign(values, \'1\')]}:{[this.getLeft(values, \'1\')]}%;' +
            '           text-align: {[this.getTextAlign(values, \'1\')]};">' +
            '           {time_1_length}' +
            '   </span>' +
            '   <div' +
            '       class="times-rule-item times-rule-item-warning"' +
            '       style="' +
            '           width:{[this.getWidth(values, \'2\')]}%;' +
            '           display: {[this.isVisible(values, \'2\') ? \'block\' : \'none\']};' +
            '       ">' +
            '           {time_2_length}' +
            '   </div>' +
            '   <span' +
            '       class="times-rule-limit-text times-rule-limit-text-middle"' +
            '       style="display: {[this.isVisible(values, \'2\') ? \'normal\' : \'none\']};' +
            '           {[this.getAlign(values, \'2\')]}:{[this.getLeft(values, \'2\')]}%;' +
            '           text-align: {[this.getTextAlign(values, \'2\')]};">' +
            '           {time_2}' +
            '   </span>' +
            '   <div' +
            '       class="times-rule-item times-rule-item-critical"' +
            '       style="' +
            '           width:{[this.getWidth(values, \'3\')]}%;' +
            '           display: {[this.isVisible(values, \'3\') ? \'block\' : \'none\']};' +
            '       ">' +
            '           {time_3_length}' +
            '   </div>' +
            '   <span' +
            '       class="times-rule-limit-text times-rule-limit-text-last"' +
            '       style="right: 0px; display: {[this.isVisible(values, \'3\') ? \'normal\' : \'none\']};">' +
            '           {time_3}' +
            '   </span>' +
            '</div>',
            {
                widths: undefined,
                getWidths: function(values) {
                    var widths = {};
                    var barsCount = 0;
                    if (values.time_1_enabled) { barsCount++; }
                    if (values.time_2_enabled) { barsCount++; }
                    if (values.time_3_enabled) { barsCount++; }
                    if (barsCount) {
                        widths['1'] = values.time_1_enabled ? Math.round(100000 / barsCount) / 1000 : 0;
                        widths['2'] = values.time_2_enabled ? Math.round(100000 / barsCount) / 1000 : 0;
                        widths['3'] = values.time_3_enabled ? Math.round(100000 / barsCount) / 1000 : 0;
                    }
                    return widths;
                },
                getWidth: function(values, typeNo) {
                    var widths = this.getWidths(values);
                    return widths[typeNo];
                },
                getLeft: function(values, typeNo) {
                    var left = 0, widths = this.getWidths(values);
                    for (var i = 1; i <= 3; i++) {
                        if (i <= typeNo) {
                            left += parseInt(widths[i]);
                        }
                    }
                    if (left == 100) {
                        return 0;
                    } else {
                        return left;
                    }
                },
                getAlign: function(values, typeNo) {
                    var left = 0, widths = this.getWidths(values);
                    for (var i = 1; i <= 3; i++) {
                        if (i <= typeNo) {
                            left += parseInt(widths[i]);
                        }
                    }
                    if (left == 100) {

                        return 'right';
                    } else {
                        return 'left';
                    }
                },
                getTextAlign: function(values, typeNo) {
                    return this.getAlign(values, typeNo) == 'left' ? 'center' : 'right';
                },
                isVisible: function(values, typeNo) {
                    var widths = this.getWidths(values);
                    return widths[typeNo] > 0;
                }
            }
        );

        return tpl;
    },
    updateTimesGraph: function() {
        var me = this,
            form = me.getForm(),
            fld = form.findField('times_graph'),
            data = Ext.apply({}, form.getFieldValues());

        if (!fld.rendered) {
            fld.on('render', me.updateTimesGraph, me, {delay: 50});
        } else {
            data.time_1 = data.time_1_enabled ? data.time_1 : 0;
            data.time_2 = data.time_2_enabled ? data.time_2 : data.time_1;
            data.time_3 = data.time_3_enabled ? data.time_3 : 0;
            data.time_1_length = data.time_1;
            data.time_2_length = data.time_2 - data.time_1;
            data.time_3_length = data.time_3 - data.time_2;
            fld.update(data);
        }
    },
    updateDisabledTimes: function() {
        var me = this,
            values = me.getForm().getFieldValues(),
            fs;

        for (var i = 1; i <= 3; i++) {
            fs = me.getFieldset(i);
            fs.items.each(function(item) {
                if (item.xtype === 'checkbox') {
                    item.enable();
                } else {
                    item.setDisabled(!values['time_' + i + '_enabled']);
                }
            });
        }
    },
    getForm: function() {
        var me = this;
        return me.items.get(0).getForm();
    },
    getFieldset: function(no) {
        var me = this,
            formPanel = me.items.get(0);

        return formPanel.items.findBy(function(item) {
            return item.name == 'time_' + no + '_fieldset';
        });
    },
    setValues: function(values) {
        var me = this,
            formPanel = me.items.get(0),
            form = me.getForm(),
            fld, minValue = 0, maxValue = 0;

        if (!formPanel.rendered) {
            formPanel.on('render', function() {
                me.setValues(values);
            }, me, {
                delay: 50
            });
        } else {
            if (!values.time_1_enabled) {
                values.time_1 = 0;
                values.time_1_from = 0;
            }

            if (values.time_2_enabled) {
                values.time_2_from = values.time_1;
            } else {
                values.time_2 = 0;
                values.time_2_from = 0;
            }

            if (values.time_3_enabled) {
                if (values.time_2_enabled) {
                    values.time_3_from = values.time_2;
                } else {
                    values.time_3_from = values.time_1;
                }
            } else {
                values.time_3 = 0;
                values.time_3_from = 0;
            }

            form.setValues(values);

            me.updateTimesGraph();
            me.updateDisabledTimes();
        }
    }
});