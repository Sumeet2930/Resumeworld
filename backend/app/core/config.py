import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    CORS_ORIGINS: list = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://localhost:8000").split(",")
    PROJECT_NAME: str = "AI Resume Analyzer"
    PROJECT_VERSION: str = "1.0.0"

settings = Settings()
