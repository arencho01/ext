Ext4.define('VetmanagerApp.modules.extfilter.view.ExtFilter', {
    extend: 'Ext.window.Window'
    , alias: 'widget.extfilterdlg'
    , xtype: 'extfilterdlg'
    , width: 1200
    , boxMinHeight: 500
    , maxHeight: 600
    , autoScroll: true
    , resizable: false
    , title: LS.__translate(LS.Filter)
    , style: 'box-sizing: border-box;-moz-box-sizing: border-box;-ms-box-sizing: border-box;-webkit-box-sizing: border-box;'
    , modal: true
    , closeAction: 'close'
    , items: [
        {
            xtype: 'panel'
            , border: false
            , height: 50
            , layout: {
                type: 'hbox'
                , defaultMargins: {top: 5, right: 5, bottom: 5, left: 5}
            }
            , items: [
                {
                    xtype: 'label'
                    , text: '#'
                    , width: 36
                }, {
                    xtype: 'label'
                    , text: LS.__translate(LS.Module)
                    , flex: 1
                }, {
                    xtype: 'label'
                    , text: LS.__translate(LS.TableField)
                    , flex: 1
                }, {
                    xtype: 'label'
                    , text: LS.__translate(LS.Operator)
                    , width: 200
                }, {
                    xtype: 'label'
                    , text: LS.__translate(LS.Value)
                    , width: 200
                }, {
                    xtype: 'label'
                    , text: LS.__translate(LS.Dynamic)
                    , width: 150
                    , name: 'isDynamicLabel'
                }, {
                    xtype: 'label'
                    , width: 25
                }
            ]
        }
        , {
            xtype: 'panel'
            , name: 'extfilteritems'
            , border: false
        }
        , {
            xtype: 'panel'
            , layout: 'hbox'
            , border: false
            , name: 'bottomPanel'
            , items: [
                {
                    xtype: 'panel'
                    , border: false
                    , items: [
                        Ext4.create('Ext4.button.Button', {
                            xtype: 'mystupidbutton'
                            , iconCls: 'add'
                            , tooltip: LS.__translate(LS.AddACondition)
                            , action: 'addextfilteritem'
                            , style: {
                                marginLeft: '5px'
                            }
                        })
                    ]
                }
                , {
                    xtype: 'box'
                    , html: '&nbsp;&nbsp;&nbsp;'
                }
                , {
                    xtype: 'hidden'
                    , name: 'id'
                    , value: '0'
                }
                , {
                    xtype: 'fieldset'
                    , width: 1110
                    , height: 100
                    , title: LS.__translate(LS.Pattern)
                    , padding: '5px'
                    , items: [
                        {
                            xtype: 'textarea'
                            , name: 'pattern'
                            , style: {
                                fontSize: '16px'
                            }
                            , height: 50
                            , width: 1095
                        }
                    ]
                }
            ]
        }
    ]
    , buttonAlign: 'center'
    , buttons: [
        {
            text: '<b>' + LS.__translate(LS.Save) + '</b>'
            , height: 35
            , action: 'save'
        }
        , {
            text: LS.__translate(LS.Cancel)
            , action: 'cancel'
        }
    ]
});