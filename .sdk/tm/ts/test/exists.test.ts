
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { PassantenfrequenzenZuerichSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await PassantenfrequenzenZuerichSDK.test()
    equal(null !== testsdk, true)
  })

})
