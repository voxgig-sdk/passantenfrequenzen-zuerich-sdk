# PassantenfrequenzenZuerich SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module PassantenfrequenzenZuerichFeatures
  def self.make_feature(name)
    case name
    when "base"
      PassantenfrequenzenZuerichBaseFeature.new
    when "test"
      PassantenfrequenzenZuerichTestFeature.new
    else
      PassantenfrequenzenZuerichBaseFeature.new
    end
  end
end
