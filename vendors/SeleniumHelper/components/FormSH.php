<?php
Class FormSH extends CoreComponent {
    public function fill($data) {
        foreach ($data as $fieldInfo) {
            $type = strtolower($fieldInfo['type']);
            $componentName = $this->getComponentByFieldType($type);
            $componentMethod = $this->getMethodByFieldType($type);
            if (!array_key_exists('isLike', $fieldInfo)) {
                $fieldInfo['isLike'] = false;
            }
            $this->getComponent($componentName)->$componentMethod($fieldInfo['name'], $fieldInfo['value'], $fieldInfo['isLike']);

        }
    }
    protected function getComponentByFieldType($type){
        switch ($type){
            case 'checkbox':
                $component = 'Checkbox';
                break;
            case 'extsimplygrid':
                $component = 'ExtSimplyGrid';
                break;
            case 'invoicegoodsgrid':
                $component = 'InvoiceGoodsGrid';
                break;
            case 'extcombo' :
                $component = 'ExtCombo';
                break;
            case 'extcombojs' :
                $component = 'ExtComboJSSH';
                break;            
            case 'extlovcombo' :
                $component = 'ExtLovCombo';
                break;
            case 'ext4combo' :
                $component = 'Ext4Combo';
                break;
            default :
                $component = 'TextField';
                break;
        }
        return $component;
    }
    protected function getMethodByFieldType($type){
        switch ($type){
            case 'invoicegoodsgrid':
            case 'extsimplygrid' :
                $method = 'clickRow';
                break;
            default :
                $method = 'setValue';
                break;
        }
        return $method;

    }

}
?>
