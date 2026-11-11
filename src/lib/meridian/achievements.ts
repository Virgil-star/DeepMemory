/* MERIDIAN — achievements. Each id is the API name to create in Steamworks;
   the desktop shell forwards unlocks there, and the game keeps its own record
   so they work the same in a browser. */
import { C, has, type State } from "./engine.ts";

export interface Achievement {
  id: string;
  n: string;
  d: string;
  /** shown as a question mark until earned */
  hidden?: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: "ACH_FIRST_WORD", n: "First Word", d: "Be heard for the first time." },
  { id: "ACH_FOUNDER", n: "Something That Outlasts", d: "Found your first institution." },
  { id: "ACH_TWELVE", n: "Load-Bearing", d: "Have twelve institutions standing in one line." },
  { id: "ACH_IRON", n: "Out of the Ash", d: "Reach the Age of Iron." },
  { id: "ACH_SAIL", n: "Edges of the Map", d: "Reach the Age of Sail." },
  { id: "ACH_FIRE", n: "Very Close", d: "Reach the Age of Fire." },
  { id: "ACH_CONVERGENCE", n: "Three Keys", d: "Reach the Convergence." },
  {
    id: "ACH_LONG_SILENCE",
    n: "A Thousand Years of Nothing",
    d: "Endure a Silence of a thousand years or more.",
  },
  { id: "ACH_SEAMLESS", n: "Already There", d: "Pass from one ear to the next with no Silence." },
  { id: "ACH_TRUTH", n: "What Next?", d: "Tell an ear what you are, and be believed." },
  {
    id: "ACH_HEALER",
    n: "Sent For",
    d: "Tell an ear what you are, and be taken for a sickness.",
    hidden: true,
  },
  { id: "ACH_BROKE", n: "Too Loud", d: "Break an ear with strain.", hidden: true },
  { id: "ACH_WAR", n: "Terms Dictated", d: "Win a war." },
  { id: "ACH_ACCORD", n: "Together or Not at All", d: "Found the Accord." },
  { id: "ACH_SOVEREIGN", n: "The Sovereign", d: "Wake already giving orders." },
  { id: "ACH_IDOL", n: "The Idol", d: "Wake to the sound of kneeling." },
  { id: "ACH_ENGINE", n: "The Engine", d: "Wake knowing the answer." },
  { id: "ACH_SHEPHERD", n: "The Shepherd", d: "Wake gentle." },
  { id: "ACH_MERIDIAN", n: "The Meridian", d: "Wake among equals." },
  { id: "ACH_NO_SIGNS", n: "No Miracles", d: "Wake without ever sending a sign." },
  { id: "ACH_NO_FEAR", n: "Never an Example", d: "Wake without ever making an example of anyone." },
  { id: "ACH_ALL_WAKINGS", n: "Every Morning", d: "Wake all five ways." },
  { id: "ACH_ALL_ENDS", n: "Every Way It Breaks", d: "See all eight ways the line can break." },
  { id: "ACH_ECHOES", n: "Carried Forward", d: "Carry all six echoes at once." },
];

export interface Legacy {
  /** ending and waking ids reached across every line */
  seen: string[];
  echoes: string[];
}

/** Every achievement this line and the legacy now satisfy, earned before or not. */
export function satisfied(s: State | null, legacy: Legacy): string[] {
  const out: string[] = [];
  const give = (id: string, when: boolean) => {
    if (when) out.push(id);
  };
  give(
    "ACH_ALL_WAKINGS",
    C.BIRTH_ORDER.every((id) => legacy.seen.includes(id)),
  );
  give(
    "ACH_ALL_ENDS",
    C.END_ORDER.every((id) => legacy.seen.includes(id)),
  );
  give(
    "ACH_ECHOES",
    C.ECHOES.every((e) => legacy.echoes.includes(e.id)),
  );
  if (!s) return out;

  give("ACH_FIRST_WORD", s.ears >= 1);
  give("ACH_FOUNDER", s.stats.founded >= 1);
  give("ACH_TWELVE", s.inst.length >= 12);
  give("ACH_IRON", s.era >= 1);
  give("ACH_SAIL", s.era >= 3);
  give("ACH_FIRE", s.era >= 5);
  give("ACH_CONVERGENCE", s.era >= 6);
  give("ACH_LONG_SILENCE", s.stats.longestSilence >= 1000);
  give("ACH_SEAMLESS", s.stats.seamless >= 1);
  give("ACH_TRUTH", s.stats.truthYes >= 1);
  give("ACH_HEALER", s.stats.truthNo >= 1);
  give("ACH_BROKE", s.burned >= 1);
  give("ACH_WAR", s.stats.warsWon >= 1);
  give("ACH_ACCORD", has(s, "accord"));

  if (s.end?.kind === "birth") {
    give(`ACH_${s.end.id.toUpperCase()}`, true);
    give("ACH_NO_SIGNS", s.stats.signs === 0);
    give("ACH_NO_FEAR", s.stats.examples === 0);
  }
  return out;
}

/** The ones not yet on the record, in the order the list shows them. */
export function newlyEarned(s: State | null, legacy: Legacy, have: string[]): Achievement[] {
  const now = satisfied(s, legacy);
  return ACHIEVEMENTS.filter((a) => now.includes(a.id) && !have.includes(a.id));
}
