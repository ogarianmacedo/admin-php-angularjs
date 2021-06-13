<?php
$obj = json_decode(file_get_contents('php://input'), true);

include("../db_conect.php");
$connect = new Con();
$con = $connect->getCon();

$video = $obj['video'];

$titulo = $video['titulo'];
$url = $video['url'];

try {
    $con->beginTransaction();

    $sql = $con->exec("INSERT INTO tb_video (titulo, url) VALUES ('$titulo', '$url')");

    if ($sql) {
        echo "cadastrado_com_sucesso";
    } else {
        echo "nao_cadastrou";
    }

    $con->commit();
} catch (Exception $e) {
    $con->rollback();
}

