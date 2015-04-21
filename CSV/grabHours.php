<?php

require_once '../database.php';

class grabHours extends database{
    
    public function __construct() {
        try {
            parent::__construct();
            $this->success->begintransaction();
            $query = "SELECT hours, minutes FROM `CSVContents`";
            $this->_result = $this->success->query($query);
            $this->_dataArray = $this->_result->fetchAll(PDO::FETCH_ASSOC);
            $this->success->commit();
            print_r(json_encode($this->_dataArray));
        } catch (PDOException $e) {
            $this->success->rollback();
            echo $e->getMessage();
        }
    }
}

new grabHours();