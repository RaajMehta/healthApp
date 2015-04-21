<?php

class send_file {

    protected $_targetUrl;
    protected $_fileNameFullPath;

    function __construct($targetUrl, $fileNameFullPath) {
        $this->_targetUrl = $targetUrl;
        $this->_fileNameFullPath = $fileNameFullPath;
        self::autoUploadFile();
    }

    public function autoUploadFile() {

        $post = array('file' => '@' . $this->_fileNameFullPath);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->_targetUrl);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($ch);
        curl_close($ch);
    }

}

//$command = escapeshellcmd('python /Applications/XAMPP/xamppfiles/htdocs/healthApp/uploads/port_reader.py');
//$output = shell_exec($command);

//$targetUrl = 'localhost/healthApp/upload_file.php';
$targetUrl = 'upload_file.php';
//$fileNameFullPath = realpath('/Applications/XAMPP/xamppfiles/htdocs/healthApp/userData.csv');
$fileNameFullPath = realpath('userData.csv');

new send_file($targetUrl, $fileNameFullPath);
