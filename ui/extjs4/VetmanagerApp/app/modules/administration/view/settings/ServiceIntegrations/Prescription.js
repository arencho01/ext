Ext4.define('VetmanagerApp.modules.administration.view.settings.ServiceIntegrations.Prescription', {
    extend: 'Ext4.FormPanel',
    xtype: 'settings-prescription-panel',
    region: 'center',
    buttonAlign: 'center',
    scope: this,
    border: false,
    title: false,
    enableEmail: false,
    items: [
        {
            border: false,
            xtype: 'form',
            items: [
                {
                    xtype: 'checkbox',
                    labelWidth: 150,
                    fieldLabel: LS.Enable,
                    boxLabel: LS.DescriptionSendingFoodRecomendation,
                    value: 0,
                    id: 'enable_send_prescription',
                    name: 'enable_send_prescription'
                }
            ]
        }
    ],
    buttons: [
        {
            action: 'back',
            text: LS.Back
        },
        {
            cls: 'button-save',
            action: 'save_prescriptions'
        }
    ]
});
