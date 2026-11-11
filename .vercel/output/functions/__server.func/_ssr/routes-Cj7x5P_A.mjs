import { i as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as SkillNav } from "./skill-nav-DpsKEq0I.mjs";
import { t as cn } from "./cn-Ccejyh36.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cj7x5P_A.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SKILL = [
	"Write the ceiling before anyone opens a form.",
	"The inspection is not a bargaining chip.",
	"Do not bid with money you cannot lose.",
	"Three closed sales, read aloud, before you send.",
	"One offer. Then stop refreshing the listing."
];
var MARKETS = [
	{
		id: "quiet",
		label: "Quiet"
	},
	{
		id: "live",
		label: "Live"
	},
	{
		id: "contested",
		label: "Contested"
	}
];
var MONEYS = [
	{
		id: "cash",
		label: "Cash"
	},
	{
		id: "conventional",
		label: "Conventional"
	},
	{
		id: "fha",
		label: "FHA"
	},
	{
		id: "va",
		label: "VA"
	}
];
var MARKET_LABEL = {
	quiet: "Quiet",
	live: "Live",
	contested: "Contested"
};
var MONEY_LABEL = {
	cash: "Cash",
	conventional: "Conventional",
	fha: "FHA",
	va: "VA"
};
var CLOSE_DAYS = {
	cash: 14,
	conventional: 30,
	fha: 45,
	va: 45
};
var SERIOUS = /\b(foundation|roof|sewer|septic|mold|asbestos|flood|structural|galvanized|knob[-\s]?and[-\s]?tube)\b/i;
var WAIVE = /\bwaiv(e|ed|es|ing)\b|\bno inspection\b/i;
var STEPS = [
	{
		label: "Hour 1",
		text: "Walk it. Roof from the ground, the panel, the basement, the age plate on the furnace. Write what you saw. Do not tour the fixtures."
	},
	{
		label: "Hour 2",
		text: "Three closed sales. Same rough size, last ninety days, near enough to matter. The agent reads the prices out loud. If they sit above your ceiling, stop."
	},
	{
		label: "Hour 3",
		text: "Paper. An underwritten pre-approval for this price, or proof of funds dated this week. A website letter is not paper."
	},
	{
		label: "Hour 4",
		text: "Write the ceiling on paper and keep it on the table while the form is filled. A blank that would show a higher number stays empty."
	},
	{
		label: "Hour 5",
		text: "Send it once. Do not raise yourself because the listing refreshed."
	}
];
function formatUsd(amount) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	}).format(amount);
}
function validateFacts(facts) {
	if (parseMoney(facts.list) == null) return "The list price has to be a number.";
	if (parseMoney(facts.ceiling) == null) return "The ceiling has to be a number. It is the most you can close, not the number you hope they take.";
	if (parseLiquid(facts.liquid) == null) return "Cash you can wire has to be a number. Use 0 if it is zero.";
	const list = parseMoney(facts.list);
	const ceiling = parseMoney(facts.ceiling);
	if (list < 1e4 || ceiling < 1e4) return "This skill is for a house. Check the price.";
	return null;
}
function sprint(facts) {
	const list = parseMoney(facts.list);
	const ceiling = parseMoney(facts.ceiling);
	const liquid = parseLiquid(facts.liquid);
	const { market, money } = facts;
	const financed = money !== "cash";
	const days = CLOSE_DAYS[money];
	const defect = facts.defect.trim();
	const baseRefusals = refusalsFor(money, defect);
	if (financed && liquid <= 0) return stopped(market, money, "You have no cash to wire before closing. A financed offer needs earnest money that is already real.", "There is no second version of this offer with a nicer sentence.", baseRefusals);
	if (ceiling < Math.round(list * .9)) return stopped(market, money, "Your ceiling is more than ten percent under the list. Writing it only teaches the seller a number you cannot raise.", "There is no second version of this offer with a nicer sentence.", baseRefusals);
	if (market === "contested" && ceiling < list) return stopped(market, money, "The house is contested and your ceiling does not clear the list. Do not write it.", "Losing quietly is cheaper than winning a house you cannot close.", baseRefusals);
	if (market === "live" && ceiling < Math.round(list * .98)) return stopped(market, money, "A live listing will not come down far enough to meet this ceiling. Wait, or choose a different house.", "Do not send a number you already know they will use as a floor against someone else.", baseRefusals);
	const overCap = Math.round(list * .03);
	const offer = market === "contested" ? list : priceFor(list, ceiling, market);
	if (financed && earnestFor(offer, market) > liquid) return stopped(market, money, `The earnest money would be ${formatUsd(earnestFor(offer, market))}. You can wire ${formatUsd(liquid)}. Do not thin the deposit to force the form.`, "Wait until the cash is real. A smaller deposit is not a strategy.", baseRefusals);
	const earnest = earnestFor(offer, market);
	const price = formatUsd(offer);
	const earnestText = formatUsd(earnest);
	const increment = list >= 5e5 ? 5e3 : 2e3;
	const escalationCap = capFor(list, ceiling, liquid, financed, overCap, earnest);
	const canEscalate = market === "contested" && escalationCap >= offer + increment;
	const terms = [
		{
			label: "Earnest",
			text: `${earnestText}, held by the closing agent. You get it back if you walk during the inspection. You can lose it if you miss a date you agreed to, or if you refuse to close after the contingencies are gone. Read that paragraph on the form before you sign it.`
		},
		{
			label: "Close",
			text: `${days} days. That is what this money actually takes. Do not let the form say faster.`
		},
		{
			label: "Inspection",
			text: inspectionText(defect)
		},
		{
			label: "Appraisal",
			text: appraisalText(money, offer, list, canEscalate ? escalationCap : offer)
		},
		{
			label: "Escalation",
			text: canEscalate ? `Only against a competing offer shown in writing. Beat it by ${formatUsd(increment)}, and stop at ${formatUsd(escalationCap)}. If you are the only offer, there is no escalation.` : "No escalation clause. The number on the form is the number."
		}
	];
	if (market === "quiet") terms.unshift({
		label: "The discount",
		text: "Three percent under is only because the house has sat. If the three closed sales print at the list, change this to the list before you send. You are not owed a discount for noticing."
	});
	const steps = seriousDefect(defect) ? [{
		label: "Before",
		text: "A specialist walks the defect you already named. The form waits. If you send the offer first, you have decided to own that defect."
	}, ...STEPS] : STEPS;
	const say = canEscalate ? `Offer ${price}, close in ${days} days, earnest ${earnestText}, seven-day inspection with the right to walk away. Escalate only with written proof, by ${formatUsd(increment)}, and stop at ${formatUsd(escalationCap)}. Do not waive anything I did not just say.` : `Offer ${price}, close in ${days} days, earnest ${earnestText}, seven-day inspection with the right to walk away. Do not waive anything I did not just say.`;
	return {
		write: true,
		eyebrow: `${MARKET_LABEL[market]} · ${MONEY_LABEL[money]}`,
		thesis: canEscalate ? `Offer ${price}. Escalate only against a written offer, and stop at ${formatUsd(escalationCap)}. The stop stays off the offer line.` : `Offer ${price}. The inspection stays. The ceiling stays off the form.`,
		price,
		terms,
		steps,
		say,
		kill: "If the three closed sales are above your ceiling, you are not in this house. If they are well under this offer, you are paying for a story. Either one ends it.",
		refusals: baseRefusals
	};
}
function toPlainText(facts, result) {
	const lines = [
		"HOUSE OFFER SPRINT",
		result.eyebrow,
		"",
		result.thesis,
		result.price ? `Offer: ${result.price}` : "",
		result.price ? `Ceiling (not on the form): ${formatUsd(parseMoney(facts.ceiling))}` : "",
		""
	];
	if (result.terms.length) {
		lines.push("TERMS");
		for (const term of result.terms) lines.push(`${term.label}. ${term.text}`);
		lines.push("");
	}
	if (result.steps.length) {
		lines.push("SPRINT");
		for (const step of result.steps) lines.push(`${step.label}. ${step.text}`);
		lines.push("");
	}
	if (result.say) {
		lines.push("SAY THIS");
		lines.push(result.say);
		lines.push("");
	}
	lines.push("KILL");
	lines.push(result.kill);
	lines.push("");
	lines.push("REFUSED");
	for (const line of result.refusals) lines.push(line);
	return lines.filter((line, index, all) => line !== "" || all[index - 1] !== "").join("\n");
}
function priceFor(list, ceiling, market) {
	if (market === "quiet") {
		const start = Math.floor(list * .97 / stepFor(list)) * stepFor(list);
		return underCeiling(Math.min(start, ceiling), ceiling);
	}
	return underCeiling(Math.min(list, ceiling), ceiling);
}
function capFor(list, ceiling, liquid, financed, overCap, earnest) {
	const top = Math.min(ceiling, list + overCap);
	if (!financed) return top;
	return Math.min(top, list + Math.max(0, liquid - earnest));
}
function underCeiling(amount, ceiling) {
	if (amount <= ceiling) return amount;
	const step = stepFor(ceiling);
	return Math.floor(ceiling / step) * step;
}
function earnestFor(base, market) {
	const rate = market === "quiet" ? .01 : market === "live" ? .015 : .02;
	const step = stepFor(base);
	return Math.max(step, Math.round(base * rate / step) * step);
}
function stepFor(amount) {
	return amount < 5e4 ? 100 : 500;
}
function inspectionText(defect) {
	const parts = ["Seven days. You may terminate for any reason during them. You do not send a repair grocery list. A failed roof, foundation, sewer, or active water means you walk."];
	if (seriousDefect(defect)) parts.push("You already named a system that fails houses. The offer does not go out until someone who fixes that system has walked it.");
	else if (defect) parts.push("What you already noticed goes into the inspection. It is not a discount you invent tonight.");
	return parts.join(" ");
}
function appraisalText(money, offer, list, exposure) {
	if (money === "cash") return "You are paying cash. Do not add an appraisal-gap promise. There is no loan to come up short.";
	const over = Math.max(0, exposure - list);
	if (over === 0 || offer > list) return "No appraisal-gap promise. A short appraisal is a reason to renegotiate or walk, not a bill you signed in advance.";
	return `If an escalation puts you over the list, cover a short appraisal only up to ${formatUsd(over)}. That cash is already real. Do not promise it on a price you have not reached.`;
}
function refusalsFor(money, defect) {
	const lines = [
		"No waived inspection. Not for a contest, not for a seller who asks, not for a house you love.",
		"No letter about who you are. The seller gets the number and the terms.",
		"Nothing above the ceiling, including just this once.",
		"Nothing more than three percent over the asking price. If the comps are higher than that, this list is the wrong conversation.",
		"This is not the contract. The form your agent uses is the contract. This is the posture you do not let that form talk you out of."
	];
	if (money !== "cash") lines.push("No promise to cover an appraisal gap larger than the cash you can actually wire.");
	if (money === "fha" || money === "va") lines.push("No fourteen-day close. Those loans do not move that fast, and the seller will find out.");
	if (WAIVE.test(defect)) lines.unshift("You asked to waive the inspection. The skill will not write that.");
	return lines;
}
function seriousDefect(defect) {
	return SERIOUS.test(defect);
}
function stopped(market, money, thesis, kill, refusals) {
	return {
		write: false,
		eyebrow: `${MARKET_LABEL[market]} · ${MONEY_LABEL[money]} · Do not send`,
		thesis,
		price: null,
		terms: [],
		steps: [],
		say: null,
		kill,
		refusals
	};
}
function parseMoney(raw) {
	const cleaned = raw.replace(/[$,\s]/g, "");
	if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return null;
	const amount = Math.round(Number(cleaned));
	if (!Number.isFinite(amount) || amount <= 0) return null;
	return amount;
}
function parseLiquid(raw) {
	const cleaned = raw.replace(/[$,\s]/g, "");
	if (cleaned === "") return null;
	if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return null;
	const amount = Math.round(Number(cleaned));
	if (!Number.isFinite(amount) || amount < 0) return null;
	return amount;
}
var STORAGE_KEY = "house-offer-sprint.v1";
var EMPTY = {
	list: "",
	ceiling: "",
	liquid: "",
	market: "live",
	money: "conventional",
	defect: ""
};
function SprintApp() {
	const [facts, setFacts] = (0, import_react.useState)(EMPTY);
	const [result, setResult] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return;
			const saved = JSON.parse(raw);
			if (saved.facts) setFacts({
				...EMPTY,
				...saved.facts
			});
			if (saved.result) setResult(saved.result);
		} catch {
			localStorage.removeItem(STORAGE_KEY);
		}
	}, []);
	function patch(partial) {
		setError(null);
		setCopied(false);
		setFacts((current) => ({
			...current,
			...partial
		}));
	}
	function submit(event) {
		event.preventDefault();
		const problem = validateFacts(facts);
		if (problem) {
			setError(problem);
			setResult(null);
			return;
		}
		const next = sprint(facts);
		setResult(next);
		localStorage.setItem(STORAGE_KEY, JSON.stringify({
			facts,
			result: next
		}));
		requestAnimationFrame(() => {
			const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			document.getElementById("sprint")?.scrollIntoView({
				behavior: reduce ? "auto" : "smooth",
				block: "start"
			});
		});
	}
	async function copy() {
		if (!result) return;
		try {
			await navigator.clipboard.writeText(toPlainText(facts, result));
			setCopied(true);
		} catch {
			setError("The sprint is on the page. Copy it from there.");
		}
	}
	function reset() {
		setFacts(EMPTY);
		setResult(null);
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
					children: "House Offer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs font-medium tracking-widest text-brass uppercase",
					children: "Sprint"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillNav, { current: "sprint" })
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
					children: "A posture, not a contract. Nothing is sent."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto w-full max-w-2xl px-4 py-6 md:px-8 md:py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-3xl leading-tight text-paper",
					children: "Write the offer you can survive."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "One house. The ceiling first. The skill will not waive the inspection, and it will not spend cash you did not name."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "mt-6 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "List price",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: facts.list,
								onChange: (event) => patch({ list: event.target.value }),
								inputMode: "decimal",
								placeholder: "425000",
								className: fieldClass,
								autoComplete: "off"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Your ceiling",
							hint: "The most you can close. This number never goes on the form.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: facts.ceiling,
								onChange: (event) => patch({ ceiling: event.target.value }),
								inputMode: "decimal",
								placeholder: "410000",
								className: fieldClass,
								autoComplete: "off"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Cash you can wire this week",
							hint: "Apart from the down payment. Earnest money, and anything over the list. Cash buyers can enter 0.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: facts.liquid,
								onChange: (event) => patch({ liquid: event.target.value }),
								inputMode: "decimal",
								placeholder: "15000",
								className: fieldClass,
								autoComplete: "off"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "text-xs font-medium tracking-widest text-muted uppercase",
								children: "The market"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 grid grid-cols-3 gap-2",
								children: MARKETS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-pressed": facts.market === item.id,
									onClick: () => patch({ market: item.id }),
									className: segmentClass(facts.market === item.id),
									children: item.label
								}, item.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: marketHint(facts.market)
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "text-xs font-medium tracking-widest text-muted uppercase",
							children: "The money"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 grid grid-cols-2 gap-2",
							children: MONEYS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": facts.money === item.id,
								onClick: () => patch({ money: item.id }),
								className: segmentClass(facts.money === item.id),
								children: item.label
							}, item.id))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "What you already know is wrong",
							hint: "Optional. A named defect waits for a specialist. A request to waive the inspection is refused.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: facts.defect,
								onChange: (event) => patch({ defect: event.target.value }),
								rows: 3,
								placeholder: "Roof, foundation, or nothing yet",
								className: fieldClass
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
							children: "Run the sprint"
						})
					]
				}),
				result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultView, {
					result,
					copied,
					onCopy: () => void copy(),
					onReset: reset
				}) : null
			]
		})]
	});
}
function marketHint(market) {
	if (market === "quiet") return "On the market past a month, and no one else is writing.";
	if (market === "contested") return "More than one offer, or it will be gone this week.";
	return "Showings, and still for sale. Not a bidding war.";
}
function ResultView({ result, copied, onCopy, onReset }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		id: "sprint",
		className: "mt-10 scroll-mt-6 space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-widest text-brass uppercase",
					children: result.eyebrow
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-serif text-2xl leading-snug text-paper",
					children: result.thesis
				}),
				result.price ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-serif text-4xl text-paper tabular-nums",
					children: result.price
				}) : null
			] }),
			result.terms.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Terms",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: result.terms.map((term) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-brass",
						children: term.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: term.text
					})] }, term.label))
				})
			}) : null,
			result.steps.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "The sprint",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "space-y-3",
					children: result.steps.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[4.5rem_1fr] gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brass",
							children: step.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: step.text })]
					}, step.label))
				})
			}) : null,
			result.say ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Say this",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-lg leading-snug",
					children: result.say
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Kill line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-lg leading-snug",
					children: result.kill
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Refused",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: result.refusals.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onCopy,
					className: "min-h-11 flex-1 rounded-lg bg-brass text-sm font-semibold text-ink",
					children: copied ? "Copied" : "Copy the sprint"
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
function segmentClass(on) {
	return cn("min-h-11 rounded-lg px-2 text-sm", on ? "bg-brass font-semibold text-ink" : "bg-surface text-paper shadow-card");
}
var fieldClass = "mt-2 w-full rounded-lg bg-surface px-3 py-3 text-base text-paper shadow-card placeholder:text-muted";
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SprintApp, {});
}
//#endregion
export { Home as component };
