<?php  

	$obj = json_decode(file_get_contents('php://input'), true);

	include("../db_conect.php");
	$connect = new Con();
	$con = $connect->getCon();

	try{

		$con->beginTransaction();

		$sql = $con->query("SELECT * FROM tb_lead ORDER BY id_lead desc");

		$result = $sql->fetchAll();

		echo json_encode($result);

		$con->commit();

	}catch(Exception $e){
		$con->rollback();
	}

?>