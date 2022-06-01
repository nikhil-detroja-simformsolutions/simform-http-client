# HTTP Client (PHP)

### Introduction
---
The PHP HTTP Client is a PHP7.x supported light weight, simple package implemented with the OOPS concepts to make the API request. It supports different HTTP requests such as  'GET', 'POST', 'PUT', 'PATCH', 'DELETE'  The package also handles an exception if the requested URL returned any error or is invalid or has malformed JSON response. The package by default uses the singleton instance behavior which can be configured as per the need.

### Usage
---
The following code snippet can be used for the simple get request.
```php
require_once '../autoload.php';

use App\Http\Request;

// By default the class will have only one instance
// Pass the argument `$createNew = true` to always get the new instance
$request = Request::getInstance();
$response = $request->get('https://api-endpoint-url/');
$result = $response->getBody();
```

#### Supported Methods
---
```php
// To make a GET request
$request->get('https://api-endpoint-url/');

// To make a POST request
$request->post('https://api-endpoint-url/', $payload);

// To make a PATCH request with custom headers
$request->patch('https://api-endpoint-url/resource-id', $payload, $headers);

// To make a PUT request
$request->put('https://api-endpoint-url/resource-id', $payload);

// To make an OPTIONS request
$request->options('https://api-endpoint-url/');

// To make a DELETE request
$request->delete('https://api-endpoint-url/resource-id');
```

#### Examples
---
**Example 1**: Make a `POST` request
```php
$payload = [
    'key' => 'value',
];
$request = Request::getInstance();
$response = $request->post('https://api-endpoint-url/', $payload);
$result = $response->getBody();
```
**Example 2**: Pass custom headers
```php
$payload = [
    'key' => 'value',
];

$headers = [
    'Authorization' => 'Bearer auth_token'
];

$request = Request::getInstance();
$response = $request->post('https://api-endpoint-url/', $payload, $headers);
$result = $response->getBody();
```

#### Author
- [Nikhil Detroja](https://github.com/nikhil-simform)