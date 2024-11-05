panel7 = new Ext.Panel({
    title: 'Задание 7',
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
                '<p>Работа с лайаутами</p>',
                'Добавить бордер лаяут, все части должны схлопываться',
                'В левой части добавить панельку с лаяут акордеон (из 3х панелек)',
                'В правой части добавить панельку с лаяут колумн (из 2х панелек)'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            layout: 'border',
            items: [
                {
                    xtype: 'panel',
                    region: 'west',
                    width: 300,
                    title: 'Аккордеон',
                    layout: 'accordion',
                    collapsible: true,
                    split: true,
                    items: [
                        {
                            title: 'Панель 1',
                            autoHeight: true,
                            html: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>'
                        },
                        {
                            title: 'Панель 1',
                            autoHeight: true,
                            html: '<p>Velit nascetur tempus sit, magna elementum dui amet? Proin suspendisse ultrices praesent lectus venenatis.</p>'
                        },
                        {
                            title: 'Панель 1',
                            autoHeight: true,
                            html: '<p>Mi pulvinar suspendisse non mus feugiat fusce tortor et. Hac cras cras diam ut platea molestie.</p>'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    region: 'east',
                    width: 500,
                    layout: 'column',
                    collapsible: true,
                    split: true,
                    layoutConfig: {
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            columnWidth: 0.5,
                            height: '100%',
                            title: 'Колонка 1',
                            bodyStyle: 'padding: 10px;',
                            html: '<p>Lorem ipsum odor amet, consectetuer adipiscing elit. Quisque blandit cubilia felis mus dapibus tortor. In suspendisse cursus mus natoque maecenas massa? Vulputate hendrerit adipiscing at taciti nulla turpis. Maecenas nunc ut condimentum vel metus natoque amet. Ante ligula nibh ut aliquam sollicitudin. Metus accumsan gravida arcu phasellus eleifend pulvinar fringilla.</p>'
                        },
                        {
                            xtype: 'panel',
                            columnWidth: 0.5,
                            height: '100%',
                            title: 'Колонка 2',
                            bodyStyle: 'padding: 10px;',
                            html: '<p>Posuere dolor platea luctus fames porta nulla. Metus luctus libero auctor aenean tempor. Cras iaculis lacus habitant imperdiet diam efficitur commodo. Ultricies nisi finibus sociosqu quis, montes aliquet. Donec elementum ac suspendisse libero euismod odio? Ante curabitur placerat; posuere enim ridiculus facilisis. Sollicitudin dictumst conubia dolor accumsan ex. Platea rutrum convallis erat feugiat venenatis faucibus tristique. Aliquet efficitur volutpat tristique dictumst amet nulla eleifend imperdiet elementum.</p>'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    region: 'center',
                    padding: 10,
                    title: ' Центральная панель',
                    collapsible: true,
                    split: true,
                    html: '<p>Текст внутри основной панели</p>'
                }
            ]
        }
    ]
});

