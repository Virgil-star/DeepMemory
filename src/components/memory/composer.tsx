import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { validateDraft } from "@/lib/memory/ledger";
import {
  STORE_LABEL,
  STORES,
  type Confidence,
  type EntryDraft,
  type IdentityKind,
  type StoreId,
  type Tier,
} from "@/lib/memory/types";

type ComposerProps = {
  draft: EntryDraft;
  mode: "record" | "revise";
  onChange: (draft: EntryDraft) => void;
  onClose: () => void;
  onSubmit: (draft: EntryDraft) => void;
};

const TIERS: { id: Tier; hint: string }[] = [
  { id: "observed", hint: "Seen or said." },
  { id: "inference", hint: "A guess. It stays labeled." },
  { id: "unknown", hint: "Leave the fact blank." },
];

const CONFIDENCE: Confidence[] = ["high", "medium", "low"];
const KINDS: IdentityKind[] = ["rule", "preference", "identity"];

export function Composer({ draft, mode, onChange, onClose, onSubmit }: ComposerProps) {
  const titleId = useId();
  const titleRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    titleRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  function patch(partial: Partial<EntryDraft>) {
    setError(null);
    onChange({ ...draft, ...partial });
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const problem = validateDraft(draft);
    if (problem) {
      setError(problem);
      return;
    }
    onSubmit(draft);
  }

  const titleLabel =
    draft.store === "people"
      ? "Name, as given"
      : draft.store === "projects"
        ? "The work"
        : draft.store === "decisions"
          ? "What was decided"
          : "Name the rule";

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-ink/80"
        onClick={onClose}
      />
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onSubmit={submit}
        className="rise relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-surface shadow-pop sm:rounded-2xl"
      >
        <div className="flex items-center justify-between gap-3 border-b border-rule px-4 py-3 sm:px-5">
          <div>
            <h2 id={titleId} className="font-serif text-xl text-paper">
              {mode === "record" ? "Record" : "Revise"}
            </h2>
            <p className="text-sm text-muted">If it changes nothing, it does not belong here.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close the editor"
            className="flex size-11 items-center justify-center rounded-lg text-muted hover:text-paper"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-4 sm:px-5">
          <fieldset>
            <legend className="text-xs font-medium tracking-widest text-muted uppercase">
              Store
            </legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {STORES.map((store) => (
                <Segment
                  key={store}
                  pressed={draft.store === store}
                  onClick={() =>
                    patch({
                      store,
                      kind: store === "identity" ? draft.kind || "rule" : "",
                    })
                  }
                >
                  {STORE_LABEL[store]}
                </Segment>
              ))}
            </div>
          </fieldset>

          {draft.store === "identity" ? (
            <Field label="Kind">
              <div className="grid grid-cols-3 gap-2">
                {KINDS.map((kind) => (
                  <Segment
                    key={kind}
                    pressed={draft.kind === kind}
                    onClick={() => patch({ kind })}
                  >
                    {kind === "identity" ? "Identity" : kind === "preference" ? "Preference" : "Rule"}
                  </Segment>
                ))}
              </div>
            </Field>
          ) : null}

          <Field label={titleLabel}>
            <input
              ref={titleRef}
              value={draft.title}
              onChange={(event) => patch({ title: event.target.value })}
              className={fieldClass}
              autoComplete="off"
            />
          </Field>

          <Field
            label={draft.tier === "unknown" ? "The fact — leave blank if unknown" : "The fact"}
            hint={draft.tier === "inference" ? "This will always render as an inference." : undefined}
          >
            <textarea
              value={draft.body}
              onChange={(event) => patch({ body: event.target.value })}
              rows={4}
              className={cn(fieldClass, "resize-y font-serif")}
            />
          </Field>

          <fieldset>
            <legend className="text-xs font-medium tracking-widest text-muted uppercase">
              Tier
            </legend>
            <div className="mt-2 grid gap-2">
              {TIERS.map((tier) => (
                <Segment
                  key={tier.id}
                  pressed={draft.tier === tier.id}
                  onClick={() => patch({ tier: tier.id })}
                >
                  <span className="capitalize">{tier.id}</span>
                  <span className="font-normal text-muted"> — {tier.hint}</span>
                </Segment>
              ))}
            </div>
          </fieldset>

          <Field
            label="What this changes"
            hint="Required. This is the only reason to keep the entry."
          >
            <textarea
              value={draft.implication}
              onChange={(event) => patch({ implication: event.target.value })}
              rows={3}
              placeholder="The next decision this alters"
              className={cn(fieldClass, "resize-y font-serif")}
            />
          </Field>

          <StoreFields draft={draft} onPatch={patch} />

          <div className="grid grid-cols-2 gap-3">
            <Field label="Date">
              <input
                type="date"
                value={draft.dated}
                onChange={(event) => patch({ dated: event.target.value })}
                className={fieldClass}
              />
            </Field>
            <Field label="Source">
              <input
                value={draft.source}
                onChange={(event) => patch({ source: event.target.value })}
                placeholder="Who or what"
                className={fieldClass}
                autoComplete="off"
              />
            </Field>
          </div>

          <fieldset>
            <legend className="text-xs font-medium tracking-widest text-muted uppercase">
              Confidence
            </legend>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {CONFIDENCE.map((level) => (
                <Segment
                  key={level}
                  pressed={draft.confidence === level}
                  onClick={() => patch({ confidence: level })}
                >
                  {level === "high" ? "High" : level === "medium" ? "Medium" : "Low"}
                </Segment>
              ))}
            </div>
          </fieldset>

          {mode === "revise" ? (
            <Field
              label="What this replaces"
              hint="Name the wording or decision this correction overrides."
            >
              <textarea
                value={draft.supersedes}
                onChange={(event) => patch({ supersedes: event.target.value })}
                rows={2}
                className={cn(fieldClass, "resize-y")}
              />
            </Field>
          ) : null}

          {error ? (
            <p role="alert" className="rounded-lg border-l-2 border-l-brass bg-raised px-3 py-3 text-sm text-paper">
              {error}
            </p>
          ) : null}
        </div>

        <div className="dock border-t border-rule px-4 pt-3 sm:px-5">
          <button
            type="submit"
            className="min-h-11 w-full rounded-lg bg-brass px-4 text-sm font-semibold text-ink transition-opacity duration-150 hover:opacity-90"
          >
            {mode === "record" ? "Keep in the ledger" : "Save the correction"}
          </button>
        </div>
      </form>
    </div>
  );
}

