import { i as __toESM } from "../_runtime.mjs";
import { q as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as cn, t as SkillNav } from "./cn-CG4oqDtT.mjs";
import { a as ChevronRight, i as Ellipsis, r as Search, t as X } from "../_libs/lucide-react.mjs";
import { t as format } from "../_libs/date-fns.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ledger-D5K5aGki.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BLOCKS = [
	{
		re: /\b\d{3}-\d{2}-\d{4}\b/,
		reason: "That looks like a Social Security number. It will not be stored."
	},
	{
		re: /\b\d{4}[ -]?\d{4}[ -]?\d{4}[ -]?\d{1,7}\b/,
		reason: "That looks like a card or account number. It will not be stored."
	},
	{
		re: /\b(?:password|passcode|pin|otp|cvv|cvc)\b\s*(?::|=|is)\s*\S+/i,
		reason: "Credentials and codes are never stored."
	},
	{
		re: /\b(?:api[_ -]?key|secret|access[_ -]?token|private[_ -]?key)\b\s*[:=]\s*\S+/i,
		reason: "Secrets are never stored."
	},
	{
		re: /\bsk-[a-zA-Z0-9]{10,}\b/,
		reason: "That looks like a secret key. It will not be stored."
	},
	{
		re: /\b(?:dob|d\.o\.b\.?|date of birth|born)\b\s*[:=]?\s*\d{1,2}[/-]\d{1,2}[/-]\d{2,4}/i,
		reason: "Dates of birth are never stored."
	},
	{
		re: /\b(?:account|routing|card)\s*(?:number|#|no\.?)?\s*[:=]?\s*\d{6,}\b/i,
		reason: "Account numbers are never stored."
	}
];
function privacyViolation(text) {
	for (const block of BLOCKS) if (block.re.test(text)) return block.reason;
	return null;
}
var STORES = [
	"identity",
	"people",
	"projects",
	"decisions"
];
var STORE_LABEL = {
	identity: "Identity",
	people: "People",
	projects: "Projects",
	decisions: "Decisions"
};
var TIER_LABEL = {
	observed: "Observed",
	inference: "Inference",
	unknown: "Unknown"
};
var KIND_LABEL = {
	identity: "Identity",
	preference: "Preference",
	rule: "Rule"
};
var STALE_MS = 7776e6;
function todayStamp(now = /* @__PURE__ */ new Date()) {
	return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
function emptyDraft(store, now = /* @__PURE__ */ new Date()) {
	return {
		store,
		title: "",
		body: "",
		implication: "",
		tier: "observed",
		confidence: "high",
		source: "",
		dated: todayStamp(now),
		supersedes: "",
		kind: store === "identity" ? "rule" : "",
		relationship: "",
		researchNote: "",
		state: "",
		nextAction: "",
		owner: "",
		overrides: ""
	};
}
function draftFromEntry(entry) {
	const { id: _id, recordedAt: _recordedAt, lastInfluencedAt: _used, ...draft } = entry;
	return draft;
}
function entryBlob(entry) {
	return [
		entry.title,
		entry.body,
		entry.implication,
		entry.source,
		entry.supersedes,
		entry.relationship,
		entry.researchNote,
		entry.state,
		entry.nextAction,
		entry.owner,
		entry.overrides
	].join("\n");
}
function validateDraft(draft) {
	if (!draft.title.trim()) return "Name it. An unnamed entry cannot be used.";
	if (draft.tier !== "unknown" && !draft.body.trim()) return "State the fact. If you do not know it, mark the tier Unknown and leave the fact blank.";
	if (!draft.implication.trim()) return "Name what this changes. If nothing changes, do not keep it.";
	if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.dated)) return "Date the entry.";
	return privacyViolation(entryBlob({
		...draft,
		id: "",
		recordedAt: "",
		lastInfluencedAt: null
	}));
}
function isStale(entry, now = Date.now()) {
	const mark = entry.lastInfluencedAt ?? entry.recordedAt;
	const then = Date.parse(mark);
	if (Number.isNaN(then)) return false;
	return now - then > STALE_MS;
}
function formatDay(iso) {
	const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
	if (!y || !m || !d) return iso;
	return format(new Date(y, m - 1, d), "d MMM yyyy");
}
function influenceLine(entry) {
	if (!entry.lastInfluencedAt) return "Not yet used";
	return `In force · ${formatDay(entry.lastInfluencedAt)}`;
}
function matchesQuery(entry, query) {
	const q = query.trim().toLowerCase();
	if (!q) return true;
	return entryBlob(entry).toLowerCase().includes(q) || entry.store.includes(q);
}
function sortByLeverage(entries, now = Date.now()) {
	return [...entries].sort((a, b) => {
		const staleDelta = Number(isStale(b, now)) - Number(isStale(a, now));
		if (staleDelta !== 0) return staleDelta;
		const dated = b.dated.localeCompare(a.dated);
		if (dated !== 0) return dated;
		return b.recordedAt.localeCompare(a.recordedAt);
	});
}
var STORE_SET = /* @__PURE__ */ new Set([
	"identity",
	"people",
	"projects",
	"decisions"
]);
function asString(value) {
	return typeof value === "string" ? value : "";
}
function parseLedger(raw) {
	const payload = raw && typeof raw === "object" && "entries" in raw ? raw.entries : raw;
	if (!Array.isArray(payload)) return { error: "This file is not a DeepMemory ledger." };
	if (payload.length > 500) return { error: "That ledger is larger than this desk will hold." };
	const entries = [];
	for (const item of payload) {
		if (!item || typeof item !== "object") return { error: "This file is not a DeepMemory ledger." };
		const row = item;
		const store = row.store;
		if (typeof row.id !== "string" || !row.id.trim()) return { error: "An entry is missing its id." };
		if (typeof store !== "string" || !STORE_SET.has(store)) return { error: "An entry names a store this ledger does not keep." };
		const tier = row.tier === "inference" || row.tier === "unknown" ? row.tier : "observed";
		const confidence = row.confidence === "low" || row.confidence === "medium" ? row.confidence : "high";
		const kind = row.kind === "identity" || row.kind === "preference" || row.kind === "rule" ? row.kind : "";
		const entry = {
			id: row.id,
			store,
			title: asString(row.title).trim(),
			body: asString(row.body),
			implication: asString(row.implication),
			tier,
			confidence,
			source: asString(row.source),
			dated: /^\d{4}-\d{2}-\d{2}/.test(asString(row.dated)) ? asString(row.dated).slice(0, 10) : todayFromUnknown(row.recordedAt),
			recordedAt: typeof row.recordedAt === "string" ? row.recordedAt : (/* @__PURE__ */ new Date()).toISOString(),
			lastInfluencedAt: typeof row.lastInfluencedAt === "string" ? row.lastInfluencedAt : null,
			supersedes: asString(row.supersedes),
			kind,
			relationship: asString(row.relationship),
			researchNote: asString(row.researchNote),
			state: asString(row.state),
			nextAction: asString(row.nextAction),
			owner: asString(row.owner),
			overrides: asString(row.overrides)
		};
		if (!entry.title || !entry.implication.trim()) return { error: "An entry failed the value test and was refused." };
		const blocked = privacyViolation(entryBlob(entry));
		if (blocked) return { error: blocked };
		entries.push(entry);
	}
	return { entries };
}
function todayFromUnknown(recordedAt) {
	if (typeof recordedAt === "string" && /^\d{4}-\d{2}-\d{2}/.test(recordedAt)) return recordedAt.slice(0, 10);
	const now = /* @__PURE__ */ new Date();
	const m = String(now.getMonth() + 1).padStart(2, "0");
	const d = String(now.getDate()).padStart(2, "0");
	return `${now.getFullYear()}-${m}-${d}`;
}
var TIERS = [
	{
		id: "observed",
		hint: "Seen or said."
	},
	{
		id: "inference",
		hint: "A guess. It stays labeled."
	},
	{
		id: "unknown",
		hint: "Leave the fact blank."
	}
];
var CONFIDENCE = [
	"high",
	"medium",
	"low"
];
var KINDS = [
	"rule",
	"preference",
	"identity"
];
function Composer({ draft, mode, onChange, onClose, onSubmit }) {
	const titleId = (0, import_react.useId)();
	const titleRef = (0, import_react.useRef)(null);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		titleRef.current?.focus();
		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (event) => {
			if (event.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = previous;
			window.removeEventListener("keydown", onKey);
		};
	}, [onClose]);
	function patch(partial) {
		setError(null);
		onChange({
			...draft,
			...partial
		});
	}
	function submit(event) {
		event.preventDefault();
		const problem = validateDraft(draft);
		if (problem) {
			setError(problem);
			return;
		}
		onSubmit(draft);
	}
	const titleLabel = draft.store === "people" ? "Name, as given" : draft.store === "projects" ? "The work" : draft.store === "decisions" ? "What was decided" : "Name the rule";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-40 flex items-end justify-center sm:items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Close",
			className: "absolute inset-0 bg-ink/80",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": titleId,
			onSubmit: submit,
			className: "rise relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-surface shadow-pop sm:rounded-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3 border-b border-rule px-4 py-3 sm:px-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: titleId,
						className: "font-serif text-xl text-paper",
						children: mode === "record" ? "Record" : "Revise"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "If it changes nothing, it does not belong here."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						"aria-label": "Close the editor",
						className: "flex size-11 items-center justify-center rounded-lg text-muted hover:text-paper",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							className: "size-5",
							"aria-hidden": "true"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-5 overflow-y-auto px-4 py-4 sm:px-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "text-xs font-medium tracking-widest text-muted uppercase",
							children: "Store"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 grid grid-cols-2 gap-2",
							children: STORES.map((store) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segment, {
								pressed: draft.store === store,
								onClick: () => patch({
									store,
									kind: store === "identity" ? draft.kind || "rule" : ""
								}),
								children: STORE_LABEL[store]
							}, store))
						})] }),
						draft.store === "identity" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Kind",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-3 gap-2",
								children: KINDS.map((kind) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segment, {
									pressed: draft.kind === kind,
									onClick: () => patch({ kind }),
									children: kind === "identity" ? "Identity" : kind === "preference" ? "Preference" : "Rule"
								}, kind))
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: titleLabel,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: titleRef,
								value: draft.title,
								onChange: (event) => patch({ title: event.target.value }),
								className: fieldClass,
								autoComplete: "off"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: draft.tier === "unknown" ? "The fact — leave blank if unknown" : "The fact",
							hint: draft.tier === "inference" ? "This will always render as an inference." : void 0,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: draft.body,
								onChange: (event) => patch({ body: event.target.value }),
								rows: 4,
								className: cn(fieldClass, "resize-y font-serif")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "text-xs font-medium tracking-widest text-muted uppercase",
							children: "Tier"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 grid gap-2",
							children: TIERS.map((tier) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Segment, {
								pressed: draft.tier === tier.id,
								onClick: () => patch({ tier: tier.id }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "capitalize",
									children: tier.id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-normal text-muted",
									children: [" — ", tier.hint]
								})]
							}, tier.id))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "What this changes",
							hint: "Required. This is the only reason to keep the entry.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: draft.implication,
								onChange: (event) => patch({ implication: event.target.value }),
								rows: 3,
								placeholder: "The next decision this alters",
								className: cn(fieldClass, "resize-y font-serif")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreFields, {
							draft,
							onPatch: patch
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Date",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									value: draft.dated,
									onChange: (event) => patch({ dated: event.target.value }),
									className: fieldClass
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Source",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: draft.source,
									onChange: (event) => patch({ source: event.target.value }),
									placeholder: "Who or what",
									className: fieldClass,
									autoComplete: "off"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "text-xs font-medium tracking-widest text-muted uppercase",
							children: "Confidence"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 grid grid-cols-3 gap-2",
							children: CONFIDENCE.map((level) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segment, {
								pressed: draft.confidence === level,
								onClick: () => patch({ confidence: level }),
								children: level === "high" ? "High" : level === "medium" ? "Medium" : "Low"
							}, level))
						})] }),
						mode === "revise" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "What this replaces",
							hint: "Name the wording or decision this correction overrides.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: draft.supersedes,
								onChange: (event) => patch({ supersedes: event.target.value }),
								rows: 2,
								className: cn(fieldClass, "resize-y")
							})
						}) : null,
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							className: "rounded-lg border-l-2 border-l-brass bg-raised px-3 py-3 text-sm text-paper",
							children: error
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "dock border-t border-rule px-4 pt-3 sm:px-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "min-h-11 w-full rounded-lg bg-brass px-4 text-sm font-semibold text-ink transition-opacity duration-150 hover:opacity-90",
						children: mode === "record" ? "Keep in the ledger" : "Save the correction"
					})
				})
			]
		})]
	});
}
function StoreFields({ draft, onPatch }) {
	if (draft.store === "people") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label: "Relationship, only as stated",
		hint: "Leave this empty if it was never named.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value: draft.relationship,
			onChange: (event) => onPatch({ relationship: event.target.value }),
			className: fieldClass,
			autoComplete: "off"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label: "Research note",
		hint: "So this lookup is never repeated.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value: draft.researchNote,
			onChange: (event) => onPatch({ researchNote: event.target.value }),
			className: fieldClass,
			autoComplete: "off"
		})
	})] });
	if (draft.store === "projects") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-2 gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "State",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: draft.state,
				onChange: (event) => onPatch({ state: event.target.value }),
				placeholder: "Active, blocked",
				className: fieldClass
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Owner",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: draft.owner,
				onChange: (event) => onPatch({ owner: event.target.value }),
				className: fieldClass
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label: "Next action",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value: draft.nextAction,
			onChange: (event) => onPatch({ nextAction: event.target.value }),
			className: fieldClass
		})
	})] });
	if (draft.store === "decisions") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label: "What this overrides",
		hint: "Then forget the entry it replaces, if it should not remain.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			value: draft.overrides,
			onChange: (event) => onPatch({ overrides: event.target.value }),
			rows: 2,
			className: cn(fieldClass, "resize-y")
		})
	});
	return null;
}
var fieldClass = "mt-2 w-full rounded-lg bg-raised px-3 py-3 text-base text-paper shadow-card placeholder:text-muted/70";
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-medium tracking-widest text-muted uppercase",
				children: label
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-sm text-muted normal-case",
				children: hint
			}) : null,
			children
		]
	});
}
function Segment({ pressed, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-pressed": pressed,
		onClick,
		className: cn("min-h-11 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150", pressed ? "bg-brass text-ink" : "bg-raised text-paper shadow-card hover:text-brass"),
		children
	});
}
function EntryCard({ entry, lead, onRevise, onForget, onUsed }) {
	const [confirming, setConfirming] = (0, import_react.useState)(false);
	const stale = isStale(entry);
	const kind = entry.store === "identity" && entry.kind ? KIND_LABEL[entry.kind] : STORE_LABEL[entry.store];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("rounded-2xl bg-surface p-4 shadow-card transition-shadow duration-200 hover:shadow-card-hover sm:p-5", entry.tier === "inference" && "border-l-2 border-l-brass", entry.tier === "unknown" && "border-l-2 border-dashed border-l-muted"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-medium tracking-widest text-brass uppercase",
					children: [
						kind,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [" · ", TIER_LABEL[entry.tier]]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [" · ", formatDay(entry.dated)]
						})
					]
				}), stale ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 text-xs font-medium tracking-wide text-brass uppercase",
					children: "Stale"
				}) : null]
			}),
			lead === "implication" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-serif text-xl leading-snug font-medium break-words text-paper",
				children: entry.implication
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "group mt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
					className: "flex min-h-11 items-center gap-2 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
							className: "size-4 shrink-0 transition-transform duration-200 group-open:rotate-90",
							"aria-hidden": "true"
						}),
						"The fact · ",
						entry.title
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FactBody, { entry })]
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-serif text-xl leading-snug font-medium break-words text-paper",
					children: entry.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FactBody, { entry }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 rounded-lg bg-raised px-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-widest text-brass uppercase",
						children: "Because of this"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-serif text-base leading-snug break-words text-paper",
						children: entry.implication
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Extras, { entry }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm text-muted",
				children: [
					entry.source ? `${entry.source} · ` : null,
					entry.confidence === "high" ? "High" : entry.confidence === "medium" ? "Medium" : "Low",
					" · ",
					influenceLine(entry)
				]
			}),
			entry.supersedes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted",
				children: ["Replaces: ", entry.supersedes]
			}) : null,
			stale ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-brass",
				children: "Ninety days without changing an action. Forget it, or mark that it still does."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex border-t border-rule",
				children: confirming ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardAction, {
					onClick: () => onForget(entry.id),
					emphasis: true,
					children: "Forget everywhere"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardAction, {
					onClick: () => setConfirming(false),
					children: "Keep"
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardAction, {
						onClick: () => onUsed(entry.id),
						children: "Mark used"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardAction, {
						onClick: () => onRevise(entry),
						children: "Revise"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardAction, {
						onClick: () => setConfirming(true),
						children: "Forget"
					})
				] })
			})
		]
	});
}
function FactBody({ entry }) {
	if (entry.tier === "unknown" && !entry.body.trim()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-2 text-sm text-muted italic",
		children: "Unknown. Left blank."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("mt-2 font-serif text-base leading-relaxed break-words text-paper", entry.tier === "inference" && "italic"),
		children: entry.body
	});
}
function Extras({ entry }) {
	const lines = [];
	if (entry.store === "people" && entry.relationship.trim()) lines.push({
		label: "As stated",
		value: entry.relationship.trim()
	});
	if (entry.store === "people" && entry.researchNote.trim()) lines.push({
		label: "Already looked up",
		value: entry.researchNote.trim()
	});
	if (entry.store === "projects" && entry.state.trim()) lines.push({
		label: "State",
		value: entry.state.trim()
	});
	if (entry.store === "projects" && entry.nextAction.trim()) lines.push({
		label: "Next",
		value: entry.nextAction.trim()
	});
	if (entry.store === "projects" && entry.owner.trim()) lines.push({
		label: "Owner",
		value: entry.owner.trim()
	});
	if (entry.store === "decisions" && entry.overrides.trim()) lines.push({
		label: "Overrides",
		value: entry.overrides.trim()
	});
	if (lines.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
		className: "mt-4 space-y-2",
		children: lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[5.5rem_1fr] gap-3 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-muted",
				children: line.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "text-paper",
				children: line.value
			})]
		}, line.label))
	});
}
function CardAction({ children, onClick, emphasis = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("min-h-11 flex-1 px-2 text-sm transition-colors duration-150 hover:text-brass", emphasis ? "font-medium text-brass" : "text-paper"),
		children
	});
}
var STAMP = "2026-10-31";
var AT = "2026-10-31T09:00:00.000Z";
function rule(partial) {
	return {
		store: "identity",
		tier: "observed",
		confidence: "high",
		source: "Standing brief",
		dated: STAMP,
		recordedAt: AT,
		lastInfluencedAt: AT,
		supersedes: "",
		kind: "rule",
		relationship: "",
		researchNote: "",
		state: "",
		nextAction: "",
		owner: "",
		overrides: "",
		...partial
	};
}
var DOCTRINE = [
	rule({
		id: "doctrine-value",
		title: "The value test",
		body: "Store a fact only when it will change a future decision. One exact, dated, sourced fact outweighs ten impressions.",
		implication: "If you cannot say what this changes, do not keep it."
	}),
	rule({
		id: "doctrine-leverage",
		title: "Leverage, not a trophy case",
		body: "Every entry carries the action it changes. An entry that has not influenced an action in 90 days is a candidate for deletion, not for an archive.",
		implication: "Review what has gone quiet. Forget it, or mark that it changed an action. Do not keep a second copy just in case."
	}),
	rule({
		id: "doctrine-tiers",
		title: "Three tiers, never mixed",
		body: "A claim is observed, an inference, or unknown. Observed is what was seen or said. An inference stays labeled as an inference. Unknown stays blank.",
		implication: "Never present an inference as a fact, and never fill an unknown by guessing."
	}),
	rule({
		id: "doctrine-ties",
		title: "Unnamed ties stay unnamed",
		body: "Record a relationship only in the words that were actually used. A tie that has not been named is not a gap to fill.",
		implication: "Leave relationship empty when it was not stated. Do not invent friend, colleague, or kin."
	}),
	rule({
		id: "doctrine-privacy",
		title: "Privacy is a hard stop",
		body: "Never store a date of birth, a credential, a verification code, a financial account number, or anything you were told to forget.",
		implication: "Refuse those on sight. Forget means delete everywhere, immediately, with nothing left behind."
	}),
	rule({
		id: "doctrine-corrections",
		title: "Corrections propagate",
		body: "When a new fact conflicts with an entry, say so and reconcile it. A correction updates the entry in the same sitting. Closed work is removed, not filed away.",
		implication: "On a conflict, revise the entry and name what it replaces. Do not silently overwrite, and do not keep both versions."
	})
];
function cloneDoctrine() {
	return DOCTRINE.map((entry) => ({ ...entry }));
}
var memoryStorage = createJSONStorage(() => typeof window === "undefined" ? {
	getItem: () => null,
	setItem: () => void 0,
	removeItem: () => void 0
} : localStorage);
var useMemory = create()(persist((set, get) => ({
	entries: cloneDoctrine(),
	add: (draft) => {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		set({ entries: [{
			...draft,
			title: draft.title.trim(),
			id: crypto.randomUUID(),
			recordedAt: now,
			lastInfluencedAt: null
		}, ...get().entries] });
	},
	revise: (id, draft) => {
		set({ entries: get().entries.map((entry) => entry.id === id ? {
			...entry,
			...draft,
			title: draft.title.trim(),
			id: entry.id,
			recordedAt: entry.recordedAt,
			lastInfluencedAt: entry.lastInfluencedAt
		} : entry) });
	},
	forget: (id) => {
		set({ entries: get().entries.filter((entry) => entry.id !== id) });
	},
	markUsed: (id) => {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		set({ entries: get().entries.map((entry) => entry.id === id ? {
			...entry,
			lastInfluencedAt: now
		} : entry) });
	},
	restoreDoctrine: () => set({ entries: cloneDoctrine() }),
	mergeLedger: (raw) => {
		const parsed = parseLedger(raw);
		if ("error" in parsed) return parsed.error;
		const byId = new Map(get().entries.map((entry) => [entry.id, entry]));
		for (const entry of parsed.entries) byId.set(entry.id, entry);
		set({ entries: [...byId.values()] });
		return null;
	}
}), {
	name: "deepmemory.v1",
	skipHydration: true,
	storage: memoryStorage,
	partialize: (state) => ({ entries: state.entries })
}));
var VIEWS = [{
	id: "directives",
	label: "Directives"
}, ...STORES.map((id) => ({
	id,
	label: STORE_LABEL[id]
}))];
var EMPTY = {
	identity: {
		title: "No standing rules.",
		body: "Identity holds who someone is, how they want to be addressed, and the rules that stay in force. Every rule is dated."
	},
	people: {
		title: "No one is recorded.",
		body: "A person enters as they were stated. A tie you have not named stays unnamed. Do not fill a blank by guessing."
	},
	projects: {
		title: "No active work.",
		body: "Projects keep state, the next action, and an owner. Closed work is removed, not archived."
	},
	decisions: {
		title: "No decisions yet.",
		body: "Record what was decided, when, and what it overrode. A correction replaces the earlier line. It does not sit beside it."
	}
};
function MemoryApp() {
	const entries = useMemory((state) => state.entries);
	const add = useMemory((state) => state.add);
	const revise = useMemory((state) => state.revise);
	const forget = useMemory((state) => state.forget);
	const markUsed = useMemory((state) => state.markUsed);
	const restoreDoctrine = useMemory((state) => state.restoreDoctrine);
	const mergeLedger = useMemory((state) => state.mergeLedger);
	const [view, setView] = (0, import_react.useState)("directives");
	const [query, setQuery] = (0, import_react.useState)("");
	const [staleOnly, setStaleOnly] = (0, import_react.useState)(false);
	const [editor, setEditor] = (0, import_react.useState)(null);
	const [menu, setMenu] = (0, import_react.useState)(false);
	const [menuConfirm, setMenuConfirm] = (0, import_react.useState)(null);
	const [notice, setNotice] = (0, import_react.useState)(null);
	const fileRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		useMemory.persist.rehydrate();
	}, []);
	const staleCount = (0, import_react.useMemo)(() => entries.filter((entry) => isStale(entry)).length, [entries]);
	const visible = (0, import_react.useMemo)(() => {
		return sortByLeverage((view === "directives" ? entries : entries.filter((entry) => entry.store === view)).filter((entry) => {
			if (staleOnly && !isStale(entry)) return false;
			return matchesQuery(entry, query);
		}));
	}, [
		entries,
		query,
		staleOnly,
		view
	]);
	function openRecord(store) {
		setEditor({
			mode: "record",
			draft: emptyDraft(store ?? (view === "directives" ? "identity" : view))
		});
	}
	function openRevise(entry) {
		setEditor({
			mode: "revise",
			id: entry.id,
			draft: draftFromEntry(entry)
		});
	}
	function exportLedger() {
		const blob = new Blob([JSON.stringify({
			deepmemory: 1,
			entries
		}, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "deepmemory.json";
		link.click();
		URL.revokeObjectURL(url);
		setMenu(false);
	}
	async function importLedger(file) {
		try {
			const parsed = JSON.parse(await file.text());
			const error = mergeLedger(parsed);
			setNotice(error ?? "Merged into the ledger. Matching ids were replaced.");
		} catch {
			setNotice("That file could not be read.");
		}
		setMenu(false);
	}
	const counts = (0, import_react.useMemo)(() => {
		const map = {
			directives: entries.length,
			identity: 0,
			people: 0,
			projects: 0,
			decisions: 0
		};
		for (const entry of entries) map[entry.store] += 1;
		return map;
	}, [entries]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen md:grid md:grid-cols-[15rem_minmax(0,1fr)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden border-r border-rule md:flex md:min-h-screen md:flex-col md:px-4 md:py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mt-8 flex flex-col gap-1",
						"aria-label": "Ledger",
						children: VIEWS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, {
							label: item.label,
							count: counts[item.id],
							current: view === item.id,
							onClick: () => setView(item.id)
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-auto space-y-2 pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => openRecord(),
							className: "min-h-11 w-full rounded-lg bg-brass px-3 text-sm font-semibold text-ink",
							children: "Record"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuBlock, {
							open: menu,
							confirm: menuConfirm,
							onToggle: () => {
								setMenu((open) => !open);
								setMenuConfirm(null);
							},
							onExport: exportLedger,
							onImport: () => fileRef.current?.click(),
							onAskRestore: () => setMenuConfirm("restore"),
							onRestore: () => {
								restoreDoctrine();
								setMenu(false);
								setMenuConfirm(null);
								setNotice("The standing brief is restored. Everything else is gone.");
							},
							onCancelRestore: () => setMenuConfirm(null)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-20 border-b border-rule bg-ink/90 px-4 py-4 backdrop-blur-md md:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto flex max-w-2xl items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "md:hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
										className: "mt-3 font-serif text-xl leading-tight text-paper md:mt-0 md:text-3xl",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "md:hidden",
											children: view === "directives" ? "Directives" : STORE_LABEL[view]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden md:inline",
											children: view === "directives" ? "What changes because of this" : STORE_LABEL[view]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-muted tabular-nums",
										children: [
											counts.directives,
											" kept · ",
											staleCount,
											" stale · nothing archived"
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "flex size-11 items-center justify-center rounded-lg text-muted md:hidden",
								"aria-label": "Ledger actions",
								"aria-expanded": menu,
								onClick: () => {
									setMenu((open) => !open);
									setMenuConfirm(null);
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, {
									className: "size-5",
									"aria-hidden": "true"
								})
							})]
						}),
						menu ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mt-3 max-w-2xl md:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuPanel, {
								confirm: menuConfirm,
								onExport: exportLedger,
								onImport: () => fileRef.current?.click(),
								onAskRestore: () => setMenuConfirm("restore"),
								onRestore: () => {
									restoreDoctrine();
									setMenu(false);
									setMenuConfirm(null);
									setNotice("The standing brief is restored. Everything else is gone.");
								},
								onCancelRestore: () => setMenuConfirm(null)
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mt-4 max-w-2xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "relative block",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sr-only",
										children: "Search the ledger"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
										className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted",
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: query,
										onChange: (event) => setQuery(event.target.value),
										placeholder: "Search the ledger",
										className: "min-h-11 w-full rounded-lg bg-surface pr-3 pl-10 text-base text-paper shadow-card placeholder:text-muted"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mt-3 flex max-w-2xl gap-2 overflow-x-auto md:hidden",
							children: VIEWS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-current": view === item.id ? "page" : void 0,
								onClick: () => setView(item.id),
								className: cn("min-h-11 shrink-0 rounded-full px-3 text-sm", view === item.id ? "bg-brass text-ink" : "bg-surface text-paper shadow-card"),
								children: [item.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 tabular-nums",
									children: counts[item.id]
								})]
							}, item.id))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "mx-auto max-w-2xl px-4 pt-4 pb-28 md:px-8 md:pt-6 md:pb-16",
					children: [
						view === "directives" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Only the action. The fact stays underneath, dated and sourced."
						}) : null,
						staleCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center justify-between gap-3 rounded-lg bg-surface px-3 py-3 shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-paper",
								children: staleCount === 1 ? "1 entry has not changed an action in 90 days." : `${staleCount} entries have not changed an action in 90 days.`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setStaleOnly((on) => !on),
								className: "min-h-11 shrink-0 px-2 text-sm text-brass",
								children: staleOnly ? "Show all" : "Review"
							})]
						}) : null,
						notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "status",
							className: "mt-4 text-sm text-brass",
							children: notice
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-3",
							children: visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
								view,
								searching: query.trim().length > 0 || staleOnly,
								onRecord: () => openRecord(view === "directives" ? void 0 : view)
							}) : visible.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntryCard, {
								entry,
								lead: view === "directives" ? "implication" : "fact",
								onRevise: openRevise,
								onForget: (id) => {
									forget(id);
									setNotice("Forgotten. Nothing was archived.");
								},
								onUsed: (id) => {
									markUsed(id);
									setNotice("Marked. This entry changed an action.");
								}
							}, entry.id))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dock fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-ink/95 px-4 pt-3 backdrop-blur-md md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => openRecord(),
					className: "min-h-11 w-full rounded-lg bg-brass text-sm font-semibold text-ink",
					children: "Record"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: fileRef,
				type: "file",
				accept: "application/json,.json",
				className: "sr-only",
				onChange: (event) => {
					const file = event.target.files?.[0];
					event.target.value = "";
					if (file) importLedger(file);
				}
			}),
			editor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Composer, {
				draft: editor.draft,
				mode: editor.mode,
				onChange: (draft) => setEditor({
					...editor,
					draft
				}),
				onClose: () => setEditor(null),
				onSubmit: (draft) => {
					if (editor.mode === "revise" && editor.id) revise(editor.id, draft);
					else add(draft);
					setEditor(null);
					setNotice(editor.mode === "revise" ? "Corrected in place." : "Kept in the ledger.");
					if (editor.mode === "record" && view !== "directives") setView(draft.store);
				}
			}) : null
		]
	});
}
function Brand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-serif text-2xl leading-none text-paper",
			children: "DeepMemory"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-xs font-medium tracking-widest text-brass uppercase",
			children: "Private ledger"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillNav, { current: "ledger" })
		})
	] });
}
function NavButton({ label, count, current, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		"aria-current": current ? "page" : void 0,
		onClick,
		className: cn("flex min-h-11 items-center justify-between rounded-lg px-3 text-left text-sm", current ? "bg-brass text-ink" : "text-paper hover:bg-surface"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular-nums",
			children: count
		})]
	});
}
function EmptyState({ view, searching, onRecord }) {
	if (searching) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-2xl bg-surface px-4 py-6 text-sm text-muted shadow-card",
		children: "Nothing in this view matches."
	});
	if (view === "directives") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-surface px-4 py-6 shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-xl text-paper",
				children: "The ledger is empty."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Record a fact only if you can say what it changes. Forget means delete. Nothing is archived."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onRecord,
				className: "mt-4 min-h-11 rounded-lg bg-brass px-4 text-sm font-semibold text-ink",
				children: "Record"
			})
		]
	});
	const copy = EMPTY[view];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-surface px-4 py-6 shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-xl text-paper",
				children: copy.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: copy.body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onRecord,
				className: "mt-4 min-h-11 rounded-lg bg-brass px-4 text-sm font-semibold text-ink",
				children: "Record"
			})
		]
	});
}
function MenuBlock(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: props.onToggle,
		"aria-expanded": props.open,
		className: "flex min-h-11 w-full items-center gap-2 rounded-lg px-3 text-left text-sm text-muted hover:text-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, {
			className: "size-4",
			"aria-hidden": "true"
		}), "Ledger"]
	}), props.open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuPanel, {
		confirm: props.confirm,
		onExport: props.onExport,
		onImport: props.onImport,
		onAskRestore: props.onAskRestore,
		onRestore: props.onRestore,
		onCancelRestore: props.onCancelRestore
	}) : null] });
}
function MenuPanel({ confirm, onExport, onImport, onAskRestore, onRestore, onCancelRestore }) {
	if (confirm === "restore") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-surface p-3 shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-paper",
			children: "This replaces the ledger with the standing brief. Your other entries are forgotten, not archived."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onRestore,
				className: "min-h-11 flex-1 rounded-lg bg-brass text-sm font-semibold text-ink",
				children: "Restore"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onCancelRestore,
				className: "min-h-11 flex-1 rounded-lg text-sm text-muted",
				children: "Keep"
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-lg bg-surface shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
				onClick: onExport,
				children: "Export JSON"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
				onClick: onImport,
				children: "Import JSON"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
				onClick: onAskRestore,
				children: "Restore the standing brief"
			})
		]
	});
}
function MenuItem({ children, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: "block min-h-11 w-full border-b border-rule px-3 text-left text-sm text-paper last:border-b-0 hover:text-brass",
		children
	});
}
function Ledger() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryApp, {});
}
//#endregion
export { Ledger as component };
