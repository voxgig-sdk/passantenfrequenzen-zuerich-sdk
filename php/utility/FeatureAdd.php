<?php
declare(strict_types=1);

// PassantenfrequenzenZuerich SDK utility: feature_add

class PassantenfrequenzenZuerichFeatureAdd
{
    public static function call(PassantenfrequenzenZuerichContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
