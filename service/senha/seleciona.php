<?php 

	$obj = json_decode(file_get_contents('php://input'), true);

	include("../db_conect.php");

	$connect = new Con();
	$con = $connect->getCon();

	try{
		$con->beginTransaction();

		$sql = $con->prepare("SELECT tb_usuario. * FROM tb_usuario WHERE tb_usuario.excluido = 0");
		$sql->execute();

		$result_cont = $sql->fetchAll();

		echo json_encode($result_cont);

		$con->commit();
	
	}catch(Exception $e){
		$con->rollback();
	}

?>