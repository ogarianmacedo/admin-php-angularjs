<?php

	$obj = json_decode(file_get_contents('php://input'), true);

	include("../db_conect.php");

	$connect = new Con();
	$con = $connect->getCon();

	try{

		$con->beginTransaction();

		$sql = $con->prepare("SELECT tb_noticia. * FROM tb_noticia WHERE tb_noticia.excluido = 0");
		$sql->execute();

		$result_notic = $sql->fetchAll();

		echo json_encode($result_notic);

		$con->commit();

	}catch(Exception $e){
		$con->rollback();
	}

?>