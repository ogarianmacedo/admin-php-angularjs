<?php
$obj = json_decode(file_get_contents('php://input'), true);

include("../db_conect.php");
$connect = new Con();
$con = $connect->getCon();

$id_matricula = $obj['id_matricula'];

try {
    $con->beginTransaction();

    $str = "UPDATE tb_matricula SET excluido = 1 WHERE id_matricula = $id_matricula";
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
