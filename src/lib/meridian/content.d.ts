/* Types for content.js, which stays a plain script: it hangs the data on
   globalThis.MER.C so the same file loads in a browser tag and in Node. */

export type Bar = "bread" | "order" | "lore" | "arms";
export type Fac = "palace" | "temple" | "sword" | "market" | "field" | "academy";
export type Strand = "dom" | "dev" | "rea" | "kin";
export type Gov = Fac | "mixed";
export type Gender = "f" | "m";
export type Fx = Record<string, number>;
/** One value for every era, or one per era. */
export type ByEra = string | string[];

export interface Era {
  id: string;
  num: string;
  name: string;
  short: string;
  start: number;
  end: number;
  span: number;
  need: number;
  voice: string;
  line: string;
}

export interface Trait {
  n: string;
  likes: string[];
  dis: string[];
  mods: Partial<Record<Bar, number>>;
  obit: string;
  fm?: Partial<Record<Fac, number>>;
  fmAll?: number;
  st?: Partial<Record<Strand, number>>;
  trust?: number;
  signal?: number;
  strain?: number;
  mort?: number;
}

export interface FirstEar {
  first: string;
  name: string;
  g: Gender;
  age: number;
  fac: Fac;
  title: string;
  traits: string[];
  trust: number;
  hook: string;
}

export interface Cradle {
  id: string;
  n: string;
  people: string;
  adj: string;
  city: string;
  d: string;
  mods: Partial<Record<Bar, number>>;
  fac: Partial<Record<Fac, number>>;
  st: Partial<Record<Strand, number>>;
  rel?: number;
  chips: string[];
}

export interface Rival {
  id: string;
  stem: string;
  full: string;
  aggro: number;
  off: number;
  col: string;
}

export interface Institution {
  id: string;
  n: string;
  era: number;
  cost: number;
  tags: string[];
  mods: Partial<Record<Bar, number>>;
  fx: Fx;
  d: string;
  listen?: number;
  trust?: number;
  mort?: number;
  signal?: number;
  needRel?: number;
}

export interface Whisper {
  id: string;
  n: ByEra;
  d: ByEra;
  cost: number;
  strain: number;
  tags: string[];
  fx: Fx;
  ok: ByEra;
  no?: string;
  rival?: "cold" | "foe" | "war";
}

export interface Birth {
  n: string;
  line: string;
  text: string;
  low: string;
  high: string;
  coda?: string;
}

export interface Content {
  ERAS: Era[];
  UPKEEP: number;
  MINGAP: number[];
  MAXSIL: number[];
  MAXLEAD: number[];
  MINSIL: number[];
  SILSTEP: number[];
  LEX: Record<string, string[]>;
  FAC: Fac[];
  FAC_NAME: Record<Fac, string[]>;
  FAC_WANTS: Record<Fac, string>;
  FAC_START: Record<Fac, number>;
  TITLES: Record<Fac, [string, string][]>;
  GOV: Record<Gov, string[]>;
  GOV_DRIFT: Record<Gov, Partial<Record<Strand, number>>>;
  TRAITS: Record<string, Trait>;
  TRAIT_IDS: string[];
  FAC_TRAITS: Record<Fac, string[]>;
  NAMES: { f: string[]; m: string[] }[];
  EPITHETS: string[];
  SURNAMES: string[];
  HOOKS: Record<Fac, string[]>;
  FIRST: FirstEar[];
  CRADLES: Cradle[];
  RIVALS: Rival[];
  INST: Institution[];
  INST_BY: Record<string, Institution>;
  WHISPERS: Whisper[];
  REFUSALS: string[];
  TEACH: string[][];
  SIGNS: string[];
  PROOF: string[];
  FIRST_TEXT: string[];
  DEATHS: Record<string, string>;
  SIL: {
    bread: { yes: string; no: string };
    order: { yes: string; no: string };
    lore: { yes: string; no: string };
    arms: { yes: string; no: string };
    oracle: string;
    misc: string[];
  };
  STRANDS: Record<Strand, { n: string; d: string; col: string }>;
  BIRTHS: Record<string, Birth>;
  BIRTH_ORDER: string[];
  ENDS: Record<string, { n: string; text: string }>;
  END_ORDER: string[];
  ECHOES: { id: string; n: string; cost: number; d: string }[];
  INTRO: string[];
  TIPS: string[];
}

declare global {
  var MER: { C: Content };
}
