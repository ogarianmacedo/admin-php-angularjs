<?php
$obj = json_decode(file_get_contents('php://input'), true);

include("../db_conect.php");
$connect = new Con();
$con = $connect->getCon();

$matricula = $obj['matricula'];

$nome = $matricula['nome'];
$email = $matricula['email'];
$telefone = $matricula['telefone'];
$nascimento = $matricula['nascimento'];

try {
    $con->beginTransaction();

    $sql = $con->exec("INSERT INTO tb_matricula (
                                    nome,
                                    email,
                                    telefone,
                                    nascimento
                                ) VALUES (
                                    '$nome',
                                    '$email',
                                    '$telefone',
                                    '$nascimento'
                                )"
    );

    if ($sql) {
        echo "cadastrado_com_sucesso";
    } else {
        echo "nao_cadastrou";
    }

    $con->commit();
} catch (Exception $e) {
    $con->rollback();
}
