#!/usr/bin/env python3
"""Shakedown driver v2 (2026-10-26 23:xx): IS-01..IS-03 once each via arm2_runner.py --execute.
- Pre-flight no-record tier probe ONCE before anything (runner also probes per item).
- No countTokens call (it would carry record text): worst-case cost estimated locally (chars/3 tokens).
- Hard cap $10. Any 429 / pre-flight abort / API error STOPS the whole run - no retries."""
import json, os, subprocess, pathlib, sys
ROOT = pathlib.Path("/workspace/sigma-eval"); OUT = ROOT / "runs/shakedown-2026-10-26"
PRICE_NOW = (2.0, 10.0); CAP = 10.0; MAXOUT = 65536
sys.path.insert(0, str(ROOT / "arm2")); import arm2_runner as R
if os.environ.get("ARM2_TIER") != "paid": sys.exit("REFUSED: ARM2_TIER flag not set (required, but not proof of tier)")
cfg = json.loads((ROOT / "arm2/config.json").read_text())
R.preflight(cfg["model"], OUT / "preflight_driver.json")   # exits before any record is opened
spent_worst = 0.0; summary = []
for item in ["IS-01", "IS-02", "IS-03"]:
    path = ROOT / f"interim-set/items/{item}.txt"
    est_in = path.stat().st_size / 3 + 8000           # local estimate, no API call
    worst = est_in * PRICE_NOW[0] / 1e6 + MAXOUT * PRICE_NOW[1] / 1e6
    if spent_worst + worst > CAP: sys.exit(f"ABORT: $10 cap would be exceeded at {item}")
    out = OUT / f"{item}.raw.json"
    p = subprocess.run([sys.executable, str(ROOT / "arm2/arm2_runner.py"), str(path), "--out", str(out), "--execute",
                        "--preflight-log", str(OUT / f"{item}.preflight.json")], capture_output=True, text=True, env=os.environ)
    summary.append({"item": item, "rc": p.returncode, "stderr_tail": p.stderr[-600:], "worst_case_usd": round(worst, 4)})
    spent_worst += worst
    if p.returncode != 0: print("STOP:", item, p.stderr[-300:]); break
(OUT / "driver_log_v2.json").write_text(json.dumps(summary, indent=1))
