Ext4.define('VetmanagerApp.modules.extfilter.view.ExtFilterSubItem', {
    extend: 'Ext.panel.Panel'
    , xtype: 'extfiltersubitem'
    , border: false
    , height: 40
    , layout: {
        type: 'hbox'
        , defaultMargins: {top: 5, right: 5, bottom: 5, left: 5}
    }
    , items: [
        {
            xtype: 'panel'
            , width: 550
            , border: false
        }, {
            xtype: 'combobox'
            , width: 60
            , editable: false
            , triggerAction: 'all'
            , allowBlank: true
            , emptyText: LS.__translate(LS.Condition)
            , name: 'condition'
            , store: {
                fields: ['id', 'title']
                , data: [
                    {id: 'and', title: LS.__translate(LS.And)}
                    , {id: 'or', title: LS.__translate(LS.Or)}
                ]
            }
            , displayField: 'title'
            , valueField: 'id'
        }, {
            xtype: 'panel'
            , flex: 1
            , border: false
        }
    ]
});