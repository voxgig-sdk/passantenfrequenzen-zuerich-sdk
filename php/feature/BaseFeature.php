<?php
declare(strict_types=1);

// PassantenfrequenzenZuerich SDK base feature

class PassantenfrequenzenZuerichBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(PassantenfrequenzenZuerichContext $ctx, array $options): void {}
    public function PostConstruct(PassantenfrequenzenZuerichContext $ctx): void {}
    public function PostConstructEntity(PassantenfrequenzenZuerichContext $ctx): void {}
    public function SetData(PassantenfrequenzenZuerichContext $ctx): void {}
    public function GetData(PassantenfrequenzenZuerichContext $ctx): void {}
    public function GetMatch(PassantenfrequenzenZuerichContext $ctx): void {}
    public function SetMatch(PassantenfrequenzenZuerichContext $ctx): void {}
    public function PrePoint(PassantenfrequenzenZuerichContext $ctx): void {}
    public function PreSpec(PassantenfrequenzenZuerichContext $ctx): void {}
    public function PreRequest(PassantenfrequenzenZuerichContext $ctx): void {}
    public function PreResponse(PassantenfrequenzenZuerichContext $ctx): void {}
    public function PreResult(PassantenfrequenzenZuerichContext $ctx): void {}
    public function PreDone(PassantenfrequenzenZuerichContext $ctx): void {}
    public function PreUnexpected(PassantenfrequenzenZuerichContext $ctx): void {}
}
