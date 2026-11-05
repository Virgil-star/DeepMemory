import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { SkillNav } from "@/components/skill-nav";
import { cn } from "@/lib/cn";
import {
  SKILL,
  architect,
  toPlainText,
  validateBrief,
  type Architecture,
  type Brief,
  type Hours,
} from "@/lib/architect/architect";

const STORAGE_KEY = "zero-cost-architect.v1";
const HOURS: Hours[] = [2, 5, 10, 20];

const EMPTY: Brief = {
  idea: "",
  who: "",
  have: "",
  hours: 5,
  temptation: "",
};

export function ArchitectApp() {
  const [brief, setBrief] = useState<Brief>(EMPTY);
  const [plan, setPlan] = useState<Architecture | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as { brief?: Brief; plan?: Architecture };
      if (saved.brief) setBrief({ ...EMPTY, ...saved.brief });
      if (saved.plan) setPlan(saved.plan);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  function patch(partial: Partial<Brief>) {
    setError(null);
    setCopied(false);
    setBrief((current) => ({ ...current, ...partial }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const problem = validateBrief(brief);
    if (problem) {
      setError(problem);
      setPlan(null);
      return;
    }
    const next = architect(brief);
    setPlan(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ brief, plan: next }));
    requestAnimationFrame(() => {
      document.getElementById("architecture")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  async function copy() {
    if (!plan) return;
    try {
      await navigator.clipboard.writeText(toPlainText(brief, plan));
      setCopied(true);
    } catch {
      setError("The plan is on the page. Copy it from there.");
    }
  }

  function reset() {
    setBrief(EMPTY);
    setPlan(null);
    setError(null);
    setCopied(false);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <div className="min-h-screen md:grid md:grid-cols-[17rem_minmax(0,1fr)]">
      <aside className="border-b border-rule px-4 py-5 md:sticky md:top-0 md:flex md:h-screen md:flex-col md:border-r md:border-b-0 md:px-5 md:py-6">
        <div>
          <p className="font-serif text-2xl leading-none text-paper">Zero-Cost</p>
          <p className="mt-2 text-xs font-medium tracking-widest text-brass uppercase">
            Idea architect
          </p>
        </div>
        <div className="mt-3">
          <SkillNav current="architect" />
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
          The skill runs here. Nothing is sent, and nothing is bought.
        </p>
      </aside>

      <main className="mx-auto w-full max-w-2xl px-4 py-6 md:px-8 md:py-8">
        <h1 className="font-serif text-3xl leading-tight text-paper">Architect an idea that spends nothing.</h1>
        <p className="mt-2 text-sm text-muted">
          A sentence, a person you can name, and the hours you will actually give it.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-5">
          <Field label="The idea">
            <textarea
              value={brief.idea}
              onChange={(event) => patch({ idea: event.target.value })}
              rows={3}
              placeholder="Say it in one sentence"
              className={fieldClass}
            />
          </Field>
          <Field label="Who it is for" hint="One person, or a few you can actually reach.">
            <input
              value={brief.who}
              onChange={(event) => patch({ who: event.target.value })}
              placeholder="Name them"
              className={fieldClass}
              autoComplete="off"
            />
          </Field>
          <Field label="What you already have" hint="Tools, materials, a list of people. Leave blank if it is only time.">
            <input
              value={brief.have}
              onChange={(event) => patch({ have: event.target.value })}
              placeholder="Notes, a phone, a group chat"
              className={fieldClass}
              autoComplete="off"
            />
          </Field>
          <fieldset>
            <legend className="text-xs font-medium tracking-widest text-muted uppercase">
              Hours this week
            </legend>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {HOURS.map((hours) => (
                <button
                  key={hours}
                  type="button"
                  aria-pressed={brief.hours === hours}
                  onClick={() => patch({ hours })}
                  className={cn(
                    "min-h-11 rounded-lg text-sm tabular-nums",
                    brief.hours === hours ? "bg-brass font-semibold text-ink" : "bg-surface text-paper shadow-card",
                  )}
                >
                  {hours}
                </button>
              ))}
            </div>
          </fieldset>
          <Field label="What you are tempted to buy" hint="Optional. It will be cut, not budgeted.">
            <input
              value={brief.temptation}
              onChange={(event) => patch({ temptation: event.target.value })}
              placeholder="A domain, ads, a logo"
              className={fieldClass}
              autoComplete="off"
            />
          </Field>
          {error ? (
            <p role="alert" className="rounded-lg border-l-2 border-l-brass bg-surface px-3 py-3 text-sm text-paper">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            className="min-h-11 w-full rounded-lg bg-brass text-sm font-semibold text-ink"
          >
            Architect it
          </button>
        </form>

        {plan ? <PlanView plan={plan} copied={copied} onCopy={() => void copy()} onReset={reset} /> : null}
      </main>
    </div>
  );
}

function PlanView({
  plan,
  copied,
  onCopy,
  onReset,
}: {
  plan: Architecture;
  copied: boolean;
  onCopy: () => void;
  onReset: () => void;
}) {
  return (
    <article id="architecture" className="mt-10 scroll-mt-6 space-y-4">
      <header>
        <p className="text-xs font-medium tracking-widest text-brass uppercase">
          {plan.kindLabel} · Spend $0
        </p>
        <h2 className="mt-2 font-serif text-2xl leading-snug text-paper">{plan.thesis}</h2>
      </header>

      <Section title="The exchange">
        <p>{plan.theyGet}</p>
        <p className="mt-2">{plan.youGet}</p>
      </Section>

      <Section title="Stack">
        <ul className="space-y-2">
          {plan.stack.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </Section>

      <Section title="Cut">
        <ul className="space-y-3">
          {plan.cuts.map((cut) => (
            <li key={cut.spend}>
              <p className="text-brass">{cut.spend}</p>
              <p className="mt-1">{cut.instead}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="The loop">
        <p className="font-serif text-lg leading-snug">{plan.loop}</p>
      </Section>

      <Section title="Seven days">
        <ol className="space-y-3">
          {plan.days.map((day) => (
            <li key={day.label} className="grid grid-cols-[4.5rem_1fr] gap-3">
              <span className="text-brass">{day.label}</span>
              <span>{day.text}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Kill line">
        <p className="font-serif text-lg leading-snug">{plan.kill}</p>
      </Section>

      <Section title="Refused">
        <ul className="space-y-2">
          {plan.refusals.map((line) => (
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
          {copied ? "Copied" : "Copy the plan"}
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
    <label className="block">
      <span className="text-xs font-medium tracking-widest text-muted uppercase">{label}</span>
      {hint ? <span className="mt-1 block text-sm text-muted">{hint}</span> : null}
      {children}
    </label>
  );
}

const fieldClass =
  "mt-2 w-full rounded-lg bg-surface px-3 py-3 text-base text-paper shadow-card placeholder:text-muted";
