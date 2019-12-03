<?php 

	$obj = json_decode(file_get_contents('php://input'), true);

	include("../db_conect.php");
	$connect = new Con();
	$con = $connect->getCon();

	$usuario = $obj['usuario'];

	$email = $usuario['email'];
	$senha = $usuario['senha'];

	try{
		$con->beginTransaction();

		$sql = $con->exec("INSERT INTO tb_usuario (email, senha) VALUES ('$email', '$senha')");

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