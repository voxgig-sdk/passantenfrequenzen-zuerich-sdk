package voxgigpassantenfrequenzenzuerichsdk

import (
	"github.com/voxgig-sdk/passantenfrequenzen-zuerich-sdk/go/core"
	"github.com/voxgig-sdk/passantenfrequenzen-zuerich-sdk/go/entity"
	"github.com/voxgig-sdk/passantenfrequenzen-zuerich-sdk/go/feature"
	_ "github.com/voxgig-sdk/passantenfrequenzen-zuerich-sdk/go/utility"
)

// Type aliases preserve external API.
type PassantenfrequenzenZuerichSDK = core.PassantenfrequenzenZuerichSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type PassantenfrequenzenZuerichEntity = core.PassantenfrequenzenZuerichEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type PassantenfrequenzenZuerichError = core.PassantenfrequenzenZuerichError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewFrequenzenEntityFunc = func(client *core.PassantenfrequenzenZuerichSDK, entopts map[string]any) core.PassantenfrequenzenZuerichEntity {
		return entity.NewFrequenzenEntity(client, entopts)
	}
	core.NewStandorteEntityFunc = func(client *core.PassantenfrequenzenZuerichSDK, entopts map[string]any) core.PassantenfrequenzenZuerichEntity {
		return entity.NewStandorteEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewPassantenfrequenzenZuerichSDK = core.NewPassantenfrequenzenZuerichSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewPassantenfrequenzenZuerichSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *PassantenfrequenzenZuerichSDK  { return NewPassantenfrequenzenZuerichSDK(nil) }
func Test() *PassantenfrequenzenZuerichSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
