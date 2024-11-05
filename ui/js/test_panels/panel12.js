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
                'Создать шаблон используя Xtemplate в котором какая-то хтмл верстка и данные загружаются с сервера'
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
                                 <h3 style="margin-bottom: 10px;">{title}</h3>
                                 <ul>
                                     <tpl for="items">
                                         <li>{.}</li>
                                     </tpl>
                                 </ul>
                             </div>
                        `
                    );

                    function loadData(panel) {
                        Ext.Ajax.request({
                            url: 'http://localhost:8000/ui/api/dataForTask12.php',
                            method: 'POST',
                            success: function (response) {
                                let data = Ext.decode(response.responseText);

                                myTemplate.overwrite(panel.body, data);
                            }
                        });
                    }

                    return {
                        xtype: 'panel',
                        flex: 1,
                        padding: 10,
                        listeners: {
                            afterrender: function (panel) {
                                loadData(panel);
                            }
                        }
                    }
                })()
            ]
        }
    ]
});