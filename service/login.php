<?php
$obj = json_decode(file_get_contents('php://input'), true);

include("db_conect.php");
$connect = new Con();
$con = $connect->getCon();

$email = $obj['email'];
$senha = $obj['senha'];

try {
    $con->beginTransaction();
    $sql = $con->query("SELECT * 
                        FROM tb_usuario
                        WHERE email = '$email'
                        and senha = '$senha'"
    );

    $result = $sql->fetchAll();

    if (COUNT($result) > 0) {
        echo json_encode($result);
    } else {
        echo "erro_login";
    }

    $con->commit();
} catch (Exception $e) {
    $con->rollback();
}
