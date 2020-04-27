<?php
Class ExtLovComboSH extends ExtComboSH {
    public function check($value, $isLike = false) {
        if ($isLike) {
            $valueElement = "*[contains(text(), '{$value}')]";
        } else {
            $valueElement = "*[starts-with(text(), '{$value}')]";
        }
        $locatorClick = "xpath=(//div[contains(@class, 'x-combo-list')]/descendant::{$valueElement})[last()]";
        $this->getComponent('Selenium')->waitForElementPresent('xpath=//'.$valueElement, self::WAIT_VALUE_TIME);
        $this->getComponent('Waiter')->click($locatorClick);
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
        if (strpos($selector, 'position()=') !== false) {
            $this->openByPosition($selector);
        } if (strpos($selector, 'name=') !== false) {
            $this->openByName($selector);
        } else {
            $this->open($selector);
        }
        $this->getComponent('Selenium')->setSpeed(DEFAULT_SELENIUM_SPEED);
    }
}
?>
