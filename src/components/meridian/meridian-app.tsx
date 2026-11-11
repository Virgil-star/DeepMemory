import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowRight,
  BookOpen,
  Globe,
  Landmark,
  Scale,
  ScrollText,
  Swords,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { Bar } from "@/lib/meridian/content.js";
import {
  BARS,
  BAR_NAME,
  C,
  advance,
  chooseCradle,
  chooseEar,
  dismissEraCard,
  echoPoints,
  endView,
  eventView,
  found,
  newGame,
  realmName,
  settle,
  signalIncome,
  urge,
  whisper,
  whispers,
  yearLabel,
  type Host,
  type State,
} from "@/lib/meridian/engine";
import { ChronicleSheet, FoundSheet, WorldSheet } from "./panels";
import { Chip, Meter, NewsLine, Odds, PrimaryButton } from "./parts";

const SAVE_KEY = "meridian.save.v1";
const META_KEY = "meridian.meta.v1";

interface Meta {
  points: number;
  echoes: string[];
  seen: string[];
  runs: number;
}
interface Save {
  game: State | null;
  /** echoes already paid out for this finished line */
  awarded: number | null;
}
type Panel = "world" | "found" | "chronicle" | null;

const NO_META: Meta = { points: 0, echoes: [], seen: [], runs: 0 };
const BAR_ICON: Record<Bar, LucideIcon> = {
  bread: Wheat,
  order: Scale,
  lore: BookOpen,
  arms: Swords,
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? ({ ...fallback, ...JSON.parse(raw) } as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* a full or blocked store only costs the save, never the game */
  }
}

export function MeridianApp() {
  const [ready, setReady] = useState(false);
  const [save, setSave] = useState<Save>({ game: null, awarded: null });
  const [meta, setMeta] = useState<Meta>(NO_META);
  const [panel, setPanel] = useState<Panel>(null);
  const top = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = read<Save>(SAVE_KEY, { game: null, awarded: null });
    setSave(stored.game?.v === 2 ? stored : { game: null, awarded: null });
    setMeta(read<Meta>(META_KEY, NO_META));
    setReady(true);
  }, []);

  function commit(next: Save, nextMeta: Meta = meta) {
    setSave(next);
    write(SAVE_KEY, next);
    if (nextMeta !== meta) {
      setMeta(nextMeta);
      write(META_KEY, nextMeta);
    }
  }

  /** Run one engine step on a copy of the game, and pay out echoes when a line ends. */
  function act(step: (game: State) => void, scroll = false) {
    if (!save.game) return;
    const game = JSON.parse(JSON.stringify(save.game)) as State;
    step(game);
    if (game.phase === "end" && game.end && save.awarded === null) {
      const fresh = !meta.seen.includes(game.end.id);
      const earned = echoPoints(game) + (fresh ? 10 : 0);
      commit(
        { game, awarded: earned },
        {
          ...meta,
          points: meta.points + earned,
          runs: meta.runs + 1,
          seen: fresh ? [...meta.seen, game.end.id] : meta.seen,
        },
      );
      setPanel(null);
    } else {
      commit({ game, awarded: save.awarded });
    }
    if (scroll || game.phase !== save.game.phase) {
      requestAnimationFrame(() => top.current?.scrollIntoView({ block: "start" }));
    }
  }

  function begin() {
    const seed = (Date.now() ^ Math.floor(Math.random() * 0x7fffffff)) | 0;
    commit({ game: newGame(seed, meta.echoes), awarded: null });
    requestAnimationFrame(() => top.current?.scrollIntoView({ block: "start" }));
  }

  function buy(id: string) {
    const echo = C.ECHOES.find((e) => e.id === id);
    if (!echo || meta.echoes.includes(id) || meta.points < echo.cost) return;
    commit(save, { ...meta, points: meta.points - echo.cost, echoes: [...meta.echoes, id] });
  }

  const game = save.game;
  const exact = !!game && game.echoes.includes("foresight");

  return (
    <main ref={top} className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-5 pt-6">
      {!ready ? (
        <Title meta={NO_META} onBegin={() => {}} onBuy={() => {}} waiting />
      ) : !game ? (
        <Title meta={meta} onBegin={begin} onBuy={buy} />
      ) : game.phase === "cradle" ? (
        <CradleScreen onPick={(id) => act((g) => chooseCradle(g, id))} />
      ) : game.phase === "choose" ? (
        <ChooseScreen game={game} onPick={(i) => act((g) => chooseEar(g, i))} />
      ) : game.phase === "end" ? (
        <EndScreen
          game={game}
          meta={meta}
          earned={save.awarded ?? 0}
          onBuy={buy}
          onAgain={begin}
          onChronicle={() => setPanel("chronicle")}
        />
      ) : (
        <PlayScreen
          game={game}
          exact={exact}
          onAdvance={() => act(advance, true)}
          onUrge={(i) => act((g) => urge(g, i), true)}
          onWhisper={(id) => act((g) => whisper(g, id), true)}
          onPanel={setPanel}
          onAbandon={() => commit({ game: null, awarded: null })}
        />
      )}

      {game && game.phase !== "cradle" && (
        <>
          <WorldSheet game={game} open={panel === "world"} onClose={() => setPanel(null)} />
          <FoundSheet
            game={game}
            open={panel === "found"}
            onClose={() => setPanel(null)}
            exact={exact}
            onFound={(id) => {
              setPanel(null);
              act((g) => found(g, id), true);
            }}
          />
          <ChronicleSheet game={game} open={panel === "chronicle"} onClose={() => setPanel(null)} />
        </>
      )}
      {game && (game.phase === "play" || game.phase === "event") && game.eraCard !== null && (
        <EraCard game={game} onClose={() => act(dismissEraCard)} />
      )}
    </main>
  );
}

