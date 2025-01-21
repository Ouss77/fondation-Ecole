// dbconfig.php

<?php
// Database connection information

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

define('DB_SERVER', '127.0.0.1');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '1963');
define('DB_NAME', 'afmassnadmin');

// Set content type to JSON
header('Content-Type: application/json');


?>
 