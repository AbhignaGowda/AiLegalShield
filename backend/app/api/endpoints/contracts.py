from fastapi import APIRouter, HTTPException, File, UploadFile, Form, Depends
from typing import Dict, Any

from app.models.schemas import (
    ContractAnalysisRequest,
    ContractAnalysisResponse
)
from app.services.file_service import FileService
from app.services.ai_service import AIService

router = APIRouter()

@router.post("/upload")
async def upload_and_analyze_contract(
    file: UploadFile = File(...),
    userId: str = Form(...),
    userName: str = Form(...),
    contract_type: str = Form(default="general"),
    file_service: FileService = Depends(FileService),
    ai_service: AIService = Depends(AIService)
) -> Dict[str, Any]:
    """Upload and analyze contract file"""
    
    # Validate file
    file_service.validate_file(file.filename)
    
    try:
        # Read and extract text
        file_content = await file.read()
        contract_text = file_service.extract_text_from_file(file_content, file.filename)
        
        # Validate contract text
        file_service.validate_contract_text(contract_text)
        
        # Analyze with AI
        analysis_result = await ai_service.analyze_contract(contract_text, contract_type)
        
        # Add metadata
        analysis_result.update({
            "filename": file.filename,
            "contract_type": contract_type,
            "user_id": userId,
            "user_name": userName,
            "contract_text": contract_text
        })
        
        return analysis_result
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.post("/analyze-contract", response_model=ContractAnalysisResponse)
async def analyze_contract(
    request: ContractAnalysisRequest,
    ai_service: AIService = Depends(AIService),
    file_service: FileService = Depends(FileService)
) -> ContractAnalysisResponse:
    """Direct text analysis endpoint"""
    
    # Validate text length
    file_service.validate_contract_text(request.contract_text)
    
    try:
        analysis_result = await ai_service.analyze_contract(
            request.contract_text,
            request.contract_type
        )
        
        return ContractAnalysisResponse(**analysis_result)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")