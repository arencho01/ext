<?php
Class WaiterSH extends CoreComponent {
    public function click($locator){
        $this->getComponent('Selenium')->waitForElementPresent($locator);
        $this->getComponent('Selenium')->click($locator);

    }
    public function clickAt($locator){
        $this->getComponent('Selenium')->waitForElementPresent($locator);
        $this->getComponent('Selenium')->clickAt($locator);
    }
    public function type($locator, $value) {
        $this->getComponent('Selenium')->waitForElementPresent($locator);
        $this->getComponent('Selenium')->type($locator, $value);
    }
}
?>