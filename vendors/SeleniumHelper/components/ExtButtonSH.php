<?php
Class ExtButtonSH extends CoreComponent {
    protected $_xpathTagButton = "xpath=(//button[contains(text(), '%s')])[last()]";
    protected $_xpathTextButton = "xpath=(//*[text()='%s'])[last()]";
    protected $_xpathTextNumberButton = "xpath=(//*[text()='%s'])[%s]";
    protected $_xpathNumberButton = "xpath=(//*[button])[%s]";
    protected $_xpathStyleButton = "xpath=(//div[contains(@class, '%s')])[last()]";
    protected $_xpathStyleNumberButton = "xpath=(//div[contains(@class, '%s')])[%s]";
    protected $_xpathById = "//*[@id='%s']";
    public function clickOnButtonByNumber($number) {
        $this->getComponent('Waiter')->click(sprintf($this->_xpathNumberButton, $number));
    }
    public function clickById($idButton) {
        $this->getComponent('Waiter')->click(sprintf($this->_xpathById, $idButton));
    }
    public function clickByStyle($class) {
        $this->getComponent('Waiter')->clickAt(sprintf($this->_xpathStyleButton, $class));
    }
    public function clickByStyleAndNumber($class, $number) {
        $this->getComponent('Waiter')->clickAt(sprintf($this->_xpathStyleNumberButton, $class, $number));
    }
    public function click($textButton) {
        $this->getComponent('Waiter')->click(sprintf($this->_xpathTextButton, $textButton));
    }
    public function clickByTextAndNumber($textButton, $number) {
        $this->getComponent('Waiter')->click(sprintf($this->_xpathTextNumberButton, $textButton, $number));
    }
    public function clickAt($textButton) {
        $this->getComponent('Waiter')->clickAt(sprintf($this->_xpathTextButton, $textButton));
    }
    public function clickOnToolBar($titlePanel, $textButton) {
        $xpathPattern = "xpath=(//span[text()='%s']/ancestor-or-self::div[2])[last()]/descendant::*[text()='%s']";
        $this->getComponent('Waiter')->click(sprintf($xpathPattern, $titlePanel, $textButton));
    }
    public function clickOnToolbarByStyle($titlePanel, $style){
        $xpathPattern = "xpath=(//span[text()='%s']/ancestor-or-self::div[2])[last()]/descendant::*[contains(@style, '%s')]";
        $this->getComponent('Waiter')->click(sprintf($xpathPattern, $titlePanel, $style));
    }
    public function clickOnToolbarByQTipX4($titlePanel, $text){
        $xpathPattern = "xpath=(//span[text()='%s']/ancestor-or-self::div/descendant::div[contains(@class, 'toolbar')][1])/descendant::*[contains(@data-qtip, '%s')]/span[1]";
        $this->getComponent('Waiter')->click(sprintf($xpathPattern, $titlePanel, $text));
    }
    public function clickInWindow($titleWindow, $textButton, $position = 'last()') {
        $xpathPattern = "xpath=(//span[text()='%s']/ancestor-or-self::div[5])[last()]/descendant::*[text()='%s'][%s]";
        $this->getComponent('Waiter')->click(sprintf($xpathPattern, $titleWindow, $textButton, $position));
    }
    public function clickAtInWindow($titleWindow, $textButton, $position = 'last()') {
        $xpathPattern = "xpath=(//span[text()='%s']/ancestor-or-self::div[5])[last()]/descendant::*[text()='%s'][%s]";
        $this->getComponent('Waiter')->clickAt(sprintf($xpathPattern, $titleWindow, $textButton, $position));
    }
    public function clickInGridPanel($titleGrid, $textButton){
        $this->clickInWindow($titleGrid, $textButton);
    }
    public function clickInTab($titleTab, $textButton) {
        $xpathPattern = "xpath=(//span[text()='%s']/ancestor-or-self::div[3])[last()]/descendant::*[text()='%s']";
        $this->getComponent('Waiter')->click(sprintf($xpathPattern, $titleTab, $textButton));
    }
    public function clickTagButton($textButton) {
        $this->getComponent('Waiter')->click(sprintf($this->_xpathTagButton, $textButton));
    }
    public function clickAtTagButton($textButton) {
        $this->getComponent('Waiter')->clickAt(sprintf($this->_xpathTagButton, $textButton));
    }
    public function clickBackButton() {
        $xpathButton = "xpath=//img[contains(@style, 'ui/resources/images_new/back.svg')]";
        $this->getComponent('Waiter')->click($xpathButton);
    }
    public function clickEditButton() {
        $xpathButton = "xpath=//img[contains(@style, 'ui/resources/images_new/edit.svg')]";
        $this->getComponent('Waiter')->click($xpathButton);
    }
    public function clickViewButton() {
        $xpathButton = "xpath=//img[contains(.,'Просмотр')]";
        $this->getComponent('Waiter')->clickAt($xpathButton);
    }
}
?>
