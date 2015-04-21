<?php

class upload_file {

    function __construct($target_dir) {
        $target_file = $target_dir . basename($_FILES["file"]["name"]);
        $uploadOk = 1;
        $fileType = pathinfo($target_file, PATHINFO_EXTENSION);
        $csv_mimetypes = array(
            'text/csv',
            'text/plain',
            'application/csv',
            'text/comma-separated-values',
            'application/excel',
            'application/vnd.ms-excel',
            'application/vnd.msexcel',
            'text/anytext',
            'application/octet-stream',
            'application/txt',
        );
        self::uploadFileConditions($target_file, $uploadOk, $fileType, $csv_mimetypes);
    }

    function uploadFileConditions($target_file, $uploadOk, $fileType, $csv_mimetypes) {
        if (isset($_POST["submit"])) {
            if (in_array($_FILES['file']['type'], $csv_mimetypes)) {
                $uploadOk = 1;
                if (file_exists($target_file)) {
                    echo "Sorry, file already exists.";
                    $uploadOk = 0;
                }
            } else if ($fileType != "csv") {
                $uploadOk = 0;
                die("Sorry, mime type not allowed");
            }
        }
        if ($uploadOk == 0) {
            echo "Sorry, your file was not uploaded.";
        } else {
            if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
                print_r($_FILES["file"]["tmp_name"]);
                echo "The file " . basename($_FILES["file"]["name"]) . " has been uploaded.";
            } else {
                echo "Sorry, there was an error uploading your file.";
            }
        }
    }

}

//new upload_file("/Applications/XAMPP/xamppfiles/htdocs/healthApp/uploads/");
new upload_file("uploads/");