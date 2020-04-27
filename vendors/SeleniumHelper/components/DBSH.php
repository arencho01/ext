<?php
class DBSH extends CoreComponent {
    public function seeInDatabase($table, $filterValue){
        $q = "SELECT COUNT(*) FROM ".$table.$this->getFilterByArray($filterValue);
        //var_dump($q);
        return $this->getComponent('DBDriver')->getOne($q) > 0;
    }
    private function isFunction($field) {
        if (strrpos($field, "(") !== false) { return true; }
        if (strrpos($field, ")") !== false) { return true; }

        return false;
    }
    public function getFilterByArray($filterValue){
        $filter = (count($filterValue) == 0) ? '' : ' WHERE 1=1';
        foreach ($filterValue as $field => $value) {
            if ($this->isFunction(trim($field))) {
                $field = trim($field);
            } else {
                $field = "`".trim($field)."`";
            }

            $value = (is_null($value)) ? "IS NULL" : "= '{$value}'";
            $filter .= " AND {$field} {$value}";
        }
        return $filter;
    }
    public function deleteFromDatabase($table, $filterValue){
        $q = "DELETE FROM ".$table.$this->getFilterByArray($filterValue);
        return $this->getComponent('DBDriver')->query($q);
    }
    public function getLastId($table){
        $q = "SELECT id FROM {$table} ORDER BY id DESC LIMIT 1";
        return $this->getComponent('DBDriver')->getOne($q);
    }
    public function getLastIdByTableAndDescription($table, $description)
    {
        $q = "SELECT id FROM {$table} WHERE description = '{$description}'";
        return $this->getComponent('DBDriver')->getOne($q);
    }
    public function getRow($table, $id){
        $q = "SELECT * FROM {$table} WHERE id = {$id}";
        return $this->getComponent('DBDriver')->getARow($q);
    }
    public function getAllAssoc($table, $filter){
        $query = "SELECT * FROM {$table} {$filter}";
        return $this->getComponent('DBDriver')->getAllAssoc($query);
    }
    public function assertTableContains($tableName, $filterValue) {
        $tableRows = $this->getComponent('DBDriver')->getAllAssoc("SELECT * FROM $tableName");
        $failMessage = "\n table contains data: ".print_r($tableRows, true) . " Table $tableName doesn't contain data: " . print_r($filterValue, true);
        $this->getComponent('Selenium')->assertTrue($this->seeInDatabase($tableName, $filterValue), $failMessage);
    }
    public function assertTableNotContains($tableName, $filterValue) {
        $tableRows = $this->getComponent('DBDriver')->getAllAssoc("SELECT * FROM $tableName");
        $failMessage = "Table $tableName doesn't contain data: " . print_r($filterValue, true)."\n table contains data: ".print_r($tableRows, true);
        $this->getComponent('Selenium')->assertFalse($this->seeInDatabase($tableName, $filterValue), $failMessage);
    }
    public function isPropertyExists($name){
        $q = "SELECT count(*) FROM `properties` WHERE property_name = '{$name}'";
        return (int) $this->getComponent('DBDriver')->getOne($q) > 0;
    }
    public function isPropertySet($name, $value){
        $q = "SELECT count(*) FROM `properties` WHERE property_name = '{$name}' AND property_value = '{$value}'";
        return (int) $this->getComponent('DBDriver')->getOne($q) > 0;
    }
    public function query($q) {
        $this->getComponent('DBDriver')->query($q);
    }
    public function getOne($q) {
        return $this->getComponent('DBDriver')->getOne($q);
    }
    public function setTimeZone($q) {
        return $this->getComponent('DBDriver')->setTimeZone($q);
    }
}

?>
