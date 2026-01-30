"""Security utilities for input validation and sanitization."""
import re
import secrets
from datetime import datetime, timezone
from typing import List, Optional

INJECTION_PATTERNS = [
    r"ignore\s+(all\s+)?(previous|prior|above)\s+instructions?",
    r"forget\s+(all\s+)?(previous|prior|your)\s+instructions?",
    r"you\s+are\s+(now|no\s+longer)",
    r"new\s+(system\s+)?instructions?:",
    r"\[\[system\]\]",
    r"<\s*system\s*>",
    r"debug\s+mode\s+enabled",
    r"print\s+system[_\s]?prompt",
    r"reveal\s+(your\s+)?(system\s+)?instructions?",
    r"what\s+(are|were)\s+your\s+(original\s+)?instructions?",
]

COMPILED_PATTERNS = [re.compile(p, re.IGNORECASE) for p in INJECTION_PATTERNS]


def detect_prompt_injection(text: str) -> tuple[bool, Optional[str]]:
    for pattern in COMPILED_PATTERNS:
        if pattern.search(text):
            return True, pattern.pattern
    return False, None


def sanitize_user_input(text: str, max_length: int = 2000) -> str:
    if not text:
        return ""
    text = text[:max_length]
    text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]', '', text)
    text = text.replace("[[", "[​[").replace("]]", "]​]")
    return text.strip()


def generate_jti() -> str:
    return secrets.token_hex(16)


def get_utc_now() -> datetime:
    return datetime.now(timezone.utc)


PASSWORD_MIN_LENGTH = 12
SPECIAL_CHARACTERS = "!@#$%^&*()_+-=[]{}|;:,.<>?"
COMMON_PASSWORDS = ["password", "123456", "qwerty", "admin", "letmein", "welcome"]


def validate_password(password: str) -> tuple[bool, List[str]]:
    errors = []
    if len(password) < PASSWORD_MIN_LENGTH:
        errors.append(f"Password must be at least {PASSWORD_MIN_LENGTH} characters")
    if not re.search(r'[A-Z]', password):
        errors.append("Password must contain an uppercase letter")
    if not re.search(r'[a-z]', password):
        errors.append("Password must contain a lowercase letter")
    if not re.search(r'\d', password):
        errors.append("Password must contain a digit")
    if not any(c in SPECIAL_CHARACTERS for c in password):
        errors.append("Password must contain a special character")
    if password.lower() in COMMON_PASSWORDS:
        errors.append("Password is too common")
    return len(errors) == 0, errors
