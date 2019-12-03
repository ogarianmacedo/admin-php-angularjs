<?php 

	$obj = json_decode(file_get_contents('php://input'), true);

	include("../db_conect.php");


	$connect = new Con();
	$con = $connect->getCon();


	try{

		$con->beginTransaction();

		$sql = $con->prepare("SELECT tb_calendario. * FROM tb_calendario WHERE tb_calendario.excluido = 0");
		$sql->execute();

		$result_calendar = $sql->fetchAll();

		echo json_encode($result_calendar);

		$con->commit();

	}catch(Exception $e){
		$con->rollback();
	}

?>