#!/bin/bash
# SYNTHETIC DUMMY DATA ONLY. Runs analyse.py on every scenario and a tamper test.
set -u; cd "$(dirname "$0")"; P=..; D=data; PY=${PY:-python3}
$PY make_synthetic.py || exit 1
mkdir -p outputs
for S in S1_go S2_stop_fabricated S3_extend S4_stop_wins S5_notgo_untraceable S6_notgo_cost S7_pending S8_boundary_15 S9_boundary_10; do
  echo "== $S (SYNTHETIC)"
  $PY $P/analyse.py --key $D/sealed/SEALED_key.csv --commitment $D/blinded/key_commitment.txt \
    --preferences $D/$S/preferences.csv --findings $D/$S/findings.csv --adjudication $D/$S/adjudication.csv \
    --costs $D/$S/costs.csv --refs $D/$S/refs.csv --out outputs/SYNTHETIC_$S.json | $PY -c "import json,sys;d=json.load(sys.stdin);print(' ',d['decision'],'| wins',d['wins_arm3'],'| p',d['p_one_sided_exact_H0_0.5'],'| kappa',d['kappa_preference_R1_R2'])"
done
echo "== TAMPER TEST (SYNTHETIC): edit key, expect refusal"
cp $D/sealed/SEALED_key.csv /tmp/tampered_key.csv; chmod 600 /tmp/tampered_key.csv; sed -i '2s/arm3/arm2/' /tmp/tampered_key.csv
$PY $P/analyse.py --key /tmp/tampered_key.csv --commitment $D/blinded/key_commitment.txt --preferences $D/S1_go/preferences.csv \
  --findings $D/S1_go/findings.csv --costs $D/S1_go/costs.csv --refs $D/S1_go/refs.csv --out /tmp/x.json; echo "  exit=$?"
