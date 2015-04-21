<?php

session_start();

class generateCSV {

    protected $_limit;
    protected $_frequency;
    protected $_path;
    protected $_latitude;
    protected $_longitude;
    protected $_timing;

    function __construct($limit, $frequency, $timing, $path, $lat, $long) {
        $this->_limit = $limit;
        $this->_frequency = $frequency;
        $this->_path = $path;
        $this->_lat = $lat;
        $this->_long = $long;
        $this->_timing = $timing;
        self::calculateTime();
    }

    public function calculateTime() {
        $splite_time = explode(':', $this->_timing);
        $from_hour = $splite_time[0];
        $final_time = explode("-", $splite_time[1]);
        $from_minutes = $final_time[0];
        $to_hour = $final_time[1];
        $perfect_final_time = explode("PM", $final_time[0]);
        $to_minutes = $perfect_final_time[0];
        self::generateArray($from_hour, $from_minutes, $to_hour, $to_minutes);
    }

    public function generateArray($from_hour, $from_minutes, $to_hour, $to_minutes) {
        $fileArray = array(trim($this->_limit), trim($this->_frequency), trim($from_hour), trim($from_minutes), trim($to_hour), trim($to_minutes), trim("43.866218"), trim("-79.999694"));
        self::fileOperation($fileArray);
    }

    public function fileOperation($fileArray) {
        $fp = fopen($this->_path, "w");
        fputcsv($fp, $fileArray);
        fclose($fp);
//        $command = escapeshellcmd("python /Applications/XAMPP/xamppfiles/htdocs/healthApp/uploads/port_writer_old.py");
//        $output = shell_exec($command);
//        exec("python /Applications/XAMPP/xamppfiles/htdocs/healthApp/uploads/port_writer_old.py");
    }
   
}

$limit = filter_input(INPUT_POST, 'limitValue');
$frequency = filter_input(INPUT_POST, "frequencyValue");
$timing = filter_input(INPUT_POST, 'timing');
$lat = filter_input(INPUT_POST, 'lat');
$long = filter_input(INPUT_POST, 'long');

//$path = "/Applications/XAMPP/xamppfiles/htdocs/healthApp/uploads/command.csv";
$path = "../uploads/command.csv";
new generateCSV($limit, $frequency, $timing, $path, $lat, $long);
