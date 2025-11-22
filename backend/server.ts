import {
  createZypherContext,
  OpenAIModelProvider,
  ZypherAgent,
} from "@corespeed/zypher";

import { config } from "./config/env.ts";
import { ZypherProvider } from "./adapters/providers/ZypherProvider.ts";
import { RunTaskUseCase } from "./application/RunTaskUseCase.ts";
import { WebSocketHandler } from "./adapters/handlers/WebSocketHandler.ts";
import { HttpHandler } from "./adapters/handlers/HttpHandler.ts";

// Initialize the agent execution context
const zypherContext = await createZypherContext(Deno.cwd());

const agent = new ZypherAgent(
  zypherContext,
  new OpenAIModelProvider({
    apiKey: 'not-needed', // Local model doesn't need real API key
    baseUrl: 'http://131.161.43.4:11434/v1', // Remote Ollama endpoint
    openaiClientOptions: {
      maxRetries: 2,
      timeout: 60000, // 60 second timeout
    }
  }),
);

// Initialize Zypher provider - optimized for better streaming
const zypherProvider = new ZypherProvider(agent);

// Use Zypher as the primary and only provider (application focus)
const runTaskUseCase = new RunTaskUseCase(zypherProvider);

// Initialize handlers
const wsHandler = new WebSocketHandler(runTaskUseCase);
const httpHandler = new HttpHandler();

// HTTP server
Deno.serve({ port: config.port }, (req) => {
  const url = new URL(req.url);

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return httpHandler.handleOptions();
  }

  // WebSocket endpoint for streaming agent responses
  if (url.pathname === "/ws") {
    return wsHandler.handle(req);
  }

  // Health check endpoint
  if (url.pathname === "/health") {
    return httpHandler.handleHealth();
  }

  // Default response
  return httpHandler.handleDefault();
});

console.log(`🚀 Zypher Agent Server running on http://localhost:${config.port}`);