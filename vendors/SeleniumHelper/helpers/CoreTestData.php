<?php
Class CoreTestData extends Core {
    protected $_prefixClass = 'Data';
    public function getData($moduleName) {
        return $this->createObject($moduleName, $this->_prefixClass);
    }
}
?>
