<?php

	$obj = json_decode(file_get_contents('php://input'), true);

	include("../db_conect.php");

	$connect = new Con();
	$con = $connect->getCon();

	try{

		$con->beginTransaction();

		$sql = $con->prepare("SELECT tb_galeria. * FROM tb_galeria WHERE tb_galeria.excluido = 0");
		$sql->execute();

		$result_glria = $sql->fetchAll();

		echo json_encode($result_glria);

		$con->commit();

	}catch(Exception $e){
		$con->rollback();
	}

?>