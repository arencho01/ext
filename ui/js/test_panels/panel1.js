panel1 = new Ext.Panel({
    title: 'Задание 1',
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
                '<p>Динамическое создание кнопок.</p>',
                'Добавить кнопку, при нажатии на которую, внизу будет появлятся такая же кнопка.',
                'При этом нажатая кнопка деактивируется через 3 секунды после нажатия'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            layout: 'form',
            items: [
                (function () {
                    let isWaiting = false;

                    function addBtn(targetPanel) {
                        let newBtn = new Ext.Button({
                            text: 'Кнопка',
                            style: 'margin-bottom: 10px',
                            handler: function (btn) {
                                if (isWaiting) {
                                    console.log(this);
                                    return;
                                }

                                isWaiting = true;

                                addBtn(targetPanel);

                                setTimeout(function () {
                                    btn.disable();
                                    isWaiting = false;
                                }, 3000);
                            }
                        });

                        targetPanel.add(newBtn);
                        targetPanel.doLayout();
                    }

                    return {
                        xtype: 'button',
                        text: 'Кнопка',
                        style: 'margin-bottom: 10px',
                        handler: function () {
                            if (isWaiting) return;

                            isWaiting = true;

                            addBtn(this.ownerCt);

                            let btn = this;
                            setTimeout(function () {
                                btn.disable();
                                isWaiting = false;
                            }, 3000);
                        }
                    }
                })()
            ]
        }
    ]
});