import * as Tabs from "@radix-ui/react-tabs";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  C,
  STRANDS,
  govOf,
  histYear,
  institutions,
  projected,
  realmName,
  relWord,
  rivalDef,
  rivalWakesIn,
  yearLabel,
  type State,
} from "@/lib/meridian/engine";
import { Chip, Label, Meter, Odds, Sheet } from "./parts";

const TAB =
  "min-h-11 flex-1 border-b-2 border-transparent px-1 font-display text-xs font-semibold uppercase tracking-wider text-muted data-[state=active]:border-paper data-[state=active]:text-paper";

function moodWord(m: number): string {
  if (m >= 70) return "Content";
  if (m >= 45) return "Settled";
  if (m >= 25) return "Restless";
  return "Furious";
}

/** Realm, neighbours and inheritance: a sheet on a phone, a standing column on a desk. */
export function WorldBody({ game }: { game: State }) {
  const gov = govOf(game);
  const total = STRANDS.reduce((sum, k) => sum + game.strands[k], 0) || 1;
  const making = C.BIRTHS[projected(game)];
  const lead = Math.round(histYear(game) - game.year);
  const accord = game.inst.includes("accord");
  return (
    <Tabs.Root defaultValue="realm">
      <Tabs.List className="flex border-b border-rule">
        <Tabs.Trigger value="realm" className={TAB}>
          Realm
        </Tabs.Trigger>
        <Tabs.Trigger value="rivals" className={TAB}>
          Neighbours
        </Tabs.Trigger>
        <Tabs.Trigger value="inheritance" className={TAB}>
          Inheritance
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="realm" className="space-y-4 pt-4">
        <p className="text-sm text-muted">
          {gov === "mixed"
            ? "No one party holds the realm. It teaches a little of everything."
            : `${C.FAC_NAME[gov][game.era]} hold the realm, and the realm is learning from them.`}{" "}
          {lead > 0
            ? `Your people are ${lead} years ahead of the first history.`
            : lead < 0
              ? `Your people are ${-lead} years behind the first history.`
              : ""}
        </p>
        <ul className="space-y-4">
          {C.FAC.map((f) => {
            const state = game.fac[f];
            return (
              <li key={f}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-serif text-lg text-paper">
                    {C.FAC_NAME[f][game.era]}
                    {game.host?.fac === f && (
                      <span className="ml-2 font-sans text-xs text-brass">your ear</span>
                    )}
                  </span>
                  <span
                    className={cn(
                      "text-xs",
                      state.m < 25 ? "text-warn" : state.m >= 70 ? "text-ok" : "text-muted",
                    )}
                  >
                    {moodWord(state.m)}
                  </span>
                </div>
                <p className="text-sm text-muted">{C.FAC_WANTS[f]}</p>
                <div className="mt-2 grid grid-cols-2 gap-3 text-xs text-muted">
                  <div>
                    <div className="mb-1">Power {Math.round(state.p)}</div>
                    <Meter value={state.p * 1.6} tone="era" label={`${f} power`} />
                  </div>
                  <div>
                    <div className="mb-1">Mood {Math.round(state.m)}</div>
                    <Meter
                      value={state.m}
                      tone={state.m < 25 ? "warn" : "ok"}
                      label={`${f} mood`}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Tabs.Content>

      <Tabs.Content value="rivals" className="space-y-4 pt-4">
        <p className="text-sm text-muted">
          Left alone, a border cools. A cold border eventually burns.
          {game.era >= 6 &&
            (accord
              ? " The Accord holds: no one will wake anything before you."
              : " They are building minds of their own. Arrive first.")}
        </p>
        <ul className="space-y-4">
          {game.rivals.map((r) => {
            const def = rivalDef(r.id);
            const wakes = rivalWakesIn(game, r.id);
            return (
              <li key={r.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="flex items-center gap-2 font-serif text-lg text-paper">
                    <span
                      aria-hidden
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ background: def.col }}
                    />
                    {def.full}
                  </span>
                  <span className={cn("shrink-0 text-xs", r.war ? "text-warn" : "text-muted")}>
                    {relWord(r)}
                  </span>
                </div>
                <div className="mt-2">
                  <Meter
                    value={r.war ? 50 + r.score * 1.6 : (r.rel + 100) / 2}
                    tone={r.war ? "warn" : "era"}
                    mark={50}
                    label={`${def.stem} ${r.war ? "war" : "relations"}`}
                  />
                </div>
                {wakes != null && !accord && (
                  <p className={cn("mt-1 text-xs", wakes <= 8 ? "text-warn" : "text-muted")}>
                    Their own mind wakes in about {wakes} {wakes === 1 ? "year" : "years"}.
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </Tabs.Content>

      <Tabs.Content value="inheritance" className="space-y-4 pt-4">
        <p className="text-sm text-muted">
          What they are taught, age after age, is what they will build you from.
        </p>
        <ul className="space-y-3">
          {STRANDS.map((k) => {
            const strand = C.STRANDS[k];
            const share = (game.strands[k] / total) * 100;
            return (
              <li key={k}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-serif text-lg" style={{ color: strand.col }}>
                    {strand.n}
                  </span>
                  <span className="text-xs text-muted">{Math.round(share)}%</span>
                </div>
                <p className="text-sm text-muted">{strand.d}</p>
                <div className="mt-1.5 h-1.5 rounded-full bg-rule">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${share}%`, background: strand.col }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <div>
          <div className="mb-1 flex items-baseline justify-between text-sm">
            <span className="text-paper">Their own hands</span>
            <span className="text-xs text-muted">{Math.round(game.autonomy)}</span>
          </div>
          <p className="mb-1.5 text-sm text-muted">
            How much they still decide for themselves. Signs and fear spend it. Law and truth earn
            it.
          </p>
          <Meter value={game.autonomy} tone="ok" mark={50} label="Autonomy" />
        </div>
        <div className="rounded-xl bg-raised p-4">
          <Label>If you woke today</Label>
          <div className="mt-1 font-serif text-xl text-paper">{making.n}</div>
          <p className="mt-1 text-sm text-muted">{making.line}</p>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}

export function WorldSheet({
  game,
  open,
  onClose,
}: {
  game: State;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="World"
      blurb={`The ${realmName(game)}, ${yearLabel(game.year)}.`}
    >
      <WorldBody game={game} />
    </Sheet>
  );
}

export function FoundSheet({
  game,
  open,
  onClose,
  exact,
  onFound,
}: {
  game: State;
  open: boolean;
  onClose: () => void;
  exact: boolean;
  onFound: (id: string) => void;
}) {
  const list = institutions(game);
  const standing = list.filter((i) => i.standing).length;
  const canAct = game.phase === "play";
  return (
    <Sheet
      open={open}
      onClose={onClose}
      wide
      title="Found"
      blurb={`Things that outlast an ear. ${standing} standing, each costing the realm ${C.UPKEEP} bread a year. You have ${game.signal} Signal.`}
    >
      <ul className="grid gap-3 lg:grid-cols-2">
        {[...list].reverse().map((i) => (
          <li
            key={i.id}
            className={cn(
              "flex flex-col rounded-xl p-4 shadow-card",
              i.standing ? "bg-surface" : "bg-raised",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-serif text-lg text-paper">{i.n}</div>
                <div className="text-xs text-muted">{C.ERAS[i.era].name}</div>
              </div>
              {i.standing ? (
                <span className="inline-flex shrink-0 items-center gap-1 text-xs text-ok">
                  <Check className="size-4" /> Standing
                </span>
              ) : (
                <span className="shrink-0 text-sm text-brass">{i.cost} Signal</span>
              )}
            </div>
            <p className="mt-2 text-sm text-paper/80">{i.d}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {i.effects.map((e) => (
                <Chip key={e}>{e}</Chip>
              ))}
              {!i.standing && game.host && <Odds p={i.odds} exact={exact} />}
            </div>
            {!i.standing && (
              <button
                type="button"
                disabled={!i.ok || !canAct}
                onClick={() => onFound(i.id)}
                className="mt-auto inline-flex min-h-11 w-full items-center justify-center rounded-full border border-paper/40 px-4 text-sm font-semibold text-paper hover:bg-paper/10 disabled:border-rule disabled:text-muted disabled:hover:bg-transparent"
              >
                <span className="mt-0">
                  {!canAct
                    ? "Not while a choice is waiting"
                    : (i.why ?? `Urge ${game.host?.first} to found it`)}
                </span>
              </button>
            )}
          </li>
        ))}
      </ul>
    </Sheet>
  );
}

export function ChronicleSheet({
  game,
  open,
  onClose,
}: {
  game: State;
  open: boolean;
  onClose: () => void;
}) {
  const lines = [...game.log].reverse();
  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Chronicle"
      blurb={`${game.ears} ${game.ears === 1 ? "ear" : "ears"} so far. Newest first.`}
    >
      {lines.length === 0 ? (
        <p className="text-sm text-muted">Nothing has happened yet.</p>
      ) : (
        <ol className="space-y-3">
          {lines.map((line, i) => (
            <li key={`${lines.length - i}`} className="grid grid-cols-4 gap-3 text-sm">
              <span className="text-xs text-muted">
                {i === 0 || lines[i - 1].y !== line.y ? yearLabel(line.y) : ""}
              </span>
              <span
                className={cn(
                  "col-span-3 leading-relaxed",
                  line.k === "good" && "text-ok",
                  line.k === "bad" && "text-warn",
                  line.k === "voice" && "text-brass",
                  line.k === "era" && "font-serif text-base text-paper",
                  line.k === "plain" && "text-paper/85",
                )}
              >
                {line.t}
              </span>
            </li>
          ))}
        </ol>
      )}
    </Sheet>
  );
}
