import { useEffect, useRef, useState, type ReactNode } from "react";
import "@fontsource-variable/montserrat";
import { cn } from "@/lib/cn";
import { newlyEarned, type Achievement } from "@/lib/meridian/achievements";
import { Sound, type Scene } from "@/lib/meridian/audio";
import {
  C,
  advance,
  chooseCradle,
  chooseEar,
  dismissEraCard,
  echoPoints,
  found,
  newGame,
  urge,
  whisper,
  yearLabel,
  type State,
} from "@/lib/meridian/engine";
import { ensureFocus, watchPad } from "@/lib/meridian/input";
import {
  NO_META,
  NO_SAVE,
  loadMeta,
  loadSave,
  storeMeta,
  storeSave,
  type Meta,
  type Save,
  type Settings,
} from "@/lib/meridian/meta";
import { unlockOnPlatform } from "@/lib/meridian/platform";
import {
  AchievementsSheet,
  Confirm,
  EchoesSheet,
  HowSheet,
  PauseMenu,
  SettingsSheet,
  Toasts,
  type Menu,
} from "./menus";
import { ChronicleSheet, FoundSheet, WorldSheet } from "./panels";
import { EraCard, PlayScreen, type Panel } from "./play";
import { ChooseScreen, CradleScreen, EndScreen, Prologue } from "./screens";
import { Title } from "./title";

type View = "title" | "prologue" | "game";
type Ask = "new" | "abandon" | "erase" | null;
type Deed = "advance" | "urge" | "silent" | "whisper" | "found" | "pick" | "other";

const clone = (game: State) => JSON.parse(JSON.stringify(game)) as State;
const dialogOpen = () => !!document.querySelector('[role="dialog"], [role="alertdialog"]');

