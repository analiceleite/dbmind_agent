import type { ModelProvider } from './ModelProvider.ts';
import { config } from '../../config/env.ts';

export class OllamaProvider implements ModelProvider {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || config.ollama.baseUrl;
  }

  async* streamResponse(prompt: string, model?: string, system?: string): AsyncIterable<string> {
    console.log(`[OllamaProvider] Starting request to ${this.baseUrl}`);
    const startTime = Date.now();
    
    const response = await fetch(`${this.baseUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: model || config.ollama.defaultModel,
        prompt: prompt, 
        stream: true,
        system: system || 'You are a React expert. Give concise, practical answers about React hooks, components, and patterns. Be direct and brief.',
        options: {
          temperature: 0.3,  // Lower for more focused responses
          top_p: 0.8,        // Slightly more focused
        }
      })
    });
    
    console.log(`[OllamaProvider] Response received in ${Date.now() - startTime}ms`);

    if (!response.body) {
      throw new Error('No response body from Ollama');
    }
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let buffer = '';
    let chunkCount = 0;
    
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        
        // Keep the last incomplete line in buffer
        buffer = lines.pop() || '';

        for (const line of lines.filter(line => line.trim())) {
          try {
            const data = JSON.parse(line);
            
            // Yield response chunks
            if (data.response && data.response.length > 0) {
              chunkCount++;
              yield data.response;
            }
            
            // Check for completion
            if (data.done === true) {
              console.log(`[OllamaProvider] Received completion flag after ${chunkCount} chunks`);
              return; // Exit generator when done
            }
            
          } catch (e) {
            console.log(`[OllamaProvider] Parse error: ${e}, line: ${line.substring(0, 50)}`);
          }
        }
      }
      
      // Process any remaining buffer content
      if (buffer.trim()) {
        try {
          const data = JSON.parse(buffer);
          if (data.response && data.response.length > 0) {
            chunkCount++;
            yield data.response;
          }
          if (data.done === true) {
            console.log(`[OllamaProvider] Final completion flag received in buffer`);
          }
        } catch (_e) {
          console.log(`[OllamaProvider] Remaining buffer not valid JSON: ${buffer.substring(0, 50)}`);
        }
      }
      
      console.log(`[OllamaProvider] Stream ended with ${chunkCount} chunks in ${Date.now() - startTime}ms`);
    } finally {
      reader.releaseLock();
    }
  }
}