<?php
Class ExtSimplyGridSH extends CoreComponent {
    public function clickRow($titleGrid, $value) {
        $this->getComponent('Waiter')->clickAt($this->getRowXPath($titleGrid, $value));
    }
    public function clickRowWithoutTitle($value) {               
        $this->getComponent('Waiter')->clickAt($this->getRowXPathWithoutTitle($value));
    }
    public function clickRowWithoutTitleLink($value) {
        $this->getComponent('Waiter')->clickAt($this->getRowXPathwithoutTitleLink($value));
    }

    public function waitForLoadRow($titleGrid, $value){
        $this->getComponent('Selenium')->waitForElementPresent($this->getRowXPath($titleGrid, $value));
    }
    public function waitForLoadRowWithoutTitle($value){
        $this->getComponent('Selenium')->waitForElementPresent($this->getRowXPathWithoutTitle($value));
    }
    public function getRowXPath($title, $value){
        $xpathRow = "xpath=//span[text()='%s']/ancestor-or-self::div[2][last()]/descendant::div[contains(@class, 'x-grid3-cell-inner') and a[text()='%s']]";
        return sprintf($xpathRow, $title, $value);
    }

    public function getRowXPathWithoutTitle($value){
        $xpathRow = "xpath=//div[contains(@class, 'x-grid3-cell-inner') and text()='%s']";
        return sprintf($xpathRow, $value);
    }

    public function getRowXPathwithoutTitleLink($value){
            $xpathRow = "xpath=//div[contains(@class, 'x-grid3-cell-inner') and a[text()='%s']]";
            return sprintf($xpathRow, $value);
    }

    public function clickAllRow($titleGrid){
        $allRowXpath = $this->getAllRowXPath($titleGrid);
        $this->getComponent('Selenium')->waitForElementPresent('xpath='.$allRowXpath);
        $countRow = $this->getComponent('Selenium')->getXpathCount($allRowXpath);
        for ($i = 1; $i <= $countRow; $i++) {
            $this->getComponent('Waiter')->clickAt("xpath=".$allRowXpath."[{$i}]");
        }
    }
    public function getAllRowXPath($title){
        $xpathRow = "(//span[text()='%s']/ancestor-or-self::div[2][last()]/descendant::div[contains(@class, 'x-grid3-cell-inner')]";
        return sprintf($xpathRow, $title);
    }
    public  function getCellByIndexXPath($title, $value, $index) {
        $xpath = $this->getRowXPath($title, $value);
        $xpath.='/ancestor::tr/td['.$index.']';
        return $xpath;
    }
    public  function  getPanelXPath($title) {
        $xpath = "//span[text()='%s']/ancestor-or-self::div[2][last()]";
        return sprintf($xpath, $title);
    }
    public function clickCell($title, $value, $index){
        $xpath = $this->getCellByIndexXPath($title, $value, $index);
        $this->getComponent('Waiter')->clickAt($xpath);}


    public function clickAndTypeCell($title, $value, $index, $type) {
        $this->clickCell($title, $value, $index);
        $xpath = $this->getPanelXPath($title, $value, $index);
        $js = "
            var id = document.evaluate(\"{$xpath}\", document, null,
                        XPathResult.ANY_TYPE, null
            ).iterateNext().id;
            Ext.getCmp(id).items.get(0).activeEditor.setValue('{$type}');
        ";
        $this->getComponent('Selenium')->runScript($js);
        //$this->clickRow($title, $value);
        $this->getComponent('Keyboard')->keyPress($this->getCellByIndexXPath($title, $value, $index), 'Enter');
    }

    public function clickAndTypeCellCombo($title, $value, $index, $type) {
        $this->clickCellWithoutLink($title, $value, $index);
        sleep(2);
        $xpath = $this->getPanelXPath($title, $value, $index);

        $js = "
            var id = document.evaluate(\"{$xpath}\", document, null,
                        XPathResult.ANY_TYPE, null
            ).iterateNext().id;
            Ext.getCmp(id).items.get(0).activeEditor.field.expand();
            Ext.getCmp(id).items.get(0).activeEditor.field.store.load()
        ";
        $this->getComponent('Selenium')->runScript($js);
        $this->getComponent('ExtCombo')->check($type, true);
        $this->clickRow($title, $value);

    }
}
?>
