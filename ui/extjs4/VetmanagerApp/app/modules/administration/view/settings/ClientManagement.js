Ext4.define('VetmanagerApp.modules.administration.view.settings.ClientManagement', {
    extend: 'Ext4.tab.Panel',
    xtype: 'clientmanagement',
    border: false,
    region: 'center',
    title: false,
    scope: this,
    buttonAlign: 'center',
    activeTab: 0,
    requires: [
        'Ext4.ux.form.ItemSelector',
        'Ext4.ux.ColorField',
        'Ext4.ux.VerticalTabs',
        'Ext4.ux.form.ItemSelector'
    ],
    items: [
        {
            xtype: 'form',
            title: LS.__translate(LS.GeneralSettings),
            border: false,
            accessType: false,
            padding: '10px',
            items: [
                {
                    xtype: 'checkbox',
                    labelWidth: 250,
                    name: 'force_filter',
                    fieldLabel: LS.__translate(LS.ObligatoryInputOfTheFilter)
                }, {
                    xtype: 'fieldset',
                    title: LS.__translate(LS.BackgroundColor),
                    defaults: {
                        labelWidth: 250
                    },
                    items: [
                        {
                            xtype: 'colorfield',
                            editable: false,
                            name: 'positive_balance',
                            fieldLabel: LS.__translate(LS.PositiveBalance)
                        }, {
                            xtype: 'colorfield',
                            editable: false,
                            name: 'zero_balance',
                            fieldLabel: LS.__translate(LS.ZeroBalance)
                        }, {
                            xtype: 'colorfield',
                            editable: false,
                            name: 'negative_balance',
                            fieldLabel: LS.__translate(LS.NegativeBalance)
                        }, {
                            xtype: 'colorfield',
                            editable: false,
                            name: 'blacklist',
                            fieldLabel: LS.__translate(LS.BlackList)
                        }
                    ]
                }, {
                    xtype: 'fieldset',
                    title: LS.__translate(LS.FontColor),
                    defaults: {
                        labelWidth: 250
                    },
                    items: [
                        {
                            xtype: 'colorfield',
                            editable: false,
                            name: 'active_clients',
                            fieldLabel: LS.__translate(LS.ActivatedClients)
                        }, {
                            xtype: 'colorfield',
                            editable: false,
                            name: 'deactived_clients',
                            fieldLabel: LS.__translate(LS.NotActivatedClients)
                        }, {
                            xtype: 'colorfield',
                            editable: false,
                            name: 'temporary_clients',
                            fieldLabel: LS.__translate(LS.TemporaryClients)
                        }
                    ]
                }
            ]
        }, {
            xtype: 'form',
            title: LS.__translate(LS.FilterUnitAdjustment),
            border: false,
            accessType: false,
            padding: '10px',
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'verticaltabs',
                    name: 'client-filter-block',
                    width: 150,
                    store: {
                        xtype: 'store',
                        fields: ['number', 'title'],
                        data: [
                            {number: 0, title: LS.__translate(LS.Clients)},
                            {number: 1, title: LS.__translate(LS.Waiting3)},
                            {number: 2, title: LS.__translate(LS.Planned)},
                            {number: 3, title: LS.__translate(LS.AcceptedArchive)},
                            {number: 4, title: LS.__translate(LS.Overdue)},
                            {number: 5, title: LS.__translate(LS.Medcards)},
                            {number: 6, title: LS.__translate(LS.Files)}
                        ]
                    }
                }, {
                    xtype: 'panel',
                    layout: 'card',
                    flex: 1,
                    border: false,
                    name: 'client-filter-main-panel',
                    items: [
                        {
                            title: LS.__translate(LS.FilterClients),
                            number: 0,
                            border: false,
                            layout: 'fit',
                            items: [{
                                xtype: 'itemselector',
                                anchor: '100%',
                                filter_type: 'clients_default',
                                displayField: 'title',
                                valueField: 'name',
                                fromTitle: LS.__translate(LS.AllFields),
                                toTitle: LS.__translate(LS.FieldsSelected),
                                store: {
                                    xtype: 'store',
                                    fields: ['name', 'title'],
                                    data: [
                                        {name: 'last_name', title: LS.__translate(LS.LastName)},
                                        {name: 'first_name', title: LS.__translate(LS.Name)},
                                        {name: 'pet_note', title: LS.__translate(LS.PetNote2)},
                                        {name: 'middle_name', title: LS.__translate(LS.SecondName)},
                                        {name: 'email', title: LS.__translate(LS.Email)},
                                        {name: 'number', title: LS.__translate(LS.Number)},
                                        {name: 'clinic', title: LS.__translate(LS.Clinic)},
                                        {name: 'client_type', title: LS.__translate(LS.ClientType)},
                                        {name: 'client_status', title: LS.__translate(LS.ClientStatus)},
                                        {name: 'how_find', title: LS.__translate(LS.InWhatWayWasFound)},
                                        {name: 'discount', title: LS.__translate(LS.Discount)},
                                        {name: 'balance', title: LS.__translate(LS.Balance)},
                                        {name: 'phone', title: LS.__translate(LS.PhoneNumber)},
                                        {name: 'city', title: LS.__translate(LS.City)},
                                        {name: 'street', title: LS.__translate(LS.Street)},
                                        {name: 'apartment', title: LS.__translate(LS.HouseApartment)},
                                        {name: 'passport', title: LS.__translate(LS.PassportNoSeries)},
                                        {name: 'discount_card', title: LS.__translate(LS.DiscountCard)},
                                        {name: 'from_ext', title: LS.__translate(LS.TheLastVisitFrom)},
                                        {name: 'to_ext', title: LS.__translate(LS.po)},
                                        {name: 'pet_alias', title: LS.__translate(LS.Alias)},
                                        {name: 'pet_lab_number', title: LS.__translate(LS.LaboratoryNo)},
                                        {name: 'client_number_of_journal', title: LS.__translate(LS.ClientLogNo)},
                                        {name: 'pet_chip_number', title: LS.__translate(LS.PetChipNo)},
                                        {name: 'pet_type', title: LS.__translate(LS.Type)},
                                        {name: 'pet_color', title: LS.__translate(LS.PetColor)},
                                        {name: 'pet_birthday', title: LS.__translate(LS.DateOfBirthOfThePet)},
                                        {name: 'pet_breed', title: LS.__translate(LS.Breed)},
                                        {name: 'pet_sex', title: LS.__translate(LS.Sex)},
                                        {name: 'diagnos', title: LS.__translate(LS.Diagnosis)},
                                        {name: 'doctor', title: LS.__translate(LS.AttendingPhysician)},
                                        {name: 'discount_card_type', title: LS.__translate(LS.DiscountType)},
                                        // , {name: 'not_actived', title: LS.__translate(LS.Inactive)},
                                        {name: 'in_blacklist', title: LS.__translate(LS.InTheBlackList)},
                                        {name: 'from_creating', title: LS.__translate(LS.RegistrationDateFrom)},
                                        {name: 'to_creating', title: LS.__translate(LS.RegistrationDateTo)}
                                    ]
                                }
                            }]
                        }, {
                            title: LS.__translate(LS.FilterWaiting),
                            number: 1,
                            border: false,
                            layout: 'fit',
                            items: [{
                                xtype: 'itemselector',
                                anchor: '100%',
                                displayField: 'title',
                                filter_type: 'waiting_default',
                                valueField: 'name',
                                fromTitle: LS.__translate(LS.AllFields),
                                toTitle: LS.__translate(LS.FieldsSelected),
                                store: {
                                    xtype: 'store',
                                    fields: ['name', 'title'],
                                    data: [
                                        {name: 'last_name', title: LS.__translate(LS.LastName)},
                                        {name: 'first_name', title: LS.__translate(LS.Name)},
                                        {name: 'clinic', title: LS.__translate(LS.Clinic)},
                                        {name: 'discount_card', title: LS.__translate(LS.DiscountCard)},
                                        {name: 'from', title: LS.__translate(LS.TheLastVisitFrom)},
                                        {name: 'to', title: LS.__translate(LS.po)},
                                        {name: 'pet_alias', title: LS.__translate(LS.Alias)},
                                        {name: 'pet_type', title: LS.__translate(LS.Type)},
                                        {name: 'pet_breed', title: LS.__translate(LS.Breed)},
                                        {name: 'doctor', title: LS.__translate(LS.AttendingPhysician)},
                                        {name: 'meet_reason', title: LS.__translate(LS.purposeOfAdmission)},
                                        {name: 'reception_write_channel', title: LS.__translate(LS.AdministrationSettingsTabPlannedFilterChannel)}
                                    ]
                                }
                            }]
                        }, {
                            title: LS.__translate(LS.FilterScheduled),
                            number: 2,
                            border: false,
                            layout: 'fit',
                            items: [{
                                xtype: 'itemselector',
                                anchor: '100%',
                                displayField: 'title',
                                filter_type: 'planned_default',
                                valueField: 'name',
                                fromTitle: LS.__translate(LS.AllFields),
                                toTitle: LS.__translate(LS.FieldsSelected),
                                store: {
                                    xtype: 'store',
                                    fields: ['name', 'title'],
                                    data: [
                                        {name: 'last_name', title: LS.__translate(LS.LastName)},
                                        {name: 'first_name', title: LS.__translate(LS.Name)},
                                        {name: 'clinic', title: LS.__translate(LS.Clinic)},
                                        {name: 'discount_card', title: LS.__translate(LS.DiscountCard)},
                                        {name: 'from', title: LS.__translate(LS.ThePeriodFrom)},
                                        {name: 'to', title: LS.__translate(LS.po)},
                                        {name: 'pet_alias', title: LS.__translate(LS.Alias)},
                                        {name: 'doctor', title: LS.__translate(LS.AttendingPhysician)},
                                        {name: 'meet_reason', title: LS.__translate(LS.purposeOfAdmission)},
                                        {name: 'accepted', title: LS.__translate(LS.Accepted)},
                                        {name: 'reception_write_channel', title: LS.__translate(LS.AdministrationSettingsTabPlannedFilterChannel)}
                                    ]
                                }
                            }]

                        }, {
                            title: LS.__translate(LS.FilterReceivedArchive),
                            number: 3,
                            border: false,
                            layout: 'fit',
                            items: [{
                                xtype: 'itemselector',
                                anchor: '100%',
                                displayField: 'title',
                                filter_type: 'accepted_default',
                                valueField: 'name',
                                fromTitle: LS.__translate(LS.AllFields),
                                toTitle: LS.__translate(LS.FieldsSelected),
                                store: {
                                    xtype: 'store',
                                    fields: ['name', 'title'],
                                    data: [
                                        {name: 'last_name', title: LS.__translate(LS.LastName)},
                                        {name: 'first_name', title: LS.__translate(LS.Name)},
                                        {name: 'clinic', title: LS.__translate(LS.Clinic)},
                                        {name: 'discount_card', title: LS.__translate(LS.DiscountCard)},
                                        {name: 'from', title: LS.__translate(LS.TheLastVisitFrom)},
                                        {name: 'to', title: LS.__translate(LS.po)},
                                        {name: 'pet_alias', title: LS.__translate(LS.Alias)},
                                        {name: 'pet_type', title: LS.__translate(LS.Type)},
                                        {name: 'pet_breed', title: LS.__translate(LS.Breed)},
                                        {name: 'pet_sex', title: LS.__translate(LS.Sex)},
                                        {name: 'doctor', title: LS.__translate(LS.AttendingPhysician)},
                                        {name: 'meet_reason', title: LS.__translate(LS.purposeOfAdmission)},
                                        {name: 'reception_write_channel', title: LS.__translate(LS.AdministrationSettingsTabPlannedFilterChannel)}
                                    ]
                                }
                            }]

                        }, {
                            title: LS.__translate(LS.FilterOverdue),
                            number: 4,
                            border: false,
                            layout: 'fit',
                            items: [{
                                xtype: 'itemselector',
                                anchor: '100%',
                                displayField: 'title',
                                filter_type: 'delayed_default',
                                valueField: 'name',
                                fromTitle: LS.__translate(LS.AllFields),
                                toTitle: LS.__translate(LS.FieldsSelected),
                                store: {
                                    xtype: 'store',
                                    fields: ['name', 'title'],
                                    data: [
                                        {name: 'last_name', title: LS.__translate(LS.LastName)},
                                        {name: 'first_name', title: LS.__translate(LS.Name)},
                                        {name: 'clinic', title: LS.__translate(LS.Clinic)},
                                        {name: 'discount_card', title: LS.__translate(LS.DiscountCard)},
                                        {name: 'from', title: LS.__translate(LS.TheLastVisitFrom)},
                                        {name: 'to', title: LS.__translate(LS.po)},
                                        {name: 'pet_alias', title: LS.__translate(LS.Alias)},
                                        {name: 'pet_type', title: LS.__translate(LS.Type)},
                                        {name: 'pet_breed', title: LS.__translate(LS.Breed)},
                                        {name: 'doctor', title: LS.__translate(LS.AttendingPhysician)},
                                        {name: 'meet_reason', title: LS.__translate(LS.purposeOfAdmission)},
                                        {name: 'reception_write_channel', title: LS.__translate(LS.AdministrationSettingsTabPlannedFilterChannel)}
                                    ]
                                }
                            }]

                        }, {
                            title: LS.__translate(LS.Medcards),
                            number: 1,
                            border: false,
                            layout: 'fit',
                            items: [{
                                xtype: 'itemselector',
                                anchor: '100%',
                                displayField: 'title',
                                filter_type: 'medcard_archive_default',
                                valueField: 'name',
                                fromTitle: LS.__translate(LS.AllFields),
                                toTitle: LS.__translate(LS.FieldsSelected),
                                store: {
                                    xtype: 'store',
                                    fields: ['name', 'title'],
                                    data: [
                                        {name: 'last_name', title: LS.__translate(LS.LastName)},
                                        {name: 'first_name', title: LS.__translate(LS.Name)},
                                        {name: 'from', title: LS.__translate(LS.TheLastVisitFrom)},
                                        {name: 'to', title: LS.__translate(LS.po)},
                                        {name: 'pet_alias', title: LS.__translate(LS.Alias)},
                                        {name: 'pet_type', title: LS.__translate(LS.Type)},
                                        {name: 'pet_breed', title: LS.__translate(LS.Breed)},
                                        {name: 'pet_sex', title: LS.__translate(LS.Sex)},
                                        {name: 'doctor', title: LS.__translate(LS.AttendingPhysician)},
                                        {name: 'meet_reason', title: LS.__translate(LS.purposeOfAdmission)},
                                        {name: 'diagnos', title: LS.__translate(LS.Diagnosis)},
                                        {name: 'number', title: LS.__translate(LS.Number)},
                                        {name: 'clinic', title: LS.__translate(LS.Clinic)}
                                    ]
                                }
                            }]
                        }, {
                            title: LS.__translate(LS.Files),
                            number: 6,
                            border: false,
                            layout: 'fit',
                            items: [{
                                xtype: 'itemselector',
                                anchor: '100%',
                                displayField: 'title',
                                filter_type: 'files_default',
                                valueField: 'name',
                                fromTitle: LS.__translate(LS.AllFields),
                                toTitle: LS.__translate(LS.FieldsSelected),
                                store: {
                                    xtype: 'store',
                                    fields: ['name', 'title'],
                                    data: [
                                        {name: 'pet_alias', title: LS.__translate(LS.Alias)},
                                        {name: 'from', title: 'Дата с'},
                                        {name: 'to', title: 'Дата по'},
                                        {name: 'file_type', title: 'Тип файла'},
                                        {name: 'medcard_number', title: 'Номер медкарты'}
                                    ]
                                }
                            }]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            title: LS.__translate(LS.TimeRules),
            border: false,
            accessType: false,
            padding: '10px',
            layout: 'fit',
            items: [
                {
                    xtype: 'client-time-rules-settings'
                }
            ]
        }
    ],
    tbar: [
        {
            cls: 'button-save',
            action: 'save',
            tooltip: LS.__translate(LS.Save),
            margins: {top:3, right:0, bottom:2, left:5}
        }
    ]
});