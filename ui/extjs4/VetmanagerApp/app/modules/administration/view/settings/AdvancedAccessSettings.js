Ext4.define('VetmanagerApp.modules.administration.view.settings.AdvancedAccessSettings', {
    extend: 'Ext4.tab.Panel',
    xtype: 'advancedaccesssettings',
    border: false,
    region: 'center',
    title: false,
    scope: this,
    buttonAlign: 'center',
    initComponent: function() {
        this.callParent();

        this.add(this.getItemSelectorField(
            LS.__translate(LS.AccessToTheSiteAccordingToTheSchedule),
            'clinic_by_schedule',
            LS.__translate(LS.AllUsersExceptAdministrators),
            LS.__translate(LS.ChosenUsers),
            this.getItemSelectorStore('users_without_admins')
        ));
        this.add(this.getItemSelectorField(
            LS.__translate(LS.OpportunityToChangeTheResponsiblePersons),
            'change_responsibles',
            LS.__translate(LS.AllUsers),
            LS.__translate(LS.ChosenUsers),
            this.getItemSelectorStore('users')
        ));

        this.setActiveTab(0);
    },
    getItemSelectorField: function(title, type, fromTitle, toTitle, store) {
        return {
            title: title,
            xtype: 'form',
            padding: '5px',
            layout: 'fit',
            border: false,
            accessType: type,
            items: [{
                xtype: 'itemselector',
                name: type,
                anchor: '100%',
                displayField: 'title',
                valueField: 'id',
                fromTitle: fromTitle,
                toTitle: toTitle,
                store: store
            }]
        };
    },
    getItemSelectorStore: function(type) {
        var params = {};

        switch(type) {
            case 'roles':
                params = {
                    cmd: 'get_roles'
                };
                break;
            case 'users':
                params = {
                    cmd: 'get_users',
                    start: 0,
                    limit: 9999,
                    justActivated: 1
                };
                break;
            case 'users_without_admins':
                params = {
                    cmd: 'get_users',
                    start: 0,
                    limit: 9999,
                    justActivated: 1,
                    withoutAdmins: 1
                };
                break;
        }

        return {
            xtype: 'store',
            fields: ['id', 'title'],
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'ajax_administration.php',
                extraParams: params,
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        }
    },
    tbar: [
        {
            cls: 'button-save',
            action: 'save',
            tooltip: LS.__translate(LS.Save),
            margins: {top:3, right:0, bottom:2, left:5}
        }
    ]
});