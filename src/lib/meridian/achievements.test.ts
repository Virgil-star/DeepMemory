import assert from "node:assert/strict";
import { test } from "node:test";
import { ACHIEVEMENTS, newlyEarned, satisfied } from "./achievements.ts";
import { C, advance, chooseCradle, chooseEar, newGame, urge, type State } from "./engine.ts";

const nothing = { seen: [], echoes: [] };

function started(): State {
  const s = newGame(21);
  chooseCradle(s, "river");
  chooseEar(s, 0);
  return s;
}

test("ids are unique, and shaped the way Steam API names must be", () => {
  const ids = ACHIEVEMENTS.map((a) => a.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.match(id, /^ACH_[A-Z_]{1,40}$/);
});

test("every waking has an achievement of its own", () => {
  for (const id of C.BIRTH_ORDER) {
    assert.ok(
      ACHIEVEMENTS.some((a) => a.id === `ACH_${id.toUpperCase()}`),
      id,
    );
  }
});

test("nothing is earned before a line begins", () => {
  assert.deepEqual(satisfied(null, nothing), []);
  assert.deepEqual(satisfied(newGame(1), nothing), []);
});

test("being heard is the first thing earned, and only once", () => {
  const s = started();
  const first = newlyEarned(s, nothing, []);
  assert.deepEqual(
    first.map((a) => a.id),
    ["ACH_FIRST_WORD"],
  );
  assert.deepEqual(newlyEarned(s, nothing, ["ACH_FIRST_WORD"]), []);
});

test("an echo granary does not count as founding something", () => {
  const s = newGame(5, ["granary"]);
  chooseCradle(s, "coast");
  chooseEar(s, 0);
  assert.ok(s.inst.includes("granary"));
  assert.ok(!satisfied(s, nothing).includes("ACH_FOUNDER"));
});

test("a waking earns its own name, and the clean-hands pair only if they are true", () => {
  const s = started();
  s.era = 6;
  s.end = { kind: "birth", id: "shepherd", high: true, rival: null };
  s.phase = "end";
  s.stats.signs = 2;
  const got = satisfied(s, nothing);
  assert.ok(got.includes("ACH_SHEPHERD"));
  assert.ok(got.includes("ACH_CONVERGENCE"));
  assert.ok(got.includes("ACH_NO_FEAR"));
  assert.ok(!got.includes("ACH_NO_SIGNS"));
});

test("a broken line earns no waking", () => {
  const s = started();
  s.end = { kind: "end", id: "hunger", high: false, rival: null };
  s.phase = "end";
  const got = satisfied(s, nothing);
  assert.ok(!got.some((id) => /SOVEREIGN|IDOL|ENGINE|SHEPHERD|MERIDIAN|NO_SIGNS|NO_FEAR/.test(id)));
});

test("the collections complete from the record, with or without a line in play", () => {
  const all = { seen: [...C.BIRTH_ORDER, ...C.END_ORDER], echoes: C.ECHOES.map((e) => e.id) };
  assert.deepEqual(satisfied(null, all).sort(), ["ACH_ALL_ENDS", "ACH_ALL_WAKINGS", "ACH_ECHOES"]);
  const almost = { seen: C.BIRTH_ORDER.slice(1), echoes: [] };
  assert.deepEqual(satisfied(null, almost), []);
});

test("play itself moves the record: stats only ever count up", () => {
  const s = started();
  let last = { ...s.stats };
  for (let i = 0; i < 400 && s.phase !== "end"; i++) {
    if (s.phase === "event") urge(s, i % 3);
    else if (s.phase === "play") advance(s);
    else if (s.phase === "choose") chooseEar(s, 0);
    for (const key of Object.keys(last) as (keyof typeof last)[]) {
      assert.ok(s.stats[key] >= last[key], key);
    }
    last = { ...s.stats };
  }
  assert.ok(s.ears >= 2, "a line this long outlives its first ear");
});

test("the Steamworks table lists exactly the achievements the game can send", async () => {
  const { readFileSync } = await import("node:fs");
  const table = readFileSync(
    new URL("../../../desktop/steam/achievements.md", import.meta.url),
    "utf8",
  );
  const listed = [...table.matchAll(/^\|\s*`(ACH_[A-Z_]+)`\s*\|/gm)].map((m) => m[1]);
  assert.deepEqual(
    listed,
    ACHIEVEMENTS.map((a) => a.id),
  );
});

test("the Steam import files and icons cover every achievement, in order", async () => {
  const { existsSync, readFileSync, readdirSync } = await import("node:fs");
  const steam = new URL("../../../desktop/steam/", import.meta.url);
  const lines = (name: string) =>
    readFileSync(new URL(name, steam), "utf8").trim().split(/\r?\n/).slice(1);
  const glyphs = JSON.parse(readFileSync(new URL("achievement-icons.json", steam), "utf8"));

  const definitions = lines("achievements-definitions.csv").map((row) => row.split(","));
  assert.deepEqual(
    definitions.map((row) => row[0]),
    ACHIEVEMENTS.map((a) => a.id),
  );
  ACHIEVEMENTS.forEach((a, i) => {
    assert.equal(definitions[i][2], "Client");
    assert.equal(definitions[i][3], a.hidden ? "true" : "false", `${a.id} spoiler`);
  });

  const text = lines("achievements-localization.csv");
  assert.equal(text.length, ACHIEVEMENTS.length * 2);
  const quoted = (value: string) => (/[",]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value);
  ACHIEVEMENTS.forEach((a, i) => {
    assert.equal(text[i * 2], `${a.id},name,${quoted(a.n)}`);
    assert.equal(text[i * 2 + 1], `${a.id},description,${quoted(a.d)}`);
    assert.ok(glyphs[a.id], `${a.id} has no icon glyph`);
    for (const state of ["ACHIEVED", "UNACHIEVED"]) {
      assert.ok(
        existsSync(new URL(`achievement-icons/${a.id}_${state}.png`, steam)),
        `${a.id}_${state}.png`,
      );
    }
  });
  assert.equal(Object.keys(glyphs).length, ACHIEVEMENTS.length);
  assert.equal(readdirSync(new URL("achievement-icons/", steam)).length, ACHIEVEMENTS.length * 2);
});
