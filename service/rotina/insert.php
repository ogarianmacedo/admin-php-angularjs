<?php 

	$obj = json_decode(file_get_contents('php://input'), true);

	include("../db_conect.php");

	$connect = new Con();
	$con  = $connect->getCon();

	$rotina = $obj['rotina'];

	$imagem =  $rotina['imagem'];

	try{

		$con->beginTransaction();

		$sql = $con->exec("INSERT INTO tb_rotina (imagem) VALUES ('$imagem')");

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