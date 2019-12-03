<?php 

	error_reporting(E_ALL ^ E_NOTICE);

    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Credentials: true");

    $novo_nome = $_POST["novo_nome"];

    if (move_uploaded_file($_FILES["file"]["tmp_name"], "../../upload/rotina/".$novo_nome)) {
    	echo "deu_bom";
    }else{
    	echo "deu_ruin";
    }

?>