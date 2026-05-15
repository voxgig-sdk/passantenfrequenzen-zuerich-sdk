# PassantenfrequenzenZuerich SDK utility: make_context

from core.context import PassantenfrequenzenZuerichContext


def make_context_util(ctxmap, basectx):
    return PassantenfrequenzenZuerichContext(ctxmap, basectx)
