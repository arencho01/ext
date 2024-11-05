panel13 = new Ext.Panel({
    title: 'Задание 13',
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
                'Сделать Xtemplate с получением сложных данных, примерно data => [articles => [...],likes => [...]]',
                'все это грузится одним сторе. в шаблоне отображаются данные с обоих массивов',
                'также использовать if в шаблон'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            items: [
                (function () {

                })
            ]
        }
    ]
});