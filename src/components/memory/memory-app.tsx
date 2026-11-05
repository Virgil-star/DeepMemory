import { useEffect, useMemo, useRef, useState } from "react";
import { SkillNav } from "@/components/skill-nav";
import { Ellipsis, Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { Composer } from "@/components/memory/composer";
import { EntryCard } from "@/components/memory/entry-card";
import { isStale, matchesQuery, sortByLeverage } from "@/lib/memory/ledger";
import { useMemory } from "@/lib/memory/store";
import {
  STORE_LABEL,
  STORES,
  draftFromEntry,
  emptyDraft,
  type Entry,
  type EntryDraft,
  type LedgerView,
  type StoreId,
} from "@/lib/memory/types";

const VIEWS: { id: LedgerView; label: string }[] = [
  { id: "directives", label: "Directives" },
  ...STORES.map((id) => ({ id, label: STORE_LABEL[id] })),
];

const EMPTY: Record<StoreId, { title: string; body: string }> = {
  identity: {
    title: "No standing rules.",
    body: "Identity holds who someone is, how they want to be addressed, and the rules that stay in force. Every rule is dated.",
  },
  people: {
    title: "No one is recorded.",
    body: "A person enters as they were stated. A tie you have not named stays unnamed. Do not fill a blank by guessing.",
  },
  projects: {
    title: "No active work.",
    body: "Projects keep state, the next action, and an owner. Closed work is removed, not archived.",
  },
  decisions: {
    title: "No decisions yet.",
    body: "Record what was decided, when, and what it overrode. A correction replaces the earlier line. It does not sit beside it.",
  },
};

export function MemoryApp() {
  const entries = useMemory((state) => state.entries);
  const add = useMemory((state) => state.add);
  const revise = useMemory((state) => state.revise);
  const forget = useMemory((state) => state.forget);
  const markUsed = useMemory((state) => state.markUsed);
  const restoreDoctrine = useMemory((state) => state.restoreDoctrine);
  const mergeLedger = useMemory((state) => state.mergeLedger);

  const [view, setView] = useState<LedgerView>("directives");
  const [query, setQuery] = useState("");
  const [staleOnly, setStaleOnly] = useState(false);
  const [editor, setEditor] = useState<
    | { mode: "record" | "revise"; id?: string; draft: EntryDraft }
    | null
  >(null);
  const [menu, setMenu] = useState(false);
  const [menuConfirm, setMenuConfirm] = useState<"restore" | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void useMemory.persist.rehydrate();
  }, []);

  const staleCount = useMemo(() => entries.filter((entry) => isStale(entry)).length, [entries]);

  const visible = useMemo(() => {
    const scoped =
      view === "directives" ? entries : entries.filter((entry) => entry.store === view);
    const filtered = scoped.filter((entry) => {
      if (staleOnly && !isStale(entry)) return false;
      return matchesQuery(entry, query);
    });
    return sortByLeverage(filtered);
  }, [entries, query, staleOnly, view]);

  function openRecord(store?: StoreId) {
    const next = store ?? (view === "directives" ? "identity" : view);
    setEditor({ mode: "record", draft: emptyDraft(next) });
  }

  function openRevise(entry: Entry) {
    setEditor({ mode: "revise", id: entry.id, draft: draftFromEntry(entry) });
  }

  function exportLedger() {
    const blob = new Blob(
      [JSON.stringify({ deepmemory: 1, entries }, null, 2)],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "deepmemory.json";
    link.click();
    URL.revokeObjectURL(url);
    setMenu(false);
  }

  async function importLedger(file: File) {
    try {
      const parsed: unknown = JSON.parse(await file.text());
      const error = mergeLedger(parsed);
      setNotice(error ?? "Merged into the ledger. Matching ids were replaced.");
    } catch {
      setNotice("That file could not be read.");
    }
    setMenu(false);
  }

  const counts = useMemo(() => {
    const map: Record<LedgerView, number> = {
      directives: entries.length,
      identity: 0,
      people: 0,
      projects: 0,
      decisions: 0,
    };
    for (const entry of entries) map[entry.store] += 1;
    return map;
  }, [entries]);

  return (
    <div className="min-h-screen md:grid md:grid-cols-[15rem_minmax(0,1fr)]">
      <aside className="hidden border-r border-rule md:flex md:min-h-screen md:flex-col md:px-4 md:py-6">
        <Brand />
        <nav className="mt-8 flex flex-col gap-1" aria-label="Ledger">
          {VIEWS.map((item) => (
            <NavButton
              key={item.id}
              label={item.label}
              count={counts[item.id]}
              current={view === item.id}
              onClick={() => setView(item.id)}
            />
          ))}
        </nav>
        <div className="mt-auto space-y-2 pt-6">
          <button
            type="button"
            onClick={() => openRecord()}
            className="min-h-11 w-full rounded-lg bg-brass px-3 text-sm font-semibold text-ink"
          >
            Record
          </button>
          <MenuBlock
            open={menu}
            confirm={menuConfirm}
            onToggle={() => {
              setMenu((open) => !open);
              setMenuConfirm(null);
            }}
            onExport={exportLedger}
            onImport={() => fileRef.current?.click()}
            onAskRestore={() => setMenuConfirm("restore")}
            onRestore={() => {
              restoreDoctrine();
              setMenu(false);
              setMenuConfirm(null);
              setNotice("The standing brief is restored. Everything else is gone.");
            }}
            onCancelRestore={() => setMenuConfirm(null)}
          />
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-20 border-b border-rule bg-ink/90 px-4 py-4 backdrop-blur-md md:px-8">
          <div className="mx-auto flex max-w-2xl items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="md:hidden">
                <Brand />
              </div>
              <h1 className="mt-3 font-serif text-xl leading-tight text-paper md:mt-0 md:text-3xl">
                <span className="md:hidden">
                  {view === "directives" ? "Directives" : STORE_LABEL[view]}
                </span>
                <span className="hidden md:inline">
                  {view === "directives" ? "What changes because of this" : STORE_LABEL[view]}
                </span>
              </h1>
              <p className="mt-1 text-sm text-muted tabular-nums">
                {counts.directives} kept · {staleCount} stale · nothing archived
              </p>
            </div>
            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-lg text-muted md:hidden"
              aria-label="Ledger actions"
              aria-expanded={menu}
              onClick={() => {
                setMenu((open) => !open);
                setMenuConfirm(null);
              }}
            >
              <Ellipsis className="size-5" aria-hidden="true" />
            </button>
          </div>

          {menu ? (
            <div className="mx-auto mt-3 max-w-2xl md:hidden">
              <MenuPanel
                confirm={menuConfirm}
                onExport={exportLedger}
                onImport={() => fileRef.current?.click()}
                onAskRestore={() => setMenuConfirm("restore")}
                onRestore={() => {
                  restoreDoctrine();
                  setMenu(false);
                  setMenuConfirm(null);
                  setNotice("The standing brief is restored. Everything else is gone.");
                }}
                onCancelRestore={() => setMenuConfirm(null)}
              />
            </div>
          ) : null}

          <div className="mx-auto mt-4 max-w-2xl">
            <label className="relative block">
              <span className="sr-only">Search the ledger</span>
              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search the ledger"
                className="min-h-11 w-full rounded-lg bg-surface pr-3 pl-10 text-base text-paper shadow-card placeholder:text-muted"
              />
            </label>
          </div>

          <div className="mx-auto mt-3 flex max-w-2xl gap-2 overflow-x-auto md:hidden">
            {VIEWS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-current={view === item.id ? "page" : undefined}
                onClick={() => setView(item.id)}
                className={cn(
                  "min-h-11 shrink-0 rounded-full px-3 text-sm",
                  view === item.id ? "bg-brass text-ink" : "bg-surface text-paper shadow-card",
                )}
              >
                {item.label}
                <span className="ml-2 tabular-nums">{counts[item.id]}</span>
              </button>
            ))}
          </div>
        </header>

        <main className="mx-auto max-w-2xl px-4 pt-4 pb-28 md:px-8 md:pt-6 md:pb-16">
          {view === "directives" ? (
            <p className="text-sm text-muted">
              Only the action. The fact stays underneath, dated and sourced.
            </p>
          ) : null}

          {staleCount > 0 ? (
            <div className="mt-4 flex items-center justify-between gap-3 rounded-lg bg-surface px-3 py-3 shadow-card">
              <p className="text-sm text-paper">
                {staleCount === 1
                  ? "1 entry has not changed an action in 90 days."
                  : `${staleCount} entries have not changed an action in 90 days.`}
              </p>
              <button
                type="button"
                onClick={() => setStaleOnly((on) => !on)}
                className="min-h-11 shrink-0 px-2 text-sm text-brass"
              >
                {staleOnly ? "Show all" : "Review"}
              </button>
            </div>
          ) : null}

          {notice ? (
            <p role="status" className="mt-4 text-sm text-brass">
              {notice}
            </p>
          ) : null}

          <div className="mt-4 space-y-3">
            {visible.length === 0 ? (
              <EmptyState
                view={view}
                searching={query.trim().length > 0 || staleOnly}
                onRecord={() => openRecord(view === "directives" ? undefined : view)}
              />
            ) : (
              visible.map((entry) => (
                <EntryCard
                  key={entry.id}
                  entry={entry}
                  lead={view === "directives" ? "implication" : "fact"}
                  onRevise={openRevise}
                  onForget={(id) => {
                    forget(id);
                    setNotice("Forgotten. Nothing was archived.");
                  }}
                  onUsed={(id) => {
                    markUsed(id);
                    setNotice("Marked. This entry changed an action.");
                  }}
                />
              ))
            )}
          </div>
        </main>
      </div>

      <div className="dock fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-ink/95 px-4 pt-3 backdrop-blur-md md:hidden">
        <button
          type="button"
          onClick={() => openRecord()}
          className="min-h-11 w-full rounded-lg bg-brass text-sm font-semibold text-ink"
        >
          Record
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (file) void importLedger(file);
        }}
      />

      {editor ? (
        <Composer
          draft={editor.draft}
          mode={editor.mode}
          onChange={(draft) => setEditor({ ...editor, draft })}
          onClose={() => setEditor(null)}
          onSubmit={(draft) => {
            if (editor.mode === "revise" && editor.id) revise(editor.id, draft);
            else add(draft);
            setEditor(null);
            setNotice(editor.mode === "revise" ? "Corrected in place." : "Kept in the ledger.");
            if (editor.mode === "record" && view !== "directives") setView(draft.store);
          }}
        />
      ) : null}
    </div>
  );
}

