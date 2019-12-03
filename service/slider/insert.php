<?php  

	$obj = json_decode(file_get_contents('php://input'), true);

	include("../db_conect.php");
	$connect = new Con();
	$con = $connect->getCon();

	$slider = $obj['slider'];

	$imagem = $slider['imagem'];
	$ordem = $slider['ordem'];

	try{

		$con->beginTransaction();

		$sql = $con->exec("INSERT INTO tb_slider (imagem, ordem) VALUES ('$imagem', '$ordem')");

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