# frozen_string_literal: true

# Typed models for the PassantenfrequenzenZuerich SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Frequenzen entity data model.
#
# @!attribute [rw] age_group
#   @return [String, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] direction
#   @return [String, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] temperature
#   @return [Float, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] weather
#   @return [String, nil]
#
# @!attribute [rw] zone
#   @return [Integer, nil]
Frequenzen = Struct.new(
  :age_group,
  :count,
  :direction,
  :location,
  :temperature,
  :timestamp,
  :weather,
  :zone,
  keyword_init: true
)

# Match filter for Frequenzen#list (any subset of Frequenzen fields).
#
# @!attribute [rw] age_group
#   @return [String, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] direction
#   @return [String, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] temperature
#   @return [Float, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] weather
#   @return [String, nil]
#
# @!attribute [rw] zone
#   @return [Integer, nil]
FrequenzenListMatch = Struct.new(
  :age_group,
  :count,
  :direction,
  :location,
  :temperature,
  :timestamp,
  :weather,
  :zone,
  keyword_init: true
)

# Standorte entity data model.
#
# @!attribute [rw] geometry
#   @return [Hash, nil]
#
# @!attribute [rw] property
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Standorte = Struct.new(
  :geometry,
  :property,
  :type,
  keyword_init: true
)

# Match filter for Standorte#list (any subset of Standorte fields).
#
# @!attribute [rw] geometry
#   @return [Hash, nil]
#
# @!attribute [rw] property
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
StandorteListMatch = Struct.new(
  :geometry,
  :property,
  :type,
  keyword_init: true
)

