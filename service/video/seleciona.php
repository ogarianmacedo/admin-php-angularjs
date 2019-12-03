<?php 

	$obj = json_decode(file_get_contents('php://input'), true);

	include("../db_conect.php");

	$connect = new Con();
	$con = $connect->getCon();

	try{

		$con->beginTransaction();

		$sql = $con->prepare("SELECT tb_video. * FROM tb_video WHERE tb_video.excluido= 0");
		$sql->execute();

		$result_video = $sql->fetchAll();

		echo json_encode($result_video);

		$con->commit();

	}catch(Exception $e){
		$con->rollback();
	}

?>