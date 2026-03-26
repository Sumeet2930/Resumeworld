# AI Resume Analyzer - Quick Start

## 1️⃣ Backend Setup (Terminal 1)

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
# Edit .env and add GEMINI_API_KEY

python run.py
```

## 2️⃣ Frontend Setup (Terminal 2)

```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local if needed

npm run dev
```

## 3️⃣ Access Application

- **Frontend**: http://localhost:3000
- **API Docs**: http://localhost:8000/docs

## 📝 What to Do Now

1. Get Gemini API key from https://makersuite.google.com/app/apikey
2. Add it to backend/.env
3. Start both servers with commands above
4. Open http://localhost:3000 in browser
5. Paste a job description
6. Upload a resume (PDF or text)
7. Click "Analyze Resume"
8. Download the optimized resume!

## 🐛 Troubleshooting

- **ModuleNotFoundError**: Run `pip install -r requirements.txt`
- **Port already in use**: Change port in run.py or use different port
- **CORS errors**: Check CORS_ORIGINS in backend/.env

## 📚 Documentation

- [README.md](README.md) - Full project overview
- [SETUP.md](SETUP.md) - Detailed setup instructions
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API endpoints reference

**Happy analyzing! 🚀**
