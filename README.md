# 🛡️ AI Legal Shield

**Your Personal AI Lawyer for Everyday Contracts**

AI Legal Shield bridges the legal literacy gap by analyzing contracts, leases, NDAs, and employment agreements in plain English. Upload any legal document and get instant risk assessments, clause explanations, and negotiation tips.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.8%2B-blue.svg)
![React](https://img.shields.io/badge/react-18%2B-blue.svg)
![FastAPI](https://img.shields.io/badge/fastapi-0.104%2B-green.svg)

## 🎯 Features

- **Smart Contract Analysis**: AI-powered risk assessment using Google Gemini
- **Plain English Translations**: Complex legal jargon explained simply
- **Risk Scoring**: 1-10 scale risk assessment for every clause
- **Negotiation Guidance**: Actionable tips for contract negotiations
- **Multiple Formats**: Supports PDF, DOCX, and TXT files
- **Shareable Reports**: Forward analysis to friends and family
- **Secure & Private**: Your documents are processed securely

## 🏗️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Tailwind CSS** - Utility-first styling
- **Vite** - Lightning-fast build tool
- **Clerk** - User authentication & management

### Backend
- **FastAPI** - High-performance Python API
- **Google Gemini** - Advanced AI language model
- **LangChain** - AI orchestration and document processing
- **Vector Database** - Semantic search for legal knowledge
- **PostgreSQL** - Reliable data storage

### Infrastructure
- **Docker** - Containerized deployment
- **Vercel/Netlify** - Frontend hosting
- **Railway/Heroku** - Backend hosting

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-legal-shield.git
   cd ai-legal-shield
   ```

2. **Set up Python environment**
   ```bash
   cd backend
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and configuration
   ```

5. **Run the server**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Add your API URLs and Clerk keys
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 📁 Project Structure

```
ai-legal-shield/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   └── dependencies.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── security.py
│   │   ├── models/
│   │   ├── services/
│   │   │   ├── ai_service.py
│   │   │   └── contract_parser.py
│   │   └── utils/
│   ├── tests/
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── utils/
│   ├── package.json
│   └── .env.example
├── docs/
├── docker-compose.yml
└── README.md
```

## ⚙️ Environment Variables

### Backend (.env)
```bash
# API Keys
GEMINI_API_KEY=your_gemini_api_key_here
CLERK_SECRET_KEY=your_clerk_secret_key

# Database
DATABASE_URL=postgresql://user:password@localhost/legal_shield
VECTOR_DB_URL=your_vector_db_connection

# General
ENVIRONMENT=development
DEBUG=True
SECRET_KEY=your_super_secret_key_here

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Frontend (.env.local)
```bash
REACT_APP_API_URL=http://localhost:8000
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

## 🧪 API Endpoints

### Health Check
```http
GET / 
GET /health
```

### File Upload
```http
POST /api/v1/upload/contract
Content-Type: multipart/form-data
```

### Contract Analysis
```http
POST /api/v1/analyze/contract
Content-Type: application/json

{
  "contract_text": "string",
  "analysis_type": "full"
}
```

### User Management
```http
GET /api/v1/user/profile
POST /api/v1/user/subscription
```

For detailed API documentation, visit http://localhost:8000/docs when running the server.

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest tests/ -v
```

### Frontend Tests
```bash
cd frontend
npm test
# or
yarn test
```

### Integration Tests
```bash
# Run both frontend and backend, then:
npm run test:e2e
```

## 🚢 Deployment

### Using Docker
```bash
# Build and run with Docker Compose
docker-compose up --build

# Production deployment
docker-compose -f docker-compose.prod.yml up --build
```

### Manual Deployment

**Backend (Railway/Heroku)**:
1. Create new app on platform
2. Connect GitHub repository
3. Set environment variables
4. Deploy from main branch

**Frontend (Vercel/Netlify)**:
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set environment variables
4. Deploy

## 📊 Usage Analytics

Track key metrics:
- Contract uploads per month
- User engagement rates
- Most analyzed clause types
- Risk score distributions
- User retention metrics

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Roadmap

- [ ] **Phase 1**: Core contract analysis (PDF, basic risk scoring)
- [ ] **Phase 2**: Advanced AI features (clause comparison, templates)
- [ ] **Phase 3**: Mobile app & browser extension
- [ ] **Phase 4**: Enterprise features (team collaboration, bulk analysis)
- [ ] **Phase 5**: Legal marketplace integration

## 🐛 Known Issues

- Large PDF files (>5MB) may take longer to process
- OCR for scanned documents requires additional setup
- Some contract types may need custom training

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support & Contact

- **Documentation**: [docs.ailegalshield.com](https://docs.ailegalshield.com)
- **Discord Community**: [Join our Discord](https://discord.gg/ailegalshield)
- **Email Support**: support@ailegalshield.com
- **Bug Reports**: [GitHub Issues](https://github.com/yourusername/ai-legal-shield/issues)

## 🎉 Acknowledgments

- Google Gemini AI for powerful language understanding
- LangChain community for document processing tools
- FastAPI team for the excellent web framework
- React team for the robust frontend framework

---

**⚖️ Legal Disclaimer**: AI Legal Shield provides informational analysis only and does not constitute legal advice. Always consult with qualified legal professionals for important legal decisions.

**Made with ❤️ for everyone who's ever been confused by legal documents**
