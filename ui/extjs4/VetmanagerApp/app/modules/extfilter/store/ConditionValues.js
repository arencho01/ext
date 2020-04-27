Ext4.define('VetmanagerApp.modules.extfilter.store.ConditionValues', {
    extend: 'Ext.data.ArrayStore'
    , idIndex: 0
    , fields: ['value', 'title']
    , data: [
        ['{LAST_DAY}', '{LAST_DAY}']
        , ['{LAST_WEEK}', '{LAST_WEEK}']
        , ['{LAST_DECADE}', '{LAST_DECADE}']
        , ['{LAST_MONTH}', '{LAST_MONTH}']
        , ['{CURRENT_DAY}', '{CURRENT_DAY}']
        , ['{CURRENT_WEEK}', '{CURRENT_WEEK}']
        , ['{CURRENT_DECADE}', '{CURRENT_DECADE}']
        , ['{CURRENT_MONTH}', '{CURRENT_MONTH}']
        , ['{LAST_30_DAYS}', '{LAST_30_DAYS}']
    ]
});