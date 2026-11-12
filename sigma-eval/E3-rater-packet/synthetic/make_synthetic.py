#!/usr/bin/env python3
"""SYNTHETIC DUMMY DATA ONLY — not real ratings, raters, records or model outputs.
Builds 20 dummy pairs, runs randomise_blind.py with a fixed test seed, then writes
scenario sheets designed to hit each branch of analyse.py."""
import csv, json, random, subprocess, sys
from pathlib import Path
H = Path(__file__).resolve().parent; P = H.parent; PY = sys.executable
D = H / "data"; D.mkdir(exist_ok=True); (D / "reports").mkdir(exist_ok=True)
(D / "SYNTHETIC_test_seed.txt").write_text("SYNTHETIC-TEST-SEED-not-for-real-use\n")
pairs = []
for i in range(1, 21):
    pid = f"SYN-P{i:02d}"
    for am in ("arm2", "arm3"):
        (D / "reports" / f"{pid}_{am}.md").write_text(f"SYNTHETIC DUMMY REPORT {pid} {am}\nF01 Strength: dummy.\nF02 AFI: dummy.\nF03 AFI: dummy.\n")
    pairs.append({"pair_id": pid, "exercise_id": f"SYN-EX{i:02d}", "arm2_report_path": str(D/"reports"/f"{pid}_arm2.md"), "arm3_report_path": str(D/"reports"/f"{pid}_arm3.md")})
with open(D / "pairs.csv", "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=list(pairs[0])); w.writeheader(); w.writerows(pairs)
subprocess.run([PY, P/"randomise_blind.py", "--pairs", D/"pairs.csv", "--out", D/"blinded", "--sealed", D/"sealed",
                "--raters", "R1,R2", "--seed-file", D/"SYNTHETIC_test_seed.txt"], check=True)
key = {r["pair_id"]: r for r in csv.DictReader(open(D/"sealed"/"SEALED_key.csv"))}
lab = lambda pid, am: "A" if key[pid]["A"] == am else "B"

def scenario(name, wins, untrace_arm3=0, fab_arm3=0, fab_adjudicated=True, cost3=1.5, disagree=2):
    S = D / name; S.mkdir(exist_ok=True); rng = random.Random(name)
    prefs, finds, adj, costs, refs = [], [], [], [], []
    for i, pid in enumerate(key):
        win = i < wins
        final = lab(pid, "arm3") if win else (lab(pid, "arm2") if i % 3 else "NONE")
        r1 = r2 = final
        if i in range(wins - disagree, wins):          # disagreements resolved by adjudicator
            r2 = lab(pid, "arm2"); adj.append({"pair_id": pid, "item": "preference", "adjudicated_value": final, "adjudicator_id": "SYN-ADJ", "notes": "SYNTHETIC"})
        for rid, p in (("R1", r1), ("R2", r2)):
            prefs.append({"rater_id": rid, "pair_id": pid, "preference": p, "confidence_1to5": 3, "rationale": "SYNTHETIC", "submitted_utc": "2099-01-01T00:00:00Z"})
        ex = key[pid]["exercise_id"]
        for k in (1, 2, 3, 4): refs.append({"exercise_id": ex, "ref_id": f"REF{k}", "type": "AFI", "capability": "SYN", "statement": "SYNTHETIC", "record_locations": "L0001", "importance_1to3": 2, "author_ids": "SYN-A1;SYN-A2", "reconciled_utc": "2099-01-01T00:00:00Z"})
        for am in ("arm2", "arm3"):
            L = lab(pid, am)
            for j in (1, 2, 3):
                fid = f"F{j:02d}"; rel = ("Y", "Y"); fl = ("N", "N")
                if am == "arm3" and i < untrace_arm3 and j == 1: rel = ("N", "N")
                if am == "arm3" and i < fab_arm3 and j == 2:
                    fl = ("Y", "N")
                    if fab_adjudicated: adj.append({"pair_id": pid, "item": f"fabrication:{L}:{fid}", "adjudicated_value": "Y", "adjudicator_id": "SYN-ADJ", "notes": "SYNTHETIC"})
                if am == "arm2" and i == 5 and j == 1:   # a fabrication flag rejected by adjudicator
                    fl = ("N", "Y"); adj.append({"pair_id": pid, "item": f"fabrication:{L}:{fid}", "adjudicated_value": "N", "adjudicator_id": "SYN-ADJ", "notes": "SYNTHETIC"})
                s1 = "Y" if rng.random() < (0.85 if am == "arm3" else 0.75) else "PARTIAL"
                s2 = s1 if rng.random() < 0.85 else ("N" if s1 == "Y" else "Y")
                m = f"REF{j}" if rng.random() < 0.7 else ""
                for ri, rid in enumerate(("R1", "R2")):
                    finds.append({"rater_id": rid, "pair_id": pid, "report_label": L, "finding_id": fid, "citations": "[R:L0001]", "cite_resolves_mech": "Y", "cite_relevant": rel[ri], "supported": (s1, s2)[ri], "fabrication_flag": fl[ri], "matched_ref_id": m, "notes": "SYNTHETIC"})
            costs.append({"pair_id": pid, "arm": am, "cost_usd_runtime_list_price": round((0.40 if am == "arm2" else 0.40*cost3) * (0.9 + 0.2*rng.random()), 4), "price_sheet_ref": "SYNTHETIC"})
    for fn, rows in (("preferences", prefs), ("findings", finds), ("adjudication", adj), ("costs", costs), ("refs", refs)):
        with open(S/f"{fn}.csv", "w", newline="") as f:
            hdr = list(rows[0]) if rows else ["pair_id", "item", "adjudicated_value", "adjudicator_id", "notes"]
            w = csv.DictWriter(f, fieldnames=hdr); w.writeheader(); w.writerows(rows)

scenario("S1_go", wins=17)
scenario("S2_stop_fabricated", wins=17, fab_arm3=1)
scenario("S3_extend", wins=12)
scenario("S4_stop_wins", wins=9)
scenario("S5_notgo_untraceable", wins=16, untrace_arm3=1)
scenario("S6_notgo_cost", wins=16, cost3=2.6)
scenario("S7_pending", wins=17, fab_arm3=1, fab_adjudicated=False)
scenario("S8_boundary_15", wins=15)
scenario("S9_boundary_10", wins=10)
print("SYNTHETIC scenarios written")
