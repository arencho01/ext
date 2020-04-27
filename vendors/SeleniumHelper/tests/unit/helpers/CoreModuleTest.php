<?php
Class CoreModuleTest extends ParentSeleniumHelperTest {    
    function testConstruct(){
        $params = array(
            'some_param1' => 'param1'
            , 'some_param2' => 'param2'            
        );
        $this->testObject = new CoreModule($params);
        $this->assertEquals('param1', $this->testObject->some_param1);
        $this->assertEquals('param2', $this->testObject->some_param2);
    }
    function testGetData(){
        $dataMock = $this->getMock('CoreTestData', array('getData'));
        $dataMock->expects($this->once())
                 ->method('getData');
        $params = array(
            'data' => $dataMock
        );
        $this->testObject = new CoreModule($params);
        $this->testObject->getData('Some');        
    }
    function testGetComponent(){
        $cmMock = $this->getMockBuilder('ComponentModel')
                     ->disableOriginalConstructor()
                     ->getMock();
        $cmMock->expects($this->once())
                 ->method('getComponent');
        $params = array(
            'componentModel' => $cmMock
        );
        $this->testObject = new CoreModule($params);
        $this->testObject->getComponent('Some');        
    }
}
?>
