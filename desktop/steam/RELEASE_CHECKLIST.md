# Releasing Meridian on Steam

Everything Steamworks will ask for, in the order it asks, and which file in
this folder answers it. Sizes and rules below were read from Valve's
Steamworks documentation in November 2026.

## 0. Before anything: the App ID

Two different numbers are easy to confuse:

- A **SteamID** is seventeen digits and names a person's account. It goes
  nowhere in the build.
- An **App ID** is short, usually six or seven digits, and names the game.
  Steam issues it when you join Steamworks as a partner and pay the Steam
  Direct fee for a new app. Each depot gets an id of its own alongside it.

Once you have the App ID:

1. Put it in `../steam_appid.txt`, replacing `480`.
2. Put it and the depot ids in `app_build.vdf`, replacing every `0000000`.

Nothing else in the code needs it.

## 1. Store page text

| Field                                     | Use                                                                  |
| ----------------------------------------- | -------------------------------------------------------------------- |
| Short description                         | `../store/text/short-description.txt`. Plain text, 262 characters.   |
| About this game                           | `../store/text/about-this-game.steam.txt`, already in Steam's markup |
| Genre, tags, features, requirements       | `../store/store-page.md`                                             |
| Languages                                 | English: interface. No audio speech, no subtitles needed.            |
| Developer, publisher, price, release date | Yours to set                                                         |

`../store/ABSTRACT.md` is the long description of the game for press, pitches
and your own reference.

## 2. Store graphics

All in `../store/capsules`, cut from the key art in `../store/source`. Valve's
rule for every capsule: the game's title and art only, no other text, and the
logo must stay legible.

| Asset            | File                           | Size     | Required |
| ---------------- | ------------------------------ | -------- | -------- |
| Header capsule   | `header_capsule_920x430.jpg`   | 920x430  | yes      |
| Small capsule    | `small_capsule_462x174.jpg`    | 462x174  | yes      |
| Main capsule     | `main_capsule_1232x706.jpg`    | 1232x706 | yes      |
| Vertical capsule | `vertical_capsule_748x896.jpg` | 748x896  | yes      |
| Page background  | `page_background_1438x810.jpg` | 1438x810 | no       |

The small capsule is shrunk to 120x45, and Valve asks that the logo nearly
fill it. It uses the bolder wordmark for that reason.

**Screenshots:** `../store/screenshots`, seven at 1920x1080. Valve requires at
least five, at 1920x1080 or larger, and requires that they show gameplay only:
no title screens, concept art or marketing text. The title screen is kept
apart in `../store/extra` for that reason. Mark at least four as suitable for
all ages; all seven are interface and text.

**Trailer:** `../store/trailer/meridian-trailer-1080p.mp4`. A trailer is
required. Valve asks for up to 1920x1080, 30 or 60 frames a second, 5,000 kbps
or more, H.264 with AAC in an .mp4, .mov or .wmv. This one is 1920x1080, 30
frames a second, about 6,900 kbps, H.264 and AAC, 37 seconds. Valve recommends
the first trailer be mostly gameplay in motion. This one opens on the dawn
film and then shows real screens as stills, so list it as "General /
Cinematic", and consider recording a gameplay trailer to sit ahead of it.

## 3. Library graphics

| Asset           | File                          | Size                       | Required |
| --------------- | ----------------------------- | -------------------------- | -------- |
| Library capsule | `library_capsule_600x900.jpg` | 600x900                    | yes      |
| Library header  | `library_header_920x430.jpg`  | 920x430                    | yes      |
| Library hero    | `library_hero_3840x1240.png`  | 3840x1240, no text at all  | yes      |
| Library logo    | `library_logo_1280x720.png`   | 1280 wide, transparent PNG | yes      |

Steam crops the hero toward its centre in a narrow window, so the planet sits
there. It is an upscale of a 1792-pixel source and is soft at full size. Replace
`../store/source/key-art-planet.jpg` with a larger render and run
`python3 make-capsules.py` in `../store` to redo the whole set.

