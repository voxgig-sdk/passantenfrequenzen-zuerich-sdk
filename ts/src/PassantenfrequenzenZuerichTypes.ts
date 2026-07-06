// Typed models for the PassantenfrequenzenZuerich SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Frequenzen {
  age_group?: string
  count?: number
  direction?: string
  location?: string
  temperature?: number
  timestamp?: string
  weather?: string
  zone?: number
}

export interface FrequenzenListMatch {
  age_group?: string
  count?: number
  direction?: string
  location?: string
  temperature?: number
  timestamp?: string
  weather?: string
  zone?: number
}

export interface Standorte {
  geometry?: Record<string, any>
  property?: Record<string, any>
  type?: string
}

export interface StandorteListMatch {
  geometry?: Record<string, any>
  property?: Record<string, any>
  type?: string
}

