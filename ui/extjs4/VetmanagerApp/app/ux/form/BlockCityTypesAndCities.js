Ext.define('Ext4.ux.form.BlockCityTypesAndCities', {
    citiesCombo: undefined,
    alias: 'widget.blockcitytypesandcities',
    extend: 'Ext4.form.FieldContainer',
    scope: this,

    initComponent: function() {
        this.citiesCombo = this.buildCitiesCombo();
        this.items = this.buildItems();
        Ext4.ux.form.BlockCityTypesAndCities.superclass.initComponent.apply(this, arguments);
    },

    buildItems: function() {
        var items = [
            {
                layout: 'hbox',
                border: false,
                bodyStyle: 'padding: 10px;',
                items:[
                    this.buildTypesCombo(),
                    this.buildIndent(),
                    this.citiesCombo
                ]
            }
        ];
        return items;
    },

    buildTypesCombo: function() {
        return new Ext4.ux.form.CityTypesCombo({
            hideLabel: true,
            width: 105,
            listeners: this.onSelectTypesCombo(),
        });
    },

    buildIndent: function () {
        return {
            xtype: 'box',
            html: '&nbsp;'
        };
    },

    buildCitiesCombo: function() {
        return new Ext4.ux.form.CitiesCombo({
            name: 'dop_param1',
            hideLabel: true,
            width: 254,
            store: this.getStore(),
        });
    },

    getStore: function () {
        var store = new Ext.data.JsonStore({
            fields: ['id', 'title','type_id', 'type_title'],
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'ajax_component_proxy.php',
                extraParams: {
                    cmd:'get_grid',
                    component:'City',
                    type_id: '1'
                },
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });
        return store;
    },

    onSelectTypesCombo: function() {
        var me = this;
        return {
            'select': {
                fn: function (typesCombo) {
                    me.citiesCombo.clearValue();
                    me.citiesCombo.getStore().getProxy().extraParams.type_id = typesCombo.getValue();
                    me.citiesCombo.getStore().load();
                }
            }
        }
    },

});