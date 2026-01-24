from fastapi import APIRouter
from app.services.vector_store import search_similar
from app.services.ai_analyzer import analyze_risk

router = APIRouter()


@router.post("/")
async def analyze_contract(query: str):
    docs = search_similar(query)
    result = analyze_risk(docs, query)
    return result
