-- PassantenfrequenzenZuerich SDK error

local PassantenfrequenzenZuerichError = {}
PassantenfrequenzenZuerichError.__index = PassantenfrequenzenZuerichError


function PassantenfrequenzenZuerichError.new(code, msg, ctx)
  local self = setmetatable({}, PassantenfrequenzenZuerichError)
  self.is_sdk_error = true
  self.sdk = "PassantenfrequenzenZuerich"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function PassantenfrequenzenZuerichError:error()
  return self.msg
end


function PassantenfrequenzenZuerichError:__tostring()
  return self.msg
end


return PassantenfrequenzenZuerichError
