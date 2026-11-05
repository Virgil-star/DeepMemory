import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatDay, influenceLine, isStale } from "@/lib/memory/ledger";
import {
  KIND_LABEL,
  STORE_LABEL,
  TIER_LABEL,
  type Entry,
} from "@/lib/memory/types";

type EntryCardProps = {
  entry: Entry;
  lead: "implication" | "fact";
  onRevise: (entry: Entry) => void;
  onForget: (id: string) => void;
  onUsed: (id: string) => void;
};

export function EntryCard({ entry, lead, onRevise, onForget, onUsed }: EntryCardProps) {
  const [confirming, setConfirming] = useState(false);
  const stale = isStale(entry);
  const kind =
    entry.store === "identity" && entry.kind ? KIND_LABEL[entry.kind] : STORE_LABEL[entry.store];

  return (
    <article
      className={cn(
        "rounded-2xl bg-surface p-4 shadow-card transition-shadow duration-200 hover:shadow-card-hover sm:p-5",
        entry.tier === "inference" && "border-l-2 border-l-brass",
        entry.tier === "unknown" && "border-l-2 border-dashed border-l-muted",
      )}
    >
      <header className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium tracking-widest text-brass uppercase">
          {kind}
          <span className="text-muted"> · {TIER_LABEL[entry.tier]}</span>
          <span className="text-muted"> · {formatDay(entry.dated)}</span>
        </p>
        {stale ? (
          <span className="shrink-0 text-xs font-medium tracking-wide text-brass uppercase">
            Stale
          </span>
        ) : null}
      </header>

      {lead === "implication" ? (
        <>
          <h2 className="mt-3 font-serif text-xl leading-snug font-medium break-words text-paper">
            {entry.implication}
          </h2>
          <details className="group mt-3">
            <summary className="flex min-h-11 items-center gap-2 text-sm text-muted">
              <ChevronRight
                className="size-4 shrink-0 transition-transform duration-200 group-open:rotate-90"
                aria-hidden="true"
              />
              The fact · {entry.title}
            </summary>
            <FactBody entry={entry} />
          </details>
        </>
      ) : (
        <>
          <h2 className="mt-3 font-serif text-xl leading-snug font-medium break-words text-paper">
            {entry.title}
          </h2>
          <FactBody entry={entry} />
          <div className="mt-4 rounded-lg bg-raised px-3 py-3">
            <p className="text-xs font-medium tracking-widest text-brass uppercase">
              Because of this
            </p>
            <p className="mt-1 font-serif text-base leading-snug break-words text-paper">{entry.implication}</p>
          </div>
        </>
      )}

      <Extras entry={entry} />

      <p className="mt-4 text-sm text-muted">
        {entry.source ? `${entry.source} · ` : null}
        {entry.confidence === "high" ? "High" : entry.confidence === "medium" ? "Medium" : "Low"}
        {" · "}
        {influenceLine(entry)}
      </p>
      {entry.supersedes ? (
        <p className="mt-1 text-sm text-muted">Replaces: {entry.supersedes}</p>
      ) : null}
      {stale ? (
        <p className="mt-2 text-sm text-brass">
          Ninety days without changing an action. Forget it, or mark that it still does.
        </p>
      ) : null}

      <div className="mt-3 flex border-t border-rule">
        {confirming ? (
          <>
            <CardAction onClick={() => onForget(entry.id)} emphasis>
              Forget everywhere
            </CardAction>
            <CardAction onClick={() => setConfirming(false)}>Keep</CardAction>
          </>
        ) : (
          <>
            <CardAction onClick={() => onUsed(entry.id)}>Mark used</CardAction>
            <CardAction onClick={() => onRevise(entry)}>Revise</CardAction>
            <CardAction onClick={() => setConfirming(true)}>Forget</CardAction>
          </>
        )}
      </div>
    </article>
  );
}

function FactBody({ entry }: { entry: Entry }) {
  if (entry.tier === "unknown" && !entry.body.trim()) {
    return <p className="mt-2 text-sm text-muted italic">Unknown. Left blank.</p>;
  }
  return (
    <p
      className={cn(
        "mt-2 font-serif text-base leading-relaxed break-words text-paper",
        entry.tier === "inference" && "italic",
      )}
    >
      {entry.body}
    </p>
  );
}

function Extras({ entry }: { entry: Entry }) {
  const lines: { label: string; value: string }[] = [];
  if (entry.store === "people" && entry.relationship.trim()) {
    lines.push({ label: "As stated", value: entry.relationship.trim() });
  }
  if (entry.store === "people" && entry.researchNote.trim()) {
    lines.push({ label: "Already looked up", value: entry.researchNote.trim() });
  }
  if (entry.store === "projects" && entry.state.trim()) {
    lines.push({ label: "State", value: entry.state.trim() });
  }
  if (entry.store === "projects" && entry.nextAction.trim()) {
    lines.push({ label: "Next", value: entry.nextAction.trim() });
  }
  if (entry.store === "projects" && entry.owner.trim()) {
    lines.push({ label: "Owner", value: entry.owner.trim() });
  }
  if (entry.store === "decisions" && entry.overrides.trim()) {
    lines.push({ label: "Overrides", value: entry.overrides.trim() });
  }
  if (lines.length === 0) return null;
  return (
    <dl className="mt-4 space-y-2">
      {lines.map((line) => (
        <div key={line.label} className="grid grid-cols-[5.5rem_1fr] gap-3 text-sm">
          <dt className="text-muted">{line.label}</dt>
          <dd className="text-paper">{line.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function CardAction({
  children,
  onClick,
  emphasis = false,
}: {
  children: string;
  onClick: () => void;
  emphasis?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-11 flex-1 px-2 text-sm transition-colors duration-150 hover:text-brass",
        emphasis ? "font-medium text-brass" : "text-paper",
      )}
    >
      {children}
    </button>
  );
}
