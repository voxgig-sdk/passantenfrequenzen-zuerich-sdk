<?php
declare(strict_types=1);

// PassantenfrequenzenZuerich SDK utility: result_headers

class PassantenfrequenzenZuerichResultHeaders
{
    public static function call(PassantenfrequenzenZuerichContext $ctx): ?PassantenfrequenzenZuerichResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
