#!/usr/bin/env python3
"""Mechanical traceability check (pre-rater): every finding line must carry >=1 citation that resolves to an
existing line/page of the record. Output: counts of findings, uncited, unresolvable. Does NOT judge support."""
import re, sys, json
FIND = re.compile(r"^(Strength \d+|Area for Improvement \d+|Analysis|\|)", re.I)
CIT = re.compile(r"\[R:(?:L(\d{4})(?:-L(\d{4}))?|§p(\d+))\]")
def check(report, record):
    lines = {int(m.group(1)) for m in re.finditer(r"^L(\d{4}) ", record, re.M)}
    pages = {int(m.group(1)) for m in re.finditer(r"^§p(\d+)$", record, re.M)}
    res = {"findings": 0, "uncited": 0, "unresolvable": 0, "detail": []}
    for ln in report.splitlines():
        s = ln.strip()
        if not FIND.match(s) or s.startswith("|---") or "Not stated in record" in s: continue
        if s.startswith("|") and not CIT.search(s): continue  # table rows without claims (headers)
        res["findings"] += 1; cits = CIT.findall(s)
        if not cits: res["uncited"] += 1; res["detail"].append(("UNCITED", s[:80])); continue
        for a, b, p in cits:
            ok = (int(p) in pages) if p else all(x in lines for x in range(int(a), int(b or a) + 1))
            if not ok: res["unresolvable"] += 1; res["detail"].append(("UNRESOLVABLE", s[:80])); break
    return res
if __name__ == "__main__":
    print(json.dumps(check(open(sys.argv[1]).read(), open(sys.argv[2]).read()), indent=1))
