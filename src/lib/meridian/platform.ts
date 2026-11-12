/* MERIDIAN — where the game is running. In a browser, saves live in
   localStorage. In the desktop shell, the preload script exposes
   `window.meridianDesktop` and saves become files Steam Cloud can sync. */

export interface DesktopBridge {
  version: string;
  /** true when the Steam client answered at launch */
  steam: boolean;
  read(key: string): string | null;
  write(key: string, value: string): void;
  unlock(achievement: string): void;
  quit(): void;
  setFullscreen(on: boolean): void;
  isFullscreen(): boolean;
}

declare global {
  interface Window {
    meridianDesktop?: DesktopBridge;
  }
}

export function desktop(): DesktopBridge | null {
  return typeof window !== "undefined" && window.meridianDesktop ? window.meridianDesktop : null;
}

export function load<T extends object>(key: string, fallback: T): T {
  try {
    const shell = desktop();
    const raw = shell ? shell.read(key) : localStorage.getItem(key);
    return raw ? ({ ...fallback, ...(JSON.parse(raw) as object) } as T) : fallback;
  } catch {
    return fallback;
  }
}

export function store(key: string, value: unknown): void {
  try {
    const raw = JSON.stringify(value);
    const shell = desktop();
    if (shell) shell.write(key, raw);
    else localStorage.setItem(key, raw);
  } catch {
    /* a full or blocked store only costs the save, never the game */
  }
}

export function unlockOnPlatform(id: string): void {
  try {
    desktop()?.unlock(id);
  } catch {
    /* Steam being away never blocks play */
  }
}

export function isFullscreen(): boolean {
  const shell = desktop();
  if (shell) return shell.isFullscreen();
  return typeof document !== "undefined" && document.fullscreenElement != null;
}

export function setFullscreen(on: boolean): void {
  const shell = desktop();
  if (shell) {
    shell.setFullscreen(on);
    return;
  }
  if (on) void document.documentElement.requestFullscreen?.().catch(() => {});
  else if (document.fullscreenElement) void document.exitFullscreen?.().catch(() => {});
}
