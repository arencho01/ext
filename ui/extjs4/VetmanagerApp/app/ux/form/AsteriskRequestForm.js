Ext.define('Ext4.ux.form.AsteriskRequestForm', {
    alias: 'widget.asteriskrequestform',
    extend: 'Ext4.Panel',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    name: "asterisk_request_panel",
    bodyStyle: "background: #fff",
    border: false,
    padding: '10',
    defaultMargins: {
        top: 10,
        right: 0,
        bottom: 10,
        left: 0
    },
    items:[
        {
            region: "west",
            html: "1",
            width: 450,
            height: 250,
            border: false,
            xtype: 'panel',
            bodyStyle: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            },
            html: '<iframe width="420" height="250" frameborder="0" style="margin: auto" src="https://www.youtube.com/embed/PgnSMLktRhE"></iframe>'
        },
        {
            // height: 88,
            xtype: 'panel',
            html: '<p style="padding:5px;">' + LS.__translate(LS.BeforeIntegrationWithAsterisk) + '</p>',
            style: "margin-right:5px;margin-top:10px; height: auto;",
            bodyStyle: "background-color: #FFFFEE;"
        },
        {
            region:"center",
            xtype:'fieldset',
            title: LS.__translate(LS.ContactForm),
            style: "background: #fff; margin: 5px 5px 0px 0px",
            defaults: {anchor: '98%', labelWidth: '100%'},
            layout: 'anchor',
            name: "asterisk_form",
            height: 202,
            items :[
                {
                    xtype: 'textfield',
                    fieldLabel: LS.__translate(LS.MobilePhoneOfAsteriskAdministrator) + ':',
                    name: 'mobile_asterisk_admin',
                    allowBlank: false,
                    regex: RegexFields.phone,
                    labelAlign: 'top'
                }, {

                    xtype: 'textfield',
                    fieldLabel: LS.__translate(LS.AdministratorName) + ':',
                    name: 'asterisk_admin_name',
                    padding: '10 0 0 0',
                    allowBlank: false
                },
                {
                    border: false,
                    xtype:'panel',
                    html: LS.__translate(LS.ConvenientCallSetupTime) + ':',
                },
                {
                    border: false,
                    xtype: 'fieldset',
                    layout: 'hbox',
                    padding: '10 10 10 0',
                    items: [
                        {
                            xtype: 'displayfield',
                            value: LS.__translate(LS.fromS),
                            width: 20,
                            height: 32
                        },
                        {
                            xtype:'timefield',
                            format: 'H:i',
                            selectOnFocus: true,
                            name: 'start',
                            allowBlank: false,
                            increment: 15,
                            width: 75,
                            value: '09:00',
                            listeners: {
                                change: function (me, value) {
                                    var asteriskForm = me.findParentByType('settings-voip-asterisk-panel');
                                    asteriskForm.query("[name='end']")[0].setMinValue(value);
                                }
                            }
                        },
                        {
                            width: 10,
                            border: false,
                        },
                        {
                            xtype: 'displayfield',
                            value: LS.__translate(LS.poSmall),
                            width: 28,
                            height: 32
                        },
                        {
                            xtype:'timefield',
                            format: 'H:i',
                            selectOnFocus: true,
                            name: 'end',
                            allowBlank: false,
                            increment: 15,
                            width: 75,
                            value: '19:00',
                        },
                        {
                            width: 10,
                            border: false,
                        },
                        {
                            xtype: 'displayfield',
                            border: false,
                            flex: 1,
                            height: 32,
                            value: "(по московск. времени)"
                        }
                    ]
                }
            ]
        },
        {
            height: 30,
            xtype: 'button',
            text: '<span style="color:#FFF">' + LS.__translate(LS.RequestConnection) + '</span>',
            style:"background:green",
            margin: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 0
            },
            handler:function(){
                debugger;
                var asteriskForm = this.findParentByType('asteriskrequestform');
                var mobilePhoneFiled = asteriskForm.query("[name='mobile_asterisk_admin']")[0];
                var adminNameFiled = asteriskForm.query("[name='asterisk_admin_name']")[0];
                var fromFiled = asteriskForm.query("[name='start']")[0];
                var toFiled = asteriskForm.query("[name='end']")[0];

                return;
                if(mobilePhoneFiled.isValid() && adminNameFiled.isValid() && fromFiled.isValid() && toFiled.isValid())
                {
                    Ext.Ajax.request({
                        url: 'ajax_login.php',
                        params: {
                            cmd: 'request_asterist_connect',
                            mobile_asterisk_admin: mobilePhoneFiled.value,
                            asterisk_admin_name: adminNameFiled.value,
                            from: fromFiled.getValue().getHours() + ':' + fromFiled.getValue().getMinutes(),
                            to: toFiled.getValue().getHours() + ':' + toFiled.getValue().getMinutes()
                        },
                        success: function(response){
                            var data = Ext.decode(response.responseText);
                            if(!data.is_error){
                                Ext.Msg.show({
                                    title: LS.__translate("Успех"),
                                    msg: LS.__translate(LS.ApplicationSuccessfullySent),
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.MessageBox.INFO
                                });
                            }else{
                                Ext.Msg.show({
                                    title: LS.__translate(LS.Error),
                                    msg: LS.__translate(data.messages),
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                            }
                        }
                    });
                }
            }
        }
    ]
});