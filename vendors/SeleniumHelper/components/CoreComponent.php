<?php
Class CoreComponent extends Core {
    protected $_path = '../../vendors/SeleniumHelper/components'; 
    public function __construct($selenium) {
        $this->selenium = $selenium;
    }
    protected function getPrefix($component){
        return (strtolower($component) != 'selenium') ? 'SH' : '';
    }
    public function getComponent($component){
        return $this->createObject($component, $this->getPrefix($component), $this->selenium);
    }    
}

?>
