
import { Context } from './Context'


class PassantenfrequenzenZuerichError extends Error {

  isPassantenfrequenzenZuerichError = true

  sdk = 'PassantenfrequenzenZuerich'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  PassantenfrequenzenZuerichError
}

