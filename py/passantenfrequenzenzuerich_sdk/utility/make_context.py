# PassantenfrequenzenZuerich SDK utility: make_context

from passantenfrequenzenzuerich_sdk.core.context import PassantenfrequenzenZuerichContext


def make_context_util(ctxmap, basectx):
    return PassantenfrequenzenZuerichContext(ctxmap, basectx)
