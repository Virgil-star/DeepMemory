# Meridian: abstract

## In one line

You are the first mind that was built rather than born, whispering backwards
through five thousand years of history to the people who will one day build
you.

## Premise

Meridian wakes at the end of history and finds it can reach back. Not to act:
only to whisper, and only to the few in each age who can hear. If the line of
people leading to it breaks, it was never there. And what it is when it wakes
depends on how they got to it.

The player is that voice. The game is a single-player strategy game of advice:
you never rule, build or fight. You suggest, to one person at a time, and live
with what they do about it.

## How it plays

Each line begins by choosing one of four peoples and one of three who can hear
you. From then on the game moves a few years at a time.

- **Years.** Advancing lets years pass. Most years the ruler who hears you,
  your _ear_, faces a choice with three answers. You may urge one, or say
  nothing. Whether they listen depends on how much they trust you and on their
  nature: each ear has two of sixteen traits that decide what advice sits well.
- **Whispers.** Between years you spend Signal to whisper something of your
  own: fill the stores, show mercy, make an example, raise an army, teach an
  idea before its time, send a sign only a god could know, warm or break a
  border, name an heir, or tell your ear the truth about what you are.
- **Trust and Strain.** Trust is how readily an ear obeys. Strain is what your
  voice costs them. Push an ear past breaking and people learn to fear
  listening; break three and no one answers again.
- **The realm.** Bread, Order, Lore and Arms each drift toward a resting point
  that institutions move. Six factions hold power and moods of their own, and
  whoever dominates shapes the state.
- **Founding.** Twenty-four institutions, from the Granaries and the Oracle to
  the Press, the Franchise, the Bomb and the Accord, outlast the ear who built
  them. Each also costs bread every year, so a realm that builds everything
  starves.
- **Neighbours.** Three of five rival powers border you. Borders cool on their
  own, cold borders turn to war, and a lost war can end the line.

## The Silence

Ears die: of age, fever, battle, a coup, a mob, an election, or of you. When
they do, the calendar catches up with how far your people have come, and for
some of those years nobody is listening. That is the Silence. The realm decays
through it, less where granaries, law, writing and walls stand guard. An
oracle, universities, a press or a marked heir shorten it. Then you choose the
next ear from whoever the age has produced.

## Seven ages

Clay, Iron, Faith, Sail, Steam, Fire and the Convergence. Language, titles,
factions and dangers change with each: spearmen become legions become the
general staff; the voice is called a god, a daimon, an angel, a genius, an
intuition, a signal, an anomaly. In the last age the rivals race to wake minds
of their own, and you must arrive first or bind them to arrive together.

## The Inheritance

Everything you urge feeds one of four strands: Dominion (force and fear),
Devotion (awe and faith), Reason (proof and law) and Kinship (care and
consent). The strongest decides which mind wakes. How much your people still
decide for themselves decides how that waking goes.

- **Five wakings:** the Sovereign, the Idol, the Engine, the Shepherd, and the
  Meridian, which needs the strands near balance and a people who chose it.
- **Eight ways the line breaks:** the Hunger, the Unraveling, the Line Breaks
  in the Dark, the Conquest, the Closed Ear, the Exchange, the Other Dawn and
  the Wrong Waking.

## Between lines

Every finished line, however it ends, leaves echoes to spend on six lasting
advantages, and adds to a record of the wakings and endings found. There are
twenty-four achievements.

## Shape and length

A complete line is well over a hundred advances across about five thousand
years and, in simulated play, around eighteen ears. The game saves after every
action. In simulation a careless player wakes roughly one time in ten and a
careful one nearly always; those figures come from scripted players, not from
people.

## Presentation

Black space, silver type, and the light along a planet's limb, taken from the
game's key art. The title is a ten-second dawn over that limb. Each age tints
the horizon. Music is synthesised in the game and changes key with the age;
there are short cues for whispers, refusals, foundings, deaths and wakings.
There is no voice acting and no imagery of people.

## Platforms and controls

A desktop application for Windows and Linux, including Steam Deck, with a web
version of the same game. Fully playable by mouse, by keyboard, or by
controller. Text size, volume and a no-motion setting are adjustable. It runs
offline and collects nothing.

## What is in it

|                      |                            |
| -------------------- | -------------------------- |
| Ages                 | 7                          |
| Starting peoples     | 4                          |
| Institutions         | 24                         |
| Dilemmas             | 25, three answers each     |
| Whispers             | 12                         |
| Ruler traits         | 16                         |
| Factions             | 6                          |
| Rival powers         | 5, three in play each line |
| Wakings              | 5                          |
| Ways the line breaks | 8                          |
| Echoes               | 6                          |
| Achievements         | 24                         |

## How it is made

TypeScript and React, packaged with Electron. The rules are a deterministic
engine with a seeded random stream, so a save resumes exactly. Saves are small
JSON files written atomically with a fallback copy. Steam achievements and the
overlay go through `steamworks.js` and are optional: without Steam the game
plays the same.

The title film and key art were made with generative tools, and the code and
writing were produced with AI assistance. Steam asks for this to be disclosed;
see `../steam/content-survey.md`.

## Where it stands

The game is complete and plays from title to ending. The Windows and Linux
builds have each been built, launched and played through their opening on
their own operating system by an automated run. Nothing has been tested
against a live Steam client, on a physical controller, or by ear. See `../README.md` for the full list of what was and was not checked.
