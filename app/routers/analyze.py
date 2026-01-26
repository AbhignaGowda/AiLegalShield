from fastapi import APIRouter, Depends
from app.services.auth import get_current_user
from app.services.vector_store import search_similar
from app.services.ai_analyzer import chat_with_lawyer
from app.services.embedder import embed_chunks

router = APIRouter()


@router.post("/")
async def chat(query: str, user: str = Depends(get_current_user)):
    query_embedding = embed_chunks([query])[0]
    docs = search_similar(query_embedding)
    result = chat_with_lawyer(docs, query)
    return result
