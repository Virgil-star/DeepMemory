import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import hold from "@/assets/meridian/title-hold.jpg";
import poster from "@/assets/meridian/title-poster.jpg";
import mp4 from "@/assets/meridian/title.mp4";
import { C } from "@/lib/meridian/engine";
import { VERSION } from "@/lib/meridian/meta";
import { desktop } from "@/lib/meridian/platform";
import type { Menu } from "./menus";
import { PrimaryButton } from "./parts";

const LINK =
  "meridian-label inline-flex min-h-11 items-center px-3 text-paper/70 transition-colors hover:text-paper";

/** The opening: dawn along the limb, then the menu over the last frame. */
export function Title({
  ready,
  replay,
  calm,
  volume,
  saved,
  onContinue,
  onNew,
  onOpen,
  onIntroEnd,
  leave,
}: {
  ready: boolean;
  /** play the film; false once it has been seen this sitting */
  replay: boolean;
  calm: boolean;
  volume: number;
  /** a line of text describing the line in progress, if there is one */
  saved: string | null;
  onContinue: () => void;
  onNew: () => void;
  onOpen: (menu: Menu) => void;
  onIntroEnd: () => void;
  leave?: ReactNode;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [still, setStill] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const ended = useRef(onIntroEnd);
  ended.current = onIntroEnd;

  useEffect(() => {
    if (!ready) return;
    const film = video.current;
    if (calm || !replay || !film) {
      setStill(true);
      setRevealed(true);
      ended.current();
      return;
    }
    const giveUp = () => {
      setStill(true);
      setRevealed(true);
      ended.current();
    };
    /* sound if the platform allows it before a gesture, silent if not */
    film
      .play()
      .catch(() => {
        film.muted = true;
        return film.play();
      })
      .catch(giveUp);

    const reveal = () => {
      setRevealed(true);
      if (film.readyState < 2) giveUp();
    };
    const timer = setTimeout(reveal, 3400);
    const skip = () => {
      if (film.muted) film.muted = false;
      setRevealed(true);
    };
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    window.addEventListener("meridian:input", skip);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("meridian:input", skip);
    };
  }, [ready, calm, replay]);

  useEffect(() => {
    if (video.current) video.current.volume = Math.max(0, Math.min(1, volume));
  }, [volume, still]);

  const shell = ready ? desktop() : null;
  return (
    <div className="relative flex min-h-dvh flex-col justify-center overflow-hidden bg-ink">
      {still ? (
        <img src={hold} alt="Meridian" className="meridian-title-art" />
      ) : (
        <video
          ref={video}
          className="meridian-title-art"
          poster={poster}
          playsInline
          preload="auto"
          aria-label="Meridian. Dawn along the edge of a world."
          onEnded={() => ended.current()}
        >
          <source src={mp4} type="video/mp4" />
        </video>
      )}

      <div className={cn("meridian-title-menu", revealed ? "meridian-fade" : "invisible")}>
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <p className="max-w-xl font-serif text-lg leading-relaxed text-paper/85">{C.INTRO[1]}</p>
          <div className="mt-6 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            {saved && (
              <PrimaryButton onClick={onContinue} autoFocus className="w-full sm:w-auto">
                Continue <ArrowRight className="size-4" />
              </PrimaryButton>
            )}
            {saved ? (
              <button
                type="button"
                onClick={onNew}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-paper/40 px-6 font-display text-sm font-semibold uppercase tracking-widest text-paper hover:bg-paper/10 sm:w-auto"
              >
                New line
              </button>
            ) : (
              <PrimaryButton onClick={onNew} autoFocus className="w-full sm:w-auto">
                Reach back <ArrowRight className="size-4" />
              </PrimaryButton>
            )}
          </div>
          {saved && <p className="mt-3 text-sm text-muted">{saved}</p>}
          <nav className="mt-5 flex flex-wrap items-center justify-center">
            <button type="button" className={LINK} onClick={() => onOpen("echoes")}>
              Echoes
            </button>
            <button type="button" className={LINK} onClick={() => onOpen("achievements")}>
              Achievements
            </button>
            <button type="button" className={LINK} onClick={() => onOpen("how")}>
              How to play
            </button>
            <button type="button" className={LINK} onClick={() => onOpen("settings")}>
              Settings
            </button>
            {shell ? (
              <button type="button" className={LINK} onClick={() => shell.quit()}>
                Quit
              </button>
            ) : (
              leave
            )}
          </nav>
          <p className="mt-4 text-xs text-muted/70">
            {VERSION}
            {shell?.steam ? " · Steam" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export const TITLE_LINK = LINK;
