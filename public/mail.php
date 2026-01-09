<?php
// Prevent caching
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// Handle CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle Preflight
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the input data
    $input = json_decode(file_get_contents("php://input"), true);

    $name = strip_tags(trim($input["name"] ?? ''));
    $email = filter_var(trim($input["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $company = strip_tags(trim($input["company"] ?? ''));
    $phone = strip_tags(trim($input["phone"] ?? ''));
    $message = strip_tags(trim($input["message"] ?? ''));

    // Validation
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Validation failed. Please check your inputs."]);
        exit;
    }

    // Email Config
    $recipient = "info@hazarvolga.com.tr";
    $subject = "New Contact from Website: $name";
    
    // Email Body
    $email_content = "Name: $name\n";
    $email_content .= "Company: $company\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n\n";
    $email_content .= "Message:\n$message\n";
    $email_content .= "\n---\nSent from hazarvolga.com.tr";

    // Headers
    // Important: 'From' must be a domain email to prevent being marked as spam
    $email_headers = "From: No-Reply <noreply@hazarvolga.com.tr>\r\n";
    $email_headers .= "Reply-To: $name <$email>\r\n";
    $email_headers .= "X-Mailer: PHP/" . phpversion();

    // Send
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Message sent successfully!"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Server failed to send the message."]);
    }
} else {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Forbidden"]);
}
?>
