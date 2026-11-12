#!/usr/bin/env python3
"""Prints file:line:rule for suspected secrets. Never prints the matched value. Exit 1 on any hit."""
import os, re, sys
RULES = {
 'google_api_key': r'AIza[0-9A-Za-z_\-]{30,}', 'openai_key': r'sk-[A-Za-z0-9_\-]{20,}',
 'github_token': r'gh[pousr]_[A-Za-z0-9]{30,}', 'aws_key': r'AKIA[0-9A-Z]{16}',
 'private_key': r'-----BEGIN [A-Z ]*PRIVATE KEY', 'bearer': r'(?i)bearer\s+[A-Za-z0-9_\-\.]{20,}',
 'kv_secret': r'(?i)(api[_-]?key|secret|token|password|passwd)\s*[:=]\s*["\']?[A-Za-z0-9_\-\.]{12,}',
 'url_key': r'[?&]key=[A-Za-z0-9_\-]{10,}', 'email': r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}',
 'phone': r'\(?\b\d{3}\)?[-. ]\d{3}[-. ]\d{4}\b'}
hits = 0
for root, dirs, files in os.walk(sys.argv[1] if len(sys.argv) > 1 else '.'):
    dirs[:] = [d for d in dirs if d != '.git']
    for f in files:
        p = os.path.join(root, f)
        if p.endswith('tools/secret_scan.py'): continue
        for i, line in enumerate(open(p, errors='ignore'), 1):
            for k, r in RULES.items():
                if re.search(r, line): print(f'{p}:{i}:{k}'); hits += 1
print(f'{hits} hit(s)'); sys.exit(1 if hits else 0)
