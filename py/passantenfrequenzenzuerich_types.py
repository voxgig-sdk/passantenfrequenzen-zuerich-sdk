# Typed models for the PassantenfrequenzenZuerich SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Frequenzen:
    age_group: Optional[str] = None
    count: Optional[int] = None
    direction: Optional[str] = None
    location: Optional[str] = None
    temperature: Optional[float] = None
    timestamp: Optional[str] = None
    weather: Optional[str] = None
    zone: Optional[int] = None


@dataclass
class FrequenzenListMatch:
    age_group: Optional[str] = None
    count: Optional[int] = None
    direction: Optional[str] = None
    location: Optional[str] = None
    temperature: Optional[float] = None
    timestamp: Optional[str] = None
    weather: Optional[str] = None
    zone: Optional[int] = None


@dataclass
class Standorte:
    geometry: Optional[dict] = None
    property: Optional[dict] = None
    type: Optional[str] = None


@dataclass
class StandorteListMatch:
    geometry: Optional[dict] = None
    property: Optional[dict] = None
    type: Optional[str] = None

