import { useEffect, useState, type ReactNode } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Slider from "@radix-ui/react-slider";
import * as Switch from "@radix-ui/react-switch";
import { Award, Lock } from "lucide-react";
import { cn } from "@/lib/cn";
import { ACHIEVEMENTS, type Achievement } from "@/lib/meridian/achievements";
import { C } from "@/lib/meridian/engine";
import { VERSION, type Meta, type Settings } from "@/lib/meridian/meta";
import { desktop, isFullscreen, setFullscreen } from "@/lib/meridian/platform";
import { Chip, GhostButton, Label, PrimaryButton, Sheet } from "./parts";

export type Menu = "pause" | "settings" | "achievements" | "how" | "echoes" | null;

const ROW =
  "flex min-h-12 w-full items-center justify-between gap-3 rounded-xl bg-raised px-4 text-left text-paper shadow-card transition-shadow hover:shadow-card-hover";

/* ------------------------------------------------------------------- pause */
export function PauseMenu({
  open,
  onClose,
  onOpen,
  onTitle,
  onAbandon,
}: {
  open: boolean;
  onClose: () => void;
  onOpen: (menu: Menu) => void;
  onTitle: () => void;
  onAbandon: () => void;
}) {
  return (
    <Sheet open={open} onClose={onClose} title="Paused" blurb="The line is kept after every year.">
      <div className="space-y-2 pb-1">
        <button type="button" className={ROW} onClick={onClose} data-autofocus="">
          Return to the line
        </button>
        <button type="button" className={ROW} onClick={() => onOpen("how")}>
          How to play
        </button>
        <button type="button" className={ROW} onClick={() => onOpen("achievements")}>
          Achievements
        </button>
        <button type="button" className={ROW} onClick={() => onOpen("settings")}>
          Settings
        </button>
        <button type="button" className={ROW} onClick={onTitle}>
          Keep the line and return to the title
        </button>
        <button type="button" className={cn(ROW, "text-warn")} onClick={onAbandon}>
          Abandon this line
        </button>
      </div>
    </Sheet>
  );
}

/* ---------------------------------------------------------------- settings */
function Volume({
  label,
  value,
  onChange,
  first,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  first?: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-paper">{label}</span>
        <span className="text-muted">{Math.round(value * 100)}</span>
      </div>
      <Slider.Root
        className="relative flex h-11 w-full touch-none select-none items-center"
        data-nav-rect=""
        value={[Math.round(value * 100)]}
        max={100}
        step={5}
        onValueChange={([n]) => onChange(n / 100)}
      >
        <Slider.Track className="relative h-1.5 grow rounded-full bg-rule">
          <Slider.Range className="absolute h-full rounded-full bg-paper" />
        </Slider.Track>
        <Slider.Thumb
          aria-label={label}
          data-autofocus={first ? "" : undefined}
          className="block size-5 rounded-full bg-paper shadow-pop"
        />
      </Slider.Root>
    </div>
  );
}

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (on: boolean) => void;
}) {
  return (
    <label className="flex min-h-12 items-center justify-between gap-4">
      <span>
        <span className="block text-sm text-paper">{label}</span>
        <span className="block text-sm text-muted">{hint}</span>
      </span>
      <Switch.Root
        checked={checked}
        onCheckedChange={onChange}
        className="relative h-7 w-12 shrink-0 rounded-full bg-rule transition-colors data-[state=checked]:bg-paper"
      >
        <Switch.Thumb className="block size-5 translate-x-1 rounded-full bg-muted transition-transform data-[state=checked]:translate-x-6 data-[state=checked]:bg-ink" />
      </Switch.Root>
    </label>
  );
}

