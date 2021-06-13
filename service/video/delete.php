<?php
$obj = json_decode(file_get_contents('php://input'), true);

include("../db_conect.php");

$connect = new Con();
$con = $connect->getCon();

$id_video = $obj['id_video'];

try {
    $con->beginTransaction();

    $str = "UPDATE tb_video SET excluido = 1 WHERE id_video = $id_video";
    $sql = $con->exec($str);

    if ($sql) {
        echo "excluido_com_sucesso";
    } else {
        echo "nao_excluiu";
    }

    $con->commit();
} catch (Exception $e) {
    $con->rollback();
}
