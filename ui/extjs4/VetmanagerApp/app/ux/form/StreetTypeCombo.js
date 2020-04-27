Ext.define('Ext4.ux.form.StreetTypeCombo', {
    alias: 'widget.streettypecombo'
    , extend: 'Ext4.form.ComboBox'
    , fieldLabel: LS.__translate(LS.StreetType)
    , allowBlank: false
    , name: 'type'
    , value: 'street'
    , displayField: 'title'
    , valueField: 'value'
    , triggerAction: 'all'
    , mode: 'local'
    , editable: false
    , anchor: '100%'
    , store: {
        fields: ['value', 'title']
        , mode: 'local'
        , data: [
            {
                value: 'street'
                , title: 'Улица'
            }, {
                value: 'bulvar'
                , title: 'Бульвар'
            }, {
                value: 'prospect'
                , title: 'Проспект'
            }, {
                value: 'proezd'
                , title: 'Проезд'
            }, {
                value: 'pereulok'
                , title: 'Переулок'
            }, {
                value: 'dead_end'
                , title: 'Тупик'
            }
            , {
                value: 'highway'
                , title: 'Шоссе'
            }
	    , {
		value: 'embankment'
		, title: 'Набережная'
	    }
	    , {
		value: 'square'
		, title: 'Площадь'
	    }            
        ]
    }
});