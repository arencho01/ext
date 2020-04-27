<?php
Class DBSHTest extends ParentSeleniumHelperTest {
    function setUp(){
        $model = new ComponentModel('selenium');
        $model->setPath('../components');
        $model->setPathToHelper('');        
        $this->testObject = $model->getComponent('DB');
        $model->getComponent('DBDriver');
    }
    function getSeleniumMock(){
        return $this->getMock('PHPUnit_Extensions_SeleniumTestCase');
    }
    function getBDDriverMock(){
        return $this->getMockBuilder('DBDriverSH')
                     ->disableOriginalConstructor()
                     ->getMock();
    }
    function testAssertTableContains_CheckFaildComment(){
        $testTable = 'test';
        $testFilterArray = array();
        $dbDriverMock = $this->getBDDriverMock();
        $dbDriverMock->expects($this->once())
                ->method('getAllAssoc')
                ->with("SELECT * FROM $testTable")
                ->will($this->returnValue("someData"));
        $dbDriverMock->expects($this->once())
                ->method('getOne')
                ->will($this->returnValue(true));
        $seleniumMock = $this->getSeleniumMock();
        $this->testObject->selenium = $seleniumMock;
        $this->testObject->dbdriver = $dbDriverMock;
        $this->testObject->assertTableContains($testTable, $testFilterArray);
    }
    function testSeeInDatabase_withoutFilter(){
        $testTable = 'test';
        $testFilterArray = array();
        $dbDriverMock = $this->getBDDriverMock();
        $dbDriverMock->expects($this->once())
                ->method('getOne')
                ->with("SELECT COUNT(*) FROM $testTable")
                ->will($this->returnValue(1));
        $this->testObject->dbdriver = $dbDriverMock;        
        $result = $this->testObject->seeInDatabase($testTable, $testFilterArray);
        $this->assertTrue($result);
    }
    function testSeeInDatabase_withFilter(){
        $testTable = 'test';
        $testFilterArray = array('test_field' => 'test_value');
        $dbDriverMock = $this->getBDDriverMock();
        $dbDriverMock->expects($this->once())
                ->method('getOne')
                ->with("SELECT COUNT(*) FROM $testTable WHERE 1=1 AND `test_field` = 'test_value'")
                ->will($this->returnValue(1));
        $this->testObject->dbdriver = $dbDriverMock;        
        $result = $this->testObject->seeInDatabase($testTable, $testFilterArray);
        $this->assertTrue($result);
    }
    function testGetFilterByArray_withoutFilter(){
        $testArray = array();
        $filter = $this->testObject->getFilterByArray($testArray);
        $this->assertEquals('', $filter);
    }    
    function testGetFilterByArray_withNull(){
        $testArray = array(
            'test_field' => null
        );
        $filter = $this->testObject->getFilterByArray($testArray);
        $this->assertTrue(strpos($filter, "`test_field` IS NULL") !== false);
    }
    function testGetFilterByArray_withSomeData(){
        $testArray = array(
            'test_field' => 1
        );
        $filter = $this->testObject->getFilterByArray($testArray);
        $this->assertTrue(strpos($filter, "`test_field` = '1'") !== false);
    }    
    function testDeleteFromDatabase(){
        $testTable = 'test';
        $testFilterArray = array();
        $dbDriverMock = $this->getBDDriverMock();
        $dbDriverMock->expects($this->once())
                ->method('query')
                ->with("DELETE FROM $testTable");
        $this->testObject->dbdriver = $dbDriverMock;        
        $this->testObject->deleteFromDatabase($testTable, $testFilterArray);
    }  
    function testGetLastId(){
        $testTable = 'test';
        $dbDriverMock = $this->getBDDriverMock();
        $dbDriverMock->expects($this->once())
                ->method('getOne')
                ->with("SELECT id FROM {$testTable} ORDER BY id DESC LIMIT 1");
        $this->testObject->dbdriver = $dbDriverMock;        
        $this->testObject->getLastId($testTable);
    }      
    function testGetRow(){
        $testTable = 'test';
        $testId = 1;
        $dbDriverMock = $this->getBDDriverMock();
        $dbDriverMock->expects($this->once())
                ->method('getARow')
                ->with("SELECT * FROM {$testTable} WHERE id = {$testId}");
        $this->testObject->dbdriver = $dbDriverMock;        
        $this->testObject->getRow($testTable, $testId);
    } 
    
}
?>
