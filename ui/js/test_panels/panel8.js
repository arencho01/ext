panel8 = new Ext.Panel({
    title: 'Задание 8',
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
                'Добавить форму, с полями для ввода, фио, пароля, имейла и описания. Все поля обязательны для ввода',
                'Ниже кнопка субмит, при нажатии на нее с формы берутся все данны и отображаются ниже в виде текста'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            html: 'Тут решение'
        }
    ]
});