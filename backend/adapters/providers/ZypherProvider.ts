import type { ModelProvider } from './ModelProvider.ts';
import { ZypherAgent } from "@corespeed/zypher";

export class ZypherProvider implements ModelProvider {
  private agent: ZypherAgent;

  constructor(agent: ZypherAgent) {
    this.agent = agent;
  }

  async* streamResponse(prompt: string, model?: string): AsyncIterable<string> {
    console.log(`[ZypherProvider] Starting Zypher task with model: ${model || "phi3:mini"}`);
    const startTime = Date.now();
    
    // Use the model name directly as Zypher will pass it to the configured model provider
    const event$ = this.agent.runTask(prompt, model || "phi3:mini");
    const { eachValueFrom } = await import("rxjs-for-await");
    
    let chunkCount = 0;
    let hasYielded = false;
    
    try {
      for await (const agentEvent of eachValueFrom(event$)) {
        // Only process message events to avoid duplication
        if ('type' in agentEvent && agentEvent.type === 'message') {
          const msgEvent = agentEvent as { type: string; message?: { content: string | Array<{ text: string }> } };
          if (msgEvent.message?.content) {
            let content = Array.isArray(msgEvent.message.content)
              ? msgEvent.message.content.map((c: { text: string }) => c.text).join('')
              : msgEvent.message.content;
            
            console.log(`[ZypherProvider] Received content chunk: ${content.length} chars`);
            
            // Skip empty chunks
            if (!content || content.trim().length === 0) {
              console.log(`[ZypherProvider] Skipping empty chunk`);
              continue;
            }
            
            // Remove user prompt echo - check if response starts with the exact prompt
            if (content.trim().startsWith(prompt.trim())) {
              content = content.substring(prompt.length).trim();
              console.log(`[ZypherProvider] Removed exact prompt echo, remaining: ${content.length} chars`);
            }
            
            // Additional cleanup: check if first line is the prompt
            const lines = content.split('\n');
            if (lines[0] && lines[0].trim() === prompt.trim()) {
              content = lines.slice(1).join('\n').trim();
              console.log(`[ZypherProvider] Removed prompt from first line, remaining: ${content.length} chars`);
            }
            
            if (content.trim()) {
              // Split by words for true word-by-word streaming
              const words = content.split(/(\s+)/); // Keep whitespace
              
              for (const word of words) {
                if (word) { // Send every word immediately, including spaces
                  chunkCount++;
                  if (!hasYielded) {
                    console.log(`[ZypherProvider] First chunk received in ${Date.now() - startTime}ms`);
                    hasYielded = true;
                  }
                  
                  yield word;
                  
                  // Very minimal delay for smooth word-by-word appearance
                  await new Promise(resolve => setTimeout(resolve, 10));
                }
              }
            }
          }
        }
        // Skip text events as they appear to duplicate message content
      }
      
      console.log(`[ZypherProvider] Completed with ${chunkCount} chunks in ${Date.now() - startTime}ms`);
      
    } catch (error) {
      console.error(`[ZypherProvider] Error after ${Date.now() - startTime}ms:`, error);
      throw error;
    }
  }
}