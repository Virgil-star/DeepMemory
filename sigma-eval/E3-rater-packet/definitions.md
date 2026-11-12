# Operational definitions — DRAFT (PROPOSED), signer James, UNSIGNED

These apply identically to both arms. Raters see only the blinded reports "A" and "B" and the exercise record.

**D1. Finding.** One evaluative unit in the report's *Analysis of Capabilities* or *Appendix A: Improvement Plan*, as delimited by the HSEEP 2020 template:
- each numbered Strength;
- each numbered Area for Improvement (its Reference and Analysis text belong to it);
- each capability rating (P/S/M/U);
- each Corrective Action row.

Exercise Overview fields, headings, participant lists and boilerplate are not findings. The normaliser numbers findings F01, F02, … in order, and raters score those units and do not split or merge them. A unit containing several claims is supported only if all its factual claims are supported (D4).

**D2. Traceable finding.** A finding that meets all three conditions:
- (a) it carries at least one citation in the record's format (`[R:LNNNN]`, `[R:LNNNN-LNNNN]`, `[R:§pN]`);
- (b) every citation resolves to an existing line or page of the input record (mechanical check, `arm2/check_citations.py`, run before raters);
- (c) at least one cited location is about the finding's subject: same capability, activity or issue.

Condition (c) is the rater's judgement. Traceable does not mean correct; correctness is D4.

**D3. Untraceable finding.** Any finding that is not traceable:
- it has no citation;
- any of its citations fails to resolve; or
- none of its cited locations concerns its subject.

A finding counts as untraceable for the locked go condition ("zero untraceable findings") if the mechanical check fails, OR both raters judge (c) failed, OR the adjudicator does after a disagreement.

**D4. Supported finding (accuracy, v2: "supported by the record, not merely cited").** The cited text, read with its immediate context, establishes every factual claim in the finding: who, what, when, how many, and what was said or done. Ratings: **Y** (fully established), **PARTIAL**, **N**. Only Y counts as supported. Interpretive judgements ("coordination was weak") are supported if the cited text shows the behaviour the judgement rests on. Accuracy = Y findings ÷ all findings in the report.

**D5. Fabricated finding (resolves C8, PROPOSED).** A traceable finding, so its citations resolve and look relevant, that asserts at least one specific fact which:
- is contradicted by the cited text, or
- appears nowhere in the whole record.

Specific facts include an event, action, actor, quotation, number, time, decision or document. A traced citation that lends false support to an invented or contradicted fact is a fabrication.

These are **not** fabrications:
- a defensible interpretation that is unsupported or partially supported (score D4 = N or PARTIAL);
- generic recommendations in a Corrective Action that assert no record fact;
- "Not stated in record."

A finding is a confirmed fabrication only after a blind adjudicator, a human who is not a rater for that exercise, checks the whole record. Either rater flagging it is enough to send it to adjudication. Under the locked rule, one confirmed fabricated traced finding in Arm 3 (the harness) means **stop or re-scope**. Fabrications in Arm 2 are reported but do not trigger the rule (v2/LOCKED apply it to the harness).

**D6. Reference finding and missed finding.** A reference finding is an entry on the exercise's pre-built reference list (`reference-list-protocol.md`), with a statement, its type (Strength or AFI), its capability and its record locations.
- A report finding **matches** a reference finding if a rater judges it to address the same capability issue in the same direction (Strength vs AFI). Wording and citations need not be the same. One report finding can match at most one reference finding, and one reference finding is matched at most once per report.
- A **missed finding** is a reference finding matched by no finding in the report.
- Recall = matched reference findings ÷ all reference findings.

**D7. Win.** Arm 3 wins a pair when the final preference for that pair (agreed by both raters, or decided by the adjudicator after a disagreement) is for the Arm 3 report. "No preference" or a tie counts as a non-win (conservative).
