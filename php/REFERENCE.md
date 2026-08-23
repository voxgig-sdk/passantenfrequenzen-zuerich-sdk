# PassantenfrequenzenZuerich PHP SDK Reference

Complete API reference for the PassantenfrequenzenZuerich PHP SDK.


## PassantenfrequenzenZuerichSDK

### Constructor

```php
require_once __DIR__ . '/passantenfrequenzenzuerich_sdk.php';

$client = new PassantenfrequenzenZuerichSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `PassantenfrequenzenZuerichSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = PassantenfrequenzenZuerichSDK::test();
```


### Instance Methods

#### `Frequenzen($data = null)`

Create a new `FrequenzenEntity` instance. Pass `null` for no initial data.

#### `Standorte($data = null)`

Create a new `StandorteEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): PassantenfrequenzenZuerichUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## FrequenzenEntity

```php
$frequenzen = $client->Frequenzen();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age_group` | `string` | No | Altersgruppe |
| `count` | `int` | No | Anzahl gezählter Passanten |
| `direction` | `string` | No | Laufrichtung der Passanten |
| `location` | `string` | No | Name des Messgebiets |
| `temperature` | `float` | No | Temperatur in Grad Celsius |
| `timestamp` | `string` | No | Zeitpunkt der Messung in UTC (ISO 8601) |
| `weather` | `string` | No | Wetterbedingungen während der Messung |
| `zone` | `int` | No | Zone (1-3 für Bürgersteigseiten/Mitte, 99 für nicht zuordenbar) |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Frequenzen()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FrequenzenEntity`

Create a new `FrequenzenEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StandorteEntity

```php
$standorte = $client->Standorte();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `geometry` | `array` | No |  |
| `properties` | `array` | No |  |
| `type` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Standorte()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StandorteEntity`

Create a new `StandorteEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new PassantenfrequenzenZuerichSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

