<?php
Class VMMainMenuSH extends CoreComponent {
    public function gotoModule($moduleGroupName, $moduleName,   $successText = null){
        $this->getComponent('Selenium')->setSpeed(500);
        
        $this->getComponent('Selenium')->waitForTextPresent($moduleGroupName);
        $this->getComponent('ExtButton')->clickTagButton($moduleGroupName);
        
        $this->getComponent('Selenium')->waitForTextPresent($moduleName);
        $this->getComponent('ExtButton')->click($moduleName);
        if (!is_null($successText)) {
            $this->getComponent('Selenium')->waitForTextPresent($successText);
        }
        $this->getComponent('Selenium')->setSpeed(DEFAULT_SELENIUM_SPEED);
    }
    public function logout(){
        $this->getComponent('ExtButton')->clickTagButton('admin/');
        $this->getComponent('ExtButton')->click('Выйти');
    }
}

?>
