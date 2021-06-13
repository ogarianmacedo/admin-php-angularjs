<?php
$obj = json_decode(file_get_contents('php://input'), true);

include("../db_conect.php");

$connect = new Con();
$con = $connect->getCon();

$usuario = $obj['usuario'];

$id_usuario = $usuario['id_usuario'];
$nome = $usuario['nome'];
$email = $usuario['email'];
$senha = $usuario['senha'];

try {
    $con->beginTransaction();

    if (!empty($id_usuario)) {
        $sql = "UPDATE tb_usuario 
                SET nome = '$nome',
                    email = '$email',
                    senha = '$senha'
                WHERE id_usuario = $id_usuario";

        $stmt = $con->prepare($sql);
        $stmt->execute();

        echo "alterado_com_sucesso";
    } else {
        echo "nao_alterou";
    }

    $con->commit();
} catch (Exception $e) {
    $con->rollback();
}
