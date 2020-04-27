Ext4.define('VetmanagerApp.modules.graphic_reports.controller.Graphic', {
    extend: 'Ext4.app.Controller'
    , views: [
        'VetmanagerApp.modules.graphic_reports.view.GraphicMain'
    ]
    , stores: [
        'VetmanagerApp.modules.graphic_reports.store.GraphicList'
    ]
    , requires: [
        'VetmanagerApp.modules.graphic_reports.controller.graphics.basicFunctions'
        , 'VetmanagerApp.modules.graphic_reports.controller.graphics.ClientActivity'
        , 'VetmanagerApp.modules.graphic_reports.controller.graphics.DoctorVisits'
        , 'VetmanagerApp.modules.graphic_reports.controller.graphics.RevenuesByCategory'
        , 'VetmanagerApp.modules.graphic_reports.controller.graphics.AllGoodSale'
        , 'VetmanagerApp.modules.graphic_reports.controller.graphics.PetTypes'
        , 'VetmanagerApp.modules.graphic_reports.controller.graphics.VaccinesByPets'
        , 'VetmanagerApp.modules.graphic_reports.controller.graphics.InvoiceByDoctorsSumm'
        , 'VetmanagerApp.modules.graphic_reports.controller.graphics.VaccineReportFull'
        , 'VetmanagerApp.modules.graphic_reports.controller.graphics.GoodsGrid'
        , 'VetmanagerApp.modules.graphic_reports.controller.graphics.SickRegisteredPetsJournal'
        , 'Ext4.ux.ExcelExport'
        , 'Ext4.ux.VetmanagerMsg'
    ]
    , refs: [
        {
            ref: 'mainPanel'
            , selector: 'graphicmainpanel'
            , autoCreate: true
            , xtype: 'graphicmainpanel'
        }, {
            ref: 'graphicTitle'
            , selector: 'graphicreportpanel panel[name="title"]'
        }, {
            ref: 'graphicPrintBtn'
            , selector: 'graphicmainpanel button[name="print-button"]'
        }, {
            ref: 'graphicContainer'
            , selector: 'graphicreportpanel panel[name="graphic_container"]'
            , autoCreate: true
        },{
            ref: 'filterDateButtons'
            , selector: 'panel[name="filter_date_buttons"]'
            , autoCreate: true
        }, {
            ref: 'filterDateRange'
            , selector: 'panel[name="filter_date_range"]'
            , autoCreate: true
        }

    ]
    , init: function() {
        this.control({
            'graphiclistpanel' :{
                select: this.select
            },
            'graphicmainpanel button[name="print-button"]': {
                click: this.printGrahic
            }
        });
    }
    , currentGraphicController: null
    , select: function(t, row) {
        var panel = this.getMainPanel()
            , container = this.getGraphicContainer();

        panel.setTitle('<b>'+row.get('title')+'</b>');
        container.removeAll(false);

        if (row.get('controller') != '') {
            var cnt = this.getController(row.get('controller'));
            if (cnt != null) {
                if (!cnt.initialized) {
                    cnt.init();
                    cnt.initialized = true;
                }
                this.currentGraphicController = cnt;
                container.add(cnt.getGraphic());
                this.getGraphicPrintBtn().show();
                container.doLayout();
            }
        }
    },
    printGrahic: function() {
        var me = this,
            container = me.getGraphicContainer(),
            elId = container.id,
            title = this.getMainPanel().title,
            label = this.currentGraphicController.getPrintLabel();
            style = '';
        this.currentGraphicController.hideToolbar();
        if (this.currentGraphicController.getFilterDoctors) {
            this.currentGraphicController.getFilterDoctors().hide();
        }
        if (this.currentGraphicController.getFilterPetType) {
            this.currentGraphicController.getFilterPetType().hide();
        }
        container.setTitle('<center class="print_graphic_title">' + title + '</center><br><center class="print_graphic_label">'+label+'</center>');
        container.header.show();
        var headerEl = container.header.getEl();

        style += 'body {background: #ffffff;}';
        style += 'body * {    visibility: hidden;  }';
        style += '#' + elId + ', #' + elId + ' * {    visibility: visible;  }';
        style += '#' + elId + ' {    position: fixed !important;    left: 0;    top: 0;   }';
        style += ".print_graphic_title {font-size: 18px; color: #000;background: #ffffff;border: none;}";
        style += ".print_graphic_label {font-size: 12px; color: #000;}";
        style += "#" + headerEl.id + " {background: #ffffff;border: none;}";
        style += " @page {size: landscape;} ";
        style = '@media print {' + style + '}';
        Ext.util.CSS.removeStyleSheet('print-graphic');
        Ext.util.CSS.createStyleSheet(style, 'print-graphic');
        window.print();
        Ext.util.CSS.removeStyleSheet('print-graphic');
        container.header.hide();
        this.currentGraphicController.showToolbar();
        if (this.currentGraphicController.getFilterDoctors) {
            this.currentGraphicController.getFilterDoctors().show();
        }
        if (this.currentGraphicController.getFilterPetType) {
            this.currentGraphicController.getFilterPetType().show();
        }
    }
});