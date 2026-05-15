<?php
declare(strict_types=1);

// PassantenfrequenzenZuerich SDK utility: prepare_body

class PassantenfrequenzenZuerichPrepareBody
{
    public static function call(PassantenfrequenzenZuerichContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
