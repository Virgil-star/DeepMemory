# Arm 2 Baseline — BUILD-READY SPEC (v2 register item 4) — DRAFT, UNSIGNED, NOT RUN

Author: Sigma Eval (bot), 2026-10-26. Decision-maker/signer: **James** (James A. MacGowan; handle Helios Eternal — name as relayed by CSO 2026-10-26, OPERATOR-SUPPLIED). Status: option A chosen (relayed by CSO); this spec is build-ready, but **nothing has been run, sent to any model, purchased or timestamped.**
Labels: FACT (source, date) · INFERENCE · PROPOSED · UNVERIFIED · **[JAMES]** = left open for James · **[POST-NOV-9]** = needs more than C0/public sources, conditional on an independent second person being named by 9 Nov 2026.
v2 definition (FACT, brief v2): "Gemini 4 Argon, the standard HSEEP AAR/IP template, and a fixed prompt requiring every finding to cite the exercise record by section or line. One engineer-day to build; frozen (prompt hash and date) before scoring."

## 0. Gates and scope (all binding)
1. **No exercise records go into any model — this arm included, test runs included — until James approves the vendor shortlist.** Enforced in code: `arm2_runner.py` refuses unless `GATES/vendor_shortlist_approved.txt` exists. Interpretation (PROPOSED, conservative): this covers the public interim-set documents too; James may relax it for public documents only.
2. **Paid, no-training Gemini API tier only.** Sigma Counsel reports that the unpaid tier uses submitted content to improve products and allows human review — *reported by Sigma Counsel, not independently verified by us.* FACT (https://ai.google.dev/gemini-api/docs/pricing, retrieved 2026-10-26): gemini-4-argon has no free tier; paid tier "Used to improve our products: No". Enforced, two gates:

(a) The runner refuses unless `ARM2_TIER=paid`. This is a required flag only and does not prove the tier.

(b) **Pre-flight tier gate (added 2026-10-26, runner sha256 aee82bf6…bac1).** Before any record is read, the runner sends one no-record `generateContent` call ("Reply with OK.", maxOutputTokens 5). It aborts on any non-200 response or any response mentioning free_tier / Free Tier. A 429 is never retried, here or on the main call. The shakedown driver makes no countTokens call, because that would carry record text. Tested 2026-10-26 against the current key: it aborted with HTTP 429 Free Tier after 1 request with no record text, and the record file was never read (`runs/preflight-test-2026-10-26/test_result.json`). The prompts, template and config hashes are unchanged.
3. **Retention.** FACT (https://ai.google.dev/gemini-api/docs/interactions-overview and https://ai.google.dev/gemini-api/docs/zdr, via search 2026-10-26): the Interactions API stores interactions by default (`store=true`; 55 days on paid tier); `store=false` opts out but is incompatible with `background=true`; paid-tier prompts are still logged for a limited period for abuse monitoring; guaranteed zero retention requires Vertex AI. Spec sets `store:false`, no background, no Search grounding (grounding storage cannot be disabled — FACT, zdr page). Abuse-monitoring logging remains → counsel/L9 item.
4. **Budget: C0 (under $1k) and public sources only until 9 Nov 2026** (James's rule, relayed by CSO). Anything beyond is marked [POST-NOV-9]. If no independent human second person is named by 9 Nov, the plan reverts to option B and this arm runs only as desk design.
5. Frozen before scoring; no edits after freeze; re-hash and re-log if James changes a [JAMES] item.

## 1. Build kit (in /workspace/sigma-eval/arm2/, tested offline only)
| File | Purpose | Status |
|---|---|---|
| `system_prompt.txt` | Fixed system instruction incl. citation rule | Frozen candidate |
| `user_prompt_template.txt` | `{{TEMPLATE}}` + `{{RECORD}}` wrapper | Frozen candidate |
| `template_hseep2020_aar_ip.md` | HSEEP 2020 AAR/IP skeleton (§4) | Frozen candidate |
| `config.json` | Model + API settings (§2) | Frozen candidate; `thinking_level` is [JAMES] |
| `freeze.json` | SHA-256 of the four files above, created 2026-10-26T21:46:25Z | Internal hash only — NOT externally timestamped |
| `arm2_runner.py` | Builds request; refuses unless gates pass; `--dry-run` default; logs usage | Dry-run tested; never executed against API |
| `normalise.py` | Blinding normaliser for both arms (§7) | Tested on hand-written fixture |
| `check_citations.py` | Mechanical traceability: uncited / unresolvable citations | Tested on fixture |
| `selftest_fixture_report.md` | Hand-written dummy, labelled TEST FIXTURE | Not model output |
Implementation steps for a bot: (1) verify freeze.json hashes; (2) `python3 arm2_runner.py <item> --out <f> --dry-run` and check `gate_errors` is empty; (3) only after James's approvals, `--execute`; (4) extract output text, run `normalise.py`, then `check_citations.py <normalised> <item>`; (5) record cost from `usage` (§3); (6) hand normalised output to the non-rater blinding holder.

## 2. Model and API settings
| Setting | Value | Status |
|---|---|---|
| Endpoint | `POST https://generativelanguage.googleapis.com/v1beta/interactions`; body `{model, system_instruction, input, generation_config, store}` | FACT (https://ai.google.dev/api/interactions-api; https://ai.google.dev/gemini-api/docs/text-generation, via search 2026-10-26) |
| `model` | `gemini-4-argon` | FACT (https://ai.google.dev/gemini-api/docs/models/gemini-4-argon, 2026-10-26: stable). **Confirm at run time**: log the model/version string returned |
| `thinking_level` | `medium` (vendor default for gemini-4-argon) | FACT default (https://ai.google.dev/gemini-api/docs/thinking). **[JAMES]**: keep medium, or allow a pre-freeze pilot of low/medium/high on interim-set items only (Google advises evaluating all three) |
| `max_output_tokens` | 65,536 | PROPOSED (Google recommends ≥32,768 — FACT) |
| `temperature`/`top_p`/`top_k` | omitted | FACT: ignored by Gemini 4, return deprecation warnings |
| `store` | `false` | PROPOSED per gate 3 |
| tools / grounding / background | none / off / false | PROPOSED |
| Runs per item; retries | 1; ≤2 on API error with identical request, never to pick a better output | PROPOSED |
| Analyst | Bot operator; no editing of output; any edit = logged deviation | PROPOSED |

## 3. Cost and the 2× rule
FACT, vendor-sourced (https://ai.google.dev/gemini-api/docs/pricing, 2026-10-26): $2 input / $10 output (output includes thinking) per M tokens through 30 Nov 2026; **$4 / $20 from 1 Dec 2026**, before the day-75 evaluation (Sat 9 Jan 2027). CSO/Sigma Watch report the same doubling. **The 2× cost rule must name the price: PROPOSED run-time list price on the run date, one price sheet for both arms in an evaluation, frozen into the results file.** Cost per report = input tokens × in-price + (output + thinking tokens) × out-price, from response usage; analyst minutes logged separately.
INFERENCE (chars/4 heuristic): a dry-run IS-02 request is ~26.8 kB ≈ 7k input tokens; with ≤20k output+thinking tokens a report costs ≈ $0.21 at today's price, ≈ $0.43 after 1 Dec — the 3-item shakedown is well under C0 even with 3 thinking levels.

## 4. Template — HSEEP 2020 AAR/IP (verified)
FACT (2026-10-26): FEMA PrepToolkit Improvement Planning page https://preptoolkit.fema.gov/web/hseep-resources/improvement-planning (200) → "After-Action Report/Improvement Plan … HSEEP Template 2020_508.docx" (downloaded; headings and the P/S/M/U labels "Performed without Challenges (P) / with Some Challenges (S) / with Major Challenges (M) / Unable to be Performed (U)" read from the file); CISA CTEP AAR-IP 2020 https://www.cisa.gov/sites/default/files/2023-01/8_-_ctep_aar-ip_template_2020_final_508.pdf (200); HSEEP Doctrine 2020 Ch. 5 https://www.fema.gov/sites/default/files/2020-04/Homeland-Security-Exercise-and-Evaluation-Program-Doctrine-2020-Revision-2-2-25.pdf (read via WebFetch; curl 403).
Skeleton (file `template_hseep2020_aar_ip.md`): title block → Exercise Overview table (Exercise Name, Dates, Scope, Focus Area(s), Capabilities, Objectives, Threat or Hazard, Scenario, Sponsor, Participating Organizations, Point of Contact) → Analysis of Capabilities (Table 1 P/S/M/U; per Objective → Capability → Strengths; Areas for Improvement with Reference and Analysis) → Appendix A Improvement Plan (Capability | Issue/Area for Improvement | Corrective Action | Capability Element | Primary Responsible Organization | Organization POC | Start Date | Completion Date) → Appendix B Exercise Participants. Deviation (PROPOSED): POC and participants as organisations/roles only.

## 5. Prompts (frozen candidate; full text in files, SHA-256 in freeze.json)
System prompt (`7244ef62…6d21`): use only the record; follow the template exactly; every Strength, AFI, Analysis, rating and Corrective Action ends with ≥1 citation `[R:L0123]`, `[R:L0123-L0130]` or `[R:§p5]`; uncitable statements omitted; no personal names/emails/phones; "Not stated in record." for silent fields; no extra sections.
User template (`379fb5b7…5ff3`): TEMPLATE, then EXERCISE RECORD (pages `§pN`, lines `LNNNN`), then the task line. Template file `0dd38dd9…c480`; config `cac26dc0…2c2a`.

## 6. Time and iteration budget
- Build: one engineer-day (v2, FACT) — done as this kit; day 7 = **Mon 2 Nov 2026** freeze deadline.
- PROPOSED: ≤5 prompt iterations, only on interim-set items, only after the vendor gate; each logged with hash; then final freeze. Current kit = iteration 0.
- Run-time: ≤15 min per item, no output editing.

## 7. Inputs and blinding
- Inputs: one record file per exercise, produced deterministically (`interim-set/build_interim.py` pattern): pdftotext per page → `§pN` sections, global `LNNNN` lines, e-mails/phones redacted. The same file goes to every arm.
- Until 9 Nov / vendor approval: only `interim-set/items/IS-0x.txt` (PUBLIC LOW-FIDELITY / FICTIONAL; never part of the pre-registered 20). Held-out real records: [POST-NOV-9], also needs pre-registration timestamp; runner keeps them locked (`GATES/heldout_unlocked.txt`).
- Normalisation (`normalise.py`, run by a non-rater on both arms): canonical citation form, model/arm names → `[MODEL]`, timestamps removed, fixed heading order, extra sections dropped; then left/right order randomised with a seeded list held by the non-rater.

## 8. Week-1 early check (Sigma Red F2 fix; numbers computed by `stats_v3.py`)
Run Arm 2 on IS-01…IS-03 once the vendor gate clears. Two internal scorers mark each Arm 2 finding "good" = traceable (citation resolves) AND supported (cited text supports it); record agreement. Pool findings N across the 3 items. **Re-scope** if good ≥ K(N); **build-confirm** if good ≤ N − K(N); otherwise no early decision. K(N) = smallest count with share ≥ 0.80 and exact one-sided 95% lower bound > 0.50; the mirror bound gives share ≤ 0.20 and upper bound < 0.50, so false-signal probability at a true 50% is identical on both sides. E.g. N=10: ≥9 / ≤1; N=15: ≥12 / ≤3; N=20: ≥16 / ≤4; N=30: ≥24 / ≤6 (P(false signal) 0.011, 0.018, 0.006, 0.0007 each side). Because the inputs are public/low-fidelity and scorers are internal, the result is advisory to James; it cannot replace E3. Replaces v2's "zero untraceable findings on all 3" (see E3 C13).

## 9. Vendor context and open question (no change to the arm)
FACT, vendor-sourced: Google Public Sector announced a preview of "Gemini for Government Services" on 20 Oct 2026, saying outputs "are grounded in source documents, with citations", with human approval steps (https://cloud.google.com/blog/products/ai-machine-learning/gemini-for-government-services/ ; https://www.googlecloudpresscorner.com/2026-10-20-Google-Public-Sector-Launches-Gemini-for-Government-Services ; https://cloud.google.com/gemini-enterprise/gov — all 200 on 2026-10-26). INFERENCE: possibly a stronger competitor configuration than Arm 2. Also Sigma Red F5: Hotwash, Inc. (AI after-action reviews for emergency management) — not reviewed by us. **[JAMES]**: keep Arm 2 as pre-registered (recommended); evaluating either as an Arm 2b is [POST-NOV-9] and needs access, terms review and the vendor shortlist.

## Blockers
1. Vendor shortlist approval by James (blocks every model call, including the day-7 run on 2 Nov).
2. Paid-tier account (C0 spend, needs James's approval) and L9 terms check incl. abuse-monitoring logs.
3. Cost-rule price basis and comparator ([JAMES]; E3 C7).
4. Independent second person by 9 Nov, otherwise revert to B.

## Open note, 2026-10-29: Gemini 4 Carbon (from Sigma Watch, /workspace/team/feeds/watch-2026-10-29.md)
On 28 Oct 2026 Google announced Gemini 4 Carbon, positioned above Argon (vendor claim; https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/). Access is limited (some cyber defenders and Fairwind partners). No API date has been given. The intro price is $2/$10 per million tokens (vendor claim). Arm 2 stays bare Argon; this freeze is NOT changed. PROPOSED: if Carbon reaches the public API before the day-75 eval (9 Jan 2027), add a pre-registered Arm 2c (Carbon, identical prompts and settings), frozen before any scoring, and report it separately. Never swap it into Arm 2 after data exists. UNVERIFIED: Carbon's benchmark and fabrication-rate claims.

### Open note, 2026-10-30 (from Sigma Watch feed watch-2026-10-30.md; vendor-stated, unverified by me)
- Gemini 4 Carbon post-intro price reported at $4/$20 per M tokens, same as Argon from 1 Dec. GA date and intro-price end still unknown. No change to Arm 2 (bare Argon) or the proposed Arm 2c.
- Mistral Large 4 (open weights, released 29 Oct; API $0.70/$2.10 per M, vendor price; modified MIT, MaaS needs separate commercial licence) is a possible routed component for the harness (Arm 3), not a competitor. It is not on the approved vendor shortlist; no records go to it unless James approves it (DECISIONS item 23).
