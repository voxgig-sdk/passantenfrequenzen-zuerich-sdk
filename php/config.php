<?php
declare(strict_types=1);

// PassantenfrequenzenZuerich SDK configuration

class PassantenfrequenzenZuerichConfig
{
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
              'active' => true,
              'name' => 'age_group',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'count',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'direction',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'location',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'temperature',
              'req' => false,
              'type' => '`$NUMBER`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'timestamp',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'weather',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 6,
            ],
            [
              'active' => true,
              'name' => 'zone',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 7,
            ],
          ],
          'name' => 'frequenzen',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => '2023-12-31T23:59:59Z',
                        'kind' => 'query',
                        'name' => 'end_date',
                        'orig' => 'end_date',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'location',
                        'orig' => 'location',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => '2023-01-01T00:00:00Z',
                        'kind' => 'query',
                        'name' => 'start_date',
                        'orig' => 'start_date',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'zone',
                        'orig' => 'zone',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'standorte' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'geometry',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'property',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'type',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
          ],
          'name' => 'standorte',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
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
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
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
