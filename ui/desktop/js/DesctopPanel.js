Ext.ns('Tariff');
Ext.DesktopPanel = function(cfg) {
    Ext.apply(this, cfg);
    this.addEvents('setclinic');
};

Ext.extend(Ext.DesktopPanel, Ext.util.Observable, {
    resizeCounter: 0
    , pageWidth: 1240
    , pageHeight: 600
    , topToolbarHeight: 42
    , settingsWin: null
    , createDesctopPanel: function() {
        var topPanel = new Ext.Panel({
            layout: 'column'
            , region: 'north'
            , border: false
            , height: 38
            , padding: '0px'
            , listeners: {
                scope: this
                , afterlayout: function() {
                    if (this.resizeCounter++ < 1) {
                        return;
                    }
                }
            }
            , items: [
                {
                    xtype: 'panel'
                    , id: 'top-panel-shortcuts'
                    , padding: '0px'
                    , border: false
                    , columnWidth: 1
                    , tbar: new Ext.Toolbar({
                        id: 'top-panel-shortcuts-top-toolbar'
                        , height: 39
                    })
                }, {
                    xtype: 'panel'
                    , id: 'top-panel-info'
                    , layout: 'column'
                    , width: 34
                    , defaultType: 'label'
                    , border: false
                    , bodyCssClass: 'top-panel-background'
                }
            ]
            , bodyCssClass: 'top-panel-background'
        });

        var topNavigationPanel = new Ext.Panel({
            id: 'top-navigation-panel'
            , height: 30
            , padding: '5px'
            , defaultType: 'label'
            , items: []
            , bodyCssClass: 'x-toolbar'
            , border: false
            , hidden: true
        });

        var centerPanel = new Ext.Panel({
            id: 'main-panels-container'
            , boxMinHeight: this.pageHeight - this.topToolbarHeight
            , layout: 'fit'
            , border: false
            , items: []
            , bodyStyle: {
                overflowY: 'auto'
                , overflowX: 'hidden'
            }
        });

        var mainPanel = new Ext.Panel({
            layout: 'border'
            , width: this.pageWidth
            , height: this.pageHeight
            , boxMaxWidth: this.pageWidth
            , style: {
                zoom: '100%'
                , marginLeft: Math.max(0, (Ext.getBody().getWidth() - this.pageWidth) / 2) + 'px'
            }
            , layoutConfig: {
                align: 'stretch'
                , pack: 'start'
            }
            , items: [topPanel, {
                    xtype: 'panel'
                    , region: 'center'
                    , bodyStyle: {
                        overflowY: 'auto'
                        , paddingRight: '15px'
                    }
                    , layout: 'fit'
                    , items: [
                        centerPanel
                    ]
                }
            ]
        });

        new Ext.Viewport({
            items: [mainPanel]
            , layout: 'fit'
            , pageWidth: this.pageWidth
            , pageHeight: this.pageHeight
            , topToolbarHeight: this.topToolbarHeight
            , listeners: {
                resize: function() {

                    var body = Ext.getBody();

                    var centerPanelCt = Ext.getCmp('main-panels-container').ownerCt;
                    if (body.getHeight() + 3 >= this.pageHeight) {
                        if (!centerPanelCt.getResizeEl()) {
                            centerPanelCt.bodyStyle.paddingRight = '0px';
                        }
                    }
                    if (!mainPanel.rendered) {
                        mainPanel.style.marginLeft = Math.max(0, (body.getWidth() - this.pageWidth) / 2) + 'px';
                    } else {
                        mainPanel.el.setStyle({
                            marginLeft: Math.max(0, (body.getWidth() - this.pageWidth) / 2) + 'px'
                        });
                    }

                    return;
                }
            }
        });

        Ext.DomHelper.append(
            Ext.getBody()
            , {
                tag: 'div'
                , id: 'invoice-timer-button-div'
                , style: 'display: none;'
                , html: [
                    '<div id="invoice-timer-button-button" class="vet-button vet-text-button">'
                    + '<span id="invoice-timer-button-time" onfocus="vetBtnFocus(this.id);" onblur="vetBtnBlur(this.id);" tabindex="0" onkeypress="vetBtnKP(event, this.id);" type="button">'
                    + ''
                    + '</span>'
                    + '</div>'
                ].join('')
            }
        );

        Ext.DomHelper.append(
            Ext.getBody()
            , {
                tag: 'div'
                , id: 'medcard-timer-button-div'
                , style: 'display: none;'
                , html: [
                    '<div id="medcard-timer-button-button" class="vet-button vet-text-button">'
                    + '<span id="medcard-timer-button-time" style="line-height:auto" class=" x-btn-text" onfocus="vetBtnFocus(this.id);" onblur="vetBtnBlur(this.id);" tabindex="0" onkeypress="vetBtnKP(event, this.id);" type="button">'
                    + ''
                    + '</span>'
                    + '</div>'
                ].join('')
            }
        );

        Ext.DomHelper.append(
            Ext.getBody()
            , {
                tag: 'div'
                , id: 'inventar-timer-button-div'
                , style: 'display: none;'
                , html: [
                    '<div id="inventar-timer-button-button" class="vet-button vet-text-button">'
                    + '<span id="inventar-timer-button-time" style="line-height:auto" class=" x-btn-text" onfocus="vetBtnFocus(this.id);" onblur="vetBtnBlur(this.id);" tabindex="0" onkeypress="vetBtnKP(event, this.id);" type="button">'
                    + ''
                    + '</span>'
                    + '</div>'
                ].join('')
            }
        );
        Ext.DomHelper.append(
            Ext.getBody()
            , {
                tag: 'div'
                , id: 'payment-timer-button-div'
                , style: 'display: none;'
                , html: [
                    '<div id="payment-timer-button-button" class="vet-button vet-text-button">'
                    + '<span id="payment-timer-button-time" style="line-height:auto" class=" x-btn-text" onfocus="vetBtnFocus(this.id);" onblur="vetBtnBlur(this.id);" tabindex="0" onkeypress="vetBtnKP(event, this.id);" type="button">'
                    + ''
                    + '</span>'
                    + '</div>'
                ].join('')
            }
        );

        if (Ext.isDesktop()) {
            if (_ALLOW_REFERALS) {
                Ext.DomHelper.append(
                    Ext.getBody()
                    , {
                        tag: 'div'
                        , id: 'referal-main-button-div'
                        , html: [
                            '<div id="referal-main-button"  class="vet-button vet-icon-button" >'
                            + '<img src="ui/desktop/images/gift.svg" style="background-repeat: no-repeat; background-image: url(&quot;ui/resources/images_new/settings.svg&quot;)" ></img>'
                            + '</div>'
                        ].join('')
                    }
                );
            }

            Ext.DomHelper.append(
                Ext.getBody()
                , {
                    tag: 'div'
                    , id: 'settings-main-button-div'
                    , html: [
                        '<div id="settings-main-button" class="vet-button vet-text-button">'
                        + '<span onfocus="vetBtnFocus(this.id);" onblur="vetBtnBlur(this.id);" tabindex="0" onkeypress="vetBtnKP(event, this.id);" type="button">'
                        + LS.__translate(LS.Settings)
                        + '</span>'
                        + '</div>'
                    ].join('')
                }
            );

            Ext.DomHelper.append(
                Ext.getBody()
                , {
                    tag: 'div'
                    , id: 'reports-main-button-div'
                    , html: [
                        '<div id="reports-main-button" class="vet-button vet-text-button">'
                        + '<span onfocus="vetBtnFocus(this.id);" onblur="vetBtnBlur(this.id);" tabindex="0" onkeypress="vetBtnKP(event, this.id);" type="button">'
                        + LS.__translate(LS.Reports)
                        + '</span>'
                        + '</div>'
                    ].join('')
                }
            );

            Ext.DomHelper.append(
                Ext.getBody()
                , {
                    tag: 'div'
                    , id: 'gear-main-button-div'
                    , html: [
                        '<div id="gear-main-button"  class="vet-button vet-icon-button" >'
                        + '<img src="ui/desktop/images/s.gif" style="background-repeat: no-repeat; background-image: url(&quot;ui/resources/images_new/settings.svg&quot;)" ></img>' 
                        + '</div>'
                    ].join('')
                }
            );

            Ext.DomHelper.append(
                Ext.getBody()
                , {
                    tag: 'div'
                    , id: 'version-vetmanager-timer-button-div'
                    , style: 'display: none;'
                    , html: [
                        '<div class="timer-pulse">'
                        + '<div id="version-vetmanager-timer-button-button" class="VP5otc-HT6HAf J-J5-Ji x-btn-noicon" style="width: auto;">'
                        + '<div class="QwThFe J-Zh-I J-J5-Ji W6eDmd L3" style="width:auto; height: auto; margin: 0px;">'
                        + '<div class="QkhFhe">'
                        + '<span id="version-vetmanager-timer-button-time" style="line-height:auto" class=" x-btn-text" onfocus="vetBtnFocus(this.id);" onblur="vetBtnBlur(this.id);" tabindex="0" onkeypress="vetBtnKP(event, this.id);" type="button">'
                        + ''
                        + '</span>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                    ]
                }
            );

            Ext.DomHelper.append(
                Ext.getBody()
                , {
                    tag: 'div'
                    , id: 'import-main-button-div'
                    , html: [
                        '<div id="import-main-button" class="vet-button vet-text-button">'
                        + '<span onfocus="vetBtnFocus(this.id);" onblur="vetBtnBlur(this.id);" tabindex="0" onkeypress="vetBtnKP(event, this.id);" type="button">'
                        + 'Импорт' //TODO: translate
                        + '</span>'
                        + '</div>'
                    ].join('')
                }
            );
        }

        var isAmiListen = function() {
            return ((Ext.util.Cookies.get('enable_listen_ami_' + _CURRENT_USER) || 0) == 1);
        };

        if (_VOIP_AMI_ENABLED) {
            Ext.DomHelper.append(
                Ext.getBody()
                , {
                    tag: 'div'
                    , id: 'listen-ami-button-div'
                    , html: [
                        '<div id="listen-ami-button" class="vet-button vet-icon-button">'
                                    + '<img src="ui/desktop/images/s.gif" class="' + (isAmiListen() ? 'enabled-call' : 'disabled-call') + '"></img>'
                        + '</div>'
                    ].join('')
                }
            );
        }

        var referalBtn = Ext.get('referal-main-button');
        if (referalBtn) {
            var referalTip = new Ext.ToolTip({
                id : 'teferalTip',
                target : referalBtn,
                anchor : 'left',
                title : LS.__translate(LS.ReferalProgram)
            });
            referalBtn.on('click', function() {
                var refWin = new Ext.ux.window.ReferalInfo({accountId: _BILL_ACCOUNT_ID});
                refWin.show();
            }, this);
            referalBtn.on('mouseenter', function() {
                referalTip.show();
            }, this);
        }

        var settingsBtn = Ext.get('settings-main-button');
        if (settingsBtn) {
			settingsTip = new Ext.ToolTip({
				id : 'settingsTip',
				target : settingsBtn,
				anchor : 'left',
				title : LS.__translate(LS.AllSettings)
			});
            settingsBtn.on('click', function() {
                var cur_module = Ext.app.PanelsManager.getCurMainModuleName();
                this.showSettings(cur_module);
            }, this);
			settingsBtn.on('mouseenter', function() {
				settingsTip.show();
            }, this);
        }

        var importBtn = Ext.get('import-main-button');

        if (importBtn) {
            var importTip = new Ext.ToolTip({
				id : 'importTip',
				target : importBtn,
				anchor : 'left',
				title : 'Импорт'
			});
            importBtn.on('click', function() {
                new Ext.ImportComponentSelectWin().show();
            }, this);
            importBtn.on('mouseenter', function() {
                importTip.show();
            }, this);
        }

        var reportsBtn = Ext.get('reports-main-button');
        if (reportsBtn) {
            reportsBtn.on('click', function() {
                var cur_module = Ext.app.PanelsManager.getCurMainModuleName();
                this.showReports(cur_module);
            }, this);
        }

        var gearBtn = Ext.get('gear-main-button');
        if (gearBtn) {
			var gearTip = new Ext.ToolTip({
				id : 'gearTip',
				target : gearBtn,
				anchor : 'left',
				title : LS.__translate(LS.UserSettings)
			});
            gearBtn.on('click', function() {
                this.showUserSettingsWindow();
            }, this);
			gearBtn.on('mouseenter', function() {
				gearTip.show();
            }, this);
        }

        var amiBtn = Ext.get('listen-ami-button');
        if (amiBtn) {
            var amiListenTip = new Ext.ToolTip({
                id : 'amiListenTip',
                target : amiBtn,
                anchor : 'left',
                title : LS.__translate(LS.ListenAMIEvents)
            });
            amiBtn.on('click', function() {
                VetManager.VOIPStatic.toggleListenAMI();
            }, this);
            amiBtn.on('mouseenter', function() {
                amiListenTip.show();
            }, this);

            var checkAmiEnabled = function() {
                var img = Ext.select('#listen-ami-button-div img').last();
                if (img) {
                    if (isAmiListen()) {
                        img.addClass('enabled-call');
                        img.removeClass('disabled-call');
                    } else {
                        img.removeClass('enabled-call');
                        img.addClass('disabled-call');
                    }
                }
            };

            VetManager.GlobalEvents.on('change_listen_ami', checkAmiEnabled);
        }

        var maximizeBnt = new Ext.ux.VetIconButton({
            iconCls: 'maximize-btn',
            renderTo: Ext.getBody(),
            id: 'maximizeBtn',
            style: {
                position: 'absolute',
                top: '0px',
                right: '0px'
            },
            width: 31,
            height: 30,
            hidden: true,
            handler: function(btn) {
                var mp = Ext.app.PanelsManager.mainPanel
                    , parentMP = mp.ownerCt.ownerCt
                    , maxWidth = Ext.getBody().getWidth() - 66;
                if (mp) {
                    if (parentMP.boxMaxWidth != 1240) {
                        btn.setIconClass('maximize-btn');
                        parentMP.boxMaxWidth = 1240;
                        parentMP.setWidth(1240);
                        parentMP.el.setStyle({
                            marginLeft: ((maxWidth - 1240 + 66) / 2) + 'px'
                        });
                        mp.ownerCt.previousSibling().show();
                        mp.ownerCt.el.setStyle('top', '38px');

                        mp.items.each(function(panel) {
                            panel.setHeight(Ext.getBody().getHeight() - 4 - 38);
                            panel.setWidth(1240);
                            panel.doLayout();
                        });
                    } else {
                        btn.setIconClass('minimize-btn');
                        parentMP.boxMaxWidth = maxWidth;
                        parentMP.setWidth(maxWidth);
                        parentMP.el.setStyle({
                            marginLeft: '33px'
                        });
                        mp.ownerCt.previousSibling().hide();
                        mp.ownerCt.el.setStyle('top', '0px');

                        mp.items.each(function(panel) {
                            panel.setHeight(Ext.getBody().getHeight() - 4);
                            panel.setWidth(maxWidth);
                            panel.doLayout();
                        });
                    }
                }
            }
        });
    }
    , createWindow: function(config, cls) {
        return new (cls || Ext.Window)(
                Ext.applyIf(config || {}, {
                    minimizable: false
                    , maximizable: false
                    , resizable: false
                    , modal: true
                })
                );
    }
    , showWhoOnline: function() {
        var usersPanel = new Ext.FormPanel({
            width: '200'
            , padding: 5
            , items: []
        });

        var wnd = this.createWindow({
            title: LS.__translate(LS.Online)
            , width: 230
            , height: 400
            , plain: true
            , border: false
            , autoScroll: true
            , items: [usersPanel]
        });
        wnd.show();

        var setWhoOnline = function(response) {
            var responseObject = Ext.decode(response.responseText);
            var users = responseObject.online_users;

            if (users.length > 0) {
                if (users.length < 18) {
                    wnd.autoHeight = true;
                    wnd.setWidth(213);
                }

                for (var i = 0; i < users.length; i++) {
                    usersPanel.add({xtype: 'label', id: 'online-users-' + users[i].id, html: '<div class="online-user">' + users[i].nickname + '</div>'});
                }
                usersPanel.doLayout();
                wnd.doLayout();
            }
        }

        Ext.Ajax.request({
            url: 'ajax_login.php'
            , params: {cmd: 'get_online_users'}
            , scope: this
            , success: setWhoOnline
        });
    }
    , showProblemReport: function() {
        VetManager.getModule('index').showAddBugDlg(this);
    }
    , showChat: function() {
        var c = VetManager.getModule('vetchat');

        if (_IS_CHAT_OPEN && this.chatWin) {
            this.chatWin.maximize(this.chatWin);
            return;
        }

        var width = 320
                , height = 400;

        this.chatWin = new Ext.Window({
            title: LS.__translate(LS.Chat)
            , minimizable: true
            , id: 'chat-window'
            , maximizable: true
            , maximized: false
            , resizable: false
            , modal: false
            , layout: 'fit'
            , width: width
            , height: height
            , items: [c.getMainPanel()]
            , state: 'maximized'
            , listeners: {
                scope: this
                , beforeclose: function() {
                    _IS_CHAT_OPEN = false;
                    c.closeChat();
                }
                , maximize: function(w) {
                    if ('minimized' == w.state) {
                        w.restore(w);
                    } else {
                        w.state = 'maximized';
                        c.maximize(w);
                        w.tools.minimize.hide();
                    }
                    Ext.getCmp('chat-input-text').focus(200);
                }
                , minimize: function(w) {
                    w.state = 'minimized';
                    var pos = w.getPosition();
                    w.setHeight(40);
                    w.tools.minimize.hide();
                    w.setPosition(pos[0], Ext.getBody().getHeight() - 40);
                    c.minimize(w);
                }
                , restore: function(w) {
                    w.state = 'restored';
                    var b = Ext.getBody();
                    w.setSize(width, height);
                    w.setPosition(b.getWidth() - width, b.getHeight() - height);
                    w.tools.minimize.show();
                    c.restore(w);
                    Ext.getCmp('chat-input-text').focus(200);
                }
                , show: function(w) {
                    w.maximize(w);
                }
            }
        });

        this.chatWin.show();

        _IS_CHAT_OPEN = true;
    }
    , showAbout: function() {
        Ext.Ajax.request({
            url: 'VERSION'
            , scope: this
            , params: ''
            , success: function(result) {
                this.createWindow({
                    title: LS.__translate(LS.AboutSystem)
                    , width: 360
                    , autoHeight: true
                    , items: [
                        {
                            xtype: 'panel'
                            , border: false
                            , padding: '30px'
                            , items: [
                                {
                                    xtype: 'box'
                                    , html: 'Vetmanager JS'
                                    , style: {
                                        fontSize: '40px'
                                    }
                                }, {
                                    xtype: 'box'
                                    , html: LS.__translate(LS.Version) +' '+ result.responseText
                                    , style: {
                                        fontSize: '20px'
                                    }
                                }
                            ]
                        }
                    ]
                }).show();
            }
        });
    }
    , changeWorkspace: function() {
        window.onbeforeunload = null;

        Ext.WorkspacesWin.show({
            closable: true
            , modal: true
        });
    }
    , changeClinic: function() {
        var win = new Ext.Window({
            title: LS.__translate(LS.ChangingTheClinic),
            modal: true,
            layout: 'fit',
            width: 350,
            height: 135,
            items: {
                xtype: 'form',
                padding: 5,
                border: false,
                items: {
                    xtype: 'loadingcombo',
                    anchor: '100%',
                    fieldLabel: LS.__translate(LS.Clinic),
                    valueField: 'id',
                    displayField: 'title',
                    editable: false,
                    triggerAction: 'all',
                    mode: 'local',
                    store: new Ext.data.JsonStore({
                        idProperty : 'id',
                        root : 'data',
                        fields : ['id', 'title'],
                        url : 'ajax_login.php',
                        baseParams : {
                            cmd : 'get_clinics_for_user'
                        },
                        autoLoad : false,
                        listeners : {
                            load: function() {
                                win.el.unmask();
                            }
                        }
                    })
                }
            },
            buttons: [
                {
                    xtype: 'vetbutton'
                    , text: '<b>' + LS.__translate(LS.Change2) + '</b>'
                    , height: 35
                    , handler: function() {
                        var newClinicId = win.items.get(0).items.get(0).getValue();
                        if (newClinicId != _CLINIC_ID) {
                            Ext.Msg.show({
                                title: LS.__translate(LS.Warning)
                                , msg: LS.__translate(LS.DuringTheNextOperationTheDataThatIsNotCurrentlyStoredMayBeLost) + '<br />' + LS.__translate(LS.continue) + '?'
                                , buttons: Ext.Msg.YESNO
                                , icon: Ext.MessageBox.WARNING
                                , minWidth: 450
                                , fn: function(btn) {
                                    if (btn == 'yes') {
                                        win.el.mask();
                                        Ext.Ajax.request({
                                            url: 'ajax_login.php',
                                            params: {
                                                cmd: 'force_change_clinic',
                                                new_clinic_id: newClinicId
                                            },
                                            success: function(r) {
                                                var data = Ext.decode(r.responseText);
                                                if (!data.is_error) {
                                                    window.onbeforeunload = null;
                                                    window.location.reload(true);
                                                } else {
                                                    Common.showErrors(r);
                                                }
                                            }
                                        })
                                    }
                                }
                            });
                        } else {
                            Ext.Msg.show({
                                title: LS.__translate(LS.Warning)
                                , msg: 'Нельзя сменить клинику на текущую.'
                                , buttons: Ext.Msg.OK
                                , icon: Ext.MessageBox.WARNING
                                , minWidth: 450
                            });
                        }
                    }
                },
                {
                    xtype: 'vetbutton',
                    text: LS.__translate(LS.Cancel),
                    handler: function() {
                        win.close();
                    }
                }
            ]
        });
        win.show(undefined, function() {
            win.el.mask();
            win.items.get(0).items.get(0).setLoadValue(_CLINIC_ID);
        });
    }
    , getMainMenuConfigPanel: function(outerFn) {
        var mainMenuCofig = new VetManager.MainMenuConfig.Controller();
        mainMenuCofig.view.on('closeBtnClick', function() {
            outerFn.onClose();
        }, this);
        return mainMenuCofig.getView();
    }
    , showSettings: function(cur_module) {
        var c = VetManager.getModule('administration');

        c.hasAccess('administration', function() {
            Ext4.create('Ext4.window.Window', {
                title: LS.__translate(LS.Settings)
                , layout: 'fit'
                , minimizable: false
                , maximizable: false
                , maximized: true
                , draggable: false
                , resizable: false
                , modal: true
                , id: 'mainSettingsWindow'
                , items: [
                    c.getMainPanel(cur_module)
                ]
                , listeners: {
                    scope: this
                    , close: function() {
                        window.onbeforeunload = null;
                            Ext.VMSession.destroy(function() {
                                document.location.reload();
                            });
                    }
                    , show: function() {
                            Ext3.MsgManager.alert('Системное сообщение'
                                    , 'После закрытия окна настроек страница автоматически перезагрузится');
                    }
                }
            }).show();
        });
    }
    , editProfile: function() {
        var userId = _CURRENT_USER
            , vm = VetManager.getModule('users');

        vm.showEditProfileById({userId: userId});
    }
    , showReports: function(curModule) {
        var c = VetManager.getModule('reports_constructor');
        c.hasAccess('reports_constructor', function() {
            c.showReportsByModule(curModule);
        });
    }
    , showClearStatesWindow: function(states) {
        if (states && Ext.encode(states) != '{}') {
            var msg = LS.__translate(LS.areYouSureYouWantToResetSettings),
                stateIds = [];
            for (var g in states) {
                msg += '<br />' + states[g].title;
                for (var i = 0; i < states[g].ids.length; i++) {
                    stateIds.push(states[g].ids[i]);
                }
            }
            Ext.Msg.show({
                title: LS.__translate(LS.clearingTheUsersSettings)
                , msg: msg
                , buttons: Ext.Msg.OKCANCEL
                , icon: Ext.MessageBox.WARNING
                , minWidth: 450
                , fn: function(btn) {
                    if (btn == 'ok') {
                        for (var i = 0; i < stateIds.length; i++) {
                            GlobalConf.clearState(stateIds[i]);
                        }
                        Common.showMessageRefreshPage();
                    }
                }
            });
        }
    }
    , showUserSettingsWindow: function() {
        VM.UserSettings.showCurrentSettings();
    }

});