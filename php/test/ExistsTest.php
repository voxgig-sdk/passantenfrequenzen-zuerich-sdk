<?php
declare(strict_types=1);

// PassantenfrequenzenZuerich SDK exists test

require_once __DIR__ . '/../passantenfrequenzenzuerich_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = PassantenfrequenzenZuerichSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
