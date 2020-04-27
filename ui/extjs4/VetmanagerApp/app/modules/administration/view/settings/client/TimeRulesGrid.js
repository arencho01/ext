Ext4.define('VetmanagerApp.modules.administration.view.settings.client.TimeRulesGrid', {
    extend: 'Ext4.Panel',
    xtype: 'client-time-rules-settings',
    border: false,
    buttonAlign: 'center',
    layout: 'fit',
    initComponent: function() {
        var me = this;
        me.callParent();
        me.add(me.getRulesGridPanel());
    },
    getRulesGridPanel: function(){
        var me = this, timeRenderer;

        timeRenderer = function(v, meta, rec, row, col) {
            return rec.get('time_' + (col - 1) + '_enabled') ? v : '-';
        };

        return {
            xtype: 'grid',
            name: 'client-time-rules-grid',
            store: 'VetmanagerApp.modules.administration.store.settings.client.TimeRules',
            forceFit: true,
            title: LS.__translate(LS.WaitingRowsBackgroundColor),
            columns: [
                {
                    header: LS.__translate(LS.Number),
                    dataIndex: 'id',
                    width: 60,
                    sortable: false,
                    hideable: false
                },
                {
                    header: LS.__translate(LS.ReceptionType),
                    dataIndex: 'admission_title',
                    width: 210,
                    sortable: true,
                    hideable: false
                },
                {
                    header:
                        '<div style="background-color: #CCFFCC;font-weight: bold;display: block;padding-left: 10px;">' +
                            LS.__translate(LS.NormalState) + ' ' +
                            LS.__translate(LS.do) +
                            ' (' + LS.__translate(LS.Mins) + '.)' +
                        '</div>',
                    dataIndex: 'time_1',
                    width: 210,
                    sortable: false,
                    hideable: false,
                    renderer: timeRenderer
                },
                {
                    header:
                        '<div style="background-color: #FFFFCC;font-weight: bold;display: block;padding-left: 10px;">' +
                            LS.__translate(LS.WarningState) + ' ' +
                            LS.__translate(LS.do) +
                            ' (' + LS.__translate(LS.Mins) + '.)' +
                        '</div>',
                    dataIndex: 'time_2',
                    width: 210,
                    sortable: false,
                    hideable: false,
                    renderer: timeRenderer
                },
                {
                    header:
                        '<div style="background-color: #FFCCCC;font-weight: bold;display: block;padding-left: 10px;">' +
                            LS.__translate(LS.CriticalState) + ' ' +
                            LS.__translate(LS.do) +
                            ' (' + LS.__translate(LS.Mins) + '.)' +
                        '</div>',
                    dataIndex: 'time_3',
                    width: 210,
                    sortable: false,
                    hideable: false,
                    renderer: timeRenderer
                }
            ],
            tbar: [
                {
                    cls: 'button-add',
                    tooltip: LS.__translate(LS.Add),
                    action: 'add'
                },
                {
                    cls: 'button-edit',
                    tooltip: LS.__translate(LS.Edit),
                    action: 'edit'
                },
                {
                    cls: 'button-del',
                    tooltip: LS.__translate(LS.Delete),
                    action: 'delete'
                }
            ]
        };
    }
});