import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { cloneDoctrine } from "@/lib/memory/doctrine";
import { parseLedger } from "@/lib/memory/ledger";
import type { Entry, EntryDraft } from "@/lib/memory/types";

type MemoryState = {
  entries: Entry[];
  add: (draft: EntryDraft) => void;
  revise: (id: string, draft: EntryDraft) => void;
  forget: (id: string) => void;
  markUsed: (id: string) => void;
  restoreDoctrine: () => void;
  mergeLedger: (raw: unknown) => string | null;
};

const memoryStorage = createJSONStorage(() =>
  typeof window === "undefined"
    ? {
        getItem: () => null,
        setItem: () => undefined,
        removeItem: () => undefined,
      }
    : localStorage,
);

export const useMemory = create<MemoryState>()(
  persist(
    (set, get) => ({
      entries: cloneDoctrine(),
      add: (draft) => {
        const now = new Date().toISOString();
        const entry: Entry = {
          ...draft,
          title: draft.title.trim(),
          id: crypto.randomUUID(),
          recordedAt: now,
          lastInfluencedAt: null,
        };
        set({ entries: [entry, ...get().entries] });
      },
      revise: (id, draft) => {
        set({
          entries: get().entries.map((entry) =>
            entry.id === id
              ? {
                  ...entry,
                  ...draft,
                  title: draft.title.trim(),
                  id: entry.id,
                  recordedAt: entry.recordedAt,
                  lastInfluencedAt: entry.lastInfluencedAt,
                }
              : entry,
          ),
        });
      },
      forget: (id) => {
        set({ entries: get().entries.filter((entry) => entry.id !== id) });
      },
      markUsed: (id) => {
        const now = new Date().toISOString();
        set({
          entries: get().entries.map((entry) =>
            entry.id === id ? { ...entry, lastInfluencedAt: now } : entry,
          ),
        });
      },
      restoreDoctrine: () => set({ entries: cloneDoctrine() }),
      mergeLedger: (raw) => {
        const parsed = parseLedger(raw);
        if ("error" in parsed) return parsed.error;
        const byId = new Map(get().entries.map((entry) => [entry.id, entry]));
        for (const entry of parsed.entries) byId.set(entry.id, entry);
        set({ entries: [...byId.values()] });
        return null;
      },
    }),
    {
      name: "deepmemory.v1",
      skipHydration: true,
      storage: memoryStorage,
      partialize: (state) => ({ entries: state.entries }),
    },
  ),
);
