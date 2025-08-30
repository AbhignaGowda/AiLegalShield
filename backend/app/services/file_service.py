import io
import os
from typing import Union
import PyPDF2
import docx
from fastapi import HTTPException, UploadFile

from app.config import settings

class FileService:
    @staticmethod
    def validate_file(filename: str) -> None:
        """Validate file extension"""
        file_extension = os.path.splitext(filename)[1].lower()
        if file_extension not in settings.ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file type. Allowed: {', '.join(settings.ALLOWED_EXTENSIONS)}"
            )

    @staticmethod
    def extract_text_from_file(file_content: bytes, filename: str) -> str:
        """Extract text from uploaded files"""
        try:
            if filename.lower().endswith('.pdf'):
                return FileService._extract_pdf_text(file_content)
            elif filename.lower().endswith(('.docx', '.doc')):
                return FileService._extract_docx_text(file_content)
            elif filename.lower().endswith('.txt'):
                return file_content.decode('utf-8').strip()
            else:
                raise ValueError(f"Unsupported file type: {filename}")
        except Exception as e:
            raise HTTPException(
                status_code=400,
                detail=f"Error extracting text from file: {str(e)}"
            )

    @staticmethod
    def _extract_pdf_text(file_content: bytes) -> str:
        """Extract text from PDF"""
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_content))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
        return text.strip()

    @staticmethod
    def _extract_docx_text(file_content: bytes) -> str:
        """Extract text from Word document"""
        doc = docx.Document(io.BytesIO(file_content))
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        return text.strip()

    @staticmethod
    def validate_contract_text(text: str) -> None:
        """Validate contract text length"""
        if len(text.strip()) < settings.MIN_CONTRACT_LENGTH:
            raise HTTPException(
                status_code=400,
                detail=f"Contract text too short for meaningful analysis (minimum {settings.MIN_CONTRACT_LENGTH} characters)"
            )