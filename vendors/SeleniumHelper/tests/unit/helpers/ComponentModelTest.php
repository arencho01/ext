<?php
Class ComponentModelTest extends ParentSeleniumHelperTest {
    function setUp(){
        $mock = $this->getMock('ParentData');        
        $this->testObject = new ComponentModel($mock);
    }
    function testGetComponent(){
        $this->testObject->setPath('../components');
        $this->testObject->setPathToHelper('');
        $component = $this->testObject->getComponent('Waiter');
        $this->assertEquals(get_class($component) , 'WaiterSH');
    }
}
?>
