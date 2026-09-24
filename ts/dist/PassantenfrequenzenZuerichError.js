"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassantenfrequenzenZuerichError = void 0;
class PassantenfrequenzenZuerichError extends Error {
    isPassantenfrequenzenZuerichError = true;
    sdk = 'PassantenfrequenzenZuerich';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.PassantenfrequenzenZuerichError = PassantenfrequenzenZuerichError;
//# sourceMappingURL=PassantenfrequenzenZuerichError.js.map