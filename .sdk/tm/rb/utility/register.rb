# PassantenfrequenzenZuerich SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

PassantenfrequenzenZuerichUtility.registrar = ->(u) {
  u.clean = PassantenfrequenzenZuerichUtilities::Clean
  u.done = PassantenfrequenzenZuerichUtilities::Done
  u.make_error = PassantenfrequenzenZuerichUtilities::MakeError
  u.feature_add = PassantenfrequenzenZuerichUtilities::FeatureAdd
  u.feature_hook = PassantenfrequenzenZuerichUtilities::FeatureHook
  u.feature_init = PassantenfrequenzenZuerichUtilities::FeatureInit
  u.fetcher = PassantenfrequenzenZuerichUtilities::Fetcher
  u.make_fetch_def = PassantenfrequenzenZuerichUtilities::MakeFetchDef
  u.make_context = PassantenfrequenzenZuerichUtilities::MakeContext
  u.make_options = PassantenfrequenzenZuerichUtilities::MakeOptions
  u.make_request = PassantenfrequenzenZuerichUtilities::MakeRequest
  u.make_response = PassantenfrequenzenZuerichUtilities::MakeResponse
  u.make_result = PassantenfrequenzenZuerichUtilities::MakeResult
  u.make_point = PassantenfrequenzenZuerichUtilities::MakePoint
  u.make_spec = PassantenfrequenzenZuerichUtilities::MakeSpec
  u.make_url = PassantenfrequenzenZuerichUtilities::MakeUrl
  u.param = PassantenfrequenzenZuerichUtilities::Param
  u.prepare_auth = PassantenfrequenzenZuerichUtilities::PrepareAuth
  u.prepare_body = PassantenfrequenzenZuerichUtilities::PrepareBody
  u.prepare_headers = PassantenfrequenzenZuerichUtilities::PrepareHeaders
  u.prepare_method = PassantenfrequenzenZuerichUtilities::PrepareMethod
  u.prepare_params = PassantenfrequenzenZuerichUtilities::PrepareParams
  u.prepare_path = PassantenfrequenzenZuerichUtilities::PreparePath
  u.prepare_query = PassantenfrequenzenZuerichUtilities::PrepareQuery
  u.result_basic = PassantenfrequenzenZuerichUtilities::ResultBasic
  u.result_body = PassantenfrequenzenZuerichUtilities::ResultBody
  u.result_headers = PassantenfrequenzenZuerichUtilities::ResultHeaders
  u.transform_request = PassantenfrequenzenZuerichUtilities::TransformRequest
  u.transform_response = PassantenfrequenzenZuerichUtilities::TransformResponse
}
