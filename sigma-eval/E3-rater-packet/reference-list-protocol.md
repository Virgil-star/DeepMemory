# Reference finding list protocol — DRAFT, signer James, UNSIGNED — [POST-NOV-9]

**Purpose.** The answer key for missed-finding recall (v2: "Recall against a practitioner-written answer key per exercise").

**Who.** Two practising emergency managers per exercise (the "authors"). They must not have built or tested either arm and must not be raters for that exercise. **No bot may author, draft, edit, suggest or summarise reference findings.** Bots may only format the CSV and compute its hash.

**When.** For each exercise, the list is finished, reconciled, hashed and logged **before any arm is run on that exercise's record**, and in any case before the pre-registration timestamp (day 30, Wed 25 Nov 2026, or the date James sets). Authors never see any arm output for that exercise, before or after.

**Input.** The same normalised record file the arms receive (same SHA-256). A published AAR of the same exercise must not be used: it leaks into the key and may be in model training data.

**Procedure.**
1. **Independent drafting.** Each author works alone, without AI tools, and lists the Strengths and Areas for Improvement that a competent HSEEP evaluator should report from this record. Each entry needs a one-sentence statement, its type (Strength or AFI), its capability or objective, its record locations (`LNNNN`/`§pN`), and an importance rating (1 = minor, 2 = notable, 3 = critical). Expect about 6–20 entries.
2. **Reconciliation.** The two authors meet. Entries both wrote are merged. A single-author entry is kept if both agree it is supported by the record. Disagreements go to a third practitioner, or are dropped and logged.
3. **Freeze.** The final `reference_list.csv` is written. Its SHA-256 goes into `ARTIFACT-LOG.md` and the pre-registration list, and it is held by the non-rater custodian.
4. **Disclosure.** Raters see the list only at Step 3 of the rater instructions.

**Records kept.** Both independent drafts, the reconciliation log, and author IDs (roles, not names in the analysis files).
