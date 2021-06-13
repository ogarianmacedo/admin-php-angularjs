<?php
$obj = json_decode(file_get_contents('php://input'), true);

include("../db_conect.php");
$connect = new Con();
$con = $connect->getCon();

$contato = $obj['contato'];

$nome = $contato['nome'];
$email = $contato['email'];
$telefone = $contato['telefone'];
$mensagem = $contato['mensagem'];

try {
    $con->beginTransaction();

    $sql = $con->exec("INSERT INTO tb_contato (nome, email, telefone, mensagem) 
                       VALUES ('$nome', '$email', '$telefone', '$mensagem')");

    if ($sql) {
        echo "cadastrado_com_sucesso";
    } else {
        echo "nao_cadastrou";
    }

    $con->commit();
} catch (Exception $e) {
    $con->rollback();
}
