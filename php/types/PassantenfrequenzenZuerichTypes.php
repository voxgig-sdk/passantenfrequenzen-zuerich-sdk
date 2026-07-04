<?php
declare(strict_types=1);

// Typed models for the PassantenfrequenzenZuerich SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Frequenzen entity data model. */
class Frequenzen
{
    public ?string $age_group = null;
    public ?int $count = null;
    public ?string $direction = null;
    public ?string $location = null;
    public ?float $temperature = null;
    public ?string $timestamp = null;
    public ?string $weather = null;
    public ?int $zone = null;
}

/** Match filter for Frequenzen#list (any subset of Frequenzen fields). */
class FrequenzenListMatch
{
    public ?string $age_group = null;
    public ?int $count = null;
    public ?string $direction = null;
    public ?string $location = null;
    public ?float $temperature = null;
    public ?string $timestamp = null;
    public ?string $weather = null;
    public ?int $zone = null;
}

/** Standorte entity data model. */
class Standorte
{
    public ?array $geometry = null;
    public ?array $property = null;
    public ?string $type = null;
}

/** Match filter for Standorte#list (any subset of Standorte fields). */
class StandorteListMatch
{
    public ?array $geometry = null;
    public ?array $property = null;
    public ?string $type = null;
}

