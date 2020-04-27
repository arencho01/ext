Ext4.define('VetmanagerApp.modules.administration.view.settings.discount.ClinicCombobox', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'clinic-combobox',
    fieldLabel: LS.__translate(LS.Clinic) + ' *',
    allowBlank: false,
    name: 'clinic-combobox',
    pageSize: 10,
    withAllItem: false,
    initComponent: function(cfg){
        var me = this,
            initialValue = me.value;

        me.store = Ext.create('Ext.data.Store', {
            fields : [
                'id',
                'title'
            ],
            autoLoad : true,
            pageSize: me.pageSize,
            proxy: {
                type: 'ajax',
                url : 'ajax_clinics.php',
                extraParams: {
                    cmd : 'get_grid',
                    sort: 'title',
                    dir: 'ASC'
                },
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty  : 'total'
                }
            },
            listeners: {
                load: function(s, recs) {
                    if (me.withAllItem) {
                        s.insert(0, {id: '0', title: LS.__translate(LS.InTotal)});
                        me.setValue(initialValue);
                    }
                }
            }
        });
        me.callParent(cfg);
    },
    listConfig: {
        getInnerTpl: function() {
            return '{title}';
        }
    },
    displayField: 'title',
    valueField: 'id',
    queryMode: 'local',
    triggerAction: 'all',
    minChars: 1,
    forceSelection: true
});