import { format } from "date-fns";
import { privacyViolation } from "@/lib/memory/privacy";
import { STALE_MS, type Entry, type EntryDraft, type StoreId } from "@/lib/memory/types";

export function entryBlob(entry: Pick<Entry, keyof Entry>): string {
  return [
    entry.title,
    entry.body,
    entry.implication,
    entry.source,
    entry.supersedes,
    entry.relationship,
    entry.researchNote,
    entry.state,
    entry.nextAction,
    entry.owner,
    entry.overrides,
  ].join("\n");
}

export function validateDraft(draft: EntryDraft): string | null {
  if (!draft.title.trim()) return "Name it. An unnamed entry cannot be used.";
  if (draft.tier !== "unknown" && !draft.body.trim()) {
    return "State the fact. If you do not know it, mark the tier Unknown and leave the fact blank.";
  }
  if (!draft.implication.trim()) {
    return "Name what this changes. If nothing changes, do not keep it.";
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.dated)) return "Date the entry.";
  const blocked = privacyViolation(entryBlob({ ...draft, id: "", recordedAt: "", lastInfluencedAt: null }));
  return blocked;
}

export function isStale(entry: Entry, now = Date.now()): boolean {
  const mark = entry.lastInfluencedAt ?? entry.recordedAt;
  const then = Date.parse(mark);
  if (Number.isNaN(then)) return false;
  return now - then > STALE_MS;
}

export function formatDay(iso: string): string {
  const day = iso.slice(0, 10);
  const [y, m, d] = day.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return format(new Date(y, m - 1, d), "d MMM yyyy");
}

export function influenceLine(entry: Entry): string {
  if (!entry.lastInfluencedAt) return "Not yet used";
  return `In force · ${formatDay(entry.lastInfluencedAt)}`;
}

export function matchesQuery(entry: Entry, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return entryBlob(entry).toLowerCase().includes(q) || entry.store.includes(q);
}

export function sortByLeverage(entries: Entry[], now = Date.now()): Entry[] {
  return [...entries].sort((a, b) => {
    const staleDelta = Number(isStale(b, now)) - Number(isStale(a, now));
    if (staleDelta !== 0) return staleDelta;
    const dated = b.dated.localeCompare(a.dated);
    if (dated !== 0) return dated;
    return b.recordedAt.localeCompare(a.recordedAt);
  });
}

const STORE_SET = new Set<StoreId>(["identity", "people", "projects", "decisions"]);

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function parseLedger(raw: unknown): { entries: Entry[] } | { error: string } {
  const payload =
    raw && typeof raw === "object" && "entries" in raw
      ? (raw as { entries: unknown }).entries
      : raw;
  if (!Array.isArray(payload)) return { error: "This file is not a DeepMemory ledger." };
  if (payload.length > 500) return { error: "That ledger is larger than this desk will hold." };

  const entries: Entry[] = [];
  for (const item of payload) {
    if (!item || typeof item !== "object") return { error: "This file is not a DeepMemory ledger." };
    const row = item as Record<string, unknown>;
    const store = row.store;
    if (typeof row.id !== "string" || !row.id.trim()) {
      return { error: "An entry is missing its id." };
    }
    if (typeof store !== "string" || !STORE_SET.has(store as StoreId)) {
      return { error: "An entry names a store this ledger does not keep." };
    }
    const tier = row.tier === "inference" || row.tier === "unknown" ? row.tier : "observed";
    const confidence =
      row.confidence === "low" || row.confidence === "medium" ? row.confidence : "high";
    const kind =
      row.kind === "identity" || row.kind === "preference" || row.kind === "rule" ? row.kind : "";
    const entry: Entry = {
      id: row.id,
      store: store as StoreId,
      title: asString(row.title).trim(),
      body: asString(row.body),
      implication: asString(row.implication),
      tier,
      confidence,
      source: asString(row.source),
      dated: /^\d{4}-\d{2}-\d{2}/.test(asString(row.dated)) ? asString(row.dated).slice(0, 10) : todayFromUnknown(row.recordedAt),
      recordedAt: typeof row.recordedAt === "string" ? row.recordedAt : new Date().toISOString(),
      lastInfluencedAt: typeof row.lastInfluencedAt === "string" ? row.lastInfluencedAt : null,
      supersedes: asString(row.supersedes),
      kind,
      relationship: asString(row.relationship),
      researchNote: asString(row.researchNote),
      state: asString(row.state),
      nextAction: asString(row.nextAction),
      owner: asString(row.owner),
      overrides: asString(row.overrides),
    };
    if (!entry.title || !entry.implication.trim()) {
      return { error: "An entry failed the value test and was refused." };
    }
    const blocked = privacyViolation(entryBlob(entry));
    if (blocked) return { error: blocked };
    entries.push(entry);
  }
  return { entries };
}

function todayFromUnknown(recordedAt: unknown): string {
  if (typeof recordedAt === "string" && /^\d{4}-\d{2}-\d{2}/.test(recordedAt)) {
    return recordedAt.slice(0, 10);
  }
  const now = new Date();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${m}-${d}`;
}
