<?php
declare(strict_types=1);

// PassantenfrequenzenZuerich SDK configuration

class PassantenfrequenzenZuerichConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "PassantenfrequenzenZuerich",
                "slug" => "passantenfrequenzen-zuerich",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://data.stadt-zuerich.ch",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "frequenzen" => [],
                    "standorte" => [],
                ],
            ],
            "entity" => [
        'frequenzen' => [
          'fields' => [
            [
              'name' => 'age_group',
              'short' => 'Altersgruppe',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'count',
              'short' => 'Anzahl gezählter Passanten',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'direction',
              'short' => 'Laufrichtung der Passanten',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'location',
              'short' => 'Name des Messgebiets',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'temperature',
              'short' => 'Temperatur in Grad Celsius',
              'type' => '`$NUMBER`',
            ],
            [
              'format' => 'date-time',
              'name' => 'timestamp',
              'short' => 'Zeitpunkt der Messung in UTC (ISO 8601)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'weather',
              'short' => 'Wetterbedingungen während der Messung',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'zone',
              'short' => 'Zone (1-3 für Bürgersteigseiten/Mitte, 99 für nicht zuordenbar)',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'frequenzen',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2023-12-31T23:59:59Z',
                        'kind' => 'query',
                        'name' => 'end_date',
                        'orig' => 'end_date',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'location',
                        'orig' => 'location',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '2023-01-01T00:00:00Z',
                        'kind' => 'query',
                        'name' => 'start_date',
                        'orig' => 'start_date',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'zone',
                        'orig' => 'zone',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/dataset/hystreet_fussgaengerfrequenzen/download/hystreet_fussgaengerfrequenzen_seit2021.csv',
                  'segments' => [
                    [
                      'lit' => 'dataset',
                    ],
                    [
                      'lit' => 'hystreet_fussgaengerfrequenzen',
                    ],
                    [
                      'lit' => 'download',
                    ],
                    [
                      'lit' => 'hystreet_fussgaengerfrequenzen_seit2021.csv',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'end_date',
                      'location',
                      'start_date',
                      'zone',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'dataset',
                    'hystreet_fussgaengerfrequenzen',
                    'download',
                    'hystreet_fussgaengerfrequenzen_seit2021.csv',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'standorte' => [
          'fields' => [
            [
              'name' => 'geometry',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'properties',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'type',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'standorte',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/dataset/hystreet_fussgaengerfrequenzen/download/hystreet_locations.json',
                  'segments' => [
                    [
                      'lit' => 'dataset',
                    ],
                    [
                      'lit' => 'hystreet_fussgaengerfrequenzen',
                    ],
                    [
                      'lit' => 'download',
                    ],
                    [
                      'lit' => 'hystreet_locations.json',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.features`',
                  ],
                  'parts' => [
                    'dataset',
                    'hystreet_fussgaengerfrequenzen',
                    'download',
                    'hystreet_locations.json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return PassantenfrequenzenZuerichFeatures::make_feature($name);
    }
}
