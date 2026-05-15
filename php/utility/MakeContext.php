<?php
declare(strict_types=1);

// PassantenfrequenzenZuerich SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class PassantenfrequenzenZuerichMakeContext
{
    public static function call(array $ctxmap, ?PassantenfrequenzenZuerichContext $basectx): PassantenfrequenzenZuerichContext
    {
        return new PassantenfrequenzenZuerichContext($ctxmap, $basectx);
    }
}
