export type Market = "quiet" | "live" | "contested";
export type Money = "cash" | "conventional" | "fha" | "va";

export type Facts = {
  list: string;
  ceiling: string;
  liquid: string;
  market: Market;
  money: Money;
  defect: string;
};

export type Line = { label: string; text: string };

export type Result = {
  write: boolean;
  eyebrow: string;
  thesis: string;
  price: string | null;
  terms: Line[];
  steps: Line[];
  say: string | null;
  kill: string;
  refusals: string[];
};

export const SKILL = [
  "Write the ceiling before anyone opens a form.",
  "The inspection is not a bargaining chip.",
  "Do not bid with money you cannot lose.",
  "Three closed sales, read aloud, before you send.",
  "One offer. Then stop refreshing the listing.",
];

export const MARKETS: { id: Market; label: string }[] = [
  { id: "quiet", label: "Quiet" },
  { id: "live", label: "Live" },
  { id: "contested", label: "Contested" },
];

export const MONEYS: { id: Money; label: string }[] = [
  { id: "cash", label: "Cash" },
  { id: "conventional", label: "Conventional" },
  { id: "fha", label: "FHA" },
  { id: "va", label: "VA" },
];

const MARKET_LABEL: Record<Market, string> = {
  quiet: "Quiet",
  live: "Live",
  contested: "Contested",
};

const MONEY_LABEL: Record<Money, string> = {
  cash: "Cash",
  conventional: "Conventional",
  fha: "FHA",
  va: "VA",
};

const CLOSE_DAYS: Record<Money, number> = {
  cash: 14,
  conventional: 30,
  fha: 45,
  va: 45,
};

const SERIOUS =
  /\b(foundation|roof|sewer|septic|mold|asbestos|flood|structural|galvanized|knob[-\s]?and[-\s]?tube)\b/i;
const WAIVE = /\bwaiv(e|ed|es|ing)\b|\bno inspection\b/i;

const STEPS: Line[] = [
  {
    label: "Hour 1",
    text: "Walk it. Roof from the ground, the panel, the basement, the age plate on the furnace. Write what you saw. Do not tour the fixtures.",
  },
  {
    label: "Hour 2",
    text: "Three closed sales. Same rough size, last ninety days, near enough to matter. The agent reads the prices out loud. If they sit above your ceiling, stop.",
  },
  {
    label: "Hour 3",
    text: "Paper. An underwritten pre-approval for this price, or proof of funds dated this week. A website letter is not paper.",
  },
  {
    label: "Hour 4",
    text: "Write the ceiling on paper and keep it on the table while the form is filled. A blank that would show a higher number stays empty.",
  },
  {
    label: "Hour 5",
    text: "Send it once. Do not raise yourself because the listing refreshed.",
  },
];

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function validateFacts(facts: Facts): string | null {
  if (parseMoney(facts.list) == null) return "The list price has to be a number.";
  if (parseMoney(facts.ceiling) == null) {
    return "The ceiling has to be a number. It is the most you can close, not the number you hope they take.";
  }
  if (parseLiquid(facts.liquid) == null) {
    return "Cash you can wire has to be a number. Use 0 if it is zero.";
  }
  const list = parseMoney(facts.list)!;
  const ceiling = parseMoney(facts.ceiling)!;
  if (list < 10_000 || ceiling < 10_000) {
    return "This skill is for a house. Check the price.";
  }
  return null;
}

