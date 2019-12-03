<?php

	$obj = json_decode(file_get_contents('php://input'), true);

	include("../db_conect.php");

	$connect = new Con();
	$con = $connect->getCon();

	try{

		$con->beginTransaction();

		$sql = $con->prepare("SELECT tb_evento. * FROM tb_evento WHERE tb_evento.excluido = 0");
		$sql->execute();

		$result_event = $sql->fetchAll();

		echo json_encode($result_event);

		$con->commit();


	}catch(Exception $e){
		$con->rollback();
	}

?>