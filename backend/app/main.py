from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routes.analyze import router as analyze_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description="AI Resume Analyzer and Optimizer API"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(analyze_router, prefix="/api", tags=["Resume Analysis"])

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to AI Resume Analyzer API",
        "version": settings.PROJECT_VERSION,
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
