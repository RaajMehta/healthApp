<?php

require '../database.php';
require './getCSVContent.php';

class insertContent extends database {

    function __construct() {
//        $importer = new CsvImporter("/Applications/XAMPP/xamppfiles/htdocs/healthApp/uploads/userData.csv", true);
        $importer = new CsvImporter("../uploads/userData.csv", true);
        while ($data = $importer->get()) {
            self::insert($data);
        }
    }

    function insert($data) {
        parent::__construct();
        try {
            for ($i = 0; $i < count($data); $i++) {
                $content = $data[$i]['Hours,Minutes,Seconds,Day,Month,Year,Latitude,Longitude,Attempt'];
                $final_content = explode(',', $content);
                try {
                    $this->success->begintransaction();
                    $stmt = $this->success->prepare('insert into CSVContents (hours, minutes, seconds, day, month, year, latitude, longitude, attempt) values ("' . $final_content[0] . '", "' . $final_content[1] . '", "' . $final_content[2] . '", "' . $final_content[3] . '", "' . $final_content[4] . '", "' . $final_content[5] . '", "' . $final_content[6] . '", "' . $final_content[7] . '", "' . $final_content[8] . '")');
                    $stmt->execute();
                    $this->success->commit();
                } catch (PDOException $e) {
                    $this->success->rollback();
                    echo $e->getMessage();
                }
            }
        } catch (Exception $exc) {
            echo $exc->getMessage();
        }
    }

}

new insertContent();
header('Location: ./grabCSVContent.php');