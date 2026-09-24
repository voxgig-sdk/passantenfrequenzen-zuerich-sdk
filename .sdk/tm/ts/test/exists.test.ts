
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { PassantenfrequenzenZuerichSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = PassantenfrequenzenZuerichSDK.test()
    equal(testsdk instanceof PassantenfrequenzenZuerichSDK, true,
      'PassantenfrequenzenZuerichSDK.test() must return a client synchronously')
  })

})
