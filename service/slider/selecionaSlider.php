<?php
$obj = json_decode(file_get_contents('php://input'), true);

include("../db_conect.php");

$connect = new Con();
$con = $connect->getCon();

try {
    $con->beginTransaction();

    $sql = $con->prepare("SELECT tb_slider. * FROM tb_slider WHERE tb_slider.excluido = 0");
    $sql->execute();

    $result_aln = $sql->fetchAll();

    echo json_encode($result_aln);

    $con->commit();
} catch (Exception $e) {
    $con->rollback();
}
