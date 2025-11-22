import type { RunTaskUseCase } from '../../application/RunTaskUseCase.ts';

export class WebSocketHandler {
  private clients = new Set<WebSocket>();
  
  constructor(private useCase: RunTaskUseCase) {}

  handle(req: Request): Response {
    if (req.headers.get("upgrade") !== "websocket") {
      return new Response("Expected websocket", { status: 400 });
    }

    const { socket, response } = Deno.upgradeWebSocket(req);
    this.clients.add(socket);

    socket.onopen = () => {
      console.log("Client connected");
      socket.send(JSON.stringify({ type: "connected", message: "Connected to Zypher Agent" }));
    };

    socket.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === "task") {
          const { task, model } = data;
          console.log(`[WebSocket] Received task: "${task.substring(0, 50)}..." with model: ${model || 'default'}`);
          const startTime = Date.now();
          
          // Send acknowledgment
          socket.send(JSON.stringify({ type: "status", message: "Processing task..." }));

          // Stream response using use case
          try {
            let hasStreamed = false;
            for await (const chunk of this.useCase.execute(task, model)) {
              hasStreamed = true;
              // Check if socket is still open before sending
              if (socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ 
                  type: "chunk", 
                  content: chunk 
                }));
              } else {
                console.log(`[WebSocket] Client disconnected during streaming`);
                break;
              }
            }
            
            // Complete only if we actually streamed and socket is open
            if (hasStreamed && socket.readyState === WebSocket.OPEN) {
              console.log(`[WebSocket] Task completed in ${Date.now() - startTime}ms`);
              socket.send(JSON.stringify({ type: "complete" }));
            }
          } catch (error) {
            console.error(`[WebSocket] Task failed after ${Date.now() - startTime}ms:`, error);
            if (socket.readyState === WebSocket.OPEN) {
              socket.send(JSON.stringify({
                type: "error",
                message: error instanceof Error ? error.message : "Task processing failed",
              }));
            }
          }
        }
      } catch (error) {
        socket.send(JSON.stringify({
          type: "error",
          message: error instanceof Error ? error.message : "Invalid message format",
        }));
      }
    };

    socket.onclose = () => {
      console.log("Client disconnected");
      this.clients.delete(socket);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      this.clients.delete(socket);
    };

    return response;
  }

  getClientCount(): number {
    return this.clients.size;
  }
}