panel3 = new Ext.Panel({
    title: 'Задание 3',
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
                '<p>Работа с чекбоксами и радиобатонами</p>',
                'Создать 3 радиобатона и 4 чекбокса. Все это как-то обернуть в fieldset. Внизу сделать кнопку',
                'При нажатии на кнопку, снизу от нее отображать текстом какие радио и чекбоксы сейчас нажаты,',
                'а какие не нажаты. Текст должне быть в виде: чекбокс №1 - нажат или чекбокс№2 - не нажат',
                'Придумать красивое решение, чтоб работало на неопределенное кол-во чекбоксов и радиобатонов'
            ].join('<br/>')
        },
        {
            xtype: 'panel',
            padding: 10,
            bodyStyle: 'border: 0',
            items: [
                {
                    xtype: 'form',
                    title: 'My form',
                    frame: true,
                    width: 300,
                    padding: 10,
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Fieldset',
                            padding: 10,
                            anchor: '100%',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    fieldLabel: 'Радо-кнопки',
                                    columns: 1,
                                    anchor: '100%',
                                    items: [
                                        { boxLabel: 'Радиокнопка 1', name: 'radio', inputValue: 1 },
                                        { boxLabel: 'Радиокнопка 2', name: 'radio', inputValue: 2, checked: true },
                                        { boxLabel: 'Радиокнопка 3', name: 'radio', inputValue: 3 }
                                    ]
                                },
                                {
                                    xtype: 'checkboxgroup',
                                    fieldLabel: 'Чекбоксы',
                                    columns: 1,
                                    anchor: '100%',
                                    items: [
                                        { boxLabel: 'Чекбокс 1', name: 'checkbox' },
                                        { boxLabel: 'Чекбокс 2', name: 'checkbox', checked: true },
                                        { boxLabel: 'Чекбокс 3', name: 'checkbox' },
                                        { boxLabel: 'Чекбокс 4', name: 'checkbox' }
                                    ]
                                },
                                {
                                    xtype: 'button',
                                    text: 'Проверить',
                                    style: 'margin-top: 10px',
                                    handler: function () {
                                        let radioGroup = this.ownerCt.items.items[0].items;
                                        let checkboxGroup = this.ownerCt.items.items[1].items;

                                        let selectedRadio = 'Радиокнопки не выбраны';
                                        let selectedCheckboxes = [];

                                        radioGroup.each(function (radio){
                                            if(radio.checked) {
                                                selectedRadio = 'Выбрана ' + `"${radio.boxLabel}"`;
                                            }
                                        });

                                        checkboxGroup.each(function (checkbox) {
                                            if (checkbox.checked) {
                                                selectedCheckboxes.push((`"${checkbox.boxLabel}"` + ' выбран'));
                                            }
                                        });

                                        let result = "Состояние элементов: <br>";
                                        result += selectedRadio + '<br>';
                                        result += selectedCheckboxes.map(function(state){
                                            if (state) {
                                                return state + '<br>';
                                            }
                                        }).join('');

                                        Ext.getCmp('resultRender').update(result);
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: 'resultRender',
                                    padding: 10,
                                    html: '<p>Состояние элементов:</p>'
                                }
                            ]
                        }
                    ]
                }
            ]
        }


    ]
});