<?php
$obj = json_decode(file_get_contents('php://input'), true);

include("../db_conect.php");

$connect = new Con();
$con = $connect->getCon();

$matricula = $obj['matricula'];

$id_matricula = $matricula['id_matricula'];
$nome = $matricula['nome'];
$email = $matricula['email'];
$telefone = $matricula['telefone'];
$nascimento = $matricula['nascimento'];

try {
    $con->beginTransaction();

    if (!empty($id_matricula)) {
        $sql = "UPDATE tb_matricula 
                SET nome = '$nome',
                    email = '$email',
                    telefone = '$telefone',
                    nascimento = '$nascimento'
                WHERE id_matricula = $id_matricula";

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
