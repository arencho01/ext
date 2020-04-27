Ext4.define('VetmanagerApp.modules.administration.view.settings.CalendarIntervals', {
    extend: 'Ext4.FormPanel',
    xtype: 'calendarintervalssettings',
    border: false,
    layout: 'fit',
    title: LS.__translate(LS.IntervalTypes),
    items: [{
        xtype: 'container',
        layout: {
            type: 'hbox',
            pack: 'start',
            align: 'stretch'
        },
        items: [
            {
                title: LS.__translate(LS.IntervalTypes),
                flex: 0.5,
                xtype: 'grid',
                border: 1,
                name: 'interval_types',
                tbar: [
                    {
                        cls: 'button-add',
                        margin: 3,
                        action: 'add_interval'
                    }, {
                        cls: 'button-edit',
                        margin: 3,
                        action: 'edit_interval'
                    }, {
                        cls: 'button-del',
                        margin: 3,
                        action: 'delete_interval'
                    }
                ],
                store: {
                    xtype: 'store',
                    fields: [
                        'id',
                        'name',
                        'is_working_hours',
                        'is_show_in_timesheet',
                        'color',
                        'title',
                        'b',
                        'i',
                        'u'
                    ],
                    autoLoad: true,
                    proxy: {
                        type: 'ajax',
                        url: 'ajax_calendar.php',
                        extraParams: {
                            cmd: 'get_timesheet_types',
                            xaction: 'read',
                            start: 0,
                            limit: 9999
                        },
                        reader: {
                            type: 'json',
                            root: 'data'
                        }
                    }
                },
                columns: [{
                    header: LS.__translate(LS.Namez),
                    dataIndex: 'name',
                    sortable: false,
                    hideable: false,
                    flex: 1
                }, {
                    header: LS.__translate(LS.WorkingHours),
                    dataIndex: 'is_working_hours',
                    sortable: false,
                    hideable: false,
                    width: 130
                },
                {
                    text: LS.__translate(LS.Color),
                    xtype: 'templatecolumn',
                    width: 80,
                    tpl: '<div style="width: 15px; height: 15px; margin: auto; border-color: #7f7d7d; border: groove; border-width: thin; background-color: {color}"></div>'
                }
                ]
            },
            {
                xtype: 'grid',
                flex: 0.5,
                border: 1,
                title: LS.__translate(LS.TemplatesOfIntervals),
                name: 'interval_templates',
                tbar: [
                    {
                        cls: 'button-add',
                        margin: 3,
                        action: 'add_template'
                    }, {
                        cls: 'button-edit',
                        margin: 3,
                        action: 'edit_template'
                    }, {
                        cls: 'button-del',
                        margin: 3,
                        action: 'delete_template'
                    }
                ],
                store: {
                    xtype: 'store',
                    fields: [
                        'id',
                        'title',
                        'begin_time',
                        'end_time',
                        'type_id',
                        'is_night'
                    ],
                    autoLoad: true,
                    proxy: {
                        type: 'ajax',
                        url: 'ajax_calendar.php',
                        extraParams: {
                            cmd: 'get_interval_templates',
                            start: 0,
                            limit: 9999
                        },
                        reader: {
                            type: 'json',
                            root: 'data'
                        }
                    }
                },
                columns: [{
                    header: LS.__translate(LS.Namez),
                    dataIndex: 'title',
                    sortable: false,
                    hideable: false,
                    flex: 1
                }, {
                    header: LS.__translate(LS.Night),
                    dataIndex: 'is_night',
                    renderer: function (v) {
                        return v == 1 ? LS.__translate(LS.Yes) : LS.__translate(LS.No)
                    }
                }]
            }
        ]
    }]
});