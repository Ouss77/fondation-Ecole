<?php
header('Content-Type: application/json');
include 'db_config.php';

$data = json_decode(file_get_contents("php://input"), true);

try {
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Destructure data
    $titre = $data['titre'];
    $annee = $data['annee'];
    $theme = $data['theme'];
    $resume = $data['resume'];
    $newAuthorName = $data['newAuthorName'];
    $selectedAuthorId = $data['selectedAuthorId'];

    // If new author is provided, insert it
    if (!empty($newAuthorName)) {
        $stmt = $pdo->prepare("INSERT INTO Authors (author_name) VALUES (:author_name)");
        $stmt->execute(['author_name' => $newAuthorName]);
        $selectedAuthorId = $pdo->lastInsertId(); // Get the new author's ID
    }

    // Insert the article
    $stmt = $pdo->prepare("INSERT INTO Articles (titre, annee, theme, resume) VALUES (:titre, :annee, :theme, :resume)");
    $stmt->execute(['titre' => $titre, 'annee' => $annee, 'theme' => $theme, 'resume' => $resume]);
    $articleId = $pdo->lastInsertId();

    // Link article to author
    $stmt = $pdo->prepare("INSERT INTO Article_Authors (article_id, author_id) VALUES (:article_id, :author_id)");
    $stmt->execute(['article_id' => $articleId, 'author_id' => $selectedAuthorId]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
