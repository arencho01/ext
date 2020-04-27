Ext4.define('VetmanagerApp.modules.extfilter.controller.ExtFilter', {
    extend: 'Ext.app.Controller'
    , views: [
        'VetmanagerApp.modules.extfilter.view.ExtFilter'
        , 'VetmanagerApp.modules.extfilter.view.ExtFilterItem'
        , 'VetmanagerApp.modules.extfilter.view.ExtFilterSubItem'
    ]
    , models: [
        'VetmanagerApp.modules.extfilter.model.ExtFilterField'
        , 'VetmanagerApp.modules.extfilter.model.ExtFilterOperator'
        , 'VetmanagerApp.modules.extfilter.model.ExtFilterEnum'
        , 'VetmanagerApp.modules.extfilter.model.ExtFilterRefFieldValue'
    ]
    , stores: [
        'VetmanagerApp.modules.extfilter.store.ExtFilterModules'
        , 'VetmanagerApp.modules.extfilter.store.ConditionValues'
        , 'VetmanagerApp.modules.extfilter.store.ExtFilterEnums'
        , 'VetmanagerApp.modules.extfilter.store.ExtFilterFields'
        , 'VetmanagerApp.modules.extfilter.store.ExtFilterOperators'
        , 'VetmanagerApp.modules.extfilter.store.ExtFilterYesNoStore'
    ]
    , refs: [
        {
            ref: 'window'
            , selector: 'extfilterdlg'
            , autoCreate: true
            , xtype: 'extfilterdlg'
        }
        , {
            ref: 'itemsPanel'
            , selector: 'extfilterdlg panel[name="extfilteritems"]'
        }
        , {
            ref: 'extFilterItem'
            , selector: 'extfilteritem'
            , forceCreate: true
            , xtype: 'extfilteritem'
        }
        , {
            ref: 'extFilterSubItem'
            , selector: 'extfiltersubitem'
            , forceCreate: true
            , xtype: 'extfiltersubitem'
        }
        , {
            ref: 'patternField'
            , selector: 'extfilterdlg textarea[name="pattern"]'
        }
        , {
            ref: 'bottomPanel'
            , selector: 'extfilterdlg panel[name="bottomPanel"]'
        }
        , {
            ref: 'isDynamicLabel'
            , selector: 'extfilterdlg label[name="isDynamicLabel"]'
        }
        , {
            ref: 'saveButton'
            , selector: 'extfilterdlg button[action="save"]'
        }
    ]
    , mode: 'edit'
    , filterId: 0
    , callerId: ''
    , onlyDynamic: false
    , addedParams: null
    , init: function(){
        this.addEvents('save', 'close');
        this.control({
            'extfilterdlg': {
                close: this.clearAll
            }
            , 'extfilterdlg button[action="addextfilteritem"]': {
                click: function(){
                    this.addExtFilterItem();
                }
            }
            , 'extfilterdlg button[action="save"]': {
                click: this.save
            }
            , 'extfilterdlg button[action="cancel"]': {
                click: this.close
            }
            , 'extfilteritem button[action="deleteextfilteritem"]': {
                click: function(btn){
                    var panel = btn.up('extfilteritem');
                    var items = this.getItems();
                    var index = 0;
                    for (var i = 0; i < items.length; i++){
                        if (items[i] == panel){
                            index = i;
                            break;
                        }
                    }
                    this.deleteExtFilterItem(index);
                }
            }
            , 'extfilteritem combobox[name="field"]': {
                expand: this.expandFieldCombo
            }
            , 'extfilteritem combobox[name="operator"]': {
                expand: this.expandOperatorCombo
            }
            , 'extfiltersubitem combobox[name="condition"]': {
                select: this._updatePattern
            }
        });

       // this.prepareStores.defer(1000, this);
    }
    , getItems: function(){
        return this.getItemsPanel().query('extfilteritem');
    }
    , getSubItems: function(){
        return this.getItemsPanel().query('extfiltersubitem');
    }
    , save: function(){
        var params = {
            pattern: this.getPatternField().getValue()
            , id: this.filterId
            , _cmd: this.mode
            , data: []
        };
        var items = this.getItems();
        var subItems = this.getSubItems();
        var is_error = false;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];

            if ((item.down('[name="module"]').isValid()
                && item.down('[name="field"]').isValid()
                && item.down('[name="operator"]').isValid()
                && item.down('[name="value"]').isValid()) == false) {
                    is_error = true;
            }

            var valueFld = item.down('[name="value"]')
                , value;
            if (Ext4.isFunction(valueFld.getFormatValue)) {
                value = valueFld.getFormatValue();
            } else {
                value = valueFld.getValue();
            }
            var data = {
                number: i + 1
                , module: item.down('[name="module"]').getValue()
                , field: item.down('[name="field"]').getValue()
                , operator: item.down('[name="operator"]').getValue()
                , value: value
                , condition: ''
                , is_dynamic: item.down('[name="is_dynamic"]').getValue()
            };
            if (this.onlyDynamic) {
                data.id = item.down('[name="id"]').getValue();
            }
            if (i > 0 && !this.onlyDynamic){
                data.condition = subItems[i - 1].down('[name="condition"]').getValue();
            }
            if (valueFld.extFieldType == 'ref' && !!data.value) {
                for (var v = 0; v < data.value.length; v++ ) {
                    if (isNaN(parseInt(data.value[v]))) {
                        is_error = true;
                        valueFld.markInvalid();
                        break;
                    }
                }
            }
            params.data.push(data);
        }

        if (is_error) {
            Ext3.MsgManager.alert(LS.__translate(LS.Error), 'Фильтр заполнен неверно');
            return;
        }

        if (this.onlyDynamic) {
            var applyParams = ['apply', this, this.filterId, this.callerId, params];
            if (this.addedParams) {
                for (var n in this.addedParams) {
                    if (this.addedParams.hasOwnProperty(n)) {
                        applyParams.push(this.addedParams[n]);
                    }
                }
            }
            this.fireEvent.apply(this, applyParams);
            this.close();
        } else {
            Ext4.Ajax.request({
                url: 'ajax_ext_filters.php'
                , scope: this
                , params: {cmd: params._cmd, params: Ext.encode(params)}
                , success: function(r) {
                    Common.showErrors(r);

                    var data = Ext.decode(r.responseText);
                    if (!data.is_error){
                        this.filterId = data.id;
                        this.fireEvent('save', this, this.filterId, this.callerId, data);
                        this.close();
                    }
                }
            });
        }
    }
    , close: function() {
        this.clearAll();
        this.getWindow().close();
        this.fireEvent('close', this);
    }
    , addExtFilterItem: function(values, components) {
        values = values || {
            condition: 'and'
            , module: ''
            , field: ''
            , field_type: ''
            , number: ''
            , operator: ''
            , value: ''
            , is_dynamic: false
        };
        values.is_dynamic = values.is_dynamic == 1 ? true : false
        var panel = this.getItemsPanel();
        var item = this.getExtFilterItem();
        var itemsCount = this.getItems().length;
        var lazy = Ext.isArray(components);

        if (lazy) {
            itemsCount += components.length;
        }

        if (itemsCount > 0 && !this.onlyDynamic){
            var subItem = this.getExtFilterSubItem();
            subItem.down('[name="condition"]').setValue(values.condition);

            if (lazy){
                components.push(subItem);
            } else {
                panel.add(subItem);
            }
        }

        var moduleCombo = item.down('[name="module"]'),
            fieldCombo = item.down('[name="field"]'),
            operatorCombo = item.down('[name="operator"]'),
            valueField = item.down('[name="value"]'),
            isDynamicField = item.down('[name="is_dynamic"]'),
            addItemBtn = item.down('[action="deleteextfilteritem"]');

        this._setRelationCombos(moduleCombo, fieldCombo, 'name', 'module');
        this._setRelationCombos(fieldCombo, operatorCombo, 'field_type', 'type');

        operatorCombo.on('change', this._operatorComboChange, this);

        moduleCombo.setValue(values.module);
        valueField.setValue(values.value);
        fieldCombo.setValue(values.field);
        operatorCombo.setValue(values.operator);
        isDynamicField.setValue(values.is_dynamic);

        if (lazy){
            components.push(item);
        } else {
            panel.add(item);
        }
        fieldCombo.on('change', this._fieldComboChange, this);

        moduleCombo.setReadOnly(this.onlyDynamic);
        fieldCombo.setReadOnly(this.onlyDynamic);
        operatorCombo.setReadOnly(this.onlyDynamic);
        isDynamicField.setDisabled(this.onlyDynamic);
        isDynamicField.setVisible(!this.onlyDynamic && this.showIsDynamic);

        if (this.onlyDynamic) {
            if (lazy) {
                item.down('[name="id"]').setValue(parseInt(values.id));
                var fn = function() {
                    this.inputEl.setStyle('background', 'none');
                }
                moduleCombo.on('render', fn);
                fieldCombo.on('render', fn);
                operatorCombo.on('render', fn);
                addItemBtn.disable();
            } else {
                item.down('[name="id"]').setValue(parseInt(values.id));
                moduleCombo.inputEl.setStyle('background', 'none');
                fieldCombo.inputEl.setStyle('background', 'none');
                operatorCombo.inputEl.setStyle('background', 'none');
                addItemBtn.disable();
            }
        }

        if (lazy) {
            return components;
        } else {
            this.getWindow().center();
            this.refreshFilterItems();
        }
    }
    , deleteExtFilterItem: function(index){
        var items = this.getItems();
        if (items.length < index || index < 0){
            return false;
        }
        var item = items[index];
        this.getItemsPanel().remove(item);

        var subItems = this.getSubItems();
        var subIndex = (index == 0) ? 0 : index - 1;
        if (subItems.length >= subIndex){
            var subItem = subItems[subIndex];
            this.getItemsPanel().remove(subItem);
        }
        this.refreshFilterItems();
    }
    , clearExtFilterItems: function(){
        this.getItemsPanel().removeAll();
    }
    , prepareStores: function() {
        var modulesStore = this.getVetmanagerAppModulesExtfilterStoreExtFilterModulesStore();
        var fieldsStore = this.getVetmanagerAppModulesExtfilterStoreExtFilterFieldsStore();
        var enumsStore = this.getVetmanagerAppModulesExtfilterStoreExtFilterEnumsStore();
        var operatorsStore = this.getVetmanagerAppModulesExtfilterStoreExtFilterOperatorsStore();

        modulesStore.clearFilter();
        fieldsStore.clearFilter();
        enumsStore.clearFilter();
        operatorsStore.clearFilter();
        if (!modulesStore.getCount()) {
            modulesStore.load();
        }
        if (!fieldsStore.getCount()) {
            fieldsStore.load();
        }
        if (!enumsStore.getCount()) {
            enumsStore.load();
        }
        if (!operatorsStore.getCount()) {
            operatorsStore.load();
        }
    }
    , showFilter: function(filterId, modules, callerId, cfg, mainWindow){
        this.prepareStores();
        if (cfg) {
            this.onlyDynamic = cfg.onlyDynamic == true;
            this.showIsDynamic = cfg.showIsDynamic == true;
            this.addedParams = cfg.addedParams;
        } else {
            this.showIsDynamic = false;
            this.onlyDynamic = false;
            this.addedParams = {};
        }
        this.callerId = callerId;
        this.modules = Ext.isArray(modules)? modules : [];
        this.filterId = filterId * 1;
        if (this.filterId === 0){
            this.mode = 'add';
        }else{
            this.mode = 'edit';
        }
        var window = this.getWindow();
        this.clearExtFilterItems();

        window.show();

        if (mainWindow && Ext.isObject(mainWindow) && mainWindow.el && Ext.isFunction(mainWindow.el.setZIndex)) {
            mainWindow.setZIndex(window.el.getZIndex() - 25);
        }

        this.getBottomPanel().setVisible(!this.onlyDynamic);
        this.getIsDynamicLabel().setVisible(!this.onlyDynamic && this.showIsDynamic);

        if (this.onlyDynamic) {
            this.getSaveButton().setText(LS.__translate(LS.Accept));
        } else {
            this.getSaveButton().setText(LS.__translate(LS.Save));
        }

        if (this.mode === 'edit'){
            this.load();
        }
    }
    , load: function(){
        // TODO: replace for Ext.direct
        Ext4.Ajax.request({
            url: 'ajax_ext_filters.php'
            , scope: this
            , params: {cmd: 'get', filter_id: this.filterId, only_dynamic: this.onlyDynamic}
            , success: function(r) {
                var data = Ext.decode(r.responseText);
                this.setValues(data.data);
            }
        });
    }
    , setValues: function(values){
        this.filterId = values.id * 1;
        var components = [];
        for (var i = 0; i < values.data.length; i++){
            this.addExtFilterItem(values.data[i], components);
        }
        this.getItemsPanel().add(components);
        this.getWindow().center();
        this.refreshFilterItems();
        this.getPatternField().setValue(values.pattern);
    }
    , refreshFilterItems: function(){
        var items = this.getItems();
        for (var i = 0; i < items.length; i++){
            var item = items[i];
            item.down('[name="number"]').setText(i + 1);
            if (i > 0){
            }
        }
        this._updatePattern();
    }
    , clearAll: function(){
        this.getItemsPanel().removeAll();
        this.mode = 'edit';
        this.filterId = 0;
    }
    , _updatePattern: function() {
        var subItems = this.getSubItems();
        var text = (this.getItems().length == 0) ? '' : '1';

        for (var i = 0; i < subItems.length; i++) {
            var condition = subItems[i].down('[name="condition"]').getValue();
            condition = (condition == 'and') ? LS.__translate(LS.and) : LS.__translate(LS.or);

            text = '(' + text + ' ' + condition + ' ' + (i+2) + ')';
        }

        this.getPatternField().setValue(text);
    }
    , _reloadOperatorsCombo: function(combo, value){
        var rec = combo.getStore().getById(value);
        var panel = combo.up('extfilteritem');
        var opCombo = panel.down('[name="operator"]');
        opCombo.clearValue();

        if (!rec) {
            return;
        }
        var fieldType = rec.get('field_type');

        opCombo.getStore().getProxy().setExtraParam('type', fieldType);
        opCombo.getStore().load();
    }
    , _setRelationCombos: function(mainCombo, childCombo, field, param){
        var mainStore = mainCombo.getStore(),
            childStore = childCombo.getStore();

        mainCombo.relation = {
            combo: childCombo
            , field: field
            , param: param
        }
        childCombo.mainCombo = mainCombo;
        mainStore.combo = mainCombo;
        childStore.combo = childCombo;

        mainCombo.un('change', this._processRelationCombo, this);
        mainCombo.on('change', this._processRelationCombo, this);

        mainCombo.un('select', this._processRelationComboSelect, this);
        mainCombo.on('select', this._processRelationComboSelect, this);

        mainStore.un('beforeload', this._processRelationStoreBeforeLoad, this);
        mainStore.on('beforeload', this._processRelationStoreBeforeLoad, this);

        mainStore.un('load', this._processRelationStoreLoad, this);
        mainStore.on('load', this._processRelationStoreLoad, this);
    }
    , _processRelationStoreBeforeLoad: function(store) {
        if (store.combo.mainCombo) {
            store.getProxy().setExtraParam(store.combo.mainCombo.relation.param, store.combo.mainCombo.getValue());
        }
    }
    , _processRelationStoreLoad: function(store){
        var field = store.combo.valueField,
            value = store.combo.getValue(),
            recIndex = -1;

        recIndex = store.findBy(function(rec) {
            if (rec.get(field) == value) {
                return true;
            }
        });
        if (recIndex >= 0){
            this._processRelationCombo(store.combo, value);
        }
    }
    , _processRelationCombo: function(mainCombo, value){
        var valueField = mainCombo.valueField,
            recIndex = mainCombo.getStore().findBy(function(rec) {
                if (rec.get(valueField) == value) {
                    return true;
                }
            }),
            rec = recIndex >= 0 ? mainCombo.getStore().getAt(recIndex) : null;

        if (!rec){
            return;
        }

        var value = rec.get(mainCombo.relation.field);
        var childStore = mainCombo.relation.combo.getStore();

//        childStore.getProxy().setExtraParam(mainCombo.relation.param, value);
//        childStore.load();
    }
    , _processRelationComboSelect: function(combo){
        var childCombo;
        if (combo.relation && combo.relation.combo){
            childCombo = combo.relation.combo;
        }

        if (!childCombo){
            return;
        }

        childCombo.clearValue();
        this._processRelationComboSelect(childCombo);
    }
    , _fieldComboChange: function(fieldCombo, value) {
        var store = fieldCombo.getStore()
            , rec = store.getById(value)
            , fieldSet = fieldCombo.up()
            , valueEditor = fieldSet.down('[name="value"]')
            , operatorCombo = fieldSet.down('[name="operator"]')
            , operatorStore = operatorCombo.getStore();

        if (!store.getCount() || !operatorStore.getCount()) {
            store.on('load', function() {
                if (store.getCount()) {
                    this._fieldComboChange(fieldCombo, value)
                }
            }, this, {
                single: true
            });
        } else if (rec) {
            var type = rec ? rec.get('field_type') : 'varchar'
                , stype = rec.get('single_type')
                , operatorRec = operatorStore.getById(operatorCombo.getValue())
                , multiValue = operatorRec && operatorRec.get('multi_value') == 1
                , valueEditorIndex = fieldSet.items.indexOf(valueEditor)
                , oldValue = valueEditor.xtype == 'numberfield' ? valueEditor.rawValue : valueEditor.getValue()
                , editor;

            if ((type == 'single') || (type == 'date' && stype == 'time')) {
                type = stype;
            }
            if (stype == 'tinyint') {
                type = 'bool';
                multiValue = false;
            }

            if (valueEditor._type == type && valueEditor._isMulti == multiValue) {
                return;
            }
            editor = this.getValueEditorByType(type, rec.get('id'), oldValue, multiValue);

            editor._type = type;
            editor._isMulti = multiValue;

            if (multiValue && editor.multiSelect) {
                if (!Ext.isArray(oldValue) && oldValue) {
                    oldValue = oldValue.split(editor.delimiter || ',');
                } else {
                    oldValue = [];
                }
            }
            fieldSet.remove(valueEditor, true);
            fieldSet.insert(valueEditorIndex, editor);
            if (editor.safeParse && editor.valueParseFormat) {
                if (!Ext.isArray(editor.valueParseFormat)) {
                    editor.valueParseFormat = [editor.valueParseFormat];
                }

                for (var i = 0; i < editor.valueParseFormat.length; i++) {
                    var format = editor.valueParseFormat[i]
                        , parsedValue = null;
                    try {
                        parsedValue = editor.safeParse(oldValue, format);
                        if (parsedValue) {
                            editor.setValue(parsedValue);
                            break;
                        }
                    } catch(e) {}
                }
            } else {
                editor.setValue(oldValue);
            }
        }
    }
    , _operatorComboChange: function(operatorCombo, value) {
        var store = operatorCombo.getStore()
            , rec = store.getById(value);
        if (!store.getCount()) {
            store.on('load', function() {
                if (store.getCount()) {
                    this._operatorComboChange(operatorCombo, value);
                }
            }, this, {
                single: true
            });
        } else {
            var valueEditor = operatorCombo.up().down('[name="value"]');
            if (rec && rec.get('need_value') == 0) {
                valueEditor.disable();
                if (valueEditor.clearValue) {
                    valueEditor.clearValue();
                } else {
                    valueEditor.setValue(null);
                }
            } else {
                valueEditor.enable();
                var fieldCombo = operatorCombo.up().down('[name="field"]'),
                    value = fieldCombo.getValue();
                this._fieldComboChange(fieldCombo, value);
            }
        }
    }
    , getValueEditorByType: function(type, fieldId, oldValue, multiValue) {
        var me = this;
        var editorCfg = {}
        switch (type) {
            case 'number':
                editorCfg = {
                    xclass: multiValue ?'Ext.form.field.Text' : 'Ext.form.field.Number'
                    , xtype: multiValue ? 'textfield' : 'numberfield'
                    , hideTrigger: true
                    , spinDownEnabled: false
                    , spinUpEnabled: false
                    , maskRe: new RegExp( multiValue ? '[0123456789\\.\\,\\-]' : '[0123456789\\.\\-]' )
                };
                break;
            case 'date':
                editorCfg = {
                    xclass: 'Ext.form.field.Date'
                    , xtype: 'datefield'
                    , format: 'd.m.Y'
                    , valueParseFormat: ['Y-m-d', 'Y.m.d', 'Y-m-dTH:i:s', 'Y.m.dTH:i:s', 'Y-m-d H:i:s', 'Y.m.d H:i:s']
                };
                break;
            case 'time':
                editorCfg = {
                    xclass: 'Ext.form.field.Time'
                    , xtype: 'timefield'
                    , format: 'H:i'
                    , getFormatValue: function() {
                        var value = this.getValue();
                        return Ext.isDate(value) ? value.format('H:i') : value;
                    }
                };
                break;
            case 'bool':
                editorCfg = {
                    xclass: 'Ext.form.field.ComboBox'
                    , xtype: 'combobox'
                    , store: 'VetmanagerApp.modules.extfilter.store.ExtFilterYesNoStore'
                    , displayField: 'title'
                    , valueField: 'value'
                    , typeAhead: false
                    , hideTrigger: false
                    , queryMode: 'local'
                    , minChars: 1
                    , delimiter: ','
                    , multiSelect: false
                    , editable: false
                };
                break;
            case 'enum':
                editorCfg = {
                    xclass: 'Ext.form.field.ComboBox'
                    , xtype: 'combobox'
                    , store: 'VetmanagerApp.modules.extfilter.store.ExtFilterEnums'
                    , displayField: 'title'
                    , valueField: 'value'
                    , typeAhead: false
                    , hideTrigger: false
                    , queryMode: 'local'
                    , minChars: 1
                    , listConfig: {
                        minWidth: 200
                    }
                    , delimiter: ','
                    , multiSelect: multiValue == true
                    , editable: false
                    , expand: function() {
                        var store = this.getStore();
                        store.filter('field_id', fieldId);
                        return Ext4.form.field.ComboBox.superclass.expand.apply(this, arguments);
                    }
                    , onCollapse: function() {
                        var store = this.getStore();
                        store.clearFilter();
                    }
                };
                break;
            case 'ref':
                editorCfg = {
                    xclass: 'Ext.form.field.ComboBox'
                    , xtype: 'combobox'
                    , store: {
                        model: 'VetmanagerApp.modules.extfilter.model.ExtFilterRefFieldValue'
                        , pageSize: 50
                    }
                    , displayField: 'title'
                    , valueField: 'value'
                    , typeAhead: false
                    , hideTrigger: false
                    , minChars: 0
                    , listConfig: {
                        minWidth: 200
                    }
                    , pageSize: 50
                    , delimiter: ','
                    , queryCaching: false
                    , multiSelect: multiValue == true
                    , initComponent: function() {
                        Ext4.form.field.ComboBox.prototype.initComponent.apply(this, arguments);
                        this.getStore().combo = this;
                        this.getStore().on('beforeload', function(store, operation) {
                            var value = this.getValue();
                            if (Ext4.isArray(value)) {
                                value = value.join(',');
                            }

                            operation.params = operation.params || {};
                            operation.params.only_dynamic = me.onlyDynamic ? 1 : 0;
                            operation.params.filter_id = me.filterId;
                            operation.params.field_id = fieldId;
                            if (value) {
                                operation.params.value = value;
                            }
                            var sameTableValues = me.getSameTableValues(fieldId);

                            if (sameTableValues) {
                                operation.params.same_table_values = Ext.encode(sameTableValues);
                            }
                        }, this);
                    }
                };
                break;
            case 'string':
            default:
                editorCfg = {
                    xclass: 'Ext.form.field.Text'
                    , xtype: 'textfield'
                };
                break;
        }
        editorCfg = Ext.applyIf(editorCfg, {
            width: 200
            , name: 'value'
            , emptyText: LS.__translate(LS.Value)
            , allowBlank: false
        });
        editorCfg.extFieldType = type;
        var editor = Ext4.create(editorCfg);

        if (type == 'ref') {
            var store = editor.getStore();
            store.getProxy().setExtraParam('field_id', fieldId);
            store.getProxy().setExtraParam('value', oldValue);
            store.load();
        }
        return editor;
    }
    , expandFieldCombo: function(fieldCombo) {
        var store = fieldCombo.getStore()
            , fieldSet = fieldCombo.up()
            , moduleCombo = fieldSet.down('[name="module"]');

        store.clearFilter();
        store.filter('module_name', moduleCombo.getValue());
    }
    , expandOperatorCombo: function(operatorCombo) {
        var store = operatorCombo.getStore()
            , fieldSet = operatorCombo.up()
            , fieldCombo = fieldSet.down('[name="field"]')
            , rec = fieldCombo.getStore().getById(fieldCombo.getValue())
            , fieldType = rec ? rec.get('field_type') : 'string';

        store.clearFilter();

        store.filter( new Ext4.util.Filter({
            root: 'data',
            property: 'field_types',
            value: fieldType,
            anyMatch: true
        }));
    }
    , getSameTableValues: function (fieldId) {
        if (!fieldId) {
            return null;
        } else {
            var values = {}
                , items = this.getItems();

            if (items.length < 2) {
                return null;
            }

            var fieldsStore = this.getStore('VetmanagerApp.modules.extfilter.store.ExtFilterFields')
                , fieldRec = fieldsStore.getById(fieldId);

            if (!fieldRec) {
                return null;
            }

            for (var i = 0; i < items.length; i++) {
                var item = items[i]
                    , rec = fieldsStore.getById(item.down('[name="field"]').getValue());
                if (rec && rec.get('id') != fieldRec.get('id')) {
                    if (rec.get('table_name') == fieldRec.get('join_table_name') && rec.get('module_name') == fieldRec.get('join_module_name')) {
                        var sameFieldName = rec.get('field_name');
                        values[sameFieldName] = values[sameFieldName] || [];
                        values[sameFieldName].push({
                            operator: item.down('[name="operator"]').getValue(),
                            value: item.down('[name="value"]').getValue()
                        });
                    }
                }
            }

            return values;
        }
    }
});