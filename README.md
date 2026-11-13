# 🚀 CareerPath AI – Your Personal AI Career Navigator

> **"Know Your Skills. Discover Your Gaps. Build Your Future."**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

CareerPath AI is a complete, production-grade AI-powered web platform designed to bridge the gap between academic education and industry hiring standards. It evaluates a student's technical and soft skills against target job roles, calculates a weighted Career Readiness Score, identifies missing and improvable competencies, generates a personalized 8-week learning roadmap adapted to weekly study hours, provides 3 portfolio project blueprints with step-by-step guides, and features an interactive context-aware AI Career Assistant with PDF export.

---

## 📋 Problem Statement

Students often know which career they want but don't know:
- Which technical and soft skills are required
- Which skills they already possess
- Which skills they are missing
- What learning order they should follow
- How much time they need to become job-ready
- What projects they should build to demonstrate their skills

**CareerPath AI** solves this by providing an intelligent, AI-powered career guidance platform that evaluates a student's current skills against their desired job role and generates a fully personalized learning roadmap.

---

## 🌟 Key Features

### 1. 🎯 AI Skill Gap Analysis
- Compares student's existing skills against target job requirements across **15+ tech career tracks**
- Weighted scoring algorithm: differentiates between core prerequisites and secondary skills
- Graded proficiency credits: Advanced (1.0), Intermediate (0.65), Beginner (0.35), Missing (0.0)
- Dynamic status badges: 🟢 Mastered, 🟡 Needs Improvement, 🔴 Missing
- Domain radar chart comparing skill levels against industry benchmarks

### 2. 📅 Personalized 8-Week Roadmap
- Dynamically generated curriculum adapted to available study hours
- Includes learning topics, weekly objectives, verified resources (official docs, freeCodeCamp, MDN, Kaggle)
- Interactive completion checkboxes with persistent progress tracking
- Confetti animations upon reaching milestones 🎉

### 3. 💼 AI Portfolio Project Generator
- **3 tailored projects** per assessment (Beginner → Intermediate → Advanced)
- Real-world problems, required tech stacks, skills demonstrated
- 5-stage step-by-step implementation blueprints
- Tips for showcasing on GitHub and resumes

### 4. 🤖 Context-Aware AI Career Assistant
- Integrated chatbot that understands your career, skills, readiness score, and roadmap
- Answers questions like *"Why should I learn Python?"* and provides interview prep
- Pre-populated quick prompts and full conversation history

### 5. 🔍 Explore Career Paths
- Comprehensive catalog of top tech roles: Data Scientist, AI Engineer, Full Stack Developer, DevOps Engineer, Cybersecurity Analyst, UI/UX Designer, and more
- Salary ranges, market demand levels, and role descriptions

### 6. 📄 Professional PDF Export
- One-click PDF export with student info, readiness score, skill comparison, 8-week curriculum, and project plans

### 7. 👤 User Authentication & Profiles
- Student registration and login
- Persistent profile with saved skills and assessment history
- Secure token-based authentication

---

## 🛠️ Technology Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, TypeScript, Tailwind CSS, Vite, Recharts, Lucide React, canvas-confetti, jsPDF |
| **Backend** | Node.js, Express, TypeScript, tsx, CORS, dotenv |
| **Database** | Persistent JSON transactional database with atomic writes |
| **AI Integration** | Google Gemini API with intelligent fallback engine |
| **Design** | Premium SaaS aesthetic — dark navy, violet/cyan accents, glassmorphism cards |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18.0.0 or higher
- npm v9.0.0 or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/CareerPath_AI.git
   cd CareerPath_AI
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

Create a `.env` file in the `backend/` directory:

```env
PORT=5000

# Optional: Google Gemini API Key for dynamic LLM generation.
# If omitted, the built-in intelligent career synthesis engine handles
# all roadmaps, skill calculations, and chat queries seamlessly.
GEMINI_API_KEY=your_gemini_api_key_here
```

> **Note:** The application works fully without a Gemini API key — the built-in fallback engine provides comprehensive career analysis, roadmaps, and chat responses.

---

## 🏃 Running the Application

### Option 1: Run Both Servers