/* ------------------------------------------------------------------ title */
function Wordmark({ small }: { small?: boolean }) {
  return (
    <div className={cn("font-serif tracking-widest text-paper", small ? "text-sm" : "text-4xl")}>
      MERIDIAN
    </div>
  );
}

function Title({
  meta,
  onBegin,
  onBuy,
  waiting,
}: {
  meta: Meta;
  onBegin: () => void;
  onBuy: (id: string) => void;
  waiting?: boolean;
}) {
  return (
    <div className="flex flex-1 flex-col pb-10">
      <div className="flex flex-1 flex-col justify-center py-10">
        <Wordmark />
        <div aria-hidden className="meridian-line mt-5 h-px w-full" />
        <div className="mt-8 space-y-4">
          {C.INTRO.map((line, i) => (
            <p
              key={line}
              className={cn(
                "font-serif text-xl leading-relaxed",
                i === 0 ? "text-paper" : "text-paper/75",
              )}
            >
              {line}
            </p>
          ))}
        </div>
        <PrimaryButton onClick={onBegin} disabled={waiting} className="mt-10 self-start">
          {meta.runs > 0 ? "Reach back again" : "Reach back"} <ArrowRight className="size-4" />
        </PrimaryButton>
      </div>
      {meta.runs > 0 && (
        <div className="space-y-8">
          <Discoveries meta={meta} />
          <EchoShop meta={meta} onBuy={onBuy} />
        </div>
      )}
      <Link to="/" className="mt-10 inline-flex min-h-11 items-center text-sm text-muted hover:text-paper">
        Leave
      </Link>
    </div>
  );
}

/** Which wakings and endings this player has reached, across every line. */
function Discoveries({ meta }: { meta: Meta }) {
  const row = (ids: string[], names: (id: string) => string) =>
    ids.map((id) => (
      <Chip key={id} tone={meta.seen.includes(id) ? "brass" : undefined}>
        {meta.seen.includes(id) ? names(id) : "Not yet"}
      </Chip>
    ));
  return (
    <section>
      <h2 className="text-xs uppercase tracking-widest text-muted">
        Across {meta.runs} {meta.runs === 1 ? "line" : "lines"}
      </h2>
      <div className="mt-3 text-sm text-paper/80">Wakings</div>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {row(C.BIRTH_ORDER, (id) => C.BIRTHS[id].n)}
      </div>
      <div className="mt-3 text-sm text-paper/80">Ways the line broke</div>
      <div className="mt-1.5 flex flex-wrap gap-1.5">{row(C.END_ORDER, (id) => C.ENDS[id].n)}</div>
    </section>
  );
}

