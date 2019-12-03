<?php 

	$obj = json_decode(file_get_contents('php://input'), true);

	include("../db_conect.php");

	$connect  = new Con();
	$con = $connect->getCon();

	$galeria = $obj['galeria'];

	$id_galeria = $galeria['id_galeria'];
	$titulo = $galeria['titulo'];
	$imagem = $galeria['imagem'];

	try{

		$con->beginTransaction();

		if (!empty($id_galeria)) {
			
			$sql = "UPDATE tb_galeria SET titulo = '$titulo', imagem = '$imagem' WHERE id_galeria = $id_galeria";
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