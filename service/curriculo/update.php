<?php 

	$obj = json_decode(file_get_contents('php://input'), true);

	include("../db_conect.php");

	$connect = new Con();
	$con = $connect->getCon();

	$curriculo  = $obj['curriculo'];

	$id_curriculo = $curriculo['id_curriculo'];
	$nome = $curriculo['nome'];
	$email = $curriculo['email'];
	$telefone = $curriculo['telefone'];

	try{

		$con->beginTransaction();

		if (!empty($id_curriculo)) {
			
			$sql = "UPDATE tb_curriculo SET nome = '$nome', email = '$email', telefone = '$telefone' WHERE id_curriculo = $id_curriculo ";
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