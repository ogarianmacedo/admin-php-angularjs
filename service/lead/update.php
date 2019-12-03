<?php  


	include("../db_conect.php");
	$connect = new Con();
	$con = $connect->getCon();

	$usuario = json_decode($_POST['usuario'], true);

	$id_usuario = $usuario["id_usuario"];
	$nome = $usuario["nome"];
	$sobrenome = $usuario["sobrenome"];
	$email = $usuario["email"];
	$tel_celular = $usuario["tel_celular"];
	$cidade = $usuario["cidade"];
	$estado = $usuario["estado"];
	$cpf = $usuario["cpf"];
	$avatar = $usuario["avatar"];

	$updateAvatar = "";

	if($avatar != "default.png"){
		$updateAvatar = ", avatar = '$avatar' ";
	}

	try{

		$con->beginTransaction();

		$sql_usuario = $con->exec("UPDATE tb_usuario SET
			nome = '$nome',
			sobrenome = '$sobrenome',
			email = '$email',
			tel_celular = '$tel_celular',
			cidade = '$cidade',
			estado = '$estado',
			cpf = '$cpf'

			$updateAvatar

			WHERE id_usuario = $id_usuario

			");

		if($sql_usuario){
			echo "deu_bom";
		}	else{
			echo "deu_ruim";
		}

		if($avatar != "default.png"){
			if(move_uploaded_file($_FILES["file"]["tmp_name"], "../../assets/img/faces/".$avatar)){
				//echo "tudo certo";
			}else{
				//echo "deu ruim";
			}
		}

		$con->commit();

	}catch(Exception $e){
		$con->rollback();
	}

?>