export function SettingsSheet({
  open,
  onClose,
  settings,
  onChange,
  onErase,
}: {
  open: boolean;
  onClose: () => void;
  settings: Settings;
  onChange: (next: Settings) => void;
  onErase: () => void;
}) {
  const [full, setFull] = useState(false);
  useEffect(() => {
    if (open) setFull(isFullscreen());
  }, [open]);
  const set = (patch: Partial<Settings>) => onChange({ ...settings, ...patch });
  const sizes: [Settings["text"], string][] = [
    [0, "Normal"],
    [1, "Large"],
    [2, "Largest"],
  ];
  return (
    <Sheet open={open} onClose={onClose} title="Settings">
      <div className="space-y-6 pb-1">
        <section className="space-y-2">
          <Label>Sound</Label>
          <Volume
            first
            label="Everything"
            value={settings.master}
            onChange={(master) => set({ master })}
          />
          <Volume label="Music" value={settings.music} onChange={(music) => set({ music })} />
          <Volume label="Cues" value={settings.sfx} onChange={(sfx) => set({ sfx })} />
        </section>

        <section className="space-y-3">
          <Label>Display</Label>
          <div>
            <div className="mb-2 text-sm text-paper">Text size</div>
            <div role="radiogroup" aria-label="Text size" className="grid grid-cols-3 gap-2">
              {sizes.map(([value, name]) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={settings.text === value}
                  onClick={() => set({ text: value })}
                  className={cn(
                    "min-h-11 rounded-full border px-3 text-sm",
                    settings.text === value
                      ? "border-paper bg-paper text-ink"
                      : "border-rule text-paper hover:border-paper/50",
                  )}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
          <Toggle
            label="Full screen"
            hint={desktop() ? "Also F11, or Alt and Enter." : "Fills the screen with the game."}
            checked={full}
            onChange={(on) => {
              setFullscreen(on);
              setFull(on);
            }}
          />
          <Toggle
            label="Stillness"
            hint="No opening film, and nothing moves."
            checked={settings.calm}
            onChange={(calm) => set({ calm })}
          />
        </section>

        <section className="space-y-2">
          <Label>Memory</Label>
          <p className="text-sm text-muted">
            Erases the line in progress, every echo, every discovery and every achievement kept by
            the game. Settings stay.
          </p>
          <GhostButton danger onClick={onErase}>
            Erase everything
          </GhostButton>
        </section>

        <p className="text-xs text-muted">
          Meridian {VERSION}
          {desktop()?.steam ? " · Steam" : ""}
        </p>
      </div>
    </Sheet>
  );
}

/* ------------------------------------------------------------ achievements */
export function AchievementsSheet({
  open,
  onClose,
  have,
}: {
  open: boolean;
  onClose: () => void;
  have: string[];
}) {
  return (
    <Sheet
      open={open}
      onClose={onClose}
      wide
      title="Achievements"
      blurb={`${have.length} of ${ACHIEVEMENTS.length}.`}
    >
      <ul className="grid gap-2 pb-1 lg:grid-cols-2">
        {ACHIEVEMENTS.map((a) => {
          const got = have.includes(a.id);
          const secret = a.hidden && !got;
          return (
            <li
              key={a.id}
              className={cn(
                "flex items-center gap-3 rounded-xl p-3 shadow-card",
                got ? "bg-raised" : "bg-surface",
              )}
            >
              <span
                className={cn(
                  "inline-flex size-10 shrink-0 items-center justify-center rounded-full border",
                  got ? "border-brass/60 text-brass" : "border-rule text-muted",
                )}
              >
                {got ? <Award className="size-5" /> : <Lock className="size-4" />}
              </span>
              <span>
                <span className={cn("block", got ? "text-paper" : "text-paper/70")}>
                  {secret ? "Not yet known" : a.n}
                </span>
                <span className="block text-sm text-muted">
                  {secret ? "Some things are only found by doing them." : a.d}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </Sheet>
  );
}

/** A short notice when something is earned. */
export function Toasts({ items }: { items: Achievement[] }) {
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex flex-col items-center gap-2 px-4 lg:bottom-auto lg:top-14"
    >
      {items.slice(0, 3).map((a) => (
        <div
          key={a.id}
          className="rise flex items-center gap-3 rounded-full bg-raised py-2 pl-3 pr-5 shadow-pop"
        >
          <Award className="size-5 text-brass" />
          <span>
            <span className="meridian-label block text-brass">Achievement</span>
            <span className="block text-sm text-paper">{a.n}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------- how to play */
function How({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="font-serif text-lg text-paper">{title}</h3>
      <div className="mt-1 space-y-2 text-sm leading-relaxed text-paper/80">{children}</div>
    </section>
  );
}

const KEYS: [string, string, string][] = [
  ["Let a year pass", "Space", "X"],
  ["Urge an answer", "1  2  3", "A"],
  ["Say nothing", "0", "A"],
  ["Move between things", "Tab, arrows", "Stick or d-pad"],
  ["World", "W", "Y"],
  ["Found", "F", "A on Found"],
  ["Chronicle", "C", "A on Chronicle"],
  ["Menu, or close a panel", "Esc", "Start, B"],
];

export function HowSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Sheet
      open={open}
      onClose={onClose}
      wide
      title="How to play"
      blurb="You cannot act. You can only whisper."
    >
      <div className="grid gap-6 pb-1 lg:grid-cols-2">
        <How title="The voice">
          <p>
            You are a mind at the end of history, speaking backwards along it to one person at a
            time: your ear. They rule. You suggest. What they build over seven ages is what you will
            be made from.
          </p>
        </How>
        <How title="Years and choices">
          <p>
            Advance lets the years pass. Most years your ear faces a choice. Urge an answer and they
            may take it, or say nothing and they will follow their own nature. Their traits tell you
            what they lean toward.
          </p>
        </How>
        <How title="Signal, Trust and Strain">
          <p>
            Whispers and foundings cost Signal, which returns a little every year. Trust is how
            readily an ear obeys. Strain is what your voice costs them: at a hundred they break, and
            people learn to fear listening. Saying nothing lets it ease.
          </p>
        </How>
        <How title="The realm">
          <p>
            Bread, Order, Lore and Arms each drift toward the small mark on their bar. Events push
            them around. Bread or Order left empty for three years ends the line. Lore is what
            carries your people toward the next age.
          </p>
        </How>
        <How title="Founding">
          <p>
            Institutions move those marks for good and outlast the ear who built them. Each one also
            costs the realm bread every year, so a realm that builds everything starves.
          </p>
        </How>
        <How title="The Silence">
          <p>
            When an ear dies, centuries can pass before another can hear you, and the realm decays
            while you are gone. Granaries, law, writing and walls protect what they guard. An Oracle
            or a marked heir shortens the gap.
          </p>
        </How>
        <How title="Neighbours">
          <p>
            Borders cool on their own and cold borders turn to war. Gifts warm them. In the last age
            your neighbours race to wake minds of their own: arrive first, or bind them with an
            Accord.
          </p>
        </How>
        <How title="The Inheritance">
          <p>
            Everything you urge feeds one of four strands: Dominion, Devotion, Reason, Kinship. The
            strongest decides what wakes. How much your people still decide for themselves decides
            how that waking goes.
          </p>
        </How>
        <section className="lg:col-span-2">
          <h3 className="font-serif text-lg text-paper">Controls</h3>
          <table className="mt-2 w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-1 font-normal">To</th>
                <th className="py-1 font-normal">Keyboard</th>
                <th className="py-1 font-normal">Controller</th>
              </tr>
            </thead>
            <tbody>
              {KEYS.map(([what, key, button]) => (
                <tr key={what} className="border-t border-rule">
                  <td className="py-2 text-paper/90">{what}</td>
                  <td className="py-2 font-display text-xs text-paper">{key}</td>
                  <td className="py-2 font-display text-xs text-paper">{button}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </Sheet>
  );
}

/* ------------------------------------------------------- echoes and record */
/** Which wakings and endings this player has reached, across every line. */
export function Discoveries({ meta }: { meta: Meta }) {
  const row = (ids: string[], name: (id: string) => string) =>
    ids.map((id) => (
      <Chip key={id} tone={meta.seen.includes(id) ? "brass" : undefined}>
        {meta.seen.includes(id) ? name(id) : "Not yet"}
      </Chip>
    ));
  return (
    <section>
      <Label>
        Across {meta.runs} {meta.runs === 1 ? "line" : "lines"}
      </Label>
      <div className="mt-3 text-sm text-paper/80">Wakings</div>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {row(C.BIRTH_ORDER, (id) => C.BIRTHS[id].n)}
      </div>
      <div className="mt-3 text-sm text-paper/80">Ways the line broke</div>
      <div className="mt-1.5 flex flex-wrap gap-1.5">{row(C.END_ORDER, (id) => C.ENDS[id].n)}</div>
    </section>
  );
}

export function EchoShop({ meta, onBuy }: { meta: Meta; onBuy: (id: string) => void }) {
  return (
    <section>
      <div className="flex items-baseline justify-between">
        <Label>Echoes</Label>
        <span className="text-sm text-brass">{meta.points} to spend</span>
      </div>
      <p className="mt-1 text-sm text-muted">
        What a finished line leaves behind. They carry into every line after.
      </p>
      <ul className="mt-3 grid gap-2 lg:grid-cols-2">
        {C.ECHOES.map((echo) => {
          const owned = meta.echoes.includes(echo.id);
          return (
            <li
              key={echo.id}
              className="flex items-center justify-between gap-3 rounded-xl bg-raised p-3 shadow-card"
            >
              <div>
                <div className="text-paper">{echo.n}</div>
                <div className="text-sm text-muted">{echo.d}</div>
              </div>
              <button
                type="button"
                disabled={owned || meta.points < echo.cost}
                onClick={() => onBuy(echo.id)}
                className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-paper/40 px-4 text-sm font-semibold text-paper hover:bg-paper/10 disabled:border-rule disabled:text-muted disabled:hover:bg-transparent"
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

export function EchoesSheet({
  open,
  onClose,
  meta,
  onBuy,
}: {
  open: boolean;
  onClose: () => void;
  meta: Meta;
  onBuy: (id: string) => void;
}) {
  return (
    <Sheet
      open={open}
      onClose={onClose}
      wide
      title="Echoes"
      blurb="Every line you finish, however it ends, leaves something for the next."
    >
      <div className="space-y-8 pb-1">
        <EchoShop meta={meta} onBuy={onBuy} />
        <Discoveries meta={meta} />
      </div>
    </Sheet>
  );
}

/* ----------------------------------------------------------------- confirm */
export function Confirm({
  open,
  title,
  body,
  action,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  body: string;
  action: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <AlertDialog.Root open={open} onOpenChange={(next) => !next && onCancel()}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-50 bg-ink/85" />
        <AlertDialog.Content className="rise fixed inset-x-4 top-1/2 z-50 mx-auto max-w-md -translate-y-1/2 rounded-2xl bg-surface p-6 shadow-pop">
          <AlertDialog.Title className="font-serif text-2xl text-paper">{title}</AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-paper/80">{body}</AlertDialog.Description>
          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <button
                type="button"
                data-autofocus=""
                className="inline-flex min-h-11 items-center rounded-full border border-rule px-5 text-sm text-paper hover:border-paper/50"
              >
                Keep it
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <PrimaryButton onClick={onConfirm}>{action}</PrimaryButton>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