export function sprint(facts: Facts): Result {
  const list = parseMoney(facts.list)!;
  const ceiling = parseMoney(facts.ceiling)!;
  const liquid = parseLiquid(facts.liquid)!;
  const { market, money } = facts;
  const financed = money !== "cash";
  const days = CLOSE_DAYS[money];
  const defect = facts.defect.trim();

  const baseRefusals = refusalsFor(money, defect);

  if (financed && liquid <= 0) {
    return stopped(
      market,
      money,
      "You have no cash to wire before closing. A financed offer needs earnest money that is already real.",
      "There is no second version of this offer with a nicer sentence.",
      baseRefusals,
    );
  }

  if (ceiling < Math.round(list * 0.9)) {
    return stopped(
      market,
      money,
      "Your ceiling is more than ten percent under the list. Writing it only teaches the seller a number you cannot raise.",
      "There is no second version of this offer with a nicer sentence.",
      baseRefusals,
    );
  }

  if (market === "contested" && ceiling < list) {
    return stopped(
      market,
      money,
      "The house is contested and your ceiling does not clear the list. Do not write it.",
      "Losing quietly is cheaper than winning a house you cannot close.",
      baseRefusals,
    );
  }

  if (market === "live" && ceiling < Math.round(list * 0.98)) {
    return stopped(
      market,
      money,
      "A live listing will not come down far enough to meet this ceiling. Wait, or choose a different house.",
      "Do not send a number you already know they will use as a floor against someone else.",
      baseRefusals,
    );
  }

  const overCap = Math.round(list * 0.03);
  const offer =
    market === "contested" ? list : priceFor(list, ceiling, market);

  if (financed && earnestFor(offer, market) > liquid) {
    return stopped(
      market,
      money,
      `The earnest money would be ${formatUsd(earnestFor(offer, market))}. You can wire ${formatUsd(liquid)}. Do not thin the deposit to force the form.`,
      "Wait until the cash is real. A smaller deposit is not a strategy.",
      baseRefusals,
    );
  }

  const earnest = earnestFor(offer, market);
  const price = formatUsd(offer);
  const earnestText = formatUsd(earnest);
  const increment = list >= 500_000 ? 5_000 : 2_000;
  const escalationCap = capFor(list, ceiling, liquid, financed, overCap, earnest);
  const canEscalate = market === "contested" && escalationCap >= offer + increment;

  const terms: Line[] = [
    {
      label: "Earnest",
      text: `${earnestText}, held by the closing agent. You get it back if you walk during the inspection. You can lose it if you miss a date you agreed to, or if you refuse to close after the contingencies are gone. Read that paragraph on the form before you sign it.`,
    },
    {
      label: "Close",
      text: `${days} days. That is what this money actually takes. Do not let the form say faster.`,
    },
    {
      label: "Inspection",
      text: inspectionText(defect),
    },
    {
      label: "Appraisal",
      text: appraisalText(money, offer, list, canEscalate ? escalationCap : offer),
    },
    {
      label: "Escalation",
      text: canEscalate
        ? `Only against a competing offer shown in writing. Beat it by ${formatUsd(increment)}, and stop at ${formatUsd(escalationCap)}. If you are the only offer, there is no escalation.`
        : "No escalation clause. The number on the form is the number.",
    },
  ];

  if (market === "quiet") {
    terms.unshift({
      label: "The discount",
      text: "Three percent under is only because the house has sat. If the three closed sales print at the list, change this to the list before you send. You are not owed a discount for noticing.",
    });
  }

  const steps = seriousDefect(defect)
    ? [
        {
          label: "Before",
          text: "A specialist walks the defect you already named. The form waits. If you send the offer first, you have decided to own that defect.",
        },
        ...STEPS,
      ]
    : STEPS;

  const say = canEscalate
    ? `Offer ${price}, close in ${days} days, earnest ${earnestText}, seven-day inspection with the right to walk away. Escalate only with written proof, by ${formatUsd(increment)}, and stop at ${formatUsd(escalationCap)}. Do not waive anything I did not just say.`
    : `Offer ${price}, close in ${days} days, earnest ${earnestText}, seven-day inspection with the right to walk away. Do not waive anything I did not just say.`;

  return {
    write: true,
    eyebrow: `${MARKET_LABEL[market]} · ${MONEY_LABEL[money]}`,
    thesis: canEscalate
      ? `Offer ${price}. Escalate only against a written offer, and stop at ${formatUsd(escalationCap)}. The stop stays off the offer line.`
      : `Offer ${price}. The inspection stays. The ceiling stays off the form.`,
    price,
    terms,
    steps,
    say,
    kill: "If the three closed sales are above your ceiling, you are not in this house. If they are well under this offer, you are paying for a story. Either one ends it.",
    refusals: baseRefusals,
  };
}

