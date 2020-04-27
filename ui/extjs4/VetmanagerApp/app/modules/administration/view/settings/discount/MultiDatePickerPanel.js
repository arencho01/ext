Ext4.define('Ext4.ux.MultiDatePicker', {
    extend: 'Ext4.picker.Date',
    alias: "widget.multidatepicker",
    clsHigligthClass:'x4-datepicker-selected',

    selectedDates: null,
    lastDate: null,

    mainPicker: null,
    mainPickerMonthDiff: null,
    mainPickerObj: null,
    subPickers: null,

    constructor: function(args){
        this.callParent([Ext4.applyIf(args||{}, {
            selectedDates: {},
            lastDate: {},
            subPickers: []
        })]);
    },

    initComponent: function(){
        var me = this;
        me.addEvents('highlightdates', 'afterselect');
        me.callParent(arguments);
        me.on('afterrender', me.initValues, me, {delay: 5});
        me.on('select',me.handleSelectionChanged,me);
    },

    initValues: function() {
        var me = this,
            mainPicker,
            monthDiff = me.mainPickerMonthDiff || 0;
        if (me.ownerCt && me.mainPicker) {
            mainPicker = me.ownerCt.items.get(me.mainPicker);
        }

        if (mainPicker) {
            me.update(Ext4.Date.add(mainPicker.getValue(), Ext4.Date.MONTH, monthDiff));
            me.selectedDates = mainPicker.selectedDates;
            mainPicker.on('highlightdates', me.higlighDates, me);
            me.on('highlightdates', mainPicker.higlighDates, mainPicker);

            if (!mainPicker.lastDate.date) {
                mainPicker.lastDate.date = new Date();
            }
            me.lastDate = mainPicker.lastDate;
            me.mainPickerObj = mainPicker
            mainPicker.subPickers.push(me);
        }
    },

    showPrevMonth: function(e){
        var me = this;
        var c = this.update(Ext4.Date.add(this.activeDate, Ext4.Date.MONTH, -1));
        me.higlighDates();
        return c;
    },

    showNextMonth: function(e){
        var me = this;
        var c = this.update(Ext4.Date.add(this.activeDate, Ext4.Date.MONTH, 1));
        me.higlighDates();
        return c;
    },

    higlighDates: function(){
        var me = this;
        if (me.skipMasterHighLight) {
            return;
        }
        me.skipMasterHighLight = true;
        if(!me.cells) return;
        me.cells.each(function(item){
            var date = new Date(item.dom.firstChild.dateValue).toDateString();
            if(me.selectedDates[date]){
                item.addCls(me.clsHigligthClass);
            }else{
                item.removeCls(me.clsHigligthClass);
            }
        });
        me.fireEvent('highlightdates');
        me.skipMasterHighLight = false;
    },

    onOkClick: function(picker, value) {
        var me = this;
        me.callParent([picker, value]);
    },

    setValue: function(value) {
        var me = this;
        return me;
    },

    update: function(date) {
        var me = this;
        if (me.mainPickerObj && !me.fromMainPicker) {
            me.mainPickerObj.update(Ext4.Date.add(date, Ext4.Date.MONTH, -me.mainPickerMonthDiff));
            return me;
        }
        var active = me.activeDate;
        if (me.rendered) {
            me.activeDate = date;
            me.fullUpdate(date, active);
            me.innerEl.dom.title = Ext.String.format(me.ariaTitle, Ext.Date.format(me.activeDate, me.ariaTitleDateFormat));
        }
        me.higlighDates();
        for (var i = 0; i < me.subPickers.length; i++) {
            var p = me.subPickers[i];
            p.fromMainPicker = true;
            p.update(Ext4.Date.add(date, Ext4.Date.MONTH, p.mainPickerMonthDiff));
            p.fromMainPicker = false;
        }
        return me;
    },

    handleDateClick : function(e, t){
        var me = this;

        e.stopEvent();
        if(!me.disabled && t.dateValue && !Ext.fly(t.parentNode).hasCls(me.disabledCellCls)){
            me.doCancelFocus = me.focusOnSelect === false;
            var date = new Date(t.dateValue);
            me.update(date);
            delete me.doCancelFocus;
            me.fireEvent('select', me, date);
        }
    },

    handleSelectionChanged: function(cmp, date){
        var me = this;
        if (Ext4.EventObject.shiftKey && me.lastDate.date && date != me.lastDate.date) {
            var start, end;
            if (date > me.lastDate.date) {
                start = me.lastDate.date;
                end = date;
            } else {
                start = date;
                end = me.lastDate.date;
            }

            do {
                start = Ext4.Date.add(start, Ext4.Date.DAY, 1);
                if(!me.selectedDates[start.toDateString()])
                    me.selectedDates[start.toDateString()] = start;
            } while (start < end);
        } else {
            this.lastDate.date = date;
            if(me.selectedDates[date.toDateString()])
                delete me.selectedDates[date.toDateString()]
            else
                me.selectedDates[date.toDateString()] = date;
        }
        me.higlighDates();
        me.fireEvent('afterselect', me);
    },

    getSelectedDates: function(){
        var dates = [];
        Ext4.iterate(this.selectedDates, function(key, val){
            dates.push(val);
        });
        dates.sort();
        return dates;
    }
});

