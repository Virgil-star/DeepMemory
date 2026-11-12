#!/usr/bin/env python3
"""Blinding normaliser (run by a non-rater on BOTH arms' outputs). Deterministic.
- maps citation variants to [R:Lnnnn], [R:Lnnnn-Lnnnn], [R:§pN]
- strips model/arm names, any extra sections, timestamps; collapses whitespace
- emits plain Markdown in the fixed HSEEP 2020 heading order"""
import re, sys
CIT = re.compile(r"\[\s*R\s*:\s*(?:L\s*(\d{1,4})(?:\s*[-–]\s*L?\s*(\d{1,4}))?|§\s*p\s*(\d+))\s*\]", re.I)
def norm_cit(m):
    a, b, p = m.groups()
    if p: return f"[R:§p{int(p)}]"
    return f"[R:L{int(a):04d}-L{int(b):04d}]" if b else f"[R:L{int(a):04d}]"
STRIP = re.compile(r"(?i)\b(gemini(?:[ \t-]+[\w.]+){0,2}|argon|claude|gpt[\w.-]*|harness|arm[ \t]*[123]|as an ai[^.\n]*\.)")
ORDER = ["Exercise Overview", "Analysis of Capabilities", "Appendix A: Improvement Plan", "Appendix B: Exercise Participants"]
def normalise(text):
    text = CIT.sub(norm_cit, text)
    text = STRIP.sub("[MODEL]", text)
    text = re.sub(r"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?Z?", "", text)
    parts, cur = {}, None
    for line in text.splitlines():
        h = re.match(r"^#{1,3}\s*(.+?)\s*$", line)
        if h and any(h.group(1).lower().startswith(o.lower()) for o in ORDER):
            cur = next(o for o in ORDER if h.group(1).lower().startswith(o.lower())); parts[cur] = []; continue
        if cur: parts[cur].append(line.rstrip())
    out = []
    for o in ORDER:
        out.append(f"## {o}"); body = "\n".join(parts.get(o, ["Not present in output."]))
        out.append(re.sub(r"\n{3,}", "\n\n", body).strip()); out.append("")
    return "\n".join(out)
if __name__ == "__main__": sys.stdout.write(normalise(sys.stdin.read()))
