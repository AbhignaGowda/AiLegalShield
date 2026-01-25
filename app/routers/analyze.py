from fastapi import APIRouter
from app.services.vector_store import search_similar
from app.services.ai_analyzer import analyze_risk
from app.services.embedder import embed_chunks

router = APIRouter()


@router.post("/")
async def analyze_contract(query: str):
    query_embedding = embed_chunks([query])[0]
    docs = search_similar(query_embedding)
    result = analyze_risk(docs, query)
    return result
