var barCode = function($, btn, options, scope) {
    var sumField = (options.minimizedBarcode || options.onlyQuantity) ? '' : '<label>'+LS.Amount+':</label><span class="bar-code__sum">168</span>';
    var editAfterSetFields = (options.minimizedBarcode) ? '' : '<label for="edit_qty_after_enter" class="bar-code__checkbox_label">'+LS.EditTheNumberPriceAfterEntering+'</label><input id="edit_qty_after_enter" class="bar-code__checkbox" type="checkbox" name="edit_qty_after_enter" />';

    var htmlForm = [
        '<div class="bar-code-mask ext-el-mask"></div>'
        , '<div class="bar-code">'
            , '<div class="bar-code__form form-verticnal">'
                , '<div class="row row-code ">'
                    , '<label for="code" class="bar-code__label">'+LS.Barcode+'</label>'
                    , '<input id="code" class="bar-code__input" type="text" name="code" />'
                    , editAfterSetFields
                , '</div>'
                , '<div class="row cost-and-button-row">'
                    , '<div class="left">'
                    , sumField
                    , '</div>'
                    , '<div class="right">'
                        , '<button class="btn btn-danger btn-small">X</button>'
                        , '<button class="btn btn-success btn-large">'+LS.Use+'</button>'
                    , '</div>'
                , '</div>'
            , '</div>'
        , '</div>'
    ];

    var idbarCodeForm = 'bar-code-' + new Date().getTime();

    var context = $('<div>',  {
        id: idbarCodeForm
        , html:  htmlForm.join('')
    });
    $('body').append(context);
    var self = $(btn)
        , form = context.find('.bar-code')
        , mask = context.find('.bar-code-mask')
        , codeField = form.find('#code')
        , editQtyAfterEnter = form.find('#edit_qty_after_enter')
        , getZindex = options.getZindex || function(){return 9010;}
        , isButtonDisabled = options.isButtonDisabled || function(){return false;}
        , curZIndex = 0;
    editQtyAfterEnter = editQtyAfterEnter.length ? editQtyAfterEnter[0] : null;
    self.data('isShowed', false);

    var _flds =  [
        {title: LS.Code, name: 'code'}
        , {title: LS.NameLong, name: 'name'}
        , {title: LS.Quantity, name: 'qty', defaultValue: 1}
    ];
    if (options.minimizedBarcode) {
        _flds = [
            {title: LS.Code, name: 'code'}
            , {title: LS.NameLong, name: 'name'}
        ];
    }

    var defaults = {
        _fields: _flds
        , fields: [
            {title: LS.Price , name: 'amount', exp: 'qty*price'}
            , {title: LS.Cost, name: 'price'}
        ]
        , items: []
        , data: {}
        , successFunction: function(items){
//            console.log('success', items);
        }
        , notFindFunction: function() {
//            console.log('good is not finded');
        }
        , sumField: 'qty'
        , codeField: 'code'
        , ownerId: ''
        , nameField: 'name'
    };

    var opts = $.extend(defaults, options);
    opts._fields[0].name = opts.codeField;
    opts._fields[1].name = opts.nameField;
    opts.fieldsSummary = opts._fields.concat(opts.fields);
    opts.setBaseParams = opts.setBaseParams || function() { return opts.data; };

    var fieldsCollection = {
        items: opts.fieldsSummary
        , getFieldProperty: function(name){
            var length = opts.fieldsSummary.length;
            for (var i = 0; i < length; i++) {
                var field = opts.fieldsSummary[i];
                if (field.name == name) return field;
            }
        }
        , getFieldExp: function(name){
            var field = this.getFieldProperty(name);
            return field.exp ? field.exp : false;
        }
        , getAll: function(){
            return this.items;
        }
    }
    var itemsCollection = {
        items: opts.items
        , getDefaultItem: function(code){
            var obj = {};
            $.each(opts.fieldsSummary, function(index, field){
                obj[field.name] = null;
            });
            obj[opts.codeField] = code;
            obj.qty = 1;
            return obj;
        }
        , getServerData: function(item){
            var me = this;
            if (opts.url) {
                opts.data = opts.setBaseParams(scope, item.barcode);

                var sendData = $.extend(item, opts.data);
//                var sendData = $.extend(opts.data, item);
                $.getJSON(opts.url, sendData, function(data) {
                    if (data.id == null && data.data == null) {
                        opts.notFindFunction(curZIndex, item.barcode);
                        me.startEdit(item.barcode);
                    } else if (data.data != null && Ext.isArray(data.data) && data.data.length > 0) {
                        $.each(opts.fieldsSummary, function(i, field) {
                            if (data.data[0][field.name]) {
                                item[field.name] = data.data[0][field.name];
                            }
                        });
                        itemsCollection.recalcExpAll();
                        self.appendData();
                        me.startEdit(item.barcode);
                    } else {
                        $.each(opts.fieldsSummary, function(i, field){
                            if (data[field.name]) {
                                item[field.name] = data[field.name]
                            }
                        });
                        itemsCollection.recalcExpAll();
                        self.appendData();
                        me.startEdit(item.barcode);
                    }
                });
            }
        }
        , startEdit: function(code) {
            if (editQtyAfterEnter && editQtyAfterEnter.checked){
                $('.bar-code__table').find('td:contains("' + code + '")').parent().find('.bar-code__b-edit').click()
            }
        }
        , addItem: function(code){
            var item = this.getItem(code);
            if (item) {
                item.qty++;
            } else {
                item = this.getDefaultItem(code);
                this.items.unshift(item);
                this.getServerData(item);
            }
            this.recalcExpAll();
        }
        , getAll: function(){
            return this.items;
        }
        , getItem: function(code){
            var index = this.getItemIndex(code);
            if (index !== false) {
                return this.items[index];
            }
            return false;
        }
        , getItemIndex: function(code){
            var length = this.items.length;
            for (var i = 0; i < length; i++) {
                if (this.items[i][opts.codeField] == code) {
                    return i;
                }
            }
            return false;
        }
        , removeItem: function(code){
            this.items = $.grep(this.items, function(item){
                return item[[opts.codeField]] != code;
            });
            this.recalcExpAll();
        }
        , removeAll: function(){
            this.items = [];
        }
        , recalcExpAll: function(){
            $.each(this.items, function(index, item){
               var length = opts.fieldsSummary.length, value;
                for (var i = 0; i < length; i++) {
                    var fieldName = opts.fieldsSummary[i].name;
                    var exp = fieldsCollection.getFieldExp(fieldName);
                    if (exp) {
                        with (item) {
                            try {
                                value = eval(exp);
                            } catch (e){
                                value = 0;
                            }

                        }
                        item[fieldName] = value;
                    }
                }
            });
        }
        , getSum: function(){
            var length = this.items.length;
            var sum = 0;
            for (var i = 0; i < length; i++) {
                try {
                    sum += (['qty', 'amount'].indexOf(opts.sumField) >= 0) ? this.items[i][opts.sumField] : this.items[i][opts.sumField]*this.items[i].qty;
                } catch(e){}
            }
            return sum;
        }
    };
    itemsCollection.recalcExpAll();
    self.generateTable = function(){
//        console.log('generateTable');
        form.find('table').remove();
        var table = $('<table>').addClass('bar-code__table');
        var firstRow = table.append('<tr>').find('tr');
        $.each(opts.fieldsSummary, function(index, field){
            if (!field.title) return;
            var th =  $('<th>').text(field.title);
            firstRow.append(th);
        });
        firstRow.append($('<th>').text(LS.Editing));
        form.append(table);
        self.appendData();
    };
    self.getDeleteButton = function(code){
        var editButton = $('<button>')
            . data(opts.codeField, code)
            . attr('title', LS.delete)
            . addClass('bar-code__b-delete')
            . addClass('icon-remove')
            . click(function(){
                itemsCollection.removeItem(code);
                self.appendData();
            });
        return editButton;

    };
    var isFocused = false;
    self.getEditButton = function(code, cellArray){
        var onKeyPress = function(event){
//            console.log(code, 'onKeyPress');
            isFocused = true;
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                var item = itemsCollection.getItem(code);
                item.qty = context.find('.bar-code__0-qty')[0].value;
                item.price = context.find('.bar-code__1-qty')[0].value;

                itemsCollection.recalcExpAll();
                self.appendData();
                form.setMode('enterCode');
            }
        }
        , onBlur = function() {
            isFocused = false;
            var item = itemsCollection.getItem(code);
                item.qty = context.find('.bar-code__0-qty')[0].value*1;
                if (context.find('.bar-code__1-qty').length > 0) {
                    item.price = context.find('.bar-code__1-qty')[0].value*1;
                    item.price = isNaN(item.price) ? 0 : item.price;
                }

                itemsCollection.recalcExpAll();
                self.updateSumm(code, item.qty, item.price);

                var fn = function() {
                    if (!isFocused) {
                        form.setMode('enterCode');
                        self.appendData();
                    }
                };
                setTimeout(fn, 1);
        }
        , onFocus = function() {
            isFocused = true;
        };
        var editButton = $('<button>')
            . data(opts.codeField, code)
            . attr('title', LS.Edit)
            . addClass('bar-code__b-edit')
            . addClass('icon-pencil')
            . click(function(e, modeIndex){
                modeIndex = parseInt(modeIndex) || 0;
                var modes = ['editQty', 'editPrice']
//                console.log(code, 'click');
                for (var i = 0, len = cellArray.length; i < len; i++) {
                    var el = cellArray[i]
                        , qty = el.text();
                    if (qty == '' && el.attr('val') != undefined) {
                        qty = el.attr('val');
                    }
                    el.text('');
                    el.attr('val', qty);
                    el.append(
                       $('<input>')
                           .attr('type', 'text')
                           .attr('code', code)
                           .addClass('bar-code__'+i+'-qty')
                           .val(qty)
                           .keypress(onKeyPress)
                           .blur(onBlur)
                           .focus(onFocus)
                    );
                }
                form.setMode(modes[modeIndex]);
            });
        return editButton;
    };
    self.updateSumm = function(code, qnt, price) {
        var table = form.find('table');
        var codes = table.find('td:nth-child(1)');

        var num = -1;
        $.each(codes, function(i) {
            if ($(this).text() == code) {
                num = i;
                return false;
            };
        });

        var sums = table.find('td:nth-child(5)');

        $.each(sums, function(j) {
            if (j == num) {
                $(this).text(qnt * price);
            }
        });
    };
    self.appendData = function(){
        var table = form.find('table');
        while(table.find('tr').length > 1) {
            table.find('tr:last').remove();
        }
        $.each(itemsCollection.getAll(), function(index, item){
            var row = table.append('<tr>').find('tr:last');
            $.each(opts.fieldsSummary, function(i, field){
                if (!field.title) return;
                var td =  $('<td>').text((item[field.name]) ? item[field.name]: '').addClass('bar-code__field');
                if ([2, 3].indexOf(i) >= 0) {
                    $(td).click(function(e) {
//                        console.log(arguments);
                        var el = e.currentTarget;
                        if (!$(el).has('input').length) {
                            var focusIndex = field.name != 'qty' ? 1 : 0;
                            $(el).parent().find('.bar-code__b-edit').trigger('click', [focusIndex]);
                        }
                    });
                }
                row.append(td);
            });

            if (options.minimizedBarcode) {
                row.append(
                    $('<td>').append(self.getDeleteButton(item[opts.codeField]))
                );
            } else {
                row.append(
                    $('<td>')
                        .append(self.getEditButton(item[opts.codeField], [row.find('td:nth-child(3)'), row.find('td:nth-child(4)')]))
                        .append(self.getDeleteButton(item[opts.codeField]))
                );
            }
        });
        context.find('.bar-code__sum').text(itemsCollection.getSum());
    };
    form.setMode = function(mode){
        self.mode = mode;
        var setFocus = function(){
            form.find('[name=code]').focus();
        }
        form.clearWork();
        switch(mode){
            case 'enterCode':
                form.data('interval', (form.data('interval')) ? form.data('interval') :  setInterval(setFocus, 100));
                break;
            case 'editQty':
                clearInterval(form.data('interval'), 'interval edit');
                context.find('.bar-code__0-qty').focus().select();
                break;
            case 'editPrice':
                clearInterval(form.data('interval'), 'interval edit');
                context.find('.bar-code__1-qty').focus().select();
                break;
        };
    };
    form.clearWork =  function(){
       clearInterval(form.data('interval'));
       form.data('interval', false);
    };
    self.on('click', function(){
        if (!isButtonDisabled()) {
            var zIndex = getZindex();
            mask.css('z-index', zIndex+5);
            form.css('z-index', zIndex+6);
            curZIndex = zIndex+6;

            mask.fadeToggle();
            self.generateTable();
            form.setMode('enterCode');
            form.fadeToggle();
        }
    });
