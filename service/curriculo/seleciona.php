<?php 

	$obj = json_decode(file_get_contents('php://input'), true);

	include("../db_conect.php");

	$connect = new Con();
	$con = $connect->getCon();

	try{

		$con->beginTransaction();

		$sql = $con->prepare("SELECT tb_curriculo. * FROM tb_curriculo WHERE tb_curriculo.excluido = 0");
		$sql->execute();

		$result_cur = $sql->fetchAll();

		echo json_encode($result_cur);

		$con->commit();

	}catch(Exception $e){
		$con->rollback();
	}

?>