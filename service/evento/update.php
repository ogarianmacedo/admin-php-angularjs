<?php 

	$obj = json_decode(file_get_contents('php://input'), true);

	include("../db_conect.php");

	$connect = new Con();
	$con = $connect->getCon();

	$evento = $obj['evento'];

	$id_evento = $evento['id_evento'];
	$titulo = $evento['titulo'];
	$descricao = $evento['descricao'];
	$imagem = $evento['imagem'];

	try{

		$con->beginTransaction();

		if (!empty($id_evento)) {
			
			$sql = "UPDATE tb_evento SET titulo = '$titulo', descricao = '$descricao', imagem = '$imagem' WHERE id_evento = $id_evento ";
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