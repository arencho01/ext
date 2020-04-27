<?php
Class PageSH extends CoreComponent {
    protected $_waitLimit = 20;
    public function setWaitLimit($limit){
        $this->_waitLimit = $limit;
    }
    public function getWaitLimit($limit){
       return  (is_null($limit)) ? $this->_waitLimit : $limit;
    }
    public function clickText($text){
        $xpath = "xpath=(//*[text()='%s'])[last()]";
        $this->getComponent('Waiter')->click(sprintf($xpath, $text));
    }
}
?>
