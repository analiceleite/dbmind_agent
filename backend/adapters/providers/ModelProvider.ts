// Common interface for AI model providers
export interface ModelProvider {
  streamResponse(prompt: string, model?: string, system?: string): AsyncIterable<string>;
}

export interface ModelResponse {
  type: 'chunk' | 'complete' | 'error';
  content?: string;
  error?: string;
}