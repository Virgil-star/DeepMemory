# Arm 2 SHAKEDOWN 2026-10-26 — ABORTED (tier gate failed) — DRAFT, Sigma Eval (bot); signer James A. MacGowan, UNSIGNED

**This is an infrastructure shakedown record, not an evaluation result. No outputs were produced, scored or preference-judged.**

- Pre-check of IS-01..IS-03: no named individuals' phone numbers or e-mails. IS-02 and IS-03 each have 2 already-redacted organisational e-mail lines (`[REDACTED-EMAIL]`); IS-01 has none. No pages were excluded.
- models.list (22:12 UTC): `models/gemini-4-argon` exists (displayName "Gemini 4 Argon", version 3.0; methods generateContent, countTokens, batchGenerateContent). This matches the frozen config. See `models_list.json`.
- Freeze: `arm2/freeze.json` at 2026-10-26T22:13:13Z, before any output existed. thinking_level = medium, PROVISIONAL pending James.
- countTokens (prompt incl. system and template): IS-01 5,228 · IS-02 6,713 · IS-03 7,162. The worst-case pre-call check was about $0.67 per item, under the $10 cap.
- Interactions calls: **all 9 attempts (3 items × 1 run + 2 retries) returned HTTP 429.** A diagnostic call with a trivial prompt ("Reply with the single word: ok", no record content) returned: `Rate limit exceeded for model gemini-4-argon (limit: 0 requests per day on Free Tier). Please upgrade your tier at https://ai.dev/rate-limit.`, with Retry-After 31573 s.
- **Finding: the GEMINI_API_KEY in the box environment is on the FREE tier, not paid.** The paid-tier gate was satisfied only by the `ARM2_TIER=paid` assertion, which was set from the relayed approval and is not verified by the API. The run was stopped. No tier upgrade or billing change was attempted (that needs James).
- Exposure note: the 9 rejected requests carried the full public, no-personal-data item text to the free-tier endpoint. They were rejected with 429, so presumably not processed (INFERENCE). Whether free-tier data terms apply to rejected requests is UNVERIFIED (counsel/L9).
- Spend: **$0.00** (429 responses are not billed, INFERENCE; free tier has no charges). Post-1-Dec equivalent: $0.00.
- normalise.py / check_citations.py: not run; there are no outputs.
- Fixes needed before a rerun: (1) a paid-tier key confirmed by James (billing enabled on the project); (2) the runner/driver must not retry on 429 and should do a trivial no-record pre-flight call first, aborting on any "Free Tier" message; (3) re-verify freeze hashes (unchanged).
