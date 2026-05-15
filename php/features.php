<?php
declare(strict_types=1);

// PassantenfrequenzenZuerich SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class PassantenfrequenzenZuerichFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new PassantenfrequenzenZuerichBaseFeature();
            case "test":
                return new PassantenfrequenzenZuerichTestFeature();
            default:
                return new PassantenfrequenzenZuerichBaseFeature();
        }
    }
}
