Ext4.ux.ExcelExport = function(grid){
    grid.remote_export = grid.remote_export || false;

    if (!grid.setLoading) {
        grid.setLoading = function(mask) {
            if (this.body) {
                if (mask) {
                    this.body.mask(LS.__translate(LS.ReportGeneration));
                } else {
                    this.body.unmask();
                }
            }
        }

    }

    if (!grid.remote_export) {
        this.getGridData = function() {
            var columns = []
            , rowIndexes = []
            , rows = []
            , cm = grid.columns
            , getValue = function(v){return v;};

            for (var i = 0, len = cm.length; i < len; i++) {
                if (cm[i].dataIndex !== '' && !cm[i].hidden) {
                    rowIndexes.push({index: cm[i].dataIndex, renderer: cm[i].rendererExcel || getValue, realNum: i});
                    columns.push({name: cm[i].text});
                }
            }

            grid.getStore().each(function(row) {
                var rowData = [];
                for(var i = 0, len = rowIndexes.length; i < len; i++) {
                    var val = row.data[rowIndexes[i].index];
                    val = rowIndexes[i].renderer.call(this, val);
                    rowData.push({name: val});
                }
                rows.push({rowitems: rowData});
            }, this);
            return {
                columns: columns
                , rows: rows
            };
        };
        var data = this.getGridData();
        grid.setLoading(true);
        Ext4.Ajax.request({
            url: 'printforms/excel_export.php'
            , scope: this
            , params: {
                params: Ext4.encode({
                    remote_export: 0
                    , columns: data.columns
                    , rows: data.rows
                })
            }
            , success: function(r) {
                grid.setLoading(false);
                var result = Ext4.decode(r.responseText)
                     , url = result.url
                    , title = result.title || LS.__translate(LS.DownloadTheReport);

                if (!url) {
                    Ext.MsgManager.alertError(LS.__translate(LS.Error), result.messages.join('<br/>'));
                    return;
                }

                if (_IS_SERVER_IN_CLINIC) {
                    url = window.location.origin + "/" + result.url;
                }

                (new Ext3.Window({
                    title: LS.__translate(LS.Attention)
                    , html: '<a href="'+ url +'" download="'+result.filename+'">' + title + '</a>'
                    , padding: 20
                    , modal: true
                })).show();
            }
            , failure: function(r) {
                grid.setLoading(false);
                Ext3.MsgManager.alert(LS.__translate(LS.Error), 'Ошибка экспорта');
            }
        });
    } else { // if csv import from database
        grid.setLoading(true);
        var params = {};
        if (grid.getStore) {
            var store = grid.getStore();
            if (store.baseParams) {
                params = store.baseParams || {};
            } else {
                params = store.getProxy().extraParams || {};
            }
        }
        if (grid.exportParams) {
            Ext.apply(params, grid.exportParams || {});
        }
        if (Ext.isFunction(grid.getExportParams)) {
            Ext.apply(params, grid.getExportParams() || {});
        }
        Ext4.Ajax.request({
            url: 'printforms/excel_export.php'
            , scope: this
            , params: {
                params: Ext4.encode({
                    remote_export: 1
                    , store_params: params
                })
            }
            , success: function(r) {
                grid.setLoading(false);
                var result = Ext4.decode(r.responseText)
                    , url = result.url
                    , title = result.title || LS.__translate(LS.DownloadTheReport);

                if (!url) {
                    Ext.MsgManager.alertError(LS.__translate(LS.Error), result.messages.join('<br/>'));
                    return;
                }

                (new Ext3.Window({
                    title: LS.__translate(LS.Attention)
                    , html: '<a href="'+ url +'" download="'+result.filename+'">' + title + '</a>'
                    , padding: 20
                    , modal: true
                })).show();
            }
            , failure: function(r) {
                grid.setLoading(false);
                Ext3.MsgManager.alert(LS.__translate(LS.Error), 'Ошибка экспорта');
            }
        });
    }
};