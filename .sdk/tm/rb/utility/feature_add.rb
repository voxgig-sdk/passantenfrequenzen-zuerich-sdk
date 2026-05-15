# PassantenfrequenzenZuerich SDK utility: feature_add
module PassantenfrequenzenZuerichUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
