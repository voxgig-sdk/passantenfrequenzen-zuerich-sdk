-- PassantenfrequenzenZuerich SDK exists test

local sdk = require("passantenfrequenzen-zuerich_sdk")

describe("PassantenfrequenzenZuerichSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
