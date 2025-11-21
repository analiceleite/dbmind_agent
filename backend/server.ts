import {
  createZypherContext,
  OpenAIModelProvider,
  ZypherAgent,
} from "@corespeed/zypher";

// Ensure HOME environment variable is set for Zypher (Windows compatibility)
if (!Deno.env.get("HOME") && Deno.env.get("USERPROFILE")) {
  Deno.env.set("HOME", Deno.env.get("USERPROFILE")!);
}

// Initialize the agent execution context
const zypherContext = await createZypherContext(Deno.cwd());

const agent = new ZypherAgent(
  zypherContext,
  new OpenAIModelProvider({
    apiKey: 'not-needed',
    baseUrl: 'http://localhost:11434/v1',
  }),
);

// CORS headers helper
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// WebSocket connections store
const clients = new Set<WebSocket>();

// HTTP server
Deno.serve({ port: 8000 }, (req) => {
  const url = new URL(req.url);

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // WebSocket endpoint for streaming agent responses
  if (url.pathname === "/ws") {
    if (req.headers.get("upgrade") !== "websocket") {
      return new Response("Expected websocket", { status: 400 });
    }

    const { socket, response } = Deno.upgradeWebSocket(req);
    clients.add(socket);

    socket.onopen = () => {
      console.log("Client connected");
      socket.send(JSON.stringify({ type: "connected", message: "Connected to Zypher Agent" }));
    };

    socket.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === "task") {
          const { task, model } = data;
          


          // Send acknowledgment
          socket.send(JSON.stringify({ type: "status", message: "Processing task..." }));

          // Direct Ollama API call for clean response
          try {
            const response = await fetch('http://localhost:11434/api/generate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                model: 'llama3.2',
                prompt: `You are a React expert teacher. Answer concisely: ${task}`,
                stream: true,
                system: 'You are a helpful React teacher. Focus only on React, hooks, components, and modern React patterns. Keep answers clear and practical.'
              })
            });

            if (!response.body) throw new Error('No response body');
            
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value);
              const lines = chunk.split('\n').filter(line => line.trim());

              for (const line of lines) {
                try {
                  const data = JSON.parse(line);
                  if (data.response) {
                    // Send each piece immediately
                    socket.send(JSON.stringify({ 
                      type: "chunk", 
                      content: data.response 
                    }));
                  }
                } catch (_e) {
                  // Ignore JSON parse errors
                }
              }
            }
          } catch (_error) {
            console.error('Ollama direct call failed, falling back to Zypher');
            
            // Fallback to Zypher if direct call fails
            const event$ = agent.runTask(task, model || "llama3.2");
            const { eachValueFrom } = await import("rxjs-for-await");
            
            for await (const agentEvent of eachValueFrom(event$)) {
              if ('type' in agentEvent && agentEvent.type === 'message') {
                const msgEvent = agentEvent as { type: string; message?: { content: string | Array<{ text: string }> } };
                if (msgEvent.message?.content) {
                  const content = Array.isArray(msgEvent.message.content)
                    ? msgEvent.message.content.map((c: { text: string }) => c.text).join('')
                    : msgEvent.message.content;
                  
                  if (content.trim()) {
                    socket.send(JSON.stringify({ 
                      type: "chunk", 
                      content: content 
                    }));
                  }
                }
              }
            }
          }

          // Complete
          socket.send(JSON.stringify({ type: "complete" }));
        }
      } catch (error) {
        socket.send(JSON.stringify({
          type: "error",
          message: error instanceof Error ? error.message : "Unknown error",
        }));
      }
    };

    socket.onclose = () => {
      console.log("Client disconnected");
      clients.delete(socket);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      clients.delete(socket);
    };

    return response;
  }

  // Health check endpoint
  if (url.pathname === "/health") {
    return new Response(
      JSON.stringify({ status: "ok", timestamp: new Date().toISOString() }),
      { headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  // Default response
  return new Response(
    JSON.stringify({ message: "Zypher Agent Server", endpoints: ["/ws", "/health"] }),
    { headers: { "Content-Type": "application/json", ...corsHeaders } }
  );
});

console.log("🚀 Zypher Agent Server running on http://localhost:8000");