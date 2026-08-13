# PassantenfrequenzenZuerich SDK exists test

import pytest
from passantenfrequenzenzuerich_sdk import PassantenfrequenzenZuerichSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = PassantenfrequenzenZuerichSDK.test(None, None)
        assert testsdk is not None
