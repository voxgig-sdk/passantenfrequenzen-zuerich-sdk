# PassantenfrequenzenZuerich PHP SDK Reference

Complete API reference for the PassantenfrequenzenZuerich PHP SDK.


## PassantenfrequenzenZuerichSDK

### Constructor

```php
require_once __DIR__ . '/passantenfrequenzen-zuerich_sdk.php';

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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

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
$frequenzen = $client->frequenzen();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age_group` | ``$STRING`` | No |  |
| `count` | ``$INTEGER`` | No |  |
| `direction` | ``$STRING`` | No |  |
| `location` | ``$STRING`` | No |  |
| `temperature` | ``$NUMBER`` | No |  |
| `timestamp` | ``$STRING`` | No |  |
| `weather` | ``$STRING`` | No |  |
| `zone` | ``$INTEGER`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->frequenzen()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): FrequenzenEntity`

Create a new `FrequenzenEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## StandorteEntity

```php
$standorte = $client->standorte();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `geometry` | ``$OBJECT`` | No |  |
| `property` | ``$OBJECT`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->standorte()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): StandorteEntity`

Create a new `StandorteEntity` instance with the same client and
options.

#### `getName(): string`

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

