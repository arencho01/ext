Ext4.define('VetmanagerApp.modules.administration.view.settings.Discount', {
    extend: 'Ext4.tab.Panel'
    , xtype: 'discountsettings'
    , border: false
    , region: 'center'
    , title: false
    , scope: this
    , initComponent: function() {
        this.callParent();
        this.add({
            xtype: 'discount-rules-settings'
        });
        this.add({
            xtype: 'discount-card-types-settings'
        });
        this.add({
            xtype: 'discount-promotion-settings'
        });
        this.add({
            xtype: 'discount-coupon-settings'
        });
        this.add({
            xtype: 'discount-fixed-settings'
        });
        this.setActiveTab(0);
    }
});