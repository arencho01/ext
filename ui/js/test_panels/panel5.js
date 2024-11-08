panel5 = new Ext.Panel({
    title: 'Задание 5',
    listeners: {
        scope: this,
        activate: function (a) {
            console.log('activate');
            a.doLayout();
        }
    },
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
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
                '<p>Работа с гридом</p>',
                'Сделать грид с 3-мя колонками, который грузит тестовые данные с сервера',
                'В гриде должна быть возможность выбрать много строк, через checkboxselectionmodel'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            layout: 'fit',
            autoWidth: true,
            bodyStyle: 'border: 0',
            items: [
                (function () {
                    const checkboxSelModel = new Ext.grid.CheckboxSelectionModel();

                    return {
                        xtype: 'grid',
                        title: 'My grid',
                        autoWidth: true,
                        autoHeight: true,
                        store: new Ext.data.JsonStore({
                            fields: ['name', 'price', 'quantity'],
                            url: 'http://localhost:8000/ui/api/dataForTask5&6.php',
                            root: 'data',
                            autoLoad: true
                        }),
                        sm: checkboxSelModel,
                        columns: [
                            checkboxSelModel,
                            {
                                id: 'name',
                                header: 'Название',
                                dataIndex: 'name',
                                sortable: true
                            },
                            {
                                id: 'price',
                                header: 'Цена',
                                dataIndex: 'price',
                                sortable: true
                            },
                            {
                                id: 'quantity',
                                header: 'Кол-во',
                                dataIndex: 'quantity',
                                sortable: true
                            }
                        ],
                        // columnLines: true
                    }
                })()
            ]
        }
    ]
});