**Start the Backend API Server:**
```bash
cd backend
npx tsx src/server.ts
```
Backend runs at **http://localhost:5000** with API at `/api/`.

**Start the Frontend Dev Server** (in a separate terminal):
```bash
cd frontend
npm run dev
```
Frontend runs at **http://localhost:5173**.

### Option 2: Production Build (Single Server)

```bash
# Build the frontend
cd frontend
npm run build
cd ..

# Start the backend (serves frontend build + API)
cd backend
npx tsx src/server.ts
```
Access everything at **http://localhost:5000**.

---

## 📡 REST API Documentation

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Server health check |
| `GET` | `/api/careers` | List all career tracks and skill requirements |
| `GET` | `/api/skills` | Searchable skills catalog by domain |
| `POST` | `/api/assess` | Generate skill gap analysis, roadmap & projects |
| `GET` | `/api/assessments` | Retrieve all saved assessments |
| `GET` | `/api/assessments/:id` | Fetch specific assessment |
| `PATCH` | `/api/assessments/:id/tasks/:taskId/toggle` | Toggle roadmap task completion |
| `POST` | `/api/chat` | Send message to AI Career Assistant |
| `GET` | `/api/chat/:assessmentId` | Fetch chat history |
| `POST` | `/api/auth/register` | Register new student account |
| `POST` | `/api/auth/login` | Login to existing account |
| `GET` | `/api/auth/me` | Get current user profile |
| `PUT` | `/api/auth/profile` | Update user profile |
| `GET` | `/api/student/skills` | Get saved student skills |
| `PUT` | `/api/student/skills` | Update student skills |

---

## 🧪 Testing Scenarios

| Scenario | Role | Input Skills | Readiness | Projects |
|----------|------|-------------|-----------|----------|
| 1 | Data Scientist | Python (Beginner), SQL (Missing) | ~5% | 3 Data Science |
| 2 | AI Engineer | Python (Intermediate), Git (Beginner) | ~10% | 3 AI/LLM |
| 3 | Full Stack Developer | JS (Advanced), React (Intermediate) | ~36% | 3 Full Stack |
| 4 | Cybersecurity Analyst | Linux (Beginner), Networks (Beginner) | ~7% | 3 Security |

---

## 📁 Project Structure

```
CareerPath_AI/
├── backend/
│   ├── src/
│   │   ├── data/careerData.ts          # 12+ career role definitions
│   │   ├── db/database.ts              # Persistent JSON database
│   │   ├── routes/api.ts               # Main API routes
│   │   ├── routes/auth.ts              # Authentication routes
│   │   ├── services/
│   │   │   ├── aiRoadmapService.ts     # 8-week roadmap generator
│   │   │   ├── chatService.ts          # AI chat (Gemini + fallback)
│   │   │   ├── portfolioGenerator.ts   # Portfolio project generator
│   │   │   └── skillMatchEngine.ts     # Weighted skill gap analysis
│   │   ├── utils/auth.ts               # Auth utilities & middleware
│   │   └── server.ts                   # Express server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AIChatDrawer.tsx        # AI Career Assistant
│   │   │   ├── AssessmentWizard.tsx     # 5-step assessment form
│   │   │   ├── AuthModal.tsx           # Login/Register modal
│   │   │   ├── DashboardView.tsx       # Results dashboard (5 tabs)
│   │   │   ├── ExploreCareersModal.tsx  # Career explorer
│   │   │   ├── HistoryModal.tsx        # Saved assessments
│   │   │   ├── LandingHero.tsx         # Landing page
│   │   │   ├── Navbar.tsx              # Navigation bar
│   │   │   └── ProfileModal.tsx        # User profile editor
│   │   ├── types/index.ts             # TypeScript interfaces
│   │   ├── utils/
│   │   │   ├── api.ts                 # API client with auth
│   │   │   └── pdfExport.ts           # PDF generation
│   │   ├── App.tsx                    # Main application
│   │   ├── index.css                  # Tailwind + custom styles
│   │   └── main.tsx                   # React entry point
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
├── .gitignore
├── render.yaml                        # Render deployment config
├── vercel.json                        # Vercel deployment config
├── netlify.toml                       # Netlify deployment config
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
  Built with ❤️ using React, TypeScript, and AI
</p>
