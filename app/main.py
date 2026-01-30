"""AiLegalShield FastAPI Application."""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import logging

from app.routers import upload, analyze, auth
from app.core.database import engine, Base
from app.core.config import ALLOWED_ORIGINS
from app.models import user

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AiLegalShield", description="AI-powered legal contract analyzer", version="2.0.0")

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
    max_age=600,
)


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {type(exc).__name__}: {exc}")
    return JSONResponse(status_code=500, content={"detail": "An internal error occurred."})


app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(upload.router, prefix="/upload", tags=["Contract Upload"])
app.include_router(analyze.router, prefix="/chat", tags=["AI Legal Assistant"])


@app.get("/", tags=["Health"])
async def root():
    return {"message": "Welcome to AiLegalShield", "version": "2.0.0"}


@app.get("/health", tags=["Health"])
async def health():
    return {"status": "healthy", "service": "AiLegalShield"}


@app.get("/security-info", tags=["Health"])
async def security_info():
    return {
        "cors_origins_configured": len(ALLOWED_ORIGINS) > 0,
        "rate_limiting_enabled": True,
        "jwt_validation_enabled": True,
        "file_validation_enabled": True,
        "user_isolation_enabled": True,
    }
