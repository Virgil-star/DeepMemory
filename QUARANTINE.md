# Quarantine record (2026-10-30)

Copied from `/workspace/sigma-eval` on the box, with these EXCLUDED:

| Excluded | Reason |
|---|---|
| `src/` | Downloaded exercise/AAR records; some contain personal data (per ARTIFACT-LOG) |
| `interim-set/raw/`, `interim-set/items/`, `interim-set/ocr/` | Exercise documents and their text/OCR (exercise records) |
| `E3-rater-packet/synthetic/data/sealed/` | Sealed blinding key and seed; must stay out of any shared store |
| `runs/shakedown-2026-10-26/driver_log.json`, `models_list.json`, `diagnostic_429.txt` | Raw API responses; not needed for the build |
| `*.pdf, *.png, *.bin, *.docx, *.pptx` | Binary source documents |

Never added: any Drive file (including "Research and Project Synthesis" and the OpenAI recovery-codes file), the HCCAT corpus, the Omnitics materials, or any API key.

Secret scan (tools/secret_scan.py: Google/OpenAI/GitHub/AWS keys, private keys, bearer tokens, key=value secrets, emails, phone numbers) found 0 hits at the first commit. `GEMINI_API_KEY` appears only as an environment-variable name.
