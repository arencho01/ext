Ext4.define('VetmanagerApp.modules.administration.controller.settings.Catalogs', {
    extend: 'Ext4.app.Controller'
    , views: [
        'VetmanagerApp.modules.administration.view.settings.Catalogs'
    ]
    , requires: [
        'Ext4.ux.ColorField'
        , 'Ext4.ux.form.StreetTypeCombo'
        , 'Ext4.ux.form.CitiesCombo'
        , 'Ext4.ux.form.PetTypeCombo'
        , 'Ext4.ux.form.CityTypesCombo'
        , 'Ext4.ux.form.BlockStreetTypesAndTextfield'
        , 'Ext4.ux.form.BlockCityTypesAndCities'
    ]
    , refs: [
        {
            ref: 'mainPanel'
            , selector: 'catalogs'
            , autoCreate: true
            , xtype: 'catalogs'
        }, {
            ref: 'itemsGrid'
            , selector: 'catalogs grid[name="items"]'
        }, {
            ref: 'catalogsGrid'
            , selector: 'catalogs grid[name="catalogs"]'
        }, {
            ref: 'showDeactivatedBtn'
            , selector: 'catalogs grid[name="items"] component[action="show_deactivated"]'
        }, {
            ref: 'showActivatedBtn'
            , selector: 'catalogs grid[name="items"] component[action="show_activated"]'
        }, {
            ref: 'deactivateBtn'
            , selector: 'catalogs grid[name="items"] component[action="deactivate"]'
        }, {
            ref: 'activateBtn'
            , selector: 'catalogs grid[name="items"] component[action="activate"]'
        }, {
            ref: 'deleteBtn'
            , selector: 'catalogs grid[name="items"] component[action="delete"]'
        }, {
            ref: 'compareBtn'
            , selector: 'catalogs grid[name="items"] component[action="compare"]'
        }
    ]
    , init: function() {
        var obj = {};

        if (!this.isEventExists('itemclick', 'catalogs grid[name="catalogs"]')) {
            obj['catalogs grid[name="catalogs"]'] = {itemclick: this.onCatalogSelect};
        }
        if (!this.isEventExists('itemdblclick', 'catalogs grid[name="items"]')) {
            obj['catalogs grid[name="items"]'] = {itemdblclick: this.onEditClick};
        }
        if (!this.isEventExists('render', 'catalogs grid[name="items"]')) {
            obj['catalogs grid[name="items"]'] = {render: this.onItemsRendered};
        }
        if (!this.isEventExists('click', 'catalogs grid[name="items"] component[action="add"]')) {
            obj['catalogs grid[name="items"] component[action="add"]'] = {click: this.onAddClick};
        }
        if (!this.isEventExists('click', 'catalogs grid[name="items"] component[action="edit"]')) {
            obj['catalogs grid[name="items"] component[action="edit"]'] = {click: this.onEditClick};
        }
        if (!this.isEventExists('click', 'catalogs grid[name="items"] component[action="show_deactivated"]')) {
            obj['catalogs grid[name="items"] component[action="show_deactivated"]'] = {click: this.showDeactivated};
        }
        if (!this.isEventExists('click', 'catalogs grid[name="items"] component[action="show_activated"]')) {
            obj['catalogs grid[name="items"] component[action="show_activated"]'] = {click: this.showActivated};
        }
        if (!this.isEventExists('click', 'catalogs grid[name="items"] component[action="deactivate"]')) {
            obj['catalogs grid[name="items"] component[action="deactivate"]'] = {click: this.deactivate};
        }
        if (!this.isEventExists('click', 'catalogs grid[name="items"] component[action="activate"]')) {
            obj['catalogs grid[name="items"] component[action="activate"]'] = {click: this.activate};
        }
        if (!this.isEventExists('click', 'catalogs grid[name="items"] component[action="compare"]')) {
            obj['catalogs grid[name="items"] component[action="compare"]'] = {click: this.onEditClick};
        }
        if (!this.isEventExists('click', 'catalogs grid[name="items"] component[action="delete"]')) {
            obj['catalogs grid[name="items"] component[action="delete"]'] = {click: this.onDeleteClick};
        }

        this.control(obj);
    }
    , isEventExists: function(eventName, selector) {
        if (this.application.eventbus.bus[eventName] != null
            && this.application.eventbus.bus[eventName][selector] != null) {
            return true;
        }

        return false;
    }
    , onItemsRendered: function(grid) {
        grid.columns[0].hide();
    }
    , showDeactivated: function(b) {
        b.hide();
        this.getShowActivatedBtn().show();
        this.getActivateBtn().show();
        this.getDeactivateBtn().hide();

        var grid = this.getItemsGrid()
            , catalogs = this.getCatalogsGrid()
            , sm = catalogs.getSelectionModel()
            , itemsStore = grid.getStore();

        if (sm.hasSelection()) {
            itemsStore.proxy.setExtraParam('manual_id', sm.getSelection()[0].get('id')*1);
            itemsStore.proxy.setExtraParam('is_active', 0);
            itemsStore.load();
        }
    }
    , showActivated: function(b) {
        b.hide();
        this.getShowDeactivatedBtn().show();
        this.getActivateBtn().hide();
        this.getDeactivateBtn().show();

        var grid = this.getItemsGrid()
            , catalogs = this.getCatalogsGrid()
            , sm = catalogs.getSelectionModel()
            , itemsStore = grid.getStore();

        if (sm.hasSelection()) {
            itemsStore.proxy.setExtraParam('manual_id', sm.getSelection()[0].get('id')*1);
            itemsStore.proxy.setExtraParam('is_active', 1);
            itemsStore.load();
        }
    }
    , actDeactItem: function(title, text, cmd) {
        var grid = this.getItemsGrid()
            , catalogs = this.getCatalogsGrid()
            , catalogsSm = catalogs.getSelectionModel()
            , sm = grid.getSelectionModel()
            , me = this;

        if (sm.hasSelection()) {
            var comboManualId = catalogsSm.getSelection()[0].get('id');

            if(comboManualId == 11 && cmd == "activate_item"){
                Ext4.Ajax.request({
                    url: 'ajax_combo_manual.php'
                    , scope: this
                    , params: {
                        cmd: 'get_combo_failed_hooks'
                    }
                    , success: function(r) {
                        var result = Ext4.decode(r.responseText);
                        if(result.data.enough_failed_hooks){
                            text = "Все данные неудачно выполненных хук-уведамлений будут удалены! " + text;
                        }
                        me.confirmActDeactItem(title, text, cmd, catalogsSm, sm)
                    }
                });
            }else {
                me.confirmActDeactItem(title, text, cmd, catalogsSm, sm)
            }
        }
    }
    , confirmActDeactItem: function(title, text, cmd, catalogSelectionModel, selectionItems){
        Ext4.MessageBox.confirm(
            title
            , text
            , function(btn) {
                if ('yes' === btn) {
                    var sels = selectionItems.getSelection()
                        , ids = [];

                    for(var i = 0; i < sels.length; i++) {
                        ids.push(sels[i].get('id')*1);
                    }

                    Ext4.Ajax.request({
                        url: 'ajax_combo_manual.php'
                        , scope: this
                        , params: {
                            cmd: cmd
                            , item_id: Ext4.encode(ids)
                            , combo_manual_id: catalogSelectionModel.getSelection()[0].get('id')
                        }
                        , success: function(r) {
                            var result = Ext4.decode(r.responseText);

                            if (!result.is_error) {
                                if (catalogSelectionModel.hasSelection()) {
                                    this.catalogSelect(catalogSelectionModel.getSelection()[0].get('id'), catalogSelectionModel.getSelection()[0].get('title'));
                                }

                                if (result.msg || result.message) {
                                    Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), result.msg || result.message);
                                }
                            } else {
                                if (result.msg || result.message) {
                                    Ext3.MsgManager.alertError(LS.__translate(LS.Error), result.msg || result.message);
                                } else {
                                    Ext3.MsgManager.alertError(LS.__translate(LS.Error), 'Ошибка при выполнении операции');
                                }
                            }
                        }
                        , failure: function(r) {
                            var result = Ext4.decode(r.responseText);
                            Ext3.MsgManager.alertError(LS.__translate(LS.Error), result.msg);
                        }
                    });
                }
            }
            , this);
    }
    , deactivate: function(b) {
        var catalogs = this.getCatalogsGrid()
            , sm = catalogs.getSelectionModel();
            
        if (sm.getSelection()[0].data.id == -1) {
            if (!Ext3.app.Module.prototype.all_access.guides.edit) {
                Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.InsufficientAccessRights));
                return;
            }
        }
        
        this.actDeactItem(LS.__translate(LS.Deactivation), LS.__translate(LS.AreYouSureYouWantToDeactivateTheItem), 'deactivate_item');
    }
    , activate: function(b) {
        var catalogs = this.getCatalogsGrid()
            , sm = catalogs.getSelectionModel();
            
        if (sm.getSelection()[0].data.id == -1) {
            if (!Ext3.app.Module.prototype.all_access.guides.edit) {
                Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.InsufficientAccessRights));
                return;
            }
        }
        
        this.actDeactItem(LS.__translate(LS.Activation), LS.__translate(LS.AreYouSureYouWantToActivateTheItem), 'activate_item');
    }
    , onDeleteClick: function(b) {
        var catalogs = this.getCatalogsGrid()
            , sm = catalogs.getSelectionModel();
            
        if (sm.getSelection()[0].data.id == -1) {
            if (!Ext3.app.Module.prototype.all_access.guides.delete) {
                Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.InsufficientAccessRights));
                return;
            }
        }
        
        this.actDeactItem(LS.__translate(LS.Deleting), LS.__translate(LS.AreYouSureYouWantToDeleteTheItem), 'delete_item');
    }
    , getColumnOperationsByCatalog: function(title) {
        if (LS.__translate(LS.ReceptionType) == title || LS.__translate(LS.purposeOfAdmission) == title) {
            return [
                { hasChanges: true, hide: false, text: ''}
                , { hasChanges: true, hide: false, text: LS.__translate(LS.Namez) }
                , { hasChanges: true, hide: false, text: LS.__translate(LS.Value) }
                , { hasChanges: true, hide: false, text: LS.__translate(LS.ReceptionDuration) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.additionalParameter2) }
                , { hasChanges: true, hide: false, text: LS.__translate(LS.colorInCalendar) }
            ];
        } else if (LS.__translate(LS.VisitResult) == title) {
            return [
                { hasChanges: true, hide: false, text: ''}
                , { hasChanges: true, hide: false, text: LS.__translate(LS.Namez) }
                , { hasChanges: true, hide: false, text: LS.__translate(LS.Value) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.AdditionalParameter) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.additionalParameter2) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.ExtraParameter) }
            ];
        } else if (LS.__translate(LS.InWhatWayClinicWasFound) == title) {
            return [
                { hasChanges: true, hide: false, text: ''}
                , { hasChanges: true, hide: false, text: LS.__translate(LS.Namez) }
                , { hasChanges: true, hide: false, text: LS.__translate(LS.Value) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.AdditionalParameter) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.additionalParameter2) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.ExtraParameter) }
            ];
        } else if (LS.__translate(LS.ColorsOfAnimals) == title) {
            return [
                { hasChanges: true, hide: false, text: ''}
                , { hasChanges: true, hide: false, text: LS.__translate(LS.Color) }
                , { hasChanges: true, hide: false, text: LS.__translate(LS.Value) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.AdditionalParameter) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.additionalParameter2) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.ExtraParameter) }
            ];
        } else if (LS.__translate(LS.ServicesForHookNotifications) == title) {
            return [
                { hasChanges: true, hide: false, text: ''}
                , { hasChanges: true, hide: false, text: LS.__translate(LS.Namez) }
                , { hasChanges: true, hide: false, text: LS.__translate(LS.Url) }
                , { hasChanges: true, hide: false, text: LS.__translate(LS.parameter1) }
                , { hasChanges: true, hide: false, text: LS.__translate(LS.parameter2) }
                , { hasChanges: true, hide: false, text: LS.__translate(LS.parameter3) }
            ];
        } else if (LS.__translate(LS.Diagnoses) == title) {
            return [
                { hasChanges: true, hide: false, text: ''}
                , { hasChanges: true, hide: false, text: LS.__translate(LS.Namez) }
                , { hasChanges: true, hide: false, text: 'Есть привязка питания' }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.parameter1) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.parameter2) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.parameter3) }
            ];
        } else if (LS.__translate(LS.Cities) == title) {
            return [
                { hasChanges: true, hide: false, text: ''}
                , { hasChanges: true, hide: false, text: LS.__translate(LS.LocalityName) }
                , { hasChanges: true, hide: false, text: LS.__translate(LS.LocalityType) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.parameter1) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.parameter2) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.parameter3) }
            ];
        } else if (LS.__translate(LS.Streets) == title) {
            return [
                { hasChanges: true, hide: false, text: ''}
                , { hasChanges: true, hide: false, text: LS.__translate(LS.Namez) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.Value) }
                , { hasChanges: true, hide: false, text: LS.__translate(LS.City), dataIndex: 'dop_param1_title' }
                , { hasChanges: true, hide: false, text: LS.__translate(LS.Type2), dataIndex: 'dop_param2_title' }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.parameter3) }
            ];
        } else if (LS.__translate(LS.Manufacturers) == title) {
            return [
                { hasChanges: true, hide: false, text: ''}
                , { hasChanges: true, hide: false, text: LS.__translate(LS.Namez) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.Value) }
                , { hasChanges: true, hide: false, text: LS.__translate(LS.ContactInformation) }
                , { hasChanges: true, hide: false, text: LS.__translate(LS.Description) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.ExtraParameter) }
            ];
        } else if (LS.__translate(LS.TypeOfSurgeries) == title) {
            return [
                { hasChanges: true, hide: false, text: ''}
                , { hasChanges: true, hide: false, text: LS.__translate(LS.Namez)}
                , { hasChanges: true, hide: true, text: LS.__translate(LS.Value) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.AdditionalParameter) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.additionalParameter2) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.ExtraParameter) }
            ];
        } else if (LS.__translate(LS.VaccinationType) == title) {
            return [
                { hasChanges: true, hide: false, text: ''}
                , { hasChanges: true, hide: false, text: LS.__translate(LS.Namez) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.Value) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.AdditionalParameter) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.additionalParameter2) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.ExtraParameter) }
            ];
        } else if (LS.__translate(LS.TypesOfDiagnosis) == title) {
            return [
                { hasChanges: true, hide: false, text: ''}
                , { hasChanges: true, hide: false, text: LS.__translate(LS.Namez) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.Value) }
                , { hasChanges: true, hide: false, text: LS.__translate(LS.defaultDiagnosis), renderer: function(v) {return (v == 'true') ? LS.__translate(LS.Yes) : LS.__translate(LS.No) ;} }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.additionalParameter2) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.ExtraParameter) }
            ];
        } else if (LS.__translate(LS.TypesOfAnimals) == title) {
            return [
                { hasChanges: true, hide: false, text: ''}
                , { hasChanges: true, hide: false, text: LS.__translate(LS.Namez) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.Value) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.parameter1) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.parameter2) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.parameter3) }
            ];
        } else if (LS.__translate(LS.AnimalSpecies) == title) {
            return [
                { hasChanges: true, hide: false, text: ''}
                , { hasChanges: true, hide: false, text: LS.__translate(LS.Breed) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.Value) }
                , { hasChanges: true, hide: false, text: LS.__translate(LS.TypeOfThePet), dataIndex: 'dop_param1_title' }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.additionalParameter2) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.ExtraParameter) }
            ];
        } else if (LS.__translate(LS.TypesOfClients) == title) {
            return [
                { hasChanges: true, hide: false, text: ''}
                , { hasChanges: true, hide: false, text: LS.__translate(LS.Namez) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.Value) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.parameter1) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.parameter2) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.parameter3) }
            ];
        }  else if (LS.__translate(LS.Units) == title) {
            return [
                { hasChanges: true, hide: false, text: ''}
                , { hasChanges: true, hide: false, text: LS.__translate(LS.Namez) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.Value) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.parameter1) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.parameter2) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.parameter3) }
            ];
        } else if (title == LS.__translate(LS.VOIPCallType) || title == LS.__translate(LS.VOIPCallResult)) {
            return [
                { hasChanges: true, hide: false, text: ''}
                , { hasChanges: true, hide: false, text: LS.__translate(LS.Namez) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.Value) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.parameter1) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.parameter2) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.parameter3) }
            ];
        } else if (LS.__translate(LS.TypeOfAnIncomingDocument) == title) {
            return [
                { hasChanges: true, hide: false, text: ''}
                , { hasChanges: true, hide: false, text: LS.__translate(LS.Namez) }
                , { hasChanges: true, hide: false, text: LS.__translate(LS.Value) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.AdditionalParameter) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.additionalParameter2) }
                , { hasChanges: true, hide: true, text: LS.__translate(LS.ExtraParameter) }
            ];
        }

        return [
            { hasChanges: true, hide: false, text: ''}
            , { hasChanges: true, hide: false, text: LS.__translate(LS.Namez) }
            , { hasChanges: true, hide: false, text: LS.__translate(LS.Value) }
            , { hasChanges: true, hide: false, text: LS.__translate(LS.AdditionalParameter) }
            , { hasChanges: true, hide: false, text: LS.__translate(LS.additionalParameter2) }
            , { hasChanges: true, hide: false, text: LS.__translate(LS.ExtraParameter) }
        ];
    }
    , getButtonOptionsByCatalog: function(title) {
        var options = []
        switch(title) {
            case LS.__translate(LS.Diagnoses):
                options.push({ref: 'compareBtn', show: true});
                options.push({ref: 'deleteBtn', show: true});
                options.push({ref: 'deactivateBtn', show: true});
                options.push({ref: 'activateBtn', show: false});
                options.push({ref: 'showDeactivatedBtn', show: true});
                options.push({ref: 'showActivatedBtn', show: false});
                break;
            case LS.__translate(LS.Cities):
                options.push({ref: 'compareBtn', show: true});
                options.push({ref: 'deleteBtn', show: true});
                options.push({ref: 'deactivateBtn', show: false});
                options.push({ref: 'activateBtn', show: false});
                options.push({ref: 'showDeactivatedBtn', show: false});
                options.push({ref: 'showActivatedBtn', show: false});
                break;
            case LS.__translate(LS.Streets):
                options.push({ref: 'compareBtn', show: true});
                options.push({ref: 'deleteBtn', show: true});
                options.push({ref: 'deactivateBtn', show: false});
                options.push({ref: 'activateBtn', show: false});
                options.push({ref: 'showDeactivatedBtn', show: false});
                options.push({ref: 'showActivatedBtn', show: false});
                break;
            case LS.__translate(LS.Manufacturers):
                options.push({ref: 'compareBtn', show: true});
                options.push({ref: 'deleteBtn', show: false});
                options.push({ref: 'deactivateBtn', show: true});
                options.push({ref: 'activateBtn', show: false});
                options.push({ref: 'showDeactivatedBtn', show: true});
                options.push({ref: 'showActivatedBtn', show: false});
                break;
            case LS.__translate(LS.TypesOfAnimals):
                options.push({ref: 'compareBtn', show: true});
                options.push({ref: 'deleteBtn', show: true});
                options.push({ref: 'deactivateBtn', show: false});
                options.push({ref: 'activateBtn', show: false});
                options.push({ref: 'showDeactivatedBtn', show: false});
                options.push({ref: 'showActivatedBtn', show: false});
                break;
            case LS.__translate(LS.AnimalSpecies):
                options.push({ref: 'compareBtn', show: true});
                options.push({ref: 'deleteBtn', show: true});
                options.push({ref: 'deactivateBtn', show: false});
                options.push({ref: 'activateBtn', show: false});
                options.push({ref: 'showDeactivatedBtn', show: false});
                options.push({ref: 'showActivatedBtn', show: false});
                break;
            case LS.__translate(LS.TypesOfClients):
                options.push({ref: 'compareBtn', show: true});
                options.push({ref: 'deleteBtn', show: true});
                options.push({ref: 'deactivateBtn', show: false});
                options.push({ref: 'activateBtn', show: false});
                options.push({ref: 'showDeactivatedBtn', show: false});
                options.push({ref: 'showActivatedBtn', show: false});
                break;
            case LS.__translate(LS.Units):
                options.push({ref: 'compareBtn', show: true});
                options.push({ref: 'deleteBtn', show: false});
                options.push({ref: 'deactivateBtn', show: true});
                options.push({ref: 'activateBtn', show: false});
                options.push({ref: 'showDeactivatedBtn', show: true});
                options.push({ref: 'showActivatedBtn', show: false});
                break;
            case LS.__translate(LS.VOIPCallType):
            case LS.__translate(LS.VOIPCallResult):
                options.push({ref: 'compareBtn', show: false});
                options.push({ref: 'deleteBtn', show: false});
                options.push({ref: 'deactivateBtn', show: true});
                options.push({ref: 'activateBtn', show: false});
                options.push({ref: 'showDeactivatedBtn', show: true});
                options.push({ref: 'showActivatedBtn', show: false});
                break;
            default:
                options.push({ref: 'compareBtn', show: true});
                options.push({ref: 'deleteBtn', show: false});
                options.push({ref: 'deactivateBtn', show: true});
                options.push({ref: 'activateBtn', show: false});
                options.push({ref: 'showDeactivatedBtn', show: true});
                options.push({ref: 'showActivatedBtn', show: false});
                break;
        }
        return options;
    }
    , catalogSelect: function(manual_id, manual_title) {
        var grid = this.getItemsGrid()
            , itemsStore = grid.getStore();
        this.getCompareBtn().hide();
        this.getDeleteBtn().hide();
        this.getShowActivatedBtn().hide();
        this.getShowDeactivatedBtn().show();
        this.getActivateBtn().hide();
        this.getDeactivateBtn().show();

        var colOperations = this.getColumnOperationsByCatalog(manual_title);
        var checkboxColumnIndex = 0;

        for(var i = 0, len = colOperations.length; i < len; i++) {
            if (colOperations[i].hasChanges) {
                grid.columns[i].setText(colOperations[i].text);

                if (colOperations[i].hide) {
                    grid.columns[i].hide();
                } else {
                    grid.columns[i].show();
                }
                if (colOperations[i].dataIndex) {
                    grid.columns[i].dataIndex = colOperations[i].dataIndex;
                } else {
                    grid.columns[i].dataIndex = grid.columns[i].initialConfig.dataIndex;
                }
                if (colOperations[i].renderer) {
                    grid.columns[i].renderer = colOperations[i].renderer;
                } else if( i != checkboxColumnIndex ) {
                    grid.columns[i].renderer = false;
                }
                if (-5 == manual_id  && LS.__translate(LS.AnimalSpecies) ==  manual_title && "dop_param1_title" == grid.columns[i].dataIndex) {
                    grid.columns[i].sortable = true;
                }
            }
        }

        var buttonOperations = this.getButtonOptionsByCatalog(manual_title);
        Ext.isArray(buttonOperations) && Ext.each(buttonOperations, function(opt) {
            if (opt.ref) {
                try {
                    var btn = this.getRef(opt.ref);
                    if (btn) {
                        if (opt.show) {
                            btn.show()
                        } else {
                            btn.hide();
                        }
                        if (opt.title) {
                            btn.setText(opt.title);
                        }
                    }
                }
                catch(e) {}
            }
        }, this);


        itemsStore.proxy.setExtraParam('manual_id', manual_id);
        itemsStore.proxy.setExtraParam('is_active', 1);
        itemsStore.loadPage(1);
    }
    , onCatalogSelect: function(th, record, item, index, e, eOpts ) {
        this.catalogSelect(record.get('id'), record.get('title'));
    }
    , getItemsByCatalog: function(cmd, manual_id, title) {
        var items = [
            {xtype: 'hiddenfield', name: 'cmd', value: cmd}
            , {xtype: 'hiddenfield', name: 'id', value: 0}
        ];

        if (LS.__translate(LS.ReceptionType) == title || LS.__translate(LS.purposeOfAdmission) == title) {
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.Namez), name: 'title', allowBlank: false, maxLength: 250});
            items.push({xtype: 'timefield', fieldLabel: LS.__translate(LS.ReceptionDuration), increment: 15, format: 'H:i:00', name: 'dop_param1', allowBlank: false, value: '00:15:00'});
            items.push({xtype: 'colorfield', fieldLabel: LS.__translate(LS.colorInCalendar), name: 'dop_param3', allowBlank: false, value: '#FFFFFF'});
            items.push({xtype: 'hiddenfield', name: 'value', value: 'increment'});
        } else if (LS.__translate(LS.VisitResult) == title) {
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.Namez), name: 'title', allowBlank: false, maxLength: 250});
            items.push({xtype: 'hiddenfield', name: 'value', value: 'increment'});
        } else if (LS.__translate(LS.TypeOfSurgeries) == title) {
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.Namez), name: 'title', allowBlank: false, maxLength: 250});
            items.push({xtype: 'hiddenfield', name: 'value', value: 'increment'});
        } else if (LS.__translate(LS.VaccinationType) == title) {
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.Namez), name: 'title', allowBlank: false, maxLength: 250});
            items.push({xtype: 'hiddenfield', name: 'value', value: 'increment'});
        } else if (LS.__translate(LS.InWhatWayClinicWasFound) == title) {
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.Namez), name: 'title', allowBlank: false, maxLength: 250});
            items.push({xtype: 'hiddenfield', name: 'value', value: 'increment'});
        } else if (LS.__translate(LS.ColorsOfAnimals) == title) {
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.Namez), name: 'title', allowBlank: false, maxLength: 250});
            items.push({xtype: 'hiddenfield', name: 'value', value: 'increment'});
        } else if (LS.__translate(LS.ServicesForHookNotifications) == title) {
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.Namez), name: 'title', allowBlank: false, maxLength: 250});
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.Url), name: 'value', allowBlank: false});
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.parameter1), name: 'dop_param1'});
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.parameter2), name: 'dop_param2'});
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.parameter3), name: 'dop_param3'});
        } else if (LS.__translate(LS.Diagnoses) == title) {
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.Namez), name: 'title', allowBlank: false, maxLength: 250});
        } else if (LS.__translate(LS.Cities) == title) {
            items.push({xtype: 'citytypescombo', fieldLabel: LS.__translate(LS.Type2), name: 'type_id', allowBlank: false, maxLength: 250, value: '1'});
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.Namez), name: 'title', allowBlank: false, maxLength: 250});
        } else if (LS.__translate(LS.Streets) == title) {
            items.push({xtype: 'blockstreettypesandtextfield'});
            items.push({xtype: 'blockcitytypesandcities'});
        } else if (LS.__translate(LS.Manufacturers) == title) {
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.Namez) + ' *', name: 'title', allowBlank: false, maxLength: 250});
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.ContactInformation), name: 'dop_param1'});
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.Description), name: 'dop_param2'});
        } else if (LS.__translate(LS.TypesOfDiagnosis) == title) {
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.Namez), name: 'title', allowBlank: false, maxLength: 250});
            items.push({xtype: 'hiddenfield', name: 'value', value: 'increment'});
            items.push({xtype: 'checkboxfield', fieldLabel: LS.__translate(LS.ByDefault), name: 'dop_param1'});
        } else if (LS.__translate(LS.TypesOfAnimals) == title) {
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.Namez), name: 'title', allowBlank: false, maxLength: 250});
        } else if (LS.__translate(LS.AnimalSpecies) == title) {
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.Breed), name: 'title', allowBlank: false, maxLength: 250});
            items.push({xtype: 'pettypecombo', fieldLabel: LS.__translate(LS.TypeOfThePet), name: 'dop_param1', allowBlank: false});
        } else if (LS.__translate(LS.TypesOfClients) == title) {
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.Namez), name: 'title', allowBlank: false, maxLength: 250});
        } else if (LS.__translate(LS.Units) == title) {
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.Units), name: 'title', allowBlank: false, maxLength: 250});
        } else if (title == LS.__translate(LS.VOIPCallType) || title == LS.__translate(LS.VOIPCallResult)) {
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.Namez), name: 'title', allowBlank: false, maxLength: 250});
        } else if (title == LS.__translate(LS.TypeOfAnIncomingDocument) || title == LS.__translate(LS.TypeOfAnIncomingDocument)) {
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.Namez), name: 'title', allowBlank: false, maxLength: 250});
            items.push({xtype: 'hiddenfield', name: 'value', value: 'increment'});
        }else { // default
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.Namez), name: 'title', allowBlank: false, maxLength: 250});
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.AdditionalParameter), name: 'dop_param1'});
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.additionalParameter2), name: 'dop_param2'});
            items.push({xtype: 'textfield', fieldLabel: LS.__translate(LS.ExtraParameter), name: 'dop_param3'});
        }

        items.push({xtype: 'hiddenfield', name: 'combo_manual_id', value: manual_id});

        return items;
    }
    , onAddClick: function() {
        var catalogs = this.getCatalogsGrid()
            , sm = catalogs.getSelectionModel();
            
        if (sm.getSelection()[0].data.id == -1) {
            if (!Ext3.app.Module.prototype.all_access.guides.edit) {
                Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.InsufficientAccessRights));
                return;
            }
        }
        
        if (sm.hasSelection()) {
            var items = this.getItemsByCatalog('add_item', sm.getSelection()[0].get('id')*1, sm.getSelection()[0].get('title'))
                , outerFn = function(params) {
                    Ext4.Ajax.request({
                        url: 'ajax_combo_manual.php'
                        , scope: this
                        , params: params
                        , success: function(r) {
                            var result = Ext4.decode(r.responseText);

                            if (!result.is_error) {
                                if (sm.hasSelection()) {
                                    this.catalogSelect(sm.getSelection()[0].get('id'), sm.getSelection()[0].get('title'));
                                }

                                Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), result.msg);
                            } else {
                                Ext3.MsgManager.alertError(LS.__translate(LS.Error), result.msg);
                            }
                        }
                        , failure: function(r) {
                            var result = Ext4.decode(r.responseText);
                            Ext3.MsgManager.alertError(LS.__translate(LS.Error), result.msg);
                        }
                    });
                };

            this.showAddEditItemWindow('add', items, outerFn);
        }
    }
    , onEditClick: function(b) {
        var catalogs = this.getCatalogsGrid()
            , sm = catalogs.getSelectionModel();
            
        if (sm.getSelection()[0].data.id == -1) {
            if (!Ext3.app.Module.prototype.all_access.guides.edit) {
                Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.InsufficientAccessRights));
                return;
            }
        }
        
        var catalogs = this.getCatalogsGrid()
            , itemsGrid = this.getItemsGrid()
            , itemsSm = itemsGrid.getSelectionModel()
            , sm = catalogs.getSelectionModel()
            , isCompare = false
            , ids = []
            , cmd = 'edit_item';

        if (b.action == 'compare') {
            isCompare = true;
            cmd = 'compare_item';
            if (itemsSm.getCount() <= 1) {
                return;
            }
            var id = itemsSm.getSelection()[0].get('id')
            Ext4.each(itemsSm.getSelection(), function(rec) {
                if (rec.get('id') != id) {
                    ids.push(rec.get('id'));
                }
            });
        }

        if (sm.hasSelection() && itemsSm.hasSelection()) {
            var comboId = parseInt(sm.getSelection()[0].get('id'));

            if (comboId == -7 && (ids.indexOf('0') != -1 || id == 0)) {
                Ext3.MsgManager.alertError(LS.__translate(LS.Error), LS.__translate(LS.YouCanNotCombineUnitWithAnything));
                return;
            }

            var items = this.getItemsByCatalog(cmd, comboId, sm.getSelection()[0].get('title'))
                , outerFn = function(params) {
                    if (isCompare){
                        params.ids = ids.join(',');
                    }
                    Ext4.Ajax.request({
                        url: 'ajax_combo_manual.php?_dc=' + (new Date()).getTime()
                        , scope: this
                        , params: params
                        , success: function(r) {
                            var result = Ext4.decode(r.responseText);

                            if (!result.is_error) {
                                if (sm.hasSelection()) {
                                    this.catalogSelect(sm.getSelection()[0].get('id'), sm.getSelection()[0].get('title'));
                                }

                                Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), result.msg);
                            } else {
                                Ext3.MsgManager.alertError(LS.__translate(LS.Error), result.msg);
                            }
                        }
                        , failure: function(r) {
                            var result = Ext4.decode(r.responseText);
                            Ext3.MsgManager.alertError(LS.__translate(LS.Error), result.msg);
                        }
                    });
                };
            var values = Ext.applyIf({}, itemsSm.getSelection()[0].data);
            Ext.applyIf(values, itemsSm.getSelection()[0].raw);
            this.showAddEditItemWindow('edit', items, outerFn, values);
        }
    }
    , showAddEditItemWindow: function(mode, items, outerFn, values) {
        var win = Ext4.create('Ext4.window.Window', {
            title: ('add' == mode) ? LS.__translate(LS.ElementAdding) : LS.__translate(LS.ElementEditing)
            , modal: true
            , autoHeight: true
            , buttonAlign: 'center'
            , width: 400
            , layout: 'fit'
            , items: [{
                xtype: 'form'
                , defaults: {
                    labelWidth: 150
                    , anchor: '100%'
                    , padding: '10px'
                }
                , items: items
            }]
            , listeners: {
                scope: this
                , show: function() {
                    var frm = win.down('form');
                    if (frm != null) {
                        frm.getForm().findField('title').focus(true, 400);
                    }
                }
            }
            , buttons: [
                {
                    text: LS.__translate(LS.Save)
                    , scope: this
                    , handler: function() {
                        if (outerFn) {
                            var frm = win.down('form');
                            if (frm != null) {
                                if (frm.getForm().isValid()) {
                                    outerFn.call(this, frm.getForm().getFieldValues());
                                    win.close();
                                } else {
                                    Ext3.MsgManager.alert(LS.__translate(LS.SystemMessage), LS.__translate(LS.YouMustFillInAllFields));
                                }
                            }
                        }
                    }
                }, {
                    text: LS.__translate(LS.Close)
                    , scope: this
                    , handler: function() {
                        win.close();
                    }
                }
            ]
        });

        win.show();

        var frm = win.down('form');

        if (frm) {
            if (values != null) {
                if (frm != null) {
                    if (values.combo_manual_id == -3) {
                        var com = frm.getForm().findField('dop_param1')
                            , st = com.getStore()
                            , pr = st.getProxy();

                        pr.setExtraParam('city_id', values.dop_param1);
                    }

                    frm.getForm().setValues(values);
                }
            } else {
                if (items.length >= 5 && items[4].value == -2) {
                    frm.getForm().findField('type_id').store.load(function() {
                        frm.getForm().findField('type_id').setValue('1')
                    });
                }
            }
        }

        return win;
    }
});