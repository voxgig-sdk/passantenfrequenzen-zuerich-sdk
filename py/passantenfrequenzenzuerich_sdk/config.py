# PassantenfrequenzenZuerich SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "PassantenfrequenzenZuerich",
            "slug": "passantenfrequenzen-zuerich",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://data.stadt-zuerich.ch",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "frequenzen": {},
                "standorte": {},
            },
        },
        "entity": {
      "frequenzen": {
        "fields": [
          {
            "name": "age_group",
            "title": "Age Group",
            "type": "`$STRING`",
            "short": "Altersgruppe",
          },
          {
            "name": "count",
            "title": "Count",
            "type": "`$INTEGER`",
            "short": "Anzahl gezählter Passanten",
          },
          {
            "name": "direction",
            "title": "Direction",
            "type": "`$STRING`",
            "short": "Laufrichtung der Passanten",
          },
          {
            "name": "location",
            "title": "Location",
            "type": "`$STRING`",
            "short": "Name des Messgebiets",
          },
          {
            "name": "temperature",
            "title": "Temperature",
            "type": "`$NUMBER`",
            "short": "Temperatur in Grad Celsius",
          },
          {
            "name": "timestamp",
            "title": "Timestamp",
            "type": "`$STRING`",
            "short": "Zeitpunkt der Messung in UTC (ISO 8601)",
            "format": "date-time",
          },
          {
            "name": "weather",
            "title": "Weather",
            "type": "`$STRING`",
            "short": "Wetterbedingungen während der Messung",
          },
          {
            "name": "zone",
            "title": "Zone",
            "type": "`$INTEGER`",
            "short": "Zone (1-3 für Bürgersteigseiten/Mitte, 99 für nicht zuordenbar)",
          },
        ],
        "name": "frequenzen",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/dataset/hystreet_fussgaengerfrequenzen/download/hystreet_fussgaengerfrequenzen_seit2021.csv",
                "segments": [
                  {
                    "lit": "dataset",
                  },
                  {
                    "lit": "hystreet_fussgaengerfrequenzen",
                  },
                  {
                    "lit": "download",
                  },
                  {
                    "lit": "hystreet_fussgaengerfrequenzen_seit2021.csv",
                  },
                ],
                "parts": [
                  "dataset",
                  "hystreet_fussgaengerfrequenzen",
                  "download",
                  "hystreet_fussgaengerfrequenzen_seit2021.csv",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "end_date",
                      "orig": "end_date",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "2023-12-31T23:59:59Z",
                    },
                    {
                      "name": "location",
                      "orig": "location",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "start_date",
                      "orig": "start_date",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "2023-01-01T00:00:00Z",
                    },
                    {
                      "name": "zone",
                      "orig": "zone",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "end_date",
                    "location",
                    "start_date",
                    "zone",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "standorte": {
        "fields": [
          {
            "name": "geometry",
            "title": "Geometry",
            "type": "`$OBJECT`",
          },
          {
            "name": "properties",
            "title": "Properties",
            "type": "`$OBJECT`",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
          },
        ],
        "name": "standorte",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/dataset/hystreet_fussgaengerfrequenzen/download/hystreet_locations.json",
                "segments": [
                  {
                    "lit": "dataset",
                  },
                  {
                    "lit": "hystreet_fussgaengerfrequenzen",
                  },
                  {
                    "lit": "download",
                  },
                  {
                    "lit": "hystreet_locations.json",
                  },
                ],
                "parts": [
                  "dataset",
                  "hystreet_fussgaengerfrequenzen",
                  "download",
                  "hystreet_locations.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.features`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
