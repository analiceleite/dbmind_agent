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
          const { task, model, session_id } = data;
          console.log(`[WebSocket] Received task: "${task.substring(0, 50)}..." with model: ${model || 'default'}`);
          const startTime = Date.now();
          
          // Send acknowledgment
          socket.send(JSON.stringify({ type: "status", message: "Processing task..." }));

          // Stream response using use case
          try {
            let hasStreamed = false;
            let chunkCount = 0;
            
            for await (const chunk of this.useCase.execute(task, model, session_id)) {
              hasStreamed = true;
              chunkCount++;
              
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
            
            // The for-await loop has completed, meaning the generator finished
            if (hasStreamed && socket.readyState === WebSocket.OPEN) {
              console.log(`[WebSocket] Task completed naturally with ${chunkCount} chunks in ${Date.now() - startTime}ms`);
              socket.send(JSON.stringify({ type: "complete" }));
            } else if (!hasStreamed && socket.readyState === WebSocket.OPEN) {
              console.log(`[WebSocket] No content streamed, sending error`);
              socket.send(JSON.stringify({ 
                type: "error", 
                message: "No response generated" 
              }));
            } else if (socket.readyState !== WebSocket.OPEN) {
              console.log(`[WebSocket] Socket closed before completion signal could be sent`);
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