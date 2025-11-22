# 🤖 Zypher Agent Chat Application

A full-stack AI chat application using Deno, React, Zypher Agent, and Ollama (Llama 3.2) running locally.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│  React Frontend (Port 5174)                     │
│  - Chat interface                               │
│  - WebSocket client                             │
└────────────────┬────────────────────────────────┘
                 │ WebSocket
                 ↓
┌─────────────────────────────────────────────────┐
│  Deno Backend (Port 8000)                       │
│  - WebSocket server                             │
│  - Zypher Agent orchestration                   │
└────────────────┬────────────────────────────────┘
                 │ HTTP/API
                 ↓
┌─────────────────────────────────────────────────┐
│  Ollama Container (Port 11434)                  │
│  - Llama 3.2 model                              │
│  - Local AI inference                           │
└─────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### 1. Start Ollama (Docker)

```bash
# Start the Ollama container
docker-compose up -d

# Pull the Llama 3.2 model
docker exec -it ollama ollama pull phi3:mini

# Verify it's running
docker exec -it ollama ollama list
```

### 2. Start Backend (Deno)

```bash
cd backend
deno task start
```

The backend will be available at `http://localhost:8000`

### 3. Start Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5174`

## 📊 Data Flow

### User asks a question:

1. **User types** → Message sent via WebSocket to backend
2. **Backend receives** → Deno WebSocket server processes request
3. **Zypher Agent** → Orchestrates the task and calls Ollama
4. **Ollama processes** → Llama 3.2 generates AI response
5. **Response returns** → Complete answer sent back through WebSocket
6. **Frontend displays** → User sees the AI's response

### Technical Flow:

```typescript
// 1. Frontend sends message
WebSocket → { type: "task", task: "Hello!", model: "phi3:mini" }

// 2. Backend shows loading
WebSocket ← { type: "status", message: "Processing task..." }

// 3. Zypher Agent calls Ollama
agent.runTask("Hello!", "phi3:mini")
  → Ollama API at localhost:11434
  → Llama 3.2 generates response

// 4. Backend sends complete response
WebSocket ← { type: "complete", message: "Hi! How can I help?" }

// 5. Frontend displays message
```

## 🛠️ Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Runtime** | Deno | TypeScript/JavaScript runtime for backend |
| **Backend** | Zypher Agent | AI agent orchestration framework |
| **LLM** | Ollama (Llama 3.2) | Local AI model for generating responses |
| **Frontend** | React + Vite | User interface |
| **Communication** | WebSocket | Real-time bidirectional communication |
| **Containerization** | Docker | Running Ollama in isolated environment |

## 📁 Project Structure

```
zypher_agent/
├── backend/
│   ├── server.ts           # Deno WebSocket server
│   ├── deno.json           # Deno configuration
│   └── .env                # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx         # Main React component
│   │   ├── App.css         # Styles
│   │   └── hooks/
│   │       └── useZypherAgent.ts  # WebSocket hook
│   └── package.json        # Frontend dependencies
│
├── docker-compose.yml      # Ollama container config
└── README.md              # This file
```

## 🔑 Key Components

### Zypher Agent
- AI agent framework that orchestrates complex tasks
- Connects to different LLM providers (Ollama, OpenAI, Claude)
- Manages context, memory, and tool usage

### Ollama
- Runs open-source LLMs locally
- Compatible with OpenAI API format
- Free and private (no data leaves your machine)

### Deno
- Modern TypeScript/JavaScript runtime
- Secure by default (explicit permissions)
- Native TypeScript support

## 🎯 Features

- ✅ Real-time chat with AI
- ✅ Local AI processing (private and free)
- ✅ Simple and clean UI
- ✅ WebSocket for instant responses
- ✅ Loading indicator while processing
- ✅ Complete responses (no streaming chunks)

## 🐛 Troubleshooting

**Ollama not responding:**
```bash
docker-compose logs ollama
docker-compose restart ollama
```

**Backend errors:**
```bash
# Check if Ollama is running
curl http://localhost:11434/api/version

# Restart backend
cd backend
deno task start
```

**Frontend not connecting:**
- Check if backend is running on port 8000
- Check browser console (F12) for WebSocket errors

## 📚 Learn More

- [Deno Documentation](https://deno.land/)
- [Zypher Agent](https://jsr.io/@corespeed/zypher)
- [Ollama](https://ollama.ai/)
- [Llama 3.2](https://llama.meta.com/)

## 📝 License

MIT
