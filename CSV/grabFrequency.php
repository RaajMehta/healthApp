<?php

require_once '../database.php';

class grabFrequency extends database{
    
    public function __construct() {
        try {
            parent::__construct();
            $this->success->begintransaction();
            $query = "SELECT count(`hours`) AS frequency FROM `CSVContents`";
            $this->_result = $this->success->query($query);
            $this->_dataArray = $this->_result->fetchAll(PDO::FETCH_ASSOC);
            $this->success->commit();
            print_r(json_encode($this->_dataArray[0]['frequency']));
        } catch (PDOException $e) {
            $this->success->rollback();
            echo $e->getMessage();
        }
    }
}

new grabFrequency();