panel9 = new Ext.Panel({
    title: 'Задание 9',
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
                '<p>Работа с формами</p>',
                'Сделать форму с 2 радиобатона, 2 чекбокса, 2 текстовых поля и 1 комбобокс',
                'Ниже кнопка загрузить, при нажатии на нее с сервера грузятся данные и подставляются в форму'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            html: 'Тут решение'
        }
    ]
});