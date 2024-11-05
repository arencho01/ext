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
            layout: 'auto',
            autoWidth: true,
            bodyStyle: 'border: 0',
            items: [
                {
                    xtype: 'form',
                    title: 'My form',
                    padding: 20,
                    labelWidth: 120,
                    defaults: {
                        anchor: '100%',
                        allowBlank: false,
                        msgTarget: 'side'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'ФИО',
                            name: 'fullName'
                        },
                        {
                            xtype: 'textfield',
                            inputType: 'password',
                            fieldLabel: 'Пароль',
                            name: 'password'
                        },
                        {
                            xtype: 'textfield',
                            inputType: 'email',
                            fieldLabel: 'E-mail',
                            name: 'eMail'
                        },
                        {
                            xtype: 'textfield',
                            name: 'description',
                            fieldLabel: 'Комментарий',
                            height: 50
                        }
                    ],
                    buttons: [
                        {
                            text: 'Отправить',
                            handler: function () {
                                const form = this.findParentByType('form').getForm();

                                if(form.isValid()) {
                                    const values = form.getValues();
                                    let resultText = `
                                        <p>ФИО: ${values.fullName}</p>
                                        <p>Пароль: ${values.password}</p>
                                        <p>E-mail: ${values.eMail}</p>
                                        <p>Комментарий: ${values.description}</p>
                                    `;

                                    Ext.getCmp('resultPanel').update(resultText);
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: 'resultPanel',
                    padding: 10,
                    html: 'Результат будет тут'
                }
            ]
        }
    ]
});