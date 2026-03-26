# Detailed Setup Guide

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Configuration](#configuration)
5. [Running the Application](#running-the-application)
6. [Docker Setup (Optional)](#docker-setup-optional)

---

## System Requirements

### Minimum Requirements
- **OS**: Windows 10+, macOS 10.14+, or Linux (Ubuntu 18.04+)
- **RAM**: 4GB (8GB recommended)
- **Storage**: 2GB free space
- **Internet**: Required for Gemini API

### Software Requirements
- **Python 3.9+** - [Download](https://www.python.org/downloads/)
- **Node.js 16+** - [Download](https://nodejs.org/)
- **Git** (optional) - [Download](https://git-scm.com/)

### Verify Installation
```bash
# Check Python
python --version  # Should be 3.9 or higher

# Check Node.js
node --version    # Should be 16 or higher
npm --version     # Should be 8 or higher
```

---

## Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd ai-resume-analyzer/backend
```

### Step 2: Create Python Virtual Environment

#### Windows
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate

# Your terminal should show (venv) prefix
```

#### macOS/Linux
```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Your terminal should show (venv) prefix
```

### Step 3: Install Python Dependencies
```bash
# Upgrade pip first
pip install --upgrade pip

# Install all dependencies
pip install -r requirements.txt

# Verify installation
pip list | grep -E "fastapi|PyPDF2|reportlab|google-generativeai"
```

### Step 4: Set Up Environment Variables

```bash
# Copy example file
cp .env.example .env

# Edit .env file and add your configuration
# Windows: Use Notepad or VS Code
# macOS/Linux: nano .env or vim .env
```

**Edit `.env` with:**
```env
# Get your API key from https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_actual_api_key_here

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,http://localhost:8000
```

### Step 5: Test Backend

```bash
# Run the application
python app/main.py

# Expected output:
# INFO:     Uvicorn running on http://0.0.0.0:8000
# INFO:     Application startup complete
```

### Step 6: Verify Backend is Working

Open another terminal and test:
```bash
# Test health endpoint
curl http://localhost:8000/api/health

# Expected response:
# {"status":"healthy","service":"AI Resume Analyzer"}
```

---

## Frontend Setup

### Step 1: Open New Terminal and Navigate to Frontend

```bash
# New terminal in project root
cd ai-resume-analyzer/frontend
```

### Step 2: Install Node.js Dependencies

```bash
# Install npm packages
npm install

# This may take 1-2 minutes
# Verify: Check for node_modules folder creation

# Check installation
npm list react next axios --depth=0
```

### Step 3: Set Up Environment Variables

```bash
# Copy example file
cp .env.example .env.local

# Edit .env.local
# Windows: Notepad or VS Code
# macOS/Linux: nano .env.local or vim .env.local
```

**Edit `.env.local` with:**
```env
# Backend API URL (should match backend port)
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Step 4: Run Development Server

```bash
# Start Next.js development server
npm run dev

# Expected output:
# ▲ Next.js 14.0.0
# - Local:        http://localhost:3000
# - Environments: .env.local
```

### Step 5: Access the Application

Open your browser and visit:
```
http://localhost:3000
```

You should see the AI Resume Analyzer home page!

---

## Configuration

### Environment Variables Explained

#### Backend (`.env`)
| Variable | Purpose | Example |
|----------|---------|---------|
| GEMINI_API_KEY | Google Gemini API key for AI | `AIza...` |
| CORS_ORIGINS | Allowed frontend origins | `http://localhost:3000` |

#### Frontend (`.env.local`)
| Variable | Purpose | Example |
|----------|---------|---------|
| NEXT_PUBLIC_API_URL | Backend API endpoint | `http://localhost:8000/api` |

### Changing Ports

#### Change Backend Port
Edit `backend/app/main.py`:
```python
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)  # Change 8000 to 8001
```

#### Change Frontend Port
```bash
npm run dev -- -p 3001  # Use port 3001 instead of 3000
```

---

## Running the Application

### Full Setup Checklist

- [ ] Python 3.9+ installed
- [ ] Node.js 16+ installed
- [ ] Backend virtual environment created and activated
- [ ] Backend dependencies installed
- [ ] Backend `.env` configured with Gemini API key
- [ ] Frontend dependencies installed
- [ ] Frontend `.env.local` configured

### Start Everything

**Terminal 1 - Backend:**
```bash
cd ai-resume-analyzer/backend
venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # macOS/Linux

python app/main.py
```

**Terminal 2 - Frontend:**
```bash
cd ai-resume-analyzer/frontend
npm run dev
```

**Terminal 3 (Optional) - Useful for testing:**
```bash
# Keep open for running curl commands or checking logs
```

### Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Alternative API Docs**: http://localhost:8000/redoc

---

## Docker Setup (Optional)

### Using Docker Compose

1. **Create `docker-compose.yml`** in project root:
```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - CORS_ORIGINS=http://localhost:3000
    volumes:
      - ./backend:/app

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000/api
    depends_on:
      - backend
    volumes:
      - ./frontend:/app

```

2. **Create backend Dockerfile**:
```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "app/main.py"]
```

3. **Create frontend Dockerfile**:
```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

4. **Run with Docker**:
```bash
docker-compose up
```

---

## Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
# Find and kill process on port 8000
# Windows: netstat -ano | findstr :8000
# macOS/Linux: lsof -i :8000
```

**Module not found errors:**
```bash
# Reinstall dependencies
pip install --force-reinstall -r requirements.txt
```

**Gemini API Key error:**
```bash
# Verify API key in .env
# Regenerate at https://makersuite.google.com/app/apikey
```

### Frontend Issues

**Port 3000 already in use:**
```bash
# Use different port
npm run dev -- -p 3001
```

**Module not found:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**API connection refused:**
```bash
# Ensure backend is running
# Check NEXT_PUBLIC_API_URL in .env.local matches backend URL
```

### Common Errors

| Error | Fix |
|-------|-----|
| `ModuleNotFoundError: No module named 'fastapi'` | Run `pip install -r requirements.txt` |
| `CORS policy: No 'Access-Control-Allow-Origin'` | Check `CORS_ORIGINS` in backend `.env` |
| `Cannot GET /api/analyze` | Backend server stopped, restart it |
| `NEXT_PUBLIC_API_URL is undefined` | Create `.env.local` in frontend folder |

---

## Next Steps

1. ✅ Complete setup and verify both servers running
2. 📝 Test with sample job description and resume
3. 🔧 Customize styling in `frontend/styles/`
4. 🚀 Deploy to production
5. 📊 Monitor logs and optimize performance

---

## Support

For issues:
1. Check troubleshooting section
2. Review terminal logs for error messages
3. Verify all files created correctly
4. Re-read configuration section

---

**Setup Complete! Happy analyzing! 🚀**
