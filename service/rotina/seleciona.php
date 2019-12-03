<?php 

	$obj = json_decode(file_get_contents('php://input'), true);

	include("../db_conect.php");

	$connect = new Con();
	$con = $connect->getCon();

	try{

		$con->beginTransaction();

		$sql = $con->prepare("SELECT tb_rotina. * FROM tb_rotina WHERE tb_rotina.excluido = 0");
		$sql->execute();

		$result_rtn = $sql->fetchAll();

		echo json_encode($result_rtn);

		$con->commit();
		
	}catch(Exception $e){
		$con->rollback();
	}

?>