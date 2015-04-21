<?php

require './database.php';

class deleteData extends database{

    public function __construct() {
        parent::__construct();
        try {
            $this->success->begintransaction();
            $stmt = $this->success->prepare('DELETE FROM CSVContents');
            $stmt->execute();
            $this->success->commit();
        } catch (PDOException $e) {
            $this->success->rollback();
            echo $e->getMessage();
        }
    }

}

new deleteData();
