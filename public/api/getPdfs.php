<?php
header('Content-Type: application/json');

$servername = "afmassnadmin.mysql.db:3306";
$username = "afmassnadmin";
$password = "AF3m2022";
$dbname = "afmassnadmin";

// Create a PDO instance
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Query to fetch annee and plaquettePDF
    $stmt = $pdo->prepare("SELECT annee, plaquettePDF FROM plaquetteFiles");
    $stmt->execute();

    // Fetch results as an associative array
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the data in JSON format
    echo json_encode($data);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
