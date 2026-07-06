# PassantenfrequenzenZuerich Ruby SDK Reference

Complete API reference for the PassantenfrequenzenZuerich Ruby SDK.


## PassantenfrequenzenZuerichSDK

### Constructor

```ruby
require_relative 'PassantenfrequenzenZuerich_sdk'

client = PassantenfrequenzenZuerichSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `PassantenfrequenzenZuerichSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = PassantenfrequenzenZuerichSDK.test
```


### Instance Methods

#### `Frequenzen(data = nil)`

Create a new `Frequenzen` entity instance. Pass `nil` for no initial data.

#### `Standorte(data = nil)`

Create a new `Standorte` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## FrequenzenEntity

```ruby
frequenzen = client.Frequenzen
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age_group` | `String` | No |  |
| `count` | `Integer` | No |  |
| `direction` | `String` | No |  |
| `location` | `String` | No |  |
| `temperature` | `Float` | No |  |
| `timestamp` | `String` | No |  |
| `weather` | `String` | No |  |
| `zone` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Frequenzen.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FrequenzenEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## StandorteEntity

```ruby
standorte = client.Standorte
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `geometry` | `Hash` | No |  |
| `property` | `Hash` | No |  |
| `type` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Standorte.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StandorteEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = PassantenfrequenzenZuerichSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

