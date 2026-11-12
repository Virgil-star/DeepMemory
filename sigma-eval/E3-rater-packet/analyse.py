#!/usr/bin/env python3
"""analyse.py — E3 scoring and analysis. DRAFT (Sigma Eval bot), signer James A. MacGowan UNSIGNED.

Locked rule (James, relayed by CSO), n = 20 pairs:
  GO     : wins >= 15 AND zero untraceable Arm 3 findings AND median Arm 3 cost <= 2 x median Arm 2 cost
  STOP   : wins <= 10, OR any confirmed fabricated traced finding in Arm 3
  EXTEND : 11-14 wins -> extend under the same rule (bar never lowered)

Tie or no preference counts as a non-win (definitions.md D7).

When wins >= 15 but the untraceable or cost condition fails, the locked rule
gives no verdict; this is reported as NOT-GO / NOT-STOP (OPEN CONFLICT for James).

Statistics, all standard library:
- exact one-sided binomial P(X >= wins | n, 0.5);
- Clopper-Pearson 95% interval (by bisection);
- Wilson 95% CIs for win share, accuracy and recall;
- Cohen's kappa (R1 vs R2) with a seeded percentile bootstrap CI over pairs.

The finding-level CIs ignore clustering within reports and are descriptive only.
Before anything else, the script refuses to run unless the key file hash matches
the commitment.
"""
import argparse, csv, hashlib, json, math, random, statistics, sys
from collections import defaultdict
from pathlib import Path

Z = 1.959963984540054
def rd(p): return list(csv.DictReader(open(p, newline="")))
def binom_sf(k, n, p=0.5): return sum(math.comb(n, i) * p**i * (1-p)**(n-i) for i in range(k, n+1))
def binom_cdf(k, n, p): return sum(math.comb(n, i) * p**i * (1-p)**(n-i) for i in range(0, k+1))
def wilson(x, n):
    if n == 0: return [None, None]
    ph = x/n; d = 1 + Z*Z/n; c = (ph + Z*Z/(2*n))/d; h = Z*math.sqrt(ph*(1-ph)/n + Z*Z/(4*n*n))/d
    return [round(max(0, c-h), 4), round(min(1, c+h), 4)]
def clopper_pearson(x, n, a=0.05):
    def bis(f, lo=0.0, hi=1.0):
        for _ in range(100):
            m = (lo+hi)/2
            if f(m): hi = m
            else: lo = m
        return (lo+hi)/2
    lo = 0.0 if x == 0 else bis(lambda p: binom_sf(x, n, p) >= a/2)
    hi = 1.0 if x == n else bis(lambda p: binom_cdf(x, n, p) <= a/2)
    return [round(lo, 4), round(hi, 4)]
def kappa(a, b):
    n = len(a)
    if n == 0: return None
    cats = sorted(set(a) | set(b)); po = sum(x == y for x, y in zip(a, b))/n
    pe = sum((a.count(c)/n)*(b.count(c)/n) for c in cats)
    return None if pe == 1 else (po - pe)/(1 - pe)
def boot_kappa(pairs, B=10000, seed=20261026):
    rng = random.Random(seed); ks = []
    for _ in range(B):
        s = [pairs[rng.randrange(len(pairs))] for _ in pairs]
        k = kappa([x for x, _ in s], [y for _, y in s])
        if k is not None: ks.append(k)
    ks.sort()
    return [round(ks[int(0.025*len(ks))], 4), round(ks[int(0.975*len(ks))-1], 4)] if ks else [None, None]

