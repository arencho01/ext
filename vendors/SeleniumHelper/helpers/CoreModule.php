<?php

Class CoreModule extends Core {    
    public function __construct($needObjects) {
        $this->needObjects = $needObjects;
        foreach ($needObjects as $name => $object) {
            $this->$name = $object;
        }
    }
    public function getModule($module){
        return $this->createObject($module, '', $this->needObjects);
    }
    public function getData($dataName){
        return $this->data->getData($dataName);
    }
    public function getComponent($componentName) {
        return $this->componentModel->getComponent($componentName);
    }
}

?>
