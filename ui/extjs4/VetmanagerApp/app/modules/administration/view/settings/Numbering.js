Ext4.define('VetmanagerApp.modules.administration.view.settings.Numbering', {
    extend: 'Ext4.tab.Panel',
    xtype: 'numbering_view',
    border: false,
    region: 'center',
    title: false,
    buttonAlign: 'center',
    items: [
        {
            xtype: 'form',
            border: false,
            padding: '10px',
            title: LS.__translate(LS.Numbering),
            items: [
                {
                    xtype: 'fieldset',
                    title: LS.__translate(LS.StoreDocs),
                    checkboxToggle: true,
                    collapsed: true,
                    id: 'numberingStoreFieldset',
                    name: 'numberingStoreFieldset',
                    defaults: {
                        labelAlign: 'left',
                        labelWidth: 275,
                        anchor: '98%'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            fieldLabel: LS.__translate(LS.NumberGenerating),
                            queryMode: 'local',
                            displayField: 'title',
                            valueField: 'value',
                            name: 'storeNumberingAutomatic',
                            editable: false,
                            value: 1,
                            hidden: true,
                            store: {
                                xtype: 'store',
                                fields: ['value', 'title'],
                                data: [
                                    {value: 0, title: LS.__translate(LS.Manually)},
                                    {value: 1, title: LS.__translate(LS.Automatically)}
                                ]
                            }
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: LS.__translate(LS.NumberGrouping),
                            queryMode: 'local',
                            displayField: 'title',
                            valueField: 'value',
                            name: 'storeNumberingByClinic',
                            editable: false,
                            value: 0,
                            store: {
                                xtype: 'store',
                                fields: ['value', 'title'],
                                data: [
                                    {value: 0, title: LS.__translate(LS.NumberingTotal)},
                                    {value: 1, title: LS.__translate(LS.NumberingByClinic)}
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ],
    tbar: [
        {
            cls: 'button-save',
            action: 'save',
            tooltip: LS.__translate(LS.Save),
            margins: {top:3, right:0, bottom:2, left:5}
        }
    ]
});

