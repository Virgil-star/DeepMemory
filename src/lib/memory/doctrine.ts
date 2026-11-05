import type { Entry } from "@/lib/memory/types";

const STAMP = "2026-10-31";
const AT = "2026-10-31T09:00:00.000Z";

function rule(partial: Pick<Entry, "id" | "title" | "body" | "implication">): Entry {
  return {
    store: "identity",
    tier: "observed",
    confidence: "high",
    source: "Standing brief",
    dated: STAMP,
    recordedAt: AT,
    lastInfluencedAt: AT,
    supersedes: "",
    kind: "rule",
    relationship: "",
    researchNote: "",
    state: "",
    nextAction: "",
    owner: "",
    overrides: "",
    ...partial,
  };
}

export const DOCTRINE: Entry[] = [
  rule({
    id: "doctrine-value",
    title: "The value test",
    body: "Store a fact only when it will change a future decision. One exact, dated, sourced fact outweighs ten impressions.",
    implication: "If you cannot say what this changes, do not keep it.",
  }),
  rule({
    id: "doctrine-leverage",
    title: "Leverage, not a trophy case",
    body: "Every entry carries the action it changes. An entry that has not influenced an action in 90 days is a candidate for deletion, not for an archive.",
    implication: "Review what has gone quiet. Forget it, or mark that it changed an action. Do not keep a second copy just in case.",
  }),
  rule({
    id: "doctrine-tiers",
    title: "Three tiers, never mixed",
    body: "A claim is observed, an inference, or unknown. Observed is what was seen or said. An inference stays labeled as an inference. Unknown stays blank.",
    implication: "Never present an inference as a fact, and never fill an unknown by guessing.",
  }),
  rule({
    id: "doctrine-ties",
    title: "Unnamed ties stay unnamed",
    body: "Record a relationship only in the words that were actually used. A tie that has not been named is not a gap to fill.",
    implication: "Leave relationship empty when it was not stated. Do not invent friend, colleague, or kin.",
  }),
  rule({
    id: "doctrine-privacy",
    title: "Privacy is a hard stop",
    body: "Never store a date of birth, a credential, a verification code, a financial account number, or anything you were told to forget.",
    implication: "Refuse those on sight. Forget means delete everywhere, immediately, with nothing left behind.",
  }),
  rule({
    id: "doctrine-corrections",
    title: "Corrections propagate",
    body: "When a new fact conflicts with an entry, say so and reconcile it. A correction updates the entry in the same sitting. Closed work is removed, not filed away.",
    implication: "On a conflict, revise the entry and name what it replaces. Do not silently overwrite, and do not keep both versions.",
  }),
];

export function cloneDoctrine(): Entry[] {
  return DOCTRINE.map((entry) => ({ ...entry }));
}
