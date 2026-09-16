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
(0, node_test_1.describe)('StandorteEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when PASSANTENFREQUENZEN_ZUERICH_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('PASSANTENFREQUENZEN_ZUERICH_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.PassantenfrequenzenZuerichSDK.test();
        const ent = testsdk.Standorte();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.PASSANTENFREQUENZEN_ZUERICH_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'standorte.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "geometry", "req": false, "type": "`$OBJECT`", "index$": 0 }, { "active": true, "name": "properties", "req": false, "type": "`$OBJECT`", "index$": 1 }, { "active": true, "name": "type", "req": false, "type": "`$STRING`", "index$": 2 }], "name": "standorte", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /dataset/hystreet_fussgaengerfrequenzen/download/hystreet_locations.json", "json": "{\"operationId\":\"getLocations\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"features\":{\"items\":{\"properties\":{\"geometry\":{\"properties\":{\"coordinates\":{\"items\":{\"type\":\"number\"},\"maxItems\":2,\"minItems\":2,\"type\":\"array\"},\"type\":{\"example\":\"Point\",\"type\":\"string\"}},\"type\":\"object\"},\"properties\":{\"properties\":{\"location_id\":{\"description\":\"Eindeutige ID des Standorts\",\"type\":\"string\"},\"name\":{\"description\":\"Name des Messgebiets\",\"example\":\"Bahnhofstrasse (Nord)\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"example\":\"Feature\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"type\":{\"example\":\"FeatureCollection\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Erfolgreiche Antwort mit Standortdaten\"},\"404\":{\"description\":\"Ressource nicht gefunden\"},\"500\":{\"description\":\"Interner Serverfehler\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/dataset/hystreet_fussgaengerfrequenzen/download/hystreet_locations.json", "segments": [{ "lit": "dataset" }, { "lit": "hystreet_fussgaengerfrequenzen" }, { "lit": "download" }, { "lit": "hystreet_locations.json" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.features`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "standorte", "name__orig": "standorte", "Name": "Standorte", "name_": "standorte", "name-": "standorte", "NAME": "STANDORTE", "index$": 1 }, { "active": true, "entity": "standorte", "key$": "BasicStandorteFlow", "kind": "basic", "name": "BasicStandorteFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "standorte_ref01" } }], "index$": 0 }] }, 'Standorte');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let standorte_ref01_data = Object.values(setup.data.existing.standorte)[0];
        // LIST
        const standorte_ref01_ent = client.Standorte();
        const standorte_ref01_match = {};
        const standorte_ref01_list = (await standorte_ref01_ent.list(standorte_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/standorte/StandorteTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.PassantenfrequenzenZuerichSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['standorte01', 'standorte02', 'standorte03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'PASSANTENFREQUENZEN_ZUERICH_TEST_STANDORTE_ENTID': idmap,
        'PASSANTENFREQUENZEN_ZUERICH_TEST_LIVE': 'FALSE',
        'PASSANTENFREQUENZEN_ZUERICH_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['PASSANTENFREQUENZEN_ZUERICH_TEST_STANDORTE_ENTID'];
    const live = 'TRUE' === env.PASSANTENFREQUENZEN_ZUERICH_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['PASSANTENFREQUENZEN_ZUERICH_TEST_STANDORTE_ENTID'];
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
//# sourceMappingURL=StandorteEntity.test.js.map