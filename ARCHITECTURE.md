# 🏗️ Application Architecture & Data Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE (Web Browser)                       │
│                          http://localhost:3000                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────┐      │
│  │                   FRONTEND (Next.js + React)                    │      │
│  ├─────────────────────────────────────────────────────────────────┤      │
│  │                                                                   │      │
│  │  ┌─────────────────────┐    ┌──────────────────────────────┐   │      │
│  │  │   Home Page (/)     │    │   Results Page (/results)    │   │      │
│  │  ├─────────────────────┤    ├──────────────────────────────┤   │      │
│  │  │ - Header Component  │    │ - Score Display              │   │      │
│  │  │ - ResumeForm        │    │ - Score Breakdown            │   │      │
│  │  │ - Footer Component  │    │ - Suggestions List           │   │      │
│  │  │                     │    │ - Download Button            │   │      │
│  │  │ Features:           │    │ - ResultsDisplay Component   │   │      │
│  │  │ - JD Textarea       │    │                              │   │      │
│  │  │ - File Upload       │    │ Data Source:                 │   │      │
│  │  │ - Form Validation   │    │ - Session Storage            │   │      │
│  │  └─────────────────────┘    └──────────────────────────────┘   │      │
│  │                                                                   │      │
│  │  ┌────────────────────────────────────────────────────────┐    │      │
│  │  │          UI Components (Reusable)                       │    │      │
│  │  ├────────────────────────────────────────────────────────┤    │      │
│  │  │ - ScoreCard (circular progress)                         │    │      │
│  │  │ - ProgressBar (linear progress)                         │    │      │
│  │  │ - Badge (skill tags)                                    │    │      │
│  │  │ - Alert (notifications)                                │    │      │
│  │  │ - Loader (loading state)                               │    │      │
│  │  └────────────────────────────────────────────────────────┘    │      │
│  │                                                                   │      │
│  │  ┌────────────────────────────────────────────────────────┐    │      │
│  │  │        CSS Styling (Pure CSS)                           │    │      │
│  │  ├────────────────────────────────────────────────────────┤    │      │
│  │  │ - Global CSS (globals.css)                              │    │      │
│  │  │ - Component Styles (styles.css)                         │    │      │
│  │  │ - Responsive Design (mobile-first)                     │    │      │
│  │  │ - CSS Variables for theming                             │    │      │
│  │  └────────────────────────────────────────────────────────┘    │      │
│  │                                                                   │      │
│  │  ┌────────────────────────────────────────────────────────┐    │      │
│  │  │       API Client (utils/api.js)                         │    │      │
│  │  ├────────────────────────────────────────────────────────┤    │      │
│  │  │ - analyzeResume() → POST /api/analyze                  │    │      │
│  │  │ - downloadResume() → GET /api/download                 │    │      │
│  │  │ - Axios HTTP client                                     │    │      │
│  │  │ - Error handling                                        │    │      │
│  │  └────────────────────────────────────────────────────────┘    │      │
│  │                                                                   │      │
│  └─────────────────────────────────────────────────────────────────┘      │
│                                ▼                                           │
│                    HTTP Request/Response (JSON)                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────┐
│                      BACKEND (FastAPI + Python)                           │
│                        http://localhost:8000                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────┐      │
│  │              FastAPI Application (main.py)                      │      │
│  ├─────────────────────────────────────────────────────────────────┤      │
│  │                                                                   │      │
│  │  ┌────────────────────────┐  ┌──────────────────────────────┐  │      │
│  │  │   CORS Middleware      │  │   Route Handler             │  │      │
│  │  ├────────────────────────┤  ├──────────────────────────────┤  │      │
│  │  │ - Allow Origins        │  │ @app.post('/analyze')        │  │      │
│  │  │ - Allow Methods        │  │ @app.get('/download')        │  │      │
│  │  │ - Allow Headers        │  │ @app.get('/health')          │  │      │
│  │  └────────────────────────┘  └──────────────────────────────┘  │      │
│  │                                                                   │      │
│  │  ┌──────────────────────────────────────────────────────────┐  │      │
│  │  │           Route: POST /api/analyze                       │  │      │
│  │  ├──────────────────────────────────────────────────────────┤  │      │
│  │  │ Input:  job_description (text)                           │  │      │
│  │  │         resume_file (PDF/TXT)                            │  │      │
│  │  │                                                           │  │      │
│  │  │ ┌──────────────────────────────────────────────────────┐ │  │      │
│  │  │ │1. PDF Handler (pdf_handler.py)                        │ │  │      │
│  │  │ │   - extract_text_from_pdf()                           │ │  │      │
│  │  │ │   - Extract text from uploaded file                   │ │  │      │
│  │  │ └──────────────────────────────────────────────────────┘ │  │      │
│  │  │                          ▼                               │  │      │
│  │  │ ┌──────────────────────────────────────────────────────┐ │  │      │
│  │  │ │2. Input Validation                                    │ │  │      │
│  │  │ │   - Check JD not empty                                │ │  │      │
│  │  │ │   - Check resume not empty                            │ │  │      │
│  │  │ │   - File format validation                            │ │  │      │
│  │  │ └──────────────────────────────────────────────────────┘ │  │      │
│  │  │                          ▼                               │  │      │
│  │  │ ┌──────────────────────────────────────────────────────┐ │  │      │
│  │  │ │3. AI Service (ai_service.py)                          │ │  │      │
│  │  │ │   - analyze_and_optimize()                            │ │  │      │
│  │  │ │   - Call Gemini API                                   │ │  │      │
│  │  │ └──────────────────────────────────────────────────────┘ │  │      │
│  │  │                          ▼                               │  │      │
│  │  │ ┌──────────────────────────────────────────────────────┐ │  │      │
│  │  │ │4. Parse AI Response                                   │ │  │      │
│  │  │ │   - Extract JSON                                      │ │  │      │
│  │  │ │   - Validate structure                                │ │  │      │
│  │  │ │   - Store optimized_resume                            │ │  │      │
│  │  │ └──────────────────────────────────────────────────────┘ │  │      │
│  │  │                          ▼                               │  │      │
│  │  │ Output: JSON Response                                    │  │      │
│  │  │         {                                                │  │      │
│  │  │          overall_score: 8,                               │  │      │
│  │  │          skill_score: 9,                                 │  │      │
│  │  │          keyword_score: 7,                               │  │      │
│  │  │          experience_score: 8,                            │  │      │
│  │  │          ats_compatibility_score: 8,                     │  │      │
│  │  │          matching_skills: [...],                         │  │      │
│  │  │          missing_keywords: [...],                        │  │      │
│  │  │          ... more fields ...                             │  │      │
│  │  │         }                                                │  │      │
│  │  └──────────────────────────────────────────────────────────┘  │      │
│  │                                                                   │      │
│  │  ┌──────────────────────────────────────────────────────────┐  │      │
│  │  │           Route: GET /api/download                       │  │      │
│  │  ├──────────────────────────────────────────────────────────┤  │      │
│  │  │ Input:  None (uses stored last_generated_resume)         │  │      │
│  │  │                                                           │  │      │
│  │  │ ┌──────────────────────────────────────────────────────┐ │  │      │
│  │  │ │ PDF Handler (pdf_handler.py)                         │ │  │      │
│  │  │ │ - generate_resume_pdf()                              │ │  │      │
│  │  │ │ - Convert text to PDF                                │ │  │      │
│  │  │ │ - Apply formatting                                   │ │  │      │
│  │  │ └──────────────────────────────────────────────────────┘ │  │      │
│  │  │                          ▼                               │  │      │
│  │  │ Output: Binary PDF file                                  │  │      │
│  │  └──────────────────────────────────────────────────────────┘  │      │
│  │                                                                   │      │
│  └─────────────────────────────────────────────────────────────────┘      │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────┐      │
│  │        External Services & Configuration                        │      │
│  ├─────────────────────────────────────────────────────────────────┤      │
│  │                                                                   │      │
│  │  ┌──────────────────────────────────────────────────────────┐  │      │
│  │  │ Configuration (core/config.py)                           │  │      │
│  │  │ - Load environment variables                             │  │      │
│  │  │ - GEMINI_API_KEY                                         │  │      │
│  │  │ - CORS_ORIGINS                                           │  │      │
│  │  └──────────────────────────────────────────────────────────┘  │      │
│  │                                                                   │      │
│  │  ┌──────────────────────────────────────────────────────────┐  │      │
│  │  │ Google Gemini API                                        │  │      │
│  │  │ - gemini-pro model                                       │  │      │
│  │  │ - Analyzes resume & JD                                   │  │      │
│  │  │ - Returns structured JSON                                │  │      │
│  │  │ - Rate: Free tier available                              │  │      │
│  │  └──────────────────────────────────────────────────────────┘  │      │
│  │                                                                   │      │
│  └─────────────────────────────────────────────────────────────────┘      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow Diagram

