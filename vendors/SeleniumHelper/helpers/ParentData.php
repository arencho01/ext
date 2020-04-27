<?php

Class ParentData {
    public function getValue($dataName, $dataIndex = null) {
        if (!empty($dataIndex)) {
            return $this->_data[$dataName][$dataIndex];
        }
        return $this->_data[$dataName];
    }
    public function getFormValue($nameValue, $nameField){
        $formData =  $this->getValue($nameValue, 'form');
        foreach ($formData as $field) {
            if ($field['name'] == $nameField) {
                return $field['value'];
            }
        }
        return false;
    }
}
?>
