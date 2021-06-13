<?php
$obj = json_decode(file_get_contents('php://input'), true);

include("../db_conect.php");

$connect = new Con();
$con = $connect->getCon();

// $id_usuario = $obj['id_usuario'];

try {
    $con->beginTransaction();

    $sql = $con->prepare("SELECT * FROM tb_usuario WHERE tb_usuario.excluido = 0");
    $sql->execute();

    $result_user = $sql->fetchAll();

    echo json_encode($result_user);

    $con->commit();
} catch (Exception $e) {
    $con->rollback();
}
