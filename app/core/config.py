"""Application configuration with security validation."""
import os
from typing import List
from dotenv import load_dotenv

load_dotenv()


def get_required_env(key: str) -> str:
    value = os.getenv(key)
    if not value:
        raise RuntimeError(f"Required environment variable '{key}' is not set.")
    return value


SECRET_KEY = get_required_env("SECRET_KEY")

WEAK_SECRETS = ["supersecretkey", "secret", "changeme", "your_secure_random_key", ""]
if SECRET_KEY.lower() in [s.lower() for s in WEAK_SECRETS] or len(SECRET_KEY) < 32:
    raise RuntimeError("SECRET_KEY must be at least 32 characters and not a common value.")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
JWT_ISSUER = "ailegalshield"
JWT_AUDIENCE = "ailegalshield-api"

_origins = os.getenv("ALLOWED_ORIGINS", "")
ALLOWED_ORIGINS: List[str] = [o.strip() for o in _origins.split(",") if o.strip()] or ["http://localhost:3000"]

RATE_LIMIT_REQUESTS = int(os.getenv("RATE_LIMIT_REQUESTS", "10"))
RATE_LIMIT_WINDOW = os.getenv("RATE_LIMIT_WINDOW", "minute")

MAX_FILE_SIZE_MB = int(os.getenv("MAX_FILE_SIZE_MB", "10"))
MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

DATABASE_URL = get_required_env("DATABASE_URL")
