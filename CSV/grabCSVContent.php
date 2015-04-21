<?php

require_once '../database.php';

class grabContent extends database{

    function __construct() {

        try {
            parent::__construct();
            $this->success->begintransaction();
            $query = "SELECT latitude, longitude from CSVContents";
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

new grabContent();
?>