```
User Action                   Frontend Processing              Backend Processing
─────────────                ───────────────────             ──────────────────────

1. Paste JD          ─────►  Store in state              
                              Display in textarea
                              
2. Upload Resume     ─────►  Validate file type
                              Show filename
                              Read file content
                              
3. Click Analyze     ─────►  Collect form data     ─────►  POST /api/analyze
                              Create FormData
                              Disable form                  ├─ Extract PDF text
                              Show loading                  ├─ Validate inputs
                                                           ├─ Call Gemini AI
                                                           ├─ Parse response
                                                           ├─ Store optimized resume
                                                           └─ Return JSON
                                                           
4. Receive Response  ◄─────  Parse response       ◄─────  Response with:
                              Store in session              - Scores
                              Redirect to results          - Suggestions
                                                           - Optimized resume
                                                           
5. View Results      ─────►  Display scores
                              Show suggestions
                              Enable download
                              
6. Download PDF      ─────►  Click download       ─────►  GET /api/download
                              Request PDF                  ├─ Get stored resume
                                                           ├─ Generate PDF
                                                           ├─ Set headers
                                                           └─ Return binary
                                                           
                             ◄─────  Save PDF              
                              Browser saves file
```

---

## 🔄 Component Interaction

```
┌─────────────────┐
│   User Browser  │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│  Next.js Pages          │
├─────────────────────────┤
│ - index.js (/)          │
│ - results.js (/results) │
└────┬────────────────────┘
     │
     ├──────────────────┬──────────────────┐
     ▼                  ▼                  ▼
  ┌──────────┐   ┌──────────────┐   ┌──────────────┐
  │ Header   │   │ ResumeForm   │   │ ResultsDisplay│
  │ Footer   │   │ Components   │   │ Components   │
  │          │   │ UI Elements  │   │ UI Elements  │
  └────┬─────┘   └──────┬───────┘   └──────┬───────┘
       │                 │                 │
       └─────────────────┼─────────────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │  Styling              │
            ├────────────────────────┤
            │ - globals.css          │
            │ - styles.css           │
            │ - CSS Variables        │
            │ - Responsive Design    │
            └────────────────────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │  API Client (api.js)  │
            ├────────────────────────┤
            │ - analyzeResume()      │
            │ - downloadResume()     │
            │ - Axios Instance       │
            │ - Error Handling       │
            └────────┬───────────────┘
                     │ HTTP
                     ▼
            ┌──────────────────────────┐
            │  FastAPI Backend         │
            ├──────────────────────────┤
            │ - /api/analyze (POST)    │
            │ - /api/download (GET)    │
            │ - /api/health (GET)      │
            └────────┬─────────────────┘
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
    ┌────────┐ ┌──────────┐ ┌────────────┐
    │ Config │ │AI Service│ │PDF Handler │
    │(core/) │ │(services)│ │(utils/)    │
    └────────┘ └────┬─────┘ └────────────┘
                    │
                    ▼
            ┌──────────────────┐
            │ Gemini API       │
            │ (External)       │
            └──────────────────┘
```

