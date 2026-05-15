package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewFrequenzenEntityFunc func(client *PassantenfrequenzenZuerichSDK, entopts map[string]any) PassantenfrequenzenZuerichEntity

var NewStandorteEntityFunc func(client *PassantenfrequenzenZuerichSDK, entopts map[string]any) PassantenfrequenzenZuerichEntity

