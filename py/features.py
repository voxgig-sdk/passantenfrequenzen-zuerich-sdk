# PassantenfrequenzenZuerich SDK feature factory

from feature.base_feature import PassantenfrequenzenZuerichBaseFeature
from feature.test_feature import PassantenfrequenzenZuerichTestFeature


def _make_feature(name):
    features = {
        "base": lambda: PassantenfrequenzenZuerichBaseFeature(),
        "test": lambda: PassantenfrequenzenZuerichTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
