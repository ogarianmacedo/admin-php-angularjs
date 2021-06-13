<?php
$obj = json_decode(file_get_contents('php://input'), true);

include("../db_conect.php");

$connect = new Con();
$con = $connect->getCon();

$slider = $obj['slider'];

$id_slider = $slider['id_slider'];
$imagem = $slider['imagem'];
$ordem = $slider['ordem'];

try {
    $con->beginTransaction();

    if (!empty($id_slider)) {

        $sql = "UPDATE tb_slider
                SET imagem = '$imagem',
                    ordem = '$ordem'
                WHERE id_slider = $id_slider";

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
