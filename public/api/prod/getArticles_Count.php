<?php
// Set content type to JSON
header('Content-Type: application/json');

$servername = "afmassnadmin.mysql.db:3306";
$username = "afmassnadmin";
$password = "AF3m2022";
$dbname = "afmassnadmin";

try {
    // Log message to indicate the file is called
    error_log("getArticleCount.php has been called.");

    // Connect to the database
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // SQL query to count the number of articles
    $sql = "SELECT COUNT(*) as article_count FROM Articales";

    // Query the database
    $stmt = $pdo->query($sql);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    // Return the data as JSON
    echo json_encode(['article_count' => $result['article_count']]);
} catch (PDOException $e) {
    // Handle errors
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
}
?>
