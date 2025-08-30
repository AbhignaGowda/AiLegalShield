from fastapi import APIRouter, HTTPException, Depends

from app.models.schemas import ChatRequest, ChatResponse
from app.services.ai_service import AIService

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat_about_contract(
    request: ChatRequest,
    ai_service: AIService = Depends(AIService)
) -> ChatResponse:
    """Chat endpoint for follow-up questions"""
    
    try:
        response = await ai_service.chat_about_contract(
            request.message,
            request.contract_text,
            request.analysis_result,
            request.chat_history
        )
        
        return ChatResponse(response=response, status="success")
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")