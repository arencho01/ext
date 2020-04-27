<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of GraphWalker
 *
 * @author drlev
 */
class GraphWalker {
    protected $_data = array();
    /**
     *
     * array('pointA' => array('pointB', 'pointC'), 'pointC' => array('pointB'))
     * or
     * array($objA => array($objB, $objC), $objC => array($objB)) all objects must have $id property
     * or
     * array($arrA => array($arrB, $arrC), $arrC => array($arrB)) all arrays must have 'id' key
     * @param array $data
     */
    public function load($data){
        $this->_data = $data;
    }
    public function addPoint($name, $points = array()){
        if (!array_key_exists($name, $this->_data) || !is_array($this->_data[$name])){
            $this->_data[$name] = array();
        }

        if (!is_array($points)){
            $points = array($points);
        }
        $this->_data[$name] += $points;
    }
    protected function _isPointsEqual($a, $b){
        if (is_array($a)) {
            return $a['key'] == $b['key'];
        } else if (is_object($a)) {
            return $a->id == $b->id;
        } else {
            return $a == $b;
        }
    }
    protected function _generatePaths($path, $goal, &$paths){
        $state = $path[count($path) - 1];

        if ($this->_isPointsEqual($state, $goal)) {
            array_push($paths, $path);
        } else {
            if (!array_key_exists($state, $this->_data) || !is_array($this->_data[$state])) {
                return;
            }
            foreach ($this->_data[$state] as $arc) {
                if (!in_array($arc, $path)) {
                    $this->_generatePaths(array_merge($path, (array)$arc), $goal, $paths);
                }
            }
        }
    }
    public function getAllPaths($start, $goal){
        $paths = array();
        $this->_generatePaths(array($start), $goal, $paths);
        return $paths;
    }
    public function getMinPath($start, $goal){
        $paths = $this->getAllPaths($start, $goal);
        $minCnt = -1;
        $minPath = array();
        foreach ($paths as $path){
            if ($minCnt < 0 || count($path) < $minCnt){
                $minCnt = count($path);
                $minPath = $path;
            }
        }
        return $minPath;
    }
    public function getMaxPath($start, $goal){
        $paths = $this->getAllPaths($start, $goal);
        $maxCnt = -1;
        $maxPath = array();
        foreach ($paths as $path){
            if ($maxCnt < 0 || count($path) > $maxCnt){
                $maxCnt = count($path);
                $maxPath = $path;
            }
        }
        return $maxPath;
    }
}

?>
