"use strict";
/* Launches a packaged build and plays the first minute of it, the way a
   player would: title, new line, a people, an ear, one year. Then quits,
   relaunches, and checks the line is still there.

     node smoke.cjs                 the packaged build for this platform
     node smoke.cjs --dev           the unpackaged app in this folder

   Needs a display; on Linux without one, run it under xvfb-run. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { _electron: electron } = require("playwright-core");

const dev = process.argv.includes("--dev");
const packaged = {
  win32: path.join(__dirname, "dist", "win-unpacked", "Meridian.exe"),
  linux: path.join(__dirname, "dist", "linux-unpacked", "meridian"),
  darwin: path.join(__dirname, "dist", "mac", "Meridian.app", "Contents", "MacOS", "Meridian"),
}[process.platform];
const executablePath = dev ? require("electron") : packaged;
const args = [
  ...(dev ? [__dirname] : []),
  ...(process.platform === "linux" ? ["--no-sandbox"] : []),
];

const userData = fs.mkdtempSync(path.join(os.tmpdir(), "meridian-smoke-"));
const launch = () =>
  electron.launch({
    executablePath,
    args,
    env: {
      ...process.env,
      MERIDIAN_USER_DATA: userData,
      MERIDIAN_WINDOWED: "1",
      MERIDIAN_NO_STEAM: "1",
    },
  });

(async () => {
  assert.ok(fs.existsSync(executablePath), `no build at ${executablePath}`);
  const errors = [];

  let app = await launch();
  let win = await app.firstWindow();
  win.on("pageerror", (error) => errors.push(error.message));
  win.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await win.waitForLoadState("load");

  const bridge = await win.evaluate(() => ({
    has: Boolean(window.meridianDesktop),
    version: window.meridianDesktop && window.meridianDesktop.version,
    node: typeof window.require,
  }));
  assert.equal(bridge.has, true, "the page has no desktop bridge");
  assert.equal(bridge.node, "undefined", "the page can reach Node");

  await win.keyboard.press("Shift"); // any key brings the menu up over the film
  await win.getByRole("button", { name: /Reach back/ }).click();
  await win.getByRole("button", { name: "Skip" }).click();
  await win.getByRole("button", { name: /The Coast/ }).click();
  await win.getByRole("button", { name: /Kael Ironhand/ }).click();
  await win.getByRole("button", { name: /Continue/ }).click();
  await win
    .locator("button:visible", { hasText: /^Advance/ })
    .first()
    .click();
  await win.getByText("Urge an answer", { exact: true }).waitFor();

  const film = await win.evaluate(() => typeof HTMLVideoElement !== "undefined");
  assert.equal(film, true);
  await win.evaluate(() => document.fonts.ready);
  const fonts = await win.evaluate(() =>
    [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family),
  );
  assert.ok(
    fonts.some((f) => f.includes("Montserrat")),
    "the bundled fonts did not load",
  );

  const saveFile = path.join(userData, "saves", "meridian.save.v2.json");
  const save = JSON.parse(fs.readFileSync(saveFile, "utf8"));
  assert.equal(save.game.cradle, "coast");
  assert.equal(save.game.host.name, "Kael Ironhand");

  const closed = new Promise((resolve) => app.process().once("exit", resolve));
  /* the window goes away mid-call, which is the point */
  await win.evaluate(() => window.meridianDesktop.quit()).catch(() => {});
  await closed;

  app = await launch();
  win = await app.firstWindow();
  await win.waitForLoadState("load");
  await win.keyboard.press("Shift");
  await win.getByRole("button", { name: /Continue/ }).click();
  await win.getByRole("heading", { name: "Kael Ironhand" }).waitFor();
  await app.close();

  assert.deepEqual(errors, [], "the page reported errors");
  console.log(`ok: ${path.basename(executablePath)} ${bridge.version} on ${process.platform}`);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
