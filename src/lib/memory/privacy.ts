const BLOCKS: { re: RegExp; reason: string }[] = [
  {
    re: /\b\d{3}-\d{2}-\d{4}\b/,
    reason: "That looks like a Social Security number. It will not be stored.",
  },
  {
    re: /\b\d{4}[ -]?\d{4}[ -]?\d{4}[ -]?\d{1,7}\b/,
    reason: "That looks like a card or account number. It will not be stored.",
  },
  {
    re: /\b(?:password|passcode|pin|otp|cvv|cvc)\b\s*(?::|=|is)\s*\S+/i,
    reason: "Credentials and codes are never stored.",
  },
  {
    re: /\b(?:api[_ -]?key|secret|access[_ -]?token|private[_ -]?key)\b\s*[:=]\s*\S+/i,
    reason: "Secrets are never stored.",
  },
  {
    re: /\bsk-[a-zA-Z0-9]{10,}\b/,
    reason: "That looks like a secret key. It will not be stored.",
  },
  {
    re: /\b(?:dob|d\.o\.b\.?|date of birth|born)\b\s*[:=]?\s*\d{1,2}[/-]\d{1,2}[/-]\d{2,4}/i,
    reason: "Dates of birth are never stored.",
  },
  {
    re: /\b(?:account|routing|card)\s*(?:number|#|no\.?)?\s*[:=]?\s*\d{6,}\b/i,
    reason: "Account numbers are never stored.",
  },
];

export function privacyViolation(text: string): string | null {
  for (const block of BLOCKS) {
    if (block.re.test(text)) return block.reason;
  }
  return null;
}
