<?php 

	$obj = json_decode(file_get_contents('php://input'), true);

	include("../db_conect.php");
	$connect = new Con();
	$con = $connect->getCon();

	$calendario = $obj['calendario'];

	$curso = $calendario['curso'];
	$ano = $calendario['ano'];
	$imagem = $calendario['imagem'];

	try{

		$con->beginTransaction();

		$sql = $con->exec("INSERT INTO tb_calendario (curso, ano, imagem) VALUES ('$curso', '$ano', '$imagem')");

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