<?php

namespace Simform\HttpClient;

use Exception;

/**
 * Class Response is used to retrieve HTTP response headers and payloads
 *
 * Throws the exception for any payload (JSON) conversion errors
 * Returns all the JSON payloads as an associative array.
 *
 * @author Nikhil Detroja <nikhil.d@simformsolutions.com>
 */
class Response
{
    /**
     * Response
     *
     * @var mixed
     */

    private $response;

    /**
     * Headers
     *
     * @var array
     */
    private $headers;

    /**
     * Default Constructor
     * @param array|null $headers
     * @param mixed $response
     */
    public function __construct($response, array $headers = [])
    {
        $this->response = $response;
        $this->headers = $headers;
    }

    /**
     * Returns response header.
     *
     * @return array
     */
    public function getHeaders()
    {
        return $this->headers;
    }

    /**
     * Returns response
     * @return mixed
     * @throws Exception
    */
    public function getBody()
    {
        // If the payload is in json, try to decode json.
        if (strpos(strtolower(implode(', ', $this->getHeaders())), 'application/json') !== false) {
            $result = json_decode($this->response, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                // Return the associative array if the JSON is valid
                return $result;
            } else {
                // Throw exception if the JSON is invalid
                throw new Exception("Error decoding JSON: " . json_last_error());
            }
        }

        return $this->response;
    }
}
