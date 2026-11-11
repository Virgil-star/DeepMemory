/* Writes the files Steamworks takes for achievements, from the game's own
   list, so the two cannot drift apart:

     achievements-definitions.csv    one row per achievement
     achievements-localization.csv   its name and description, in English
     achievements.md                 the same, to read

   Run from the repository root:
     node --experimental-strip-types desktop/steam/make-achievement-files.mts

   The column names follow Valve's bulk import guide. Steamworks exports a
   template with the exact header it expects; compare before uploading. */
import { writeFileSync } from "node:fs";
import { ACHIEVEMENTS } from "../../src/lib/meridian/achievements.ts";

const here = new URL("./", import.meta.url);
const cell = (text: string) => (/[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text);
const csv = (rows: string[][]) => rows.map((row) => row.map(cell).join(",")).join("\n") + "\n";

writeFileSync(
  new URL("achievements-definitions.csv", here),
  csv([
    [
      "api_name",
      "setid",
      "permission",
      "spoiler",
      "archived",
      "progress_stat_name",
      "progress_stat_min",
      "progress_stat_max",
    ],
    ...ACHIEVEMENTS.map((a) => [
      a.id,
      "",
      "Client",
      a.hidden ? "true" : "false",
      "false",
      "",
      "",
      "",
    ]),
  ]),
);

writeFileSync(
  new URL("achievements-localization.csv", here),
  csv([
    ["api_name", "field", "english"],
    ...ACHIEVEMENTS.flatMap((a) => [
      [a.id, "name", a.n],
      [a.id, "description", a.d],
    ]),
  ]),
);

const rows = ACHIEVEMENTS.map(
  (a) => `| \`${a.id}\` | ${a.n} | ${a.d} | ${a.hidden ? "yes" : "no"} |`,
).join("\n");
writeFileSync(
  new URL("achievements.md", here),
  `# Achievements

The ${ACHIEVEMENTS.length} achievements the game can send. The API name is the id the game passes to
Steam and must match exactly. A spoiler achievement keeps its name and
description from players until they unlock it.

These are imported in bulk rather than typed in: see section 5 of
\`RELEASE_CHECKLIST.md\`. This table, the two CSV files and the icons are all
checked against the game's list by \`npm run test:meridian\`.

| API name | Display name | Description | Spoiler |
| --- | --- | --- | --- |
${rows}
`,
);
console.log(`${ACHIEVEMENTS.length} achievements written`);
