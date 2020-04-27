Ext4.define('VetmanagerApp.modules.administration.view.settings..workspaceSettings.MenuSettings', {
    extend: 'Ext4.Panel',
    xtype: 'workspacemenusettingspanel',
    layout: 'border',
    border: false,
    data: undefined,
    disabled_modules: [
        'medicalcards',
        'admission',
        'clinics',
        'bugs',
        'reports',
        'marketing',
        'appointment',
        'registry',
        'printform',
        'vaccines',
        'discount',
        'hospital',
        'guides'
    ],
    bodyStyle: {
        backgroundColor: '#ffffff'
    },
    initComponent: function() {
        var me = this;
        me.tpl = me.getMenuSettingsTpl();
        me.callParent(arguments);
        me.on('render', me.afterInitMenuPanel, me);
    },
    afterInitMenuPanel: function() {
        var me = this;
        me.initDragDrop();
    },
    initDragDrop: function() {
        var me = this;

        me.dragZone = Ext.create('Ext.dd.DragZone', me.getEl(), {
            ddGroup: 'ws-menu-settings',
            getDragData: function(e) {
                var sourceEl = e.getTarget('.ws-menu-item', 2), d;
                if (!sourceEl) {
                    sourceEl = e.getTarget('.ws-menu-group', 2);
                }
                if (sourceEl) {
                    d = sourceEl.cloneNode(true);
                    d.id = Ext4.id();
                    var el = Ext4.fly(sourceEl);
                    return me.dragData = {
                        sourceEl: sourceEl,
                        repairXY: el.getXY(),
                        ddel: d,
                        itemType: el.hasCls('ws-menu-group') ? 'group' : 'item',
                        isFromModulesList: !!el.parent('.ws-all-modules-list')
                    }
                }
            },
            getRepairXY: function() {
                return this.dragData.repairXY;
            },
            onStartDrag: function() {
                var el = Ext4.fly(this.dragData.sourceEl),
                    box = el.getBox();
            },
            onEndDrag: function() {
                var el = Ext4.fly(this.dragData.sourceEl),
                    box = el.getBox();
            }
        });
        me.dropZone = Ext.create('Ext.dd.DropZone', me.el, {
            ddGroup: 'ws-menu-settings',
            getTargetFromEvent: function(e) {
                var el, type, r = false, target, targetType = '';

                target = e.getTarget('.ws-all-modules-list', 5);
                if (target) {
                    target.type = 'remove';
                    return target;
                }

                if (Ext4.isArray(Ext4.dd.DragDropManager.dragCurrent.dragData.records)) {
                    type = 'item';
                } else {
                    type = me.dragData.itemType;
                    r = e.getTarget('.ws-menu-empty-minus', 5);
                }
                if (r) {
                    target = r;
                    targetType = 'remove';
                } else {
                    if (type == 'item') {
                        target = e.getTarget('.ws-menu-item', 4);
                        targetType = 'item';
                        if (!target) {
                            target = e.getTarget('.ws-menu-group-title', 4);
                            targetType = 'title';
                            if (!target) {
                                target = e.getTarget('.ws-menu-group', 4);
                                targetType = 'group';
                            }
                        }
                    }
                    if (!target) {
                        target = e.getTarget('.ws-menu-column', 4);
                        targetType = 'column';
                    }
                }
                if (target) {
                    if (Ext4.fly(target).parent('.ws-all-modules-list')) {
                        return;
                    }
                    target.type = targetType;
                }
                return target;
            },
            onNodeEnter: function(target, dd, e, data) {
                if (target.type == 'remove') {
                    return;
                }
                var targetEl = Ext4.get(target),
                    targetColumn = targetEl.hasCls('ws-menu-column') ? targetEl : Ext4.get(targetEl.parent('.ws-menu-column', true)),
                    targetColIndex = parseInt(targetColumn.getAttribute('data-index')) || 0,
                    mainPanel = Ext4.get(me.el.select('.ws-menu-settings').elements[0]),
                    sourceEl, sourceColumn, sourceColIndex;

                if (data.isFromModulesList && data.itemType == 'group' && !data.column) {
                    var column = Ext4.get(Ext4.DomHelper.createDom({tag: 'div', cls: 'ws-menu-column', id: Ext4.id()}));
                    column.dom.setAttribute('data-index', -1);
                    sourceEl = data.sourceEl.cloneNode();
                    sourceEl.innerHTML = '<div class="ws-menu-group-title">Группа модулей</div>';
                    sourceEl.id = Ext.id();
                    column.appendChild(sourceEl);
                    data.sourceEl = sourceEl;
                    data.column = column;
                }

                if (data.sourceEl == target) {
                    return;
                }

                sourceEl = Ext4.get(data.sourceEl);
                sourceColumn = Ext4.get(sourceEl.parent('.ws-menu-column', true));
                if (!sourceColumn) {
                    sourceColumn = Ext4.DomHelper.createDom({tag: 'div', cls: 'ws-menu-column', id: Ext4.id()});
                    sourceColumn.setAttribute('data-index', -1);
                    sourceColumn = Ext4.get(sourceColumn);
                    sourceColumn.appendTo(mainPanel);
                    sourceEl.appendTo(sourceColumn);
                }
                sourceColIndex = parseInt(sourceColumn.getAttribute('data-index')) || 0;

                if (data.itemType == 'group') {
                    if (sourceColIndex != targetColIndex && sourceColIndex * targetColIndex != 0) {
                        if (sourceColIndex > targetColIndex || sourceColIndex < 0) {
                            sourceColumn.insertBefore(targetColumn);
                        } else {
                            sourceColumn.insertAfter(targetColumn);
                        }
                        sourceColumn.dom.setAttribute('data-index', targetColIndex);
                        targetColumn.dom.setAttribute('data-index', sourceColIndex);
                    }
                } else if (data.itemType == 'item') {
                    var isTargetSingleItem = target.type == 'item' && Ext.fly(target.parentNode).hasCls('ws-menu-column'),
                        isSourceSingleItem = Ext.fly(sourceEl.dom.parentNode).hasCls('ws-menu-column');
                    if (target.type == 'column' || target.type == 'item' && data.itemType == 'item' && isTargetSingleItem) {
                        if (!data.column) {
                            var parent = Ext4.get(sourceEl.dom.parentElement);
                            if (parent.hasCls('ws-menu-column')) {
                                data.column = parent;
                            } else {
                                data.column = Ext4.get(Ext4.DomHelper.createDom({tag: 'div', cls: 'ws-menu-column', id: Ext4.id()}));
                                data.column.appendTo(mainPanel);
                                sourceEl.appendTo(data.column);
                            }
                        }
                        if (sourceColIndex > targetColIndex) {
                            data.column.insertBefore(targetColumn);
                        } else {
                            data.column.insertAfter(targetColumn);
                        }

                    } else if (target.type == 'group' || target.type == 'item') {
                        if (target.type == 'group') {
                            sourceEl.appendTo(target);
                            if (isTargetSingleItem || isSourceSingleItem) {
                                if (sourceColumn && sourceColumn != targetColumn) {
                                    sourceColumn.destroy();
                                }
                            } else {
                            }
                        } else if (target.type == 'item') {
                            var allItems = target.parentNode.childNodes,
                                targetIndex = Array.prototype.indexOf.call(allItems, target),
                                sourceIndex = Array.prototype.indexOf.call(allItems, sourceEl.dom);

                            if (targetIndex > sourceIndex) {
                                sourceEl.insertAfter(targetEl);
                            } else {
                                sourceEl.insertBefore(targetEl);
                            }
                        }
                        if (data.column) {
                            data.column.destroy();
                            delete data.column;
                        }
                    }
                }
                target.skipOver = true;
                me.fixWSMenuColumnsWidth();
            },
            onNodeOut: function(target, dd, e, data) {
            },
            onNodeOver: function(target, dd, e, data) {
                if (data.sourceEl == target || target.skipOver === true) {
                    if (target.hasOwnProperty('skipOver')) {
                        delete target.skipOver;
                    }
                    return Ext4.dd.DropZone.prototype.dropAllowed;
                }
                if (data.itemType == 'item') {
                    var targetEl = Ext4.get(target),
                        sourceEl = Ext4.get(data.sourceEl);
                    if (target.type == 'group' || target.type == 'item') {
                        var isTargetSingleItem = target.type == 'item' && Ext.fly(target.parentNode).hasCls('ws-menu-column');
                        if (target.type == 'group') {
                            sourceEl.appendTo(target);
                        } else if (target.type == 'item') {
                            if (isTargetSingleItem) {
                            } else {
                                var targetBox = targetEl.getBox(),
                                    evXY = e.getXY();
                                if (evXY[1] - targetBox.y > targetBox.height / 2) {
                                    sourceEl.insertAfter(targetEl);
                                } else {
                                    sourceEl.insertBefore(targetEl);
                                }
                                if (data.column) {
                                    data.column.destroy();
                                    delete data.column;
                                }
                            }
                        }
                    }
                    me.fixWSMenuColumnsWidth();
                }
                return Ext4.dd.DropZone.prototype.dropAllowed;
            },
            onNodeDrop: function(target, dd, e, data) {
                if (target.type == 'remove') {
                    Ext4.fly(data.sourceEl).destroy();
                }
                me.saveData();
                me.refresh();
                return true;
            }
        });
    },
    fixWSMenuColumnsWidth: function() {
        var me = this,
            mainPanel = Ext4.get(me.el.select('.ws-menu-settings').elements[0]),
            newWidth, cnt = 0;
        mainPanel.select('.ws-menu-column').each(function(el) {
            if (el.child('div')) {
                cnt++;
            }
        });
        newWidth = Math.floor((me.getWidth() - 256) / cnt);
        mainPanel.select('.ws-menu-column').each(function(el, c, index){
            el.setWidth(newWidth);
            el.dom.setAttribute('data-index', index + 1);
        });
        mainPanel.select('.ws-menu-group').each(function(el){
            el.setWidth(newWidth);
        });
        mainPanel.select('.ws-menu-empty').each(function(el){
            el.setWidth(newWidth);
        });
    },
    saveData: function() {
        var me = this,
            mainPanel = Ext4.get(me.el.select('.ws-menu-settings').elements[0]),
            newMenu = [];

        if (!me.data) {
            return;
        }

        var getItemInfo = function(el) {
            var moduleId = el.getAttribute('data-moduleId');
            setModuleIsUsed(moduleId);
            return {
                items: [],
                node_type: 'module',
                module: moduleId,
                title: el.dom.innerText
            }
        };

        var setModuleIsUsed = function(moduleId) {
            Ext4.each(me.data.modules, function(module) {
                if (module.id == moduleId) {
                    module.isUsed = true;
                    return false;
                }
            });
        };

        Ext4.each(me.data.modules, function(module) {
            module.isUsed = false;
        });

        mainPanel.select('.ws-menu-column').each(function(el, index) {
            var child = Ext4.get(el.dom.childNodes[0]),
                menuItem = [];

            if (!child) {
                el.destroy();
                return;
            }

            if (child.hasCls('ws-menu-group')) {
                menuItem = {
                    items: [],
                    title: child.child('.ws-menu-group-title').dom.innerText,
                    node_type: 'item'
                };
                child.select('.ws-menu-item').each(function(el, index) {
                    menuItem.items.push(getItemInfo(el));
                });
            } else if (child.hasCls('ws-menu-item')) {
                menuItem = getItemInfo(child);
            }
            newMenu.push(menuItem);
        });
        me.fixWSMenuColumnsWidth();
        me.data.menu = newMenu;
    },
    refresh: function() {
        var me = this;
        if (me.data) {
            me.setValues(me.data);
        }
    },
    setValues: function(data) {
        var me = this;
        me.data = data;

        me.update(data);

        me.getEl().select('.ws-menu-group-title, .ws-menu-item').each(function(el) {
            if (el.hasCls('ws-menu-group-title')) {
                el.on('click', function(e) {
                    e.stopEvent();
                    me.showTitleWindowForDom(e.target);
                });
            } else if (el.hasCls('ws-menu-item')) {
                el.on('click', function(e) {
                    e.stopEvent();
                    me.showTitleWindowForDom(e.target);
                });
            }
        });
    },
    getMenuSettingsTpl: function() {
        var me = this,
            tpl;

        tpl = new Ext4.XTemplate(
            '{[this.initValues(values)]}',
            '<div class="ws-all-modules">',
                '<div class="ws-all-modules-title">Все модули</div>',
                '<div class="ws-all-modules-list">',
                    '<div class="ws-menu-group" style="float: inherit;"><div class="ws-menu-group-title">Группа модулей</div></div>',
                    '<tpl for="modules">',
                        '<tpl if="!isUsed">',
							'<tpl if="!disabled">',
								'<div class="ws-menu-item J-Zh-I" data-moduleId="{id}">{name_cyr}</div>',
							'</tpl>',
						'</tpl>',
                    '</tpl>',
                '</div>',
            '</div>',
            '<div class="ws-all-modules-border"></div>',
            '<div style="line-height: 40px; margin-left: 250px; padding: 0px 0px 0px 20px;">Из раздела "Все модули" перетащите модуль или пустую группу.</div>',
            '<div class="ws-menu-settings">',
                '<tpl if="menu.length &gt; 0">',
                    '<tpl for="menu">',
                        '<div class="ws-menu-column" id="{id}" data-index="{[xindex]}" style="width: {[this.itemWidth]}px;">',
                            '<tpl if="node_type != \'item\'">',
                                '<div class="ws-menu-item J-Zh-I" data-index="{[xindex]}" data-moduleId="{module}">{title}</div>',
                            '</tpl>',
                            '<tpl if="node_type == \'item\'">',
                                '<div class="ws-menu-group" style="width:{[this.itemWidth]}px">',
                                    '<div class="ws-menu-group-title">{title}</div>',
                                    '<tpl for="items">',
                                        '<div class="ws-menu-item J-Zh-I" data-index="{[xindex]}" data-moduleId="{module}">{title}</div>',
                                    '</tpl>',
                                '</div>',
                            '</tpl>',
                        '</div>',
                    '</tpl>',
                '</tpl>',
                '<tpl if="menu.length == 0">',
                    '<div class="ws-menu-column" id="" data-index="1" style="width: {[this.itemWidth]}px;">',
                '</tpl>',
            '</div>',
            {
                initValues: function(data) {
					for(i in data.modules){
						Ext.Array.contains(me.disabled_modules, data.modules[i].name);
						for(j in me.disabled_modules){
							if(me.disabled_modules[j] == data.modules[i].name){
								data.modules[i].disabled = true;
								break;
							}
							else{
								data.modules[i].disabled = false;
							}
						}
					}
                    var cnt = data.menu.length || 1;
                    this.itemWidth = Math.floor((me.getWidth() - 256) / cnt);
                    return '';
                },
                getWidth: function() {
                    return this.itemWidth;
                }
            }
        );

        return tpl;
    },
    showTitleWindowForDom: function(dom) {
        var me = this;
        if (!Ext4.fly(dom).parent('.ws-all-modules')) {
            Ext.MessageBox.prompt('', '', function(btn, text) {
                if (btn == 'ok') {
                    if (text == '') {
                        Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.NameCantBeEmpty));
                        return me.showTitleWindowForDom.defer(100, me, [dom]);
                    } else {
                        dom.innerText = text;
                        me.saveData();
                    }
                }
            }, this, false, dom.innerText);
        }
    },
    getValues: function() {
        var me = this;
        me.saveData();
        return me.data;
    }
});