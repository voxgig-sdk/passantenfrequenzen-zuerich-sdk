# PassantenfrequenzenZuerich SDK

Hourly pedestrian counts on Zurich's Bahnhofstrasse, broken down by zone, direction and weather conditions

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Passantenfrequenzen Zürich

Passantenfrequenzen Zürich exposes pedestrian-count measurements published on the [City of Zurich Open Data portal](https://data.stadt-zuerich.ch). The dataset is curated by Stadt Zürich's urban development team, with raw counts produced by laser-scanner sensors operated by hystreet.com GmbH along Bahnhofstrasse and adjacent streets.

What you get from the API:

- Hourly pedestrian counts per measurement location
- Breakdown by zone (sidewalk sides, street centre, and an "unclassifiable" zone 99)
- Direction of travel (toward Bürkliplatz vs. Hauptbahnhof)
- Demographic split between adults and children
- Weather and temperature observations recorded at the same timestamp
- Location metadata with WGS84 coordinates for each sensor area

Measurement coverage is focused on four areas: Bahnhofstrasse North, Middle and South, plus Lintheschergasse. Collection has been ongoing since June 2021 and updates run hourly. CORS is not enabled on the upstream service, so browser-side calls may need a proxy.

## Try it

**TypeScript**
```bash
npm install passantenfrequenzen-zuerich
```

**Python**
```bash
pip install passantenfrequenzen-zuerich-sdk
```

**PHP**
```bash
composer require voxgig/passantenfrequenzen-zuerich-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/passantenfrequenzen-zuerich-sdk/go
```

**Ruby**
```bash
gem install passantenfrequenzen-zuerich-sdk
```

**Lua**
```bash
luarocks install passantenfrequenzen-zuerich-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { PassantenfrequenzenZuerichSDK } from 'passantenfrequenzen-zuerich'

const client = new PassantenfrequenzenZuerichSDK({})

// List all frequenzens
const frequenzens = await client.Frequenzen().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o passantenfrequenzen-zuerich-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "passantenfrequenzen-zuerich": {
      "command": "/abs/path/to/passantenfrequenzen-zuerich-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Frequenzen** | Hourly pedestrian-count records per location and zone, including direction of travel, adult/child split, and concurrent weather and temperature readings. | `/dataset/hystreet_fussgaengerfrequenzen/download/hystreet_fussgaengerfrequenzen_seit2021.csv` |
| **Standorte** | Measurement locations along Bahnhofstrasse and Lintheschergasse, each split into zones with WGS84 geometries describing where pedestrians were counted. | `/dataset/hystreet_fussgaengerfrequenzen/download/hystreet_locations.json` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from passantenfrequenzenzuerich_sdk import PassantenfrequenzenZuerichSDK

client = PassantenfrequenzenZuerichSDK({})

# List all frequenzens
frequenzens, err = client.Frequenzen(None).list(None, None)
```

### PHP

```php
<?php
require_once 'passantenfrequenzenzuerich_sdk.php';

$client = new PassantenfrequenzenZuerichSDK([]);

// List all frequenzens
[$frequenzens, $err] = $client->Frequenzen(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/passantenfrequenzen-zuerich-sdk/go"

client := sdk.NewPassantenfrequenzenZuerichSDK(map[string]any{})

// List all frequenzens
frequenzens, err := client.Frequenzen(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "PassantenfrequenzenZuerich_sdk"

client = PassantenfrequenzenZuerichSDK.new({})

# List all frequenzens
frequenzens, err = client.Frequenzen(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("passantenfrequenzen-zuerich_sdk")

local client = sdk.new({})

-- List all frequenzens
local frequenzens, err = client:Frequenzen(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = PassantenfrequenzenZuerichSDK.test()
const result = await client.Frequenzen().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = PassantenfrequenzenZuerichSDK.test(None, None)
result, err = client.Frequenzen(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = PassantenfrequenzenZuerichSDK::test(null, null);
[$result, $err] = $client->Frequenzen(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Frequenzen(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = PassantenfrequenzenZuerichSDK.test(nil, nil)
result, err = client.Frequenzen(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Frequenzen(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Passantenfrequenzen Zürich

- Upstream: [https://data.stadt-zuerich.ch/dataset/hystreet_fussgaengerfrequenzen](https://data.stadt-zuerich.ch/dataset/hystreet_fussgaengerfrequenzen)

- Data is published under Creative Commons Attribution (CC-BY).
- You must credit the City of Zurich (Stadt Zürich) when using or redistributing the data.
- Raw measurements are supplied by hystreet.com GmbH; check their terms if you query their service directly.
- Data has been collected since June 2021 and is refreshed hourly.

---

Generated from the Passantenfrequenzen Zürich OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
