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
                    let myTemplate = new Ext.XTemplate(
                        `
                            <tpl if="articles.length &gt; 0">
                                <h2 style="margin: 0 0 5px">Articles:</h2>
                                <ul style="margin: 0 0 25px">
                                    <tpl for="articles">
                                        <li><h4 style="font-size: 14px; font-weight: 600">{title}</h4> {content}</li>
                                    </tpl>
                                </ul>
                            </tpl>
                            
                            <tpl if="likes.length &gt; 0">
                                <h2>Likes:</h2>
                                <ul>
                                    <tpl for="likes">
                                        <li>{user} - <tpl if="like">Лайкнул</tpl><tpl if="!like">Не лайкнул</tpl></li>
                                    </tpl>
                                </ul>
                            </tpl>
                        `
                    );

                    function loadData(panel) {
                        Ext.Ajax.request({
                            url: 'http://localhost:8000/ui/api/dataForTask13.php',
                            method: 'POST',
                            success: function (response) {
                                let data = Ext.decode(response.responseText);
                                data = data.data;   // чтобы не обращаться везде data.data

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