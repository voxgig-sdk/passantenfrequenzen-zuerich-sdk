# PassantenfrequenzenZuerich SDK feature factory

from passantenfrequenzenzuerich_sdk.feature.base_feature import PassantenfrequenzenZuerichBaseFeature
from passantenfrequenzenzuerich_sdk.feature.ratelimit_feature import PassantenfrequenzenZuerichRatelimitFeature
from passantenfrequenzenzuerich_sdk.feature.retry_feature import PassantenfrequenzenZuerichRetryFeature
from passantenfrequenzenzuerich_sdk.feature.test_feature import PassantenfrequenzenZuerichTestFeature
from passantenfrequenzenzuerich_sdk.feature.timeout_feature import PassantenfrequenzenZuerichTimeoutFeature


_FEATURES = {
    "base": lambda: PassantenfrequenzenZuerichBaseFeature(),
    "ratelimit": lambda: PassantenfrequenzenZuerichRatelimitFeature(),
    "retry": lambda: PassantenfrequenzenZuerichRetryFeature(),
    "test": lambda: PassantenfrequenzenZuerichTestFeature(),
    "timeout": lambda: PassantenfrequenzenZuerichTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
