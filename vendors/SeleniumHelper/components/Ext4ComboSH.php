<?php
Class Ext4ComboSH extends CoreComponent {
    const WAIT_VALUE_TIME = 10000;
    const WAIT_NEXT_STEP = 30;
    public function open($label) {
        $xpathOpenImg =  "xpath=(//img[contains(concat(' ',@class, ' '),' x-form-arrow-trigger ')]/ancestor::div[contains(concat(' ',@class, ' '),' x-form-item ')]/descendant::label[contains(concat(' ',@class, ' '),' x-form-item-label ') and contains(text(), '%s')])[last()]/ancestor::div[contains(concat(' ',@class, ' '),' x-form-item ')]//img[contains(concat(' ',@class, ' '),' x-form-arrow-trigger ')]";
        $this->getComponent('Waiter')->click(sprintf($xpathOpenImg, $label));
    }
    public function openByPosition($position){
        $xpathOpenImage = "xpath=(//img[contains(concat(' ',@class, ' '),' x-form-arrow-trigger ')])[%s]";
        $this->getComponent('Waiter')->click(sprintf($xpathOpenImage, $position));
    }
    public function openByName($name){
        $xpathOpenByName = "//input[contains(@name, '%s')]/ancestor::tr[1]//div[contains(concat(' ',@class, ' '),' x4-form-arrow-trigger ')]";
        $name = str_replace('name=', '', $name);
        $this->getComponent('Waiter')->click(sprintf($xpathOpenByName, $name));
    }
    public function check($value, $isLike = false) {
        if ($isLike) {
            $valueElement = "*[contains(text(), '{$value}')]";
        } else {
            $valueElement = "*[starts-with(text(), '{$value}')]";
        }
        $locatorClick = "xpath=(//div[contains(@class, 'x4-boundlist-list-ct')]/descendant::{$valueElement})[last()]";
        $this->getComponent('Selenium')->waitForElementPresent('xpath=//'.$valueElement, self::WAIT_VALUE_TIME);
        $this->getComponent('Waiter')->click($locatorClick);
        $this->getComponent('Selenium')->waitForElementNotPresent($this->getLocatorComboList($value), self::WAIT_VALUE_TIME);
    }
    public function setValue($selector, $value, $isLike = false) {
        $this->getComponent('Selenium')->setSpeed(self::WAIT_NEXT_STEP);
        if (strpos($selector, 'position()=') !== false) {
            $this->openByPosition($selector);
        } if (strpos($selector, 'name=') !== false) {
            $this->openByName($selector);
        } else {
            $this->open($selector);
        }

        $this->check($value, $isLike);
        $this->getComponent('Selenium')->setSpeed(DEFAULT_SELENIUM_SPEED);
    }
    protected function getLocatorComboList($value = ''){
        if (empty($value)){
            return "xpath=//div[contains(@class, 'x-combo-list') and contains(@style, 'visibility: visible')]";
        }else{
            return "xpath=(//div[contains(@class, 'x-combo-list') and contains(@style, 'visibility: visible')]/descendant::*[text()='{$value}'])";
        }
    }
    public function clickComboButton($label, $btnName = 'add'){
        $xpathOpenImg =  "xpath=(//img[contains(concat(' ',@class, ' '),' x-form-arrow-trigger ')]/ancestor::div[contains(concat(' ',@class, ' '),' x-form-item ')]/descendant::label[contains(concat(' ',@class, ' '),' x-form-item-label ') and contains(text(), '{$label}')])[last()]/ancestor::div[@class='x-column-inner']/table//button[contains(@class,'{$btnName}')]";
        $this->getComponent('Waiter')->click(sprintf($xpathOpenImg, $label));
    }
    public function getValue($label){
        $xpath = "xpath=(//img[contains(concat(' ',@class, ' '),' x-form-arrow-trigger ')]/ancestor::div[contains(concat(' ',@class, ' '),' x-form-item ')]/descendant::label[contains(concat(' ',@class, ' '),' x-form-item-label ') and contains(text(), '{$label}')])[last()]/ancestor::div/div[@class='x-form-element']/descendant::input[@type='hidden']";
        return $this->getComponent('Selenium')->getValue("{$xpath}");
    }
    public function getText($label){
        $xpath = "xpath=(//img[contains(concat(' ',@class, ' '),' x-form-arrow-trigger ')]/ancestor::div[contains(concat(' ',@class, ' '),' x-form-item ')]/descendant::label[contains(concat(' ',@class, ' '),' x-form-item-label ') and contains(text(), '{$label}')])[last()]/ancestor::div/div[@class='x-form-element']/descendant::input[contains(@class,'x-form-field')]";
        return $this->getComponent('Selenium')->getValue("{$xpath}");
    }
}
?>
