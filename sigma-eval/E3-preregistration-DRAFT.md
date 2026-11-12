# E3 Pre-registration — BUILD-READY DRAFT — NOT YET TIMESTAMPED, UNSIGNED

Author: Sigma Eval (bot), 2026-10-26. Decision-maker/signer: **James** (James A. MacGowan). Option A chosen (relayed by CSO 2026-10-26). Nothing here has been timestamped, sent or posted.
Labels: FACT (source, date) · INFERENCE · PROPOSED · UNVERIFIED · [JAMES] open for James · [POST-NOV-9] conditional on an independent second person. Sources: v2 = `singularity-integration-brief-v2.txt`; LOCKED = James, 2026-10-26 ("Lock the stop rule as proposed: go at 15/20, stop at 10/20 or below"); SR = Sigma Red, `/workspace/sigma-red/red-team-v2.md` (26 Oct 2026). Stats: `stats.py`→`stats_output.txt`, `stats_v3.py`→`stats_v3_output.txt` (exact binomial, scipy).

**0. Calendar, gates, scope.** Day 0 = Mon 26 Oct 2026 (CSO). Arm 2 frozen day 7 = Mon 2 Nov · E4 inventory day 21 = Mon 16 Nov · pre-registration timestamped + raters day 30 = Wed 25 Nov · blind evaluation day 75 = Sat 9 Jan 2027.
- **No exercise records go into any model, in any arm, until James approves the vendor shortlist.** Arm 2 only on a paid, no-training Gemini tier (see Arm 2 spec).
- **C0 / public sources only until 9 Nov 2026** (James's rule). If no independent second person is named by then, the plan reverts to option B. **Independent second person = a human evaluation lead or rater who did not build the harness. Bots, including Sigma Eval, do not count.** Everything below that needs real records, paid raters or outreach is [POST-NOV-9].
- Interim set (`interim-set/`, PUBLIC LOW-FIDELITY / FICTIONAL) is for harness shakedown only and **never counts toward the 20.**

**1. Hypothesis.** H1: blind practitioner raters prefer the Arm 3 (harness) report to the Arm 2 report (Gemini 4 Argon + HSEEP 2020 AAR/IP template + citation prompt) for the same exercise more than half the time. H0: p = 0.5. One-sided, α = 0.05 (v2).

**2. Unit and sample.** Unit = one exercise: one paired comparison of Arm 3 vs Arm 2 from the same input record. Sample = 20 held-out exercises, IDs and input SHA-256 listed before any arm runs on them; ≤25% synthetic (v2), so ≥15 real; none used in prompt development, the week-1 check or rubric/kappa calibration (SR F1); reserve of ≥5 pre-listed replacements.
**Data trigger (SR F1 fix).** SR wording: "Raise the day-21 trigger to at least 15 real raw records with a confirmed licence (at least 23 if the extension is kept)." Our reading, PROPOSED, adopting both CSO's reading and SR's: (i) at day 21 (16 Nov), fewer than 15 obtainable real raw records with confirmed licence → choose another job or B; (ii) **the blind evaluation does not start until ≥15 provenance-cleared real raw records are in hand** (v2 provenance entry: source, licence, personal-data status, consent), ≥23 if the 30-report extension is kept. Today 0 complete raw sets are in hand (E4).

**3. Decision rule (LOCKED 2026-10-26).**
- **Go:** ≥15 of 20 wins AND zero untraceable findings AND median cost ≤ 2× Argon's. P(X≥15 | p=0.5) = 0.0207.
- **Stop or re-scope:** ≤10 of 20, OR any fabricated traced finding.
- **Inconclusive:** 11–14 → extend under the same rule; never lower the bar.
- **Power statement (SR F3; `stats_v3.py`).** Probability that the 15/20 preference criterion passes: **0.055 at true preference 0.55; 0.126 at 0.60; 0.416 at 0.70; 0.804 at 0.80** (0.245 at 0.65). P(stop) at the same rates: 0.409, 0.245, 0.048, 0.003. The test therefore reliably detects only a large effect (≈80% preference); the other go conditions can only lower these. For 80% power at α≤0.05: 18 exercises (go ≥13) at 0.80, 23 (≥16) at 0.75, **37 (≥24) at 0.70**, 69 (≥42) at 0.65 — matches SR. [JAMES]: the minimum preference worth building (SR suggests 70%).
- Zero untraceable findings over N checked findings bounds the true rate at ≤1−0.05^(1/N): 13.9% (N=20), 5.8% (50), 3.0% (100). Report N and the bound.

**3a. Cost price basis.** Argon list price $2/$10 per M tokens to 30 Nov 2026, **$4/$20 from 1 Dec** (FACT, https://ai.google.dev/gemini-api/docs/pricing, 2026-10-26), before day 75. PROPOSED: run-time list price on the run date, one price sheet for all arms, frozen into the results; median over the 20.

**3b. Week-1 early check (SR F2 fix; symmetric, PROPOSED numbers).** SR wording: "If Arm 2's untraceable rate is at or below a pre-set X% and its accuracy is at or above Y% (fix X and Y now), re-scope." Our version: on interim-set items IS-01–IS-03 (after vendor approval), two internal scorers mark each Arm 2 finding good = traceable AND supported. Over N pooled findings: **re-scope if good ≥ K(N); build-confirm if good ≤ N−K(N); otherwise no early decision**, where K(N) = smallest count with share ≥0.80 and exact one-sided 95% lower bound >0.50 (mirror: share ≤0.20, upper bound <0.50). N=10: ≥9 / ≤1 · N=15: ≥12 / ≤3 · N=20: ≥16 / ≤4 · N=30: ≥24 / ≤6. False-signal probability at true 0.5 is equal on both sides (0.011, 0.018, 0.006, 0.0007). Thus X = 20% untraceable-or-unsupported, Y = 80%. Advisory only, since the scorers are internal and the inputs low-fidelity.

**4. Scores (v2, verbatim).** *Accuracy:* "Share of findings raters judge supported by the record, not merely cited." *Missed-finding:* "Recall against a practitioner-written answer key per exercise." PROPOSED: answer keys written and hashed before any arm runs; mechanical traceability (`arm2/check_citations.py`) runs before raters see anything.

**5. v2 band rule and kappa (verbatim).** "50–60% band. Preference in this band, or above 60% without significance: no build; extend once to 30 reports if accuracy and recall at least equal Arm 2, otherwise option B." "Rater agreement. Cohen's kappa of at least 0.6 on 10 reports; below 0.4 after one rubric revision, choose another job." **Not reconciled with §3; see OPEN CONFLICT.**

**6. Raters and blinding [POST-NOV-9].** Two independent human practitioner raters on all 20 (v2; register item 8 recruits 3–5); neither may have built the harness, and bots never rate. Cohen's κ on the preference judgment over 10 calibration reports that are not in the 20. Blinding: `arm2/normalise.py` applied to both arms by a non-rater (identical HSEEP 2020 layout, citations `[R:LNNNN]`/`[R:§pN]`, model/arm strings removed), with left/right order randomised from a seeded list held by the non-rater. Simulation: at n=10 and true agreement 0.85, κ ranges 0.17–1.00 and P(κ<0.4)=0.17 — a noisy gate.

**7. Baseline.** Arm 2 = `arm2-frozen-setup-DRAFT.md` + `arm2/freeze.json` (SHA-256 recorded 2026-10-26, internal). Arm 1 (bare Argon) is context only.

**8. Ties, exclusions, deviations.** Tie or no preference = non-win for Arm 3. Rater disagreement → pre-named blind adjudicator (human). Exclusions only for pre-specified reasons (corrupt record, no output after 2 retries, answer-key leakage), decided before unblinding and replaced from the reserve in order; all reported.

**9. Freeze and signature block.**
```
Version: ______  SHA-256 of this file: ______________________
Timestamp method [JAMES] (SR: dated commit until outside contact is approved): ______  UTC: ______
Signed, decision-maker (James A. MacGowan): ______ (UNSIGNED)
Independent evaluation lead / rater (human, not a harness builder, not a bot): ______ (NOT NAMED)
Prepared by: Sigma Eval (bot)
STATUS: NOT YET TIMESTAMPED
```

---
## OPEN CONFLICT for James (blockers — not resolved here)
| # | Topic | v2 says | LOCKED / relayed rule says | Why it matters |
|---|---|---|---|---|
| C1 | 10/20 | 50–60% band → "extend once to 30 … otherwise option B" | ≤10/20 → stop or re-scope | 10/20 sits in v2's extend band but is a locked stop. |
| C2 | 11–14 | Extend **once** to 30, **only if** accuracy and recall ≥ Arm 2 | Extend under the same rule (no "once", no condition) | Unbounded fresh-20 repeats: overall α 0.034, but no cap on time or cost. |
| C3 | Bar at 30 | 30 reports need 20 wins (66.7%) | "Never lower the bar" (75%) | 20/30 is proportionally lower; at α it is not (P=0.049). |
| C4 | Extension design | 20+10 or fresh 30 not stated | — | Cumulative with go ≥20/30: α **0.056 (>0.05)**; needs ≥21/30 (α 0.033). Fresh 30 at ≥20: α 0.040. |
| C5 | Untraceable | E3 has no zero-untraceable condition | Go needs zero untraceable | Locked adds a condition. |
| C6 | Accuracy/recall | "No worse than Arm 2", no margin | Not mentioned | Non-inferiority margin undefined (SR F3 asks for margins). |
| C7 | Cost | ≤2× cost per report vs Arm 2; E6 $25 median cap | median ≤2× Argon's | Comparator Arm 1 or Arm 2? Price doubles 1 Dec; PROPOSED run-time list price for both arms. |
| C8 | Fabricated finding | Tracer failure → drop the traceability claim | Any fabricated traced finding → stop | Locked is stricter; "fabricated" needs a definition. **PROPOSED resolution: `E3-rater-packet/definitions.md` D5** (a traced finding asserting a specific fact contradicted by the cited text or absent from the whole record, confirmed by a blind human adjudicator; one confirmed in Arm 3 → stop). |
| C9 | Kappa | ≥0.6 on 10; <0.4 → change job; 0.4–0.6 undefined | — | Gap band; Cohen's κ is 2-rater only while item 8 recruits 3–5. |
| C10 | Timing | Arm 2 "3 scored reports" day 7 (2 Nov); pre-reg day 30 (25 Nov) | Vendor gate | Week-1 uses interim items only (not in the 20), which resolves the leakage issue, but the vendor gate may still block 2 Nov. |
| C11 | Arms | "Blind three-arm evaluation" (item 14) vs E3 Arm 3 vs Arm 2 | — | Arm 1's role undefined. |
| C12 | Data trigger | <10 real raw records by day 21 → another job | SR/CSO: ≥15 (≥23 with extension) | Amends v2; needs James's sign-off. |
| C13 | Week-1 rule | "Zero untraceable findings on all 3 → re-scope" | SR/CSO: symmetric bounds (§3b) | Amends v2; PROPOSED numbers. |
| C14 | Second person | v2 owners are roles | James: a human not on the build by 9 Nov, else B | §6 raters and the eval are [POST-NOV-9]; real-record outreach also needs approval. |
| C15 | Power | n=20 | SR: size for ≥80% power (37 at 70%) | The locked 15/20 has 42% power at 0.70. Keeping it is James's call; this draft does not change it. |
