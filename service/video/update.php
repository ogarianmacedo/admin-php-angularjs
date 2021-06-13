<?php
$obj = json_decode(file_get_contents('php://input'), true);

include("../db_conect.php");

$connect = new Con();
$con = $connect->getCon();

$video = $obj['video'];

$id_video = $video['id_video'];
$url = $video['url'];
$titulo = $video['titulo'];

try {
    $con->beginTransaction();

    if (!empty($id_video)) {
        $sql = "UPDATE tb_video
                SET url = '$url', titulo = '$titulo'
                WHERE id_video = $id_video";

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
