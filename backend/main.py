# main.py
from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import json
import os
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv
import PyPDF2
import docx
import io

# Load environment variables
load_dotenv()

app = FastAPI(title="AI Legal Shield", version="1.0.0")

# CORS middleware for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js default
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request/response
class ContractAnalysisRequest(BaseModel):
    contract_text: str
    contract_type: str = "general"  # lease, employment, nda, general

class RiskyClause(BaseModel):
    clause_text: str
    risk_level: str  # high, medium, low
    explanation: str
    suggestion: str

class ContractAnalysisResponse(BaseModel):
    overall_risk_score: int  # 1-10
    risky_clauses: List[RiskyClause]
    summary: str
    negotiation_points: List[str]

class ChatMessage(BaseModel):
    role: str  # user or assistant
    content: str
    timestamp: str

class ChatRequest(BaseModel):
    user_id: str
    message: str
    contract_text: str
    analysis_result: Dict[str, Any]
    chat_history: List[ChatMessage] = []

# Initialize OpenAI client (using OpenRouter)
client = openai.OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

def extract_text_from_file(file_content: bytes, filename: str) -> str:
    """Extract text from uploaded files"""
    try:
        if filename.lower().endswith('.pdf'):
            # Extract text from PDF
            pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_content))
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
            return text.strip()
        
        elif filename.lower().endswith(('.docx', '.doc')):
            # Extract text from Word document
            doc = docx.Document(io.BytesIO(file_content))
            text = ""
            for paragraph in doc.paragraphs:
                text += paragraph.text + "\n"
            return text.strip()
        
        elif filename.lower().endswith('.txt'):
            # Plain text file
            return file_content.decode('utf-8').strip()
        
        else:
            raise ValueError(f"Unsupported file type: {filename}")
            
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error extracting text from file: {str(e)}")

async def analyze_contract_with_ai(contract_text: str, contract_type: str) -> Dict[str, Any]:
    """
    Core AI function - this is what hiring managers will examine closely
    Shows: structured prompting, error handling, JSON parsing
    """
    
    # Craft a structured prompt for consistent outputs
    prompt = f"""
You are an expert contract lawyer. Analyze this {contract_type} contract and identify risky clauses.

CONTRACT TEXT:
{contract_text}

Return your analysis in this exact JSON format:
{{
    "overall_risk_score": <1-10 integer>,
    "risky_clauses": [
        {{
            "clause_text": "<exact text from contract>",
            "risk_level": "<high|medium|low>",
            "explanation": "<why this is risky in plain English>",
            "suggestion": "<how to negotiate or what to ask for>"
        }}
    ],
    "summary": "<2-3 sentence overall assessment>",
    "negotiation_points": ["<key points to negotiate>"]
}}

Focus on common red flags like:
- Excessive penalties or fees
- One-sided termination clauses  
- Broad liability or indemnification
- Automatic renewals
- Restrictive non-compete clauses
- Unusual payment terms
"""

    try:
        response = client.chat.completions.create(
            model="deepseek/deepseek-r1",
            messages=[
                {"role": "system", "content": "You are a legal expert who provides clear contract analysis in JSON format."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.1,  # Low temperature for consistent legal analysis
            max_tokens=2000
        )
        
        # Extract and parse JSON response
        content = response.choices[0].message.content
        
        # Clean up response (AI sometimes adds markdown formatting)
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0]
        elif "```" in content:
            content = content.split("```")[1].split("```")[0]
        
        return json.loads(content.strip())
        
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"AI response parsing error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI analysis error: {str(e)}")

@app.get("/")
async def root():
    return {"message": "AI Legal Shield API - Ready to analyze contracts!"}

