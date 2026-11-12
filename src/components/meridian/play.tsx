import {
  ArrowRight,
  BookOpen,
  Globe,
  Landmark,
  Menu as MenuIcon,
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
  eventView,
  realmName,
  settle,
  signalIncome,
  whispers,
  yearLabel,
  type State,
} from "@/lib/meridian/engine";
import { WorldBody } from "./panels";
import { Chip, Kbd, Label, Meter, NewsLine, Odds, PrimaryButton, Wordmark } from "./parts";
import { Traits } from "./screens";

export type Panel = "world" | "found" | "chronicle" | null;

const BAR_ICON: Record<Bar, LucideIcon> = {
  bread: Wheat,
  order: Scale,
  lore: BookOpen,
  arms: Swords,
};

/** Seven ages, left to right: the line this history has to walk. */
function Timeline({ game }: { game: State }) {
  const pct = Math.min(100, (game.prog / C.ERAS[game.era].need) * 100);
  return (
    <ol className="flex gap-1.5" aria-label="The seven ages">
      {C.ERAS.map((era, i) => {
        const here = i === game.era;
        return (
          <li key={era.id} className="min-w-0 flex-1" aria-current={here ? "step" : undefined}>
            <div className="h-1 overflow-hidden rounded-full bg-rule">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  here ? "bg-paper" : "bg-paper/45",
                )}
                style={{ width: `${i < game.era ? 100 : here ? pct : 0}%` }}
              />
            </div>
            <div
              className={cn(
                "meridian-label mt-1.5 truncate",
                here ? "text-paper" : i < game.era ? "text-muted" : "text-muted/50",
              )}
            >
              {era.num}
              <span className="hidden lg:inline"> · {era.short}</span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function HeaderButton({
  icon: Icon,
  label,
  hint,
  onClick,
  className,
}: {
  icon: LucideIcon;
  label: string;
  hint?: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm text-paper/80 transition-colors hover:text-paper",
        className,
      )}
    >
      <Icon className="size-4" />
      <span>{label}</span>
      {hint && <Kbd>{hint}</Kbd>}
    </button>
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

function EarCard({ game }: { game: State }) {
  const host = game.host;
  if (!host) return null;
  const strained = host.strain >= 75;
  return (
    <section className="rounded-xl bg-surface p-4 shadow-card" aria-label="Your ear">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-serif text-2xl text-paper">{host.name}</h2>
        <span className="shrink-0 text-sm text-muted">{Math.floor(host.age)}</span>
      </div>
      <div className="text-sm text-brass">
        {host.title}, {C.FAC_NAME[host.fac][game.era]}
      </div>
      <div className="mt-0.5 text-sm text-muted">Calls you {C.ERAS[game.era].voice}.</div>
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
              {strained ? "Near breaking" : "Strain"}
            </span>
            <span>{Math.round(host.strain)}</span>
          </div>
          <Meter value={host.strain} tone={strained ? "warn" : "muted"} label="Strain" />
        </div>
      </div>
    </section>
  );
}

function Bars({ game }: { game: State }) {
  return (
    <section aria-label="The realm" className="grid grid-cols-4 gap-2 lg:grid-cols-2">
      {BARS.map((bar) => {
        const Icon = BAR_ICON[bar];
        const value = game.bars[bar];
        const rest = settle(game, bar);
        const low = value < 15;
        return (
          <div key={bar} className="rounded-xl bg-surface p-3 shadow-card">
            <div className="flex items-center gap-1 text-xs text-muted">
              <Icon className={cn("size-3.5", low && "text-warn")} />
              {BAR_NAME[bar]}
            </div>
            <div className={cn("mt-1 font-serif text-2xl", low ? "text-warn" : "text-paper")}>
              {Math.round(value)}
              <span className="ml-1 hidden font-sans text-xs text-muted sm:inline">
                {rest > value + 3 ? "rising" : rest < value - 3 ? "falling" : ""}
              </span>
            </div>
            <div className="mt-1.5">
              <Meter value={value} mark={rest} tone={low ? "warn" : "era"} label={BAR_NAME[bar]} />
            </div>
          </div>
        );
      })}
    </section>
  );
}

/** What stands, and what the voice has to spend. Desk only: a phone has the Found panel. */
function Standing({ game }: { game: State }) {
  return (
    <section
      className="hidden rounded-xl bg-surface p-4 shadow-card lg:block"
      aria-label="Standing"
    >
      <div className="flex items-baseline justify-between">
        <Label>Signal</Label>
        <span className="font-serif text-2xl text-paper">
          {game.signal}
          <span className="ml-1.5 font-sans text-xs text-muted">+{signalIncome(game)} a year</span>
        </span>
      </div>
      <Label className="mt-4">Standing</Label>
      {game.inst.length === 0 ? (
        <p className="mt-1.5 text-sm text-muted">Nothing yet outlasts {game.host?.first}.</p>
      ) : (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {game.inst.map((id) => (
            <Chip key={id}>{C.INST_BY[id].n.replace(/^The /, "")}</Chip>
          ))}
        </div>
      )}
      <p className="mt-3 text-xs text-muted">
        {yearLabel(game.year)}. Ear {game.ears} of this line.
      </p>
    </section>
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
        <Label>Whisper</Label>
        <span className="text-sm text-brass">
          Signal {game.signal}
          <span className="ml-1 text-muted">+{signalIncome(game)} a year</span>
        </span>
      </div>
      <ul className="mt-2 grid gap-2 xl:grid-cols-2">
        {list.map((w) => (
          <li key={w.id}>
            <button
              type="button"
              disabled={!w.ok}
              onClick={() => onWhisper(w.id)}
              className="h-full w-full rounded-xl bg-surface px-4 py-3 text-left shadow-card transition-shadow hover:shadow-card-hover disabled:opacity-50 disabled:hover:shadow-card"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-paper">{w.name}</span>
                <span className="shrink-0 text-sm text-brass">
                  {w.cost === 0 ? "Free" : w.cost}
                </span>
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

const KEY_HINTS: [string, string][] = [
  ["Space", "Advance"],
  ["1 2 3", "Urge"],
  ["0", "Say nothing"],
  ["F", "Found"],
  ["C", "Chronicle"],
  ["Esc", "Menu"],
];
const PAD_HINTS: [string, string][] = [
  ["A", "Choose"],
  ["B", "Back"],
  ["X", "Advance"],
  ["Y", "World"],
  ["Start", "Menu"],
];

export function PlayScreen({
  game,
  exact,
  pad,
  onAdvance,
  onUrge,
  onWhisper,
  onPanel,
  onMenu,
}: {
  game: State;
  exact: boolean;
  pad: boolean;
  onAdvance: () => void;
  onUrge: (index: number | null) => void;
  onWhisper: (id: string) => void;
  onPanel: (panel: Panel) => void;
  onMenu: () => void;
}) {
  const host = game.host;
  if (!host) return null;
  const era = C.ERAS[game.era];
  const next = C.ERAS[game.era + 1];
  const event = game.phase === "event" ? eventView(game) : null;

  return (
    <div className="relative flex min-h-dvh flex-col lg:h-dvh lg:overflow-hidden">
      <div className="meridian-horizon" aria-hidden />

      <header className="relative mx-auto w-full max-w-screen-2xl px-5 pt-3 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Wordmark />
          <div className="flex items-center">
            <span className="mr-3 hidden text-sm text-muted lg:inline">{realmName(game)}</span>
            <HeaderButton
              icon={Landmark}
              label="Found"
              hint="F"
              onClick={() => onPanel("found")}
              className="hidden lg:inline-flex"
            />
            <HeaderButton
              icon={ScrollText}
              label="Chronicle"
              hint="C"
              onClick={() => onPanel("chronicle")}
              className="hidden lg:inline-flex"
            />
            <HeaderButton icon={MenuIcon} label="Menu" hint="Esc" onClick={onMenu} />
          </div>
        </div>
        <div className="mt-1 flex items-baseline justify-between gap-3">
          <h1 className="font-serif text-2xl text-paper lg:text-3xl">{era.name}</h1>
          <span className="shrink-0 font-serif text-xl text-paper lg:text-2xl">
            {yearLabel(game.year)}
          </span>
        </div>
        <div className="mt-3">
          <Timeline game={game} />
          <div className="mt-1 text-xs text-muted lg:hidden">
            {realmName(game)} · {next ? `toward ${next.name}` : "toward the waking"}
          </div>
        </div>
      </header>

      <div className="meridian-stage relative mx-auto w-full max-w-screen-2xl px-5 pb-28 pt-5 lg:px-8 lg:pb-3 lg:pt-12">
        <aside className="meridian-col space-y-3">
          <EarCard game={game} />
          <Bars game={game} />
          <Standing game={game} />
        </aside>

        <section className="meridian-col flex flex-col" data-scene>
          <div aria-live="polite" className="space-y-2.5">
            {game.news.map((line, i) => (
              <NewsLine key={`${game.turn}-${i}-${line.t}`} line={line} />
            ))}
          </div>

          {event ? (
            <div className="rise mt-5">
              <p className="font-serif text-2xl leading-relaxed text-paper">{event.text}</p>
              <Label className="mt-4">Urge an answer</Label>
              <ul className="mt-2 space-y-2">
                {event.options.map((option, i) => (
                  <li key={option.label}>
                    <button
                      type="button"
                      onClick={() => onUrge(i)}
                      data-autofocus={i === 0 ? "" : undefined}
                      className="flex min-h-14 w-full flex-wrap items-center justify-between gap-2 rounded-xl bg-raised px-4 py-3 text-left shadow-card transition-shadow hover:shadow-card-hover"
                    >
                      <span className="flex items-center gap-3 text-paper">
                        <Kbd>{i + 1}</Kbd>
                        {option.label}
                      </span>
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
                    className="flex min-h-11 w-full items-center gap-3 rounded-xl px-4 text-left text-sm text-muted hover:text-paper"
                  >
                    <Kbd>0</Kbd>
                    Say nothing. Let {host.first} decide.
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <WhisperList game={game} exact={exact} onWhisper={onWhisper} />
          )}

          <div className="sticky bottom-0 mt-auto hidden bg-ink pb-1 pt-4 lg:block">
            <PrimaryButton
              onClick={onAdvance}
              disabled={!!event}
              autoFocus={!event}
              className="w-full"
            >
              {event ? `${host.first} is waiting for you` : "Advance"}
              {!event && <ArrowRight className="size-4" />}
            </PrimaryButton>
          </div>
        </section>

        <aside className="meridian-col hidden lg:block" data-world>
          <WorldBody game={game} />
        </aside>
      </div>

      <footer className="relative mx-auto hidden w-full max-w-screen-2xl items-center gap-5 px-8 pb-3 text-xs text-muted lg:flex">
        {(pad ? PAD_HINTS : KEY_HINTS).map(([key, what]) => (
          <span key={what} className="inline-flex items-center gap-1.5">
            <kbd className="rounded border border-rule bg-raised px-1.5 py-0.5 font-display text-paper/80">
              {key}
            </kbd>
            {what}
          </span>
        ))}
      </footer>

      <nav className="dock fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-ink/95 pt-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex w-full max-w-2xl items-center gap-2 px-5">
          <DockButton icon={Globe} label="World" onClick={() => onPanel("world")} />
          <DockButton icon={Landmark} label="Found" onClick={() => onPanel("found")} />
          <DockButton icon={ScrollText} label="Chronicle" onClick={() => onPanel("chronicle")} />
          <PrimaryButton onClick={onAdvance} disabled={!!event} className="ml-auto flex-1">
            {event ? `${host.first} waits` : "Advance"}
            {!event && <ArrowRight className="size-4" />}
          </PrimaryButton>
        </div>
      </nav>
    </div>
  );
}

export function EraCard({ game, onClose }: { game: State; onClose: () => void }) {
  const era = C.ERAS[game.eraCard ?? game.era];
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={era.name}
      className="meridian-fade fixed inset-0 z-40 flex items-center bg-ink"
    >
      <div className="meridian-horizon" aria-hidden />
      <div className="relative mx-auto w-full max-w-3xl px-6">
        <div className="font-serif text-7xl text-paper/90">{era.num}</div>
        <h2 className="mt-4 font-serif text-5xl text-paper">{era.name}</h2>
        <div aria-hidden className="meridian-line mt-6 h-px w-full" />
        <p className="mt-6 font-serif text-2xl leading-relaxed text-paper/85">{era.line}</p>
        <p className="mt-3 text-muted">
          {yearLabel(game.year)}. Here they call you {era.voice}.
        </p>
        <PrimaryButton onClick={onClose} autoFocus className="mt-8">
          Continue <ArrowRight className="size-4" />
        </PrimaryButton>
      </div>
    </div>
  );
}
