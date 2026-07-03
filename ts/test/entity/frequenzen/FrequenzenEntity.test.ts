
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { PassantenfrequenzenZuerichSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('FrequenzenEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PASSANTENFREQUENZENZUERICH_TEST_LIVE=TRUE.
  afterEach(liveDelay('PASSANTENFREQUENZENZUERICH_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PassantenfrequenzenZuerichSDK.test()
    const ent = testsdk.Frequenzen()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PASSANTENFREQUENZEN_ZUERICH_TEST_LIVE
    for (const op of ['list']) {
      if (maybeSkipControl(t, 'entityOp', 'frequenzen.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set PASSANTENFREQUENZEN_ZUERICH_TEST_FREQUENZEN_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let frequenzen_ref01_data = Object.values(setup.data.existing.frequenzen)[0] as any

    // LIST
    const frequenzen_ref01_ent = client.Frequenzen()
    const frequenzen_ref01_match: any = {}

    const frequenzen_ref01_list = await frequenzen_ref01_ent.list(frequenzen_ref01_match)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/frequenzen/FrequenzenTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = PassantenfrequenzenZuerichSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['frequenzen01','frequenzen02','frequenzen03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['PASSANTENFREQUENZEN_ZUERICH_TEST_FREQUENZEN_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'PASSANTENFREQUENZEN_ZUERICH_TEST_FREQUENZEN_ENTID': idmap,
    'PASSANTENFREQUENZEN_ZUERICH_TEST_LIVE': 'FALSE',
    'PASSANTENFREQUENZEN_ZUERICH_TEST_EXPLAIN': 'FALSE',
    'PASSANTENFREQUENZEN_ZUERICH_APIKEY': 'NONE',
  })

  idmap = env['PASSANTENFREQUENZEN_ZUERICH_TEST_FREQUENZEN_ENTID']

  const live = 'TRUE' === env.PASSANTENFREQUENZEN_ZUERICH_TEST_LIVE

  if (live) {
    client = new PassantenfrequenzenZuerichSDK(merge([
      {
        apikey: env.PASSANTENFREQUENZEN_ZUERICH_APIKEY,
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.PASSANTENFREQUENZEN_ZUERICH_TEST_EXPLAIN,
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