@app.post("/upload")
async def upload_and_analyze_contract(
    file: UploadFile = File(...),
    userId: str = Form(...),
    userName: str = Form(...),
    contract_type: str = Form(default="general")
):
    """
    File upload endpoint that matches frontend expectations
    """
    
    # Validate file type
    allowed_extensions = ['.txt', '.pdf', '.docx', '.doc']
    file_extension = os.path.splitext(file.filename)[1].lower()
    
    if file_extension not in allowed_extensions:
        raise HTTPException(
            status_code=400, 
            detail=f"Unsupported file type. Allowed: {', '.join(allowed_extensions)}"
        )
    
    try:
        # Read file content
        file_content = await file.read()
        
        # Extract text from file
        contract_text = extract_text_from_file(file_content, file.filename)
        
        if len(contract_text.strip()) < 100:
            raise HTTPException(
                status_code=400, 
                detail="Contract text too short for meaningful analysis (minimum 100 characters)"
            )
        
        # Analyze contract with AI
        analysis_result = await analyze_contract_with_ai(contract_text, contract_type)
        
        # Add metadata for frontend
        analysis_result["filename"] = file.filename
        analysis_result["contract_type"] = contract_type
        analysis_result["user_id"] = userId
        analysis_result["user_name"] = userName
        analysis_result["contract_text"] = contract_text  # Include contract text for chat
        
        return analysis_result
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.post("/analyze-contract", response_model=ContractAnalysisResponse)
async def analyze_contract(request: ContractAnalysisRequest):
    """
    Direct text analysis endpoint (alternative to file upload)
    """
    
    if len(request.contract_text.strip()) < 100:
        raise HTTPException(status_code=400, detail="Contract text too short for meaningful analysis")
    
    try:
        # Call our AI analysis function
        analysis_result = await analyze_contract_with_ai(
            request.contract_text, 
            request.contract_type
        )
        
        # Convert to our response model
        return ContractAnalysisResponse(**analysis_result)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.post("/chat")
async def chat_about_contract(request: ChatRequest):
    """
    Chat endpoint for follow-up questions about the analyzed contract
    """
    
    try:
        # Build context from analysis and chat history
        context_messages = [
            {
                "role": "system", 
                "content": f"""You are an expert legal advisor chatbot. You can ONLY answer questions about the specific contract that was analyzed.

CONTRACT ANALYSIS CONTEXT:
- Contract Type: {request.analysis_result.get('contract_type', 'general')}
- Overall Risk Score: {request.analysis_result.get('overall_risk_score', 'N/A')}/10
- Summary: {request.analysis_result.get('summary', '')}
- Risky Clauses Found: {len(request.analysis_result.get('risky_clauses', []))}
- Negotiation Points: {len(request.analysis_result.get('negotiation_points', []))}

CONTRACT TEXT:
{request.contract_text[:3000]}...

PREVIOUS ANALYSIS RESULTS:
{json.dumps(request.analysis_result, indent=2)}

IMPORTANT RULES:
1. ONLY answer questions related to this specific contract and its analysis
2. If asked about other contracts, legal advice in general, or unrelated topics, politely redirect to the current contract
3. Base your answers on the contract text and analysis results provided
4. Be helpful but remind users to consult a real lawyer for legal decisions
5. Keep responses concise and practical
6. If you need to reference specific clauses, quote them directly from the contract"""
            }
        ]
        
        # Add chat history
        for msg in request.chat_history[-10:]:  # Keep last 10 messages for context
            context_messages.append({
                "role": msg.role,
                "content": msg.content
            })
        
        # Add current user message
        context_messages.append({
            "role": "user",
            "content": request.message
        })
        
        response = client.chat.completions.create(
            model="deepseek/deepseek-r1",
            messages=context_messages,
            temperature=0.3,
            max_tokens=1000
        )
        
        assistant_response = response.choices[0].message.content
        
        return {
            "response": assistant_response,
            "status": "success"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")

@app.get("/health")
async def health_check():
    """Health check endpoint for deployment monitoring"""
    return {"status": "healthy", "service": "ai-legal-shield"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)