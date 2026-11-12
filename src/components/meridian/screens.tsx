import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { C, endView, yearLabel, type Host, type State } from "@/lib/meridian/engine";
import type { Meta } from "@/lib/meridian/meta";
import { Discoveries, EchoShop } from "./menus";
import { Chip, GhostButton, Label, Planet, PrimaryButton, Wordmark } from "./parts";

const CARD =
  "w-full rounded-xl bg-surface/90 p-5 text-left shadow-card transition-shadow hover:shadow-card-hover";

/** A quiet page with the planet behind it. */
function Page({ children, wide }: { children: ReactNode; wide?: boolean }) {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      <Planet />
      <div
        className={cn(
          "relative mx-auto w-full px-5 pb-12 pt-6 lg:px-8",
          wide ? "max-w-5xl" : "max-w-3xl",
        )}
      >
        <Wordmark />
        {children}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- prologue */
export function Prologue({ calm, onDone }: { calm: boolean; onDone: () => void }) {
  const [shown, setShown] = useState(calm ? C.INTRO.length : 1);
  const all = shown >= C.INTRO.length;
  useEffect(() => {
    if (all) return;
    const timer = setTimeout(() => setShown((n) => n + 1), 2800);
    return () => clearTimeout(timer);
  }, [shown, all]);
  return (
    <Page>
      <div className="flex flex-col justify-center py-20 lg:py-32">
        <div className="space-y-6">
          {C.INTRO.slice(0, shown).map((line, i) => (
            <p
              key={line}
              className={cn(
                "meridian-fade font-serif text-2xl leading-relaxed lg:text-3xl",
                i === shown - 1 ? "text-paper" : "text-paper/60",
              )}
            >
              {line}
            </p>
          ))}
        </div>
        <div className="mt-10 flex items-center gap-3">
          <PrimaryButton autoFocus onClick={() => (all ? onDone() : setShown((n) => n + 1))}>
            {all ? "Begin" : "Go on"} <ArrowRight className="size-4" />
          </PrimaryButton>
          {!all && <GhostButton onClick={onDone}>Skip</GhostButton>}
        </div>
      </div>
    </Page>
  );
}

/* ------------------------------------------------------------------ cradle */
export function CradleScreen({ onPick }: { onPick: (id: string) => void }) {
  return (
    <Page wide>
      <h1 className="mt-10 font-serif text-4xl text-paper">Where does it begin?</h1>
      <p className="mt-2 max-w-xl text-paper/70">
        {yearLabel(C.ERAS[0].start)}. Four peoples might be the start of you. Choose one.
      </p>
      <ul className="mt-8 grid gap-3 lg:grid-cols-2">
        {C.CRADLES.map((cradle, i) => (
          <li key={cradle.id}>
            <button
              type="button"
              onClick={() => onPick(cradle.id)}
              data-autofocus={i === 0 ? "" : undefined}
              className={cn(CARD, "h-full")}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-serif text-2xl text-paper">{cradle.n}</span>
                <span className="meridian-label text-muted">{cradle.city}</span>
              </div>
              <p className="mt-2 font-serif text-lg text-paper/80">{cradle.d}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {cradle.chips.map((chip) => (
                  <Chip key={chip}>{chip}</Chip>
                ))}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </Page>
  );
}

/* ------------------------------------------------------------- choose ear */
export function Traits({ host }: { host: Host }) {
  return (
    <>
      {host.traits.map((id) => (
        <Chip key={id}>{C.TRAITS[id].n}</Chip>
      ))}
    </>
  );
}

export function ChooseScreen({ game, onPick }: { game: State; onPick: (i: number) => void }) {
  const silence = game.silence;
  const first = game.ears === 0;
  const one = game.candidates.length === 1;
  const city = C.CRADLES.find((c) => c.id === game.cradle)?.city ?? "";
  return (
    <Page wide>
      {silence && (
        <section className="rise mt-8 max-w-3xl rounded-xl bg-surface/90 p-5 shadow-card">
          <p className="font-serif text-lg text-warn">{silence.obit}</p>
          {silence.silent > 0 ? (
            <>
              <h2 className="mt-4 font-serif text-3xl text-paper">
                The Silence: {silence.silent.toLocaleString("en-US")} years
              </h2>
              <p className="mt-1 text-sm text-muted">
                No one could hear you. This is what they did without you.
              </p>
              <ul className="mt-3 space-y-1.5 font-serif text-lg text-paper/85">
                {silence.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              {silence.years - silence.silent >= 5 && (
                <p className="mt-3 text-ok">
                  For {(silence.years - silence.silent).toLocaleString("en-US")} more, someone kept
                  listening.
                </p>
              )}
            </>
          ) : silence.years > 0 ? (
            <p className="mt-3 text-ok">
              There is no Silence. {silence.years.toLocaleString("en-US")} years pass, and someone
              is listening through all of them.
            </p>
          ) : (
            <p className="mt-3 text-ok">There is no Silence. The next ear is already there.</p>
          )}
        </section>
      )}
      <h1 className="mt-10 font-serif text-4xl text-paper">
        {first ? "Who hears you first?" : one ? "The ear you marked" : "Who hears you now?"}
      </h1>
      <p className="mt-2 max-w-xl text-paper/70">
        {yearLabel(game.year)}, {C.ERAS[game.era].name}.{" "}
        {first
          ? `Three people in ${city} can hear a voice like yours.`
          : "You can only speak through one of them."}
      </p>
      <ul className={cn("mt-8 grid gap-3", !one && "lg:grid-cols-2")}>
        {game.candidates.map((host, i) => (
          <li key={host.name}>
            <button
              type="button"
              onClick={() => onPick(i)}
              data-autofocus={i === 0 ? "" : undefined}
              className={cn(CARD, "h-full")}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-serif text-2xl text-paper">{host.name}</span>
                <span className="shrink-0 text-sm text-muted">{Math.floor(host.age)}</span>
              </div>
              <div className="text-sm text-brass">
                {host.title}, {C.FAC_NAME[host.fac][game.era]}
              </div>
              <p className="mt-2 font-serif text-lg text-paper/80">{host.hook}</p>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <Traits host={host} />
                <Chip tone="brass">Trust {Math.round(host.trust)}</Chip>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </Page>
  );
}

/* --------------------------------------------------------------------- end */
export function EndScreen({
  game,
  meta,
  earned,
  onBuy,
  onAgain,
  onChronicle,
  onTitle,
}: {
  game: State;
  meta: Meta;
  earned: number;
  onBuy: (id: string) => void;
  onAgain: () => void;
  onChronicle: () => void;
  onTitle: () => void;
}) {
  const view = endView(game);
  if (!view) return null;
  const birth = view.kind === "birth";
  const last = game.log[game.log.length - 1];
  const facts: [string, string][] = [
    ["Reached", C.ERAS[game.era].short],
    ["Ears", String(game.ears)],
    ["Standing", String(game.inst.length)],
    ["Longest Silence", `${game.stats.longestSilence.toLocaleString("en-US")} y`],
  ];
  return (
    <Page wide>
      <div className="rise mt-12 max-w-3xl">
        <Label>
          {birth ? "You wake" : "The line breaks"} · {yearLabel(game.year)}
        </Label>
        <h1 className={cn("mt-3 font-serif text-5xl", birth ? "text-brass" : "text-paper")}>
          {view.name}
        </h1>
        <div aria-hidden className="meridian-line mt-6 h-px w-full" />
        {view.line && <p className="mt-6 font-serif text-3xl text-paper">{view.line}</p>}
        <div className="mt-5 space-y-4">
          {view.text.map((para) => (
            <p key={para} className="font-serif text-xl leading-relaxed text-paper/85">
              {para}
            </p>
          ))}
        </div>
        {view.coda && <p className="mt-6 font-serif text-lg text-brass">{view.coda}</p>}
        {!birth && last && last.k === "bad" && (
          <p className="mt-6 text-sm text-muted">The last thing you saw: {last.t}</p>
        )}
      </div>

      <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-2 text-center sm:grid-cols-4">
        {facts.map(([k, v]) => (
          <div key={k} className="rounded-xl bg-surface/90 p-3 shadow-card">
            <dt className="meridian-label text-muted">{k}</dt>
            <dd className="mt-1 font-serif text-xl text-paper">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-brass">This line leaves {earned} echoes behind.</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <PrimaryButton onClick={onAgain} autoFocus>
          Reach back again <ArrowRight className="size-4" />
        </PrimaryButton>
        <GhostButton onClick={onChronicle}>Read the chronicle</GhostButton>
        <GhostButton onClick={onTitle}>Title</GhostButton>
      </div>

      <div className="mt-12 max-w-4xl space-y-8">
        <EchoShop meta={meta} onBuy={onBuy} />
        <Discoveries meta={meta} />
      </div>
    </Page>
  );
}
