<?php 

	$obj = json_decode(file_get_contents('php://input'), true);

	include("../db_conect.php");
	$connect = new Con();
	$con  =  $connect->getCon();

	$matricula = $obj['matricula'];

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

		$sql = $con->exec("INSERT INTO tb_matricula (nome, email, telefone, idade, rg, camisa, equipe, percurso) VALUES ('$nome', '$email', '$telefone', '$idade', '$rg', '$camisa', '$equipe', '$percurso')");

		if($sql){
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