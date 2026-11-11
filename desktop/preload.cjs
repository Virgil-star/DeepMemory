"use strict";
/* The only bridge between the game and the machine. The page gets these few
   functions and nothing else: no Node, no file paths, no shell. */
const { contextBridge, ipcRenderer } = require("electron");

const info = ipcRenderer.sendSync("meridian:info");

contextBridge.exposeInMainWorld("meridianDesktop", {
  version: info.version,
  steam: info.steam,
  read: (key) => ipcRenderer.sendSync("meridian:read", String(key)),
  write: (key, value) => {
    ipcRenderer.sendSync("meridian:write", String(key), String(value));
  },
  unlock: (id) => ipcRenderer.send("meridian:unlock", String(id)),
  quit: () => ipcRenderer.send("meridian:quit"),
  setFullscreen: (on) => ipcRenderer.send("meridian:fullscreen", Boolean(on)),
  isFullscreen: () => ipcRenderer.sendSync("meridian:is-fullscreen"),
});
