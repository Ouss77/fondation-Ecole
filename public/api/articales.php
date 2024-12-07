<?php
// Set content type to JSON
header('Content-Type: application/json');

$servername = "afmassnadmin.mysql.db:3306";
$username = "afmassnadmin";
$password = "AF3m2022";
$dbname = "afmassnadmin";

try {
    // Log message to indicate the file is called
    error_log("articles.php has been called.");

    // Connect to the database
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // SQL query to fetch articles with authors
    $sql = "
        SELECT 
            a.article_id,
            a.titre,
            a.annee,
            a.theme,
            a.resume,
            GROUP_CONCAT(au.author_name SEPARATOR ', ') AS authors
        FROM 
            Articales a
        LEFT JOIN 
            Article_Authors aa ON a.article_id = aa.article_id
        LEFT JOIN 
            Authero au ON aa.author_id = au.author_id
        GROUP BY 
            a.article_id, a.titre, a.annee, a.theme, a.resume;
    ";

    // Query the database
    $stmt = $pdo->query($sql);
    $articles = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the data as JSON
    echo json_encode($articles);
} catch (PDOException $e) {
    // Handle errors
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
}
?>
