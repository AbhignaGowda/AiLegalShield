from fastapi import APIRouter, UploadFile, File, Depends
from app.services.auth import get_current_user
from app.services.chunker import chunk_text
from app.services.embedder import embed_chunks
from app.services.vector_store import store_embeddings
from pypdf import PdfReader


from app.services.text_cleaner import clean_text

router = APIRouter()


@router.post("/")
async def upload_contract(
    file: UploadFile = File(...), user: str = Depends(get_current_user)
):
    text = ""

    if file.filename.endswith(".pdf"):
        reader = PdfReader(file.file)
        for page in reader.pages:
            text += page.extract_text() or ""

    text = clean_text(text)
    chunks = chunk_text(text)
    vectors = embed_chunks(chunks)
    store_embeddings(chunks, vectors)

    from app.services.ai_analyzer import analyze_risk

    analysis_result = analyze_risk(
        text,
        "Analyze this entire contract for risks, liabilities, and negotiation points.",
    )

    return {
        "message": "Contract uploaded and analyzed successfully",
        "filename": file.filename,
        "analysis": analysis_result,
        "total_chunks": len(chunks),
    }