export function MeridianApp({ leave }: { leave?: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [save, setSave] = useState<Save>(NO_SAVE);
  const [meta, setMeta] = useState<Meta>(NO_META);
  const [view, setView] = useState<View>("title");
  const [panel, setPanel] = useState<Panel>(null);
  const [menu, setMenu] = useState<Menu>(null);
  const [ask, setAsk] = useState<Ask>(null);
  const [toasts, setToasts] = useState<Achievement[]>([]);
  const [pad, setPad] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const sound = useRef<Sound | null>(null);
  const top = useRef<HTMLDivElement>(null);

  const game = save.game;
  const settings = meta.settings;
  const playing = view === "game" && !!game && (game.phase === "play" || game.phase === "event");
  const exact = !!game && game.echoes.includes("foresight");

  /* ------------------------------------------------------------ lifetime */
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("meridian");
    sound.current = new Sound();
    setMeta(loadMeta());
    setSave(loadSave());
    setReady(true);
    const wake = () => sound.current?.unlock();
    window.addEventListener("pointerdown", wake);
    window.addEventListener("keydown", wake);
    return () => {
      window.removeEventListener("pointerdown", wake);
      window.removeEventListener("keydown", wake);
      html.classList.remove("meridian", "calm", "pad-mode");
      html.removeAttribute("data-text");
      sound.current?.dispose();
      sound.current = null;
    };
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.dataset.text = String(settings.text);
    html.classList.toggle("calm", settings.calm);
    sound.current?.setLevels(settings);
  }, [settings]);

  useEffect(() => {
    document.documentElement.classList.toggle("pad-mode", pad);
    if (!pad) return;
    const mouse = () => setPad(false);
    window.addEventListener("mousemove", mouse, { once: true });
    return () => window.removeEventListener("mousemove", mouse);
  }, [pad]);

  /* the pad's music follows the age; the title has its own, after the film */
  let scene: Scene = null;
  if (view === "title") scene = introDone ? "title" : null;
  else if (view === "prologue" || !game || game.phase === "cradle") scene = "title";
  else if (game.phase === "end") scene = game.end?.kind === "birth" ? "title" : null;
  else scene = game.era;
  useEffect(() => {
    sound.current?.setScene(scene);
  }, [scene]);

  useEffect(() => {
    if (!toasts.length) return;
    const timer = setTimeout(() => setToasts((list) => list.slice(1)), 4200);
    return () => clearTimeout(timer);
  }, [toasts]);

  /* --------------------------------------------------------------- state */
  /** Keep a save and a profile, and hand out anything they have now earned. */
  function settle(nextSave: Save, base: Meta = meta) {
    const earned = newlyEarned(
      nextSave.game,
      { seen: base.seen, echoes: base.echoes },
      base.achievements,
    );
    let nextMeta = base;
    if (earned.length) {
      nextMeta = { ...base, achievements: [...base.achievements, ...earned.map((a) => a.id)] };
      for (const a of earned) unlockOnPlatform(a.id);
      setToasts((list) => [...list, ...earned]);
      sound.current?.play("unlock", 0.6);
    }
    setSave(nextSave);
    storeSave(nextSave);
    if (nextMeta !== meta) {
      setMeta(nextMeta);
      storeMeta(nextMeta);
    }
  }

  function cue(prev: State, next: State, deed: Deed) {
    const s = sound.current;
    if (!s) return;
    if (next.phase === "end" && prev.phase !== "end") {
      s.play(next.end?.kind === "birth" ? "wake" : "ending");
    } else if (prev.host && !next.host) s.play(next.burned > prev.burned ? "broke" : "death");
    else if (next.era > prev.era) s.play("era");
    else if (next.inst.length > prev.inst.length) s.play("found");
    else if (deed === "advance") s.play("advance");
    else if (deed === "silent" || deed === "pick") s.play("ui");
    else if (deed === "whisper" || deed === "urge" || deed === "found") {
      const fresh = deed === "urge" ? next.news : next.news.slice(prev.news.length);
      s.play("whisper");
      s.play(fresh.some((line) => line.k === "bad") ? "refused" : "heard", 0.35);
    }
  }

  /** Run one engine step on a copy of the line, and pay out echoes when it ends. */
  function act(step: (game: State) => void, deed: Deed = "other") {
    const prev = save.game;
    if (!prev) return;
    const next = clone(prev);
    step(next);
    cue(prev, next, deed);
    if (next.phase === "end" && next.end && save.awarded === null) {
      const fresh = !meta.seen.includes(next.end.id);
      const earned = echoPoints(next) + (fresh ? 10 : 0);
      setPanel(null);
      settle(
        { game: next, awarded: earned },
        {
          ...meta,
          points: meta.points + earned,
          runs: meta.runs + 1,
          seen: fresh ? [...meta.seen, next.end.id] : meta.seen,
        },
      );
    } else {
      settle({ game: next, awarded: save.awarded });
    }
    if (deed !== "other") {
      requestAnimationFrame(() => {
        top.current?.scrollIntoView({ block: "start" });
        document.querySelector("[data-scene]")?.scrollTo({ top: 0 });
        if (document.documentElement.classList.contains("pad-mode")) ensureFocus();
      });
    }
  }

  function begin() {
    const seed = (Date.now() ^ Math.floor(Math.random() * 0x7fffffff)) | 0;
    settle({ game: newGame(seed, meta.echoes), awarded: null });
    setView("game");
    setPanel(null);
    setMenu(null);
    requestAnimationFrame(() => top.current?.scrollIntoView({ block: "start" }));
  }

  function startNew() {
    sound.current?.play("ui");
    if (meta.runs === 0 && !settings.calm) setView("prologue");
    else begin();
  }

  function buy(id: string) {
    const echo = C.ECHOES.find((e) => e.id === id);
    if (!echo || meta.echoes.includes(id) || meta.points < echo.cost) return;
    sound.current?.play("found");
    settle(save, { ...meta, points: meta.points - echo.cost, echoes: [...meta.echoes, id] });
  }

  function changeSettings(next: Settings) {
    const nextMeta = { ...meta, settings: next };
    setMeta(nextMeta);
    storeMeta(nextMeta);
  }

  function confirmed() {
    const what = ask;
    setAsk(null);
    setMenu(null);
    setPanel(null);
    if (what === "new") {
      settle(NO_SAVE);
      startNew();
    } else if (what === "abandon") {
      settle(NO_SAVE);
      setView("title");
    } else if (what === "erase") {
      const wiped = { ...NO_META, settings };
      setSave(NO_SAVE);
      storeSave(NO_SAVE);
      setMeta(wiped);
      storeMeta(wiped);
      setView("title");
    }
  }

  /* --------------------------------------------------------------- input */
  /* listeners are bound once; they reach the current render through this */
  const now = useRef({
    advance: () => {},
    urge: (_index: number | null) => {},
    eraCard: false,
    playing: false,
    phase: "play" as State["phase"],
    options: 0,
    openPanel: (_panel: Panel) => {},
    openMenu: () => {},
    closeEraCard: () => {},
  });
  now.current = {
    advance: () => act(advance, "advance"),
    urge: (index) => act((g) => urge(g, index), index === null ? "silent" : "urge"),
    eraCard: playing && game?.eraCard != null,
    playing,
    phase: game?.phase ?? "play",
    options: 3,
    openPanel: setPanel,
    openMenu: () => setMenu("pause"),
    closeEraCard: () => act(dismissEraCard, "pick"),
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      /* a panel that just closed itself on this key has already used it */
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
      const state = now.current;
      const el = document.activeElement;
      const onControl =
        el instanceof HTMLElement && el !== document.body && el.matches("button, a, input, [role]");
      const go = e.key === " " || e.key === "Enter";
      if (state.eraCard) {
        if (go || e.key === "Escape") {
          e.preventDefault();
          state.closeEraCard();
        }
        return;
      }
      if (!state.playing || dialogOpen()) return;
      const key = e.key.toLowerCase();
      if (key === "escape") state.openMenu();
      else if (key === "f") state.openPanel("found");
      else if (key === "c") state.openPanel("chronicle");
      else if (key === "w") state.openPanel("world");
      else if (state.phase === "event" && ["1", "2", "3"].includes(key))
        state.urge(Number(key) - 1);
      else if (state.phase === "event" && key === "0") state.urge(null);
      else if (state.phase === "play" && go && !onControl) state.advance();
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    const stop = watchPad({
      used: () => {
        setPad(true);
        sound.current?.unlock();
        window.dispatchEvent(new Event("meridian:input"));
      },
      primary: () => {
        const state = now.current;
        if (state.eraCard) state.closeEraCard();
        else if (state.playing && state.phase === "play") state.advance();
      },
      secondary: () => {
        if (!now.current.playing) return;
        const column = document.querySelector<HTMLElement>("[data-world] [role=tab]");
        if (column && column.getBoundingClientRect().width > 0) column.focus();
        else now.current.openPanel("world");
      },
      menu: () => {
        if (now.current.playing) now.current.openMenu();
      },
      back: () => {
        if (now.current.eraCard) now.current.closeEraCard();
      },
    });
    return () => {
      window.removeEventListener("keydown", onKey);
      stop();
    };
  }, []);

  /* ---------------------------------------------------------------- view */
  const saved =
    game && game.phase !== "end"
      ? `${C.ERAS[game.era].name} · ${yearLabel(game.year)}${game.host ? ` · ${game.host.name}` : ""}`
      : game
        ? "The last line has ended. Read how."
        : null;
  const era = view === "game" && game ? game.era : null;

  return (
    <div ref={top} className={cn("meridian-root", era != null && `era-${era}`)}>
      {view === "title" || !ready ? (
        <Title
          ready={ready}
          replay={!introDone}
          calm={settings.calm}
          volume={settings.master * settings.music}
          saved={ready ? saved : null}
          onContinue={() => {
            sound.current?.play("ui");
            setView("game");
          }}
          onNew={() => (game && game.phase !== "end" ? setAsk("new") : startNew())}
          onOpen={setMenu}
          onIntroEnd={() => setIntroDone(true)}
          leave={leave}
        />
      ) : view === "prologue" ? (
        <Prologue calm={settings.calm} onDone={begin} />
      ) : !game ? null : game.phase === "cradle" ? (
        <CradleScreen onPick={(id) => act((g) => chooseCradle(g, id), "pick")} />
      ) : game.phase === "choose" ? (
        <ChooseScreen game={game} onPick={(i) => act((g) => chooseEar(g, i), "pick")} />
      ) : game.phase === "end" ? (
        <EndScreen
          game={game}
          meta={meta}
          earned={save.awarded ?? 0}
          onBuy={buy}
          onAgain={begin}
          onChronicle={() => setPanel("chronicle")}
          onTitle={() => setView("title")}
        />
      ) : (
        <PlayScreen
          game={game}
          exact={exact}
          pad={pad}
          onAdvance={() => act(advance, "advance")}
          onUrge={(i) => act((g) => urge(g, i), i === null ? "silent" : "urge")}
          onWhisper={(id) => act((g) => whisper(g, id), "whisper")}
          onPanel={setPanel}
          onMenu={() => setMenu("pause")}
        />
      )}

      {view === "game" && game && game.phase !== "cradle" && (
        <>
          <WorldSheet game={game} open={panel === "world"} onClose={() => setPanel(null)} />
          <FoundSheet
            game={game}
            open={panel === "found"}
            onClose={() => setPanel(null)}
            exact={exact}
            onFound={(id) => {
              setPanel(null);
              act((g) => found(g, id), "found");
            }}
          />
          <ChronicleSheet game={game} open={panel === "chronicle"} onClose={() => setPanel(null)} />
        </>
      )}
      {playing && game && game.eraCard !== null && (
        <EraCard game={game} onClose={() => act(dismissEraCard, "pick")} />
      )}

      <PauseMenu
        open={menu === "pause"}
        onClose={() => setMenu(null)}
        onOpen={setMenu}
        onTitle={() => {
          setMenu(null);
          setPanel(null);
          setView("title");
        }}
        onAbandon={() => setAsk("abandon")}
      />
      <SettingsSheet
        open={menu === "settings"}
        onClose={() => setMenu(null)}
        settings={settings}
        onChange={changeSettings}
        onErase={() => setAsk("erase")}
      />
      <AchievementsSheet
        open={menu === "achievements"}
        onClose={() => setMenu(null)}
        have={meta.achievements}
      />
      <HowSheet open={menu === "how"} onClose={() => setMenu(null)} />
      <EchoesSheet open={menu === "echoes"} onClose={() => setMenu(null)} meta={meta} onBuy={buy} />
      <Confirm
        open={ask !== null}
        title={
          ask === "erase"
            ? "Erase everything?"
            : ask === "new"
              ? "Begin a new line?"
              : "Abandon this line?"
        }
        body={
          ask === "erase"
            ? "The line in progress, every echo, every discovery and every achievement will be forgotten. This cannot be undone."
            : "The line in progress will be forgotten. It leaves no echoes behind."
        }
        action={ask === "erase" ? "Erase" : ask === "new" ? "Begin again" : "Abandon"}
        onConfirm={confirmed}
        onCancel={() => setAsk(null)}
      />
      <Toasts items={toasts} />
    </div>
  );
}
