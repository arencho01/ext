Ext4.define('VetmanagerApp.modules.administration.view.settings.ChangePassword', {
    extend: 'Ext4.tab.Panel',
    xtype: 'changepassword',
    border: false,
    scope: this,
    items: [
        {
            xtype: 'form',
            border: false,
            region: 'center',
            title: LS.__translate(LS.ChangePassword),
            buttonAlign: 'center',
            url: 'ajax_administration.php',
            defaults: {
                labelAlign: 'left',
                labelWidth: 230,
                width: 1000
            },
            items: [
                {
                    xtype: 'hidden',
                    name: 'cmd',
                    value: 'save_new_password'
                }, {
                    xtype: 'textfield',
                    name: 'old_pass',
                    fieldLabel: LS.__translate(LS.OldPassword),
                    allowBlank: true,
                    inputType:'password',
                    regex: RegexFields.pwd
                }
            ]
        }
    ],
    tbar: [
        {
            cls: 'button-save',
            action: 'save',
            name: 'save_button',
            tooltip: LS.__translate(LS.Save),
            margins: {top:3, right:0, bottom:2, left:5}
        }
    ],
    initComponent: function() {
        this.callParent();

        var tab = this.getActiveTab();

        tab.add(this.getPasswordField('new_pass', LS.__translate(LS.NewPassword)));
        tab.add(this.getPasswordField('re_new_pass', LS.__translate(LS.PasswordRepetition)));
        tab.add(this.getChangePassCheckbox());

        var pass1 = tab.child('[name="new_pass"]'),
            pass2 = tab.child('[name="re_new_pass"]');

        pass1.secondField = pass2;
        pass2.firstField = pass1;
    },
    getChangePassCheckbox: function() {
        return {
            xtype: 'checkbox',
            name: 'month_change_pass',
            fieldLabel: LS.__translate(LS.ChangeThePasswordEveryMonth),
            width: 500
        };
    },
    getPasswordField: function(name, label) {
        return {
            xtype: 'textfield',
            name: name,
            fieldLabel: label,
            allowBlank: true,
            inputType:'password',
            regex: RegexFields.pwd,
            vtype: 'passwordMatcher',
            validationDelay: 500,
            listeners: {
                scope: this,
                validitychange: function(th, isDirty, eOpts) {
                    if (isDirty) {
                        this.query('button[name="save_button"]')[0].enable();
                    } else {
                        this.query('button[name="save_button"]')[0].disable();
                    }
                }
            }
        };
    }
});