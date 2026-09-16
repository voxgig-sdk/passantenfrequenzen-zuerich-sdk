

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('FrequenzenEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PASSANTENFREQUENZEN_ZUERICH_TEST_LIVE=TRUE.
  afterEach(liveDelay('PASSANTENFREQUENZEN_ZUERICH_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PassantenfrequenzenZuerichSDK.test()
    const ent = testsdk.Frequenzen()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PASSANTENFREQUENZEN_ZUERICH_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'frequenzen.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"age_group","req":false,"short":"Altersgruppe","type":"`$STRING`","index$":0},{"active":true,"name":"count","req":false,"short":"Anzahl gezählter Passanten","type":"`$INTEGER`","index$":1},{"active":true,"name":"direction","req":false,"short":"Laufrichtung der Passanten","type":"`$STRING`","index$":2},{"active":true,"name":"location","req":false,"short":"Name des Messgebiets","type":"`$STRING`","index$":3},{"active":true,"name":"temperature","req":false,"short":"Temperatur in Grad Celsius","type":"`$NUMBER`","index$":4},{"active":true,"format":"date-time","name":"timestamp","req":false,"short":"Zeitpunkt der Messung in UTC (ISO 8601)","type":"`$STRING`","index$":5},{"active":true,"name":"weather","req":false,"short":"Wetterbedingungen während der Messung","type":"`$STRING`","index$":6},{"active":true,"name":"zone","req":false,"short":"Zone (1-3 für Bürgersteigseiten/Mitte, 99 für nicht zuordenbar)","type":"`$INTEGER`","index$":7}],"name":"frequenzen","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"2023-12-31T23:59:59Z","kind":"query","name":"end_date","orig":"end_date","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"location","orig":"location","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":"2023-01-01T00:00:00Z","kind":"query","name":"start_date","orig":"start_date","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"zone","orig":"zone","reqd":false,"type":"`$INTEGER`","index$":3}]},"contract":{"id":"GET /dataset/hystreet_fussgaengerfrequenzen/download/hystreet_fussgaengerfrequenzen_seit2021.csv","json":"{\"operationId\":\"getPedestrianFrequencies\",\"parameters\":[{\"description\":\"Startdatum für den Abfragezeitraum (ISO 8601 Format, UTC)\",\"in\":\"query\",\"name\":\"start_date\",\"required\":false,\"schema\":{\"example\":\"2023-01-01T00:00:00Z\",\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"Enddatum für den Abfragezeitraum (ISO 8601 Format, UTC)\",\"in\":\"query\",\"name\":\"end_date\",\"required\":false,\"schema\":{\"example\":\"2023-12-31T23:59:59Z\",\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"Filtert nach spezifischem Messgebiet\",\"in\":\"query\",\"name\":\"location\",\"required\":false,\"schema\":{\"enum\":[\"Bahnhofstrasse (Nord)\",\"Bahnhofstrasse (Mitte)\",\"Bahnhofstrasse (Süd)\",\"Lintheschergasse\"],\"type\":\"string\"}},{\"description\":\"Filtert nach Zone (1, 2, 3 oder 99 für nicht zuordenbar)\",\"in\":\"query\",\"name\":\"zone\",\"required\":false,\"schema\":{\"enum\":[1,2,3,99],\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"age_group\":{\"description\":\"Altersgruppe\",\"enum\":[\"Erwachsene\",\"Kinder\"],\"example\":\"Erwachsene\",\"type\":\"string\"},\"count\":{\"description\":\"Anzahl gezählter Passanten\",\"example\":245,\"type\":\"integer\"},\"direction\":{\"description\":\"Laufrichtung der Passanten\",\"enum\":[\"Bürkliplatz\",\"Hauptbahnhof\"],\"example\":\"Hauptbahnhof\",\"type\":\"string\"},\"location\":{\"description\":\"Name des Messgebiets\",\"example\":\"Bahnhofstrasse (Nord)\",\"type\":\"string\"},\"temperature\":{\"description\":\"Temperatur in Grad Celsius\",\"example\":22.5,\"type\":\"number\"},\"timestamp\":{\"description\":\"Zeitpunkt der Messung in UTC (ISO 8601)\",\"example\":\"2023-06-15T14:00:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"weather\":{\"description\":\"Wetterbedingungen während der Messung\",\"example\":\"sonnig\",\"type\":\"string\"},\"zone\":{\"description\":\"Zone (1-3 für Bürgersteigseiten/Mitte, 99 für nicht zuordenbar)\",\"example\":1,\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"text/csv\":{\"schema\":{\"description\":\"CSV-Datei mit Passantenfrequenzen\",\"type\":\"string\"}}},\"description\":\"Erfolgreiche Antwort mit Frequenzdaten\"},\"400\":{\"description\":\"Ungültige Anfrageparameter\"},\"404\":{\"description\":\"Ressource nicht gefunden\"},\"500\":{\"description\":\"Interner Serverfehler\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/dataset/hystreet_fussgaengerfrequenzen/download/hystreet_fussgaengerfrequenzen_seit2021.csv","segments":[{"lit":"dataset"},{"lit":"hystreet_fussgaengerfrequenzen"},{"lit":"download"},{"lit":"hystreet_fussgaengerfrequenzen_seit2021.csv"}],"select":{"exist":["end_date","location","start_date","zone"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"frequenzen","name__orig":"frequenzen","Name":"Frequenzen","name_":"frequenzen","name-":"frequenzen","NAME":"FREQUENZEN","index$":0}, {"active":true,"entity":"frequenzen","key$":"BasicFrequenzenFlow","kind":"basic","name":"BasicFrequenzenFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"frequenzen_ref01"}}],"index$":0}]}, 'Frequenzen')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let frequenzen_ref01_data = Object.values(setup.data.existing.frequenzen)[0] as any

    // LIST
    const frequenzen_ref01_ent = client.Frequenzen()
    const frequenzen_ref01_match: any = {}

    const frequenzen_ref01_list = (await frequenzen_ref01_ent.list(frequenzen_ref01_match)).map((e: any) => e.data())


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

  const env = envOverride({
    'PASSANTENFREQUENZEN_ZUERICH_TEST_FREQUENZEN_ENTID': idmap,
    'PASSANTENFREQUENZEN_ZUERICH_TEST_LIVE': 'FALSE',
    'PASSANTENFREQUENZEN_ZUERICH_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PASSANTENFREQUENZEN_ZUERICH_TEST_FREQUENZEN_ENTID']

  const live = 'TRUE' === env.PASSANTENFREQUENZEN_ZUERICH_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PASSANTENFREQUENZEN_ZUERICH_TEST_FREQUENZEN_ENTID']
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
  
