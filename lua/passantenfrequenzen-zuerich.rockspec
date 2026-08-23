package = "voxgig-sdk-passantenfrequenzen-zuerich"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/passantenfrequenzen-zuerich-sdk.git",
  tag = "lua/v0.0.1",
  dir = "passantenfrequenzen-zuerich-sdk/lua"
}
description = {
  summary = "Unofficial generated Lua SDK for the Passantenfrequenzen Zürich public API. Not affiliated with or endorsed by the upstream API provider.",
  homepage = "https://github.com/voxgig-sdk/passantenfrequenzen-zuerich-sdk",
  issues_url = "https://github.com/voxgig-sdk/passantenfrequenzen-zuerich-sdk/issues",
  license = "MIT",
  labels = { "voxgig", "sdk", "generated-sdk", "openapi", "api-client", "passantenfrequenzen-zuerich" }
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["passantenfrequenzen-zuerich_sdk"] = "passantenfrequenzen-zuerich_sdk.lua",
    ["config"] = "config.lua",
    ["config_shared"] = "config_shared.lua",
    ["features"] = "features.lua",
    ["feature.base_feature"] = "feature/base_feature.lua",
    ["feature.test_feature"] = "feature/test_feature.lua",
  }
}
