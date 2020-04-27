<?php

Class CheckboxSH extends CoreComponent {
    public function setValue($name, $value){
        if ($this->isNeedCheck($name, $value)) {          
            $this->getComponent('Waiter')->click($name);
        }
    }
    protected function isNeedCheck($name, $value) {
        return (
            ($value == 'check' && !$this->getComponent('Selenium')->isChecked($name))
            || ($value == 'uncheck' && $this->getComponent('Selenium')->isChecked($name))
        );
    }
}
?>
