panel10 = new Ext.Panel({
    title: 'Задание 10',
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
                '<p>Работа с табпанелом</p>',
                'Добавить табпанел с 3мя табами, последний панел задизейбленный',
                'При переключении на 2й активировать 3й таб. При переходе на 3й таб, задизейблить 1й таб'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            html: 'Тут решение'
        }
    ]
});