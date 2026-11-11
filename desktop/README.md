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
```

## What has been checked, and what has not

Checked in a Linux container, driving the real application under a virtual
display:

- The development build and the packaged `dist/linux-unpacked/meridian` both
  open, play the opening film with sound, and play through to a first choice.
- Fonts, film and art load from the bundle with the network unreachable.
- Saves are written to `saves/` as files; quitting and relaunching resumes the
  same line.
- With no Steam client present the game logs that Steam is off and carries on.
- The page has no access to Node; it sees only the bridge above.

Not checked, because it needs things this environment does not have:

- A real Steam client: achievements actually unlocking, the overlay, Cloud sync.
- A Windows or macOS build. The configuration is there; nothing was built.
- A physical Steam Deck or controller. Controller input was tested against a
  simulated standard-mapping pad.
- macOS would additionally need signing and notarisation.

## Steamworks checklist

1. **App ID.** `steam_appid.txt` holds `480`, Valve's public test app, so the
   Steam path can be exercised in development. Replace it with your App ID. It
   is not shipped: a build launched by Steam is told its id by the client.
   `MERIDIAN_STEAM_APP_ID` overrides the file.
2. **Achievements.** Create every row of `steam/achievements.md`. The API names
   must match exactly.
3. **Cloud.** Enable Auto-Cloud on the save folder, pattern `*.json`:
   - Windows: root `WinAppDataRoaming`, subdirectory `Meridian/saves`
   - Linux: root override `LinuxXdgConfigHome`, subdirectory `Meridian/saves`
   - macOS: root override `MacAppSupport`, subdirectory `Meridian/saves`

   Two small files sync: the line in progress, and the profile (echoes,
   discoveries, achievements, settings). `window.json` beside the folder is
   per-machine and deliberately outside it.

4. **Launch options.** Windows `Meridian.exe`; Linux `meridian`.
5. **Controller support.** The game is fully playable on a pad: stick or d-pad
   moves between controls, A chooses, B goes back, X lets a year pass, Y opens
   the world, Start opens the menu. Text size can be raised in Settings.
6. **Store assets.** `store/capsules` holds every capsule size, cut from the
   three images in `store/source`. They are 1792x1008 originals, so the
   3840x1240 library hero is an upscale: replace it with a higher-resolution
   render before release, then re-run `python3 make-capsules.py`. Check sizes
   against the current Steamworks asset list before uploading.
7. **Upload.** Fill the ids in `steam/app_build.vdf` and run it with `steamcmd`.

## Settings for development and testing

| Variable                | Effect                                                                |
| ----------------------- | --------------------------------------------------------------------- |
| `MERIDIAN_USER_DATA`    | Keep saves and window state in this folder instead of the system one. |
| `MERIDIAN_WINDOWED=1`   | Open in a window regardless of the remembered full screen choice.     |
| `MERIDIAN_NO_STEAM=1`   | Do not try to reach Steam.                                            |
| `MERIDIAN_STEAM_APP_ID` | Use this App ID instead of `steam_appid.txt`.                         |

Full screen toggles with F11 or Alt+Enter, and from Settings.
