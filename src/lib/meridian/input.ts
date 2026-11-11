/* MERIDIAN — controller input. The game is buttons and lists, so a pad drives
   it by moving focus: the stick or d-pad steps to the nearest control in that
   direction, and the face buttons act on it. Standard mapping, as on a Deck. */

export type Dir = "up" | "down" | "left" | "right";

export interface PadActions {
  /** X: let the year pass */
  primary(): void;
  /** Y: open the world */
  secondary(): void;
  /** Start: the menu */
  menu(): void;
  /** B, when nothing is open to close */
  back(): void;
  /** any pad input at all */
  used(): void;
}

const FOCUSABLE =
  'button:not([disabled]), a[href], [role="tab"], [role="slider"], [role="switch"], input:not([disabled])';
const REPEAT_FIRST = 380;
const REPEAT_NEXT = 150;

/** The surface the player is looking at: the topmost dialog, or the page. */
function scope(): ParentNode {
  const open = document.querySelectorAll<HTMLElement>('[role="dialog"], [role="alertdialog"]');
  return open.length ? open[open.length - 1] : document;
}

function candidates(): HTMLElement[] {
  return [...scope().querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => {
    if (el.getAttribute("aria-hidden") === "true" || el.tabIndex < -1) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  });
}

/** Where a control is, for finding its neighbours. A slider counts as its whole track. */
function place(el: HTMLElement): DOMRect {
  return (el.closest<HTMLElement>("[data-nav-rect]") ?? el).getBoundingClientRect();
}

/** Put focus somewhere sensible when it is nowhere, or outside the open surface. */
export function ensureFocus(): HTMLElement | null {
  const list = candidates();
  const active = document.activeElement as HTMLElement | null;
  if (active && list.includes(active)) return active;
  const first = list.find((el) => el.dataset.autofocus != null) ?? list[0] ?? null;
  first?.focus({ preventScroll: true });
  first?.scrollIntoView({ block: "nearest" });
  return first;
}

/** Step focus to the nearest control in a direction. */
export function moveFocus(dir: Dir): void {
  const list = candidates();
  const active = document.activeElement as HTMLElement | null;
  if (!active || !list.includes(active)) {
    ensureFocus();
    return;
  }
  /* a slider takes left and right for itself */
  if (active.getAttribute("role") === "slider" && (dir === "left" || dir === "right")) {
    const key = dir === "left" ? "ArrowLeft" : "ArrowRight";
    active.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }));
    return;
  }
  const from = place(active);
  const cx = from.left + from.width / 2;
  const cy = from.top + from.height / 2;
  let best: HTMLElement | null = null;
  let bestScore = Infinity;
  for (const el of list) {
    if (el === active) continue;
    const r = place(el);
    const dx = r.left + r.width / 2 - cx;
    const dy = r.top + r.height / 2 - cy;
    const along = dir === "up" ? -dy : dir === "down" ? dy : dir === "left" ? -dx : dx;
    const across = dir === "up" || dir === "down" ? Math.abs(dx) : Math.abs(dy);
    /* overlap on the cross axis counts as being straight ahead */
    const overlaps =
      dir === "up" || dir === "down"
        ? r.left < from.right && r.right > from.left
        : r.top < from.bottom && r.bottom > from.top;
    if (along < 4) continue;
    const score = along + (overlaps ? 0 : across * 2.5 + 40);
    if (score < bestScore) {
      bestScore = score;
      best = el;
    }
  }
  if (best) {
    best.focus({ preventScroll: true });
    best.scrollIntoView({ block: "nearest" });
  }
}

function pressEscape(): boolean {
  const open = document.querySelector('[role="dialog"], [role="alertdialog"]');
  if (!open) return false;
  document.dispatchEvent(
    new KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true }),
  );
  return true;
}

/** Start reading the pad. Returns the function that stops it. */
export function watchPad(actions: PadActions): () => void {
  let frame = 0;
  let running = true;
  const held = new Map<string, number>();
  let lastDir: Dir | null = null;
  let nextRepeat = 0;

  const edge = (name: string, down: boolean): boolean => {
    const was = held.has(name);
    if (down && !was) held.set(name, performance.now());
    if (!down && was) held.delete(name);
    return down && !was;
  };

  const loop = () => {
    if (!running) return;
    frame = requestAnimationFrame(loop);
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    const pad = [...pads].find((p) => p && p.connected);
    if (!pad) return;
    const b = (i: number) => !!pad.buttons[i]?.pressed;
    const x = pad.axes[0] ?? 0;
    const y = pad.axes[1] ?? 0;

    let dir: Dir | null = null;
    if (b(12) || y < -0.6) dir = "up";
    else if (b(13) || y > 0.6) dir = "down";
    else if (b(14) || x < -0.6) dir = "left";
    else if (b(15) || x > 0.6) dir = "right";

    const now = performance.now();
    if (dir !== lastDir) {
      lastDir = dir;
      if (dir) {
        actions.used();
        moveFocus(dir);
        nextRepeat = now + REPEAT_FIRST;
      }
    } else if (dir && now >= nextRepeat) {
      moveFocus(dir);
      nextRepeat = now + REPEAT_NEXT;
    }

    if (edge("a", b(0))) {
      actions.used();
      (ensureFocus() ?? undefined)?.click();
    }
    if (edge("b", b(1))) {
      actions.used();
      if (!pressEscape()) actions.back();
    }
    if (edge("x", b(2))) {
      actions.used();
      if (!document.querySelector('[role="dialog"], [role="alertdialog"]')) actions.primary();
    }
    if (edge("y", b(3))) {
      actions.used();
      if (!pressEscape()) actions.secondary();
    }
    if (edge("start", b(9))) {
      actions.used();
      if (!pressEscape()) actions.menu();
    }
  };

  frame = requestAnimationFrame(loop);
  return () => {
    running = false;
    cancelAnimationFrame(frame);
  };
}
