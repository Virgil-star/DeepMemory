/* MERIDIAN — what outlives a line: echoes, discoveries, achievements, settings. */
import type { State } from "./engine.ts";
import { load, store } from "./platform.ts";

export const SAVE_KEY = "meridian.save.v2";
export const META_KEY = "meridian.meta.v1";
export const VERSION = "1.0.0";

export interface Settings {
  master: number;
  music: number;
  sfx: number;
  /** 0 normal, 1 large, 2 largest */
  text: 0 | 1 | 2;
  /** no intro film, no motion */
  calm: boolean;
}

export interface Meta {
  points: number;
  echoes: string[];
  seen: string[];
  runs: number;
  achievements: string[];
  settings: Settings;
}

export interface Save {
  game: State | null;
  /** echoes already paid out for this finished line */
  awarded: number | null;
}

export const DEFAULT_SETTINGS: Settings = {
  master: 0.8,
  music: 0.6,
  sfx: 0.8,
  text: 0,
  calm: false,
};
export const NO_META: Meta = {
  points: 0,
  echoes: [],
  seen: [],
  runs: 0,
  achievements: [],
  settings: DEFAULT_SETTINGS,
};
export const NO_SAVE: Save = { game: null, awarded: null };

export function loadMeta(): Meta {
  const meta = load<Meta>(META_KEY, NO_META);
  return { ...meta, settings: { ...DEFAULT_SETTINGS, ...meta.settings } };
}

export function loadSave(): Save {
  const save = load<Save>(SAVE_KEY, NO_SAVE);
  return save.game && save.game.v === 2 && save.game.stats ? save : NO_SAVE;
}

export const storeMeta = (meta: Meta) => store(META_KEY, meta);
export const storeSave = (save: Save) => store(SAVE_KEY, save);
