<?php 

	$obj = json_decode(file_get_contents('php://input'), true);

	include("../db_conect.php");

	$connect = new Con();
	$con = $connect->getCon();

	$contato = $obj['contato'];

	$id_contato = $contato['id_contato'];
	$nome = $contato['nome'];
	$email = $contato['email'];
	$telefone = $contato['telefone'];

	try{

		$con->beginTransaction();

		if (!empty($id_contato)) {

			$sql = "UPDATE tb_contato SET nome = '$nome', email = '$email', telefone = '$telefone' WHERE id_contato = $id_contato";
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