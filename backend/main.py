from fastapi import FastAPI, UploadFile, File, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="AI Legal Shield API",
    description="AI-powered contract analysis API",
    version="1.0.0",
)

# Updated CORS - more permissive for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "AI Legal Shield API is running", "status": "healthy"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "environment": os.getenv("ENVIRONMENT", "development")}

# File upload endpoint
@app.post("/api/v1/upload/contract")
async def upload_contract(file: UploadFile = File(...)):
    try:
        # Validate file type
        allowed_types = ["application/pdf", "text/plain", 
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
        
        if file.content_type not in allowed_types:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File type not supported. Please upload PDF, DOCX, or TXT files."
            )
        
        # Read file content
        content = await file.read()
        file_size = len(content)
        
        # Validate file size (10MB limit)
        if file_size > 10 * 1024 * 1024:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail="File size too large. Maximum size is 10MB."
            )
        
        return {
            "filename": file.filename,
            "file_size": file_size,
            "content_type": file.content_type,
            "status": "uploaded",
            "message": "File uploaded successfully"
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error uploading file: {str(e)}"
        )