def main():
    ap = argparse.ArgumentParser()
    for f in ["key", "commitment", "preferences", "findings", "costs", "refs", "out"]: ap.add_argument("--"+f, required=True)
    ap.add_argument("--adjudication")
    ap.add_argument("--n-required", type=int, default=20)
    ap.add_argument("--raters", default="R1,R2")
    a = ap.parse_args()
    commit = Path(a.commitment).read_text().split(":")[1].split()[0]
    if hashlib.sha256(Path(a.key).read_bytes()).hexdigest() != commit:
        sys.exit("KEY HASH DOES NOT MATCH COMMITMENT — refusing to score")
    key = {r["pair_id"]: r for r in rd(a.key)}
    if len(key) != a.n_required:
        sys.exit(f"{len(key)} pairs != {a.n_required}: extension rules (C2-C4) not settled; refusing")
    R1, R2 = a.raters.split(",")
    adj = {(r["pair_id"], r["item"]): r["adjudicated_value"].strip().upper() for r in rd(a.adjudication)} if a.adjudication else {}
    arm = lambda pid, lab: key[pid][lab] if lab in ("A", "B") else "none"
    unresolved = []

    # preferences
    pref = defaultdict(dict)
    for r in rd(a.preferences): pref[r["pair_id"]][r["rater_id"]] = arm(r["pair_id"], r["preference"].strip().upper())
    final, kpairs = {}, []
    for pid in key:
        p1, p2 = pref[pid].get(R1), pref[pid].get(R2)
        if p1 is None or p2 is None: unresolved.append(f"{pid}: missing preference"); continue
        kpairs.append((p1, p2))
        if p1 == p2: final[pid] = p1
        elif (pid, "preference") in adj:
            v = adj[(pid, "preference")]; final[pid] = arm(pid, v) if v in ("A", "B") else "none"
        else: unresolved.append(f"{pid}: preference disagreement not adjudicated")
    wins = sum(v == "arm3" for v in final.values())

    # findings
    F = defaultdict(dict)
    for r in rd(a.findings): F[(r["pair_id"], r["report_label"], r["finding_id"])][r["rater_id"]] = r
    untrace = {"arm2": 0, "arm3": 0}; fab = {"arm2": 0, "arm3": 0}
    supp = {"arm2": [0, 0], "arm3": [0, 0]}; skp = []
    matched = defaultdict(set)
    for (pid, lab, fid), rs in F.items():
        am = arm(pid, lab); x, y = rs.get(R1), rs.get(R2)
        if x is None or y is None: unresolved.append(f"{pid}/{lab}/{fid}: missing rater row"); continue
        mech_fail = "N" in (x["cite_resolves_mech"].upper(), y["cite_resolves_mech"].upper())
        rel = (x["cite_relevant"].upper(), y["cite_relevant"].upper())
        if mech_fail or rel == ("N", "N"): untrace[am] += 1
        elif rel[0] != rel[1]:
            v = adj.get((pid, f"untraceable:{lab}:{fid}"))
            if v is None: unresolved.append(f"{pid}/{lab}/{fid}: relevance disagreement not adjudicated")
            elif v == "Y": untrace[am] += 1
        if "Y" in (x["fabrication_flag"].upper(), y["fabrication_flag"].upper()):
            v = adj.get((pid, f"fabrication:{lab}:{fid}"))
            if v is None: unresolved.append(f"{pid}/{lab}/{fid}: fabrication flag not adjudicated")
            elif v == "Y": fab[am] += 1
        sx, sy = x["supported"].upper(), y["supported"].upper()
        supp[am][1] += 1; supp[am][0] += (sx == "Y" and sy == "Y")
        skp.append((sx == "Y", sy == "Y"))
        if x["matched_ref_id"] and x["matched_ref_id"] == y["matched_ref_id"]:
            matched[(pid, am)].add(x["matched_ref_id"])
    refs = defaultdict(set)
    for r in rd(a.refs): refs[r["exercise_id"]].add(r["ref_id"])
    rec = {}
    for am in ("arm2", "arm3"):
        tot = sum(len(refs[key[p]["exercise_id"]]) for p in key)
        hit = sum(len(matched[(p, am)] & refs[key[p]["exercise_id"]]) for p in key)
        rec[am] = {"matched": hit, "total": tot, "rate": round(hit/tot, 4) if tot else None, "wilson95": wilson(hit, tot)}

    # costs
    c = defaultdict(dict)
    for r in rd(a.costs): c[r["pair_id"]][r["arm"]] = float(r["cost_usd_runtime_list_price"])
    m2 = statistics.median(c[p]["arm2"] for p in key); m3 = statistics.median(c[p]["arm3"] for p in key)
    cost_ok = m3 <= 2*m2

    n = a.n_required
    if unresolved: decision = "PENDING — unresolved items, no verdict"
    elif fab["arm3"] > 0: decision = "STOP (confirmed fabricated traced finding in Arm 3)"
    elif wins <= 10: decision = "STOP (wins <= 10)"
    elif wins <= 14: decision = "EXTEND (11-14 wins; same rule, bar not lowered)"
    elif untrace["arm3"] == 0 and cost_ok: decision = "GO"
    else: decision = "NOT-GO / NOT-STOP: wins >= 15 but untraceable or cost condition failed — rule silent, OPEN CONFLICT for James"
    res = {
        "decision": decision,
        "unresolved": unresolved,
        "n_pairs": n,
        "wins_arm3": wins,
        "non_wins": n - wins,
        "ties_or_none": sum(v == "none" for v in final.values()),
        "p_one_sided_exact_H0_0.5": round(binom_sf(wins, n), 6),
        "win_share_wilson95": wilson(wins, n),
        "win_share_clopper_pearson95": clopper_pearson(wins, n),
        "untraceable_findings": untrace,
        "confirmed_fabricated_findings": fab,
        "accuracy_supported_by_both_raters": {am: {"supported": s[0], "findings": s[1], "rate": round(s[0]/s[1], 4) if s[1] else None, "wilson95": wilson(*s)} for am, s in supp.items()},
        "recall_matched_by_both_raters": rec,
        "cost_median_usd": {"arm2": m2, "arm3": m3, "ratio": round(m3/m2, 4), "cost_ok_<=2x": cost_ok},
        "kappa_preference_R1_R2": None if kappa(*zip(*kpairs)) is None else round(kappa(*zip(*kpairs)), 4),
        "kappa_preference_boot95": boot_kappa(kpairs),
        "kappa_supported_R1_R2": None if not skp or kappa(*zip(*skp)) is None else round(kappa(*zip(*skp)), 4),
        "kappa_supported_boot95": boot_kappa(skp) if skp else None,
        "notes": ["Accuracy/recall 'no worse than Arm 2' has no margin (C6, OPEN) — reported, not used in decision.",
                  "Finding-level Wilson CIs ignore clustering; descriptive only.",
                  "Kappa here is on the main set; v2's kappa gate uses the 10 calibration pairs."]}
    Path(a.out).write_text(json.dumps(res, indent=1)); print(json.dumps({k: res[k] for k in ("decision", "wins_arm3", "p_one_sided_exact_H0_0.5", "kappa_preference_R1_R2", "untraceable_findings", "confirmed_fabricated_findings", "cost_median_usd")}))

if __name__ == "__main__":
    main()
