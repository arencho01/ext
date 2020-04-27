var timefieldTimes = [];

for(var i = 0; i < 24; i++) {
    for(var j = 0; j <= 45; j+=15) {
        timefieldTimes.push({
            value: ('0' + i).slice(-2) + ':' + ('0' + j).slice(-2)
        });
    }
}


Ext4.define('VetmanagerApp.modules.administration.view.settings.AddIntervalTemplate', {
    title: LS.__translate(LS.TemplateAdding)
    , extend: 'Ext4.window.Window'
    , xtype: 'addintervaltemplatewin'
    , width: 500
    , height: 300
    , buttonAlign: 'center'
    , modal: true
    , layout: 'fit'
    , items: [
        {
            xtype: 'form'
            , border: false
            , defaults: {
                labelWidth: 150
                , anchor: '100%'
                , padding: '5px'
            }
            , items: [
                {
                    xtype: 'hidden'
                    , name: 'id'
                    , value: 0
                }, {
                    xtype: 'textfield'
                    , fieldLabel: LS.__translate(LS.TemplateName)
                    , allowBlank: false
                    , name: 'title'
                }, {
                    xtype: 'combo'
                    , queryMode: 'local'
                    , displayField: 'value'
                    , valueField: 'value'
                    , name: 'begin_time'
                    , fieldLabel: LS.__translate(LS.BeginningTime)
                    , allowBlank: false
                    , store: {
                        xtype: 'store'
                        , fields: ['value']
                        , data: timefieldTimes
                    }
                }, {
                    xtype: 'combo'
                    , queryMode: 'local'
                    , displayField: 'value'
                    , valueField: 'value'
                    , name: 'end_time'
                    , fieldLabel: LS.__translate(LS.TerminationTime)
                    , allowBlank: false
                    , store: {
                        xtype: 'store'
                        , fields: ['value']
                        , data: timefieldTimes
                    }
                }, {
                    xtype: 'combo'
                    , fieldLabel: LS.__translate(LS.Type2)
                    , name: 'type_id'
                    , allowBlank: false
                    , valueField: 'id'
                    , displayField: 'name'
                    , triggerAction: 'all'
                    , value: 0
                    , store: {
                        xtype: 'store'
                        , fields: ['id', 'name', 'title', 'color']
                        , autoLoad: true
                        , proxy: {
                            type: 'ajax'
                            , url: 'ajax_calendar.php'
                            , extraParams: {
                                cmd: 'get_timesheet_types'
                                , 'advanced[]': [ 'with_empty_row' ]
                            }
                            , reader: {
                                type: 'json'
                                , root: 'data'
                            }
                        }
                    }
                }, {
                    xtype: 'checkbox'
                    , fieldLabel: LS.__translate(LS.Night)
                    , name: 'is_night'
                    , inputValue: '1'
                    , uncheckedValue: '0'
                }
            ]
        }
    ]
    , buttons: [
        {
            text: LS.__translate(LS.Save)
            , action: 'save'
        }, {
            text: LS.__translate(LS.Close)
            , action: 'close'
        }
    ]
});
Ext4.define('VetmanagerApp.modules.administration.view.settings.AddInterval', {
    title: LS.__translate(LS.IntervalAdding)
    , extend: 'Ext4.window.Window'
    , xtype: 'addintervalwin'
    , width: 640
    , requires: [
        'Ext4.ux.ColorField'
    ]
    , height: 400
    , buttonAlign: 'center'
    , modal: true
    , layout: 'fit'
    , items: [
        {
            xtype: 'form'
            , border: false
            , defaults: {
            labelWidth: 150
            , anchor: '100%'
            , padding: '5px'
        }
            , items: [
            {
                xtype: 'hidden'
                , name: 'id'
                , value: 0
            }, {
                xtype: 'hidden'
                , name: 'cmd'
                , value: 'get_timesheet_types'
            }, {
                xtype: 'textfield'
                , fieldLabel: LS.__translate(LS.Namez)
                , allowBlank: false
                , name : 'name'
            }, {
                xtype: 'textfield'
                , fieldLabel: LS.__translate(LS.Description)
                , allowBlank: true
                , name : 'title'
            }
            , {
                xtype: 'fieldset'
                , layout: 'column'
                , border: false
                , defaults: {
                    labelWidth: 150
                }
                , items: [
                    {
                        xtype: 'checkbox'
                        , fieldLabel: LS.__translate(LS.WorkingHours)
                        , name: 'is_working_hours'
                        , columnWidth: .5
                    }
                    , {
                        xtype: 'checkbox'
                        , fieldLabel: LS.__translate(LS.ShowTheTextInTheChart)
                        , name: 'is_show_in_timesheet'
                        , columnWidth: .5
                        , checked: true
                    }
                ]
            }

            , {
                xtype: 'colorfield'
                , fieldLabel: LS.__translate(LS.Color)
                , name: 'color'
            }, {
                xtype : 'fieldset'
                , layout : 'column'
                , height : 50
                , title: LS.__translate(LS.Style)
                , items : [
                    {
                        xtype: 'checkbox'
                        , columnWidth: .3
                        , fieldLabel: LS.__translate(LS.Bold)
                        , labelStyle: 'font-weight:bold;'
                        , name: 'b'
                    }, {
                        xtype: 'checkbox'
                        , fieldLabel: LS.__translate(LS.Italics)
                        , columnWidth: .3
                        , labelStyle: 'font-style:italic;'
                        , name: 'i'
                    }, {
                        xtype: 'checkbox'
                        , fieldLabel: LS.__translate(LS.Underlined)
                        , labelWidth: 140
                        , columnWidth: .4
                        , labelStyle: 'text-decoration:underline;'
                        , name: 'u'
                    }
                ]
            }
        ]
        }
    ]
    , buttons: [
        {
            text: LS.__translate(LS.Save)
            , action: 'save'
        }, {
            text: LS.__translate(LS.Close)
            , action: 'close'
        }
    ]
});

Ext4.define('VetmanagerApp.modules.administration.view.settings.AdmissionTypeColor', {
    title: LS.__translate(LS.ColorOfDisplayLikeReception)
    , extend: 'Ext4.window.Window'
    , xtype: 'admissiontypewin'
    , width: 500
    , buttonAlign: 'center'
    , modal: true
    , layout: 'fit'
    , items: [
        {
            xtype: 'form'
            , border: false
            , defaults: {
                labelWidth: 150
                , anchor: '100%'
                , padding: '5px'
            }
            , items: [
                {
                    xtype: 'colorfield'
                    , fieldLabel: LS.__translate(LS.Color)
                    , name: 'color'
                }
            ]
        }
    ]
    , buttons: [
        {
            text: LS.__translate(LS.Save)
            , action: 'save'
        }, {
            text: LS.__translate(LS.Close)
            , action: 'close'
        }
    ]
});

