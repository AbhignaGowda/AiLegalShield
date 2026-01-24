from fastapi import FastAPI
from app.routers import upload, analyze

app = FastAPI(title="AiLegalShield")

app.include_router(upload.router, prefix="/upload")
app.include_router(analyze.router, prefix="/analyze")


@app.get("/")
async def root():
    return {"message": "Welcome to AiLegalShield"}


@app.get("/health")
async def health():
    return {"status": "AiLegalShield is running"}
