import os
from typing import List
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    # API Keys
    OPENROUTER_API_KEY: str = os.getenv("OPENROUTER_API_KEY")
    
    # CORS
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000"]
    
    # AI Settings
    AI_MODEL: str = "deepseek/deepseek-r1"
    AI_TEMPERATURE: float = 0.1
    AI_MAX_TOKENS: int = 2000
    CHAT_MAX_TOKENS: int = 1000
    CHAT_TEMPERATURE: float = 0.3
    
    # File Upload
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    ALLOWED_EXTENSIONS: List[str] = ['.txt', '.pdf', '.docx', '.doc']
    MIN_CONTRACT_LENGTH: int = 100
    
    class Config:
        env_file = ".env"

settings = Settings()