<?php
// Allow Cross-Origin Requests (CORS)
// Allow cross-origin requests from your frontend
header("Access-Control-Allow-Origin: *"); // Allow requests from your frontend's URL
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow the necessary HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With"); // Allow necessary headers

// If this is a preflight request, respond with a 200 status code
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Continue with your PHP code below...


// Set the content type to JSON
header('Content-Type: application/json');

// Database connection information
$servername = "localhost";
$username = "root";  // MySQL username
$password = "1963";  // MySQL password
$dbname = "afmassnadmin"; // Database name

try {
    // Create a PDO connection
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Execute a query to fetch the articles
    $stmt = $pdo->query("SELECT * FROM actualites");
    $articles = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Send the response as JSON
    echo json_encode($articles);

} catch (PDOException $e) {
    // Handle errors
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
}
?>
