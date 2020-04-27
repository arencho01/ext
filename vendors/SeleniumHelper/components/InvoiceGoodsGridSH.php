<?php
require_once dirname(__FILE__).'/ExtSimplyGridSH.php';
class InvoiceGoodsGridSH extends ExtSimplyGridSH{
    public function getRowXPath($title, $value){
        $xpathRow = "xpath=(//b[text()='%s']/ancestor-or-self::div[4])[last()]/descendant::div[contains(@class, 'x-grid3-cell-inner') and starts-with(text(), '%s')]";
        return sprintf($xpathRow, $title, $value);
    }
    public function clickRow($titleGrid, $value) {
        $this->getComponent('TextField')->setValue("xpath=(//input[contains(@id,'-fieldGoodSearch')])[last()]", $value);
        $this->getComponent('Keyboard')->keyPress("xpath=(//*[contains(@name, 'fieldGoodSearch')])[last()]", 'Spacebar');
        $this->getComponent('Keyboard')->keyPress("xpath=(//*[contains(@name, 'fieldGoodSearch')])[last()]", 'Backspace');
        parent::clickRow($titleGrid, $value);
    }
}

?>
