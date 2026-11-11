"use strict";
/* Draws the Steam achievement icons: one 256x256 JPG for earned and one for
   not yet earned, per achievement. The glyphs are Lucide icons (ISC licence),
   the same set the game uses, set over the limb of the world.

   Run from the repository root, with Playwright available:
     node desktop/steam/make-achievement-icons.cjs
   Set CHROMIUM_PATH to use a browser that is already installed. */
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { chromium } = require("playwright");

const here = __dirname;
const out = path.join(here, "achievement-icons");
const glyphs = JSON.parse(fs.readFileSync(path.join(here, "achievement-icons.json"), "utf8"));
const lucide = path.join(here, "..", "..", "node_modules", "lucide-react", "dist", "esm", "icons");

function draw(node) {
  return node
    .map(([tag, attrs]) => {
      const text = Object.entries(attrs)
        .filter(([k]) => k !== "key")
        .map(([k, v]) => `${k}="${v}"`)
        .join(" ");
      return `<${tag} ${text}/>`;
    })
    .join("");
}

function svg(node, earned) {
  const light = earned ? "#ecd2ac" : "#59616c";
  const edge = earned ? "#f6e7cf" : "#4a515b";
  const ink = earned ? "#eef1f5" : "#5d6570";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <defs>
    <radialGradient id="sky" cx="50%" cy="78%" r="75%">
      <stop offset="0" stop-color="${earned ? "#141c27" : "#0c0f13"}"/>
      <stop offset="1" stop-color="#000000"/>
    </radialGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="7"/></filter>
  </defs>
  <rect width="256" height="256" fill="url(#sky)"/>
  <circle cx="128" cy="536" r="340" fill="none" stroke="${light}" stroke-width="10" filter="url(#soft)" opacity="${earned ? 0.85 : 0.35}"/>
  <circle cx="128" cy="536" r="340" fill="#020305" stroke="${edge}" stroke-width="1.5"/>
  <g transform="translate(68 40) scale(5)" fill="none" stroke="${ink}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${draw(node)}</g>
</svg>`;
}

(async () => {
  fs.mkdirSync(out, { recursive: true });
  /* CHROMIUM_PATH points at a browser when Playwright's own download is not there */
  const executablePath = process.env.CHROMIUM_PATH;
  const browser = await chromium.launch(executablePath ? { executablePath } : {});
  const page = await browser.newPage({
    viewport: { width: 256, height: 256 },
    deviceScaleFactor: 1,
  });
  for (const [id, glyph] of Object.entries(glyphs)) {
    const mod = await import(pathToFileURL(path.join(lucide, `${glyph}.js`)).href);
    for (const earned of [true, false]) {
      await page.setContent(
        `<html><body style="margin:0;background:#000">${svg(mod.__iconNode, earned)}</body></html>`,
      );
      await page.screenshot({
        path: path.join(out, `${id}${earned ? "" : "_locked"}.jpg`),
        type: "jpeg",
        quality: 92,
        clip: { x: 0, y: 0, width: 256, height: 256 },
      });
    }
  }
  await browser.close();
  console.log(`${Object.keys(glyphs).length * 2} icons written to ${out}`);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
