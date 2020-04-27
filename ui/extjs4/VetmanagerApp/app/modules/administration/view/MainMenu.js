Ext4.define('VetmanagerApp.modules.administration.view.MainMenu', {
    extend: 'Ext4.Panel'
    , xtype: 'adminmainmenu'
    , border: false
    , region: 'west'
//    , collapsible: true
    , width: 190
    , requires: [

    ]
    , layout: {
        type: 'accordion'
        , titleCollapse: false
        , hideCollapseTool: true
        , animate: true
        , multi: true
        , activeOnTop: true
    }
    , items: [
        {
            title: LS.__translate(LS.GeneralSettings)
            , border: false
            , overflowY: 'auto'
            , items: [{
                xtype: 'mainmenulistview'
                , name: 'main_settings'
                , store: {
                    xtype: 'store'
                    , fields: ['show_title', 'controller', 'title']
                    , data: [
                        {show_title: true, controller: 'VetmanagerApp.modules.administration.controller.settings.MenuSettings', title: LS.__translate(LS.MainMenu)}
                        , {show_title: false, controller: 'VetmanagerApp.modules.administration.controller.settings.AccessSettings', title: LS.__translate(LS.AccessSettings)}
                        , {show_title: true, controller: 'VetmanagerApp.modules.administration.controller.settings.AdvancedAccessSettings', title: LS.__translate(LS.AdditionalAccessSettings)}
                        , {show_title: true, controller: 'VetmanagerApp.modules.administration.controller.settings.Localization', title: LS.__translate(LS.Localization)}
                        , {show_title: true, controller: 'VetmanagerApp.modules.administration.controller.settings.ChangePassword', title: LS.__translate(LS.ChangePassword)}
                        , {show_title: true, controller: 'VetmanagerApp.modules.administration.controller.settings.ClinicSettings', title: LS.__translate(LS.ClinicSettings)}
                        , {show_title: true, controller: 'VetmanagerApp.modules.administration.controller.settings.ServiceIntegration', title: LS.__translate(LS.IntegrationWithServices)}
                        , {show_title: true, controller: 'VetmanagerApp.modules.administration.controller.settings.Catalogs', title: LS.__translate(LS.Guides)}
                        , {show_title: true, controller: 'VetmanagerApp.modules.administration.controller.settings.Discount', title: LS.__translate(LS.Discounts)}
                        // , {show_title: true, controller: 'VetmanagerApp.modules.administration.controller.settings.MobileSettings', title: LS.__translate(LS.MobileApplication)}
                        , {show_title: true, controller: 'VetmanagerApp.modules.administration.controller.settings.Numbering', title: LS.__translate(LS.DocNumbering)}
                    ]
                }
            }]
        }, {
            title: LS.__translate(LS.ModuleSettings)
            , border: false
            , overflowY: 'auto'
            , items: [{
                xtype: 'mainmenulistview'
                , name: 'module_settings'
                , store: {
                    xtype: 'store'
                    , fields: ['show_title', 'controller', 'title', 'alternate']
                    , data: [
                        {show_title: true, controller: 'VetmanagerApp.modules.administration.controller.settings.Salary', title: LS.__translate(LS.Salary), alternate: [LS.__translate(LS.Salary) + '(NEW)']}
                        , {show_title: true, controller: 'VetmanagerApp.modules.administration.controller.settings.CassaSettings', title: LS.__translate(LS.CashDesks)}
                        , {show_title: true, controller: 'VetmanagerApp.modules.administration.controller.settings.Calendar', title: LS.__translate(LS.Calendar)}
                        , {show_title: true, controller: 'VetmanagerApp.modules.administration.controller.settings.ClientManagement', title: LS.__translate(LS.ManagementOfClients)}
                        , {show_title: true, controller: 'VetmanagerApp.modules.administration.controller.settings.Invoice', title: LS.__translate(LS.Invoices)}
                        , {show_title: true, controller: 'VetmanagerApp.modules.administration.controller.settings.Medcards', title: LS.__translate(LS.MedicalCards)}
                        , {show_title: true, controller: 'VetmanagerApp.modules.administration.controller.settings.Store', title: LS.__translate(LS.Warehouse)}
                        , {show_title: true, controller: 'VetmanagerApp.modules.administration.controller.settings.Hospital', title: LS.__translate(LS.InpatientFacility)}
                    ]
                }
            }]
        }
    ]
});
