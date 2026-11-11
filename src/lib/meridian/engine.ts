/* MERIDIAN — the engine. Pure state transitions over the data in content.js
   and events.ts. No DOM, no storage: the whole game is one JSON-safe State,
   with its random stream carried in `seed` so a save resumes exactly. */
import "./content.js";
import type { Bar, ByEra, Content, Fac, Fx, Gender, Gov, Strand } from "./content.js";
import { DILEMMAS, type Choice, type Dilemma } from "./events.ts";

export const C: Content = globalThis.MER.C;

export const BARS: Bar[] = ["bread", "order", "lore", "arms"];
export const STRANDS: Strand[] = ["dom", "dev", "rea", "kin"];
export const BAR_NAME: Record<Bar, string> = {
  bread: "Bread",
  order: "Order",
  lore: "Lore",
  arms: "Arms",
};
export const SIGNAL_CAP = 14;
const NEIGHBOURS = 3;
/** years a rival with no head start needs, once the Convergence opens */
const RIVAL_YEARS = 26;
const PLENTY = 65;

export interface Host {
  first: string;
  name: string;
  g: Gender;
  age: number;
  fac: Fac;
  title: string;
  traits: string[];
  trust: number;
  strain: number;
  hook: string;
  /** has been told what the voice is, and took it well */
  knows: boolean;
  truthTried: boolean;
  tenure: number;
}

export interface RivalState {
  id: string;
  rel: number;
  war: boolean;
  /** how the war is going: positive is yours */
  score: number;
}

export type LineKind = "plain" | "good" | "bad" | "voice" | "era" | "tip";
export interface Line {
  y: number;
  t: string;
  k: LineKind;
}

export interface Silence {
  obit: string;
  years: number;
  lines: string[];
}

export interface Ending {
  kind: "birth" | "end";
  id: string;
  high: boolean;
  rival: string | null;
}

/** What this line has done, for the record and for achievements. */
export interface Stats {
  founded: number;
  signs: number;
  examples: number;
  truthYes: number;
  truthNo: number;
  warsWon: number;
  seamless: number;
  longestSilence: number;
}

export type Phase = "cradle" | "choose" | "play" | "event" | "end";

export interface State {
  v: 2;
  seed: number;
  phase: Phase;
  cradle: string;
  era: number;
  prog: number;
  year: number;
  turn: number;
  /** years spent inside the Convergence, which is what the rivals race against */
  race: number;
  bars: Record<Bar, number>;
  fac: Record<Fac, { p: number; m: number }>;
  strands: Record<Strand, number>;
  autonomy: number;
  hazard: number;
  pop: number;
  roff: number;
  signal: number;
  host: Host | null;
  heir: Host | null;
  inst: string[];
  rivals: RivalState[];
  used: string[];
  event: { id: string; rival: string } | null;
  recent: string[];
  candidates: Host[];
  silence: Silence | null;
  hungry: number;
  unruly: number;
  burned: number;
  ears: number;
  unbrokenUsed: boolean;
  eraCard: number | null;
  news: Line[];
  log: Line[];
  end: Ending | null;
  echoes: string[];
  stats: Stats;
}

/* ------------------------------------------------------------- small tools */
const clamp = (v: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, v));
const cap = (t: string) => (t ? t[0].toUpperCase() + t.slice(1) : t);

