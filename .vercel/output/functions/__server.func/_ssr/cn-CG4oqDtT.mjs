import { x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cn-CG4oqDtT.js
var import_jsx_runtime = require_jsx_runtime();
var ITEMS = [
	{
		to: "/",
		label: "Sprint",
		id: "sprint"
	},
	{
		to: "/architect",
		label: "Architect",
		id: "architect"
	},
	{
		to: "/ledger",
		label: "Ledger",
		id: "ledger"
	}
];
function SkillNav({ current }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-wrap gap-x-4 gap-y-1",
		children: ITEMS.filter((item) => item.id !== current).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: item.to,
			className: "inline-flex min-h-11 items-center text-sm text-muted hover:text-paper",
			children: item.label
		}, item.id))
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
export { cn as n, SkillNav as t };
