<?php
Class KeyboardSH extends CoreComponent {
    protected $_keyCode = array (
        'A' => 65
        , 'B' => 66
        , 'C' => 67
        , 'D' => 68
        , 'E' => 69
        , 'F' => 70
        , 'G' => 71
        , 'H' => 72
        , 'I' => 73
        , 'J' => 74
        , 'K' => 75
        , 'L' => 76
        , 'M' => 77
        , 'N' => 78
        , 'O' => 79
        , 'P' => 80
        , 'Q' => 81
        , 'R' => 82
        , 'S' => 83
        , 'T' => 84
        , 'U' => 85
        , 'V' => 86
        , 'W' => 87
        , 'X' => 88
        , 'Y' => 89
        , 'Z' => 90
        , '0' => 48
        , '1' => 49
        , '2' => 50
        , '3' => 51
        , '4' => 52
        , '5' => 53
        , '6' => 54
        , '7' => 55
        , '8' => 56
        , '9' => 57
        , 'a' => 65
        , 'b' => 66
        , 'c' => 67
        , 'd' => 68
        , 'e' => 69
        , 'f' => 70
        , 'g' => 71
        , 'h' => 72
        , 'i' => 73
        , 'j' => 74
        , 'k' => 75
        , 'l' => 76
        , 'm' => 77
        , 'n' => 78
        , 'o' => 79
        , 'p' => 80
        , 'q' => 81
        , 'r' => 82
        , 's' => 83
        , 't' => 84
        , 'u' => 85
        , 'v' => 86
        , 'w' => 87
        , 'x' => 88
        , 'y' => 89
        , 'z' => 90
        , 'F1' => 112
        , 'F2' => 113
        , 'F3' => 114
        , 'F4' => 115
        , 'F5' => 116
        , 'F6' => 117
        , 'F7' => 118
        , 'F8' => 119
        , 'F9' => 120
        , 'F11' => 122
        , 'F12' => 123
        , 'F13' => 124
        , 'F14' => 125
        , 'F15' => 126
        , 'Backspace' => 8
        , 'Tab' => 9
        , 'Enter' => 13
        , 'Shift' => 16
        , 'Control' => 17
        , 'Caps Lock' => 20
        , 'Esc' => 27
        , 'Spacebar' => 32
        , 'Page Up' => 33
        , 'Page Down' => 34
        , 'End' => 35
        , 'Home' => 36
        , 'Left Arrow' => 37
        , 'Up Arrow' => 38
        , 'Right Arrow' => 39
        , 'Down Arrow' => 40
        , 'Insert' => 45
        , 'Delete' => 46
        , 'Num Lock' => 144
        , 'ScrLk' => 145
        , 'Pause/Break' => 19
        , '; :' => 186
        , '- _' => 189
        , '/ ?' => 191
        , '` ~' => 192
        , '[ {' => 219
        , '\ |' => 220
        , '] }' => 221
        , '" \'' => 222
        , '0' => 188
        , '.' => 190
        , '/' => 191
    );
    protected function getKeyCode($key) {
        if (!empty($this->_keyCode[$key])) {
            return $this->_keyCode[$key];
        } else {
            throw new Exception('Key $key does not exists');
        }
    }
    public function keyPress($locator, $key) {
        $this->allKeyEvent($locator, $key);
    }
    public function allKeyEvent($locator, $key){
        $this->getComponent('Selenium')->setSpeed(DEFAULT_SELENIUM_SPEED);
        $keyCode = '\\'.$this->getKeyCode($key);
        $this->getComponent('Selenium')->waitForElementPresent($locator);
        $this->getComponent('Selenium')->keyDown($locator, $keyCode);
        $this->getComponent('Selenium')->keyPress($locator, $keyCode);
        $this->getComponent('Selenium')->keyUp($locator, $keyCode);
    }
    public function controlCombination($locator, $key){
        $this->getComponent('Selenium')->controlKeyDown(); 
        $this->allKeyEvent($locator, $key);
        $this->getComponent('Selenium')->controlKeyUp(); 		        
    }
    public function altCombination($locator, $key){
        $this->getComponent('Selenium')->altKeyDown(); 
        $this->allKeyEvent($locator, $key);
        $this->getComponent('Selenium')->altKeyUp(); 		        
    }
    public function shiftCombination($locator, $key) {
        $this->getComponent('Selenium')->shiftKeyDown(); 
        $this->allKeyEvent($locator, $key);
        $this->getComponent('Selenium')->shiftKeyUp(); 		        
    }
}
?>
