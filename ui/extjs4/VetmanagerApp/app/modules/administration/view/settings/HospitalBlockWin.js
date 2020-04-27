Ext4.define('VetmanagerApp.modules.administration.view.settings.HospitalBlockWin', {
    title: LS.__translate(LS.InpatientFacilityBlock)
    , extend: 'Ext4.window.Window'
    , xtype: 'addedithospitalwin'
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
                    xtype: 'hidden'
                    , name: 'id'
                    , value: 0
                }, {
                    xtype: 'textfield'
                    , fieldLabel: LS.__translate(LS.BlockName)
                    , allowBlank: false
                    , name: 'title'
                }, {
                    xtype: 'numberfield'
                    , fieldLabel: LS.__translate(LS.NumberOfPlacesInTheBlock)
                    , allowBlank: false
                    , minValue: 0
                    , name: 'places_count'
                    , labelWidth: 250
                    , value: 1
                }, {
                    xtype: 'numberfield'
                    , fieldLabel: LS.__translate(LS.SparePlaces)
                    , allowBlank: false
                    , minValue: 0
                    , name: 'reserved_places_count'
                    , labelWidth: 250
                    , value: 1
                }, {
                    xtype: 'checkbox'
                    , fieldLabel: LS.__translate(LS.DailyPay)
                    , name: 'is_daily_payment'
                    , inputValue: '1'
                    , uncheckedValue: '0'
                    , labelWidth: 250
                    , listeners: {
                        scope: this
                        , change: function(c, newValue, oldValue, eOpts ) {
                            if (newValue) {
                                c.nextSibling().setValue(false);
                            }
                        }
                    }
                }, {
                    xtype: 'checkbox'
                    , fieldLabel: LS.__translate(LS.HourlyPay)
                    , name: 'is_hourly_payment'
                    , inputValue: '1'
                    , uncheckedValue: '0'
                    , labelWidth: 250
                    , listeners: {
                        scope: this
                        , change: function(c, newValue, oldValue, eOpts ) {
                            if (newValue) {
                                c.previousSibling().setValue(false);
                            }
                        }
                    }
                }
            ]
        }
    ]
    , buttons: [
        {
           text: '<b>' + LS.__translate(LS.Save) + '</b>'
            , height: 35
            , action: 'save'
        }, {
            text: LS.__translate(LS.Close)
            , action: 'close'
            , scope: this
            , handler: function(b) {
                if (b.ownerCt.ownerCt.close) {
                    b.ownerCt.ownerCt.close();
                }
            }
        }
    ]
});