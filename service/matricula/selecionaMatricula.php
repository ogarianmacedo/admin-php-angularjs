<?php
$obj = json_decode(file_get_contents('php://input'), true);

include("../db_conect.php");

$connect = new Con();
$con = $connect->getCon();

try {
    $con->beginTransaction();

    $sql = $con->prepare("SELECT * FROM tb_matricula WHERE tb_matricula.excluido = 0");
    $sql->execute();

    $result_mat = $sql->fetchAll();

    echo json_encode($result_mat);

    $con->commit();
} catch (Exception $e) {
    $con->rollback();
}
