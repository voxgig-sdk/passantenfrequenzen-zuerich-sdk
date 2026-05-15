# PassantenfrequenzenZuerich SDK utility: make_context
require_relative '../core/context'
module PassantenfrequenzenZuerichUtilities
  MakeContext = ->(ctxmap, basectx) {
    PassantenfrequenzenZuerichContext.new(ctxmap, basectx)
  }
end
