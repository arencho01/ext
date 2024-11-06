panel14 = new Ext.Panel({
    title: 'Задание 14',
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
                'Создать модальное окно. В котором будет 2 кнопки  (+ и -)',
                'при нажатии на + в окно добавляется рандомный элемент',
                'один из (кнопка, текст филд, комбобокс, чекбокс). при нажатии на минус, один из них удаляется с окна',
                'Сделать чтоб при добавлении элементов размер окна изменялся и центровался.',
                'А при удалении элементов размер уменьшался (важно чтоб тень от окна тоже перестраивалась)'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            items: [
                (function (){
                    let win = new Ext.Window({
                        title: 'Модальное окно',
                        modal: true,
                        layout: 'form',
                        width: 300,
                        autoHeight: true,
                        autoWidth: true,
                        padding: 10,
                        closeable: true,
                        closeAction:'hide',
                        resizable: true,
                        items: [
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                frame: true,
                                autoWidth: true,
                                bodyStyle: 'border: 0;',
                                items: [
                                    {
                                        xtype: 'button',
                                        text: '+',
                                        width: 30,
                                        handler: function () {
                                            addRandomItem(win);
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        text: '-',
                                        width: 30,
                                        handler: function () {
                                            removeLastItem(win);
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'panel',
                                itemId: 'dynamicPanel',
                                layout: 'form',
                                frame: true,
                                autoHeight: true,
                                autoWidth: true,
                                border: false,
                                style: 'margin-top: 20px;'
                            }
                        ]
                    });

                    function addRandomItem(win) {
                        let randomItems = [
                            { xtype: 'button', text: 'Кнопка', style: 'margin-bottom: 10px' },
                            { xtype: 'textfield', fieldLabel: 'Инпут' },
                            { xtype: 'combo', fieldLabel: 'Комбобокс', store: ['Запись 1', 'Запись 2', 'Запись 3'], value: 'Выберите запись', triggerAction: 'all' },
                            { xtype: 'checkbox', boxLabel: 'Чекбокс' }
                        ];

                        let randomItem = randomItems[Math.floor(Math.random() * randomItems.length)];

                        let dynamicPanel = win.getComponent('dynamicPanel');
                        dynamicPanel.add(randomItem);
                        dynamicPanel.doLayout();

                        win.center();
                    }

                    function removeLastItem(win) {
                        let dynamicPanel = win.getComponent('dynamicPanel');
                        let lastItem = dynamicPanel.items.last();

                        if (lastItem) {
                            dynamicPanel.remove(lastItem, true);
                            dynamicPanel.doLayout();

                            win.center();
                        }
                    }

                    return {
                        xtype: 'button',
                        text: 'Открыть модалку',
                        handler: function () {
                            win.show();
                        }
                    }
                })()
            ]
        }
    ]
});



// panel16 = new Ext.Panel({
//     title: 'Задание 16',
//     listeners: {
//         scope: this,
//         activate: function (a) {
//             console.log('activate');
//             a.doLayout();
//         }
//     },
//     layout: {
//         type: 'vbox',
//         pack: 'start',
//         align: 'stretch'
//     },
//     items: [
//         {
//             xtype: 'panel',
//             autoHeight: true,
//             padding: 10,
//             style: {
//                 fontWeight: 'bold',
//                 fontSize: '14px',
//                 color: 'green'
//             },
//             html: [
//                 '<p>Работа с Window</p>',
//                 'Открыть модальное окно, после открытия посылать запрос на сервер для загрузки данных',
//                 'после отправки показывать лоад маску. На сервере сделать sleep(3) чтоб имитировать долгую загрузку',
//                 'После того как данные пришли с сервера, прятать лоад маску'
//             ].join('<br/>')
//         }, {
//             xtype: 'panel',
//             flex: 1,
//             padding: 10,
//             items: [
//                 (function () {
//                     let win = new Ext.Window({
//                         title: 'Модальное окно',
//                         modal: true,
//                         layout: 'form',
//                         width: 300,
//                         height: 150,
//                         // autoHeight: true,
//                         // autoWidth: true
//                     });
//
//                     return {
//                         xtype: 'button',
//                         text: 'Открыть модалку',
//                         handler: function () {
//                             win.show();
//                         }
//                     }
//                 })()
//             ]
//         }
//     ]
// });