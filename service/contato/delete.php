<?php
$obj = json_decode(file_get_contents('php://input'), true);

include("../db_conect.php");
$connect = new Con();
$con = $connect->getCon();

$id_contato = $obj['id_contato'];

try {
    $con->beginTransaction();

    $str = "UPDATE tb_contato SET excluido  = 1 WHERE id_contato = $id_contato";
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
