Ext4.define('VetmanagerApp.modules.graphic_reports.view.graphics.SickRegisteredPetsJournal', {
    extend: 'Ext4.form.Panel'
    , xtype: 'sick_registered_pets_journal'
    , border: false
    , style: {
        marginLeft: '3px'
    }
    , layout: {
        type: 'vbox'
        , align: 'stretch'
    }
    , requires: [

    ]
    , items: [
        {
            xtype: 'filter_date_buttons'
        }, {
            xtype: 'filter_date_range'
        }, {
            xtype: 'panel'
            , flex: 2
            , layout: 'fit'
            , border: false
            , items: [{
                xtype: 'grid-with-export'
                , remote_export: true
                , store: 'VetmanagerApp.modules.graphic_reports.store.SickRegisteredPetsJournal'
                , dockedItems: [{
                    xtype: 'pagingtoolbar'
                    , store: 'VetmanagerApp.modules.graphic_reports.store.SickRegisteredPetsJournal'
                    , dock: 'bottom'
                    , displayInfo: true
                }]
                , columns: [
                    {header: 'ФИО клиента', dataIndex: 'fio', minWidth: 190, sortable: false, hideable: false}
                    , {header: 'Дата обращения', dataIndex: 'dt', minWidth: 100, sortable: false, hideable: false}
                    , {header: 'Адрес', dataIndex: 'address', minWidth: 150, sortable: false, hideable: false}
                    , {header: 'Питомец (кличка,вид,пол,возраст)', dataIndex: 'pet_data', minWidth: 180, sortable: false, hideable: false}
                    , {header: 'Цель обращения', dataIndex: 'meet_reason', minWidth: 100, sortable: false, hideable: false}
                    , {header: 'Врач', dataIndex: 'doctor', minWidth: 100, sortable: false, hideable: false}
                    , {header: 'Диагноз', dataIndex: 'diagnos', minWidth: 100, flex:1, sortable: false, hideable: false}
                ]
            }]
        }
    ]
});