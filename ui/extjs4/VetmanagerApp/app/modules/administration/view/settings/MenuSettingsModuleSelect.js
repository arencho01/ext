Ext4.define('VetmanagerApp.modules.administration.view.settings.MenuSettingsModuleSelect', {
    extend: 'Ext4.FormPanel'
    , xtype: 'menusettingsmoduleselect'
    , border: false
    , padding: '5px'
    , labelWidth: 200
    , items: [
        {
            xtype: 'textfield'
            , fieldLabel: LS.__translate(LS.Namez)
            , name: 'title'
            , anchor: '100%'
            , hidden: true
        }, {
            xtype: 'combo'
            , fieldLabel: LS.__translate(LS.Image)
            , hidden: true
            , anchor: '100%'
            , name: 'image'
            , triggerAction: 'all'
            , typeAhead: true
            , lazyRender:true
            , queryMode: 'local'
            , valueField: 'img'
            , displayField: 'img'
            , editable: false
            , store: new Ext4.data.ArrayStore({
                fields: ['img']
                , data: [
                    ['cassa.png']
                    , ['forum.png']
                    , ['calendar.png']
                    , ['goods.png']
                    , ['stores.png']
                    , ['invoice.png']
                    , ['reports.png']
                    , ['marketing.png']
                    , ['accessrights.png']
                    , ['medicalcards.png']
                    , ['registry.png']
                    , ['settings.png']
                ]
            })
            , tpl: Ext4.create('Ext4.XTemplate',
                '<tpl for=".">',
                    '<div class="x4-boundlist-item" style="border:0px !important;">',
                    '<div style="margin-left: 40%;height:96px; width:96px;background-image:url(',
                            'ui/desktop/images/mainicons/{img}',
                        ') !important;" class="workspace-shortcut-icon">&nbsp;</div>',
                        '</div>',
                '</tpl>'
            )
        }, {
            xtype: 'combo'
            , fieldLabel: LS.__translate(LS.Module)
            , hidden: true
            , name: 'module'
            , anchor: '100%'
            , displayField: 'title'
            , valueField: 'id'
            , emptyText: LS.__translate(LS.Empty)
            , store: {
                xtype: 'store'
                , fields: ['id', 'module', 'title']
                , autoLoad: false
                , proxy: {
                    type: 'ajax'
                    , url: 'ajax_desktopsettings.php'
                    , extraParams: {
                        cmd: 'get_modules_list'
                    }
                    , reader: {
                        type: 'json'
                        , root: 'data'
                    }
                }
            }
        }, {
            xtype: 'checkbox'
            , fieldLabel: LS.__translate(LS.Actively)
            , hidden: true
            , name: 'is_active'
            , anchor: '100%'
        }, {
            fieldLabel: ' '
            , xtype: 'label'
            , hidden: true
            , anchor: '100%'
            , height: 300
            , labelSeparator: ''
            , name: 'preview'
            , data: {
                img: 's.gif'
            }
            , tpl: Ext4.create('Ext4.XTemplate',
                '<div class="workspace-shortcut" style="border:1px !important; height:96px;">',
                    '<div style="background-image:url(',
                        'ui/desktop/images/mainicons/{img}',
                    ') !important;" class="workspace-shortcut-icon">&nbsp;</div>',
                '</div>'
            )
        }, {
            xtype: 'hidden'
            , name: 'type'
            , value: 'item'
        }, {
            xtype: 'hidden'
            , name: 'id'
            , value: '0'
        }, {
            xtype: 'hidden'
            , name: 'node_type'
            , value: ''
        }
    ]
});