Ext4.define('VetmanagerApp.modules.administration.controller.settings.MobileSettings', {
    extend: 'Ext4.app.Controller'
    , views: [
        'VetmanagerApp.modules.administration.view.settings.MobileSettings'
    ]
    , refs: [
        {
            ref: 'mainPanel'
            , selector: 'mobilesettings'
            , autoCreate: true
            , xtype: 'mobilesettings'
        }
        , {
            ref: 'userRulesPanelForm'
            , selector: 'mobilesettings component[name="user-rule-form"]'
            , autoCreate: true
        }
        , {
            ref: 'rulesPanelForm'
            , selector: 'mobilesettings component[name="rule-form"]'
            , autoCreate: true
        }
        , {
            ref: 'rulesPanelGrid'
            , selector: 'mobilesettings component[name="notification_grid"]'
            , autoCreate: true
        }
        , {
            ref: 'mainRulesPanel'
            , selector: 'mobilesettings component[name="main_rules_panel"]'
            , autoCreate: true
        }
    ]
    , init: function() {
        var obj = {};

        if (!this.isEventExists('click', 'mobilesettings button[action="add_notification"]')) {
            obj['mobilesettings button[action="add_notification"]'] = {click: this.onAddNotification};
        }
        if (!this.isEventExists('click', 'mobilesettings button[action="delete_notification"]')) {
            obj['mobilesettings button[action="delete_notification"]'] = {click: this.onDeleteNotification};
        }
        if (!this.isEventExists('select', 'mobile-notify-rule-type-combo-field')) {
            obj['mobile-notify-rule-type-combo-field'] = {select: this.onRuleTypeComboSelect};
        }
        if (!this.isEventExists('click', 'mobilesettings button[action="save_notification"]')) {
            obj['mobilesettings button[action="save_notification"]'] = {click: this.onSave};
        }
        if (!this.isEventExists('click', 'mobilesettings component[action="add_rule_fieldset"]')) {
            obj['mobilesettings component[action="add_rule_fieldset"]'] = {click: this.onAddNewRuleExpression};
        }
        if (!this.isEventExists('click', 'mobilesettings component[action="add_user_rule_fieldset"]')) {
            obj['mobilesettings component[action="add_user_rule_fieldset"]'] = {click: this.onAddNewUserRuleExpression};
        }

        if (!this.isEventExists('itemclick', 'mobilesettings component[name="notification_grid"]')) {
            obj['mobilesettings component[name="notification_grid"]'] = {itemclick: this.onEditNotification};
        }

        this.control(obj);
    }
    , isEventExists: function(eventName, selector) {
        if (this.application.eventbus.bus[eventName] != null
            && this.application.eventbus.bus[eventName][selector] != null) {
            return true;
        }

        return false;
    }
    , onAddNotification: function() {
        this.removeFieldsets();
        this.getMainRulesPanel().show();
        this.getMainRulesPanel().getForm().reset();
    }
    , onDeleteNotification: function() {
        var grid = this.getRulesPanelGrid()
            , sm = grid.getSelectionModel();

        if (sm.hasSelection()) {
            Ext4.MessageBox.confirm(
                LS.__translate(LS.Removal)
                , LS.__translate(LS.AreYouSureYouWantToDeleteTheNotification)
                , function(btn) {
                    if ('yes' === btn) {
                        Ext4.Ajax.request({
                            url: 'ajax_mobile_notifications.php'
                            , scope: this
                            , params: {
                                cmd: 'delete_notification'
                                , id: sm.getSelection()[0].get('id')*1
                            }
                            , success: function(r) {
                                var data = Ext.decode(r.responseText);

                                if (!data.is_error) {
                                    Ext3.MsgManager.alert(LS.__translate(LS.Attention), 'Уведомление удалено');
                                    this.getRulesPanelGrid().getStore().reload();
                                } else {
                                    Ext3.MsgManager.alertError(LS.__translate(LS.Error), 'Ошибка удаления');
                                }
                            }
                        });
                    }
                }
                , this
            );
        }
    }
    , removeFieldsets: function() {
        var rulesForm = this.getRulesPanelForm()
            , sets = rulesForm.query('fieldset')
            , usersForm = this.getUserRulesPanelForm()
            , userSets = usersForm.query('fieldset');

        Ext3.each(sets, function(row) {
             rulesForm.remove(row);
        }, this);

        Ext3.each(userSets, function(row) {
             usersForm.remove(row);
        }, this);
    }
    , onEditNotification: function() {
        this.removeFieldsets();
        this.getMainRulesPanel().show();
        this.getMainRulesPanel().getForm().reset();

        var grid = this.getRulesPanelGrid()
            , sm = grid.getSelectionModel();

        if (sm.hasSelection()) {
            var data = sm.getSelection()[0].data
                , frm = this.getMainRulesPanel().getForm();

            data.cmd = 'edit_rule';

            frm.setValues(data);
            var rules =  Ext.decode(data.admission_rules);
            var panelName = 'getRulesPanelForm';
            var addFieldsFn = function(row) {
                var fldset = this.addRuleFieldSet(panelName)
                    , expressionCombo = fldset.items.getAt(0)
                    , combo = fldset.items.getAt(1);

                if (row.expression) {
                    expressionCombo.setValue(row.expression);
                }

                combo.setValue(row.name);

                if ('button' != combo.up('fieldset').items.getAt(2).xtype) {
                    combo.up('fieldset').remove(combo.up('fieldset').items.getAt(2));
                }

                if (row.type == 'combobox') {
                    combo.up('fieldset').insert(2, this.getRuleCombo(combo.up('fieldset').subname, combo.up('fieldset').index, row.cmd));
                } else if (row.type == 'timefield') {
                    combo.up('fieldset').insert(2, this.getTimeField(combo.up('fieldset').subname, combo.up('fieldset').index));
                } else if (row.type == 'checkbox') {
                    combo.up('fieldset').insert(2, this.getCheckboxField(combo.up('fieldset').subname, combo.up('fieldset').index, true));
                }

                var value = fldset.items.getAt(2);

                if (value && row.type != null) {
                    if (Ext3.inArray(['checkbox','timefield'], row.type)) {
                        value.setValue(row.value);
                    } else {
                        this.setLoadValue(value, 'id', row.value);
                    }
                }
            };

            Ext.each(rules, addFieldsFn, this);

            rules =  Ext.decode(data.user_rules);
            panelName = 'getUserRulesPanelForm';
            Ext.each(rules, addFieldsFn, this);

            this.getMainRulesPanel().show();
        }
    }
    , onAddNewRuleExpression: function() {
        this.addRuleFieldSet('getRulesPanelForm');
    }
    , onAddNewUserRuleExpression: function() {
        this.addRuleFieldSet('getUserRulesPanelForm');
    }
    , addRuleFieldSet: function(name) {
        var fieldSet = this.getMainPanel().getNewRuleFieldSet(this[name].call(this).query('fieldset').length, name);

        this[name].call(this).add(fieldSet);
        return fieldSet;
    }
    , onRuleTypeComboSelect: function(combo, records, eOpts) {
        var record = records[0];

        if ('button' != combo.up('fieldset').items.getAt(2).xtype) {
            combo.up('fieldset').remove(combo.up('fieldset').items.getAt(2));
        }

        if (record.get('type') == 'combobox') {
            combo.up('fieldset').insert(2, this.getRuleCombo(combo.up('fieldset').subname, combo.up('fieldset').index, record.get('cmd')));
        } else if (record.get('type') == 'timefield') {
            combo.up('fieldset').insert(2, this.getTimeField(combo.up('fieldset').subname, combo.up('fieldset').index));
        } else if (record.get('type') == 'checkbox') {
            combo.up('fieldset').insert(2, this.getCheckboxField(combo.up('fieldset').subname, combo.up('fieldset').index, true));
        }
    }
    , onSave: function(btn) {
        var form = this.getMainRulesPanel().getForm()
            , values = form.getFieldValues()
            , params = {
                cmd: values.cmd
                , status: values.status
                , title: values.title
                , id: values.id
                , admission_rules: []
                , user_rules: []
            };

        if (!form.isValid()) {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.YouMustFillInAllFields));
            return;
        }

        delete values.cmd;
        delete values.status;
        delete values.title;
        delete values.id;

        var subdata = {}, curindex = 0;

        for(var k in values) {
            if (k.indexOf('-user') == -1) {
                var index = k.substring(k.indexOf('[')+1, k.indexOf(']'));

                if (index != curindex && (Ext.encode(subdata) != Ext.encode({}))) {
                    params.admission_rules.push(subdata);
                    curindex = index;
                    subdata = {};
                }

                if (k.indexOf('mobile-expression-and-or') != -1 && curindex > 0) {
                    subdata['expression'] = values[k];
                }
                if (k.indexOf('mobile-rule-type') != -1) {
                    var fld = form.findField(k)
                        , store = fld.getStore()
                        , i = store.find('value', fld.getValue())
                        , cmd = store.getAt(i).get('cmd');

                    if (cmd != '') {
                        subdata['cmd'] = cmd;
                    }

                    subdata['name'] = values[k];
                }
                if (k.indexOf('value') != -1) {
                    subdata['type'] = form.findField(k).type;
                    subdata['index'] = index;
                    subdata['value'] = values[k];
                }
            }
        }

        if (Ext.encode(subdata) != Ext.encode({})) {
            params.admission_rules.push(subdata);
        }

        params.admission_rules = Ext.encode(params.admission_rules);
        subdata = {}, curindex = 0;

        for(var k in values) {
            if (k.indexOf('-user') >= 0) {
                var index = k.substring(k.indexOf('[')+1, k.indexOf(']'));

                if (index != curindex && (Ext.encode(subdata) != Ext.encode({}))) {
                    params.user_rules.push(subdata);
                    curindex = index;
                    subdata = {};
                }

                if (k.indexOf('mobile-user-expression-and-or') != -1 && curindex > 0) {
                    subdata['expression'] = values[k];
                }
                if (k.indexOf('mobile-user-rule-type') != -1) {
                    var fld = form.findField(k)
                        , store = fld.getStore()
                        , i = store.find('value', fld.getValue())
                        , cmd = store.getAt(i).get('cmd');

                    if (cmd != '') {
                        subdata['cmd'] = cmd;
                    }

                    subdata['name'] = values[k];
                }
                if (k.indexOf('value') != -1) {
                    subdata['type'] = form.findField(k).type;
                    subdata['index'] = index;
                    subdata['value'] = values[k];
                }
            }
        }

        if (Ext.encode(subdata) != Ext.encode({})) {
            params.user_rules.push(subdata);
        } else {
            Ext3.MsgManager.alertError(LS.__translate(LS.Error), 'Необходимо заполнить правила для пользователей');
            return;
        }

        params.user_rules = Ext.encode(params.user_rules);

        Ext4.Ajax.request({
            url: 'ajax_mobile_notifications.php'
            , scope: this
            , params: {
                cmd: params.cmd
                , params: Ext.encode(params)
            }
            , success: function(r) {
                var data = Ext.decode(r.responseText);

                if (!data.is_error && data.id > 0) {
                    Ext3.MsgManager.alert(LS.__translate(LS.Attention), 'Уведомление добавлено');
                    this.getRulesPanelGrid().getStore().reload();
                } else {
                    Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.AddingError));
                }
            }
        });
    }
    , getRuleCombo: function(subname, index, cmd) {
        return Ext4.create('Ext.form.field.ComboBox', {
            name: 'value'+subname+'[' + index + ']'
            , fieldLabel: LS.__translate(LS.Value)
            , type: 'combobox'
            , pageSize: 15
            , labelWidth: 100
            , displayTpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">'
                    , '{[this.getClearTitle(values.title)]}'
                , '</tpl>'
                , {
                    disableFormats: true
                    , getClearTitle: function(title) {
                        return title.replace('<b>', '').replace('</b>', '');
                    }
                }
            )
            , store: Ext.create('Ext.data.Store', {
                fields: [
                    {name: 'id'}
                    , {name: 'title'}
                ]
                , pageSize: 15
                , proxy: {
                    type: 'ajax'
                    , url: 'ajax_mobile_notifications.php'
                    , extraParams: {
                        cmd: cmd
                    }
                    , reader: {
                        type: 'json'
                        , root: 'data'
                    }
                }
            })
            , displayField: 'title'
            , valueField: 'id'
            , ruleTypeFields: []
            , allowBlank: false
            , queryMode: 'remote'
            , triggerAction: 'all'
            , minChars: 1
            , forceSelection: true
        });
    }
    , getTimeField: function(subname, index) {
        return Ext4.create('Ext.form.field.ComboBox', {
            name: 'value'+subname+'[' + index + ']'
            , fieldLabel: LS.__translate(LS.Value)
            , type: 'timefield'
            , displayField: 'title'
            , valueField: 'value'
            , allowBlank: false
            , forceSelection: true
            , labelWidth: 100
            , store: Ext.create('Ext.data.Store', {
                fields: [
                    {type: 'string', name: 'value'}
                    , {type: 'string', name: 'title'}
                ]
                , data: [
                    {value: 5, title: '5 мин.'}
                    , {value: 10, title: '10 мин.'}
                    , {value: 15, title: '15 мин.'}
                    , {value: 30, title: '30 мин.'}
                    , {value: 60, title: '60 мин.'}
                ]
            })
        });
    }
    , getCheckboxField: function(subname, index, checked) {
        return Ext4.create('Ext.form.field.Hidden', {
            name: 'value'+subname+'[' + index + ']'
            , type: 'checkbox'
            , value: checked
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
});