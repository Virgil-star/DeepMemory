import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import planet from "@/assets/meridian/planet.jpg";
import { oddsWord, type Line } from "@/lib/meridian/engine";

type Tone = "brass" | "ok" | "warn" | "muted" | "era";

const FILL: Record<Tone, string> = {
  brass: "bg-brass",
  ok: "bg-ok",
  warn: "bg-warn",
  muted: "bg-muted",
  era: "bg-paper",
};

/** A thin bar. `mark` shows where the value is heading. */
export function Meter({
  value,
  mark,
  tone = "brass",
  label,
}: {
  value: number;
  mark?: number;
  tone?: Tone;
  label: string;
}) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v)}
      className="relative h-1.5 rounded-full bg-rule"
    >
      <div
        className={cn("h-full rounded-full transition-all duration-300", FILL[tone])}
        style={{ width: `${v}%` }}
      />
      {mark != null && (
        <div
          aria-hidden
          className="absolute -top-0.5 h-2.5 w-px bg-paper/70"
          style={{ left: `${Math.max(0, Math.min(100, mark))}%` }}
        />
      )}
    </div>
  );
}

export function Chip({ children, tone }: { children: ReactNode; tone?: "ok" | "warn" | "brass" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-rule px-2 py-0.5 text-xs text-muted",
        tone === "ok" && "border-ok/40 text-ok",
        tone === "warn" && "border-warn/40 text-warn",
        tone === "brass" && "border-brass/40 text-brass",
      )}
    >
      {children}
    </span>
  );
}

/** How likely the ear is to listen: a word, or the number once Foresight is owned. */
export function Odds({ p, exact }: { p: number; exact: boolean }) {
  const tone = p >= 0.6 ? "ok" : p >= 0.4 ? "brass" : "warn";
  return <Chip tone={tone}>{exact ? `Listens ${Math.round(p * 100)}%` : oddsWord(p)}</Chip>;
}

/** A key cap, shown only where there is a keyboard to press. */
export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="hidden min-w-6 items-center justify-center rounded border border-rule bg-raised px-1.5 py-0.5 font-display text-xs text-muted lg:inline-flex">
      {children}
    </kbd>
  );
}

export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("meridian-label text-muted", className)}>{children}</div>;
}

export function Wordmark({ size = "sm" }: { size?: "sm" | "lg" }) {
  return (
    <div
      className={cn("meridian-wordmark text-paper", size === "sm" ? "text-xs" : "text-3xl")}
      aria-label="Meridian"
    >
      MERIDIAN
    </div>
  );
}

/** The planet from the key art, off to one side behind the quieter screens. */
export function Planet() {
  return <img src={planet} alt="" aria-hidden className="meridian-planet meridian-fade" />;
}

const LINE: Record<Line["k"], string> = {
  plain: "text-paper/90",
  good: "text-ok",
  bad: "text-warn",
  voice: "text-brass",
  era: "font-serif text-xl text-paper",
  tip: "rounded-lg border border-brass/30 bg-raised px-3 py-2 text-sm text-paper/90",
};

export function NewsLine({ line }: { line: Line }) {
  return <p className={cn("rise font-serif text-lg leading-relaxed", LINE[line.k])}>{line.t}</p>;
}

/** A panel that rises from the dock on a phone and sits centred on a desk. */
export function Sheet({
  open,
  onClose,
  title,
  blurb,
  children,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  blurb?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/80" />
        <Dialog.Content
          aria-describedby={blurb ? undefined : ""}
          className={cn(
            "sheet rise fixed inset-x-0 bottom-0 z-50 mx-auto flex w-full flex-col rounded-t-2xl bg-surface px-5 pt-5 shadow-pop sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-2xl",
            wide ? "max-w-4xl" : "max-w-2xl",
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="font-serif text-2xl text-paper">{title}</Dialog.Title>
              {blurb && (
                <Dialog.Description className="mt-1 text-sm text-muted">{blurb}</Dialog.Description>
              )}
            </div>
            <Dialog.Close
              aria-label="Close"
              className="-mr-2 -mt-1 inline-flex size-11 shrink-0 items-center justify-center rounded-full text-muted hover:text-paper"
            >
              <X className="size-5" />
            </Dialog.Close>
          </div>
          <div className="mt-4 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  className,
  autoFocus,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      data-autofocus={autoFocus ? "" : undefined}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-paper px-6 font-display text-sm font-semibold uppercase tracking-widest text-ink transition-opacity hover:opacity-90 disabled:opacity-40",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  disabled,
  className,
  danger,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-rule px-5 text-sm text-paper transition-colors hover:border-paper/50 disabled:text-muted disabled:hover:border-rule",
        danger && "text-warn hover:border-warn/60",
        className,
      )}
    >
      {children}
    </button>
  );
}
