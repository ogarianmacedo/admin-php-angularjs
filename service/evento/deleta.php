<?php 

	$obj = json_decode(file_get_contents('php://input'), true);

	include("../db_conect.php");

	$connect = new Con();
	$con = $connect->getCon();

	$id_evento = $obj['id_evento'];

	try{

		$con->beginTransaction();

		$str = "UPDATE tb_evento SET excluido = 1 WHERE id_evento = $id_evento";
		$sql = $con->exec($str);

		if($sql){
			echo "excluido_com_sucesso";
		}else{
			echo "nao_excluiu";
		}

		$con->commit();

	}catch(Exception $e){
		$con->rollback();
	}

?>