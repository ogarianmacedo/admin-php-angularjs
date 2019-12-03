<?php  

	include("../db_conect.php");

	$obj = json_decode(file_get_contents('php://input'), true);

	$connect = new Con();
	$con = $connect->getCon();


	$nome			 = $obj["nome"];
	$email 			 = $obj["email"];
	$telefone		 = $obj["telefone"];
	$tipo 			 = $obj["tipo"];


	if(empty($email)){
		die();
	}
	                 
	try{

		$con->beginTransaction();

		$sql = $con->exec("INSERT INTO tb_lead (nome,email,telefone,tipo) VALUES ('$nome','$email','$telefone', '$tipo')");

		if($sql){
			echo "deu_bom";		
		}	else{
			echo "deu_ruim";
		}


		$con->commit();

	}catch(Exception $e){
		$con->rollback();
	}

?>

