<?php
header('Content-Type: application/json');

// Define a directory to save uploaded files
$targetDir = "uploads/"; // Ensure this directory is writable
$response = [];

// Check if the file is uploaded
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $targetFile = $targetDir . basename($_FILES['file']['name']);
    
    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFile)) {
        $imageUrl = "https://waifu.rest/" . $targetFile; // Change this to your domain

        // Prepare the response
        $response['status'] = 'success';
        $response['url'] = $imageUrl;
    } else {
        // If upload fails
        $response['status'] = 'error';
        $response['message'] = 'There was an error uploading your file.';
    }
} else {
    // Invalid request
    $response['status'] = 'error';
    $response['message'] = 'Invalid request.';
}

// Return JSON response
echo json_encode($response);
?>
