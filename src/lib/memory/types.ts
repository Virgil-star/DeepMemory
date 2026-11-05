export const STORES = ["identity", "people", "projects", "decisions"] as const;

export type StoreId = (typeof STORES)[number];

export type Tier = "observed" | "inference" | "unknown";

export type Confidence = "high" | "medium" | "low";

export type IdentityKind = "identity" | "preference" | "rule";

export type Entry = {
  id: string;
  store: StoreId;
  title: string;
  body: string;
  implication: string;
  tier: Tier;
  confidence: Confidence;
  source: string;
  dated: string;
  recordedAt: string;
  lastInfluencedAt: string | null;
  supersedes: string;
  kind: IdentityKind | "";
  relationship: string;
  researchNote: string;
  state: string;
  nextAction: string;
  owner: string;
  overrides: string;
};

export type EntryDraft = Omit<Entry, "id" | "recordedAt" | "lastInfluencedAt">;

export type LedgerView = "directives" | StoreId;

export const STORE_LABEL: Record<StoreId, string> = {
  identity: "Identity",
  people: "People",
  projects: "Projects",
  decisions: "Decisions",
};

export const TIER_LABEL: Record<Tier, string> = {
  observed: "Observed",
  inference: "Inference",
  unknown: "Unknown",
};

export const KIND_LABEL: Record<IdentityKind, string> = {
  identity: "Identity",
  preference: "Preference",
  rule: "Rule",
};

export const STALE_MS = 90 * 24 * 60 * 60 * 1000;

export function todayStamp(now = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function emptyDraft(store: StoreId, now = new Date()): EntryDraft {
  return {
    store,
    title: "",
    body: "",
    implication: "",
    tier: "observed",
    confidence: "high",
    source: "",
    dated: todayStamp(now),
    supersedes: "",
    kind: store === "identity" ? "rule" : "",
    relationship: "",
    researchNote: "",
    state: "",
    nextAction: "",
    owner: "",
    overrides: "",
  };
}

export function draftFromEntry(entry: Entry): EntryDraft {
  const { id: _id, recordedAt: _recordedAt, lastInfluencedAt: _used, ...draft } = entry;
  return draft;
}
