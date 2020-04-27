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
                'при нажатии на + в окно добавляется рандомный елемент',
                'один из (кнопка, текст филд, комбобокс, чекбос). при нажатии на минус, один из них удаляется с окна',
                'Сделать чтоб при добавлении много элементов размер окна изменялся, он центровался.',
                'А при удалении элементов размер уменьшался (важно чтоб тень от окна тоже перестраивалась)н'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            html: 'Тут решение'
        }
    ]
});