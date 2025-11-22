import type { ModelProvider } from '../adapters/providers/ModelProvider.ts';

export class RunTaskUseCase {
  private primaryProvider: ModelProvider;
  private fallbackProvider?: ModelProvider;

  constructor(primaryProvider: ModelProvider, fallbackProvider?: ModelProvider) {
    this.primaryProvider = primaryProvider;
    this.fallbackProvider = fallbackProvider;
  }

  async* execute(task: string, model?: string, sessionId?: string): AsyncIterable<string> {
    const startTime = Date.now();
    console.log(`[UseCase] Executing task with ${this.primaryProvider.constructor.name}`);
    
    try {
      let hasYielded = false;
      let chunkCount = 0;
      
      for await (const chunk of this.primaryProvider.streamResponse(task, model, undefined, sessionId)) {
        chunkCount++;
        if (!hasYielded) {
          console.log(`[UseCase] First chunk received in ${Date.now() - startTime}ms`);
          hasYielded = true;
        }
        yield chunk;
      }
      
      // Generator completed naturally
      console.log(`[UseCase] Stream completed successfully with ${chunkCount} chunks in ${Date.now() - startTime}ms`);
      
      if (!hasYielded) {
        throw new Error('No response from primary provider');
      }
      
    } catch (error) {
      console.warn(`[UseCase] Primary provider failed after ${Date.now() - startTime}ms:`, error);
      
      if (this.fallbackProvider) {
        console.log(`[UseCase] Switching to fallback provider: ${this.fallbackProvider.constructor.name}`);
        try {
          for await (const chunk of this.fallbackProvider.streamResponse(task, model, undefined, sessionId)) {
            yield chunk;
          }
        } catch (fallbackError) {
          console.error('Both providers failed:', { primary: error, fallback: fallbackError });
          throw new Error('All providers failed to process the task');
        }
      } else {
        throw error;
      }
    }
  }
}