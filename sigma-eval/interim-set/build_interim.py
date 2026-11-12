#!/usr/bin/env python3
"""Build interim shakedown set: PUBLIC LOW-FIDELITY / FICTIONAL only. Never part of the pre-registered 20.
Deterministic: pdftotext -layout per page -> page sections §pN, global line numbers Lnnnn, emails/phones redacted.
v2 (2026-10-26): image-only pages filled from ocr/<stem>_p<N>.txt (tesseract 5.5.0, 300 dpi, eng, psm 3), lines tagged [OCR];
OCR pages also get a schedule-'Lead' name redaction (personal first names -> [NAME-REDACTED])."""
import hashlib, re, subprocess, json, pathlib
RAW = pathlib.Path(__file__).parent / "raw"; OUT = pathlib.Path(__file__).parent / "items"; OUT.mkdir(exist_ok=True)
ITEMS = [  # id, raw file, label
 ("IS-01", "heatgov_miami_sitman.pdf", "PUBLIC LOW-FIDELITY (real-exercise SitMan; plan only, no play record)"),
 ("IS-02", "nyc_hw_facilitator_guide.pdf", "PUBLIC FICTIONAL (NYCEM template scenario)"),
 ("IS-03", "nyc_po_facilitator_guide.pdf", "PUBLIC FICTIONAL (NYCEM template scenario, non-heat)"),
]
EMAIL = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")
PHONE = re.compile(r"\(?\b\d{3}\)?[-. ]\d{3}[-.]\d{4}\b")
LEADNAME = re.compile(r"((?:mins|hr)\s+)(?!All\b|Group\b)([A-Z][a-z]+(?:\s*(?:&|,)\s*[A-Z][a-z]+)*)(?=\s+[A-Z])")
OCR = pathlib.Path(__file__).parent / "ocr"
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
summary = []
for iid, fn, label in ITEMS:
    src = RAW / fn
    text = subprocess.run(["pdftotext", "-layout", str(src), "-"], capture_output=True, text=True, check=True).stdout
    pages = text.split("\f")
    out, n, red = [f"# {iid} — {label}", "# NOT A REAL RECORD. HARNESS SHAKEDOWN ONLY. NEVER COUNTED TOWARD THE PRE-REGISTERED 20.",
                   f"# source file sha256: {sha(src)}", ""], 0, 0
    for pi, pg in enumerate(pages, 1):
        lines = [l.rstrip() for l in pg.splitlines() if l.strip()]; is_ocr = False
        ocrf = OCR / f"{src.stem.replace('heatgov_','')}_p{pi}.txt"
        if not lines and ocrf.exists():
            lines = [l.rstrip() for l in ocrf.read_text().splitlines() if l.strip()]; is_ocr = True
        if not lines: continue
        out.append(f"§p{pi}" + ("  [OCR page: tesseract text, may contain recognition errors]" if is_ocr else ""))
        for l in lines:
            l2, k1 = EMAIL.subn("[REDACTED-EMAIL]", l); l2, k2 = PHONE.subn("[REDACTED-PHONE]", l2); k3 = 0
            if is_ocr: l2, k3 = LEADNAME.subn(lambda m: m.group(1) + "[NAME-REDACTED]", l2); l2 = "[OCR] " + l2
            red += k1 + k2 + k3
            n += 1; out.append(f"L{n:04d} {l2.strip()}")
    dst = OUT / f"{iid}.txt"; dst.write_text("\n".join(out) + "\n")
    summary.append(dict(id=iid, raw=fn, label=label, pages=len([p for p in pages if p.strip()]), lines=n, redactions=red,
                        raw_sha256=sha(src), item_sha256=sha(dst)))
for f in sorted(RAW.iterdir()):
    if f.suffix in (".pdf", ".docx", ".pptx"): print(f"RAW {f.name} sha256={sha(f)} bytes={f.stat().st_size}")
print(json.dumps(summary, indent=1)); (pathlib.Path(__file__).parent / "items.json").write_text(json.dumps(summary, indent=1))
