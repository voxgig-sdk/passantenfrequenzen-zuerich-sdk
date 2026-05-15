# PassantenfrequenzenZuerich SDK exists test

require "minitest/autorun"
require_relative "../PassantenfrequenzenZuerich_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = PassantenfrequenzenZuerichSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