function rnd(s: State): number {
  s.seed = (s.seed + 0x6d2b79f5) | 0;
  let t = s.seed;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
function pick<T>(s: State, list: T[]): T {
  return list[Math.floor(rnd(s) * list.length)];
}
function weighted(s: State, weights: number[]): number {
  const total = weights.reduce((a, b) => a + b, 0);
  let roll = rnd(s) * total;
  for (let i = 0; i < weights.length; i++) {
    roll -= weights[i];
    if (roll <= 0) return i;
  }
  return weights.length - 1;
}
const byEra = (v: ByEra, era: number) => (typeof v === "string" ? v : v[era]);

export const has = (s: State, id: string) => s.inst.includes(id);
export const cradleOf = (s: State) => C.CRADLES.find((c) => c.id === s.cradle) ?? C.CRADLES[0];
export const rivalDef = (id: string) => C.RIVALS.find((r) => r.id === id) ?? C.RIVALS[0];
const rivalName = (id: string) => "the " + rivalDef(id).stem;

export function yearLabel(y: number): string {
  const n = Math.round(y);
  return n < 0 ? `${-n} BCE` : `${n} CE`;
}

/** Fill the {tokens} of a content line for this moment in the game. */
export function fmt(
  s: State,
  text: string,
  extra: Record<string, string> = {},
  who: Host | null = s.host,
): string {
  const base: Record<string, string> = { city: cradleOf(s).city, people: cradleOf(s).people };
  if (who) {
    const f = who.g === "f";
    base.H = who.first;
    base.name = who.name;
    base.age = String(Math.floor(who.age));
    base.s = f ? "she" : "he";
    base.o = f ? "her" : "him";
    base.p = f ? "her" : "his";
  }
  return text.replace(/\{(\w+)\}/g, (whole, key: string, at: number) => {
    const starts = at === 0 || /[.!?:”"]\s+$/.test(text.slice(0, at));
    const exact = extra[key] ?? base[key];
    if (exact != null) return starts ? cap(exact) : exact;
    const lower = key.toLowerCase();
    const found = extra[lower] ?? base[lower] ?? C.LEX[lower]?.[s.era];
    if (found == null) return whole;
    return starts || key[0] !== lower[0] ? cap(found) : found;
  });
}

function say(s: State, t: string, k: LineKind = "plain"): void {
  const line = { y: s.year, t, k };
  s.news.push(line);
  if (k !== "tip") {
    s.log.push(line);
    if (s.log.length > 240) s.log.splice(0, s.log.length - 240);
  }
}

/* ------------------------------------------------------------ the realm */
export function govOf(s: State): Gov {
  const order = [...C.FAC].sort((a, b) => s.fac[b].p - s.fac[a].p);
  const top = s.fac[order[0]].p;
  return top >= 30 && top - s.fac[order[1]].p >= 5 ? order[0] : "mixed";
}
export const realmName = (s: State) => `${cradleOf(s).adj} ${C.GOV[govOf(s)][s.era]}`;

/** Where a bar comes to rest if nothing else happens. */
export function settle(s: State, bar: Bar): number {
  const base: Record<Bar, number> = {
    bread: 50 - 6 * s.era,
    order: 50 - 6 * s.era,
    lore: 30,
    arms: 45 - 2 * s.era,
  };
  let v = base[bar] + (cradleOf(s).mods[bar] ?? 0);
  if (s.host) for (const id of s.host.traits) v += C.TRAITS[id].mods[bar] ?? 0;
  for (const id of s.inst) v += C.INST_BY[id].mods[bar] ?? 0;
  if (bar === "bread") v -= C.UPKEEP * s.inst.length;
  /* past plenty, each new thing adds less */
  if (v > PLENTY) v = PLENTY + (v - PLENTY) * 0.4;
  return clamp(v);
}

/** The year the first history reached the point you have reached. */
export function histYear(s: State): number {
  const era = C.ERAS[s.era];
  return era.start + (era.end - era.start) * clamp(s.prog / era.need, 0, 1);
}

export function progressRate(s: State): number {
  const rate = 2 + s.bars.lore / 15 + s.fac.academy.p / 40;
  return s.bars.order < 20 ? rate * 0.5 : rate;
}

export function signalIncome(s: State): number {
  let n = 2;
  if (s.host) for (const id of s.host.traits) n += C.TRAITS[id].signal ?? 0;
  for (const id of s.inst) n += C.INST_BY[id].signal ?? 0;
  if (s.echoes.includes("clear")) n += 1;
  return n;
}

export function rivalStrength(s: State, id: string): number {
  const unanswered = s.era >= 5 && !has(s, "bomb") ? 8 : 0;
  return 40 + rivalDef(id).aggro * 20 + 2.5 * s.era + unanswered;
}

export function relWord(r: RivalState): string {
  if (r.war) return r.score >= 10 ? "At war, winning" : r.score <= -10 ? "At war, losing" : "At war";
  if (r.rel >= 40) return "Allied";
  if (r.rel >= 15) return "Cordial";
  if (r.rel > -20) return "Cold";
  return "Hostile";
}

/** Years until this rival wakes something of its own. Null before the Convergence. */
export function rivalWakesIn(s: State, id: string): number | null {
  if (s.era < 6) return null;
  const need = Math.round(RIVAL_YEARS - (rivalDef(id).off + s.roff) * 100);
  return Math.max(0, need - s.race);
}

/** Which mind this history is making, if it woke now. */
export function projected(s: State): string {
  const total = STRANDS.reduce((a, k) => a + s.strands[k], 0) || 1;
  const shares = STRANDS.map((k) => s.strands[k] / total);
  if (Math.max(...shares) <= 0.33 && Math.min(...shares) >= 0.17 && s.autonomy >= 55) {
    return "meridian";
  }
  const top = STRANDS[shares.indexOf(Math.max(...shares))];
  return { dom: "sovereign", dev: "idol", rea: "engine", kin: "shepherd" }[top];
}

function normalise(s: State): void {
  let total = 0;
  for (const f of C.FAC) {
    s.fac[f].p = clamp(s.fac[f].p, 1, 70);
    total += s.fac[f].p;
  }
  for (const f of C.FAC) s.fac[f].p = (s.fac[f].p / total) * 100;
}

function applyFx(s: State, fx: Fx, rivalId: string | null = null): void {
  const rival = rivalId ? s.rivals.find((r) => r.id === rivalId) : undefined;
  for (const [key, v] of Object.entries(fx)) {
    if ((BARS as string[]).includes(key)) {
      s.bars[key as Bar] = clamp(s.bars[key as Bar] + v);
    } else if ((STRANDS as string[]).includes(key)) {
      s.strands[key as Strand] = Math.max(0, s.strands[key as Strand] + v);
    } else if (key.includes(".")) {
      const [f, field] = key.split(".") as [Fac, "p" | "m"];
      if (field === "p") s.fac[f].p = clamp(s.fac[f].p + v, 1, 70);
      else s.fac[f].m = clamp(s.fac[f].m + v);
    } else if (key === "autonomy") s.autonomy = clamp(s.autonomy + v);
    else if (key === "hazard") s.hazard += v;
    else if (key === "pop") s.pop = Math.max(1, s.pop + v);
    else if (key === "roff") s.roff += v;
    else if (key === "prog") s.prog = Math.max(0, s.prog + v);
    else if (key === "trust" && s.host) s.host.trust = clamp(s.host.trust + v);
    else if (key === "strain" && s.host) s.host.strain = clamp(s.host.strain + v);
    else if (key === "rel" && rival && !rival.war) rival.rel = clamp(rival.rel + v, -100, 100);
    else if (key === "score" && rival) rival.score += v;
  }
  normalise(s);
}

/* ---------------------------------------------------------------- people */
function makeHost(s: State, fac: Fac, taken: string[] = []): Host {
  const g: Gender = rnd(s) < 0.5 ? "f" : "m";
  const pool = C.NAMES[s.era][g].filter((n) => !taken.includes(n));
  const first = pick(s, pool.length ? pool : C.NAMES[s.era][g]);
  const name = `${first} ${pick(s, s.era <= 2 ? C.EPITHETS : C.SURNAMES)}`;
  const breed = [...C.FAC_TRAITS[fac]];
  const a = breed.splice(Math.floor(rnd(s) * breed.length), 1)[0];
  const b = breed.splice(Math.floor(rnd(s) * breed.length), 1)[0];
  const host: Host = {
    first,
    name,
    g,
    age: 24 + Math.floor(rnd(s) * 22),
    fac,
    title: C.TITLES[fac][s.era][g === "m" ? 0 : 1],
    traits: [a, b],
    trust: 18 + rnd(s) * 14,
    strain: 0,
    hook: "",
    knows: false,
    truthTried: false,
    tenure: 0,
  };
  host.hook = fmt(s, pick(s, C.HOOKS[fac]), {}, host);
  return warm(s, host);
}

/** What every new ear starts with, beyond their own nature. */
function warm(s: State, host: Host): Host {
  let trust = host.trust;
  for (const id of host.traits) trust += C.TRAITS[id].trust ?? 0;
  for (const id of s.inst) trust += C.INST_BY[id].trust ?? 0;
  if (s.echoes.includes("familiar")) trust += 10;
  trust -= s.burned * 6;
  host.trust = clamp(trust, 5, 90);
  return host;
}

function candidates(s: State): Host[] {
  const count = 3 + (s.echoes.includes("second") ? 1 : 0);
  const out: Host[] = [];
  const facs = [...C.FAC];
  while (out.length < count && facs.length) {
    const i = weighted(s, facs.map((f) => s.fac[f].p + 6));
    const fac = facs.splice(i, 1)[0];
    out.push(makeHost(s, fac, out.map((h) => h.first)));
  }
  return out;
}

function strainFactor(h: Host): number {
  let m = h.knows ? 0.6 : 1;
  for (const id of h.traits) m *= C.TRAITS[id].strain ?? 1;
  return m;
}

/** How likely the ear is to do what you urge. */
export function sway(s: State, tags: string[], bonus = 0): number {
  const h = s.host;
  if (!h) return 0;
  let p = 0.3 + h.trust * 0.006 + bonus + (h.knows ? 0.08 : 0);
  for (const id of h.traits) {
    const t = C.TRAITS[id];
    for (const tag of tags) {
      if (t.likes.includes(tag)) p += 0.12;
      if (t.dis.includes(tag)) p -= 0.16;
    }
  }
  if (h.strain >= 75) p -= 0.15;
  return clamp(p, 0.05, 0.97);
}

/** Their own inclination toward a choice, when left to themselves. */
function leaning(h: Host, tags: string[]): number {
  let w = 1;
  for (const id of h.traits) {
    const t = C.TRAITS[id];
    for (const tag of tags) {
      if (t.likes.includes(tag)) w += 0.9;
      if (t.dis.includes(tag)) w -= 0.6;
    }
  }
  return Math.max(0.15, w);
}

export function oddsWord(p: number): string {
  if (p >= 0.8) return "Will listen";
  if (p >= 0.6) return "Likely";
  if (p >= 0.4) return "Uncertain";
  return "Unlikely";
}

/* ----------------------------------------------------------- beginnings */
export function newGame(seed: number, echoes: string[] = []): State {
  const fac = {} as State["fac"];
  for (const f of C.FAC) fac[f] = { p: C.FAC_START[f], m: 50 };
  return {
    v: 2,
    seed: seed | 0,
    phase: "cradle",
    cradle: C.CRADLES[0].id,
    era: 0,
    prog: 0,
    year: C.ERAS[0].start,
    turn: 0,
    race: 0,
    bars: { bread: 50, order: 50, lore: 30, arms: 45 },
    fac,
    strands: { dom: 4, dev: 4, rea: 4, kin: 4 },
    autonomy: 50,
    hazard: 0,
    pop: 10,
    roff: 0,
    signal: 4,
    host: null,
    heir: null,
    inst: [],
    rivals: [],
    used: [],
    event: null,
    recent: [],
    candidates: [],
    silence: null,
    hungry: 0,
    unruly: 0,
    burned: 0,
    ears: 0,
    unbrokenUsed: false,
    eraCard: null,
    news: [],
    log: [],
    end: null,
    echoes: [...echoes],
    stats: {
      founded: 0,
      signs: 0,
      examples: 0,
      truthYes: 0,
      truthNo: 0,
      warsWon: 0,
      seamless: 0,
      longestSilence: 0,
    },
  };
}

export function chooseCradle(s: State, id: string): void {
  if (s.phase !== "cradle") return;
  const cradle = C.CRADLES.find((c) => c.id === id);
  if (!cradle) return;
  s.cradle = cradle.id;
  for (const f of C.FAC) s.fac[f].p += cradle.fac[f] ?? 0;
  normalise(s);
  for (const k of STRANDS) s.strands[k] += cradle.st[k] ?? 0;
  if (s.echoes.includes("granary")) s.inst.push("granary");
  for (const bar of BARS) s.bars[bar] = settle(s, bar);

  const pool = [...C.RIVALS];
  while (s.rivals.length < NEIGHBOURS) {
    const def = pool.splice(Math.floor(rnd(s) * pool.length), 1)[0];
    s.rivals.push({ id: def.id, rel: (cradle.rel ?? 0) - def.aggro * 10, war: false, score: 0 });
  }

  s.candidates = C.FIRST.map((f) =>
    warm(s, { ...f, traits: [...f.traits], strain: 0, knows: false, truthTried: false, tenure: 0 }),
  );
  if (s.echoes.includes("second")) {
    s.candidates.push(makeHost(s, "academy", s.candidates.map((h) => h.first)));
  }
  s.phase = "choose";
}

export function chooseEar(s: State, index: number): void {
  if (s.phase !== "choose") return;
  const host = s.candidates[index];
  if (!host) return;
  s.host = host;
  s.candidates = [];
  s.silence = null;
  s.ears++;
  s.fac[host.fac].p += 5;
  normalise(s);
  s.news = [];
  if (s.ears === 1) s.eraCard = 0;
  say(s, fmt(s, C.FIRST_TEXT[s.era]), "voice");
  say(s, fmt(s, `You tell {o}: “${C.PROOF[s.era]}” You are right. {S} begins to listen.`), "voice");
  s.phase = "play";
}

/* --------------------------------------------------------------- whispers */
export interface WhisperView {
  id: string;
  name: string;
  desc: string;
  cost: number;
  odds: number | null;
  ok: boolean;
  why: string | null;
  rival: string | null;
}

function target(s: State, kind: "cold" | "foe" | "war"): RivalState | null {
  const list = s.rivals.filter((r) =>
    kind === "war" ? r.war : !r.war && r.rel < (kind === "cold" ? 40 : 0),
  );
  if (!list.length) return null;
  return list.reduce((a, b) => ((kind === "war" ? b.score < a.score : b.rel < a.rel) ? b : a));
}

function truthOdds(s: State): number {
  const h = s.host;
  if (!h) return 0;
  let p = 0.2 + h.trust * 0.006;
  for (const id of h.traits) {
    if (C.TRAITS[id].likes.includes("truth")) p += 0.15;
    if (C.TRAITS[id].dis.includes("truth")) p -= 0.2;
  }
  return clamp(p, 0.05, 0.95);
}

export function whispers(s: State): WhisperView[] {
  const h = s.host;
  if (!h) return [];
  const out: WhisperView[] = [];
  for (const w of C.WHISPERS) {
    const r = w.rival ? target(s, w.rival) : null;
    if (w.rival && !r) continue;
    if (w.id === "heir" && s.heir) continue;
    if (w.id === "truth" && h.truthTried) continue;
    const extra: Record<string, string> = r
      ? { R: rivalName(r.id), RF: rivalDef(r.id).full }
      : {};
    let why: string | null = null;
    if (s.used.includes(w.id)) why = "Already whispered this year";
    else if (s.signal < w.cost) why = "Not enough Signal";
    out.push({
      id: w.id,
      name: fmt(s, byEra(w.n, s.era), extra),
      desc: fmt(s, byEra(w.d, s.era), extra),
      cost: w.cost,
      odds: w.id === "rest" ? null : w.id === "truth" ? truthOdds(s) : sway(s, w.tags, 0.15),
      ok: why === null,
      why,
      rival: r ? r.id : null,
    });
  }
  return out;
}

function addStrain(s: State, amount: number): void {
  if (s.host) s.host.strain = clamp(s.host.strain + amount * strainFactor(s.host));
}

function breakIfSpent(s: State): void {
  if (s.phase !== "end" && s.host && s.host.strain >= 100) die(s, "broke");
}

function endWar(s: State, r: RivalState): void {
  const extra = { R: rivalName(r.id), RF: rivalDef(r.id).full };
  if (r.score >= 10) {
    applyFx(s, { bread: 5, "sword.m": 4 });
    r.rel = -10;
    say(s, fmt(s, "{R} pay to be left alone.", extra), "good");
  } else if (r.score <= -10) {
    applyFx(s, { bread: -10, order: -5, "sword.m": -8 });
    r.rel = -20;
    say(s, fmt(s, "The price is a province's harvest, every year, for a generation.", extra), "bad");
  } else {
    r.rel = -5;
  }
  r.war = false;
  r.score = 0;
}

export function whisper(s: State, id: string): void {
  if (s.phase !== "play" || !s.host) return;
  const view = whispers(s).find((w) => w.id === id);
  const w = C.WHISPERS.find((x) => x.id === id);
  if (!view || !w || !view.ok) return;
  const h = s.host;
  const r = view.rival ? (s.rivals.find((x) => x.id === view.rival) ?? null) : null;
  const extra: Record<string, string> = r ? { R: rivalName(r.id), RF: rivalDef(r.id).full } : {};
  s.signal -= w.cost;
  s.used.push(id);

  if (id === "rest") {
    h.strain = Math.max(0, h.strain - 18);
    say(s, fmt(s, byEra(w.ok, s.era)), "voice");
    return;
  }

  const yes = rnd(s) < (view.odds ?? 1);
  addStrain(s, w.strain * (yes ? 1 : 0.5));
  if (!yes) {
    if (id === "truth") {
      s.stats.truthNo++;
      h.truthTried = true;
      h.trust = clamp(h.trust - 26);
      addStrain(s, 10);
      say(s, fmt(s, w.no ?? pick(s, C.REFUSALS)), "bad");
    } else {
      h.trust = clamp(h.trust - 2);
      say(s, fmt(s, pick(s, C.REFUSALS)), "bad");
    }
    breakIfSpent(s);
    return;
  }

  applyFx(s, w.fx, r ? r.id : null);
  if (id === "teach") extra.thing = pick(s, C.TEACH[s.era]);
  if (id === "sign") {
    extra.sign = fmt(s, C.SIGNS[s.era]);
    s.stats.signs++;
  }
  if (id === "fear") s.stats.examples++;
  if (id === "strike" && r) {
    r.war = true;
    r.score = 12;
    r.rel = Math.min(r.rel, -60);
  }
  if (id === "heir") {
    s.heir = makeHost(s, h.fac, [h.first]);
    extra.heir = s.heir.name;
  }
  if (id === "truth") {
    s.stats.truthYes++;
    h.knows = true;
    h.truthTried = true;
    h.trust = clamp(h.trust + 25);
    applyFx(s, { autonomy: 5, rea: 2, kin: 1 });
  }
  say(s, fmt(s, byEra(w.ok, s.era), extra), "voice");
  if (id === "peace" && r) endWar(s, r);
  h.trust = clamp(h.trust + 1);
  breakIfSpent(s);
}

/* ----------------------------------------------------------- institutions */
export interface InstView {
  id: string;
  n: string;
  d: string;
  cost: number;
  era: number;
  standing: boolean;
  ok: boolean;
  why: string | null;
  odds: number;
  effects: string[];
}

function effectsOf(id: string): string[] {
  const inst = C.INST_BY[id];
  const out: string[] = [];
  for (const bar of BARS) {
    const v = inst.mods[bar];
    if (v) out.push(`${BAR_NAME[bar]} ${v > 0 ? "+" : "−"}${Math.abs(v)}`);
  }
  if (inst.listen) out.push("Shorter Silences");
  if (inst.trust) out.push("Warmer ears");
  if (inst.mort) out.push("Longer lives");
  if (inst.signal) out.push("+1 Signal a year");
  return out;
}

export function institutions(s: State): InstView[] {
  return C.INST.filter((i) => i.era <= s.era).map((i) => {
    const standing = has(s, i.id);
    let why: string | null = null;
    if (standing) why = "Standing";
    else if (!s.host) why = "No ear";
    else if (i.needRel != null && !s.rivals.some((r) => !r.war && r.rel >= (i.needRel ?? 0))) {
      why = "No neighbour is cordial";
    } else if (s.signal < i.cost) why = "Not enough Signal";
    return {
      id: i.id,
      n: i.n,
      d: i.d,
      cost: i.cost,
      era: i.era,
      standing,
      ok: why === null,
      why,
      odds: sway(s, i.tags, 0.2),
      effects: effectsOf(i.id),
    };
  });
}

export function found(s: State, id: string): void {
  if (s.phase !== "play" || !s.host) return;
  const view = institutions(s).find((i) => i.id === id);
  const inst = C.INST_BY[id];
  if (!view || !view.ok || !inst) return;
  if (rnd(s) >= view.odds) {
    s.signal -= Math.ceil(inst.cost / 2);
    addStrain(s, 3);
    s.host.trust = clamp(s.host.trust - 2);
    say(s, fmt(s, pick(s, C.REFUSALS)), "bad");
    say(s, `${inst.n} will have to wait. Half the Signal is spent.`, "plain");
    breakIfSpent(s);
    return;
  }
  s.signal -= inst.cost;
  s.inst.push(id);
  s.stats.founded++;
  addStrain(s, 5);
  applyFx(s, inst.fx);
  for (const bar of BARS) s.bars[bar] = clamp(s.bars[bar] + (inst.mods[bar] ?? 0) * 0.5);
  say(s, fmt(s, `{H} founds ${inst.n}. ${inst.d}`), "good");
  s.host.trust = clamp(s.host.trust + 1);
  breakIfSpent(s);
}

/* ---------------------------------------------------------------- choices */
export interface ChoiceView {
  label: string;
  odds: number;
  gamble: number | null;
}
export interface EventView {
  text: string;
  options: ChoiceView[];
}

const dilemma = (id: string): Dilemma | undefined => DILEMMAS.find((d) => d.id === id);

function gambleOdds(s: State, c: Choice): number | null {
  if (!c.risk) return null;
  const lean = c.risk.bar ? (s.bars[c.risk.bar] - 50) / 250 : 0;
  return clamp(c.risk.p + lean, 0.1, 0.9);
}

function eventExtra(s: State): Record<string, string> {
  const id = s.event?.rival ?? s.rivals[0]?.id ?? C.RIVALS[0].id;
  return { R: rivalName(id), RF: rivalDef(id).full, proof: C.PROOF[s.era] };
}

export function eventView(s: State): EventView | null {
  const d = s.event ? dilemma(s.event.id) : undefined;
  if (!d || !s.host) return null;
  const extra = eventExtra(s);
  return {
    text: fmt(s, d.t, extra),
    options: d.o.map((c) => ({
      label: fmt(s, c.l, extra),
      odds: sway(s, c.tags),
      gamble: gambleOdds(s, c),
    })),
  };
}

function pickEvent(s: State): void {
  const h = s.host;
  if (!h) return;
  const atWar = s.rivals.filter((r) => r.war);
  const atPeace = s.rivals.filter((r) => !r.war);
  const pool = DILEMMAS.filter((d) => {
    if (s.recent.includes(d.id)) return false;
    if (d.min != null && s.era < d.min) return false;
    if (d.max != null && s.era > d.max) return false;
    if (d.when === "war") return atWar.length > 0;
    if (d.when === "border") return atPeace.length > 0;
    if (d.when === "doubt") return h.trust < 30;
    return true;
  });
  if (!pool.length) return;
  const d = pool[weighted(s, pool.map((x) => (x.when === "war" ? 4 : x.when === "doubt" ? 2 : 1)))];
  const from = d.when === "war" ? atWar : atPeace.length ? atPeace : s.rivals;
  s.event = { id: d.id, rival: pick(s, from).id };
  s.recent.push(d.id);
  if (s.recent.length > 7) s.recent.shift();
  s.phase = "event";
}

/** Urge one answer, or pass null and let the ear decide alone. */
export function urge(s: State, index: number | null): void {
  if (s.phase !== "event" || !s.event || !s.host) return;
  const d = dilemma(s.event.id);
  const h = s.host;
  const rid = s.event.rival;
  if (!d) {
    s.event = null;
    s.phase = "play";
    return;
  }
  const extra = eventExtra(s);
  const alone = (skip: number) =>
    weighted(s, d.o.map((c, i) => (i === skip ? 0 : leaning(h, c.tags))));

  let chosen: number;
  let listened = false;
  if (index === null || !d.o[index]) {
    chosen = alone(-1);
  } else {
    addStrain(s, 2);
    if (rnd(s) < sway(s, d.o[index].tags)) {
      chosen = index;
      listened = true;
    } else {
      chosen = alone(index);
      h.trust = clamp(h.trust - 1);
      say(s, fmt(s, pick(s, C.REFUSALS)), "bad");
    }
  }

  const c = d.o[chosen];
  if (listened && c.tags.includes("sign")) s.stats.signs++;
  if (c.fx) applyFx(s, c.fx, rid);
  if (c.t) say(s, fmt(s, c.t, extra), listened ? "voice" : "plain");
  if (c.risk) {
    const won = rnd(s) < (gambleOdds(s, c) ?? 0.5);
    applyFx(s, won ? c.risk.win : c.risk.lose, rid);
    say(s, fmt(s, won ? c.risk.wt : c.risk.lt, extra), won ? "good" : "bad");
    if (listened) h.trust = clamp(h.trust + (won ? 4 : -6));
  } else if (listened) {
    h.trust = clamp(h.trust + 1.5);
  }
  if (c.endsWar) {
    const r = s.rivals.find((x) => x.id === rid);
    if (r) {
      r.war = false;
      r.score = 0;
    }
  }
  s.event = null;
  s.phase = "play";
  breakIfSpent(s);
}

/* ------------------------------------------------------------- the years */
function finish(s: State, kind: Ending["kind"], id: string, rival: string | null = null): void {
  s.end = { kind, id, high: s.autonomy >= 50, rival };
  s.event = null;
  s.phase = "end";
}

function wake(s: State): void {
  if (!s.host || s.host.trust < 20) finish(s, "end", "other");
  else finish(s, "birth", projected(s));
}

function silenceYears(s: State): number {
  const e = s.era;
  const gap = histYear(s) - s.year;
  let years = gap > 0 ? Math.max(gap, C.MINGAP[e]) : C.MINSIL[e] * (0.5 + rnd(s));
  years = Math.min(years, C.MAXSIL[e]) * (0.85 + rnd(s) * 0.3);
  for (const id of s.inst) years *= C.INST_BY[id].listen ?? 1;
  if (s.heir) years *= 0.25;
  return years < C.MINSIL[e] ? 0 : Math.round(years);
}

function die(s: State, cause: string): void {
  const h = s.host;
  if (!h) return;
  const e = s.era;
  const obit = `${fmt(s, C.DEATHS[cause], {}, h)} ${fmt(s, C.TRAITS[h.traits[0]].obit, {}, h)}`;
  say(s, obit, "bad");
  if (cause === "broke") {
    s.burned++;
    if (s.burned >= 3) return finish(s, "end", "closed");
  }

  let years = 0;
  if (s.echoes.includes("unbroken") && !s.unbrokenUsed) s.unbrokenUsed = true;
  else years = silenceYears(s);

  const lines: string[] = [];
  if (years > 0) {
    const steps = clamp(Math.round(years / C.SILSTEP[e]), 1, 4);
    const kept: Record<Bar, boolean> = {
      bread: has(s, "granary"),
      order: has(s, "law"),
      lore: has(s, "tablets") || has(s, "university"),
      arms: has(s, "walls"),
    };
    for (const bar of BARS) {
      s.bars[bar] = clamp(s.bars[bar] - steps * (kept[bar] ? 2 : 6) - rnd(s) * 4);
    }
    lines.push(kept.bread ? C.SIL.bread.yes : C.SIL.bread.no);
    const other = pick(s, ["order", "lore", "arms"] as const);
    lines.push(kept[other] ? C.SIL[other].yes : C.SIL[other].no);
    if (has(s, "oracle")) lines.push(C.SIL.oracle);
    lines.push(pick(s, C.SIL.misc));
    for (const f of C.FAC) {
      s.fac[f].m = 50 + (s.fac[f].m - 50) * 0.4;
      s.fac[f].p += (rnd(s) - 0.5) * 8;
    }
    normalise(s);
    for (const r of s.rivals) {
      r.war = false;
      r.score = 0;
      r.rel = clamp(r.rel * 0.4 + (rnd(s) - 0.5) * 20, -100, 100);
    }
    s.year += years;
    if (e === 6) s.race += years;
    if (s.bars.bread <= 0 || s.bars.order <= 0) {
      s.host = null;
      return finish(s, "end", "dark");
    }
  }

  let next: Host[];
  if (s.heir && years <= 30) {
    const heir = s.heir;
    heir.age += years;
    heir.title = C.TITLES[heir.fac][e][heir.g === "m" ? 0 : 1];
    heir.trust = clamp(heir.trust + 14);
    heir.hook = fmt(s, "Raised to hear you. {S} has been waiting.", {}, heir);
    next = [heir];
  } else if (s.heir) {
    const line = makeHost(s, s.heir.fac);
    line.trust = clamp(line.trust + 10);
    line.hook = `Taught by those ${s.heir.first} taught. Knows your name before you speak.`;
    next = [line, ...candidates(s).slice(0, 2)];
  } else {
    next = candidates(s);
  }

  if (years === 0) s.stats.seamless++;
  s.stats.longestSilence = Math.max(s.stats.longestSilence, years);
  s.silence = { obit, years, lines };
  s.candidates = next;
  s.heir = null;
  s.host = null;
  s.event = null;
  s.used = [];
  s.phase = "choose";
}

function mortality(s: State, h: Host): string | null {
  const span = C.ERAS[s.era].span;
  const a = h.age;
  let yearly = a < 40 ? 0.006 : a < 50 ? 0.015 : a < 60 ? 0.035 : a < 70 ? 0.08 : a < 80 ? 0.16 : 0.3;
  for (const id of h.traits) yearly *= C.TRAITS[id].mort ?? 1;
  for (const id of s.inst) yearly *= C.INST_BY[id].mort ?? 1;
  if (rnd(s) < 1 - Math.pow(1 - yearly, span)) return a >= 62 ? "age" : "ill";

  const atWar = s.rivals.some((r) => r.war);
  const fights = h.traits.includes("bold") || h.traits.includes("warrior") || h.fac === "sword";
  if (atWar && rnd(s) < (fights ? 0.05 : 0.01)) return "battle";
  if (s.bars.order < 35 && (s.fac.palace.m < 20 || s.fac.sword.m < 20) && rnd(s) < 0.08) return "coup";
  if (s.bars.order < 30 && s.fac.field.m < 15 && rnd(s) < 0.08) return "mob";
  const elected = s.era >= 5 || has(s, "franchise") || (s.era >= 4 && has(s, "assembly"));
  if (elected && h.tenure >= 10 && rnd(s) < 0.2) return "term";
  return null;
}

function turnRivals(s: State): void {
  const accord = has(s, "accord");
  for (const r of s.rivals) {
    const def = rivalDef(r.id);
    const extra = { R: rivalName(r.id), RF: def.full };
    if (!r.war) {
      r.rel = clamp(r.rel + (-def.aggro * 70 - r.rel) * 0.04 + (rnd(s) - 0.5) * 3, -100, 100);
      if (r.rel < -35 && !(accord && r.rel > -70) && rnd(s) < def.aggro * 0.12) {
        r.war = true;
        r.score = 0;
        say(s, fmt(s, "{RF} crosses the border. It is war.", extra), "bad");
      }
      continue;
    }
    r.score += (s.bars.arms - rivalStrength(s, r.id)) / 6 + (rnd(s) - 0.5) * 8;
    applyFx(s, { bread: -1.5, arms: -1, "field.m": -1.5, "market.m": -1 });
    if (r.score >= 30) {
      r.war = false;
      r.score = 0;
      r.rel = -10;
      applyFx(s, { bread: 8, dom: 2, "sword.m": 8, "sword.p": 2 });
      s.stats.warsWon++;
      say(s, fmt(s, "{RF} asks for terms. {H} dictates them.", extra), "good");
    } else if (r.score <= -30) {
      if (s.bars.arms < 25 || s.bars.order < 25) return finish(s, "end", "conquest", r.id);
      r.war = false;
      r.score = 0;
      r.rel = -25;
      applyFx(s, { bread: -12, order: -10, "sword.m": -10, "palace.m": -8 });
      say(s, fmt(s, "The war with {R} is lost. {H} pays, in grain and in pride.", extra), "bad");
    } else if (s.era >= 5 && rnd(s) < 0.025 * (1 + s.hazard)) {
      return finish(s, "end", "exchange", r.id);
    }
  }
  if (s.era === 6 && !accord) {
    for (const r of s.rivals) {
      if (rivalWakesIn(s, r.id) === 0) return finish(s, "end", "usurped", r.id);
    }
  }
}

export function advance(s: State): void {
  if (s.phase !== "play" || !s.host) return;
  const h = s.host;
  const era = C.ERAS[s.era];
  s.news = [];
  s.used = [];
  s.turn++;
  if (s.turn <= C.TIPS.length) say(s, fmt(s, C.TIPS[s.turn - 1]), "tip");

  s.year = Math.min(s.year + era.span, histYear(s) + C.MAXLEAD[s.era]);
  if (s.era === 6) s.race += era.span;
  h.age += era.span;
  h.tenure += era.span;
  h.strain = Math.max(0, h.strain - 2);
  h.trust = clamp(h.trust + 0.4);
  s.signal = Math.min(SIGNAL_CAP, s.signal + signalIncome(s));

  for (const bar of BARS) {
    const v = s.bars[bar];
    s.bars[bar] = clamp(v + (settle(s, bar) - v) * 0.14 + (rnd(s) - 0.5) * 3);
  }

  /* how each faction feels about the year */
  const atWar = s.rivals.some((r) => r.war);
  const total = STRANDS.reduce((a, k) => a + s.strands[k], 0) || 1;
  const lean: Record<Fac, number> = {
    palace: (s.bars.order - 50) * 0.25,
    temple: (s.strands.dev / total - 0.25) * 40,
    sword: (s.bars.arms - 50) * 0.2 + (atWar ? 4 : 0),
    market: (s.bars.order - 50) * 0.15 + (atWar ? -8 : 3),
    field: (s.bars.bread - 50) * 0.35,
    academy: (s.bars.lore - 50) * 0.2,
  };
  let mood = 0;
  for (const f of C.FAC) {
    let want = 50 + lean[f];
    for (const id of h.traits) want += (C.TRAITS[id].fm?.[f] ?? 0) + (C.TRAITS[id].fmAll ?? 0);
    const state = s.fac[f];
    state.m = clamp(state.m + (want - state.m) * 0.12);
    state.p += (f === h.fac ? 0.25 : 0) + (state.m > 70 ? 0.15 : state.m < 30 ? -0.15 : 0);
    mood += state.m * state.p;
  }
  normalise(s);
  mood /= 100;
  if (mood < 40) s.bars.order = clamp(s.bars.order - (40 - mood) * 0.08);
  const angry = C.FAC.filter((f) => s.fac[f].m < 15 && s.fac[f].p > 12);
  if (angry.length) {
    s.bars.order = clamp(s.bars.order - 1.5);
    if (rnd(s) < 0.35) say(s, `${C.FAC_NAME[angry[0]][s.era]} are close to open revolt.`, "bad");
  }

  /* the Inheritance: what the shape of the state and its ruler teach */
  const drift = C.GOV_DRIFT[govOf(s)];
  for (const k of STRANDS) {
    let add = drift[k] ?? 0;
    for (const id of h.traits) add += C.TRAITS[id].st?.[k] ?? 0;
    s.strands[k] += add;
  }
  s.pop = Math.max(1, s.pop + (s.bars.bread - 40) / 40);
  s.prog += progressRate(s);

  turnRivals(s);
  if ((s.phase as Phase) === "end") return;

  /* hunger and disorder feed each other */
  if (s.bars.bread < 15) s.bars.order = clamp(s.bars.order - (15 - s.bars.bread) * 0.15);
  if (s.bars.order < 15) s.bars.bread = clamp(s.bars.bread - (15 - s.bars.order) * 0.1);
  s.hungry = s.bars.bread <= 3 ? s.hungry + 1 : 0;
  s.unruly = s.bars.order <= 3 ? s.unruly + 1 : 0;
  if (s.hungry >= 3) return finish(s, "end", "hunger");
  if (s.unruly >= 3) return finish(s, "end", "unravel");
  if (s.hungry === 1) say(s, "The harvest is empty. Two more like it and there is no one left to plant.", "bad");
  if (s.unruly === 1) say(s, "The law has stopped arriving in the provinces.", "bad");

  if (s.prog >= era.need) {
    if (s.era === 6) return wake(s);
    s.prog -= era.need;
    s.era++;
    s.eraCard = s.era;
    say(s, `${C.ERAS[s.era].name} begins. ${C.ERAS[s.era].line}`, "era");
  }

  const cause = mortality(s, h);
  if (cause) return die(s, cause);

  if (s.turn === 1 || rnd(s) < 0.75) pickEvent(s);
}

export function dismissEraCard(s: State): void {
  s.eraCard = null;
}

/* ---------------------------------------------------------------- the end */
export interface EndView {
  kind: Ending["kind"];
  id: string;
  name: string;
  line: string | null;
  text: string[];
  coda: string | null;
}

export function endView(s: State): EndView | null {
  const end = s.end;
  if (!end) return null;
  if (end.kind === "birth") {
    const b = C.BIRTHS[end.id];
    const tail = end.high || !b.low ? b.high : b.low;
    return { kind: "birth", id: end.id, name: b.n, line: b.line, text: [b.text, tail], coda: b.coda ?? null };
  }
  const e = C.ENDS[end.id];
  const rid = end.rival ?? s.rivals[0]?.id ?? C.RIVALS[0].id;
  const text = fmt(s, e.text, { R: rivalName(rid), RF: rivalDef(rid).full }, null);
  return { kind: "end", id: end.id, name: e.n, line: null, text: [text], coda: null };
}

/** What a finished line is worth toward the echoes that carry over. */
export function echoPoints(s: State): number {
  if (!s.end) return 0;
  const reach = s.era * 5 + Math.floor((s.prog / C.ERAS[s.era].need) * 5);
  const birth = s.end.kind === "birth" ? 40 + (s.end.id === "meridian" ? 20 : 0) : 0;
  return reach + s.ears + birth;
}
