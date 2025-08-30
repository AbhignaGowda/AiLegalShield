from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from datetime import datetime

class ContractAnalysisRequest(BaseModel):
    contract_text: str
    contract_type: str = "general"

class RiskyClause(BaseModel):
    clause_text: str
    risk_level: str
    explanation: str
    suggestion: str

class ContractAnalysisResponse(BaseModel):
    overall_risk_score: int
    risky_clauses: List[RiskyClause]
    summary: str
    negotiation_points: List[str]
    filename: Optional[str] = None
    contract_type: str
    user_id: Optional[str] = None
    user_name: Optional[str] = None

class ChatMessage(BaseModel):
    role: str
    content: str
    timestamp: str

class ChatRequest(BaseModel):
    user_id: str
    message: str
    contract_text: str
    analysis_result: Dict[str, Any]
    chat_history: List[ChatMessage] = []

class ChatResponse(BaseModel):
    response: str
    status: str