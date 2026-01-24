from fastapi import APIRouter, UploadFile, File
from app.services.chunker import chunk_text
from app.services.embedder import embed_chunks
from app.services.vector_store import store_embeddings
from pypdf import PdfReader

router = APIRouter()


@router.post("/")
async def upload_contract(file: UploadFile = File(...)):
    text = ""

    if file.filename.endswith(".pdf"):
        reader = PdfReader(file.file)
        for page in reader.pages:
            text += page.extract_text()

    chunks = chunk_text(text)
    vectors = embed_chunks(chunks)
    store_embeddings(chunks, vectors)

    return {
        "message": "Contract uploaded successfully",
        "chunks": len(chunks),
        "vectors": len(vectors),
    }