Ext4.define('VetmanagerApp.modules.administration.view.settings.discount.MultiDatePickerPanel', {
    extend: 'Ext4.Panel',
    alias: "widget.multidatepickerpanel",
    rowsCount: 1,
    pickersPerRow: 3,
    mainPickerIndex: -1,
    dateFormat: 'd.m.Y',
    initComponent: function() {
        var me = this,
            pickersCount = me.rowsCount * me.pickersPerRow;
        me.layout = {
            type: 'table',
            columns: me.pickersPerRow
        }

        if (me.mainPickerIndex < 0) {
            me.mainPickerIndex = Math.floor(pickersCount / 2);
        }

        me.items = [];
        for (var i = 0; i < pickersCount; i++) {
            var item = {
                xtype: 'multidatepicker',
                itemId: 'datePicker',
                showToday: false,
                listeners: {
                    afterselect: me.onPickerSelectionChange,
                    scope: me
                }
            };
            if (i != me.mainPickerIndex) {
                item.itemId += i.toString();
                item.mainPicker = 'datePicker';
                item.mainPickerMonthDiff = i - me.mainPickerIndex;
            }
            me.items.push(item);
        }
        me.buttonAlign = 'center';
        me.buttons = [
            {
                text: LS.__translate(LS.Reset),
                handler: me.resetPickers,
                scope: me
            }
        ]
        me.addEvents('change');
        me.callParent(arguments);
    },
    resetPickers: function() {
        var me = this,
            picker = me.items.get('datePicker');

        if (picker) {
            Ext4.iterate(picker.selectedDates, function(key, val){
                delete picker.selectedDates[key];
            });
            picker.higlighDates();
        }
        me.fireEvent('change', me, me.getValue());
    },
    onPickerSelectionChange: function() {
        var me = this;
        me.fireEvent('change', me, me.getValue());
    },
    setValue: function(dates) {
        var me = this;
        var picker = me.items.get('datePicker');

        if (!picker) {
            me.fireEvent('change', me, me.getValue());
            return me;
        }

        me.resetPickers();

        if (Ext.isString(dates)) {
            if (dates.indexOf(',') >= 0) {
                dates = dates.split(',');
            } else {
                try {
                    var date = Date.parseDate(dates, this.dateFormat);
                    if (Ext.isDate(date)) {
                        dates = [date];
                    }
                } catch (e) {
                    me.fireEvent('change', me, me.getValue());
                    return me;
                }
            }
        } else if (Ext.isDate(dates)) {
            dates = [dates];
        }

        var validDates = [];

        if (Ext.isArray(dates)) {
            Ext.each(dates, function(date) {
                if (!Ext.isDate(date)) {
                    try {
                        date = Date.parseDate(date, me.dateFormat);
                    } catch (e) {
                        me.fireEvent('change', me, me.getValue());
                        return;
                    }
                }

                if (Ext.isDate(date)) {
                    validDates.push(date);
                }
            });

            me.resetPickers();
            Ext.each(validDates, function(date) {
                picker.selectedDates[date.toDateString()] = date;
            });
            picker.higlighDates();
            me.fireEvent('change', me, me.getValue());
            return me;
        } else {
            me.fireEvent('change', me, me.getValue());
            return me;
        }
    }
    , getValue: function() {
        var me = this
            , picker = me.items.get('datePicker')
            , dates = picker.getSelectedDates()
            , value = [];

        Ext.each(dates, function(date) {
            if (Ext.isDate(date)) {
                value.push(date.format(me.dateFormat));
            }
        });

        return value.join(',');
    }
});