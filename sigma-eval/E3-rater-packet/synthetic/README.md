# SYNTHETIC DUMMY DATA ONLY

Everything under this folder is invented test data for checking `randomise_blind.py` and `analyse.py`. It contains no real ratings, raters, records or model outputs, and it must never be pooled with real data. The fixed test seed is in `data/SYNTHETIC_test_seed.txt`; real runs use a secret seed held by the custodian.

Run the tests with `./run_tests.sh`. The log is in `outputs_run.txt`, and `outputs/SYNTHETIC_crosscheck_scipy.txt` cross-checks the statistics against scipy.

All 9 scenarios gave the expected verdict:

| Scenario | Verdict |
|---|---|
| S1, 17 wins | GO |
| S2, 17 wins + 1 fabrication | STOP |
| S3, 12 wins | EXTEND |
| S4, 9 wins | STOP |
| S5, 16 wins + 1 untraceable | NOT-GO/NOT-STOP |
| S6, 16 wins, cost 2.6x | NOT-GO/NOT-STOP |
| S7, unadjudicated flag | PENDING |
| S8, 15 wins | GO |
| S9, 10 wins | STOP |

The tamper test (an edited key) was refused, exit 1.
