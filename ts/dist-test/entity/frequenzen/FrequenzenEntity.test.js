"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('FrequenzenEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when PASSANTENFREQUENZEN_ZUERICH_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('PASSANTENFREQUENZEN_ZUERICH_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.PassantenfrequenzenZuerichSDK.test();
        const ent = testsdk.Frequenzen();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.PASSANTENFREQUENZEN_ZUERICH_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'frequenzen.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "age_group", "req": false, "short": "Altersgruppe", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "count", "req": false, "short": "Anzahl gezählter Passanten", "type": "`$INTEGER`", "index$": 1 }, { "active": true, "name": "direction", "req": false, "short": "Laufrichtung der Passanten", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "location", "req": false, "short": "Name des Messgebiets", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "temperature", "req": false, "short": "Temperatur in Grad Celsius", "type": "`$NUMBER`", "index$": 4 }, { "active": true, "format": "date-time", "name": "timestamp", "req": false, "short": "Zeitpunkt der Messung in UTC (ISO 8601)", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "weather", "req": false, "short": "Wetterbedingungen während der Messung", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "zone", "req": false, "short": "Zone (1-3 für Bürgersteigseiten/Mitte, 99 für nicht zuordenbar)", "type": "`$INTEGER`", "index$": 7 }], "name": "frequenzen", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "2023-12-31T23:59:59Z", "kind": "query", "name": "end_date", "orig": "end_date", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "location", "orig": "location", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": "2023-01-01T00:00:00Z", "kind": "query", "name": "start_date", "orig": "start_date", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "kind": "query", "name": "zone", "orig": "zone", "reqd": false, "type": "`$INTEGER`", "index$": 3 }] }, "contract": { "id": "GET /dataset/hystreet_fussgaengerfrequenzen/download/hystreet_fussgaengerfrequenzen_seit2021.csv", "json": "{\"operationId\":\"getPedestrianFrequencies\",\"parameters\":[{\"description\":\"Startdatum für den Abfragezeitraum (ISO 8601 Format, UTC)\",\"in\":\"query\",\"name\":\"start_date\",\"required\":false,\"schema\":{\"example\":\"2023-01-01T00:00:00Z\",\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"Enddatum für den Abfragezeitraum (ISO 8601 Format, UTC)\",\"in\":\"query\",\"name\":\"end_date\",\"required\":false,\"schema\":{\"example\":\"2023-12-31T23:59:59Z\",\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"Filtert nach spezifischem Messgebiet\",\"in\":\"query\",\"name\":\"location\",\"required\":false,\"schema\":{\"enum\":[\"Bahnhofstrasse (Nord)\",\"Bahnhofstrasse (Mitte)\",\"Bahnhofstrasse (Süd)\",\"Lintheschergasse\"],\"type\":\"string\"}},{\"description\":\"Filtert nach Zone (1, 2, 3 oder 99 für nicht zuordenbar)\",\"in\":\"query\",\"name\":\"zone\",\"required\":false,\"schema\":{\"enum\":[1,2,3,99],\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"age_group\":{\"description\":\"Altersgruppe\",\"enum\":[\"Erwachsene\",\"Kinder\"],\"example\":\"Erwachsene\",\"type\":\"string\"},\"count\":{\"description\":\"Anzahl gezählter Passanten\",\"example\":245,\"type\":\"integer\"},\"direction\":{\"description\":\"Laufrichtung der Passanten\",\"enum\":[\"Bürkliplatz\",\"Hauptbahnhof\"],\"example\":\"Hauptbahnhof\",\"type\":\"string\"},\"location\":{\"description\":\"Name des Messgebiets\",\"example\":\"Bahnhofstrasse (Nord)\",\"type\":\"string\"},\"temperature\":{\"description\":\"Temperatur in Grad Celsius\",\"example\":22.5,\"type\":\"number\"},\"timestamp\":{\"description\":\"Zeitpunkt der Messung in UTC (ISO 8601)\",\"example\":\"2023-06-15T14:00:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"weather\":{\"description\":\"Wetterbedingungen während der Messung\",\"example\":\"sonnig\",\"type\":\"string\"},\"zone\":{\"description\":\"Zone (1-3 für Bürgersteigseiten/Mitte, 99 für nicht zuordenbar)\",\"example\":1,\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"text/csv\":{\"schema\":{\"description\":\"CSV-Datei mit Passantenfrequenzen\",\"type\":\"string\"}}},\"description\":\"Erfolgreiche Antwort mit Frequenzdaten\"},\"400\":{\"description\":\"Ungültige Anfrageparameter\"},\"404\":{\"description\":\"Ressource nicht gefunden\"},\"500\":{\"description\":\"Interner Serverfehler\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/dataset/hystreet_fussgaengerfrequenzen/download/hystreet_fussgaengerfrequenzen_seit2021.csv", "segments": [{ "lit": "dataset" }, { "lit": "hystreet_fussgaengerfrequenzen" }, { "lit": "download" }, { "lit": "hystreet_fussgaengerfrequenzen_seit2021.csv" }], "select": { "exist": ["end_date", "location", "start_date", "zone"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "frequenzen", "name__orig": "frequenzen", "Name": "Frequenzen", "name_": "frequenzen", "name-": "frequenzen", "NAME": "FREQUENZEN", "index$": 0 }, { "active": true, "entity": "frequenzen", "key$": "BasicFrequenzenFlow", "kind": "basic", "name": "BasicFrequenzenFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "frequenzen_ref01" } }], "index$": 0 }] }, 'Frequenzen');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let frequenzen_ref01_data = Object.values(setup.data.existing.frequenzen)[0];
        // LIST
        const frequenzen_ref01_ent = client.Frequenzen();
        const frequenzen_ref01_match = {};
        const frequenzen_ref01_list = (await frequenzen_ref01_ent.list(frequenzen_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/frequenzen/FrequenzenTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.PassantenfrequenzenZuerichSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['frequenzen01', 'frequenzen02', 'frequenzen03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'PASSANTENFREQUENZEN_ZUERICH_TEST_FREQUENZEN_ENTID': idmap,
        'PASSANTENFREQUENZEN_ZUERICH_TEST_LIVE': 'FALSE',
        'PASSANTENFREQUENZEN_ZUERICH_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['PASSANTENFREQUENZEN_ZUERICH_TEST_FREQUENZEN_ENTID'];
    const live = 'TRUE' === env.PASSANTENFREQUENZEN_ZUERICH_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['PASSANTENFREQUENZEN_ZUERICH_TEST_FREQUENZEN_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.PassantenfrequenzenZuerichSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=FrequenzenEntity.test.js.map