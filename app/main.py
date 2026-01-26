from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import upload, analyze, auth
from app.core.database import engine, Base
from app.models import user  

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AiLegalShield")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(upload.router, prefix="/upload")
app.include_router(analyze.router, prefix="/chat")


@app.get("/")
async def root():
    return {"message": "Welcome to AiLegalShield"}


@app.get("/health")
async def health():
    return {"status": "AiLegalShield is running"}
