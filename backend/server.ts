import {
  createZypherContext,
  OpenAIModelProvider,
  ZypherAgent,
} from "@corespeed/zypher";

import { config } from "./config/env.ts";
import { OllamaProvider } from "./adapters/providers/OllamaProvider.ts";
import { ZypherProvider } from "./adapters/providers/ZypherProvider.ts";
import { RunTaskUseCase } from "./application/RunTaskUseCase.ts";
import { WebSocketHandler } from "./adapters/handlers/WebSocketHandler.ts";
import { HttpHandler } from "./adapters/handlers/HttpHandler.ts";

// Initialize the agent execution context
const zypherContext = await createZypherContext(Deno.cwd());

const agent = new ZypherAgent(
  zypherContext,
  new OpenAIModelProvider({
    apiKey: 'not-needed',
    baseUrl: 'http://localhost:11434/v1',
  }),
);

// Initialize providers
const ollamaProvider = new OllamaProvider();
const zypherProvider = new ZypherProvider(agent);

// Initialize use case with fallback
const runTaskUseCase = new RunTaskUseCase(ollamaProvider, zypherProvider);

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