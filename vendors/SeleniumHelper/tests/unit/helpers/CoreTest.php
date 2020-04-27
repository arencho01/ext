<?php
class CoreTest extends ParentSeleniumHelperTest {
    function setUp(){
        $this->testObject = new Core();
    }
    function testGetFileName(){
        $testClass = 'testClass';
        $fileName = $this->testObject->getFileName($testClass);
        $this->assertEquals($fileName, $testClass.'.php');
    }
    function testGetPathFile_pathToClassEmpty(){
        $path = $this->testObject->getPathFile('SomeClass', 'SomeClass');
        $this->assertEquals($path, 'SomeClass.php');
    }
    function testGetPathFile_pathToClassNotEmpty(){
        $this->testObject->setPath('some_path');
        $path = $this->testObject->getPathFile('SomeClass', 'SomeClass');
        $this->assertTrue(strpos($path, 'some_path/SomeClass.php') !== false);
    }
    function testCreateObject_createObjectInCurrentPathWithoutPrefix(){
        $this->testObject->setPath('../helpers');
        $this->testObject->setPathToHelper('');
        $createdObject = $this->testObject->createObject('ParentData');
        $this->assertEquals(get_class($createdObject), 'ParentData');
    }
}
?>
