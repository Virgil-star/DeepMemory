#!/usr/bin/env python3
"""Test: runner --execute against current key must abort at pre-flight, before the record is read,
and no outgoing request may contain record text. Wraps urlopen (pass-through) and Path.read_text."""
import sys, json, os, pathlib, urllib.request
ROOT = pathlib.Path("/workspace/sigma-eval"); OUT = ROOT / "runs/preflight-test-2026-10-26"
sys.path.insert(0, str(ROOT / "arm2")); import arm2_runner as R
ITEM = ROOT / "interim-set/items/IS-01.txt"
record_text = ITEM.read_bytes().decode()          # read by the TEST (not the runner) only to compare against traffic
probe_lines = [l for l in record_text.splitlines() if l.startswith("L0") and len(l) > 20][:50]
sent, reads = [], []
_real_open = urllib.request.urlopen
def spy_open(req, *a, **k):
    sent.append({"url": req.full_url, "body": (req.data or b"").decode()}); return _real_open(req, *a, **k)
R.urllib.request.urlopen = spy_open
_real_rt = pathlib.Path.read_text
def spy_rt(self, *a, **k):
    reads.append(str(self)); return _real_rt(self, *a, **k)
pathlib.Path.read_text = spy_rt
os.environ["ARM2_TIER"] = "paid"
sys.argv = ["arm2_runner.py", str(ITEM), "--out", str(OUT / "SHOULD_NOT_EXIST.json"), "--execute", "--preflight-log", str(OUT / "preflight.json")]
msg = None
try: R.main()
except SystemExit as e: msg = str(e)
res = {"exit_message": msg, "requests_sent": len(sent), "urls": [s["url"] for s in sent],
       "outgoing_bodies": [s["body"] for s in sent],
       "record_file_read_by_runner": str(ITEM) in reads,
       "record_text_in_any_outgoing_body": any(l[6:] in s["body"] for s in sent for l in probe_lines) or any("Magic City" in s["body"] for s in sent),
       "output_file_created": (OUT / "SHOULD_NOT_EXIST.json").exists(),
       "key_in_logs": False}
key = os.environ["GEMINI_API_KEY"]
res["key_in_logs"] = any(key in p.read_text() for p in OUT.glob("*.json"))
(OUT / "test_result.json").write_text(json.dumps(res, indent=1)); print(json.dumps(res, indent=1))
