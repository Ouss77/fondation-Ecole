<?php
header("Content-Type: application/json");

$servername = "afmassnadmin.mysql.db:3306";
$username = "afmassnadmin";
$password = "AF3m2022";
$dbname = "afmassnadmin";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["error" => "Invalid input"]);
    exit();
}

$titre = $data['titre'];
$annee = $data['annee'];
$theme = $data['theme'];
$resume = $data['resume'];
$author_name = $data['author_name'];

try {
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if author exists
    $stmt = $pdo->prepare("SELECT author_id FROM Authors WHERE author_name = :author_name");
    $stmt->execute(['author_name' => $author_name]);
    $author = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($author) {
        $author_id = $author['author_id'];
    } else {
        // Insert Author if not exists
        $stmt = $pdo->prepare("INSERT INTO Authors (author_name) VALUES (:author_name)");
        $stmt->execute(['author_name' => $author_name]);
        $author_id = $pdo->lastInsertId();
    }

    // Insert Article
    $stmt = $pdo->prepare("INSERT INTO Articales (titre, annee, theme, resume) 
                           VALUES (:titre, :annee, :theme, :resume)");
    $stmt->execute([
        'titre' => $titre,
        'annee' => $annee,
        'theme' => $theme,
        'resume' => $resume,
    ]);
    $article_id = $pdo->lastInsertId();

    // Insert into Articles_Authors (link table)
    $stmt = $pdo->prepare("INSERT INTO Article_Authors (article_id, author_id) 
                           VALUES (:article_id, :author_id)");
    $stmt->execute([
        'article_id' => $article_id,
        'author_id' => $author_id,
    ]);

    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
