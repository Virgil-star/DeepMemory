"use strict";
/* Meridian, as a desktop game: one window on the bundled game, saves kept as
   files, Steam achievements and overlay when Steam is running. */
const { app, BrowserWindow, Menu, ipcMain, shell } = require("electron");
const fs = require("node:fs");
const path = require("node:path");
const { createStore } = require("./storage.cjs");
const { startSteam } = require("./steam.cjs");

const log = (line) => console.log(`[meridian] ${line}`);

/* tests and portable installs can point the game at their own folder */
if (process.env.MERIDIAN_USER_DATA) app.setPath("userData", process.env.MERIDIAN_USER_DATA);

/* the opening film has sound; a game window needs no click to earn it */
app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");

const steam = startSteam({ appIdFile: path.join(__dirname, "steam_appid.txt"), log });

let win = null;
let saves = null;
let prefsFile = null;

function readPrefs() {
  try {
    return JSON.parse(fs.readFileSync(prefsFile, "utf8"));
  } catch {
    return {};
  }
}

function writePrefs(prefs) {
  try {
    fs.writeFileSync(prefsFile, JSON.stringify(prefs));
  } catch {
    /* a preference that will not save is not worth a crash */
  }
}

function setFullscreen(on) {
  if (!win || win.isDestroyed()) return;
  win.setFullScreen(on);
  writePrefs({ ...readPrefs(), fullscreen: on });
}

function createWindow() {
  const prefs = readPrefs();
  const windowed = process.env.MERIDIAN_WINDOWED === "1";
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 960,
    minHeight: 600,
    fullscreen: windowed ? false : prefs.fullscreen !== false,
    backgroundColor: "#000000",
    autoHideMenuBar: true,
    show: false,
    title: "Meridian",
    icon: path.join(__dirname, "build", "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false,
      devTools: !app.isPackaged,
    },
  });

  win.once("ready-to-show", () => win.show());
  win.on("closed", () => {
    win = null;
  });

  /* the game is one page; nothing in it should lead anywhere else */
  win.webContents.on("will-navigate", (event) => event.preventDefault());
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https://")) void shell.openExternal(url);
    return { action: "deny" };
  });

  win.webContents.on("before-input-event", (event, input) => {
    if (input.type !== "keyDown") return;
    const toggle = input.key === "F11" || (input.key === "Enter" && input.alt);
    if (toggle) {
      event.preventDefault();
      setFullscreen(!win.isFullScreen());
    }
  });

  void win.loadFile(path.join(__dirname, "app", "desktop.html"));
}

const fromGame = (event) => win !== null && event.sender === win.webContents;

ipcMain.on("meridian:info", (event) => {
  event.returnValue = { version: app.getVersion(), steam: steam.active };
});
ipcMain.on("meridian:read", (event, key) => {
  try {
    event.returnValue = fromGame(event) ? saves.read(key) : null;
  } catch {
    event.returnValue = null;
  }
});
ipcMain.on("meridian:write", (event, key, value) => {
  try {
    event.returnValue = fromGame(event) ? saves.write(key, value) : false;
  } catch {
    event.returnValue = false;
  }
});
ipcMain.on("meridian:is-fullscreen", (event) => {
  event.returnValue = win !== null && win.isFullScreen();
});
ipcMain.on("meridian:fullscreen", (event, on) => {
  if (fromGame(event)) setFullscreen(Boolean(on));
});
ipcMain.on("meridian:unlock", (event, id) => {
  if (fromGame(event) && /^ACH_[A-Z_]{1,40}$/.test(String(id))) steam.unlock(String(id));
});
ipcMain.on("meridian:quit", (event) => {
  if (fromGame(event)) app.quit();
});

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (!win) return;
    if (win.isMinimized()) win.restore();
    win.focus();
  });

  void app.whenReady().then(() => {
    const userData = app.getPath("userData");
    saves = createStore(path.join(userData, "saves"));
    prefsFile = path.join(userData, "window.json");
    Menu.setApplicationMenu(null);
    log(`saves: ${saves.dir}`);
    log(steam.active ? `steam: running as ${steam.name}` : "steam: off");
    createWindow();
  });

  app.on("window-all-closed", () => app.quit());
}
