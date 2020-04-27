panel12 = new Ext.Panel({
    title: 'Задание 12',
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
                '<p>Работа с Xtemplate</p>',
                'Создать шаблон используя Xtemplate в котором какая-то хтмл верстка и данные загружаются с червера'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            html: 'Тут решение'
        }
    ]
});