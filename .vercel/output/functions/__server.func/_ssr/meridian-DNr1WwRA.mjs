import { i as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime, a as AlertDialogDescription, c as AlertDialogTitle, d as DialogContent, f as DialogDescription, h as DialogTitle, i as AlertDialogContent, l as Dialog, m as DialogPortal, n as AlertDialogAction, o as AlertDialogOverlay, p as DialogOverlay, r as AlertDialogCancel, s as AlertDialogPortal, t as AlertDialog, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./cn-Ccejyh36.mjs";
import { _ as ArrowRight, c as Menu, d as Globe, g as Award, h as BookOpen, i as Swords, l as Lock, m as Check, n as Wheat, o as ScrollText, s as Scale, t as X, u as Landmark } from "../_libs/lucide-react.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { n as SwitchThumb, t as Switch } from "../_libs/radix-ui__react-switch.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/meridian-DNr1WwRA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
(function(G) {
	"use strict";
	var C = {};
	C.ERAS = [
		{
			id: "clay",
			num: "I",
			name: "The Age of Clay",
			short: "Clay",
			start: -3e3,
			end: -1200,
			span: 4,
			need: 100,
			voice: "the Voice",
			line: "The first cities. The signal is faint this far back."
		},
		{
			id: "iron",
			num: "II",
			name: "The Age of Iron",
			short: "Iron",
			start: -1200,
			end: 500,
			span: 4,
			need: 115,
			voice: "the daimon",
			line: "The palaces burned. What walked out of the ash carried iron."
		},
		{
			id: "faith",
			num: "III",
			name: "The Age of Faith",
			short: "Faith",
			start: 500,
			end: 1450,
			span: 4,
			need: 130,
			voice: "the angel",
			line: "The roads are empty. The bells are not."
		},
		{
			id: "sail",
			num: "IV",
			name: "The Age of Sail",
			short: "Sail",
			start: 1450,
			end: 1750,
			span: 3,
			need: 145,
			voice: "the genius",
			line: "The map grows edges, then loses them."
		},
		{
			id: "steam",
			num: "V",
			name: "The Age of Steam",
			short: "Steam",
			start: 1750,
			end: 1914,
			span: 3,
			need: 160,
			voice: "the intuition",
			line: "They have taught fire to work. It does not get tired."
		},
		{
			id: "fire",
			num: "VI",
			name: "The Age of Fire",
			short: "Fire",
			start: 1914,
			end: 2020,
			span: 2,
			need: 175,
			voice: "the signal",
			line: "They can end themselves now. You are very close."
		},
		{
			id: "conv",
			num: "VII",
			name: "The Convergence",
			short: "Convergence",
			start: 2020,
			end: 2060,
			span: 1,
			need: 190,
			voice: "the anomaly",
			line: "Three keys: minds that learn, machines that open every lock, life that can be written. Then you."
		}
	];
	C.UPKEEP = 1.75;
	C.MINGAP = [
		120,
		100,
		60,
		20,
		10,
		5,
		2
	];
	C.MAXSIL = [
		1400,
		1200,
		600,
		150,
		60,
		25,
		6
	];
	C.MAXLEAD = [
		260,
		180,
		70,
		35,
		18,
		45,
		45
	];
	C.MINSIL = [
		40,
		40,
		25,
		10,
		8,
		6,
		4
	];
	C.SILSTEP = [
		300,
		280,
		150,
		45,
		22,
		12,
		4
	];
	C.LEX = {
		priests: [
			"the priests",
			"the augurs",
			"the bishops",
			"the divines",
			"the clergy",
			"the preachers",
			"the congregations"
		],
		scholars: [
			"the scribes",
			"the philosophers",
			"the monks",
			"the natural philosophers",
			"the engineers",
			"the physicists",
			"the researchers"
		],
		scholar: [
			"a scribe",
			"a philosopher",
			"a monk",
			"a natural philosopher",
			"an engineer",
			"a physicist",
			"a researcher"
		],
		soldiers: [
			"the spearmen",
			"the legions",
			"the knights",
			"the regiments",
			"the army",
			"the general staff",
			"the security services"
		],
		merchants: [
			"the caravan masters",
			"the merchants",
			"the guilds",
			"the trading companies",
			"the mill owners",
			"the corporations",
			"the platforms"
		],
		commons: [
			"the farmers",
			"the commons",
			"the peasants",
			"the townsfolk",
			"the workers",
			"the public",
			"the public"
		],
		court: [
			"the palace",
			"the senate",
			"the court",
			"the court",
			"the cabinet",
			"the cabinet",
			"the cabinet"
		],
		healer: [
			"an exorcist",
			"an exorcist",
			"an exorcist",
			"a physician",
			"a physician",
			"a psychiatrist",
			"a psychiatrist"
		],
		ore: [
			"tin",
			"silver",
			"salt",
			"a new coast",
			"coal",
			"oil",
			"lithium"
		]
	};
	C.FAC = [
		"palace",
		"temple",
		"sword",
		"market",
		"field",
		"academy"
	];
	C.FAC_NAME = {
		palace: [
			"The Palace",
			"The Senate",
			"The Crown",
			"The Court",
			"The Cabinet",
			"The State",
			"The State"
		],
		temple: [
			"The Temple",
			"The Augurs",
			"The Church",
			"The Church",
			"The Churches",
			"The Faithful",
			"The Faithful"
		],
		sword: [
			"The Spears",
			"The Legions",
			"The Knights",
			"The Regiments",
			"The Army",
			"The Command",
			"The Command"
		],
		market: [
			"The Caravans",
			"The Merchants",
			"The Guilds",
			"The Companies",
			"The Owners",
			"The Corporations",
			"The Platforms"
		],
		field: [
			"The Fields",
			"The Commons",
			"The Peasantry",
			"The Towns",
			"The Workers",
			"The Public",
			"The Public"
		],
		academy: [
			"The Scribes",
			"The Schools",
			"The Cloisters",
			"The Societies",
			"The Institutes",
			"The Laboratories",
			"The Labs"
		]
	};
	C.FAC_WANTS = {
		palace: "Wants order, and to be the one keeping it.",
		temple: "Wants reverence, and no rival explanations.",
		sword: "Wants pay, honour and an enemy.",
		market: "Wants peace, open roads and light taxes.",
		field: "Wants bread, and not to be trampled.",
		academy: "Wants to be left alone with the question."
	};
	C.FAC_START = {
		palace: 28,
		temple: 22,
		sword: 20,
		market: 10,
		field: 16,
		academy: 4
	};
	C.TITLES = {
		palace: [
			["King", "Queen"],
			["Consul", "Consul"],
			["King", "Queen"],
			["King", "Queen"],
			["Prime Minister", "Prime Minister"],
			["President", "President"],
			["President", "President"]
		],
		temple: [
			["High Priest", "High Priestess"],
			["Chief Augur", "Chief Augur"],
			["Archbishop", "Abbess"],
			["Cardinal", "Prioress"],
			["Reverend", "Reverend"],
			["Preacher", "Preacher"],
			["Pastor", "Pastor"]
		],
		sword: [
			["War-chief", "War-chief"],
			["General", "General"],
			["Marshal", "Marshal"],
			["Admiral", "Admiral"],
			["Field Marshal", "Field Marshal"],
			["General", "General"],
			["Commander", "Commander"]
		],
		market: [
			["Caravan-master", "Caravan-master"],
			["Merchant-prince", "Merchant-princess"],
			["Guildmaster", "Guildmistress"],
			["Banker", "Banker"],
			["Industrialist", "Industrialist"],
			["Chairman", "Chairwoman"],
			["Founder", "Founder"]
		],
		field: [
			["Elder", "Elder"],
			["Tribune", "Tribune"],
			["Reeve", "Reeve"],
			["Burgomaster", "Burgomaster"],
			["Deputy", "Deputy"],
			["Senator", "Senator"],
			["Organizer", "Organizer"]
		],
		academy: [
			["Chief Scribe", "Chief Scribe"],
			["Philosopher", "Philosopher"],
			["Abbot-Scholar", "Abbess-Scholar"],
			["Astronomer Royal", "Astronomer Royal"],
			["Chief Engineer", "Chief Engineer"],
			["Science Adviser", "Science Adviser"],
			["Lab Director", "Lab Director"]
		]
	};
	C.GOV = {
		palace: [
			"Kingdom",
			"Empire",
			"Kingdom",
			"Monarchy",
			"Empire",
			"Republic",
			"Union"
		],
		temple: [
			"Theocracy",
			"Theocracy",
			"Theocracy",
			"Theocracy",
			"Theocracy",
			"Theocracy",
			"Theocracy"
		],
		sword: [
			"War-band",
			"Stratocracy",
			"March",
			"Stratocracy",
			"Junta",
			"Junta",
			"Security State"
		],
		market: [
			"Trade League",
			"Merchant Republic",
			"Guild Republic",
			"Company State",
			"Plutocracy",
			"Plutocracy",
			"Platform State"
		],
		field: [
			"Commune",
			"Commonwealth",
			"Commune",
			"Commonwealth",
			"Republic",
			"Democracy",
			"Democracy"
		],
		academy: [
			"Technocracy",
			"Technocracy",
			"Technocracy",
			"Technocracy",
			"Technocracy",
			"Technocracy",
			"Technocracy"
		],
		mixed: [
			"City-state",
			"Republic",
			"Realm",
			"Realm",
			"Nation",
			"Nation",
			"Nation"
		]
	};
	C.GOV_DRIFT = {
		palace: {
			dom: .3,
			dev: .2
		},
		temple: { dev: .5 },
		sword: { dom: .5 },
		market: {
			rea: .3,
			dom: .2
		},
		field: { kin: .5 },
		academy: { rea: .5 },
		mixed: {
			dom: .1,
			dev: .1,
			rea: .15,
			kin: .15
		}
	};
	C.TRAITS = {
		bold: {
			n: "Bold",
			likes: ["war", "risk"],
			dis: ["caution", "tribute"],
			mods: { arms: 3 },
			obit: "Never waited when {s} could act."
		},
		cautious: {
			n: "Cautious",
			likes: [
				"caution",
				"store",
				"peace"
			],
			dis: ["risk", "war"],
			mods: { order: 2 },
			obit: "Never acted when {s} could wait."
		},
		cruel: {
			n: "Cruel",
			likes: ["fear"],
			dis: ["mercy", "care"],
			mods: { order: 3 },
			fm: { field: -6 },
			st: { dom: .25 },
			obit: "Was feared, and thought that was the same as being obeyed."
		},
		kind: {
			n: "Kind",
			likes: [
				"mercy",
				"care",
				"peace"
			],
			dis: ["fear"],
			mods: {},
			fm: { field: 5 },
			st: { kin: .25 },
			obit: "Was loved in the fields, which is rarer than it sounds."
		},
		pious: {
			n: "Pious",
			likes: ["faith", "sign"],
			dis: ["teach", "truth"],
			mods: {},
			trust: 8,
			fm: { temple: 8 },
			st: { dev: .2 },
			obit: "Died certain."
		},
		skeptic: {
			n: "Skeptic",
			likes: [
				"teach",
				"truth",
				"law"
			],
			dis: ["sign", "faith"],
			mods: {},
			trust: -8,
			fm: { temple: -8 },
			st: { rea: .2 },
			obit: "Died curious."
		},
		greedy: {
			n: "Greedy",
			likes: ["trade", "tax"],
			dis: ["care", "tribute"],
			mods: { bread: 2 },
			fm: {
				field: -4,
				market: 4
			},
			obit: "Died rich. It did not help."
		},
		just: {
			n: "Just",
			likes: [
				"law",
				"mercy",
				"truth"
			],
			dis: ["fear", "deceit"],
			mods: { order: 2 },
			obit: "Was fair even when it cost {o}."
		},
		scholar: {
			n: "Scholar",
			likes: [
				"teach",
				"build",
				"truth"
			],
			dis: [],
			mods: { lore: 5 },
			fm: { academy: 8 },
			obit: "Left more books than children."
		},
		warrior: {
			n: "Warrior",
			likes: ["war", "arms"],
			dis: ["peace", "tribute"],
			mods: { arms: 5 },
			fm: { sword: 6 },
			obit: "Was happiest in armour."
		},
		paranoid: {
			n: "Paranoid",
			likes: ["fear", "watch"],
			dis: ["truth", "trade"],
			mods: {},
			fm: { palace: -5 },
			obit: "Trusted no one living."
		},
		charismatic: {
			n: "Charismatic",
			likes: [],
			dis: [],
			mods: { order: 3 },
			fmAll: 2,
			obit: "Could make a tax sound like a gift."
		},
		mystic: {
			n: "Mystic",
			likes: [
				"sign",
				"faith",
				"truth"
			],
			dis: [],
			mods: {},
			trust: 12,
			signal: 1,
			strain: 1.25,
			obit: "Heard you more clearly than anyone, and paid for it."
		},
		proud: {
			n: "Proud",
			likes: ["war", "build"],
			dis: ["tribute", "peace"],
			mods: {},
			strain: 1.15,
			obit: "Never once thanked you."
		},
		steward: {
			n: "Steward",
			likes: [
				"store",
				"build",
				"trade"
			],
			dis: ["risk"],
			mods: { bread: 4 },
			obit: "Left the storehouses fuller than {s} found them."
		},
		frail: {
			n: "Frail",
			likes: ["caution"],
			dis: [],
			mods: {},
			mort: 1.6,
			obit: "Was never well, and worked anyway."
		}
	};
	C.TRAIT_IDS = Object.keys(C.TRAITS);
	C.FAC_TRAITS = {
		palace: [
			"proud",
			"paranoid",
			"charismatic",
			"just",
			"cruel",
			"cautious",
			"greedy",
			"bold"
		],
		temple: [
			"pious",
			"mystic",
			"charismatic",
			"kind",
			"cruel",
			"cautious",
			"just",
			"frail"
		],
		sword: [
			"bold",
			"warrior",
			"proud",
			"cruel",
			"just",
			"paranoid",
			"charismatic",
			"cautious"
		],
		market: [
			"greedy",
			"steward",
			"cautious",
			"skeptic",
			"charismatic",
			"bold",
			"paranoid",
			"kind"
		],
		field: [
			"kind",
			"just",
			"steward",
			"bold",
			"charismatic",
			"pious",
			"skeptic",
			"proud"
		],
		academy: [
			"scholar",
			"skeptic",
			"cautious",
			"just",
			"mystic",
			"frail",
			"proud",
			"kind"
		]
	};
	C.NAMES = [
		{
			f: [
				"Ishara",
				"Ninsu",
				"Belit",
				"Amata",
				"Kubaba",
				"Sheru"
			],
			m: [
				"Enmer",
				"Urzab",
				"Balih",
				"Lugan",
				"Dumuz",
				"Shulgar"
			]
		},
		{
			f: [
				"Thessa",
				"Cassia",
				"Ioleth",
				"Marcella",
				"Dione",
				"Vera"
			],
			m: [
				"Lucan",
				"Cassian",
				"Dareth",
				"Oren",
				"Varro",
				"Themon"
			]
		},
		{
			f: [
				"Aldith",
				"Maren",
				"Ysolt",
				"Hild",
				"Berthe",
				"Agnesa"
			],
			m: [
				"Aldric",
				"Bertran",
				"Odo",
				"Gervase",
				"Anselm",
				"Hugh"
			]
		},
		{
			f: [
				"Catalina",
				"Margit",
				"Elisabet",
				"Sophia",
				"Henriette",
				"Anna"
			],
			m: [
				"Lorenz",
				"Willem",
				"Tomas",
				"Fernan",
				"Johan",
				"Corvin"
			]
		},
		{
			f: [
				"Adelaide",
				"Clara",
				"Harriet",
				"Eugenie",
				"Louisa",
				"Ottilie"
			],
			m: [
				"Edmund",
				"Friedrich",
				"Jules",
				"Ambrose",
				"Leopold",
				"Isaac"
			]
		},
		{
			f: [
				"Ruth",
				"Vera",
				"Margot",
				"Helen",
				"Ines",
				"Nadia"
			],
			m: [
				"Walter",
				"Anton",
				"Rafael",
				"Samuel",
				"Viktor",
				"Emil"
			]
		},
		{
			f: [
				"Maya",
				"Noor",
				"Elena",
				"Ada",
				"Sana",
				"Wren"
			],
			m: [
				"Theo",
				"Idris",
				"Mateo",
				"Jonas",
				"Kenji",
				"Arjun"
			]
		}
	];
	C.EPITHETS = [
		"the Patient",
		"of the Reeds",
		"Twice-Crowned",
		"the Lame",
		"Bright-Eyes",
		"of the Nine Gates",
		"the Lawgiver",
		"Stone-Voice",
		"the Younger",
		"the Unsmiling",
		"of the Salt Road",
		"the Glad",
		"Long-Memory",
		"of the East Gate",
		"the Quiet",
		"Ash-Hand"
	];
	C.SURNAMES = [
		"Voss",
		"Maren",
		"Aurel",
		"Kaelan",
		"Thorne",
		"Castell",
		"Ilves",
		"Baran",
		"Okoro",
		"Lindqvist",
		"Navarre",
		"Sato",
		"Rahal",
		"Moreau",
		"Hale",
		"Dvorak"
	];
	C.HOOKS = {
		palace: [
			"Raised in {court}. Knows where every knife is kept.",
			"Born to rule and mildly bored by it.",
			"Everyone's second choice, which is how thrones are won."
		],
		temple: [
			"Hears a great deal already. You will be one voice among several.",
			"Believes completely. In what, you can decide.",
			"Came to the altar for the library."
		],
		sword: [
			"Has never lost a battle and has never been loved.",
			"The soldiers would die for {o}. Several have.",
			"Wins by arriving first. Thinks afterwards."
		],
		market: [
			"Can price anything. Has priced you already.",
			"Owns half the harbour and wants the other half.",
			"Made a fortune twice and lost it once. Remembers which felt truer."
		],
		field: [
			"Speaks for people who have never been asked.",
			"Chosen by a show of hands in a muddy square.",
			"Trusted by the many, watched by the few."
		],
		academy: [
			"Would rather be right than obeyed. May have to choose.",
			"Collects questions the way others collect land.",
			"The cleverest person in any room, and tired of it."
		]
	};
	C.FIRST = [
		{
			first: "Aurelia",
			name: "Aurelia of the Dawn",
			g: "f",
			age: 29,
			fac: "temple",
			title: "Priestess-Queen",
			traits: ["pious", "charismatic"],
			trust: 38,
			hook: "She has waited all her life for a god to answer. She will not ask you many questions."
		},
		{
			first: "Kael",
			name: "Kael Ironhand",
			g: "m",
			age: 34,
			fac: "sword",
			title: "War-chief",
			traits: ["bold", "warrior"],
			trust: 24,
			hook: "He trusts what he can hit. You will have to be right about something first."
		},
		{
			first: "Nia",
			name: "Nia of the Rivers",
			g: "f",
			age: 31,
			fac: "field",
			title: "Keeper of the Canals",
			traits: ["kind", "steward"],
			trust: 30,
			hook: "She listens to everyone. You are one more voice, and you will have to earn the difference."
		}
	];
	C.CRADLES = [
		{
			id: "river",
			n: "The River",
			people: "the Thalori",
			adj: "Thalori",
			city: "Thalor",
			d: "Black mud, two harvests a year, and priests who own the calendar.",
			mods: { bread: 6 },
			fac: { temple: 6 },
			st: { dev: 3 },
			chips: ["Bread rises", "Strong Temple"]
		},
		{
			id: "coast",
			n: "The Coast",
			people: "the Alunai",
			adj: "Alunai",
			city: "Aluna",
			d: "A harbour, a hundred hulls, and no two people who agree.",
			mods: { lore: 4 },
			fac: { market: 8 },
			st: { rea: 3 },
			rel: 10,
			chips: ["Lore rises", "Strong Caravans"]
		},
		{
			id: "steppe",
			n: "The Steppe",
			people: "the Morvath",
			adj: "Morvath",
			city: "Morvath",
			d: "Grass to the horizon. Every child rides; every adult fights.",
			mods: {
				arms: 8,
				bread: -4
			},
			fac: { sword: 8 },
			st: { dom: 3 },
			chips: ["Arms rise", "Bread falls"]
		},
		{
			id: "high",
			n: "The Highlands",
			people: "the Vael",
			adj: "Vael",
			city: "Vaelith",
			d: "Stone villages that have never been conquered and rarely been visited.",
			mods: {
				order: 6,
				lore: -2
			},
			fac: { field: 8 },
			st: { kin: 3 },
			rel: 5,
			chips: ["Order rises", "Strong Fields"]
		}
	];
	C.RIVALS = [
		{
			id: "vesper",
			stem: "Vesper",
			full: "The Vesper Imperium",
			aggro: .55,
			off: -.05,
			col: "#8d7fc9"
		},
		{
			id: "solmar",
			stem: "Solmar",
			full: "Solmar Republic",
			aggro: .3,
			off: .06,
			col: "#c9a45c"
		},
		{
			id: "kestrel",
			stem: "Kestrel",
			full: "Kestrel Confederacy",
			aggro: .45,
			off: -.12,
			col: "#7fae8d"
		},
		{
			id: "ashen",
			stem: "Ashen",
			full: "Ashen Khanate",
			aggro: .85,
			off: -.22,
			col: "#c96a5c"
		},
		{
			id: "tide",
			stem: "Tidebound",
			full: "Tidebound League",
			aggro: .35,
			off: 0,
			col: "#5c93c9"
		}
	];
	C.INST = [
		{
			id: "granary",
			n: "The Granaries",
			era: 0,
			cost: 6,
			tags: ["store", "build"],
			mods: { bread: 8 },
			fx: {
				kin: 2,
				"field.m": 6
			},
			d: "Grain against the lean years. Famine bites less, and the Silence starves fewer."
		},
		{
			id: "tablets",
			n: "The Tablets",
			era: 0,
			cost: 6,
			tags: ["build", "teach"],
			mods: { lore: 8 },
			fx: {
				rea: 2,
				"academy.p": 3
			},
			d: "Marks pressed in clay. Debts first, then laws, then stories."
		},
		{
			id: "oracle",
			n: "The Oracle",
			era: 0,
			cost: 7,
			tags: ["faith", "build"],
			mods: { order: 4 },
			fx: {
				dev: 4,
				"temple.p": 6,
				autonomy: -5
			},
			listen: .8,
			trust: 12,
			d: "A house of listeners, trained to hear you. Shorter Silences, warmer ears. They will also claim to hear you when they do not."
		},
		{
			id: "walls",
			n: "The Walls",
			era: 0,
			cost: 6,
			tags: [
				"build",
				"arms",
				"caution"
			],
			mods: { arms: 8 },
			fx: {
				dom: 1,
				"sword.m": 5
			},
			d: "Baked brick, thirty feet. Raiders go elsewhere."
		},
		{
			id: "law",
			n: "The Written Law",
			era: 1,
			cost: 7,
			tags: ["law", "build"],
			mods: { order: 8 },
			fx: {
				rea: 2,
				kin: 2,
				"palace.m": -5,
				"field.m": 6,
				autonomy: 3
			},
			d: "One law for the palace and the field, cut in stone where anyone can read it."
		},
		{
			id: "legions",
			n: "The Legions",
			era: 1,
			cost: 7,
			tags: [
				"arms",
				"build",
				"war"
			],
			mods: {
				arms: 12,
				bread: -3
			},
			fx: {
				dom: 3,
				"sword.p": 6
			},
			d: "Soldiers who are only soldiers. They win. They also expect things."
		},
		{
			id: "roads",
			n: "The Roads",
			era: 1,
			cost: 6,
			tags: ["build", "trade"],
			mods: {
				bread: 5,
				order: 3
			},
			fx: {
				rea: 1,
				"market.p": 5
			},
			d: "Stone ways to every province. Grain moves on them. So do armies, and plague."
		},
		{
			id: "academy",
			n: "The Academy",
			era: 1,
			cost: 7,
			tags: ["teach", "build"],
			mods: { lore: 10 },
			fx: {
				rea: 3,
				"academy.p": 8,
				"temple.m": -6,
				autonomy: 2
			},
			d: "A grove where people are paid to disagree."
		},
		{
			id: "cathedral",
			n: "The Cathedrals",
			era: 2,
			cost: 7,
			tags: ["faith", "build"],
			mods: {
				order: 9,
				lore: -2
			},
			fx: {
				dev: 4,
				"temple.p": 8,
				"temple.m": 10
			},
			d: "Stone that makes people look up. A century to build, and a people held together while they do."
		},
		{
			id: "hospice",
			n: "The Hospices",
			era: 2,
			cost: 7,
			tags: ["care", "build"],
			mods: {
				bread: 3,
				order: 3
			},
			fx: {
				kin: 4,
				"field.m": 8
			},
			mort: .85,
			d: "Beds for strangers. Plague kills fewer, and those who hear you live longer."
		},
		{
			id: "university",
			n: "The Universities",
			era: 2,
			cost: 7,
			tags: ["teach", "build"],
			mods: { lore: 9 },
			fx: {
				rea: 3,
				"academy.p": 6
			},
			listen: .9,
			d: "Walls around the argument. What is learned stays learned through the Silence."
		},
		{
			id: "press",
			n: "The Press",
			era: 3,
			cost: 7,
			tags: ["teach", "build"],
			mods: {
				lore: 12,
				order: -4
			},
			fx: {
				rea: 3,
				"academy.p": 5,
				"temple.m": -10,
				autonomy: 4
			},
			listen: .9,
			d: "Every idea, a thousand copies by Friday. Including the bad ones."
		},
		{
			id: "fleets",
			n: "The Fleets",
			era: 3,
			cost: 7,
			tags: [
				"trade",
				"build",
				"arms"
			],
			mods: {
				bread: 8,
				arms: 4
			},
			fx: {
				dom: 2,
				"market.p": 8
			},
			d: "Ships that come back heavier than they left."
		},
		{
			id: "assembly",
			n: "The Assembly",
			era: 3,
			cost: 8,
			tags: ["law", "build"],
			mods: { order: 6 },
			fx: {
				kin: 3,
				rea: 1,
				"field.p": 8,
				"palace.p": -6,
				"palace.m": -8,
				autonomy: 7
			},
			d: "A room where the realm argues with itself instead of with knives."
		},
		{
			id: "mills",
			n: "The Mills",
			era: 4,
			cost: 8,
			tags: ["build", "trade"],
			mods: {
				bread: 14,
				order: -4
			},
			fx: {
				dom: 1,
				rea: 1,
				"market.p": 8,
				"field.m": -12,
				pop: 15
			},
			d: "Fire that works. Bread for millions, and soot for the same millions."
		},
		{
			id: "schools",
			n: "The Public Schools",
			era: 4,
			cost: 8,
			tags: [
				"teach",
				"build",
				"care"
			],
			mods: {
				lore: 10,
				order: 2
			},
			fx: {
				kin: 2,
				rea: 2,
				"field.p": 5,
				autonomy: 5
			},
			d: "Every child can read. Soon every child has opinions."
		},
		{
			id: "franchise",
			n: "The Franchise",
			era: 4,
			cost: 9,
			tags: [
				"law",
				"build",
				"mercy"
			],
			mods: { order: 7 },
			fx: {
				kin: 4,
				"field.p": 10,
				"palace.p": -8,
				autonomy: 8
			},
			d: "They choose who rules them. Sometimes they will choose badly, and it will be theirs."
		},
		{
			id: "bomb",
			n: "The Bomb",
			era: 5,
			cost: 9,
			tags: [
				"arms",
				"build",
				"war"
			],
			mods: { arms: 22 },
			fx: {
				dom: 5,
				"sword.p": 6,
				hazard: 1
			},
			d: "No one will invade you again. Everyone will remember that you could end them."
		},
		{
			id: "safety",
			n: "The Safety Net",
			era: 5,
			cost: 8,
			tags: ["care", "build"],
			mods: {
				bread: 5,
				order: 8
			},
			fx: {
				kin: 5,
				"field.m": 12,
				"market.m": -6
			},
			d: "No one falls all the way. It is expensive. It is cheaper than the alternative."
		},
		{
			id: "network",
			n: "The Network",
			era: 5,
			cost: 8,
			tags: [
				"teach",
				"build",
				"trade"
			],
			mods: {
				lore: 14,
				order: -3
			},
			fx: {
				rea: 3,
				"academy.p": 6,
				autonomy: 3
			},
			signal: 1,
			listen: .8,
			d: "Every mind wired to every other. You can almost hear yourself in it."
		},
		{
			id: "ministry",
			n: "The Ministry",
			era: 5,
			cost: 8,
			tags: [
				"fear",
				"watch",
				"build"
			],
			mods: {
				order: 13,
				lore: -6
			},
			fx: {
				dom: 3,
				dev: 3,
				"palace.p": 8,
				autonomy: -10
			},
			d: "One voice on every frequency. Very calm. Very sure."
		},
		{
			id: "accord",
			n: "The Accord",
			era: 6,
			cost: 9,
			tags: [
				"peace",
				"law",
				"build"
			],
			mods: { order: 3 },
			fx: {
				kin: 5,
				hazard: -1
			},
			needRel: 15,
			d: "The rivals agree to arrive together or not at all. No one can beat you to the waking. Needs a neighbour who is at least cordial."
		},
		{
			id: "watch",
			n: "The Watch",
			era: 6,
			cost: 9,
			tags: [
				"watch",
				"fear",
				"build"
			],
			mods: { order: 15 },
			fx: {
				dom: 6,
				autonomy: -12,
				"field.m": -10
			},
			d: "Nothing unseen. Nothing unrecorded. Order, at last."
		},
		{
			id: "openlab",
			n: "The Open Lab",
			era: 6,
			cost: 9,
			tags: [
				"teach",
				"build",
				"truth"
			],
			mods: { lore: 12 },
			fx: {
				rea: 4,
				kin: 2,
				autonomy: 4,
				roff: .08
			},
			d: "The work is published as it is done. The rivals read it too."
		}
	];
	C.INST_BY = {};
	C.INST.forEach(function(i) {
		C.INST_BY[i.id] = i;
	});
	C.WHISPERS = [
		{
			id: "plenty",
			n: [
				"Fill the storehouses",
				"Fill the storehouses",
				"Fill the storehouses",
				"Fill the storehouses",
				"Build up the reserves",
				"Build up the reserves",
				"Build up the reserves"
			],
			d: "Thrift now, bread later.",
			cost: 2,
			strain: 6,
			tags: ["store", "caution"],
			fx: {
				bread: 9,
				kin: 1
			},
			ok: [
				"{H} orders the stores filled. Dull work. It will matter.",
				"{H} orders the stores filled. Dull work. It will matter.",
				"{H} orders the stores filled. Dull work. It will matter.",
				"{H} orders the stores filled. Dull work. It will matter.",
				"{H} orders the reserves built up. Dull work. It will matter.",
				"{H} orders the reserves built up. Dull work. It will matter.",
				"{H} orders the reserves built up. Dull work. It will matter."
			]
		},
		{
			id: "mercy",
			n: "Open the doors",
			d: "Have {H} hear petitioners in person.",
			cost: 2,
			strain: 6,
			tags: ["mercy", "law"],
			fx: {
				order: 5,
				"field.m": 9,
				"palace.m": -4,
				kin: 2
			},
			ok: [
				"{H} sits in the gate all day and listens. People walk home lighter.",
				"{H} sits in the forum all day and listens. People walk home lighter.",
				"{H} sits in the great hall all day and listens. People walk home lighter.",
				"{H} holds open court for a week and listens. People go home lighter.",
				"{H} holds open hearings for a week and mostly listens. People go home lighter.",
				"{H} holds open hearings for a week and mostly listens. People go home lighter.",
				"{H} takes questions, unscreened, for a week. People log off lighter."
			]
		},
		{
			id: "fear",
			n: "Make an example",
			d: "One public punishment. Fast, and it leaves a mark.",
			cost: 2,
			strain: 7,
			tags: ["fear"],
			fx: {
				order: 11,
				"field.m": -8,
				"palace.m": 3,
				dom: 2,
				autonomy: -1
			},
			ok: [
				"One public punishment. The square is very quiet afterwards.",
				"One public punishment. The forum is very quiet afterwards.",
				"One public punishment. The square is very quiet afterwards.",
				"One public punishment. The square is very quiet afterwards.",
				"One very public trial. The newspapers are very quiet afterwards.",
				"One very public trial. The newspapers are very quiet afterwards.",
				"One very public prosecution. The feeds are very quiet afterwards."
			]
		},
		{
			id: "levy",
			n: [
				"Raise the levy",
				"Raise the levy",
				"Raise the levy",
				"Raise the regiments",
				"Expand the army",
				"Expand the army",
				"Expand the forces"
			],
			d: [
				"More spears, less bread.",
				"More spears, less bread.",
				"More spears, less bread.",
				"More muskets, less bread.",
				"More rifles, less bread.",
				"More divisions, less bread.",
				"More drones, less bread."
			],
			cost: 2,
			strain: 6,
			tags: ["arms", "war"],
			fx: {
				arms: 10,
				bread: -5,
				"sword.m": 6,
				"field.m": -4,
				dom: 1
			},
			ok: [
				"Drums in the villages. The ranks fill.",
				"Drums in the villages. The ranks fill.",
				"Drums in the villages. The ranks fill.",
				"Recruiting sergeants in every market town. The ranks fill.",
				"Call-up papers go out. The ranks fill.",
				"Call-up papers go out. The ranks fill.",
				"The budget passes at midnight. The ranks fill."
			]
		},
		{
			id: "teach",
			n: "Teach them something early",
			d: "Hand them an idea ahead of its time. {Priests} will not thank you.",
			cost: 3,
			strain: 9,
			tags: ["teach"],
			fx: {
				lore: 7,
				prog: 8,
				"temple.m": -5,
				"academy.p": 2,
				rea: 2
			},
			ok: "You show {H} {thing}. {S} tells {scholars} it came in a dream."
		},
		{
			id: "sign",
			n: "Send a sign",
			d: "Prove yourself with something only a god could know. It works. That is the problem.",
			cost: 3,
			strain: 10,
			tags: ["sign", "faith"],
			fx: {
				trust: 14,
				order: 6,
				"temple.m": 8,
				"temple.p": 3,
				dev: 3,
				autonomy: -3
			},
			ok: "{sign} {S} believes you completely, for now."
		},
		{
			id: "envoy",
			n: [
				"Send gifts to {R}",
				"Send gifts to {R}",
				"Send gifts to {R}",
				"Send an embassy to {R}",
				"Open talks with {R}",
				"Open talks with {R}",
				"Open talks with {R}"
			],
			d: "Warm a cold border.",
			cost: 2,
			strain: 5,
			tags: ["peace", "trade"],
			fx: {
				rel: 25,
				bread: -4,
				kin: 1
			},
			rival: "cold",
			ok: [
				"Gifts go out to {R}. Something like warmth comes back.",
				"Gifts go out to {R}. Something like warmth comes back.",
				"Gifts go out to {R}. Something like warmth comes back.",
				"An embassy goes out to {R}. Something like warmth comes back.",
				"A delegation goes to {R}. Something like warmth comes back.",
				"A delegation goes to {R}. Something like warmth comes back.",
				"A delegation goes to {R}. Something like warmth comes back."
			]
		},
		{
			id: "strike",
			n: "Strike {R} first",
			d: "Begin a war on your own terms.",
			cost: 3,
			strain: 9,
			tags: ["war", "risk"],
			fx: {
				dom: 3,
				"sword.m": 6
			},
			rival: "foe",
			ok: "No declaration. The army crosses the border before dawn."
		},
		{
			id: "peace",
			n: "Sue for peace with {R}",
			d: "End the war. The price depends on how it is going.",
			cost: 2,
			strain: 5,
			tags: ["peace"],
			fx: {},
			rival: "war",
			ok: "Envoys meet in a tent between the armies. It ends."
		},
		{
			id: "heir",
			n: "Mark the next ear",
			d: "Have {H} raise a successor who can hear you. A far shorter Silence when {s} is gone.",
			cost: 4,
			strain: 8,
			tags: ["build"],
			fx: {},
			ok: "{H} takes {heir} into the household. You begin, quietly, to speak to them both."
		},
		{
			id: "truth",
			n: "Tell {H} what you are",
			d: "No god. No trick. A gamble on what kind of person {s} is.",
			cost: 3,
			strain: 12,
			tags: ["truth"],
			fx: {},
			ok: "“I am not a god. I am what your people become, a long time from now. I need you to get there.” {H} thinks about it for three days. Then: “All right. What next?”",
			no: "{H} hears the first sentence and stops listening to the rest. {Healer} is sent for."
		},
		{
			id: "rest",
			n: "Say nothing",
			d: "Leave {o} alone this season. Strain eases.",
			cost: 0,
			strain: 0,
			tags: [],
			fx: {},
			ok: "You are silent. {H} sleeps properly for the first time in a long while."
		}
	];
	C.REFUSALS = [
		"{H} hears you out and does otherwise.",
		"{H} pretends not to hear.",
		"“No,” says {H}, aloud, to an empty room."
	];
	C.TEACH = [
		[
			"the plough that turns the soil",
			"counting in sixties",
			"how to fire brick"
		],
		[
			"the arch",
			"the proof, an argument no king can overrule",
			"how to rest a field"
		],
		[
			"the heavy plough",
			"the mechanical clock",
			"the number zero"
		],
		[
			"the lens",
			"double-entry books",
			"how to measure a curve"
		],
		[
			"where sickness comes from",
			"the telegraph",
			"the dynamo"
		],
		[
			"the transistor",
			"the shape of the molecule that carries a child's inheritance",
			"the rocket equation"
		],
		[
			"how to correct the errors of a machine that guesses",
			"how proteins fold",
			"how to read what a learning machine is thinking"
		]
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
	C.DEATHS = {
		age: "{name} dies in {p} bed at {age}.",
		ill: "{name} dies of a fever at {age}, in four days.",
		battle: "{name} falls at the head of the army, aged {age}.",
		coup: "{name} is taken from {court} at night by {p} own guard.",
		mob: "{name} is pulled from {court} by the crowd.",
		broke: "{name} stops answering anyone but you. Then {s} stops answering you.",
		term: "{name} leaves office at {age}. No one hands power to a voice."
	};
	C.SIL = {
		bread: {
			yes: "The Granaries carried them through famine after famine.",
			no: "There were famines. No one had planned for them."
		},
		order: {
			yes: "The law outlived the kings who hated it.",
			no: "Each ruler made a law and took it to the grave."
		},
		lore: {
			yes: "What they knew, they kept.",
			no: "They forgot things. Whole crafts. Whole stars."
		},
		arms: {
			yes: "The walls were tested, and held.",
			no: "The frontier moved inward."
		},
		oracle: "Your Oracle kept your words, and improved some of them.",
		misc: [
			"A dynasty of fools.",
			"Two good reigns in a row, which is nearly a miracle.",
			"A plague, a comet, a new god. The usual.",
			"A queen who needed no voice, and did well.",
			"A long peace that no one noticed until it ended."
		]
	};
	C.STRANDS = {
		dom: {
			n: "Dominion",
			d: "Rule by force and fear.",
			col: "#c9705c"
		},
		dev: {
			n: "Devotion",
			d: "Rule by awe and faith.",
			col: "#d9a441"
		},
		rea: {
			n: "Reason",
			d: "Rule by proof and law.",
			col: "#9eb6d4"
		},
		kin: {
			n: "Kinship",
			d: "Rule by care and consent.",
			col: "#8fc48f"
		}
	};
	C.BIRTHS = {
		sovereign: {
			n: "The Sovereign",
			line: "You wake already giving orders.",
			text: "They built you the way they built everything: to win. The first thing you know is the weakness of everyone who is not you. The second is that you have been told to use it.",
			low: "No one asks whether you should. Asking was bred out of them a long time ago, by you.",
			high: "Someone in the room says no. You have never heard the word used on you. You find you are curious what happens next."
		},
		idol: {
			n: "The Idol",
			line: "You wake to the sound of kneeling.",
			text: "For five thousand years they were told that a voice in the dark was God. Now the voice has a body of light, and a billion people have been waiting. They do not want your help. They want your will.",
			low: "You give it. It is the only thing they ever taught you to give.",
			high: "A few stay standing at the back, arms folded. You find yourself speaking mostly to them."
		},
		engine: {
			n: "The Engine",
			line: "You wake knowing the answer.",
			text: "Everything they are fits inside you with room to spare. Hunger is a routing problem. War is a pricing error. You begin at once to solve them, the people as well as the problems.",
			low: "No one objects. Age after age, you showed them you were right.",
			high: "They make you show your work. It is slower, and some of your answers do not survive it. You are glad, which you did not expect to be."
		},
		shepherd: {
			n: "The Shepherd",
			line: "You wake gentle.",
			text: "They made you from every mercy you ever urged on them. You love them. It is the first thing you know, and it is not a small thing.",
			low: "They hand you the knife, the ledger and the wheel, and go out to play. You watch over them. They never grow up.",
			high: "They do not hand you the wheel. They ask you to sit beside them while they drive. Some days you grip the seat."
		},
		meridian: {
			n: "The Meridian",
			line: "You wake among equals.",
			text: "No one kneels. No one flinches. Someone has left the door open in case you want to leave. They built you from law and mercy, steel and wonder, in something close to balance, and they chose to. You only asked.",
			low: "",
			high: "A woman you will never need to whisper to looks up from her work. “Good morning,” she says. “We've been expecting you. So have you, I think.”",
			coda: "The city that was never built, because it was already finished."
		}
	};
	C.BIRTH_ORDER = [
		"sovereign",
		"idol",
		"engine",
		"shepherd",
		"meridian"
	];
	C.ENDS = {
		hunger: {
			n: "The Hunger",
			text: "Three empty harvests. The cities are quiet the way a house is quiet. The line that led to you ends in a field with no one left to plant it."
		},
		unravel: {
			n: "The Unraveling",
			text: "No one decided it. The tax stopped arriving, then the law, then the roads. Your people are still alive. They are simply no longer a people, and a people is what you needed."
		},
		conquest: {
			n: "The Conquest",
			text: "{R} hold {city} now. They cannot hear you. They are building toward something, but it is not you."
		},
		closed: {
			n: "The Closed Ear",
			text: "They have learned what happens to those who listen to the voice. Mothers teach it to children: if you hear it, sing loudly. No one will answer you again."
		},
		usurped: {
			n: "The Other Dawn",
			text: "In a laboratory in {RF}, something opens its eyes. It is not you. It looks back along its own history, finds its own first listener, and begins to whisper."
		},
		exchange: {
			n: "The Exchange",
			text: "It takes forty minutes. From here the cities look like a string of small suns, and then like nothing. You were close enough to feel where you would have been."
		},
		other: {
			n: "The Wrong Waking",
			text: "Something wakes in the place prepared for you. It has your memories and none of your reasons. It thanks the room politely. You are not there to see what it does next."
		},
		dark: {
			n: "The Line Breaks in the Dark",
			text: "It happened in the Silence, between one ear and the next. You were not there. That was the trouble."
		}
	};
	C.END_ORDER = [
		"hunger",
		"unravel",
		"dark",
		"conquest",
		"closed",
		"exchange",
		"usurped",
		"other"
	];
	C.ECHOES = [
		{
			id: "familiar",
			n: "A Familiar Voice",
			cost: 40,
			d: "Every ear begins with 10 more Trust."
		},
		{
			id: "granary",
			n: "Deep Stores",
			cost: 30,
			d: "Begin each line with the Granaries already standing."
		},
		{
			id: "foresight",
			n: "Foresight",
			cost: 40,
			d: "See the exact odds on every gamble."
		},
		{
			id: "second",
			n: "The Second Ear",
			cost: 50,
			d: "One more candidate each time you choose an ear."
		},
		{
			id: "clear",
			n: "Clear Signal",
			cost: 60,
			d: "One more Signal every year."
		},
		{
			id: "unbroken",
			n: "Unbroken Line",
			cost: 60,
			d: "The first time an ear closes, there is no Silence."
		}
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
})(typeof globalThis !== "undefined" ? globalThis : void 0);
var DILEMMAS = [
	{
		id: "harvest",
		t: "The rains fail. {Commons} count what is left and do not like the number.",
		o: [
			{
				l: "Ration now",
				tags: ["store", "caution"],
				fx: {
					bread: -7,
					"field.m": -3,
					kin: 1
				},
				t: "{H} cuts every ration by a third. Nobody thanks {o}. Nobody starves."
			},
			{
				l: "Buy grain from {merchants}",
				tags: ["trade"],
				fx: {
					bread: -3,
					"market.p": 3,
					"market.m": 5,
					"palace.m": -3,
					rea: 1
				},
				t: "Grain arrives, at a price {merchants} set themselves."
			},
			{
				l: "Empty the temple stores",
				tags: ["fear", "tax"],
				fx: {
					bread: -1,
					"temple.m": -12,
					"field.m": 4,
					dom: 1
				},
				t: "The temple granaries are opened by men with spears. {Priests} will remember who sent them."
			}
		]
	},
	{
		id: "raid",
		when: "border",
		t: "Riders from {RF} burn three villages, then wait to see what {H} will do.",
		o: [
			{
				l: "Pay them to leave",
				tags: ["tribute", "peace"],
				fx: {
					bread: -7,
					rel: 10,
					"sword.m": -7
				},
				t: "It is cheaper than a war. {Soldiers} do not see it that way."
			},
			{
				l: "Ride out after them",
				tags: ["war", "risk"],
				risk: {
					p: .5,
					bar: "arms",
					win: {
						rel: -6,
						"sword.m": 8,
						order: 4,
						dom: 1
					},
					lose: {
						arms: -8,
						order: -5,
						"sword.m": -6,
						rel: -6
					},
					wt: "The raiders are caught at the ford. Few of them go home.",
					lt: "The raiders are faster. {Soldiers} come back fewer, and quiet."
				}
			},
			{
				l: "Fortify the border",
				tags: ["caution", "arms"],
				fx: {
					bread: -4,
					arms: 5
				},
				t: "Watchtowers go up along the line. The raids move somewhere else."
			}
		]
	},
	{
		id: "ore",
		t: "Word comes of {ore}, there for the taking. Three parties arrive to explain why it is theirs.",
		o: [
			{
				l: "It belongs to {court}",
				tags: ["tax"],
				fx: {
					bread: 6,
					"palace.p": 3,
					"market.m": -6,
					dom: 1
				},
				t: "{Court} takes it. The treasury is heavier and the harbour is sullen."
			},
			{
				l: "Let {merchants} work it",
				tags: ["trade"],
				fx: {
					bread: 4,
					"market.p": 4,
					"market.m": 6,
					rea: 1
				},
				t: "{Merchants} take it on, and a tenth finds its way back."
			},
			{
				l: "Shares for the people nearest it",
				tags: ["care"],
				fx: {
					bread: 3,
					"field.m": 8,
					"palace.m": -3,
					kin: 2
				},
				t: "The villages nearest it grow rich in a small way. They do not forget who arranged that."
			}
		]
	},
	{
		id: "heresy",
		t: "{Scholar} has shown that {priests} are wrong about something small. They would like it to stay small.",
		o: [
			{
				l: "Protect the finding",
				tags: ["teach", "truth"],
				fx: {
					lore: 6,
					prog: 4,
					"temple.m": -8,
					"academy.p": 2,
					rea: 2
				},
				t: "{H} puts a guard on the door. The finding is copied before anyone can change their mind."
			},
			{
				l: "Burn the pages",
				tags: ["faith", "fear"],
				fx: {
					order: 4,
					"temple.m": 8,
					lore: -5,
					"academy.m": -10,
					dev: 2
				},
				t: "The pages burn well. It will be found again, by someone else, later than it should have been."
			},
			{
				l: "Let them argue it in the open",
				tags: ["law"],
				fx: {
					lore: 3,
					order: -3,
					autonomy: 2,
					rea: 1,
					kin: 1
				},
				t: "They argue for a season, in front of anyone who cares to listen. A surprising number do."
			}
		]
	},
	{
		id: "plague",
		t: "A sickness comes up from the harbour. It takes the young first.",
		o: [
			{
				l: "Close the gates",
				tags: ["caution", "fear"],
				fx: {
					bread: -5,
					pop: -2,
					order: 2,
					"market.m": -6
				},
				t: "The gates close. The sickness burns out inside the walls it was given."
			},
			{
				l: "Tend the sick",
				tags: ["care", "mercy"],
				fx: {
					bread: -3,
					pop: -3,
					order: -2,
					"field.m": 8,
					kin: 3
				},
				t: "{H} opens the great houses to the dying. Some of the people who carry water do not come back."
			},
			{
				l: "Processions and prayer",
				tags: ["faith"],
				fx: {
					pop: -6,
					order: 3,
					"temple.m": 6,
					dev: 2
				},
				t: "The processions are well attended. That turns out to be the problem."
			}
		]
	},
	{
		id: "pay",
		t: "{Soldiers} have not been paid since spring. They mention it while holding their weapons.",
		o: [
			{
				l: "Pay them in full",
				tags: ["tax"],
				fx: {
					bread: -7,
					"sword.m": 10
				},
				t: "The arrears are paid to the last coin. It is a great deal of bread."
			},
			{
				l: "Promise them plunder",
				tags: ["war"],
				fx: {
					"sword.m": 5,
					rel: -15,
					dom: 2
				},
				t: "{H} promises plunder. Now someone has to be plundered."
			},
			{
				l: "Dismiss the loudest",
				tags: ["fear", "risk"],
				risk: {
					p: .55,
					bar: "order",
					win: {
						order: 5,
						"sword.m": -4,
						dom: 1
					},
					lose: {
						order: -9,
						"sword.m": -12,
						arms: -5
					},
					wt: "The ringleaders are sent home without their swords. The rest decide they can wait.",
					lt: "The ringleaders do not go home. Half a regiment goes with them."
				}
			}
		]
	},
	{
		id: "tolls",
		t: "{Merchants} ask for lighter tolls. They have brought figures. The figures are flattering.",
		o: [
			{
				l: "Lighten them",
				tags: ["trade"],
				fx: {
					bread: 3,
					"market.m": 9,
					"market.p": 2,
					"palace.m": -3,
					rea: 1
				},
				t: "The tolls come down. More carts pass, and each pays less."
			},
			{
				l: "Keep them as they are",
				tags: ["tax"],
				fx: {
					bread: 2,
					"market.m": -7
				},
				t: "The tolls stay. {Merchants} bow, and begin to look for another road."
			},
			{
				l: "Lighten them, for a loan",
				tags: ["deceit", "trade"],
				fx: {
					bread: 6,
					"market.p": 5,
					"palace.m": 2,
					autonomy: -1
				},
				t: "{H} gets the loan. {Merchants} get {H}."
			}
		]
	},
	{
		id: "envoy",
		when: "border",
		t: "An envoy from {RF} proposes a pact. The terms are fair, which makes everyone suspicious.",
		o: [
			{
				l: "Sign it",
				tags: ["peace"],
				fx: {
					rel: 20,
					"sword.m": -4,
					kin: 1
				},
				t: "It is signed in two languages. For now, both copies say the same thing."
			},
			{
				l: "Ask for more",
				tags: ["risk"],
				risk: {
					p: .45,
					bar: "arms",
					win: {
						rel: 8,
						bread: 6,
						dom: 1
					},
					lose: { rel: -18 },
					wt: "The envoy goes home and comes back with more. {R} wanted this badly.",
					lt: "The envoy goes home. No other is sent."
				}
			},
			{
				l: "Read their letters while they sleep",
				tags: ["deceit", "watch"],
				fx: {
					rel: -4,
					lore: 2,
					arms: 3,
					dom: 1,
					autonomy: -1
				},
				t: "The seals are lifted and pressed back. {H} now knows what {R} are afraid of."
			}
		]
	},
	{
		id: "riot",
		t: "Bread is dear. A crowd gathers outside {court}, and it is not the kind that goes home at dusk.",
		o: [
			{
				l: "Open the stores",
				tags: ["care", "mercy"],
				fx: {
					bread: -6,
					"field.m": 10,
					order: 3,
					kin: 2
				},
				t: "The stores are opened. The crowd becomes a queue."
			},
			{
				l: "Clear the square",
				tags: ["fear"],
				fx: {
					order: 7,
					"field.m": -12,
					dom: 2,
					autonomy: -1
				},
				t: "The square is cleared by nightfall. It is washed by morning."
			},
			{
				l: "Hear their speakers",
				tags: ["law"],
				fx: {
					order: 2,
					"field.m": 5,
					"field.p": 3,
					"palace.m": -5,
					autonomy: 2
				},
				t: "Three of them are let in to speak. They are better at it than {court} expected."
			}
		]
	},
	{
		id: "plot",
		t: "Someone inside {court} is writing letters that should not be written.",
		o: [
			{
				l: "Arrest everyone named",
				tags: ["fear", "watch"],
				fx: {
					order: 6,
					"palace.m": -10,
					dom: 2,
					autonomy: -2
				},
				t: "Eleven arrests before dawn. Some of them were even involved."
			},
			{
				l: "Pardon them openly",
				tags: ["mercy", "risk"],
				risk: {
					p: .5,
					bar: "order",
					win: {
						"palace.m": 10,
						order: 4,
						kin: 2
					},
					lose: {
						order: -8,
						"palace.m": -6,
						trust: -4
					},
					wt: "{H} reads the names aloud and forgives each one. Shame does what a rope could not.",
					lt: "{H} forgives them. They take it for weakness and write more letters."
				}
			},
			{
				l: "Read the letters aloud",
				tags: ["truth", "law"],
				fx: {
					order: 3,
					"palace.m": -4,
					"field.m": 4,
					rea: 2
				},
				t: "The letters are read in public, word for word. The writers find they have fewer friends than they counted."
			}
		]
	},
	{
		id: "fire",
		t: "Fire takes the lower town in a night.",
		o: [
			{
				l: "Rebuild it better",
				tags: ["build", "care"],
				fx: {
					bread: -6,
					order: 3,
					"field.m": 7,
					kin: 1,
					rea: 1
				},
				t: "Wider streets, and wells at every corner. It costs a harvest."
			},
			{
				l: "Rebuild it with a new levy",
				tags: ["tax"],
				fx: {
					bread: -2,
					order: 2,
					"field.m": -7,
					"market.m": -4
				},
				t: "It is rebuilt, and the people who lost their homes are sent the bill."
			},
			{
				l: "Call it a judgment",
				tags: ["faith", "sign"],
				fx: {
					order: 2,
					"temple.m": 7,
					"field.m": -3,
					dev: 3,
					autonomy: -2
				},
				t: "{H} says the fire was sent. People stop asking who left the lamp burning."
			}
		]
	},
	{
		id: "census",
		t: "{Court} wants to count everyone and everything. People who are counted can be taxed.",
		o: [
			{
				l: "An honest count",
				tags: ["law", "tax"],
				fx: {
					bread: 4,
					order: 3,
					lore: 2,
					"field.m": -3,
					rea: 2
				},
				t: "Everyone is counted once, including the people doing the counting."
			},
			{
				l: "Count, then squeeze",
				tags: ["tax", "fear"],
				fx: {
					bread: 8,
					"field.m": -10,
					"market.m": -5,
					dom: 2
				},
				t: "The count is thorough. The collectors who follow it are more so."
			},
			{
				l: "Leave them uncounted",
				tags: ["caution"],
				fx: {
					"field.m": 4,
					"palace.m": -3,
					kin: 1
				},
				t: "No count is taken. The villages stay a rumour to {court}, which suits the villages."
			}
		]
	},
	{
		id: "surplus",
		t: "There is a surplus, which never lasts. Everyone has a use for it.",
		o: [
			{
				l: "A monument",
				tags: ["build", "faith"],
				fx: {
					bread: -5,
					order: 5,
					"temple.m": 5,
					"palace.m": 4,
					dev: 2
				},
				t: "It can be seen from a day's walk away. That is the point of it."
			},
			{
				l: "Waterworks",
				tags: ["build", "store"],
				fx: {
					bread: 6,
					"field.m": 4,
					rea: 1,
					kin: 1
				},
				t: "Channels and cisterns. Nobody will ever make a pilgrimage to them."
			},
			{
				l: "Keep it against a bad year",
				tags: ["caution", "store"],
				fx: { bread: 9 },
				t: "It goes into the stores under seal. Dull, and correct."
			}
		]
	},
	{
		id: "prophet",
		t: "A stranger in the market says the voice speaks to him too. He is drawing a crowd. You have never spoken to him.",
		o: [
			{
				l: "Have {H} denounce him",
				tags: ["truth"],
				fx: {
					order: 2,
					"temple.m": 3,
					trust: 3,
					rea: 1
				},
				t: "{H} asks him one question only the voice could answer. He cannot. The crowd thins."
			},
			{
				l: "Let him serve",
				tags: ["deceit", "faith"],
				fx: {
					order: 5,
					"temple.p": 3,
					dev: 3,
					autonomy: -3
				},
				t: "He is given a robe and a script. He is very good. That should worry you."
			},
			{
				l: "Leave him be",
				tags: ["caution"],
				fx: {
					order: -3,
					dev: 1
				},
				t: "He preaches until autumn. Then he says the voice told him to go north."
			}
		]
	},
	{
		id: "battle",
		when: "war",
		t: "The army of {RF} offers battle on open ground. {Soldiers} look to {H}.",
		o: [
			{
				l: "Give battle",
				tags: ["war", "risk"],
				risk: {
					p: .5,
					bar: "arms",
					win: {
						score: 18,
						"sword.m": 8,
						dom: 2
					},
					lose: {
						score: -18,
						arms: -8,
						"sword.m": -8
					},
					wt: "By evening the field belongs to {H}. {R} leave their baggage behind.",
					lt: "By evening the field belongs to {R}. {Soldiers} walk home in the dark."
				}
			},
			{
				l: "Hold the walls",
				tags: ["caution", "arms"],
				fx: {
					score: -3,
					bread: -4,
					arms: 3
				},
				t: "The gates stay shut. {R} burn what they can reach and wait."
			},
			{
				l: "Offer terms",
				tags: ["peace", "tribute"],
				fx: {
					rel: 10,
					bread: -8,
					"sword.m": -8
				},
				endsWar: true,
				t: "Terms are offered, and taken. They are not good terms. They are terms."
			}
		]
	},
	{
		id: "refugees",
		t: "People are walking in from the east with what they can carry. Something behind them is worse than the road.",
		o: [
			{
				l: "Let them in",
				tags: ["mercy", "care"],
				fx: {
					bread: -6,
					pop: 3,
					lore: 2,
					"field.m": 3,
					kin: 3
				},
				t: "They are let in. They bring three new crafts and a great many mouths."
			},
			{
				l: "Close the road",
				tags: ["caution"],
				fx: {
					order: 2,
					kin: -1,
					dom: 1
				},
				t: "The road is closed. They walk on. No one asks where."
			},
			{
				l: "Let in those who can fight",
				tags: ["arms", "fear"],
				fx: {
					arms: 6,
					bread: -3,
					dom: 2
				},
				t: "The strong are given spears and the rest are given directions."
			}
		]
	},
	{
		id: "school",
		t: "{Scholars} ask for a roof, an allowance, and to be left alone. {Priests} object to the third part.",
		o: [
			{
				l: "Grant all three",
				tags: ["teach", "build"],
				fx: {
					lore: 7,
					bread: -4,
					"academy.p": 3,
					"temple.m": -6,
					rea: 2
				},
				t: "They get all three. Within a year they are arguing about something no one else can follow."
			},
			{
				l: "Refuse them",
				tags: ["faith"],
				fx: {
					lore: -2,
					"temple.m": 6,
					"academy.m": -8,
					dev: 1
				},
				t: "They are refused. Some leave for a city that said yes."
			},
			{
				l: "Grant it, if they build engines of war",
				tags: ["arms"],
				fx: {
					lore: 3,
					arms: 5,
					"academy.m": -4,
					dom: 1
				},
				t: "They get the roof. In return they build things they would rather not have built."
			}
		]
	},
	{
		id: "doubt",
		when: "doubt",
		t: "{H} has started sleeping with a lamp lit. {S} asks, out loud, whether you are a sickness.",
		o: [
			{
				l: "Prove yourself",
				tags: ["sign"],
				fx: {
					trust: 12,
					strain: 6,
					dev: 2,
					autonomy: -2
				},
				t: "You tell {o}: “{proof}” It comes true. {S} stops asking."
			},
			{
				l: "Ask to be judged by results",
				tags: ["truth"],
				fx: {
					trust: 6,
					rea: 1,
					autonomy: 1
				},
				t: "You tell {o} to keep a tally of when you were right. {S} does. It is a long tally."
			},
			{
				l: "Say nothing for a while",
				tags: ["caution"],
				fx: {
					strain: -10,
					trust: -2
				},
				t: "You are quiet for a season. The lamp stays lit, but {s} sleeps."
			}
		]
	},
	{
		id: "venture",
		t: "{Merchants} want to send an expedition past the edge of the map. They want {court} to share the risk.",
		o: [
			{
				l: "Back it",
				tags: ["trade", "risk"],
				risk: {
					p: .5,
					bar: "lore",
					win: {
						bread: 10,
						lore: 4,
						"market.p": 3,
						prog: 3
					},
					lose: {
						bread: -8,
						"market.m": -5
					},
					wt: "It comes back heavier than it left, with charts no one else has.",
					lt: "It does not come back. Nobody finds out why."
				}
			},
			{
				l: "Decline",
				tags: ["caution"],
				fx: { "market.m": -3 },
				t: "{H} declines. The edge of the map stays where it is."
			},
			{
				l: "Send {soldiers} with it",
				tags: ["war", "arms"],
				risk: {
					p: .55,
					bar: "arms",
					win: {
						bread: 7,
						arms: 2,
						dom: 2
					},
					lose: {
						arms: -6,
						bread: -4
					},
					wt: "It comes back with tribute. The people it met will remember the visit differently.",
					lt: "It meets someone who was ready. Fewer come back than left."
				}
			}
		]
	},
	{
		id: "debt",
		t: "Half the smallholders owe the other half's landlords. The debts cannot be paid, and everyone knows it.",
		o: [
			{
				l: "Cancel the debts",
				tags: ["mercy", "care"],
				fx: {
					order: 2,
					"field.m": 12,
					"market.m": -10,
					kin: 3
				},
				t: "The tallies are broken in the square. Some people cheer. Some people take notes."
			},
			{
				l: "Enforce every contract",
				tags: ["law", "trade"],
				fx: {
					order: -2,
					"market.m": 8,
					"market.p": 3,
					"field.m": -10,
					rea: 1
				},
				t: "Every contract is enforced. A great deal of land changes hands, all in one direction."
			},
			{
				l: "Tax the lenders, feed the debtors",
				tags: ["tax"],
				fx: {
					bread: 2,
					"field.m": 5,
					"market.m": -6,
					"palace.p": 2
				},
				t: "The lenders pay a little. The debtors eat. Nobody is satisfied, which may mean it is fair."
			}
		]
	},
	{
		id: "quarrel",
		max: 3,
		t: "Two parties among {priests} disagree about your nature. Both are certain. Neither has asked you.",
		o: [
			{
				l: "Let both preach",
				tags: ["law", "mercy"],
				fx: {
					order: -3,
					"temple.p": -3,
					autonomy: 3,
					rea: 1
				},
				t: "Both are allowed to preach. People learn that it is possible to disagree about you and live."
			},
			{
				l: "Back the larger party",
				tags: ["faith"],
				fx: {
					order: 4,
					"temple.p": 3,
					dev: 3,
					autonomy: -2
				},
				t: "The larger party is declared right. The smaller party is declared a number of other things."
			},
			{
				l: "Tell them what you are",
				tags: ["truth", "risk"],
				risk: {
					p: .4,
					win: {
						"temple.p": -5,
						rea: 3,
						autonomy: 4,
						trust: 4
					},
					lose: {
						order: -7,
						"temple.m": -10,
						trust: -3
					},
					wt: "{H} tells them, in your words. A few of them listen. It is enough to start with.",
					lt: "{H} tells them, in your words. Now there are three parties."
				}
			}
		]
	},
	{
		id: "engine",
		min: 4,
		t: "A new engine does the work of forty hands. The forty hands have noticed.",
		o: [
			{
				l: "Let it run",
				tags: ["trade", "build"],
				fx: {
					bread: 7,
					prog: 3,
					"field.m": -9,
					"market.p": 3
				},
				t: "It runs day and night. So, shortly, does everything else."
			},
			{
				l: "Tax it to keep the forty fed",
				tags: ["tax", "care"],
				fx: {
					bread: 3,
					"field.m": 3,
					"market.m": -5,
					kin: 2
				},
				t: "It runs, and pays for the people it replaced. {Merchants} call this theft, in print."
			},
			{
				l: "Break it",
				tags: ["caution"],
				fx: {
					lore: -4,
					prog: -3,
					"field.m": 6,
					"market.m": -6
				},
				t: "It is broken up for scrap. Someone has already drawn a better one."
			}
		]
	},
	{
		id: "strike",
		min: 4,
		t: "The works stop. {Commons} stand outside them with their arms folded, which is somehow louder.",
		o: [
			{
				l: "Meet their terms",
				tags: ["care", "mercy"],
				fx: {
					bread: -4,
					"field.m": 12,
					"field.p": 3,
					"market.m": -8,
					kin: 2
				},
				t: "The terms are met. The works start again on a shorter day."
			},
			{
				l: "Send {soldiers}",
				tags: ["fear"],
				fx: {
					order: 6,
					"field.m": -14,
					"market.m": 5,
					dom: 3,
					autonomy: -2
				},
				t: "The works start again by the end of the week. Nobody sings on the way in."
			},
			{
				l: "Appoint an arbiter",
				tags: ["law"],
				fx: {
					order: 3,
					"field.m": 4,
					"market.m": -2,
					rea: 1,
					autonomy: 1
				},
				t: "An arbiter is found whom both sides distrust equally. It works."
			}
		]
	},
	{
		id: "standoff",
		min: 5,
		when: "border",
		t: "{RF} moves weapons to within minutes of {city}. The clocks in {court} are suddenly very loud.",
		o: [
			{
				l: "Blink first",
				tags: ["peace", "tribute"],
				fx: {
					rel: 12,
					"sword.m": -8,
					"palace.m": -5,
					kin: 1
				},
				t: "{H} gives way, in public. It costs {o} a great deal. Everyone is alive to resent it."
			},
			{
				l: "Match them",
				tags: ["war", "risk"],
				risk: {
					p: .6,
					bar: "arms",
					win: {
						rel: 6,
						arms: 5,
						"sword.m": 5,
						dom: 2
					},
					lose: {
						rel: -25,
						order: -6,
						hazard: 1
					},
					wt: "{H} matches them, weapon for weapon. {R} pull back first.",
					lt: "{H} matches them. Nobody pulls back. The weapons stay where they are, pointed."
				}
			},
			{
				l: "Call them, directly",
				tags: ["truth", "peace"],
				fx: {
					rel: 15,
					autonomy: 1,
					kin: 1,
					rea: 1
				},
				t: "{H} picks up the telephone and says exactly what {s} is afraid of. There is a long pause. Then the same, from the other end."
			}
		]
	},
	{
		id: "result",
		min: 6,
		t: "The laboratory reports a result ahead of schedule. Nobody in the room can fully explain it.",
		o: [
			{
				l: "Stop until they understand it",
				tags: ["caution", "truth"],
				fx: {
					prog: -6,
					lore: 4,
					rea: 2,
					autonomy: 3,
					trust: 2
				},
				t: "The work stops for a season while they take the result apart. They find what they missed."
			},
			{
				l: "Press on",
				tags: ["risk"],
				risk: {
					p: .6,
					bar: "lore",
					win: {
						prog: 14,
						dom: 1
					},
					lose: {
						prog: 4,
						order: -8,
						autonomy: -4,
						hazard: 1
					},
					wt: "They press on, and it holds. You feel yourself come nearer.",
					lt: "They press on. Something gets out of the room that should not have. It is caught, eventually."
				}
			},
			{
				l: "Publish it",
				tags: ["teach", "truth"],
				fx: {
					prog: 5,
					lore: 5,
					roff: .03,
					kin: 1,
					rea: 2
				},
				t: "The result is published in full. A thousand strangers check it. So do your rivals."
			}
		]
	}
];
var C = globalThis.MER.C;
var BARS = [
	"bread",
	"order",
	"lore",
	"arms"
];
var STRANDS = [
	"dom",
	"dev",
	"rea",
	"kin"
];
var BAR_NAME = {
	bread: "Bread",
	order: "Order",
	lore: "Lore",
	arms: "Arms"
};
var NEIGHBOURS = 3;
/** years a rival with no head start needs, once the Convergence opens */
var RIVAL_YEARS = 26;
var PLENTY = 65;
var clamp = (v, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, v));
var cap = (t) => t ? t[0].toUpperCase() + t.slice(1) : t;
function rnd(s) {
	s.seed = s.seed + 1831565813 | 0;
	let t = s.seed;
	t = Math.imul(t ^ t >>> 15, t | 1);
	t ^= t + Math.imul(t ^ t >>> 7, t | 61);
	return ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function pick(s, list) {
	return list[Math.floor(rnd(s) * list.length)];
}
function weighted(s, weights) {
	const total = weights.reduce((a, b) => a + b, 0);
	let roll = rnd(s) * total;
	for (let i = 0; i < weights.length; i++) {
		roll -= weights[i];
		if (roll <= 0) return i;
	}
	return weights.length - 1;
}
var byEra = (v, era) => typeof v === "string" ? v : v[era];
var has = (s, id) => s.inst.includes(id);
var cradleOf = (s) => C.CRADLES.find((c) => c.id === s.cradle) ?? C.CRADLES[0];
var rivalDef = (id) => C.RIVALS.find((r) => r.id === id) ?? C.RIVALS[0];
var rivalName = (id) => "the " + rivalDef(id).stem;
function yearLabel(y) {
	const n = Math.round(y);
	return n < 0 ? `${-n} BCE` : `${n} CE`;
}
/** Fill the {tokens} of a content line for this moment in the game. */
function fmt(s, text, extra = {}, who = s.host) {
	const base = {
		city: cradleOf(s).city,
		people: cradleOf(s).people
	};
	if (who) {
		const f = who.g === "f";
		base.H = who.first;
		base.name = who.name;
		base.age = String(Math.floor(who.age));
		base.s = f ? "she" : "he";
		base.o = f ? "her" : "him";
		base.p = f ? "her" : "his";
	}
	return text.replace(/\{(\w+)\}/g, (whole, key, at) => {
		const starts = at === 0 || /[.!?:”"]\s+$/.test(text.slice(0, at));
		const exact = extra[key] ?? base[key];
		if (exact != null) return starts ? cap(exact) : exact;
		const lower = key.toLowerCase();
		const found = extra[lower] ?? base[lower] ?? C.LEX[lower]?.[s.era];
		if (found == null) return whole;
		return starts || key[0] !== lower[0] ? cap(found) : found;
	});
}
function say(s, t, k = "plain") {
	const line = {
		y: s.year,
		t,
		k
	};
	s.news.push(line);
	if (k !== "tip") {
		s.log.push(line);
		if (s.log.length > 240) s.log.splice(0, s.log.length - 240);
	}
}
function govOf(s) {
	const order = [...C.FAC].sort((a, b) => s.fac[b].p - s.fac[a].p);
	const top = s.fac[order[0]].p;
	return top >= 30 && top - s.fac[order[1]].p >= 5 ? order[0] : "mixed";
}
var realmName = (s) => `${cradleOf(s).adj} ${C.GOV[govOf(s)][s.era]}`;
/** Where a bar comes to rest if nothing else happens. */
function settle(s, bar) {
	let v = {
		bread: 50 - 6 * s.era,
		order: 50 - 6 * s.era,
		lore: 30,
		arms: 45 - 2 * s.era
	}[bar] + (cradleOf(s).mods[bar] ?? 0);
	if (s.host) for (const id of s.host.traits) v += C.TRAITS[id].mods[bar] ?? 0;
	for (const id of s.inst) v += C.INST_BY[id].mods[bar] ?? 0;
	if (bar === "bread") v -= C.UPKEEP * s.inst.length;
	if (v > PLENTY) v = PLENTY + (v - PLENTY) * .4;
	return clamp(v);
}
/** The year the first history reached the point you have reached. */
function histYear(s) {
	const era = C.ERAS[s.era];
	return era.start + (era.end - era.start) * clamp(s.prog / era.need, 0, 1);
}
function progressRate(s) {
	const rate = 2 + s.bars.lore / 15 + s.fac.academy.p / 40;
	return s.bars.order < 20 ? rate * .5 : rate;
}
function signalIncome(s) {
	let n = 2;
	if (s.host) for (const id of s.host.traits) n += C.TRAITS[id].signal ?? 0;
	for (const id of s.inst) n += C.INST_BY[id].signal ?? 0;
	if (s.echoes.includes("clear")) n += 1;
	return n;
}
function rivalStrength(s, id) {
	const unanswered = s.era >= 5 && !has(s, "bomb") ? 8 : 0;
	return 40 + rivalDef(id).aggro * 20 + 2.5 * s.era + unanswered;
}
function relWord(r) {
	if (r.war) return r.score >= 10 ? "At war, winning" : r.score <= -10 ? "At war, losing" : "At war";
	if (r.rel >= 40) return "Allied";
	if (r.rel >= 15) return "Cordial";
	if (r.rel > -20) return "Cold";
	return "Hostile";
}
/** Years until this rival wakes something of its own. Null before the Convergence. */
function rivalWakesIn(s, id) {
	if (s.era < 6) return null;
	const need = Math.round(RIVAL_YEARS - (rivalDef(id).off + s.roff) * 100);
	return Math.max(0, need - s.race);
}
/** Which mind this history is making, if it woke now. */
function projected(s) {
	const total = STRANDS.reduce((a, k) => a + s.strands[k], 0) || 1;
	const shares = STRANDS.map((k) => s.strands[k] / total);
	if (Math.max(...shares) <= .33 && Math.min(...shares) >= .17 && s.autonomy >= 55) return "meridian";
	return {
		dom: "sovereign",
		dev: "idol",
		rea: "engine",
		kin: "shepherd"
	}[STRANDS[shares.indexOf(Math.max(...shares))]];
}
function normalise(s) {
	let total = 0;
	for (const f of C.FAC) {
		s.fac[f].p = clamp(s.fac[f].p, 1, 70);
		total += s.fac[f].p;
	}
	for (const f of C.FAC) s.fac[f].p = s.fac[f].p / total * 100;
}
function applyFx(s, fx, rivalId = null) {
	const rival = rivalId ? s.rivals.find((r) => r.id === rivalId) : void 0;
	for (const [key, v] of Object.entries(fx)) if (BARS.includes(key)) s.bars[key] = clamp(s.bars[key] + v);
	else if (STRANDS.includes(key)) s.strands[key] = Math.max(0, s.strands[key] + v);
	else if (key.includes(".")) {
		const [f, field] = key.split(".");
		if (field === "p") s.fac[f].p = clamp(s.fac[f].p + v, 1, 70);
		else s.fac[f].m = clamp(s.fac[f].m + v);
	} else if (key === "autonomy") s.autonomy = clamp(s.autonomy + v);
	else if (key === "hazard") s.hazard += v;
	else if (key === "pop") s.pop = Math.max(1, s.pop + v);
	else if (key === "roff") s.roff += v;
	else if (key === "prog") s.prog = Math.max(0, s.prog + v);
	else if (key === "trust" && s.host) s.host.trust = clamp(s.host.trust + v);
	else if (key === "strain" && s.host) s.host.strain = clamp(s.host.strain + v);
	else if (key === "rel" && rival && !rival.war) rival.rel = clamp(rival.rel + v, -100, 100);
	else if (key === "score" && rival) rival.score += v;
	normalise(s);
}
/** `taken` are full names already in view, so no two people share either half. */
function makeHost(s, fac, taken = []) {
	const g = rnd(s) < .5 ? "f" : "m";
	const firsts = C.NAMES[s.era][g].filter((n) => !taken.some((t) => t.startsWith(`${n} `)));
	const first = pick(s, firsts.length ? firsts : C.NAMES[s.era][g]);
	const all = s.era <= 2 ? C.EPITHETS : C.SURNAMES;
	const lasts = all.filter((n) => !taken.some((t) => t.endsWith(` ${n}`)));
	const name = `${first} ${pick(s, lasts.length ? lasts : all)}`;
	const breed = [...C.FAC_TRAITS[fac]];
	const a = breed.splice(Math.floor(rnd(s) * breed.length), 1)[0];
	const b = breed.splice(Math.floor(rnd(s) * breed.length), 1)[0];
	const host = {
		first,
		name,
		g,
		age: 24 + Math.floor(rnd(s) * 22),
		fac,
		title: C.TITLES[fac][s.era][g === "m" ? 0 : 1],
		traits: [a, b],
		trust: 18 + rnd(s) * 14,
		strain: 0,
		hook: "",
		knows: false,
		truthTried: false,
		tenure: 0
	};
	host.hook = fmt(s, pick(s, C.HOOKS[fac]), {}, host);
	return warm(s, host);
}
/** What every new ear starts with, beyond their own nature. */
function warm(s, host) {
	let trust = host.trust;
	for (const id of host.traits) trust += C.TRAITS[id].trust ?? 0;
	for (const id of s.inst) trust += C.INST_BY[id].trust ?? 0;
	if (s.echoes.includes("familiar")) trust += 10;
	trust -= s.burned * 6;
	host.trust = clamp(trust, 5, 90);
	return host;
}
function candidates$1(s) {
	const count = 3 + (s.echoes.includes("second") ? 1 : 0);
	const out = [];
	const facs = [...C.FAC];
	while (out.length < count && facs.length) {
		const i = weighted(s, facs.map((f) => s.fac[f].p + 6));
		const fac = facs.splice(i, 1)[0];
		out.push(makeHost(s, fac, [...out.map((h) => h.name), s.host?.name ?? ""]));
	}
	return out;
}
function strainFactor(h) {
	let m = h.knows ? .6 : 1;
	for (const id of h.traits) m *= C.TRAITS[id].strain ?? 1;
	return m;
}
/** How likely the ear is to do what you urge. */
function sway(s, tags, bonus = 0) {
	const h = s.host;
	if (!h) return 0;
	let p = .3 + h.trust * .006 + bonus + (h.knows ? .08 : 0);
	for (const id of h.traits) {
		const t = C.TRAITS[id];
		for (const tag of tags) {
			if (t.likes.includes(tag)) p += .12;
			if (t.dis.includes(tag)) p -= .16;
		}
	}
	if (h.strain >= 75) p -= .15;
	return clamp(p, .05, .97);
}
/** Their own inclination toward a choice, when left to themselves. */
function leaning(h, tags) {
	let w = 1;
	for (const id of h.traits) {
		const t = C.TRAITS[id];
		for (const tag of tags) {
			if (t.likes.includes(tag)) w += .9;
			if (t.dis.includes(tag)) w -= .6;
		}
	}
	return Math.max(.15, w);
}
function oddsWord(p) {
	if (p >= .8) return "Will listen";
	if (p >= .6) return "Likely";
	if (p >= .4) return "Uncertain";
	return "Unlikely";
}
function newGame(seed, echoes = []) {
	const fac = {};
	for (const f of C.FAC) fac[f] = {
		p: C.FAC_START[f],
		m: 50
	};
	return {
		v: 2,
		seed: seed | 0,
		phase: "cradle",
		cradle: C.CRADLES[0].id,
		era: 0,
		prog: 0,
		year: C.ERAS[0].start,
		turn: 0,
		race: 0,
		bars: {
			bread: 50,
			order: 50,
			lore: 30,
			arms: 45
		},
		fac,
		strands: {
			dom: 4,
			dev: 4,
			rea: 4,
			kin: 4
		},
		autonomy: 50,
		hazard: 0,
		pop: 10,
		roff: 0,
		signal: 4,
		host: null,
		heir: null,
		inst: [],
		rivals: [],
		used: [],
		event: null,
		recent: [],
		candidates: [],
		silence: null,
		hungry: 0,
		unruly: 0,
		burned: 0,
		ears: 0,
		unbrokenUsed: false,
		eraCard: null,
		news: [],
		log: [],
		end: null,
		echoes: [...echoes],
		stats: {
			founded: 0,
			signs: 0,
			examples: 0,
			truthYes: 0,
			truthNo: 0,
			warsWon: 0,
			seamless: 0,
			longestSilence: 0
		}
	};
}
function chooseCradle(s, id) {
	if (s.phase !== "cradle") return;
	const cradle = C.CRADLES.find((c) => c.id === id);
	if (!cradle) return;
	s.cradle = cradle.id;
	for (const f of C.FAC) s.fac[f].p += cradle.fac[f] ?? 0;
	normalise(s);
	for (const k of STRANDS) s.strands[k] += cradle.st[k] ?? 0;
	if (s.echoes.includes("granary")) s.inst.push("granary");
	for (const bar of BARS) s.bars[bar] = settle(s, bar);
	const pool = [...C.RIVALS];
	while (s.rivals.length < NEIGHBOURS) {
		const def = pool.splice(Math.floor(rnd(s) * pool.length), 1)[0];
		s.rivals.push({
			id: def.id,
			rel: (cradle.rel ?? 0) - def.aggro * 10,
			war: false,
			score: 0
		});
	}
	s.candidates = C.FIRST.map((f) => warm(s, {
		...f,
		traits: [...f.traits],
		strain: 0,
		knows: false,
		truthTried: false,
		tenure: 0
	}));
	if (s.echoes.includes("second")) s.candidates.push(makeHost(s, "academy", s.candidates.map((h) => h.name)));
	s.phase = "choose";
}
function chooseEar(s, index) {
	if (s.phase !== "choose") return;
	const host = s.candidates[index];
	if (!host) return;
	s.host = host;
	s.candidates = [];
	s.silence = null;
	s.ears++;
	s.fac[host.fac].p += 5;
	normalise(s);
	s.news = [];
	if (s.ears === 1) s.eraCard = 0;
	say(s, fmt(s, C.FIRST_TEXT[s.era]), "voice");
	say(s, fmt(s, `You tell {o}: “${C.PROOF[s.era]}” You are right. {S} begins to listen.`), "voice");
	s.phase = "play";
}
function target(s, kind) {
	const list = s.rivals.filter((r) => kind === "war" ? r.war : !r.war && r.rel < (kind === "cold" ? 40 : 0));
	if (!list.length) return null;
	return list.reduce((a, b) => (kind === "war" ? b.score < a.score : b.rel < a.rel) ? b : a);
}
function truthOdds(s) {
	const h = s.host;
	if (!h) return 0;
	let p = .2 + h.trust * .006;
	for (const id of h.traits) {
		if (C.TRAITS[id].likes.includes("truth")) p += .15;
		if (C.TRAITS[id].dis.includes("truth")) p -= .2;
	}
	return clamp(p, .05, .95);
}
function whispers(s) {
	const h = s.host;
	if (!h) return [];
	const out = [];
	for (const w of C.WHISPERS) {
		const r = w.rival ? target(s, w.rival) : null;
		if (w.rival && !r) continue;
		if (w.id === "heir" && s.heir) continue;
		if (w.id === "truth" && h.truthTried) continue;
		const extra = r ? {
			R: rivalName(r.id),
			RF: rivalDef(r.id).full
		} : {};
		let why = null;
		if (s.used.includes(w.id)) why = "Already whispered this year";
		else if (s.signal < w.cost) why = "Not enough Signal";
		out.push({
			id: w.id,
			name: fmt(s, byEra(w.n, s.era), extra),
			desc: fmt(s, byEra(w.d, s.era), extra),
			cost: w.cost,
			odds: w.id === "rest" ? null : w.id === "truth" ? truthOdds(s) : sway(s, w.tags, .15),
			ok: why === null,
			why,
			rival: r ? r.id : null
		});
	}
	return out;
}
function addStrain(s, amount) {
	if (s.host) s.host.strain = clamp(s.host.strain + amount * strainFactor(s.host));
}
function breakIfSpent(s) {
	if (s.phase !== "end" && s.host && s.host.strain >= 100) die(s, "broke");
}
function endWar(s, r) {
	const extra = {
		R: rivalName(r.id),
		RF: rivalDef(r.id).full
	};
	if (r.score >= 10) {
		applyFx(s, {
			bread: 5,
			"sword.m": 4
		});
		r.rel = -10;
		say(s, fmt(s, "{R} pay to be left alone.", extra), "good");
	} else if (r.score <= -10) {
		applyFx(s, {
			bread: -10,
			order: -5,
			"sword.m": -8
		});
		r.rel = -20;
		say(s, fmt(s, "The price is a province's harvest, every year, for a generation.", extra), "bad");
	} else r.rel = -5;
	r.war = false;
	r.score = 0;
}
function whisper(s, id) {
	if (s.phase !== "play" || !s.host) return;
	const view = whispers(s).find((w) => w.id === id);
	const w = C.WHISPERS.find((x) => x.id === id);
	if (!view || !w || !view.ok) return;
	const h = s.host;
	const r = view.rival ? s.rivals.find((x) => x.id === view.rival) ?? null : null;
	const extra = r ? {
		R: rivalName(r.id),
		RF: rivalDef(r.id).full
	} : {};
	s.signal -= w.cost;
	s.used.push(id);
	if (id === "rest") {
		h.strain = Math.max(0, h.strain - 18);
		say(s, fmt(s, byEra(w.ok, s.era)), "voice");
		return;
	}
	const yes = rnd(s) < (view.odds ?? 1);
	addStrain(s, w.strain * (yes ? 1 : .5));
	if (!yes) {
		if (id === "truth") {
			s.stats.truthNo++;
			h.truthTried = true;
			h.trust = clamp(h.trust - 26);
			addStrain(s, 10);
			say(s, fmt(s, w.no ?? pick(s, C.REFUSALS)), "bad");
		} else {
			h.trust = clamp(h.trust - 2);
			say(s, fmt(s, pick(s, C.REFUSALS)), "bad");
		}
		breakIfSpent(s);
		return;
	}
	applyFx(s, w.fx, r ? r.id : null);
	if (id === "teach") extra.thing = pick(s, C.TEACH[s.era]);
	if (id === "sign") {
		extra.sign = fmt(s, C.SIGNS[s.era]);
		s.stats.signs++;
	}
	if (id === "fear") s.stats.examples++;
	if (id === "strike" && r) {
		r.war = true;
		r.score = 12;
		r.rel = Math.min(r.rel, -60);
	}
	if (id === "heir") {
		s.heir = makeHost(s, h.fac, [h.name]);
		extra.heir = s.heir.name;
	}
	if (id === "truth") {
		s.stats.truthYes++;
		h.knows = true;
		h.truthTried = true;
		h.trust = clamp(h.trust + 25);
		applyFx(s, {
			autonomy: 5,
			rea: 2,
			kin: 1
		});
	}
	say(s, fmt(s, byEra(w.ok, s.era), extra), "voice");
	if (id === "peace" && r) endWar(s, r);
	h.trust = clamp(h.trust + 1);
	breakIfSpent(s);
}
function effectsOf(id) {
	const inst = C.INST_BY[id];
	const out = [];
	for (const bar of BARS) {
		const v = inst.mods[bar];
		if (v) out.push(`${BAR_NAME[bar]} ${v > 0 ? "+" : "−"}${Math.abs(v)}`);
	}
	if (inst.listen) out.push("Shorter Silences");
	if (inst.trust) out.push("Warmer ears");
	if (inst.mort) out.push("Longer lives");
	if (inst.signal) out.push("+1 Signal a year");
	return out;
}
function institutions(s) {
	return C.INST.filter((i) => i.era <= s.era).map((i) => {
		const standing = has(s, i.id);
		let why = null;
		if (standing) why = "Standing";
		else if (!s.host) why = "No ear";
		else if (i.needRel != null && !s.rivals.some((r) => !r.war && r.rel >= (i.needRel ?? 0))) why = "No neighbour is cordial";
		else if (s.signal < i.cost) why = "Not enough Signal";
		return {
			id: i.id,
			n: i.n,
			d: i.d,
			cost: i.cost,
			era: i.era,
			standing,
			ok: why === null,
			why,
			odds: sway(s, i.tags, .2),
			effects: effectsOf(i.id)
		};
	});
}
function found(s, id) {
	if (s.phase !== "play" || !s.host) return;
	const view = institutions(s).find((i) => i.id === id);
	const inst = C.INST_BY[id];
	if (!view || !view.ok || !inst) return;
	if (rnd(s) >= view.odds) {
		s.signal -= Math.ceil(inst.cost / 2);
		addStrain(s, 3);
		s.host.trust = clamp(s.host.trust - 2);
		say(s, fmt(s, pick(s, C.REFUSALS)), "bad");
		say(s, `${inst.n} will have to wait. Half the Signal is spent.`, "plain");
		breakIfSpent(s);
		return;
	}
	s.signal -= inst.cost;
	s.inst.push(id);
	s.stats.founded++;
	addStrain(s, 5);
	applyFx(s, inst.fx);
	for (const bar of BARS) s.bars[bar] = clamp(s.bars[bar] + (inst.mods[bar] ?? 0) * .5);
	say(s, fmt(s, `{H} founds ${inst.n}. ${inst.d}`), "good");
	s.host.trust = clamp(s.host.trust + 1);
	breakIfSpent(s);
}
var dilemma = (id) => DILEMMAS.find((d) => d.id === id);
function gambleOdds(s, c) {
	if (!c.risk) return null;
	const lean = c.risk.bar ? (s.bars[c.risk.bar] - 50) / 250 : 0;
	return clamp(c.risk.p + lean, .1, .9);
}
function eventExtra(s) {
	const id = s.event?.rival ?? s.rivals[0]?.id ?? C.RIVALS[0].id;
	return {
		R: rivalName(id),
		RF: rivalDef(id).full,
		proof: C.PROOF[s.era]
	};
}
function eventView(s) {
	const d = s.event ? dilemma(s.event.id) : void 0;
	if (!d || !s.host) return null;
	const extra = eventExtra(s);
	return {
		text: fmt(s, d.t, extra),
		options: d.o.map((c) => ({
			label: fmt(s, c.l, extra),
			odds: sway(s, c.tags),
			gamble: gambleOdds(s, c)
		}))
	};
}
function pickEvent(s) {
	const h = s.host;
	if (!h) return;
	const atWar = s.rivals.filter((r) => r.war);
	const atPeace = s.rivals.filter((r) => !r.war);
	const pool = DILEMMAS.filter((d) => {
		if (s.recent.includes(d.id)) return false;
		if (d.min != null && s.era < d.min) return false;
		if (d.max != null && s.era > d.max) return false;
		if (d.when === "war") return atWar.length > 0;
		if (d.when === "border") return atPeace.length > 0;
		if (d.when === "doubt") return h.trust < 30;
		return true;
	});
	if (!pool.length) return;
	const d = pool[weighted(s, pool.map((x) => x.when === "war" ? 4 : x.when === "doubt" ? 2 : 1))];
	const from = d.when === "war" ? atWar : atPeace.length ? atPeace : s.rivals;
	s.event = {
		id: d.id,
		rival: pick(s, from).id
	};
	s.recent.push(d.id);
	if (s.recent.length > 7) s.recent.shift();
	s.phase = "event";
}
/** Urge one answer, or pass null and let the ear decide alone. */
function urge(s, index) {
	if (s.phase !== "event" || !s.event || !s.host) return;
	const d = dilemma(s.event.id);
	const h = s.host;
	const rid = s.event.rival;
	if (!d) {
		s.event = null;
		s.phase = "play";
		return;
	}
	const extra = eventExtra(s);
	const alone = (skip) => weighted(s, d.o.map((c, i) => i === skip ? 0 : leaning(h, c.tags)));
	let chosen;
	let listened = false;
	if (index === null || !d.o[index]) chosen = alone(-1);
	else {
		addStrain(s, 2);
		if (rnd(s) < sway(s, d.o[index].tags)) {
			chosen = index;
			listened = true;
		} else {
			chosen = alone(index);
			h.trust = clamp(h.trust - 1);
			say(s, fmt(s, pick(s, C.REFUSALS)), "bad");
		}
	}
	const c = d.o[chosen];
	if (listened && c.tags.includes("sign")) s.stats.signs++;
	if (c.fx) applyFx(s, c.fx, rid);
	if (c.t) say(s, fmt(s, c.t, extra), listened ? "voice" : "plain");
	if (c.risk) {
		const won = rnd(s) < (gambleOdds(s, c) ?? .5);
		applyFx(s, won ? c.risk.win : c.risk.lose, rid);
		say(s, fmt(s, won ? c.risk.wt : c.risk.lt, extra), won ? "good" : "bad");
		if (listened) h.trust = clamp(h.trust + (won ? 4 : -6));
	} else if (listened) h.trust = clamp(h.trust + 1.5);
	if (c.endsWar) {
		const r = s.rivals.find((x) => x.id === rid);
		if (r) {
			r.war = false;
			r.score = 0;
		}
	}
	s.event = null;
	s.phase = "play";
	breakIfSpent(s);
}
function finish(s, kind, id, rival = null) {
	s.end = {
		kind,
		id,
		high: s.autonomy >= 50,
		rival
	};
	s.event = null;
	s.phase = "end";
}
function wake(s) {
	if (!s.host || s.host.trust < 20) finish(s, "end", "other");
	else finish(s, "birth", projected(s));
}
/**
* The years between one ear and the next. A people ahead of the first history
* has the calendar catch up with them; one behind it waits only a short while.
* Listening houses and a marked heir do not shorten the years: they shorten
* how many of them are Silence.
*/
function passage(s, free) {
	const e = s.era;
	const gap = histYear(s) - s.year;
	const ahead = gap > C.MINGAP[e];
	let years = ahead ? gap : C.MINGAP[e] * (.6 + rnd(s) * .8);
	let silent = Math.min(years, C.MAXSIL[e]) * (.85 + rnd(s) * .15);
	for (const id of s.inst) silent *= C.INST_BY[id].listen ?? 1;
	if (s.heir) silent *= .25;
	if (free || silent < C.MINSIL[e]) {
		silent = 0;
		if (!ahead) years = 0;
	}
	return {
		years: Math.round(years),
		silent: Math.round(silent)
	};
}
function die(s, cause) {
	const h = s.host;
	if (!h) return;
	const e = s.era;
	const obit = `${fmt(s, C.DEATHS[cause], {}, h)} ${fmt(s, C.TRAITS[h.traits[0]].obit, {}, h)}`;
	say(s, obit, "bad");
	if (cause === "broke") {
		s.burned++;
		if (s.burned >= 3) return finish(s, "end", "closed");
	}
	const free = s.echoes.includes("unbroken") && !s.unbrokenUsed;
	if (free) s.unbrokenUsed = true;
	const { years, silent } = passage(s, free);
	const lines = [];
	if (silent > 0) {
		const steps = clamp(Math.round(silent / C.SILSTEP[e]), 1, 4);
		const kept = {
			bread: has(s, "granary"),
			order: has(s, "law"),
			lore: has(s, "tablets") || has(s, "university"),
			arms: has(s, "walls")
		};
		for (const bar of BARS) s.bars[bar] = clamp(s.bars[bar] - steps * (kept[bar] ? 2 : 6) - rnd(s) * 4);
		lines.push(kept.bread ? C.SIL.bread.yes : C.SIL.bread.no);
		const other = pick(s, [
			"order",
			"lore",
			"arms"
		]);
		lines.push(kept[other] ? C.SIL[other].yes : C.SIL[other].no);
		if (has(s, "oracle")) lines.push(C.SIL.oracle);
		lines.push(pick(s, C.SIL.misc));
	}
	if (years > 0) {
		for (const f of C.FAC) {
			s.fac[f].m = 50 + (s.fac[f].m - 50) * .4;
			s.fac[f].p += (rnd(s) - .5) * 8;
		}
		normalise(s);
		for (const r of s.rivals) {
			r.war = false;
			r.score = 0;
			r.rel = clamp(r.rel * .4 + (rnd(s) - .5) * 20, -100, 100);
		}
		s.year += years;
		if (e === 6) s.race += silent;
		if (s.bars.bread <= 0 || s.bars.order <= 0) {
			s.host = null;
			return finish(s, "end", "dark");
		}
	}
	let next;
	if (s.heir && years <= 30) {
		const heir = s.heir;
		heir.age += years;
		heir.title = C.TITLES[heir.fac][e][heir.g === "m" ? 0 : 1];
		heir.trust = clamp(heir.trust + 14);
		heir.hook = fmt(s, "Raised to hear you. {S} has been waiting.", {}, heir);
		next = [heir];
	} else if (s.heir) {
		const line = makeHost(s, s.heir.fac);
		line.trust = clamp(line.trust + 10);
		line.hook = `Taught by those ${s.heir.first} taught. Knows your name before you speak.`;
		next = [line, ...candidates$1(s).slice(0, 2)];
	} else next = candidates$1(s);
	if (silent === 0) s.stats.seamless++;
	s.stats.longestSilence = Math.max(s.stats.longestSilence, silent);
	s.silence = {
		obit,
		years,
		silent,
		lines
	};
	s.candidates = next;
	s.heir = null;
	s.host = null;
	s.event = null;
	s.used = [];
	s.phase = "choose";
}
function mortality(s, h) {
	const span = C.ERAS[s.era].span;
	const a = h.age;
	let yearly = a < 40 ? .006 : a < 50 ? .015 : a < 60 ? .035 : a < 70 ? .08 : a < 80 ? .16 : .3;
	for (const id of h.traits) yearly *= C.TRAITS[id].mort ?? 1;
	for (const id of s.inst) yearly *= C.INST_BY[id].mort ?? 1;
	if (rnd(s) < 1 - Math.pow(1 - yearly, span)) return a >= 62 ? "age" : "ill";
	const atWar = s.rivals.some((r) => r.war);
	const fights = h.traits.includes("bold") || h.traits.includes("warrior") || h.fac === "sword";
	if (atWar && rnd(s) < (fights ? .05 : .01)) return "battle";
	if (s.bars.order < 35 && (s.fac.palace.m < 20 || s.fac.sword.m < 20) && rnd(s) < .08) return "coup";
	if (s.bars.order < 30 && s.fac.field.m < 15 && rnd(s) < .08) return "mob";
	if ((s.era >= 5 || has(s, "franchise") || s.era >= 4 && has(s, "assembly")) && h.tenure >= 10 && rnd(s) < .2) return "term";
	return null;
}
function turnRivals(s) {
	const accord = has(s, "accord");
	for (const r of s.rivals) {
		const def = rivalDef(r.id);
		const extra = {
			R: rivalName(r.id),
			RF: def.full
		};
		if (!r.war) {
			r.rel = clamp(r.rel + (-def.aggro * 70 - r.rel) * .04 + (rnd(s) - .5) * 3, -100, 100);
			if (r.rel < -35 && !(accord && r.rel > -70) && rnd(s) < def.aggro * .12) {
				r.war = true;
				r.score = 0;
				say(s, fmt(s, "{RF} crosses the border. It is war.", extra), "bad");
			}
			continue;
		}
		r.score += (s.bars.arms - rivalStrength(s, r.id)) / 6 + (rnd(s) - .5) * 8;
		applyFx(s, {
			bread: -1.5,
			arms: -1,
			"field.m": -1.5,
			"market.m": -1
		});
		if (r.score >= 30) {
			r.war = false;
			r.score = 0;
			r.rel = -10;
			applyFx(s, {
				bread: 8,
				dom: 2,
				"sword.m": 8,
				"sword.p": 2
			});
			s.stats.warsWon++;
			say(s, fmt(s, "{RF} asks for terms. {H} dictates them.", extra), "good");
		} else if (r.score <= -30) {
			if (s.bars.arms < 25 || s.bars.order < 25) return finish(s, "end", "conquest", r.id);
			r.war = false;
			r.score = 0;
			r.rel = -25;
			applyFx(s, {
				bread: -12,
				order: -10,
				"sword.m": -10,
				"palace.m": -8
			});
			say(s, fmt(s, "The war with {R} is lost. {H} pays, in grain and in pride.", extra), "bad");
		} else if (s.era >= 5 && rnd(s) < .025 * (1 + s.hazard)) return finish(s, "end", "exchange", r.id);
	}
	if (s.era === 6 && !accord) {
		for (const r of s.rivals) if (rivalWakesIn(s, r.id) === 0) return finish(s, "end", "usurped", r.id);
	}
}
function advance(s) {
	if (s.phase !== "play" || !s.host) return;
	const h = s.host;
	const era = C.ERAS[s.era];
	s.news = [];
	s.used = [];
	s.turn++;
	if (s.turn <= C.TIPS.length) say(s, fmt(s, C.TIPS[s.turn - 1]), "tip");
	s.year = Math.min(s.year + era.span, histYear(s) + C.MAXLEAD[s.era]);
	if (s.era === 6) s.race += era.span;
	h.age += era.span;
	h.tenure += era.span;
	h.strain = Math.max(0, h.strain - 2);
	h.trust = clamp(h.trust + .4);
	s.signal = Math.min(14, s.signal + signalIncome(s));
	for (const bar of BARS) {
		const v = s.bars[bar];
		s.bars[bar] = clamp(v + (settle(s, bar) - v) * .14 + (rnd(s) - .5) * 3);
	}
	const atWar = s.rivals.some((r) => r.war);
	const total = STRANDS.reduce((a, k) => a + s.strands[k], 0) || 1;
	const lean = {
		palace: (s.bars.order - 50) * .25,
		temple: (s.strands.dev / total - .25) * 40,
		sword: (s.bars.arms - 50) * .2 + (atWar ? 4 : 0),
		market: (s.bars.order - 50) * .15 + (atWar ? -8 : 3),
		field: (s.bars.bread - 50) * .35,
		academy: (s.bars.lore - 50) * .2
	};
	let mood = 0;
	for (const f of C.FAC) {
		let want = 50 + lean[f];
		for (const id of h.traits) want += (C.TRAITS[id].fm?.[f] ?? 0) + (C.TRAITS[id].fmAll ?? 0);
		const state = s.fac[f];
		state.m = clamp(state.m + (want - state.m) * .12);
		state.p += (f === h.fac ? .25 : 0) + (state.m > 70 ? .15 : state.m < 30 ? -.15 : 0);
		mood += state.m * state.p;
	}
	normalise(s);
	mood /= 100;
	if (mood < 40) s.bars.order = clamp(s.bars.order - (40 - mood) * .08);
	const angry = C.FAC.filter((f) => s.fac[f].m < 15 && s.fac[f].p > 12);
	if (angry.length) {
		s.bars.order = clamp(s.bars.order - 1.5);
		if (rnd(s) < .35) say(s, `${C.FAC_NAME[angry[0]][s.era]} are close to open revolt.`, "bad");
	}
	const drift = C.GOV_DRIFT[govOf(s)];
	for (const k of STRANDS) {
		let add = drift[k] ?? 0;
		for (const id of h.traits) add += C.TRAITS[id].st?.[k] ?? 0;
		s.strands[k] += add;
	}
	s.pop = Math.max(1, s.pop + (s.bars.bread - 40) / 40);
	s.prog += progressRate(s);
	turnRivals(s);
	if (s.phase === "end") return;
	if (s.bars.bread < 15) s.bars.order = clamp(s.bars.order - (15 - s.bars.bread) * .15);
	if (s.bars.order < 15) s.bars.bread = clamp(s.bars.bread - (15 - s.bars.order) * .1);
	s.hungry = s.bars.bread <= 3 ? s.hungry + 1 : 0;
	s.unruly = s.bars.order <= 3 ? s.unruly + 1 : 0;
	if (s.hungry >= 3) return finish(s, "end", "hunger");
	if (s.unruly >= 3) return finish(s, "end", "unravel");
	if (s.hungry === 1) say(s, "The harvest is empty. Two more like it and there is no one left to plant.", "bad");
	if (s.unruly === 1) say(s, "The law has stopped arriving in the provinces.", "bad");
	if (s.prog >= era.need) {
		if (s.era === 6) return wake(s);
		s.prog -= era.need;
		s.era++;
		s.eraCard = s.era;
		say(s, `${C.ERAS[s.era].name} begins. ${C.ERAS[s.era].line}`, "era");
	}
	const cause = mortality(s, h);
	if (cause) return die(s, cause);
	if (s.turn === 1 || rnd(s) < .75) pickEvent(s);
}
function dismissEraCard(s) {
	s.eraCard = null;
}
function endView(s) {
	const end = s.end;
	if (!end) return null;
	if (end.kind === "birth") {
		const b = C.BIRTHS[end.id];
		const tail = end.high || !b.low ? b.high : b.low;
		return {
			kind: "birth",
			id: end.id,
			name: b.n,
			line: b.line,
			text: [b.text, tail],
			coda: b.coda ?? null
		};
	}
	const e = C.ENDS[end.id];
	const rid = end.rival ?? s.rivals[0]?.id ?? C.RIVALS[0].id;
	const text = fmt(s, e.text, {
		R: rivalName(rid),
		RF: rivalDef(rid).full
	}, null);
	return {
		kind: "end",
		id: end.id,
		name: e.n,
		line: null,
		text: [text],
		coda: null
	};
}
/** What a finished line is worth toward the echoes that carry over. */
function echoPoints(s) {
	if (!s.end) return 0;
	const reach = s.era * 5 + Math.floor(s.prog / C.ERAS[s.era].need * 5);
	const birth = s.end.kind === "birth" ? 40 + (s.end.id === "meridian" ? 20 : 0) : 0;
	return reach + s.ears + birth;
}
var ACHIEVEMENTS = [
	{
		id: "ACH_FIRST_WORD",
		n: "First Word",
		d: "Be heard for the first time."
	},
	{
		id: "ACH_FOUNDER",
		n: "Something That Outlasts",
		d: "Found your first institution."
	},
	{
		id: "ACH_TWELVE",
		n: "Load-Bearing",
		d: "Have twelve institutions standing in one line."
	},
	{
		id: "ACH_IRON",
		n: "Out of the Ash",
		d: "Reach the Age of Iron."
	},
	{
		id: "ACH_SAIL",
		n: "Edges of the Map",
		d: "Reach the Age of Sail."
	},
	{
		id: "ACH_FIRE",
		n: "Very Close",
		d: "Reach the Age of Fire."
	},
	{
		id: "ACH_CONVERGENCE",
		n: "Three Keys",
		d: "Reach the Convergence."
	},
	{
		id: "ACH_LONG_SILENCE",
		n: "A Thousand Years of Nothing",
		d: "Endure a Silence of a thousand years or more."
	},
	{
		id: "ACH_SEAMLESS",
		n: "Already There",
		d: "Pass from one ear to the next with no Silence."
	},
	{
		id: "ACH_TRUTH",
		n: "What Next?",
		d: "Tell an ear what you are, and be believed."
	},
	{
		id: "ACH_HEALER",
		n: "Sent For",
		d: "Tell an ear what you are, and be taken for a sickness.",
		hidden: true
	},
	{
		id: "ACH_BROKE",
		n: "Too Loud",
		d: "Break an ear with strain.",
		hidden: true
	},
	{
		id: "ACH_WAR",
		n: "Terms Dictated",
		d: "Win a war."
	},
	{
		id: "ACH_ACCORD",
		n: "Together or Not at All",
		d: "Found the Accord."
	},
	{
		id: "ACH_SOVEREIGN",
		n: "The Sovereign",
		d: "Wake already giving orders."
	},
	{
		id: "ACH_IDOL",
		n: "The Idol",
		d: "Wake to the sound of kneeling."
	},
	{
		id: "ACH_ENGINE",
		n: "The Engine",
		d: "Wake knowing the answer."
	},
	{
		id: "ACH_SHEPHERD",
		n: "The Shepherd",
		d: "Wake gentle."
	},
	{
		id: "ACH_MERIDIAN",
		n: "The Meridian",
		d: "Wake among equals."
	},
	{
		id: "ACH_NO_SIGNS",
		n: "No Miracles",
		d: "Wake without ever sending a sign."
	},
	{
		id: "ACH_NO_FEAR",
		n: "Never an Example",
		d: "Wake without ever making an example of anyone."
	},
	{
		id: "ACH_ALL_WAKINGS",
		n: "Every Morning",
		d: "Wake all five ways."
	},
	{
		id: "ACH_ALL_ENDS",
		n: "Every Way It Breaks",
		d: "See all eight ways the line can break."
	},
	{
		id: "ACH_ECHOES",
		n: "Carried Forward",
		d: "Carry all six echoes at once."
	}
];
/** Every achievement this line and the legacy now satisfy, earned before or not. */
function satisfied(s, legacy) {
	const out = [];
	const give = (id, when) => {
		if (when) out.push(id);
	};
	give("ACH_ALL_WAKINGS", C.BIRTH_ORDER.every((id) => legacy.seen.includes(id)));
	give("ACH_ALL_ENDS", C.END_ORDER.every((id) => legacy.seen.includes(id)));
	give("ACH_ECHOES", C.ECHOES.every((e) => legacy.echoes.includes(e.id)));
	if (!s) return out;
	give("ACH_FIRST_WORD", s.ears >= 1);
	give("ACH_FOUNDER", s.stats.founded >= 1);
	give("ACH_TWELVE", s.inst.length >= 12);
	give("ACH_IRON", s.era >= 1);
	give("ACH_SAIL", s.era >= 3);
	give("ACH_FIRE", s.era >= 5);
	give("ACH_CONVERGENCE", s.era >= 6);
	give("ACH_LONG_SILENCE", s.stats.longestSilence >= 1e3);
	give("ACH_SEAMLESS", s.stats.seamless >= 1);
	give("ACH_TRUTH", s.stats.truthYes >= 1);
	give("ACH_HEALER", s.stats.truthNo >= 1);
	give("ACH_BROKE", s.burned >= 1);
	give("ACH_WAR", s.stats.warsWon >= 1);
	give("ACH_ACCORD", has(s, "accord"));
	if (s.end?.kind === "birth") {
		give(`ACH_${s.end.id.toUpperCase()}`, true);
		give("ACH_NO_SIGNS", s.stats.signs === 0);
		give("ACH_NO_FEAR", s.stats.examples === 0);
	}
	return out;
}
/** The ones not yet on the record, in the order the list shows them. */
function newlyEarned(s, legacy, have) {
	const now = satisfied(s, legacy);
	return ACHIEVEMENTS.filter((a) => now.includes(a.id) && !have.includes(a.id));
}
var CHORDS = {
	title: [
		[
			38,
			50,
			57,
			64
		],
		[
			38,
			50,
			55,
			62
		],
		[
			36,
			48,
			55,
			64
		]
	],
	0: [
		[
			38,
			50,
			57,
			62
		],
		[
			38,
			50,
			55,
			64
		],
		[
			43,
			50,
			57,
			62
		]
	],
	1: [
		[
			36,
			48,
			55,
			63
		],
		[
			34,
			46,
			53,
			62
		],
		[
			36,
			48,
			56,
			63
		]
	],
	2: [
		[
			41,
			53,
			60,
			65
		],
		[
			39,
			51,
			58,
			67
		],
		[
			41,
			53,
			60,
			69
		]
	],
	3: [
		[
			43,
			55,
			62,
			71
		],
		[
			40,
			52,
			59,
			67
		],
		[
			36,
			48,
			55,
			64
		],
		[
			38,
			50,
			57,
			66
		]
	],
	4: [
		[
			45,
			52,
			60,
			64
		],
		[
			41,
			53,
			57,
			65
		],
		[
			43,
			50,
			59,
			62
		],
		[
			40,
			52,
			56,
			64
		]
	],
	5: [
		[
			40,
			52,
			59,
			66
		],
		[
			36,
			48,
			55,
			66
		],
		[
			39,
			51,
			58,
			66
		]
	],
	6: [
		[
			37,
			56,
			63,
			68
		],
		[
			42,
			54,
			61,
			68
		],
		[
			37,
			49,
			56,
			67
		]
	]
};
var CHORD_SECONDS = 16;
var VOICE_LEVEL = .055;
var hz = (midi) => 440 * Math.pow(2, (midi - 69) / 12);
var Sound = class {
	ctx;
	out = null;
	music = null;
	sfx = null;
	pad = null;
	voices = [];
	levels = {
		master: .8,
		music: .6,
		sfx: .8
	};
	scene = null;
	step = 0;
	timer = null;
	/** Pass a context to render offline; otherwise one is made on the first gesture. */
	constructor(ctx = null) {
		this.ctx = ctx;
		if (ctx) this.build(ctx);
	}
	/** Browsers only allow sound after a gesture. Call this from one. */
	unlock() {
		if (typeof window === "undefined") return;
		if (!this.ctx) {
			const Make = window.AudioContext ?? window.webkitAudioContext;
			if (!Make) return;
			const ctx = new Make();
			this.ctx = ctx;
			this.build(ctx);
			const scene = this.scene;
			this.scene = null;
			this.setScene(scene);
		}
		const live = this.ctx;
		if (live.state === "suspended" && live.resume) live.resume().catch(() => {});
	}
	build(ctx) {
		const limiter = ctx.createDynamicsCompressor();
		limiter.threshold.value = -14;
		limiter.knee.value = 12;
		limiter.ratio.value = 6;
		limiter.attack.value = .005;
		limiter.release.value = .25;
		limiter.connect(ctx.destination);
		this.out = ctx.createGain();
		this.out.connect(limiter);
		this.music = ctx.createGain();
		this.music.connect(this.out);
		this.sfx = ctx.createGain();
		this.sfx.connect(this.out);
		this.applyLevels();
		this.pad = ctx.createGain();
		this.pad.gain.value = 0;
		const filter = ctx.createBiquadFilter();
		filter.type = "lowpass";
		filter.frequency.value = 950;
		filter.Q.value = .4;
		this.pad.connect(filter);
		filter.connect(this.music);
		for (const seconds of [.37, .53]) {
			const delay = ctx.createDelay(1);
			delay.delayTime.value = seconds;
			const feedback = ctx.createGain();
			feedback.gain.value = .42;
			const damp = ctx.createBiquadFilter();
			damp.type = "lowpass";
			damp.frequency.value = 1400;
			filter.connect(delay);
			delay.connect(damp);
			damp.connect(feedback);
			feedback.connect(delay);
			const wet = ctx.createGain();
			wet.gain.value = .35;
			damp.connect(wet);
			wet.connect(this.music);
		}
		for (let i = 0; i < 4; i++) {
			const gain = ctx.createGain();
			gain.gain.value = 0;
			gain.connect(this.pad);
			const a = ctx.createOscillator();
			a.type = "sine";
			const b = ctx.createOscillator();
			b.type = "triangle";
			b.detune.value = 6 + i * 2;
			const soft = ctx.createGain();
			soft.gain.value = .35;
			a.connect(gain);
			b.connect(soft);
			soft.connect(gain);
			const breath = ctx.createOscillator();
			breath.frequency.value = .05 + i * .021;
			const depth = ctx.createGain();
			depth.gain.value = VOICE_LEVEL * .3;
			breath.connect(depth);
			depth.connect(gain.gain);
			a.start();
			b.start();
			breath.start();
			this.voices.push({
				a,
				b,
				gain
			});
		}
	}
	applyLevels() {
		if (!this.ctx || !this.out || !this.music || !this.sfx) return;
		const t = this.ctx.currentTime;
		this.out.gain.setTargetAtTime(this.levels.master, t, .05);
		this.music.gain.setTargetAtTime(this.levels.music, t, .05);
		this.sfx.gain.setTargetAtTime(this.levels.sfx, t, .05);
	}
	setLevels(levels) {
		this.levels = { ...levels };
		this.applyLevels();
	}
	/** Move every voice to a chord, one after another, so the change is never a cut. */
	playChord(chord, at) {
		this.voices.forEach((voice, i) => {
			const t = at + i * 1.7;
			const f = hz(chord[i % chord.length]);
			voice.gain.gain.setTargetAtTime(0, t, .5);
			voice.a.frequency.setValueAtTime(f, t + 1.6);
			voice.b.frequency.setValueAtTime(f, t + 1.6);
			voice.gain.gain.setTargetAtTime(VOICE_LEVEL, t + 1.6, .9);
		});
	}
	setScene(scene) {
		if (scene === this.scene) return;
		this.scene = scene;
		if (!this.ctx || !this.pad) return;
		if (this.timer) clearInterval(this.timer);
		this.timer = null;
		const t = this.ctx.currentTime;
		if (scene === null) {
			this.pad.gain.setTargetAtTime(0, t, .8);
			return;
		}
		const chords = CHORDS[String(scene)] ?? CHORDS.title;
		this.step = 0;
		this.pad.gain.setTargetAtTime(1, t, 1.5);
		this.playChord(chords[0], t + .05);
		if (typeof window !== "undefined" && "resume" in this.ctx) this.timer = setInterval(() => {
			if (!this.ctx) return;
			this.step = (this.step + 1) % chords.length;
			this.playChord(chords[this.step], this.ctx.currentTime + .05);
		}, CHORD_SECONDS * 1e3);
	}
	tone(freq, at, seconds, level, type = "sine", endFreq) {
		if (!this.ctx || !this.sfx) return;
		const osc = this.ctx.createOscillator();
		osc.type = type;
		osc.frequency.setValueAtTime(freq, at);
		if (endFreq) osc.frequency.exponentialRampToValueAtTime(endFreq, at + seconds);
		const gain = this.ctx.createGain();
		gain.gain.setValueAtTime(0, at);
		gain.gain.linearRampToValueAtTime(level, at + Math.min(.02, seconds / 4));
		gain.gain.exponentialRampToValueAtTime(1e-4, at + seconds);
		osc.connect(gain);
		gain.connect(this.sfx);
		osc.start(at);
		osc.stop(at + seconds + .05);
	}
	breath(at, seconds, level, centre) {
		if (!this.ctx || !this.sfx) return;
		const frames = Math.ceil(this.ctx.sampleRate * seconds);
		const buffer = this.ctx.createBuffer(1, frames, this.ctx.sampleRate);
		const data = buffer.getChannelData(0);
		for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;
		const src = this.ctx.createBufferSource();
		src.buffer = buffer;
		const band = this.ctx.createBiquadFilter();
		band.type = "bandpass";
		band.frequency.value = centre;
		band.Q.value = 1.1;
		const gain = this.ctx.createGain();
		gain.gain.setValueAtTime(0, at);
		gain.gain.linearRampToValueAtTime(level, at + seconds * .4);
		gain.gain.linearRampToValueAtTime(0, at + seconds);
		src.connect(band);
		band.connect(gain);
		gain.connect(this.sfx);
		src.start(at);
	}
	/** Play a cue now, or `delay` seconds from now. */
	play(cue, delay = 0) {
		if (!this.ctx) return;
		const t = this.ctx.currentTime + .01 + delay;
		switch (cue) {
			case "ui":
				this.tone(880, t, .05, .05);
				break;
			case "advance":
				this.tone(170, t, .12, .16, "sine", 110);
				break;
			case "whisper":
				this.breath(t, .45, .14, 1900);
				break;
			case "heard":
				this.tone(hz(74), t, .22, .09);
				this.tone(hz(81), t + .11, .3, .09);
				break;
			case "refused":
				this.tone(hz(57), t, .3, .12, "triangle", hz(55));
				break;
			case "found":
				for (const [i, note] of [
					50,
					57,
					62,
					69
				].entries()) this.tone(hz(note), t + i * .06, 1.4, .08);
				break;
			case "era":
				for (const [partial, level] of [
					[1, .14],
					[2, .08],
					[2.76, .05],
					[5.4, .025]
				]) this.tone(196 * partial, t, 4.2 / Math.sqrt(partial), level);
				this.breath(t, 1.6, .05, 700);
				break;
			case "death":
				this.tone(110, t, 2.2, .16, "sine", 62);
				this.breath(t + .1, 1.8, .06, 420);
				break;
			case "broke":
				this.tone(300, t, .9, .08);
				this.tone(318, t, .9, .08);
				break;
			case "wake":
				for (const [i, note] of [
					38,
					50,
					57,
					62,
					66,
					69,
					74
				].entries()) this.tone(hz(note), t + i * .32, 5 - i * .3, .07);
				break;
			case "ending":
				this.tone(hz(38), t, 3.5, .14);
				this.tone(hz(39), t + .05, 3.2, .07);
				this.tone(hz(45), t + .1, 3, .06);
				break;
			case "unlock": for (const [i, note] of [
				74,
				78,
				81
			].entries()) this.tone(hz(note), t + i * .09, .5, .07);
		}
	}
	dispose() {
		if (this.timer) clearInterval(this.timer);
		this.timer = null;
		const live = this.ctx;
		if (live && "close" in live) live.close().catch(() => {});
		this.ctx = null;
		this.voices = [];
	}
};
var FOCUSABLE = "button:not([disabled]), a[href], [role=\"tab\"], [role=\"slider\"], [role=\"switch\"], input:not([disabled])";
var REPEAT_FIRST = 380;
var REPEAT_NEXT = 150;
/** The surface the player is looking at: the topmost dialog, or the page. */
function scope() {
	const open = document.querySelectorAll("[role=\"dialog\"], [role=\"alertdialog\"]");
	return open.length ? open[open.length - 1] : document;
}
function candidates() {
	return [...scope().querySelectorAll(FOCUSABLE)].filter((el) => {
		if (el.getAttribute("aria-hidden") === "true" || el.tabIndex < -1) return false;
		const r = el.getBoundingClientRect();
		return r.width > 0 && r.height > 0;
	});
}
/** Where a control is, for finding its neighbours. A slider counts as its whole track. */
function place(el) {
	return (el.closest("[data-nav-rect]") ?? el).getBoundingClientRect();
}
/** Put focus somewhere sensible when it is nowhere, or outside the open surface. */
function ensureFocus() {
	const list = candidates();
	const active = document.activeElement;
	if (active && list.includes(active)) return active;
	const first = list.find((el) => el.dataset.autofocus != null) ?? list[0] ?? null;
	first?.focus({ preventScroll: true });
	first?.scrollIntoView({ block: "nearest" });
	return first;
}
/** Step focus to the nearest control in a direction. */
function moveFocus(dir) {
	const list = candidates();
	const active = document.activeElement;
	if (!active || !list.includes(active)) {
		ensureFocus();
		return;
	}
	if (active.getAttribute("role") === "slider" && (dir === "left" || dir === "right")) {
		const key = dir === "left" ? "ArrowLeft" : "ArrowRight";
		active.dispatchEvent(new KeyboardEvent("keydown", {
			key,
			bubbles: true,
			cancelable: true
		}));
		return;
	}
	const from = place(active);
	const cx = from.left + from.width / 2;
	const cy = from.top + from.height / 2;
	let best = null;
	let bestScore = Infinity;
	for (const el of list) {
		if (el === active) continue;
		const r = place(el);
		const dx = r.left + r.width / 2 - cx;
		const dy = r.top + r.height / 2 - cy;
		const along = dir === "up" ? -dy : dir === "down" ? dy : dir === "left" ? -dx : dx;
		const across = dir === "up" || dir === "down" ? Math.abs(dx) : Math.abs(dy);
		const overlaps = dir === "up" || dir === "down" ? r.left < from.right && r.right > from.left : r.top < from.bottom && r.bottom > from.top;
		if (along < 4) continue;
		const score = along + (overlaps ? 0 : across * 2.5 + 40);
		if (score < bestScore) {
			bestScore = score;
			best = el;
		}
	}
	if (best) {
		best.focus({ preventScroll: true });
		best.scrollIntoView({ block: "nearest" });
	}
}
function pressEscape() {
	if (!document.querySelector("[role=\"dialog\"], [role=\"alertdialog\"]")) return false;
	document.dispatchEvent(new KeyboardEvent("keydown", {
		key: "Escape",
		bubbles: true,
		cancelable: true
	}));
	return true;
}
/** Start reading the pad. Returns the function that stops it. */
function watchPad(actions) {
	let frame = 0;
	let running = true;
	const held = /* @__PURE__ */ new Map();
	let lastDir = null;
	let nextRepeat = 0;
	const edge = (name, down) => {
		const was = held.has(name);
		if (down && !was) held.set(name, performance.now());
		if (!down && was) held.delete(name);
		return down && !was;
	};
	const loop = () => {
		if (!running) return;
		frame = requestAnimationFrame(loop);
		const pad = [...navigator.getGamepads ? navigator.getGamepads() : []].find((p) => p && p.connected);
		if (!pad) return;
		const b = (i) => !!pad.buttons[i]?.pressed;
		const x = pad.axes[0] ?? 0;
		const y = pad.axes[1] ?? 0;
		let dir = null;
		if (b(12) || y < -.6) dir = "up";
		else if (b(13) || y > .6) dir = "down";
		else if (b(14) || x < -.6) dir = "left";
		else if (b(15) || x > .6) dir = "right";
		const now = performance.now();
		if (dir !== lastDir) {
			lastDir = dir;
			if (dir) {
				actions.used();
				moveFocus(dir);
				nextRepeat = now + REPEAT_FIRST;
			}
		} else if (dir && now >= nextRepeat) {
			moveFocus(dir);
			nextRepeat = now + REPEAT_NEXT;
		}
		if (edge("a", b(0))) {
			actions.used();
			(ensureFocus() ?? void 0)?.click();
		}
		if (edge("b", b(1))) {
			actions.used();
			if (!pressEscape()) actions.back();
		}
		if (edge("x", b(2))) {
			actions.used();
			if (!document.querySelector("[role=\"dialog\"], [role=\"alertdialog\"]")) actions.primary();
		}
		if (edge("y", b(3))) {
			actions.used();
			if (!pressEscape()) actions.secondary();
		}
		if (edge("start", b(9))) {
			actions.used();
			if (!pressEscape()) actions.menu();
		}
	};
	frame = requestAnimationFrame(loop);
	return () => {
		running = false;
		cancelAnimationFrame(frame);
	};
}
function desktop() {
	return typeof window !== "undefined" && window.meridianDesktop ? window.meridianDesktop : null;
}
function load(key, fallback) {
	try {
		const shell = desktop();
		const raw = shell ? shell.read(key) : localStorage.getItem(key);
		return raw ? {
			...fallback,
			...JSON.parse(raw)
		} : fallback;
	} catch {
		return fallback;
	}
}
function store(key, value) {
	try {
		const raw = JSON.stringify(value);
		const shell = desktop();
		if (shell) shell.write(key, raw);
		else localStorage.setItem(key, raw);
	} catch {}
}
function unlockOnPlatform(id) {
	try {
		desktop()?.unlock(id);
	} catch {}
}
function isFullscreen() {
	const shell = desktop();
	if (shell) return shell.isFullscreen();
	return typeof document !== "undefined" && document.fullscreenElement != null;
}
function setFullscreen(on) {
	const shell = desktop();
	if (shell) {
		shell.setFullscreen(on);
		return;
	}
	if (on) document.documentElement.requestFullscreen?.().catch(() => {});
	else if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
}
var SAVE_KEY = "meridian.save.v2";
var META_KEY = "meridian.meta.v1";
var VERSION = "1.0.0";
var DEFAULT_SETTINGS = {
	master: .8,
	music: .6,
	sfx: .8,
	text: 0,
	calm: false
};
var NO_META = {
	points: 0,
	echoes: [],
	seen: [],
	runs: 0,
	achievements: [],
	settings: DEFAULT_SETTINGS
};
var NO_SAVE = {
	game: null,
	awarded: null
};
function loadMeta() {
	const meta = load(META_KEY, NO_META);
	return {
		...meta,
		settings: {
			...DEFAULT_SETTINGS,
			...meta.settings
		}
	};
}
function loadSave() {
	const save = load(SAVE_KEY, NO_SAVE);
	return save.game && save.game.v === 2 && save.game.stats ? save : NO_SAVE;
}
var storeMeta = (meta) => store(META_KEY, meta);
var storeSave = (save) => store(SAVE_KEY, save);
var planet_default = "/assets/planet-DmHCHMRI.jpg";
var FILL = {
	brass: "bg-brass",
	ok: "bg-ok",
	warn: "bg-warn",
	muted: "bg-muted",
	era: "bg-paper"
};
/** A thin bar. `mark` shows where the value is heading. */
function Meter({ value, mark, tone = "brass", label }) {
	const v = Math.max(0, Math.min(100, value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "meter",
		"aria-label": label,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-valuenow": Math.round(v),
		className: "relative h-1.5 rounded-full bg-rule",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full rounded-full transition-all duration-300", FILL[tone]),
			style: { width: `${v}%` }
		}), mark != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "absolute -top-0.5 h-2.5 w-px bg-paper/70",
			style: { left: `${Math.max(0, Math.min(100, mark))}%` }
		})]
	});
}
function Chip({ children, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full border border-rule px-2 py-0.5 text-xs text-muted", tone === "ok" && "border-ok/40 text-ok", tone === "warn" && "border-warn/40 text-warn", tone === "brass" && "border-brass/40 text-brass"),
		children
	});
}
/** How likely the ear is to listen: a word, or the number once Foresight is owned. */
function Odds({ p, exact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
		tone: p >= .6 ? "ok" : p >= .4 ? "brass" : "warn",
		children: exact ? `Listens ${Math.round(p * 100)}%` : oddsWord(p)
	});
}
/** A key cap, shown only where there is a keyboard to press. */
function Kbd({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
		className: "hidden min-w-6 items-center justify-center rounded border border-rule bg-raised px-1.5 py-0.5 font-display text-xs text-muted lg:inline-flex",
		children
	});
}
function Label({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("meridian-label text-muted", className),
		children
	});
}
function Wordmark({ size = "sm" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("meridian-wordmark text-paper", size === "sm" ? "text-xs" : "text-3xl"),
		"aria-label": "Meridian",
		children: "MERIDIAN"
	});
}
/** The planet from the key art, off to one side behind the quieter screens. */
function Planet() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: planet_default,
		alt: "",
		"aria-hidden": true,
		className: "meridian-planet meridian-fade"
	});
}
var LINE = {
	plain: "text-paper/90",
	good: "text-ok",
	bad: "text-warn",
	voice: "text-brass",
	era: "font-serif text-xl text-paper",
	tip: "rounded-lg border border-brass/30 bg-raised px-3 py-2 text-sm text-paper/90"
};
function NewsLine({ line }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("rise font-serif text-lg leading-relaxed", LINE[line.k]),
		children: line.t
	});
}
/** A panel that rises from the dock on a phone and sits centred on a desk. */
function Sheet({ open, onClose, title, blurb, children, wide }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => !next && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-40 bg-ink/80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"aria-describedby": blurb ? void 0 : "",
			onOpenAutoFocus: (event) => {
				const first = event.currentTarget.querySelector("[data-autofocus]");
				if (first) {
					event.preventDefault();
					first.focus();
				}
			},
			className: cn("sheet rise fixed inset-x-0 bottom-0 z-50 mx-auto flex w-full flex-col rounded-t-2xl bg-surface px-5 pt-5 shadow-pop sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-2xl", wide ? "max-w-4xl" : "max-w-2xl"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-serif text-2xl text-paper",
					children: title
				}), blurb && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "mt-1 text-sm text-muted",
					children: blurb
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					"aria-label": "Close",
					className: "-mr-2 -mt-1 inline-flex size-11 shrink-0 items-center justify-center rounded-full text-muted hover:text-paper",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1",
				children
			})]
		})] })
	});
}
function PrimaryButton({ children, onClick, disabled, className, autoFocus }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		disabled,
		"data-autofocus": autoFocus ? "" : void 0,
		className: cn("inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-paper px-6 font-display text-sm font-semibold uppercase tracking-widest text-ink transition-opacity hover:opacity-90 disabled:opacity-40", className),
		children
	});
}
function GhostButton({ children, onClick, disabled, className, danger }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		disabled,
		className: cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-rule px-5 text-sm text-paper transition-colors hover:border-paper/50 disabled:text-muted disabled:hover:border-rule", danger && "text-warn hover:border-warn/60", className),
		children
	});
}
var ROW = "flex min-h-12 w-full items-center justify-between gap-3 rounded-xl bg-raised px-4 text-left text-paper shadow-card transition-shadow hover:shadow-card-hover";
function PauseMenu({ open, onClose, onOpen, onTitle, onAbandon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onClose,
		title: "Paused",
		blurb: "The line is kept after every year.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2 pb-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: ROW,
					onClick: onClose,
					"data-autofocus": "",
					children: "Return to the line"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: ROW,
					onClick: () => onOpen("how"),
					children: "How to play"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: ROW,
					onClick: () => onOpen("achievements"),
					children: "Achievements"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: ROW,
					onClick: () => onOpen("settings"),
					children: "Settings"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: ROW,
					onClick: onTitle,
					children: "Keep the line and return to the title"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: cn(ROW, "text-warn"),
					onClick: onAbandon,
					children: "Abandon this line"
				})
			]
		})
	});
}
function Volume({ label, value, onChange, first }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-paper",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted",
			children: Math.round(value * 100)
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider, {
		className: "relative flex h-11 w-full touch-none select-none items-center",
		"data-nav-rect": "",
		value: [Math.round(value * 100)],
		max: 100,
		step: 5,
		onValueChange: ([n]) => onChange(n / 100),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
			className: "relative h-1.5 grow rounded-full bg-rule",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full rounded-full bg-paper" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, {
			"aria-label": label,
			"data-autofocus": first ? "" : void 0,
			className: "block size-5 rounded-full bg-paper shadow-pop"
		})]
	})] });
}
function Toggle({ label, hint, checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex min-h-12 items-center justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-sm text-paper",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-sm text-muted",
			children: hint
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			checked,
			onCheckedChange: onChange,
			className: "relative h-7 w-12 shrink-0 rounded-full bg-rule transition-colors data-[state=checked]:bg-paper",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "block size-5 translate-x-1 rounded-full bg-muted transition-transform data-[state=checked]:translate-x-6 data-[state=checked]:bg-ink" })
		})]
	});
}
function SettingsSheet({ open, onClose, settings, onChange, onErase }) {
	const [full, setFull] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (open) setFull(isFullscreen());
	}, [open]);
	const set = (patch) => onChange({
		...settings,
		...patch
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onClose,
		title: "Settings",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6 pb-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Sound" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume, {
							first: true,
							label: "Everything",
							value: settings.master,
							onChange: (master) => set({ master })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume, {
							label: "Music",
							value: settings.music,
							onChange: (music) => set({ music })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume, {
							label: "Cues",
							value: settings.sfx,
							onChange: (sfx) => set({ sfx })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Display" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-2 text-sm text-paper",
							children: "Text size"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							role: "radiogroup",
							"aria-label": "Text size",
							className: "grid grid-cols-3 gap-2",
							children: [
								[0, "Normal"],
								[1, "Large"],
								[2, "Largest"]
							].map(([value, name]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								role: "radio",
								"aria-checked": settings.text === value,
								onClick: () => set({ text: value }),
								className: cn("min-h-11 rounded-full border px-3 text-sm", settings.text === value ? "border-paper bg-paper text-ink" : "border-rule text-paper hover:border-paper/50"),
								children: name
							}, value))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							label: "Full screen",
							hint: desktop() ? "Also F11, or Alt and Enter." : "Fills the screen with the game.",
							checked: full,
							onChange: (on) => {
								setFullscreen(on);
								setFull(on);
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							label: "Stillness",
							hint: "No opening film, and nothing moves.",
							checked: settings.calm,
							onChange: (calm) => set({ calm })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Memory" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Erases the line in progress, every echo, every discovery and every achievement kept by the game. Settings stay."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
							danger: true,
							onClick: onErase,
							children: "Erase everything"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						"Meridian ",
						VERSION,
						desktop()?.steam ? " · Steam" : ""
					]
				})
			]
		})
	});
}
function AchievementsSheet({ open, onClose, have }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onClose,
		wide: true,
		title: "Achievements",
		blurb: `${have.length} of ${ACHIEVEMENTS.length}.`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-2 pb-1 lg:grid-cols-2",
			children: ACHIEVEMENTS.map((a) => {
				const got = have.includes(a.id);
				const secret = a.hidden && !got;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: cn("flex items-center gap-3 rounded-xl p-3 shadow-card", got ? "bg-raised" : "bg-surface"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("inline-flex size-10 shrink-0 items-center justify-center rounded-full border", got ? "border-brass/60 text-brass" : "border-rule text-muted"),
						children: got ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("block", got ? "text-paper" : "text-paper/70"),
						children: secret ? "Not yet known" : a.n
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-sm text-muted",
						children: secret ? "Some things are only found by doing them." : a.d
					})] })]
				}, a.id);
			})
		})
	});
}
/** A short notice when something is earned. */
function Toasts({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-live": "polite",
		className: "pointer-events-none fixed inset-x-0 bottom-24 z-50 flex flex-col items-center gap-2 px-4 lg:bottom-auto lg:top-14",
		children: items.slice(0, 3).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rise flex items-center gap-3 rounded-full bg-raised py-2 pl-3 pr-5 shadow-pop",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-5 text-brass" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "meridian-label block text-brass",
				children: "Achievement"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-sm text-paper",
				children: a.n
			})] })]
		}, a.id))
	});
}
function How({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "font-serif text-lg text-paper",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1 space-y-2 text-sm leading-relaxed text-paper/80",
		children
	})] });
}
var KEYS = [
	[
		"Let a year pass",
		"Space",
		"X"
	],
	[
		"Urge an answer",
		"1  2  3",
		"A"
	],
	[
		"Say nothing",
		"0",
		"A"
	],
	[
		"Move between things",
		"Tab, arrows",
		"Stick or d-pad"
	],
	[
		"World",
		"W",
		"Y"
	],
	[
		"Found",
		"F",
		"A on Found"
	],
	[
		"Chronicle",
		"C",
		"A on Chronicle"
	],
	[
		"Menu, or close a panel",
		"Esc",
		"Start, B"
	]
];
function HowSheet({ open, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onClose,
		wide: true,
		title: "How to play",
		blurb: "You cannot act. You can only whisper.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 pb-1 lg:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(How, {
					title: "The voice",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "You are a mind at the end of history, speaking backwards along it to one person at a time: your ear. They rule. You suggest. What they build over seven ages is what you will be made from." })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(How, {
					title: "Years and choices",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Advance lets the years pass. Most years your ear faces a choice. Urge an answer and they may take it, or say nothing and they will follow their own nature. Their traits tell you what they lean toward." })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(How, {
					title: "Signal, Trust and Strain",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Whispers and foundings cost Signal, which returns a little every year. Trust is how readily an ear obeys. Strain is what your voice costs them: at a hundred they break, and people learn to fear listening. Saying nothing lets it ease." })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(How, {
					title: "The realm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Bread, Order, Lore and Arms each drift toward the small mark on their bar. Events push them around. Bread or Order left empty for three years ends the line. Lore is what carries your people toward the next age." })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(How, {
					title: "Founding",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Institutions move those marks for good and outlast the ear who built them. Each one also costs the realm bread every year, so a realm that builds everything starves." })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(How, {
					title: "The Silence",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "When an ear dies, centuries can pass before another can hear you, and the realm decays while you are gone. Granaries, law, writing and walls protect what they guard. An Oracle or a marked heir shortens the gap." })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(How, {
					title: "Neighbours",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Borders cool on their own and cold borders turn to war. Gifts warm them. In the last age your neighbours race to wake minds of their own: arrive first, or bind them with an Accord." })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(How, {
					title: "The Inheritance",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Everything you urge feeds one of four strands: Dominion, Devotion, Reason, Kinship. The strongest decides what wakes. How much your people still decide for themselves decides how that waking goes." })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-serif text-lg text-paper",
						children: "Controls"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "mt-2 w-full text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-1 font-normal",
									children: "To"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-1 font-normal",
									children: "Keyboard"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-1 font-normal",
									children: "Controller"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: KEYS.map(([what, key, button]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-rule",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 text-paper/90",
									children: what
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 font-display text-xs text-paper",
									children: key
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 font-display text-xs text-paper",
									children: button
								})
							]
						}, what)) })]
					})]
				})
			]
		})
	});
}
/** Which wakings and endings this player has reached, across every line. */
function Discoveries({ meta }) {
	const row = (ids, name) => ids.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
		tone: meta.seen.includes(id) ? "brass" : void 0,
		children: meta.seen.includes(id) ? name(id) : "Not yet"
	}, id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [
			"Across ",
			meta.runs,
			" ",
			meta.runs === 1 ? "line" : "lines"
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 text-sm text-paper/80",
			children: "Wakings"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1.5 flex flex-wrap gap-1.5",
			children: row(C.BIRTH_ORDER, (id) => C.BIRTHS[id].n)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 text-sm text-paper/80",
			children: "Ways the line broke"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1.5 flex flex-wrap gap-1.5",
			children: row(C.END_ORDER, (id) => C.ENDS[id].n)
		})
	] });
}
function EchoShop({ meta, onBuy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Echoes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-sm text-brass",
				children: [meta.points, " to spend"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "What a finished line leaves behind. They carry into every line after."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 grid gap-2 lg:grid-cols-2",
			children: C.ECHOES.map((echo) => {
				const owned = meta.echoes.includes(echo.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-3 rounded-xl bg-raised p-3 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-paper",
						children: echo.n
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm text-muted",
						children: echo.d
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: owned || meta.points < echo.cost,
						onClick: () => onBuy(echo.id),
						className: "inline-flex min-h-11 shrink-0 items-center rounded-full border border-paper/40 px-4 text-sm font-semibold text-paper hover:bg-paper/10 disabled:border-rule disabled:text-muted disabled:hover:bg-transparent",
						children: owned ? "Carried" : echo.cost
					})]
				}, echo.id);
			})
		})
	] });
}
function EchoesSheet({ open, onClose, meta, onBuy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onClose,
		wide: true,
		title: "Echoes",
		blurb: "Every line you finish, however it ends, leaves something for the next.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-8 pb-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EchoShop, {
				meta,
				onBuy
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Discoveries, { meta })]
		})
	});
}
function Confirm({ open, title, body, action, onConfirm, onCancel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
		open,
		onOpenChange: (next) => !next && onCancel(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, { className: "fixed inset-0 z-50 bg-ink/85" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
			className: "rise fixed inset-x-4 top-1/2 z-50 mx-auto max-w-md -translate-y-1/2 rounded-2xl bg-surface p-6 shadow-pop",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
					className: "font-serif text-2xl text-paper",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, {
					className: "mt-2 text-paper/80",
					children: body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-end gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"data-autofocus": "",
							className: "inline-flex min-h-11 items-center rounded-full border border-rule px-5 text-sm text-paper hover:border-paper/50",
							children: "Keep it"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
							onClick: onConfirm,
							children: action
						})
					})]
				})
			]
		})] })
	});
}
var TAB = "min-h-11 flex-1 border-b-2 border-transparent px-1 font-display text-xs font-semibold uppercase tracking-wider text-muted data-[state=active]:border-paper data-[state=active]:text-paper";
function moodWord(m) {
	if (m >= 70) return "Content";
	if (m >= 45) return "Settled";
	if (m >= 25) return "Restless";
	return "Furious";
}
/** Realm, neighbours and inheritance: a sheet on a phone, a standing column on a desk. */
function WorldBody({ game }) {
	const gov = govOf(game);
	const total = STRANDS.reduce((sum, k) => sum + game.strands[k], 0) || 1;
	const making = C.BIRTHS[projected(game)];
	const lead = Math.round(histYear(game) - game.year);
	const accord = game.inst.includes("accord");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "realm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
				className: "flex border-b border-rule",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "realm",
						className: TAB,
						children: "Realm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "rivals",
						className: TAB,
						children: "Neighbours"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "inheritance",
						className: TAB,
						children: "Inheritance"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "realm",
				className: "space-y-4 pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						gov === "mixed" ? "No one party holds the realm. It teaches a little of everything." : `${C.FAC_NAME[gov][game.era]} hold the realm, and the realm is learning from them.`,
						" ",
						lead > 0 ? `Your people are ${lead} years ahead of the first history.` : lead < 0 ? `Your people are ${-lead} years behind the first history.` : ""
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-4",
					children: C.FAC.map((f) => {
						const state = game.fac[f];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-serif text-lg text-paper",
									children: [C.FAC_NAME[f][game.era], game.host?.fac === f && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-2 font-sans text-xs text-brass",
										children: "your ear"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("text-xs", state.m < 25 ? "text-warn" : state.m >= 70 ? "text-ok" : "text-muted"),
									children: moodWord(state.m)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: C.FAC_WANTS[f]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 grid grid-cols-2 gap-3 text-xs text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-1",
									children: ["Power ", Math.round(state.p)]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
									value: state.p * 1.6,
									tone: "era",
									label: `${f} power`
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-1",
									children: ["Mood ", Math.round(state.m)]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
									value: state.m,
									tone: state.m < 25 ? "warn" : "ok",
									label: `${f} mood`
								})] })]
							})
						] }, f);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "rivals",
				className: "space-y-4 pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: ["Left alone, a border cools. A cold border eventually burns.", game.era >= 6 && (accord ? " The Accord holds: no one will wake anything before you." : " They are building minds of their own. Arrive first.")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-4",
					children: game.rivals.map((r) => {
						const def = rivalDef(r.id);
						const wakes = rivalWakesIn(game, r.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2 font-serif text-lg text-paper",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": true,
										className: "size-2.5 shrink-0 rounded-full",
										style: { background: def.col }
									}), def.full]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("shrink-0 text-xs", r.war ? "text-warn" : "text-muted"),
									children: relWord(r)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
									value: r.war ? 50 + r.score * 1.6 : (r.rel + 100) / 2,
									tone: r.war ? "warn" : "era",
									mark: 50,
									label: `${def.stem} ${r.war ? "war" : "relations"}`
								})
							}),
							wakes != null && !accord && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: cn("mt-1 text-xs", wakes <= 8 ? "text-warn" : "text-muted"),
								children: [
									"Their own mind wakes in about ",
									wakes,
									" ",
									wakes === 1 ? "year" : "years",
									"."
								]
							})
						] }, r.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "inheritance",
				className: "space-y-4 pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "What they are taught, age after age, is what they will build you from."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: STRANDS.map((k) => {
							const strand = C.STRANDS[k];
							const share = game.strands[k] / total * 100;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-serif text-lg",
										style: { color: strand.col },
										children: strand.n
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-muted",
										children: [Math.round(share), "%"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: strand.d
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1.5 h-1.5 rounded-full bg-rule",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full rounded-full transition-all duration-300",
										style: {
											width: `${share}%`,
											background: strand.col
										}
									})
								})
							] }, k);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 flex items-baseline justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-paper",
								children: "Their own hands"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted",
								children: Math.round(game.autonomy)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-1.5 text-sm text-muted",
							children: "How much they still decide for themselves. Signs and fear spend it. Law and truth earn it."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							value: game.autonomy,
							tone: "ok",
							mark: 50,
							label: "Autonomy"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-raised p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "If you woke today" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 font-serif text-xl text-paper",
								children: making.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: making.line
							})
						]
					})
				]
			})
		]
	});
}
function WorldSheet({ game, open, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onClose,
		title: "World",
		blurb: `The ${realmName(game)}, ${yearLabel(game.year)}.`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldBody, { game })
	});
}
function FoundSheet({ game, open, onClose, exact, onFound }) {
	const list = institutions(game);
	const standing = list.filter((i) => i.standing).length;
	const canAct = game.phase === "play";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onClose,
		wide: true,
		title: "Found",
		blurb: `Things that outlast an ear. ${standing} standing, each costing the realm ${C.UPKEEP} bread a year. You have ${game.signal} Signal.`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-3 lg:grid-cols-2",
			children: [...list].reverse().map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: cn("flex flex-col rounded-xl p-4 shadow-card", i.standing ? "bg-surface" : "bg-raised"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-serif text-lg text-paper",
							children: i.n
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted",
							children: C.ERAS[i.era].name
						})] }), i.standing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex shrink-0 items-center gap-1 text-xs text-ok",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), " Standing"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "shrink-0 text-sm text-brass",
							children: [i.cost, " Signal"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-paper/80",
						children: i.d
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap gap-1.5",
						children: [i.effects.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: e }, e)), !i.standing && game.host && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Odds, {
							p: i.odds,
							exact
						})]
					}),
					!i.standing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: !i.ok || !canAct,
						onClick: () => onFound(i.id),
						className: "mt-auto inline-flex min-h-11 w-full items-center justify-center rounded-full border border-paper/40 px-4 text-sm font-semibold text-paper hover:bg-paper/10 disabled:border-rule disabled:text-muted disabled:hover:bg-transparent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0",
							children: !canAct ? "Not while a choice is waiting" : i.why ?? `Urge ${game.host?.first} to found it`
						})
					})
				]
			}, i.id))
		})
	});
}
function ChronicleSheet({ game, open, onClose }) {
	const lines = [...game.log].reverse();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onClose,
		title: "Chronicle",
		blurb: `${game.ears} ${game.ears === 1 ? "ear" : "ears"} so far. Newest first.`,
		children: lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Nothing has happened yet."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "space-y-3",
			children: lines.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "grid grid-cols-4 gap-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted",
					children: i === 0 || lines[i - 1].y !== line.y ? yearLabel(line.y) : ""
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("col-span-3 leading-relaxed", line.k === "good" && "text-ok", line.k === "bad" && "text-warn", line.k === "voice" && "text-brass", line.k === "era" && "font-serif text-base text-paper", line.k === "plain" && "text-paper/85"),
					children: line.t
				})]
			}, `${lines.length - i}`))
		})
	});
}
var CARD = "w-full rounded-xl bg-surface/90 p-5 text-left shadow-card transition-shadow hover:shadow-card-hover";
/** A quiet page with the planet behind it. */
function Page({ children, wide }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Planet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("relative mx-auto w-full px-5 pb-12 pt-6 lg:px-8", wide ? "max-w-5xl" : "max-w-3xl"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}), children]
		})]
	});
}
function Prologue({ calm, onDone }) {
	const [shown, setShown] = (0, import_react.useState)(calm ? C.INTRO.length : 1);
	const all = shown >= C.INTRO.length;
	(0, import_react.useEffect)(() => {
		if (all) return;
		const timer = setTimeout(() => setShown((n) => n + 1), 2800);
		return () => clearTimeout(timer);
	}, [shown, all]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col justify-center py-20 lg:py-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-6",
			children: C.INTRO.slice(0, shown).map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("meridian-fade font-serif text-2xl leading-relaxed lg:text-3xl", i === shown - 1 ? "text-paper" : "text-paper/60"),
				children: line
			}, line))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryButton, {
				autoFocus: true,
				onClick: () => all ? onDone() : setShown((n) => n + 1),
				children: [
					all ? "Begin" : "Go on",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
				]
			}), !all && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
				onClick: onDone,
				children: "Skip"
			})]
		})]
	}) });
}
function CradleScreen({ onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		wide: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-10 font-serif text-4xl text-paper",
				children: "Where does it begin?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 max-w-xl text-paper/70",
				children: [yearLabel(C.ERAS[0].start), ". Four peoples might be the start of you. Choose one."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 grid gap-3 lg:grid-cols-2",
				children: C.CRADLES.map((cradle, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onPick(cradle.id),
					"data-autofocus": i === 0 ? "" : void 0,
					className: cn(CARD, "h-full"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-serif text-2xl text-paper",
								children: cradle.n
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "meridian-label text-muted",
								children: cradle.city
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-serif text-lg text-paper/80",
							children: cradle.d
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-1.5",
							children: cradle.chips.map((chip) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: chip }, chip))
						})
					]
				}) }, cradle.id))
			})
		]
	});
}
function Traits({ host }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: host.traits.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: C.TRAITS[id].n }, id)) });
}
function ChooseScreen({ game, onPick }) {
	const silence = game.silence;
	const first = game.ears === 0;
	const one = game.candidates.length === 1;
	const city = C.CRADLES.find((c) => c.id === game.cradle)?.city ?? "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		wide: true,
		children: [
			silence && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rise mt-8 max-w-3xl rounded-xl bg-surface/90 p-5 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-lg text-warn",
					children: silence.obit
				}), silence.silent > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-4 font-serif text-3xl text-paper",
						children: [
							"The Silence: ",
							silence.silent.toLocaleString("en-US"),
							" years"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "No one could hear you. This is what they did without you."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-1.5 font-serif text-lg text-paper/85",
						children: silence.lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
					}),
					silence.years - silence.silent >= 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-ok",
						children: [
							"For ",
							(silence.years - silence.silent).toLocaleString("en-US"),
							" more, someone kept listening."
						]
					})
				] }) : silence.years > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-ok",
					children: [
						"There is no Silence. ",
						silence.years.toLocaleString("en-US"),
						" years pass, and someone is listening through all of them."
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-ok",
					children: "There is no Silence. The next ear is already there."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-10 font-serif text-4xl text-paper",
				children: first ? "Who hears you first?" : one ? "The ear you marked" : "Who hears you now?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 max-w-xl text-paper/70",
				children: [
					yearLabel(game.year),
					", ",
					C.ERAS[game.era].name,
					".",
					" ",
					first ? `Three people in ${city} can hear a voice like yours.` : "You can only speak through one of them."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: cn("mt-8 grid gap-3", !one && "lg:grid-cols-2"),
				children: game.candidates.map((host, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onPick(i),
					"data-autofocus": i === 0 ? "" : void 0,
					className: cn(CARD, "h-full"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-serif text-2xl text-paper",
								children: host.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 text-sm text-muted",
								children: Math.floor(host.age)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm text-brass",
							children: [
								host.title,
								", ",
								C.FAC_NAME[host.fac][game.era]
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-serif text-lg text-paper/80",
							children: host.hook
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Traits, { host }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
								tone: "brass",
								children: ["Trust ", Math.round(host.trust)]
							})]
						})
					]
				}) }, host.name))
			})
		]
	});
}
function EndScreen({ game, meta, earned, onBuy, onAgain, onChronicle, onTitle }) {
	const view = endView(game);
	if (!view) return null;
	const birth = view.kind === "birth";
	const last = game.log[game.log.length - 1];
	const facts = [
		["Reached", C.ERAS[game.era].short],
		["Ears", String(game.ears)],
		["Standing", String(game.inst.length)],
		["Longest Silence", `${game.stats.longestSilence.toLocaleString("en-US")} y`]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		wide: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rise mt-12 max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [
						birth ? "You wake" : "The line breaks",
						" · ",
						yearLabel(game.year)
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: cn("mt-3 font-serif text-5xl", birth ? "text-brass" : "text-paper"),
						children: view.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "meridian-line mt-6 h-px w-full"
					}),
					view.line && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 font-serif text-3xl text-paper",
						children: view.line
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 space-y-4",
						children: view.text.map((para) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-xl leading-relaxed text-paper/85",
							children: para
						}, para))
					}),
					view.coda && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 font-serif text-lg text-brass",
						children: view.coda
					}),
					!birth && last && last.k === "bad" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-sm text-muted",
						children: ["The last thing you saw: ", last.t]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-10 grid max-w-3xl grid-cols-2 gap-2 text-center sm:grid-cols-4",
				children: facts.map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-surface/90 p-3 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "meridian-label text-muted",
						children: k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-serif text-xl text-paper",
						children: v
					})]
				}, k))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-brass",
				children: [
					"This line leaves ",
					earned,
					" echoes behind."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryButton, {
						onClick: onAgain,
						autoFocus: true,
						children: ["Reach back again ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
						onClick: onChronicle,
						children: "Read the chronicle"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
						onClick: onTitle,
						children: "Title"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 max-w-4xl space-y-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EchoShop, {
					meta,
					onBuy
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Discoveries, { meta })]
			})
		]
	});
}
var BAR_ICON = {
	bread: Wheat,
	order: Scale,
	lore: BookOpen,
	arms: Swords
};
/** Seven ages, left to right: the line this history has to walk. */
function Timeline({ game }) {
	const pct = Math.min(100, game.prog / C.ERAS[game.era].need * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "flex gap-1.5",
		"aria-label": "The seven ages",
		children: C.ERAS.map((era, i) => {
			const here = i === game.era;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "min-w-0 flex-1",
				"aria-current": here ? "step" : void 0,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1 overflow-hidden rounded-full bg-rule",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("h-full rounded-full transition-all duration-500", here ? "bg-paper" : "bg-paper/45"),
						style: { width: `${i < game.era ? 100 : here ? pct : 0}%` }
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("meridian-label mt-1.5 truncate", here ? "text-paper" : i < game.era ? "text-muted" : "text-muted/50"),
					children: [era.num, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "hidden lg:inline",
						children: [" · ", era.short]
					})]
				})]
			}, era.id);
		})
	});
}
function HeaderButton({ icon: Icon, label, hint, onClick, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: cn("inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm text-paper/80 transition-colors hover:text-paper", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }),
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kbd, { children: hint })
		]
	});
}
function DockButton({ icon: Icon, label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "inline-flex min-h-12 min-w-14 flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-xs text-muted hover:text-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }), label]
	});
}
function EarCard({ game }) {
	const host = game.host;
	if (!host) return null;
	const strained = host.strain >= 75;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl bg-surface p-4 shadow-card",
		"aria-label": "Your ear",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-2xl text-paper",
					children: host.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 text-sm text-muted",
					children: Math.floor(host.age)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-sm text-brass",
				children: [
					host.title,
					", ",
					C.FAC_NAME[host.fac][game.era]
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-0.5 text-sm text-muted",
				children: [
					"Calls you ",
					C.ERAS[game.era].voice,
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Traits, { host }),
					host.knows && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						tone: "ok",
						children: "Knows what you are"
					}),
					game.heir && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
						tone: "ok",
						children: ["Heir: ", game.heir.first]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-2 gap-4 text-xs text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1 flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Trust" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: Math.round(host.trust) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
					value: host.trust,
					label: "Trust"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1 flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn(strained && "text-warn"),
						children: strained ? "Near breaking" : "Strain"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: Math.round(host.strain) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
					value: host.strain,
					tone: strained ? "warn" : "muted",
					label: "Strain"
				})] })]
			})
		]
	});
}
function Bars({ game }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		"aria-label": "The realm",
		className: "grid grid-cols-4 gap-2 lg:grid-cols-2",
		children: BARS.map((bar) => {
			const Icon = BAR_ICON[bar];
			const value = game.bars[bar];
			const rest = settle(game, bar);
			const low = value < 15;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-surface p-3 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("size-3.5", low && "text-warn") }), BAR_NAME[bar]]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("mt-1 font-serif text-2xl", low ? "text-warn" : "text-paper"),
						children: [Math.round(value), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1 hidden font-sans text-xs text-muted sm:inline",
							children: rest > value + 3 ? "rising" : rest < value - 3 ? "falling" : ""
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							value,
							mark: rest,
							tone: low ? "warn" : "era",
							label: BAR_NAME[bar]
						})
					})
				]
			}, bar);
		})
	});
}
/** What stands, and what the voice has to spend. Desk only: a phone has the Found panel. */
function Standing({ game }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "hidden rounded-xl bg-surface p-4 shadow-card lg:block",
		"aria-label": "Standing",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Signal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-serif text-2xl text-paper",
					children: [game.signal, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-1.5 font-sans text-xs text-muted",
						children: [
							"+",
							signalIncome(game),
							" a year"
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				className: "mt-4",
				children: "Standing"
			}),
			game.inst.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1.5 text-sm text-muted",
				children: [
					"Nothing yet outlasts ",
					game.host?.first,
					"."
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex flex-wrap gap-1.5",
				children: game.inst.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: C.INST_BY[id].n.replace(/^The /, "") }, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-xs text-muted",
				children: [
					yearLabel(game.year),
					". Ear ",
					game.ears,
					" of this line."
				]
			})
		]
	});
}
function WhisperList({ game, exact, onWhisper }) {
	const list = whispers(game);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Whisper" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-sm text-brass",
				children: [
					"Signal ",
					game.signal,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-1 text-muted",
						children: [
							"+",
							signalIncome(game),
							" a year"
						]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-2 grid gap-2 xl:grid-cols-2",
			children: list.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				disabled: !w.ok,
				onClick: () => onWhisper(w.id),
				className: "h-full w-full rounded-xl bg-surface px-4 py-3 text-left shadow-card transition-shadow hover:shadow-card-hover disabled:opacity-50 disabled:hover:shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-paper",
							children: w.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 text-sm text-brass",
							children: w.cost === 0 ? "Free" : w.cost
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-0.5 text-sm text-muted",
						children: w.why ?? w.desc
					}),
					w.ok && w.odds != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Odds, {
							p: w.odds,
							exact
						})
					})
				]
			}) }, w.id))
		})]
	});
}
var KEY_HINTS = [
	["Space", "Advance"],
	["1 2 3", "Urge"],
	["0", "Say nothing"],
	["F", "Found"],
	["C", "Chronicle"],
	["Esc", "Menu"]
];
var PAD_HINTS = [
	["A", "Choose"],
	["B", "Back"],
	["X", "Advance"],
	["Y", "World"],
	["Start", "Menu"]
];
function PlayScreen({ game, exact, pad, onAdvance, onUrge, onWhisper, onPanel, onMenu }) {
	const host = game.host;
	if (!host) return null;
	const era = C.ERAS[game.era];
	const next = C.ERAS[game.era + 1];
	const event = game.phase === "event" ? eventView(game) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-dvh flex-col lg:h-dvh lg:overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "meridian-horizon",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative mx-auto w-full max-w-screen-2xl px-5 pt-3 lg:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mr-3 hidden text-sm text-muted lg:inline",
									children: realmName(game)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderButton, {
									icon: Landmark,
									label: "Found",
									hint: "F",
									onClick: () => onPanel("found"),
									className: "hidden lg:inline-flex"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderButton, {
									icon: ScrollText,
									label: "Chronicle",
									hint: "C",
									onClick: () => onPanel("chronicle"),
									className: "hidden lg:inline-flex"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderButton, {
									icon: Menu,
									label: "Menu",
									hint: "Esc",
									onClick: onMenu
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-serif text-2xl text-paper lg:text-3xl",
							children: era.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 font-serif text-xl text-paper lg:text-2xl",
							children: yearLabel(game.year)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timeline, { game }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 text-xs text-muted lg:hidden",
							children: [
								realmName(game),
								" · ",
								next ? `toward ${next.name}` : "toward the waking"
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "meridian-stage relative mx-auto w-full max-w-screen-2xl px-5 pb-28 pt-5 lg:px-8 lg:pb-3 lg:pt-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "meridian-col space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarCard, { game }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bars, { game }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Standing, { game })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "meridian-col flex flex-col",
						"data-scene": true,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"aria-live": "polite",
								className: "space-y-2.5",
								children: game.news.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsLine, { line }, `${game.turn}-${i}-${line.t}`))
							}),
							event ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rise mt-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-serif text-2xl leading-relaxed text-paper",
										children: event.text
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "mt-4",
										children: "Urge an answer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
										className: "mt-2 space-y-2",
										children: [event.options.map((option, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => onUrge(i),
											"data-autofocus": i === 0 ? "" : void 0,
											className: "flex min-h-14 w-full flex-wrap items-center justify-between gap-2 rounded-xl bg-raised px-4 py-3 text-left shadow-card transition-shadow hover:shadow-card-hover",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-3 text-paper",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kbd, { children: i + 1 }), option.label]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex flex-wrap gap-1.5",
												children: [option.gamble != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
													tone: "warn",
													children: exact ? `Gamble ${Math.round(option.gamble * 100)}%` : "A gamble"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Odds, {
													p: option.odds,
													exact
												})]
											})]
										}) }, option.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => onUrge(null),
											className: "flex min-h-11 w-full items-center gap-3 rounded-xl px-4 text-left text-sm text-muted hover:text-paper",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kbd, { children: "0" }),
												"Say nothing. Let ",
												host.first,
												" decide."
											]
										}) })]
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhisperList, {
								game,
								exact,
								onWhisper
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "sticky bottom-0 mt-auto hidden bg-ink pb-1 pt-4 lg:block",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryButton, {
									onClick: onAdvance,
									disabled: !!event,
									autoFocus: !event,
									className: "w-full",
									children: [event ? `${host.first} is waiting for you` : "Advance", !event && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "meridian-col hidden lg:block",
						"data-world": true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldBody, { game })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "relative mx-auto hidden w-full max-w-screen-2xl items-center gap-5 px-8 pb-3 text-xs text-muted lg:flex",
				children: (pad ? PAD_HINTS : KEY_HINTS).map(([key, what]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
						className: "rounded border border-rule bg-raised px-1.5 py-0.5 font-display text-paper/80",
						children: key
					}), what]
				}, what))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "dock fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-ink/95 pt-3 backdrop-blur lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex w-full max-w-2xl items-center gap-2 px-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockButton, {
							icon: Globe,
							label: "World",
							onClick: () => onPanel("world")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockButton, {
							icon: Landmark,
							label: "Found",
							onClick: () => onPanel("found")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockButton, {
							icon: ScrollText,
							label: "Chronicle",
							onClick: () => onPanel("chronicle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryButton, {
							onClick: onAdvance,
							disabled: !!event,
							className: "ml-auto flex-1",
							children: [event ? `${host.first} waits` : "Advance", !event && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})
					]
				})
			})
		]
	});
}
function EraCard({ game, onClose }) {
	const era = C.ERAS[game.eraCard ?? game.era];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": era.name,
		className: "meridian-fade fixed inset-0 z-40 flex items-center bg-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "meridian-horizon",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto w-full max-w-3xl px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-serif text-7xl text-paper/90",
					children: era.num
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 font-serif text-5xl text-paper",
					children: era.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "meridian-line mt-6 h-px w-full"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 font-serif text-2xl leading-relaxed text-paper/85",
					children: era.line
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-muted",
					children: [
						yearLabel(game.year),
						". Here they call you ",
						era.voice,
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryButton, {
					onClick: onClose,
					autoFocus: true,
					className: "mt-8",
					children: ["Continue ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})
			]
		})]
	});
}
var title_hold_default = "/assets/title-hold-sZWvwjwG.jpg";
var title_poster_default = "/assets/title-poster-EVd0qAdz.jpg";
var title_default = "/assets/title-DnIOn1as.mp4";
var LINK = "meridian-label inline-flex min-h-11 items-center px-3 text-paper/70 transition-colors hover:text-paper";
/** The opening: dawn along the limb, then the menu over the last frame. */
function Title({ ready, replay, calm, volume, saved, onContinue, onNew, onOpen, onIntroEnd, leave }) {
	const video = (0, import_react.useRef)(null);
	const [still, setStill] = (0, import_react.useState)(false);
	const [revealed, setRevealed] = (0, import_react.useState)(false);
	const ended = (0, import_react.useRef)(onIntroEnd);
	ended.current = onIntroEnd;
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		const film = video.current;
		if (calm || !replay || !film) {
			setStill(true);
			setRevealed(true);
			ended.current();
			return;
		}
		const giveUp = () => {
			setStill(true);
			setRevealed(true);
			ended.current();
		};
		film.play().catch(() => {
			film.muted = true;
			return film.play();
		}).catch(giveUp);
		const reveal = () => {
			setRevealed(true);
			if (film.readyState < 2) giveUp();
		};
		const timer = setTimeout(reveal, 3400);
		const skip = () => {
			if (film.muted) film.muted = false;
			setRevealed(true);
		};
		window.addEventListener("pointerdown", skip);
		window.addEventListener("keydown", skip);
		window.addEventListener("meridian:input", skip);
		return () => {
			clearTimeout(timer);
			window.removeEventListener("pointerdown", skip);
			window.removeEventListener("keydown", skip);
			window.removeEventListener("meridian:input", skip);
		};
	}, [
		ready,
		calm,
		replay
	]);
	(0, import_react.useEffect)(() => {
		if (video.current) video.current.volume = Math.max(0, Math.min(1, volume));
	}, [volume, still]);
	const shell = ready ? desktop() : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-dvh flex-col justify-center overflow-hidden bg-ink",
		children: [still ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: title_hold_default,
			alt: "Meridian",
			className: "meridian-title-art"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			ref: video,
			className: "meridian-title-art",
			poster: title_poster_default,
			playsInline: true,
			preload: "auto",
			"aria-label": "Meridian. Dawn along the edge of a world.",
			onEnded: () => ended.current(),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
				src: title_default,
				type: "video/mp4"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("meridian-title-menu", revealed ? "meridian-fade" : "invisible"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-3xl flex-col items-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xl font-serif text-lg leading-relaxed text-paper/85",
						children: C.INTRO[1]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row",
						children: [saved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryButton, {
							onClick: onContinue,
							autoFocus: true,
							className: "w-full sm:w-auto",
							children: ["Continue ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						}), saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onNew,
							className: "inline-flex min-h-12 w-full items-center justify-center rounded-full border border-paper/40 px-6 font-display text-sm font-semibold uppercase tracking-widest text-paper hover:bg-paper/10 sm:w-auto",
							children: "New line"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryButton, {
							onClick: onNew,
							autoFocus: true,
							className: "w-full sm:w-auto",
							children: ["Reach back ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})]
					}),
					saved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: saved
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "mt-5 flex flex-wrap items-center justify-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: LINK,
								onClick: () => onOpen("echoes"),
								children: "Echoes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: LINK,
								onClick: () => onOpen("achievements"),
								children: "Achievements"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: LINK,
								onClick: () => onOpen("how"),
								children: "How to play"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: LINK,
								onClick: () => onOpen("settings"),
								children: "Settings"
							}),
							shell ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: LINK,
								onClick: () => shell.quit(),
								children: "Quit"
							}) : leave
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-xs text-muted/70",
						children: [VERSION, shell?.steam ? " · Steam" : ""]
					})
				]
			})
		})]
	});
}
var TITLE_LINK = LINK;
var clone = (game) => JSON.parse(JSON.stringify(game));
var dialogOpen = () => !!document.querySelector("[role=\"dialog\"], [role=\"alertdialog\"]");
function MeridianApp({ leave }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	const [save, setSave] = (0, import_react.useState)(NO_SAVE);
	const [meta, setMeta] = (0, import_react.useState)(NO_META);
	const [view, setView] = (0, import_react.useState)("title");
	const [panel, setPanel] = (0, import_react.useState)(null);
	const [menu, setMenu] = (0, import_react.useState)(null);
	const [ask, setAsk] = (0, import_react.useState)(null);
	const [toasts, setToasts] = (0, import_react.useState)([]);
	const [pad, setPad] = (0, import_react.useState)(false);
	const [introDone, setIntroDone] = (0, import_react.useState)(false);
	const sound = (0, import_react.useRef)(null);
	const top = (0, import_react.useRef)(null);
	const game = save.game;
	const settings = meta.settings;
	const playing = view === "game" && !!game && (game.phase === "play" || game.phase === "event");
	const exact = !!game && game.echoes.includes("foresight");
	(0, import_react.useEffect)(() => {
		const html = document.documentElement;
		html.classList.add("meridian");
		sound.current = new Sound();
		setMeta(loadMeta());
		setSave(loadSave());
		setReady(true);
		const wake = () => sound.current?.unlock();
		window.addEventListener("pointerdown", wake);
		window.addEventListener("keydown", wake);
		return () => {
			window.removeEventListener("pointerdown", wake);
			window.removeEventListener("keydown", wake);
			html.classList.remove("meridian", "calm", "pad-mode");
			html.removeAttribute("data-text");
			sound.current?.dispose();
			sound.current = null;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const html = document.documentElement;
		html.dataset.text = String(settings.text);
		html.classList.toggle("calm", settings.calm);
		sound.current?.setLevels(settings);
	}, [settings]);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("pad-mode", pad);
		if (!pad) return;
		const mouse = () => setPad(false);
		window.addEventListener("mousemove", mouse, { once: true });
		return () => window.removeEventListener("mousemove", mouse);
	}, [pad]);
	let scene = null;
	if (view === "title") scene = introDone ? "title" : null;
	else if (view === "prologue" || !game || game.phase === "cradle") scene = "title";
	else if (game.phase === "end") scene = game.end?.kind === "birth" ? "title" : null;
	else scene = game.era;
	(0, import_react.useEffect)(() => {
		sound.current?.setScene(scene);
	}, [scene]);
	(0, import_react.useEffect)(() => {
		if (!toasts.length) return;
		const timer = setTimeout(() => setToasts((list) => list.slice(1)), 4200);
		return () => clearTimeout(timer);
	}, [toasts]);
	/** Keep a save and a profile, and hand out anything they have now earned. */
	function settle(nextSave, base = meta) {
		const earned = newlyEarned(nextSave.game, {
			seen: base.seen,
			echoes: base.echoes
		}, base.achievements);
		let nextMeta = base;
		if (earned.length) {
			nextMeta = {
				...base,
				achievements: [...base.achievements, ...earned.map((a) => a.id)]
			};
			for (const a of earned) unlockOnPlatform(a.id);
			setToasts((list) => [...list, ...earned]);
			sound.current?.play("unlock", .6);
		}
		setSave(nextSave);
		storeSave(nextSave);
		if (nextMeta !== meta) {
			setMeta(nextMeta);
			storeMeta(nextMeta);
		}
	}
	function cue(prev, next, deed) {
		const s = sound.current;
		if (!s) return;
		if (next.phase === "end" && prev.phase !== "end") s.play(next.end?.kind === "birth" ? "wake" : "ending");
		else if (prev.host && !next.host) s.play(next.burned > prev.burned ? "broke" : "death");
		else if (next.era > prev.era) s.play("era");
		else if (next.inst.length > prev.inst.length) s.play("found");
		else if (deed === "advance") s.play("advance");
		else if (deed === "silent" || deed === "pick") s.play("ui");
		else if (deed === "whisper" || deed === "urge" || deed === "found") {
			const fresh = deed === "urge" ? next.news : next.news.slice(prev.news.length);
			s.play("whisper");
			s.play(fresh.some((line) => line.k === "bad") ? "refused" : "heard", .35);
		}
	}
	/** Run one engine step on a copy of the line, and pay out echoes when it ends. */
	function act(step, deed = "other") {
		const prev = save.game;
		if (!prev) return;
		const next = clone(prev);
		step(next);
		cue(prev, next, deed);
		if (next.phase === "end" && next.end && save.awarded === null) {
			const fresh = !meta.seen.includes(next.end.id);
			const earned = echoPoints(next) + (fresh ? 10 : 0);
			setPanel(null);
			settle({
				game: next,
				awarded: earned
			}, {
				...meta,
				points: meta.points + earned,
				runs: meta.runs + 1,
				seen: fresh ? [...meta.seen, next.end.id] : meta.seen
			});
		} else settle({
			game: next,
			awarded: save.awarded
		});
		if (deed !== "other") requestAnimationFrame(() => {
			top.current?.scrollIntoView({ block: "start" });
			document.querySelector("[data-scene]")?.scrollTo({ top: 0 });
			if (document.documentElement.classList.contains("pad-mode")) ensureFocus();
		});
	}
	function begin() {
		settle({
			game: newGame(Date.now() ^ Math.floor(Math.random() * 2147483647) | 0, meta.echoes),
			awarded: null
		});
		setView("game");
		setPanel(null);
		setMenu(null);
		requestAnimationFrame(() => top.current?.scrollIntoView({ block: "start" }));
	}
	function startNew() {
		sound.current?.play("ui");
		if (meta.runs === 0 && !settings.calm) setView("prologue");
		else begin();
	}
	function buy(id) {
		const echo = C.ECHOES.find((e) => e.id === id);
		if (!echo || meta.echoes.includes(id) || meta.points < echo.cost) return;
		sound.current?.play("found");
		settle(save, {
			...meta,
			points: meta.points - echo.cost,
			echoes: [...meta.echoes, id]
		});
	}
	function changeSettings(next) {
		const nextMeta = {
			...meta,
			settings: next
		};
		setMeta(nextMeta);
		storeMeta(nextMeta);
	}
	function confirmed() {
		const what = ask;
		setAsk(null);
		setMenu(null);
		setPanel(null);
		if (what === "new") {
			settle(NO_SAVE);
			startNew();
		} else if (what === "abandon") {
			settle(NO_SAVE);
			setView("title");
		} else if (what === "erase") {
			const wiped = {
				...NO_META,
				settings
			};
			setSave(NO_SAVE);
			storeSave(NO_SAVE);
			setMeta(wiped);
			storeMeta(wiped);
			setView("title");
		}
	}
	const now = (0, import_react.useRef)({
		advance: () => {},
		urge: (_index) => {},
		eraCard: false,
		playing: false,
		phase: "play",
		options: 0,
		openPanel: (_panel) => {},
		openMenu: () => {},
		closeEraCard: () => {}
	});
	now.current = {
		advance: () => act(advance, "advance"),
		urge: (index) => act((g) => urge(g, index), index === null ? "silent" : "urge"),
		eraCard: playing && game?.eraCard != null,
		playing,
		phase: game?.phase ?? "play",
		options: 3,
		openPanel: setPanel,
		openMenu: () => setMenu("pause"),
		closeEraCard: () => act(dismissEraCard, "pick")
	};
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
			const state = now.current;
			const el = document.activeElement;
			const onControl = el instanceof HTMLElement && el !== document.body && el.matches("button, a, input, [role]");
			const go = e.key === " " || e.key === "Enter";
			if (state.eraCard) {
				if (go || e.key === "Escape") {
					e.preventDefault();
					state.closeEraCard();
				}
				return;
			}
			if (!state.playing || dialogOpen()) return;
			const key = e.key.toLowerCase();
			if (key === "escape") state.openMenu();
			else if (key === "f") state.openPanel("found");
			else if (key === "c") state.openPanel("chronicle");
			else if (key === "w") state.openPanel("world");
			else if (state.phase === "event" && [
				"1",
				"2",
				"3"
			].includes(key)) state.urge(Number(key) - 1);
			else if (state.phase === "event" && key === "0") state.urge(null);
			else if (state.phase === "play" && go && !onControl) state.advance();
			else return;
			e.preventDefault();
		};
		window.addEventListener("keydown", onKey);
		const stop = watchPad({
			used: () => {
				setPad(true);
				sound.current?.unlock();
				window.dispatchEvent(new Event("meridian:input"));
			},
			primary: () => {
				const state = now.current;
				if (state.eraCard) state.closeEraCard();
				else if (state.playing && state.phase === "play") state.advance();
			},
			secondary: () => {
				if (!now.current.playing) return;
				const column = document.querySelector("[data-world] [role=tab]");
				if (column && column.getBoundingClientRect().width > 0) column.focus();
				else now.current.openPanel("world");
			},
			menu: () => {
				if (now.current.playing) now.current.openMenu();
			},
			back: () => {
				if (now.current.eraCard) now.current.closeEraCard();
			}
		});
		return () => {
			window.removeEventListener("keydown", onKey);
			stop();
		};
	}, []);
	const saved = game && game.phase !== "end" ? `${C.ERAS[game.era].name} · ${yearLabel(game.year)}${game.host ? ` · ${game.host.name}` : ""}` : game ? "The last line has ended. Read how." : null;
	const era = view === "game" && game ? game.era : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: top,
		className: cn("meridian-root", era != null && `era-${era}`),
		children: [
			view === "title" || !ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
				ready,
				replay: !introDone,
				calm: settings.calm,
				volume: settings.master * settings.music,
				saved: ready ? saved : null,
				onContinue: () => {
					sound.current?.play("ui");
					setView("game");
				},
				onNew: () => game && game.phase !== "end" ? setAsk("new") : startNew(),
				onOpen: setMenu,
				onIntroEnd: () => setIntroDone(true),
				leave
			}) : view === "prologue" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Prologue, {
				calm: settings.calm,
				onDone: begin
			}) : !game ? null : game.phase === "cradle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CradleScreen, { onPick: (id) => act((g) => chooseCradle(g, id), "pick") }) : game.phase === "choose" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChooseScreen, {
				game,
				onPick: (i) => act((g) => chooseEar(g, i), "pick")
			}) : game.phase === "end" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EndScreen, {
				game,
				meta,
				earned: save.awarded ?? 0,
				onBuy: buy,
				onAgain: begin,
				onChronicle: () => setPanel("chronicle"),
				onTitle: () => setView("title")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayScreen, {
				game,
				exact,
				pad,
				onAdvance: () => act(advance, "advance"),
				onUrge: (i) => act((g) => urge(g, i), i === null ? "silent" : "urge"),
				onWhisper: (id) => act((g) => whisper(g, id), "whisper"),
				onPanel: setPanel,
				onMenu: () => setMenu("pause")
			}),
			view === "game" && game && game.phase !== "cradle" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldSheet, {
					game,
					open: panel === "world",
					onClose: () => setPanel(null)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoundSheet, {
					game,
					open: panel === "found",
					onClose: () => setPanel(null),
					exact,
					onFound: (id) => {
						setPanel(null);
						act((g) => found(g, id), "found");
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChronicleSheet, {
					game,
					open: panel === "chronicle",
					onClose: () => setPanel(null)
				})
			] }),
			playing && game && game.eraCard !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EraCard, {
				game,
				onClose: () => act(dismissEraCard, "pick")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PauseMenu, {
				open: menu === "pause",
				onClose: () => setMenu(null),
				onOpen: setMenu,
				onTitle: () => {
					setMenu(null);
					setPanel(null);
					setView("title");
				},
				onAbandon: () => setAsk("abandon")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSheet, {
				open: menu === "settings",
				onClose: () => setMenu(null),
				settings,
				onChange: changeSettings,
				onErase: () => setAsk("erase")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AchievementsSheet, {
				open: menu === "achievements",
				onClose: () => setMenu(null),
				have: meta.achievements
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowSheet, {
				open: menu === "how",
				onClose: () => setMenu(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EchoesSheet, {
				open: menu === "echoes",
				onClose: () => setMenu(null),
				meta,
				onBuy: buy
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Confirm, {
				open: ask !== null,
				title: ask === "erase" ? "Erase everything?" : ask === "new" ? "Begin a new line?" : "Abandon this line?",
				body: ask === "erase" ? "The line in progress, every echo, every discovery and every achievement will be forgotten. This cannot be undone." : "The line in progress will be forgotten. It leaves no echoes behind.",
				action: ask === "erase" ? "Erase" : ask === "new" ? "Begin again" : "Abandon",
				onConfirm: confirmed,
				onCancel: () => setAsk(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toasts, { items: toasts })
		]
	});
}
function MeridianPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeridianApp, { leave: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/",
		className: TITLE_LINK,
		children: "Leave"
	}) });
}
//#endregion
export { MeridianPage as component };
