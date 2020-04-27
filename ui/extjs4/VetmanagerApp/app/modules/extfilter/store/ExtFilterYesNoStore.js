Ext4.define('VetmanagerApp.modules.extfilter.store.ExtFilterYesNoStore', {
    extend: 'Ext.data.ArrayStore'
    , idIndex: 0
    , fields: ['value', 'title']
    , data: [
        ['1', LS.__translate(LS.Yes)]
        , ['0', LS.__translate(LS.No)]
    ]
});