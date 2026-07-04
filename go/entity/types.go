// Typed models for the PassantenfrequenzenZuerich SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Frequenzen is the typed data model for the frequenzen entity.
type Frequenzen struct {
	AgeGroup *string `json:"age_group,omitempty"`
	Count *int `json:"count,omitempty"`
	Direction *string `json:"direction,omitempty"`
	Location *string `json:"location,omitempty"`
	Temperature *float64 `json:"temperature,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Weather *string `json:"weather,omitempty"`
	Zone *int `json:"zone,omitempty"`
}

// FrequenzenListMatch mirrors the frequenzen fields as an all-optional match
// filter (Go analog of Partial<Frequenzen>).
type FrequenzenListMatch struct {
	AgeGroup *string `json:"age_group,omitempty"`
	Count *int `json:"count,omitempty"`
	Direction *string `json:"direction,omitempty"`
	Location *string `json:"location,omitempty"`
	Temperature *float64 `json:"temperature,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Weather *string `json:"weather,omitempty"`
	Zone *int `json:"zone,omitempty"`
}

// Standorte is the typed data model for the standorte entity.
type Standorte struct {
	Geometry *map[string]any `json:"geometry,omitempty"`
	Property *map[string]any `json:"property,omitempty"`
	Type *string `json:"type,omitempty"`
}

// StandorteListMatch mirrors the standorte fields as an all-optional match
// filter (Go analog of Partial<Standorte>).
type StandorteListMatch struct {
	Geometry *map[string]any `json:"geometry,omitempty"`
	Property *map[string]any `json:"property,omitempty"`
	Type *string `json:"type,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
