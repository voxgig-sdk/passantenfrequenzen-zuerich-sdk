<?php
declare(strict_types=1);

// Standorte entity test

require_once __DIR__ . '/../passantenfrequenzenzuerich_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class StandorteEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = PassantenfrequenzenZuerichSDK::test(null, null);
        $ent = $testsdk->Standorte(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = standorte_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "standorte." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set PASSANTENFREQUENZENZUERICH_TEST_STANDORTE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $standorte_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.standorte")));
        $standorte_ref01_data = null;
        if (count($standorte_ref01_data_raw) > 0) {
            $standorte_ref01_data = Helpers::to_map($standorte_ref01_data_raw[0][1]);
        }

        // LIST
        $standorte_ref01_ent = $client->Standorte(null);
        $standorte_ref01_match = [];

        [$standorte_ref01_list_result, $err] = $standorte_ref01_ent->list($standorte_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($standorte_ref01_list_result);

    }
}

function standorte_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/standorte/StandorteTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = PassantenfrequenzenZuerichSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["standorte01", "standorte02", "standorte03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("PASSANTENFREQUENZENZUERICH_TEST_STANDORTE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "PASSANTENFREQUENZENZUERICH_TEST_STANDORTE_ENTID" => $idmap,
        "PASSANTENFREQUENZENZUERICH_TEST_LIVE" => "FALSE",
        "PASSANTENFREQUENZENZUERICH_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["PASSANTENFREQUENZENZUERICH_TEST_STANDORTE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["PASSANTENFREQUENZENZUERICH_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new PassantenfrequenzenZuerichSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["PASSANTENFREQUENZENZUERICH_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["PASSANTENFREQUENZENZUERICH_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
