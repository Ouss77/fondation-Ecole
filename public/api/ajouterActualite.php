<?php
// Set content type to JSON
header('Content-Type: application/json');

$servername = "afmassnadmin.mysql.db:3306";
$username = "afmassnadmin";
$password = "AF3m2022";
$dbname = "afmassnadmin";
 
try {
    // Connect to the database
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // Get data from POST request
        $Titre = $_POST['title']; // Change to match the form data
        $Description = $_POST['description']; // Change to match the form data

        // Insert data into the database
        $stmt = $pdo->prepare("INSERT INTO Actualites (Titre, Description) VALUES (?, ?)");
        $stmt->execute([$Titre, $Description]);

        // Return a success response
        echo json_encode(['success' => true, 'message' => 'Data inserted successfully']);
    } else {
        echo json_encode(['error' => 'Invalid request method']);
    }
} catch (PDOException $e) {
    // Handle errors
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
}
?>
