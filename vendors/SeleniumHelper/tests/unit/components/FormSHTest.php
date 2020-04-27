<?php
Class FormSHTest extends ParentSeleniumHelperTest {
    function setUp(){
        $model = new ComponentModel('selenium');
        $model->setPath('../components');
        $model->setPathToHelper('');        
        $this->testObject = $model->getComponent('Form');
        $this->initComponents($model);
    }
    function initComponents($model){
        $model->getComponent('TextField');
        $model->getComponent('Checkbox');
        $model->getComponent('ExtCombo');
        $model->getComponent('ExtSimplyGrid');
    }
    function getFieldArray($fieldType) {
        return array(
            array('type'=> $fieldType, 'name'=> 'some_name', 'value'=>'some_value')
        );
    }
    function getComponentMock($className){
        $mock = $this->getMockBuilder($className)
                     ->disableOriginalConstructor()
                     ->getMock();
        return $mock;
    }
    function configureComponentMock($mock, $methodName, $firstParam, $secondParam){
        $mock->expects($this->once())
                 ->method($methodName)
                 ->with($this->equalTo($firstParam), $this->equalTo($secondParam)); 
    }
    function testFillTextFieldType_WorkWithTextFieldComponent(){
        $textFieldMock = $this->getComponentMock('TextFieldSH');
        $this->configureComponentMock($textFieldMock, 'setValue', 'some_name', 'some_value');
        $testParam = $this->getFieldArray('textfield');
        $this->testObject->textfield = $textFieldMock;
        $this->testObject->fill($testParam);
    }
    function testFillNumberFieldType_WorkWithTextFieldComponent(){
        $textFieldMock = $this->getComponentMock('TextFieldSH');
        $this->configureComponentMock($textFieldMock, 'setValue', 'some_name', 'some_value');
        $testParam = $this->getFieldArray('numberfield');
        $this->testObject->textfield = $textFieldMock;
        $this->testObject->fill($testParam);
    }
    function testFillCheckBoxFieldType_WorkWithTextFieldComponent(){
        $checkBoxMock = $this->getComponentMock('CheckboxSH');
        $this->configureComponentMock($checkBoxMock, 'setValue', 'some_name', 'some_value');        
        $testParam = $this->getFieldArray('checkbox');
        $this->testObject->checkbox = $checkBoxMock;
        $this->testObject->fill($testParam);
    }    
    function testFillExtCheckBoxFieldType_WorkWithTextFieldComponent(){
        $checkBoxMock = $this->getComponentMock('CheckboxSH');
        $this->configureComponentMock($checkBoxMock, 'setValue', 'some_name', 'some_value');        
        $testParam = $this->getFieldArray('checkbox');
        $this->testObject->checkbox = $checkBoxMock;
        $this->testObject->fill($testParam);
    }
    function testFillExtComboBoxFieldType_WorkWithTextFieldComponent(){
        $comboMock = $this->getComponentMock('ExtComboSH');
        $this->configureComponentMock($comboMock, 'setValue', 'some_name', 'some_value');        
        $testParam = $this->getFieldArray('extcombo');
        $this->testObject->extcombo = $comboMock;
        $this->testObject->fill($testParam);
    }
    
    function testFillExtSimplyGridFieldType_WorkWithTextFieldComponent(){
        $simplyGridMock = $this->getComponentMock('ExtSimplyGridSH');
        $this->configureComponentMock($simplyGridMock, 'clickRow', 'some_name', 'some_value');        
        $testParam = $this->getFieldArray('extsimplygrid');
        $this->testObject->extsimplygrid = $simplyGridMock;
        $this->testObject->fill($testParam);
    }    
}
?>
