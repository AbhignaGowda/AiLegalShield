"""Contract upload endpoint with file validation."""
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, Request
from pypdf import PdfReader
from pypdf.errors import PdfStreamError
import magic
import io
import logging

from app.services.auth import get_current_user
from app.services.chunker import chunk_text
from app.services.embedder import embed_chunks
from app.services.vector_store import get_user_store
from app.services.text_cleaner import clean_text
from app.core.config import MAX_FILE_SIZE_BYTES

logger = logging.getLogger(__name__)
router = APIRouter()

ALLOWED_MIME_TYPES = {"application/pdf": [".pdf"]}


def validate_file(file: UploadFile, content: bytes) -> tuple[bool, str]:
    filename = file.filename or ""
    extension = "." + filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
    
    if not extension:
        return False, "File must have an extension"
    
    try:
        mime_type = magic.from_buffer(content, mime=True)
    except Exception:
        return False, "Could not determine file type"
    
    if mime_type not in ALLOWED_MIME_TYPES:
        return False, f"File type '{mime_type}' is not allowed. Only PDF files are accepted."
    
    if extension not in ALLOWED_MIME_TYPES[mime_type]:
        return False, "File extension does not match content type"
    
    return True, "Valid"


@router.post("/")
async def upload_contract(request: Request, file: UploadFile = File(...), user: str = Depends(get_current_user)):
    content = await file.read()
    
    if len(content) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(status_code=413, detail=f"File too large. Maximum size is {MAX_FILE_SIZE_BYTES // (1024*1024)}MB")
    
    if len(content) == 0:
        raise HTTPException(status_code=400, detail="Empty file uploaded")
    
    is_valid, message = validate_file(file, content)
    if not is_valid:
        raise HTTPException(status_code=400, detail=message)
    
    try:
        reader = PdfReader(io.BytesIO(content))
        text = "\n".join(page.extract_text() or "" for page in reader.pages)
        
        if not text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from PDF")
            
    except PdfStreamError:
        logger.warning(f"Malformed PDF from user {user}")
        raise HTTPException(status_code=400, detail="Invalid or corrupted PDF file")
    except Exception as e:
        logger.error(f"PDF error for user {user}: {type(e).__name__}")
        raise HTTPException(status_code=400, detail="Error processing PDF file")
    
    text = clean_text(text)
    chunks = chunk_text(text)
    vectors = embed_chunks(chunks)
    
    user_store = get_user_store(user)
    user_store.store_embeddings(chunks, vectors)
    
    from app.services.ai_analyzer import analyze_risk
    
    try:
        analysis_result = analyze_risk(text, "Analyze this contract for risks and negotiation points.")
    except Exception as e:
        logger.error(f"AI error for user {user}: {type(e).__name__}")
        raise HTTPException(status_code=500, detail="Error analyzing contract")

    return {
        "message": "Contract uploaded and analyzed successfully",
        "filename": file.filename,
        "analysis": analysis_result,
        "total_chunks": len(chunks),
    }
