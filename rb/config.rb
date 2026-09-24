# PassantenfrequenzenZuerich SDK configuration

module PassantenfrequenzenZuerichConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "PassantenfrequenzenZuerich",
        "slug" => "passantenfrequenzen-zuerich",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://data.stadt-zuerich.ch",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "frequenzen" => {},
          "standorte" => {},
        },
      },
      "entity" => {
        "frequenzen" => {
          "fields" => [
            {
              "name" => "age_group",
              "title" => "Age Group",
              "type" => "`$STRING`",
              "short" => "Altersgruppe",
            },
            {
              "name" => "count",
              "title" => "Count",
              "type" => "`$INTEGER`",
              "short" => "Anzahl gezählter Passanten",
            },
            {
              "name" => "direction",
              "title" => "Direction",
              "type" => "`$STRING`",
              "short" => "Laufrichtung der Passanten",
            },
            {
              "name" => "location",
              "title" => "Location",
              "type" => "`$STRING`",
              "short" => "Name des Messgebiets",
            },
            {
              "name" => "temperature",
              "title" => "Temperature",
              "type" => "`$NUMBER`",
              "short" => "Temperatur in Grad Celsius",
            },
            {
              "name" => "timestamp",
              "title" => "Timestamp",
              "type" => "`$STRING`",
              "short" => "Zeitpunkt der Messung in UTC (ISO 8601)",
              "format" => "date-time",
            },
            {
              "name" => "weather",
              "title" => "Weather",
              "type" => "`$STRING`",
              "short" => "Wetterbedingungen während der Messung",
            },
            {
              "name" => "zone",
              "title" => "Zone",
              "type" => "`$INTEGER`",
              "short" => "Zone (1-3 für Bürgersteigseiten/Mitte, 99 für nicht zuordenbar)",
            },
          ],
          "name" => "frequenzen",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/dataset/hystreet_fussgaengerfrequenzen/download/hystreet_fussgaengerfrequenzen_seit2021.csv",
                  "segments" => [
                    {
                      "lit" => "dataset",
                    },
                    {
                      "lit" => "hystreet_fussgaengerfrequenzen",
                    },
                    {
                      "lit" => "download",
                    },
                    {
                      "lit" => "hystreet_fussgaengerfrequenzen_seit2021.csv",
                    },
                  ],
                  "parts" => [
                    "dataset",
                    "hystreet_fussgaengerfrequenzen",
                    "download",
                    "hystreet_fussgaengerfrequenzen_seit2021.csv",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "end_date",
                        "orig" => "end_date",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "2023-12-31T23:59:59Z",
                      },
                      {
                        "name" => "location",
                        "orig" => "location",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "start_date",
                        "orig" => "start_date",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "2023-01-01T00:00:00Z",
                      },
                      {
                        "name" => "zone",
                        "orig" => "zone",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
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
          "relations" => {
            "ancestors" => [],
          },
        },
        "standorte" => {
          "fields" => [
            {
              "name" => "geometry",
              "title" => "Geometry",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "properties",
              "title" => "Properties",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "type",
              "title" => "Type",
              "type" => "`$STRING`",
            },
          ],
          "name" => "standorte",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/dataset/hystreet_fussgaengerfrequenzen/download/hystreet_locations.json",
                  "segments" => [
                    {
                      "lit" => "dataset",
                    },
                    {
                      "lit" => "hystreet_fussgaengerfrequenzen",
                    },
                    {
                      "lit" => "download",
                    },
                    {
                      "lit" => "hystreet_locations.json",
                    },
                  ],
                  "parts" => [
                    "dataset",
                    "hystreet_fussgaengerfrequenzen",
                    "download",
                    "hystreet_locations.json",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.features`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    PassantenfrequenzenZuerichFeatures.make_feature(name)
  end
end
