#!/usr/bin/env python3
"""randomise_blind.py — DRAFT (Sigma Eval bot), signer James A. MacGowan UNSIGNED.

Assigns A/B labels per pair and a per-rater presentation order, writes blinded
copies, and writes a SEALED key file.

Usage:
  python3 randomise_blind.py --pairs pairs.csv --out blinded_dir --sealed sealed_dir \
      --raters R1,R2 [--seed-file secret_seed.txt]

Custody (PROPOSED):
- The seed and the sealed key are held by a non-rater human custodian.
- Only key_commitment.txt (the SHA-256 of the key file) is placed in the
  rater-visible folder and in ARTIFACT-LOG.md.
- Raters never see sealed_dir.
- At unblinding, the custodian releases the key, and analyse.py verifies its
  hash against the commitment before scoring.

The seed is generated with secrets.token_hex(32) unless --seed-file is given
(for reproducible tests). The seed is never written into blinded_dir.
"""
import argparse, csv, hashlib, json, os, random, secrets, shutil, sys
from datetime import datetime, timezone
from pathlib import Path

def sha(p): return hashlib.sha256(Path(p).read_bytes()).hexdigest()

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--pairs", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--sealed", required=True)
    ap.add_argument("--raters", required=True)
    ap.add_argument("--seed-file")
    a = ap.parse_args()
    out, sealed = Path(a.out), Path(a.sealed)
    if out.resolve() == sealed.resolve() or sealed.resolve().is_relative_to(out.resolve()):
        sys.exit("sealed dir must be outside the blinded dir")
    if a.seed_file:
        seed = Path(a.seed_file).read_text().strip()
    else:
        seed = secrets.token_hex(32)
    rng = random.Random(hashlib.sha256(seed.encode()).hexdigest())
    rows = list(csv.DictReader(open(a.pairs, newline="")))
    if len({r["pair_id"] for r in rows}) != len(rows): sys.exit("duplicate pair_id")
    out.mkdir(parents=True, exist_ok=True); sealed.mkdir(parents=True, exist_ok=True)
    key = []
    for r in rows:
        arm3_is_A = rng.random() < 0.5
        src = {"A": r["arm3_report_path"] if arm3_is_A else r["arm2_report_path"],
               "B": r["arm2_report_path"] if arm3_is_A else r["arm3_report_path"]}
        d = out / r["pair_id"]; d.mkdir(exist_ok=True)
        for lab, p in src.items():
            shutil.copyfile(p, d / f"report_{lab}.md")
        key.append({"pair_id": r["pair_id"], "exercise_id": r["exercise_id"],
                    "A": "arm3" if arm3_is_A else "arm2", "B": "arm2" if arm3_is_A else "arm3",
                    "sha_A": sha(d / "report_A.md"), "sha_B": sha(d / "report_B.md")})
    orders = {}
    for rid in a.raters.split(","):
        ids = [r["pair_id"] for r in rows]; rng.shuffle(ids); orders[rid] = ids
    kf = sealed / "SEALED_key.csv"
    with open(kf, "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(key[0])); w.writeheader(); w.writerows(key)
    (sealed / "SEALED_seed.txt").write_text(seed + "\n")
    os.chmod(kf, 0o600); os.chmod(sealed / "SEALED_seed.txt", 0o600)
    commit = sha(kf)
    (out / "key_commitment.txt").write_text(
        f"SHA-256 of SEALED_key.csv: {commit}\ncreated_utc: {datetime.now(timezone.utc):%Y-%m-%dT%H:%M:%SZ}\n")
    (out / "presentation_order.json").write_text(json.dumps(orders, indent=1))
    n3A = sum(k["A"] == "arm3" for k in key)
    print(json.dumps({"pairs": len(key), "arm3_labelled_A": n3A, "key_commitment": commit}, indent=1))

if __name__ == "__main__":
    main()
