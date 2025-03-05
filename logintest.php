<?php
include 'dbConnexion.php';  // Include your DB connection file
header('Content-Type: application/json');

// Get the login credentials from the request body
$requestData = json_decode(file_get_contents("php://input"));
$username = trim($requestData->username);
$password = trim($requestData->password);

if (empty($username) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Username and password are required']);
    exit();
}

try {
    // Prepare and execute the SQL query to fetch user data
    $stmt = $conn->prepare("SELECT id, username, password, role FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        
        // Verify password (Use password_hash() in the DB for secure storage)
        if ($password === $user['password']) { 
            echo json_encode(['success' => true, 'message' => 'Login successful', 'role' => $user['role']]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid password']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'User not found']);
    }
    
    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
