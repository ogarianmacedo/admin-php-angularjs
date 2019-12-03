<?php 

	$obj = json_decode(file_get_contents('php://input'), true);

	include("../db_conect.php");

	$connect = new Con();
	$con = $connect->getCon();

	$noticia = $obj['noticia'];

	$id_noticia = $noticia['id_noticia'];
	$titulo = $noticia['titulo'];
	$descricao = $noticia['descricao'];
	$imagem = $noticia['imagem'];

	try{

		$con->beginTransaction();

		if (!empty($id_noticia)) {
			
			$sql = "UPDATE tb_noticia SET titulo ='$titulo', descricao = '$descricao', imagem = '$imagem' WHERE id_noticia = $id_noticia";
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