## 4. Icons

All in `../store/icons`.

| Asset         | File                         | Size                              | Required              |
| ------------- | ---------------------------- | --------------------------------- | --------------------- |
| App icon      | `community_icon_184x184.jpg` | 184x184 JPG                       | yes                   |
| Shortcut icon | `shortcut_icon_512x512.png`  | 512x512 PNG; Steam makes the .ico | yes                   |
| Mac icon      | `mac_icon.icns`              | ICNS                              | only with a Mac build |

`client_icon.ico`, `client_image_16x16.tga` and `linux_icons.zip` are the older
client formats. Valve's current asset list does not ask for them; they are
there in case a form still does.

## 5. Achievements

Steamworks imports achievements in bulk, so none of the 24 needs typing in.

1. Open **Stats & Achievements**, then the **Bulk Import/Export** tab.
2. Export the definitions and localization templates once and compare their
   header rows with the two files here. They were written from Valve's
   published column list, not from an export.
3. Drag these onto the upload box together:
   - `achievements-definitions.csv`
   - `achievements-localization.csv`
   - every file in `achievement-icons/`
4. Check **Pending Changes**, then **Save imported data**.
5. **Publish.** Achievements do nothing until the changes are published.

The icons are 256x256 PNG and named the way the importer matches them:
`<API name>_ACHIEVED.png` and `<API name>_UNACHIEVED.png`. `ACH_HEALER` and
`ACH_BROKE` are marked as spoilers, so their text stays hidden until earned.
`achievements.md` lists all 24 to read. To pass Valve's release checklist every
achievement needs a name and an icon; these all have both.

## 6. Application settings

- **Installation, launch options:** Windows `Meridian.exe`; Linux and SteamOS
  `meridian`.
- **Depots:** one for Windows, one for Linux and SteamOS.
- **Cloud:** Auto-Cloud, pattern `*.json`, on the save folder:
  - Windows: root `WinAppDataRoaming`, subdirectory `Meridian/saves`
  - Linux: root override `LinuxXdgConfigHome`, subdirectory `Meridian/saves`

  Two small files sync. A quota of 1 MB and 10 files is far more than enough.

- **Controller support:** full. Keyboard and mouse are also complete.
- **Steam Deck:** uses the standard gamepad layout; no launcher, no text entry.

## 7. Content survey

Required before review, in three parts: general content, mature content, and
generative AI. `content-survey.md` has a draft for each. The AI part applies to
this game and must be filled in.

## 8. Builds

Use the folders from the "Meridian desktop" run on the repository's Actions
tab. `.github/workflows/meridian-desktop.yml` builds each on its own operating
system, plays its opening, and keeps the folders as artifacts for thirty days.
Start a run from the Actions tab, or push a tag such as `meridian-v1.0.0`.

To build by hand instead, on any machine with Node 22:

```sh
cd desktop
npm install
npx electron-builder --dir --win      # dist/win-unpacked
npx electron-builder --dir --linux    # dist/linux-unpacked
```

Upload:

```sh
steamcmd +login <your Steam account name> +run_app_build "<full path>/desktop/steam/app_build.vdf" +quit
```

Then set the new build live on the default branch in Steamworks.

## 9. Test on a real Steam client before release

These could not be checked without one:

- [ ] The game launches from the Steam library on Windows.
- [ ] The game launches from the Steam library on Linux, and on a Deck.
- [ ] `First Word` unlocks when the first ear is chosen.
- [ ] The Steam overlay opens over the game (Shift+Tab).
- [ ] A save made on one machine appears on another through Cloud.
- [ ] A real controller moves, chooses, goes back and opens the menu.
- [ ] The opening film plays with sound, and the music sounds right to you.
      Its levels were measured; nobody has listened to it.

## 10. Valve's review

Steam reviews the store page and the build separately before release, and
compares your content survey answers with what is in the build. The current
waiting periods are stated in Steamworks when you submit.
