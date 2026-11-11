# Meridian: desktop build

The game in `src/components/meridian` and `src/lib/meridian`, wrapped as a
desktop application that can ship on Steam. The web version at `/meridian` and
this build run the same code; only where saves live differs.

## What is here

| File                   | What it does                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| `main.cjs`             | The window: loads the bundled game from disk, remembers full screen, quits cleanly.        |
| `preload.cjs`          | The only bridge to the page: read/write a save, unlock an achievement, full screen, quit.  |
| `storage.cjs`          | Saves as JSON files, written atomically, with the previous copy kept as a fallback.        |
| `steam.cjs`            | Steam achievements and overlay through `steamworks.js`. Does nothing when Steam is absent. |
| `electron-builder.yml` | Packaging. Every target is an unpacked folder, which is what SteamPipe uploads.            |
| `smoke.cjs`            | Launches a build and plays its first minute, then relaunches to check the save held.       |
| `steam/`               | The achievements to create, and the SteamPipe upload script.                               |
| `store/`               | Capsule art cut from the key art, 1920x1080 screenshots, and a store page draft.           |
| `build/icon.png`       | The application icon.                                                                      |

`app/` (the bundled game) and `dist/` (packaged builds) are generated and not
committed.

## Run it

```sh
cd desktop
npm install
npm start          # bundles the game, then opens it
```

## Package it

```sh
npm run pack                    # this machine's platform, into dist/<platform>-unpacked
npx electron-builder --dir --win    # run on Windows
npx electron-builder --dir --linux  # run on Linux; this is also the Steam Deck build
```

## Tests

```sh
npm run test:meridian   # from the repository root: engine, achievements, save storage
npm run smoke           # in desktop/: play the packaged build (xvfb-run on a headless Linux)
```

## What has been checked, and what has not

Checked in a Linux container, driving the real application under a virtual
display with `smoke.cjs`:

- The development build and the packaged `dist/linux-unpacked/meridian` both
  open, play the opening film with sound, and play through to a first choice.
- Fonts, film and art load from the bundle with the network unreachable.
- Saves are written to `saves/` as files; quitting and relaunching resumes the
  same line.
- With no Steam client present the game logs that Steam is off and carries on.
- The page has no access to Node; it sees only the bridge above.
- The Windows folder builds from Linux (`dist/win-unpacked/Meridian.exe`).

`.github/workflows/meridian-desktop.yml` repeats the build and the play-through
on a Windows machine and a Linux machine and keeps both folders as artifacts.
Its latest result is on the repository's Actions tab.

Not checked, because it needs things an automated run does not have:

- A real Steam client: achievements actually unlocking, the overlay, Cloud sync.
- A physical Steam Deck or controller. Controller input was tested against a
  simulated standard-mapping pad.
- The music by ear. Its levels were measured; nobody has listened to it.
- macOS, which would additionally need signing and notarisation.

## Releasing on Steam

`steam/RELEASE_CHECKLIST.md` walks through everything Steamworks asks for and
names the file that answers each item: store text, capsules, screenshots, the
trailer, icons, the 24 achievements and their icons, Cloud and launch settings,
the content survey with its generative AI disclosure, and the upload.

The App ID in `steam_appid.txt` is `480`, Valve's public test app, so the Steam
path can be exercised in development. Replace it with your own. It is not
shipped: a build launched by Steam is told its id by the client.
`MERIDIAN_STEAM_APP_ID` overrides the file.

## Settings for development and testing

| Variable                | Effect                                                                |
| ----------------------- | --------------------------------------------------------------------- |
| `MERIDIAN_USER_DATA`    | Keep saves and window state in this folder instead of the system one. |
| `MERIDIAN_WINDOWED=1`   | Open in a window regardless of the remembered full screen choice.     |
| `MERIDIAN_NO_STEAM=1`   | Do not try to reach Steam.                                            |
| `MERIDIAN_STEAM_APP_ID` | Use this App ID instead of `steam_appid.txt`.                         |

Full screen toggles with F11 or Alt+Enter, and from Settings.
