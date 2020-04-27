panel15 = new Ext.Panel({
    title: 'Задание 15',
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
                'Сделать табпанел, в одном из них сделать отображение счетчика https://prnt.sc/s6z6ll',
                'при открытии любого таба счетчик должен увеличиватся'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            html: 'Тут решение'
        }
    ]
});