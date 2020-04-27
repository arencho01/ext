Ext4.define('VetmanagerApp.modules.extfilter.view.ExtFilterItem', {
    extend: 'Ext.panel.Panel'
    , xtype: 'extfilteritem'
    , border: false
    , height: 50
    , layout: {
        type: 'hbox'
        , defaultMargins: {top: 5, right: 5, bottom: 5, left: 5}
    }
    , bodyStyle: {
        backgroundColor: '#EFEFEF'
        , padding: '5px'
    }
    , items: [
        {
            xtype: 'hidden'
            , name: 'id'
        }, {
            xtype: 'label'
            , text: '0'
            , width: 36
            , name: 'number'
        }, {
            xtype: 'combobox'
            , flex: 1
            , editable: true
            , allowBlank: false
            , emptyText: LS.__translate(LS.Module)
            , name: 'module'
            , anchor: '100%'
            , queryMode: 'local'
            , anyMatch: true
            , store: 'VetmanagerApp.modules.extfilter.store.ExtFilterModules'
            , displayField: 'name_cyr'
            , valueField: 'name'
            , listConfig: {
                minWidth: 300
            }
            , doQuery: function() {
                var me = this
                    , store = this.store;

                Ext4.form.field.ComboBox.prototype.doQuery.apply(this, arguments);
                if (me.activeFilter) {
                    me.activeFilter = new Ext4.util.Filter({
                        root: 'data',
                        property: me.activeFilter.property,
                        value: me.activeFilter.value,
                        anyMatch: true
                    });

                    store.suspendEvents();
                    store.clearFilter();
                    store.filter(me.activeFilter);
                    store.resumeEvents();

                    if (me.rendered) {
                        me.getPicker().refresh();
                    }
                }
            }
            , listeners: {
                blur: function(combo) {
                    var me =this;
                    if (me.store.find('name', me.getValue()) < 0) me.reset();
                }
            }
        }, {
            xtype: 'combobox'
            , flex: 1
            , editable: true
            , allowBlank: false
            , emptyText: LS.__translate(LS.Field)
            , name: 'field'
            , anchor: '100%'
            , queryMode: 'local'
            , anyMatch: true
            , store: 'VetmanagerApp.modules.extfilter.store.ExtFilterFields'
            , displayField: 'title'
            , valueField: 'id'
            , listConfig: {
                minWidth: 300
            }
            , doQuery: function() {
                var me = this
                    , store = this.store
                    , moduleCombo = me.up().down("[name='module']");

                Ext4.form.field.ComboBox.prototype.doQuery.apply(this, arguments);
                if (me.activeFilter) {
                    me.activeFilter = new Ext4.util.Filter({
                        root: 'data',
                        property: me.activeFilter.property,
                        value: me.activeFilter.value,
                        anyMatch: true
                    });

                    store.suspendEvents();
                    store.clearFilter();
                    store.filter(me.activeFilter);
                    store.resumeEvents();

                    if (me.rendered) {
                        me.getPicker().refresh();
                    }
                }
                store.filter('module_name', moduleCombo.getValue());
            }
            , listeners: {
                blur: function(combo) {
                    var me =this;
                    if (!parseInt(me.getValue())) me.reset();
                }
            }
        }, {
            xtype: 'combobox'
            , width: 200
            , editable: true
            , allowBlank: false
            , emptyText: LS.__translate(LS.Operator)
            , name: 'operator'
            , queryMode: 'local'
            , anyMatch: true
            , store: 'VetmanagerApp.modules.extfilter.store.ExtFilterOperators'
            , displayField: 'title'
            , valueField: 'id'
            , listConfig: {
                minWidth: 250
            }
            , doQuery: function() {
                var me = this
                    , store = this.store
                    , fieldCombo = me.up().down('[name="field"]')
                    , rec = fieldCombo.getStore().getById(fieldCombo.getValue())
                    , fieldType = rec ? rec.get('field_type') : 'string';

                Ext4.form.field.ComboBox.prototype.doQuery.apply(this, arguments);
                if (me.activeFilter) {
                    me.activeFilter = new Ext4.util.Filter({
                        root: 'data',
                        property: me.activeFilter.property,
                        value: me.activeFilter.value,
                        anyMatch: true
                    });

                    store.suspendEvents();
                    store.clearFilter();
                    store.filter(me.activeFilter);
                    store.resumeEvents();

                    if (me.rendered) {
                        me.getPicker().refresh();
                    }
                }
                store.filter( new Ext4.util.Filter({
                    root: 'data',
                    property: 'field_types',
                    value: fieldType,
                    anyMatch: true
                }));
            }
            , listeners: {
                blur: function(combo) {
                    var me =this;
                    if (!parseInt(me.getValue())) me.reset();
                }
            }
        }, {
            xtype: 'textfield'
            , width: 200
            , emptyText: LS.__translate(LS.Value)
            , name: 'value'
            , allowBlank: false
        }, {
            xtype: 'checkbox'
            , name: 'is_dynamic'
            , width: 150
        }, {
            xtype: 'button'
            , icon: 'ui/resources/images_new/delete.svg'
            , cls: '-clear-filter-item-button-'
            , action: 'deleteextfilteritem'
        }
    ]
});