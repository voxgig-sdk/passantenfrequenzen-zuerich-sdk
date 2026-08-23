package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "PassantenfrequenzenZuerich",
			"slug": "passantenfrequenzen-zuerich",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://data.stadt-zuerich.ch",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"frequenzen": map[string]any{},
				"standorte": map[string]any{},
			},
		},
		"entity": map[string]any{
			"frequenzen": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "age_group",
						"short": "Altersgruppe",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "count",
						"short": "Anzahl gezählter Passanten",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "direction",
						"short": "Laufrichtung der Passanten",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "location",
						"short": "Name des Messgebiets",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "temperature",
						"short": "Temperatur in Grad Celsius",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "timestamp",
						"short": "Zeitpunkt der Messung in UTC (ISO 8601)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "weather",
						"short": "Wetterbedingungen während der Messung",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "zone",
						"short": "Zone (1-3 für Bürgersteigseiten/Mitte, 99 für nicht zuordenbar)",
						"type": "`$INTEGER`",
					},
				},
				"name": "frequenzen",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2023-12-31T23:59:59Z",
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "location",
											"orig": "location",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2023-01-01T00:00:00Z",
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "zone",
											"orig": "zone",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/dataset/hystreet_fussgaengerfrequenzen/download/hystreet_fussgaengerfrequenzen_seit2021.csv",
								"parts": []any{
									"dataset",
									"hystreet_fussgaengerfrequenzen",
									"download",
									"hystreet_fussgaengerfrequenzen_seit2021.csv",
								},
								"select": map[string]any{
									"exist": []any{
										"end_date",
										"location",
										"start_date",
										"zone",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"standorte": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "geometry",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "properties",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "type",
						"type": "`$STRING`",
					},
				},
				"name": "standorte",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/dataset/hystreet_fussgaengerfrequenzen/download/hystreet_locations.json",
								"parts": []any{
									"dataset",
									"hystreet_fussgaengerfrequenzen",
									"download",
									"hystreet_locations.json",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.features`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
