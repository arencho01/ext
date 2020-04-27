Ext4.define('VetmanagerApp.modules.administration.view.settings.workspaceSettings.MainSettings', {
    extend: 'Ext4.Panel',
    xtype: 'workspacesettingspanel',
    layout: 'border',
    border: false,
    initComponent: function() {
        var me = this;

        me.items = me.buildItems();
        me.tbar = me.buildTbar();

        me.addEvents('changeposition');

        me.callParent();
    },
    buildItems: function() {
        return [
            {
                xtype: 'workspacemenusettingspanel',
                border: false,
                region: 'center'
            }
        ];
    },
    buildTbar: function() {
        var me = this;

        return {
            items:  [
                {
                    cls: 'button-save',
                    action: 'save',
                    tooltip: LS.__translate(LS.Save),
                    margins: {top:3, right:0, bottom:2, left:5}
                },
                {
                    xtype: 'form',
                    border: false,
                    region: 'north',
                    bodyStyle: {
                        backgroundColor: 'rgba(0,0,0,0)'
                    },
                    height: 40,
                    items: [
                        {
                            xtype: 'hidden',
                            name: 'id',
                            value: 0
                        },
                        {
                            xtype: 'container',
                            anchor: '100%',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'container',
                                    width: 140,
                                    margin: 5,
                                    layout: 'anchor',
                                    items: {
                                        xtype: 'combobox',
                                        labelWidth: 70,
                                        labelStyle: 'margin-top: 5px;font-size: 16px;',
                                        triggerCls: 'background-color-white',
                                        fieldLabel: 'Позиция',
                                        allowBlank: false,
                                        name: 'index',
                                        anchor: '95%',
                                        value: 0,
                                        queryMode: 'local',
                                        displayField: 'value',
                                        valueField: 'value',
                                        editable: false,
                                        store:  Ext.create('Ext.data.Store', {
                                            fields: ['value'],
                                            data : [
                                                {value: 1},
                                                {value: 2},
                                                {value: 3},
                                                {value: 4}
                                            ]
                                        }),
                                        listeners: {
                                            scope: me,
                                            select: me.onChangePosition,
                                            beforeselect: me.onBeforeChangePosition
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    flex: 2,
                                    margin: 5,
                                    layout: 'anchor',
                                    items: {
                                        xtype: 'textfield',
                                        labelWidth: 205,
                                        labelStyle: 'margin-top: 5px;font-size: 16px;',
                                        fieldLabel: 'Название рабочего места',
                                        emptyText: 'Рабочее место',
                                        allowBlank: false,
                                        name: 'title',
                                        anchor: '95%'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    width: 100,
                                    margins: {top:10, right:5, bottom:0, left:5},
                                    layout: 'anchor',
                                    items: {
                                        xtype: 'checkbox',
                                        boxLabel: ' - активно',
                                        name: 'is_active',
                                        listeners: {
                                            change: function(cb, checked) {
                                                me.onChangeActivated(checked)
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    margin: 5,
                                    layout: 'anchor',
                                    items: {
                                        xtype: 'combobox',
                                        triggerCls: 'background-color-white',
                                        labelSeparator: '',
                                        fieldLabel: '<img width="27px" height="27px"/>',
                                        labelWidth: 30,
                                        emptyText: 'Сменить иконку',
                                        anchor: '95%',
                                        editable: false,
                                        valueField: 'img',
                                        displayField: '',
                                        name: 'image',
                                        store: new Ext4.data.ArrayStore({
                                            fields: ['img', 'title'],
                                            data: [
                                                ['cassa.png', 'cassa'],
                                                ['forum.png', 'forum'],
                                                ['calendar.png', 'calendar'],
                                                ['goods.png', 'goods'],
                                                ['stores.png', 'stores'],
                                                ['invoice.png', 'invoice'],
                                                ['reports.png', 'reports'],
                                                ['marketing.png', 'marketing'],
                                                ['accessrights.png', 'accessrights'],
                                                ['medicalcards.png', 'medicalcards'],
                                                ['registry.png', 'registry'],
                                                ['settings.png', 'settings']
                                            ]
                                        }),
                                        tpl: Ext4.create('Ext4.XTemplate',
                                            '<tpl for=".">',
                                            '<div class="x4-boundlist-item" style="border:0px !important;">',
                                            '<div style="margin-left: 40%;height:96px; width:96px;background-image:url(',
                                            'ui/desktop/images/mainicons/{img}',
                                            ') !important;" class="workspace-shortcut-icon">&nbsp;</div>',
                                            '</div>',
                                            '</tpl>'
                                        ),
                                        listeners: {
                                            change: function(c, img) {
                                                c.labelEl.setHTML(String.format('<img width="27px" height="27px" src="/ui/desktop/images/mainicons/{0}">', img));
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    },
    setValues: function(data) {
        var me = this,
            form = me.query('form')[0].getForm();

        me.data = data;

        me.query('workspacemenusettingspanel')[0].setValues(data);

        form.findField('id').setValue(data.id || 0);
        form.findField('title').setValue(data.title || '');
        form.findField('image').setValue(data.image || '');
        form.findField('is_active').setValue(data.is_active || false);
        me.onChangeActivated(data.is_active);
    },

    onChangeActivated: function(checked) {
        var me = this,
            menuPanel = me.query('workspacemenusettingspanel')[0];

        menuPanel.setDisabled(!checked);
    },
    getValues: function() {
        var me = this;
        if (!me.rendered) {
            return false;
        } else {
            var form = me.query('form')[0].getForm(),
                values = form.getFieldValues(),
                menu = me.query('workspacemenusettingspanel')[0].getValues();
            values.name = me.name;
            values.menu = menu ? menu.menu : false;
            return values;
        }
    },
    onChangePosition: function(cb) {
        var me = this;
        me.fireEvent('changeposition', me, cb.getValue(), cb.prevValue);
    },
    onBeforeChangePosition: function(cb, rec) {
        var me = this,
            a = cb.getValue(),
            b = rec.get('value');
        if (a != b) {
            cb.prevValue = a;
        }
    }
});