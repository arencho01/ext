Ext4.define('VetmanagerApp.modules.administration.view.settings.StartWizardSteps.Step2', {
    extend: 'Ext.form.Panel'
    , xtype: 'StartWizardStep2'
    , frame: true
    , border: false
    , cls: ['noborder']
    , padding: '5px'
    , defaults: {
        anchor: '100%'
        , labelWidth: 90
    }
    , showConfig: {
        step: 1
        , is_first_step: false
        , is_last_step: false
        , width: 480
        , height: 530
        , title: '<center><b>'+LS.__translate(LS.ClinicInfo)+'</b></center>'
        , buttons: ['back', 'forward'] 
        , stepText: LS.__translate(LS.StepNumberFromTotalSteps, 2, 8)
    }
    , items: [
        {
            xtype: 'hidden'
            , name: 'clinic_id'
        }, {
            xtype: 'textfield'
            , name: 'title'
            , allowBlank: false
            , fieldLabel: LS.__translate(LS.Namez)
        }, {
            xtype: 'combo'
            , fieldLabel: LS.__translate(LS.Country)
            , editable: false
            , queryMode: 'local'
            , displayField: 'title'
            , valueField: 'name'
            , name: 'country'
            , allowBlank: false
            , value: 'russia'
            , store: {
                fields: ['name', 'title']
                , data : [
                    {name: 'russia', title: LS.__translate(LS.Russia)}
                    , {name: 'ukraine', title: LS.__translate(LS.Ukraine)}
                    , {name: 'belarus', title: LS.__translate(LS.Belarus)}
                    , {name: 'uzbekistan', title: LS.__translate(LS.Uzbekistan)}
                    , {name: 'kazahstan', title: LS.__translate(LS.Kazakhstan)}
                    , {name: 'turkmenia', title: LS.__translate(LS.Turkmenistan)}
                    , {name: 'tadjikistan', title: LS.__translate(LS.Tajikistan)}
                    , {name: 'moldavia', title: LS.__translate(LS.Moldova)}
                    , {name: 'kirgiziya', title: LS.__translate(LS.Kyrgyzstan)}
                    , {name: 'armenia', title: LS.__translate(LS.Armenia)}
                    , {name: 'azerbaijan', title: LS.__translate(LS.Azerbaijan)}
                    , {name: 'georgia', title: LS.__translate(LS.Georgia)}
                    , {name: 'other', title: LS.__translate(LS.OtherShe)}
                ]
            }
            , listeners: {
                scope: this
                , select: function(v) {
                    var val = v.getValue()
                        , prist = v.ownerCt.query('textfield[name="unisender_phone_pristavka"]')[0]
                        , mask = v.ownerCt.query('combo[name="phone_mask"]')[0];

                    var maskObj = Common.getPhoneMaskObject(val);
                    prist.setValue(maskObj.prist);
                    prist.maxLength = maskObj.maxLength;
                    prist.minLength = maskObj.minLength;
                    prist.labelEl.setHTML(LS.__translate(LS.__translate(LS.CountryCodeExample) + maskObj.prist + ':'));
                    mask.setValue(maskObj.mask);

                    prist.isValid();
                }
            }
        }, {
            xtype: 'textfield'
            , name: 'city'
            , allowBlank: false
            , fieldLabel: LS.__translate(LS.City)
        }, {
            xtype: 'textfield'
            , name: 'address'
            , allowBlank: false
            , fieldLabel: LS.__translate(LS.Address)
        }, {
            xtype: 'textfield'
            , name: 'phone'
            , allowBlank: false
            , fieldLabel: LS.__translate(LS.ClinicPhone)
            , labelWidth: 200
        }, {
            xtype: 'textfield'
            , name: 'unisender_phone_pristavka'
            , maxLength: 2
            , allowBlank: false
            , value: '7'
            , labelWidth: 200
            , fieldLabel: LS.__translate(LS.CountryCodeExample7)
            , maskRe: /[0-9]/
        }, {
            xtype: 'combo'
            , fieldLabel: LS.__translate(LS.MobilePhoneMask)
            , editable: false
            , queryMode: 'local'
            , displayField: 'title'
            , valueField: 'value'
            , name: 'phone_mask'
            , allowBlank: false
            , labelWidth: 200
            , value: '(___)___-__-__'
            , store: {
                xtype: 'store'
                , fields: ['value', 'title']
                , data: Common.getMaskDataForComboData()
            }
            , listeners: {
                scope: this
                , select: function(v) {
                    var prist = v.previousSibling()
                        , val = v.getValue();
                    Common.setMinMaxPristavkaMaskToInput(prist, val);
                }
            }
        }, {
            xtype: 'fieldset'
            , title: LS.__translate(LS.ClinicTimeZone)
            , layout: 'column'
            , items: [
            {
				xtype: 'combobox'
                , triggerAction: 'all'
                , columnWidth: .7
                , name: 'timezone'
                , valueField: 'value'
                , displayField: 'title'
                , labelStyle: 'width:400px;'
                , value: 'Europe/Kiev'
                , mode: 'local'
                , minChars: 2
                , allowBlank: false
                , store: {
                    xtype: 'json'
                    , fields: ['value', 'title']
                    , autoLoad: true
                    , proxy: {
						type: 'ajax',
						url: 'ajax_administration.php?cmd=get_timezones_combo_list',
						reader: {
							type: 'json',
							root: 'data',
							idProperty: 'value',
							totalProperty: 'total'
						}
					}
				}					
			}
			]
        }
    ]
});