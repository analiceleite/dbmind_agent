# 🤖 DBMind Agent

An intelligent database assistant that dynamically generates SQL queries and provides accurate answers based on company data. Built with Deno, React, and Zypher Agent, featuring real-time streaming chat and PostgreSQL integration with Anthropic Claude AI.

## 🏗️ Architecture

The frontend and backend run locally, while the database runs on a cloud VM. AI processing is handled by Anthropic's Claude models via API.

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
│  - Zypher Agent + Anthropic Claude integration  │
└────────────────┬────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────┐
│  PostgreSQL Database (Port 5432)                │
│  - Company data (customers, sales, budgets)     │
│  - Source of truth for AI responses             │
└─────────────────────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────┐
│  Anthropic Claude API                           │
│  - claude-3-5-haiku-20241022 model              │
│  - Real-time streaming AI responses             │
└─────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Deno installed
- Node.js installed
- Anthropic API key (get from [Anthropic Console](https://console.anthropic.com/))

### 1. Set Environment Variables
```bash
# Backend: Create .env file or export
export ANTHROPIC_API_KEY=your_api_key_here
```

### 2. Start Database
```bash
# Start Postgres
docker-compose -f infrastructure/docker-compose.yml up -d
```

### 3. Start Backend
```bash
cd backend
deno task start
```
Backend runs at `http://localhost:8000`

### 4. Start Frontend
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
| **AI** | Zypher Agent + Anthropic Claude |
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

**AI API issues:**
- Ensure `ANTHROPIC_API_KEY` is set correctly
- Check API rate limits in your Anthropic dashboard
- Verify model availability: `claude-3-5-haiku-20241022`

**Ports in use:**
- Frontend: 5173
- Backend: 8000
- Database: 5432

## 📚 Links

- [Zypher Agent](https://jsr.io/@corespeed/zypher)
- [Anthropic Claude](https://anthropic.com/)
- [Deno](https://deno.land/)
