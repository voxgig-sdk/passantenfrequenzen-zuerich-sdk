"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'PassantenfrequenzenZuerich',
        slug: "passantenfrequenzen-zuerich",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://data.stadt-zuerich.ch",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            frequenzen: {},
            standorte: {},
        }
    };
    entity = {
        "frequenzen": {
            "fields": [
                {
                    "name": "age_group",
                    "short": "Altersgruppe",
                    "type": "`$STRING`"
                },
                {
                    "name": "count",
                    "short": "Anzahl gezählter Passanten",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "direction",
                    "short": "Laufrichtung der Passanten",
                    "type": "`$STRING`"
                },
                {
                    "name": "location",
                    "short": "Name des Messgebiets",
                    "type": "`$STRING`"
                },
                {
                    "name": "temperature",
                    "short": "Temperatur in Grad Celsius",
                    "type": "`$NUMBER`"
                },
                {
                    "format": "date-time",
                    "name": "timestamp",
                    "short": "Zeitpunkt der Messung in UTC (ISO 8601)",
                    "type": "`$STRING`"
                },
                {
                    "name": "weather",
                    "short": "Wetterbedingungen während der Messung",
                    "type": "`$STRING`"
                },
                {
                    "name": "zone",
                    "short": "Zone (1-3 für Bürgersteigseiten/Mitte, 99 für nicht zuordenbar)",
                    "type": "`$INTEGER`"
                }
            ],
            "name": "frequenzen",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "2023-12-31T23:59:59Z",
                                        "kind": "query",
                                        "name": "end_date",
                                        "orig": "end_date",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "location",
                                        "orig": "location",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "2023-01-01T00:00:00Z",
                                        "kind": "query",
                                        "name": "start_date",
                                        "orig": "start_date",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "zone",
                                        "orig": "zone",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/dataset/hystreet_fussgaengerfrequenzen/download/hystreet_fussgaengerfrequenzen_seit2021.csv",
                            "segments": [
                                {
                                    "lit": "dataset"
                                },
                                {
                                    "lit": "hystreet_fussgaengerfrequenzen"
                                },
                                {
                                    "lit": "download"
                                },
                                {
                                    "lit": "hystreet_fussgaengerfrequenzen_seit2021.csv"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "end_date",
                                    "location",
                                    "start_date",
                                    "zone"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "dataset",
                                "hystreet_fussgaengerfrequenzen",
                                "download",
                                "hystreet_fussgaengerfrequenzen_seit2021.csv"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "standorte": {
            "fields": [
                {
                    "name": "geometry",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "properties",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "type",
                    "type": "`$STRING`"
                }
            ],
            "name": "standorte",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/dataset/hystreet_fussgaengerfrequenzen/download/hystreet_locations.json",
                            "segments": [
                                {
                                    "lit": "dataset"
                                },
                                {
                                    "lit": "hystreet_fussgaengerfrequenzen"
                                },
                                {
                                    "lit": "download"
                                },
                                {
                                    "lit": "hystreet_locations.json"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.features`"
                            },
                            "parts": [
                                "dataset",
                                "hystreet_fussgaengerfrequenzen",
                                "download",
                                "hystreet_locations.json"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map