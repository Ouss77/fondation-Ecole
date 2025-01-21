<?php
header('Content-Type: application/json');
include 'db_config.php';

try {
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $stmt = $pdo->query("SELECT * FROM Authors");
    $authors = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($authors);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
