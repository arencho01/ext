<?php
require_once dirname(__FILE__).'/ExtSimplyGridSH.php';
class GoodsGridSH extends ExtSimplyGridSH{
    public function getRowXPath($title, $value){
        $xpathRow = "xpath=//span[text()='%s']/ancestor-or-self::div[2][last()]/descendant::div[contains(@class, 'x-grid3-cell-inner') and starts-with(text(),'%s')]";
        return sprintf($xpathRow, $title, $value);
    }
    public function clickRow($titleGrid, $value) {
        $this->getComponent('TextField')->setValue("xpath=//label[text()='Поиск:']/ancestor-or-self::div[1][last()]/descendant::input", $value);
        sleep(.5);
        $this->getComponent('Keyboard')->keyPress("xpath=//label[text()='Поиск:']/ancestor-or-self::div[1][last()]/descendant::input", 'Spacebar');
        sleep(.5);
        $this->getComponent('Keyboard')->keyPress("xpath=//label[text()='Поиск:']/ancestor-or-self::div[1][last()]/descendant::input", 'Backspace');
        sleep(1);
        $this->getComponent('Keyboard')->keyPress("xpath=//label[text()='Поиск:']/ancestor-or-self::div[1][last()]/descendant::input", 'Enter');
        parent::clickRow($titleGrid, $value);
    }
}

?>