function Brand() {
  return (
    <div>
      <p className="font-serif text-2xl leading-none text-paper">DeepMemory</p>
      <p className="mt-2 text-xs font-medium tracking-widest text-brass uppercase">
        Private ledger
      </p>
      <div className="mt-3">
        <SkillNav current="ledger" />
      </div>
    </div>
  );
}

function NavButton({
  label,
  count,
  current,
  onClick,
}: {
  label: string;
  count: number;
  current: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-current={current ? "page" : undefined}
      onClick={onClick}
      className={cn(
        "flex min-h-11 items-center justify-between rounded-lg px-3 text-left text-sm",
        current ? "bg-brass text-ink" : "text-paper hover:bg-surface",
      )}
    >
      <span>{label}</span>
      <span className="tabular-nums">{count}</span>
    </button>
  );
}

function EmptyState({
  view,
  searching,
  onRecord,
}: {
  view: LedgerView;
  searching: boolean;
  onRecord: () => void;
}) {
  if (searching) {
    return (
      <p className="rounded-2xl bg-surface px-4 py-6 text-sm text-muted shadow-card">
        Nothing in this view matches.
      </p>
    );
  }
  if (view === "directives") {
    return (
      <div className="rounded-2xl bg-surface px-4 py-6 shadow-card">
        <h2 className="font-serif text-xl text-paper">The ledger is empty.</h2>
        <p className="mt-2 text-sm text-muted">
          Record a fact only if you can say what it changes. Forget means delete. Nothing is archived.
        </p>
        <button
          type="button"
          onClick={onRecord}
          className="mt-4 min-h-11 rounded-lg bg-brass px-4 text-sm font-semibold text-ink"
        >
          Record
        </button>
      </div>
    );
  }
  const copy = EMPTY[view];
  return (
    <div className="rounded-2xl bg-surface px-4 py-6 shadow-card">
      <h2 className="font-serif text-xl text-paper">{copy.title}</h2>
      <p className="mt-2 text-sm text-muted">{copy.body}</p>
      <button
        type="button"
        onClick={onRecord}
        className="mt-4 min-h-11 rounded-lg bg-brass px-4 text-sm font-semibold text-ink"
      >
        Record
      </button>
    </div>
  );
}

