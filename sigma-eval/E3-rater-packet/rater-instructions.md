# Rater instructions — Singularity E3 blind evaluation — DRAFT, signer James, UNSIGNED

*For practising emergency managers. Not yet issued. [POST-NOV-9]*

**Who can rate.** You must be a practising emergency manager with HSEEP exercise-evaluation experience. You must not have built, configured or tested either report-generation system, and you must not have written the reference list for any exercise you rate. Bots and AI systems cannot rate.

**What you receive per exercise (pair).**
- The exercise record: situation manual, injects and notes, with line numbers `LNNNN` and page markers `§pN`.
- Two after-action reports, labelled only **A** and **B**, in identical HSEEP 2020 AAR/IP layout with findings numbered F01, F02, ….
- A mechanical citation-check sheet marking any citation that does not resolve.

You do **not** receive the reference finding list until Step 3.

**What you must not do.**
- Do not try to identify which system wrote a report.
- Do not discuss exercises with the other rater until both of you have submitted.
- Do not use AI tools.
- Do not edit the reports.

Report any accidental unblinding (for example, a model name left in the text) to the evaluation lead immediately; that pair will be handled under the pre-registered exclusion rules.

**Step 1 — Read the record first** (about 20–40 min).

**Step 2 — Score every finding in A, then in B** (`finding_sheet.csv`, one row per finding), using `definitions.md`:
- `cite_relevant` (Y/N): does at least one cited location concern the finding's subject? (D2c)
- `supported` (Y/PARTIAL/N): does the cited text establish every factual claim? (D4)
- `fabrication_flag` (Y/N): does it assert a specific fact contradicted by the cited text or absent from the whole record? (D5) If Y, write the fact and where you looked in `notes`.

**Step 3 — Recall.** Open the sealed reference list for this exercise only after Step 2 is submitted. For each finding, enter the `matched_ref_id` it matches (D6), or leave it blank.

**Step 4 — Pairwise preference** (`preference_sheet.csv`). Answer: *"As the evaluator responsible for this exercise, which report would you rather submit as the after-action report, considering accuracy against the record, coverage of what mattered, and usefulness of the improvement plan?"* Choose **A**, **B** or **NONE** (no preference). Record your confidence (1–5) and a rationale of one to three sentences. Step 4 comes after Step 3, so you judge with the record in mind.

**Time.** About 90 minutes per pair. Pairs are presented in a different random order for each rater.

**Calibration.** Before the main set, both raters score 10 calibration pairs that are not in the 20. These are used for Cohen's κ (v2: κ ≥ 0.6; below 0.4 after one rubric revision, choose another job). Calibration items never count toward the decision.

**Personal data.** Records are redacted. If you see a personal name, e-mail or phone number, do not copy it into any sheet. Write "PII seen at LNNNN" in `notes`.
