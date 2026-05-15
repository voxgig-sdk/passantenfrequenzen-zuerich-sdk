# PassantenfrequenzenZuerich Python SDK Reference

Complete API reference for the PassantenfrequenzenZuerich Python SDK.


## PassantenfrequenzenZuerichSDK

### Constructor

```python
from passantenfrequenzen-zuerich_sdk import PassantenfrequenzenZuerichSDK

client = PassantenfrequenzenZuerichSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `PassantenfrequenzenZuerichSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = PassantenfrequenzenZuerichSDK.test()
```


### Instance Methods

#### `Frequenzen(data=None)`

Create a new `FrequenzenEntity` instance. Pass `None` for no initial data.

#### `Standorte(data=None)`

Create a new `StandorteEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> tuple`

Make a direct HTTP request to any API endpoint. Returns `(result, err)`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `(result_dict, err)`

#### `prepare(fetchargs=None) -> tuple`

Prepare a fetch definition without sending. Returns `(fetchdef, err)`.


---

## FrequenzenEntity

```python
frequenzen = client.Frequenzen()
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

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Frequenzen().list({})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FrequenzenEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StandorteEntity

```python
standorte = client.Standorte()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `geometry` | ``$OBJECT`` | No |  |
| `property` | ``$OBJECT`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Standorte().list({})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StandorteEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = PassantenfrequenzenZuerichSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

