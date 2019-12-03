<?php  

	$obj = json_decode(file_get_contents('php://input'), true);

	include("../db_conect.php");
	$connect = new Con();
	$con = $connect->getCon();


	$id_usuario = $obj['id'];

	try{

		$con->beginTransaction();

		$exec = $con->exec("UPDATE tb_usuario SET excluido = 1  WHERE id_usuario = $id_usuario ");

		if($exec){
			echo "deu_bom";
		}	else{
			echo "deu_ruim";
		}

		$con->commit();

	}catch(Exception $e){
		$con->rollback();
	}

?>