<?php
class DBDriverSH extends CoreComponent {
    public function getOne($q){
        return NDatabase::getOne($q);
    }
    public function query($q){
        NDatabase::query($q);
    }
    public function getARow($q){
        return NDatabase::getARow($q);
    }
    public function getAllAssoc($q){
        return NDatabase::getAllAssoc($q);
    }
    public function setTimeZone($q) {
        return NDatabase::setTimeZone($q);
    }
}    
?>
