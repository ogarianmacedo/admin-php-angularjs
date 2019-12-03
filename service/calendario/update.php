<?php 

	$obj = json_decode(file_get_contents('php://input'), true);

	include("../db_conect.php");

	$connect = new Con();
	$con = $connect->getCon();

	$calendario = $obj['calendario'];

	$id_calendario = $calendario['id_calendario'];
	$curso = $calendario['curso'];
	$ano = $calendario['ano'];
	$imagem = $calendario['imagem'];

	try{

		$con->beginTransaction();

		if (!empty($id_calendario)) {
			
			$sql = "UPDATE tb_calendario SET curso = '$curso', ano = '$ano', imagem = '$imagem' WHERE id_calendario = $id_calendario";
			$stmt = $con->prepare($sql);
			$stmt->execute();

			echo "alterado_com_sucesso";
		}else{
			echo "nao_alterou";
		}

		$con->commit();

	}catch(Exception $e){
		$con->rollback();
	}

?>