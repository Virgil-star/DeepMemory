import { i as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as SkillNav } from "./skill-nav-DpsKEq0I.mjs";
import { t as cn } from "./cn-Ccejyh36.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/architect-nfmNIgBe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KIND_LABEL = {
	physical: "A thing you can hand over",
	teaching: "A lesson, taught live",
	community: "A room, not a platform",
	service: "Work, done once",
	writing: "A piece of writing",
	software: "A tool",
	practice: "A practice"
};
var KIND_TESTS = [
	{
		kind: "physical",
		re: /\b(product|merch|print|shop|store|food|object|clothing|candle|goods)\b/i
	},
	{
		kind: "teaching",
		re: /\b(course|class|teach|workshop|lesson|tutorial|curriculum)\b/i
	},
	{
		kind: "community",
		re: /\b(community|discord|membership|club|forum)\b/i
	},
	{
		kind: "service",
		re: /\b(consult|freelance|service|coach|agency|client|retainer)\b/i
	},
	{
		kind: "writing",
		re: /\b(newsletter|essay|book|novel|blog|magazine|brief|publication|poem|story|zine)\b/i
	},
	{
		kind: "software",
		re: /\b(app|software|saas|tool|bot|website|platform|code)\b/i
	}
];
var SPENDS = [
	{
		re: /\b(ads?|advertising|promotion)\b/i,
		spend: "Paid attention",
		instead: "Go where those people already talk. Speak once a day. Do not rent the room."
	},
	{
		re: /\b(domain|dns|hostname)\b/i,
		spend: "A domain",
		instead: "Use a page or a file you can already send. Buy a name only after someone asks twice where to find you."
	},
	{
		re: /\b(llc|incorporate|lawyer|attorney|trademark)\b/i,
		spend: "A company",
		instead: "Use your own name. Form nothing until money arrives that needs a place to land."
	},
	{
		re: /\b(logo|branding|brand deck|designer)\b/i,
		spend: "A visual identity",
		instead: "The name, set in type you already have, in one color. The sentence is the identity."
	},
	{
		re: /\b(shopify|etsy|storefront|checkout|stripe)\b/i,
		spend: "A store",
		instead: "No checkout this week. Deliver the first one by hand."
	},
	{
		re: /\b(subscription|saas|notion|webflow|mailchimp|convertkit|beehiiv)\b/i,
		spend: "A new subscription",
		instead: "A document and a message. If a tool needs a card, it is the wrong tool."
	},
	{
		re: /\b(api|openai|tokens|gpt|model)\b/i,
		spend: "A paid model",
		instead: "Do the judgment by hand for the first ten. Automate a step only after you have done it yourself."
	},
	{
		re: /\$\s?\d+|\b(price|pricing|paid tier)\b/i,
		spend: "A price",
		instead: "No price this week. You are testing whether anyone responds, not whether anyone pays."
	},
	{
		re: /\b(camera|mic|microphone|laptop|equipment|gear)\b/i,
		spend: "Equipment",
		instead: "Use the phone and the room you already have. Gear is a delay."
	},
	{
		re: /\b(course|cohort|mastermind)\b/i,
		spend: "A course about the idea",
		instead: "Do the idea once. A course about it is a way to avoid that."
	}
];
var DEFAULT_CUTS = {
	software: [
		{
			spend: "Hosting",
			instead: "A file you hand to one person. Host it when they ask for a link."
		},
		{
			spend: "A paid interface kit",
			instead: "Plain text that does the one job."
		},
		{
			spend: "A paid API",
			instead: "The hard part, done by you, ten times, by hand."
		}
	],
	writing: [
		{
			spend: "A newsletter platform",
			instead: "Send the piece yourself to people you can name."
		},
		{
			spend: "A theme or a site",
			instead: "The writing is the product. The container can be a message."
		},
		{
			spend: "Ads for the first issue",
			instead: "One reader who answers is the whole test."
		}
	],
	service: [
		{
			spend: "A funnel",
			instead: "Ten messages, written one by one."
		},
		{
			spend: "A retainer offer",
			instead: "One piece of work, finished, with a yes or a no."
		},
		{
			spend: "A portfolio site",
			instead: "The work itself, shown to the person it was for."
		}
	],
	physical: [
		{
			spend: "Inventory",
			instead: "Make one. Not a batch."
		},
		{
			spend: "A storefront",
			instead: "Offer that one object to a person you can name."
		},
		{
			spend: "Packaging",
			instead: "Hand it over as it is. Finish comes after someone wants a second."
		}
	],
	teaching: [
		{
			spend: "A course platform",
			instead: "One live session. Notes are the curriculum."
		},
		{
			spend: "A recorded production",
			instead: "Teach it live, once, to a person who can interrupt you."
		},
		{
			spend: "A certificate",
			instead: "They leave able to do the thing. That is the proof."
		}
	],
	community: [
		{
			spend: "Community software",
			instead: "A thread or an hour you already can hold."
		},
		{
			spend: "A moderator tool",
			instead: "You, present, with a small number of people."
		},
		{
			spend: "A launch",
			instead: "Invite the people you named. No one else yet."
		}
	],
	practice: [
		{
			spend: "A system",
			instead: "Do the thing once before you design a system for it."
		},
		{
			spend: "A brand",
			instead: "A name and a sentence."
		},
		{
			spend: "An audience",
			instead: "One person who can tell you the truth."
		}
	]
};
var RESPONSE = {
	software: "used it once without you driving",
	writing: "replied",
	service: "given a clear yes or a clear no",
	physical: "asked for another or refused the first",
	teaching: "stayed to the end and tried the thing",
	community: "come back without being pulled",
	practice: "seen the work happen"
};
function clean(value) {
	return value.trim().replace(/\s+/g, " ");
}
function sentence(value) {
	const text = clean(value).replace(/[.?!]+$/, "");
	return text.endsWith(".") ? text : `${text}.`;
}
function classify(idea) {
	for (const test of KIND_TESTS) if (test.re.test(idea)) return test.kind;
	return "practice";
}
function dose(hours) {
	if (hours === 2) return "twenty minutes";
	if (hours === 5) return "forty-five minutes";
	if (hours === 10) return "ninety minutes";
	return "a half day";
}
function cutsFor(brief, kind) {
	const haystack = `${brief.idea}\n${brief.temptation}`;
	const found = [];
	for (const spend of SPENDS) {
		if (kind === "teaching" && spend.spend === "A course about the idea") continue;
		if (spend.re.test(haystack)) found.push({
			spend: spend.spend,
			instead: spend.instead
		});
	}
	const temptation = clean(brief.temptation);
	const temptationMatched = Boolean(temptation) && SPENDS.some((spend) => spend.re.test(temptation));
	if (temptation && !temptationMatched) found.unshift({
		spend: temptation,
		instead: "Refuse it. If the next step is impossible without buying that, the step is wrong."
	});
	for (const cut of DEFAULT_CUTS[kind]) {
		if (found.length >= 4) break;
		if (!found.some((item) => item.spend === cut.spend)) found.push(cut);
	}
	return found.slice(0, 4);
}
function stackFor(brief, kind) {
	const have = clean(brief.have);
	return [have ? `Already in hand: ${have}. The work starts there. Add nothing that costs.` : "You named no tool. Use whatever is already open. Do not open an account.", ...{
		software: ["A text editor you already use.", "A file you can put in one person's hands. No host, no card."],
		writing: ["A document.", "Messages you can already send to people you know by name."],
		service: ["Your calendar.", "A plain message. No page, no deck."],
		physical: ["Materials you already own. If you own none, the idea waits.", "The camera on the phone you have."],
		teaching: ["A conversation.", "Notes taken while you teach, not before."],
		community: ["One existing thread, or one hour you can protect.", "A list of names, not a platform."],
		practice: ["The tools the work itself already requires.", "A way to show one person the result."]
	}[kind]];
}
function daysFor(brief, kind) {
	const who = clean(brief.who);
	const span = dose(brief.hours);
	const labels = [
		"Day 1",
		"Day 2",
		"Day 3",
		"Day 4",
		"Day 5",
		"Day 6",
		"Day 7"
	];
	const steps = {
		writing: [
			`In ${span}, write the promise in one sentence for ${who}.`,
			`Draft the piece ugly. Do not open a new tool.`,
			`Cut it until ${who} can use it in one sitting.`,
			`Send it to ${who} yourself. No list, no platform.`,
			`Ask one question: what should the next one do.`,
			`Write only from that answer. Ignore every other idea.`,
			`Read the kill line. Stop, or repeat the loop once.`
		],
		software: [
			`In ${span}, write the one job, in a sentence ${who} would recognize.`,
			`Do that job by hand for ${who}.`,
			`Write down every step your hands took.`,
			`Cross out every step they can already do.`,
			`Build only the remaining step, in an editor you already have.`,
			`Give it to ${who}. Watch. Do not explain unless they stop.`,
			`Read the kill line. Stop, or fix the one place they stalled.`
		],
		service: [
			`In ${span}, write the offer in four lines. Who, what is done, by when, what you need from them.`,
			`Name ${who} and no one else.`,
			`Send it. Ask for a yes or a no, not a conversation about the idea.`,
			`If yes, do the work inside the hours you named.`,
			`Deliver it finished. No deck.`,
			`Ask what was wrong. Write that down.`,
			`Read the kill line before you offer it to anyone else.`
		],
		physical: [
			`In ${span}, make one, from what you already have.`,
			`Photograph it as it is.`,
			`Show it to ${who}. Do not explain the line you wish it were.`,
			`Ask if they want it, or want it changed.`,
			`Make the change only if they named it.`,
			`Hand over the one object.`,
			`Read the kill line. Do not buy materials for a second unless they asked.`
		],
		teaching: [
			`In ${span}, write what ${who} will be able to do at the end. One ability.`,
			`Invite them to a single session. Name the hour.`,
			`Prepare nothing you cannot say aloud.`,
			`Teach it. Let them interrupt.`,
			`Write down where they got lost.`,
			`Teach that one stuck point again, shorter.`,
			`Read the kill line. The notes are the curriculum. Do not record a course.`
		],
		community: [
			`In ${span}, write why ${who} would come back a second time.`,
			`Invite only those people. Give an hour.`,
			`Hold the hour. No new software.`,
			`End by naming the next hour.`,
			`Do not invite anyone who was not in the room.`,
			`Hold the second hour only if someone returns.`,
			`Read the kill line.`
		],
		practice: [
			`In ${span}, do the idea once. Small enough to finish.`,
			`Write what actually happened, not what you planned.`,
			`Show that record to ${who}.`,
			`Ask what they would cut.`,
			`Do it a second time with the cut.`,
			`Show the difference.`,
			`Read the kill line. Stop if nothing changed for them.`
		]
	};
	return labels.map((label, index) => ({
		label,
		text: steps[kind][index]
	}));
}
function exchange(kind, who) {
	return {
		writing: {
			theyGet: `${who} gets one piece they can use, not a promise of a publication.`,
			youGet: "You get a reply that tells you whether there is a next piece."
		},
		software: {
			theyGet: `${who} gets one job done, without making an account.`,
			youGet: "You get to see the exact step where they stall."
		},
		service: {
			theyGet: `${who} gets the work once, finished.`,
			youGet: "You get a yes or a no. Not a retainer, not a brand."
		},
		physical: {
			theyGet: `${who} gets the first object, made from what you had.`,
			youGet: "You get a request for another, or a refusal. Both are answers."
		},
		teaching: {
			theyGet: `${who} gets one live session and the ability you named.`,
			youGet: "You get their confusion. That is the curriculum."
		},
		community: {
			theyGet: `${who} gets a room at a set hour.`,
			youGet: "You get to see who returns without being asked twice."
		},
		practice: {
			theyGet: `${who} gets to see the thing done once.`,
			youGet: "You get the difference between the idea and the doing."
		}
	}[kind];
}
function loopFor(kind, who, hours) {
	const span = dose(hours);
	return {
		writing: `Each cycle, ${span}: one piece, sent to ${who}, one question back.`,
		software: `Each cycle, ${span}: one job, done by hand, then the single step they could not do, put in their hands.`,
		service: `Each cycle, ${span}: one offer, one delivery, one correction written down.`,
		physical: `Each cycle, ${span}: one object, shown, changed only if they named the change.`,
		teaching: `Each cycle, ${span}: one ability, taught live, rewritten where they got lost.`,
		community: `Each cycle: one hour, the same people, a next hour named before you end.`,
		practice: `Each cycle, ${span}: do it, show ${who}, cut what they cut, do it again.`
	}[kind];
}
function architect(brief) {
	const idea = clean(brief.idea);
	const who = clean(brief.who);
	const kind = classify(idea);
	const trade = exchange(kind, who);
	return {
		kind,
		kindLabel: KIND_LABEL[kind],
		thesis: `${sentence(idea)} For ${who}. ${dose(brief.hours)} at a time. Spend: nothing.`,
		theyGet: trade.theyGet,
		youGet: trade.youGet,
		stack: stackFor(brief, kind),
		cuts: cutsFor(brief, kind),
		loop: loopFor(kind, who, brief.hours),
		days: daysFor(brief, kind),
		kill: `On day seven, if ${who} has not ${RESPONSE[kind]}, stop. Do not buy a way around the silence.`,
		refusals: [
			"No ads.",
			"No new subscription and no tool that asks for a card.",
			"No logo, no domain, no company this week.",
			"No course about the idea, and no equipment.",
			"If a step needs money, the step is wrong."
		]
	};
}
function validateBrief(brief) {
	if (clean(brief.idea).length < 8) return "Say the idea in a sentence. A label is not an architecture.";
	if (clean(brief.who).length < 2) return "Name who it is for. One person you can reach is enough. A market is not.";
	return null;
}
function toPlainText(brief, plan) {
	return [
		"ZERO-COST IDEA ARCHITECT",
		plan.thesis,
		"",
		`Kind: ${plan.kindLabel}`,
		`Hours: ${brief.hours} this week`,
		"Spend: $0",
		"",
		"THE EXCHANGE",
		plan.theyGet,
		plan.youGet,
		"",
		"STACK",
		...plan.stack.map((line) => `- ${line}`),
		"",
		"CUT",
		...plan.cuts.map((cut) => `- ${cut.spend}: ${cut.instead}`),
		"",
		"THE LOOP",
		plan.loop,
		"",
		"SEVEN DAYS",
		...plan.days.map((day) => `${day.label}. ${day.text}`),
		"",
		"KILL LINE",
		plan.kill,
		"",
		"REFUSED",
		...plan.refusals.map((line) => `- ${line}`)
	].join("\n");
}
var SKILL = [
	"If it needs a card, it is out.",
	"The first user is a person you can name.",
	"The proof is a response, not a purchase.",
	"A refused spend is cut, not postponed.",
	"Seven days, then the kill line."
];
var STORAGE_KEY = "zero-cost-architect.v1";
var HOURS = [
	2,
	5,
	10,
	20
];
var EMPTY = {
	idea: "",
	who: "",
	have: "",
	hours: 5,
	temptation: ""
};
function ArchitectApp() {
	const [brief, setBrief] = (0, import_react.useState)(EMPTY);
	const [plan, setPlan] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return;
			const saved = JSON.parse(raw);
			if (saved.brief) setBrief({
				...EMPTY,
				...saved.brief
			});
			if (saved.plan) setPlan(saved.plan);
		} catch {
			localStorage.removeItem(STORAGE_KEY);
		}
	}, []);
	function patch(partial) {
		setError(null);
		setCopied(false);
		setBrief((current) => ({
			...current,
			...partial
		}));
	}
	function submit(event) {
		event.preventDefault();
		const problem = validateBrief(brief);
		if (problem) {
			setError(problem);
			setPlan(null);
			return;
		}
		const next = architect(brief);
		setPlan(next);
		localStorage.setItem(STORAGE_KEY, JSON.stringify({
			brief,
			plan: next
		}));
		requestAnimationFrame(() => {
			document.getElementById("architecture")?.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		});
	}
	async function copy() {
		if (!plan) return;
		try {
			await navigator.clipboard.writeText(toPlainText(brief, plan));
			setCopied(true);
		} catch {
			setError("The plan is on the page. Copy it from there.");
		}
	}
	function reset() {
		setBrief(EMPTY);
		setPlan(null);
		setError(null);
		setCopied(false);
		localStorage.removeItem(STORAGE_KEY);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen md:grid md:grid-cols-[17rem_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "border-b border-rule px-4 py-5 md:sticky md:top-0 md:flex md:h-screen md:flex-col md:border-r md:border-b-0 md:px-5 md:py-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-2xl leading-none text-paper",
					children: "Zero-Cost"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs font-medium tracking-widest text-brass uppercase",
					children: "Idea architect"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillNav, { current: "architect" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-5 space-y-3 md:mt-8",
					children: SKILL.map((rule, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[1.25rem_1fr] gap-2 text-sm text-paper",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brass tabular-nums",
							children: index + 1
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: rule })]
					}, rule))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-sm text-muted md:mt-auto md:pt-6",
					children: "The skill runs here. Nothing is sent, and nothing is bought."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto w-full max-w-2xl px-4 py-6 md:px-8 md:py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-3xl leading-tight text-paper",
					children: "Architect an idea that spends nothing."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "A sentence, a person you can name, and the hours you will actually give it."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "mt-6 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "The idea",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: brief.idea,
								onChange: (event) => patch({ idea: event.target.value }),
								rows: 3,
								placeholder: "Say it in one sentence",
								className: fieldClass
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Who it is for",
							hint: "One person, or a few you can actually reach.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: brief.who,
								onChange: (event) => patch({ who: event.target.value }),
								placeholder: "Name them",
								className: fieldClass,
								autoComplete: "off"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "What you already have",
							hint: "Tools, materials, a list of people. Leave blank if it is only time.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: brief.have,
								onChange: (event) => patch({ have: event.target.value }),
								placeholder: "Notes, a phone, a group chat",
								className: fieldClass,
								autoComplete: "off"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "text-xs font-medium tracking-widest text-muted uppercase",
							children: "Hours this week"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 grid grid-cols-4 gap-2",
							children: HOURS.map((hours) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": brief.hours === hours,
								onClick: () => patch({ hours }),
								className: cn("min-h-11 rounded-lg text-sm tabular-nums", brief.hours === hours ? "bg-brass font-semibold text-ink" : "bg-surface text-paper shadow-card"),
								children: hours
							}, hours))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "What you are tempted to buy",
							hint: "Optional. It will be cut, not budgeted.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: brief.temptation,
								onChange: (event) => patch({ temptation: event.target.value }),
								placeholder: "A domain, ads, a logo",
								className: fieldClass,
								autoComplete: "off"
							})
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							className: "rounded-lg border-l-2 border-l-brass bg-surface px-3 py-3 text-sm text-paper",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "min-h-11 w-full rounded-lg bg-brass text-sm font-semibold text-ink",
							children: "Architect it"
						})
					]
				}),
				plan ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanView, {
					plan,
					copied,
					onCopy: () => void copy(),
					onReset: reset
				}) : null
			]
		})]
	});
}
function PlanView({ plan, copied, onCopy, onReset }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		id: "architecture",
		className: "mt-10 scroll-mt-6 space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs font-medium tracking-widest text-brass uppercase",
				children: [plan.kindLabel, " · Spend $0"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-serif text-2xl leading-snug text-paper",
				children: plan.thesis
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "The exchange",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: plan.theyGet }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2",
					children: plan.youGet
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Stack",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: plan.stack.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Cut",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: plan.cuts.map((cut) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-brass",
						children: cut.spend
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: cut.instead
					})] }, cut.spend))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "The loop",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-lg leading-snug",
					children: plan.loop
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Seven days",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "space-y-3",
					children: plan.days.map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[4.5rem_1fr] gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brass",
							children: day.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: day.text })]
					}, day.label))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Kill line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-lg leading-snug",
					children: plan.kill
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Refused",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: plan.refusals.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onCopy,
					className: "min-h-11 flex-1 rounded-lg bg-brass text-sm font-semibold text-ink",
					children: copied ? "Copied" : "Copy the plan"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onReset,
					className: "min-h-11 flex-1 rounded-lg bg-surface text-sm text-paper shadow-card",
					children: "Start over"
				})]
			})
		]
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl bg-surface p-4 text-sm leading-relaxed break-words text-paper shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-xs font-medium tracking-widest text-brass uppercase",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3",
			children
		})]
	});
}
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-medium tracking-widest text-muted uppercase",
				children: label
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-sm text-muted",
				children: hint
			}) : null,
			children
		]
	});
}
var fieldClass = "mt-2 w-full rounded-lg bg-surface px-3 py-3 text-base text-paper shadow-card placeholder:text-muted";
function ArchitectPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchitectApp, {});
}
//#endregion
export { ArchitectPage as component };
