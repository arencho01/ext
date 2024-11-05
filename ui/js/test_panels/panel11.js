panel11 = new Ext.Panel({
    title: 'Задание 11',
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
                'Создать шаблон используя Xtemplate в котором какая-то хтмл верстка'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            items: [
                (function (){
                    let myTemplate = new Ext.XTemplate(
                        `
                            <div style="font-size: 18px; padding: 5px;">
                                 <h3>{title}</h3>
                                 <ul style="margin-top: 10px">
                                     <tpl for="items">
                                         <li>{.}</li>
                                     </tpl>
                                 </ul>
                           </div>
                        `
                    );

                    let data = {
                        'title': 'Xtemplate',
                        'items': ['Элемент 1', 'Элемент 2', 'Элемент 3']
                    };

                    return {
                        xtype: 'panel',
                        flex: 1,
                        padding: 10,
                        listeners: {
                            afterrender: function (panel) {
                                myTemplate.overwrite(panel.body, data);
                            }
                        }
                    }
                })()
            ]
        }
    ]
});