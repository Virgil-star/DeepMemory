#!/usr/bin/env python3
"""Regenerates ARTIFACT-LOG.md from the files Sigma Eval produced. Re-run after any change."""
import hashlib, pathlib, datetime
ROOT = pathlib.Path(__file__).parent
EXCL = {".venv", "src", "__pycache__"}
rows = []
for p in sorted(ROOT.rglob("*")):
    if p.is_dir() or any(x in EXCL for x in p.relative_to(ROOT).parts) or p.name == "ARTIFACT-LOG.md": continue
    rel = p.relative_to(ROOT); kind = "SYNTHETIC test data (not real)" if "synthetic" in rel.parts else "downloaded public source (not authored)" if "raw" in rel.parts and p.suffix in {".pdf", ".docx", ".pptx"} else "produced"
    mt = datetime.datetime.utcfromtimestamp(p.stat().st_mtime).strftime("%Y-%m-%d")
    rows.append(f"| /workspace/sigma-eval/{rel} | {hashlib.sha256(p.read_bytes()).hexdigest()} | {mt} | Sigma Eval (bot) | {kind} | James A. MacGowan — UNSIGNED | DRAFT |")
hdr = ["# ARTIFACT LOG — Sigma Eval", "",
 f"Generated {datetime.datetime.utcnow():%Y-%m-%dT%H:%M:%SZ} by `make_artifact_log.py`. Internal sha256 only — **nothing externally timestamped, uploaded or sent.** "
 "src/ (earlier downloads, some containing personal data) and .venv/ are excluded. Rows marked 'downloaded' are third-party public files that Sigma Eval retrieved; they are logged for provenance, not authored by us.", "",
 "## Change log", "",
 "- **2026-10-26 ~23:30 UTC, runner change (Arm 2 code only).** `arm2/arm2_runner.py` gains a pre-flight tier gate: one no-record generateContent call before any record is read, abort on non-200 or Free Tier, no retry on 429. New sha256 aee82bf625a773c9ef677c0b8edf385a1a5e8660bcfbea0e4dd33f3f9e33bac1, recorded in `arm2/freeze.json` code_sha256. System prompt, user template, HSEEP template and config are unchanged; their hashes were re-verified. `runs/shakedown-2026-10-26/run_shakedown.py` v2 has the same gate and no countTokens call. Test: `runs/preflight-test-2026-10-26/` aborted at pre-flight (HTTP 429 Free Tier), 1 request with no record text, record never read, $0.",
 "- **2026-10-26, IS-01 v2.** OCR (tesseract 5.5.0) of Miami pages 3, 4, 13 and 14 merged; 11 first names redacted on p13; item sha256 22ba7f8f…2e5b (v1 1a351a0e…6955 superseded). IS-02 and IS-03 are unchanged.",
 "- **2026-10-26, E3 rater packet** `E3-rater-packet/` created (DRAFT). Scripts tested on SYNTHETIC data only.", "",
 "| Path | sha256 | Date | Author | Kind | Human signer (status) | Status |", "|---|---|---|---|---|---|---|"]
(ROOT / "ARTIFACT-LOG.md").write_text("\n".join(hdr + rows) + "\n")
print(len(rows), "rows")
