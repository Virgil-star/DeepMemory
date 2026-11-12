"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { test } = require("node:test");
const { createStore } = require("./storage.cjs");

const fresh = () => createStore(fs.mkdtempSync(path.join(os.tmpdir(), "meridian-saves-")));

test("a value written is the value read", () => {
  const store = fresh();
  assert.equal(store.read("meridian.save.v2"), null);
  assert.equal(store.write("meridian.save.v2", '{"year":-3000}'), true);
  assert.equal(store.read("meridian.save.v2"), '{"year":-3000}');
});

test("a damaged save falls back to the copy before it", () => {
  const store = fresh();
  store.write("meridian.save.v2", '{"turn":1}');
  store.write("meridian.save.v2", '{"turn":2}');
  fs.writeFileSync(path.join(store.dir, "meridian.save.v2.json"), '{"turn":3');
  assert.equal(store.read("meridian.save.v2"), '{"turn":1}');
});

test("anything that is not JSON is refused and the old save stays", () => {
  const store = fresh();
  store.write("meridian.meta.v1", '{"points":40}');
  assert.equal(store.write("meridian.meta.v1", "not json"), false);
  assert.equal(store.read("meridian.meta.v1"), '{"points":40}');
});

test("keys cannot reach outside the save folder", () => {
  const store = fresh();
  for (const key of ["../escape", "a/b", "", "UPPER", ".hidden", "x".repeat(80)]) {
    assert.throws(() => store.write(key, "{}"), /bad save key/, key);
    assert.throws(() => store.read(key), /bad save key/, key);
  }
});

test("no temporary files are left behind", () => {
  const store = fresh();
  for (let i = 0; i < 5; i++) store.write("meridian.save.v2", JSON.stringify({ i }));
  assert.deepEqual(fs.readdirSync(store.dir).sort(), [
    "meridian.save.v2.json",
    "meridian.save.v2.json.bak",
  ]);
});
