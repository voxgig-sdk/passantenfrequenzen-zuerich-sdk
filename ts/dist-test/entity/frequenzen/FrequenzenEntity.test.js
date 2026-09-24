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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "age_group": { "a": true, "h": "Age Group", "n": "age_group", "r": false, "sh": "Altersgruppe", "t": "`$STRING`", "key$": "age_group", "index$": 0 }, "count": { "a": true, "h": "Count", "n": "count", "r": false, "sh": "Anzahl gezählter Passanten", "t": "`$INTEGER`", "key$": "count", "index$": 1 }, "direction": { "a": true, "h": "Direction", "n": "direction", "r": false, "sh": "Laufrichtung der Passanten", "t": "`$STRING`", "key$": "direction", "index$": 2 }, "location": { "a": true, "h": "Location", "n": "location", "r": false, "sh": "Name des Messgebiets", "t": "`$STRING`", "key$": "location", "index$": 3 }, "temperature": { "a": true, "h": "Temperature", "n": "temperature", "r": false, "sh": "Temperatur in Grad Celsius", "t": "`$NUMBER`", "key$": "temperature", "index$": 4 }, "timestamp": { "a": true, "fo": "date-time", "h": "Timestamp", "n": "timestamp", "r": false, "sh": "Zeitpunkt der Messung in UTC (ISO 8601)", "t": "`$STRING`", "key$": "timestamp", "index$": 5 }, "weather": { "a": true, "h": "Weather", "n": "weather", "r": false, "sh": "Wetterbedingungen während der Messung", "t": "`$STRING`", "key$": "weather", "index$": 6 }, "zone": { "a": true, "h": "Zone", "n": "zone", "r": false, "sh": "Zone (1-3 für Bürgersteigseiten/Mitte, 99 für nicht zuordenbar)", "t": "`$INTEGER`", "key$": "zone", "index$": 7 } }, "name": "frequenzen", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /dataset/hystreet_fussgaengerfrequenzen/download/hystreet_fussgaengerfrequenzen_seit2021.csv", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "2023-12-31T23:59:59Z", "k": "query", "n": "end_date", "or": "end_date", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "location", "or": "location", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "2023-01-01T00:00:00Z", "k": "query", "n": "start_date", "or": "start_date", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "zone", "or": "zone", "r": false, "t": "`$INTEGER`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/dataset/hystreet_fussgaengerfrequenzen/download/hystreet_fussgaengerfrequenzen_seit2021.csv", "q": { "exist": ["end_date", "location", "start_date", "zone"] }, "r": {}, "s": [{ "lit": "dataset" }, { "lit": "hystreet_fussgaengerfrequenzen" }, { "lit": "download" }, { "lit": "hystreet_fussgaengerfrequenzen_seit2021.csv" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "frequenzen", "name__orig": "frequenzen", "Name": "Frequenzen", "name_": "frequenzen", "name-": "frequenzen", "NAME": "FREQUENZEN", "index$": 0 }, { "active": true, "entity": "frequenzen", "key$": "BasicFrequenzenFlow", "kind": "basic", "name": "BasicFrequenzenFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "frequenzen_ref01" } }], "index$": 0 }] }, 'Frequenzen', { "GET /dataset/hystreet_fussgaengerfrequenzen/download/hystreet_fussgaengerfrequenzen_seit2021.csv": { "protocol": "http", "operationId": "getPedestrianFrequencies", "responses": { "200": { "description": "Erfolgreiche Antwort mit Frequenzdaten", "content": { "text/csv": { "schema": { "type": "string", "description": "CSV-Datei mit Passantenfrequenzen" } }, "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "timestamp": { "type": "string", "format": "date-time", "description": "Zeitpunkt der Messung in UTC (ISO 8601)", "example": "2023-06-15T14:00:00Z", "key$": "timestamp" }, "location": { "type": "string", "description": "Name des Messgebiets", "example": "Bahnhofstrasse (Nord)", "key$": "location" }, "zone": { "type": "integer", "description": "Zone (1-3 für Bürgersteigseiten/Mitte, 99 für nicht zuordenbar)", "example": 1, "key$": "zone" }, "direction": { "type": "string", "description": "Laufrichtung der Passanten", "enum": ["Bürkliplatz", "Hauptbahnhof"], "example": "Hauptbahnhof", "key$": "direction" }, "age_group": { "type": "string", "description": "Altersgruppe", "enum": ["Erwachsene", "Kinder"], "example": "Erwachsene", "key$": "age_group" }, "count": { "type": "integer", "description": "Anzahl gezählter Passanten", "example": 245, "key$": "count" }, "weather": { "type": "string", "description": "Wetterbedingungen während der Messung", "example": "sonnig", "key$": "weather" }, "temperature": { "type": "number", "description": "Temperatur in Grad Celsius", "example": 22.5, "key$": "temperature" } }, "index$": 0 } } } } }, "400": { "description": "Ungültige Anfrageparameter" }, "404": { "description": "Ressource nicht gefunden" }, "500": { "description": "Interner Serverfehler" } }, "parameters": [{ "name": "start_date", "in": "query", "description": "Startdatum für den Abfragezeitraum (ISO 8601 Format, UTC)", "required": false, "schema": { "type": "string", "format": "date-time", "example": "2023-01-01T00:00:00Z" }, "index$": 0 }, { "name": "end_date", "in": "query", "description": "Enddatum für den Abfragezeitraum (ISO 8601 Format, UTC)", "required": false, "schema": { "type": "string", "format": "date-time", "example": "2023-12-31T23:59:59Z" }, "index$": 1 }, { "name": "location", "in": "query", "description": "Filtert nach spezifischem Messgebiet", "required": false, "schema": { "type": "string", "enum": ["Bahnhofstrasse (Nord)", "Bahnhofstrasse (Mitte)", "Bahnhofstrasse (Süd)", "Lintheschergasse"] }, "index$": 2 }, { "name": "zone", "in": "query", "description": "Filtert nach Zone (1, 2, 3 oder 99 für nicht zuordenbar)", "required": false, "schema": { "type": "integer", "enum": [1, 2, 3, 99] }, "index$": 3 }], "securitySource": "unspecified" } });
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