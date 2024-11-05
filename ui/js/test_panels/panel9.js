panel9 = new Ext.Panel({
    title: 'Задание 9',
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
                '<p>Работа с формами</p>',
                'Сделать форму с 2 радиобатона, 2 чекбокса, 2 текстовых поля и 1 комбобокс',
                'Ниже кнопка загрузить, при нажатии на нее с сервера грузятся данные и подставляются в форму'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            width: 500,
            padding: 10,
            layout: 'auto',
            bodyStyle: 'border: 0',
            items: [
                {
                    xtype: 'form',
                    title: 'My form',
                    padding: 10,
                    labelWidth: 150,
                    items: [
                        {
                            xtype: 'radiogroup',
                            fieldLabel: 'Радио-кнопки',
                            items: [
                                { boxLabel: 'Радиокнопка 1', name: 'radio', inputValue: 1, checked: true },
                                { boxLabel: 'Радиокнопка 2', name: 'radio', inputValue: 2 }
                            ]
                        },
                        {
                            xtype: 'checkboxgroup',
                            fieldLabel: 'Чекбоксы',
                            items: [
                                { boxLabel: 'Чекбокс 1', name: 'checkbox1', inputValue: 1 },
                                { boxLabel: 'Чекбокс 2', name: 'checkbox2', inputValue: 2 }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Имя',
                            name: 'name'
                        },
                        {
                            xtype: 'textarea',
                            width: 214,
                            fieldLabel: 'Коммент',
                            name: 'comment',
                            style: 'margin-bottom: 10px;'
                        },
                        {
                            xtype: 'combo',
                            name: 'selection',
                            width: 214,
                            mode: 'local',
                            fieldLabel: 'Выберите запись',
                            store: new Ext.data.ArrayStore({
                                fields: ['id', 'text'],
                                data: [
                                    [ 1, 'Запись 1' ],
                                    [ 2, 'Запись 2' ],
                                    [ 3, 'Запись 3' ]
                                ]
                            }),
                            valueField: 'id',
                            displayField: 'text',
                            value: 'Выбрать...',
                            editable: false,
                            triggerAction: 'all'
                        },
                        {
                            xtype: 'button',
                            text: 'Вписать данные',
                            style: 'padding-left: 155px',
                            handler: function () {
                                const form = this.ownerCt.getForm();

                                Ext.Ajax.request({
                                    url: 'http://localhost:8000/ui/api/dataForTask9.php',
                                    method: 'POST',
                                    root: 'data',
                                    success: function (response) {
                                        const data = Ext.decode(response.responseText)
                                        form.setValues(data);
                                    }
                                });
                            }
                        }
                    ]
                }
            ]
        }
    ]
});