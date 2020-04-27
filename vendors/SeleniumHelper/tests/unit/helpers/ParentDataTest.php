<?php
Class ParentDataTest extends ParentSeleniumHelperTest {
    function setUp(){
        $this->testObject = new ParentData();
        $this->testObject->_data = $this->getTestData();
    }    
    function getTestData(){
        return array(
            'someName' => array(
                'form' => array(
                    array('name' => 'some_field', 'type' => 'some_type', 'value' => 'some_value')
                 )    
            )
        );
    }
    function testGetValue_WithoutDataIndex(){
        $value = $this->testObject->getValue('someName');
        $data = $this->getTestData();
        $this->assertEquals($value, $data['someName']);
    }
    function testGetValue_WithDataIndex(){
        $value = $this->testObject->getValue('someName', 'form');
        $data = $this->getTestData();
        $this->assertEquals($value, $data['someName']['form']);
    }
    function testGetFormValue_WithValidField(){
        $value = $this->testObject->getFormValue('someName', 'some_field');
        $this->assertEquals($value, 'some_value');
    }
    function testGetFormValue_WithNotValidField(){
        $value = $this->testObject->getFormValue('someName', 'some_wrong_field');
        $this->assertFalse($value);
    }
}
?>
