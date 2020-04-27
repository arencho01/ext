<?php
Class TextFieldSH extends CoreComponent {
    public function setValue($name, $value){
        $this->getComponent('Waiter')->type($name, $value);
    }
}