export function toPlainText(facts: Facts, result: Result): string {
  const lines = [
    "HOUSE OFFER SPRINT",
    result.eyebrow,
    "",
    result.thesis,
    result.price ? `Offer: ${result.price}` : "",
    result.price ? `Ceiling (not on the form): ${formatUsd(parseMoney(facts.ceiling)!)}` : "",
    "",
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

function priceFor(list: number, ceiling: number, market: Market): number {
  if (market === "quiet") {
    const start = Math.floor((list * 0.97) / stepFor(list)) * stepFor(list);
    return underCeiling(Math.min(start, ceiling), ceiling);
  }
  return underCeiling(Math.min(list, ceiling), ceiling);
}

function capFor(
  list: number,
  ceiling: number,
  liquid: number,
  financed: boolean,
  overCap: number,
  earnest: number,
): number {
  const top = Math.min(ceiling, list + overCap);
  if (!financed) return top;
  return Math.min(top, list + Math.max(0, liquid - earnest));
}

function underCeiling(amount: number, ceiling: number): number {
  if (amount <= ceiling) return amount;
  const step = stepFor(ceiling);
  return Math.floor(ceiling / step) * step;
}

function earnestFor(base: number, market: Market): number {
  const rate = market === "quiet" ? 0.01 : market === "live" ? 0.015 : 0.02;
  const step = stepFor(base);
  return Math.max(step, Math.round((base * rate) / step) * step);
}

function stepFor(amount: number): number {
  return amount < 50_000 ? 100 : 500;
}

function inspectionText(defect: string): string {
  const parts = [
    "Seven days. You may terminate for any reason during them. You do not send a repair grocery list. A failed roof, foundation, sewer, or active water means you walk.",
  ];
  if (seriousDefect(defect)) {
    parts.push("You already named a system that fails houses. The offer does not go out until someone who fixes that system has walked it.");
  } else if (defect) {
    parts.push("What you already noticed goes into the inspection. It is not a discount you invent tonight.");
  }
  return parts.join(" ");
}

function appraisalText(money: Money, offer: number, list: number, exposure: number): string {
  if (money === "cash") {
    return "You are paying cash. Do not add an appraisal-gap promise. There is no loan to come up short.";
  }
  const over = Math.max(0, exposure - list);
  if (over === 0 || offer > list) {
    return "No appraisal-gap promise. A short appraisal is a reason to renegotiate or walk, not a bill you signed in advance.";
  }
  return `If an escalation puts you over the list, cover a short appraisal only up to ${formatUsd(over)}. That cash is already real. Do not promise it on a price you have not reached.`;
}

function refusalsFor(money: Money, defect: string): string[] {
  const lines = [
    "No waived inspection. Not for a contest, not for a seller who asks, not for a house you love.",
    "No letter about who you are. The seller gets the number and the terms.",
    "Nothing above the ceiling, including just this once.",
    "Nothing more than three percent over the asking price. If the comps are higher than that, this list is the wrong conversation.",
    "This is not the contract. The form your agent uses is the contract. This is the posture you do not let that form talk you out of.",
  ];
  if (money !== "cash") {
    lines.push("No promise to cover an appraisal gap larger than the cash you can actually wire.");
  }
  if (money === "fha" || money === "va") {
    lines.push("No fourteen-day close. Those loans do not move that fast, and the seller will find out.");
  }
  if (WAIVE.test(defect)) {
    lines.unshift("You asked to waive the inspection. The skill will not write that.");
  }
  return lines;
}

function seriousDefect(defect: string): boolean {
  return SERIOUS.test(defect);
}

function stopped(
  market: Market,
  money: Money,
  thesis: string,
  kill: string,
  refusals: string[],
): Result {
  return {
    write: false,
    eyebrow: `${MARKET_LABEL[market]} · ${MONEY_LABEL[money]} · Do not send`,
    thesis,
    price: null,
    terms: [],
    steps: [],
    say: null,
    kill,
    refusals,
  };
}

function parseMoney(raw: string): number | null {
  const cleaned = raw.replace(/[$,\s]/g, "");
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return null;
  const amount = Math.round(Number(cleaned));
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return amount;
}

function parseLiquid(raw: string): number | null {
  const cleaned = raw.replace(/[$,\s]/g, "");
  if (cleaned === "") return null;
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return null;
  const amount = Math.round(Number(cleaned));
  if (!Number.isFinite(amount) || amount < 0) return null;
  return amount;
}
