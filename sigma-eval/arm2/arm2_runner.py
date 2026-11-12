#!/usr/bin/env python3
"""Arm 2 runner (Gemini 4 Argon + HSEEP 2020 template + fixed citation prompt).
HARD GATES - refuses to run unless ALL hold:
  1. file ../GATES/vendor_shortlist_approved.txt exists (written only on James's explicit approval)
  2. env ARM2_TIER == "paid"  (required flag only - NOT proof of tier)
  2b. PRE-FLIGHT TIER PROBE (added 2026-10-26 after free-tier abort): one no-record generateContent call
      ("Reply with OK.", maxOutputTokens 5) BEFORE any record is read. Abort on non-200 or any 'free_tier'/'Free Tier'.
  3. frozen hashes in freeze.json match the prompt/template/config files byte-for-byte
  4. item is from an allowed set (interim-set until Nov 9; held-out only after pre-reg timestamp + second person)
No API call is made by this file unless --execute is passed AND the gates pass. Built 2026-10-26; NOT RUN."""
import argparse, hashlib, json, os, pathlib, sys, time, urllib.request, urllib.error
HERE = pathlib.Path(__file__).parent
def sha(p): return hashlib.sha256(pathlib.Path(p).read_bytes()).hexdigest()
def gates(item):
    errs = []
    if not (HERE.parent / "GATES" / "vendor_shortlist_approved.txt").exists(): errs.append("vendor shortlist not approved by James")
    if os.environ.get("ARM2_TIER") != "paid": errs.append("ARM2_TIER != paid")
    fz = HERE / "freeze.json"
    if not fz.exists(): errs.append("freeze.json missing")
    else:
        f = json.loads(fz.read_text())
        for name, h in f["sha256"].items():
            if sha(HERE / name) != h: errs.append(f"hash mismatch: {name}")
    if "interim-set" not in str(pathlib.Path(item).resolve()) and not (HERE.parent / "GATES" / "heldout_unlocked.txt").exists():
        errs.append("held-out items locked (needs pre-reg timestamp + independent second person, post-Nov-9)")
    return errs
PREFLIGHT_PROMPT = "Reply with OK."
class TierError(SystemExit): pass
def preflight(model, log_path=None):
    """No-record tier probe. Returns the exact outgoing body. Raises TierError on non-200, 429 or any free-tier mention.
    The API key is sent only in a header and is never logged."""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
    body = {"contents": [{"role": "user", "parts": [{"text": PREFLIGHT_PROMPT}]}], "generationConfig": {"maxOutputTokens": 5}}
    raw = json.dumps(body)
    rec = {"utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), "url": url, "outgoing_body": body, "outgoing_body_bytes": len(raw)}
    req = urllib.request.Request(url, data=raw.encode(), method="POST",
          headers={"Content-Type": "application/json", "x-goog-api-key": os.environ["GEMINI_API_KEY"]})
    try:
        r = urllib.request.urlopen(req, timeout=60); status, text = r.status, r.read().decode(errors="replace")
    except urllib.error.HTTPError as e:
        status, text = e.code, e.read().decode(errors="replace")
    rec.update({"http_status": status, "response_head": text[:600]})
    if log_path: pathlib.Path(log_path).write_text(json.dumps(rec, indent=1))
    low = text.lower()
    if status != 200 or "free_tier" in low or "free tier" in low:
        raise TierError(f"PRE-FLIGHT ABORT: HTTP {status}" + (" (429: no retry)" if status == 429 else "") +
                        ("; response mentions FREE TIER" if ("free_tier" in low or "free tier" in low) else "") + ". No record was loaded or sent.")
    return rec
def build_request(record_text):
    cfg = json.loads((HERE / "config.json").read_text())
    user = (HERE / "user_prompt_template.txt").read_text() \
        .replace("{{TEMPLATE}}", (HERE / "template_hseep2020_aar_ip.md").read_text()).replace("{{RECORD}}", record_text)
    body = {"model": cfg["model"], "system_instruction": (HERE / "system_prompt.txt").read_text(),
            "input": user, "generation_config": cfg["generation_config"], "store": cfg["store"]}
    return cfg, body
def main():
    ap = argparse.ArgumentParser(); ap.add_argument("item"); ap.add_argument("--out", required=True)
    ap.add_argument("--execute", action="store_true"); ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--preflight-log", default=None)
    a = ap.parse_args()
    if a.dry_run or not a.execute:
        cfg, body = build_request(pathlib.Path(a.item).read_text())
        print(json.dumps({"would_post_to": cfg["endpoint"], "body_bytes": len(json.dumps(body)), "store": body["store"],
                          "generation_config": body["generation_config"], "gate_errors": gates(a.item)}, indent=1)); return
    # --- EXECUTE PATH: gates and tier probe run BEFORE the record file is opened ---
    errs = gates(a.item)
    if errs: sys.exit("REFUSED: " + "; ".join(errs))
    cfg = json.loads((HERE / "config.json").read_text())
    preflight(cfg["model"], a.preflight_log)          # raises TierError -> exit, record never read
    cfg, body = build_request(pathlib.Path(a.item).read_text())
    req = urllib.request.Request(cfg["endpoint"], data=json.dumps(body).encode(), method="POST",
          headers={"Content-Type": "application/json", "x-goog-api-key": os.environ["GEMINI_API_KEY"]})
    t0 = time.time()
    try:
        resp = json.loads(urllib.request.urlopen(req, timeout=900).read())
    except urllib.error.HTTPError as e:
        sys.exit(f"API ERROR HTTP {e.code}" + (" (429: stop, no retry)" if e.code == 429 else "") + ": " + e.read().decode(errors="replace")[:400])
    log = {"item": a.item, "item_sha256": sha(a.item), "utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
           "latency_s": round(time.time() - t0, 1), "model_returned": resp.get("model"), "usage": resp.get("usage"),
           "freeze": json.loads((HERE / "freeze.json").read_text())}
    pathlib.Path(a.out).write_text(json.dumps({"log": log, "response": resp}, indent=1))
if __name__ == "__main__": main()
