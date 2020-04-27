<?php
class WindowSH extends CoreComponent {
    public function close($title, $btn = '') {
        $this->getComponent('Selenium')->waitForElementPresent("xpath=//span[@class='x-window-header-text'][text()='{$title}']", 10000);
        if (empty($btn)){
            $this->getComponent('Waiter')->clickAt("xpath=//span[@class='x-window-header-text'][text()='{$title}']/parent::div/div[contains(@class, 'x-tool-close')]");
        }else{
            $this->getComponent('Waiter')->click("xpath=//span[@class='x-window-header-text'][text()='{$title}']/ancestor::div[contains(@class, 'x-window-dlg')]//div[contains(@class, 'x-window-bl')]//button[text()='{$btn}']");
        }
    }
    public function tryClose($title, $btn = '', $timeout = 2000) {
        $count = $timeout / 250;
        while($count > 0) {
            $count--;
            sleep(.25);
            if ($this->getComponent('Selenium')->isElementPresent("xpath=//span[@class='x-window-header-text'][text()='{$title}']")) {
                $count = 0;
                $this->close($title, $btn);
            }
        }
    }
}

?>
