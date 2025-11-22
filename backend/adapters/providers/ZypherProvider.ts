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
    
    // Use Zypher Agent to run the task with streaming (optimized model)
    const event$ = this.agent.runTask(prompt, model || "phi3:mini");
    const { eachValueFrom } = await import("rxjs-for-await");
    
    let hasYielded = false;
    let chunkCount = 0;
    
    try {
      for await (const event of eachValueFrom(event$)) {
        // Handle text streaming events - this is where the actual content comes
        if (event.type === 'text' && 'content' in event && event.content) {
          if (!hasYielded) {
            console.log(`[ZypherProvider] First chunk received in ${Date.now() - startTime}ms`);
            hasYielded = true;
          }
          
          chunkCount++;
          // Yield the content directly from Zypher (optimized for speed)
          yield event.content;
        }
        
        // Handle cancellation
        else if (event.type === 'cancelled') {
          console.log(`[ZypherProvider] Task was cancelled`);
          break;
        }
        // Note: Zypher doesn't send 'complete' events - the stream just ends
      }
      
      // When we exit the loop, it means the stream has ended naturally
      console.log(`[ZypherProvider] Stream completed naturally - ${chunkCount} chunks in ${Date.now() - startTime}ms`);
      
      if (!hasYielded) {
        throw new Error('No response received from Zypher Agent');
      }
      
      // Stream has ended, this generator will naturally complete
      
    } catch (error) {
      console.error(`[ZypherProvider] Error after ${Date.now() - startTime}ms:`, error);
      throw error;
    }
  }
}