# singularity

**PRIVATE repository. Do not make public. Do not add collaborators without James A. MacGowan's written approval.**

- **Public sources only** until the factual ownership statement is signed. No private, licensed, or personal data; no exercise records.
- **C0 build:** spending under $1k until Nov 9, 2026 (Option A, build now; reverts to Option B on Nov 9, 2026 unless a named, independent second person is in place).
- **No secrets in this repo.** API keys (e.g. `GEMINI_API_KEY`) are read from the environment at run time only. Run `python3 tools/secret_scan.py` before every commit.
- Owner and signer: James A. MacGowan. Contents are DRAFTS authored by project bots (Sigma Eval) unless marked signed.

## Layout
- `sigma-eval/` — evaluation harness, Arm 2 runner, E3 rater packet (synthetic test data only), pre-registration and spec drafts.
- `QUARANTINE.md` — what was deliberately left out and why.
- `PREREGISTRATION-TIMESTAMP.md` — sha256 of the pre-registration files at the dated commit.
