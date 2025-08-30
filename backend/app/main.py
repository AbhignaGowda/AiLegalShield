from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import contracts, chat
from app.config import settings

def create_application() -> FastAPI:
    app = FastAPI(
        title="AI Legal Shield",
        version="1.0.0",
        description="AI-powered contract analysis API"
    )

    # CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Include routers
    app.include_router(contracts.router, tags=["contracts"])
    app.include_router(chat.router,  tags=["chat"])

    @app.get("/")
    async def root():
        return {"message": "AI Legal Shield API - Ready to analyze contracts!"}

    @app.get("/health")
    async def health_check():
        return {"status": "healthy", "service": "ai-legal-shield"}

    return app

app = create_application()