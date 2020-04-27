Ext4.define('VetmanagerApp.modules.administration.view.settings.TarifAddUser', {
    extend: 'Ext4.view.View'
    , xtype: 'tarifadduser'
    , trackOver: true
    , border: false
    , cls: 'feed-list'
    , itemSelector: '.feed-list-item'
    , overItemCls: 'feed-list-item-hover'
    , selectedItemCls: 'x-item-selected'
    , store: {
        xtype: 'store'
        , fields: [
            'id'
            , 'name'
            , 'valid_untill'
            , 'users_allowed'
            , 'last_paid_period'
        ]
        , autoLoad: true
        , proxy: {
            type: 'ajax'
            , url: 'ajax_access.php'
            , extraParams: {
                cmd: 'check_tariff'
            }
            , reader: {
                type: 'json'
                , root: 'tariff_data'
            }
        }
    }
    , initComponent: function() {
        var self = this;
        this.tpl = new Ext4.XTemplate(
            '<tpl for=".">'
                , '<div class="change-plan">'
                    , '<div class="change-plan__line">'+LS.__translate(LS.FundsAvailableAtThisTariff)+' <span class="change-plan__value">{users_allowed}</span> '+LS.__translate(LS.users)+'</div>'
                    , '<div class="change-plan__line">'
                        , LS.__translate(LS.HowManyUsersDoYouWantToAdd)
                        , '<div id="change-plan__products"/></div>'
                    , '</div>'
                    , '<div class="change-plan__line">'+LS.__translate(LS.ToChangeATariffPleasePayFor)+'<span class="change-plan__months"> {[this.getMonthsToPay(values.valid_untill)]}</span> '+LS.__translate(LS.Months)+'</div>'
                    , '<div class="change-plan__line">'+LS.__translate(LS.AmountPayable)+'<span class="change-plan__amount" id="change-plan__amount">0</span></div>'
                    , '<div class="change-plan__clink"><a id="change-plan__link" class="change-plan__link" target="_blank">' +LS.__translate(LS.Pay)+'</a></div>'
                    , '<div style="clear: both;"></div>'
                , '</div>'
            , '</tpl>'
            , {
                getMonthsToPay: function(valid_until_date){
                    return self.getMonthsToPay(valid_until_date);
                }
            }
        );
        this.addEvents('select_product');
        this.callParent();
    }
    , getMonthsToPay: function(valid_until_date){
        var d2 = Date.parseDate(valid_until_date, "Y-m-d H:i:s");
        var d1 = new Date();

        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth() + 1;
        months += d2.getMonth()+ 1;
        return months;
    }
});
