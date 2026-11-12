# Interim Set — MANIFEST — DRAFT (Sigma Eval (bot), 2026-10-26; signer James A. MacGowan, UNSIGNED)

> **PUBLIC LOW-FIDELITY / FICTIONAL. HARNESS SHAKEDOWN ONLY. NOT REAL RECORDS. NEVER COUNTED TOWARD THE PRE-REGISTERED 20.**
> Not sent to any model. Under the vendor-shortlist gate (PROPOSED reading) these items wait for James's vendor approval, like real records.

Retrieval date for every file: 2026-10-26 (HTTP 200, direct download). Source pages: heat.gov Tabletop Challenge resources https://heat.gov/funding-opportunities/tabletopchallenge/resources/ ; NYC Emergency Management Partners in Preparedness resources https://www.nyc.gov/site/em/ready/partners-in-preparedness-resources.page (both 200). Build: `build_interim.py` v2 (deterministic; image-only pages filled from `ocr/` tesseract text; `pdftotext -layout` per page → `§pN` sections and global `LNNNN` lines; e-mails and phone numbers redacted; banner header).

## Items
| ID | Source document (URL) | Fidelity label | Text pages / lines | Redactions | Item sha256 | PII status | Gaps |
|---|---|---|---|---|---|---|---|
| IS-01 | Miami Situation Manual "Magic City Meltdown" (27–28 Mar 2023) — https://heat.gov/wp-content/uploads/2025/12/Miami_Situation_Manual.pdf | PUBLIC LOW-FIDELITY: real exercise's plan only, no play record | 14 of 14 (10 text + 4 OCR) / 386 | 11 (schedule 'Lead' first names on p13 → [NAME-REDACTED]; no e-mails/phones anywhere) | 22ba7f8f…2e5b (v2, 2026-10-26; v1 1a351a0e…6955 superseded) | No e-mails/phones; POC field blank in the source; p13 named session leads (first names only, no contact details) redacted as a precaution | **v2: pages 3, 4, 13 and 14 OCR'd** (tesseract 5.5.0, 300 dpi; lines tagged `[OCR]`, with errors e.g. garbled field labels on p3). Raw OCR files in `ocr/` still contain the p13 first names: source copies only, never model input. **Leakage: the public Miami AAR exists (E4 §A), so this item must never score recall.** |
| IS-02 | NYCEM Heat Wave TTX Facilitator Guide — https://www.nyc.gov/assets/em/downloads/pdf/hw_facilitator_guide.pdf | PUBLIC FICTIONAL ("The scenarios presented are fictional") | 12 / 322 | 2 (publisher contact lines) | dabebf51…2471 | Redacted generic contact details only | No play record; a scenario only |
| IS-03 | NYCEM Power Outage TTX Facilitator Guide — https://www.nyc.gov/assets/em/downloads/pdf/po_facilitator_guide.pdf | PUBLIC FICTIONAL, non-heat (tests transfer) | 12 / 349 | 2 | aafeee52…519f | As IS-02 | As IS-02 |

INFERENCE: none of these is an exercise *record* (no hotwash, notes or observer logs). They test the harness mechanics (template filling, citation resolution, "Not stated in record." behaviour), not the quality of findings.

## Reference and raw files (raw/; not items)
| File | URL | Pages | sha256 |
|---|---|---|---|
| heatgov_miami_sitman.pdf | as IS-01 | 14 | f747d929…fd41 |
| heatgov_sitman_template_2026.docx | https://heat.gov/wp-content/uploads/2026/06/SitMan_Template_2026.docx | – | e597db5a…68bf |
| heatgov_lessons_learned.pdf | https://heat.gov/wp-content/uploads/2026/01/HeatTabletops_LessonsLearned_BestPractices.pdf | 7 | f3f9ecb6…5a4d |
| heatgov_intro_v1.pdf | https://heat.gov/wp-content/uploads/2025/08/Introduction_to_Heat_Tabletop_Planning_Coordination_V1.pdf | 17 | 75e051ac…ad25 |
| nyc_hw_facilitator_guide.pdf | as IS-02 | 12 | 30a92ef1…c3d7 |
| nyc_hw_slides.pptx | https://www.nyc.gov/assets/em/downloads/ppt/hw_slides.pptx | – | 28d1b21b…b120 |
| nyc_ttx_participant_guide.pdf | https://www.nyc.gov/assets/em/downloads/pdf/business/ttx_participant_guide.pdf | 4 | 90efc075…4d67 |
| nyc_ttx_organizer_guide.pdf | https://www.nyc.gov/assets/em/downloads/pdf/business/ttx_organizer_guide.pdf | 13 | a9c891bb…c707 |
| nyc_ttx_scenario_table.pdf | https://www.nyc.gov/assets/em/downloads/pdf/business/ttx_scenario_table.pdf | 1 | baefded1…09b7 |
| nyc_po_facilitator_guide.pdf | as IS-03 | 12 | d15a2a29…c794 |
| nyc_po_slides.pptx | https://www.nyc.gov/assets/em/downloads/ppt/po_slides.pptx | – | 908a11ea…43df |
| nyc_aar_hotwash_best_practices.pdf | https://www1.nyc.gov/assets/em/downloads/pdf/nyc_emergency_management_aar_hotwash_best_practices.pdf | 1 | 46aca33f…4476 |
Full hashes: `../ARTIFACT-LOG.md`, `sha256sum raw/*`.

## Licence and terms
- **heat.gov (NOAA/NIHHIS federal site):** the Miami SitMan's own text says it "is considered uncontrolled and is available for all exercise participants to view/use. Please feel free to share this document as needed." (FACT, the PDF). The footer links the NOAA disclaimer and privacy pages. Public domain (17 U.S.C. §105) is likely for federal works, but **UNVERIFIED**: the Miami SitMan was produced for a local exercise and may not be a federal work.
- **NYC:** the toolkit is "free and customizable" and was created "for the use of private sector organizations" (FACT, the guides). But the NYC.gov Terms of Use (https://www.nyc.gov/main/terms-of-use, 200) say the materials "are the property of the City of New York. All rights are reserved." **OPEN CONFLICT (terms): internal shakedown use looks consistent with the toolkit's stated purpose (INFERENCE), but James or L9 should confirm before any external use or redistribution.**
