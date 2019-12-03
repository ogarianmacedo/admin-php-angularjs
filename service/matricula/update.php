<?php 

	$obj = json_decode(file_get_contents('php://input'), true);

	include("../db_conect.php");

	$connect = new Con();
	$con = $connect->getCon();

	$matricula = $obj['matricula'];

	$id_matricula = $matricula['id_matricula'];
	$nome = $matricula['nome'];
	$rg = $matricula['rg'];
	$camisa = $matricula['camisa'];
	$equipe = $matricula['equipe'];
	$percurso = $matricula['percurso'];
	$email = $matricula['email'];
	$telefone = $matricula['telefone'];
	$idade = $matricula['idade'];

	try{

		$con->beginTransaction();

		if (!empty($id_matricula)) {
			
			$sql = "UPDATE tb_matricula SET nome = '$nome', email = '$email', telefone = '$telefone', idade = '$idade', rg = '$rg', camisa = '$camisa', equipe = '$equipe', percurso = '$percurso' WHERE id_matricula = $id_matricula";
			$stmt = $con->prepare($sql);
			$stmt->execute();

			echo "alterado_com_sucesso";

		}else{
			echo "nao_alterou";
		}

		$con->commit();

	}catch(Exceptio $e){
		$con->rollback();
	}

?>