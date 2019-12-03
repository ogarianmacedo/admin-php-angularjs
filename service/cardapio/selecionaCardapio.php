<?php 

	$obj = json_decode(file_get_contents('php://input'), true);

	include("../db_conect.php");

	$connect = new Con();
	$con = $connect->getCon();

	try{

		$con->beginTransaction();

		$sql = $con->prepare("SELECT tb_cardapio. * FROM tb_cardapio WHERE tb_cardapio.excluido= 0");
		$sql->execute();

		$result_cardp = $sql->fetchAll();

		echo json_encode($result_cardp);

		$con->commit();

	}catch(Exception $e){
		$con->rollback();
	}
	
?>