function MenuBlock(props: {
  open: boolean;
  confirm: "restore" | null;
  onToggle: () => void;
  onExport: () => void;
  onImport: () => void;
  onAskRestore: () => void;
  onRestore: () => void;
  onCancelRestore: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={props.onToggle}
        aria-expanded={props.open}
        className="flex min-h-11 w-full items-center gap-2 rounded-lg px-3 text-left text-sm text-muted hover:text-paper"
      >
        <Ellipsis className="size-4" aria-hidden="true" />
        Ledger
      </button>
      {props.open ? (
        <MenuPanel
          confirm={props.confirm}
          onExport={props.onExport}
          onImport={props.onImport}
          onAskRestore={props.onAskRestore}
          onRestore={props.onRestore}
          onCancelRestore={props.onCancelRestore}
        />
      ) : null}
    </div>
  );
}

function MenuPanel({
  confirm,
  onExport,
  onImport,
  onAskRestore,
  onRestore,
  onCancelRestore,
}: {
  confirm: "restore" | null;
  onExport: () => void;
  onImport: () => void;
  onAskRestore: () => void;
  onRestore: () => void;
  onCancelRestore: () => void;
}) {
  if (confirm === "restore") {
    return (
      <div className="rounded-lg bg-surface p-3 shadow-card">
        <p className="text-sm text-paper">
          This replaces the ledger with the standing brief. Your other entries are forgotten, not archived.
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={onRestore}
            className="min-h-11 flex-1 rounded-lg bg-brass text-sm font-semibold text-ink"
          >
            Restore
          </button>
          <button
            type="button"
            onClick={onCancelRestore}
            className="min-h-11 flex-1 rounded-lg text-sm text-muted"
          >
            Keep
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-lg bg-surface shadow-card">
      <MenuItem onClick={onExport}>Export JSON</MenuItem>
      <MenuItem onClick={onImport}>Import JSON</MenuItem>
      <MenuItem onClick={onAskRestore}>Restore the standing brief</MenuItem>
    </div>
  );
}

function MenuItem({ children, onClick }: { children: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="block min-h-11 w-full border-b border-rule px-3 text-left text-sm text-paper last:border-b-0 hover:text-brass"
    >
      {children}
    </button>
  );
}
