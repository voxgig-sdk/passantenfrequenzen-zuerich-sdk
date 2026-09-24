

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { PassantenfrequenzenZuerichSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('StandorteEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PASSANTENFREQUENZEN_ZUERICH_TEST_LIVE=TRUE.
  afterEach(liveDelay('PASSANTENFREQUENZEN_ZUERICH_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PassantenfrequenzenZuerichSDK.test()
    const ent = testsdk.Standorte()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PASSANTENFREQUENZEN_ZUERICH_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'standorte.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"geometry":{"a":true,"h":"Geometry","n":"geometry","r":false,"t":"`$OBJECT`","key$":"geometry","index$":0},"properties":{"a":true,"h":"Properties","n":"properties","r":false,"t":"`$OBJECT`","key$":"properties","index$":1},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$STRING`","key$":"type","index$":2}},"name":"standorte","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /dataset/hystreet_fussgaengerfrequenzen/download/hystreet_locations.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/dataset/hystreet_fussgaengerfrequenzen/download/hystreet_locations.json","q":{},"r":{},"s":[{"lit":"dataset"},{"lit":"hystreet_fussgaengerfrequenzen"},{"lit":"download"},{"lit":"hystreet_locations.json"}],"t":{"req":"`reqdata`","res":"`body.features`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"standorte","name__orig":"standorte","Name":"Standorte","name_":"standorte","name-":"standorte","NAME":"STANDORTE","index$":1}, {"active":true,"entity":"standorte","key$":"BasicStandorteFlow","kind":"basic","name":"BasicStandorteFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"standorte_ref01"}}],"index$":0}]}, 'Standorte', {"GET /dataset/hystreet_fussgaengerfrequenzen/download/hystreet_locations.json":{"protocol":"http","operationId":"getLocations","responses":{"200":{"description":"Erfolgreiche Antwort mit Standortdaten","content":{"application/json":{"schema":{"type":"object","properties":{"type":{"example":"FeatureCollection","key$":"type","type":"string"},"features":{"items":{"properties":{"geometry":{"properties":{"coordinates":{"items":{"type":"number"},"maxItems":2,"minItems":2,"type":"array"},"type":{"example":"Point","type":"string"}},"type":"object","key$":"geometry"},"properties":{"properties":{"location_id":{"description":"Eindeutige ID des Standorts","type":"string"},"name":{"description":"Name des Messgebiets","example":"Bahnhofstrasse (Nord)","type":"string"}},"type":"object","key$":"properties"},"type":{"example":"Feature","type":"string","key$":"type"}},"type":"object","index$":0},"key$":"features","type":"array"}}}}}},"404":{"description":"Ressource nicht gefunden"},"500":{"description":"Interner Serverfehler"}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let standorte_ref01_data = Object.values(setup.data.existing.standorte)[0] as any

    // LIST
    const standorte_ref01_ent = client.Standorte()
    const standorte_ref01_match: any = {}

    const standorte_ref01_list = (await standorte_ref01_ent.list(standorte_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/standorte/StandorteTestData.json')

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
    ['standorte01','standorte02','standorte03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PASSANTENFREQUENZEN_ZUERICH_TEST_STANDORTE_ENTID': idmap,
    'PASSANTENFREQUENZEN_ZUERICH_TEST_LIVE': 'FALSE',
    'PASSANTENFREQUENZEN_ZUERICH_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PASSANTENFREQUENZEN_ZUERICH_TEST_STANDORTE_ENTID']

  const live = 'TRUE' === env.PASSANTENFREQUENZEN_ZUERICH_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PASSANTENFREQUENZEN_ZUERICH_TEST_STANDORTE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new PassantenfrequenzenZuerichSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
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
    transport,
    now: Date.now(),
  }

  return setup
}
  
