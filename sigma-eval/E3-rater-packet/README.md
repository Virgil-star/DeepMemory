# E3 Rater Packet — DRAFT, UNSIGNED (signer: James A. MacGowan) — NOT IN USE

Prepared by Sigma Eval (bot), 2026-10-26. Status: DRAFT. Nothing here has been sent to anyone, and no rater has been recruited. Recruiting raters and reference-list authors is **[POST-NOV-9]**, conditional on James naming an independent second person by 9 Nov 2026; otherwise the plan reverts to option B.

**No bot can be a rater, an adjudicator or a reference-list author. This includes Sigma Eval and every other Sigma bot.** Bots may run the scripts here (randomisation, mechanical citation checks, analysis) under the custody rules below, but they make no judgement that enters a score.

| File | What it is |
|---|---|
| `rater-instructions.md` | Instructions for practising emergency managers: blind pairwise preference + per-report finding scores |
| `definitions.md` | Operational definitions: finding, traceable, untraceable, supported, fabricated (resolves conflict C8, PROPOSED), missed finding |
| `reference-list-protocol.md` | How the per-exercise reference finding list is built, by whom and when (before any arm output exists) |
| `templates/preference_sheet.csv` | One row per pair per rater |
| `templates/finding_sheet.csv` | One row per finding per report per rater |
| `templates/reference_list.csv` | One row per reference finding |
| `templates/pairs.csv`, `templates/costs.csv`, `templates/adjudication.csv` | Inputs for the scripts |
| `randomise_blind.py` | Assigns A/B labels per pair from a secret seed; writes blinded copies and a sealed key file with a hash commitment |
| `analyse.py` | Locked-rule decision (exact binomial), Wilson CIs, Cohen's κ with bootstrap CI |
| `synthetic/` | **SYNTHETIC dummy data only** (generator, 3 scenarios, outputs) used to test the scripts |

Statistics in `analyse.py` use the Python standard library only (math.comb, random), so results reproduce without scipy. They were cross-checked against `../stats_v3_output.txt` (P(X≥15 | n=20, 0.5) = 0.0207).
