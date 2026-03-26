# AI Resume Analyzer & Optimizer

A production-ready full-stack web application that analyzes resumes against job descriptions using AI, provides detailed matching scores, and generates optimized ATS-friendly resumes.

**Portfolio-ready | Placement-level project | Production architecture**

---

## 🎯 Features

- ✅ **AI Resume Analysis**: Deep comparison of resume with job description
- ✅ **Comprehensive Scoring**: Skills, keywords, experience, and ATS compatibility scores
- ✅ **Smart Suggestions**: Get actionable improvement recommendations
- ✅ **Resume Optimization**: AI-powered resume generator with best practices
- ✅ **PDF Download**: Download optimized resume as professional PDF
- ✅ **ATS Detection**: Identify and fix ATS compatibility issues
- ✅ **Responsive Design**: Works seamlessly on desktop and mobile
- ✅ **Modern UI**: Clean, professional interface with real-time feedback

---

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with SSR
- **CSS3** - Pure CSS (no heavy frameworks)
- **Responsive Design** - Mobile-first approach
- **Axios** - HTTP client for API calls

### Backend
- **Python 3.9+** - Core language
- **FastAPI** - Modern, fast REST API framework
- **Google Gemini API** - AI for analysis and optimization
- **PyPDF2** - PDF file handling
- **ReportLab** - PDF generation
- **Pydantic** - Data validation

### Infrastructure
- **MongoDB** - Optional for saving analysis history
- **CORS** - Cross-origin resource sharing
- **Environment Variables** - Secure configuration

---

## 📁 Project Structure

```
ai-resume-analyzer/
├── backend/
│   ├── app/
│   │   ├── core/
│   │   │   └── config.py           # Configuration & settings
│   │   ├── routes/
│   │   │   └── analyze.py          # API endpoints
│   │   ├── services/
│   │   │   └── ai_service.py       # AI analysis logic
│   │   ├── utils/
│   │   │   └── pdf_handler.py      # PDF parsing & generation
│   │   └── main.py                 # FastAPI application
│   ├── requirements.txt            # Python dependencies
│   ├── .env.example                # Environment variables template
│   └── run.py                      # Startup script
│
├── frontend/
│   ├── pages/
│   │   ├── index.js                # Home/analyzer page
│   │   ├── results.js              # Results display page
│   │   ├── _app.js                 # Next.js app wrapper
│   ├── components/
│   │   ├── Header.js               # Header component
│   │   ├── Footer.js               # Footer component
│   │   ├── ResumeForm.js           # Resume upload form
│   │   ├── ResultsDisplay.js       # Results presentation
│   │   └── UI.js                   # Reusable UI components
│   ├── styles/
│   │   ├── globals.css             # Global styles
│   │   └── styles.css              # Component styles
│   ├── utils/
│   │   └── api.js                  # API client
│   ├── package.json                # NPM dependencies
│   ├── next.config.js              # Next.js configuration
│   └── .env.example                # Environment variables template
│
├── README.md                       # This file
├── SETUP.md                        # Detailed setup guide
└── API_DOCUMENTATION.md            # API endpoints reference
```

---

## 🚀 Quick Start

### Prerequisites
- Python 3.9 or higher
- Node.js 16 or higher
- npm or yarn
- Google Gemini API key (free tier available)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd ai-resume-analyzer/backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment**
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_key_here
   CORS_ORIGINS=http://localhost:3000,http://localhost:8000
   ```

6. **Start backend server**
   ```bash
   python app/main.py
   ```
   
   Server runs on `http://localhost:8000`

### Frontend Setup

1. **In a new terminal, navigate to frontend directory**
   ```bash
   cd ai-resume-analyzer/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   Application runs on `http://localhost:3000`

---

## 🔑 Getting Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key
4. Paste it in backend `.env` file

---

## 📊 API Endpoints

### POST `/api/analyze`
Analyze resume against job description