//TODO: some bar code buttons with different config
    if (self.data('inited') || form.data('inited')) {
        return;
    }
    var cancelFunc = function(){
        form.clearWork();
        itemsCollection.removeAll();
        form.fadeOut();
        mask.fadeOut();
        if (scope.focusSearch) {
            scope.focusSearch();
        }
    };
    form.find('.btn-danger').click(cancelFunc);
    var applyFunc = function(){
        form.clearWork();
        opts.successFunction(itemsCollection.getAll());
        form.fadeOut();
        mask.fadeOut();
        itemsCollection.removeAll();
    };
    form.find('.btn-success').click(applyFunc);
    codeField.validator = function(){
        var value = $(this).val();
        return value.length > 0;
    }
    //Vecicle for slow pc
    var checkStartScanClass = function(){
        var mod = this
        , TIMEOUT_ID;
        this.keyPress = function(keycode){
            if (!this.isStarted) this.startChecker();
            this.pressDate.push(new Date());
            if (keycode == '13' || codeField.val() == '') {
                this.clear();
            }
        };
        this.clear = function(){
            this.isStarted = false;
            this.pressDate = [];
            clearTimeout(TIMEOUT_ID);
            TIMEOUT_ID = null;
        };
        this.checkSuccess = function(){
            var IS_INTERVAL_SCANNER = 200;
            if (this.pressDate.length >= 4) {
                var first = this.pressDate[0];
                var last = this.pressDate[this.pressDate.length - 1];
                if ((last - first) < IS_INTERVAL_SCANNER ) {
                    var code = codeField.val();
                    itemsCollection.addItem(code);
                    codeField.val('');
                    self.appendData();
                    itemsCollection.startEdit(code);
                }
            }
            this.clear();
        };
        this.startChecker = function(){
            this.isStarted = true;
            TIMEOUT_ID = setTimeout(function(){
                mod.checkSuccess();
            }, 500);
        };
        this.clear();
    };
    //Vecicle end
    var checkStartScan = new checkStartScanClass();
    codeField.keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        checkStartScan.keyPress(keycode);
        if (keycode == '13') {
            if (codeField.validator()) {
                var code = codeField.val();
                itemsCollection.addItem(code);
                codeField.val('');
                self.appendData();
                itemsCollection.startEdit(code);
            } else {
                alert(LS.TheCodeIsEnteredIncorrectly);
            }
        }
    });
    codeField.keydown(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        switch (keycode) {
            case 37:
                cancelFunc();
                break;
            case 39:
                applyFunc();
                break;
            case 27:
                cancelFunc();
            break;
        }
    });
    self.data('inited', true);
    form.data('inited', true);

    return {
        addItem: function(code) {
            itemsCollection.addItem(code);
            codeField.val('');
            self.appendData();
            itemsCollection.startEdit(code);
        }
        , removeItem: function(code) {
            itemsCollection.removeItem(code);
            self.appendData();
        }
        , stopFocusing: function() {
            form.clearWork();
        }
        , startFocusing: function() {
            form.setMode('enterCode');
        }
        , getZIndex: function() {
            return curZIndex;
        }
        , setZIndex: function(val) {
            mask.css('z-index', val);
            form.css('z-index', val+1);
            curZIndex = val+1;
        }
    }
};