<?php 

// Include the dbConnexion.php file to set CORS headers and establish the database connection
include 'dbConnexion.php';

// Set the content type to JSON for the response
header('Content-Type: application/json');

try {

    $stmt = $pdo->query("SELECT * FROM Actualites");
    $articles = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($articles);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
}
?>
 