**Request:**
```http
POST /api/analyze HTTP/1.1
Content-Type: multipart/form-data

job_description=<text>
resume_file=<pdf_or_txt_file>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "overall_score": 8,
    "skill_score": 9,
    "keyword_score": 7,
    "experience_score": 8,
    "ats_compatibility_score": 8,
    "matching_skills": ["Python", "FastAPI", "React"],
    "missing_keywords": ["Docker", "Kubernetes"],
    "missing_skills": ["DevOps"],
    "strengths": [...],
    "weaknesses": [...],
    "improvement_suggestions": [...],
    "ats_issues": [],
    "optimized_resume": "..."
  }
}
```

### GET `/api/download`
Download optimized resume as PDF

**Response:** PDF file stream

### GET `/api/health`
Health check endpoint

---

## 🎨 UI Components

### Layout
- **Responsive Grid System** - Auto-adapting layouts
- **Card-based Design** - Modern card containers
- **Professional Typography** - Clean, readable fonts
- **Consistent Spacing** - Proper margins and padding

### Features
- **Score Visualization** - Circular scores with color gradients
- **Progress Bars** - Visual representation of scores
- **Draggable Upload** - Smooth file upload experience
- **Real-time Validation** - Instant user feedback
- **Loading States** - Clear progress indication

---

## 📝 Example Usage Flow

1. **User visits** `http://localhost:3000`
2. **Pastes job description** in textarea
3. **Uploads resume** (PDF or text file)
4. **Clicks "Analyze Resume"**
5. **Backend receives request** and processes with Gemini AI
6. **Frontend displays results** with scores and suggestions
7. **User reviews findings**
8. **Clicks "Download PDF"** to get optimized resume

---

## 🔐 Security Features

- ✅ CORS protection with origin validation
- ✅ File type validation (PDF/text only)
- ✅ Environment variables for sensitive data
- ✅ Input validation on frontend and backend
- ✅ Error handling without exposing stack traces

---

## 🧪 Testing

### Test with Sample Data

**Sample Job Description:**
```
Senior Full-Stack Developer
Required Skills: Python, React, FastAPI, PostgreSQL
Experience: 5+ years
Nice to have: Docker, AWS
```

**Sample Resume File:**
Create a text file with:
```
John Doe
Full-Stack Developer

Skills: Python, React, JavaScript, FastAPI

Experience:
Senior Developer - TechCorp (2020-2024)
- Led development of 10+ production applications
- Mentored 5 junior developers
- Improved API performance by 40%
```

---

## 📈 Performance Metrics

- **API Response Time**: < 10 seconds
- **Frontend Load Time**: < 2 seconds
- **PDF Generation**: < 3 seconds
- **AI Analysis**: ~30-60 seconds (dependent on content length)

---

## 🚢 Production Deployment

### Backend (Python)
```bash
# Use production ASGI server
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app.main:app
```

### Frontend (Next.js)
```bash
# Build for production
npm run build
npm start
```

### Environment Setup
- Use managed service (Heroku, Railway, Render)
- Set secure environment variables
- Configure database (MongoDB Atlas)
- Use CDN for static assets

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS errors | Check `CORS_ORIGINS` in backend `.env` |
| API not responding | Ensure backend running on port 8000 |
| PDF generation fails | Check ReportLab installation |
| Resume not uploading | Verify file is PDF or TXT format |
| Gemini API key error | Validate API key in `.env` file |

---

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Google Gemini API](https://ai.google.dev)
- [PyPDF2 Documentation](https://pypdf2.readthedocs.io)
- [ReportLab Documentation](https://www.reportlab.com)

---

## 👥 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check [issues page](https://github.com/prince-up/ai-resume-analyzer/issues) for open issues.

---

## 📄 License

MIT License - feel free to use this project for personal and commercial purposes.

---

## 🙋 Support

For support, email support@airesume.com or open an issue in the GitHub repository.

---

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ Full-stack web development
- ✅ AI/ML integration
- ✅ RESTful API design
- ✅ PDF processing
- ✅ Modern frontend architecture
- ✅ DevOps practices
- ✅ Production-ready code patterns
- ✅ Professional UI/UX

Perfect for portfolios, interviews, and real-world applications!

---

**Built with ❤️ for career growth**

*Last updated: January 2025*
