from fastapi import HTTPException

class ContractAnalysisException(HTTPException):
    """Custom exception for contract analysis errors"""
    pass

class FileProcessingException(HTTPException):
    """Custom exception for file processing errors"""
    pass

class AIServiceException(HTTPException):
    """Custom exception for AI service errors"""
    pass