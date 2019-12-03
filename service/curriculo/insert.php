<?php 

	$obj = json_decode(file_get_contents('php://input'), true);

	include("../db_conect.php");
	$connect = new Con();
	$con = $connect->getCon();

	$curriculo = $obj['curriculo'];

	$nome = $curriculo['nome'];
	$email = $curriculo['email'];
	$telefone = $curriculo['telefone'];
	$imagem = $curriculo['imagem'];

	try{

		$con->beginTransaction();

		$sql = $con->exec("INSERT INTO tb_curriculo (nome, email, telefone, imagem) VALUES ('$nome', '$email', '$telefone', '$imagem')");

		if ($sql) {
			echo "cadastrado_com_sucesso";
		}else{
			echo "nao_cadastrou";
		}

		$con->commit();

	}catch(Exception $e){
		$con->rollback();
		var_dump($e);
	}

?>