<?php
Class ExtComboJSSH extends CoreComponent {

    public function setValue($id, $value, $isLike = false) {
        $explode = explode('=', $id);
        if (strpos($id, 'id') === false && count ($explode) == 2) {
            throw new Exception('must contains id');
        }
        $jsId = $explode[1];
        $this->getComponent('Selenium')->executeScript('window.Ext.getCmp('.$jsId.').setRawValue(' . $value.  ');');        
        $this->getComponent('Selenium')->executeScript('window.Ext.getCmp('.$jsId.').setValue(' . $value.  ');');
        sleep(1);

    }

}