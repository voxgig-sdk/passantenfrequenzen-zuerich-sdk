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
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'type' => '`$STRING`',
            ],
            [
              'name' => 'count',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'direction',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'location',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'temperature',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'timestamp',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'weather',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'zone',
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
                  'parts' => [
                    'dataset',
                    'hystreet_fussgaengerfrequenzen',
                    'download',
                    'hystreet_fussgaengerfrequenzen_seit2021.csv',
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
                  'parts' => [
                    'dataset',
                    'hystreet_fussgaengerfrequenzen',
                    'download',
                    'hystreet_locations.json',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.features`',
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