function StoreFields({
  draft,
  onPatch,
}: {
  draft: EntryDraft;
  onPatch: (partial: Partial<EntryDraft>) => void;
}) {
  if (draft.store === "people") {
    return (
      <>
        <Field
          label="Relationship, only as stated"
          hint="Leave this empty if it was never named."
        >
          <input
            value={draft.relationship}
            onChange={(event) => onPatch({ relationship: event.target.value })}
            className={fieldClass}
            autoComplete="off"
          />
        </Field>
        <Field label="Research note" hint="So this lookup is never repeated.">
          <input
            value={draft.researchNote}
            onChange={(event) => onPatch({ researchNote: event.target.value })}
            className={fieldClass}
            autoComplete="off"
          />
        </Field>
      </>
    );
  }
  if (draft.store === "projects") {
    return (
      <>
        <div className="grid grid-cols-2 gap-3">
          <Field label="State">
            <input
              value={draft.state}
              onChange={(event) => onPatch({ state: event.target.value })}
              placeholder="Active, blocked"
              className={fieldClass}
            />
          </Field>
          <Field label="Owner">
            <input
              value={draft.owner}
              onChange={(event) => onPatch({ owner: event.target.value })}
              className={fieldClass}
            />
          </Field>
        </div>
        <Field label="Next action">
          <input
            value={draft.nextAction}
            onChange={(event) => onPatch({ nextAction: event.target.value })}
            className={fieldClass}
          />
        </Field>
      </>
    );
  }
  if (draft.store === "decisions") {
    return (
      <Field label="What this overrides" hint="Then forget the entry it replaces, if it should not remain.">
        <textarea
          value={draft.overrides}
          onChange={(event) => onPatch({ overrides: event.target.value })}
          rows={2}
          className={cn(fieldClass, "resize-y")}
        />
      </Field>
    );
  }
  return null;
}

const fieldClass =
  "mt-2 w-full rounded-lg bg-raised px-3 py-3 text-base text-paper shadow-card placeholder:text-muted/70";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="block">
      <span className="text-xs font-medium tracking-widest text-muted uppercase">{label}</span>
      {hint ? <span className="mt-1 block text-sm text-muted normal-case">{hint}</span> : null}
      {children}
    </div>
  );
}

function Segment({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150",
        pressed ? "bg-brass text-ink" : "bg-raised text-paper shadow-card hover:text-brass",
      )}
    >
      {children}
    </button>
  );
}
