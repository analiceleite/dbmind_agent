# 🤖 Zypher Agent Chat Application

A full-stack AI chat application using Deno, React, and Zypher Agent with local AI models.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│  React Frontend (Port 5174)                     │
│  - Chat interface with real-time streaming      │
│  - WebSocket client                             │
│  - Markdown rendering & syntax highlighting     │
└────────────────┬────────────────────────────────┘
                 │ WebSocket
                 ↓
┌─────────────────────────────────────────────────┐
│  Deno Backend (Port 8000)                       │
│  - WebSocket server                             │
│  - Zypher Agent with intelligent task routing   │
│  - Modular provider architecture                │
└─────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### 1. Setup Ollama (LLM Provider)

O Zypher Agent usa Ollama como provider de modelos locais:

```bash
# Instalar Ollama (Windows/Mac/Linux)
# Visite: https://ollama.ai/download

# Ou usar Docker
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama

# Baixar um modelo (recomendado: Phi-3 Mini)
ollama pull phi3:mini

# Verificar modelos disponíveis
ollama list

# Testar se está funcionando
curl http://localhost:11434/api/version
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
3. **Zypher Agent** → Intelligently processes the task with AI capabilities
4. **AI processes** → Local model generates contextual response with streaming
5. **Response streams** → Real-time chunks sent back through WebSocket
6. **Frontend renders** → Markdown formatted response with syntax highlighting

### Technical Flow:

```typescript
// 1. Frontend sends message
WebSocket → { type: "task", task: "Hello!", model: "phi3:mini" }

// 2. Backend shows loading
WebSocket ← { type: "status", message: "Processing task..." }

// 3. Zypher Agent processes with streaming
agent.runTaskStream("Hello!", "phi3:mini")
  → Intelligent task routing and context management
  → Streaming response generation

// 4. Backend sends streaming chunks
WebSocket ← { type: "complete", message: "Hi! How can I help?" }

// 5. Frontend displays message
```

## 🛠️ Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Runtime** | Deno | TypeScript/JavaScript runtime for backend |
| **AI Framework** | Zypher Agent | Intelligent AI agent orchestration and task routing |
| **AI Models** | Local Models | Phi-3 Mini and other compatible models |
| **Frontend** | React + Vite | Modern UI with real-time streaming |
| **Communication** | WebSocket | Real-time bidirectional streaming communication |
| **Styling** | Styled Components | Modular component-based styling |

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
├── infrastructure/         # Optional database config
└── README.md              # This file
```

## 🔑 Key Components

### Zypher Agent
- Advanced AI agent framework for intelligent task orchestration
- Supports multiple LLM providers with OpenAI-compatible APIs
- Manages context, memory, and tool usage with streaming capabilities
- Provides intelligent routing and response optimization

### Deno
- Modern TypeScript/JavaScript runtime
- Secure by default (explicit permissions)
- Native TypeScript support

## 🎯 Features

- ✅ Real-time streaming chat with intelligent AI agents
- ✅ Advanced markdown rendering with syntax highlighting
- ✅ Dark/light theme support with smooth transitions
- ✅ WebSocket streaming for fluid response delivery
- ✅ Modular provider architecture with Zypher focus
- ✅ Enhanced UI with particles effects and animations

## ⚙️ Configuração do Ollama

O Zypher Agent usa Ollama como LLM provider através de uma API compatível com OpenAI:

### Configuração atual no server.ts:
```typescript
const agent = new ZypherAgent(
  zypherContext,
  new OpenAIModelProvider({
    apiKey: 'not-needed', // Ollama não precisa de API key
    baseUrl: 'http://localhost:11434/v1', // Endpoint compatível com OpenAI
    openaiClientOptions: {
      maxRetries: 2,
      timeout: 60000,
    }
  }),
);
```

### Modelos recomendados:
- **phi3:mini** - Rápido e eficiente (3.8B parâmetros)
- **llama3.2:3b** - Boa qualidade geral
- **codellama:7b** - Especializado em código
- **mistral:7b** - Excelente para conversação

### Variáveis de ambiente (opcional):
```bash
# .env
ZYPHER_BASE_URL=http://localhost:11434
DEFAULT_MODEL=phi3:mini
PORT=8000
```

## 🐛 Troubleshooting

**Ollama não está respondendo:**
```bash
# Verificar se Ollama está rodando
curl http://localhost:11434/api/version

# Iniciar Ollama
ollama serve

# Ou via Docker
docker start ollama

# Verificar logs
docker logs ollama
```

**Zypher Agent not responding:**
```bash
# Check backend logs
cd backend
deno task start

# Verify model is available
ollama list

# Test Ollama directly
curl http://localhost:11434/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "phi3:mini",
    "messages": [{"role": "user", "content": "Hello"}],
    "stream": false
  }'
```

**Frontend issues:**
```bash
# Restart frontend development server
cd frontend
npm run dev

# Clear browser cache and refresh
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
