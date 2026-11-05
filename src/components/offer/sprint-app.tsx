import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SkillNav } from "@/components/skill-nav";
import {
  MONEYS,
  MARKETS,
  SKILL,
  sprint,
  toPlainText,
  validateFacts,
  type Facts,
  type Market,
  type Result,
} from "@/lib/offer/sprint";

const STORAGE_KEY = "house-offer-sprint.v1";

const EMPTY: Facts = {
  list: "",
  ceiling: "",
  liquid: "",
  market: "live",
  money: "conventional",
  defect: "",
};

export function SprintApp() {
  const [facts, setFacts] = useState<Facts>(EMPTY);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as { facts?: Facts; result?: Result };
      if (saved.facts) setFacts({ ...EMPTY, ...saved.facts });
      if (saved.result) setResult(saved.result);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  function patch(partial: Partial<Facts>) {
    setError(null);
    setCopied(false);
    setFacts((current) => ({ ...current, ...partial }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const problem = validateFacts(facts);
    if (problem) {
      setError(problem);
      setResult(null);
      return;
    }
    const next = sprint(facts);
    setResult(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ facts, result: next }));
    requestAnimationFrame(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById("sprint")?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    });
  }

  async function copy() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(toPlainText(facts, result));
      setCopied(true);
    } catch {
      setError("The sprint is on the page. Copy it from there.");
    }
  }

  function reset() {
    setFacts(EMPTY);
    setResult(null);
    setError(null);
    setCopied(false);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <div className="min-h-screen md:grid md:grid-cols-[17rem_minmax(0,1fr)]">
      <aside className="border-b border-rule px-4 py-5 md:sticky md:top-0 md:flex md:h-screen md:flex-col md:border-r md:border-b-0 md:px-5 md:py-6">
        <div>
          <p className="font-serif text-2xl leading-none text-paper">House Offer</p>
          <p className="mt-2 text-xs font-medium tracking-widest text-brass uppercase">Sprint</p>
        </div>
        <div className="mt-3">
          <SkillNav current="sprint" />
        </div>
        <ol className="mt-5 space-y-3 md:mt-8">
          {SKILL.map((rule, index) => (
            <li key={rule} className="grid grid-cols-[1.25rem_1fr] gap-2 text-sm text-paper">
              <span className="text-brass tabular-nums">{index + 1}</span>
              <span>{rule}</span>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-sm text-muted md:mt-auto md:pt-6">
          A posture, not a contract. Nothing is sent.
        </p>
      </aside>

      <main className="mx-auto w-full max-w-2xl px-4 py-6 md:px-8 md:py-8">
        <h1 className="font-serif text-3xl leading-tight text-paper">Write the offer you can survive.</h1>
        <p className="mt-2 text-sm text-muted">
          One house. The ceiling first. The skill will not waive the inspection, and it will not spend cash you did not name.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-5">
          <Field label="List price">
            <input
              value={facts.list}
              onChange={(event) => patch({ list: event.target.value })}
              inputMode="decimal"
              placeholder="425000"
              className={fieldClass}
              autoComplete="off"
            />
          </Field>
          <Field label="Your ceiling" hint="The most you can close. This number never goes on the form.">
            <input
              value={facts.ceiling}
              onChange={(event) => patch({ ceiling: event.target.value })}
              inputMode="decimal"
              placeholder="410000"
              className={fieldClass}
              autoComplete="off"
            />
          </Field>
          <Field
            label="Cash you can wire this week"
            hint="Apart from the down payment. Earnest money, and anything over the list. Cash buyers can enter 0."
          >
            <input
              value={facts.liquid}
              onChange={(event) => patch({ liquid: event.target.value })}
              inputMode="decimal"
              placeholder="15000"
              className={fieldClass}
              autoComplete="off"
            />
          </Field>

          <fieldset>
            <legend className="text-xs font-medium tracking-widest text-muted uppercase">The market</legend>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {MARKETS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={facts.market === item.id}
                  onClick={() => patch({ market: item.id })}
                  className={segmentClass(facts.market === item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm text-muted">{marketHint(facts.market)}</p>
          </fieldset>

          <fieldset>
            <legend className="text-xs font-medium tracking-widest text-muted uppercase">The money</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {MONEYS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={facts.money === item.id}
                  onClick={() => patch({ money: item.id })}
                  className={segmentClass(facts.money === item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>

          <Field label="What you already know is wrong" hint="Optional. A named defect waits for a specialist. A request to waive the inspection is refused.">
            <textarea
              value={facts.defect}
              onChange={(event) => patch({ defect: event.target.value })}
              rows={3}
              placeholder="Roof, foundation, or nothing yet"
              className={fieldClass}
            />
          </Field>

          {error ? (
            <p role="alert" className="rounded-lg border-l-2 border-l-brass bg-surface px-3 py-3 text-sm text-paper">
              {error}
            </p>
          ) : null}

          <button type="submit" className="min-h-11 w-full rounded-lg bg-brass text-sm font-semibold text-ink">
            Run the sprint
          </button>
        </form>

        {result ? (
          <ResultView result={result} copied={copied} onCopy={() => void copy()} onReset={reset} />
        ) : null}
      </main>
    </div>
  );
}

function marketHint(market: Market): string {
  if (market === "quiet") return "On the market past a month, and no one else is writing.";
  if (market === "contested") return "More than one offer, or it will be gone this week.";
  return "Showings, and still for sale. Not a bidding war.";
}

function ResultView({
  result,
  copied,
  onCopy,
  onReset,
}: {
  result: Result;
  copied: boolean;
  onCopy: () => void;
  onReset: () => void;
}) {
  return (
    <article id="sprint" className="mt-10 scroll-mt-6 space-y-4">
      <header>
        <p className="text-xs font-medium tracking-widest text-brass uppercase">{result.eyebrow}</p>
        <h2 className="mt-2 font-serif text-2xl leading-snug text-paper">{result.thesis}</h2>
        {result.price ? (
          <p className="mt-3 font-serif text-4xl text-paper tabular-nums">{result.price}</p>
        ) : null}
      </header>

      {result.terms.length ? (
        <Section title="Terms">
          <ul className="space-y-3">
            {result.terms.map((term) => (
              <li key={term.label}>
                <p className="text-brass">{term.label}</p>
                <p className="mt-1">{term.text}</p>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {result.steps.length ? (
        <Section title="The sprint">
          <ol className="space-y-3">
            {result.steps.map((step) => (
              <li key={step.label} className="grid grid-cols-[4.5rem_1fr] gap-3">
                <span className="text-brass">{step.label}</span>
                <span>{step.text}</span>
              </li>
            ))}
          </ol>
        </Section>
      ) : null}

      {result.say ? (
        <Section title="Say this">
          <p className="font-serif text-lg leading-snug">{result.say}</p>
        </Section>
      ) : null}

      <Section title="Kill line">
        <p className="font-serif text-lg leading-snug">{result.kill}</p>
      </Section>

      <Section title="Refused">
        <ul className="space-y-2">
          {result.refusals.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </Section>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCopy}
          className="min-h-11 flex-1 rounded-lg bg-brass text-sm font-semibold text-ink"
        >
          {copied ? "Copied" : "Copy the sprint"}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="min-h-11 flex-1 rounded-lg bg-surface text-sm text-paper shadow-card"
        >
          Start over
        </button>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl bg-surface p-4 text-sm leading-relaxed break-words text-paper shadow-card">
      <h3 className="text-xs font-medium tracking-widest text-brass uppercase">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium tracking-widest text-muted uppercase">{label}</span>
      {hint ? <span className="mt-1 block text-sm text-muted">{hint}</span> : null}
      {children}
    </label>
  );
}

function segmentClass(on: boolean): string {
  return cn(
    "min-h-11 rounded-lg px-2 text-sm",
    on ? "bg-brass font-semibold text-ink" : "bg-surface text-paper shadow-card",
  );
}

const fieldClass =
  "mt-2 w-full rounded-lg bg-surface px-3 py-3 text-base text-paper shadow-card placeholder:text-muted";
