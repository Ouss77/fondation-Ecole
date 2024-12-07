<?php 

header('Content-Type: application/json');

$servername = "afmassnadmin.mysql.db:3306";
$username = "afmassnadmin";
$password = "AF3m2022";
$dbname = "afmassnadmin";

try {

    $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT * FROM Actualites");
    $articles = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($articles);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
}
?>
