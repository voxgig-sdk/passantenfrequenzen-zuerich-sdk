# PassantenfrequenzenZuerich SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module PassantenfrequenzenZuerichFeatures
  def self.make_feature(name)
    case name
    when "base"
      PassantenfrequenzenZuerichBaseFeature.new
    when "ratelimit"
      PassantenfrequenzenZuerichRatelimitFeature.new
    when "retry"
      PassantenfrequenzenZuerichRetryFeature.new
    when "test"
      PassantenfrequenzenZuerichTestFeature.new
    when "timeout"
      PassantenfrequenzenZuerichTimeoutFeature.new
    else
      PassantenfrequenzenZuerichBaseFeature.new
    end
  end
end
