panel16 = new Ext.Panel({
    title: 'Задание 16',
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
                '<p>Работа с Window</p>',
                'Открыть модальное окно, после открытия посылать запрос на сервер для загрузки данных',
                'после отправки показывать лоад маску. На сервере сделать sleep(3) чтоб имитировать долгую загрузку',
                'После того как данные пришли с сервера, прятать лоад маску'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            items: [
                {
                    xtype: 'button',
                    id: 'downloadBtn',
                    text: 'Загрузить данные',
                    handler: function () {
                        let win = new Ext.Window({
                            title: 'Загрузка данных',
                            width: 180,
                            height: 120,
                            padding: 10,
                            // closable: false,
                            listeners: {
                                show: function () {
                                    win.getEl().mask('Идёт загрузка...');
                                }
                            }
                        });

                        Ext.Ajax.request({
                            method: 'POST',
                            url: 'http://localhost:8000/ui/api/dataForTask16.php',
                            success: function (response) {

                                if (response.status === 200) {
                                    win.getEl().unmask();
                                    win.setWidth('auto');
                                    win.update('Данные успешно загружены!');
                                    win.center();
                                }
                            }
                        });
                        win.show();
                    }
                }
            ]
        }
    ]
});