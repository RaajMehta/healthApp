<?php

class database {

    protected $_host;
    protected $_dbname;
    protected $_username;
    protected $_password;
    public $success;

    public function __construct($host = 'mysql15.000webhost.com', $dbname = 'a1399547_alight', $username = 'a1399547_alight', $password = 'Alight123') {
//    public function __construct($host = 'localhost', $dbname = 'Alight', $username = 'root', $password = '') {
        $this->_host = $host;
        $this->_dbname = $dbname;
        $this->_username = $username;
        $this->_password = $password;
        self::connection();
        self::getDb();
    }

    public function connection() {
        try {
            $db = new PDO('mysql:host=' . $this->_host . ';dbname=' . $this->_dbname, $this->_username, $this->_password, array(PDO::ATTR_PERSISTENT => TRUE));
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->success = $db;
        } catch (PDOException $e) {
            echo 'Failed' . $e->getMessage();
        }
    }

    public function getDb() {
        return $this->success;
    }

}