---

## 📋 Key Files & Their Responsibilities

### Backend Files
```
backend/
├── run.py                              # Entry point (python run.py)
├── requirements.txt                    # Dependencies (pip install)
├── .env / .env.example                 # Configuration
│
└── app/
    ├── main.py                         # FastAPI app setup
    │   └─ Creates FastAPI instance
    │   └─ Setup CORS
    │   └─ Include routes
    │
    ├── core/config.py                  # Configuration
    │   └─ Load .env variables
    │   └─ Settings class
    │
    ├── routes/analyze.py               # API Endpoints
    │   ├─ @POST /api/analyze
    │   │  └─ Business logic for analysis
    │   ├─ @GET /api/download
    │   │  └─ PDF download endpoint
    │   └─ @GET /api/health
    │      └─ Health check
    │
    ├── services/ai_service.py          # AI Logic
    │   ├─ AIResumeAnalyzer class
    │   ├─ analyze_and_optimize()
    │   │  └─ Calls Gemini API
    │   │  └─ Parses JSON response
    │   └─ generate_optimized_resume()
    │      └─ Creates improved resume text
    │
    └── utils/pdf_handler.py            # PDF Operations
        ├─ PDFHandler class
        ├─ extract_text_from_pdf()
        │  └─ Reads PDF files
        └─ generate_resume_pdf()
           └─ Creates PDF files
```

