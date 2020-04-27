Ext4.define('VetmanagerApp.modules.administration.view.settings.discount.ResponsibleUsersField', {
    extend: 'Ext.form.field.ComboBox'
    , xtype: 'responsible_users-field'
    , name: 'responsible_users-field'
    , fieldLabel: LS.__translate(LS.Responsible)  + ' *'
    , allowBlank: false
    , multiSelect: true
    , initComponent: function(cfg){
        this.store = Ext.create('Ext.data.Store', {
            fields : [
                'id'
                , 'title'
            ]
            , autoLoad : false
            , pageSize: this.pageSize
            , proxy: {
                type: 'ajax'
                , url : 'ajax_get_users.php'
                , extraParams: {
                    just_active: true
                }
                , reader: {
                    type: 'json'
                    , root: 'data'
                    , totalProperty  : 'total'
                }
            }
        });
        this.callParent(cfg);
    }
    , listConfig: {
        getInnerTpl: function() {
            return '{title}';
        }
    }
    , displayField: 'title'
    , valueField: 'id'
    , queryMode: 'remote'
    , triggerAction: 'all'
    , minChars: 1
    , forceSelection: true
});

