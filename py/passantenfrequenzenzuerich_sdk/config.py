# PassantenfrequenzenZuerich SDK configuration


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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "short": "Altersgruppe",
            "type": "`$STRING`",
          },
          {
            "name": "count",
            "short": "Anzahl gezählter Passanten",
            "type": "`$INTEGER`",
          },
          {
            "name": "direction",
            "short": "Laufrichtung der Passanten",
            "type": "`$STRING`",
          },
          {
            "name": "location",
            "short": "Name des Messgebiets",
            "type": "`$STRING`",
          },
          {
            "name": "temperature",
            "short": "Temperatur in Grad Celsius",
            "type": "`$NUMBER`",
          },
          {
            "name": "timestamp",
            "short": "Zeitpunkt der Messung in UTC (ISO 8601)",
            "type": "`$STRING`",
          },
          {
            "name": "weather",
            "short": "Wetterbedingungen während der Messung",
            "type": "`$STRING`",
          },
          {
            "name": "zone",
            "short": "Zone (1-3 für Bürgersteigseiten/Mitte, 99 für nicht zuordenbar)",
            "type": "`$INTEGER`",
          },
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
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "location",
                      "orig": "location",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "2023-01-01T00:00:00Z",
                      "kind": "query",
                      "name": "start_date",
                      "orig": "start_date",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "zone",
                      "orig": "zone",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/dataset/hystreet_fussgaengerfrequenzen/download/hystreet_fussgaengerfrequenzen_seit2021.csv",
                "parts": [
                  "dataset",
                  "hystreet_fussgaengerfrequenzen",
                  "download",
                  "hystreet_fussgaengerfrequenzen_seit2021.csv",
                ],
                "select": {
                  "exist": [
                    "end_date",
                    "location",
                    "start_date",
                    "zone",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "type": "`$OBJECT`",
          },
          {
            "name": "properties",
            "type": "`$OBJECT`",
          },
          {
            "name": "type",
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
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/dataset/hystreet_fussgaengerfrequenzen/download/hystreet_locations.json",
                "parts": [
                  "dataset",
                  "hystreet_fussgaengerfrequenzen",
                  "download",
                  "hystreet_locations.json",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.features`",
                },
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
