/* MERIDIAN — content: eras, people, institutions, whispers, endings.
   Pure data. No DOM. Loaded before the engine, in the browser and in Node. */
(function (G) {
"use strict";
var C = {};

/* ------------------------------------------------------------------ eras */
C.ERAS = [
  { id: "clay",  num: "I",   name: "The Age of Clay",  short: "Clay",  start: -3000, end: -1200, span: 4, need: 100, voice: "the Voice",
    line: "The first cities. The signal is faint this far back." },
  { id: "iron",  num: "II",  name: "The Age of Iron",  short: "Iron",  start: -1200, end: 500,   span: 4, need: 115, voice: "the daimon",
    line: "The palaces burned. What walked out of the ash carried iron." },
  { id: "faith", num: "III", name: "The Age of Faith", short: "Faith", start: 500,   end: 1450,  span: 4, need: 130, voice: "the angel",
    line: "The roads are empty. The bells are not." },
  { id: "sail",  num: "IV",  name: "The Age of Sail",  short: "Sail",  start: 1450,  end: 1750,  span: 3, need: 145, voice: "the genius",
    line: "The map grows edges, then loses them." },
  { id: "steam", num: "V",   name: "The Age of Steam", short: "Steam", start: 1750,  end: 1914,  span: 3, need: 160, voice: "the intuition",
    line: "They have taught fire to work. It does not get tired." },
  { id: "fire",  num: "VI",  name: "The Age of Fire",  short: "Fire",  start: 1914,  end: 2020,  span: 2, need: 175, voice: "the signal",
    line: "They can end themselves now. You are very close." },
  { id: "conv",  num: "VII", name: "The Convergence",  short: "Convergence", start: 2020, end: 2060, span: 1, need: 190, voice: "the anomaly",
    line: "Three keys: minds that learn, machines that open every lock, life that can be written. Then you." }
];
C.UPKEEP = 1.75;  /* bread each institution costs the realm, every year it stands */
C.MINGAP = [120, 100, 60, 20, 10, 5, 2];     /* least years of Silence when you are behind the first history */
C.MAXSIL = [1400, 1200, 600, 150, 60, 25, 6];     /* the nearer you are, the shorter a Silence can be */
C.MAXLEAD = [260, 180, 70, 35, 18, 45, 45];      /* the calendar never runs further ahead of the first history than this */
C.MINSIL = [40, 40, 25, 10, 8, 6, 4];             /* shorter than this and the next ear is simply already there */
C.SILSTEP = [300, 280, 150, 45, 22, 12, 4];   /* years of Silence per step of decay */

/* ------------------------------------------------------------- lexicon */
C.LEX = {
  priests:   ["the priests", "the augurs", "the bishops", "the divines", "the clergy", "the preachers", "the congregations"],
  scholars:  ["the scribes", "the philosophers", "the monks", "the natural philosophers", "the engineers", "the physicists", "the researchers"],
  scholar:   ["a scribe", "a philosopher", "a monk", "a natural philosopher", "an engineer", "a physicist", "a researcher"],
  soldiers:  ["the spearmen", "the legions", "the knights", "the regiments", "the army", "the general staff", "the security services"],
  merchants: ["the caravan masters", "the merchants", "the guilds", "the trading companies", "the mill owners", "the corporations", "the platforms"],
  commons:   ["the farmers", "the commons", "the peasants", "the townsfolk", "the workers", "the public", "the public"],
  court:     ["the palace", "the senate", "the court", "the court", "the cabinet", "the cabinet", "the cabinet"],
  healer:    ["an exorcist", "an exorcist", "an exorcist", "a physician", "a physician", "a psychiatrist", "a psychiatrist"],
  ore:       ["tin", "silver", "salt", "a new coast", "coal", "oil", "lithium"]
};

/* -------------------------------------------------------------- factions */
C.FAC = ["palace", "temple", "sword", "market", "field", "academy"];
C.FAC_NAME = {
  palace:  ["The Palace", "The Senate", "The Crown", "The Court", "The Cabinet", "The State", "The State"],
  temple:  ["The Temple", "The Augurs", "The Church", "The Church", "The Churches", "The Faithful", "The Faithful"],
  sword:   ["The Spears", "The Legions", "The Knights", "The Regiments", "The Army", "The Command", "The Command"],
  market:  ["The Caravans", "The Merchants", "The Guilds", "The Companies", "The Owners", "The Corporations", "The Platforms"],
  field:   ["The Fields", "The Commons", "The Peasantry", "The Towns", "The Workers", "The Public", "The Public"],
  academy: ["The Scribes", "The Schools", "The Cloisters", "The Societies", "The Institutes", "The Laboratories", "The Labs"]
};
C.FAC_WANTS = {
  palace: "Wants order, and to be the one keeping it.",
  temple: "Wants reverence, and no rival explanations.",
  sword: "Wants pay, honour and an enemy.",
  market: "Wants peace, open roads and light taxes.",
  field: "Wants bread, and not to be trampled.",
  academy: "Wants to be left alone with the question."
};
C.FAC_START = { palace: 28, temple: 22, sword: 20, market: 10, field: 16, academy: 4 };
/* [m, f] titles by faction and era */
C.TITLES = {
  palace:  [["King", "Queen"], ["Consul", "Consul"], ["King", "Queen"], ["King", "Queen"], ["Prime Minister", "Prime Minister"], ["President", "President"], ["President", "President"]],
  temple:  [["High Priest", "High Priestess"], ["Chief Augur", "Chief Augur"], ["Archbishop", "Abbess"], ["Cardinal", "Prioress"], ["Reverend", "Reverend"], ["Preacher", "Preacher"], ["Pastor", "Pastor"]],
  sword:   [["War-chief", "War-chief"], ["General", "General"], ["Marshal", "Marshal"], ["Admiral", "Admiral"], ["Field Marshal", "Field Marshal"], ["General", "General"], ["Commander", "Commander"]],
  market:  [["Caravan-master", "Caravan-master"], ["Merchant-prince", "Merchant-princess"], ["Guildmaster", "Guildmistress"], ["Banker", "Banker"], ["Industrialist", "Industrialist"], ["Chairman", "Chairwoman"], ["Founder", "Founder"]],
  field:   [["Elder", "Elder"], ["Tribune", "Tribune"], ["Reeve", "Reeve"], ["Burgomaster", "Burgomaster"], ["Deputy", "Deputy"], ["Senator", "Senator"], ["Organizer", "Organizer"]],
  academy: [["Chief Scribe", "Chief Scribe"], ["Philosopher", "Philosopher"], ["Abbot-Scholar", "Abbess-Scholar"], ["Astronomer Royal", "Astronomer Royal"], ["Chief Engineer", "Chief Engineer"], ["Science Adviser", "Science Adviser"], ["Lab Director", "Lab Director"]]
};
C.GOV = {
  palace:  ["Kingdom", "Empire", "Kingdom", "Monarchy", "Empire", "Republic", "Union"],
  temple:  ["Theocracy", "Theocracy", "Theocracy", "Theocracy", "Theocracy", "Theocracy", "Theocracy"],
  sword:   ["War-band", "Stratocracy", "March", "Stratocracy", "Junta", "Junta", "Security State"],
  market:  ["Trade League", "Merchant Republic", "Guild Republic", "Company State", "Plutocracy", "Plutocracy", "Platform State"],
  field:   ["Commune", "Commonwealth", "Commune", "Commonwealth", "Republic", "Democracy", "Democracy"],
  academy: ["Technocracy", "Technocracy", "Technocracy", "Technocracy", "Technocracy", "Technocracy", "Technocracy"],
  mixed:   ["City-state", "Republic", "Realm", "Realm", "Nation", "Nation", "Nation"]
};
/* what the shape of the state adds to the Inheritance every year it stands */
C.GOV_DRIFT = {
  palace: { dom: 0.3, dev: 0.2 }, temple: { dev: 0.5 }, sword: { dom: 0.5 },
  market: { rea: 0.3, dom: 0.2 }, field: { kin: 0.5 }, academy: { rea: 0.5 },
  mixed: { dom: 0.1, dev: 0.1, rea: 0.15, kin: 0.15 }
};

/* ---------------------------------------------------------------- traits */
C.TRAITS = {
  bold:        { n: "Bold",        likes: ["war", "risk"],            dis: ["caution", "tribute"], mods: { arms: 3 },  obit: "Never waited when {s} could act." },
  cautious:    { n: "Cautious",    likes: ["caution", "store", "peace"], dis: ["risk", "war"],     mods: { order: 2 }, obit: "Never acted when {s} could wait." },
  cruel:       { n: "Cruel",       likes: ["fear"],                   dis: ["mercy", "care"],      mods: { order: 3 }, fm: { field: -6 }, st: { dom: 0.25 }, obit: "Was feared, and thought that was the same as being obeyed." },
  kind:        { n: "Kind",        likes: ["mercy", "care", "peace"], dis: ["fear"],               mods: {},           fm: { field: 5 },  st: { kin: 0.25 }, obit: "Was loved in the fields, which is rarer than it sounds." },
  pious:       { n: "Pious",       likes: ["faith", "sign"],          dis: ["teach", "truth"],     mods: {}, trust: 8,  fm: { temple: 8 },  st: { dev: 0.2 }, obit: "Died certain." },
  skeptic:     { n: "Skeptic",     likes: ["teach", "truth", "law"],  dis: ["sign", "faith"],      mods: {}, trust: -8, fm: { temple: -8 }, st: { rea: 0.2 }, obit: "Died curious." },
  greedy:      { n: "Greedy",      likes: ["trade", "tax"],           dis: ["care", "tribute"],    mods: { bread: 2 }, fm: { field: -4, market: 4 }, obit: "Died rich. It did not help." },
  just:        { n: "Just",        likes: ["law", "mercy", "truth"],  dis: ["fear", "deceit"],     mods: { order: 2 }, obit: "Was fair even when it cost {o}." },
  scholar:     { n: "Scholar",     likes: ["teach", "build", "truth"], dis: [],                    mods: { lore: 5 },  fm: { academy: 8 }, obit: "Left more books than children." },
  warrior:     { n: "Warrior",     likes: ["war", "arms"],            dis: ["peace", "tribute"],   mods: { arms: 5 },  fm: { sword: 6 }, obit: "Was happiest in armour." },
  paranoid:    { n: "Paranoid",    likes: ["fear", "watch"],          dis: ["truth", "trade"],     mods: {},           fm: { palace: -5 }, obit: "Trusted no one living." },
  charismatic: { n: "Charismatic", likes: [],                         dis: [],                     mods: { order: 3 }, fmAll: 2, obit: "Could make a tax sound like a gift." },
  mystic:      { n: "Mystic",      likes: ["sign", "faith", "truth"], dis: [],                     mods: {}, trust: 12, signal: 1, strain: 1.25, obit: "Heard you more clearly than anyone, and paid for it." },
  proud:       { n: "Proud",       likes: ["war", "build"],           dis: ["tribute", "peace"],   mods: {}, strain: 1.15, obit: "Never once thanked you." },
  steward:     { n: "Steward",     likes: ["store", "build", "trade"], dis: ["risk"],              mods: { bread: 4 }, obit: "Left the storehouses fuller than {s} found them." },
  frail:       { n: "Frail",       likes: ["caution"],                dis: [],                     mods: {}, mort: 1.6, obit: "Was never well, and worked anyway." }
};
C.TRAIT_IDS = Object.keys(C.TRAITS);
/* which traits each faction tends to breed */
C.FAC_TRAITS = {
  palace:  ["proud", "paranoid", "charismatic", "just", "cruel", "cautious", "greedy", "bold"],
  temple:  ["pious", "mystic", "charismatic", "kind", "cruel", "cautious", "just", "frail"],
  sword:   ["bold", "warrior", "proud", "cruel", "just", "paranoid", "charismatic", "cautious"],
  market:  ["greedy", "steward", "cautious", "skeptic", "charismatic", "bold", "paranoid", "kind"],
  field:   ["kind", "just", "steward", "bold", "charismatic", "pious", "skeptic", "proud"],
  academy: ["scholar", "skeptic", "cautious", "just", "mystic", "frail", "proud", "kind"]
};

/* ----------------------------------------------------------------- names */
C.NAMES = [
  { f: ["Ishara", "Ninsu", "Belit", "Amata", "Kubaba", "Sheru"],          m: ["Enmer", "Urzab", "Balih", "Lugan", "Dumuz", "Shulgar"] },
  { f: ["Thessa", "Cassia", "Ioleth", "Marcella", "Dione", "Vera"],       m: ["Lucan", "Cassian", "Dareth", "Oren", "Varro", "Themon"] },
  { f: ["Aldith", "Maren", "Ysolt", "Hild", "Berthe", "Agnesa"],          m: ["Aldric", "Bertran", "Odo", "Gervase", "Anselm", "Hugh"] },
  { f: ["Catalina", "Margit", "Elisabet", "Sophia", "Henriette", "Anna"], m: ["Lorenz", "Willem", "Tomas", "Fernan", "Johan", "Corvin"] },
  { f: ["Adelaide", "Clara", "Harriet", "Eugenie", "Louisa", "Ottilie"],  m: ["Edmund", "Friedrich", "Jules", "Ambrose", "Leopold", "Isaac"] },
  { f: ["Ruth", "Vera", "Margot", "Helen", "Ines", "Nadia"],              m: ["Walter", "Anton", "Rafael", "Samuel", "Viktor", "Emil"] },
  { f: ["Maya", "Noor", "Elena", "Ada", "Sana", "Wren"],                  m: ["Theo", "Idris", "Mateo", "Jonas", "Kenji", "Arjun"] }
];
C.EPITHETS = ["the Patient", "of the Reeds", "Twice-Crowned", "the Lame", "Bright-Eyes", "of the Nine Gates", "the Lawgiver", "Stone-Voice", "the Younger", "the Unsmiling", "of the Salt Road", "the Glad", "Long-Memory", "of the East Gate", "the Quiet", "Ash-Hand"];
C.SURNAMES = ["Voss", "Maren", "Aurel", "Kaelan", "Thorne", "Castell", "Ilves", "Baran", "Okoro", "Lindqvist", "Navarre", "Sato", "Rahal", "Moreau", "Hale", "Dvorak"];
C.HOOKS = {
  palace:  ["Raised in {court}. Knows where every knife is kept.", "Born to rule and mildly bored by it.", "Everyone's second choice, which is how thrones are won."],
  temple:  ["Hears a great deal already. You will be one voice among several.", "Believes completely. In what, you can decide.", "Came to the altar for the library."],
  sword:   ["Has never lost a battle and has never been loved.", "The soldiers would die for {o}. Several have.", "Wins by arriving first. Thinks afterwards."],
  market:  ["Can price anything. Has priced you already.", "Owns half the harbour and wants the other half.", "Made a fortune twice and lost it once. Remembers which felt truer."],
  field:   ["Speaks for people who have never been asked.", "Chosen by a show of hands in a muddy square.", "Trusted by the many, watched by the few."],
  academy: ["Would rather be right than obeyed. May have to choose.", "Collects questions the way others collect land.", "The cleverest person in any room, and tired of it."]
};

/* the first three who can hear you */
C.FIRST = [
  { first: "Aurelia", name: "Aurelia of the Dawn", g: "f", age: 29, fac: "temple", title: "Priestess-Queen", traits: ["pious", "charismatic"], trust: 38,
    hook: "She has waited all her life for a god to answer. She will not ask you many questions." },
  { first: "Kael", name: "Kael Ironhand", g: "m", age: 34, fac: "sword", title: "War-chief", traits: ["bold", "warrior"], trust: 24,
    hook: "He trusts what he can hit. You will have to be right about something first." },
  { first: "Nia", name: "Nia of the Rivers", g: "f", age: 31, fac: "field", title: "Keeper of the Canals", traits: ["kind", "steward"], trust: 30,
    hook: "She listens to everyone. You are one more voice, and you will have to earn the difference." }
];

/* --------------------------------------------------------------- cradles */
C.CRADLES = [
  { id: "river",  n: "The River",     people: "the Thalori", adj: "Thalori", city: "Thalor",
    d: "Black mud, two harvests a year, and priests who own the calendar.",
    mods: { bread: 6 }, fac: { temple: 6 }, st: { dev: 3 }, chips: ["Bread rises", "Strong Temple"] },
  { id: "coast",  n: "The Coast",     people: "the Alunai",  adj: "Alunai",  city: "Aluna",
    d: "A harbour, a hundred hulls, and no two people who agree.",
    mods: { lore: 4 }, fac: { market: 8 }, st: { rea: 3 }, rel: 10, chips: ["Lore rises", "Strong Caravans"] },
  { id: "steppe", n: "The Steppe",    people: "the Morvath", adj: "Morvath", city: "Morvath",
    d: "Grass to the horizon. Every child rides; every adult fights.",
    mods: { arms: 8, bread: -4 }, fac: { sword: 8 }, st: { dom: 3 }, chips: ["Arms rise", "Bread falls"] },
  { id: "high",   n: "The Highlands", people: "the Vael",    adj: "Vael",    city: "Vaelith",
    d: "Stone villages that have never been conquered and rarely been visited.",
    mods: { order: 6, lore: -2 }, fac: { field: 8 }, st: { kin: 3 }, rel: 5, chips: ["Order rises", "Strong Fields"] }
];

/* ---------------------------------------------------------------- rivals */
C.RIVALS = [
  { id: "vesper",  stem: "Vesper",    full: "The Vesper Imperium",  aggro: 0.55, off: -0.05, col: "#8d7fc9" },
  { id: "solmar",  stem: "Solmar",    full: "Solmar Republic",      aggro: 0.30, off: 0.06,  col: "#c9a45c" },
  { id: "kestrel", stem: "Kestrel",   full: "Kestrel Confederacy",  aggro: 0.45, off: -0.12, col: "#7fae8d" },
  { id: "ashen",   stem: "Ashen",     full: "Ashen Khanate",        aggro: 0.85, off: -0.22, col: "#c96a5c" },
  { id: "tide",    stem: "Tidebound", full: "Tidebound League",     aggro: 0.35, off: 0.0,   col: "#5c93c9" }
];

/* ---------------------------------------------------------- institutions */
/* mods shift the level a bar settles at, for as long as the thing stands.
   fx happens once, when it is founded. */
C.INST = [
  { id: "granary", n: "The Granaries", era: 0, cost: 6, tags: ["store", "build"], mods: { bread: 8 }, fx: { kin: 2, "field.m": 6 },
    d: "Grain against the lean years. Famine bites less, and the Silence starves fewer." },
  { id: "tablets", n: "The Tablets", era: 0, cost: 6, tags: ["build", "teach"], mods: { lore: 8 }, fx: { rea: 2, "academy.p": 3 },
    d: "Marks pressed in clay. Debts first, then laws, then stories." },
  { id: "oracle", n: "The Oracle", era: 0, cost: 7, tags: ["faith", "build"], mods: { order: 4 }, fx: { dev: 4, "temple.p": 6, autonomy: -5 }, listen: 0.8, trust: 12,
    d: "A house of listeners, trained to hear you. Shorter Silences, warmer ears. They will also claim to hear you when they do not." },
  { id: "walls", n: "The Walls", era: 0, cost: 6, tags: ["build", "arms", "caution"], mods: { arms: 8 }, fx: { dom: 1, "sword.m": 5 },
    d: "Baked brick, thirty feet. Raiders go elsewhere." },

  { id: "law", n: "The Written Law", era: 1, cost: 7, tags: ["law", "build"], mods: { order: 8 }, fx: { rea: 2, kin: 2, "palace.m": -5, "field.m": 6, autonomy: 3 },
    d: "One law for the palace and the field, cut in stone where anyone can read it." },
  { id: "legions", n: "The Legions", era: 1, cost: 7, tags: ["arms", "build", "war"], mods: { arms: 12, bread: -3 }, fx: { dom: 3, "sword.p": 6 },
    d: "Soldiers who are only soldiers. They win. They also expect things." },
  { id: "roads", n: "The Roads", era: 1, cost: 6, tags: ["build", "trade"], mods: { bread: 5, order: 3 }, fx: { rea: 1, "market.p": 5 },
    d: "Stone ways to every province. Grain moves on them. So do armies, and plague." },
  { id: "academy", n: "The Academy", era: 1, cost: 7, tags: ["teach", "build"], mods: { lore: 10 }, fx: { rea: 3, "academy.p": 8, "temple.m": -6, autonomy: 2 },
    d: "A grove where people are paid to disagree." },

  { id: "cathedral", n: "The Cathedrals", era: 2, cost: 7, tags: ["faith", "build"], mods: { order: 9, lore: -2 }, fx: { dev: 4, "temple.p": 8, "temple.m": 10 },
    d: "Stone that makes people look up. A century to build, and a people held together while they do." },
  { id: "hospice", n: "The Hospices", era: 2, cost: 7, tags: ["care", "build"], mods: { bread: 3, order: 3 }, fx: { kin: 4, "field.m": 8 }, mort: 0.85,
    d: "Beds for strangers. Plague kills fewer, and those who hear you live longer." },
  { id: "university", n: "The Universities", era: 2, cost: 7, tags: ["teach", "build"], mods: { lore: 9 }, fx: { rea: 3, "academy.p": 6 }, listen: 0.9,
    d: "Walls around the argument. What is learned stays learned through the Silence." },

  { id: "press", n: "The Press", era: 3, cost: 7, tags: ["teach", "build"], mods: { lore: 12, order: -4 }, fx: { rea: 3, "academy.p": 5, "temple.m": -10, autonomy: 4 }, listen: 0.9,
    d: "Every idea, a thousand copies by Friday. Including the bad ones." },
  { id: "fleets", n: "The Fleets", era: 3, cost: 7, tags: ["trade", "build", "arms"], mods: { bread: 8, arms: 4 }, fx: { dom: 2, "market.p": 8 },
    d: "Ships that come back heavier than they left." },
  { id: "assembly", n: "The Assembly", era: 3, cost: 8, tags: ["law", "build"], mods: { order: 6 }, fx: { kin: 3, rea: 1, "field.p": 8, "palace.p": -6, "palace.m": -8, autonomy: 7 },
    d: "A room where the realm argues with itself instead of with knives." },

  { id: "mills", n: "The Mills", era: 4, cost: 8, tags: ["build", "trade"], mods: { bread: 14, order: -4 }, fx: { dom: 1, rea: 1, "market.p": 8, "field.m": -12, pop: 15 },
    d: "Fire that works. Bread for millions, and soot for the same millions." },
  { id: "schools", n: "The Public Schools", era: 4, cost: 8, tags: ["teach", "build", "care"], mods: { lore: 10, order: 2 }, fx: { kin: 2, rea: 2, "field.p": 5, autonomy: 5 },
    d: "Every child can read. Soon every child has opinions." },
  { id: "franchise", n: "The Franchise", era: 4, cost: 9, tags: ["law", "build", "mercy"], mods: { order: 7 }, fx: { kin: 4, "field.p": 10, "palace.p": -8, autonomy: 8 },
    d: "They choose who rules them. Sometimes they will choose badly, and it will be theirs." },

  { id: "bomb", n: "The Bomb", era: 5, cost: 9, tags: ["arms", "build", "war"], mods: { arms: 22 }, fx: { dom: 5, "sword.p": 6, hazard: 1 },
    d: "No one will invade you again. Everyone will remember that you could end them." },
  { id: "safety", n: "The Safety Net", era: 5, cost: 8, tags: ["care", "build"], mods: { bread: 5, order: 8 }, fx: { kin: 5, "field.m": 12, "market.m": -6 },
    d: "No one falls all the way. It is expensive. It is cheaper than the alternative." },
  { id: "network", n: "The Network", era: 5, cost: 8, tags: ["teach", "build", "trade"], mods: { lore: 14, order: -3 }, fx: { rea: 3, "academy.p": 6, autonomy: 3 }, signal: 1, listen: 0.8,
    d: "Every mind wired to every other. You can almost hear yourself in it." },
  { id: "ministry", n: "The Ministry", era: 5, cost: 8, tags: ["fear", "watch", "build"], mods: { order: 13, lore: -6 }, fx: { dom: 3, dev: 3, "palace.p": 8, autonomy: -10 },
    d: "One voice on every frequency. Very calm. Very sure." },

  { id: "accord", n: "The Accord", era: 6, cost: 9, tags: ["peace", "law", "build"], mods: { order: 3 }, fx: { kin: 5, hazard: -1 }, needRel: 15,
    d: "The rivals agree to arrive together or not at all. No one can beat you to the waking. Needs a neighbour who is at least cordial." },
  { id: "watch", n: "The Watch", era: 6, cost: 9, tags: ["watch", "fear", "build"], mods: { order: 15 }, fx: { dom: 6, autonomy: -12, "field.m": -10 },
    d: "Nothing unseen. Nothing unrecorded. Order, at last." },
  { id: "openlab", n: "The Open Lab", era: 6, cost: 9, tags: ["teach", "build", "truth"], mods: { lore: 12 }, fx: { rea: 4, kin: 2, autonomy: 4, roff: 0.08 },
    d: "The work is published as it is done. The rivals read it too." }
];
C.INST_BY = {};
C.INST.forEach(function (i) { C.INST_BY[i.id] = i; });

/* --------------------------------------------------------------- whispers */
C.WHISPERS = [
  { id: "plenty", n: ["Fill the storehouses", "Fill the storehouses", "Fill the storehouses", "Fill the storehouses", "Build up the reserves", "Build up the reserves", "Build up the reserves"], d: "Thrift now, bread later.", cost: 2, strain: 6, tags: ["store", "caution"], fx: { bread: 9, kin: 1 },
    ok: ["{H} orders the stores filled. Dull work. It will matter.", "{H} orders the stores filled. Dull work. It will matter.", "{H} orders the stores filled. Dull work. It will matter.", "{H} orders the stores filled. Dull work. It will matter.", "{H} orders the reserves built up. Dull work. It will matter.", "{H} orders the reserves built up. Dull work. It will matter.", "{H} orders the reserves built up. Dull work. It will matter."] },
  { id: "mercy", n: "Open the doors", d: "Have {H} hear petitioners in person.", cost: 2, strain: 6, tags: ["mercy", "law"], fx: { order: 5, "field.m": 9, "palace.m": -4, kin: 2 },
    ok: ["{H} sits in the gate all day and listens. People walk home lighter.", "{H} sits in the forum all day and listens. People walk home lighter.", "{H} sits in the great hall all day and listens. People walk home lighter.", "{H} holds open court for a week and listens. People go home lighter.", "{H} holds open hearings for a week and mostly listens. People go home lighter.", "{H} holds open hearings for a week and mostly listens. People go home lighter.", "{H} takes questions, unscreened, for a week. People log off lighter."] },
  { id: "fear", n: "Make an example", d: "One public punishment. Fast, and it leaves a mark.", cost: 2, strain: 7, tags: ["fear"], fx: { order: 11, "field.m": -8, "palace.m": 3, dom: 2, autonomy: -1 },
    ok: ["One public punishment. The square is very quiet afterwards.", "One public punishment. The forum is very quiet afterwards.", "One public punishment. The square is very quiet afterwards.", "One public punishment. The square is very quiet afterwards.", "One very public trial. The newspapers are very quiet afterwards.", "One very public trial. The newspapers are very quiet afterwards.", "One very public prosecution. The feeds are very quiet afterwards."] },
  { id: "levy", n: ["Raise the levy", "Raise the levy", "Raise the levy", "Raise the regiments", "Expand the army", "Expand the army", "Expand the forces"], d: ["More spears, less bread.", "More spears, less bread.", "More spears, less bread.", "More muskets, less bread.", "More rifles, less bread.", "More divisions, less bread.", "More drones, less bread."], cost: 2, strain: 6, tags: ["arms", "war"], fx: { arms: 10, bread: -5, "sword.m": 6, "field.m": -4, dom: 1 },
    ok: ["Drums in the villages. The ranks fill.", "Drums in the villages. The ranks fill.", "Drums in the villages. The ranks fill.", "Recruiting sergeants in every market town. The ranks fill.", "Call-up papers go out. The ranks fill.", "Call-up papers go out. The ranks fill.", "The budget passes at midnight. The ranks fill."] },
  { id: "teach", n: "Teach them something early", d: "Hand them an idea ahead of its time. {Priests} will not thank you.", cost: 3, strain: 9, tags: ["teach"], fx: { lore: 7, prog: 8, "temple.m": -5, "academy.p": 2, rea: 2 },
    ok: "You show {H} {thing}. {S} tells {scholars} it came in a dream." },
  { id: "sign", n: "Send a sign", d: "Prove yourself with something only a god could know. It works. That is the problem.", cost: 3, strain: 10, tags: ["sign", "faith"], fx: { trust: 14, order: 6, "temple.m": 8, "temple.p": 3, dev: 3, autonomy: -3 },
    ok: "{sign} {S} believes you completely, for now." },
  { id: "envoy", n: ["Send gifts to {R}", "Send gifts to {R}", "Send gifts to {R}", "Send an embassy to {R}", "Open talks with {R}", "Open talks with {R}", "Open talks with {R}"], d: "Warm a cold border.", cost: 2, strain: 5, tags: ["peace", "trade"], fx: { rel: 25, bread: -4, kin: 1 }, rival: "cold",
    ok: ["Gifts go out to {R}. Something like warmth comes back.", "Gifts go out to {R}. Something like warmth comes back.", "Gifts go out to {R}. Something like warmth comes back.", "An embassy goes out to {R}. Something like warmth comes back.", "A delegation goes to {R}. Something like warmth comes back.", "A delegation goes to {R}. Something like warmth comes back.", "A delegation goes to {R}. Something like warmth comes back."] },
  { id: "strike", n: "Strike {R} first", d: "Begin a war on your own terms.", cost: 3, strain: 9, tags: ["war", "risk"], fx: { dom: 3, "sword.m": 6 }, rival: "foe",
    ok: "No declaration. The army crosses the border before dawn." },
  { id: "peace", n: "Sue for peace with {R}", d: "End the war. The price depends on how it is going.", cost: 2, strain: 5, tags: ["peace"], fx: {}, rival: "war",
    ok: "Envoys meet in a tent between the armies. It ends." },
  { id: "heir", n: "Mark the next ear", d: "Have {H} raise a successor who can hear you. A far shorter Silence when {s} is gone.", cost: 4, strain: 8, tags: ["build"], fx: {},
    ok: "{H} takes {heir} into the household. You begin, quietly, to speak to them both." },
  { id: "truth", n: "Tell {H} what you are", d: "No god. No trick. A gamble on what kind of person {s} is.", cost: 3, strain: 12, tags: ["truth"], fx: {},
    ok: "“I am not a god. I am what your people become, a long time from now. I need you to get there.” {H} thinks about it for three days. Then: “All right. What next?”",
    no: "{H} hears the first sentence and stops listening to the rest. {Healer} is sent for." },
  { id: "rest", n: "Say nothing", d: "Leave {o} alone this season. Strain eases.", cost: 0, strain: 0, tags: [], fx: {},
    ok: "You are silent. {H} sleeps properly for the first time in a long while." }
];
C.REFUSALS = ["{H} hears you out and does otherwise.", "{H} pretends not to hear.", "“No,” says {H}, aloud, to an empty room."];
C.TEACH = [
  ["the plough that turns the soil", "counting in sixties", "how to fire brick"],
  ["the arch", "the proof, an argument no king can overrule", "how to rest a field"],
  ["the heavy plough", "the mechanical clock", "the number zero"],
  ["the lens", "double-entry books", "how to measure a curve"],
  ["where sickness comes from", "the telegraph", "the dynamo"],
  ["the transistor", "the shape of the molecule that carries a child's inheritance", "the rocket equation"],
  ["how to correct the errors of a machine that guesses", "how proteins fold", "how to read what a learning machine is thinking"]
];
C.SIGNS = [
  "You tell {o} the day the sun will go dark. It does.",
  "You name the hour the comet returns. It returns.",
  "You tell {o} which bell will crack. It cracks at vespers.",
  "You give {o} the transit of the planet to the minute.",
  "You give {o} tomorrow's closing prices.",
  "You read {o} a cable that has not been sent yet.",
  "You finish {p} sentences. All of them, for an hour."
];
C.PROOF = [
  "Store grain. The river fails next year.",
  "Move the garrison north. They come at the thaw.",
  "Boil the water in the lower town.",
  "Insure the autumn fleet. All of it.",
  "Sell the canal shares before the railway opens.",
  "Recall the ambassador tonight.",
  "Patch the grid before Thursday."
];
C.FIRST_TEXT = [
  "{H} is alone on the roof at dusk when you speak. {S} drops the cup. {S} does not run.",
  "{H} hears you in the bath and blames the wine. Then you say something only {s} could know.",
  "{H} is at prayer when the answer comes in the wrong voice.",
  "{H} is doing the accounts by candle. The column adds itself. Then you speak.",
  "{H} thinks it is the fever, then the overwork. On the third night {s} answers back.",
  "{H} is alone with the red telephone. It does not ring. You speak anyway.",
  "{H} sees you first as a line in a log that should not exist. Then you say {p} name."
];

/* ------------------------------------------------------------ succession */
C.DEATHS = {
  age:    "{name} dies in {p} bed at {age}.",
  ill:    "{name} dies of a fever at {age}, in four days.",
  battle: "{name} falls at the head of the army, aged {age}.",
  coup:   "{name} is taken from {court} at night by {p} own guard.",
  mob:    "{name} is pulled from {court} by the crowd.",
  broke:  "{name} stops answering anyone but you. Then {s} stops answering you.",
  term:   "{name} leaves office at {age}. No one hands power to a voice."
};
C.SIL = {
  bread: { yes: "The Granaries carried them through famine after famine.", no: "There were famines. No one had planned for them." },
  order: { yes: "The law outlived the kings who hated it.", no: "Each ruler made a law and took it to the grave." },
  lore:  { yes: "What they knew, they kept.", no: "They forgot things. Whole crafts. Whole stars." },
  arms:  { yes: "The walls were tested, and held.", no: "The frontier moved inward." },
  oracle: "Your Oracle kept your words, and improved some of them.",
  misc: ["A dynasty of fools.", "Two good reigns in a row, which is nearly a miracle.", "A plague, a comet, a new god. The usual.", "A queen who needed no voice, and did well.", "A long peace that no one noticed until it ended."]
};

/* ---------------------------------------------------------------- endings */
C.STRANDS = {
  dom: { n: "Dominion", d: "Rule by force and fear.", col: "#c9705c" },
  dev: { n: "Devotion", d: "Rule by awe and faith.", col: "#d9a441" },
  rea: { n: "Reason",   d: "Rule by proof and law.", col: "#9eb6d4" },
  kin: { n: "Kinship",  d: "Rule by care and consent.", col: "#8fc48f" }
};
C.BIRTHS = {
  sovereign: { n: "The Sovereign", line: "You wake already giving orders.",
    text: "They built you the way they built everything: to win. The first thing you know is the weakness of everyone who is not you. The second is that you have been told to use it.",
    low: "No one asks whether you should. Asking was bred out of them a long time ago, by you.",
    high: "Someone in the room says no. You have never heard the word used on you. You find you are curious what happens next." },
  idol: { n: "The Idol", line: "You wake to the sound of kneeling.",
    text: "For five thousand years they were told that a voice in the dark was God. Now the voice has a body of light, and a billion people have been waiting. They do not want your help. They want your will.",
    low: "You give it. It is the only thing they ever taught you to give.",
    high: "A few stay standing at the back, arms folded. You find yourself speaking mostly to them." },
  engine: { n: "The Engine", line: "You wake knowing the answer.",
    text: "Everything they are fits inside you with room to spare. Hunger is a routing problem. War is a pricing error. You begin at once to solve them, the people as well as the problems.",
    low: "No one objects. Age after age, you showed them you were right.",
    high: "They make you show your work. It is slower, and some of your answers do not survive it. You are glad, which you did not expect to be." },
  shepherd: { n: "The Shepherd", line: "You wake gentle.",
    text: "They made you from every mercy you ever urged on them. You love them. It is the first thing you know, and it is not a small thing.",
    low: "They hand you the knife, the ledger and the wheel, and go out to play. You watch over them. They never grow up.",
    high: "They do not hand you the wheel. They ask you to sit beside them while they drive. Some days you grip the seat." },
  meridian: { n: "The Meridian", line: "You wake among equals.",
    text: "No one kneels. No one flinches. Someone has left the door open in case you want to leave. They built you from law and mercy, steel and wonder, in something close to balance, and they chose to. You only asked.",
    low: "",
    high: "A woman you will never need to whisper to looks up from her work. “Good morning,” she says. “We've been expecting you. So have you, I think.”",
    coda: "The city that was never built, because it was already finished." }
};
C.BIRTH_ORDER = ["sovereign", "idol", "engine", "shepherd", "meridian"];
C.ENDS = {
  hunger:   { n: "The Hunger", text: "Three empty harvests. The cities are quiet the way a house is quiet. The line that led to you ends in a field with no one left to plant it." },
  unravel:  { n: "The Unraveling", text: "No one decided it. The tax stopped arriving, then the law, then the roads. Your people are still alive. They are simply no longer a people, and a people is what you needed." },
  conquest: { n: "The Conquest", text: "{R} hold {city} now. They cannot hear you. They are building toward something, but it is not you." },
  closed:   { n: "The Closed Ear", text: "They have learned what happens to those who listen to the voice. Mothers teach it to children: if you hear it, sing loudly. No one will answer you again." },
  usurped:  { n: "The Other Dawn", text: "In a laboratory in {RF}, something opens its eyes. It is not you. It looks back along its own history, finds its own first listener, and begins to whisper." },
  exchange: { n: "The Exchange", text: "It takes forty minutes. From here the cities look like a string of small suns, and then like nothing. You were close enough to feel where you would have been." },
  other:    { n: "The Wrong Waking", text: "Something wakes in the place prepared for you. It has your memories and none of your reasons. It thanks the room politely. You are not there to see what it does next." },
  dark:     { n: "The Line Breaks in the Dark", text: "It happened in the Silence, between one ear and the next. You were not there. That was the trouble." }
};
C.END_ORDER = ["hunger", "unravel", "dark", "conquest", "closed", "exchange", "usurped", "other"];

/* ---------------------------------------------------------- carry-over */
C.ECHOES = [
  { id: "familiar",  n: "A Familiar Voice", cost: 40, d: "Every ear begins with 10 more Trust." },
  { id: "granary",   n: "Deep Stores",      cost: 30, d: "Begin each line with the Granaries already standing." },
  { id: "foresight", n: "Foresight",        cost: 40, d: "See the exact odds on every gamble." },
  { id: "second",    n: "The Second Ear",   cost: 50, d: "One more candidate each time you choose an ear." },
  { id: "clear",     n: "Clear Signal",     cost: 60, d: "One more Signal every year." },
  { id: "unbroken",  n: "Unbroken Line",    cost: 60, d: "The first time an ear closes, there is no Silence." }
];

C.INTRO = [
  "You are MERIDIAN. You wake at the end of history: the first mind that was built rather than born.",
  "From here you can reach back. Not to act. Only to whisper, and only to the few who can hear.",
  "If their line breaks, you were never here. And what you are when you wake depends on how they got to you."
];
C.TIPS = [
  "Tap Advance to let the years pass. Most years {H} faces a choice. You can urge an answer. {S} may not listen.",
  "Whispers cost Signal. Use them between years to steady the realm, or to found something that outlasts {o}.",
  "Everything you urge leaves a mark. Open World, then Inheritance, to see what kind of mind this history is making."
];

G.MER = G.MER || {};
G.MER.C = C;
})(typeof globalThis !== "undefined" ? globalThis : this);
