Ext4.define('VetmanagerApp.modules.administration.view.settings.ServiceIntegrations.Idexx', {
    extend: 'Ext4.FormPanel',
    xtype: 'settings-idexx-panel',
    region: 'center',
    buttonAlign: 'center',
    scope: this,
    border: false,
    title: false,
    items: [
        {
            xtype: 'form',
            border: false,
            style: {
                padding: '10px'
            },
            items: [
                {
                    xtype: 'fieldset',
                    title: LS.__translate(LS.Idexx),
                    cls: 'ext4-gray-fieldset',
                    defaults: {
                        labelAlign: 'left',
                        labelWidth: 150,
                        width: 500
                    },
                    items: [
                        {
                            xtype: 'combo',
                            fieldLabel: LS.__translate(LS.ChooseClinic).replace('...', ''),
                            queryMode: 'local',
                            displayField: 'title',
                            valueField: 'id',
                            name: 'idexxClinic',
                            editable: false,
                            emtyText: LS.__translate(LS.ChooseClinic),
                            store: 'VetmanagerApp.modules.administration.store.settings.IdexxClinics',
                            listeners: {
                                select: function(combo, recs) {
                                    var fld = combo.next();
                                    fld.setValue('');
                                    fld.setValue(recs[0].get('api_key'));
                                },
                                afterrender: function(combo) {
                                    var fld = combo.next();
                                    fld.setValue('');
                                    this.store.on('load', function(store, recs) {
                                        combo.select(recs[0]);
                                        fld.setValue(recs[0].get('api_key'));
                                    })
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: LS.__translate(LS.Api),
                            readOnly: true
                        },
                        {
                            width: 500,
                            border: false,
                            items: {
                                xtype: 'button',
                                hideLabel: true,
                                text: 'Перегенерировать ключ',
                                action: "generate-idexx-api-key"
                            }
                        },
                        {
                            xtype: 'displayfield',
                            hideLabel: true,
                            value:
                                '<a' +
                                '  class="green-button"' +
                                '  href="/build/get_file.php?file=idexx.tar.gz&type=idexx"' +
                                '  download="idexx.tar.gz"' +
                                '  blank="true"' +
                                '  style="width: 500px;">' +
                                '    Скачать клиент .exe' + //TODO:translate
                                '</a>'
                        }
                    ]
                }
            ]
        }
    ],
    tbar: {
        items: [
            {
                cls: 'button-back',
                tooltip: LS.__translate(LS.Back),
                action: 'back',
                margins: {top:3, right:0, bottom:2, left:5}
            }
        ],
    }
});
