# PassantenfrequenzenZuerich TypeScript SDK Reference

Complete API reference for the PassantenfrequenzenZuerich TypeScript SDK.


## PassantenfrequenzenZuerichSDK

### Constructor

```ts
new PassantenfrequenzenZuerichSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `PassantenfrequenzenZuerichSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = PassantenfrequenzenZuerichSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `PassantenfrequenzenZuerichSDK` instance in test mode.


### Instance Methods

#### `Frequenzen(data?: object)`

Create a new `Frequenzen` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FrequenzenEntity` instance.

#### `Standorte(data?: object)`

Create a new `Standorte` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StandorteEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `PassantenfrequenzenZuerichSDK.test()`.

**Returns:** `PassantenfrequenzenZuerichSDK` instance in test mode.


---

## FrequenzenEntity

```ts
const frequenzen = client.frequenzen
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.frequenzen.list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FrequenzenEntity` instance with the same client and
options.

#### `client()`

Return the parent `PassantenfrequenzenZuerichSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StandorteEntity

```ts
const standorte = client.standorte
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `geometry` | ``$OBJECT`` | No |  |
| `property` | ``$OBJECT`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.standorte.list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StandorteEntity` instance with the same client and
options.

#### `client()`

Return the parent `PassantenfrequenzenZuerichSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new PassantenfrequenzenZuerichSDK({
  feature: {
    test: { active: true },
  }
})
```

