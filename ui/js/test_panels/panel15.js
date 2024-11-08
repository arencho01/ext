panel15 = new Ext.Panel({
    title: 'Задание 15',
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
                '<p>Работа с Window</p>',
                'Сделать табпанел, в одном из них сделать отображение счетчика https://prnt.sc/s6z6ll',
                'при открытии любого таба счетчик должен увеличиватся'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            width: 400,
            bodyStyle: 'border: 0',
            items: [
                (function (){
                    let counter = 0;

                    function updateTabCounter(tabPanel) {
                        let counterTab = tabPanel.items.items[0];

                        let tabEl = tabPanel.getTabEl(counterTab);

                        tabEl.setAttribute('data-count', counter);
                    }

                    return  {
                        xtype: 'tabpanel',
                        title: 'Tab-панель',
                        padding: 10,
                        activeTab: 0,
                        items: [
                            {
                                id: 'counterTab',
                                title: 'Tab 1',
                                tabCls: 'counterTab',
                                html: 'Senectus et netus et malesuada. Nunc pulvinar sapien et ligula ullamcorper malesuada proin. Neque convallis a cras semper auctor. Libero id faucibus nisl tincidunt eget. Leo a diam sollicitudin tempor id. A lacus vestibulum sed arcu non odio euismod lacinia. In tellus integer feugiat scelerisque.',
                                listeners: {
                                    activate: function (tab) {
                                        counter++;
                                        updateTabCounter(tab.ownerCt);
                                    }
                                }
                            },
                            {
                                title: 'Tab 2',
                                html: 'Montes praesent litora interdum parturient facilisi elit. Sodales hendrerit quis tincidunt turpis vulputate consectetur lacus. Semper in magnis dapibus scelerisque viverra scelerisque maecenas.',
                                listeners: {
                                    activate: function (tab) {
                                        counter++;
                                        updateTabCounter(tab.ownerCt);
                                    }
                                }
                            },
                            {
                                title: 'Tab 2',
                                html: 'Aenean massa vitae nec nibh ut. Efficitur suscipit ex vitae nullam donec. Pellentesque eleifend ex orci ad est proin a habitant. Et facilisi arcu hendrerit egestas suscipit nascetur.',
                                listeners: {
                                    activate: function (tab) {
                                        counter++;
                                        updateTabCounter(tab.ownerCt);
                                    }
                                }
                            }
                        ]
                    }
                })()
            ]
        }
    ]
});

