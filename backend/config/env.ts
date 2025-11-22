// Centralized environment and configuration
export interface AppConfig {
  port: number;
  zypher: {
    baseUrl: string;
    defaultModel: string;
  };
  cors: {
    origin: string;
    methods: string;
    headers: string;
  };
}

function loadConfig(): AppConfig {
  // Ensure HOME environment variable for Zypher (Windows compatibility)
  if (!Deno.env.get("HOME") && Deno.env.get("USERPROFILE")) {
    Deno.env.set("HOME", Deno.env.get("USERPROFILE")!);
  }

  return {
    port: parseInt(Deno.env.get("PORT") || "8000", 10),
    zypher: {
      baseUrl: Deno.env.get("ZYPHER_BASE_URL") || "http://localhost:11434",
      defaultModel: Deno.env.get("DEFAULT_MODEL") || "claude-3-5-haiku-20241022",
    },
    cors: {
      origin: "*",
      methods: "GET, POST, OPTIONS",
      headers: "Content-Type",
    },
  };
}

export const config = loadConfig();

export const corsHeaders = {
  "Access-Control-Allow-Origin": config.cors.origin,
  "Access-Control-Allow-Methods": config.cors.methods,
  "Access-Control-Allow-Headers": config.cors.headers,
};