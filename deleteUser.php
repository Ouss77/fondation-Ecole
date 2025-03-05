<?php
include 'dbConnexion.php';
header('Content-Type: application/json');

$requestData = json_decode(file_get_contents("php://input"));
$id = trim($requestData->id);

if(empty($id)){
    echo json_encode(['success' => false, 'message' => 'ID is required']);
    exit();
}
try{
    $stm = $pdo->prepare("DELETE FROM users WHERE id = ?");
    $stm->execute([$id]);
    
}  catch (PDOException $e){
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed'. $e->getMessage()]);
}

?>