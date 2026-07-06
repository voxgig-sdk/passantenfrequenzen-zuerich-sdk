-- Typed models for the PassantenfrequenzenZuerich SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Frequenzen
---@field age_group? string
---@field count? number
---@field direction? string
---@field location? string
---@field temperature? number
---@field timestamp? string
---@field weather? string
---@field zone? number

---@class FrequenzenListMatch
---@field age_group? string
---@field count? number
---@field direction? string
---@field location? string
---@field temperature? number
---@field timestamp? string
---@field weather? string
---@field zone? number

---@class Standorte
---@field geometry? table
---@field property? table
---@field type? string

---@class StandorteListMatch
---@field geometry? table
---@field property? table
---@field type? string

local M = {}

return M
