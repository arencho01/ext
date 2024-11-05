panel4 = new Ext.Panel({
    title: 'Задание 4',
    listeners: {
        scope: this,
        activate: function (a) {
            console.log('activate');
            a.doLayout();
        }
    },
    layout: 'auto',
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
                '<p>Работа с датапикером</p>',
                'Сделать выбор даты. После выбора даты отображать ниже результат',
                'в датапикере отрбражать дату в формате 27.04.2020 а результат',
                'отображать в формате Y-m-d'
            ].join('<br/>')
        },
        {
            xtype: 'form',
            title: 'Datepicker',
            width: 320,
            labelWidth: 150,
            padding: 10,
            style: 'margin-top: 10px',
            items: [
                {
                    xtype: 'datefield',
                    format: 'd.m.Y',
                    fieldLabel: 'Выберите дату',

                    listeners: {
                        select: function (field, date) {
                            const formattedDate = Ext.util.Format.date(date, 'Y-m-d');
                            const resultText = 'Результат: ' + formattedDate;

                            Ext.getCmp('dateResult').update(resultText);
                        }
                    }
                }
            ],

        },
        {
            xtype: 'panel',
            id: 'dateResult',
            flex: 1,
            padding: 10,
            html: 'Результат'
        }
    ]
});