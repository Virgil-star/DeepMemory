# Releasing Meridian on Steam

Everything Steamworks will ask for, in the order it asks, and which file in
this folder answers it. Sizes marked **confirmed** were checked against Valve's
published asset list in November 2026; the rest are the long-standing sizes and
should be checked against the upload form, which states the size it wants.

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
| Short description                         | `../store/text/short-description.txt` (262 characters)               |
| About this game                           | `../store/text/about-this-game.steam.txt`, already in Steam's markup |
| Genre, tags, features, requirements       | `../store/store-page.md`                                             |
| Languages                                 | English: interface. No audio speech, no subtitles needed.            |
| Developer, publisher, price, release date | Yours to set                                                         |

`../store/ABSTRACT.md` is the long description of the game for press, pitches
and your own reference.

## 2. Store graphics

All in `../store/capsules`, cut from the key art in `../store/source`.

| Asset            | File                                          | Size                    |
| ---------------- | --------------------------------------------- | ----------------------- |
| Header capsule   | `header_capsule_920x430.jpg`                  | 920x430, confirmed      |
| Small capsule    | `small_capsule_462x174.jpg`                   | 462x174, confirmed      |
| Main capsule     | `main_capsule_1232x706.jpg`                   | 1232x706                |
| Vertical capsule | `vertical_capsule_748x896.jpg`                | 748x896                 |
| Page background  | `page_background_1438x810.jpg`                | 1438x810, optional      |
| Screenshots      | `../store/screenshots/*.jpg`, eight           | 1920x1080               |
| Trailer          | `../store/trailer/meridian-trailer-1080p.mp4` | 1920x1080, 30 fps, 37 s |

Steam asks you to mark which screenshots suit all ages. All eight are
interface and text.

## 3. Library graphics

| Asset           | File                          | Size                                       |
| --------------- | ----------------------------- | ------------------------------------------ |
| Library capsule | `library_capsule_600x900.jpg` | 600x900, confirmed                         |
| Library header  | `library_header_920x430.jpg`  | 920x430                                    |
| Library hero    | `library_hero_3840x1240.png`  | 3840x1240 PNG, confirmed. No text or logo. |
| Library logo    | `library_logo_1280x720.png`   | 1280 wide, transparent PNG, confirmed      |

The hero is an upscale of a 1792-pixel source and is soft at full size.
Replace `../store/source/key-art-planet.jpg` with a larger render and run
`python3 make-capsules.py` in `../store` to redo the whole set.

## 4. Icons

All in `../store/icons`.

| Asset                | File                         | Size                                     |
| -------------------- | ---------------------------- | ---------------------------------------- |
| Community (app) icon | `community_icon_184x184.jpg` | 184x184 JPG, confirmed                   |
| Shortcut icon        | `shortcut_icon_512x512.png`  | 512x512, confirmed; Steam makes the .ico |
| Client icon          | `client_icon.ico`            | 16 to 256 in one file                    |
| Client image         | `client_image_16x16.tga`     | 16x16, only if the form still asks       |
| Linux icons          | `linux_icons.zip`            | PNGs, 16 to 256                          |
| macOS icon           | `mac_icon.icns`              | Only if you ship a Mac build             |

## 5. Achievements

1. Under **Stats & Achievements**, create the 24 achievements in the order of
   `achievements.md`, giving each its API name exactly.
2. Upload the icons from `achievement-icons/`: `<API name>.jpg` for earned and
   `<API name>_locked.jpg` for not yet earned. Both are 256x256.
3. Names and descriptions can be typed in from the table, or imported from
   `achievements_english.vdf`. That file uses Steam's default tokens
   (`NEW_ACHIEVEMENT_1_0_NAME` and so on), which match only if the achievements
   were created in table order on a new app. Export your own localisation file
   first and compare the token names before importing.
4. Mark `ACH_HEALER` and `ACH_BROKE` as hidden.
5. Publish the changes: achievements do nothing until Steamworks is published.

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

`content-survey.md` has drafts for the mature-content answers and the
generative AI disclosure. Both are required, and the AI disclosure applies to
this game.

## 8. Builds

From the repository root, on any machine with Node 22:

```sh
cd desktop
npm install
npx electron-builder --dir --win      # dist/win-unpacked
npx electron-builder --dir --linux    # dist/linux-unpacked
```

Both can be built on Linux. `.github/workflows/meridian-desktop.yml` builds and
smoke-tests each on its own operating system and keeps the folders as
downloadable artifacts.

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
asks for the store page to be public as "Coming soon" for some time before
launch. The current waiting periods are stated in Steamworks when you submit.
