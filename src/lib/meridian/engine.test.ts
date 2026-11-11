import assert from "node:assert/strict";
import { test } from "node:test";
import {
  C,
  advance,
  chooseCradle,
  chooseEar,
  endView,
  eventView,
  fmt,
  found,
  institutions,
  newGame,
  urge,
  whisper,
  whispers,
  type State,
} from "./engine.ts";
import { DILEMMAS } from "./events.ts";

/** A plain player: keeps the realm fed and ordered, builds, teaches, rests a strained ear. */
function play(seed: number, echoes: string[] = []): State {
  const s = newGame(seed, echoes);
  chooseCradle(s, C.CRADLES[seed % C.CRADLES.length].id);
  for (let guard = 0; guard < 4000 && s.phase !== "end"; guard++) {
    if (s.phase === "choose") chooseEar(s, seed % s.candidates.length);
    else if (s.phase === "event") {
      const view = eventView(s);
      assert.ok(view, "an event phase always has an event to show");
      const best = view.options.reduce((a, o, i) => (o.odds > view.options[a].odds ? i : a), 0);
      urge(s, guard % 5 === 0 ? null : best);
    } else {
      const h = s.host;
      assert.ok(h, "a play phase always has an ear");
      const want =
        h.strain > 60 ? "rest" : s.bars.bread < 30 ? "plenty" : s.bars.order < 30 ? "mercy" : "teach";
      const build = institutions(s).find((i) => i.ok);
      if (build && h.strain < 60) found(s, build.id);
      else if (whispers(s).some((w) => w.id === want && w.ok)) whisper(s, want);
      if (s.phase === "play") advance(s);
    }
  }
  return s;
}

test("every line of play reaches an ending the content defines", () => {
  const seen = new Set<string>();
  for (let seed = 1; seed <= 60; seed++) {
    const s = play(seed);
    assert.equal(s.phase, "end", `seed ${seed} never ended`);
    const view = endView(s);
    assert.ok(view && s.end);
    const known = s.end.kind === "birth" ? C.BIRTH_ORDER : C.END_ORDER;
    assert.ok(known.includes(s.end.id), `unknown ending ${s.end.id}`);
    for (const para of view.text) assert.doesNotMatch(para, /\{\w+\}/, "unfilled token in an ending");
    seen.add(s.end.id);
  }
  assert.ok(seen.size >= 3, `only saw ${[...seen].join(", ")}`);
});

test("the same seed plays the same history", () => {
  const a = play(7);
  const b = play(7);
  assert.deepEqual(a.end, b.end);
  assert.equal(a.year, b.year);
  assert.equal(a.log.length, b.log.length);
});

test("no line of the chronicle leaves a token unfilled", () => {
  for (let seed = 100; seed < 130; seed++) {
    for (const line of play(seed).log) {
      assert.doesNotMatch(line.t, /\{\w+\}/, `seed ${seed}: ${line.t}`);
      assert.doesNotMatch(line.t, /undefined|NaN/, `seed ${seed}: ${line.t}`);
    }
  }
});

test("every dilemma reads cleanly in every era it can appear", () => {
  const s = newGame(3);
  chooseCradle(s, "river");
  chooseEar(s, 0);
  for (const d of DILEMMAS) {
    for (let era = d.min ?? 0; era <= (d.max ?? 6); era++) {
      s.era = era;
      s.phase = "event";
      s.event = { id: d.id, rival: s.rivals[0].id };
      const view = eventView(s);
      assert.ok(view);
      assert.equal(view.options.length, 3);
      for (const text of [view.text, ...view.options.map((o) => o.label)]) {
        assert.doesNotMatch(text, /\{\w+\}/, `${d.id} in era ${era}: ${text}`);
      }
      for (const c of d.o) {
        for (const tag of c.tags) {
          const used = C.TRAIT_IDS.some(
            (id) => C.TRAITS[id].likes.includes(tag) || C.TRAITS[id].dis.includes(tag),
          );
          assert.ok(used, `${d.id}: no trait cares about "${tag}"`);
        }
      }
    }
  }
});

test("tokens take their case from the token and from where they stand", () => {
  const s = newGame(1);
  chooseCradle(s, "coast");
  chooseEar(s, 1);
  assert.equal(fmt(s, "{H} waits. {S} trusts {priests}."), "Kael waits. He trusts the priests.");
  assert.equal(fmt(s, "{R} hold {city} now.", { R: "the Ashen" }), "The Ashen hold Aluna now.");
});

test("a save resumes exactly where it stopped", () => {
  const s = newGame(11);
  chooseCradle(s, "high");
  chooseEar(s, 2);
  for (let i = 0; i < 6; i++) {
    if (s.phase === "event") urge(s, 0);
    else if (s.phase === "play") advance(s);
  }
  const copy = JSON.parse(JSON.stringify(s)) as State;
  for (const g of [s, copy]) {
    for (let i = 0; i < 12; i++) {
      if (g.phase === "event") urge(g, 1);
      else if (g.phase === "play") advance(g);
      else if (g.phase === "choose") chooseEar(g, 0);
    }
  }
  assert.deepEqual(copy, s);
});
