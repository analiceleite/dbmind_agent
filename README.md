# 🤖 Zypher Agent Chat Application

A full-stack AI chat application using Deno, React, and Zypher Agent with local AI models and PostgreSQL database integration.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│  React Frontend (Port 5173)                     │
│  - Chat interface with real-time streaming      │
│  - WebSocket client                             │
│  - Markdown rendering & syntax highlighting     │
└────────────────┬────────────────────────────────┘
                 │ WebSocket
                 ↓
┌─────────────────────────────────────────────────┐
│  Deno Backend (Port 8000)                       │
│  - WebSocket server                             │
│  - Zypher Agent with database queries           │
│  - PostgreSQL integration                       │
└────────────────┬────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────┐
│  PostgreSQL Database (Port 5432)                │
│  - Fake company data (customers, sales, etc.)   │
│  - Strategic insights for AI responses          │
└─────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### 1. Start Infrastructure (Database & AI)

```bash
# Start Postgres and Ollama
docker-compose -f infrastructure/docker-compose.yml up -d

# Pull AI model
docker exec ollama ollama pull phi3:mini
```

### 2. Start Backend

```bash
cd backend
deno task start
```

Backend runs at `http://localhost:8000`

### 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

## 📊 Features

- ✅ Real-time streaming chat with AI agents
- ✅ PostgreSQL database with fake company data
- ✅ Strategic business insights from database queries
- ✅ Markdown rendering with syntax highlighting
- ✅ WebSocket communication
- ✅ Dark/light theme support

## 🛠️ Technology Stack

| Component | Technology |
|-----------|------------|
| **Backend** | Deno + TypeScript |
| **Frontend** | React + Vite |
| **AI** | Zypher Agent + Ollama |
| **Database** | PostgreSQL |
| **Communication** | WebSocket |

## 📁 Project Structure

```
zypher_agent/
├── backend/              # Deno server
├── frontend/             # React app
├── infrastructure/       # Docker configs & SQL
└── README.md
```

## 🐛 Troubleshooting

**Database connection issues:**
```bash
# Reset database
docker-compose -f infrastructure/docker-compose.yml down -v
docker-compose -f infrastructure/docker-compose.yml up -d
```

**AI model not responding:**
```bash
# Check model
docker exec ollama ollama list

# Test Ollama
curl http://localhost:11434/api/version
```

**Ports in use:**
- Frontend: 5173
- Backend: 8000
- Database: 5432
- Ollama: 11434

## 📚 Links

- [Zypher Agent](https://jsr.io/@corespeed/zypher)
- [Ollama](https://ollama.ai/)
- [Deno](https://deno.land/)
