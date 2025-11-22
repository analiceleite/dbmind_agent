# 🤖 DBMind Agent

An intelligent database assistant that dynamically generates SQL queries and provides accurate answers based on company data. Built with Deno, React, and Zypher Agent, featuring real-time streaming chat and PostgreSQL integration.

## 🏗️ Architecture

The frontend and the backend are running locally on my machine, but the database and ollama are running on a cloud virtual machine with 128GB of memory.

# INSERT PRINTSCREEN

```
┌─────────────────────────────────────────────────┐
│  React Frontend (Port 5173)                     │
│  - Chat interface for database queries          │
│  - Real-time streaming responses                │
│  - WebSocket client                             │
└────────────────┬────────────────────────────────┘
                 │ WebSocket
                 ↓
┌─────────────────────────────────────────────────┐
│  Deno Backend (Port 8000)                       │
│  - Intelligent SQL query generation             │
│  - Database validation & execution              │
│  - Zypher Agent integration                     │
└────────────────┬────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────┐
│  PostgreSQL Database (Port 5432)                │
│  - Company data (customers, sales, budgets)     │
│  - Source of truth for AI responses             │
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

- ✅ Dynamic SQL query generation from natural language
- ✅ Intelligent responses based only on available data
- ✅ Real-time streaming chat with database insights
- ✅ PostgreSQL integration with company data
- ✅ WebSocket communication for instant responses
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