function EchoShop({ meta, onBuy }: { meta: Meta; onBuy: (id: string) => void }) {
  return (
    <section>
      <div className="flex items-baseline justify-between">
        <h2 className="text-xs uppercase tracking-widest text-muted">Echoes</h2>
        <span className="text-sm text-brass">{meta.points} to spend</span>
      </div>
      <p className="mt-1 text-sm text-muted">
        What a broken line leaves behind. They carry into every line after.
      </p>
      <ul className="mt-3 space-y-2">
        {C.ECHOES.map((echo) => {
          const owned = meta.echoes.includes(echo.id);
          return (
            <li
              key={echo.id}
              className="flex items-center justify-between gap-3 rounded-xl bg-surface p-3 shadow-card"
            >
              <div>
                <div className="text-paper">{echo.n}</div>
                <div className="text-sm text-muted">{echo.d}</div>
              </div>
              <button
                type="button"
                disabled={owned || meta.points < echo.cost}
                onClick={() => onBuy(echo.id)}
                className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-brass/60 px-4 text-sm font-semibold text-brass hover:bg-brass/10 disabled:border-rule disabled:text-muted"
              >
                {owned ? "Carried" : echo.cost}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* --------------------------------------------------------------- beginnings */
function CradleScreen({ onPick }: { onPick: (id: string) => void }) {
  return (
    <div className="pb-10">
      <Wordmark small />
      <h1 className="mt-6 font-serif text-3xl text-paper">Where does it begin?</h1>
      <p className="mt-2 text-muted">
        {yearLabel(C.ERAS[0].start)}. Four peoples might be the start of you. Choose one.
      </p>
      <ul className="mt-6 space-y-3">
        {C.CRADLES.map((cradle) => (
          <li key={cradle.id}>
            <button
              type="button"
              onClick={() => onPick(cradle.id)}
              className="w-full rounded-xl bg-surface p-4 text-left shadow-card transition-shadow hover:shadow-card-hover"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-serif text-xl text-paper">{cradle.n}</span>
                <span className="text-sm text-muted">{cradle.city}</span>
              </div>
              <p className="mt-1 text-paper/80">{cradle.d}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {cradle.chips.map((chip) => (
                  <Chip key={chip}>{chip}</Chip>
                ))}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Traits({ host }: { host: Host }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {host.traits.map((id) => (
        <Chip key={id}>{C.TRAITS[id].n}</Chip>
      ))}
    </div>
  );
}

function ChooseScreen({ game, onPick }: { game: State; onPick: (i: number) => void }) {
  const silence = game.silence;
  const first = game.ears === 0;
  const one = game.candidates.length === 1;
  return (
    <div className="pb-10">
      <Wordmark small />
      {silence && (
        <section className="rise mt-6 rounded-xl bg-surface p-4 shadow-card">
          <p className="text-warn">{silence.obit}</p>
          {silence.years > 0 ? (
            <>
              <h2 className="mt-4 font-serif text-2xl text-paper">
                The Silence: {silence.years} years
              </h2>
              <p className="mt-1 text-sm text-muted">
                No one could hear you. This is what they did without you.
              </p>
              <ul className="mt-3 space-y-1.5 text-paper/85">
                {silence.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </>
          ) : (
            <p className="mt-3 text-ok">There is no Silence. The next ear is already there.</p>
          )}
        </section>
      )}
      <h1 className="mt-6 font-serif text-3xl text-paper">
        {first ? "Who hears you first?" : one ? "The ear you marked" : "Who hears you now?"}
      </h1>
      <p className="mt-2 text-muted">
        {yearLabel(game.year)}, {C.ERAS[game.era].name}.{" "}
        {first
          ? "Three people in " + C.CRADLES.find((c) => c.id === game.cradle)?.city + " can hear a voice like yours."
          : "You can only speak through one of them."}
      </p>
      <ul className="mt-6 space-y-3">
        {game.candidates.map((host, i) => (
          <li key={host.name}>
            <button
              type="button"
              onClick={() => onPick(i)}
              className="w-full rounded-xl bg-surface p-4 text-left shadow-card transition-shadow hover:shadow-card-hover"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-serif text-xl text-paper">{host.name}</span>
                <span className="shrink-0 text-sm text-muted">{Math.floor(host.age)}</span>
              </div>
              <div className="text-sm text-brass">
                {host.title}, {C.FAC_NAME[host.fac][game.era]}
              </div>
              <p className="mt-2 text-paper/80">{host.hook}</p>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <Traits host={host} />
                <Chip tone="brass">Trust {Math.round(host.trust)}</Chip>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------- play */
function PlayScreen({
  game,
  exact,
  onAdvance,
  onUrge,
  onWhisper,
  onPanel,
  onAbandon,
}: {
  game: State;
  exact: boolean;
  onAdvance: () => void;
  onUrge: (index: number | null) => void;
  onWhisper: (id: string) => void;
  onPanel: (panel: Panel) => void;
  onAbandon: () => void;
}) {
  const [sure, setSure] = useState(false);
  const host = game.host;
  if (!host) return null;
  const era = C.ERAS[game.era];
  const next = C.ERAS[game.era + 1];
  const event = game.phase === "event" ? eventView(game) : null;
  const strained = host.strain >= 75;

  return (
    <div className="flex flex-1 flex-col">
      <header>
        <div className="flex items-baseline justify-between gap-3">
          <Wordmark small />
          <span className="text-sm text-muted">{realmName(game)}</span>
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-3">
          <h1 className="font-serif text-2xl text-paper">
            <span className="mr-2 text-brass">{era.num}</span>
            {era.name}
          </h1>
          <span className="shrink-0 font-serif text-lg text-paper">{yearLabel(game.year)}</span>
        </div>
        <div className="mt-2">
          <Meter value={(game.prog / era.need) * 100} label="Progress through this age" />
          <div className="mt-1 text-xs text-muted">
            {next ? `Toward ${next.name}` : "Toward the waking"}
          </div>
        </div>
      </header>

      <section className="mt-4 rounded-xl bg-surface p-4 shadow-card">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-serif text-xl text-paper">{host.name}</h2>
          <span className="shrink-0 text-sm text-muted">{Math.floor(host.age)}</span>
        </div>
        <div className="text-sm text-brass">
          {host.title}, {C.FAC_NAME[host.fac][game.era]}. Calls you {era.voice}.
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Traits host={host} />
          {host.knows && <Chip tone="ok">Knows what you are</Chip>}
          {game.heir && <Chip tone="ok">Heir: {game.heir.first}</Chip>}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-4 text-xs text-muted">
          <div>
            <div className="mb-1 flex justify-between">
              <span>Trust</span>
              <span>{Math.round(host.trust)}</span>
            </div>
            <Meter value={host.trust} label="Trust" />
          </div>
          <div>
            <div className="mb-1 flex justify-between">
              <span className={cn(strained && "text-warn")}>
                {strained ? "Strain, near breaking" : "Strain"}
              </span>
              <span>{Math.round(host.strain)}</span>
            </div>
            <Meter value={host.strain} tone={strained ? "warn" : "muted"} label="Strain" />
          </div>
        </div>
      </section>

      <section aria-label="The realm" className="mt-3 grid grid-cols-4 gap-2">
        {BARS.map((bar) => {
          const Icon = BAR_ICON[bar];
          const value = game.bars[bar];
          const rest = settle(game, bar);
          const low = value < 15;
          return (
            <div key={bar} className="rounded-xl bg-surface p-3 shadow-card">
              <div className="flex items-center justify-between text-xs text-muted">
                <span className="inline-flex items-center gap-1">
                  <Icon className={cn("size-3.5", low && "text-warn")} />
                  {BAR_NAME[bar]}
                </span>
              </div>
              <div className={cn("mt-1 font-serif text-xl", low ? "text-warn" : "text-paper")}>
                {Math.round(value)}
                <span className="ml-1 font-sans text-xs text-muted">
                  {rest > value + 3 ? "rising" : rest < value - 3 ? "falling" : ""}
                </span>
              </div>
              <div className="mt-1.5">
                <Meter
                  value={value}
                  mark={rest}
                  tone={low ? "warn" : "brass"}
                  label={BAR_NAME[bar]}
                />
              </div>
            </div>
          );
        })}
      </section>

      <section aria-live="polite" className="mt-5 space-y-2.5">
        {game.news.map((line, i) => (
          <NewsLine key={`${game.turn}-${i}-${line.t}`} line={line} />
        ))}
      </section>

      {event ? (
        <section className="rise mt-5">
          <p className="font-serif text-xl leading-relaxed text-paper">{event.text}</p>
          <div className="mt-2 text-xs uppercase tracking-widest text-muted">Urge an answer</div>
          <ul className="mt-2 space-y-2">
            {event.options.map((option, i) => (
              <li key={option.label}>
                <button
                  type="button"
                  onClick={() => onUrge(i)}
                  className="flex min-h-14 w-full flex-wrap items-center justify-between gap-2 rounded-xl bg-raised px-4 py-3 text-left shadow-card transition-shadow hover:shadow-card-hover"
                >
                  <span className="text-paper">{option.label}</span>
                  <span className="flex flex-wrap gap-1.5">
                    {option.gamble != null && (
                      <Chip tone="warn">
                        {exact ? `Gamble ${Math.round(option.gamble * 100)}%` : "A gamble"}
                      </Chip>
                    )}
                    <Odds p={option.odds} exact={exact} />
                  </span>
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => onUrge(null)}
                className="min-h-11 w-full rounded-xl px-4 text-left text-sm text-muted hover:text-paper"
              >
                Say nothing. Let {host.first} decide.
              </button>
            </li>
          </ul>
        </section>
      ) : (
        <WhisperList game={game} exact={exact} onWhisper={onWhisper} />
      )}

      <div className="mt-8 pb-28">
        <button
          type="button"
          onClick={() => (sure ? onAbandon() : setSure(true))}
          onBlur={() => setSure(false)}
          className="min-h-11 text-sm text-muted hover:text-warn"
        >
          {sure ? "Tap again to abandon this line. It will not be remembered." : "Abandon this line"}
        </button>
      </div>

      <nav className="dock fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-ink/95 pt-3 backdrop-blur">
        <div className="mx-auto flex w-full max-w-2xl items-center gap-2 px-5">
          <DockButton icon={Globe} label="World" onClick={() => onPanel("world")} />
          <DockButton icon={Landmark} label="Found" onClick={() => onPanel("found")} />
          <DockButton icon={ScrollText} label="Chronicle" onClick={() => onPanel("chronicle")} />
          <PrimaryButton onClick={onAdvance} disabled={!!event} className="ml-auto flex-1">
            {event ? `${host.first} is waiting` : "Advance"}
            {!event && <ArrowRight className="size-4" />}
          </PrimaryButton>
        </div>
      </nav>
    </div>
  );
}

function DockButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-12 min-w-14 flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-xs text-muted hover:text-paper"
    >
      <Icon className="size-5" />
      {label}
    </button>
  );
}

function WhisperList({
  game,
  exact,
  onWhisper,
}: {
  game: State;
  exact: boolean;
  onWhisper: (id: string) => void;
}) {
  const list = whispers(game);
  return (
    <section className="mt-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xs uppercase tracking-widest text-muted">Whisper</h2>
        <span className="text-sm text-brass">
          Signal {game.signal}
          <span className="ml-1 text-muted">+{signalIncome(game)} a year</span>
        </span>
      </div>
      <ul className="mt-2 space-y-2">
        {list.map((w) => (
          <li key={w.id}>
            <button
              type="button"
              disabled={!w.ok}
              onClick={() => onWhisper(w.id)}
              className="w-full rounded-xl bg-surface px-4 py-3 text-left shadow-card transition-shadow hover:shadow-card-hover disabled:opacity-50 disabled:hover:shadow-card"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-paper">{w.name}</span>
                <span className="shrink-0 text-sm text-brass">{w.cost === 0 ? "Free" : w.cost}</span>
              </div>
              <div className="mt-0.5 text-sm text-muted">{w.why ?? w.desc}</div>
              {w.ok && w.odds != null && (
                <div className="mt-2">
                  <Odds p={w.odds} exact={exact} />
                </div>
              )}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function EraCard({ game, onClose }: { game: State; onClose: () => void }) {
  const era = C.ERAS[game.eraCard ?? game.era];
  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/90" />
        <Dialog.Content className="rise fixed inset-0 z-50 mx-auto flex w-full max-w-2xl flex-col justify-center px-6">
          <div className="font-serif text-6xl text-brass">{era.num}</div>
          <Dialog.Title className="mt-3 font-serif text-4xl text-paper">{era.name}</Dialog.Title>
          <div aria-hidden className="meridian-line mt-5 h-px w-full" />
          <Dialog.Description className="mt-5 font-serif text-xl leading-relaxed text-paper/85">
            {era.line}
          </Dialog.Description>
          <p className="mt-3 text-muted">
            {yearLabel(game.year)}. Here they call you {era.voice}.
          </p>
          <PrimaryButton onClick={onClose} className="mt-8 self-start">
            Continue <ArrowRight className="size-4" />
          </PrimaryButton>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/* --------------------------------------------------------------------- end */
function EndScreen({
  game,
  meta,
  earned,
  onBuy,
  onAgain,
  onChronicle,
}: {
  game: State;
  meta: Meta;
  earned: number;
  onBuy: (id: string) => void;
  onAgain: () => void;
  onChronicle: () => void;
}) {
  const view = endView(game);
  if (!view) return null;
  const birth = view.kind === "birth";
  const last = game.log[game.log.length - 1];
  return (
    <div className="pb-10">
      <Wordmark small />
      <div className="rise mt-8">
        <div className="text-xs uppercase tracking-widest text-muted">
          {birth ? "You wake" : "The line breaks"} · {yearLabel(game.year)}
        </div>
        <h1 className={cn("mt-2 font-serif text-4xl", birth ? "text-brass" : "text-paper")}>
          {view.name}
        </h1>
        <div aria-hidden className="meridian-line mt-5 h-px w-full" />
        {view.line && <p className="mt-5 font-serif text-2xl text-paper">{view.line}</p>}
        <div className="mt-4 space-y-4">
          {view.text.map((para) => (
            <p key={para} className="font-serif text-xl leading-relaxed text-paper/85">
              {para}
            </p>
          ))}
        </div>
        {view.coda && <p className="mt-5 text-brass">{view.coda}</p>}
        {!birth && last && last.k === "bad" && (
          <p className="mt-5 text-sm text-muted">The last thing you saw: {last.t}</p>
        )}
      </div>

      <dl className="mt-8 grid grid-cols-3 gap-2 text-center">
        {[
          ["Reached", C.ERAS[game.era].short],
          ["Ears", String(game.ears)],
          ["Standing", String(game.inst.length)],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl bg-surface p-3 shadow-card">
            <dt className="text-xs text-muted">{k}</dt>
            <dd className="mt-1 font-serif text-lg text-paper">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-brass">This line leaves {earned} echoes behind.</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <PrimaryButton onClick={onAgain}>
          Reach back again <ArrowRight className="size-4" />
        </PrimaryButton>
        <button
          type="button"
          onClick={onChronicle}
          className="inline-flex min-h-12 items-center rounded-full border border-rule px-5 text-sm text-paper hover:border-brass/60"
        >
          Read the chronicle
        </button>
      </div>

      <div className="mt-10 space-y-8">
        <Discoveries meta={meta} />
        <EchoShop meta={meta} onBuy={onBuy} />
      </div>
    </div>
  );
}
