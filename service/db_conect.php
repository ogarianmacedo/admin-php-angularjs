<?php 
error_reporting(E_ALL ^ E_NOTICE);

header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Credentials: true");

Class Con {
    function getCon() {
        $con = new PDO(
            'mysql:host=localhost;dbname=admin_angularjs_db',
            "root",
            "",
            array(
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
            )
        );

        return $con;
    }
}
