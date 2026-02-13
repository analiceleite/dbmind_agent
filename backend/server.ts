import {
  createZypherContext,
  AnthropicModelProvider,
  ZypherAgent,
} from "@corespeed/zypher";

import { config } from "./config/env.ts";
import { ZypherProvider } from "./adapters/providers/ZypherProvider.ts";
import { RunTaskUseCase } from "./application/RunTaskUseCase.ts";
import { WebSocketHandler } from "./adapters/handlers/WebSocketHandler.ts";
import { HttpHandler } from "./adapters/handlers/HttpHandler.ts";
import { ConfigHandler } from "./adapters/handlers/ConfigHandler.ts";

// Helper function to safely get environment variables
function getRequiredEnv(name: string): string {
  const value = Deno.env.get(name);
  if (!value) {
    throw new Error(`Environment variable ${name} is not set`);
  }
  return value;
}

// Initialize the agent execution context
const zypherContext = await createZypherContext(Deno.cwd());

const agent = new ZypherAgent(
  zypherContext,
  new AnthropicModelProvider({
    apiKey: getRequiredEnv("ANTHROPIC_API_KEY"),
  }),
);

// Initialize Zypher provider - optimized for better streaming
const zypherProvider = new ZypherProvider(agent);

// Use Zypher as the primary and only provider (application focus)
const runTaskUseCase = new RunTaskUseCase(zypherProvider);

// Initialize handlers
const wsHandler = new WebSocketHandler(runTaskUseCase);
const httpHandler = new HttpHandler();
const configHandler = new ConfigHandler();

// HTTP server
Deno.serve({ port: config.port }, (req) => {
  const url = new URL(req.url);

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return httpHandler.handleOptions();
  }

  // Config endpoint - used by frontend to get server URLs
  if (url.pathname === "/config") {
    return configHandler.handleConfig(req);
  }

  // WebSocket endpoint for streaming agent responses
  if (url.pathname === "/ws") {
    return wsHandler.handle(req);
  }

  // Health check endpoint
  if (url.pathname === "/health") {
    return httpHandler.handleHealth();
  }

  // History endpoints
  if (url.pathname === "/history" && req.method === 'GET') {
    return httpHandler.handleHistoryList();
  }

  if (url.pathname.startsWith('/history/') && req.method === 'GET') {
    const id = url.pathname.split('/')[2];
    return httpHandler.handleHistoryGet(id);
  }

  if (url.pathname.startsWith('/history/') && req.method === 'PUT') {
    const id = url.pathname.split('/')[2];
    return httpHandler.handleHistoryUpdate(id, req);
  }

  if (url.pathname.startsWith('/history/') && req.method === 'DELETE') {
    const id = url.pathname.split('/')[2];
    return httpHandler.handleHistoryDelete(id);
  }

  if (url.pathname === '/history' && req.method === 'POST') {
    return httpHandler.handleHistoryCreate(req);
  }

  // Default response
  return httpHandler.handleDefault();
});

console.log(`🚀 Zypher Agent Server running on http://localhost:${config.port}`);