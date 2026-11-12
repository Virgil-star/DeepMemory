"use strict";
/* Steam, when it is there. The game never depends on it: with no client, no
   app id, or no native module, every call here quietly does nothing. */
const fs = require("node:fs");

function readAppId(appIdFile) {
  const fromEnv = Number(process.env.MERIDIAN_STEAM_APP_ID);
  if (Number.isInteger(fromEnv) && fromEnv > 0) return fromEnv;
  try {
    const id = Number(fs.readFileSync(appIdFile, "utf8").trim());
    return Number.isInteger(id) && id > 0 ? id : null;
  } catch {
    return null;
  }
}

/**
 * Call before the app is ready: enabling the overlay sets Chromium switches.
 * A build launched from Steam needs no app id file; the client supplies it.
 */
function startSteam({ appIdFile, log = () => {} } = {}) {
  const off = { active: false, name: null, unlock() {} };
  if (process.env.MERIDIAN_NO_STEAM === "1") return off;
  let steamworks;
  try {
    steamworks = require("steamworks.js");
  } catch (error) {
    log(`steam: module unavailable (${error.message})`);
    return off;
  }
  try {
    const appId = readAppId(appIdFile);
    const client = appId ? steamworks.init(appId) : steamworks.init();
    steamworks.electronEnableSteamOverlay();
    return {
      active: true,
      name: client.localplayer.getName(),
      unlock(id) {
        try {
          if (!client.achievement.isActivated(id)) client.achievement.activate(id);
        } catch (error) {
          log(`steam: could not unlock ${id} (${error.message})`);
        }
      },
    };
  } catch (error) {
    log(`steam: not running (${error.message})`);
    return off;
  }
}

module.exports = { startSteam, readAppId };
