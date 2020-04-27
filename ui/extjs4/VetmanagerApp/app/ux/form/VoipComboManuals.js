Ext.define('Ext4.ux.form.VoipComboManuals', {
    alias: 'widget.voipcombomanuals',
    extend: 'Ext4.Panel',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'combomanualgrid',
            flex: 1,
            manualName: LS.__translate(LS.VOIPCallType),
            title: LS.__translate(LS.CallType),
            showFields: ['title'],
            incrementValue: true,
            sortField: 'dop_param1',
            margin: '10',
            cls: 'x4-panel-transparent-title'
        },
        {
            xtype: 'combomanualgrid',
            flex: 1,
            manualName: LS.__translate(LS.VOIPCallResult),
            title: LS.__translate(LS.CallResult),
            showFields: ['title'],
            incrementValue: true,
            sortField: 'dop_param1',
            margin: '10 10 10 0',
            cls: 'x4-panel-transparent-title'
        }
    ]
});