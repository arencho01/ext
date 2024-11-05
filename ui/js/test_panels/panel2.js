panel2 = new Ext.Panel({
    title: 'Задание 2',
    listeners: {
        scope: this,
        activate: function (a) {
            console.log('activate');
            a.doLayout();
        }
    },
    layout: 'auto',
    items: [
        {
            xtype: 'panel',
            autoHeight: true,
            padding: 10,
            style: {
                fontWeight: 'bold',
                fontSize: '14px',
                color: 'green'
            },
            html: [
                '<p>Работа с комбобоксами</p>',
                'Сделать комбобокс (1) со store type=local,и поместить в нее несколько записей. Справа от комбо сделать кнопку, при ее нажатии в комбо будет добавлятся новая запись',
                'Сделать комбобокс (2) со store type=remote и справа от него кнопка (обновить)',
                'В комбобокс (2) грузятся данные с сервера (любые, тестовые) по нажатию кнопки обновить'
            ].join('<br/>')
        },
        {
            xtype: 'panel',
            padding: 10,
            items: [
                {
                    xtype: 'form',
                    title: 'Комбо бокс 1',
                    width: 400,
                    layout: 'hbox',
                    padding: 10,
                    style: 'margin-bottom: 30px',
                    items: [
                        {
                            xtype: 'combo',
                            id: 'localCombo1',
                            store: new Ext.data.ArrayStore({
                                fields: ['id', 'text'],
                                data: [
                                    [ 1, 'Запись 1' ],
                                    [ 2, 'Запись 2' ],
                                    [ 3, 'Запись 3' ]
                                ]
                            }),
                            displayField: 'text',
                            valueField: 'id',
                            value: 'Выберите запись',
                            mode: 'local',
                            width: 200,
                            editable: false,
                            triggerAction: 'all',
                        },
                        {
                            xtype: 'button',
                            text: 'Добавить запись',
                            style: 'margin-left: 10px',
                            handler: function() {
                                let localCombo = Ext.getCmp('localCombo1');
                                let store = localCombo.store;
                                let newRecordId = store.getCount() + 1;
                                store.add(new Ext.data.Record({ id: newRecordId, text: 'Запись ' + newRecordId }))
                            }
                        }
                    ]
                },
                {
                    xtype: 'form',
                    title: 'Комбо бокс 2',
                    layout: 'hbox',
                    width: 400,
                    padding: 10,
                    items: [
                        {
                            xtype: 'combo',
                            id: 'remoteCombo2',
                            store: new Ext.data.JsonStore({
                                fields: ['id', 'text'],
                                url: 'http://localhost:8000/ui/api/dataForTask2.php',
                                root: 'data',
                                autoLoad: false
                            }),
                            displayField: 'text',
                            valueField: 'id',
                            value: 'Выберите запись',
                            mode: 'remote',
                            width: 200,
                            editable: false,
                            triggerAction: 'all'
                        },
                        {
                            xtype: 'button',
                            text: 'Обновить',
                            style: 'margin-left: 10px',
                            handler: function () {
                                let remoteCombo = Ext.getCmp('remoteCombo2');
                                remoteCombo.store.reload();
                            }
                        }
                    ]
                }
            ]
        }

    ]
});
