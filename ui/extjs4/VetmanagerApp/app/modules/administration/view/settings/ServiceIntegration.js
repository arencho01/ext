//TODO:translate
Ext4.define('VetmanagerApp.modules.administration.view.settings.ServiceIntegration', {
    extend: 'Ext4.FormPanel',
    xtype: 'serviceintegration',
    border: false,
    region: 'center',
    title: false,
    buttonAlign: 'center',
    padding: '0 0 0 0',
    url: 'ajax_administration.php',
    layout: 'card',
    scope: this,
    defaults: {
        //layout: 'fit' 
        border: false
    },
    items: [
        {
            xtype: 'panel',
            overflowY: 'auto',
            padding: '10',
            items: [
                {
                    xtype: 'dataview',
                    id: 'serviceintegrationslist',
                    store: 'VetmanagerApp.modules.administration.store.settings.ServiceIntegrations',
                    itemSelector: 'li.integration-list-item',
                    tpl: new Ext.XTemplate(
                        '<div class="integrations-panel-title">Выберите сервис</div>',
                        '<ul class="integration-list">',
                        '   <tpl for=".">',
                        '       <tpl if="this.isShowSettings(caption)">',
                        '          <li class="integration-list-item" style="background-image: url({src});" data-name="{name}">',
                        '             <div class="integration-list-item-caption">',
                        '                   <h3 class="integration-list-item-title">{caption}</h3>',
                        '                   <tpl if="help != \'\'">',
                        '                       <p class="integration-list-item-desc">{desc} <a href="{help}" target="_blank">Подробнее</a></p>',
                        '                </tpl>',
                        '               </div>',
                        '               <tpl if="checkable == false">',
                        '                   <div class="integration-list-item-buttons-container">',
                        '                       <input type="button" value="Настроить" class="integration-list-item-button-big-settings"></input>',
                        '                   </div>',
                        '            </tpl>',
                        '               <tpl if="checkable == true">',
                        '                   <div class="integration-list-item-buttons-container <tpl if="skipSettings">only-check</tpl>">',
                        '                       <label class="integration-list-item-buttons-checkbox">',
                        '                           <input type="checkbox" <tpl if="enabled">checked</tpl>>',
                        '                           <div class="integration-list-item-buttons-checkbox__text" style="--text-on: \'Вкл\';--text-off: \'Выкл\';"></div>',
                        '                       </label>',
                        '                       <tpl if="skipSettings !== true">',
                        '                           <div class="integration-list-item-button-settings"></div>',
                        '                       </tpl>',
                        '                   </div>',
                        '             </tpl>',
                        '          </li>',
                        '       </tpl>',
                        '   </tpl>',
                        '<ul>',
                        {
                            isShowSettings: function (caption) {
                                var domainsToInclude = ["one", "three", "tanya"];
                                if (caption != LS.Prescriptions || domainsToInclude.indexOf(_DOMAIN_NAME) != -1) {
                                    return true;
                                } else {
                                    return false;
                                }

                            }
                        }
                    ),
                    listeners: {
                        itemclick: function(view, rec, itemEl, index, e) {
                            if (this.isCheckboxButton(e.target)) {
                                rec.store.suspendEvents();
                                rec.set('enabled', e.target.checked);
                                rec.store.resumeEvents();
                                this.fireEvent('checkboxClick', view, rec);
                            } else if (this.isSettingsButton(e.target)) {
                                this.fireEvent('settingsClick', view, rec);
                            }
                        }
                    },
                    isCheckboxButton: function(dom) {
                        var el = Ext4.get(dom);
                        return dom.nodeName == 'INPUT' &&
                            el.parent('.integration-list-item-buttons-checkbox');
                    },
                    isSettingsButton: function(dom) {
                        var el = Ext4.get(dom);
                        return el.hasCls('integration-list-item-button-big-settings') ||
                            el.hasCls('integration-list-item-button-settings');
                    }
                }
            ]
        },
        {
            xtype: 'settings-unisender-panel'
        },
        {
            xtype: 'settings-sms-center-panel'
        },
        {
            xtype: 'settings-voip-asterisk-panel'
        },
        {
            xtype: 'settings-voip-vats-panel'
        },
        {
            xtype: 'settings-idexx-panel'
        },
        {
            xtype: 'settings-restapi-panel'
        },
        {
            xtype: 'settings-pdf-panel'
        },
        {
            xtype: 'settings-contacts-panel'
        },
        {
            xtype: 'settings-prescription-panel'
        }
        , {
            xtype: 'settings-vetkarta-panel'
        }

    ]
});