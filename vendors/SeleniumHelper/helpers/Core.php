<?php

Class Core {
    protected $_path = '';
    protected $_pathToHelper = 'lib';
    public function createObject($objectName, $prefixClass = '', $paramsConstructor = null) {
        $variableName = strtolower($objectName);
        if (empty ($this->$variableName)) {
            try {
                $className = ucfirst($objectName).$prefixClass;
                require_once $this->getPathFile($objectName, $className);
                $this->$variableName = new $className($paramsConstructor);  
            } catch(Error $e) {
                echo 'Caught exception: ',  $e->getMessage(), "\n";
            }
        }
        return $this->$variableName;        
    }
    public function  getPathFile($objectName, $className){
        return trim($this->getPathClasses($objectName)) == '' ? $this->getFileName($className)   : $this->getFullPath($objectName, $className);      
    }
    public function getFullPath($objectName, $className){
        return getcwd()."/{$this->_pathToHelper}/".$this->getPathClasses($objectName).'/'.$this->getFileName($className);
    }
    public function getPathClasses($objectName) {
        return $this->_path;
    }
    public function getFileName($className){
        return $className.'.php';
    }
    public function setPath($path){
        $this->_path = $path;
    }
    public function setPathToHelper($pathToHelper){
        $this->_pathToHelper = $pathToHelper;
    }
}

?>
