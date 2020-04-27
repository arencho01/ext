Ext4.define('VetmanagerApp.modules.administration.view.settings.MenuSettings', {
    extend: 'Ext4.Panel',
    xtype: 'menusettings',
    border: false,
    region: 'center',
    title: false,
    buttonAlign: 'center',
    layout: 'fit',
    items: {
        xtype: 'tabpanel',
        border: false,
        items: [
            {
                xtype: 'workspacesettingspanel',
                title: 'Рабочее место',
                name: 'workspace-0'
            },
            {
                xtype: 'workspacesettingspanel',
                title: 'Рабочее место',
                name: 'workspace-1'
            },
            {
                xtype: 'workspacesettingspanel',
                title: 'Рабочее место',
                name: 'workspace-2'
            },
            {
                xtype: 'workspacesettingspanel',
                title: 'Рабочее место',
                name: 'workspace-3'
            }
        ]
    },
    initComponent: function() {
        var me = this;

        me.callParent();

        var tabPanel = me.items.get(0);

        tabPanel.items.each(function(tab){
            tab.on('changeposition', function(panel, newPosition, prevPosition) {
                if (prevPosition) {
                    var from = prevPosition - 1,
                        to = newPosition - 1;
                    tabPanel.down('tabbar').move(from, to);
                    tabPanel.move(from, to);
                    tabPanel.down('tabbar').items.each(function(item, index){
                        item.card.query('form')[0].getForm().findField('index').setValue(index + 1);
                    });
                    me.fireEvent('changetabposition', panel, from, to);
                } else {
                    console.error(arguments);
                }
            });
        });
        tabPanel.down('tabbar').items.each(function(item, index){
            item.card.query('form')[0].getForm().findField('index').setValue(index + 1);
        });
    }
});