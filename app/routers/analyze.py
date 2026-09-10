"""Chat endpoint with prompt injection protection."""
from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel, field_validator
from slowapi import Limiter
from slowapi.util import get_remote_address
import logging

from app.services.auth import get_current_user
from app.services.vector_store import get_user_store
from app.services.ai_analyzer import chat_with_lawyer
from app.services.embedder import embed_chunks
from app.core.security import detect_prompt_injection, sanitize_user_input

logger = logging.getLogger(__name__)
limiter = Limiter(key_func=get_remote_address)
router = APIRouter()


class ChatRequest(BaseModel):
    query: str
    
    @field_validator('query')
    @classmethod
    def validate_query(cls, v):
        if not v or not v.strip():
            raise ValueError("Query cannot be empty")
        if len(v) > 2000:
            raise ValueError("Query too long. Maximum 2000 characters.")
        return v.strip()


class ChatResponse(BaseModel):
    reply: str
    warning: str | None = None


@router.post("/", response_model=ChatResponse)
@limiter.limit("20/minute")
async def chat(request: Request, chat_request: ChatRequest, user: str = Depends(get_current_user)):
    query = chat_request.query
    
    is_suspicious, _ = detect_prompt_injection(query)
    if is_suspicious:
        logger.warning(f"Prompt injection attempt by {user}")
        raise HTTPException(status_code=400, detail="Query contains suspicious patterns and was blocked.")
    
    sanitized_query = sanitize_user_input(query)
    user_store = get_user_store(user)
    
    if user_store.is_empty():
        return ChatResponse(reply="Please upload a contract first using the /upload endpoint.")
    
    query_embedding = embed_chunks([sanitized_query])[0]
    docs = user_store.search_similar(query_embedding)
    
    if not docs:
        return ChatResponse(reply="No relevant information found in your uploaded contracts.")
    
    try:
        result = chat_with_lawyer(docs, sanitized_query)
        return ChatResponse(reply=result["reply"])
    except Exception as e:
        logger.error(f"AI error for user {user}: {type(e).__name__}")
        raise HTTPException(status_code=500, detail="Error processing your query")
