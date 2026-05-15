package = "voxgig-sdk-passantenfrequenzen-zuerich"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/passantenfrequenzen-zuerich-sdk.git"
}
description = {
  summary = "PassantenfrequenzenZuerich SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["passantenfrequenzen-zuerich_sdk"] = "passantenfrequenzen-zuerich_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
