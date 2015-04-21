<?php

require './database.php';

class authentication extends database {

    function __construct() {
        parent::__construct();
        $username = filter_input(INPUT_POST, 'username');
        $password = filter_input(INPUT_POST, 'password');
        try {
            $this->db->begintransaction();
            $acc_type = array("Administrator", "Guest");
            $query = 'select * from login where username="' . $username . '" AND password="' . $password . '"';
            $this->result = $this->db->query($query);
            $this->db->commit();
            foreach ($this->result as $value) {
                echo $value['username'];
                echo $value['password'];
                if ($username == $value['username'] && $password == $value['password']) {
                    if($value['acc_type'] == $acc_type[0]){
                        echo 'Welcome '.$value['acc_type'];
                    }else if($value['acc_type'] == $acc_type[1]){
                        echo 'Welcome '.$value['acc_type'];
                    }
                }
            }
        } catch (PDOException $e) {
            $this->db->rollback();
            echo $e->getMessage();
        }
    }

}

new authentication();