### Frontend Files
```
frontend/
├── package.json                        # Dependencies (npm install)
├── next.config.js                      # Next.js config
├── .env.local / .env.example           # Configuration
│
├── pages/
│   ├── _app.js                         # App wrapper
│   │   └─ Import global CSS
│   ├── index.js                        # Home page (/)
│   │   ├─ ResumeForm component
│   │   └─ Call analyzeResume()
│   └── results.js                      # Results page (/results)
│       └─ ResultsDisplay component
│
├── components/
│   ├── Header.js                       # Header
│   ├── Footer.js                       # Footer
│   ├── ResumeForm.js                   # Form
│   │   ├─ State: jobDescription, resumeFile
│   │   ├─ handleFileChange()
│   │   ├─ handleDrop()
│   │   └─ handleSubmit()
│   ├── ResultsDisplay.js               # Results
│   │   ├─ Display scores
│   │   ├─ Display suggestions
│   │   └─ Download button
│   └── UI.js                           # Reusable UI
│       ├─ ScoreCard
│       ├─ ProgressBar
│       ├─ Badge
│       ├─ Alert
│       └─ Loader
│
├── styles/
│   ├── globals.css                     # Global styles
│   │   ├─ CSS variables
│   │   ├─ Reset styles
│   │   └─ Base elements
│   └── styles.css                      # Component styles
│       ├─ Layout
│       ├─ Cards
│       ├─ Forms
│       ├─ Buttons
│       └─ Responsive
│
└── utils/
    └── api.js                          # API Client
        ├─ analyzeResume()
        ├─ downloadResume()
        └─ Axios instance
```

---

## 🔗 API Connection Flow

```
1. User submits form on index.js
   ↓
2. ResumeForm calls onAnalyze(formData)
   ↓
3. index.js calls analyzeResume(formData)
   ↓
4. api.js POST /api/analyze with FormData
   ↓
5. FastAPI receives request
   ↓
6. routes/analyze.py processes
   - Extract text from PDF
   - Validate inputs
   - Call AI service
   - Return JSON
   ↓
7. Frontend receives JSON response
   ↓
8. Store in sessionStorage
   ↓
9. Redirect to /results
   ↓
10. results.js loads data from sessionStorage
    ↓
11. ResultsDisplay renders scores & suggestions
    ↓
12. User clicks download
    ↓
13. Frontend calls downloadResume()
    ↓
14. Backend GET /api/download
    ↓
15. Returns PDF file
    ↓
16. Browser saves optimized_resume.pdf
```

---

## 📐 Scalability Considerations

### Current Setup
- Single server (can handle 5-10 concurrent requests)
- In-memory storage (last_generated_resume)
- No database

### For Scale (Future)
```
Frontend
├─ Vercel CDN (fast worldwide delivery)
└─ Multiple instance support

Backend
├─ Multiple FastAPI instances
├─ Load balancer (nginx/haproxy)
├─ Redis cache (for sessions)
├─ Database (MongoDB/PostgreSQL)
│  ├─ Store analysis results
│  ├─ User history
│  └─ Usage analytics
└─ Queue system (Celery/RabbitMQ)
   └─ For async AI processing

Monitoring
├─ Logging (ELK stack)
├─ Monitoring (DataDog/NewRelic)
├─ Performance tracking
└─ Error tracking (Sentry)
```

---

## 🔒 Security Architecture

```
Input Validation
├─ Frontend validation (immediate feedback)
├─ File type checking
├─ Size limits
└─ Content validation

CORS Protection
├─ Allow only trusted origins
├─ Method whitelisting
└─ Header validation

Error Handling
├─ No stack traces to client
├─ Generic error messages
├─ Logging for debugging
└─ Rate limiting ready

Environment Security
├─ API keys in .env (not in code)
├─ .gitignore prevents leaks
└─ Separate dev/prod configs
```

---

## 📊 Performance Optimization

```
Frontend
├─ Next.js automatic code splitting
├─ Image optimization
├─ CSS minification  
├─ Session storage for results
└─ Lazy loading (if needed)

Backend
├─ FastAPI async support
├─ File streaming for downloads
├─ Error caching prevention
├─ Connection pooling (for DB)
└─ Request validation

Network
├─ Gzip compression
├─ HTTP/2 support
├─ CDN caching headers
└─ Minimal API responses
```

---

**This architecture ensures:**
✅ Clean separation of concerns
✅ Scalability
✅ Security
✅ Performance
✅ Maintainability
✅ Extensibility

**Ready for production deployment!**
