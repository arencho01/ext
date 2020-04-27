panel3 = new Ext.Panel({
    title: 'Задание 3',
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
                '<p>Работа с чекбоксами и радиобатонами</p>',
                'Создать 3 радиобатона и 4 чекбокса. Все это как-то обернуть в fieldset. Внизу сделать кнопку',
                'При нажатии на кнопку, снизу от нее отображать текстом какие радио и чекбоксы сейчас нажаты,',
                'а какие не нажаты. Текст должне быть в виде: чекбокс №1 - нажат или чекбокс№2 - не нажат',
                'Придумать красивое решение, чтоб работало на неопределенное кол-во чекбоксов и радиобатонов'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            html: 'Тут решение'
        }
    ]
});