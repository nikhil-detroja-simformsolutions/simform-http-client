<?php

require '../../vendor/autoload.php';

use Exception as Exception;
use Simform\HttpClient\Request;


if (empty($_POST['url']) || empty($_POST['method'])) {
    throw new Exception('Invalid request');
}

$requestedMethod = $_POST['method'];

$supportedMethods = [
    'GET', 'POST', 'PUT', 'PATCH', 'DELETE'
];

if (!in_array($requestedMethod, $supportedMethods)) {
    throw new Exception('Invalid request method');
}

$body = !empty($_POST['body']) ? json_decode($_POST['body'], true) : [];
$headers = !empty($_POST['headers']) ? json_decode($_POST['headers'], true) : [];

try {
    $request = Request::getInstance();
    $response = $request->{strtolower($requestedMethod)}($_POST['url'], $body, $headers);

    header('Content-type: application/json');

    echo json_encode([
        'headers' => $response->getHeaders(),
        'response' => $response->getBody(),
    ]);
} catch (Exception $e) {
    echo $e->getCode();
    exit;
    http_response_code($e->getCode());
    header('Content-type: application/json');
    echo json_encode($e->getMessage());
}
