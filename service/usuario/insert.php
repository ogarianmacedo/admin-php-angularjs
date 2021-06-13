<?php
$obj = json_decode(file_get_contents('php://input'), true);

include("../db_conect.php");
$connect = new Con();
$con = $connect->getCon();

$id_instituicao = $obj['id_instituicao'];

$usuario = $obj['usuario'];

$nome = $usuario['nome'];
$email = $usuario['email'];
$senha = $usuario['senha'];
$imagem = $usuario['imagem'];

try {
    $con->beginTransaction();
    $sql = $con->exec("INSERT INTO tb_usuario (nome, email, senha, imagem) 
                       VALUES ('$nome', '$email', '$senha', '$imagem')");

    if ($sql) {
        echo "cadastrado_com_sucesso";
    } else {
        echo "nao_cadastrou";
    }

    $con->commit();
} catch (Exception $e) {
    $con->rollback();
}
