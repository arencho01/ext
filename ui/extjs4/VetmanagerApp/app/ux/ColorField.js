Ext4.define('Ext4.ux.ColorField', {
    extend: 'Ext4.form.TriggerField'
    , defaultColor: '#FFFFFF'
    , allowedCooors: [
        '#000000'
        ,'#993300'
        ,'#333300'
        ,'#003300'
        ,'#003366'
        ,'#000080'
        ,'#333399'
        ,'#333333'
        ,'#800000'
        ,'#FF6600'
        ,'#808000'
        ,'#008000'
        ,'#008080'
        ,'#0000FF'
        ,'#666699'
        ,'#808080'
        ,'#FF0000'
        ,'#FF9900'
        ,'#99CC00'
        ,'#339966'
        ,'#33CCCC'
        ,'#3366FF'
        ,'#800080'
        ,'#969696'
        ,'#FF00FF'
        ,'#FFCC00'
        ,'#FFFF00'
        ,'#00FF00'
        ,'#00FFFF'
        ,'#00CCFF'
        ,'#993366'
        ,'#C0C0C0'
        ,'#FF99CC'
        ,'#FFCC99'
        ,'#FFFF99'
        ,'#CCFFCC'
        ,'#CCFFFF'
        ,'#99CCFF'
        ,'#CC99FF'
        ,'#FFFFFF'
    ]
    , xtype: 'colorfield',
    triggerConfig: {
        src: Ext4.BLANK_IMAGE_URL,
        tag: "img",
        cls: "x4-form-trigger x4-form-color-trigger"
    },
    invalidText: "Colors must be in a the hex format #FFFFFF.",
    regex: /^\#[0-9A-F]{6}$/i,
    allowBlank: false,
    initComponent: function () {
        this.callParent();
        this.addEvents('select', 'complete');
        this.on('change', function (c, v) {
            this.onSelect(c, v);
        }, this);
    },


    // private
    onDestroy: function () {
        Ext4.destroy(this.menu);
        this.callParent();
    },


    // private
    afterRender: function () {
        this.callParent(arguments)
        this.inputEl.setStyle('background', this.value);
        this.detectFontColor();
    }
    , isAllowedColor: function(color) {
        return (this.allowedCooors.indexOf(color) > -1);
    }


    /**
     * @method onTriggerClick
     * @hide
     */
    // private
    , onTriggerClick: function (e) {
        if (this.disabled) {
            return;
        }
        if (this.menu) {
            this.menu.hide();
            this.menu = null;
            return;
        }
        if (!this.isAllowedColor(this.value)) {
            this.value = this.defaultColor;
            this.setValue(this.value);
            this.fireEvent('select', this, this.value);
            this.inputEl.setStyle('background', this.value);
            this.detectFontColor();
        }

        this.menu = Ext4.create('Ext4.menu.ColorPicker', {
            shadow: true
            , autoShow: true
            , hideOnClick: false
            , value: this.value
            , fallback: this.fallback
        });

        this.menu.alignTo(this.inputEl, 'tl-bl?');
        this.menuEvents('on');
        this.menu.show(this.inputEl);
    },


    //private
    menuEvents: function (method) {
        this.menu[method]('select', this.onSelect, this);
        this.menu[method]('hide', this.onMenuHide, this);
        this.menu[method]('show', this.onFocus, this);
    },


    onSelect: function (m, d) {
        d = Ext4.isString(d) && d.substr(0, 1) != '#' ? '#' + d : d;
        this.setValue(d);
        this.fireEvent('select', this, d);
        this.inputEl.setStyle('background', d);
        this.detectFontColor();
        if (this.menu) {
            this.menu.hide();
            this.fireEvent('complete', this, this, d, d);
        }
    },


    // private
    // Detects whether the font color should be white or black, according to the
    // current color of the background
    detectFontColor: function () {
        if (!this.menu || !this.menu.picker.rawValue) {
            if (!this.value) value = 'FFFFFF';
            else {
                var h2d = function (d) {
                        return parseInt(d, 16);
                    }
                var value = [
                    h2d(this.value.slice(1, 3)),
                    h2d(this.value.slice(3, 5)),
                    h2d(this.value.slice(5))
                    ];
            }
        } else var value = this.menu.picker.rawValue;
        var avg = (value[0] + value[1] + value[2]) / 3;
        this.inputEl.setStyle('color', (avg > 128) ? '#000' : '#FFF');
    },


    onMenuHide: function () {
        this.focus(false, 60);
        this.menuEvents('un');
    }


});